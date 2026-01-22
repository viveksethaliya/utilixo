import { getArticleBySlug, getAllArticles } from '@/lib/markdown'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const articles = getAllArticles()
  
  return articles.map((article) => ({
    category: article.category,
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }) {
  const article = getArticleBySlug(params.category, params.slug)
  
  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.title,
    description: article.description,
    keywords: article.tags?.join(', '),
  }
}

export default function ArticlePage({ params }) {
  const article = getArticleBySlug(params.category, params.slug)
  
  if (!article) {
    notFound()
  }

  return (
    <main className="container">
      <div className="breadcrumbs">
        <Link href="/">Home</Link>
        {' > '}
        <Link href="/fixit">Fix-It</Link>
        {' > '}
        <Link href={`/fixit`} className="category-link">{article.category}</Link>
        {' > '}
        <span>{article.title}</span>
      </div>

      <article className="article-container">
        <header className="article-header">
          <div className="category-badge">{article.category}</div>
          
          <h1 className="article-title">{article.title}</h1>

          <p className="article-description">{article.description}</p>

          {article.date && (
            <div className="article-date">
              Updated: {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          )}
        </header>

        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }} 
        />

        {article.tags && article.tags.length > 0 && (
          <div className="article-tags-section">
            <h3>Related Tags:</h3>
            <div className="article-tags">
              {article.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        )}

        <div className="article-footer">
          <Link href="/fixit" className="btn-secondary">
            ← Back to All Solutions
          </Link>
        </div>
      </article>
    </main>
  )
}
