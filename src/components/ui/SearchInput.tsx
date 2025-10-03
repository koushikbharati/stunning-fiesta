import { HiMiniMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2'
import { Input } from './input'

interface SearchInputProps {
  value: string
  onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
  onClear?: () => void
}

export default function SearchInput({
  value,
  onChange,
  onClear,
}: SearchInputProps) {
  return (
    <div className="relative flex items-center">
      <HiMiniMagnifyingGlass className="text-muted-foreground absolute left-2 size-5" />
      <Input
        className="flex-1 px-8"
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search"
      />
      {value && (
        <HiMiniXMark
          className="text-muted-foreground absolute right-2 size-5"
          onClick={onClear}
        />
      )}
    </div>
  )
}
