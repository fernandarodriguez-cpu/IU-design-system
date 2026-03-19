import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KStatistic — Estadísticas con tendencia (Wave 3)
   ═══════════════════════════════════════════════ */
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
}

export function KStatistic({ title, value, precision = 0, prefix, suffix, trend, trendValue, loading, className }: KStatisticProps) {
  const formattedValue = typeof value === 'number' ? value.toLocaleString('es-MX', { minimumFractionDigits: precision, maximumFractionDigits: precision }) : value;

  return (
    <div className={className} style={{ fontFamily: font }}>
      {title && <div style={{ fontSize: 13, color: t.colors.neutral[400], marginBottom: 4 }}>{title}</div>}
      {loading ? (
        <div className="animate-pulse" style={{ height: 32, width: 100, borderRadius: 4, backgroundColor: t.colors.neutral[200] }} />
      ) : (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          {prefix && <span style={{ fontSize: 24, color: t.colors.neutral[400] }}>{prefix}</span>}
          <span style={{ fontSize: 30, fontWeight: 700, color: t.colors.neutral[900], lineHeight: 1 }}>{formattedValue}</span>
          {suffix && <span style={{ fontSize: 14, color: t.colors.neutral[400] }}>{suffix}</span>}
        </div>
      )}
      {trend && trendValue && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 13 }}>
          {trend === 'up' ? <TrendingUp size={14} color={t.colors.feedback.success} /> : <TrendingDown size={14} color={t.colors.feedback.error} />}
          <span style={{ color: trend === 'up' ? t.colors.feedback.success : t.colors.feedback.error, fontWeight: 500 }}>{trendValue}</span>
        </div>
      )}
    </div>
  );
}

export default KStatistic;
