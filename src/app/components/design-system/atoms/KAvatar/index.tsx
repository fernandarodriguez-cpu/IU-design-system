import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../../../../../imports/utils';
import { User } from 'lucide-react';
import { KPopover } from '../../molecules/KPopover';

/* ═══════════════════════════════════════════════
   KAvatar — Átomo de avatar con paridad AntD
   Radix UI + CSS Variables (Tailwind v4 safe)
   ═══════════════════════════════════════════════ */

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | number;

export interface KAvatarProps {
  /** URL de imagen */
  src?: string;
  /** Texto alternativo para la imagen (accesibilidad) */
  alt?: string;
  /** Atributo srcSet para imágenes responsive */
  srcSet?: string;
  /** Política CORS para la imagen */
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
  /** Política de referer para la imagen */
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  /** Si la imagen es arrastrable */
  draggable?: boolean;
  /** Nombre completo para generar iniciales automáticamente */
  name?: string;
  /** Icono personalizado si no hay imagen */
  icon?: React.ReactNode;
  /** Tamaño del avatar. Preset, número en px o objeto responsivo */
  size?: AvatarSize | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number; xxl?: number };
  /** Forma del avatar */
  shape?: 'circle' | 'square';
  /** Estado de presencia */
  status?: 'online' | 'offline' | 'busy' | 'away';
  /** 
   * Distancia en px entre el borde del avatar y el texto de iniciales.
   * Controla el auto-sizing del texto. Default: 4
   */
  gap?: number;
  /** Color de fondo personalizado */
  color?: string;
  /** Callback cuando la imagen falla al cargar. Retornar false previene el fallback */
  onError?: () => boolean | void;
  /** Clase CSS adicional */
  className?: string;
  /** Estilos adicionales */
  style?: React.CSSProperties;
  /** Contenido personalizado (letra, icono, etc.) */
  children?: React.ReactNode;
  /** onClick handler */
  onClick?: (e: React.MouseEvent) => void;
}

const statusColors: Record<string, string> = {
  online: 'var(--khor-success)',
  offline: 'var(--khor-neutral-400)',
  busy: 'var(--khor-error)',
  away: 'var(--khor-warning)',
};

const sizeMap: Record<string, number> = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

const fontSizeMap: Record<string, number> = {
  sm: 12,
  md: 14,
  lg: 20,
  xl: 28,
};

const statusDotMap: Record<string, number> = {
  sm: 10,
  md: 12,
  lg: 16,
  xl: 20,
};

/**
 * Hook simple para detectar breakpoints y manejar tamaños responsivos de Avatar
 */
function useAvatarBreakpoint(size: KAvatarProps['size']) {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return useMemo(() => {
    if (typeof size !== 'object' || size === null) return size as AvatarSize;
    
    // Breakpoints estándar (AntD compatible)
    if (windowWidth >= 1600 && size.xxl) return size.xxl;
    if (windowWidth >= 1200 && size.xl) return size.xl;
    if (windowWidth >= 992 && size.lg) return size.lg;
    if (windowWidth >= 768 && size.md) return size.md;
    if (windowWidth >= 576 && size.sm) return size.sm;
    return size.xs || size.sm || size.md || 40;
  }, [size, windowWidth]);
}

/**
 * KAvatar — Avatar circular o cuadrado con imagen, icono, iniciales autoajustables
 * y estado de presencia. Basado en Radix UI Avatar con paridad AntD completa.
 */
