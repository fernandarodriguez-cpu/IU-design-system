import React from 'react';
import { Tooltip } from 'antd';
import type { TooltipProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KTooltip — Información contextual al hacer hover
   ═══════════════════════════════════════════════ */
export type KTooltipProps = TooltipProps & {
  children?: React.ReactNode;
};

/**
 * KTooltip: Información contextual al hacer hover.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KTooltip({ 
  title, 
  children, 
  color = khorTokens.colors.brand.navy,
  overlayInnerStyle,
  variant,
  size,
  fullWidth,
  ...rest 
}: KTooltipProps & { variant?: any, size?: any, fullWidth?: any }) {
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
