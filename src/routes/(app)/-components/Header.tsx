import { Button } from '@/components/ui/button'
import { HiBars3, HiOutlineBell } from 'react-icons/hi2'

export default function Header() {
  return (
    <header className="_border-b flex h-12 items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <img className="size-6" src="/sunflower.png" alt="logo" />
        <h1 className="font-act-cursive text-lg font-semibold">Sunflower</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <HiOutlineBell className="size-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <HiBars3 className="size-6" />
        </Button>
      </div>
    </header>
  )
}
