import SearchInput from '@/components/ui/SearchInput'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute(
  '/(app)/(users)/$username/connections/following'
)({
  component: RouteComponent,
})

function RouteComponent() {
  const [search, setSearch] = useState('')

  return (
    <div>
      <div className="p-4">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch('')}
        />
      </div>
      <ul>
        {Array(12)
          .fill(null)
          .map((_, i) => (
            <li key={i} className="p-4">
              <div className="flex items-center gap-2">
                <div className="bg-muted aspect-square size-12 rounded-full" />
                <div className="space-y-1">
                  <div className="leading-none font-medium">
                    Following {i + 1}
                  </div>
                  <div className="text-muted-foreground leading-none">
                    @username_{i + 1}
                  </div>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  )
}
