import React from 'react';
import { Upload as AntUpload, message } from 'antd';
import type { UploadFile, UploadProps as AntUploadProps } from 'antd';
import { Paperclip, Plus } from 'lucide-react';
import { cn } from '@/utils/cn';
import { KButton } from '../../atoms/KButton';

/* ─── KUpload — Migrado a Ant Design ─────────────────────────────
   Wrapper sobre AntD Upload (manejo local, sin servidor). KUploadFile
   coincide con UploadFile de AntD. API pública conservada. */

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

// Local-only request: immediately resolve so files land as "done" with no network
const localRequest: AntUploadProps['customRequest'] = ({ onSuccess }) => {
  setTimeout(() => onSuccess?.('ok'), 0);
};

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
  const beforeUpload: AntUploadProps['beforeUpload'] = (file) => {
    if (maxSize && file.size > maxSize) {
      message.error(`"${file.name}" supera el tamaño máximo permitido.`);
      return AntUpload.LIST_IGNORE;
    }
    return true;
  };

  const defaultTrigger =
    listType === 'picture-card' ? (
      <button type="button" className="flex flex-col items-center justify-center gap-1 text-khor-text-tertiary font-primary border-0 bg-transparent cursor-pointer">
        <Plus className="w-5 h-5" />
        <span className="text-xs">Subir</span>
      </button>
    ) : (
      <KButton variant="outline" icon={<Paperclip className="w-4 h-4" />}>
        Subir archivo
      </KButton>
    );

  return (
    <AntUpload
      fileList={value as unknown as UploadFile[]}
      onChange={({ fileList }) => onChange?.(fileList as unknown as KUploadFile[])}
      listType={listType}
      multiple={multiple}
      accept={accept}
      maxCount={maxFiles}
      disabled={disabled}
      onPreview={onPreview ? (file) => onPreview(file as unknown as KUploadFile) : undefined}
      beforeUpload={beforeUpload}
      customRequest={localRequest}
      className={cn('font-primary', className)}
      style={style}
    >
      {/* picture-card hides the trigger once maxCount reached */}
      {maxFiles && value.length >= maxFiles ? null : children ?? defaultTrigger}
    </AntUpload>
  );
}

export default KUpload;
