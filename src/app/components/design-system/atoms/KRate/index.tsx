import React from 'react';
import { Rate } from 'antd';
import type { RateProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

export interface KRateProps extends RateProps {
  size?: number;
}

export function KRate({ size, style, ...rest }: KRateProps) {
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
