export type EditAvatarTab = 'edit' | 'filters'

export type Adjustment = 'brightness' | 'contrast' | 'saturation' | 'hue'

export type CSSFilter =
  | 'sepia'
  | 'grayscale'
  | 'blur'
  | 'brightness'
  | 'contrast'
  | 'saturate'
  | 'hue-rotate'

export type PresetFilter =
  | 'Normal'
  | 'Vintage'
  | 'Cool Blue'
  | 'Warm Glow'
  | 'Noir'
  | 'Dreamy'
  | 'Cyberpunk'

export interface Adjustments {
  brightness: number
  contrast: number
  saturation: number
  hue: number
}

export interface PresetFilters {
  sepia?: number
  grayscale?: number
  blur?: number
  brightness: number
  contrast: number
  saturation: number
  hue: number
}
