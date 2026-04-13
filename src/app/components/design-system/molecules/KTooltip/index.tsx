import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '../../../../../imports/utils';

/* ═══════════════════════════════════════════════
   KTooltip — Primitivas (Radix UI + Tailwind)
   ═══════════════════════════════════════════════ */

export const KTooltipProvider = TooltipPrimitive.Provider;
export const KTooltipRoot = TooltipPrimitive.Root;
export const KTooltipTrigger = TooltipPrimitive.Trigger;

export const KTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, style, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 font-primary shadow-md",
      className
    )}
    style={{
      backgroundColor: 'var(--khor-tooltip-bg)',
      color: 'var(--khor-tooltip-fg)',
      ...style,
    }}
    {...props}
  />
));
KTooltipContent.displayName = TooltipPrimitive.Content.displayName;

/* ═══════════════════════════════════════════════
   KTooltip — Molécula de conveniencia
   ═══════════════════════════════════════════════ */

export interface KTooltipProps extends TooltipPrimitive.TooltipProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  children: React.ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'focus' | 'click';
  color?: string; // Por paridad con AntD
}

export const KTooltip = ({ 
  title, 
  content, 
  children, 
  placement = 'top',
  color,
  ...props 
}: KTooltipProps) => {
  const displayContent = title || content;

  if (!displayContent) return children;

  return (
    <KTooltipProvider>
      <KTooltipRoot {...props}>
        <KTooltipTrigger asChild>
          {children}
        </KTooltipTrigger>
        <KTooltipContent 
          side={placement} 
          style={color ? { backgroundColor: color } : undefined}
        >
          {displayContent}
          <TooltipPrimitive.Arrow style={{ fill: color || 'var(--khor-tooltip-bg)' }} />
        </KTooltipContent>
      </KTooltipRoot>
    </KTooltipProvider>
  );
};

export default KTooltip;
