/** 全角英数を半角英数に置き換える */
export const replaceFullWidthWithHalfWidth = (str: string) => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0),
  )
}
