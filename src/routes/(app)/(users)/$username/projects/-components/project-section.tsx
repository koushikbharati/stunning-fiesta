import ProjectHeading from './project-heading'

interface ProjectSectionProps {
  title: string
  content: string
}

export default function ProjectSection({
  title,
  content,
}: ProjectSectionProps) {
  return (
    <section className="p-4">
      <ProjectHeading>{title}</ProjectHeading>
      <p className="text-muted-foreground text-sm whitespace-pre-line">
        {content}
      </p>
    </section>
  )
}
