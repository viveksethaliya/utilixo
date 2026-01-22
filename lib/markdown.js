import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

// Configure marked for Next.js
marked.setOptions({
  breaks: true,
  gfm: true
})

// Custom renderer for images
const renderer = new marked.Renderer()
renderer.image = function(href, title, text) {
  // Ensure images start with / for Next.js public folder
  if (href && !href.startsWith('http') && !href.startsWith('/')) {
    href = '/' + href
  }
  return `<img src="${href}" alt="${text}" title="${title || ''}" class="article-image" />`
}
marked.use({ renderer })

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