export const KAvatar = React.forwardRef<HTMLDivElement, KAvatarProps>(({
  src,
  alt,
  srcSet,
  crossOrigin,
  referrerPolicy,
  draggable,
  name,
  icon,
  size: rawSize = 'md',
  shape = 'circle',
  status,
  gap = 4,
  color,
  onError,
  className,
  style,
  children,
  onClick,
}, ref) => {
  // Manejo de tamaños responsivos
  const size = useAvatarBreakpoint(rawSize);
  const isCustomSize = typeof size === 'number';
  const pxSize = isCustomSize ? size : sizeMap[size as string] || 40;
  const baseFontSize = isCustomSize ? pxSize * 0.4 : fontSizeMap[size as string] || 14;
  const dotSize = isCustomSize ? Math.max(8, pxSize * 0.25) : statusDotMap[size as string] || 12;

  // Auto-sizing text ref
  const textRef = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(1);

  const initials = name
    ? name.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '';

  const textContent = children || icon || initials;

  // Measure and scale text to fit within avatar
  const autoFitText = useCallback(() => {
    if (!textRef.current) return;
    const node = textRef.current;
    const parentWidth = pxSize - gap * 2;
    const textWidth = node.scrollWidth;
    if (textWidth > 0 && parentWidth > 0 && textWidth > parentWidth) {
      setScale(parentWidth / textWidth);
    } else {
      setScale(1);
    }
  }, [pxSize, gap]);

  useEffect(() => {
    autoFitText();
  }, [textContent, pxSize, gap, autoFitText]);

  // Image error handling
  const [imgError, setImgError] = useState(false);

  const handleImageError = useCallback(() => {
    if (onError) {
      const result = onError();
      if (result === false) return; // User prevents fallback
    }
    setImgError(true);
  }, [onError]);

  // Reset error when src changes
  useEffect(() => {
    setImgError(false);
  }, [src]);

  const showImage = src && !imgError;

  const hasCustomColor = !!color;

  return (
    <div
      ref={ref}
      className={cn("relative inline-flex shrink-0", className)}
      style={{ ...style }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <AvatarPrimitive.Root
        className={cn(
          "relative flex shrink-0 overflow-hidden font-primary font-semibold select-none items-center justify-center",
          shape === 'circle' ? "rounded-full" : "rounded-lg",
          !hasCustomColor && "bg-khor-avatar-bg text-khor-avatar-fg",
        )}
        style={{
          width: pxSize,
          height: pxSize,
          ...(hasCustomColor ? { backgroundColor: color, color: '#FFFFFF' } : {}),
          fontSize: baseFontSize,
        }}
      >
        {showImage ? (
          <AvatarPrimitive.Image
            src={src}
            alt={alt || name || ''}
            srcSet={srcSet}
            crossOrigin={crossOrigin}
            referrerPolicy={referrerPolicy}
            draggable={draggable}
            className="aspect-square h-full w-full object-cover"
            style={{ animationDuration: '300ms' }}
            onLoadingStatusChange={(status) => {
              if (status === 'error') handleImageError();
            }}
          />
        ) : null}
        <AvatarPrimitive.Fallback
          className={cn(
            "flex h-full w-full items-center justify-center leading-none overflow-hidden",
            !hasCustomColor && "bg-khor-avatar-bg text-khor-avatar-fg",
          )}
          style={hasCustomColor ? { backgroundColor: color, color: '#FFFFFF' } : undefined}
          delayMs={showImage ? 600 : 0}
        >
          {icon ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {icon}
            </span>
          ) : initials ? (
            <span
              ref={textRef}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'center',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                padding: `0 ${gap}px`,
              }}
            >
              {children || initials}
            </span>
          ) : children ? (
            <span
              ref={textRef}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'center',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                padding: `0 ${gap}px`,
              }}
            >
              {children}
            </span>
          ) : (
            <User size={pxSize * 0.55} strokeWidth={1.8} />
          )}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>

      {status && (
        <span
          aria-label={`Estado: ${status}`}
          style={{
            position: 'absolute',
            display: 'block',
            borderRadius: '50%',
            boxShadow: '0 0 0 2px var(--khor-surface-card)',
            backgroundColor: statusColors[status],
            width: dotSize,
            height: dotSize,
            ...(shape === 'circle'
              ? { bottom: '2%', right: '2%' }
              : { bottom: -2, right: -2 }),
          }}
        />
      )}
    </div>
  );
});

KAvatar.displayName = "KAvatar";

