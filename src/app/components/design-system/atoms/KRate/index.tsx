import React from 'react';
import { Rate } from 'antd';
import type { RateProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

export interface KRateProps extends RateProps {
  size?: number;
}

/**
 * KRate: Sistema de puntuación por estrellas.
 * Refinado para evitar fugas de props al DOM (variant, fullWidth).
 */
export function KRate({ 
  size, style, variant, fullWidth, ...rest 
}: KRateProps & { variant?: any, fullWidth?: any }) {
  return (
    <Rate
      style={{
        fontSize: size ?? 20,
        color: t.colors.brand.accent,
        ...style,
      }}
      {...rest}
    />
  );
}

export default KRate;
