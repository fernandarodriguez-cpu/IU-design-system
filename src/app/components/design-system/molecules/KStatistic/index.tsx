import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../../../../imports/utils';
import { KSkeleton } from '../../atoms/KSkeleton';

export interface KStatisticProps {
  title?: React.ReactNode;
  value: number | string;
  precision?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  trend?: 'up' | 'down';
  trendValue?: number | string;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KStatistic — Display estadístico con tendencias (Headless v4)
 * Reemplaza AntD Statistic con una estructura de alta fidelidad basada en Tailwind.
 */
export function KStatistic({ 
  title, 
  value, 
  precision, 
  prefix, 
  suffix, 
  trend, 
  trendValue, 
  loading, 
  className, 
  style 
}: KStatisticProps) {
  
  if (loading) {
    return (
      <div className={cn("space-y-2 p-1", className)} style={style}>
        <KSkeleton width="40%" height={14} />
        <KSkeleton width="80%" height={32} />
        <KSkeleton width="30%" height={12} />
      </div>
    );
  }

  const formattedValue = typeof value === 'number' && precision !== undefined 
    ? value.toFixed(precision) 
    : value;

  return (
    <div 
      className={cn("flex flex-col font-primary transition-all", className)} 
      style={style}
    >
      {title && (
        <div className="text-sm font-medium text-khor-neutral-500 mb-1">
          {title}
        </div>
      )}
      
      <div className="flex items-baseline gap-1">
        {prefix && <span className="text-xl font-semibold text-khor-neutral-900 opacity-70">{prefix}</span>}
        <span className="text-3xl font-extrabold text-khor-neutral-900 tracking-tight">
          {formattedValue}
        </span>
        {suffix && <span className="text-sm font-semibold text-khor-neutral-500 ml-1">{suffix}</span>}
      </div>

      {trend && trendValue && (
        <div className={cn(
          "flex items-center gap-1.5 mt-2 text-xs font-bold",
          trend === 'up' ? "text-emerald-600" : "text-red-600"
        )}>
          {trend === 'up' ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
}

export default KStatistic;
