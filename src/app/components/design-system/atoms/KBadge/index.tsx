import React from 'react';
import { cn } from '@/utils/cn';

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
  /** Fuerza el estado hover (útil para previews/playgrounds) */
  isHovered?: boolean;
}

const statusColorMap: Record<KBadgeStatus, string> = {
  success: 'bg-khor-success',
  error: 'bg-khor-error',
  warning: 'bg-khor-warning',
  info: 'bg-khor-info',
  default: 'bg-khor-neutral-400',
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

/**
 * @figma-mcp-migration
 * Component: KBadge
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
            aria-hidden={isHidden}
            aria-label={typeof count === 'number' ? `${count} notifications` : undefined}
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

/* ─── KBadgeCount — Inline count pill (Figma: Badge/Count) ─────────
   Sizes:  sm=16px  md=20px  lg=24px
   Colors: blue (#051758 bg)  blue-invert (white bg + #051758 border)
           gray (#dbdbdb bg)  red (#e04d36 bg)
─────────────────────────────────────────────────────────────────── */
export type KBadgeCountColor = 'blue' | 'blue-invert' | 'gray' | 'red';
export type KBadgeCountSize  = 'sm' | 'md' | 'lg';

export interface KBadgeCountProps {
  count: React.ReactNode;
  color?: KBadgeCountColor;
  size?:  KBadgeCountSize;
  className?: string;
  style?: React.CSSProperties;
}

const COUNT_SIZE: Record<KBadgeCountSize, number> = { sm: 16, md: 20, lg: 24 };

const COUNT_COLOR: Record<KBadgeCountColor, { bg: string; text: string; border?: string }> = {
  'blue':        { bg: '#051758', text: '#ffffff' },
  'blue-invert': { bg: '#ffffff', text: '#0c1a66', border: '#051758' },
  'gray':        { bg: '#dbdbdb', text: '#8f9096' },
  'red':         { bg: '#e04d36', text: '#ffffff' },
};

export const KBadgeCount: React.FC<KBadgeCountProps> = ({
  count,
  color = 'blue',
  size  = 'md',
  className,
  style,
}) => {
  const dim = COUNT_SIZE[size];
  const { bg, text, border } = COUNT_COLOR[color];
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: dim,
        height: dim,
        borderRadius: 100,
        backgroundColor: bg,
        color: text,
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 1,
        padding: '0 4px',
        border: border ? `1px solid ${border}` : 'none',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {count}
    </span>
  );
};

KBadgeCount.displayName = 'KBadgeCount';

export default KBadge;
