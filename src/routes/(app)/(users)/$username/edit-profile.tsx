import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { useForm } from 'react-hook-form'
import { HiChevronLeft, HiOutlineTrash } from 'react-icons/hi2'
import { TbCheck } from 'react-icons/tb'
import { RxPinTop } from 'react-icons/rx'
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

import React, { useState, useCallback } from 'react'
import Cropper, { type Area, type Point } from 'react-easy-crop'
import { getCroppedImg } from '@/utils/getCroppdImage'
import { readFile } from '@/utils/helpers'

export const Route = createFileRoute('/(app)/(users)/$username/edit-profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const [avatar, setAvatar] = useState<string | undefined>(undefined)

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const imageDataUrl = await readFile(file)
    setAvatar(imageDataUrl)
  }

  return (
    <div className="flex h-dvh flex-col">
      <header className="bg-background flex h-12 items-center justify-between px-2">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link
            to="/$username"
            params={{ username: Route.useParams().username }}
          >
            <HiChevronLeft className="size-5 stroke-1" />
          </Link>
        </Button>
        <h1 className="text-lg leading-none font-semibold">Edit profile</h1>
        <Button variant="ghost" size="icon-sm" className="invisible"></Button>
      </header>
      <div className="flex-1 overflow-y-auto">
        <AvatarSection onAvatarChange={handleFileChange} />
        <EditProfileForm />
      </div>
      {avatar && (
        <EditAvatar avatar={avatar} onBack={() => setAvatar(undefined)} />
      )}
    </div>
  )
}

interface AvatarSectionProps {
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function AvatarSection({ onAvatarChange }: AvatarSectionProps) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 px-4 py-8">
      <Avatar className="ring-background size-24 ring-2">
        <AvatarImage
          src="https://koushik-portfolio-storage.s3.ap-south-1.amazonaws.com/avatar/avatar.jpg"
          alt="@33se7en"
        />
        <AvatarFallback>KB</AvatarFallback>
      </Avatar>
      <AlertDialog>
        <DropdownMenu>
          <Button variant="outline" size="sm" asChild>
            <DropdownMenuTrigger>Change avatar</DropdownMenuTrigger>
          </Button>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <label htmlFor="picture">
                <RxPinTop className="size-5" />
                Choose from library
              </label>
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <HiOutlineTrash className="size-5" />
                Remove current avatar
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
          <input
            className="hidden"
            type="file"
            name="picture"
            id="picture"
            accept="image/*"
            onChange={onAvatarChange}
          />
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              avatar and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  )
}

function EditProfileForm() {
  const form = useForm()

  function onSubmit(values: any) {
    console.log(values)
  }
  return (
    <section className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                  <Input placeholder="https://koushikbharati.dev" {...field} />
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
                  <Input placeholder="Mumbai, Maharashtra, India" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-2">
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

            <FormField
              control={form.control}
              name="showDob"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Show this on your profile</FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button className="w-full" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
    </section>
  )
}

interface EditAvatarProps {
  avatar?: string
  onBack: () => void
}

function EditAvatar({ avatar, onBack }: EditAvatarProps) {
  const [cropPixels, setCropPixels] = useState<Area | null>(null)

  const onSave = () => {
    if (!cropPixels) return
    const croppedImage = getCroppedImg(avatar!, cropPixels)
    console.log(croppedImage)
    onBack()
  }
  return (
    <div className="bg-background fixed inset-0 flex h-dvh flex-col">
      <header className="bg-background flex h-12 items-center justify-between px-2">
        <Button variant="ghost" size="sm" onClick={onBack}>
          Cancel
        </Button>
        <h1 className="text-lg leading-none font-semibold">Edit avatar</h1>
        <Button variant="ghost" size="sm" onClick={onSave}>
          Save
        </Button>
      </header>
      <ImageCropper imageSrc={avatar} onCropComplete={setCropPixels} />
    </div>
  )
}

interface CropProps {
  imageSrc?: string
  onCropComplete: (croppedArea: Area) => void
}

function ImageCropper({ imageSrc, onCropComplete }: CropProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [flipX, setFlipX] = useState(false)
  const [flipY, setFlipY] = useState(false)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)
  const [saturation, setSaturation] = useState(100)
  const [hue, setHue] = useState(0)

  const onCropChange = (crop: Point) => {
    setCrop(crop)
  }

  const onZoomChange = (zoom: number) => {
    setZoom(zoom)
  }

  const handleCropComplete = useCallback(
    (croppedArea: Area) => {
      onCropComplete(croppedArea)
    },
    [onCropComplete]
  )

  return (
    <>
      <div
        className="relative flex-1 overflow-y-auto"
        style={{
          transform: `scaleX(${flipX ? -1 : 1}) scaleY(${flipY ? -1 : 1})`,
          filter: `
      brightness(${brightness}%)
      contrast(${contrast}%)
      saturate(${saturation}%)
      hue-rotate(${hue}deg)
    `,
        }}
      >
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          cropShape="round"
          objectFit="horizontal-cover"
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={handleCropComplete}
        />
      </div>
      <button onClick={() => setFlipX((f) => !f)}>Flip Horizontal</button>
      <button onClick={() => setFlipY((f) => !f)}>Flip Vertical</button>

      <div style={{ marginTop: 10 }}>
        <label>Brightness</label>
        <input
          type="range"
          min="0"
          max="200"
          value={brightness}
          onChange={(e) => setBrightness(Number(e.target.value))}
        />

        <label>Contrast</label>
        <input
          type="range"
          min="0"
          max="200"
          value={contrast}
          onChange={(e) => setContrast(Number(e.target.value))}
        />

        <label>Saturation</label>
        <input
          type="range"
          min="0"
          max="200"
          value={saturation}
          onChange={(e) => setSaturation(Number(e.target.value))}
        />

        <label>Hue</label>
        <input
          type="range"
          min="0"
          max="360"
          value={hue}
          onChange={(e) => setHue(Number(e.target.value))}
        />
      </div>
    </>
  )
}
