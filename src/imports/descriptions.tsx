import * as React from 'react';
import { cn } from './utils';

export interface DescriptionItem {
  label: React.ReactNode;
  children: React.ReactNode;
  span?: number;
  className?: string;
}

export interface DescriptionsProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  column?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  size?: 'small' | 'middle' | 'large';
  layout?: 'horizontal' | 'vertical';
  items: DescriptionItem[];
  className?: string;
}

export const Descriptions = React.forwardRef<HTMLDivElement, DescriptionsProps>(
  (
    {
      title,
      extra,
      bordered = false,
      column = 3,
      size = 'middle',
      layout = 'horizontal',
      items,
      className,
      ...props
    },
    ref
  ) => {
    const getColumnCount = (): number => {
      if (typeof column === 'number') return column;
      
      // Simple responsive logic (could be enhanced with useMediaQuery)
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width < 640) return column.xs || 1;
        if (width < 768) return column.sm || 2;
        if (width < 1024) return column.md || 3;
        if (width < 1280) return column.lg || 3;
        return column.xl || 3;
      }
      
      return 3;
    };

    const columnCount = getColumnCount();

    const paddingClasses = {
      small: 'p-2',
      middle: 'p-3',
      large: 'p-4',
    };

    const textSizeClasses = {
      small: 'text-xs',
      middle: 'text-sm',
      large: 'text-base',
    };

    const padding = paddingClasses[size];
    const textSize = textSizeClasses[size];

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {/* Header */}
        {(title || extra) && (
          <div className="flex items-center justify-between mb-4">
            {title && <h3 className="text-lg font-semibold text-foreground">{title}</h3>}
            {extra && <div>{extra}</div>}
          </div>
        )}

        {/* Content */}
        {bordered ? (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {items.map((item, index) => {
                const span = item.span || 1;
                const colSpan = Math.min(span, columnCount);

                return (
                  <div
                    key={index}
                    className={cn(
                      'grid',
                      layout === 'horizontal' ? 'grid-cols-[auto_1fr]' : 'grid-cols-1',
                      item.className
                    )}
                    style={{
                      gridColumn: `span ${colSpan}`,
                    }}
                  >
                    {/* Label */}
                    <div
                      className={cn(
                        'bg-gray-50 font-medium text-gray-700',
                        padding,
                        textSize,
                        layout === 'horizontal' && 'border-r border-gray-200'
                      )}
                    >
                      {item.label}
                    </div>

                    {/* Content */}
                    <div className={cn('bg-card text-foreground', padding, textSize)}>
                      {item.children}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
            }}
          >
            {items.map((item, index) => {
              const span = item.span || 1;
              const colSpan = Math.min(span, columnCount);

              return (
                <div
                  key={index}
                  className={cn(
                    'flex',
                    layout === 'horizontal' ? 'flex-row gap-2' : 'flex-col gap-1',
                    item.className
                  )}
                  style={{
                    gridColumn: `span ${colSpan}`,
                  }}
                >
                  {/* Label */}
                  <div
                    className={cn(
                      'font-medium text-gray-700',
                      textSize,
                      layout === 'horizontal' ? 'whitespace-nowrap' : ''
                    )}
                  >
                    {item.label}:
                  </div>

                  {/* Content */}
                  <div className={cn('text-foreground', textSize)}>
                    {item.children}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Descriptions.displayName = 'Descriptions';

// Helper component for creating items
export const DescriptionItem: React.FC<{
  label: React.ReactNode;
  children: React.ReactNode;
  span?: number;
}> = () => null; // This is just for better DX, actual rendering happens in Descriptions