import type { useDataStore } from '../../store/data'
import { importCSV } from './csv'
import { importPDF } from './pdf'
import { importJSON } from './json'

export const importDataToStore = async (
  file: File,
  dataStore: ReturnType<typeof useDataStore>,
) => {
  // OSによってはJSONのMIMEタイプが設定されないため拡張子でも判定する
  const type =
    file.type ||
    (file.name.toLowerCase().endsWith('.json') ? 'application/json' : '')
  switch (type) {
    case 'application/pdf':
      dataStore.parse(await importPDF(file))
      break
    case 'text/csv':
      dataStore.book = await importCSV(file)
      break
    case 'application/json':
      dataStore.parse(await importJSON(file))
      break
    default:
      throw new Error('Unsupported file type')
  }
}
