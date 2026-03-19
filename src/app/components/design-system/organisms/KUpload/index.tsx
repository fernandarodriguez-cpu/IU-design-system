import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, File as FileIcon, Image as ImageIcon, Loader2, CheckCircle, AlertCircle, X } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';
import { KText, KProgress } from '../../atoms';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KUpload — Subida de archivos con drag & drop
   ═══════════════════════════════════════════════ */
export interface KUploadFile {
  uid: string;
  name: string;
  status: 'uploading' | 'done' | 'error';
  url?: string;
  percent?: number;
  size: number;
  type: string;
  error?: string;
}

export interface KUploadProps {
  multiple?: boolean;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  value?: KUploadFile[];
  onChange?: (files: KUploadFile[]) => void;
  onUpload?: (file: File) => Promise<KUploadFile>;
  listType?: 'text' | 'picture';
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function KUpload({
  multiple, accept, maxSize, maxFiles, value = [], onChange, onUpload,
  listType = 'text', disabled, children, className,
}: KUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = async (files: FileList) => {
    const arr = Array.from(files);
    const limited = maxFiles ? arr.slice(0, maxFiles - value.length) : arr;

    for (const file of limited) {
      if (maxSize && file.size > maxSize) {
        const errorFile: KUploadFile = {
          uid: `${Date.now()}-${Math.random()}`, name: file.name, status: 'error',
          size: file.size, type: file.type, error: `Excede ${formatFileSize(maxSize)}`,
        };
        onChange?.([...value, errorFile]);
        continue;
      }

      const uploading: KUploadFile = {
        uid: `${Date.now()}-${Math.random()}`, name: file.name, status: 'uploading',
        size: file.size, type: file.type, percent: 0,
      };
      onChange?.([...value, uploading]);

      if (onUpload) {
        try {
          const result = await onUpload(file);
          const updated = [...value].map((f) => f.uid === uploading.uid ? { ...result, uid: uploading.uid } : f);
          onChange?.(updated);
        } catch {
          const errored: KUploadFile[] = [...value].map((f) => f.uid === uploading.uid ? { ...f, status: 'error' as const, error: 'Error al subir' } : f);
          onChange?.(errored);
        }
      } else {
        setTimeout(() => {
          onChange?.([...value.filter((f) => f.uid !== uploading.uid), { ...uploading, status: 'done', percent: 100, url: URL.createObjectURL(file) }]);
        }, 1000);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    if (disabled) return;
    processFiles(e.dataTransfer.files);
  };

  const handleRemove = (uid: string) => {
    onChange?.(value.filter((f) => f.uid !== uid));
  };

  const isImage = (type: string) => type.startsWith('image/');

  return (
    <div className={className} style={{ fontFamily: font }}>
      <div
        onClick={() => !disabled && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        style={{
          padding: children ? 0 : 32, borderRadius: t.radius.lg,
          border: children ? 'none' : `2px dashed ${dragOver ? t.colors.brand.primary : t.colors.neutral[200]}`,
          backgroundColor: children ? 'transparent' : dragOver ? 'rgba(224,77,54,0.04)' : t.colors.neutral[50],
          cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.15s ease',
          textAlign: 'center', opacity: disabled ? 0.6 : 1,
        }}
      >
        {children || (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <UploadIcon size={32} color={t.colors.neutral[300]} />
            <KText variant="body-md" color="secondary">
              Arrastra archivos aquí o <span style={{ color: t.colors.brand.primary, fontWeight: 500 }}>haz click para seleccionar</span>
            </KText>
            {maxSize && <KText variant="caption" color="muted">Máximo {formatFileSize(maxSize)} por archivo</KText>}
          </div>
        )}
      </div>
      <input
        ref={inputRef} type="file" multiple={multiple} accept={accept}
        onChange={(e) => e.target.files && processFiles(e.target.files)}
        style={{ display: 'none' }}
      />
      {value.length > 0 && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {value.map((file) => (
            <div key={file.uid} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
              borderRadius: t.radius.md, border: `1px solid ${file.status === 'error' ? t.colors.feedback.error : t.colors.neutral[200]}`,
              backgroundColor: file.status === 'error' ? t.colors.feedback.errorLight : t.colors.neutral[50],
            }}>
              <span style={{ color: file.status === 'error' ? t.colors.feedback.error : isImage(file.type) ? t.colors.brand.primary : t.colors.neutral[400], flexShrink: 0 }}>
                {listType === 'picture' && file.url && isImage(file.type) ? (
                  <img src={file.url} alt={file.name} style={{ width: 32, height: 32, borderRadius: 4, objectFit: 'cover' }} />
                ) : isImage(file.type) ? <ImageIcon size={18} /> : <FileIcon size={18} />}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: t.colors.neutral[900], overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                <div style={{ fontSize: 11, color: t.colors.neutral[400] }}>
                  {formatFileSize(file.size)}
                  {file.error && <span style={{ color: t.colors.feedback.error, marginLeft: 8 }}>{file.error}</span>}
                </div>
                {file.status === 'uploading' && <KProgress percent={file.percent || 0} size="small" showInfo={false} />}
              </div>
              {file.status === 'done' && <CheckCircle size={16} color={t.colors.feedback.success} />}
              {file.status === 'error' && <AlertCircle size={16} color={t.colors.feedback.error} />}
              {file.status === 'uploading' && <Loader2 size={16} className="animate-spin" color={t.colors.brand.primary} />}
              <button onClick={() => handleRemove(file.uid)} style={{
                background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[300],
                display: 'flex', padding: 2, flexShrink: 0,
              }}>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default KUpload;
