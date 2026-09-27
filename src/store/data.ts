import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Transaction } from '../types/transaction'
import packageJson from '../../package.json'
import { parse as parseCSV } from 'papaparse'
import { serialize } from '../lib/serialization'
import { removeTrailingEmptyRows } from '../lib/array'
import { createCellGetter, isEmptyRow, parseRow } from '../lib/book'
import { lint, Problem } from '../lib/lint'

export type SerializedData = {
  version: string
  orgName: string
  title: string
  advisorName: string
  representativeName: string
  accountantName: string
  orgComment: string
  cashAmount: number
  postalSavingsAmount: number
  bank1Amount: number
  bank1Name: string
  bank2Amount: number
  bank2Name: string
  otherAmount: number
  book: string[][]
}

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

    const get = createCellGetter(book.value[0])

    for (const row of book.value.slice(1)) {
      if (isEmptyRow(row)) {
        continue
      }

      const transaction = parseRow(get, row)

      if (!transaction) {
        console.error('Invalid category:', get(row, '仕訳'), row)
        continue
      }

      result.push(transaction)
    }

    return result
  })

  const problems = computed<Problem[]>(() => lint(book.value))

  /** 状態データを保存するための出力関数 */
  const toJSON = (): SerializedData => ({
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
  const serialized = computed(toJSON)

  /** シリアライズ済み文字列（キャッシュ用） */
  const serializedString = computed(() => serialize(serialized.value))

  /** 保存した状態を書き戻す */
  const parse = (data: SerializedData) => {
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
    // 行番号が帳簿と一致するよう、途中の空行は残す
    book.value = removeTrailingEmptyRows(data.book)
  }

  const importCSVString = (csvString: string) => {
    const { data } = parseCSV<string[]>(csvString)
    book.value = removeTrailingEmptyRows(data)
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

    /** 帳簿に対するバリデーションの問題一覧 */
    problems,

    /** 状態を保存するためのオブジェクト */
    serialized,

    /** シリアライズ済み文字列（キャッシュ用） */
    serializedString,

    /** 保存した状態を書き戻す */
    parse,

    /** ストアを初期状態を戻す */
    reset,

    /** CSV文字列をパースしてbookに設定する */
    importCSVString,
  }
})
