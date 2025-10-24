export interface FileWithProgress {
  id: string
  file: File
  progress: number
  uploaded: boolean
  dataUrl?: string
}

export type FileCategory =
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'archive'
  | 'text'
  | 'other'
