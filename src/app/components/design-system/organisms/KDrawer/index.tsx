import React from 'react';
import { Drawer } from 'vaul';
import { cn } from '../../../../../imports/utils';
import { X } from 'lucide-react';

export const KDrawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof Drawer.Root>) => (
  <Drawer.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
KDrawer.displayName = "KDrawer";

export const KDrawerTrigger = Drawer.Trigger;
export const KDrawerPortal = Drawer.Portal;
export const KDrawerClose = Drawer.Close;

export const KDrawerOverlay = React.forwardRef<
  React.ElementRef<typeof Drawer.Overlay>,
  React.ComponentPropsWithoutRef<typeof Drawer.Overlay>
>(({ className, ...props }, ref) => (
  <Drawer.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/50 backdrop-blur-sm", className)}
    {...props}
  />
));
KDrawerOverlay.displayName = Drawer.Overlay.displayName;

/**
 * Por defecto de lado derecho (direction="right") o desde abajo ("bottom") 
 * Dependiendo del Root, 'vaul' aplica estilos. Añadimos un fallback si no.
 */
export const KDrawerContent = React.forwardRef<
  React.ElementRef<typeof Drawer.Content>,
  React.ComponentPropsWithoutRef<typeof Drawer.Content> & { hideCloseButton?: boolean }
>(({ className, children, hideCloseButton, ...props }, ref) => (
  <KDrawerPortal>
    <KDrawerOverlay />
    <Drawer.Content
      ref={ref}
      className={cn(
        "fixed z-50 flex flex-col border bg-khor-surface-page outline-none shadow-xl",
        "bottom-0 right-0 h-full w-[400px] max-w-full sm:w-[450px]", // Default: layout derecho
        // Para usarlo desde abajo con vaul, habría que sobreescribir w y h, ej: "bottom-0 inset-x-0 mt-24 h-auto rounded-t-[10px]"
        className
      )}
      {...props}
    >
      {!hideCloseButton && (
        <Drawer.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary text-khor-neutral-500">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Drawer.Close>
      )}
      <div className="flex-1 overflow-y-auto w-full p-6">
        {children}
      </div>
    </Drawer.Content>
  </KDrawerPortal>
));
KDrawerContent.displayName = "KDrawerContent";

export const KDrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col space-y-1.5 pb-2 text-left", className)}
    {...props}
  />
);
KDrawerHeader.displayName = "KDrawerHeader";

export const KDrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 pt-4 border-t border-khor-neutral-200 mt-auto", className)}
    {...props}
  />
);
KDrawerFooter.displayName = "KDrawerFooter";

export const KDrawerTitle = React.forwardRef<
  React.ElementRef<typeof Drawer.Title>,
  React.ComponentPropsWithoutRef<typeof Drawer.Title>
>(({ className, ...props }, ref) => (
  <Drawer.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight font-primary text-khor-neutral-900", className)}
    {...props}
  />
));
KDrawerTitle.displayName = Drawer.Title.displayName;

export const KDrawerDescription = React.forwardRef<
  React.ElementRef<typeof Drawer.Description>,
  React.ComponentPropsWithoutRef<typeof Drawer.Description>
>(({ className, ...props }, ref) => (
  <Drawer.Description
    ref={ref}
    className={cn("text-sm text-khor-neutral-500 font-primary", className)}
    {...props}
  />
));
KDrawerDescription.displayName = Drawer.Description.displayName;

export default KDrawer;
