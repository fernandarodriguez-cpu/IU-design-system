import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export const KDrawerRoot = DialogPrimitive.Root;
export const KDrawerTrigger = DialogPrimitive.Trigger;
export const KDrawerPortal = DialogPrimitive.Portal;
export const KDrawerClose = DialogPrimitive.Close;
export const KDrawer = DialogPrimitive.Root;

// Aliases para paridad con la estructura anterior y AntD
export const KDrawerHeader = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 px-[var(--khor-density-spacing-lg)] py-[var(--khor-density-spacing-md)] border-b border-khor-border-muted", className)} {...props}>{children}</div>
);
export const KDrawerTitle = ({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-lg font-bold text-khor-text-primary leading-tight tracking-tight font-primary", className)} {...props}>{children}</h3>
);
export const KDrawerDescription = ({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-khor-text-secondary opacity-70 font-primary", className)} {...props}>{children}</p>
);
export const KDrawerFooter = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex items-center justify-end gap-2 px-[var(--khor-density-spacing-lg)] py-[var(--khor-density-spacing-md)] border-t border-khor-border-muted", className)} {...props}>{children}</div>
);

export interface KDrawerProps extends Omit<React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>, 'title'> {
  placement?: 'top' | 'right' | 'bottom' | 'left';
  width?: string | number;
  height?: string | number;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  onClose?: () => void;
  /** Fuerza el estado hover (útil para previews/playgrounds) */
  isHovered?: boolean;
}

const placementVariants = {
  right: "inset-y-0 right-0 h-full border-l border-khor-border-default rounded-l-2xl data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-md",
  left: "inset-y-0 left-0 h-full border-r border-khor-border-default rounded-r-2xl data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-md",
  top: "inset-x-0 top-0 w-full border-b border-khor-border-default rounded-b-2xl data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top h-80",
  bottom: "inset-x-0 bottom-0 w-full border-t border-khor-border-default rounded-t-2xl data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom h-80",
};

export const KDrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
KDrawerOverlay.displayName = "KDrawerOverlay";

export const KDrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  KDrawerProps
>(({ className, children, placement = 'right', title, extra, width, height, onClose, isHovered, ...props }, ref) => (
  <KDrawerPortal>
    <KDrawerOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 bg-white shadow-khor-xl transition ease-in-out data-[state=open]:duration-500 data-[state=closed]:duration-300 font-primary flex flex-col",
        placementVariants[placement],
        isHovered && "ring-2 ring-khor-primary ring-inset",
        className
      )}
      style={{ 
        width: (placement === 'left' || placement === 'right') && width ? width : undefined,
        height: (placement === 'top' || placement === 'bottom') && height ? height : undefined
      }}
      {...props}
    >
      {/* Header logic para compatibilidad declarativa y manual */}
      {(title || extra) && (
        <div className="flex items-center justify-between px-[var(--khor-density-spacing-lg)] py-[var(--khor-density-spacing-md)] border-b border-khor-border-muted shrink-0">
          <div className="flex flex-col gap-1">
            {title && (
              typeof title === 'string' ? (
                <KDrawerTitle>{title}</KDrawerTitle>
              ) : (
                title
              )
            )}
          </div>
          <div className="flex items-center gap-4">
             {extra}
             <DialogPrimitive.Close onClick={onClose} className="p-1.5 rounded-full hover:bg-khor-surface-hover text-khor-text-tertiary transition-colors outline-none focus-visible:ring-2 focus-visible:ring-khor-primary">
                <X className="h-5 w-5" />
             </DialogPrimitive.Close>
          </div>
        </div>
      )}

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-[var(--khor-density-spacing-lg)] h-full pb-20">
        {children}
      </div>
    </DialogPrimitive.Content>
  </KDrawerPortal>
));
KDrawerContent.displayName = "KDrawerContent";

export default KDrawerContent;
