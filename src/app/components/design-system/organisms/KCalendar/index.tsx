import React from 'react';
import { Calendar } from 'antd';
import type { CalendarProps } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KCalendar — Calendario completo (Organismo)
   ═══════════════════════════════════════════════ */
export interface KCalendarProps extends Omit<CalendarProps<Dayjs>, 'value' | 'onChange' | 'onPanelChange'> {
  value?: Date;
  onChange?: (date: Date) => void;
  onPanelChange?: (date: Date, mode: 'month' | 'year') => void;
}

export function KCalendar({ value, onChange, onPanelChange, className, style, ...rest }: KCalendarProps) {
  return (
    <div
      className={className}
      style={{
        border: `1px solid ${t.colors.neutral[200]}`,
        borderRadius: t.radius.lg,
        overflow: 'hidden',
        backgroundColor: t.colors.neutral[50],
        fontFamily: font,
        ...style,
      }}
    >
      <Calendar
        value={value ? dayjs(value) : undefined}
        onChange={(d) => onChange?.(d.toDate())}
        onPanelChange={(d, m) => onPanelChange?.(d.toDate(), m)}
        {...rest}
      />
    </div>
  );
}

export default KCalendar;
