export const toBase64 = (str: string): string => {
  const ta16 = new Uint16Array(str.length)
  for (let i = 0; i < ta16.length; i += 1) {
    ta16[i] = str.charCodeAt(i)
  }
  const latin1 = String.fromCodePoint(...new Uint8Array(ta16.buffer))
  return btoa(latin1)
}

export const fromBase64 = (encoded: string): string => {
  const decoded = atob(encoded)
  const ta8 = new Uint8Array(decoded.length)
  for (let i = 0; i < ta8.length; i += 1) {
    ta8[i] = decoded.charCodeAt(i)
  }
  return String.fromCodePoint(...new Uint16Array(ta8.buffer))
}
