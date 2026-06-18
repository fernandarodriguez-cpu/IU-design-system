import React from 'react';
import { cn } from '@/utils/cn';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

export interface KNavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  collapsed?: boolean;
}

/**
 * @figma-mcp-migration
 * Component: KNavItem
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
export const KNavItem = React.forwardRef<HTMLButtonElement, KNavItemProps>(function KNavItem(
  { icon, label, active, badge, collapsed, className, ...rest }, ref
) {
  return (
    <button
      ref={ref}
      style={{
        backgroundColor: active ? 'rgba(255,255,255,0.08)' : 'transparent',
        color: active ? 'var(--khor-text-on-dark)' : 'var(--khor-text-on-dark-secondary)',
        fontWeight: active ? t.typography.fontWeights.semibold : t.typography.fontWeights.regular,
      }}
      className={cn(
        "relative flex w-full items-center border-none font-primary text-sm transition-all duration-150 ease-in h-[50px] cursor-pointer outline-none",
        collapsed ? "justify-center p-2.5" : "justify-start px-4 py-0 gap-2.5",
        !active && "hover:bg-khor-surface-on-dark-hover hover:text-khor-text-on-dark",
        className
      )}
      {...rest}
    >
      <span className={cn("flex items-center", active ? "text-khor-text-on-dark" : "text-khor-text-on-dark-secondary")}>
        {icon}
      </span>
      
      {!collapsed && (
        <span className="flex-1 truncate text-left">
          {label}
        </span>
      )}

      {!collapsed && badge !== undefined && badge > 0 && (
        <span 
          className="min-w-[18px] rounded-full bg-khor-primary px-1.5 py-[1px] text-center text-[10px] font-semibold text-white"
        >
          {badge}
        </span>
      )}

      {active && (
        <div
          style={{ backgroundColor: 'rgba(224,77,54,1)' }}
          className="absolute bottom-0 right-0 top-0 w-1"
        />
      )}
    </button>
  );
});

export default KNavItem;
