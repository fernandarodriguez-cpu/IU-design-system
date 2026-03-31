import React, { useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AlertTriangle, Info, CheckCircle, AlertCircle, X } from 'lucide-react';
import { cn } from '../../../../../imports/utils';
import { KButton } from '../../atoms/KButton';

export type KModalConfirmType = 'confirm' | 'info' | 'success' | 'warning' | 'error';

export interface KModalConfirmProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  content?: React.ReactNode;
  type?: KModalConfirmType;
  onOk?: () => void | Promise<void>;
  okText?: string;
  cancelText?: string;
  showCancel?: boolean;
  width?: number;
  className?: string;
}

const iconMap = {
  confirm: <AlertTriangle className="w-8 h-8 text-amber-500" />,
  info: <Info className="w-8 h-8 text-sky-500" />,
  success: <CheckCircle className="w-8 h-8 text-emerald-500" />,
  warning: <AlertTriangle className="w-8 h-8 text-amber-500" />,
  error: <AlertCircle className="w-8 h-8 text-red-500" />,
};

/**
 * KModalConfirm — Diálogo de confirmación (Total Headless)
 * Basado en Radix UI Dialog y Tailwind CSS v4. Soporta estados de carga y diferentes variantes visuales.
 */
export function KModalConfirm({
  open,
  onClose,
  title,
  content,
  type = 'confirm',
  onOk,
  okText = 'Aceptar',
  cancelText = 'Cancelar',
  showCancel = true,
  width = 420,
  className,
}: KModalConfirmProps) {
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    if (onOk) {
      setLoading(true);
      try {
        await onOk();
      } finally {
        setLoading(false);
        onClose();
      }
    } else {
      onClose();
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-[101] -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] p-8 font-primary animate-in zoom-in-95 fade-in duration-300 focus:outline-none",
            className
          )}
          style={{ width: `${width}px` }}
        >
          <div className="flex gap-6 items-start">
            <div className="shrink-0 p-3 bg-[var(--khor-neutral-50)] rounded-2xl">
              {iconMap[type]}
            </div>
            
            <div className="flex-1 flex flex-col gap-2">
              {title && (
                <DialogPrimitive.Title className="text-xl font-extrabold text-[var(--khor-neutral-900)] leading-tight tracking-tight">
                  {title}
                </DialogPrimitive.Title>
              )}
              {content && (
                <DialogPrimitive.Description className="text-sm font-medium text-[var(--khor-neutral-500)] leading-relaxed">
                  {content}
                </DialogPrimitive.Description>
              )}

              <div className="flex justify-end gap-3 mt-8">
                {showCancel && (
                  <KButton variant="neutral" onClick={onClose} disabled={loading}>
                    {cancelText}
                  </KButton>
                )}
                <KButton
                  variant={type === 'error' ? 'danger' : 'primary'}
                  loading={loading}
                  onClick={handleOk}
                  className="px-6"
                >
                  {okText}
                </KButton>
              </div>
            </div>
          </div>

          <DialogPrimitive.Close asChild>
            <button className="absolute top-5 right-5 text-[var(--khor-neutral-300)] hover:text-[var(--khor-neutral-900)] transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default KModalConfirm;
