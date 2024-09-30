export enum TransactionCategory {
  繰越金 = 2,
  内部収入 = 3,
  外部収入 = 4,
  その他収入 = 5,
  // 一般総支出 = 6,
  大会参加連盟加盟費 = 7,

  施設機材使用料 = 8,
  謝礼費 = 9,
  通信運搬費 = 10,
  印刷製本費 = 11,
  用具等購入費 = 12,
  書籍費 = 13,

  その他支出 = 14,
  遠征総支出 = 15,
  宿泊費 = 16,
  交通費 = 17,
}

export type TransactionCategoryIngress =
  | TransactionCategory.繰越金
  | TransactionCategory.内部収入
  | TransactionCategory.外部収入
  | TransactionCategory.その他収入

export type TransactionCategoryEgress =
  | TransactionCategory.大会参加連盟加盟費
  | TransactionCategory.施設機材使用料
  | TransactionCategory.謝礼費
  | TransactionCategory.通信運搬費
  | TransactionCategory.印刷製本費
  | TransactionCategory.用具等購入費
  | TransactionCategory.書籍費
  | TransactionCategory.その他支出
  | TransactionCategory.遠征総支出
  | TransactionCategory.宿泊費
  | TransactionCategory.交通費

export type Transaction = {
  category: TransactionCategory
  date: string
  description: string
  amount: number
  receipt: string
  recipient: string
  transportPurpose: string
  printPurpose: string
  owner: string
  numStay: string
}
