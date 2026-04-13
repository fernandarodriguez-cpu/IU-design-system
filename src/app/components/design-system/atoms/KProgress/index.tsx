import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '../../../../../imports/utils';

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
}

const sizeVariants = {
  sm: "h-1",
  md: "h-2",
  lg: "h-4"
};

/**
 * KProgress — Barra de progreso (Headless v4)
 * Basado en Radix UI Progress y Tailwind.
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
  style 
}, ref) => {
  const percent = Math.min(Math.max(value, 0), max);
  const isComplete = percent === max;
  const hasError = status === 'exception';

  if (type === 'circle') {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / max) * circumference;

    return (
      <div className={cn("inline-flex items-center gap-3 font-primary", className)} style={style}>
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
                hasError ? "text-red-500" : isComplete ? "text-emerald-500" : "text-khor-primary"
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
                    ? (hasError ? "bg-red-500" : isComplete ? "bg-emerald-500" : "bg-khor-primary")
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
            hasError ? "bg-red-500" : isComplete ? "bg-emerald-500" : "bg-khor-primary"
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
