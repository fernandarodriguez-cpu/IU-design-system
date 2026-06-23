/* ─── KTimePicker — Figma-aligned (mirrors KDatePicker tokens)
   Input height : sm=32px | md=36px | lg=40px  |  Focus/accent #E04D36
   Migrado a Ant Design (antes @radix-ui/react-popover). API pública sigue
   siendo string ('HH:mm' / 'HH:mm:ss', 24h canónico); convertimos a dayjs
   en el borde. El label/help/side-label de Khor se conservan.
──────────────────────────────────────────────────────────────────────────────── */
import React from 'react';
import { TimePicker as AntTimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { cn } from '@/utils/cn';

dayjs.extend(customParseFormat); // enables dayjs(value, 'HH:mm') string parsing
import { KLabel } from '../../atoms/KLabel';

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

const KHOR_FOCUS =
  '[&.ant-picker-focused]:!border-[#E04D36] [&.ant-picker-focused]:!shadow-[0_0_0_3px_rgba(224,77,54,0.15)] [&:hover]:!border-[#E04D36]';

export type KTimePickerSize = 'sm' | 'md' | 'lg';
export type KTimePickerStatus = 'default' | 'error' | 'warning';
export type KTimePickerLabelPosition = 'top' | 'side';

export interface KTimePickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (time: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: KTimePickerSize;
  status?: KTimePickerStatus;
  showSeconds?: boolean;
  use12Hours?: boolean;
  allowClear?: boolean;
  className?: string;
  style?: React.CSSProperties;
  label?: React.ReactNode;
  labelPosition?: KTimePickerLabelPosition;
  required?: boolean;
  optional?: boolean;
  tooltip?: string;
  helpText?: string;
  block?: boolean;
}

export function KTimePicker({
  value, defaultValue, onChange,
  placeholder = 'Seleccionar hora',
  disabled, size = 'md', status = 'default',
  showSeconds = false, use12Hours = false, allowClear = true,
  className, style,
  label, labelPosition = 'top', required, optional, tooltip, helpText, block,
}: KTimePickerProps) {
  const s = SIZE[size];
  // canonical 24h format used for value parsing + onChange output
  const canonical = showSeconds ? 'HH:mm:ss' : 'HH:mm';
  // display format (may be 12h)
  const display = use12Hours ? (showSeconds ? 'hh:mm:ss A' : 'hh:mm A') : canonical;

  const parse = (v?: string) => (v ? dayjs(v, canonical) : undefined);

  const field = (
    <AntTimePicker
      value={parse(value)}
      defaultValue={parse(defaultValue)}
      onChange={(d) => onChange?.(d ? d.format(canonical) : '')}
      placeholder={placeholder}
      disabled={disabled}
      use12Hours={use12Hours}
      format={display}
      allowClear={allowClear}
      status={status === 'default' ? undefined : status}
      className={cn('w-full font-primary', SIZE_CLASS[size], status === 'default' && KHOR_FOCUS)}
      popupClassName="font-primary [&_.ant-picker-time-panel-cell-selected_.ant-picker-time-panel-cell-inner]:!bg-[#FFF5F4] [&_.ant-picker-time-panel-cell-selected_.ant-picker-time-panel-cell-inner]:!text-[#E04D36]"
      style={{ fontSize: s.fs }}
    />
  );

  const helpNode = helpText ? (
    <span className={cn('leading-none', STATUS_HELP[status])} style={{ fontSize: 11 }}>{helpText}</span>
  ) : null;
  const labelNode = label ? (
    <KLabel size={size === 'lg' ? 'md' : 'sm'} required={required} optional={optional} info={tooltip} disabled={disabled}>{label}</KLabel>
  ) : null;
  const outerStyle: React.CSSProperties = { width: block ? '100%' : undefined, ...style };

  if (!label) return <div className={cn('flex flex-col gap-1', block && 'w-full', className)} style={outerStyle}>{field}{helpNode}</div>;
  if (labelPosition === 'side') return (
    <div className={cn('flex items-start gap-3', block && 'w-full', className)} style={outerStyle}>
      <div className="flex items-center shrink-0" style={{ height: s.h }}>{labelNode}<span className={cn('ml-0.5', disabled ? 'text-[#9CA3AF]' : 'text-[#374151]')} style={{ fontSize: s.fs }}>:</span></div>
      <div className="flex flex-col gap-1 flex-1">{field}{helpNode}</div>
    </div>
  );
  return <div className={cn('flex flex-col gap-1', block && 'w-full', className)} style={outerStyle}>{labelNode}{field}{helpNode}</div>;
}

export default KTimePicker;
