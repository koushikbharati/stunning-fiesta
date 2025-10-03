import { Button } from '@/components/ui/button'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { HiChevronLeft } from 'react-icons/hi2'

export const Route = createFileRoute('/(app)/(users)/$username/connections')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="_bg-red-100 flex h-dvh flex-col">
      <header className="bg-background flex h-12 items-center justify-between">
        <Button variant="ghost" size="icon" asChild>
          <Link
            to="/$username"
            params={{ username: Route.useParams().username }}
          >
            <HiChevronLeft className="size-5 stroke-1" />
          </Link>
        </Button>
        <h1 className="text-lg leading-none font-semibold">
          @{Route.useParams().username}
        </h1>
        <button className="size-9 opacity-0"></button>
      </header>
      <div className="flex items-center justify-center border-b">
        <Link
          className="text-muted-foreground data-[status='active']:text-primary data-[status='active']:before:bg-primary relative flex h-10 flex-1 items-center justify-center font-semibold transition-colors data-[status='active']:before:absolute data-[status='active']:before:bottom-0 data-[status='active']:before:h-0.5 data-[status='active']:before:w-1/2 data-[status='active']:before:rounded-full"
          to="/$username/connections/following"
          params={{ username: Route.useParams().username }}
        >
          Following
        </Link>
        <Link
          className="text-muted-foreground data-[status='active']:text-primary data-[status='active']:before:bg-primary relative flex h-10 flex-1 items-center justify-center font-semibold transition-colors data-[status='active']:before:absolute data-[status='active']:before:bottom-0 data-[status='active']:before:h-0.5 data-[status='active']:before:w-1/2 data-[status='active']:before:rounded-full"
          to="/$username/connections/followers"
          params={{ username: Route.useParams().username }}
        >
          Followers
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  )
}
