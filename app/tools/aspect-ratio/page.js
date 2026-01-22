'use client'
import { useState } from 'react'

export default function AspectRatio() {
  const [currentWidth, setCurrentWidth] = useState('')
  const [currentHeight, setCurrentHeight] = useState('')
  const [newWidth, setNewWidth] = useState('')
  const [newHeight, setNewHeight] = useState('')
  const [aspectRatio, setAspectRatio] = useState(0)
  const [results, setResults] = useState(null)

  const calculateAspectRatio = () => {
    const w = parseFloat(currentWidth)
    const h = parseFloat(currentHeight)
    if (w > 0 && h > 0) setAspectRatio(w / h)
  }

  const calculateNewDimensions = (type, value) => {
    const val = parseFloat(value)
    if (val > 0 && aspectRatio > 0) {
      if (type === 'width') {
        const height = Math.round(val / aspectRatio)
        setNewWidth(val)
        setNewHeight(height)
        setResults({ width: val, height })
      } else {
        const width = Math.round(val * aspectRatio)
        setNewHeight(val)
        setNewWidth(width)
        setResults({ width, height: val })
      }
    }
  }

  return (
    <main className="container">
      <h1>Aspect Ratio Calculator</h1>
      <p className="intro-text">Calculate new dimensions while maintaining aspect ratio.</p>
      <div className="text-tool-container">
        <h3>Enter Current Dimensions</h3>
        <div className="dimension-inputs">
          <div className="input-group">
            <label>Width (px)</label>
            <input type="number" value={currentWidth} onChange={(e) => { setCurrentWidth(e.target.value); calculateAspectRatio() }} placeholder="1920" />
          </div>
          <div className="multiply-sign">×</div>
          <div className="input-group">
            <label>Height (px)</label>
            <input type="number" value={currentHeight} onChange={(e) => { setCurrentHeight(e.target.value); calculateAspectRatio() }} placeholder="1080" />
          </div>
        </div>

        <h3>Calculate New Dimensions</h3>
        <div className="dimension-inputs">
          <div className="input-group">
            <label>New Width (px)</label>
            <input type="number" value={newWidth} onChange={(e) => calculateNewDimensions('width', e.target.value)} placeholder="Enter new width" />
          </div>
          <div className="multiply-sign">×</div>
          <div className="input-group">
            <label>New Height (px)</label>
            <input type="number" value={newHeight} onChange={(e) => calculateNewDimensions('height', e.target.value)} placeholder="Enter new height" />
          </div>
        </div>

        {results && (
          <div className="calc-results">
            <h3>✓ Calculated Dimensions</h3>
            <div className="result-box">
              <div className="result-item">
                <div className="result-label">New Width:</div>
                <div className="result-number">{results.width} px</div>
              </div>
              <div className="multiply-sign">×</div>
              <div className="result-item">
                <div className="result-label">New Height:</div>
                <div className="result-number">{results.height} px</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
