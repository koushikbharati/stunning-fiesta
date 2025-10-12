import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import { HiChevronLeft, HiSlash } from 'react-icons/hi2'
import { TbCheck } from 'react-icons/tb'

export const Route = createFileRoute('/(app)/(users)/$username/edit-profile/')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm()

  const [watchedUsername, watchedBio] = useWatch({
    control: form.control,
    name: ['username', 'bio'],
  })

  function onSubmit(values: any) {
    console.log(values)
  }

  return (
    <div className="flex h-dvh flex-col">
      <header className="bg-background flex h-12 items-center justify-between">
        <Button variant="ghost" size="icon" asChild>
          <Link
            to="/$username"
            params={{ username: Route.useParams().username }}
          >
            <HiChevronLeft className="size-5 stroke-1" />
          </Link>
        </Button>
        <h1 className="text-lg leading-none font-semibold">Edit profile</h1>
        <Button className="invisible" variant="ghost" size="icon"></Button>
      </header>
      <article className="flex-1 overflow-y-auto">
        <section className="_bg-neutral-100 flex flex-col items-center justify-center gap-4 p-10">
          <Avatar className="ring-background size-24 ring-2">
            <AvatarImage
              src="https://koushik-portfolio-storage.s3.ap-south-1.amazonaws.com/avatar/avatar.jpg"
              alt="@33se7en"
            />
            <AvatarFallback>KB</AvatarFallback>
          </Avatar>

          <Button variant="outline" size="sm">
            Change avatar
          </Button>
        </section>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 p-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <InputGroup>
                      <InputGroupInput {...field} placeholder="@shadcn" />
                      <InputGroupAddon align="inline-end">
                        <div className="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full">
                          <TbCheck className="size-3" />
                        </div>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <span className="text-muted-foreground flex items-center justify-self-end text-xs">
                    {watchedBio?.length || 0}
                    <HiSlash className="size-4" />
                    150
                  </span>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="designation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="Full Stack Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://koushikbharati.dev"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Mumbai, Maharashtra, India"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant="outline">
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span className="text-muted-foreground">
                              Pick a date
                            </span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        captionLayout="dropdown"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" type="submit">
              Save changes
            </Button>
          </form>
        </Form>
      </article>
    </div>
  )
}
