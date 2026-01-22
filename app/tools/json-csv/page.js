'use client'
import { useState } from 'react'
import AdBanner from '@/components/AdBanner'

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
        
        <div style={{ margin: '30px 0', textAlign: 'center' }}>
          <AdBanner dataAdSlot="1234567893" />
        </div>
        
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
