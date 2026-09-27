import { Transaction, TransactionCategory } from '../types/transaction'
import { replaceFullWidthWithHalfWidth } from './string'

/** 帳簿の見出し行に必要な列名 */
export const BOOK_COLUMNS = [
  '日付',
  '仕訳',
  '内容',
  '収入',
  '支出',
  '領収書No',
  '謝礼相手先',
  '通信運搬用途',
  '印刷目的',
  '用具所有者',
  '延べ宿泊数',
] as const

export type BookColumn = (typeof BOOK_COLUMNS)[number]

/** 収入の仕訳 */
export const INGRESS_CATEGORIES: readonly TransactionCategory[] = [
  TransactionCategory.繰越金,
  TransactionCategory.内部収入,
  TransactionCategory.外部収入,
  TransactionCategory.その他収入,
]

/** 支出の仕訳 */
export const EGRESS_CATEGORIES: readonly TransactionCategory[] = [
  TransactionCategory.大会参加連盟加盟費,
  TransactionCategory.施設機材使用料,
  TransactionCategory.謝礼費,
  TransactionCategory.通信運搬費,
  TransactionCategory.印刷製本費,
  TransactionCategory.用具等購入費,
  TransactionCategory.書籍費,
  TransactionCategory.その他支出,
  TransactionCategory.遠征総支出,
  TransactionCategory.宿泊費,
  TransactionCategory.交通費,
]

/** 文字列の先頭・末尾の空白文字を削除する */
export const chomp = (str: string) => str.replace(/^\s+|\s+$/g, '')

/** 文字列を数値に変換する。¥記号やカンマ区切りにも対応する */
export const toNumber = (str: string) =>
  +chomp(str).replace(/^¥\s*/, '').replace(/,/g, '')

/** 仕訳名を仕訳に変換する。該当する仕訳が無い場合はnullを返す */
export const parseCategory = (name: string): TransactionCategory | null => {
  // 数値のenumは逆引き（例: TransactionCategory['9'] === '謝礼費'）もできてしまうため、数値であることを確認する
  const category =
    TransactionCategory[chomp(name) as keyof typeof TransactionCategory]
  return typeof category === 'number' ? category : null
}

/** 仕訳に応じて収支のセルの値を選択し返す
 *
 * @param category 仕訳
 * @param ingressAmountStr 収入セルの値
 * @param egressAmountStr 支出セルの値
 */
export const selectAmount = (
  category: TransactionCategory,
  ingressAmountStr: string,
  egressAmountStr: string,
) => {
  if (INGRESS_CATEGORIES.includes(category)) {
    return ingressAmountStr
  } else if (EGRESS_CATEGORIES.includes(category)) {
    return egressAmountStr
  }

  return null
}

/** 見出し行から、列名でセルの値を取得する関数を作る。列が無い場合は空文字列を返す */
export const createCellGetter = (header: string[]) => {
  const names = header.map(chomp)
  return (row: string[], column: BookColumn) => {
    const index = names.indexOf(column)
    return index === -1 ? '' : (row[index] ?? '')
  }
}

/** 行が空行（すべてのセルが空白文字のみ）かどうか */
export const isEmptyRow = (row: string[]) =>
  !row.some((cell) => /\S/.test(cell))

/** 帳簿の1行を取引データに変換する。仕訳が不正な場合はnullを返す
 *
 * @param get `createCellGetter` で作成したセルの取得関数
 * @param row 帳簿の行
 */
export const parseRow = (
  get: ReturnType<typeof createCellGetter>,
  row: string[],
): Transaction | null => {
  const category = parseCategory(get(row, '仕訳'))

  if (category === null) {
    return null
  }

  return {
    category,
    date: get(row, '日付'),
    description: get(row, '内容'),
    amount: toNumber(
      selectAmount(category, get(row, '収入'), get(row, '支出')) ?? '',
    ),
    receipt: replaceFullWidthWithHalfWidth(get(row, '領収書No')),
    recipient: get(row, '謝礼相手先'),
    transportPurpose: get(row, '通信運搬用途'),
    printPurpose: get(row, '印刷目的'),
    owner: get(row, '用具所有者'),
    numStay: replaceFullWidthWithHalfWidth(get(row, '延べ宿泊数')),
  }
}
