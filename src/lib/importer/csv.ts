import { parse as parseCSV } from 'papaparse'

export const importCSV = async (file: File): Promise<string[][]> =>
  new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
      const text = e.target?.result as string
      const { data } = parseCSV<string[]>(text)
      resolve(data)
    })
    reader.readAsText(file)
  })
