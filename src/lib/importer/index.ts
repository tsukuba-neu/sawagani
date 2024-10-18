import type { useDataStore } from '../../store/data'
import { importCSV } from './csv'
import { importPDF } from './pdf'

export const importDataToStore = async (
  file: File,
  dataStore: ReturnType<typeof useDataStore>,
) => {
  switch (file.type) {
    case 'application/pdf':
      importPDF(file)
      break
    case 'text/csv':
      dataStore.book = await importCSV(file)
      break
    default:
      throw new Error('Unsupported file type')
  }
}
