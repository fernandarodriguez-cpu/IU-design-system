import React from 'react';
import { Anchor } from 'antd';
import type { AnchorProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KAnchor — Navegación interna (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KAnchorProps extends AnchorProps {
  className?: string;
}

/**
 * KAnchor: Sistema de navegación mediante enlaces internos.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KAnchor({ 
  className, 
  style, 
  variant, 
  size, 
  fullWidth, 
  ...rest 
}: KAnchorProps & { variant?: any, size?: any, fullWidth?: any }) {
  return (
    <Anchor
      className={className}
      style={{ 
        fontFamily: font, 
        ...style 
      }}
      {...rest}
    />
  );
}

export default KAnchor;
