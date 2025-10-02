import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import {
  HiMiniChevronLeft,
  HiMiniChevronRight,
  HiOutlineDevicePhoneMobile,
} from 'react-icons/hi2'

export default function ScreenshotCarousel() {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('select', () => {
      // Do something on select.
    })
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'start',
      }}
      className="w-full space-y-2"
    >
      <CarouselContent className="-ml-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="basis-3/4 pl-2">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-[9/16] items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HiOutlineDevicePhoneMobile className="stroke-muted-foreground size-5" />
          <span className="text-muted-foreground text-sm">Mobile</span>
        </div>
        <div className="flex items-center gap-2">
          <Button className="rounded-full" variant="outline" size="icon">
            <HiMiniChevronLeft className="size-6" />
          </Button>
          <Button className="rounded-full" variant="outline" size="icon">
            <HiMiniChevronRight className="size-6" />
          </Button>
        </div>
      </div>
    </Carousel>
  )
}
