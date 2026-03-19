import React from 'react';
import { InputNumber, Segmented } from 'antd';
import type { InputNumberProps, SegmentedProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KInputNumber — Input numérico con controles +/-
   ═══════════════════════════════════════════════ */
export interface KInputNumberProps extends Omit<InputNumberProps, 'size'> {
  size?: 'sm' | 'md' | 'lg';
}

export function KInputNumber({ size = 'md', style, ...rest }: KInputNumberProps) {
  const heights = { sm: 32, md: 40, lg: 48 };
  const antSize = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'middle';
  return (
    <InputNumber
      size={antSize}
      style={{
        width: '100%', height: heights[size], fontFamily: font, fontSize: size === 'sm' ? 12 : 14,
        borderRadius: t.radius.md,
        ...style,
      }}
      {...rest}
    />
  );
}

export default KInputNumber;
