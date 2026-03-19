import React from 'react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KFormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function KFormField({ label, required, error, hint, children, className }: KFormFieldProps) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 14, fontWeight: 500, color: t.colors.neutral[900], fontFamily: font }}>
        {label}
        {required && <span style={{ color: t.colors.feedback.error, marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {error && <span style={{ fontSize: 12, color: t.colors.feedback.error, fontFamily: font }}>{error}</span>}
      {!error && hint && <span style={{ fontSize: 12, color: t.colors.neutral[300], fontFamily: font }}>{hint}</span>}
    </div>
  );
}

export default KFormField;
