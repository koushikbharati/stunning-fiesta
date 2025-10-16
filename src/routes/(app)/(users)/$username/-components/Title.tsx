import { Button } from '@/components/ui/button'
import { HiOutlinePlus } from 'react-icons/hi2'

interface TitleProps {
  title: string
  onAdd?: () => void
}
export default function Title({ title, onAdd }: TitleProps) {
  return (
    <div className="flex items-center justify-between p-4 pb-2">
      <h2 className="text-xl/none font-semibold">{title}</h2>
      <Button size="icon-sm" variant="outline" onClick={onAdd}>
        <HiOutlinePlus className="size-5" strokeWidth={2} />
      </Button>
    </div>
  )
}
