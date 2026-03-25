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

export function KTimePicker({ onChange, style, ...rest }: KTimePickerProps) {
  return (
    <TimePicker
      onChange={(_, timeString) => onChange?.(timeString as string)}
      style={{ width: '100%', height: 40, fontFamily: font, ...style }}
      {...rest}
    />
  );
}

export default KTimePicker;
