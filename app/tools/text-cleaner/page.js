'use client'
import { useState } from 'react'
import AdBanner from '@/components/AdBanner'

export default function TextCleaner() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')

  const removeExtraSpaces = () => setOutputText(inputText.replace(/\s+/g, ' ').trim())
  const removeLineBreaks = () => setOutputText(inputText.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim())
  const trimLines = () => setOutputText(inputText.split('\n').map(line => line.trim()).join('\n'))
  const removeBlankLines = () => setOutputText(inputText.split('\n').filter(line => line.trim()).join('\n'))
  const toLowerCase = () => setOutputText(inputText.toLowerCase())
  const toUpperCase = () => setOutputText(inputText.toUpperCase())
  const toTitleCase = () => setOutputText(inputText.replace(/\b\w+/g, word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()))

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputText).then(() => alert('Copied!'))
  }

  return (
    <main className="container">
      <h1>Text Cleaner</h1>
      <p className="intro-text">Clean and format messy text instantly.</p>
      <div className="text-tool-container">
        <div className="text-area-group">
          <label>Input Text</label>
          <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Paste your messy text here..." />
        </div>
        <div className="cleaning-options">
          <h3>Cleaning Options</h3>
          <div className="options-grid">
            <button className="btn-option" onClick={removeExtraSpaces}>Remove Extra Spaces</button>
            <button className="btn-option" onClick={removeLineBreaks}>Remove Line Breaks</button>
            <button className="btn-option" onClick={trimLines}>Trim Each Line</button>
            <button className="btn-option" onClick={removeBlankLines}>Remove Blank Lines</button>
            <button className="btn-option" onClick={toLowerCase}>To Lowercase</button>
            <button className="btn-option" onClick={toUpperCase}>To UPPERCASE</button>
            <button className="btn-option" onClick={toTitleCase}>To Title Case</button>
          </div>
        </div>
        
        <div style={{ margin: '30px 0', textAlign: 'center' }}>
          <AdBanner dataAdSlot="1234567892" />
        </div>
        <div className="text-area-group">
          <label>Cleaned Text</label>
          <textarea value={outputText} readOnly placeholder="Your cleaned text will appear here..." />
          {outputText && <button className="btn-copy" onClick={copyToClipboard}>Copy to Clipboard</button>}
        </div>
      </div>
    </main>
  )
}
