import React from 'react';
import { cn } from '../../../../../imports/utils';

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
export function KSkeleton({ 
  lines = 1, 
  circle, 
  width, 
  height, 
  variant = 'text',
  loading = true,
  active = false,
  className,
  style,
  children
}: KSkeletonProps) {
  
  if (!loading && children) {
    return <>{children}</>;
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
