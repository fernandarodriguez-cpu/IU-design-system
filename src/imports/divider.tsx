import * as React from 'react';
import { cn } from './utils';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  dashed?: boolean;
  plain?: boolean;
  children?: React.ReactNode;
  orientationMargin?: string | number;
  type?: 'horizontal' | 'vertical';
  className?: string;
}

export function Divider({
  orientation = 'horizontal',
  dashed = false,
  plain = false,
  children,
  orientationMargin,
  type,
  className,
  ...props
}: DividerProps) {
  const actualOrientation = type || orientation;
  const hasChildren = Boolean(children);

  if (actualOrientation === 'vertical') {
    return (
      <div
        className={cn(
          'inline-block h-full w-px bg-gray-200 dark:bg-gray-700 mx-2',
          dashed && 'border-l border-dashed border-gray-300 dark:border-gray-600 bg-transparent',
          className
        )}
        {...props}
      />
    );
  }

  if (!hasChildren) {
    return (
      <div
        className={cn(
          'w-full h-px bg-gray-200 dark:bg-gray-700 my-4',
          dashed && 'border-t border-dashed border-gray-300 dark:border-gray-600 bg-transparent',
          className
        )}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex items-center w-full my-4',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'flex-1 h-px bg-gray-200 dark:bg-gray-700',
          dashed && 'border-t border-dashed border-gray-300 dark:border-gray-600 bg-transparent'
        )}
      />
      <span
        className={cn(
          'px-4 text-sm',
          plain ? 'text-muted-foreground' : 'font-medium text-foreground'
        )}
        style={orientationMargin ? { margin: `0 ${orientationMargin}` } : undefined}
      >
        {children}
      </span>
      <div
        className={cn(
          'flex-1 h-px bg-gray-200 dark:bg-gray-700',
          dashed && 'border-t border-dashed border-gray-300 dark:border-gray-600 bg-transparent'
        )}
      />
    </div>
  );
}