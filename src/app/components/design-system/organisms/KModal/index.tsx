import React, { useState, useCallback, useRef, createContext, useContext } from 'react';
import { Modal as AntModal } from 'antd';
import { X, AlertTriangle, Info, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { KButton } from '../../atoms/KButton';

/* ═══════════════════════════════════════════════
   KModal — Migrado a Ant Design (antes @radix-ui/react-dialog)
   • Compound (Root/Content/Header/Footer/Title/Description) preservado
     vía context sobre AntD Modal (footer propio de Khor).
   • KModalConfirm + static methods (KModal.confirm/.success/…) + KModalProvider
     conservados; el provider sólo maneja estado (no usa Radix).
   ═══════════════════════════════════════════════ */

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
    <AntModal
      open={open}
      onCancel={onClose}
      footer={null}
      width={width}
      centered
      maskClosable
      closeIcon={<X className="w-5 h-5" />}
      classNames={{ content: cn('!rounded-3xl !p-8 font-primary', className), mask: '!backdrop-blur-sm' }}
    >
      <div className="flex gap-6 items-start">
        <div className="shrink-0 p-3 bg-khor-neutral-50 rounded-2xl">{iconMap[type]}</div>
        <div className="flex-1 flex flex-col gap-2">
          {title && <h2 className="text-xl font-extrabold text-khor-neutral-900 leading-tight tracking-tight m-0">{title}</h2>}
          {content && <p className="text-sm font-medium text-khor-neutral-500 leading-relaxed m-0">{content}</p>}
          <div className="flex justify-end gap-3 mt-8">
            {showCancel && (
              <KButton variant="outline" onClick={onClose} disabled={loading}>{cancelText}</KButton>
            )}
            <KButton variant={type === 'error' ? 'danger' : 'primary'} loading={loading} onClick={handleOk} className="px-6">
              {okText}
            </KButton>
          </div>
        </div>
      </div>
    </AntModal>
  );
}

/* ─── Compound (context-driven over AntD Modal) ─── */
interface ModalCtxValue {
  open: boolean;
  setOpen: (o: boolean) => void;
}
const ModalCtx = createContext<ModalCtxValue>({ open: false, setOpen: () => {} });

interface KModalRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const KModalRootBase: React.FC<KModalRootProps> = ({ open, defaultOpen, onOpenChange, children }) => {
  const [internal, setInternal] = useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const actualOpen = isControlled ? open : internal;
  const setOpen = (o: boolean) => {
    if (!isControlled) setInternal(o);
    onOpenChange?.(o);
  };
  return <ModalCtx.Provider value={{ open: actualOpen, setOpen }}>{children}</ModalCtx.Provider>;
};

export const KModalRoot = KModalRootBase;

export const KModalTrigger: React.FC<{ children?: React.ReactNode; className?: string; asChild?: boolean }> = ({ children, className }) => {
  const { setOpen } = useContext(ModalCtx);
  return (
    <span className={cn('inline-flex', className)} onClick={() => setOpen(true)}>
      {children}
    </span>
  );
};

export const KModalClose: React.FC<{ children?: React.ReactNode; className?: string; asChild?: boolean }> = ({ children, className }) => {
  const { setOpen } = useContext(ModalCtx);
  return (
    <span className={cn('inline-flex', className)} onClick={() => setOpen(false)}>
      {children}
    </span>
  );
};

// Overlay/Portal are handled by AntD Modal — kept as no-op shims for API compat
export const KModalOverlay: React.FC<{ className?: string }> = () => null;
export const KModalPortal: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;

export const KModalContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { hideCloseButton?: boolean; width?: number }
>(({ className, children, hideCloseButton, width = 512, ...props }, ref) => {
  const { open, setOpen } = useContext(ModalCtx);
  return (
    <AntModal
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={width}
      centered
      closable={!hideCloseButton}
      closeIcon={<X className="h-5 w-5" />}
      classNames={{
        content: cn('!rounded-2xl font-primary', className),
        body: 'p-[var(--khor-density-spacing-lg)]',
        mask: '!backdrop-blur-sm',
      }}
    >
      <div ref={ref} {...props}>
        {children}
      </div>
    </AntModal>
  );
});
KModalContent.displayName = 'KModalContent';

export const KModalHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-left mb-2 uppercase tracking-tight', className)} {...props} />
);

export const KModalFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 border-t mt-4 border-khor-border-muted', className)} {...props} />
);

export const KModalTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn('text-xl font-extrabold leading-tight tracking-tight font-primary text-khor-text-primary m-0', className)} {...props} />
  ),
);
KModalTitle.displayName = 'KModalTitle';

export const KModalDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm font-medium text-khor-text-tertiary font-primary leading-relaxed opacity-80 m-0', className)} {...props} />
  ),
);
KModalDescription.displayName = 'KModalDescription';

/* ─── Static Methods Logic ─── */
let modalRef: { add: (props: any) => void } | null = null;

type KModalComponent = React.FC<KModalRootProps> & {
  confirm: (props: Partial<KModalConfirmProps>) => void;
  success: (props: Partial<KModalConfirmProps>) => void;
  error: (props: Partial<KModalConfirmProps>) => void;
  warning: (props: Partial<KModalConfirmProps>) => void;
  info: (props: Partial<KModalConfirmProps>) => void;
};

export const KModal = KModalRootBase as KModalComponent;
KModal.confirm = (props) => modalRef?.add({ ...props, type: 'confirm' });
KModal.success = (props) => modalRef?.add({ ...props, type: 'success' });
KModal.error = (props) => modalRef?.add({ ...props, type: 'error' });
KModal.warning = (props) => modalRef?.add({ ...props, type: 'warning' });
KModal.info = (props) => modalRef?.add({ ...props, type: 'info' });

/* ─── Provider for Static Methods (state only, no Radix) ─── */
export const KModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modals, setModals] = useState<any[]>([]);
  const counter = useRef(0);

  const add = useCallback((props: any) => {
    const id = ++counter.current;
    setModals((prev) => [...prev, { ...props, id, open: true }]);
  }, []);

  const remove = useCallback((id: number) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  }, []);

  React.useEffect(() => {
    modalRef = { add };
    return () => { modalRef = null; };
  }, [add]);

  return (
    <>
      {children}
      {modals.map((m) => (
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
