import * as React from 'react';
import { cn } from './utils';
import { Loader2 } from 'lucide-react';

export interface SpinProps extends React.HTMLAttributes<HTMLDivElement> {
  spinning?: boolean;
  size?: 'small' | 'middle' | 'large';
  tip?: string;
  delay?: number;
  indicator?: React.ReactNode;
  fullscreen?: boolean;
}

export function Spin({
  spinning = true,
  size = 'middle',
  tip,
  delay = 0,
  indicator,
  children,
  fullscreen = false,
  className,
  ...props
}: SpinProps) {
  const [shouldShow, setShouldShow] = React.useState(delay === 0);

  React.useEffect(() => {
    if (delay > 0) {
      const timer = setTimeout(() => setShouldShow(true), delay);
      return () => clearTimeout(timer);
    }
  }, [delay]);

  const sizeClasses = {
    small: 'h-4 w-4',
    middle: 'h-8 w-8',
    large: 'h-12 w-12'
  };

  const spinnerElement = (
    <div className="flex flex-col items-center justify-center gap-2">
      {indicator || <Loader2 className={cn('animate-spin', sizeClasses[size])} />}
      {tip && <p className="text-sm text-muted-foreground">{tip}</p>}
    </div>
  );

  if (!spinning || !shouldShow) {
    return children ? <>{children}</> : null;
  }

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
        {spinnerElement}
      </div>
    );
  }

  if (children) {
    return (
      <div className={cn('relative', className)} {...props}>
        <div className={cn('transition-opacity', spinning && 'opacity-50 pointer-events-none')}>
          {children}
        </div>
        {spinning && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/50">
            {spinnerElement}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn('flex items-center justify-center p-4', className)} {...props}>
      {spinnerElement}
    </div>
  );
}