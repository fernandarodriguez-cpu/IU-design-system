import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { KText } from '../../atoms/KText/index';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KStatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  sparkData?: number[];
  icon?: React.ReactNode;
  className?: string;
}

export function KStatCard({ title, value, change, changeLabel, sparkData, icon, className }: KStatCardProps) {
  const isPositive = change !== undefined && change >= 0;
  const TrendIcon = change === undefined ? Minus : isPositive ? TrendingUp : TrendingDown;
  const trendColor = change === undefined
    ? t.colors.neutral[300]
    : isPositive ? t.colors.feedback.success : t.colors.feedback.error;

  const chartData = sparkData?.map((v, i) => ({ i, v }));

  return (
    <div
      className={className}
      style={{
        backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg,
        padding: t.spacing.lg, boxShadow: t.shadows.sm,
        display: 'flex', flexDirection: 'column', gap: 12,
        fontFamily: font, minWidth: 200, border: `1px solid ${t.colors.neutral[200]}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <KText variant="small" color="secondary">{title}</KText>
        {icon && <span style={{ color: t.colors.neutral[300] }}>{icon}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: t.colors.neutral[900], lineHeight: 1 }}>{value}</span>
        {change !== undefined && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 12, color: trendColor, fontWeight: 500 }}>
            <TrendIcon size={14} strokeWidth={2} />
            {Math.abs(change)}%
          </span>
        )}
      </div>
      {changeLabel && <KText variant="caption" color="muted">{changeLabel}</KText>}
      {chartData && chartData.length > 0 && (
        <div style={{ width: '100%', height: 40, minWidth: 60 }}>
          <ResponsiveContainer width="100%" height={40}>
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="v" stroke={trendColor} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default KStatCard;
