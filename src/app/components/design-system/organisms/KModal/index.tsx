import React, { useState, useCallback, useImperativeHandle, forwardRef, useRef } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../../../../imports/utils';
import { KModalConfirm, KModalConfirmProps } from '../KModalConfirm/index';

/* ─── Base Components ─── */
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
        "fixed left-[50%] top-[50%] z-[101] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-khor-surface-page p-6 shadow-2xl duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-3xl",
        className
      )}
      {...props}
    >
      {children}
      {!hideCloseButton && (
        <DialogPrimitive.Close className="absolute right-5 top-5 rounded-full p-1 opacity-70 transition-all hover:opacity-100 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-khor-neutral-500">
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
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 border-t mt-4", className)} {...props} />
);

export const KModalTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-xl font-extrabold leading-tight tracking-tight font-primary text-khor-neutral-900", className)}
    {...props}
  />
));

export const KModalDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm font-medium text-khor-neutral-500 font-primary leading-relaxed", className)}
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
