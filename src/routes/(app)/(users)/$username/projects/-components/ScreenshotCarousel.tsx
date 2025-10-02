import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import { HiOutlineDevicePhoneMobile, HiOutlineTv } from 'react-icons/hi2'

interface ScreenshotCarouselProps {
  type: 'mobile' | 'desktop'
}

export default function ScreenshotCarousel({ type }: ScreenshotCarouselProps) {
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
      className="w-full space-y-2 last:mt-4"
    >
      <CarouselContent className="-ml-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem
            key={index}
            data-type={type}
            className="pl-2 data-[type=desktop]:basis-11/12 data-[type=mobile]:basis-3/4"
          >
            <div className="p-1">
              <Card>
                <CardContent
                  style={{
                    aspectRatio: type === 'mobile' ? '9/16' : '16/9',
                  }}
                  className="flex items-center justify-center p-6"
                >
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {type === 'mobile' ? (
            <HiOutlineDevicePhoneMobile className="stroke-muted-foreground size-5" />
          ) : (
            <HiOutlineTv className="stroke-muted-foreground size-5" />
          )}
          <span className="text-muted-foreground text-sm capitalize">
            {type}
          </span>
        </div>
      </div>
    </Carousel>
  )
}
