import React from 'react';
import { cn } from '@/utils/cn';

export interface KSkeletonProps {
  lines?: number;
  circle?: boolean;
  width?: number | string;
  height?: number | string;
  variant?: 'text' | 'circular' | 'rectangular';
  loading?: boolean;
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * KSkeleton — Marcador de posición animado (Total Headless)
 * Reemplaza AntD Skeleton por Tailwind animate-pulse.
 */
/**
 * @figma-mcp-migration
 * Component: KSkeleton
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
export function KSkeleton({ 
  lines = 1, 
  circle, 
  width, 
  height, 
  variant = 'text',
  loading = true,
  active = true,
  className,
  style,
  children
}: KSkeletonProps) {
  
  if (!loading) {
    return children ? <>{children}</> : null;
  }

  // Si se pasan múltiples líneas para texto
  if (lines > 1) {
    return (
      <div className={cn("flex flex-col gap-2 w-full", className)} style={style}>
        {Array.from({ length: lines }).map((_, i) => (
          <div 
            key={i}
            className={cn(
              "h-4 bg-khor-neutral-200 rounded-md",
              active && "animate-pulse",
              i === lines - 1 && lines > 2 ? "w-[60%]" : "w-full"
            )}
          />
        ))}
      </div>
    );
  }

  // Skeleton individual (circular o rectangular)
  return (
    <div
      className={cn(
        "bg-khor-neutral-200",
        active && "animate-pulse",
        circle || variant === 'circular' ? "rounded-full" : "rounded-md",
        className
      )}
      style={{
        width: circle ? (height ?? width ?? 40) : (width ?? '100%'),
        height: height ?? (circle ? (width ?? 40) : 16),
        ...style
      }}
    />
  );
}

// Subcomponentes para compatibilidad
KSkeleton.Button = ({ className, ...props }: any) => <KSkeleton variant="rectangular" height={40} width={120} className={className} {...props} />;
KSkeleton.Input = ({ className, ...props }: any) => <KSkeleton variant="rectangular" height={40} className={className} {...props} />;
KSkeleton.Avatar = ({ className, ...props }: any) => <KSkeleton circle height={40} width={40} className={className} {...props} />;
KSkeleton.Image = ({ className, ...props }: any) => <KSkeleton variant="rectangular" height={160} className={className} {...props} />;

export default KSkeleton;
