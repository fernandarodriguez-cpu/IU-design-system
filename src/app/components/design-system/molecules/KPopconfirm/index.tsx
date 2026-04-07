import React, { useState } from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';
import { KPopoverRoot, KPopoverTrigger, KPopoverContent } from '../KPopover/index';
import { KButton, KButtonProps } from '../../atoms/KButton';
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
  // Paridad AntD v5
  okType?: 'primary' | 'danger' | 'warning' | 'default';
  showCancel?: boolean;
}

/**
 * KPopconfirm — Popover de confirmación rápida (Total Headless)
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
  okType = 'primary',
  showCancel = true,
}: KPopconfirmProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onConfirm) {
      setLoading(true);
      try {
        await onConfirm();
        setOpen(false);
      } finally {
        setLoading(false);
      }
    } else {
      setOpen(false);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(false);
    onCancel?.();
  };

  if (disabled) return children;

  const okVariant = okType === 'danger' ? 'danger' : (okType === 'primary' ? 'primary' : 'secondary');

  return (
    <KPopoverRoot open={open} onOpenChange={setOpen}>
      <KPopoverTrigger asChild>
        {children}
      </KPopoverTrigger>
      <KPopoverContent 
        side="top" 
        align="center" 
        className={cn("w-72 p-4 animate-in fade-in zoom-in-95 duration-200 z-[100] shadow-2xl border-khor-neutral-200", className)}
      >
        <div className="flex gap-3">
          <div className="shrink-0 pt-0.5">
            {icon || (
              okType === 'danger' ? <AlertCircle className="w-5 h-5 text-red-500" /> : 
              okType === 'warning' ? <AlertCircle className="w-5 h-5 text-amber-500" /> :
              <HelpCircle className="w-5 h-5 text-khor-primary" />
            )}
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <h5 className="text-sm font-bold text-khor-neutral-900 leading-tight">
              {title}
            </h5>
            {description && (
              <p className="text-xs text-khor-neutral-500 leading-normal font-medium">
                {description}
              </p>
            )}
            <div className="flex justify-end gap-2 mt-3 w-full">
              {showCancel && (
                <KButton 
                  size="sm" 
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={loading}
                  className="h-8 py-0"
                >
                  {cancelText}
                </KButton>
              )}
              <KButton 
                size="sm" 
                // @ts-ignore
                variant={okVariant} 
                onClick={handleConfirm}
                loading={loading}
                className="h-8 py-0"
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
