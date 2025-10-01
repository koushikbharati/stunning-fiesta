import { Button } from '@/components/ui/button'

interface NoDataFoundProps {
  message: string
  btnText?: string
  onClick?: () => void
}
export default function NoDataFound({
  message,
  btnText,
  onClick,
}: NoDataFoundProps) {
  return (
    <div className="relative flex flex-col items-center space-y-4 p-4">
      <img
        className="mx-auto opacity-50 contrast-150 grayscale"
        src="/no_data.png"
        alt="No data found thumbnail"
        draggable={false}
      />
      <p className="text-muted-foreground mb-4 text-center text-sm text-pretty">
        {message}
      </p>
      <Button onClick={onClick}>{btnText || 'Add'}</Button>
    </div>
  )
}
