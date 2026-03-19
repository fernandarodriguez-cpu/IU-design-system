import React from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, FileX, Lock, ServerCrash } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KResult — Página de resultado/estado
   ═══════════════════════════════════════════════ */
export type KResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

export interface KResultProps {
  status: KResultStatus;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
}

const resultIconMap: Record<KResultStatus, { icon: React.ReactNode; color: string }> = {
  success: { icon: <CheckCircle size={64} />, color: khorTokens.colors.feedback.success },
  error: { icon: <XCircle size={64} />, color: khorTokens.colors.feedback.error },
  info: { icon: <Info size={64} />, color: khorTokens.colors.brand.navy },
  warning: { icon: <AlertCircle size={64} />, color: khorTokens.colors.brand.accent },
  '404': { icon: <FileX size={64} />, color: khorTokens.colors.neutral[400] },
  '403': { icon: <Lock size={64} />, color: khorTokens.colors.brand.accent },
  '500': { icon: <ServerCrash size={64} />, color: khorTokens.colors.feedback.error },
};

export function KResult({ status, title, subTitle, icon, extra, className }: KResultProps) {
  const cfg = resultIconMap[status];
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, textAlign: 'center', fontFamily: font }}>
      <div style={{ color: cfg.color, marginBottom: 24 }}>{icon || cfg.icon}</div>
      <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: t.colors.neutral[900], marginBottom: 8 }}>{title}</h2>
      {subTitle && <p style={{ margin: 0, fontSize: 14, color: t.colors.neutral[500], maxWidth: 400, lineHeight: 1.6 }}>{subTitle}</p>}
      {extra && <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>{extra}</div>}
    </div>
  );
}

export default KResult;
