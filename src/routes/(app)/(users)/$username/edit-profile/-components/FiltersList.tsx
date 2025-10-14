import { PRESET_FILTERS } from '../-utils/filterUtils'
import type { PresetFilter } from '../-utils/types'

interface FiltersListProps {
  selectedPreset: PresetFilter
  onSelect: (filter: PresetFilter) => void
}

export default function FiltersList({
  selectedPreset,
  onSelect,
}: FiltersListProps) {
  return (
    <ul className="flex items-center gap-4 overflow-x-auto p-4">
      {PRESET_FILTERS.map((preset) => {
        const isSelected = preset.name === selectedPreset
        return (
          <li
            key={preset.name}
            className="flex flex-col items-center gap-2"
            onClick={() => onSelect(preset.name)}
          >
            <p
              data-selected={isSelected || undefined}
              className="text-muted-foreground/50 data-[selected]:text-primary text-xs font-medium transition-colors"
            >
              {preset.name}
            </p>
            <div className="bg-muted aspect-square size-24"></div>
          </li>
        )
      })}
    </ul>
  )
}