/* ═══════════════════════════════════════════════
   KAvatarGroup — Grupo de avatares con max count
   ═══════════════════════════════════════════════ */

export interface KAvatarGroupProps {
  children: React.ReactNode;
  /** 
   * Configuración de excedente. AntD 5 spec.
   * Puede ser un número (total de avatares visibles) o un objeto con estilo y popover.
   */
  max?: number | {
    count: number;
    style?: React.CSSProperties;
    popover?: {
      trigger?: 'hover' | 'click' | 'focus';
      placement?: 'top' | 'bottom' | 'left' | 'right';
    };
  };
  /** Tamaño uniforme para todos los avatares del grupo */
  size?: KAvatarProps['size'];
  /** Forma uniforme para todos los avatares del grupo */
  shape?: 'circle' | 'square';
  /** Legacy: Estilo del indicador "+N". Preferible usar max.style */
  maxStyle?: React.CSSProperties;
  /** Clase CSS adicional */
  className?: string;
}

export const KAvatarGroup = ({
  children,
  max,
  size,
  shape,
  maxStyle,
  className,
}: KAvatarGroupProps) => {
  const childArray = React.Children.toArray(children);
  const total = childArray.length;
  
  // Normalizar max config
  const maxConfig = typeof max === 'number' ? { count: max } : max || { count: total };
  const visibleCount = maxConfig.count < total ? maxConfig.count : total;
  const surplus = total - visibleCount;

  // Resolve size for overlap calculation
  const pxSizeMap: Record<string, number> = { sm: 32, md: 40, lg: 56, xl: 80 };
  const pxSize = typeof size === 'number' ? size : (typeof size === 'string' ? pxSizeMap[size] : 40);
  const fontSize = pxSize * 0.35;

  const visibleChildren = childArray.slice(0, visibleCount).map((child, index) => {
    if (React.isValidElement<KAvatarProps>(child)) {
      const overrides: Partial<KAvatarProps> = {};
      if (size !== undefined) overrides.size = size;
      if (shape !== undefined) overrides.shape = shape;
      return React.cloneElement(child, { key: index, ...overrides });
    }
    return child;
  });

  const surplusList = childArray.slice(visibleCount);

  return (
    <div className={cn("flex items-center", className)} style={{ display: 'flex', alignItems: 'center' }}>
      {visibleChildren.map((child, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : -(pxSize * 0.25), position: 'relative', zIndex: visibleCount - i }}>
          {child}
        </div>
      ))}
      
      {surplus > 0 && (
        <KPopover 
          trigger={maxConfig.popover?.trigger || 'hover'}
          content={
            <div className="flex flex-col gap-2 p-2 max-h-60 overflow-y-auto">
              {surplusList.map((avatar, idx) => (
                <div key={idx} className="flex items-center gap-3 px-2 py-1 hover:bg-khor-neutral-50 rounded-md">
                   {avatar}
                   {React.isValidElement<KAvatarProps>(avatar) && (
                     <span className="text-sm font-medium text-khor-text-primary">
                       {avatar.props.name || "Avatar"}
                     </span>
                   )}
                </div>
              ))}
            </div>
          }
        >
          <div
            style={{
              marginLeft: -(pxSize * 0.25),
              position: 'relative',
              zIndex: 0,
              width: pxSize,
              height: pxSize,
              borderRadius: shape === 'square' ? 'var(--khor-radius-lg)' : '50%',
              backgroundColor: 'var(--khor-neutral-300)',
              color: 'var(--khor-neutral-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize,
              fontWeight: 600,
              fontFamily: 'var(--font-primary)',
              boxShadow: '0 0 0 2px var(--khor-surface-card)',
              cursor: 'pointer',
              ...maxStyle,
              ...maxConfig.style,
            }}
            aria-label={`${surplus} más`}
          >
            +{surplus}
          </div>
        </KPopover>
      )}
    </div>
  );
};

KAvatarGroup.displayName = "KAvatarGroup";

export default KAvatar;
