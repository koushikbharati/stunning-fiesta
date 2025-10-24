import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useEffect, useState } from 'react'

export default function PreviewCarousel() {
  const [api, setApi] = useState<CarouselApi>()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('select', () => {
      setSelectedIndex(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <Carousel setApi={setApi} className="_max-w-sm w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-[4/5] items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex h-8 items-center justify-center gap-2">
        {api?.scrollSnapList().map((_, index) => (
          <button
            key={index}
            data-selected={index === selectedIndex || undefined}
            className="bg-muted-foreground/50 data-[selected]:bg-primary size-1.5 rounded-full transition-all data-[selected]:scale-125"
          />
        ))}
      </div>
    </Carousel>
  )
}
