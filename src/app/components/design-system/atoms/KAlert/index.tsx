import React from 'react';
import { Alert } from 'antd';
import type { AlertProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KAlertProps extends AlertProps {
  title?: string;
}

export function KAlert({ title, message, style, ...rest }: KAlertProps) {
  return (
    <Alert
      message={title || message}
      style={{ fontFamily: font, borderRadius: t.radius.md, ...style }}
      showIcon
      {...rest}
    />
  );
}

export default KAlert;
