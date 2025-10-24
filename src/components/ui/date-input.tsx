import React from 'react'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from './calendar'
import { FormControl } from './form'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

export interface DateInputProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: (date: Date) => boolean
  className?: string
}

export default function DateInput({
  value,
  onChange,
  disabled,
  placeholder = 'Pick a date',
  className,
}: DateInputProps) {
  const [open, setOpen] = React.useState(false)

  const handleChange = (date: Date | undefined) => {
    onChange?.(date)
    setOpen(false)
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            data-empty={!value || undefined}
            variant="outline"
            className={cn('data-[empty]:text-muted-foreground', className)}
          >
            {value ? format(value, 'PPP') : placeholder}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value ?? undefined}
          onSelect={handleChange}
          disabled={disabled}
          captionLayout="dropdown"
        />
      </PopoverContent>
    </Popover>
  )
}
