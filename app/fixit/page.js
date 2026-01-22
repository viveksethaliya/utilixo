import { getAllArticles } from '@/lib/markdown'
import SearchClient from './SearchClient'

export const metadata = {
  title: 'Fix-It Solutions - IT Problem Guides',
  description: 'Step-by-step guides to fix common computer problems'
}

export default function FixItPage() {
  // Get all articles from markdown files
  const articles = getAllArticles()

  return (
    <main className="container">
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '60px 20px 40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>Fix-It Solutions</h1>
        <p style={{ fontSize: '1.2rem', color: '#64748b', maxWidth: '700px', margin: '0 auto' }}>
          Search through step-by-step solutions to common IT problems
        </p>
      </div>

      {/* Search Component (Client-side) */}
      <SearchClient articles={articles} />
    </main>
  )
}
