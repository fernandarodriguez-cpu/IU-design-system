import React from 'react';
import { InputNumber } from 'antd';
import type { InputNumberProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KInputNumber — Input numérico con controles +/-
   ═══════════════════════════════════════════════ */
export interface KInputNumberProps extends Omit<InputNumberProps, 'size'> {
  size?: 'sm' | 'md' | 'lg';
}

/**
 * KInputNumber: Selector numérico con controles integrados.
 * Refinado para evitar fugas de props al DOM (variant, fullWidth).
 */
export function KInputNumber({ 
  size = 'md', style, 
  variant, fullWidth, ...rest 
}: KInputNumberProps & { variant?: any, fullWidth?: any }) {
  const heights = { sm: 32, md: 40, lg: 48 };
  const antSize = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'middle';
  
  return (
    <InputNumber
      size={antSize}
      style={{
        width: fullWidth ? '100%' : 'auto', 
        height: heights[size], 
        fontFamily: font, 
        fontSize: size === 'sm' ? 12 : 14,
        borderRadius: t.radius.md,
        ...style,
      }}
      {...rest}
    />
  );
}

export default KInputNumber;
