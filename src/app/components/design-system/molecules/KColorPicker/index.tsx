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

/**
 * KColorPicker: Selector de color estilizado.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KColorPicker({ 
  className, 
  style, 
  variant, 
  size, 
  fullWidth, 
  ...rest 
}: KColorPickerProps & { variant?: any, size?: any, fullWidth?: any }) {
  return (
    <ColorPicker
      className={className}
      style={{ 
        fontFamily: font, 
        ...style 
      }}
      size={size as any}
      showText
      {...rest}
    />
  );
}

export default KColorPicker;
