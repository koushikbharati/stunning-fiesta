import { Button } from '@/components/ui/button'
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
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { useImagePreview } from '@/hooks/use-preview'
import { formatFileSize, getFileType } from '@/utils/file-utils'
import { createFileRoute, Link } from '@tanstack/react-router'
import { LucideLoader } from 'lucide-react'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import {
  HiOutlineCloudArrowUp,
  HiOutlineFolder,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineXMark,
} from 'react-icons/hi2'

export const Route = createFileRoute('/(app)/(users)/$username/projects/add')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      title: '',
      thumbnail: undefined,
      category: '',
      link: '',
      sections: [{ heading: 'Overview', content: '' }],
      media: [
        {
          file: undefined,
          caption: '',
        },
      ],
    },
  })

  const watchedValues = useWatch({
    control: form.control,
  })

  const {
    isLoading: isGeneratingThumbnailPreview,
    previewUrl: thumbnailPreview,
  } = useImagePreview(watchedValues.thumbnail?.[0])

  const handleRemoveThumbnail = () => {
    form.setValue('thumbnail', undefined)
  }

  const sectionFields = useFieldArray({
    control: form.control,
    name: 'sections',
  })

  const mediaFields = useFieldArray({
    control: form.control,
    name: 'media',
  })

  const handleAddSection = () => {
    sectionFields.append(
      { heading: '', content: '' },
      {
        shouldFocus: false,
      }
    )
  }

  const handleAddMedia = () => {
    mediaFields.append(
      { file: undefined, caption: '' },
      {
        shouldFocus: false,
      }
    )
  }

  const handleRemoveSection = (index: number) => {
    if (index === 0) return
    sectionFields.remove(index)
  }

  const handleRemoveMedia = (index: number) => {
    mediaFields.remove(index)
  }

  const handleRemoveMediaFile = (index: number) => {
    mediaFields.update(index, {
      file: undefined,
      caption: watchedValues.media?.[index].caption ?? '',
    })
  }

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
      <section className="flex flex-1 flex-col overflow-y-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 p-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Write a title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-2">
              <Label className="text-foreground">Category</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {
                      // TODO: Fetch categories
                      CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    {watchedValues.thumbnail ? (
                      <div className="bg-background relative aspect-video overflow-hidden rounded-md shadow-xs">
                        {isGeneratingThumbnailPreview ? (
                          <Skeleton className="absolute inset-0 flex items-center justify-center">
                            <LucideLoader className="size-6 animate-spin" />
                          </Skeleton>
                        ) : (
                          <>
                            <img
                              src={thumbnailPreview ?? undefined}
                              alt="thumbnail"
                              className="h-full w-full object-cover"
                            />
                            <Button
                              className="absolute top-2 right-2 flex items-center gap-2"
                              type="button"
                              variant="outline"
                              size="icon-sm"
                              onClick={handleRemoveThumbnail}
                            >
                              <HiOutlineXMark className="size-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    ) : (
                      <label className="relative flex aspect-video flex-col items-center justify-center rounded-md border border-dashed">
                        <div className="bg-accent mb-2 flex size-12 items-center justify-center rounded-full">
                          <HiOutlineCloudArrowUp className="size-6" />
                          <input
                            className="absolute inset-0"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => field.onChange(e.target.files)}
                          />
                        </div>
                        <p className="font-medium">Tap to upload</p>
                        <p className="text-muted-foreground text-xs">
                          PNG, JPEG, WEBP or GIF (max. 5MB)
                        </p>
                      </label>
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <h2 className="leading-none font-semibold">Sections</h2>
              {sectionFields.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-card space-y-2 rounded-md border p-4 shadow-xs"
                >
                  <FormField
                    control={form.control}
                    name={`sections.${index}.heading`}
                    disabled={index === 0}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <InputGroup>
                            <InputGroupInput
                              placeholder="Write a heading"
                              {...field}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`sections.${index}.content`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputGroup>
                            <InputGroupTextarea
                              placeholder="Write some content"
                              {...field}
                            />
                            <InputGroupAddon className="" align="block-end">
                              <InputGroupText className="text-muted-foreground ml-auto text-xs">
                                {watchedValues.sections?.[index]?.content
                                  ?.length || 0}
                                &nbsp;/ 1000
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={index === 0}
                      onClick={() => handleRemoveSection(index)}
                    >
                      <HiOutlineTrash className="size-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                type="button"
                className="w-full"
                variant="outline"
                onClick={handleAddSection}
              >
                <HiOutlinePlus className="size-4" strokeWidth={2} />
                Add section
              </Button>
            </div>

            <div className="space-y-4">
              <h2 className="leading-none font-semibold">Media</h2>
              {mediaFields.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="bg-card space-y-2 rounded-md border p-4 shadow-xs"
                >
                  <FormField
                    control={form.control}
                    name={`media.${index}.file`}
                    render={({ field }) => {
                      const file = watchedValues.media?.[index]?.file?.[0]
                      const fileType = file && getFileType(file)

                      const {
                        isLoading: isGeneratingMediaPreview,
                        previewUrl: mediaPreview,
                      } = useImagePreview(file)

                      return (
                        <FormItem className="flex-1">
                          <FormControl>
                            {watchedValues.media?.[index]?.file ? (
                              <div className="rounded-md border p-4">
                                <div className="flex items-center gap-2">
                                  {isGeneratingMediaPreview ? (
                                    <Skeleton className="_rounded-none flex aspect-square size-9 items-center justify-center">
                                      <LucideLoader className="size-3.5 animate-spin" />
                                    </Skeleton>
                                  ) : (
                                    <img
                                      src={mediaPreview ?? undefined}
                                      alt="media"
                                      className="aspect-square size-9 object-cover"
                                    />
                                  )}

                                  <div className="flex-1 space-y-1.5">
                                    <p className="line-clamp-1 text-xs/none font-medium">
                                      {file?.name}
                                    </p>
                                    <p className="text-muted-foreground text-xs/none">
                                      {formatFileSize(file?.size)}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => handleRemoveMediaFile(index)}
                                  >
                                    <HiOutlineXMark className="size-4" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <InputGroup>
                                <InputGroupInput
                                  type="file"
                                  onChange={(e) =>
                                    field.onChange(e.target.files)
                                  }
                                />
                                <InputGroupAddon>
                                  <HiOutlineFolder className="size-4" />
                                </InputGroupAddon>
                              </InputGroup>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />

                  <FormField
                    control={form.control}
                    name={`media.${index}.caption`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputGroup>
                            <InputGroupTextarea
                              placeholder="Write a caption (optional)"
                              {...field}
                            />
                            <InputGroupAddon className="" align="block-end">
                              <InputGroupText className="text-muted-foreground ml-auto text-xs">
                                {watchedValues.media?.[index]?.caption
                                  ?.length || 0}
                                &nbsp;/ 200
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveMedia(index)}
                    >
                      <HiOutlineTrash className="size-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                className="w-full"
                type="button"
                variant="outline"
                onClick={handleAddMedia}
              >
                <HiOutlinePlus className="size-4" strokeWidth={2} />
                Add media
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  )
}

const CATEGORIES = [
  { label: 'Software Development', value: 'software_development' },
  { label: 'Research / Academic', value: 'research_academic' },
  { label: 'Creative / Design', value: 'creative_design' },
  { label: 'Marketing / Business', value: 'marketing_business' },
  { label: 'Product Development', value: 'product_development' },
  { label: 'Event Planning', value: 'event_planning' },
  { label: 'Open Source Contribution', value: 'open_source_contribution' },
  { label: 'Content Creation / Media', value: 'content_creation_media' },
  { label: 'Data Science / Analytics', value: 'data_science_analytics' },
  { label: 'Education / Training', value: 'education_training' },
  { label: 'Engineering / Hardware', value: 'engineering_hardware' },
  { label: 'Other', value: 'other' },
]
