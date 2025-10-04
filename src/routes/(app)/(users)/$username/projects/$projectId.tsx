import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { HiChevronLeft, HiOutlinePencilSquare } from 'react-icons/hi2'
import ScreenshotCarousel from './-components/ScreenshotCarousel'

export const Route = createFileRoute(
  '/(app)/(users)/$username/projects/$projectId'
)({
  component: RouteComponent,
})

function RouteComponent() {
  const PROJECT = {
    id: 1,
    title: 'Sprite Joke in a bottle',
    overview:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, accusantium? Aliquam laboriosam laborum iure fugiat distinctio cum hic, ex accusantium, voluptatem obcaecati facere, nostrum autem a aliquid facilis debitis perferendis?',
    contribution:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, accusantium? Aliquam laboriosam laborum iure fugiat distinctio cum hic, ex accusantium, voluptatem obcaecati facere, nostrum autem a aliquid facilis debitis perferendis?',
    challenges:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, accusantium? Aliquam laboriosam laborum iure fugiat distinctio cum hic, ex accusantium, voluptatem obcaecati facere, nostrum autem a aliquid facilis debitis perferendis?\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, accusantium? Aliquam laboriosam laborum iure fugiat distinctio cum hic, ex accusantium, voluptatem obcaecati facere, nostrum autem a aliquid facilis debitis perferendis?',
    outcomes:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, accusantium? Aliquam laboriosam laborum iure fugiat distinctio cum hic, ex accusantium, voluptatem obcaecati facere, nostrum autem a aliquid facilis debitis perferendis?',
    tools: [
      'React',
      'Next.js',
      'Tailwind CSS',
      'TypeScript',
      'Tailwind CSS',
      'TypeScript',
    ],
  }
  return (
    <div className="flex h-dvh flex-col">
      <header className="bg-background flex h-12 items-center justify-between">
        <Button variant="ghost" size="icon" asChild>
          <Link
            to="/$username/projects"
            params={{ username: Route.useParams().username }}
          >
            <HiChevronLeft className="size-5 stroke-1" />
          </Link>
        </Button>
        <h1 className="text-lg leading-none font-semibold">{PROJECT.title}</h1>
        <Button variant="ghost" size="icon">
          <HiOutlinePencilSquare className="size-5" />
        </Button>
      </header>
      <article className="flex-1 overflow-y-auto p-4">
        <div className="mb-4 aspect-video rounded-2xl bg-green-700"></div>

        <section className="mb-8">
          <h2 className="mb-2 font-semibold">Overview</h2>
          <p className="text-muted-foreground text-sm whitespace-pre-line">
            {PROJECT.overview}
          </p>
        </section>
        <section className="mb-8">
          <h2 className="mb-2 font-semibold">Preview</h2>
          <ScreenshotCarousel type="mobile" />
          <ScreenshotCarousel type="desktop" />
        </section>
        <section className="mb-8">
          <h2 className="mb-2 font-semibold">Contribution</h2>
          <p className="text-muted-foreground text-sm whitespace-pre-line">
            {PROJECT.contribution}
          </p>
        </section>
        <section className="mb-8">
          <h2 className="mb-2 font-semibold">Challenges</h2>
          <p className="text-muted-foreground text-sm whitespace-pre-line">
            {PROJECT.challenges}
          </p>
        </section>
        <section className="mb-8">
          <h2 className="mb-2 font-semibold">Outcomes</h2>
          <p className="text-muted-foreground text-sm whitespace-pre-line">
            {PROJECT.outcomes}
          </p>
        </section>
        <section>
          <h2 className="mb-2 font-semibold">Tools</h2>
          <ul className="flex flex-wrap gap-2">
            {PROJECT.tools.map((tool) => (
              <li
                key={tool}
                className="bg-accent rounded-full px-2.5 py-1 text-xs whitespace-nowrap"
              >
                {tool}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  )
}
