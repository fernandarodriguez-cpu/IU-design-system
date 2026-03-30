import React from 'react';
import { Progress } from 'antd';
import type { ProgressProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KProgressProps extends ProgressProps { }

/**
 * KProgress: Barra de progreso circular o lineal.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KProgress({ 
  strokeColor, style, variant, size, fullWidth, ...rest 
}: KProgressProps & { variant?: any, size?: any, fullWidth?: any }) {
  return (
    <Progress
      strokeColor={strokeColor ?? t.colors.brand.primary}
      style={{ fontFamily: font, ...style }}
      {...rest}
    />
  );
}

export default KProgress;
