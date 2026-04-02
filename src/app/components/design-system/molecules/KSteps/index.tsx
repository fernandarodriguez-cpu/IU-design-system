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
}: KStepsProps) {
  const isSmall = size === 'small';
  return (
    <div 
      className={cn(
        "flex font-primary w-full",
        direction === 'vertical' ? "flex-col gap-0" : "flex-row items-start gap-4",
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
              "flex group",
              direction === 'vertical' ? "flex-col" : "flex-1 last:flex-none"
            )}
          >
            <div className={cn(
              "flex items-center",
              direction === 'vertical' ? "flex-row gap-4" : "flex-col md:flex-row gap-3"
            )}>
              {/* Círculo de paso */}
              <div className="relative shrink-0">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                  stepStatus === 'finish' ? "bg-khor-primary border-khor-primary text-white" :
                  stepStatus === 'process' ? "bg-white border-khor-primary text-khor-primary shadow-[0_0_12px_rgba(var(--khor-primary-rgb),0.3)] scale-110" :
                  stepStatus === 'error' ? "bg-red-50 border-red-500 text-red-500" :
                  "bg-white border-khor-neutral-200 text-khor-neutral-400"
                )}>
                  {stepStatus === 'finish' ? <Check className="w-4 h-4 stroke-[3]" /> :
                   stepStatus === 'error' ? <AlertCircle className="w-5 h-5" /> :
                   item.icon ? item.icon : <span className="text-xs font-black">{index + 1}</span>}
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
                "flex flex-col min-w-0 pr-4",
                direction === 'vertical' ? "pb-8" : "pt-1"
              )}>
                <h4 className={cn(
                  "text-sm font-extrabold tracking-tight transition-colors truncate",
                  isCurrent ? "text-khor-neutral-900" : "text-khor-neutral-500"
                )}>
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-[11px] font-medium text-khor-neutral-400 leading-tight mt-0.5 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Línea conectora Horizontal */}
              {direction === 'horizontal' && !isLast && (
                <div className="hidden md:block flex-1 h-[2px] bg-khor-neutral-100 mt-5 mx-4 overflow-hidden rounded-full">
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
