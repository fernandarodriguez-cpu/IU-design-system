import React from 'react';
import { cn } from '@/utils/cn';

export type KSpaceSize = 'sm' | 'md' | 'lg' | number;
export type KSpaceAlign = 'start' | 'end' | 'center' | 'baseline';

export interface KSpaceProps {
  direction?: 'horizontal' | 'vertical';
  size?: KSpaceSize | [KSpaceSize, KSpaceSize];
  align?: KSpaceAlign;
  wrap?: boolean;
  split?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const sizeMap: Record<string, string> = {
  sm: "8px",
  md: "16px",
  lg: "24px",
};

/**
 * KSpace — Utilidad de espaciado (Headless v4)
 * Reemplaza AntD Space con una estructura pura de flexbox y Tailwind.
 */
/**
 * @figma-mcp-migration
 * Component: KSpace
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
export function KSpace({
  direction = 'horizontal',
  size = 'md',
  align,
  wrap = false,
  split,
  className,
  style,
  children,
}: KSpaceProps) {
  
  const getGap = (s: KSpaceSize) => (typeof s === 'number' ? `${s}px` : sizeMap[s] || sizeMap.md);

  const customStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: Array.isArray(size) ? `${getGap(size[0])} ${getGap(size[1])}` : getGap(size),
    alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
    ...style,
  };

  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <div className={cn("font-primary", className)} style={customStyle}>
      {items.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {split && index < items.length - 1 && (
            <span className="shrink-0 opacity-20 border-l border-khor-neutral-300 self-stretch mx-1" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default KSpace;
