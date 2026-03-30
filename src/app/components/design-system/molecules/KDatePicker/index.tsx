import React from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { subDays, startOfMonth, endOfMonth } from 'date-fns';
import { khorTokens } from '../../../../theme/khor-theme';

dayjs.locale('es');

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KDatePicker — Selector de fecha
   ═══════════════════════════════════════════════ */
export interface KDatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
  showTime?: boolean | object;
  format?: string | string[];
  disabledDate?: (current: any) => boolean;
  status?: 'error' | 'warning';
  renderExtraFooter?: () => React.ReactNode;
  allowClear?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

/**
 * KDatePicker: Selector de fecha estilizado.
 * Refinado para evitar fugas de props al DOM (variant, fullWidth).
 */
export function KDatePicker({
  value, onChange, placeholder = 'Selecciona fecha', disabled, minDate, maxDate,
  picker, showTime, format: fmt, disabledDate, status, renderExtraFooter,
  allowClear, size = 'md', className, style, 
  variant, fullWidth, ...rest 
}: KDatePickerProps & { variant?: any, fullWidth?: any }) {
  const heights = { sm: 32, md: 40, lg: 48 };
  return (
    <div className={className} style={{ display: 'inline-block', width: '100%' }}>
      <DatePicker
        value={value ? dayjs(value) : undefined}
        onChange={(d) => onChange?.(d ? d.toDate() : undefined)}
        placeholder={placeholder}
        disabled={disabled}
        minDate={minDate ? dayjs(minDate) : undefined}
        maxDate={maxDate ? dayjs(maxDate) : undefined}
        picker={picker}
        showTime={showTime}
        format={fmt}
        disabledDate={disabledDate}
        status={status}
        renderExtraFooter={renderExtraFooter}
        allowClear={allowClear}
        style={{
          width: '100%', height: heights[size], fontFamily: font,
          borderRadius: t.radius.md,
          ...style,
        }}
        {...rest}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   KDateRangePicker — Rango de fechas
   ═══════════════════════════════════════════════ */
export interface KDateRange { from?: Date; to?: Date; }
export interface KDateRangePreset { label: string; range: KDateRange; }

export interface KDateRangePickerProps {
  value?: KDateRange;
  onChange?: (range: KDateRange | undefined) => void;
  placeholder?: [string, string];
  presets?: KDateRangePreset[];
  disabled?: boolean | [boolean, boolean];
  className?: string;
}

const defaultPresets: KDateRangePreset[] = [
  { label: 'Hoy', range: { from: new Date(), to: new Date() } },
  { label: 'Últimos 7 días', range: { from: subDays(new Date(), 6), to: new Date() } },
  { label: 'Últimos 30 días', range: { from: subDays(new Date(), 29), to: new Date() } },
  { label: 'Este mes', range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) } },
];

export function KDateRangePicker({ value, onChange, placeholder = ['Inicio', 'Fin'], presets = defaultPresets, disabled, className }: KDateRangePickerProps) {
  const antdValue = value?.from && value?.to ? [dayjs(value.from), dayjs(value.to)] as any : undefined;

  const formattedPresets = presets?.map((p) => ({
    label: p.label,
    value: [dayjs(p.range.from), dayjs(p.range.to)] as any
  }));

  const handleChange = (dates: any) => {
    if (dates && dates[0] && dates[1]) {
      onChange?.({ from: dates[0].toDate(), to: dates[1].toDate() });
    } else {
      onChange?.(undefined);
    }
  };

  return (
    <div className={className} style={{ display: 'inline-block', width: '100%' }}>
      <DatePicker.RangePicker
        value={antdValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled as any}
        presets={formattedPresets}
        style={{
          width: '100%', height: 40, fontFamily: font,
          borderRadius: t.radius.md, borderColor: t.colors.neutral[200],
          backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
        }}
        className="khor-ant-daterangepicker"
      />
    </div>
  );
}

export default KDatePicker;
