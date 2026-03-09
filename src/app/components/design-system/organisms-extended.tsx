/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR DESIGN SYSTEM — ORGANISMOS EXT.    ║
 * ║  Organismos complejos adicionales         ║
 * ║  integrados desde análisis comparativo.  ║
 * ║                                           ║
 * ║  Base: Radix + Custom + Khor Tokens       ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  X, Upload as UploadIcon, File, Image as ImageIcon, Loader2,
  CheckCircle, AlertCircle, ChevronRight, ChevronDown,
  Folder, FolderOpen, Trash2, Plus, GripVertical,
  AlertTriangle, Info,
} from 'lucide-react';
import { KButton, KText, KCheckbox, KProgress } from './atoms';
import { khorTokens } from '../../theme/khor-theme';

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
          onChange?.((prev) => [...(Array.isArray(prev) ? prev : value)].map((f) => f.uid === uploading.uid ? { ...result, uid: uploading.uid } : f));
        } catch {
          onChange?.((prev) => [...(Array.isArray(prev) ? prev : value)].map((f) => f.uid === uploading.uid ? { ...f, status: 'error' as const, error: 'Error al subir' } : f));
        }
      } else {
        // Simulate upload
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
      {/* Drop zone */}
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
      {/* File list */}
      {value.length > 0 && (
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {value.map((file) => (
            <div key={file.uid} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
              borderRadius: t.radius.md, border: `1px solid ${file.status === 'error' ? t.colors.feedback.error : t.colors.neutral[200]}`,
              backgroundColor: file.status === 'error' ? t.colors.feedback.errorLight : t.colors.neutral[50],
            }}>
              {/* Icon */}
              <span style={{ color: file.status === 'error' ? t.colors.feedback.error : isImage(file.type) ? t.colors.brand.primary : t.colors.neutral[400], flexShrink: 0 }}>
                {listType === 'picture' && file.url && isImage(file.type) ? (
                  <img src={file.url} alt={file.name} style={{ width: 32, height: 32, borderRadius: 4, objectFit: 'cover' }} />
                ) : isImage(file.type) ? <ImageIcon size={18} /> : <File size={18} />}
              </span>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, color: t.colors.neutral[900], overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                <div style={{ fontSize: 11, color: t.colors.neutral[400] }}>
                  {formatFileSize(file.size)}
                  {file.error && <span style={{ color: t.colors.feedback.error, marginLeft: 8 }}>{file.error}</span>}
                </div>
                {file.status === 'uploading' && <KProgress percent={file.percent || 0} size="small" showInfo={false} />}
              </div>
              {/* Status */}
              {file.status === 'done' && <CheckCircle size={16} color={t.colors.feedback.success} />}
              {file.status === 'error' && <AlertCircle size={16} color={t.colors.feedback.error} />}
              {file.status === 'uploading' && <Loader2 size={16} className="animate-spin" color={t.colors.brand.primary} />}
              {/* Remove */}
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

/* ═══════════════════════════════════════════════
   KTree — Vista de árbol
   ═══════════════════════════════════════════════ */
export interface KTreeNode {
  key: string;
  title: string;
  children?: KTreeNode[];
  icon?: React.ReactNode;
  disabled?: boolean;
  isLeaf?: boolean;
}

export interface KTreeProps {
  data: KTreeNode[];
  defaultExpandedKeys?: string[];
  selectedKeys?: string[];
  onSelect?: (selectedKeys: string[], info: { node: KTreeNode; selected: boolean }) => void;
  checkedKeys?: string[];
  onCheck?: (checkedKeys: string[]) => void;
  checkable?: boolean;
  showLine?: boolean;
  showIcon?: boolean;
  defaultExpandAll?: boolean;
  disabled?: boolean;
  className?: string;
}

export function KTree({
  data, defaultExpandedKeys = [], selectedKeys = [], onSelect,
  checkedKeys = [], onCheck, checkable, showLine, showIcon = true,
  defaultExpandAll, disabled, className,
}: KTreeProps) {
  const getAllKeys = useCallback((nodes: KTreeNode[]): string[] => {
    return nodes.flatMap((n) => [n.key, ...(n.children ? getAllKeys(n.children) : [])]);
  }, []);

  const [expanded, setExpanded] = useState<Set<string>>(
    new Set(defaultExpandAll ? getAllKeys(data) : defaultExpandedKeys)
  );

  const toggleExpand = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const handleSelect = (node: KTreeNode) => {
    if (node.disabled || disabled) return;
    const isSelected = selectedKeys.includes(node.key);
    const next = isSelected ? selectedKeys.filter((k) => k !== node.key) : [...selectedKeys, node.key];
    onSelect?.(next, { node, selected: !isSelected });
  };

  const handleCheck = (node: KTreeNode) => {
    if (node.disabled || disabled) return;
    const isChecked = checkedKeys.includes(node.key);
    const next = isChecked ? checkedKeys.filter((k) => k !== node.key) : [...checkedKeys, node.key];
    onCheck?.(next);
  };

  const renderNode = (node: KTreeNode, depth: number): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded.has(node.key);
    const isSelected = selectedKeys.includes(node.key);
    const isChecked = checkedKeys.includes(node.key);

    return (
      <div key={node.key}>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 8px', paddingLeft: depth * 20 + 8,
            borderRadius: t.radius.sm, cursor: node.disabled ? 'not-allowed' : 'pointer',
            backgroundColor: isSelected ? 'rgba(224,77,54,0.08)' : 'transparent',
            transition: 'background-color 0.1s ease',
            opacity: node.disabled ? 0.5 : 1,
          }}
          onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = t.colors.neutral[100]; }}
          onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = isSelected ? 'rgba(224,77,54,0.08)' : 'transparent'; }}
        >
          {/* Expand toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); hasChildren && toggleExpand(node.key); }}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 20, height: 20, border: 'none', background: 'none',
              cursor: hasChildren ? 'pointer' : 'default',
              color: t.colors.neutral[400], flexShrink: 0,
              transform: isExpanded ? 'rotate(90deg)' : 'none',
              transition: 'transform 0.15s ease',
            }}
          >
            {hasChildren && <ChevronRight size={14} />}
          </button>
          {/* Checkbox */}
          {checkable && (
            <KCheckbox checked={isChecked} onChange={() => handleCheck(node)} disabled={node.disabled} />
          )}
          {/* Icon */}
          {showIcon && (
            <span style={{ color: t.colors.neutral[400], display: 'flex', flexShrink: 0 }}>
              {node.icon || (hasChildren ? (isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />) : <File size={14} />)}
            </span>
          )}
          {/* Title */}
          <span
            onClick={() => handleSelect(node)}
            style={{
              fontSize: 14, fontFamily: font, flex: 1,
              color: isSelected ? t.colors.brand.primary : t.colors.neutral[900],
              fontWeight: isSelected ? 500 : 400,
            }}
          >
            {node.title}
          </span>
        </div>
        {/* Children */}
        {hasChildren && isExpanded && (
          <div style={{ position: 'relative' }}>
            {showLine && (
              <div style={{
                position: 'absolute', left: depth * 20 + 18, top: 0, bottom: 8,
                width: 1, backgroundColor: t.colors.neutral[200],
              }} />
            )}
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={className} style={{ fontFamily: font }}>
      {data.map((node) => renderNode(node, 0))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   KTour — Tour guiado (onboarding)
   ═══════════════════════════════════════════════ */
export interface KTourStep {
  title: string;
  description: string;
  target: string | (() => HTMLElement | null);
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

export interface KTourProps {
  steps: KTourStep[];
  open?: boolean;
  onClose?: () => void;
  onFinish?: () => void;
  mask?: boolean;
  className?: string;
}

export function KTour({ steps, open = false, onClose, onFinish, mask = true }: KTourProps) {
  const [current, setCurrent] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const currentStep = steps[current];

  useEffect(() => {
    if (!open || !currentStep) return;
    const getTarget = () => {
      if (typeof currentStep.target === 'string') return document.querySelector(currentStep.target) as HTMLElement;
      return currentStep.target();
    };
    const el = getTarget();
    if (el) {
      const rect = el.getBoundingClientRect();
      setPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX, width: rect.width, height: rect.height });
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [current, open, currentStep]);

  if (!open || !currentStep) return null;

  const placement = currentStep.placement || 'bottom';
  const cardStyle: React.CSSProperties = {
    position: 'absolute', zIndex: 10001, width: 320,
    backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg,
    boxShadow: t.shadows.lg, padding: 20, fontFamily: font,
    border: `1px solid ${t.colors.neutral[200]}`,
  };

  if (placement === 'bottom') { cardStyle.top = position.top + position.height + 12; cardStyle.left = position.left; }
  else if (placement === 'top') { cardStyle.bottom = window.innerHeight - position.top + 12; cardStyle.left = position.left; }
  else if (placement === 'right') { cardStyle.top = position.top; cardStyle.left = position.left + position.width + 12; }
  else { cardStyle.top = position.top; cardStyle.right = window.innerWidth - position.left + 12; }

  const handleNext = () => {
    if (current < steps.length - 1) setCurrent(current + 1);
    else { onFinish?.(); onClose?.(); setCurrent(0); }
  };

  const handlePrev = () => { if (current > 0) setCurrent(current - 1); };

  return (
    <>
      {/* Mask */}
      {mask && <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 9999 }} onClick={onClose} />}
      {/* Highlight */}
      <div style={{
        position: 'absolute', top: position.top - 4, left: position.left - 4,
        width: position.width + 8, height: position.height + 8,
        borderRadius: t.radius.md, border: `2px solid ${t.colors.brand.primary}`,
        boxShadow: `0 0 0 9999px rgba(0,0,0,0.45)`, zIndex: 10000,
        pointerEvents: 'none',
      }} />
      {/* Card */}
      <div ref={cardRef} style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: t.colors.brand.navy }}>{currentStep.title}</h4>
          <button onClick={() => { onClose?.(); setCurrent(0); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[400], display: 'flex', padding: 0 }}>
            <X size={16} />
          </button>
        </div>
        <p style={{ margin: '0 0 16px', fontSize: 14, color: t.colors.neutral[500], lineHeight: 1.5 }}>{currentStep.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: t.colors.neutral[400] }}>{current + 1} / {steps.length}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {current > 0 && <KButton variant="ghost" size="sm" onClick={handlePrev}>Anterior</KButton>}
            <KButton variant="primary" size="sm" onClick={handleNext}>
              {current === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
            </KButton>
          </div>
        </div>
        {/* Step dots */}
        <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 12 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: '50%',
              backgroundColor: i === current ? t.colors.brand.primary : t.colors.neutral[200],
              transition: 'background-color 0.15s ease',
            }} />
          ))}
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   KModalConfirm — Modal de confirmación declarativo
   ═══════════════════════════════════════════════ */
