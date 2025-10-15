import { Button } from '@/components/ui/button'
import Cropper, { type Area, type Point } from 'react-easy-crop'
import {
  HiOutlineArrowPath,
  HiOutlinePencilSquare,
  HiOutlineSparkles,
  HiPencilSquare,
  HiSparkles,
} from 'react-icons/hi2'
import { TbFlipVertical } from 'react-icons/tb'
import AdjustmentList from './AdjustmentList'
import { Slider } from '@/components/ui/slider'
import FiltersList from './FiltersList'
import TabItem from './TabItem'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState } from 'react'
import { getFinalFilter, getPresetFilterByName } from '../-utils/filterUtils'
import type { Adjustment, EditAvatarTab, PresetFilter } from '../-utils/types'

interface EditAvatarScreenProps {
  imageUrl?: string
  onBack: () => void
}

export default function EditAvatarScreen({
  imageUrl,
  onBack,
}: EditAvatarScreenProps) {
  const {
    tab = 'filters',
    adjustment = 'brightness',
    preset = 'Normal',
    crop = { x: 0, y: 0 },
    zoom,
    rotation = 0,
    flip = { x: false, y: false },
  } = useSearch({
    from: '/(app)/(users)/$username/edit-profile/',
  })
  const navigate = useNavigate({
    from: '/$username/edit-profile',
  })

  const [adjustments, setAdjustments] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    hue: 0,
  })

  const selectedFilter = getPresetFilterByName(preset as PresetFilter)

  const handleCropChange = (crop: Point) => {
    navigate({
      search: {
        tab,
        adjustment,
        preset,
        crop,
        zoom,
        flip,
        rotation,
      },
    })
  }

  const handleZoomChange = (zoom: number) => {
    navigate({
      search: {
        tab,
        adjustment,
        preset,
        crop,
        zoom,
        flip,
        rotation,
      },
    })
  }

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    console.log(croppedArea, croppedAreaPixels)
  }

  const handlePresetSelect = (preset: PresetFilter) => {
    navigate({
      search: {
        tab,
        adjustment,
        crop,
        zoom,
        rotation,
        flip,
        preset,
      },
    })
  }

  const handleAdjustmentSelect = (adjustment: Adjustment) => {
    navigate({
      search: {
        tab,
        preset,
        crop,
        zoom,
        rotation,
        flip,
        adjustment,
      },
    })
  }

  const handleAdjustmentChange = (name: Adjustment, value: number) => {
    setAdjustments((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRotateChange = () => {
    navigate({
      search: {
        tab,
        adjustment,
        preset,
        crop,
        zoom,
        flip,
        rotation: (rotation + 90) % 360,
      },
    })
  }

  const handleFlipChange = (axis: 'x' | 'y') => {
    navigate({
      search: {
        tab,
        adjustment,
        preset,
        crop,
        zoom,
        rotation,
        flip: { ...flip, [axis]: !flip[axis] },
      },
    })
  }

  const finalFilter = getFinalFilter(adjustments, selectedFilter.values)

  const handleTabSwitch = (tab: EditAvatarTab) => {
    navigate({
      search: {
        tab,
        adjustment,
        preset,
        crop,
        zoom,
        rotation,
        flip,
      },
    })
  }

  const handleBackPress = () => {
    onBack()
    setAdjustments({ brightness: 100, contrast: 100, saturation: 100, hue: 0 })
    navigate({
      search: {
        tab: undefined,
        adjustment: undefined,
        preset: undefined,
        crop: undefined,
        zoom: undefined,
        rotation: undefined,
        flip: undefined,
      },
    })
  }

  return (
    <div className="flex h-dvh flex-col">
      <header className="bg-background flex h-12 items-center justify-between">
        <Button variant="ghost" size="sm" onClick={handleBackPress}>
          Back
        </Button>
        <h1 className="text-lg leading-none font-semibold">Edit avatar</h1>
        <Button variant="ghost" size="sm" onClick={handleBackPress}>
          Save
        </Button>
      </header>
      <article className="relative aspect-square overflow-hidden">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={1 / 1}
          cropShape="round"
          objectFit="cover"
          onCropChange={handleCropChange}
          onZoomChange={handleZoomChange}
          onCropComplete={onCropComplete}
          style={{
            containerStyle: {
              transform: `scale(${flip.x ? -1 : 1}, ${flip.y ? -1 : 1})`,
              transition: 'transform 0.2s ease',
            },
            mediaStyle: {
              objectFit: 'contain',
              filter: finalFilter,
              rotate: `${rotation}deg`,
              transition: 'filter 0.1s ease, rotate 0.2s ease',
            },
          }}
        />
        <Button
          className="absolute bottom-4 left-4"
          variant="outline"
          size="icon-sm"
          onClick={() => handleFlipChange('x')}
        >
          <TbFlipVertical className="fill-primary size-5" strokeWidth={1.5} />
        </Button>
        <Button
          className="absolute right-4 bottom-4"
          variant="outline"
          size="icon-sm"
          onClick={handleRotateChange}
        >
          <HiOutlineArrowPath className="size-5" strokeWidth={1.5} />
        </Button>
      </article>
      <section className="flex flex-1 flex-col justify-center">
        {tab === 'edit' && (
          <>
            <AdjustmentList
              adjustments={adjustments}
              selectedAdjustment={adjustment}
              onSelect={handleAdjustmentSelect}
            />
            <div className="p-4">
              <Slider
                key={adjustment}
                name={adjustment}
                defaultValue={[adjustments[adjustment]]}
                min={0}
                max={adjustment === 'hue' ? 360 : 200}
                step={1}
                onValueChange={(value) =>
                  handleAdjustmentChange(adjustment, value[0])
                }
              />
            </div>
          </>
        )}

        {tab === 'filters' && (
          <FiltersList
            selectedPreset={preset as PresetFilter}
            onSelect={handlePresetSelect}
          />
        )}
      </section>
      <ul className="_border-t flex items-center justify-center">
        <TabItem
          onClick={() => handleTabSwitch('filters')}
          isActive={tab === 'filters'}
        >
          {tab === 'filters' ? (
            <HiSparkles className="size-5" />
          ) : (
            <HiOutlineSparkles className="size-5" />
          )}
          Filters
        </TabItem>
        <TabItem
          onClick={() => handleTabSwitch('edit')}
          isActive={tab === 'edit'}
        >
          {tab === 'edit' ? (
            <HiPencilSquare className="size-5" />
          ) : (
            <HiOutlinePencilSquare className="size-5" />
          )}
          Edit
        </TabItem>
      </ul>
    </div>
  )
}
