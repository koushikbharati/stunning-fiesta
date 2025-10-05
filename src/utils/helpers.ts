/**
 * Format a large number into a compact form (e.g. 1.9k, 2M, 3.4B).
 * - Truncates instead of rounding
 * - Removes trailing .0
 */
export function formatNumberCompact(value: number): string {
  if (value < 1000) return value.toString()

  if (value < 1_000_000) {
    const result = Math.floor(value / 100) / 10 // thousands
    return (result % 1 === 0 ? result.toFixed(0) : result.toString()) + 'k'
  }

  if (value < 1_000_000_000) {
    const result = Math.floor(value / 100_000) / 10 // millions
    return (result % 1 === 0 ? result.toFixed(0) : result.toString()) + 'M'
  }

  const result = Math.floor(value / 100_000_000) / 10 // billions
  return (result % 1 === 0 ? result.toFixed(0) : result.toString()) + 'B'
}

/**
 * Extracts a clean domain + path from a URL
 * - Removes protocol (http/https)
 * - Removes "www." prefix
 * - Keeps the path if present
 *
 * @param url The input URL
 * @returns Cleaned string (e.g. "koushikbharati.dev/abc")
 */
export function extractDomainWithPath(url: string): string {
  try {
    const parsed = new URL(url)
    const hostname = parsed.hostname.startsWith('www.')
      ? parsed.hostname.slice(4)
      : parsed.hostname
    return hostname + parsed.pathname.replace(/\/$/, '') // remove trailing slash
  } catch {
    // Fallback for invalid URLs
    return url.replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')
  }
}

export async function readFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      }
    })
    reader.readAsDataURL(file)
  })
}
