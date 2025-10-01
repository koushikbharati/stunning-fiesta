import { Button } from '@/components/ui/button'
import { HiPlus } from 'react-icons/hi2'

interface TitleProps {
  title: string
  onAdd?: () => void
}
export default function Title({ title, onAdd }: TitleProps) {
  return (
    <div className="flex items-center justify-between p-4 pb-2">
      <h2 className="text-xl/none font-semibold">{title}</h2>
      <Button size="icon" variant="ghost" onClick={onAdd}>
        <HiPlus className="size-6" />
      </Button>
    </div>
  )
}
