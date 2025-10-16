import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useForm, useWatch } from 'react-hook-form'
import { HiOutlinePlus, HiOutlinePlusCircle } from 'react-icons/hi2'

export const Route = createFileRoute('/(app)/(users)/$username/projects/add')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm()

  const [_, watchedOverview] = useWatch({
    control: form.control,
    name: ['username', 'overview', 'bio'],
  })

  function onSubmit(values: any) {
    console.log(values)
  }
  return (
    <div className="flex h-dvh flex-col">
      <header className="bg-background flex h-12 items-center justify-between px-2">
        <Button variant="ghost" size="sm" asChild>
          <Link
            to="/$username/projects"
            params={{ username: Route.useParams().username }}
          >
            Back
          </Link>
        </Button>
        <h1 className="text-lg leading-none font-semibold">Add project</h1>
        <Button variant="ghost" size="sm">
          Save
        </Button>
      </header>
      <section className="flex flex-1 flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput placeholder="Write a title" {...field} />
                      <InputGroupAddon align="block-start">
                        <Label className="text-foreground">Title</Label>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-background flex aspect-video flex-col items-center justify-center gap-2 rounded-md border shadow-xs">
              <HiOutlinePlus className="size-8" />
              <p className="text-muted-foreground">Add a thumbnail</p>
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="overview"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputGroup>
                        <InputGroupTextarea
                          placeholder="Write a short overview"
                          {...field}
                        />
                        <InputGroupAddon align="block-start">
                          <Label className="text-foreground">Overview</Label>
                        </InputGroupAddon>
                        <InputGroupAddon className="" align="block-end">
                          <InputGroupText className="text-muted-foreground ml-auto text-xs">
                            {watchedOverview?.length || 0} / 100
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" variant="outline">
                <HiOutlinePlusCircle className="size-5" />
                Add a new section
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  )
}
