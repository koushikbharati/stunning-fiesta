import type { PropsWithChildren } from 'react'
import ButtomNav from './ButtomNav'
import Header from './Header'

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-dvh flex-col">
      <Header />
      <div className="flex-1 overflow-y-auto">{children}</div>
      <ButtomNav />
    </main>
  )
}
