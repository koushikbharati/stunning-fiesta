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
  | 'invert'

export type PresetFilter =
  | 'Normal'
  | 'Vintage'
  | 'Cool Blue'
  | 'Noir'
  | 'Dreamy'
  | 'Inverted'
  | 'Sepia Tone'
  | 'Pop Art'
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
  invert?: number
}
