import pdfiumWasmUrl from '@hyzyla/pdfium/pdfium.wasm?url'
import QrScanner from 'qr-scanner'
import { deserialize } from '../serialization'
import { SerializedData } from '../../store/data'

const loadPdfium = async () =>
  import('@hyzyla/pdfium').then((pdfium) =>
    pdfium.PDFiumLibrary.init({
      wasmUrl: pdfiumWasmUrl,
    }),
  )

export const importPDF = async (file: File) => {
  const [pdfiumLibrary] = await Promise.all([loadPdfium()])

  const qrEngine = QrScanner.createQrEngine()
  const canvasForQrScanner = document.createElement('canvas')

  const reader = new FileReader()
  const buffer = await new Promise<ArrayBuffer>((resolve, reject) => {
    reader.addEventListener('load', async (e) => {
      resolve(e.target?.result as ArrayBuffer)
    })
    reader.addEventListener('error', (e) => {
      reject(e)
    })
    reader.readAsArrayBuffer(file)
  })

  const doc = await pdfiumLibrary.loadDocument(new Uint8Array(buffer))

  const codeContents: string[] = []
  let totalCodesExpected = 0,
    totalCodesFound = 0

  pageLoop: for (let i = doc.getPageCount() - 1; i >= 0; i--) {
    const page = doc.getPage(i)
    const image = await page.render({
      render: 'bitmap',
      scale: 2, // magic number
    })
    const imageData = new ImageData(
      new Uint8ClampedArray(image.data),
      image.width,
      image.height,
    )

    const areas = getContentGrid(imageData)

    for (const area of areas) {
      try {
        const result = await QrScanner.scanImage(
          createCanvasFromImageData(imageData),
          {
            scanRegion: {
              x: area.x,
              y: area.y,
              width: area.width,
              height: area.height,
            },
            qrEngine,
            canvas: canvasForQrScanner,
          },
        )
        console.log('QRコードを検出しました', result)

        const regexResult = /^swgn (\d+)\/(\d+) (.+)$/.exec(result.data)
        if (regexResult) {
          const index = parseInt(regexResult[1], 10)
          const total = parseInt(regexResult[2], 10)
          const content = regexResult[3]
          console.log(`コード ${index}/${total} を検出しました`, content)
          // 配列のインデックスに合わせるために-1する
          if (totalCodesExpected === 0 || totalCodesExpected === total) {
            codeContents[index - 1] = content
            totalCodesExpected = total
            totalCodesFound++
          } else {
            throw new Error(
              'ページ総数が異なるコードが読み取られました。異なるドキュメントのコードが誤って記載されている可能性があります',
            )
          }
        } else {
          console.log(
            'QRコードの内容は予期するものと異なりました。スキップします。',
            result.data,
          )
        }

        const allCodesDetected =
          totalCodesExpected > 0 && totalCodesExpected === totalCodesFound
        if (allCodesDetected) {
          console.log('すべてのコードを検出しました')
          break pageLoop
        }
      } catch {
        // QRコードが見つからなかった場合などはエラーになる
        console.log('このチャンクからはQRコードが検出されませんでした')
      }
    }
  }

  doc.destroy()

  if (totalCodesExpected === 0) {
    throw new Error('QRコードが見つかりませんでした')
  }
  if (codeContents.some((content) => typeof content === 'undefined')) {
    throw new Error('QRコードの一部が見つかりませんでした')
  }

  console.log('コードの内容:', codeContents.join(''))
  const result = deserialize<SerializedData>(
    decodeURIComponent(codeContents.join('')),
  )
  return result
}

type GridArea = { x: number; y: number; width: number; height: number }

/**
 * 画像データを黒い部分に応じて縦横のグリッドで分割する
 * @param data
 * @param bufferSize 検出に使う縮小画像のサイズ
 * @returns グリッド領域の配列
 */
function getContentGrid(
  data: ImageData,
  bufferSize = 64,
  threshold = 200,
): GridArea[] {
  /** 縮小画像1pxに対応する幅 */
  const chunkWidth = Math.floor(data.width / bufferSize)

  /** 縮小画像1pxに対応する高さ */
  const chunkHeight = Math.floor(data.height / bufferSize)

  // 縮小するときに1px以下になる場合
  if (chunkWidth < 1 || chunkHeight < 1) {
    console.error(data, chunkWidth, chunkHeight)
    throw new Error('入力された画像は小さすぎます')
  }

  // Y軸方向に帯状に黒い部分を検出
  const areasY = getContentBandAreas(data, bufferSize, threshold, 'y').map(
    ({ pos, size }) => ({
      y: pos,
      height: size,
    }),
  )
  // X軸方向に帯状に黒い部分を検出
  const areasX = getContentBandAreas(data, bufferSize, threshold, 'x').map(
    ({ pos, size }) => ({
      x: pos,
      width: size,
    }),
  )

  const areas: GridArea[] = []

  // 縦横の帯状の交差部分をグリッド領域として抽出
  areasY.forEach(({ y, height }) => {
    areasX.forEach(({ x, width }) => {
      areas.push({
        x,
        y,
        width,
        height,
      })
    })
  })
  return areas
}

