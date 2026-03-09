import * as React from 'react';
import { cn } from './utils';

export interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  size?: 'small' | 'middle' | 'large' | number;
  align?: 'start' | 'center' | 'end' | 'baseline';
  wrap?: boolean;
  split?: React.ReactNode;
  className?: string;
}

export function Space({
  children,
  direction = 'horizontal',
  size = 'middle',
  align,
  wrap = false,
  split,
  className,
  ...props
}: SpaceProps) {
  const sizeMap = {
    small: 8,
    middle: 16,
    large: 24
  };

  const gap = typeof size === 'number' ? size : sizeMap[size];

  const alignMap = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    baseline: 'items-baseline'
  };

  const childrenArray = React.Children.toArray(children);

  return (
    <div
      className={cn(
        'inline-flex',
        direction === 'horizontal' ? 'flex-row' : 'flex-col',
        align && alignMap[align],
        wrap && 'flex-wrap',
        className
      )}
      style={{ gap: `${gap}px` }}
      {...props}
    >
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {split && index < childrenArray.length - 1 && (
            <span className="flex-shrink-0">{split}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

// Compact Space
export interface SpaceCompactProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  block?: boolean;
  className?: string;
}

export function SpaceCompact({
  children,
  direction = 'horizontal',
  block = false,
  className,
  ...props
}: SpaceCompactProps) {
  return (
    <div
      className={cn(
        'flex',
        direction === 'horizontal' ? 'flex-row' : 'flex-col',
        block && 'w-full',
        '[&>*:not(:first-child):not(:last-child)]:rounded-none',
        direction === 'horizontal' && [
          '[&>*:first-child]:rounded-r-none',
          '[&>*:last-child]:rounded-l-none',
          '[&>*:not(:first-child)]:-ml-px'
        ],
        direction === 'vertical' && [
          '[&>*:first-child]:rounded-b-none',
          '[&>*:last-child]:rounded-t-none',
          '[&>*:not(:first-child)]:-mt-px'
        ],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
