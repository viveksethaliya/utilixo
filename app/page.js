import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import AdBanner from '@/components/AdBanner'

export const metadata = {
  title: 'Free Online Tools & IT Solutions - Utilixo',
  description: 'Fast, secure online tools and IT problem solutions. Image DPI checker, text cleaner, JSON to CSV converter, Base64 encoder, and more. All tools work in your browser - 100% private.',
  keywords: 'online tools, image dpi checker, text cleaner, json csv converter, base64 encoder, aspect ratio calculator, file extension identifier, free tools, browser tools',
  openGraph: {
    title: 'Free Online Tools & IT Solutions - Utilixo',
    description: 'Fast, secure online tools and IT problem solutions. All tools work in your browser - 100% private.',
    type: 'website',
  },
}

export default function Home() {
  const tools = [
    {
      href: '/tools/dpi-checker',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Image DPI Checker',
      description: 'Check image DPI, resolution, dimensions, and file size instantly',
      tag: 'Popular'
    },
    {
      href: '/tools/size-checker',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Image Size Checker',
      description: 'Get detailed image file size information and compression suggestions',
      tag: 'New'
    },
    {
      href: '/tools/text-cleaner',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Text Cleaner',
      description: 'Remove extra spaces, line breaks, and format text properly'
    },
    {
      href: '/tools/aspect-ratio',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
        </svg>
      ),
      title: 'Aspect Ratio Calculator',
      description: 'Calculate and maintain aspect ratios for image resizing'
    },
    {
      href: '/tools/json-csv',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: 'JSON → CSV Converter',
      description: 'Convert JSON data to CSV format for Excel and spreadsheets'
    },
    {
      href: '/tools/base64',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Base64 Encoder / Decoder',
      description: 'Encode or decode text and files to/from Base64 format'
    },
    {
      href: '/tools/file-extension',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'File Extension Identifier',
      description: 'Identify file types and get info about file extensions'
    }
  ]

  return (
    <>
      <StructuredData />
      <main className="container">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Utilixo</h1>
          <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
            Fast, secure, and privacy-focused utilities for everyday tasks. All tools work directly in your browser - no uploads required.
          </p>
        </div>

        <div className="tools-grid">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.href} className="tool-card">
              <div className="tool-icon">{tool.icon}</div>
              <h2>{tool.title}</h2>
              <p>{tool.description}</p>
              {tool.tag && <span className="tool-tag">{tool.tag}</span>}
            </Link>
          ))}
        </div>

        <div className="features-section">
          <h2>Why Use Our Tools?</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>🔒 100% Private</h3>
              <p>All processing happens in your browser. Your files never leave your device.</p>
            </div>
            <div className="feature-item">
              <h3>⚡ Lightning Fast</h3>
              <p>Instant results with no server delays or waiting times.</p>
            </div>
            <div className="feature-item">
              <h3>💯 Always Free</h3>
              <p>No registration, no subscriptions, no hidden costs. Use unlimited.</p>
            </div>
            <div className="feature-item">
              <h3>📱 Works Everywhere</h3>
              <p>Desktop, tablet, or mobile - all tools are fully responsive.</p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '80px', padding: '40px', background: '#f8fafc', borderRadius: '12px' }}>
          <h2 style={{ marginBottom: '20px' }}>Need IT Help?</h2>
          <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '1.1rem' }}>
            Check our Fix-It section for step-by-step solutions to common computer problems
          </p>
          <Link href="/fixit" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Browse Fix-It Guides →
          </Link>
        </div>
      </main>
      
      {/* Fixed Sidebar Ad - Doesn't affect layout */}
      <div style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000
      }}>
        <div style={{ display: 'none' }} className="sidebar-ad">
          <AdBanner 
            dataAdSlot="1234567898" 
            dataAdFormat="vertical"
            style={{ display: 'block', width: '160px', height: '600px' }}
          />
        </div>
      </div>
    </>
  )
}
