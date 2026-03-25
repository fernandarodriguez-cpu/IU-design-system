import React from 'react';
import { Statistic } from 'antd';
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
  style?: React.CSSProperties;
}

export function KStatistic({ title, value, precision, prefix, suffix, trend, trendValue, loading, className, style }: KStatisticProps) {
  const trendEl = trend && trendValue && (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 13 }}>
      {trend === 'up' ? <TrendingUp size={14} color={t.colors.feedback.success} /> : <TrendingDown size={14} color={t.colors.feedback.error} />}
      <span style={{ color: trend === 'up' ? t.colors.feedback.success : t.colors.feedback.error, fontWeight: 500 }}>{trendValue}</span>
    </div>
  );

  return (
    <div className={className} style={{ fontFamily: font, ...style }}>
      <Statistic
        title={title}
        value={value}
        precision={precision}
        prefix={prefix}
        suffix={suffix}
        loading={loading}
        valueStyle={{ fontSize: 30, fontWeight: 700, color: t.colors.neutral[900], fontFamily: font }}
      />
      {trendEl}
    </div>
  );
}

export default KStatistic;
