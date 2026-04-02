import React from 'react';
import { cn } from '../../../../../imports/utils';

export interface KDescriptionItem {
  label: React.ReactNode;
  children: React.ReactNode;
  span?: number;
}

export interface KDescriptionsProps {
  title?: React.ReactNode;
  items: KDescriptionItem[];
  column?: number;
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KDescriptions — Visualizador de datos clave-valor (Headless v4)
 * Reemplaza AntD Descriptions con un grid nativo altamente personalizable.
 */
export function KDescriptions({
  title,
  items,
  column = 3,
  bordered = false,
  size = 'md',
  className,
  style,
}: KDescriptionsProps) {
  
  const paddingMap = {
    sm: "py-2 px-3",
    md: "py-3 px-4",
    lg: "py-4 px-6",
  };

  return (
    <div className={cn("w-full font-primary", className)} style={style}>
      {title && (
        <h4 className="text-lg font-extrabold text-khor-neutral-900 mb-4 tracking-tight border-l-4 border-khor-primary pl-3">
          {title}
        </h4>
      )}
      
      <div 
        className={cn(
          "grid gap-y-0 text-sm overflow-hidden",
          bordered ? "border border-khor-neutral-200 rounded-xl" : "bg-transparent"
        )}
        style={{
          gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))`,
        }}
      >
        {items.map((item, index) => {
          const span = item.span || 1;
          const isLastRaw = (index === items.length - 1);

          return (
            <div 
              key={index} 
              className={cn(
                "flex flex-col",
                bordered && "border-b border-r border-khor-neutral-200",
                bordered && index % column === column - 1 && "border-r-0"
              )}
              style={{ gridColumn: `span ${span}` }}
            >
              <div className={cn(
                "bg-khor-neutral-50 text-khor-neutral-400 font-bold text-[10px] uppercase tracking-widest border-b border-khor-neutral-100",
                paddingMap[size]
              )}>
                {item.label}
              </div>
              <div className={cn(
                "bg-white text-khor-neutral-800 font-medium min-h-[40px] break-words",
                paddingMap[size]
              )}>
                {item.children}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KDescriptions;
