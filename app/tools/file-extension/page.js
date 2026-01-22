'use client'
import { useState } from 'react'
import { extensions, getExtensionInfo } from './extensions'

export default function FileExtension() {
  const [extensionInput, setExtensionInput] = useState('')
  const [info, setInfo] = useState(null)

  const identifyExtension = () => {
    const extInfo = getExtensionInfo(extensionInput)
    if (!extInfo) {
      alert(`Extension "${extensionInput}" not found in database`)
      return
    }
    setInfo({ ext: extensionInput.toLowerCase().replace('.', ''), ...extInfo })
  }

  return (
    <main className="container">
      <h1>File Extension Identifier</h1>
      <p className="intro-text">Identify file types from our database of 630+ extensions.</p>
      <div className="text-tool-container">
        <div className="input-method">
          <h3>Enter File Extension</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '1.5rem', color: '#64748b' }}>.</span>
            <input 
              type="text" 
              value={extensionInput} 
              onChange={(e) => setExtensionInput(e.target.value)} 
              placeholder="e.g., pdf, jpg, docx" 
              style={{ flex: 1, padding: '12px', border: '2px solid #e2e8f0', borderRadius: '6px', fontSize: '1rem' }} 
            />
            <button className="btn-primary" onClick={identifyExtension}>Identify</button>
          </div>
        </div>

        {info && (
          <div className="extension-info">
            <h2>.{info.ext.toUpperCase()}</h2>
            <div className="info-grid">
              <div className="info-item"><strong>File Type:</strong><span>{info.type}</span></div>
              <div className="info-item"><strong>Category:</strong><span>{info.category}</span></div>
            </div>
            <div className="description-box">
              <h3>Description</h3>
              <p>{info.desc}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}