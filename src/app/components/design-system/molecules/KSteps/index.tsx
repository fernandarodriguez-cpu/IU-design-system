import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export interface KStepItem {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  status?: 'wait' | 'process' | 'finish' | 'error';
}

export interface KStepsProps {
  current?: number;
  direction?: 'horizontal' | 'vertical';
  items: KStepItem[];
  className?: string;
  style?: React.CSSProperties;
  onChange?: (current: number) => void;
  size?: 'default' | 'small';
  progressDot?: boolean;
  labelPlacement?: 'horizontal' | 'vertical';
  percent?: number;
}

/**
 * KSteps — Indicador de progreso multi-paso (Total Headless)
 */
export function KSteps({
  current = 0,
  direction = 'horizontal',
  items,
  className,
  style,
  onChange,
  size = 'default',
  progressDot = false,
  labelPlacement,
  percent,
}: KStepsProps) {
  const isSmall = size === 'small';
  const resolvedLabelPlacement = labelPlacement || (direction === 'vertical' ? 'horizontal' : 'horizontal');
  const isVerticalLabel = resolvedLabelPlacement === 'vertical' && direction === 'horizontal';

  return (
    <div 
      className={cn(
        "flex font-primary w-full",
        direction === 'vertical' ? "flex-col gap-0" : "flex-row items-start",
        isVerticalLabel && "gap-0",
        !isVerticalLabel && direction === 'horizontal' && "gap-4",
        className
      )}
      style={style}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const isFinished = index < current || item.status === 'finish';
        const isCurrent = index === current || item.status === 'process';
        const isError = item.status === 'error';
        
        const stepStatus = isError ? 'error' : isFinished ? 'finish' : isCurrent ? 'process' : 'wait';

        return (
          <div 
            key={index} 
            className={cn(
              "flex group relative",
              direction === 'vertical' ? "flex-col" : "flex-1 last:flex-none",
              isVerticalLabel && "flex-col items-center text-center"
            )}
          >
            <div className={cn(
              "flex items-center w-full",
              direction === 'vertical' ? "flex-row gap-4" : 
              (isVerticalLabel ? "flex-col" : "flex-row gap-3")
            )}>
              {/* Círculo de paso / Dot */}
              <div className="relative shrink-0 flex items-center">
                {/* Línea conectora Previa (para labels verticales) */}
                {isVerticalLabel && index !== 0 && (
                   <div className="absolute right-1/2 left-[-50%] top-4 h-[2px] bg-khor-neutral-100 overflow-hidden -translate-y-1/2">
                      <div className={cn("w-full h-full bg-khor-primary origin-right transition-transform duration-700", index <= current ? "scale-x-100" : "scale-x-0")} />
                   </div>
                )}

                <div className={cn(
                  "relative z-10 transition-all duration-500 flex items-center justify-center",
                  progressDot ? "w-2 h-2 rounded-full" : (isSmall ? "w-6 h-6" : "w-8 h-8 rounded-full border-2"),
                  stepStatus === 'finish' ? (!progressDot ? "bg-khor-primary border-khor-primary text-white" : "bg-khor-primary") :
                  stepStatus === 'process' ? (!progressDot ? "bg-white border-khor-primary text-khor-primary shadow-[0_0_12px_rgba(var(--khor-primary-rgb),0.3)] scale-110" : "bg-khor-primary animate-pulse") :
                  stepStatus === 'error' ? (!progressDot ? "bg-red-50 border-red-500 text-red-500" : "bg-red-500") :
                  (!progressDot ? "bg-white border-khor-neutral-200 text-khor-neutral-400" : "bg-khor-neutral-200")
                )}>
                  {!progressDot && (
                    <>
                      {stepStatus === 'process' && percent !== undefined && (
                        <svg className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90">
                          <circle
                            cx="50%"
                            cy="50%"
                            r="45%"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray={`${percent}, 100`}
                            className="text-khor-primary opacity-40"
                          />
                        </svg>
                      )}
                      {stepStatus === 'finish' ? <Check className={cn(isSmall ? "w-3 h-3" : "w-4 h-4", "stroke-[3]")} /> :
                       stepStatus === 'error' ? <AlertCircle className={cn(isSmall ? "w-4 h-4" : "w-5 h-5")} /> :
                       item.icon ? item.icon : <span className={cn(isSmall ? "text-[10px]" : "text-xs", "font-black")}>{index + 1}</span>}
                    </>
                  )}
                </div>
                
                {/* Línea conectora Vertical */}
                {direction === 'vertical' && !isLast && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-[-10px] w-[2px] bg-khor-neutral-100 overflow-hidden">
                    <div className={cn("w-full h-full bg-khor-primary origin-top transition-transform duration-700", isFinished ? "scale-y-100" : "scale-y-0")} />
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className={cn(
                "flex flex-col min-w-0 pe-4",
                direction === 'vertical' ? "pb-8" : (isVerticalLabel ? "pt-4 px-2 items-center" : "pt-1")
              )}>
                <h4 className={cn(
                  "text-sm font-extrabold tracking-tight transition-colors truncate w-full",
                  isCurrent ? "text-khor-neutral-900" : "text-khor-neutral-500",
                  isVerticalLabel && "text-center"
                )}>
                  {item.title}
                </h4>
                {item.description && (
                  <p className={cn(
                    "text-[11px] font-medium text-khor-neutral-400 leading-tight mt-0.5 line-clamp-2",
                    isVerticalLabel && "text-center"
                  )}>
                    {item.description}
                  </p>
                )}
              </div>

              {/* Línea conectora Horizontal (Standard) */}
              {direction === 'horizontal' && !isLast && !isVerticalLabel && (
                <div className="hidden md:block flex-1 h-[2px] bg-khor-neutral-100 mt-5 mx-4 overflow-hidden rounded-full">
                   <div className={cn("w-full h-full bg-khor-primary origin-left transition-transform duration-700", isFinished ? "scale-x-100" : "scale-x-0")} />
                </div>
              )}

              {/* Línea conectora Siguiente (para labels verticales) */}
              {isVerticalLabel && !isLast && (
                 <div className="absolute left-[calc(50%+16px)] right-[-50%] top-4 h-[2px] bg-khor-neutral-100 overflow-hidden -translate-y-1/2 hidden md:block">
                    <div className={cn("w-full h-full bg-khor-primary origin-left transition-transform duration-700", isFinished ? "scale-x-100" : "scale-x-0")} />
                 </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default KSteps;
