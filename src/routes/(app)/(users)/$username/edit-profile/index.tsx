import z from 'zod'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group'
import type { FileWithProgress } from '@/types/common'
import { readFile } from '@/utils/helpers'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { TbCheck } from 'react-icons/tb'
import EditAvatarScreen from './-components/EditAvatarScreen'
import DateInput from '@/components/ui/date-input'

const editProfileSearchSchema = z.object({
  tab: z.enum(['edit', 'filters']).catch('filters').optional(),
  adjustment: z
    .enum(['brightness', 'contrast', 'saturation', 'hue'])
    .catch('brightness')
    .optional(),
  preset: z
    .enum([
      'Normal',
      'Vintage',
      'Cool Blue',
      'Noir',
      'Dreamy',
      'Inverted',
      'Sepia Tone',
      'Pop Art',
      'Cyberpunk',
    ])
    .catch('Normal')
    .optional(),
  crop: z.object({ x: z.number(), y: z.number() }).optional(),
  zoom: z.number().min(1).max(3).catch(1).optional(),
  rotation: z.number().min(0).max(360).catch(0).optional(),
  flip: z.object({ x: z.boolean(), y: z.boolean() }).optional(),
})

export const Route = createFileRoute('/(app)/(users)/$username/edit-profile/')({
  component: RouteComponent,
  validateSearch: editProfileSearchSchema,
})

function RouteComponent() {
  const username = Route.useParams().username
  const navigate = Route.useNavigate()

  const [openAvatarDialog, setOpenAvatarDialog] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState<FileWithProgress | null>(
    null
  )

  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const imageDataUrl = await readFile(file)

    const newFile = {
      file,
      progress: 0,
      uploaded: false,
      dataUrl: imageDataUrl,
      id: Math.random().toString(36).substring(2, 9),
    }

    setSelectedAvatar(newFile)
    navigate({
      search: {
        tab: 'filters',
        preset: 'Normal',
        adjustment: 'brightness',
      },
    })
    setOpenAvatarDialog(false)

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const form = useForm()

  const [_, watchedBio] = useWatch({
    control: form.control,
    name: ['username', 'bio'],
  })

  function onSubmit(values: any) {
    console.log(values)
  }

  if (selectedAvatar) {
    return (
      <EditAvatarScreen
        imageUrl={selectedAvatar.dataUrl}
        onBack={() => setSelectedAvatar(null)}
      />
    )
  }

  return (
    <div className="flex h-dvh flex-col">
      <header className="bg-background flex h-12 items-center justify-between px-2">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/$username" params={{ username }}>
            Back
          </Link>
        </Button>
        <h1 className="text-lg leading-none font-semibold">Edit profile</h1>
        <Button variant="ghost" size="sm">
          Save
        </Button>
      </header>
      <article className="flex-1 overflow-y-auto">
        <section className="flex flex-col items-center justify-center gap-4 p-10">
          <Avatar className="ring-background size-24 ring-2">
            <AvatarImage
              src="https://koushik-portfolio-storage.s3.ap-south-1.amazonaws.com/avatar/avatar.jpg"
              alt="@33se7en"
            />
            <AvatarFallback>KB</AvatarFallback>
          </Avatar>

          <Dialog open={openAvatarDialog} onOpenChange={setOpenAvatarDialog}>
            <AlertDialog>
              <DialogTrigger asChild>
                <Button variant="outline">Change avatar</Button>
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[425px]"
                showCloseButton={false}
              >
                <DialogHeader>
                  <DialogTitle>Change avatar</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <Button
                    className="relative overflow-hidden"
                    type="button"
                    variant="outline"
                  >
                    <label
                      className="absolute inset-0 flex items-center justify-center"
                      htmlFor="picture"
                    >
                      Upload new avatar
                    </label>
                    <input
                      ref={inputRef}
                      className="hidden"
                      type="file"
                      name="picture"
                      id="picture"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Button>
                  <AlertDialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpenAvatarDialog(false)}
                    >
                      Remove current avatar
                    </Button>
                  </AlertDialogTrigger>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                </div>
              </DialogContent>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your avatar and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Dialog>
        </section>
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
                    <InputGroup>
                      <InputGroupTextarea
                        placeholder="Tell us a little bit about yourself"
                        {...field}
                      />
                      <InputGroupAddon align="block-end">
                        <InputGroupText className="text-muted-foreground ml-auto text-xs">
                          {watchedBio?.length || 0} / 120
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormControl>
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
                    <Input placeholder="https://example.com" {...field} />
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
                  <DateInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </article>
    </div>
  )
}
