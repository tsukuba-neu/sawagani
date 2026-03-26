import { Transaction, TransactionCategory } from '../types/transaction'

export type ProblemSeverity = 'error' | 'warning'

export type Problem = {
  severity: ProblemSeverity
  message: string
  transaction: Transaction
}

type LintRule = (transaction: Transaction) => Problem | null

const rules: LintRule[] = [
  // 謝礼費: 相手先 (recipient) は必須
  (t) =>
    t.category === TransactionCategory.謝礼費 && !t.recipient?.trim()
      ? {
          severity: 'error',
          message: '謝礼費の相手先が記入されていません',
          transaction: t,
        }
      : null,

  // 用具等購入費: 所有者 (owner) は必須
  (t) =>
    t.category === TransactionCategory.用具等購入費 && !t.owner?.trim()
      ? {
          severity: 'error',
          message: '用具等購入費の所有者が記入されていません',
          transaction: t,
        }
      : null,

  // 通信運搬費: 用途 (transportPurpose) は必須
  (t) =>
    t.category === TransactionCategory.通信運搬費 && !t.transportPurpose?.trim()
      ? {
          severity: 'warning',
          message: '通信運搬費の用途が記入されていません',
          transaction: t,
        }
      : null,

  // 印刷製本費: 目的 (printPurpose) は必須
  (t) =>
    t.category === TransactionCategory.印刷製本費 && !t.printPurpose?.trim()
      ? {
          severity: 'warning',
          message: '印刷製本費の目的が記入されていません',
          transaction: t,
        }
      : null,

  // 宿泊費: 延べ宿泊数 (numStay) は必須
  (t) =>
    t.category === TransactionCategory.宿泊費 && !t.numStay?.trim()
      ? {
          severity: 'warning',
          message: '宿泊費の延べ宿泊数が記入されていません',
          transaction: t,
        }
      : null,
]

export const lint = (transactions: Transaction[]): Problem[] => {
  const problems: Problem[] = []
  for (const transaction of transactions) {
    for (const rule of rules) {
      const problem = rule(transaction)
      if (problem) problems.push(problem)
    }
  }
  return problems
}
