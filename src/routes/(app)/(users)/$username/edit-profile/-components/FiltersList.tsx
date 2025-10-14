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
      {PRESET_FILTERS.map((preset, index) => {
        const isSelected = preset.name === selectedPreset
        return (
          <li
            key={preset.name}
            data-selected={isSelected || undefined}
            className="text-muted-foreground data-[selected]:text-primary flex flex-col items-center gap-2 opacity-50 transition-all data-[selected]:opacity-100"
            onClick={() => onSelect(preset.name as PresetFilter)}
          >
            <p className="text-xs font-medium">{preset.name}</p>
            <div
              data-selected={isSelected || undefined}
              className="bg-muted aspect-square size-24 overflow-hidden"
            >
              <img
                src="https://picsum.photos/seed/picsum/100/100"
                alt="thumbnail"
                className="h-full w-full object-cover object-center"
                style={{
                  filter: `brightness(${PRESET_FILTERS[index].values.brightness}%)
              contrast(${PRESET_FILTERS[index].values.contrast}%)
              saturate(${PRESET_FILTERS[index].values.saturation}%)
              hue-rotate(${PRESET_FILTERS[index].values.hue}deg)
              sepia(${PRESET_FILTERS[index].values?.sepia || 0})
              grayscale(${PRESET_FILTERS[index].values?.grayscale || 0})
              blur(${PRESET_FILTERS[index].values?.blur || 0}px)
              `,
                }}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
