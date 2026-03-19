import React from 'react';
import { Popconfirm } from 'antd';
import type { PopconfirmProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KPopconfirm — Popover de confirmación
   ═══════════════════════════════════════════════ */
export interface KPopconfirmProps extends PopconfirmProps {
  /** Compat: alias de onConfirm */
  onConfirm?: () => void | Promise<void>;
}

export function KPopconfirm({ overlayStyle, ...rest }: KPopconfirmProps) {
  return (
    <Popconfirm
      overlayStyle={{ fontFamily: font, ...overlayStyle }}
      okButtonProps={{ style: { fontFamily: font }, ...rest.okButtonProps }}
      cancelButtonProps={{ style: { fontFamily: font }, ...rest.cancelButtonProps }}
      {...rest}
    />
  );
}

export default KPopconfirm;
