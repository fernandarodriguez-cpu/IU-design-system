import React from 'react';
import { cn } from '../../../../../imports/utils';

type FlexJustify = 'normal' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'left' | 'right' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch';
type FlexAlign = 'normal' | 'center' | 'start' | 'end' | 'flex-start' | 'flex-end' | 'self-start' | 'self-end' | 'baseline' | 'stretch';

export interface KFlexProps extends React.HTMLAttributes<HTMLDivElement> {
  vertical?: boolean;
  wrap?: React.CSSProperties['flexWrap'];
  justify?: FlexJustify;
  align?: FlexAlign;
  flex?: React.CSSProperties['flex'];
  gap?: React.CSSProperties['gap'] | 'small' | 'middle' | 'large';
  children?: React.ReactNode;
}

export const KFlex = React.forwardRef<HTMLDivElement, KFlexProps>(
  ({ className, vertical, wrap, justify, align, flex, gap, style, children, ...props }, ref) => {
    
    let gapValue: string | number | undefined = gap;
    if (gap === 'small') gapValue = 'var(--khor-density-spacing-sm)';
    else if (gap === 'middle') gapValue = 'var(--khor-density-spacing-md)';
    else if (gap === 'large') gapValue = 'var(--khor-density-spacing-lg)';

    const computedStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: vertical ? 'column' : 'row',
      flexWrap: wrap,
      justifyContent: justify,
      alignItems: align,
      flex,
      gap: gapValue,
      ...style,
    };

    return (
      <div 
        ref={ref}
        className={cn(className)}
        style={computedStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

KFlex.displayName = 'KFlex';

export default KFlex;
