import { timeAgo } from '@/utils/DateFormat'
import { createFileRoute } from '@tanstack/react-router'
import { HiMiniArrowUpRight } from 'react-icons/hi2'
import Title from './-components/Title'
import NoDataFound from './-components/no-data-found'
import ProfileLayout from './-components/ProfileLayout'
import MainLayout from '../../-components/MainLayout'

export const Route = createFileRoute('/(app)/(users)/$username/articles')({
  component: RouteComponent,
})

function RouteComponent() {
  if (!ARTICLES.length)
    return (
      <NoDataFound
        message="Your article library is currently empty. Your thoughts and ideas are
            waiting to be shared."
        btnText="Start writing"
      />
    )

  return (
    <MainLayout>
      <ProfileLayout>
        <Title title="Articles" />
        <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          {ARTICLES.map((article) => (
            <li key={article.id} className="overflow-hidden rounded-t-2xl">
              <div className="bg-muted aspect-video">
                <img
                  className="h-full w-full object-cover"
                  src={article.thumbnailUrl}
                  alt={`${article.title} thumbnail`}
                  draggable={false}
                />
              </div>
              <div className="bg-background space-y-1.5 rounded-b-2xl border px-4 py-2">
                <h3 className="leading-tight font-medium">
                  {article.title}
                  <HiMiniArrowUpRight className="ml-1 inline-flex size-4" />
                </h3>
                <p className="text-muted-foreground text-sm">
                  {timeAgo(article.createdAt)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </ProfileLayout>
    </MainLayout>
  )
}

const landscapeImage = () => {
  const width = 1920 / 5
  const height = 1080 / 5
  return `${width}/${height}`
}

const ARTICLES = [
  {
    id: 1,
    title: 'Extending Shadcn Button component to support loading state',
    createdAt: new Date(2025, 8, 22, 17, 30),
    thumbnailUrl: `https://picsum.photos/seed/picsum/${landscapeImage()}`,
  },
  {
    id: 2,
    title: 'Extending Shadcn Button component to support loading state',
    createdAt: new Date(2025, 8, 22, 17, 30),
    thumbnailUrl: `https://picsum.photos/seed/picsum/${landscapeImage()}`,
  },
]
