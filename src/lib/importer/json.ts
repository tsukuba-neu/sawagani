import type { SerializedData } from '../../store/data'

/** sawaganiからエクスポートされたJSON文字列をパースする */
export const parseJSONString = (text: string): SerializedData => {
  let data: unknown
  try {
    data = JSON.parse(text)
  } catch (e) {
    throw new Error('JSONとして読み込めないデータです', { cause: e })
  }
  if (!isSerializedData(data)) {
    throw new Error('sawaganiから出力されたJSONファイルではありません')
  }
  return data
}

export const importJSON = async (file: File): Promise<SerializedData> =>
  parseJSONString(await file.text())

const isSerializedData = (data: unknown): data is SerializedData =>
  typeof data === 'object' &&
  data !== null &&
  'version' in data &&
  'book' in data &&
  Array.isArray((data as { book: unknown }).book)
