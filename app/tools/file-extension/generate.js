// Extension database generator
const fs = require('fs')
const path = require('path')

// Read extensions from txt file
const extFile = fs.readFileSync(path.join(__dirname, 'ext.txt'), 'utf8')
const extensions = extFile.split('\n').map(line => line.trim().replace('.', '')).filter(Boolean)

// Minimal categorization rules
const categories = {
  // Archives
  archive: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'bzip2', 'cab', 'arc', 'arj', 'lha', 'sit', 'sitx', 'cpio', 'xz', 'z', 'lz', 'lzma'],
  
  // Images
  image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico', 'tiff', 'tif', 'psd', 'ai', 'raw', 'cr2', 'cr3', 'dng', 'bay', 'erf', 'art', 'dds', 'exr', 'hdr', 'dpx', 'tga', 'xcf', 'avif', 'bpg'],
  
  // Video
  video: ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm', 'asf', 'asx', 'm4v', 'mts', 'm2ts', 'dv', 'dvd', 'vob', 'nsv', 'mxf', 'ogv'],
  
  // Audio
  audio: ['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma', 'aiff', 'aif', 'aifc', 'au', 'amr', 'ac3', 'at3', 'caf', 'opus', 'oga', 'ra', 'rm', 'rmvb', 'mid', 'midi', 'mod', 'sf2'],
  
  // Documents
  document: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'abw', 'pages', 'wpd', 'wps', 'dot', 'dotx', 'dotm', 'docm', 'one', 'lit', 'mobi', 'epub', 'chm'],
  
  // Spreadsheets
  spreadsheet: ['xls', 'xlsx', 'csv', 'ods', 'numbers', 'xlsb', 'xlsm', 'xla', 'xlam', 'wk1', 'gnumeric'],
  
  // Presentations
  presentation: ['ppt', 'pptx', 'odp', 'key', 'pps', 'ppsx', 'pot', 'potx', 'potm', 'pptm'],
  
  // Code
  code: ['js', 'html', 'css', 'php', 'py', 'java', 'cpp', 'c', 'h', 'json', 'xml', 'sql', 'sh', 'bat', 'cmd', 'ps1', 'rb', 'go', 'rs', 'swift', 'kt', 'scala', 'pl', 'lua', 'r', 'matlab', 'asm', 'asp', 'aspx', 'jsp', 'cfm', 'cgi', 'ejs', 'haml', 'sass', 'scss', 'less', 'ts', 'jsx', 'vue', 'svelte'],
  
  // System
  system: ['exe', 'msi', 'dll', 'sys', 'drv', 'deb', 'rpm', 'dmg', 'pkg', 'app', 'appimage', 'run', 'bin', 'com', 'scr', 'cpl'],
  
  // Database
  database: ['db', 'sqlite', 'sqlite3', 'mdb', 'accdb', 'dbf', 'sdf', 'idb', 'pdb'],
  
  // Font
  font: ['ttf', 'otf', 'woff', 'woff2', 'eot', 'fon', 'fnt', 'bdf', 'pcf'],
  
  // Config
  config: ['ini', 'cfg', 'conf', 'config', 'properties', 'toml', 'yaml', 'yml', 'env', 'htaccess'],
  
  // Disk
  disk: ['iso', 'img', 'vdi', 'vmdk', 'vhd', 'vhdx', 'qcow', 'qcow2', 'dd', 'adf', 'dsk'],
  
  // Mobile
  mobile: ['apk', 'ipa', 'xapk', 'bb'],
  
  // Security
  security: ['cer', 'crt', 'der', 'p7b', 'p7c', 'p7s', 'pfx', 'pem', 'aes']
}

// Get category for extension
function getCategory(ext) {
  for (const [category, exts] of Object.entries(categories)) {
    if (exts.includes(ext)) return category
  }
  return 'other'
}

// Generate minimal extension data
function generateExtensionData(ext) {
  const category = getCategory(ext)
  
  // Basic type mapping
  const typeMap = {
    archive: `${ext.toUpperCase()} Archive`,
    image: `${ext.toUpperCase()} Image`,
    video: `${ext.toUpperCase()} Video`,
    audio: `${ext.toUpperCase()} Audio`,
    document: `${ext.toUpperCase()} Document`,
    spreadsheet: `${ext.toUpperCase()} Spreadsheet`,
    presentation: `${ext.toUpperCase()} Presentation`,
    code: `${ext.toUpperCase()} File`,
    system: `${ext.toUpperCase()} System File`,
    database: `${ext.toUpperCase()} Database`,
    font: `${ext.toUpperCase()} Font`,
    config: `${ext.toUpperCase()} Config`,
    disk: `${ext.toUpperCase()} Disk Image`,
    mobile: `${ext.toUpperCase()} Mobile App`,
    security: `${ext.toUpperCase()} Certificate`,
    other: `${ext.toUpperCase()} File`
  }
  
  return {
    type: typeMap[category],
    category: category.charAt(0).toUpperCase() + category.slice(1),
    desc: `${typeMap[category]} format`
  }
}

// Generate the extensions object
const extensionsObj = {}
extensions.forEach(ext => {
  if (ext) {
    extensionsObj[ext] = generateExtensionData(ext)
  }
})

// Write to JS file
const jsContent = `// Auto-generated extension database
export const extensions = ${JSON.stringify(extensionsObj, null, 2)}

export function getExtensionInfo(ext) {
  const cleanExt = ext.toLowerCase().replace('.', '')
  return extensions[cleanExt] || null
}`

fs.writeFileSync(path.join(__dirname, 'extensions.js'), jsContent)
console.log(`Generated ${Object.keys(extensionsObj).length} extensions`)