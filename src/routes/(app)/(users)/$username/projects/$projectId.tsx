import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  HiChevronLeft,
  HiMiniEye,
  HiMiniHeart,
  HiMiniUserGroup,
  HiOutlineCalendarDateRange,
  HiOutlineHeart,
  HiOutlineLink,
  HiOutlinePencilSquare,
  HiOutlineStar,
} from 'react-icons/hi2'
import PreviewCarousel from './-components/PreviewCarousel'
import { TbCategory } from 'react-icons/tb'
import { Badge } from '@/components/ui/badge'
import ProjectSection from './-components/project-section'
import ProjectHeading from './-components/project-heading'

export const Route = createFileRoute(
  '/(app)/(users)/$username/projects/$projectId'
)({
  component: RouteComponent,
})

function RouteComponent() {
  const PROJECT = {
    id: 1,
    title: 'Sprite Joke in a bottle',
    sections: [
      {
        id: 1,
        title: 'Overview',
        content:
          'Sprite Joke in a Bottle is an innovative marketing campaign by The Coca-Cola Company, designed to engage users with exclusive content from social media influencers. Additionally the site also features user-generated content uploads, a coin-based reward system, and contests, offering users the chance to earn rewards and participate in engaging activities.',
      },
      {
        id: 2,
        title: 'Contribution',
        content:
          'I implemented the infinite scroll feature for exclusive content, creating a seamless viewing experience similar to Instagram reels with the ability to load more content as the user scrolls down.\n\nThis involved fetching content from GluedIn, tracking user views and reactions, and designing the frontend experience using Intersection Observer API and scroll snap for smooth navigation.\n\nAdditionally, I worked on the content revamp, redesigning the existing interface to align with the new design specifications.',
      },
      {
        id: 3,
        title: 'Challenges',
        content:
          'One of the biggest challenges was inheriting the project from another company. Working on an existing codebase without prior involvement especially one lacking proper documentation made it difficult to navigate and implement changes efficiently. It took time to analyze the structure, understand the logic, and adapt to the development workflow.\n\nAnother challenge was the client’s request to autoplay videos with sound enabled, similar to YouTube Shorts. However, browser policies restrict autoplay with audio unless initiated by user interaction.\n\nWhile YouTube Shorts seemed to bypass this limitation, our research revealed that platforms like Facebook and Instagram initially play videos on mute, only unmuting them when the user interacts. Based on this insight, we implemented a similar approach, ensuring compliance with browser policies while maintaining a seamless user experience.',
      },
      {
        id: 4,
        title: 'Outcomes',
        content:
          'The improved content experience led to higher user engagement and retention. The UI revamp enhanced usability, while optimized video playback ensured a seamless viewing experience, aligning with the client’s expectations.',
      },
    ],
    tools: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
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
      <article className="flex-1 overflow-y-auto">
        <div className="relative aspect-video overflow-hidden">
          <img
            className="h-full w-full object-cover object-left"
            src="https://sprite-joke-in-a-bottle.coke2home.com/assets/spicy-kv/skv-english.jpg"
            alt="thumbnail"
          />
          <span className="from-background via-background/50 to-background/0 absolute inset-0 bg-gradient-to-t" />
          <div className="absolute right-0 bottom-0 left-0 flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <HiMiniHeart />
                <span className="text-sm">3k Likes</span>
              </div>
              <div className="flex items-center gap-1">
                <HiMiniUserGroup />
                <span className="text-sm">5 Contributors</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <HiMiniEye />
              <span className="text-sm">7k Views</span>
            </div>
          </div>
        </div>

        <section className="flex items-center justify-between gap-4 p-4">
          <div className="space-y-1">
            <h2 className="text-lg/tight font-bold">{PROJECT.title}</h2>
            <p className="text-muted-foreground text-sm/tight">
              Associated with ADSMN
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm">
              <HiOutlineStar />
            </Button>
            <Button variant="outline" size="icon-sm">
              <HiOutlineHeart />
            </Button>
            <Button variant="outline" size="icon-sm">
              <HiOutlineLink />
            </Button>
          </div>
        </section>

        <ul className="flex flex-col justify-between gap-4 p-4">
          <li className="flex items-center gap-2.5">
            <div className="bg-accent flex size-9 items-center justify-center rounded-full">
              <TbCategory />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Category</span>
              <span className="text-sm">Software development</span>
            </div>
          </li>
          <li className="flex items-center gap-2.5">
            <div className="bg-accent flex size-9 items-center justify-center rounded-full">
              <HiOutlineCalendarDateRange />
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Duration</span>
              <span className="text-sm">
                Oct 2024 &ndash; Mar 2025 &nbsp;&middot;&nbsp; 6 months
              </span>
            </div>
          </li>
        </ul>

        <section className="p-4">
          <ProjectHeading>Preview</ProjectHeading>
          <PreviewCarousel />
        </section>

        {PROJECT.sections.map((section) => (
          <ProjectSection key={section.id} {...section} />
        ))}

        <section className="p-4">
          <ProjectHeading>Tools</ProjectHeading>
          <ul className="flex flex-wrap gap-2">
            {PROJECT.tools.map((tool) => (
              <li key={tool}>
                <Badge variant="secondary">{tool}</Badge>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  )
}
