#!/bin/bash

# This script generates all remaining Next.js files

cd "$(dirname "$0")"

echo "Generating all Next.js components..."

# Create layout.js
cat > app/layout.js << 'EOFLAYOUT'
import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: {
    template: '%s | Utilixo',
    default: 'Utilixo - Free Online Tools & IT Solutions'
  },
  description: 'Free online tools and IT problem solutions',
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
EOFLAYOUT

echo "✓ Layout created"

# Create markdown utility
mkdir -p lib
cat > lib/markdown.js << 'EOFMARKDOWN'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const contentDirectory = path.join(process.cwd(), 'content/fixit')

export function getArticlesByCategory(category) {
  const categoryPath = path.join(contentDirectory, category)
  
  if (!fs.existsSync(categoryPath)) {
    return []
  }

  const files = fs.readdirSync(categoryPath)
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace('.md', '')
      const fullPath = path.join(categoryPath, file)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug,
        category,
        ...data
      }
    })
}

export function getAllArticles() {
  const categories = ['windows', 'network', 'hardware', 'software', 'mac']
  const allArticles = []
  
  categories.forEach(category => {
    const articles = getArticlesByCategory(category)
    allArticles.push(...articles)
  })
  
  return allArticles
}

export function getArticleBySlug(category, slug) {
  const fullPath = path.join(contentDirectory, category, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const htmlContent = marked(content)
  
  return {
    slug,
    category,
    ...data,
    content: htmlContent
  }
}
EOFMARKDOWN

echo "✓ Markdown utility created"

echo "All components generated successfully!"
