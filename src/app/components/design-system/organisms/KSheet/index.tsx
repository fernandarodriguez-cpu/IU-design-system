import React, { useState, createContext, useContext } from 'react';
import { Drawer as AntDrawer } from 'antd';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

/* ═══════════════════════════════════════════════
   KSheet — Migrado a Ant Design (antes @radix-ui/react-dialog)
   Implementado sobre AntD Drawer; el header/footer declarativos de Khor
   se pintan dentro del body (header nativo de AntD desactivado) para
   conservar el markup y look exactos. Compound vía context.
   ═══════════════════════════════════════════════ */

const SheetCtx = createContext<{ open: boolean; setOpen: (o: boolean) => void }>({ open: false, setOpen: () => {} });

interface KSheetRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

export const KSheetRoot: React.FC<KSheetRootProps> = ({ open, defaultOpen, onOpenChange, children }) => {
  const [internal, setInternal] = useState(defaultOpen ?? false);
  const isControlled = open !== undefined;
  const actualOpen = isControlled ? open : internal;
  const setOpen = (o: boolean) => {
    if (!isControlled) setInternal(o);
    onOpenChange?.(o);
  };
  return <SheetCtx.Provider value={{ open: actualOpen, setOpen }}>{children}</SheetCtx.Provider>;
};

export const KSheet = KSheetRoot;

export const KSheetTrigger: React.FC<{ children?: React.ReactNode; className?: string; asChild?: boolean }> = ({ children, className }) => {
  const { setOpen } = useContext(SheetCtx);
  return <span className={cn('inline-flex', className)} onClick={() => setOpen(true)}>{children}</span>;
};

export const KSheetClose: React.FC<{ children?: React.ReactNode; className?: string; asChild?: boolean }> = ({ children, className }) => {
  const { setOpen } = useContext(SheetCtx);
  return <span className={cn('inline-flex', className)} onClick={() => setOpen(false)}>{children}</span>;
};

export const KSheetOverlay: React.FC<{ className?: string }> = () => null;
export const KSheetPortal: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;

export const KSheetHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 px-[var(--khor-density-spacing-lg)] py-[var(--khor-density-spacing-md)] border-b border-khor-border-muted', className)} {...props}>{children}</div>
);
export const KSheetTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-lg font-bold text-khor-text-primary leading-tight tracking-tight font-primary', className)} {...props}>{children}</h3>
);
export const KSheetDescription = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-sm text-khor-text-secondary opacity-70 font-primary', className)} {...props}>{children}</p>
);
export const KSheetFooter = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center justify-end gap-2 px-[var(--khor-density-spacing-lg)] py-[var(--khor-density-spacing-md)] border-t border-khor-border-muted', className)} {...props}>{children}</div>
);

export interface KSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  placement?: 'top' | 'right' | 'bottom' | 'left';
  width?: string | number;
  height?: string | number;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  onClose?: () => void;
  isHovered?: boolean;
  hideCloseButton?: boolean;
}

const ROUNDED: Record<string, string> = {
  right: '[&_.ant-drawer-content]:!rounded-l-2xl',
  left: '[&_.ant-drawer-content]:!rounded-r-2xl',
  top: '[&_.ant-drawer-content]:!rounded-b-2xl',
  bottom: '[&_.ant-drawer-content]:!rounded-t-2xl',
};

export const KSheetContent = React.forwardRef<HTMLDivElement, KSheetProps>(
  ({ className, children, placement = 'right', title, extra, width, height, onClose, isHovered }, ref) => {
    const { open, setOpen } = useContext(SheetCtx);
    const close = () => { setOpen(false); onClose?.(); };
    const isVertical = placement === 'top' || placement === 'bottom';
    const size = isVertical ? (height ?? 320) : (width ?? 448);

    return (
      <AntDrawer
        open={open}
        placement={placement}
        onClose={close}
        width={!isVertical ? size : undefined}
        height={isVertical ? size : undefined}
        closable={false}
        title={null}
        rootClassName={cn('font-primary', ROUNDED[placement])}
        styles={{ header: { display: 'none' }, body: { padding: 0 }, mask: { backdropFilter: 'blur(2px)' } }}
      >
        <div ref={ref} className={cn('flex flex-col h-full', isHovered && 'ring-2 ring-khor-primary ring-inset', className)}>
          {/* Built-in header (imperative title/extra mode) */}
          {(title || extra) && (
            <div className="flex items-center justify-between px-[var(--khor-density-spacing-lg)] py-[var(--khor-density-spacing-md)] border-b border-khor-border-muted shrink-0">
              <div className="flex flex-col gap-1">
                {title && (typeof title === 'string' ? <KSheetTitle>{title}</KSheetTitle> : title)}
              </div>
              <div className="flex items-center gap-4">
                {extra}
                <button
                  onClick={close}
                  className="p-1.5 rounded-full hover:bg-khor-surface-hover text-khor-text-tertiary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-khor-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-[var(--khor-density-spacing-lg)] h-full pb-20">{children}</div>
        </div>
      </AntDrawer>
    );
  },
);
KSheetContent.displayName = 'KSheetContent';

export default KSheetContent;
