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

/**
 * KPopconfirm: Cuadro de confirmación flotante.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KPopconfirm({ 
  overlayStyle, 
  variant, 
  size, 
  fullWidth, 
  ...rest 
}: KPopconfirmProps & { variant?: any, size?: any, fullWidth?: any }) {
  return (
    <Popconfirm
      overlayStyle={{ 
        fontFamily: font, 
        ...overlayStyle 
      }}
      okButtonProps={{ 
        style: { fontFamily: font }, 
        ...rest.okButtonProps 
      }}
      cancelButtonProps={{ 
        style: { fontFamily: font }, 
        ...rest.cancelButtonProps 
      }}
      {...rest}
    />
  );
}

export default KPopconfirm;
