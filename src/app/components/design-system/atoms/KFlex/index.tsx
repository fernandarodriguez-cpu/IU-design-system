import React from 'react';
import { cn } from '@/utils/cn';
import { useBreakpoint, Breakpoint } from '../../../../hooks/useBreakpoint';

type FlexJustify = 'normal' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
type FlexAlign = 'normal' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'self-start' | 'self-end' | 'baseline' | 'stretch';

export interface KFlexProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean | Partial<Record<Breakpoint, boolean>>;
  wrap?: React.CSSProperties['flexWrap'];
  justify?: FlexJustify;
  align?: FlexAlign;
  flex?: React.CSSProperties['flex'];
  gap?: React.CSSProperties['gap'] | 'small' | 'middle' | 'large' | Partial<Record<Breakpoint, number | string | 'small' | 'middle' | 'large'>>;
  children?: React.ReactNode;
}

/**
 * @figma-mcp-migration
 * Component: KFlex
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
export const KFlex = React.forwardRef<HTMLDivElement, KFlexProps>(
  ({ className, vertical, wrap, justify, align, flex, gap, style, children, ...props }, ref) => {
    const screens = useBreakpoint();

    const getResponsiveValue = <T,>(val: T | Partial<Record<Breakpoint, T>>, defaultVal: T): T => {
      if (typeof val !== 'object' || val === null) return val ?? defaultVal;
      const breakpointOrder: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
      const currentIdx = breakpointOrder.indexOf(screens);
      for (let i = currentIdx; i < breakpointOrder.length; i++) {
        const v = (val as any)[breakpointOrder[i]];
        if (v !== undefined) return v;
      }
      return defaultVal;
    };

    const isVertical = getResponsiveValue(vertical, false);
    const rawGap = getResponsiveValue(gap, undefined);

    let gapValue: string | number | undefined = rawGap as any;
    if (rawGap === 'small') gapValue = 'var(--khor-density-spacing-sm)';
    else if (rawGap === 'middle') gapValue = 'var(--khor-density-spacing-md)';
    else if (rawGap === 'large') gapValue = 'var(--khor-density-spacing-lg)';

    const computedStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: isVertical ? 'column' : 'row',
      flexWrap: wrap,
      justifyContent: justify,
      alignItems: align,
      flex,
      gap: gapValue,
      ...style,
    };

    return (
      <div 
        ref={ref}
        className={cn('k-flex', className)}
        style={computedStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

KFlex.displayName = 'KFlex';

export default KFlex;
