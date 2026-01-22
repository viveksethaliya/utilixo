export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Utilixo',
    description: 'Free online tools and IT problem solutions',
    url: 'https://utilixo.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://utilixo.com/fixit?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Online Tools',
      itemListElement: [
        {
          '@type': 'SoftwareApplication',
          name: 'Image DPI Checker',
          description: 'Check image DPI, resolution, dimensions, and file size instantly',
          url: 'https://utilixo.com/tools/dpi-checker',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web Browser'
        },
        {
          '@type': 'SoftwareApplication', 
          name: 'Text Cleaner',
          description: 'Remove extra spaces, line breaks, and format text properly',
          url: 'https://utilixo.com/tools/text-cleaner',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web Browser'
        },
        {
          '@type': 'SoftwareApplication',
          name: 'JSON to CSV Converter',
          description: 'Convert JSON data to CSV format for Excel and spreadsheets',
          url: 'https://utilixo.com/tools/json-csv',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'Web Browser'
        }
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}