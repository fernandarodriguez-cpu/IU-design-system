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

export function KAnchor({ className, style, ...rest }: KAnchorProps) {
  return (
    <Anchor
      className={className}
      style={{ fontFamily: font, ...style }}
      {...rest}
    />
  );
}

export default KAnchor;
