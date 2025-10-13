export interface FileWithProgress {
  id: string
  file: File
  progress: number
  uploaded: boolean
  dataUrl?: string
}
