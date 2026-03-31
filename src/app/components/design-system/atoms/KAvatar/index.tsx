import React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn } from '../../../../../imports/utils';

export interface KAvatarProps {
  /** URL de imagen */
  src?: string;
  /** Nombre completo para generar iniciales automáticamente */
  name?: string;
  /** Icono personalizado si no hay imagen */
  icon?: React.ReactNode;
  /** Tamaño del avatar */
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Forma del avatar. Default: 'circle' */
  shape?: 'circle' | 'square';
  /** Estado de presencia: online | offline | busy | away */
  status?: 'online' | 'offline' | 'busy' | 'away';
  /** Clase CSS adicional */
  className?: string;
  /** Estilos adicionales */
  style?: React.CSSProperties;
  /** Contenido personalizado */
  children?: React.ReactNode;
}

const statusColors = {
  online: "bg-emerald-500",
  offline: "bg-neutral-400",
  busy: "bg-red-500",
  away: "bg-amber-500",
};

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-lg",
  xl: "h-20 w-20 text-2xl",
};

/**
 * KAvatar — Avatar circular o cuadrado con soporte de imagen, iniciales y estado.
 * Basado en Radix UI Avatar.
 */
export const KAvatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  KAvatarProps
>(({ 
  src, 
  name, 
  icon, 
  size = 'md', 
  shape = 'circle', 
  status, 
  className, 
  style, 
  children 
}, ref) => {
  const initials = name 
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) 
    : '';

  const isCustomSize = typeof size === 'number';

  return (
    <div className="relative inline-flex shrink-0">
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex shrink-0 overflow-hidden bg-[var(--khor-brand-navy)] text-white font-primary font-semibold select-none",
          shape === 'circle' ? "rounded-full" : "rounded-lg",
          !isCustomSize && sizeClasses[size as keyof typeof sizeClasses],
          className
        )}
        style={{
          width: isCustomSize ? size : undefined,
          height: isCustomSize ? size : undefined,
          ...style
        }}
      >
        <AvatarPrimitive.Image
          src={src}
          className="aspect-square h-full w-full object-cover animate-in fade-in duration-300"
        />
        <AvatarPrimitive.Fallback
          className="flex h-full w-full items-center justify-center bg-[var(--khor-brand-navy)]"
        >
          {children || icon || initials}
        </AvatarPrimitive.Fallback>
      </AvatarPrimitive.Root>

      {status && (
        <span 
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-[var(--khor-surface-page)]",
            statusColors[status],
            isCustomSize ? "h-[25%] w-[25%]" : size === 'sm' ? "h-2.5 w-2.5" : size === 'md' ? "h-3 w-3" : "h-4 w-4"
          )} 
        />
      )}
    </div>
  );
});

KAvatar.displayName = "KAvatar";

/**
 * KAvatarGroup — Contenedor para múltiples avatares solapados.
 */
export const KAvatarGroup = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("flex -space-x-2 overflow-hidden", className)}>
    {children}
  </div>
);

export default KAvatar;
