import React from 'react';
import { ColorPicker } from 'antd';
import type { ColorPickerProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KColorPicker — Selector de color (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KColorPickerProps extends ColorPickerProps {
  className?: string;
  style?: React.CSSProperties;
}

export function KColorPicker({ className, style, ...rest }: KColorPickerProps) {
  return (
    <ColorPicker
      className={className}
      style={{ fontFamily: font, ...style }}
      showText
      {...rest}
    />
  );
}

export default KColorPicker;
