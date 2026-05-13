import React, { useState, useEffect, useRef } from 'react';
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
  // Props de paridad AntD v5
  decimalSeparator?: string;
  groupSeparator?: string;
  valueStyle?: React.CSSProperties;
  formatter?: (value: number | string) => React.ReactNode;
}

/**
 * Función auxiliar para formatear números con separadores personalizados
 */
const formatNumber = (
  num: number, 
  precision?: number, 
  groupSeparator: string = ',', 
  decimalSeparator: string = '.'
) => {
  const parts = num.toFixed(precision ?? 0).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
  return parts.join(decimalSeparator);
};

/**
 * KStatistic — Display estadístico con tendencias y conteo animado (Headless v4)
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
  style,
  decimalSeparator = '.',
  groupSeparator = ',',
  valueStyle,
  formatter
}: KStatisticProps) {
  const [displayValue, setDisplayValue] = useState<number | string>(0);
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const duration = 1000; // 1 segundo de animación

  const targetValue = typeof value === 'number' ? value : parseFloat(value.toString().replace(/[^0-9.-]+/g, ""));

  useEffect(() => {
    if (loading || typeof targetValue !== 'number' || isNaN(targetValue)) {
      setDisplayValue(value);
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeValue = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      const current = easeValue * targetValue;
      
      setDisplayValue(current);

      if (percentage < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue);
      }
    };

    startTimeRef.current = undefined;
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [targetValue, loading]);

  if (loading) {
    return (
      <div className={cn("space-y-2 p-1", className)} style={style}>
        <KSkeleton width="40%" height={14} />
        <KSkeleton width="80%" height={32} />
        <KSkeleton width="30%" height={12} />
      </div>
    );
  }

  const renderValue = () => {
    if (formatter) return formatter(value);
    
    if (typeof displayValue === 'number') {
      return formatNumber(displayValue, precision, groupSeparator, decimalSeparator);
    }
    return displayValue;
  };

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
      
      <div className="flex items-baseline gap-1" style={valueStyle}>
        {prefix && <span className="text-xl font-semibold text-khor-neutral-900 opacity-70">{prefix}</span>}
        <span className={cn(
          "text-3xl font-extrabold text-khor-neutral-900 tracking-tight tabular-nums",
          // Micro-animación sutil al aparecer
          "animate-in fade-in slide-in-from-bottom-2 duration-500"
        )}>
          {renderValue()}
        </span>
        {suffix && <span className="text-sm font-semibold text-khor-neutral-500 ms-1">{suffix}</span>}
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
