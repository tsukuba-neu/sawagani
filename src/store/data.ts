import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { Transaction, TransactionCategory } from '../types/transaction'

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

const chomp = (str: string) => str.replace(/^\s+|\s+$/g, '')
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
  const transactions = computed<Transaction[]>(() => {
    if (book.value.length === 0) {
      return []
    }

    const result: Transaction[] = []

    const [header] = book.value.slice(0, 1)
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

  const serialize = () => ({
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
  const serialized = computed(serialize)

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
    orgName,
    title,
    advisorName,
    representativeName,
    accountantName,
    orgComment,
    cashAmount,
    postalSavingsAmount,
    bank1Amount,
    bank1Name,
    bank2Amount,
    bank2Name,
    otherAmount,
    book,
    transactions,

    serialized,
    parse,
  }
})
