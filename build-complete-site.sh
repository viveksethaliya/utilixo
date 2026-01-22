#!/bin/bash

# Complete website builder for Utilixo Next.js

echo "Building complete Utilixo Next.js website..."

# The DPI and Size checkers are already created
# Let me create ALL remaining tools, pages, and content

# Create all remaining tool pages
for tool in text-cleaner aspect-ratio json-csv base64 file-extension; do
  mkdir -p "app/tools/$tool"
done

# Text Cleaner
cat > app/tools/text-cleaner/page.js << 'EOFTOOL1'
'use client'
import { useState } from 'react'

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
        <div className="text-area-group">
          <label>Cleaned Text</label>
          <textarea value={outputText} readOnly placeholder="Your cleaned text will appear here..." />
          {outputText && <button className="btn-copy" onClick={copyToClipboard}>Copy to Clipboard</button>}
        </div>
      </div>
    </main>
  )
}
EOFTOOL1

# Aspect Ratio
cat > app/tools/aspect-ratio/page.js << 'EOFTOOL2'
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
EOFTOOL2

# JSON-CSV
cat > app/tools/json-csv/page.js << 'EOFTOOL3'
'use client'
import { useState } from 'react'

export default function JsonCsv() {
  const [jsonInput, setJsonInput] = useState('')
  const [csvOutput, setCsvOutput] = useState('')
  const [rowCount, setRowCount] = useState(0)

  const convertJSON = () => {
    try {
      const data = JSON.parse(jsonInput)
      if (!Array.isArray(data)) {
        alert('JSON must be an array of objects')
        return
      }

      const keys = [...new Set(data.flatMap(obj => Object.keys(obj)))]
      const header = keys.join(',')
      const rows = data.map(obj => {
        return keys.map(key => {
          const value = obj[key]
          if (value === null || value === undefined) return ''
          const stringValue = String(value)
          if (stringValue.includes(',') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`
          }
          return stringValue
        }).join(',')
      })

      const csv = [header, ...rows].join('\n')
      setCsvOutput(csv)
      setRowCount(data.length)
    } catch (error) {
      alert('Invalid JSON: ' + error.message)
    }
  }

  const downloadCSV = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted-data.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="container">
      <h1>JSON → CSV Converter</h1>
      <p className="intro-text">Convert JSON data to CSV format for Excel.</p>
      <div className="text-tool-container">
        <div className="text-area-group">
          <label>JSON Input</label>
          <textarea value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} placeholder='[{"name":"John","age":30}]' />
        </div>
        <button className="btn-primary" onClick={convertJSON}>Convert to CSV</button>
        <div className="text-area-group">
          <label>CSV Output</label>
          <textarea value={csvOutput} readOnly placeholder="CSV output will appear here..." />
          {rowCount > 0 && (
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{rowCount} rows converted</span>
              <button className="btn-copy" onClick={downloadCSV}>Download CSV</button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
EOFTOOL3

# Base64
cat > app/tools/base64/page.js << 'EOFTOOL4'
'use client'
import { useState } from 'react'

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
        <div className="text-area-group">
          <label>{mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}</label>
          <textarea value={textOutput} readOnly placeholder="Result will appear here..." />
        </div>
      </div>
    </main>
  )
}
EOFTOOL4

# File Extension
cat > app/tools/file-extension/page.js << 'EOFTOOL5'
'use client'
import { useState } from 'react'

const extensions = {
  pdf: { type: 'PDF Document', category: 'Document', mime: 'application/pdf', desc: 'Portable Document Format', software: ['Adobe Acrobat', 'Web browsers'] },
  jpg: { type: 'JPEG Image', category: 'Image', mime: 'image/jpeg', desc: 'Compressed image format', software: ['Any image viewer', 'Photoshop'] },
  png: { type: 'PNG Image', category: 'Image', mime: 'image/png', desc: 'Lossless image format', software: ['Any image viewer', 'GIMP'] },
  docx: { type: 'Word Document', category: 'Document', mime: 'application/vnd.openxmlformats', desc: 'Microsoft Word document', software: ['Microsoft Word', 'Google Docs'] },
  xlsx: { type: 'Excel Spreadsheet', category: 'Spreadsheet', mime: 'application/vnd.openxmlformats', desc: 'Microsoft Excel file', software: ['Microsoft Excel', 'Google Sheets'] },
  mp4: { type: 'MP4 Video', category: 'Video', mime: 'video/mp4', desc: 'Universal video format', software: ['VLC', 'Windows Media Player'] },
  mp3: { type: 'MP3 Audio', category: 'Audio', mime: 'audio/mpeg', desc: 'Compressed audio format', software: ['Any media player'] },
  zip: { type: 'ZIP Archive', category: 'Archive', mime: 'application/zip', desc: 'Compressed file archive', software: ['Built-in OS tools', 'WinRAR'] }
}

export default function FileExtension() {
  const [extensionInput, setExtensionInput] = useState('')
  const [info, setInfo] = useState(null)

  const identifyExtension = () => {
    const ext = extensionInput.toLowerCase().trim().replace('.', '')
    const extInfo = extensions[ext]
    if (!extInfo) {
      alert(`Extension ".${ext}" not found in database`)
      return
    }
    setInfo({ ext, ...extInfo })
  }

  return (
    <main className="container">
      <h1>File Extension Identifier</h1>
      <p className="intro-text">Identify file types by their extension.</p>
      <div className="text-tool-container">
        <div className="input-method">
          <h3>Enter File Extension</h3>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{ fontSize: '1.5rem', color: '#64748b' }}>.</span>
            <input type="text" value={extensionInput} onChange={(e) => setExtensionInput(e.target.value)} placeholder="e.g., pdf, jpg, docx" style={{ flex: 1, padding: '12px', border: '2px solid #e2e8f0', borderRadius: '6px', fontSize: '1rem' }} />
            <button className="btn-primary" onClick={identifyExtension}>Identify</button>
          </div>
        </div>

        {info && (
          <div className="extension-info">
            <h2>.{info.ext.toUpperCase()}</h2>
            <div className="info-grid">
              <div className="info-item"><strong>File Type:</strong><span>{info.type}</span></div>
              <div className="info-item"><strong>Category:</strong><span>{info.category}</span></div>
              <div className="info-item"><strong>MIME Type:</strong><span>{info.mime}</span></div>
            </div>
            <div className="description-box">
              <h3>Description</h3>
              <p>{info.desc}</p>
            </div>
            <div className="software-box">
              <h3>Programs That Can Open This File</h3>
              <ul>{info.software.map((s, i) => <li key={i}>{s}</li>)}</ul>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
EOFTOOL5

# Create Privacy and Contact pages
cat > app/privacy/page.js << 'EOFPRIV'
export const metadata = {
  title: 'Privacy Policy',
  description: 'Utilixo privacy policy and data handling'
}

export default function Privacy() {
  return (
    <main className="container">
      <div className="info-section" style={{ maxWidth: '800px', margin: '40px auto' }}>
        <h1>Privacy Policy</h1>
        <p><strong>Last Updated:</strong> January 2025</p>
        <h2>1. Information We Collect</h2>
        <p>Our tools process all data entirely in your browser. We do not collect, store, or transmit your files, images, or text to any server.</p>
        <h2>2. How We Use Your Information</h2>
        <p>We may use Google Analytics to understand how visitors use our website.</p>
        <h2>3. Your Data Privacy</h2>
        <ul>
          <li>All files, images, and text are processed entirely in your browser using JavaScript</li>
          <li>No data is uploaded to our servers</li>
          <li>Your content remains completely private on your device</li>
        </ul>
      </div>
    </main>
  )
}
EOFPRIV

cat > app/contact/page.js << 'EOFCONT'
export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Utilixo'
}

export default function Contact() {
  return (
    <main className="container">
      <div className="info-section" style={{ maxWidth: '800px', margin: '40px auto' }}>
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Whether you have feedback, questions, or need support, please reach out.</p>
        <h2>Get in Touch</h2>
        <p><strong>Email:</strong> contact@utilixo.online</p>
        <p>We typically respond within 24-48 hours.</p>
        <h2>Report a Bug</h2>
        <p>If you've encountered a technical issue:</p>
        <ul>
          <li>Tell us which tool you were using</li>
          <li>Describe what happened</li>
          <li>Tell us what browser you're using</li>
        </ul>
      </div>
    </main>
  )
}
EOFCONT

echo "✅ All tool pages created"
echo "✅ Privacy and Contact pages created"
