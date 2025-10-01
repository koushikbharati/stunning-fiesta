import { createFileRoute } from '@tanstack/react-router'
import MainLayout from '../-components/MainLayout'

export const Route = createFileRoute('/(app)/explore/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MainLayout>Hello "/(app)/explore/"!</MainLayout>
}
