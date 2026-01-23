'use client'
import { useState, useRef, useEffect } from 'react'

export default function AspectRatio() {
  const [currentWidth, setCurrentWidth] = useState('')
  const [currentHeight, setCurrentHeight] = useState('')
  const [newWidth, setNewWidth] = useState('')
  const [newHeight, setNewHeight] = useState('')
  const [aspectRatio, setAspectRatio] = useState(0)
  const [results, setResults] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    const w = parseFloat(currentWidth)
    const h = parseFloat(currentHeight)
    if (w > 0 && h > 0) {
      setAspectRatio(w / h)
    } else {
      setAspectRatio(0)
      setResults(null)
    }
  }, [currentWidth, currentHeight])

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) {
      setUploadStatus('Please select a valid image file.')
      return
    }

    const img = new Image()
    img.onload = () => {
      setCurrentWidth(img.width.toString())
      setCurrentHeight(img.height.toString())
      setUploadStatus(`✓ Image loaded: ${img.width} × ${img.height} pixels`)
      URL.revokeObjectURL(img.src)
    }
    img.src = URL.createObjectURL(file)
  }

  const handleNewWidthChange = (e) => {
    const value = e.target.value
    setNewWidth(value)
    setNewHeight('')
    
    const val = parseFloat(value)
    if (val > 0 && aspectRatio > 0) {
      const height = Math.round(val / aspectRatio)
      setResults({ width: Math.round(val), height })
    } else {
      setResults(null)
    }
  }

  const handleNewHeightChange = (e) => {
    const value = e.target.value
    setNewHeight(value)
    setNewWidth('')
    
    const val = parseFloat(value)
    if (val > 0 && aspectRatio > 0) {
      const width = Math.round(val * aspectRatio)
      setResults({ width, height: Math.round(val) })
    } else {
      setResults(null)
    }
  }

  const applyRatio = (w, h) => {
    const exampleWidth = w * 100
    const exampleHeight = h * 100
    setCurrentWidth(exampleWidth.toString())
    setCurrentHeight(exampleHeight.toString())
    setNewWidth('')
    setNewHeight('')
    setResults(null)
  }

  const getRatioDisplay = () => {
    if (aspectRatio > 0) {
      const w = parseFloat(currentWidth)
      const h = parseFloat(currentHeight)
      
      const gcd = (a, b) => {
        a = Math.abs(Math.round(a))
        b = Math.abs(Math.round(b))
        while (b !== 0) {
          const temp = b
          b = a % b
          a = temp
        }
        return a
      }
      
      const divisor = gcd(w, h)
      const ratioW = Math.round(w) / divisor
      const ratioH = Math.round(h) / divisor
      
      return `${ratioW}:${ratioH} (${aspectRatio.toFixed(4)})`
    }
    return 'Enter dimensions'
  }

  const resetTool = () => {
    setCurrentWidth('')
    setCurrentHeight('')
    setNewWidth('')
    setNewHeight('')
    setResults(null)
    setUploadStatus('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <main className="container">
      <h1>Aspect Ratio Calculator</h1>
      <p className="intro-text">
        Calculate new image dimensions while maintaining the aspect ratio. Perfect for resizing images without distortion.
      </p>

      <div className="tool-section">
        <div className="upload-box" onClick={() => fileInputRef.current?.click()}>
          <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <h3>Upload Image to Get Dimensions</h3>
          <p>Or enter dimensions manually below</p>
          <input 
            ref={fileInputRef}
            type="file" 
            accept="image/*" 
            onChange={handleImageUpload}
            hidden
          />
          <button className="btn-primary">Select Image</button>
        </div>

        {uploadStatus && (
          <div style={{ 
            margin: '20px 0', 
            padding: '15px', 
            background: uploadStatus.includes('✓') ? '#ecfdf5' : '#fef2f2',
            border: `2px solid ${uploadStatus.includes('✓') ? '#10b981' : '#ef4444'}`,
            borderRadius: '8px',
            textAlign: 'center',
            color: uploadStatus.includes('✓') ? '#059669' : '#dc2626'
          }}>
            {uploadStatus}
          </div>
        )}

        <div style={{ margin: '30px 0', textAlign: 'center' }}>
          {/* Ad space reserved for post-approval */}
        </div>

        <div className="text-tool-container">
          <h3>Current Dimensions</h3>
          <div className="dimension-inputs">
            <div className="input-group">
              <label>Width (px)</label>
              <input 
                type="number" 
                value={currentWidth}
                onChange={(e) => setCurrentWidth(e.target.value)}
                min="1" 
                placeholder="1920" 
              />
            </div>
            <div className="multiply-sign">×</div>
            <div className="input-group">
              <label>Height (px)</label>
              <input 
                type="number" 
                value={currentHeight}
                onChange={(e) => setCurrentHeight(e.target.value)}
                min="1" 
                placeholder="1080" 
              />
            </div>
          </div>

          <div className="result-card" style={{ margin: '20px 0', textAlign: 'center' }}>
            <div className="result-label">Current Aspect Ratio</div>
            <div className="result-value">{getRatioDisplay()}</div>
          </div>

          <h3>Calculate New Dimensions</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '20px' }}>
            Enter either new width OR new height - the other will be calculated automatically
          </p>
          
          <div className="dimension-inputs">
            <div className="input-group">
              <label>New Width (px)</label>
              <input 
                type="number" 
                value={newWidth}
                onChange={handleNewWidthChange}
                min="1" 
                placeholder="Width"
                disabled={aspectRatio === 0}
              />
            </div>
            <div className="multiply-sign">×</div>
            <div className="input-group">
              <label>New Height (px)</label>
              <input 
                type="number" 
                value={newHeight}
                onChange={handleNewHeightChange}
                min="1" 
                placeholder="Height"
                disabled={aspectRatio === 0}
              />
            </div>
          </div>

          {results && (
            <div className="result-section">
              <h2>✓ Calculated Dimensions</h2>
              <div className="result-grid">
                <div className="result-card">
                  <div className="result-label">New Width</div>
                  <div className="result-value">{results.width} px</div>
                </div>
                <div className="result-card">
                  <div className="result-label">New Height</div>
                  <div className="result-value">{results.height} px</div>
                </div>
              </div>
              <button className="btn-secondary" onClick={resetTool}>Calculate Another</button>
            </div>
          )}

          <div style={{ marginTop: '40px' }}>
            <h3>Common Aspect Ratios</h3>
            <div className="options-grid">
              <button className="btn-option" onClick={() => applyRatio(16, 9)}>16:9 (HD/4K)</button>
              <button className="btn-option" onClick={() => applyRatio(4, 3)}>4:3 (Standard)</button>
              <button className="btn-option" onClick={() => applyRatio(1, 1)}>1:1 (Square)</button>
              <button className="btn-option" onClick={() => applyRatio(21, 9)}>21:9 (Ultrawide)</button>
              <button className="btn-option" onClick={() => applyRatio(3, 2)}>3:2 (Film)</button>
              <button className="btn-option" onClick={() => applyRatio(9, 16)}>9:16 (Vertical)</button>
            </div>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>About This Tool</h2>
        <p>The Aspect Ratio Calculator helps you resize images while maintaining their proportions.</p>
        
        <h3>How to Use</h3>
        <ol>
          <li>Upload an image OR enter current width and height manually</li>
          <li>Enter either a new width OR new height (not both)</li>
          <li>The calculator automatically computes the other dimension</li>
        </ol>
      </div>
    </main>
  )
}