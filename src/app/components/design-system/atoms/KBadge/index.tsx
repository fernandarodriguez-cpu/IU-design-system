import React from 'react';
import { cn } from '../../../../../imports/utils';

export type KBadgeStatus = 'success' | 'error' | 'warning' | 'info' | 'default' | 'primary' | 'processing' | 'teal';

export interface KBadgeStyles {
  root?: React.CSSProperties;
  indicator?: React.CSSProperties;
  text?: React.CSSProperties;
}

export interface KBadgeClassNames {
  root?: string;
  indicator?: string;
  text?: string;
}

export interface KBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Texto opcional para mostrar junto al badge. Alias de 'text' */
  label?: string;
  /** Texto opcional para mostrar junto al badge (estándar AntD) */
  text?: React.ReactNode;
  /** Estado del badge */
  status?: KBadgeStatus;
  /** Valor numérico o nodo a mostrar */
  count?: React.ReactNode;
  /** Si debe mostrarse el número 0. Default: false */
  showZero?: boolean;
  /** Si debe mostrarse solo como un punto. Default: false */
  dot?: boolean;
  /** Desplazamiento del badge [x, y] */
  offset?: [number | string, number | string];
  /** Color de fondo personalizado */
  color?: string;
  /** Número máximo a mostrar antes de usar el símbolo '+' */
  overflowCount?: number;
  /** Tamaño del badge */
  size?: 'default' | 'small';
  /** Contenido sobre el cual flota el badge */
  children?: React.ReactNode;
  /** Estilos semánticos */
  styles?: KBadgeStyles;
  /** Clases semánticas */
  classNames?: KBadgeClassNames;
}

const statusColorMap: Record<KBadgeStatus, string> = {
  success: 'bg-khor-success',
  error: 'bg-khor-error',
  warning: 'bg-khor-warning',
  info: 'bg-khor-info',
  default: 'bg-khor-slate-400',
  primary: 'bg-khor-primary',
  processing: 'bg-khor-processing animate-pulse',
  teal: 'bg-khor-teal',
};

/**
 * Ribbon Sub-component
 */
export interface KBadgeRibbonProps {
  className?: string;
  style?: React.CSSProperties;
  /** Texto a mostrar en la cinta */
  text?: React.ReactNode;
  /** Color de la cinta */
  color?: string;
  /** Posición de la cinta */
  placement?: 'start' | 'end';
  children?: React.ReactNode;
}

const KBadgeRibbon: React.FC<KBadgeRibbonProps> = ({
  className,
  style,
  text,
  color,
  placement = 'end',
  children,
}) => {
  return (
    <div className="relative inline-block w-full">
      {children}
      <div 
        className={cn(
          "absolute top-2 z-10 px-2 py-0.5 text-xs font-bold text-white shadow-sm whitespace-nowrap",
          placement === 'end' ? "-right-2 rounded-l-sm" : "-left-2 rounded-r-sm",
          color ? "" : "bg-khor-primary",
          className
        )}
        style={{ 
          backgroundColor: color,
          ...style 
        }}
      >
        {text}
        {/* Ribbon Fold Effect */}
        <div 
          className={cn(
            "absolute bottom-[-8px] border-[4px] border-transparent",
            placement === 'end' 
              ? "right-0 border-t-khor-primary/70 border-l-khor-primary/70" 
              : "left-0 border-t-khor-primary/70 border-r-khor-primary/70"
          )}
          style={color ? { 
            borderTopColor: 'rgba(0,0,0,0.3)', 
            borderLeftColor: placement === 'end' ? 'rgba(0,0,0,0.3)' : 'transparent',
            borderRightColor: placement === 'start' ? 'rgba(0,0,0,0.3)' : 'transparent',
          } : {}}
        />
      </div>
    </div>
  );
};

/**
 * KBadge — Notificador de estados o contadores.
 */
interface KBadgeComponent extends React.ForwardRefExoticComponent<KBadgeProps & React.RefAttributes<HTMLSpanElement>> {
  Ribbon: typeof KBadgeRibbon;
}

export const KBadge = React.forwardRef<HTMLSpanElement, KBadgeProps>(
  ({ 
    className, style, label, text, status, 
    count, showZero = false, dot, offset, color, 
    overflowCount = 99, size = 'default',
    children, styles, classNames, title, ...rest 
  }, ref) => {
    
    const displayLabel = text || label;
    const badgeColorClass = status ? (statusColorMap[status] || statusColorMap.error) : 'bg-khor-error';

    // Standalone Status Mode (Dot + Text)
    if (status && !children) {
      return (
        <span 
          ref={ref}
          title={title}
          className={cn("inline-flex items-center gap-2 align-middle", classNames?.root, className)}
          style={{ ...styles?.root, ...style }}
          {...rest}
        >
          <span 
            className={cn(
              "w-2 h-2 rounded-full shrink-0", 
              badgeColorClass,
              classNames?.indicator
            )} 
            style={{ backgroundColor: color, ...styles?.indicator }}
          />
          {displayLabel && (
            <span 
              className={cn("text-xs font-semibold text-khor-neutral-700", classNames?.text)}
              style={styles?.text}
            >
              {displayLabel}
            </span>
          )}
        </span>
      );
    }

    const numericCount = typeof count === 'number' ? count : NaN;
    const displayCount = !isNaN(numericCount) && numericCount > overflowCount 
      ? `${overflowCount}+` 
      : count;

    const hasCount = count !== undefined && count !== null && (showZero || (numericCount !== 0 || isNaN(numericCount)));
    const isDot = dot && !hasCount;
    const isHidden = !hasCount && !isDot;

    const badgeStyle: React.CSSProperties = { ...styles?.indicator };
    if (offset) {
      badgeStyle.right = typeof offset[0] === 'number' ? -offset[0] : offset[0];
      badgeStyle.top = typeof offset[1] === 'number' ? offset[1] : offset[1];
    }
    if (color) {
      badgeStyle.backgroundColor = color;
    }

    return (
      <span 
        ref={ref} 
        title={title}
        className={cn("relative inline-flex align-middle", classNames?.root, className)} 
        style={{ ...styles?.root, ...style }}
        {...rest}
      >
        {children}
        {!isHidden && (
          <sup
            style={badgeStyle}
            className={cn(
              "absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 font-primary text-white shadow-khor-sm ring-2 ring-white transition-all",
              isDot 
                ? `w-1.5 h-1.5 rounded-full ${color ? '' : badgeColorClass}`
                : cn(
                    "rounded-full font-bold select-none",
                    size === 'small' ? "h-4 min-w-[16px] px-1 text-[9px]" : "h-[var(--khor-density-height-badge)] min-w-[var(--khor-density-height-badge)] px-1.5 text-[11px]",
                    color ? '' : badgeColorClass
                  ),
              classNames?.indicator
            )}
          >
            {isDot ? null : displayCount}
          </sup>
        )}
      </span>
    );
  }
) as unknown as KBadgeComponent;

KBadge.Ribbon = KBadgeRibbon;
KBadge.displayName = 'KBadge';

export default KBadge;
