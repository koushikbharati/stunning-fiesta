import { useEffect, useState } from 'react'

export function useFilePreview(file?: File) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!file) {
      setPreviewUrl(undefined)
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
      setPreviewUrl(undefined)
    }

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  return { previewUrl, isLoading }
}
