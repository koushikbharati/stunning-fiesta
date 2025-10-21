import { useEffect, useState } from 'react'

export function useImagePreview(file?: File | null) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null)
      return
    }

    setIsLoading(true)
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    const img = new Image()
    img.src = objectUrl

    img.onload = () => {
      setIsLoading(false)
    }

    img.onerror = () => {
      setIsLoading(false)
      setPreviewUrl(null)
    }

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  return { previewUrl, isLoading }
}
