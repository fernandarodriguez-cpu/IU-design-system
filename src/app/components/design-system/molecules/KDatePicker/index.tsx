/* ─── KDatePicker — Figma tokens (187675-42310 | 187677-9695 | 187677-9905)
   Input height : sm=32px | md=36px | lg=40px  |  Focus/accent #E04D36
   Migrado a Ant Design (antes @radix-ui/react-popover + date-fns calendar).
   La API pública sigue siendo basada en `Date`; convertimos Date↔dayjs en
   el borde. El label/help/side-label de Khor se conservan.
──────────────────────────────────────────────────────────────────────────────── */
import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import dayjs, { type Dayjs } from 'dayjs';
import { cn } from '@/utils/cn';
import { KLabel } from '../../atoms/KLabel';

const { RangePicker } = AntDatePicker;

const SIZE = { sm: { h: 32, fs: 12 }, md: { h: 36, fs: 13 }, lg: { h: 40, fs: 14 } } as const;

const SIZE_CLASS: Record<string, string> = {
  sm: '[&.ant-picker]:!h-[32px] [&_input]:!text-[12px]',
  md: '[&.ant-picker]:!h-[36px] [&_input]:!text-[13px]',
  lg: '[&.ant-picker]:!h-[40px] [&_input]:!text-[14px]',
};

const STATUS_HELP: Record<string, string> = {
  default: 'text-[#6B7280]',
  error: 'text-[#D32F2F]',
  warning: 'text-[#B45309]',
};

// Khor focus border = secondary #E04D36 (AntD default focus is navy primary)
const KHOR_FOCUS =
  '[&.ant-picker-focused]:!border-[#E04D36] [&.ant-picker-focused]:!shadow-[0_0_0_3px_rgba(224,77,54,0.15)] [&:hover]:!border-[#E04D36]';

export interface KDateRange { from?: Date; to?: Date; }

export type KDatePickerType = 'date' | 'datetime' | 'month' | 'year';
export type KDatePickerSize = 'sm' | 'md' | 'lg';
export type KDatePickerStatus = 'default' | 'error' | 'warning';
export type KDatePickerLabelPosition = 'top' | 'side';

export interface KDatePickerProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  status?: KDatePickerStatus;
  size?: KDatePickerSize;
  className?: string;
  style?: React.CSSProperties;
  type?: KDatePickerType;
  allowClear?: boolean;
  label?: React.ReactNode;
  labelPosition?: KDatePickerLabelPosition;
  required?: boolean;
  optional?: boolean;
  tooltip?: string;
  helpText?: string;
  block?: boolean;
}

export interface KDateRangePickerProps {
  value?: KDateRange;
  defaultValue?: KDateRange;
  onChange?: (range: KDateRange | undefined) => void;
  placeholder?: [string, string];
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  status?: KDatePickerStatus;
  size?: KDatePickerSize;
  className?: string;
  style?: React.CSSProperties;
  allowClear?: boolean;
  presets?: { label: string; value: [Date, Date] }[];
  label?: React.ReactNode;
  labelPosition?: KDatePickerLabelPosition;
  required?: boolean;
  optional?: boolean;
  tooltip?: string;
  helpText?: string;
  block?: boolean;
}

const toDayjs = (d?: Date): Dayjs | undefined => (d ? dayjs(d) : undefined);

// Shared Khor label/help/side-label wrapper
function FieldShell({
  label, labelPosition = 'top', required, optional, tooltip, helpText, status, size, disabled, block, className, style, children,
}: {
  label?: React.ReactNode; labelPosition?: KDatePickerLabelPosition; required?: boolean; optional?: boolean;
  tooltip?: string; helpText?: string; status: KDatePickerStatus; size: KDatePickerSize; disabled?: boolean;
  block?: boolean; className?: string; style?: React.CSSProperties; children: React.ReactNode;
}) {
  const s = SIZE[size];
  const helpNode = helpText ? (
    <span className={cn('leading-none', STATUS_HELP[status])} style={{ fontSize: 11 }}>{helpText}</span>
  ) : null;
  const labelNode = label ? (
    <KLabel size={size === 'lg' ? 'md' : 'sm'} required={required} optional={optional} info={tooltip} disabled={disabled}>{label}</KLabel>
  ) : null;
  const outerStyle: React.CSSProperties = { width: block ? '100%' : undefined, ...style };

  if (!label) return <div className={cn('flex flex-col gap-1', block && 'w-full', className)} style={outerStyle}>{children}{helpNode}</div>;
  if (labelPosition === 'side') return (
    <div className={cn('flex items-start gap-3', block && 'w-full', className)} style={outerStyle}>
      <div className="flex items-center shrink-0" style={{ height: s.h }}>{labelNode}<span className={cn('ml-0.5', disabled ? 'text-[#9CA3AF]' : 'text-[#374151]')} style={{ fontSize: s.fs }}>:</span></div>
      <div className="flex flex-col gap-1 flex-1">{children}{helpNode}</div>
    </div>
  );
  return <div className={cn('flex flex-col gap-1', block && 'w-full', className)} style={outerStyle}>{labelNode}{children}{helpNode}</div>;
}

