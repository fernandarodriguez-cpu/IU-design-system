import React from 'react';
import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KTooltip — Información contextual al hacer hover
   ═══════════════════════════════════════════════ */
export interface KTooltipProps extends TooltipProps { }

export function KTooltip({ 
  title, 
  children, 
  color = khorTokens.colors.brand.navy,
  overlayInnerStyle,
  ...rest 
}: KTooltipProps) {
  return (
    <Tooltip
      title={title}
      color={color}
      overlayInnerStyle={{
        fontFamily: font,
        fontSize: '12px',
        padding: '8px 12px',
        borderRadius: t.radius.md,
        ...overlayInnerStyle
      }}
      {...rest}
    >
      {children}
    </Tooltip>
  );
}

export default KTooltip;
