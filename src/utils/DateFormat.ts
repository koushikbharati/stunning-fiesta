export function formatExperienceDate(date: Date | null) {
  if (!date) return 'Present'
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()
  return `${month} ${year}`
}

/**
 * Calculate duration between two dates in years and months.
 * @param startDate - Start date (Date or string).
 * @param endDate - End date (Date or string).
 * @returns Duration in format like "2 yrs 1 mo"
 */
export function calculateDurationYearsMonths(
  startDate: Date | string,
  endDate: Date | string
): string {
  const start = new Date(startDate)
  const end = new Date(endDate)

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid date provided')
  }

  let years = end.getFullYear() - start.getFullYear()
  let months = end.getMonth() - start.getMonth()

  if (months < 0) {
    years--
    months += 12
  }

  const parts = []
  if (years > 0) parts.push(`${years} yr${years > 1 ? 's' : ''}`)
  if (months > 0) parts.push(`${months} mo${months > 1 ? 's' : ''}`)

  return parts.length > 0 ? parts.join(' ') : '0 mo'
}

/**
 * Calculate time ago.
 * @param dateInput - Creation date (Date or string).
 * @returns Time in format like "1 min ago"
 */
export function timeAgo(dateInput: Date | string): string {
  const now = new Date()
  const date = new Date(dateInput)
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (seconds < 60) return 'just now'

  const intervals: { label: string; seconds: number }[] = [
    { label: 'year', seconds: 31536000 }, // 365*24*60*60
    { label: 'month', seconds: 2592000 }, // 30*24*60*60
    { label: 'day', seconds: 86400 }, // 24*60*60
    { label: 'hour', seconds: 3600 }, // 60*60
    { label: 'min', seconds: 60 },
  ]

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds)
    if (count >= 1) {
      return count === 1
        ? `1 ${interval.label} ago`
        : `${count} ${interval.label}s ago`
    }
  }

  return 'just now' // fallback
}
