import React from 'react';
import { cn } from '../../../../../imports/utils';

export type KBadgeStatus = 'success' | 'error' | 'warning' | 'info' | 'default';

export interface KBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Texto opcional para mostrar junto al badge */
  label?: string;
  /** Estado del badge (v4 compatible) */
  status?: KBadgeStatus;
  /** Valor numérico o nodo a mostrar */
  count?: React.ReactNode;
  /** Si debe mostrarse el número 0. Default: false */
  showZero?: boolean;
  /** Si debe mostrarse solo como un punto. Default: false */
  dot?: boolean;
  /** Desplazamiento del badge [x, y] */
  offset?: [number, number];
  /** Color de fondo personalizado */
  color?: string;
  /** Contenido sobre el cual flota el badge */
  children?: React.ReactNode;
}

const statusColorMap: Record<KBadgeStatus, string> = {
  success: 'bg-[var(--khor-success)]',
  error: 'bg-[var(--khor-error)]',
  warning: 'bg-[var(--khor-warning)]',
  info: 'bg-[var(--khor-info)]',
  default: 'bg-[var(--khor-neutral-400)]',
};

/**
 * KBadge — Notificador de estados o contadores (Total Headless)
 */
export const KBadge = React.forwardRef<HTMLSpanElement, KBadgeProps>(
  ({ className, style, label, status = 'error', count, showZero = false, dot, offset, color, children, ...rest }, ref) => {
    
    // Si tiene label pero no children, se comporta como un Status Chip Inline
    if (label && !children) {
      return (
        <span 
          ref={ref}
          className={cn(
            "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold font-primary border",
            status === 'success' && "bg-emerald-50 text-emerald-700 border-emerald-200",
            status === 'error' && "bg-red-50 text-red-700 border-red-200",
            status === 'warning' && "bg-amber-50 text-amber-700 border-amber-200",
            status === 'info' && "bg-sky-50 text-sky-700 border-sky-200",
            status === 'default' && "bg-neutral-50 text-neutral-700 border-neutral-200",
            className
          )}
          style={style}
          {...rest}
        >
          <span className={cn("w-2 h-2 rounded-full", statusColorMap[status])} />
          {label}
        </span>
      );
    }

    const hasCount = count !== undefined && count !== null && (showZero || count !== 0);
    const isDot = dot && !hasCount;
    const isHidden = !hasCount && !isDot;
    const badgeColorClass = statusColorMap[status] || statusColorMap.error; 

    const customStyle: React.CSSProperties = { ...style };
    if (offset) {
      customStyle.transform = `translate(${50 + offset[0]}%, ${-50 + offset[1]}%)`;
    }
    if (color) {
      customStyle.backgroundColor = color;
    }

    return (
      <span ref={ref} className={cn("relative inline-flex align-middle", className)} {...rest}>
        {children}
        {!isHidden && (
          <sup
            style={customStyle}
            className={cn(
              "absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 font-primary text-white",
              isDot 
                ? `w-2 h-2 rounded-full ${color ? '' : badgeColorClass}`
                : `min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold ${color ? '' : badgeColorClass} shadow-[0_0_0_2px_var(--khor-surface-page)]`
            )}
          >
            {isDot ? null : count}
          </sup>
        )}
      </span>
    );
  }
);

KBadge.displayName = 'KBadge';

export default KBadge;
