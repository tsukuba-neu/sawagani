/**
 * 配列の末尾から空行を除去する
 * 空行とは、長さが0の配列、またはすべてのセルが空白文字のみの行を指す
 *
 * @param rows 2次元配列（CSV行データ）
 * @returns 末尾の空行を除去した配列
 */
export const removeTrailingEmptyRows = (rows: string[][]): string[][] => {
  // 末尾から空行を探す
  let lastNonEmptyIndex = rows.length - 1

  while (lastNonEmptyIndex >= 0) {
    const row = rows[lastNonEmptyIndex]
    // 行が空でない（長さが0でなく、かつ空白でないセルが存在する）場合は終了
    if (row.length > 0 && row.some((cell) => cell.match(/\S/))) {
      break
    }
    lastNonEmptyIndex--
  }

  // 空行以外の部分を返す
  return rows.slice(0, lastNonEmptyIndex + 1)
}
