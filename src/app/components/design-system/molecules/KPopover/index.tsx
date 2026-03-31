import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '../../../../../imports/utils';

/* ═══════════════════════════════════════════════
   KPopover — Primitivas (Radix UI + Tailwind)
   ═══════════════════════════════════════════════ */

export const KPopoverRoot = PopoverPrimitive.Root;
export const KPopoverTrigger = PopoverPrimitive.Trigger;
export const KPopoverAnchor = PopoverPrimitive.Anchor;
export const KPopoverPortal = PopoverPrimitive.Portal;

export const KPopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "relative z-50 w-72 rounded-md border border-[var(--khor-neutral-200)] bg-[var(--khor-surface-page)] p-4 text-[var(--khor-neutral-900)] shadow-md outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 font-primary",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
KPopoverContent.displayName = PopoverPrimitive.Content.displayName;

/* ═══════════════════════════════════════════════
   KPopover — Molécula de conveniencia
   ═══════════════════════════════════════════════ */

export interface KPopoverProps extends PopoverPrimitive.PopoverProps {
  children: React.ReactElement;
  content?: React.ReactNode;
  title?: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  trigger?: 'hover' | 'focus' | 'click';
  arrow?: boolean;
}

export const KPopover = ({ 
  children, 
  content, 
  title, 
  placement = 'top',
  arrow = true,
  ...props 
}: KPopoverProps) => {
  const side = placement.startsWith('top') ? 'top' : 
               placement.startsWith('bottom') ? 'bottom' :
               placement.startsWith('left') ? 'left' : 'right';
               
  const align = placement.toLowerCase().endsWith('left') || placement.toLowerCase().endsWith('top') ? 'start' :
                placement.toLowerCase().endsWith('right') || placement.toLowerCase().endsWith('bottom') ? 'end' : 'center';

  return (
    <KPopoverRoot {...props}>
      <KPopoverTrigger asChild>
        {children}
      </KPopoverTrigger>
      <KPopoverContent side={side} align={align} sideOffset={arrow ? 10 : 4}>
        {title && (
          <div className="mb-2 border-b border-[var(--khor-neutral-100)] pb-2 font-bold text-sm">
            {title}
          </div>
        )}
        <div className="text-sm text-[var(--khor-neutral-600)]">
          {content}
        </div>
        {arrow && <PopoverPrimitive.Arrow className="fill-[var(--khor-neutral-200)]" />}
      </KPopoverContent>
    </KPopoverRoot>
  );
};

export default KPopover;
