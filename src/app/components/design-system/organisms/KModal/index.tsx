import React, { useState, useCallback, useImperativeHandle, forwardRef, useRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { AlertTriangle, Info, CheckCircle, AlertCircle } from 'lucide-react';

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

import { KButton } from '../../atoms/KButton';

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
            <div className="shrink-0 p-3 bg-khor-neutral-50 rounded-2xl">
              {iconMap[type]}
            </div>
            
            <div className="flex-1 flex flex-col gap-2">
              {title && (
                <DialogPrimitive.Title className="text-xl font-extrabold text-khor-neutral-900 leading-tight tracking-tight">
                  {title}
                </DialogPrimitive.Title>
              )}
              {content && (
                <DialogPrimitive.Description className="text-sm font-medium text-khor-neutral-500 leading-relaxed">
                  {content}
                </DialogPrimitive.Description>
              )}

              <div className="flex justify-end gap-3 mt-8">
                {showCancel && (
                  <KButton variant="outline" onClick={onClose} disabled={loading}>
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
            <button className="absolute top-5 right-5 text-khor-neutral-300 hover:text-khor-neutral-900 transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
/* ─── Base Components ─── */
/**
 * @figma-mcp-migration
 * Component: KModalRoot
 * 
 * INSTRUCCIONES PARA AGENTES DE IA (VS Code / MCP):
 * Para migrar este componente a Figma, NO generar una matriz multiplicando todas las variables.
 * Utilizar Figma Component Properties V2 con la siguiente estructura:
 * 
 * 1. Variants (Estructurales):
 *    - Definir variantes puramente visuales/estructurales.
 * 2. Booleans (Encendido/Apagado):
 *    - Definir encendido/apagado para iconos o estados (isLoading, hasIcon).
 * 3. Color Variables (No usar variantes para colores semánticos):
 *    - El relleno/borde debe usar Figma Variables (Khor v6.0 Colors) asignado dinámicamente.
 *    - El consumidor del UI Kit cambiará el color del layer.
 */
export const KModalRoot = DialogPrimitive.Root;
export const KModalTrigger = DialogPrimitive.Trigger;
export const KModalPortal = DialogPrimitive.Portal;
export const KModalClose = DialogPrimitive.Close;

export const KModalOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
KModalOverlay.displayName = "KModalOverlay";

export const KModalContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { hideCloseButton?: boolean }
>(({ className, children, hideCloseButton, ...props }, ref) => (
  <KModalPortal>
    <KModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-[101] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-khor-border-default bg-white shadow-khor-xl duration-200 sm:rounded-2xl",
        "p-[var(--khor-density-spacing-lg)]", // Density compliance
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className
      )}
      {...props}
    >
      {children}
      {!hideCloseButton && (
        <DialogPrimitive.Close className="absolute right-5 top-5 rounded-full p-1 opacity-70 transition-all hover:opacity-100 hover:bg-khor-surface-hover focus:outline-none focus:ring-2 focus:ring-[var(--khor-focus-ring-color)] focus:ring-offset-2 text-khor-text-tertiary">
          <X className="h-5 w-5" />
          <span className="sr-only">Cerrar</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </KModalPortal>
));
KModalContent.displayName = "KModalContent";

export const KModalHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-left mb-2 uppercase tracking-tight", className)} {...props} />
);

export const KModalFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 border-t mt-4 border-khor-border-muted", className)} {...props} />
);

export const KModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-xl font-extrabold leading-tight tracking-tight font-primary text-khor-text-primary", className)}
    {...props}
  />
));

export const KModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm font-medium text-khor-text-tertiary font-primary leading-relaxed opacity-80", className)}
    {...props}
  />
));

/* ─── Static Methods Logic ─── */
let modalRef: any = null;

export const KModal = (props: React.ComponentProps<typeof KModalRoot>) => <KModalRoot {...props} />;

KModal.confirm = (props: Partial<KModalConfirmProps>) => {
  modalRef?.add({ ...props, type: 'confirm' });
};
KModal.success = (props: Partial<KModalConfirmProps>) => {
  modalRef?.add({ ...props, type: 'success' });
};
KModal.error = (props: Partial<KModalConfirmProps>) => {
  modalRef?.add({ ...props, type: 'error' });
};
KModal.warning = (props: Partial<KModalConfirmProps>) => {
  modalRef?.add({ ...props, type: 'warning' });
};
KModal.info = (props: Partial<KModalConfirmProps>) => {
  modalRef?.add({ ...props, type: 'info' });
};

/* ─── Provider for Static Methods ─── */
export const KModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modals, setModals] = useState<any[]>([]);
  const internalRef = useRef<any>(null);

  const add = useCallback((props: any) => {
    const id = Date.now();
    setModals(prev => [...prev, { ...props, id, open: true }]);
  }, []);

  const remove = useCallback((id: number) => {
    setModals(prev => prev.filter(m => m.id !== id));
  }, []);

  useImperativeHandle(internalRef, () => ({ add }), [add]);
  
  // Registrar ref global
  React.useEffect(() => {
    modalRef = { add };
    return () => { modalRef = null; };
  }, [add]);

  return (
    <>
      {children}
      {modals.map(m => (
        <KModalConfirm 
          key={m.id} 
          {...m} 
          open={m.open}
          onClose={() => {
            m.onClose?.();
            remove(m.id);
          }} 
        />
      ))}
    </>
  );
};

export default KModal;
