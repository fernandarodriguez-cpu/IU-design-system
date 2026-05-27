import React from 'react';
import { cn } from '@/utils/cn';

export interface KDividerProps extends React.HTMLAttributes<HTMLDivElement | HTMLHRElement> {
  type?: 'horizontal' | 'vertical';
  dashed?: boolean;
  orientation?: 'left' | 'right' | 'center';
  orientationMargin?: string | number;
  plain?: boolean;
}

/**
 * @figma-mcp-migration
 * Component: KDivider
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
export const KDivider = React.forwardRef<HTMLDivElement | HTMLHRElement, KDividerProps>(function KDivider(
  { className, type = 'horizontal', dashed, orientation = 'center', orientationMargin, plain, children, style, ...rest }, ref
) {
  const isVertical = type === 'vertical';
  const borderStyle = dashed ? 'dashed' : 'solid';
  
  if (isVertical) {
    return (
      <div 
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn("inline-block h-[0.9em] mx-2 align-middle border-l", className)}
        style={{ borderLeftStyle: borderStyle, borderColor: 'var(--khor-slate-200)', ...style }}
        {...rest}
      />
    );
  }

  const hasChildren = !!children;
  if (!hasChildren) {
    return (
      <hr 
        ref={ref as React.Ref<HTMLHRElement>}
        className={cn("w-full my-6 border-t", className)}
        style={{ borderTopStyle: borderStyle, borderColor: 'var(--khor-slate-200)', ...style }}
        {...rest}
      />
    );
  }

  // Divisor con texto interior
  const marginStr = typeof orientationMargin === 'number' ? `${orientationMargin}px` : orientationMargin;
  
  return (
    <div 
      ref={ref as React.Ref<HTMLDivElement>}
      className={cn("flex items-center w-full my-4 font-primary text-khor-neutral-900 whitespace-nowrap", className)}
      style={style}
      {...rest}
    >
      <div 
        className="border-b flex-grow" 
        style={{ 
          borderBottomStyle: borderStyle, 
          borderColor: 'var(--khor-slate-200)', 
          width: orientation === 'left' ? '5%' : orientation === 'right' ? '95%' : '50%'
        }} 
      />
      
      <span 
        className={cn("px-4", plain ? "font-normal" : "font-medium")}
        style={{
          marginLeft: orientation === 'left' && marginStr ? marginStr : undefined,
          marginRight: orientation === 'right' && marginStr ? marginStr : undefined,
        }}
      >
        {children}
      </span>
      
      <div 
        className="border-b flex-grow" 
        style={{ 
          borderBottomStyle: borderStyle, 
          borderColor: 'var(--khor-slate-200)',
          width: orientation === 'left' ? '95%' : orientation === 'right' ? '5%' : '50%'
        }} 
      />
    </div>
  );
});

KDivider.displayName = 'KDivider';

export default KDivider;
