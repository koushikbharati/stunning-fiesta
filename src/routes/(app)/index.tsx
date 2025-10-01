import { createFileRoute } from '@tanstack/react-router'
import MainLayout from './-components/MainLayout'

export const Route = createFileRoute('/(app)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MainLayout>Hello "/(app)/"!</MainLayout>
}
