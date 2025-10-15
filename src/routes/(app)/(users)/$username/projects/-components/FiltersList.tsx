import { Button } from '@/components/ui/button'

interface FiltersListProps {
  filter: string
  onFilterChange: (filter: string) => void
}

export default function FiltersList({
  filter,
  onFilterChange,
}: FiltersListProps) {
  const FILTERS = [
    {
      value: 'latest',
      label: 'Latest',
    },
    {
      value: 'featured',
      label: 'Featured',
    },
    {
      value: 'personal',
      label: 'Personal',
    },
  ]
  return (
    <div className="flex items-center gap-2 px-4 py-2">
      {FILTERS.map((item) => (
        <Button
          key={item.value}
          size="sm"
          variant={filter === item.value ? 'default' : 'outline'}
          onClick={() => onFilterChange(item.value)}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}
