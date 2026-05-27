import React from 'react';
import { cn } from '@/utils/cn';

export interface KTimelineItem {
  key?: string | number;
  label?: React.ReactNode;
  children: React.ReactNode;
  dot?: React.ReactNode;
  color?: 'primary' | 'navy' | 'success' | 'error' | 'warning' | 'info' | string;
  position?: 'left' | 'right';
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
  primary: "bg-khor-primary",
  navy: "bg-khor-navy",
  success: "bg-emerald-500",
  error: "bg-red-500",
  warning: "bg-amber-500",
  info: "bg-sky-500",
};

/**
 * KTimeline — Visualizador de eventos cronológicos (Headless v4)
 */
/**
 * @figma-mcp-migration
 * Component: KTimeline
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

        // Determinar posición según el modo
        let itemPosition = 'right';
        if (mode === 'right') itemPosition = 'left';
        if (mode === 'alternate') {
          itemPosition = index % 2 === 0 ? 'right' : 'left';
        }

        return (
          <div key={item.key || index} className="relative flex min-h-[48px] group">
            {/* Contenedor Izquierdo */}
            <div className={cn(
               "flex-1 pb-8 px-4",
               itemPosition === 'right' ? "text-right" : "order-last text-left"
            )}>
              {itemPosition === 'right' ? (
                item.label && <div className="text-xs text-khor-neutral-400 font-bold uppercase tracking-wider mb-1">{item.label}</div>
              ) : (
                <div className="text-sm text-khor-neutral-800 leading-relaxed">{item.children}</div>
              )}
            </div>

            {/* Línea Central y Punto */}
            <div className="relative flex flex-col items-center w-8 shrink-0">
              <div 
                className={cn(
                  "z-10 mt-1.5 transition-all duration-300",
                  !item.dot && "w-3 h-3 rounded-full border-2 border-white shadow-sm ring-1 ring-black/5",
                  !item.dot && !isCustomColor && colorMap[color as keyof typeof colorMap]
                )}
                style={!item.dot && isCustomColor ? { backgroundColor: color } : {}}
              >
                {item.dot}
              </div>
              
              {!isLast && (
                <div 
                  className="absolute top-4 w-[2px] h-[calc(100%-8px)] bg-khor-neutral-100" 
                />
              )}
            </div>

            {/* Contenedor Derecho */}
            <div className={cn(
              "flex-1 pb-8 px-4",
              itemPosition === 'right' ? "text-left" : "order-first text-right"
            )}>
               {itemPosition === 'right' ? (
                <div className="text-sm text-khor-neutral-800 leading-relaxed">{item.children}</div>
              ) : (
                item.label && <div className="text-xs text-khor-neutral-400 font-bold uppercase tracking-wider mb-1">{item.label}</div>
              )}
            </div>
          </div>
        );
      })}

      {pending && (
        <div className="relative flex min-h-[48px]">
           <div className="flex-1" />
           <div className="relative flex flex-col items-center w-8 shrink-0">
             <div className="z-10 w-3 h-3 rounded-full border-2 border-dashed border-khor-neutral-300 bg-transparent mt-1.5 animate-spin" style={{ animationDuration: '3s' }} />
           </div>
           <div className="flex-1 pb-6 px-4 italic text-xs text-khor-neutral-400 pt-1">
             {pending}
           </div>
        </div>
      )}
    </div>
  );
}

export default KTimeline;
