
'use client'
import { useState, useRef } from 'react'
import AdBanner from '@/components/AdBanner'

export default function SizeChecker() {
  const [results, setResults] = useState(null)
  const [recommendation, setRecommendation] = useState('')
  const fileInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return

    const sizeInBytes = file.size
    const sizeInKB = (sizeInBytes / 1024).toFixed(2)
    const sizeInMB = (sizeInBytes / (1024 * 1024)).toFixed(2)

    const img = new Image()
    img.onload = () => {
      const totalPixels = img.width * img.height
      const bpp = (sizeInBytes / totalPixels).toFixed(2)

      let status, statusClass, recommendText
      
      if (sizeInKB < 100) {
        status = 'Excellent'
        statusClass = 'status-excellent'
        recommendText = `✓ Optimized! ${sizeInKB} KB`
      } else if (sizeInKB < 300) {
        status = 'Good'
        statusClass = 'status-good'
        recommendText = `Good size at ${sizeInKB} KB`
      } else if (sizeInKB < 1000) {
        status = 'Large'
        statusClass = 'status-warning'
        recommendText = `⚠ Large file at ${sizeInKB} KB. Consider compressing.`
      } else {
        status = 'Very Large'
        statusClass = 'status-danger'
        recommendText = `⚠ Very large at ${sizeInMB} MB. Will slow page loading.`
      }

      setResults({
        size: sizeInMB >= 1 ? `${sizeInMB} MB` : `${sizeInKB} KB`,
        dimensions: `${img.width} × ${img.height}`,
        format: file.type.split('/')[1].toUpperCase(),
        pixels: totalPixels >= 1000000 ? `${(totalPixels/1000000).toFixed(2)} MP` : totalPixels.toLocaleString(),
        bpp,
        status,
        statusClass
      })
      setRecommendation(recommendText)
    }
    img.src = URL.createObjectURL(file)
  }

  return (
    <main className="container">
      <h1>Image Size Checker</h1>
      <p className="intro-text">Check image file size and get compression recommendations.</p>
      <div className="tool-section">
        <div className="upload-box" onClick={() => fileInputRef.current?.click()}>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} hidden />
          <button className="btn-primary">Select Image</button>
        </div>
        
        <div style={{ margin: '30px 0', textAlign: 'center' }}>
          <AdBanner dataAdSlot="1234567897" />
        </div>
        
        {results && (
          <div className="result-section">
            <div className="result-grid">
              <div className="result-card"><div className="result-label">File Size</div><div className="result-value">{results.size}</div></div>
              <div className="result-card"><div className="result-label">Dimensions</div><div className="result-value">{results.dimensions}</div></div>
              <div className="result-card"><div className="result-label">Format</div><div className="result-value">{results.format}</div></div>
              <div className="result-card"><div className="result-label">Total Pixels</div><div className="result-value">{results.pixels}</div></div>
              <div className="result-card"><div className="result-label">Bytes per Pixel</div><div className="result-value">{results.bpp}</div></div>
              <div className="result-card"><div className="result-label">Status</div><div className={`result-value ${results.statusClass}`}>{results.status}</div></div>
            </div>
            <div className="recommendation" style={{ background: '#fef3c7', padding: '20px', borderRadius: '8px', margin: '20px 0' }}>{recommendation}</div>
          </div>
        )}
      </div>
    </main>
  )
}
