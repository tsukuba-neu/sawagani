import { unparse } from 'papaparse'
import type { SerializedData } from '../store/data'

const downloadBlob = (blob: Blob, fileName: string) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  a.remove()
  // 即時に破棄するとダウンロードが開始されない場合があるため遅延させる
  setTimeout(() => URL.revokeObjectURL(url), 0)
}

const sanitizeFileName = (name: string) => name.replace(/[\\/:*?"<>|]/g, '_')

const baseFileName = (data: SerializedData) =>
  sanitizeFileName(data.title || data.orgName || 'sawagani')

/** 状態データをJSONファイルとしてダウンロードさせる */
export const exportJSON = (data: SerializedData) =>
  downloadBlob(
    new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }),
    `${baseFileName(data)}.json`,
  )

/** 帳簿データをCSVファイルとしてダウンロードさせる */
export const exportCSV = (data: SerializedData) =>
  downloadBlob(
    // Excelで文字化けしないようBOMを付与する
    new Blob(['﻿', unparse(data.book)], { type: 'text/csv' }),
    `${baseFileName(data)}.csv`,
  )

/** 帳簿データを表計算ソフトに貼り付けられるTSV形式でクリップボードにコピーする */
export const exportToClipboard = (data: SerializedData) =>
  navigator.clipboard.writeText(unparse(data.book, { delimiter: '\t' }))
