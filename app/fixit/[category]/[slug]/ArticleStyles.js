'use client'

export default function ArticleStyles() {
  return (
    <style jsx global>{`
      .prose h2 {
        font-size: 1.8rem;
        margin: 50px 0 20px;
        color: #1e293b;
        font-weight: 600;
      }
      .prose h3 {
        font-size: 1.4rem;
        margin: 35px 0 15px;
        color: #334155;
        font-weight: 600;
      }
      .prose ul, .prose ol {
        margin: 20px 0;
        padding-left: 30px;
      }
      .prose li {
        margin: 12px 0;
        line-height: 1.7;
        color: #475569;
      }
      .prose strong {
        color: #1e293b;
        font-weight: 600;
      }
      .prose code {
        background: #f1f5f9;
        padding: 2px 6px;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
        font-size: 0.95em;
        color: #dc2626;
      }
      .prose pre {
        background: #1e293b;
        color: #f1f5f9;
        padding: 20px;
        border-radius: 8px;
        overflow-x: auto;
        margin: 25px 0;
        line-height: 1.5;
      }
      .prose pre code {
        background: none;
        color: #f1f5f9;
        padding: 0;
      }
      .prose a {
        color: #2563eb;
        text-decoration: underline;
      }
      .prose a:hover {
        color: #1d4ed8;
      }
      .prose p {
        margin: 20px 0;
      }
      .prose hr {
        border: none;
        border-top: 2px solid #e2e8f0;
        margin: 40px 0;
      }
      .prose img {
        border-radius: 0px;
      }
    `}</style>
  )
}
