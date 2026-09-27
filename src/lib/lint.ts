import { TransactionCategory } from '../types/transaction'
import {
  BOOK_COLUMNS,
  BookColumn,
  chomp,
  createCellGetter,
  EGRESS_CATEGORIES,
  INGRESS_CATEGORIES,
  isEmptyRow,
  parseCategory,
  toNumber,
} from './book'

export type ProblemSeverity = 'error' | 'warning'

export type Problem = {
  severity: ProblemSeverity
  message: string
  /** 帳簿上の行番号（見出し行を1行目とする） */
  row: number
  /** 問題のある行を識別するための日付・内容 */
  context: string
}

/** ルールに渡される帳簿の行 */
type LintRow = {
  /** 帳簿上の行番号（見出し行を1行目とする） */
  row: number
  /** 列名でセルの値を取得する。列が無い場合は空文字列を返す */
  get: (column: BookColumn) => string
  /** 仕訳。不正な場合はnull */
  category: TransactionCategory | null
}

type Diagnostic = Pick<Problem, 'severity' | 'message'>

/** 帳簿の1行に対するルール */
type RowRule = (row: LintRow) => Diagnostic | null

/** 記入されていない（空白文字のみを含む）かどうか */
const isBlank = (str: string) => !/\S/.test(str)

/** 仕訳ごとに印字される追加の欄 */
const CATEGORY_COLUMNS: {
  category: TransactionCategory
  column: BookColumn
  label: string
}[] = [
  {
    category: TransactionCategory.謝礼費,
    column: '謝礼相手先',
    label: '相手先',
  },
  {
    category: TransactionCategory.通信運搬費,
    column: '通信運搬用途',
    label: '用途',
  },
  {
    category: TransactionCategory.印刷製本費,
    column: '印刷目的',
    label: '目的',
  },
  {
    category: TransactionCategory.用具等購入費,
    column: '用具所有者',
    label: '所有者',
  },
  {
    category: TransactionCategory.宿泊費,
    column: '延べ宿泊数',
    label: '延べ宿泊数',
  },
]

/** 仕訳に応じて金額を記入すべき列 */
const amountColumnOf = (category: TransactionCategory): BookColumn | null =>
  INGRESS_CATEGORIES.includes(category)
    ? '収入'
    : EGRESS_CATEGORIES.includes(category)
      ? '支出'
      : null

const rowRules: RowRule[] = [
  // 仕訳は必須
  (r) =>
    isBlank(r.get('仕訳'))
      ? { severity: 'error', message: '仕訳が記入されていません' }
      : null,

  // 仕訳は定義されたものに限る（不正な行は収支計算書に出力されない）
  (r) =>
    !isBlank(r.get('仕訳')) && r.category === null
      ? {
          severity: 'error',
          message: `仕訳「${chomp(r.get('仕訳'))}」は存在しません`,
        }
      : null,

  // 遠征総支出は宿泊費・交通費の合計であり、直接使用すると収支計算書に出力されない
  (r) =>
    r.category === TransactionCategory.遠征総支出
      ? {
          severity: 'error',
          message:
            '遠征総支出は仕訳に使用できません。宿泊費または交通費を使用してください',
        }
      : null,

  // 日付は必須
  (r) =>
    isBlank(r.get('日付'))
      ? { severity: 'error', message: '日付が記入されていません' }
      : null,

  // 内容は必須
  (r) =>
    isBlank(r.get('内容'))
      ? { severity: 'error', message: '内容が記入されていません' }
      : null,

  // 仕訳に応じた列の金額は必須
  (r) => {
    const column = r.category === null ? null : amountColumnOf(r.category)
    return column && isBlank(r.get(column))
      ? { severity: 'error', message: `${column}の金額が記入されていません` }
      : null
  },

  // 仕訳に応じた列の金額は数値として解釈できる必要がある
  (r) => {
    const column = r.category === null ? null : amountColumnOf(r.category)
    return column &&
      !isBlank(r.get(column)) &&
      !Number.isFinite(toNumber(r.get(column)))
      ? {
          severity: 'error',
          message: `${column}の金額「${chomp(r.get(column))}」を数値として解釈できません`,
        }
      : null
  },

  // 支出は領収書Noが印字されるため必須
  (r) =>
    r.category !== null &&
    r.category !== TransactionCategory.遠征総支出 &&
    EGRESS_CATEGORIES.includes(r.category) &&
    isBlank(r.get('領収書No'))
      ? { severity: 'error', message: '領収書Noが記入されていません' }
      : null,

  // 仕訳ごとに印字される欄は必須
  ...CATEGORY_COLUMNS.map(
    ({ category, column, label }): RowRule =>
      (r) =>
        r.category === category && isBlank(r.get(column))
          ? {
              severity: 'error',
              message: `${TransactionCategory[category]}の${label}が記入されていません`,
            }
          : null,
  ),
]

/** 帳簿のバリデーションを行い、問題の一覧を返す */
export const lint = (book: string[][]): Problem[] => {
  if (book.length === 0) {
    return []
  }

  const header = book[0].map(chomp)

  // 見出し行が不正な場合は各行を正しく解釈できないため、見出し行の問題のみを返す
  const missingColumns = BOOK_COLUMNS.filter((c) => !header.includes(c))
  if (missingColumns.length > 0) {
    return missingColumns.map((column) => ({
      severity: 'error',
      message: `見出し行に「${column}」の列がありません`,
      row: 1,
      context: '',
    }))
  }

  const getCell = createCellGetter(header)
  // 空行は読み飛ばす
  const rows = book.slice(1).flatMap((cells, i): LintRow[] =>
    isEmptyRow(cells)
      ? []
      : [
          {
            row: i + 2,
            get: (column) => getCell(cells, column),
            category: parseCategory(getCell(cells, '仕訳')),
          },
        ],
  )

  const problems: Problem[] = []
  for (const r of rows) {
    for (const rule of rowRules) {
      const diagnostic = rule(r)
      if (diagnostic) {
        problems.push({
          ...diagnostic,
          row: r.row,
          context: `${r.get('日付')} ${r.get('内容')}`.trim(),
        })
      }
    }
  }
  return problems
}
