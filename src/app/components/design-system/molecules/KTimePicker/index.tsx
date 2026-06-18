/* ─── KTimePicker — Figma-aligned (mirrors KDatePicker tokens)
   Input height  : sm=32px | md=36px | lg=40px  (mirrors KInput)
   Focus/accent  : #E04D36   |  Focus ring: rgba(224,77,54,0.15)
   Border        : #D1D5DB default | #D32F2F error | #F59E0B warning
   Disabled      : bg #F3F4F6, border #E5E7EB, text #9CA3AF
   Scroll-col sel: text #E04D36, bg #FFF5F4
   Footer        : "Ahora" (text) + "Aceptar" (primary red)
──────────────────────────────────────────────────────────────────────────────── */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Clock } from 'lucide-react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/utils/cn';
import { KLabel } from '../../atoms/KLabel';

// ─── Size tokens ──────────────────────────────────────────────────────────────
const SIZE = {
  sm: { h: 32, px: 10, fs: 12, iconSz: 14 },
  md: { h: 36, px: 12, fs: 13, iconSz: 15 },
  lg: { h: 40, px: 14, fs: 14, iconSz: 16 },
} as const;

const STATUS_BORDER: Record<string, string> = {
  default: 'border-[#D1D5DB]',
  error:   'border-[#D32F2F]',
  warning: 'border-[#F59E0B]',
};

const STATUS_HELP: Record<string, string> = {
  default: 'text-[#6B7280]',
  error:   'text-[#D32F2F]',
  warning: 'text-[#B45309]',
};

// ─── Option arrays ────────────────────────────────────────────────────────────
const HH24 = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const HH12 = Array.from({ length: 12 }, (_, i) => String(i === 0 ? 12 : i).padStart(2, '0'));
const MM   = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
const AMPM = ['AM', 'PM'];

// ─── Trigger style helper ─────────────────────────────────────────────────────
function triggerCls(status: KTimePickerStatus, disabled: boolean | undefined, open: boolean) {
  return cn(
    'flex w-full items-center rounded-md border bg-white font-primary',
    'outline-none transition-all duration-150',
    !disabled && STATUS_BORDER[status],
    !disabled && status === 'default' && 'hover:border-[#E04D36]',
    open  && !disabled && 'border-[#E04D36] shadow-[0_0_0_3px_rgba(224,77,54,0.15)]',
    status === 'error'   && open && !disabled && 'shadow-[0_0_0_3px_rgba(211,47,47,0.15)]',
    status === 'warning' && open && !disabled && 'shadow-[0_0_0_3px_rgba(245,158,11,0.15)]',
    disabled && 'bg-[#F3F4F6] border-[#E5E7EB] pointer-events-none',
  );
}

