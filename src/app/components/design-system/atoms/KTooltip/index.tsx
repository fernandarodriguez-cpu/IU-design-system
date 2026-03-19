import React from 'react';
import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export type KTooltipProps = TooltipProps;

export function KTooltip({ children, color, ...rest }: KTooltipProps) {
  return (
    <Tooltip
      color={color ?? t.colors.brand.navy}
      overlayStyle={{ fontFamily: font }}
      {...rest}
    >
      {children}
    </Tooltip>
  );
}

export default KTooltip;
