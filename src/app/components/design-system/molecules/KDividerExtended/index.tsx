import React from 'react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KDividerExtended — Separador con texto (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KDividerExtendedProps {
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  dashed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function KDividerExtended({ children, orientation = 'horizontal', dashed, className, style }: KDividerExtendedProps) {
  if (orientation === 'vertical') {
    return <div className={className} style={{ display: 'inline-block', width: 1, height: '1em', backgroundColor: t.colors.neutral[200], margin: '0 8px', verticalAlign: 'middle', borderStyle: dashed ? 'dashed' : 'solid', ...style }} />;
  }
  if (children) {
    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '16px 0', ...style }}>
        <div style={{ flex: 1, height: 1, backgroundColor: t.colors.neutral[200], borderStyle: dashed ? 'dashed' : 'solid' }} />
        <span style={{ fontSize: 13, color: t.colors.neutral[400], fontFamily: font, whiteSpace: 'nowrap' }}>{children}</span>
        <div style={{ flex: 1, height: 1, backgroundColor: t.colors.neutral[200], borderStyle: dashed ? 'dashed' : 'solid' }} />
      </div>
    );
  }
  return <div className={className} style={{ height: 1, backgroundColor: t.colors.neutral[200], margin: '16px 0', borderStyle: dashed ? 'dashed' : 'solid', ...style }} />;
}

export default KDividerExtended;
