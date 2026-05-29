import React from 'react';
import { cn } from '@/utils/cn';
import { useBreakpoint, Breakpoint } from '../../../../hooks/useBreakpoint';

export type Gutter = number | [number, number] | Partial<Record<Breakpoint, number>>;

export interface KRowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: Gutter | [Gutter, Gutter];
  align?: 'top' | 'middle' | 'bottom' | 'stretch';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  wrap?: boolean;
}

/**
 * @figma-mcp-migration
 * Component: KRow
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
export const KRow = React.forwardRef<HTMLDivElement, KRowProps>(
  ({ className, gutter = 0, align, justify, wrap = true, style, children, ...props }, ref) => {
    const screens = useBreakpoint();

    const getGutterValue = (g: Gutter): number => {
      if (typeof g === 'number') return g;
      if (typeof g === 'object' && !Array.isArray(g)) {
        // Handle responsive object { xs: 8, sm: 16... }
        const breakpointOrder: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
        const currentIdx = breakpointOrder.indexOf(screens);
        for (let i = currentIdx; i < breakpointOrder.length; i++) {
          const val = (g as any)[breakpointOrder[i]];
          if (val !== undefined) return val;
        }
      }
      return 0;
    };

    let horizontalGutter = 0;
    let verticalGutter = 0;

    if (Array.isArray(gutter)) {
      horizontalGutter = getGutterValue(gutter[0] as Gutter);
      verticalGutter = getGutterValue(gutter[1] as Gutter);
    } else {
      horizontalGutter = getGutterValue(gutter);
    }

    let alignItems = align as any;
    if (align === 'top') alignItems = 'flex-start';
    if (align === 'middle') alignItems = 'center';
    if (align === 'bottom') alignItems = 'flex-end';

    let justifyContent = justify as any;
    if (justify === 'start') justifyContent = 'flex-start';
    if (justify === 'end') justifyContent = 'flex-end';

    const computedStyle: React.CSSProperties = {
      display: 'flex',
      flexWrap: wrap ? 'wrap' : 'nowrap',
      alignItems,
      justifyContent,
      marginLeft: horizontalGutter > 0 ? -(horizontalGutter / 2) : undefined,
      marginRight: horizontalGutter > 0 ? -(horizontalGutter / 2) : undefined,
      rowGap: verticalGutter,
      ...style,
    };

    return (
      <div 
        ref={ref}
        className={cn('k-row', className)}
        style={computedStyle}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              // @ts-ignore
              _khorHorizontalGutter: horizontalGutter
            });
          }
          return child;
        })}
      </div>
    );
  }
);
KRow.displayName = 'KRow';

export default KRow;
