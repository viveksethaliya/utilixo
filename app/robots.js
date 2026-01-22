export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://utilixo-nextjs.vercel.app/sitemap.xml',
  }
}