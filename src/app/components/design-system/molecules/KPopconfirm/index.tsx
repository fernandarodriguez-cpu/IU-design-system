import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { KPopoverRoot, KPopoverTrigger, KPopoverContent } from '../KPopover/index';
import { KButton } from '../../atoms/KButton';
import { cn } from '../../../../../imports/utils';

export interface KPopconfirmProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children: React.ReactElement;
  className?: string;
}

/**
 * KPopconfirm — Popover de confirmación rápida (Total Headless)
 * Basado en Radix UI Popover y Tailwind CSS v4.
 */
export function KPopconfirm({
  title,
  description,
  onConfirm,
  onCancel,
  okText = 'Aceptar',
  cancelText = 'Cancelar',
  icon,
  disabled,
  children,
  className,
}: KPopconfirmProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (onConfirm) {
      setLoading(true);
      try {
        await onConfirm();
      } finally {
        setLoading(false);
        setOpen(false);
      }
    } else {
      setOpen(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    onCancel?.();
  };

  if (disabled) return children;

  return (
    <KPopoverRoot open={open} onOpenChange={setOpen}>
      <KPopoverTrigger asChild>
        {children}
      </KPopoverTrigger>
      <KPopoverContent 
        side="top" 
        align="center" 
        className={cn("w-72 p-4 animate-in fade-in zoom-in-95 duration-200 z-[100]", className)}
      >
        <div className="flex gap-3">
          <div className="shrink-0 pt-0.5">
            {icon || <AlertCircle className="w-5 h-5 text-khor-warning" />}
          </div>
          <div className="flex flex-col gap-1.5">
            <h5 className="text-sm font-semibold text-khor-neutral-900 leading-tight">
              {title}
            </h5>
            {description && (
              <p className="text-xs text-khor-neutral-500 leading-normal">
                {description}
              </p>
            )}
            <div className="flex justify-end gap-2 mt-2">
              <KButton 
                size="sm" 
                variant="secondary" 
                onClick={handleCancel}
                disabled={loading}
              >
                {cancelText}
              </KButton>
              <KButton 
                size="sm" 
                variant="primary" 
                onClick={handleConfirm}
                loading={loading}
              >
                {okText}
              </KButton>
            </div>
          </div>
        </div>
      </KPopoverContent>
    </KPopoverRoot>
  );
}

export default KPopconfirm;
