import type { PropsWithChildren } from 'react'

interface TabItemProps {
  isActive: boolean
  onClick: () => void
}

export default function TabItem({
  isActive,
  onClick,
  children,
}: PropsWithChildren<TabItemProps>) {
  return (
    <li
      onClick={onClick}
      data-active={isActive || undefined}
      className="data-[active]:before:bg-primary data-[active]:text-primary text-muted-foreground relative flex h-12 flex-1 items-center justify-center gap-2 font-medium transition-colors data-[active]:before:absolute data-[active]:before:top-[-1.5px] data-[active]:before:h-0.5 data-[active]:before:w-full data-[active]:before:rounded-full"
    >
      {children}
    </li>
  )
}
