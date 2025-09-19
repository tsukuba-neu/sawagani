import JSONCrush from 'jsoncrush'
import { fromBase64 } from './base64'

export const serialize = (data: Parameters<typeof JSON.stringify>): string => {
  const jsonString = JSON.stringify(data)
  return JSONCrush.crush(jsonString)
}

export const deserialize = <T>(serialized: string): T => {
  try {
    const jsonString = JSONCrush.uncrush(serialized)
    return JSON.parse(jsonString)
  } catch (e) {
    try {
      const jsonString = fromBase64(serialized)
      return JSON.parse(jsonString)
    } catch (fallbackError) {
      console.error('逆シリアライズに失敗しました', e, fallbackError)
      throw new Error('逆シリアライズできないデータが渡されました')
    }
  }
}
