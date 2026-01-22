
'use client'
import { useState, useRef } from 'react'

// SEO handled by root layout

function extractDPI(arrayBuffer, mimeType) {
  const view = new DataView(arrayBuffer)
  
  if (mimeType === 'image/jpeg') {
    let offset = 2
    while (offset < view.byteLength) {
      if (view.getUint8(offset) !== 0xFF) break
      const marker = view.getUint8(offset + 1)
      const size = view.getUint16(offset + 2)
      
      if (marker === 0xE0) {
        const densityUnit = view.getUint8(offset + 11)
        const xDensity = view.getUint16(offset + 12)
        const yDensity = view.getUint16(offset + 14)
        
        if (densityUnit === 1) return { x: xDensity, y: yDensity }
        if (densityUnit === 2) return { x: Math.round(xDensity * 2.54), y: Math.round(yDensity * 2.54) }
      }
      offset += 2 + size
    }
  } else if (mimeType === 'image/png') {
    let offset = 8
    while (offset < view.byteLength) {
      const length = view.getUint32(offset)
      const type = String.fromCharCode(...Array.from({length: 4}, (_, i) => view.getUint8(offset + 4 + i)))
      
      if (type === 'pHYs') {
        const xPixelsPerUnit = view.getUint32(offset + 8)
        const yPixelsPerUnit = view.getUint32(offset + 12)
        const unit = view.getUint8(offset + 16)
        
        if (unit === 1) {
          return {
            x: Math.round(xPixelsPerUnit / 39.3701),
            y: Math.round(yPixelsPerUnit / 39.3701)
          }
        }
      }
      offset += 12 + length
    }
  }
  return null
}

export default function DPIChecker() {
  const [results, setResults] = useState(null)
  const [dpiNote, setDpiNote] = useState('')
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file.')
      return
    }

    const format = file.type.split('/')[1].toUpperCase()
    const sizeInBytes = file.size
    const sizeInKB = (sizeInBytes / 1024).toFixed(2)
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2)

    const img = new Image()
    img.onload = () => {
      const width = img.width
      const height = img.height

      const reader = new FileReader()
      reader.onload = (event) => {
        const arrayBuffer = event.target.result
        const dpi = extractDPI(arrayBuffer, file.type)

        let dpiX, dpiY, note
        
        if (dpi) {
          dpiX = dpi.x
          dpiY = dpi.y

          if (dpiX === 72 || dpiX === 96) {
            note = `<strong>Note:</strong> Standard screen DPI (${dpiX}). Print size at 300 DPI: ${(width/300).toFixed(2)}" × ${(height/300).toFixed(2)}"`
          } else if (dpiX >= 300) {
            note = `<strong>Print Ready:</strong> High DPI suitable for printing. Print size: ${(width/dpiX).toFixed(2)}" × ${(height/dpiY).toFixed(2)}"`
          } else {
            note = `<strong>Note:</strong> For best print quality, 300 DPI is recommended. Current print size: ${(width/dpiX).toFixed(2)}" × ${(height/dpiY).toFixed(2)}"`
          }
        } else {
          dpiX = 72
          dpiY = 72
          note = `<strong>DPI Not Found:</strong> Image doesn't contain DPI metadata. For printing at 300 DPI: ${(width/300).toFixed(2)}" × ${(height/300).toFixed(2)}"`
        }

        setResults({
          width: `${width} px`,
          height: `${height} px`,
          dpiX: `${dpiX} DPI`,
          dpiY: `${dpiY} DPI`,
          size: sizeInMB >= 1 ? `${sizeInMB} MB` : `${sizeInKB} KB`,
          format
        })
        setDpiNote(note)
      }
      reader.readAsArrayBuffer(file)
    }
    img.src = URL.createObjectURL(file)
  }

  const resetTool = () => {
    setResults(null)
    setDpiNote('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <main className="container">
      <h1>Image DPI Checker</h1>
      <p className="intro-text">Check your image DPI (dots per inch) and resolution instantly. All processed privately in your browser.</p>

      <div className="tool-section">
        <div className="upload-box" onClick={() => fileInputRef.current?.click()}>
          <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <h3>Click to upload or drag & drop</h3>
          <p>Supports JPG, PNG, GIF, BMP, WebP</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} hidden />
          <button className="btn-primary">Select Image</button>
        </div>

        {results && (
          <div className="result-section">
            <h2>Image Information</h2>
            <div className="result-grid">
              <div className="result-card"><div className="result-label">Width</div><div className="result-value">{results.width}</div></div>
              <div className="result-card"><div className="result-label">Height</div><div className="result-value">{results.height}</div></div>
              <div className="result-card"><div className="result-label">DPI (Horizontal)</div><div className="result-value">{results.dpiX}</div></div>
              <div className="result-card"><div className="result-label">DPI (Vertical)</div><div className="result-value">{results.dpiY}</div></div>
              <div className="result-card"><div className="result-label">File Size</div><div className="result-value">{results.size}</div></div>
              <div className="result-card"><div className="result-label">Format</div><div className="result-value">{results.format}</div></div>
            </div>
            {dpiNote && <div className="dpi-note" dangerouslySetInnerHTML={{ __html: dpiNote }} style={{ background: '#fef3c7', border: '2px solid #fbbf24', padding: '20px', borderRadius: '8px', margin: '20px 0' }} />}
            <button className="btn-secondary" onClick={resetTool}>Check Another Image</button>
          </div>
        )}
      </div>

      <div className="info-section">
        <h2>About This Tool</h2>
        <p>The Image DPI Checker helps you instantly check the DPI resolution of any image file.</p>
        <h3>Common DPI Standards</h3>
        <ul>
          <li><strong>72 DPI</strong> - Standard for web and screen display</li>
          <li><strong>150 DPI</strong> - Minimum for acceptable printing</li>
          <li><strong>300 DPI</strong> - Professional print quality</li>
          <li><strong>600+ DPI</strong> - High-end printing</li>
        </ul>
      </div>
    </main>
  )
}
