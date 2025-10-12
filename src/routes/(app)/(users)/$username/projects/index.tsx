import { createFileRoute, Link } from '@tanstack/react-router'
import NoDataFound from '../-components/no-data-found'
import MainLayout from '@/routes/(app)/-components/MainLayout'
import ProfileLayout from '../-components/ProfileLayout'
import Title from '../-components/Title'
import { timeAgo } from '@/utils/DateFormat'
import { useState } from 'react'
import FiltersList from './-components/FiltersList'
import { Button } from '@/components/ui/button'
import { HiOutlineStar, HiStar } from 'react-icons/hi2'

export const Route = createFileRoute('/(app)/(users)/$username/projects/')({
  component: RouteComponent,
})

function RouteComponent() {
  const [filter, setFilter] = useState('latest')

  if (!PROJECTS.length)
    return (
      <MainLayout>
        <ProfileLayout>
          <NoDataFound
            message="Ready to show off your work? Add your first project now to let others see what you've created."
            btnText="Add project"
          />
        </ProfileLayout>
      </MainLayout>
    )

  return (
    <MainLayout>
      <ProfileLayout>
        <Title title="Projects" />
        <div>
          <FiltersList
            filter={filter}
            onFilterChange={(filter) => setFilter(filter)}
          />
          <ul>
            {PROJECTS.map((project) => (
              <li
                key={project.id}
                className="relative flex gap-4 border-b p-4 last:border-none"
              >
                <Link
                  to="/$username/projects/$projectId"
                  params={{
                    projectId: project.id.toString(),
                    username: Route.useParams().username,
                  }}
                  className="absolute inset-0"
                />
                <div className="bg-accent aspect-square h-20 rounded-md"></div>
                <div className="flex-1 space-y-1">
                  <h3 className="line-clamp-1 leading-tight font-medium">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-tight">
                    Associated with {project.associated_with}
                  </p>
                  <p className="text-muted-foreground text-sm leading-tight">
                    {timeAgo(project.created_at)}
                  </p>
                </div>
                <Button
                  className="z-10 self-center"
                  size="icon"
                  variant="ghost"
                >
                  {project.featured ? (
                    <HiStar className="size-6 fill-yellow-400" />
                  ) : (
                    <HiOutlineStar className="size-6" />
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </ProfileLayout>
    </MainLayout>
  )
}

const PROJECTS = [
  {
    id: 1,
    name: 'Indra - Edu Platform',
    associated_with: 'ADSMN',
    created_at: new Date(2025, 8, 25, 11, 30, 0),
    thumbnail: '',
    featured: false,
  },
  {
    id: 2,
    name: 'Maaza - My small win',
    associated_with: 'Maharashtra Housing Development Corporation Limited',
    created_at: new Date(2025, 0, 1),
    thumbnail: '',
    featured: true,
  },
  {
    id: 3,
    name: 'Maaza - My small win',
    associated_with: 'Maharashtra Housing Development Corporation Limited',
    created_at: new Date(2025, 0, 1),
    thumbnail: '',
    featured: false,
  },
]
