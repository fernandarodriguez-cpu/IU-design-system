import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/utils/cn';

export interface KProgressProps {
  value?: number;
  max?: number;
  showInfo?: boolean;
  type?: 'line' | 'circle';
  size?: 'sm' | 'md' | 'lg';
  status?: 'active' | 'success' | 'exception';
  strokeColor?: string;
  steps?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Fuerza el estado hover (útil para previews/playgrounds) */
  isHovered?: boolean;
}

const sizeVariants = {
  sm: "h-[var(--khor-density-spacing-xs)]",
  md: "h-[var(--khor-density-spacing-sm)]",
  lg: "h-[var(--khor-density-spacing-md)]"
};

/**
 * KProgress — Barra de progreso (Headless v4)
 * Basado en Radix UI Progress y Tailwind.
 */
/**
 * @figma-mcp-migration
 * Component: KProgress
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
export const KProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  KProgressProps
>(({ 
  value = 0, 
  max = 100, 
  showInfo = true, 
  type = 'line',
  size = 'md',
  status,
  strokeColor,
  steps,
  className,
  style,
  isHovered
}, ref) => {
  const percent = Math.min(Math.max(value, 0), max);
  const isComplete = percent === max;
  const hasError = status === 'exception';

  const statusColors = {
    error: "text-khor-error",
    success: "text-khor-success",
    primary: "text-khor-primary"
  };

  if (type === 'circle') {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / max) * circumference;

    return (
      <div className={cn("inline-flex items-center gap-3 font-primary transition-transform", isHovered && "scale-105", className)} style={style}>
        <div className={cn("relative", size === 'sm' ? "h-6 w-6" : size === 'lg' ? "h-16 w-16" : "h-10 w-10")}>
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-khor-neutral-200"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            <circle
              className={cn(
                "transition-all duration-500 ease-in-out",
                hasError ? "text-khor-error" : isComplete ? "text-khor-success" : "text-khor-primary"
              )}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
          </svg>
        </div>
        {showInfo && <span className={cn("font-bold text-khor-neutral-900", size === 'sm' ? "text-[10px]" : "text-sm")}>{percent}%</span>}
      </div>
    );
  }

  if (steps && steps > 0 && type === 'line') {
    const activeSteps = Math.floor((percent / max) * steps);
    return (
      <div className={cn("flex items-center gap-3 w-full font-primary", className)} style={style} ref={ref}>
        <div className="flex w-full gap-1">
          {Array.from({ length: steps }).map((_, i) => {
            const isActive = i < activeSteps;
            return (
              <div
                key={i}
                className={cn(
                  sizeVariants[size],
                  "w-full flex-1 rounded-full transition-all duration-300",
                  isActive 
                    ? (hasError ? "bg-khor-error" : isComplete ? "bg-khor-success" : "bg-khor-primary")
                    : "bg-khor-neutral-200"
                )}
                style={isActive && strokeColor ? { backgroundColor: strokeColor } : {}}
              />
            );
          })}
        </div>
        {showInfo && (
          <span className={cn("font-bold text-khor-neutral-700 min-w-[40px] text-right", size === 'sm' ? "text-[10px]" : "text-xs")}>
            {percent}%
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3 w-full font-primary", className)} style={style}>
      <ProgressPrimitive.Root
        ref={ref}
        className={cn("relative w-full overflow-hidden rounded-full bg-khor-neutral-200", sizeVariants[size])}
        value={percent}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "h-full w-full flex-1 transition-all duration-500 ease-in-out",
            hasError ? "bg-khor-error" : isComplete ? "bg-khor-success" : "bg-khor-primary"
          )}
          style={{ 
            transform: `translateX(-${100 - (percent / max) * 100}%)`,
            backgroundColor: strokeColor 
          }}
        />
      </ProgressPrimitive.Root>
      {showInfo && (
        <span className={cn("font-bold text-khor-neutral-400 min-w-[40px] text-right", size === 'sm' ? "text-[10px]" : "text-xs")}>
          {percent}%
        </span>
      )}
    </div>
  );
});

KProgress.displayName = ProgressPrimitive.Root.displayName;

export default KProgress;
