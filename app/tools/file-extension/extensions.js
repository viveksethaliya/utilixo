// Enhanced extension database with curated common extensions
const commonExtensions = {
  // Archives
  zip: { type: 'ZIP Archive', category: 'Archive', desc: 'Compressed file archive', mime: 'application/zip' },
  rar: { type: 'RAR Archive', category: 'Archive', desc: 'WinRAR compressed archive', mime: 'application/vnd.rar' },
  '7z': { type: '7-Zip Archive', category: 'Archive', desc: '7-Zip compressed archive', mime: 'application/x-7z-compressed' },
  tar: { type: 'TAR Archive', category: 'Archive', desc: 'Unix tape archive', mime: 'application/x-tar' },
  gz: { type: 'GZIP Archive', category: 'Archive', desc: 'GNU zip compressed file', mime: 'application/gzip' },
  bz2: { type: 'BZIP2 Archive', category: 'Archive', desc: 'BZIP2 compressed file', mime: 'application/x-bzip2' },
  
  // Images
  jpg: { type: 'JPEG Image', category: 'Image', desc: 'Compressed image format', mime: 'image/jpeg' },
  jpeg: { type: 'JPEG Image', category: 'Image', desc: 'Compressed image format', mime: 'image/jpeg' },
  png: { type: 'PNG Image', category: 'Image', desc: 'Lossless image format', mime: 'image/png' },
  gif: { type: 'GIF Image', category: 'Image', desc: 'Animated image format', mime: 'image/gif' },
  bmp: { type: 'Bitmap Image', category: 'Image', desc: 'Windows bitmap image', mime: 'image/bmp' },
  webp: { type: 'WebP Image', category: 'Image', desc: 'Modern web image format', mime: 'image/webp' },
  svg: { type: 'SVG Vector', category: 'Image', desc: 'Scalable vector graphics', mime: 'image/svg+xml' },
  ico: { type: 'Icon File', category: 'Image', desc: 'Windows icon file', mime: 'image/x-icon' },
  tiff: { type: 'TIFF Image', category: 'Image', desc: 'Tagged image file format', mime: 'image/tiff' },
  psd: { type: 'Photoshop Document', category: 'Image', desc: 'Adobe Photoshop file', mime: 'image/vnd.adobe.photoshop' },
  
  // Video
  mp4: { type: 'MP4 Video', category: 'Video', desc: 'MPEG-4 video format', mime: 'video/mp4' },
  avi: { type: 'AVI Video', category: 'Video', desc: 'Audio Video Interleave', mime: 'video/x-msvideo' },
  mkv: { type: 'Matroska Video', category: 'Video', desc: 'Open source video container', mime: 'video/x-matroska' },
  mov: { type: 'QuickTime Video', category: 'Video', desc: 'Apple QuickTime movie', mime: 'video/quicktime' },
  wmv: { type: 'Windows Media Video', category: 'Video', desc: 'Microsoft video format', mime: 'video/x-ms-wmv' },
  webm: { type: 'WebM Video', category: 'Video', desc: 'Open web video format', mime: 'video/webm' },
  
  // Audio
  mp3: { type: 'MP3 Audio', category: 'Audio', desc: 'MPEG Audio Layer 3', mime: 'audio/mpeg' },
  wav: { type: 'WAV Audio', category: 'Audio', desc: 'Waveform Audio File Format', mime: 'audio/wav' },
  flac: { type: 'FLAC Audio', category: 'Audio', desc: 'Lossless audio compression', mime: 'audio/flac' },
  aac: { type: 'AAC Audio', category: 'Audio', desc: 'Advanced Audio Coding', mime: 'audio/aac' },
  ogg: { type: 'OGG Audio', category: 'Audio', desc: 'Open source audio format', mime: 'audio/ogg' },
  wma: { type: 'Windows Media Audio', category: 'Audio', desc: 'Microsoft audio format', mime: 'audio/x-ms-wma' },
  
  // Documents
  pdf: { type: 'PDF Document', category: 'Document', desc: 'Portable Document Format', mime: 'application/pdf' },
  doc: { type: 'Word Document', category: 'Document', desc: 'Microsoft Word 97-2003', mime: 'application/msword' },
  docx: { type: 'Word Document', category: 'Document', desc: 'Microsoft Word document', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
  txt: { type: 'Text File', category: 'Document', desc: 'Plain text document', mime: 'text/plain' },
  rtf: { type: 'Rich Text Format', category: 'Document', desc: 'Rich text document', mime: 'application/rtf' },
  
  // Spreadsheets
  xls: { type: 'Excel Spreadsheet', category: 'Spreadsheet', desc: 'Microsoft Excel 97-2003', mime: 'application/vnd.ms-excel' },
  xlsx: { type: 'Excel Spreadsheet', category: 'Spreadsheet', desc: 'Microsoft Excel file', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
  csv: { type: 'CSV File', category: 'Spreadsheet', desc: 'Comma-separated values', mime: 'text/csv' },
  
  // Presentations
  ppt: { type: 'PowerPoint Presentation', category: 'Presentation', desc: 'Microsoft PowerPoint 97-2003', mime: 'application/vnd.ms-powerpoint' },
  pptx: { type: 'PowerPoint Presentation', category: 'Presentation', desc: 'Microsoft PowerPoint file', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' },
  
  // Code
  js: { type: 'JavaScript File', category: 'Code', desc: 'JavaScript source code', mime: 'text/javascript' },
  html: { type: 'HTML Document', category: 'Code', desc: 'HyperText Markup Language', mime: 'text/html' },
  css: { type: 'CSS Stylesheet', category: 'Code', desc: 'Cascading Style Sheets', mime: 'text/css' },
  php: { type: 'PHP Script', category: 'Code', desc: 'PHP server-side script', mime: 'application/x-httpd-php' },
  py: { type: 'Python Script', category: 'Code', desc: 'Python programming language', mime: 'text/x-python' },
  java: { type: 'Java Source', category: 'Code', desc: 'Java programming language', mime: 'text/x-java-source' },
  cpp: { type: 'C++ Source', category: 'Code', desc: 'C++ programming language', mime: 'text/x-c++src' },
  c: { type: 'C Source', category: 'Code', desc: 'C programming language', mime: 'text/x-csrc' },
  json: { type: 'JSON Data', category: 'Code', desc: 'JavaScript Object Notation', mime: 'application/json' },
  xml: { type: 'XML Document', category: 'Code', desc: 'Extensible Markup Language', mime: 'application/xml' },
  sql: { type: 'SQL Script', category: 'Code', desc: 'Structured Query Language', mime: 'text/x-sql' },
  
  // System
  exe: { type: 'Executable File', category: 'System', desc: 'Windows executable program', mime: 'application/x-msdownload' },
  dll: { type: 'Dynamic Link Library', category: 'System', desc: 'Windows system library', mime: 'application/x-msdownload' },
  msi: { type: 'Windows Installer', category: 'System', desc: 'Microsoft installer package', mime: 'application/x-msi' },
  deb: { type: 'Debian Package', category: 'System', desc: 'Debian software package', mime: 'application/vnd.debian.binary-package' },
  rpm: { type: 'RPM Package', category: 'System', desc: 'Red Hat package manager', mime: 'application/x-rpm' },
  dmg: { type: 'Mac Disk Image', category: 'System', desc: 'Apple disk image', mime: 'application/x-apple-diskimage' },
  iso: { type: 'Disk Image', category: 'System', desc: 'CD/DVD disk image', mime: 'application/x-iso9660-image' },
  
  // Mobile
  apk: { type: 'Android Package', category: 'Mobile', desc: 'Android application package', mime: 'application/vnd.android.package-archive' },
  ipa: { type: 'iOS App Package', category: 'Mobile', desc: 'iOS application package', mime: 'application/octet-stream' },
  
  // Fonts
  ttf: { type: 'TrueType Font', category: 'Font', desc: 'TrueType font file', mime: 'font/ttf' },
  otf: { type: 'OpenType Font', category: 'Font', desc: 'OpenType font file', mime: 'font/otf' },
  woff: { type: 'Web Font', category: 'Font', desc: 'Web Open Font Format', mime: 'font/woff' },
  
  // Config
  ini: { type: 'Configuration File', category: 'Config', desc: 'Initialization file', mime: 'text/plain' },
  cfg: { type: 'Configuration File', category: 'Config', desc: 'Configuration settings', mime: 'text/plain' },
  conf: { type: 'Configuration File', category: 'Config', desc: 'Configuration file', mime: 'text/plain' }
}

export const extensions = commonExtensions

export function getExtensionInfo(ext) {
  const cleanExt = ext.toLowerCase().replace('.', '')
  const info = extensions[cleanExt]
  
  if (info) {
    return info
  }
  
  // Fallback for unknown extensions
  return {
    type: `${cleanExt.toUpperCase()} File`,
    category: 'Other',
    desc: `${cleanExt.toUpperCase()} file format`,
    mime: 'application/octet-stream'
  }
}