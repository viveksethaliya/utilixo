import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: {
    template: '%s | Utilixo',
    default: 'Utilixo - Free Online Tools & IT Solutions'
  },
  description: 'Free online tools and IT problem solutions. Image DPI checker, text cleaner, JSON to CSV converter, Base64 encoder, and more. 100% private, no uploads required.',
  keywords: 'online tools, image dpi checker, text cleaner, json csv converter, base64 encoder, file extension identifier, IT solutions, free tools',
  authors: [{ name: 'Utilixo' }],
  creator: 'Utilixo',
  publisher: 'Utilixo',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-project-name.vercel.app',
    siteName: 'Utilixo',
    title: 'Utilixo - Free Online Tools & IT Solutions',
    description: 'Free online tools and IT problem solutions. All tools work in your browser - 100% private.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Utilixo - Free Online Tools & IT Solutions',
    description: 'Free online tools and IT problem solutions. All tools work in your browser - 100% private.',
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 1000 }}>
          <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>
              Utilixo
            </Link>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <Link href="/" style={{ textDecoration: 'none', color: '#334155', fontWeight: 500 }}>Tools</Link>
              <Link href="/fixit" style={{ textDecoration: 'none', color: '#334155', fontWeight: 500 }}>Fix-It</Link>
              <Link href="/privacy" style={{ textDecoration: 'none', color: '#334155', fontWeight: 500 }}>Privacy</Link>
              <Link href="/contact" style={{ textDecoration: 'none', color: '#334155', fontWeight: 500 }}>Contact</Link>
            </div>
          </nav>
        </header>
        {children}
        <footer style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', marginTop: '4rem', padding: '2rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', color: '#64748b' }}>
            <p>&copy; 2025 Utilixo. All rights reserved.</p>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <Link href="/privacy" style={{ color: '#2563eb', textDecoration: 'none' }}>Privacy</Link>
              <Link href="/contact" style={{ color: '#2563eb', textDecoration: 'none' }}>Contact</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
