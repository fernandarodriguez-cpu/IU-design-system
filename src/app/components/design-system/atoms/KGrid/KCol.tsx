import React from 'react';
import { cn } from '../../../../../imports/utils';

export type ColSpanType = number | string;

export interface KColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: ColSpanType;
  offset?: ColSpanType;
  order?: ColSpanType;
  flex?: string | number;
  _khorHorizontalGutter?: number; // Injected by KRow
}

export const KCol = React.forwardRef<HTMLDivElement, KColProps>(
  ({ className, span, offset, order, flex, style, children, _khorHorizontalGutter = 0, ...props }, ref) => {
    
    let columnStyle: React.CSSProperties = { ...style };
    
    if (span !== undefined) {
      const percentage = (Number(span) / 24) * 100;
      columnStyle.flex = `0 0 ${percentage}%`;
      columnStyle.maxWidth = `${percentage}%`;
    } else if (!flex) {
       columnStyle.flex = `1`;
    }

    if (offset !== undefined) {
      columnStyle.marginLeft = `${(Number(offset) / 24) * 100}%`;
    }

    if (order !== undefined) {
      columnStyle.order = Number(order);
    }

    if (flex) {
      columnStyle.flex = flex;
    }

    if (_khorHorizontalGutter > 0) {
      columnStyle.paddingLeft = _khorHorizontalGutter / 2;
      columnStyle.paddingRight = _khorHorizontalGutter / 2;
    }

    return (
      <div 
        ref={ref}
        className={cn(className)}
        style={columnStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);
KCol.displayName = 'KCol';

export default KCol;
