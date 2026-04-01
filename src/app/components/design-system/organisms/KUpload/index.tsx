import React, { useState, useRef, useCallback } from 'react';
import { Upload as UploadIcon, File as FileIcon, Image as ImageIcon, X, Paperclip, Trash2 } from 'lucide-react';
import { cn } from '../../../../../imports/utils';
import { KProgress } from '../../atoms/KProgress';
import { KText } from '../../atoms/KText/index';

export interface KUploadFile {
  uid: string;
  name: string;
  size?: number;
  type?: string;
  status?: 'uploading' | 'done' | 'error' | 'removed';
  url?: string;
  percent?: number;
  originFileObj?: File;
}

export interface KUploadProps {
  value?: KUploadFile[];
  onChange?: (files: KUploadFile[]) => void;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // bytes
  maxFiles?: number;
  disabled?: boolean;
  draggable?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * KUpload — Gestor de subida de archivos (Headless v4)
 * Implementación pura con soporte para Drag & Drop, previsualización y gestión de estado.
 */
export function KUpload({
  value = [],
  onChange,
  multiple = true,
  accept,
  maxSize,
  maxFiles,
  disabled,
  draggable = true,
  className,
  style,
  children,
}: KUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((incomingFiles: FileList | File[]) => {
    if (disabled) return;

    let newFiles: KUploadFile[] = Array.from(incomingFiles).map(file => ({
      uid: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'done',
      originFileObj: file,
      url: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));

    // Validaciones
    if (maxFiles) {
      const currentCount = value.length;
      newFiles = newFiles.slice(0, maxFiles - currentCount);
    }

    if (maxSize) {
      newFiles = newFiles.filter(f => f.size && f.size <= maxSize);
    }

    const updatedList = multiple ? [...value, ...newFiles] : newFiles;
    onChange?.(updatedList);
  }, [value, multiple, maxSize, maxFiles, disabled, onChange]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const removeFile = (uid: string) => {
    const newList = value.filter(f => f.uid !== uid);
    onChange?.(newList);
  };

  const triggerSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("w-full font-primary", className)} style={style}>
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept={accept}
        onChange={(e) => e.target.files && handleFiles(e.target.files)}
        className="hidden"
        disabled={disabled}
      />

      {/* Area de Carga / Botón */}
      <div
        onClick={triggerSelect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={cn(
          "relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-all cursor-pointer bg-[var(--khor-surface-page)]",
          isDragging ? "border-[var(--khor-primary)] bg-[var(--khor-primary-light)]/5 scale-[1.01]" : "border-[var(--khor-neutral-200)] hover:border-[var(--khor-primary)]",
          disabled && "opacity-50 cursor-not-allowed bg-[var(--khor-neutral-100)] border-[var(--khor-neutral-300)]"
        )}
      >
        {children ? children : (
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-3 bg-[var(--khor-neutral-50)] rounded-full text-[var(--khor-neutral-400)] group-hover:text-[var(--khor-primary)] transition-colors">
              <UploadIcon className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-[var(--khor-neutral-900)]">
                Haz click o arrastra archivos para subir
              </p>
              <p className="text-xs text-[var(--khor-neutral-500)]">
                {accept ? `Soporta: ${accept}` : 'Cualquier tipo de archivo permitido'}
                {maxSize && ` • Máx. ${(maxSize / 1024 / 1024).toFixed(1)} MB`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Lista de Archivos */}
      {value.length > 0 && (
        <div className="mt-4 space-y-2">
          {value.map((file) => (
            <div 
              key={file.uid}
              className="flex items-center gap-3 p-3 bg-[var(--khor-neutral-50)]/50 border border-[var(--khor-neutral-100)] rounded-lg group animate-in slide-in-from-left-2 duration-300"
            >
              <div className="shrink-0 p-2 bg-white rounded-md shadow-sm">
                {file.type?.startsWith('image/') ? (
                  <ImageIcon className="w-4 h-4 text-emerald-500" />
                ) : (
                  <FileIcon className="w-4 h-4 text-sky-500" />
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm font-semibold text-[var(--khor-neutral-900)] truncate">
                    {file.name}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFile(file.uid); }}
                    className="p-1 text-[var(--khor-neutral-400)] hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                {file.size && (
                  <span className="text-[10px] text-[var(--khor-neutral-400)] font-medium">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                )}

                {file.status === 'uploading' && (
                  <div className="mt-2">
                    <KProgress value={file.percent || 0} size="sm" showInfo={false} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default KUpload;
