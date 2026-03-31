import React from 'react';
import { cn } from '../../../../../imports/utils';

export interface KRowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number | [number, number];
  align?: 'top' | 'middle' | 'bottom' | 'stretch';
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  wrap?: boolean;
}

export const KRow = React.forwardRef<HTMLDivElement, KRowProps>(
  ({ className, gutter = 0, align, justify, wrap = true, style, children, ...props }, ref) => {
    const horizontalGutter = Array.isArray(gutter) ? gutter[0] : gutter;
    const verticalGutter = Array.isArray(gutter) ? gutter[1] : 0;

    let alignItems = align as any;
    if (align === 'top') alignItems = 'flex-start';
    if (align === 'middle') alignItems = 'center';
    if (align === 'bottom') alignItems = 'flex-end';

    const computedStyle: React.CSSProperties = {
      display: 'flex',
      flexWrap: wrap ? 'wrap' : 'nowrap',
      alignItems,
      justifyContent: justify,
      marginLeft: horizontalGutter > 0 ? -(horizontalGutter / 2) : undefined,
      marginRight: horizontalGutter > 0 ? -(horizontalGutter / 2) : undefined,
      rowGap: verticalGutter,
      ...style,
    };

    return (
      <div 
        ref={ref}
        className={cn(className)}
        style={computedStyle}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              // @ts-ignore
              _khorHorizontalGutter: horizontalGutter
            });
          }
          return child;
        })}
      </div>
    );
  }
);
KRow.displayName = 'KRow';

export default KRow;
