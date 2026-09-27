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
import { replaceFullWidthWithHalfWidth } from './string'

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
  /** 仕訳に応じて金額を記入すべき列。仕訳が不正な場合はnull */
  amountColumn: '収入' | '支出' | null
}

type Diagnostic = Pick<Problem, 'severity' | 'message'>

/** 帳簿の1行に対するルール */
type RowRule = (row: LintRow) => Diagnostic | null

/** 複数の行にまたがるルール */
type BookRule = (rows: LintRow[]) => (Diagnostic & { at: LintRow })[]

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
const amountColumnOf = (
  category: TransactionCategory | null,
): LintRow['amountColumn'] =>
  category === null
    ? null
    : INGRESS_CATEGORIES.includes(category)
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
    const column = r.amountColumn
    return column && isBlank(r.get(column))
      ? { severity: 'error', message: `${column}の金額が記入されていません` }
      : null
  },

  // 仕訳に応じた列の金額は数値として解釈できる必要がある
  (r) => {
    const column = r.amountColumn
    return column &&
      !isBlank(r.get(column)) &&
      !Number.isFinite(toNumber(r.get(column)))
      ? {
          severity: 'error',
          message: `${column}の金額「${chomp(r.get(column))}」を数値として解釈できません`,
        }
      : null
  },

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

  // 仕訳と反対の列に記入された金額は使用されない
  (r) => {
    const column = r.amountColumn
    const otherColumn =
      column === '収入' ? '支出' : column === '支出' ? '収入' : null
    return otherColumn && !isBlank(r.get(otherColumn))
      ? {
          severity: 'warning',
          message: `${otherColumn}の列に金額が記入されていますが、仕訳が${column}のため使用されません`,
        }
      : null
  },

  // 金額が0以下
  (r) => {
    const column = r.amountColumn
    if (!column || isBlank(r.get(column))) {
      return null
    }
    const amount = toNumber(r.get(column))
    return Number.isFinite(amount) && amount <= 0
      ? { severity: 'warning', message: `${column}の金額が0以下です` }
      : null
  },

  // 支出の領収書Noは印字されるが、領収書の紛失や会計間の繰入などで無い場合もある
  (r) =>
    r.category !== null &&
    r.category !== TransactionCategory.遠征総支出 &&
    EGRESS_CATEGORIES.includes(r.category) &&
    isBlank(r.get('領収書No'))
      ? { severity: 'warning', message: '領収書Noが記入されていません' }
      : null,

  // 延べ宿泊数は正の整数
  (r) => {
    const numStay = chomp(replaceFullWidthWithHalfWidth(r.get('延べ宿泊数')))
    return r.category === TransactionCategory.宿泊費 &&
      numStay !== '' &&
      !/^[1-9]\d*$/.test(numStay)
      ? {
          severity: 'warning',
          message: `延べ宿泊数「${numStay}」が正の整数ではありません`,
        }
      : null
  },

  // 仕訳ごとの欄が他の仕訳の行に記入されている場合、仕訳の誤りの可能性がある
  ...CATEGORY_COLUMNS.map(
    ({ category, column }): RowRule =>
      (r) =>
        r.category !== null &&
        r.category !== category &&
        !isBlank(r.get(column))
          ? {
              severity: 'warning',
              message: `${column}が記入されていますが、仕訳が${TransactionCategory[category]}ではありません`,
            }
          : null,
  ),

  // 日付は収支計算書で月日を表示できる形式（YYYY/MM/DD、YYYY-MM-DD、MMDD）
  (r) => {
    const date = chomp(r.get('日付'))
    return date !== '' &&
      !/(\d{4})[/-](\d{1,2})[/-](\d{1,2})/.test(date) &&
      !/^\d{1,4}$/.test(date)
      ? {
          severity: 'warning',
          message: `日付「${date}」を月日として解釈できません`,
        }
      : null
  },
]

const bookRules: BookRule[] = [
  // 支出の領収書Noの重複
  (rows) => {
    const egressRows = rows.filter(
      (r) =>
        r.category !== null &&
        EGRESS_CATEGORIES.includes(r.category) &&
        !isBlank(r.get('領収書No')),
    )
    const receiptOf = (r: LintRow) =>
      chomp(replaceFullWidthWithHalfWidth(r.get('領収書No')))
    return egressRows
      .filter((r) =>
        egressRows.some(
          (other) => other !== r && receiptOf(other) === receiptOf(r),
        ),
      )
      .map((r) => ({
        severity: 'warning',
        message: `領収書No「${receiptOf(r)}」が他の行と重複しています`,
        at: r,
      }))
  },
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
  const rows = book.slice(1).flatMap((cells, i): LintRow[] => {
    if (isEmptyRow(cells)) {
      return []
    }
    const category = parseCategory(getCell(cells, '仕訳'))
    return [
      {
        row: i + 2,
        get: (column) => getCell(cells, column),
        category,
        amountColumn: amountColumnOf(category),
      },
    ]
  })

  const toProblem = (diagnostic: Diagnostic, r: LintRow): Problem => ({
    ...diagnostic,
    row: r.row,
    context: `${r.get('日付')} ${r.get('内容')}`.trim(),
  })

  const problems: Problem[] = []
  for (const r of rows) {
    for (const rule of rowRules) {
      const diagnostic = rule(r)
      if (diagnostic) {
        problems.push(toProblem(diagnostic, r))
      }
    }
  }
  for (const rule of bookRules) {
    for (const { at, ...diagnostic } of rule(rows)) {
      problems.push(toProblem(diagnostic, at))
    }
  }

  // 行番号順に並べ、同じ行ではerrorを先に表示する
  return problems.sort(
    (a, b) =>
      a.row - b.row ||
      +(a.severity === 'warning') - +(b.severity === 'warning'),
  )
}