export type KModalConfirmType = 'confirm' | 'info' | 'success' | 'warning' | 'error';

export interface KModalConfirmProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  content?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  type?: KModalConfirmType;
  onOk?: () => void | Promise<void>;
  onCancel?: () => void;
  showCancel?: boolean;
  width?: number;
}

const confirmIconMap: Record<KModalConfirmType, { icon: React.ReactNode; color: string }> = {
  confirm: { icon: <AlertTriangle size={24} />, color: khorTokens.colors.brand.accent },
  info: { icon: <Info size={24} />, color: khorTokens.colors.brand.navy },
  success: { icon: <CheckCircle size={24} />, color: khorTokens.colors.feedback.success },
  warning: { icon: <AlertTriangle size={24} />, color: khorTokens.colors.brand.accent },
  error: { icon: <AlertCircle size={24} />, color: khorTokens.colors.feedback.error },
};

export function KModalConfirm({
  open, onClose, title, content, okText = 'Aceptar', cancelText = 'Cancelar',
  type = 'confirm', onOk, onCancel, showCancel = true, width = 420,
}: KModalConfirmProps) {
  const [loading, setLoading] = useState(false);
  const cfg = confirmIconMap[type];

  const handleOk = async () => {
    if (onOk) {
      const result = onOk();
      if (result instanceof Promise) { setLoading(true); await result; setLoading(false); }
    }
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 999 }} />
        <Dialog.Content style={{
          position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width, maxWidth: '90vw', backgroundColor: t.colors.neutral[50],
          borderRadius: t.radius.xl, boxShadow: t.shadows.lg, fontFamily: font,
          zIndex: 1000, padding: 24,
        }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <div style={{ color: cfg.color, flexShrink: 0, marginTop: 2 }}>{cfg.icon}</div>
            <div style={{ flex: 1 }}>
              {title && <Dialog.Title style={{ margin: '0 0 8px', fontSize: 18, fontWeight: 600, color: t.colors.neutral[900] }}>{title}</Dialog.Title>}
              {content && <Dialog.Description style={{ margin: 0, fontSize: 14, color: t.colors.neutral[500], lineHeight: 1.6 }}>{content}</Dialog.Description>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 24 }}>
            {showCancel && (
              <KButton variant="ghost" onClick={() => { onCancel?.(); onClose(); }}>{cancelText}</KButton>
            )}
            <KButton
              variant={type === 'error' ? 'danger' : 'primary'}
              loading={loading}
              onClick={handleOk}
            >
              {okText}
            </KButton>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ═══════════════════════════════════════════════
   KFormList — Lista dinámica de campos
   ═══════════════════════════════════════════════ */
