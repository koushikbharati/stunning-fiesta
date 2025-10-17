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
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import {
  HiOutlinePlus,
  HiOutlinePlusCircle,
  HiOutlineTrash,
} from 'react-icons/hi2'

export const Route = createFileRoute('/(app)/(users)/$username/projects/add')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      title: '',
      sections: [{ heading: 'Overview', content: '' }],
    },
  })

  const sectionFields = useFieldArray({
    control: form.control,
    name: 'sections',
  })

  const watchedSections = useWatch({
    control: form.control,
    name: 'sections',
  })

  const handleAddSection = () => {
    sectionFields.append(
      { heading: '', content: '' },
      {
        shouldFocus: false,
      }
    )
  }

  const handleRemoveSection = (index: number) => {
    if (index === 0) return
    sectionFields.remove(index)
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

            <div className="space-y-4">
              <h2 className="text-lg/none font-semibold">Sections</h2>
              {sectionFields.fields.map((field, index) => (
                <div
                  key={field.id}
                  className="_bg-background _rounded-md _border _p-4 _shadow-xs space-y-2"
                >
                  <div className="flex items-center gap-2">
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

                    <Button
                      variant="destructive"
                      size="icon"
                      disabled={index === 0}
                      onClick={() => handleRemoveSection(index)}
                    >
                      <HiOutlineTrash className="size-5" />
                    </Button>
                  </div>

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
                                {watchedSections[index]?.content?.length} / 100
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                type="submit"
                className="w-full"
                variant="outline"
                onClick={handleAddSection}
              >
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
