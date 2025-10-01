import { createFileRoute } from '@tanstack/react-router'
import MainLayout from '../-components/MainLayout'

export const Route = createFileRoute('/(app)/chats/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MainLayout>Hello "/(app)/chats/"!</MainLayout>
}