export interface KFormListField {
  key: string;
  [k: string]: any;
}

export interface KFormListProps {
  value?: KFormListField[];
  onChange?: (fields: KFormListField[]) => void;
  renderItem: (field: KFormListField, index: number, operations: { remove: () => void }) => React.ReactNode;
  addText?: string;
  maxItems?: number;
  minItems?: number;
  initialValue?: Partial<KFormListField>;
  className?: string;
}

export function KFormList({
  value = [], onChange, renderItem, addText = 'Agregar campo',
  maxItems, minItems = 0, initialValue = {}, className,
}: KFormListProps) {
  const handleAdd = () => {
    if (maxItems && value.length >= maxItems) return;
    const newField: KFormListField = { key: `field-${Date.now()}-${Math.random().toString(36).slice(2)}`, ...initialValue };
    onChange?.([...value, newField]);
  };

  const handleRemove = (index: number) => {
    if (value.length <= minItems) return;
    onChange?.(value.filter((_, i) => i !== index));
  };

  return (
    <div className={className} style={{ fontFamily: font }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {value.map((field, index) => (
          <div key={field.key} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: 16, borderRadius: t.radius.md,
            border: `1px solid ${t.colors.neutral[200]}`, backgroundColor: t.colors.neutral[50],
          }}>
            <div style={{ flex: 1 }}>
              {renderItem(field, index, { remove: () => handleRemove(index) })}
            </div>
            {value.length > minItems && (
              <button onClick={() => handleRemove(index)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 32, height: 32, borderRadius: t.radius.sm,
                border: `1px solid ${t.colors.neutral[200]}`, backgroundColor: 'transparent',
                cursor: 'pointer', color: t.colors.feedback.error, flexShrink: 0,
                transition: 'all 0.15s ease',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = t.colors.feedback.errorLight; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleAdd}
        disabled={maxItems ? value.length >= maxItems : false}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          width: '100%', padding: 12, marginTop: 12, borderRadius: t.radius.md,
          border: `2px dashed ${t.colors.neutral[200]}`, backgroundColor: 'transparent',
          cursor: maxItems && value.length >= maxItems ? 'not-allowed' : 'pointer',
          color: t.colors.brand.primary, fontFamily: font, fontSize: 14, fontWeight: 500,
          transition: 'all 0.15s ease',
          opacity: maxItems && value.length >= maxItems ? 0.5 : 1,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.colors.brand.primary; e.currentTarget.style.backgroundColor = 'rgba(224,77,54,0.04)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.colors.neutral[200]; e.currentTarget.style.backgroundColor = 'transparent'; }}
      >
        <Plus size={16} />
        {addText}
      </button>
    </div>
  );
}
