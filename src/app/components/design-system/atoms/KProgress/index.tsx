import React from 'react';
import { Progress } from 'antd';
import type { ProgressProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KProgressProps extends ProgressProps { }

export function KProgress({ strokeColor, style, ...rest }: KProgressProps) {
  return (
    <Progress
      strokeColor={strokeColor ?? t.colors.brand.primary}
      style={{ fontFamily: font, ...style }}
      {...rest}
    />
  );
}

export default KProgress;
