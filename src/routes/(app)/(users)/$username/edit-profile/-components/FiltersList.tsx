export default function FiltersList() {
  return (
    <ul className="flex items-center gap-4 overflow-x-auto p-4">
      {Array(10)
        .fill(null)
        .map((_, i) => (
          <li key={i} className="flex flex-col items-center gap-2">
            <p className="text-muted-foreground text-xs font-medium">
              Filter {i + 1}
            </p>
            <div className="bg-muted aspect-square size-24"></div>
          </li>
        ))}
    </ul>
  )
}
