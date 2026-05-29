/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR BENTO GRID — Atom / Layout          ║
 * ║  Elite Marketing Architecture             ║
 * ╚═══════════════════════════════════════════╝
 */
import React from 'react';

export interface KBentoGridProps {
  children: React.ReactNode;
  className?: string;
  columns?: number;
  gap?: number;
}

/**
 * @figma-mcp-migration
 * Component: KBentoGrid
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
export const KBentoGrid: React.FC<KBentoGridProps> = ({
  children,
  className = '',
  columns = 4,
  gap = 24,
}) => {
  return (
    <div 
      className={`grid gap-[${gap}px] ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap}px`,
      }}
    >
      {children}
    </div>
  );
};

export interface KBentoItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  glass?: boolean;
}

export const KBentoItem: React.FC<KBentoItemProps> = ({
  children,
  className = '',
  colSpan = 1,
  rowSpan = 1,
  glass = false,
}) => {
  return (
    <div 
      className={`
        p-8 rounded-[2.5rem] overflow-hidden relative group transition-all duration-300
        ${glass ? 'khor-glass' : 'bg-white dark:bg-khor-surface-card border border-khor-border-default'}
        hover:shadow-khor-xl hover:border-khor-primary/20
        ${className}
      `}
      style={{
        gridColumn: `span ${colSpan} / span ${colSpan}`,
        gridRow: `span ${rowSpan} / span ${rowSpan}`,
      }}
    >
      {children}
    </div>
  );
};
