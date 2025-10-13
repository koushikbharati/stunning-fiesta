import type { Adjustment } from '@/types/common'
import AdjustmentItem from './AdjustmentItem'
import {
  TbContrastFilled,
  TbDropletHalfFilled,
  TbRainbow,
  TbSunFilled,
} from 'react-icons/tb'

interface AdjustmentListProps {
  adjustments: {
    brightness: number
    contrast: number
    saturation: number
    hue: number
  }
  onSelect: (adjustment: Adjustment) => void
  selectedAdjustment: Adjustment
}

export default function AdjustmentList({
  adjustments,
  selectedAdjustment,
  onSelect,
}: AdjustmentListProps) {
  const ADJUSTMENTS = [
    {
      name: 'brightness',
      icon: TbSunFilled,
    },
    {
      name: 'contrast',
      icon: TbContrastFilled,
    },
    {
      name: 'saturation',
      icon: TbDropletHalfFilled,
    },
    {
      name: 'hue',
      icon: TbRainbow,
    },
  ] as const
  return (
    <ul className="flex items-center justify-between gap-4 overflow-x-auto p-4">
      {ADJUSTMENTS.map((adjustment) => (
        <AdjustmentItem
          key={adjustment.name}
          label={adjustment.name}
          icon={adjustment.icon}
          value={
            adjustment.name !== 'hue'
              ? adjustments[adjustment.name] - 100
              : adjustments[adjustment.name]
          }
          isSelected={adjustment.name === selectedAdjustment}
          onClick={() => onSelect(adjustment.name)}
        />
      ))}
    </ul>
  )
}
