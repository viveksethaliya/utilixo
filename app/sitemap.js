export default function sitemap() {
  const baseUrl = 'https://utilixo-nextjs.vercel.app'
  
  const tools = [
    'dpi-checker',
    'size-checker', 
    'text-cleaner',
    'aspect-ratio',
    'json-csv',
    'base64',
    'file-extension'
  ]
  
  const toolUrls = tools.map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/fixit`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    ...toolUrls,
  ]
}