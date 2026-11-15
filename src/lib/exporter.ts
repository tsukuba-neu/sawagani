import type { SerializedData } from '../store/data'

/** 状態データをJSONファイルとしてダウンロードさせる */
export const exportJSON = (data: SerializedData) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${sanitizeFileName(data.title || data.orgName || 'sawagani')}.json`
  document.body.appendChild(a)
  a.click()
  a.remove()
  // 即時に破棄するとダウンロードが開始されない場合があるため遅延させる
  setTimeout(() => URL.revokeObjectURL(url), 0)
}

const sanitizeFileName = (name: string) => name.replace(/[\\/:*?"<>|]/g, '_')
