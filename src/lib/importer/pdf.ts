import pdfiumWasmUrl from '@hyzyla/pdfium/pdfium.wasm?url'
import { BrowserQRCodeReader } from '@zxing/browser'

const loadPdfium = async () =>
  import('@hyzyla/pdfium').then((pdfium) =>
    pdfium.PDFiumLibrary.init({
      wasmUrl: pdfiumWasmUrl,
    }),
  )

export const importPDF = async (file: File) => {
  const [pdfiumLibrary] = await Promise.all([loadPdfium()])

  const reader = new FileReader()
  reader.addEventListener('load', async (e) => {
    const qrCanvas = document.createElement('canvas')

    const buffer = e.target?.result as ArrayBuffer
    const doc = await pdfiumLibrary.loadDocument(new Uint8Array(buffer))
    const results: string[] = []
    for (let i = doc.getPageCount() - 1; i >= 0; i--) {
      const page = doc.getPage(i)
      const image = await page.render({
        render: 'bitmap',
        scale: 2, // magic number
      })

      const imgData = new Uint8ClampedArray(image.data)
      // console.log(image.data)
      // for (let i = 0; i < image.data.length; i += 4) {
      //   const r = image.data[i + 0],
      //     g = image.data[i + 1],
      //     b = image.data[i + 2],
      //     a = image.data[i + 3]
      //   if (a > 0) {
      //     imgData[i + 0] = r
      //     imgData[i + 1] = g
      //     imgData[i + 2] = b
      //     imgData[i + 3] = a
      //   } else {
      //     imgData[i + 0] = 255
      //     imgData[i + 1] = 255
      //     imgData[i + 2] = 255
      //     imgData[i + 3] = 255
      //   }
      // }

      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
      ctx.putImageData(new ImageData(imgData, image.width, image.height), 0, 0)

      const codeReader = new BrowserQRCodeReader()

      while (true) {
        console.log('scannillng')
        const img = new Image()
        img.src = URL.createObjectURL(
          await new Promise<Blob>((resolve) => canvas.toBlob(resolve)),
        )
        img.width = 400
        document.body.appendChild(img)
        try {
          const result = codeReader.decodeFromCanvas(canvas)
          results.push(result.getText())

          let xmin = Infinity,
            ymin = Infinity,
            xmax = -Infinity,
            ymax = -Infinity
          const points = result.getResultPoints()
          for (const point of points) {
            xmin = Math.min(xmin, point.getX())
            ymin = Math.min(ymin, point.getY())
            xmax = Math.max(xmax, point.getX())
            ymax = Math.max(ymax, point.getY())
          }
          // const result = await qrScanner.scanImage(canvas, {
          //   returnDetailedScanResult: true,
          //   qrEngine,
          //   canvas: qrCanvas,
          // })
          // console.log(result.data)
          // results.push(result.data)
          // const bounding = result.cornerPoints
          ctx.clearRect(
            Math.floor(xmin),
            Math.floor(ymin),
            Math.ceil(xmax - xmin),
            Math.ceil(ymax - ymin),
          )

          // qr-scannerが使ったあとのcanvasがクリアされないバグがある気がする
          qrCanvas
            .getContext('2d')
            ?.clearRect(0, 0, qrCanvas.width, qrCanvas.height)
        } catch (e) {
          console.error(e, e.code, e.message)
          break
        }
      }
    }
    console.log('done')
    if (results.length > 0) {
      alert(results.join('\n'))
    } else {
      alert('Zero results')
    }
    doc.destroy()
  })
  reader.readAsArrayBuffer(file)
}
