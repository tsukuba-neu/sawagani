import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

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

  const book = ref('')

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
    cashAmount.value = data.cashAmount
    postalSavingsAmount.value = data.postalSavingsAmount
    bank1Amount.value = data.bank1Amount
    bank1Name.value = data.bank1Name
    bank2Amount.value = data.bank2Amount
    bank2Name.value = data.bank2Name
    otherAmount.value = data.otherAmount
    book.value = data.book
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

    serialized,
    parse,
  }
})
