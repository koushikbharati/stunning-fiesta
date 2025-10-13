import type { Adjustment } from '@/types/common'
import AdjustmentItem from './AdjustmentItem'

interface AdjustmentListProps {
  onSelect: (adjustment: Adjustment) => void
  selectedValue: Adjustment
}

export default function AdjustmentList({
  selectedValue,
  onSelect,
}: AdjustmentListProps) {
  const ADJUSTMENTS = ['brightness', 'contrast', 'saturation', 'hue'] as const
  return (
    <ul className="flex items-center gap-8 overflow-x-auto p-4">
      {ADJUSTMENTS.map((adjustment) => (
        <AdjustmentItem
          key={adjustment}
          label={adjustment}
          isSelected={adjustment === selectedValue}
          onClick={() => onSelect(adjustment)}
        />
      ))}
    </ul>
  )
}