// ─── Scrollable time column ───────────────────────────────────────────────────
function TimeCol({
  label, options, value, onChange,
}: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const ITEM_H = 32;

  const scrollTo = useCallback((v: string) => {
    const el = ref.current;
    if (!el) return;
    const idx = options.indexOf(v);
    if (idx >= 0) el.scrollTop = idx * ITEM_H;
  }, [options]);

  useEffect(() => { scrollTo(value); }, [value, scrollTo]);

  const handleScroll = () => {
    const el = ref.current;
    if (!el) return;
    const idx = Math.round(el.scrollTop / ITEM_H);
    const clamped = Math.max(0, Math.min(idx, options.length - 1));
    if (options[clamped] !== value) onChange(options[clamped]);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider mb-1 select-none">
        {label}
      </div>
      <div
        ref={ref}
        onScroll={handleScroll}
        className="overflow-y-auto"
        style={{
          height: ITEM_H * 6,
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <div style={{ paddingTop: ITEM_H * 2.5, paddingBottom: ITEM_H * 2.5 }}>
          {options.map(opt => (
            <div
              key={opt}
              onClick={() => { onChange(opt); scrollTo(opt); }}
              style={{ height: ITEM_H, scrollSnapAlign: 'start' }}
              className={cn(
                'flex items-center justify-center text-[13px] cursor-pointer font-primary select-none w-14 rounded-md transition-all',
                opt === value
                  ? 'bg-[#E04D36] text-white font-semibold shadow-sm rounded-md'
                  : 'text-[#374151] hover:bg-[#F3F4F6]',
              )}
            >
              {opt}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Column divider ───────────────────────────────────────────────────────────
function ColDivider() {
  return <div className="w-px bg-[#F3F4F6] self-stretch mx-1" />;
}

// ─── Types ────────────────────────────────────────────────────────────────────
export type KTimePickerSize          = 'sm' | 'md' | 'lg';
export type KTimePickerStatus        = 'default' | 'error' | 'warning';
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
  // Form-item props
  label?: React.ReactNode;
  labelPosition?: KTimePickerLabelPosition;
  required?: boolean;
  optional?: boolean;
  tooltip?: string;
  helpText?: string;
  block?: boolean;
}

// ─── Parse time string → parts ───────────────────────────────────────────────
function parseTime(v: string, use12Hours: boolean): { hh: string; mm: string; ss: string; ampm: string } {
  const parts = v.replace(/\s?(AM|PM)/i, '').split(':');
  let hh = (parts[0] || '00').padStart(2, '0');
  const mm = (parts[1] || '00').padStart(2, '0');
  const ss = (parts[2] || '00').padStart(2, '0');
  const ampm = v.toUpperCase().includes('PM') ? 'PM' : 'AM';

  if (use12Hours) {
    const h = parseInt(hh);
    hh = String(h === 0 ? 12 : h > 12 ? h - 12 : h).padStart(2, '0');
  }

  return { hh, mm, ss, ampm };
}

// ─── Build output string from parts ──────────────────────────────────────────
function buildTime(hh: string, mm: string, ss: string, ampm: string, use12Hours: boolean, showSeconds: boolean): string {
  let h = parseInt(hh);
  if (use12Hours) {
    if (ampm === 'PM' && h !== 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
  }
  const hhOut = String(h).padStart(2, '0');
  return showSeconds ? `${hhOut}:${mm}:${ss}` : `${hhOut}:${mm}`;
}

// ─── Display string ───────────────────────────────────────────────────────────
function displayTime(hh: string, mm: string, ss: string, ampm: string, use12Hours: boolean, showSeconds: boolean): string {
  const base = showSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
  return use12Hours ? `${base} ${ampm}` : base;
}

// ─── KTimePicker ─────────────────────────────────────────────────────────────
export function KTimePicker({
  value, defaultValue,
  onChange,
  placeholder = 'Seleccionar hora',
  disabled, size = 'md', status = 'default',
  showSeconds = false, use12Hours = false,
  allowClear = true,
  className, style,
  label, labelPosition = 'top',
  required, optional, tooltip, helpText, block,
}: KTimePickerProps) {
  const s = SIZE[size];
  const [open, setOpen] = useState(false);

  const getDefault = () => {
    const v = value ?? defaultValue ?? '';
    if (v) return parseTime(v, use12Hours);
    return { hh: '00', mm: '00', ss: '00', ampm: 'AM' };
  };

  const [isControlled] = useState(value !== undefined);
  const [parts, setParts] = useState(getDefault);

  // Sync from controlled value
  useEffect(() => {
    if (value !== undefined) setParts(parseTime(value, use12Hours));
  }, [value, use12Hours]);

  // Temp parts while popup is open (before "Aceptar")
  const [tempParts, setTempParts] = useState(parts);

  useEffect(() => {
    if (open) setTempParts(parts);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k: keyof typeof tempParts) => (v: string) =>
    setTempParts(p => ({ ...p, [k]: v }));

  const handleNow = () => {
    const now = new Date();
    const h = now.getHours();
    let hh: string;
    let ampm = 'AM';
    if (use12Hours) {
      ampm = h >= 12 ? 'PM' : 'AM';
      hh = String(h === 0 ? 12 : h > 12 ? h - 12 : h).padStart(2, '0');
    } else {
      hh = String(h).padStart(2, '0');
    }
    setTempParts({
      hh,
      mm: String(now.getMinutes()).padStart(2, '0'),
      ss: String(now.getSeconds()).padStart(2, '0'),
      ampm,
    });
  };

  const handleAccept = () => {
    const out = buildTime(tempParts.hh, tempParts.mm, tempParts.ss, tempParts.ampm, use12Hours, showSeconds);
    if (!isControlled) setParts(tempParts);
    onChange?.(out);
    setOpen(false);
  };

  const hasValue = Boolean(value ?? defaultValue);
  const displayVal = hasValue || (parts.hh !== '00' || parts.mm !== '00')
    ? displayTime(parts.hh, parts.mm, parts.ss, parts.ampm, use12Hours, showSeconds)
    : undefined;

  const popupContent = (
    <div className="border border-[#E5E7EB] rounded-lg shadow-xl bg-white overflow-hidden">
      {/* Scroll columns */}
      <div className="flex p-4 pb-2">
        <TimeCol label="HH" options={use12Hours ? HH12 : HH24} value={tempParts.hh} onChange={set('hh')} />
        <ColDivider />
        <TimeCol label="MM" options={MM} value={tempParts.mm} onChange={set('mm')} />
        {showSeconds && (
          <>
            <ColDivider />
            <TimeCol label="SS" options={MM} value={tempParts.ss} onChange={set('ss')} />
          </>
        )}
        {use12Hours && (
          <>
            <ColDivider />
            <TimeCol label="AM/PM" options={AMPM} value={tempParts.ampm} onChange={set('ampm')} />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#F3F4F6] px-4 py-2 flex items-center justify-between">
        <button
          type="button"
          onClick={handleNow}
          className="text-[12px] font-medium text-[#E04D36] hover:text-[#C43D28] transition-colors"
        >
          Ahora
        </button>
        <button
          type="button"
          onClick={handleAccept}
          className="px-3 py-1 bg-[#E04D36] text-white text-[12px] font-medium rounded-md hover:bg-[#C43D28] transition-colors"
        >
          Aceptar
        </button>
      </div>
    </div>
  );

  const trigger = (
    <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          disabled={disabled}
          className={triggerCls(status, disabled, open)}
          style={{ height: s.h, paddingLeft: s.px, paddingRight: s.px }}
        >
          <span
            className={cn(
              'flex-1 text-left truncate',
              displayVal ? (disabled ? 'text-[#9CA3AF]' : 'text-[#1e293b]') : 'text-[#9CA3AF]',
            )}
            style={{ fontSize: s.fs }}
          >
            {displayVal || placeholder}
          </span>
          <Clock
            style={{ width: s.iconSz, height: s.iconSz, marginLeft: 6, flexShrink: 0 }}
            className={disabled ? 'text-[#D1D5DB]' : 'text-[#9CA3AF]'}
          />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start"
          sideOffset={4}
          className="z-[200] outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          {popupContent}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );

  // ── Form-item wrappers (mirrors KDatePicker / KSelectField) ─────────────────
  const helpNode = helpText
    ? <span className={cn('leading-none', STATUS_HELP[status])} style={{ fontSize: 11 }}>{helpText}</span>
    : null;

  const labelNode = label
    ? <KLabel size={size === 'lg' ? 'md' : 'sm'} required={required} optional={optional} info={tooltip} disabled={disabled}>{label}</KLabel>
    : null;

  const outerStyle: React.CSSProperties = { ...(block ? { width: '100%' } : {}), ...style };

  if (!label) {
    return (
      <div className={cn('flex flex-col gap-1 w-full', className)} style={outerStyle}>
        {trigger}{helpNode}
      </div>
    );
  }

  if (labelPosition === 'side') {
    return (
      <div className={cn('flex items-start gap-3', block && 'w-full', className)} style={outerStyle}>
        <div className="flex items-center shrink-0" style={{ height: s.h }}>
          {labelNode}
          <span className={cn('ml-0.5', disabled ? 'text-[#9CA3AF]' : 'text-[#374151]')} style={{ fontSize: s.fs }}>:</span>
        </div>
        <div className="flex flex-col gap-1 flex-1">{trigger}{helpNode}</div>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-1', block && 'w-full', className)} style={outerStyle}>
      {labelNode}{trigger}{helpNode}
    </div>
  );
}

export default KTimePicker;
