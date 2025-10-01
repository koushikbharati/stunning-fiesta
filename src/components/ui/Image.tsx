import React from 'react'
import { HiOutlineExclamationTriangle } from 'react-icons/hi2'
import { cn } from '@/lib/utils'

// ---------- Context ----------
type ImageState = {
  isLoading: boolean
  isError: boolean
  setLoading: (v: boolean) => void
  setError: (v: boolean) => void
}

const ImageCtx = React.createContext<ImageState | null>(null)
const useImage = () => {
  const ctx = React.useContext(ImageCtx)
  if (!ctx) throw new Error('Image.* must be used within <Image.Root>')
  return ctx
}

// ---------- Root ----------
type ImageRootProps = React.HTMLAttributes<HTMLDivElement>

function ImageRoot({ className, children, ...rest }: ImageRootProps) {
  const [isLoading, setLoading] = React.useState(true)
  const [isError, setError] = React.useState(false)

  return (
    <ImageCtx.Provider value={{ isLoading, isError, setLoading, setError }}>
      <div className={cn('relative overflow-hidden', className)} {...rest}>
        {children}
      </div>
    </ImageCtx.Provider>
  )
}
ImageRoot.displayName = 'Image.Root'

// ---------- Img ----------
type ImageImgProps = React.ComponentProps<'img'> & {
  disableFadeIn?: boolean
}

function ImageImg({
  className,
  onLoad,
  onError,
  loading = 'lazy',
  draggable = false,
  disableFadeIn,
  ...props
}: ImageImgProps) {
  const { isLoading, isError, setLoading, setError } = useImage()

  return (
    <img
      {...props}
      loading={loading}
      draggable={draggable}
      onLoad={(e) => {
        setLoading(false)
        onLoad?.(e)
      }}
      onError={(e) => {
        setLoading(false)
        setError(true)
        onError?.(e)
      }}
      data-loaded={(!isLoading && !isError) || undefined}
      className={cn(
        'h-full w-full object-cover',
        disableFadeIn
          ? undefined
          : 'opacity-0 transition-opacity duration-300 data-[loaded]:opacity-100',
        className
      )}
    />
  )
}
ImageImg.displayName = 'Image.Img'

// ---------- Placeholder ----------
type ImagePlaceholderProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode
  overlay?: boolean
}

function ImagePlaceholder({ className, children, overlay = true, ...rest }: ImagePlaceholderProps) {
  const { isLoading, isError } = useImage()
  if (!isLoading || isError) return null

  return (
    <div
      className={cn(
        'flex items-center justify-center',
        overlay ? 'absolute inset-0' : 'h-full w-full',
        className
      )}
      {...rest}
    >
      {children ?? (
        <div className="size-6 animate-spin rounded-full border-4 border-gray-300 border-t-gray-950" />
      )}
    </div>
  )
}
ImagePlaceholder.displayName = 'Image.Placeholder'

// ---------- Error ----------
type ImageErrorProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode
  overlay?: boolean
}

function ImageError({ className, children, overlay = true, ...rest }: ImageErrorProps) {
  const { isError } = useImage()
  if (!isError) return null

  return (
    <div
      className={cn(
        'flex items-center justify-center bg-gray-100',
        overlay ? 'absolute inset-0' : 'h-full w-full',
        className
      )}
      {...rest}
    >
      {children ?? <HiOutlineExclamationTriangle className="text-destructive size-6" />}
    </div>
  )
}
ImageError.displayName = 'Image.Error'

// ---------- Export as namespace ----------
export const Image = {
  Root: ImageRoot,
  Img: ImageImg,
  Placeholder: ImagePlaceholder,
  Error: ImageError,
}
