import pdfiumWasmUrl from '@hyzyla/pdfium/pdfium.wasm?url'
import QrScanner from 'qr-scanner'

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
  reader.addEventListener('load', async (e) => {
    const buffer = e.target?.result as ArrayBuffer
    const doc = await pdfiumLibrary.loadDocument(new Uint8Array(buffer))

    const tasks: Promise<QrScanner.ScanResult>[] = []

    for (let i = doc.getPageCount() - 1; i >= 0; i--) {
      const page = doc.getPage(i)
      const image = await page.render({
        render: 'bitmap',
        scale: 2, // magic number
      })

      const imgData = new Uint8ClampedArray(image.data)

      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
      ctx.putImageData(new ImageData(imgData, image.width, image.height), 0, 0)
      const img = new Image()
      img.src = URL.createObjectURL(
        await new Promise<Blob>((resolve) => canvas.toBlob(resolve)),
      )
      img.width = 400
      document.body.appendChild(img)

      tasks.push(
        QrScanner.scanImage(canvas, {
          qrEngine,
          canvas: canvasForQrScanner,
        }),
      )
    }

    const results = await Promise.any(tasks)
    console.log(results)
    doc.destroy()
  })
  reader.readAsArrayBuffer(file)
}
