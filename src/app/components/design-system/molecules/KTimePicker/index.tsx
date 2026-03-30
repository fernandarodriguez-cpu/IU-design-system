import React from 'react';
import { TimePicker } from 'antd';
import type { TimePickerProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KTimePicker — Selector de hora (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KTimePickerProps extends Omit<TimePickerProps, 'onChange'> {
  onChange?: (timeString: string) => void;
}

/**
 * KTimePicker: Selector de hora estilizado.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KTimePicker({ 
  onChange, 
  style, 
  variant, 
  size, 
  fullWidth, 
  ...rest 
}: KTimePickerProps & { variant?: any, size?: any, fullWidth?: any }) {
  return (
    <TimePicker
      onChange={(_, timeString) => onChange?.(timeString as string)}
      style={{ 
        width: '100%', 
        height: 40, 
        fontFamily: font, 
        ...style 
      }}
      size={size as any}
      {...rest}
    />
  );
}

export default KTimePicker;
