import { useRef, useCallback, useEffect, useState } from 'react'

/**
 * Debounce a function
 *
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Debounce delay in ms
 * @returns {Function} - Debounced function
 */
export function useDebounceFn<T extends (...args: any[]) => void>(
  fn: T,
  delay = 300
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(() => {
        fn(...args)
      }, delay)
    },
    [fn, delay]
  )

  return debouncedFn
}

/**
 * Debounce a value
 *
 * @param {T} value - The value to debounce
 * @param {number} delay - Debounce delay in ms
 * @returns {T} - Debounced value
 */
export function useDebounceVal<T>(value: T, delay = 300): T {
  const [debounceValue, setDebounceValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay)

    // Cleanup the timeout if value or delay changes before timeout finishes
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounceValue
}
