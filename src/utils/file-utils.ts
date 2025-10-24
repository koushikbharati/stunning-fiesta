import type { FileCategory } from '@/types/common'

/**
 * Converts a file size in bytes to a human-readable string.
 *
 * @param bytes - The file size in bytes.
 * @param decimals - Number of decimal places to include (default: 2).
 * @returns A human-readable file size string (e.g. "1.23 MB").
 */
export function formatFileSize(bytes: number, decimals = 2): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  const size = parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))
  return `${size} ${sizes[i]}`
}

/**
 * Determines the general file type (category) from a File object.
 *
 * @param file - The File object to analyze.
 * @returns A FileCategory string such as "image", "video", etc.
 */
export function getFileType(file: File): FileCategory {
  const mimeType = file.type.toLowerCase()
  const extension = file.name.split('.').pop()?.toLowerCase()

  // Match by MIME type first
  if (mimeType.startsWith('image/')) return 'image'
  if (mimeType.startsWith('video/')) return 'video'
  if (mimeType.startsWith('audio/')) return 'audio'
  if (mimeType.startsWith('text/')) return 'text'
  if (mimeType === 'application/pdf') return 'document'
  if (
    mimeType === 'application/zip' ||
    mimeType === 'application/x-zip-compressed'
  )
    return 'archive'
  if (mimeType.includes('spreadsheet') || mimeType.includes('excel'))
    return 'document'
  if (mimeType.includes('word')) return 'document'
  if (mimeType.includes('presentation')) return 'document'

  // Fallback: match by file extension
  if (extension) {
    const imageExt = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp']
    const videoExt = ['mp4', 'mkv', 'mov', 'avi', 'webm']
    const audioExt = ['mp3', 'wav', 'ogg', 'flac', 'aac']
    const documentExt = [
      'pdf',
      'doc',
      'docx',
      'xls',
      'xlsx',
      'ppt',
      'pptx',
      'txt',
      'csv',
    ]
    const archiveExt = ['zip', 'rar', '7z', 'tar', 'gz']

    if (imageExt.includes(extension)) return 'image'
    if (videoExt.includes(extension)) return 'video'
    if (audioExt.includes(extension)) return 'audio'
    if (documentExt.includes(extension)) return 'document'
    if (archiveExt.includes(extension)) return 'archive'
  }

  return 'other'
}
