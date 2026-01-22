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
