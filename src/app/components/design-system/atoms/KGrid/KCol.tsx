import React from 'react';
import { cn } from '@/utils/cn';

export type ColSpanType = number | string;

export interface ColSize {
  span?: ColSpanType;
  offset?: ColSpanType;
  order?: ColSpanType;
  pull?: ColSpanType;
  push?: ColSpanType;
}

export interface KColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: ColSpanType;
  offset?: ColSpanType;
  order?: ColSpanType;
  flex?: string | number;
  xs?: ColSpanType | ColSize;
  sm?: ColSpanType | ColSize;
  md?: ColSpanType | ColSize;
  lg?: ColSpanType | ColSize;
  xl?: ColSpanType | ColSize;
  xxl?: ColSpanType | ColSize;
  _khorHorizontalGutter?: number; // Injected by KRow
}

/**
 * @figma-mcp-migration
 * Component: KCol
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
export const KCol = React.forwardRef<HTMLDivElement, KColProps>(
  ({ 
    className, span, offset, order, flex, 
    xs, sm, md, lg, xl, xxl,
    style, children, _khorHorizontalGutter = 0, ...props 
  }, ref) => {
    
    const classes: string[] = [];
    let columnStyle: React.CSSProperties = { ...style };
    
    // AntD v5 fallback: if no span or responsive props, take 100% or flex: 1
    const noProps = span === undefined && !xs && !sm && !md && !lg && !xl && !xxl;
    
    // Base classes
    if (span !== undefined) classes.push(`k-col-${span}`);
    if (offset !== undefined) classes.push(`k-col-offset-${offset}`);
    if (order !== undefined) columnStyle.order = Number(order);

    // Responsive classes helper
    const parseSize = (size: ColSpanType | ColSize | undefined, prefix: string) => {
      if (typeof size === 'number' || typeof size === 'string') {
        classes.push(`k-col-${prefix}-${size}`);
      } else if (typeof size === 'object' && size !== null) {
        if (size.span !== undefined) classes.push(`k-col-${prefix}-${size.span}`);
        if (size.offset !== undefined) classes.push(`k-col-${prefix}-offset-${size.offset}`);
      }
    };

    parseSize(xs, 'xs');
    parseSize(sm, 'sm');
    parseSize(md, 'md');
    parseSize(lg, 'lg');
    parseSize(xl, 'xl');
    parseSize(xxl, 'xxl');

    if (flex) {
      columnStyle.flex = flex;
    } else if (noProps) {
      columnStyle.flex = '1';
    }

    if (_khorHorizontalGutter > 0) {
      columnStyle.paddingInlineStart = _khorHorizontalGutter / 2;
      columnStyle.paddingInlineEnd = _khorHorizontalGutter / 2;
    }

    return (
      <div 
        ref={ref}
        className={cn(classes, className)}
        style={columnStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);
KCol.displayName = 'KCol';

export default KCol;