/**
 * 縦横いずれかの方向で帯状に黒い部分を検出する
 * @param data
 * @param bufferSize 縮小画像のサイズ
 * @param threshold 黒を検知する輝度の閾値
 * @param direction 走査方向
 * @returns
 */
function getContentBandAreas(
  data: ImageData,
  bufferSize: number,
  threshold: number,
  direction: 'x' | 'y',
): { pos: number; size: number }[] {
  /** 縮小画像1pxに対応する幅 */
  const chunkWidth = Math.floor(data.width / bufferSize)
  /** 縮小画像1pxに対応する高さ */
  const chunkHeight = Math.floor(data.height / bufferSize)

  const areas: { pos: number; size: number }[] = []
  const chunkSize = direction === 'x' ? chunkWidth : chunkHeight
  /** 直前に白い部分が出現した開始位置 */
  let whiteStarts = 0,
    /** 直前の分割位置 */
    prevBoundary = 0,
    /** 直前の白黒の検出結果 */
    prevHasBlack = false

  for (let i = 0; i < bufferSize; i++) {
    /** 走査中の列に黒が含まれるかどうか */
    let hasBlack = false
    for (let j = 0; j < bufferSize; j++) {
      let x: number, y: number
      switch (direction) {
        case 'x':
          x = i
          y = j
          break
        case 'y':
          x = j
          y = i
          break
      }

      // 走査する列に黒があるかどうかを調べる
      // Note: OffscreenCanvasで縮小して計算すると、縮小後のピクセルは元のピクセルの平均値ではなく、間引きされた値になる。これを避けるため、平均輝度を求める関数は独自に実装したものを用いる
      const brightness = getBrightnessFromImageData(
        data,
        x * chunkWidth,
        y * chunkHeight,
        chunkWidth,
        chunkHeight,
      )
      // 1pxでも閾値以下の輝度があれば黒があるとみなし、この列の走査を終了する
      if (brightness < threshold) {
        hasBlack = true
        break
      }
    }

    // 白と黒の境界において
    if (hasBlack !== prevHasBlack) {
      // 白→黒の位置
      if (hasBlack) {
        /*
          白の領域の中央に境界位置を設定する。
          次に追加する領域の終了位置はここまで出現した白の領域の中央に、開始位置はひとつ前の境界位置となる
          ⚪️⚪️⚪️⚫️⚫️⚫️⚪️⚪️⚪️⚫️
            ↑         ↑  ↑
            |         |  走査中の位置
            |         領域の終了位置
            領域の開始位置（=直前の領域の終了位置）
        */
        const boundary = (whiteStarts + i) / 2
        const prevSize = boundary - prevBoundary
        if (prevSize > 0) {
          areas.push({
            pos: prevBoundary * chunkSize,
            size: prevSize * chunkSize,
          })
        }
        prevBoundary = boundary
      }
      // 黒→白の位置
      else {
        whiteStarts = i
      }
    }
    // 白黒の判定結果を保存
    prevHasBlack = hasBlack
  }

  // 終端が白の領域の場合、最後に残った領域を追加する
  if (!prevHasBlack) {
    const boundary = (whiteStarts + bufferSize) / 2
    const prevSize = boundary - prevBoundary
    if (prevSize > 0) {
      areas.push({ pos: prevBoundary * chunkSize, size: prevSize * chunkSize })
    }
  }
  return areas
}

/**
 * 画像の指定範囲の平均輝度を取得する
 * @param data
 * @param x
 * @param y
 * @param windowWidth
 * @param windowHeight
 * @returns
 */
function getBrightnessFromImageData(
  data: ImageData,
  x: number,
  y: number,
  windowWidth: number,
  windowHeight: number,
): number {
  windowWidth = Math.floor(windowWidth)
  windowHeight = Math.floor(windowHeight)
  if (windowWidth < 1 || windowHeight < 1) return 255
  const { width, height } = data
  let total = 0
  for (let dy = 0; dy < windowHeight; dy++) {
    for (let dx = 0; dx < windowWidth; dx++) {
      const px = x + dx
      const py = y + dy
      if (px >= width || py >= height) continue
      const index = (py * width + px) * 4
      const r = data.data[index + 0]
      const g = data.data[index + 1]
      const b = data.data[index + 2]
      total += (r + g + b) / 3
    }
  }
  return total / (windowWidth * windowHeight) || 255
}

function createCanvasFromImageData(imageData: ImageData): OffscreenCanvas {
  const canvas = new OffscreenCanvas(imageData.width, imageData.height)
  const ctx = canvas.getContext('2d')
  ctx.putImageData(imageData, 0, 0)
  return canvas
}
