import React, { useState, useRef, useCallback } from 'react';
import { Upload as UploadIcon, File as FileIcon, Image as ImageIcon, X, Paperclip, Trash2, Plus, Eye } from 'lucide-react';
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
  thumbUrl?: string;
  percent?: number;
  originFileObj?: File;
}

export interface KUploadProps {
  value?: KUploadFile[];
  onChange?: (files: KUploadFile[]) => void;
  listType?: 'text' | 'picture' | 'picture-card';
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  disabled?: boolean;
  onPreview?: (file: KUploadFile) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * KUpload — Gestor de subida de archivos (Headless v4)
 * Soporta listType="picture-card", "picture" y "text". Gestión de previsualización y drag & drop.
 */
export function KUpload({
  value = [],
  onChange,
  listType = 'text',
  multiple = true,
  accept,
  maxSize,
  maxFiles,
  disabled,
  onPreview,
  className,
  style,
  children,
}: KUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((incomingFiles: FileList | File[]) => {
    if (disabled) return;

    let newFiles: KUploadFile[] = Array.from(incomingFiles).map(file => {
      const isImage = file.type.startsWith('image/');
      const url = isImage ? URL.createObjectURL(file) : undefined;
      return {
        uid: Math.random().toString(36).substring(7),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'done',
        originFileObj: file,
        url: url,
        thumbUrl: url
      };
    });

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

  const removeFile = (uid: string) => {
    const newList = value.filter(f => f.uid !== uid);
    onChange?.(newList);
  };

  const triggerSelect = () => fileInputRef.current?.click();

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) handleFiles(e.dataTransfer.files);
  };

  const renderPictureCardList = () => (
    <div className="flex flex-wrap gap-4 mt-4">
      {value.map(file => (
        <div 
          key={file.uid}
          className="relative w-24 h-24 group border-2 border-khor-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm transition-all hover:border-khor-primary"
        >
          {file.thumbUrl ? (
             <img src={file.thumbUrl} alt={file.name} className="w-full h-full object-cover" />
          ) : (
             <div className="w-full h-full flex flex-col items-center justify-center bg-khor-neutral-50 text-khor-neutral-400">
               <FileIcon size={20} />
               <span className="text-[8px] uppercase font-bold mt-1 max-w-[80%] truncate">{file.name.split('.').pop()}</span>
             </div>
          )}
          
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button onClick={() => onPreview?.(file)} className="p-1.5 text-white hover:bg-white/20 rounded-md"><Eye size={14} /></button>
            <button onClick={() => removeFile(file.uid)} className="p-1.5 text-white hover:bg-white/20 rounded-md"><Trash2 size={14} /></button>
          </div>
          
          {file.status === 'uploading' && (
             <div className="absolute inset-x-2 bottom-2">
               <KProgress value={file.percent || 0} size="sm" showInfo={false} />
             </div>
          )}
        </div>
      ))}
      
      {(!maxFiles || value.length < maxFiles) && (
        <button 
          onClick={triggerSelect}
          className="w-24 h-24 border-2 border-dashed border-khor-neutral-200 rounded-2xl flex flex-col items-center justify-center gap-1 text-khor-neutral-500 hover:border-khor-primary hover:text-khor-primary transition-all bg-khor-neutral-50"
        >
          <Plus size={20} />
          <span className="text-[10px] font-bold">Subir</span>
        </button>
      )}
    </div>
  );

  const renderNormalList = () => (
    <div className="mt-4 space-y-2">
      {value.map(file => (
        <div key={file.uid} className="flex items-center gap-3 p-3 bg-khor-neutral-50/50 border border-khor-neutral-100 rounded-xl group transition-all hover:bg-white animate-in slide-in-from-left-2 shadow-sm">
           <div className="shrink-0 p-2 bg-white rounded-lg shadow-sm border border-khor-neutral-100">
              {file.type?.startsWith('image/') ? <ImageIcon className="w-4 h-4 text-emerald-500" /> : <FileIcon className="w-4 h-4 text-sky-500" />}
           </div>
           <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center gap-2">
                 <span className="text-sm font-bold text-khor-neutral-900 truncate">{file.name}</span>
                 <button onClick={() => removeFile(file.uid)} className="p-1 text-khor-neutral-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
              </div>
           </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={cn("w-full font-primary", className)} style={style}>
      <input 
        ref={fileInputRef} 
        type="file" 
        multiple={multiple} 
        accept={accept} 
        className="hidden" 
        onChange={(e) => e.target.files && handleFiles(e.target.files)} 
      />

      {listType !== 'picture-card' && (
        <div 
          onClick={triggerSelect}
          onDrop={onDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          className={cn(
            "relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-3xl transition-all cursor-pointer bg-khor-surface-page",
            isDragging ? "border-khor-primary bg-khor-primary-light/5 scale-[1.01]" : "border-khor-neutral-200 hover:border-khor-primary shadow-sm hover:shadow-md",
            disabled && "opacity-50 cursor-not-allowed bg-khor-neutral-100"
          )}
        >
          {children || (
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="p-4 bg-khor-neutral-50 rounded-2xl text-khor-neutral-400 group-hover:text-khor-primary transition-all">
                 <UploadIcon className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                 <p className="text-sm font-extrabold text-khor-neutral-900">Seleccionar o arrastrar archivos</p>
                 <p className="text-xs text-khor-neutral-400 font-medium">{accept ? `Formatos: ${accept}` : 'Formatos permitidos'}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {listType === 'picture-card' ? renderPictureCardList() : renderNormalList()}
    </div>
  );
}

export default KUpload;
