import { TransactionCategory } from '../types/transaction'
import { BookColumn, createCellGetter, isEmptyRow, parseCategory } from './book'

export type ProblemSeverity = 'error' | 'warning'

export type Problem = {
  severity: ProblemSeverity
  message: string
  /** 帳簿上の行番号（見出し行を1行目とする）。帳簿全体に対する問題の場合はnull */
  row: number | null
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

const rowRules: RowRule[] = [
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

  const getCell = createCellGetter(book[0])
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
