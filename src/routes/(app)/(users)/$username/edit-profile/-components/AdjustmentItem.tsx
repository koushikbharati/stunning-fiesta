import type { Adjustment } from '@/types/common'
import type { IconType } from 'react-icons/lib'

interface AdjustmentItemProps {
  label: Adjustment
  icon: IconType
  value: number
  isSelected?: boolean
  onClick?: () => void
}

export default function AdjustmentItem({
  label,
  icon,
  value = 0,
  isSelected,
  onClick,
}: AdjustmentItemProps) {
  const maxValue = label === 'hue' ? 360 : 100
  const progress = Math.round((value / maxValue) * 100)

  return (
    <li className="flex flex-col items-center gap-2" onClick={onClick}>
      <p
        data-selected={isSelected || undefined}
        className="text-muted-foreground/50 data-[selected]:text-primary text-xs font-medium capitalize transition-colors"
      >
        {label}
      </p>
      <div className="relative flex size-16 items-center justify-center rounded-full border-2">
        <CircularProgress progress={progress} />
        <RenderValue
          value={value}
          label={label}
          icon={icon}
          isSelected={isSelected}
        />
      </div>
    </li>
  )
}

interface CircularProgressProps {
  progress: number
}

function CircularProgress({ progress }: CircularProgressProps) {
  const angle = Math.abs(progress) * 3.6

  let gradient: string

  progress >= 0
    ? (gradient = `conic-gradient(#3b45f6 0deg ${angle}deg, transparent ${angle}deg 360deg)`)
    : (gradient = `conic-gradient(transparent 0deg ${360 - angle}deg, #3b82f6 ${360 - angle}deg 360deg)`)

  return (
    <div
      className="absolute -inset-0.5 rounded-full"
      style={{
        background: gradient,
        mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), black 0)',
        WebkitMask:
          'radial-gradient(farthest-side, transparent calc(100% - 2px), black 0)',
      }}
      aria-valuenow={progress}
      aria-valuemin={-100}
      aria-valuemax={100}
      role="progressbar"
    />
  )
}

interface RenderValueProps {
  label: Adjustment
  icon: IconType
  value: number
  isSelected?: boolean
}

function RenderValue({
  value,
  label,
  icon: Icon,
  isSelected,
}: RenderValueProps) {
  const showValue = !!value && value !== 360
  const isHue = label === 'hue'

  if (showValue) {
    return (
      <span>
        {value}
        {isHue && <>&deg;</>}
      </span>
    )
  }

  if (isSelected) {
    return (
      <span>
        {isHue ? (
          <>
            {value}
            &deg;
          </>
        ) : (
          value
        )}
      </span>
    )
  }

  return <Icon className="size-8" />
}
