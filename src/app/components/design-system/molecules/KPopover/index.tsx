import React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/utils/cn';

/* ═══════════════════════════════════════════════
   KPopover — Primitivas (Radix UI + Tailwind)
   ═══════════════════════════════════════════════ */

/**
 * @figma-mcp-migration
 * Component: KPopoverRoot
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
        "relative z-50 w-72 rounded-xl border border-khor-slate-200 bg-white p-4 text-khor-neutral-900 shadow-khor-lg outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 font-primary",
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
          <div className="mb-2 border-b border-khor-slate-100 pb-2 font-bold text-sm">
            {title}
          </div>
        )}
        <div className="text-sm text-khor-neutral-600">
          {content}
        </div>
        {arrow && <PopoverPrimitive.Arrow className="fill-khor-slate-200" />}
      </KPopoverContent>
    </KPopoverRoot>
  );
};

export default KPopover;
