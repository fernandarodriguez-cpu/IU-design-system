import * as React from "react"
import { X, Upload as UploadIcon, File, Image as ImageIcon, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { cn } from "./utils"
import { Button } from "./button"
import { Progress } from "./progress"

export interface UploadFile {
  uid: string
  name: string
  status: 'uploading' | 'done' | 'error'
  url?: string
  percent?: number
  size: number
  type: string
  error?: string
}

export interface UploadProps {
  multiple?: boolean
  accept?: string
  maxSize?: number // bytes
  maxFiles?: number
  value?: UploadFile[]
  onChange?: (files: UploadFile[]) => void
  onUpload?: (file: File) => Promise<UploadFile>
  listType?: 'text' | 'picture' | 'picture-card'
  showUploadList?: boolean
  disabled?: boolean
  directory?: boolean
  className?: string
  children?: React.ReactNode
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

function generateUID(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

export function Upload({
  multiple = false,
  accept,
  maxSize,
  maxFiles,
  value = [],
  onChange,
  onUpload,
  listType = 'text',
  showUploadList = true,
  disabled = false,
  directory = false,
  className,
  children,
}: UploadProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [files, setFiles] = React.useState<UploadFile[]>(value)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const dragCounter = React.useRef(0)

  React.useEffect(() => {
    setFiles(value)
  }, [value])

  const updateFiles = (newFiles: UploadFile[]) => {
    setFiles(newFiles)
    onChange?.(newFiles)
  }

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `El archivo excede el tamaño máximo de ${formatFileSize(maxSize)}`
    }

    if (accept) {
      const acceptedTypes = accept.split(',').map(t => t.trim())
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
      const mimeType = file.type

      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type.toLowerCase()
        }
        if (type.endsWith('/*')) {
          const baseType = type.split('/')[0]
          return mimeType.startsWith(baseType + '/')
        }
        return mimeType === type
      })

      if (!isAccepted) {
        return `Tipo de archivo no permitido. Acepta: ${accept}`
      }
    }

    if (maxFiles && files.length >= maxFiles) {
      return `Máximo ${maxFiles} archivo${maxFiles > 1 ? 's' : ''} permitido${maxFiles > 1 ? 's' : ''}`
    }

    return null
  }

  const processFiles = async (fileList: FileList | null) => {
    if (!fileList || disabled) return

    const filesToProcess = Array.from(fileList)
    const newFiles: UploadFile[] = []

    for (const file of filesToProcess) {
      const error = validateFile(file)
      
      const uploadFile: UploadFile = {
        uid: generateUID(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: error ? 'error' : 'uploading',
        percent: 0,
        error,
      }

      newFiles.push(uploadFile)

      if (!error && onUpload) {
        try {
          const result = await onUpload(file)
          const index = newFiles.findIndex(f => f.uid === uploadFile.uid)
          if (index !== -1) {
            newFiles[index] = { ...result, status: 'done' }
          }
        } catch (err) {
          const index = newFiles.findIndex(f => f.uid === uploadFile.uid)
          if (index !== -1) {
            newFiles[index] = {
              ...uploadFile,
              status: 'error',
              error: err instanceof Error ? err.message : 'Error al subir archivo',
            }
          }
        }
      } else if (!error && !onUpload) {
        // Si no hay handler, crear URL local para preview
        uploadFile.url = URL.createObjectURL(file)
        uploadFile.status = 'done'
        uploadFile.percent = 100
      }
    }

    updateFiles([...files, ...newFiles])
  }

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files)
    // Reset input para permitir seleccionar el mismo archivo
    e.target.value = ''
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current++
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragCounter.current--
    if (dragCounter.current === 0) {
      setIsDragging(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    dragCounter.current = 0

    if (disabled) return

    const files = e.dataTransfer.files
    processFiles(files)
  }

  const handleRemove = (uid: string) => {
    const newFiles = files.filter(f => f.uid !== uid)
    updateFiles(newFiles)
  }

  const renderFileList = () => {
    if (!showUploadList || files.length === 0) return null

    if (listType === 'picture-card') {
      return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-4">
          {files.map(file => (
            <div
              key={file.uid}
              className={cn(
                "relative aspect-square rounded-md border-2 overflow-hidden group",
                "border-[var(--border-primary)] bg-[var(--bg-secondary)]",
                file.status === 'error' && "border-red-500"
              )}
            >
              {file.url && file.type.startsWith('image/') ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <File className="h-12 w-12 text-[var(--text-tertiary)]" />
                </div>
              )}
              
              {file.status === 'uploading' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                </div>
              )}

              {file.status === 'error' && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-500/10">
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </div>
              )}

              <button
                onClick={() => handleRemove(file.uid)}
                className={cn(
                  "absolute top-1 right-1 p-1 rounded-full",
                  "bg-black/50 text-white hover:bg-black/70",
                  "opacity-0 group-hover:opacity-100 transition-opacity"
                )}
              >
                <X className="h-3 w-3" />
              </button>

              {file.error && (
                <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs p-1 truncate">
                  {file.error}
                </div>
              )}
            </div>
          ))}
        </div>
      )
    }

    if (listType === 'picture') {
      return (
        <div className="mt-4 space-y-2">
          {files.map(file => (
            <div
              key={file.uid}
              className={cn(
                "flex items-center gap-3 p-2 rounded-md border",
                "border-[var(--border-primary)] bg-[var(--bg-secondary)]",
                file.status === 'error' && "border-red-500"
              )}
            >
              <div className="flex-shrink-0 w-12 h-12 rounded overflow-hidden bg-[var(--bg-primary)]">
                {file.url && file.type.startsWith('image/') ? (
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <File className="h-6 w-6 text-[var(--text-tertiary)]" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm truncate text-[var(--text-primary)]">{file.name}</p>
                <p className="text-xs text-[var(--text-tertiary)]">{formatFileSize(file.size)}</p>
                
                {file.status === 'uploading' && file.percent !== undefined && (
                  <Progress value={file.percent} className="h-1 mt-1" />
                )}
                
                {file.status === 'error' && (
                  <p className="text-xs text-red-500 mt-1">{file.error}</p>
                )}
              </div>

              <div className="flex-shrink-0 flex items-center gap-2">
                {file.status === 'done' && (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                )}
                {file.status === 'uploading' && (
                  <Loader2 className="h-4 w-4 animate-spin text-[var(--primary)]" />
                )}
                {file.status === 'error' && (
                  <AlertCircle className="h-4 w-4 text-red-500" />
                )}
                <button
                  onClick={() => handleRemove(file.uid)}
                  className="p-1 hover:bg-[var(--bg-primary)] rounded"
                >
                  <X className="h-4 w-4 text-[var(--text-tertiary)]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )
    }

    // listType === 'text'
    return (
      <div className="mt-4 space-y-2">
        {files.map(file => (
          <div
            key={file.uid}
            className={cn(
              "flex items-center gap-2 p-2 rounded-md border",
              "border-[var(--border-primary)] bg-[var(--bg-secondary)]",
              file.status === 'error' && "border-red-500"
            )}
          >
            <File className="h-4 w-4 flex-shrink-0 text-[var(--text-tertiary)]" />
            
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate text-[var(--text-primary)]">{file.name}</p>
              {file.status === 'error' && (
                <p className="text-xs text-red-500">{file.error}</p>
              )}
            </div>

            <div className="flex-shrink-0 flex items-center gap-2">
              {file.status === 'done' && (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
              {file.status === 'uploading' && (
                <Loader2 className="h-4 w-4 animate-spin text-[var(--primary)]" />
              )}
              {file.status === 'error' && (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <button
                onClick={() => handleRemove(file.uid)}
                className="p-1 hover:bg-[var(--bg-primary)] rounded"
              >
                <X className="h-4 w-4 text-[var(--text-tertiary)]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={className}>
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          "relative cursor-pointer rounded-md border-2 border-dashed transition-colors",
          "border-[var(--border-primary)] hover:border-[var(--primary)]",
          isDragging && "border-[var(--primary)] bg-[var(--primary)]/5",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
          disabled={disabled}
          {...(directory && { webkitdirectory: "", directory: "" } as any)}
          className="hidden"
        />

        {children || (
          <div className="flex flex-col items-center justify-center p-6 text-center">
            <UploadIcon className="h-10 w-10 mb-3 text-[var(--text-tertiary)]" />
            <p className="mb-1 text-[var(--text-primary)]">
              <span className="text-[var(--primary)]">Click para subir</span> o arrastra archivos aquí
            </p>
            {(accept || maxSize) && (
              <p className="text-xs text-[var(--text-tertiary)]">
                {accept && `Acepta: ${accept}`}
                {accept && maxSize && ' · '}
                {maxSize && `Max: ${formatFileSize(maxSize)}`}
              </p>
            )}
          </div>
        )}
      </div>

      {renderFileList()}
    </div>
  )
}
