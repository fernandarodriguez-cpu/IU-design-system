import React from 'react';
import { Upload, message } from 'antd';
import type { UploadProps, UploadFile } from 'antd';
import { Upload as UploadIcon, File as FileIcon, Image as ImageIcon, X } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';
import { KText } from '../../atoms';

const { Dragger } = Upload;
const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KUpload — Subida de archivos (Organismo)
   ═══════════════════════════════════════════════ */
export type { UploadFile as KUploadFile };

export interface KUploadProps extends Omit<UploadProps, 'fileList' | 'onChange'> {
  value?: UploadFile[];
  onChange?: (files: UploadFile[]) => void;
  maxSize?: number; // in bytes
  maxFiles?: number;
}

export function KUpload({
  multiple,
  accept,
  maxSize,
  maxFiles,
  value,
  onChange,
  listType = 'text',
  disabled,
  children,
  className,
  style,
  ...rest
}: KUploadProps) {

  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    if (maxFiles) {
      newFileList = newFileList.slice(-maxFiles);
    }

    // 2. Filter out files that exceed maxSize
    if (maxSize) {
      newFileList = newFileList.filter(file => {
        if (file.size && file.size > maxSize) {
          message.error(`${file.name} excede el tamaño máximo permitido.`);
          return false;
        }
        return true;
      });
    }

    onChange?.(newFileList);
  };

  const uploadProps: UploadProps = {
    multiple,
    accept,
    fileList: value,
    onChange: handleChange,
    listType: listType === 'picture' ? 'picture' : 'text',
    disabled,
    beforeUpload: (file) => {
      if (maxSize && file.size > maxSize) {
        message.error(`${file.name} es demasiado grande.`);
        return Upload.LIST_IGNORE;
      }
      return true;
    },
    ...rest,
  };

  const defaultContent = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 0' }}>
      <UploadIcon size={32} color={t.colors.neutral[300]} />
      <KText variant="body-md" color="secondary">
        Arrastra archivos aquí o <span style={{ color: t.colors.brand.primary, fontWeight: 500 }}>haz click para seleccionar</span>
      </KText>
      {maxSize && (
        <KText variant="caption" color="muted">
          Máximo {(maxSize / 1024 / 1024).toFixed(1)} MB por archivo
        </KText>
      )}
    </div>
  );

  return (
    <div className={className} style={{ fontFamily: font, ...style }}>
      {children ? (
        <Upload {...uploadProps}>{children}</Upload>
      ) : (
        <Dragger {...uploadProps} style={{ 
          backgroundColor: t.colors.neutral[50],
          borderRadius: t.radius.lg,
          border: `2px dashed ${t.colors.neutral[200]}`,
        }}>
          {defaultContent}
        </Dragger>
      )}
      <style>{`
        .ant-upload-list-item-name {
          font-family: ${font} !important;
          font-size: 13px !important;
        }
        .ant-upload-list-item {
          border-radius: ${t.radius.md} !important;
        }
        .ant-upload-drag:hover {
          border-color: ${t.colors.brand.primary} !important;
        }
      `}</style>
    </div>
  );
}

export default KUpload;
