import React from 'react';
import { Spin } from 'antd';
import type { SpinProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KSpinProps extends Omit<SpinProps, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

/**
 * KSpin: Indicador de carga (spinner).
 * Refinado para evitar fugas de props al DOM (variant, fullWidth).
 */
export function KSpin({ 
  size = 'md', color, style, 
  variant, fullWidth, ...rest 
}: KSpinProps & { variant?: any, fullWidth?: any }) {
  const antSize: SpinProps['size'] = size === 'sm' ? 'small' : size === 'lg' ? 'large' : 'default';
  return (
    <Spin
      size={antSize}
      style={{ 
        color: color ?? t.colors.brand.primary, 
        fontFamily: font, 
        ...style 
      }}
      {...rest}
    />
  );
}

export default KSpin;
