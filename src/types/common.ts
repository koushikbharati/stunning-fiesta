export interface FileWithProgress {
  id: string
  file: File
  progress: number
  uploaded: boolean
  dataUrl?: string
}

export type EditAvatarTab = 'edit' | 'filters'

export type Adjustment = 'brightness' | 'contrast' | 'saturation' | 'hue'
