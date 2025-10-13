interface AdjustmentItemProps {
  label: string
  isSelected?: boolean
  onClick?: () => void
}

export default function AdjustmentItem({
  label,
  isSelected,
  onClick,
}: AdjustmentItemProps) {
  return (
    <li className="flex flex-col items-center gap-2" onClick={onClick}>
      <p
        data-selected={isSelected || undefined}
        className="text-muted data-[selected]:text-primary text-xs font-medium capitalize transition-colors"
      >
        {label}
      </p>
      <div className="bg-accent size-24" />
    </li>
  )
}
