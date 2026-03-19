import React from 'react';
import { KText } from '../../atoms';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KCardSectionProps {
  title?: string;
  subtitle?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function KCardSection({ title, subtitle, extra, children, className, noPadding }: KCardSectionProps) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg,
        boxShadow: t.shadows.sm, border: `1px solid ${t.colors.neutral[200]}`,
        overflow: 'hidden', fontFamily: font,
      }}
    >
      {title && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 24px', borderBottom: `1px solid ${t.colors.neutral[200]}`,
        }}>
          <div>
            <KText variant="body-lg" color="navy">{title}</KText>
            {subtitle && <KText variant="small" color="secondary">{subtitle}</KText>}
          </div>
          {extra}
        </div>
      )}
      <div style={{ padding: noPadding ? 0 : 24 }}>{children}</div>
    </div>
  );
}

export default KCardSection;
