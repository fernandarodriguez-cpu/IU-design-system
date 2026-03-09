import * as React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from './utils';

export interface StatisticProps {
  title?: React.ReactNode;
  value: number | string;
  precision?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  valueStyle?: React.CSSProperties;
  trend?: 'up' | 'down';
  trendValue?: number | string;
  loading?: boolean;
  formatter?: (value: number | string) => string;
  className?: string;
}

export const Statistic = React.forwardRef<HTMLDivElement, StatisticProps>(
  (
    {
      title,
      value,
      precision = 0,
      prefix,
      suffix,
      valueStyle,
      trend,
      trendValue,
      loading = false,
      formatter,
      className,
      ...props
    },
    ref
  ) => {
    const formatValue = (val: number | string): string => {
      if (formatter) {
        return formatter(val);
      }

      if (typeof val === 'number') {
        return val.toFixed(precision);
      }

      return val.toString();
    };

    const displayValue = formatValue(value);

    if (loading) {
      return (
        <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props}>
          {title && (
            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
          )}
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse" />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn('flex flex-col gap-1', className)}
        {...props}
      >
        {/* Title */}
        {title && (
          <div className="text-sm text-gray-600">
            {title}
          </div>
        )}

        {/* Value with prefix/suffix */}
        <div className="flex items-baseline gap-2">
          <div
            className="text-3xl font-semibold text-foreground flex items-baseline gap-1"
            style={valueStyle}
          >
            {prefix && <span className="text-xl">{prefix}</span>}
            <span>{displayValue}</span>
            {suffix && <span className="text-xl">{suffix}</span>}
          </div>

          {/* Trend indicator */}
          {trend && (
            <div
              className={cn(
                'flex items-center gap-1 text-sm font-medium',
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {trendValue !== undefined && <span>{trendValue}</span>}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Statistic.displayName = 'Statistic';

// Countdown variant
export interface CountdownProps extends Omit<StatisticProps, 'value'> {
  value: number; // timestamp in milliseconds
  format?: string;
  onFinish?: () => void;
}

export const Countdown = React.forwardRef<HTMLDivElement, CountdownProps>(
  (
    {
      value: targetTime,
      format = 'HH:mm:ss',
      onFinish,
      ...props
    },
    ref
  ) => {
    const [timeLeft, setTimeLeft] = React.useState<number>(0);

    React.useEffect(() => {
      const updateCountdown = () => {
        const now = Date.now();
        const diff = Math.max(0, targetTime - now);
        
        setTimeLeft(diff);

        if (diff === 0) {
          onFinish?.();
        }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
    }, [targetTime, onFinish]);

    const formatTime = (ms: number): string => {
      const seconds = Math.floor((ms / 1000) % 60);
      const minutes = Math.floor((ms / (1000 * 60)) % 60);
      const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));

      if (format === 'HH:mm:ss') {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }

      if (format === 'DD:HH:mm:ss') {
        return `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }

      // Default format
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
      <Statistic
        ref={ref}
        {...props}
        value={formatTime(timeLeft)}
      />
    );
  }
);

Countdown.displayName = 'Countdown';

// Card variant with better styling
export interface StatisticCardProps extends StatisticProps {
  bordered?: boolean;
}

export const StatisticCard = React.forwardRef<HTMLDivElement, StatisticCardProps>(
  (
    {
      bordered = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'p-6 rounded-lg',
          bordered && 'border border-border bg-card shadow-sm',
          className
        )}
      >
        <Statistic {...props} />
      </div>
    );
  }
);

StatisticCard.displayName = 'StatisticCard';