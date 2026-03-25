import React from 'react';
import { Result } from 'antd';
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
  style?: React.CSSProperties;
}

export function KResult({ status, title, subTitle, icon, extra, className, style }: KResultProps) {
  return (
    <Result
      status={status as any}
      title={title}
      subTitle={subTitle}
      icon={icon}
      extra={extra}
      className={className}
      style={{ fontFamily: font, ...style }}
    />
  );
}

export default KResult;
