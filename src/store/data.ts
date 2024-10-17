import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Transaction, TransactionCategory } from '../types/transaction'
import packageJson from '../../package.json'

/** 仕訳に応じて収支のセルの値を選択し返す
 *
 * @param category 仕訳
 * @param ingressAmountStr 収入セルの値
 * @param egressAmountStr 支出セルの値
 */
const selectAmount = (
  category: TransactionCategory,
  ingressAmountStr: string,
  egressAmountStr: string,
) => {
  if (
    [
      TransactionCategory.繰越金,
      TransactionCategory.内部収入,
      TransactionCategory.外部収入,
      TransactionCategory.その他収入,
    ].includes(category)
  ) {
    return ingressAmountStr
  } else if (
    [
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
    ].includes(category)
  ) {
    return egressAmountStr
  }

  return null
}

/** 文字列の戦闘・末尾の空白文字を削除する */
const chomp = (str: string) => str.replace(/^\s+|\s+$/g, '')

/** 文字列を数値に変換する。¥記号やカンマ区切りにも対応する */
const toNumber = (str: string) =>
  +chomp(str).replace(/^¥\s*/, '').replace(/,/g, '')

export const useDataStore = defineStore('data', () => {
  const orgName = ref('')
  const title = ref('')
  const advisorName = ref('')
  const representativeName = ref('')
  const accountantName = ref('')
  const orgComment = ref('')
  const cashAmount = ref(0)
  const postalSavingsAmount = ref(0)
  const bank1Amount = ref(0)
  const bank1Name = ref('')
  const bank2Amount = ref(0)
  const bank2Name = ref('')
  const otherAmount = ref(0)

  const book = ref<string[][]>([])

  const reset = () => {
    orgName.value = ''
    title.value = ''
    advisorName.value = ''
    representativeName.value = ''
    accountantName.value = ''
    orgComment.value = ''
    cashAmount.value = 0
    postalSavingsAmount.value = 0
    bank1Amount.value = 0
    bank1Name.value = ''
    bank2Amount.value = 0
    bank2Name.value = ''
    otherAmount.value = 0
    book.value = []
  }

  const transactions = computed<Transaction[]>(() => {
    if (book.value.length === 0) {
      return []
    }

    const result: Transaction[] = []

    const header: string[] = book.value.slice(0, 1)[0].map(chomp)
    const rows = book.value.slice(1)

    for (const row of rows) {
      const category =
        TransactionCategory[
          row[header.indexOf('仕訳')] as keyof typeof TransactionCategory
        ]

      if (!category) {
        console.error('Invalid category:', row[header.indexOf('仕訳')], row)
        continue
      }

      const transaction: Transaction = {
        category,
        date: row[header.indexOf('日付')],
        description: row[header.indexOf('内容')],
        amount: toNumber(
          selectAmount(
            category,
            row[header.indexOf('収入')],
            row[header.indexOf('支出')],
          ),
        ),
        receipt: row[header.indexOf('領収書No')],
        recipient: row[header.indexOf('謝礼相手先')],
        transportPurpose: row[header.indexOf('通信運搬用途')],
        printPurpose: row[header.indexOf('印刷目的')],
        owner: row[header.indexOf('用具所有者')],
        numStay: row[header.indexOf('延べ宿泊数')],
      }

      result.push(transaction)
    }

    return result
  })

  /** 状態データを保存するための出力関数 */
  const serialize = () => ({
    version: packageJson.version,
    orgName: orgName.value,
    title: title.value,
    advisorName: advisorName.value,
    representativeName: representativeName.value,
    accountantName: accountantName.value,
    orgComment: orgComment.value,
    cashAmount: cashAmount.value,
    postalSavingsAmount: postalSavingsAmount.value,
    bank1Amount: bank1Amount.value,
    bank1Name: bank1Name.value,
    bank2Amount: bank2Amount.value,
    bank2Name: bank2Name.value,
    otherAmount: otherAmount.value,
    book: book.value,
  })

  /** 現在の状態の保存用オブジェクト */
  const serialized = computed(serialize)

  /** 保存した状態を書き戻す */
  const parse = (data: ReturnType<typeof serialize>) => {
    orgName.value = data.orgName
    title.value = data.title
    advisorName.value = data.advisorName
    representativeName.value = data.representativeName
    accountantName.value = data.accountantName
    orgComment.value = data.orgComment
    cashAmount.value = +data.cashAmount
    postalSavingsAmount.value = +data.postalSavingsAmount
    bank1Amount.value = +data.bank1Amount
    bank1Name.value = data.bank1Name
    bank2Amount.value = +data.bank2Amount
    bank2Name.value = data.bank2Name
    otherAmount.value = +data.otherAmount
    book.value = data.book.filter(
      (row) => row.length > 0 && row.some((cell) => cell.match(/\S/)),
    )
  }

  return {
    /** 団体名 */
    orgName,

    /** 収支計算書タイトル */
    title,

    /** 顧問氏名 */
    advisorName,

    /** 団体責任者氏名 */
    representativeName,

    /** 会計責任者氏名 */
    accountantName,

    /** 団体からの表紙コメント */
    orgComment,

    /** 現金の繰越残高 */
    cashAmount,

    /** 郵便貯金の繰越残高 */
    postalSavingsAmount,

    /** 繰越残高を持つ銀行1の残高 */
    bank1Amount,

    /** 繰越残高を持つ銀行1の名前 */
    bank1Name,

    /** 繰越残高を持つ銀行2の残高 */
    bank2Amount,

    /** 繰越残高を持つ銀行2の名前 */
    bank2Name,

    /** その他の繰越残高 */
    otherAmount,

    /** 入力データ（パース済みのCSV） */
    book,

    /** 仕訳済みの取引データ配列 */
    transactions,

    /** 状態を保存するためのオブジェクト */
    serialized,

    /** 保存した状態を書き戻す */
    parse,

    /** ストアを初期状態を戻す */
    reset,
  }
})
