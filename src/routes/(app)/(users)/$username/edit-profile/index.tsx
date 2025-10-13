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
import { Calendar } from '@/components/ui/calendar'
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
} from '@/components/ui/input-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import type { EditAvatarTab, FileWithProgress } from '@/types/common'
import { readFile } from '@/utils/helpers'
import { createFileRoute, Link } from '@tanstack/react-router'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import {
  HiChevronLeft,
  HiOutlinePencilSquare,
  HiOutlineSparkles,
  HiSlash,
  HiXMark,
} from 'react-icons/hi2'
import { TbCheck } from 'react-icons/tb'
import TabItem from './-components/TabItem'
import Cropper, { type Area, type Point } from 'react-easy-crop'
import { Slider } from '@/components/ui/slider'
import AdjustmentList from './-components/AdjustmentList'

const editProfileSearchSchema = z.object({
  tab: z.enum(['edit', 'filters']).catch('edit'),
  adjustment: z
    .enum(['brightness', 'contrast', 'saturation', 'hue'])
    .catch('brightness'),
})

export const Route = createFileRoute('/(app)/(users)/$username/edit-profile/')({
  component: RouteComponent,
  validateSearch: editProfileSearchSchema,
})

function RouteComponent() {
  const username = Route.useParams().username
  const navigate = Route.useNavigate()
  const { tab, adjustment } = Route.useSearch()
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState<FileWithProgress | null>(
    null
  )
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [adjustments, setAdjustments] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
  })

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
        tab: 'edit',
        adjustment: 'brightness',
      },
    })
    setOpenAvatarDialog(false)

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels)
  }

  const handleAdjustmentSelect = (name: keyof typeof adjustments) => {
    navigate({
      search: {
        tab,
        adjustment: name,
      },
    })
  }

  const handleAdjustmentChange = (
    name: keyof typeof adjustments,
    value: number
  ) => {
    setAdjustments((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleTabSwitch = (tab: EditAvatarTab) => {
    navigate({
      search: {
        tab,
        adjustment,
      },
    })
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
      <div className="flex h-dvh flex-col">
        <header className="bg-background flex h-12 items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedAvatar(null)}
          >
            <HiXMark className="size-5 stroke-1" />
          </Button>
          <h1 className="text-lg leading-none font-semibold">Edit avatar</h1>
          <Button className="invisible" variant="ghost" size="icon"></Button>
        </header>
        <article
          className="relative aspect-square"
          style={{
            filter: `
      brightness(${adjustments.brightness}%)
      contrast(${adjustments.contrast}%)
      saturate(${adjustments.saturation}%)
      hue-rotate(${adjustments.hue}deg)
    `,
          }}
        >
          <Cropper
            image={selectedAvatar.dataUrl}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            objectFit="cover"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </article>
        <section className="flex flex-1 flex-col justify-center">
          {tab === 'edit' && (
            <>
              <AdjustmentList
                selectedValue={adjustment}
                onSelect={handleAdjustmentSelect}
              />
              <div className="p-4">
                <Slider
                  key={adjustment}
                  name={adjustment}
                  defaultValue={[adjustments[adjustment]]}
                  min={0}
                  max={200}
                  step={1}
                  onValueChange={(value) =>
                    handleAdjustmentChange(adjustment, value[0])
                  }
                />
              </div>
            </>
          )}

          {tab === 'filters' && (
            <ul className="flex items-center gap-4 overflow-x-auto p-4">
              {Array(10)
                .fill(null)
                .map((_, i) => (
                  <li key={i} className="flex flex-col items-center gap-2">
                    <p className="text-muted-foreground text-xs font-medium">
                      Filter {i + 1}
                    </p>
                    <div className="bg-muted aspect-square size-24"></div>
                  </li>
                ))}
            </ul>
          )}
        </section>
        <ul className="flex items-center justify-center border-t">
          <TabItem
            onClick={() => handleTabSwitch('edit')}
            isActive={tab === 'edit'}
          >
            <HiOutlinePencilSquare className="size-5" />
            Edit
          </TabItem>
          <TabItem
            onClick={() => handleTabSwitch('filters')}
            isActive={tab === 'filters'}
          >
            <HiOutlineSparkles className="size-5" />
            Filters
          </TabItem>
        </ul>
      </div>
    )
  }

  return (
    <div className="flex h-dvh flex-col">
      <header className="bg-background flex h-12 items-center justify-between">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/$username" params={{ username }}>
            <HiChevronLeft className="size-5 stroke-1" />
          </Link>
        </Button>
        <h1 className="text-lg leading-none font-semibold">Edit profile</h1>
        <Button className="invisible" variant="ghost" size="icon"></Button>
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
