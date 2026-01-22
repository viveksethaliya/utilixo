'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

export default function SearchClient({ articles }) {
  const [searchQuery, setSearchQuery] = useState('')

  // Efficient search with memoization
  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) {
      return articles
    }

    const query = searchQuery.toLowerCase().trim()
    const searchTerms = query.split(/\s+/).filter(term => term.length > 0)

    // Score-based search for better relevance
    return articles
      .map(article => {
        let score = 0
        const titleLower = article.title?.toLowerCase() || ''
        const descLower = article.description?.toLowerCase() || ''
        const tagsLower = (article.tags || []).join(' ').toLowerCase()
        const categoryLower = article.category?.toLowerCase() || ''
        const allText = `${titleLower} ${descLower} ${tagsLower} ${categoryLower}`

        searchTerms.forEach(term => {
          // Title matches (highest priority)
          if (titleLower.includes(term)) {
            score += 10
            if (titleLower.startsWith(term)) score += 5
          }
          
          // Tag matches (medium priority)
          if (tagsLower.includes(term)) {
            score += 5
          }
          
          // Description matches (lower priority)
          if (descLower.includes(term)) {
            score += 2
          }

          // Category match
          if (categoryLower.includes(term)) {
            score += 3
          }

          // Exact phrase match (bonus)
          if (allText.includes(query)) {
            score += 15
          }
        })

        return { ...article, score }
      })
      .filter(article => article.score > 0)
      .sort((a, b) => b.score - a.score)
  }, [articles, searchQuery])

  return (
    <>
      {/* Search Box */}
      <div style={{ maxWidth: '800px', margin: '40px auto' }}>
        <div style={{ position: 'relative' }}>
          <svg 
            style={{ 
              position: 'absolute', 
              left: '20px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              width: '24px', 
              height: '24px', 
              color: '#94a3b8',
              pointerEvents: 'none'
            }}
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for problems... (e.g., 'wifi not working', 'blue screen', 'printer offline')"
            style={{
              width: '100%',
              padding: '20px 20px 20px 60px',
              fontSize: '1.1rem',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#2563eb'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{
                position: 'absolute',
                right: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: '#e2e8f0',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b',
                fontSize: '1.2rem',
                transition: 'background 0.3s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#cbd5e1'}
              onMouseLeave={(e) => e.target.style.background = '#e2e8f0'}
            >
              ×
            </button>
          )}
        </div>

        {/* Search Stats */}
        <div style={{ marginTop: '15px', color: '#64748b', fontSize: '0.95rem' }}>
          {searchQuery ? (
            <span>
              Found <strong>{filteredArticles.length}</strong> result{filteredArticles.length !== 1 ? 's' : ''} for "{searchQuery}"
            </span>
          ) : (
            <span>
              <strong>{articles.length}</strong> solutions available
            </span>
          )}
        </div>
      </div>

      {/* No Results */}
      {searchQuery && filteredArticles.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔍</div>
          <h3 style={{ color: '#1e293b', marginBottom: '10px', fontSize: '1.5rem' }}>
            No solutions found
          </h3>
          <p style={{ color: '#64748b', marginBottom: '20px' }}>
            Try different keywords or check your spelling
          </p>
          <p style={{ 
            color: '#94a3b8', 
            fontSize: '0.9rem', 
            background: '#f8fafc', 
            padding: '15px', 
            borderRadius: '8px',
            marginTop: '20px'
          }}>
            Searched for: <strong>"{searchQuery}"</strong>
          </p>
          <button 
            onClick={() => setSearchQuery('')}
            className="btn-primary"
            style={{ marginTop: '20px' }}
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Articles Grid */}
      {filteredArticles.length > 0 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '25px', 
          margin: '40px 0',
          maxWidth: '1200px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          {filteredArticles.map((article) => (
            <Link
              key={`${article.category}-${article.slug}`}
              href={`/fixit/${article.category}/${article.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <article
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '30px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  border: '2px solid transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)'
                  e.currentTarget.style.borderColor = '#2563eb'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
                  e.currentTarget.style.borderColor = 'transparent'
                }}
              >
                {/* Category Badge */}
                <div style={{ 
                  display: 'inline-block', 
                  background: getCategoryColor(article.category).bg,
                  color: getCategoryColor(article.category).text,
                  padding: '4px 12px', 
                  borderRadius: '12px', 
                  fontSize: '0.8rem', 
                  fontWeight: '600',
                  marginBottom: '15px',
                  alignSelf: 'flex-start',
                  textTransform: 'capitalize'
                }}>
                  {article.category}
                </div>

                {/* Title */}
                <h2 style={{ 
                  fontSize: '1.3rem', 
                  color: '#1e293b', 
                  margin: '0 0 12px 0', 
                  lineHeight: '1.4',
                  flex: '0 0 auto'
                }}>
                  {article.title}
                </h2>

                {/* Description */}
                <p style={{ 
                  color: '#64748b', 
                  fontSize: '0.95rem', 
                  marginBottom: '20px',
                  lineHeight: '1.6',
                  flex: '1 1 auto'
                }}>
                  {article.description}
                </p>

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '8px',
                    marginBottom: '20px'
                  }}>
                    {article.tags.slice(0, 4).map((tag, index) => (
                      <span 
                        key={index}
                        style={{
                          background: '#f1f5f9',
                          color: '#64748b',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          fontWeight: '500'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    {article.tags.length > 4 && (
                      <span style={{ 
                        color: '#94a3b8', 
                        fontSize: '0.8rem', 
                        padding: '4px 0',
                        alignSelf: 'center'
                      }}>
                        +{article.tags.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Read Link */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '8px',
                  paddingTop: '15px', 
                  borderTop: '1px solid #e2e8f0',
                  color: '#2563eb',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  marginTop: 'auto'
                }}>
                  Read Solution
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: '16px', height: '16px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Info Section */}
      {!searchQuery && (
        <div style={{ 
          marginTop: '80px', 
          maxWidth: '800px', 
          margin: '80px auto 0',
          background: '#f8fafc',
          padding: '40px',
          borderRadius: '12px'
        }}>
          <h2 style={{ marginBottom: '20px' }}>How to Use Fix-It Solutions</h2>
          <ol style={{ marginLeft: '20px', lineHeight: '1.8' }}>
            <li><strong>Search:</strong> Type your problem in the search box</li>
            <li><strong>Browse:</strong> Scroll through all available solutions</li>
            <li><strong>Click:</strong> Select the article that matches your issue</li>
          </ol>

          <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>Popular Searches</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {['wifi', 'blue screen', 'printer', 'slow', 'update'].map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                style={{
                  background: 'white',
                  border: '2px solid #e2e8f0',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  color: '#334155',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#2563eb'
                  e.target.style.color = '#2563eb'
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = '#e2e8f0'
                  e.target.style.color = '#334155'
                }}
              >
                {term}
              </button>
            ))}
          </div>

          <div style={{ marginTop: '40px', padding: '20px', background: 'white', borderRadius: '8px', border: '2px solid #e2e8f0' }}>
            <h3 style={{ marginTop: 0 }}>Can't find your solution?</h3>
            <p style={{ color: '#64748b', marginBottom: '15px' }}>
              Contact us and we'll help you find a solution!
            </p>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Contact Support →
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

function getCategoryColor(category) {
  const colors = {
    windows: { bg: '#dbeafe', text: '#1e40af' },
    network: { bg: '#fef3c7', text: '#92400e' },
    hardware: { bg: '#e0e7ff', text: '#4338ca' },
    mac: { bg: '#f3e8ff', text: '#6b21a8' },
    software: { bg: '#dcfce7', text: '#166534' }
  }
  return colors[category] || { bg: '#f1f5f9', text: '#475569' }
}
