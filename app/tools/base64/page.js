'use client'
import { useState } from 'react'
import AdBanner from '@/components/AdBanner'

export default function Base64Tool() {
  const [mode, setMode] = useState('encode')
  const [textInput, setTextInput] = useState('')
  const [textOutput, setTextOutput] = useState('')

  const processText = () => {
    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(textInput)))
        setTextOutput(encoded)
      } else {
        const decoded = decodeURIComponent(escape(atob(textInput)))
        setTextOutput(decoded)
      }
    } catch (error) {
      alert('Error: Invalid input for ' + mode + 'ing')
    }
  }

  return (
    <main className="container">
      <h1>Base64 Encoder / Decoder</h1>
      <p className="intro-text">Encode or decode text to/from Base64 format.</p>
      <div className="text-tool-container">
        <div className="mode-selector">
          <button className={`mode-btn ${mode === 'encode' ? 'active' : ''}`} onClick={() => setMode('encode')}>Encode</button>
          <button className={`mode-btn ${mode === 'decode' ? 'active' : ''}`} onClick={() => setMode('decode')}>Decode</button>
        </div>
        <div className="text-area-group">
          <label>{mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}</label>
          <textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder="Enter text here..." />
        </div>
        <button className="btn-primary" onClick={processText}>{mode === 'encode' ? 'Encode' : 'Decode'}</button>
        
        <div style={{ margin: '30px 0', textAlign: 'center' }}>
          <AdBanner dataAdSlot="1234567894" />
        </div>
        
        <div className="text-area-group">
          <label>{mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}</label>
          <textarea value={textOutput} readOnly placeholder="Result will appear here..." />
        </div>
      </div>
    </main>
  )
}
