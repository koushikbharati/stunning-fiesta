import { createFileRoute } from '@tanstack/react-router'
import ProfileLayout from './-components/ProfileLayout'
import MainLayout from '../../-components/MainLayout'

export const Route = createFileRoute('/(app)/(users)/$username/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <MainLayout>
      <ProfileLayout>
        <div className="grid grid-cols-3 gap-0.5">
          {[...Array(17)].map((_, i) => (
            <div key={i} className="bg-muted aspect-square"></div>
          ))}
        </div>
      </ProfileLayout>
    </MainLayout>
  )
}
