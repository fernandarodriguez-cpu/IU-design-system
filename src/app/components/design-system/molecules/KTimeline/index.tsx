import React from 'react';
import { cn } from '../../../../../imports/utils';

export interface KTimelineItem {
  key?: string | number;
  label?: React.ReactNode;
  children: React.ReactNode;
  dot?: React.ReactNode;
  color?: 'primary' | 'navy' | 'success' | 'error' | 'warning' | 'info' | string;
}

export interface KTimelineProps {
  items: KTimelineItem[];
  reverse?: boolean;
  pending?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  mode?: 'left' | 'alternate' | 'right';
}

const colorMap = {
  primary: "bg-[var(--khor-primary)]",
  navy: "bg-[var(--khor-navy)]",
  success: "bg-emerald-500",
  error: "bg-red-500",
  warning: "bg-amber-500",
  info: "bg-sky-500",
};

const borderMap = {
  primary: "border-[var(--khor-primary)]",
  navy: "border-[var(--khor-navy)]",
  success: "border-emerald-500",
  error: "border-red-500",
  warning: "border-amber-500",
  info: "border-sky-500",
};

/**
 * KTimeline — Visualizador de eventos cronológicos (Headless v4)
 * Reemplaza AntD Timeline por una estructura pura de flexbox y Tailwind.
 */
export function KTimeline({ 
  items, 
  reverse = false, 
  pending, 
  className, 
  style,
  mode = 'left'
}: KTimelineProps) {
  
  const displayItems = reverse ? [...items].reverse() : items;

  return (
    <div 
      className={cn("flex flex-col font-primary w-full", className)} 
      style={style}
    >
      {displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1 && !pending;
        const color = item.color || 'primary';
        const isCustomColor = color && !colorMap[color as keyof typeof colorMap];

        return (
          <div key={item.key || index} className="relative flex gap-4 min-h-[48px] group">
            {/* Etiquetas laterales (opcional) */}
            {item.label && (
              <div className="w-24 shrink-0 text-right text-xs pt-1 text-[var(--khor-neutral-400)] font-medium">
                {item.label}
              </div>
            )}

            {/* Linea y Punto */}
            <div className="relative flex flex-col items-center">
              <div 
                className={cn(
                  "z-10 w-3 h-3 rounded-full border-2 border-white shadow-sm ring-1 ring-black/5 mt-1.5",
                  !isCustomColor ? colorMap[color as keyof typeof colorMap] : ""
                )}
                style={isCustomColor ? { backgroundColor: color } : {}}
              >
                {item.dot}
              </div>
              
              {!isLast && (
                <div 
                  className="absolute top-4 w-[2px] h-[calc(100%-8px)] bg-[var(--khor-neutral-200)] group-last:hidden" 
                />
              )}
            </div>

            {/* Contenido */}
            <div className="flex-1 pb-6 pt-0.5">
              <div className="text-sm text-[var(--khor-neutral-800)] leading-tight">
                {item.children}
              </div>
            </div>
          </div>
        );
      })}

      {pending && (
        <div className="relative flex gap-4 min-h-[48px]">
          <div className="w-24 shrink-0" />
          <div className="relative flex flex-col items-center">
            <div className="z-10 w-3 h-3 rounded-full border-2 border-dashed border-[var(--khor-neutral-300)] bg-transparent mt-1.5 animate-spin duration-1000" />
          </div>
          <div className="flex-1 pb-6 pt-0.5 italic text-xs text-[var(--khor-neutral-400)]">
            {pending}
          </div>
        </div>
      )}
    </div>
  );
}

export default KTimeline;
