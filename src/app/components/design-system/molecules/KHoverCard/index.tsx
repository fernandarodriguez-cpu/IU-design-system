import React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { cn } from '@/utils/cn';

/* ═══════════════════════════════════════════════
   KHoverCard — Primitivas (Radix UI + Tailwind)
   ═══════════════════════════════════════════════ */

/**
 * @figma-mcp-migration
 * Component: KHoverCardRoot
 * 
 * INSTRUCCIONES PARA AGENTES DE IA (VS Code / MCP):
 * Para migrar este componente a Figma, utilizar Figma Component Properties V2:
 * 1. Variants: Estilo y alineación.
 * 2. Color Variables: Fondos, bordes y sombras enlazados a tokens Khor v6.0.
 */
export const KHoverCardRoot = HoverCardPrimitive.Root;
export const KHoverCardTrigger = HoverCardPrimitive.Trigger;
export const KHoverCardPortal = HoverCardPrimitive.Portal;

export const KHoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-xl border border-khor-slate-200 bg-white p-4 text-khor-neutral-900 shadow-khor-lg outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 font-primary",
        className
      )}
      {...props}
    />
  </HoverCardPrimitive.Portal>
));
KHoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

/* ═══════════════════════════════════════════════
   KHoverCard — Molécula de conveniencia
   ═══════════════════════════════════════════════ */

export interface KHoverCardProps extends HoverCardPrimitive.HoverCardProps {
  children: React.ReactNode;
  content: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  arrow?: boolean;
}

export const KHoverCard = ({
  children,
  content,
  align = 'center',
  side = 'top',
  sideOffset = 6,
  arrow = false,
  openDelay = 300,
  closeDelay = 200,
  ...props
}: KHoverCardProps) => {
  return (
    <KHoverCardRoot openDelay={openDelay} closeDelay={closeDelay} {...props}>
      <KHoverCardTrigger asChild>
        {children}
      </KHoverCardTrigger>
      <KHoverCardContent align={align} side={side} sideOffset={sideOffset}>
        {content}
        {arrow && <HoverCardPrimitive.Arrow className="fill-khor-slate-200" />}
      </KHoverCardContent>
    </KHoverCardRoot>
  );
};

export default KHoverCard;
