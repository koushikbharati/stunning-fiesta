import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { HiChevronLeft } from 'react-icons/hi2'

export const Route = createFileRoute('/(app)/(users)/$username/projects/add')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-dvh flex-col">
      <header className="bg-background flex h-12 items-center justify-between px-2">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link
            to="/$username/projects"
            params={{ username: Route.useParams().username }}
          >
            <HiChevronLeft className="size-5 stroke-1" />
          </Link>
        </Button>
        <h1 className="text-lg leading-none font-semibold">Add project</h1>
        <Button variant="ghost" size="sm">
          Save
        </Button>
      </header>
      <section className="flex flex-1 flex-col justify-center"></section>
    </div>
  )
}
