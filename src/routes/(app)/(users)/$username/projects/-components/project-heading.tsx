import type { PropsWithChildren } from 'react'

export default function ProjectHeading({ children }: PropsWithChildren) {
  return <h2 className="mb-2 font-semibold">{children}</h2>
}