export function KDatePicker({
  value, defaultValue, onChange,
  placeholder = 'Seleccionar día',
  disabled, minDate, maxDate,
  status = 'default', size = 'md',
  className, style,
  type = 'date', allowClear = true,
  label, labelPosition = 'top', required, optional, tooltip, helpText, block,
}: KDatePickerProps) {
  const picker = type === 'month' ? 'month' : type === 'year' ? 'year' : 'date';
  const disabledDate = (cur: Dayjs) =>
    (!!minDate && cur.isBefore(dayjs(minDate), 'day')) || (!!maxDate && cur.isAfter(dayjs(maxDate), 'day'));

  return (
    <FieldShell {...{ label, labelPosition, required, optional, tooltip, helpText, status, size, disabled, block, className, style }}>
      <AntDatePicker
        value={toDayjs(value)}
        defaultValue={toDayjs(defaultValue)}
        onChange={(d) => onChange?.(d ? d.toDate() : undefined)}
        picker={picker}
        showTime={type === 'datetime'}
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        status={status === 'default' ? undefined : status}
        disabledDate={minDate || maxDate ? disabledDate : undefined}
        className={cn('w-full font-primary', SIZE_CLASS[size], status === 'default' && KHOR_FOCUS)}
        popupClassName="font-primary [&_.ant-picker-cell-selected_.ant-picker-cell-inner]:!bg-[#E04D36] [&_.ant-picker-cell-today_.ant-picker-cell-inner::before]:!border-[#E04D36]"
      />
    </FieldShell>
  );
}

export function KDateRangePicker({
  value, defaultValue, onChange,
  placeholder, disabled, minDate, maxDate,
  status = 'default', size = 'md',
  className, style, allowClear = true, presets,
  label, labelPosition = 'top', required, optional, tooltip, helpText, block,
}: KDateRangePickerProps) {
  const toRange = (r?: KDateRange): [Dayjs | null, Dayjs | null] | undefined =>
    r ? [r.from ? dayjs(r.from) : null, r.to ? dayjs(r.to) : null] : undefined;
  const disabledDate = (cur: Dayjs) =>
    (!!minDate && cur.isBefore(dayjs(minDate), 'day')) || (!!maxDate && cur.isAfter(dayjs(maxDate), 'day'));

  return (
    <FieldShell {...{ label, labelPosition, required, optional, tooltip, helpText, status, size, disabled, block, className, style }}>
      <RangePicker
        value={toRange(value) as any}
        defaultValue={toRange(defaultValue) as any}
        onChange={(dates) =>
          onChange?.(dates ? { from: dates[0]?.toDate(), to: dates[1]?.toDate() } : undefined)
        }
        placeholder={placeholder}
        disabled={disabled}
        allowClear={allowClear}
        status={status === 'default' ? undefined : status}
        disabledDate={minDate || maxDate ? disabledDate : undefined}
        presets={presets?.map((p) => ({ label: p.label, value: [dayjs(p.value[0]), dayjs(p.value[1])] as [Dayjs, Dayjs] }))}
        className={cn('w-full font-primary', SIZE_CLASS[size], status === 'default' && KHOR_FOCUS)}
        popupClassName="font-primary [&_.ant-picker-cell-selected_.ant-picker-cell-inner]:!bg-[#E04D36] [&_.ant-picker-cell-in-range_.ant-picker-cell-inner]:!bg-[#FEE8E4]"
      />
    </FieldShell>
  );
}

export default KDatePicker;
