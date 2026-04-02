import React from 'react';
import { cn } from '../../../../../imports/utils';
import { KSkeleton } from '../../atoms/KSkeleton';

export interface KListItem { 
  key: string | number; 
  title: React.ReactNode; 
  description?: React.ReactNode; 
  avatar?: React.ReactNode; 
  extra?: React.ReactNode; 
  onClick?: () => void;
}

export interface KListProps {
  items: KListItem[];
  size?: 'sm' | 'md' | 'lg';
  bordered?: boolean;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  emptyText?: string;
}

const sizeClasses = {
  sm: "py-2 px-3",
  md: "py-3 px-4",
  lg: "py-4 px-6",
};

/**
 * KList — Componente para mostrar colecciones de datos (Headless v4)
 * Reemplaza AntD List por una estructura pura de flexbox y Tailwind.
 */
export function KList({ 
  items, 
  size = 'md', 
  bordered = false, 
  header, 
  footer, 
  loading = false, 
  className, 
  style,
  emptyText = 'No hay datos'
}: KListProps) {
  
  const content = loading ? (
    <div className="space-y-4 p-4">
      <KSkeleton lines={3} />
      <KSkeleton lines={3} />
    </div>
  ) : items.length === 0 ? (
    <div className="py-8 p-4 text-center text-khor-neutral-400 text-sm italic">
      {emptyText}
    </div>
  ) : (
    <ul className="divide-y divide-khor-neutral-100">
      {items.map((item) => (
        <li 
          key={item.key} 
          onClick={item.onClick}
          className={cn(
            "flex items-start gap-4 transition-colors group",
            item.onClick && "cursor-pointer hover:bg-khor-neutral-50",
            sizeClasses[size]
          )}
        >
          {item.avatar && (
            <div className="shrink-0 mt-0.5">
              {item.avatar}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-2">
              <div className="font-semibold text-sm text-khor-neutral-900 truncate">
                {item.title}
              </div>
              {item.extra && (
                <div className="shrink-0 text-xs">
                  {item.extra}
                </div>
              )}
            </div>
            {item.description && (
              <div className="mt-1 text-xs text-khor-neutral-500 leading-relaxed">
                {item.description}
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <div 
      className={cn(
        "bg-khor-surface-page overflow-hidden font-primary",
        bordered && "border border-khor-neutral-200 rounded-lg shadow-sm",
        className
      )}
      style={style}
    >
      {header && (
        <div className={cn("border-b border-khor-neutral-100 font-semibold text-khor-neutral-800", sizeClasses[size])}>
          {header}
        </div>
      )}
      
      {content}

      {footer && (
        <div className={cn("border-t border-khor-neutral-100 bg-khor-neutral-50 text-khor-neutral-600 text-sm", sizeClasses[size])}>
          {footer}
        </div>
      )}
    </div>
  );
}

export default KList;
