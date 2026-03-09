/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR DESIGN SYSTEM — MOLÉCULAS EXT.     ║
 * ║  Componentes moleculares adicionales      ║
 * ║  integrados desde análisis comparativo.   ║
 * ║                                           ║
 * ║  Base: Radix + Custom + Khor Tokens       ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import {
  Minus, Plus, X, Calendar as CalendarIcon, Clock, Search,
  ChevronLeft, ChevronRight, ChevronDown,
  CheckCircle, XCircle, AlertCircle, Info, FileX, Lock, ServerCrash,
  AlertTriangle, Check,
} from 'lucide-react';
import { format, startOfDay, endOfDay, subDays, startOfMonth, endOfMonth, addMonths, subMonths, isSameDay, isSameMonth, isAfter, isBefore, getYear, getMonth, setMonth, setYear } from 'date-fns';
import { es } from 'date-fns/locale';
import { khorTokens } from '../../theme/khor-theme';
import { KButton, KText } from './atoms';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KInputNumber — Input numérico con controles +/-
   ═══════════════════════════════════════════════ */
export interface KInputNumberProps {
  value?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  disabled?: boolean;
  placeholder?: string;
  controls?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function KInputNumber({
  value, onChange, min = -Infinity, max = Infinity, step = 1,
  precision, disabled, placeholder = '0', controls = true,
  size = 'md', className,
}: KInputNumberProps) {
  const [internal, setInternal] = useState<string>(value !== undefined ? String(value) : '');
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (value !== undefined) setInternal(String(value));
  }, [value]);

  const clamp = (v: number) => Math.min(max, Math.max(min, precision !== undefined ? Number(v.toFixed(precision)) : v));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    if (raw === '' || raw === '-') { setInternal(raw); onChange?.(undefined); return; }
    const num = Number(raw);
    if (!isNaN(num)) { setInternal(raw); onChange?.(clamp(num)); }
  };

  const handleStep = (dir: 1 | -1) => {
    const current = internal ? Number(internal) : 0;
    const next = clamp(current + step * dir);
    setInternal(String(next));
    onChange?.(next);
  };

  const heights = { sm: 32, md: 40, lg: 48 };

  return (
    <div className={className} style={{
      display: 'inline-flex', alignItems: 'center', borderRadius: t.radius.md,
      border: `1.5px solid ${focused ? t.colors.brand.primary : t.colors.neutral[200]}`,
      backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
      transition: 'border-color 0.15s ease', overflow: 'hidden',
      opacity: disabled ? 0.6 : 1, height: heights[size],
    }}>
      {controls && (
        <button onClick={() => handleStep(-1)} disabled={disabled || Number(internal) <= min} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: heights[size], height: '100%', border: 'none', borderRight: `1px solid ${t.colors.neutral[200]}`,
          backgroundColor: 'transparent', cursor: disabled ? 'not-allowed' : 'pointer',
          color: t.colors.neutral[400],
        }}>
          <Minus size={14} />
        </button>
      )}
      <input
        type="text" inputMode="decimal" value={internal} onChange={handleChange}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        placeholder={placeholder} disabled={disabled}
        style={{
          width: 80, textAlign: 'center', border: 'none', outline: 'none',
          backgroundColor: 'transparent', fontFamily: font, fontSize: size === 'sm' ? 12 : 14,
          color: t.colors.neutral[900], padding: '0 8px',
        }}
      />
      {controls && (
        <button onClick={() => handleStep(1)} disabled={disabled || Number(internal) >= max} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: heights[size], height: '100%', border: 'none', borderLeft: `1px solid ${t.colors.neutral[200]}`,
          backgroundColor: 'transparent', cursor: disabled ? 'not-allowed' : 'pointer',
          color: t.colors.neutral[400],
        }}>
          <Plus size={14} />
        </button>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   KSegmented — Control segmentado tipo iOS
   ═══════════════════════════════════════════════ */
export interface KSegmentedOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface KSegmentedProps {
  options: (KSegmentedOption | string)[];
  value?: string;
  onChange?: (value: string) => void;
  block?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function KSegmented({ options, value: ctrlValue, onChange, block, disabled, size = 'md', className }: KSegmentedProps) {
  const [internal, setInternal] = useState('');
  const val = ctrlValue !== undefined ? ctrlValue : internal;
  const opts: KSegmentedOption[] = options.map((o) => typeof o === 'string' ? { label: o, value: o } : o);
  const paddings = { sm: '4px 10px', md: '6px 14px', lg: '8px 18px' };
  const fz = { sm: 12, md: 13, lg: 14 };

  useEffect(() => {
    if (!val && opts.length) { setInternal(opts[0].value); }
  }, []);

  return (
    <div className={className} style={{
      display: block ? 'flex' : 'inline-flex', backgroundColor: t.colors.neutral[100],
      borderRadius: t.radius.md, padding: 3, gap: 2, fontFamily: font,
    }}>
      {opts.map((opt) => {
        const active = val === opt.value;
        const isDisabled = disabled || opt.disabled;
        return (
          <button
            key={opt.value}
            onClick={() => { if (!isDisabled) { setInternal(opt.value); onChange?.(opt.value); } }}
            disabled={isDisabled}
            style={{
              flex: block ? 1 : undefined, display: 'inline-flex', alignItems: 'center',
              justifyContent: 'center', gap: 6, padding: paddings[size],
              borderRadius: t.radius.sm, border: 'none',
              backgroundColor: active ? t.colors.neutral[50] : 'transparent',
              boxShadow: active ? t.shadows.sm : 'none',
              color: active ? t.colors.brand.primary : isDisabled ? t.colors.neutral[300] : t.colors.neutral[500],
              fontFamily: font, fontSize: fz[size], fontWeight: active ? 600 : 400,
              cursor: isDisabled ? 'not-allowed' : 'pointer', transition: 'all 0.15s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {opt.icon}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   KAutocomplete — Input con sugerencias
   ═══════════════════════════════════════════════ */
export interface KAutocompleteOption {
  value: string;
  label: string;
  description?: string;
}

export interface KAutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: KAutocompleteOption) => void;
  options: KAutocompleteOption[];
  loading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  noResultsText?: string;
  filterOption?: (input: string, option: KAutocompleteOption) => boolean;
  className?: string;
}

export function KAutocomplete({
  value: ctrlValue, onChange, onSelect, options, loading, placeholder = 'Buscar...',
  disabled, allowClear, noResultsText = 'Sin resultados', filterOption, className,
}: KAutocompleteProps) {
  const [internal, setInternal] = useState('');
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const val = ctrlValue !== undefined ? ctrlValue : internal;
  const wrapRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!val) return options;
    const fn = filterOption || ((input, opt) => opt.label.toLowerCase().includes(input.toLowerCase()));
    return options.filter((opt) => fn(val, opt));
  }, [val, options, filterOption]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternal(e.target.value);
    onChange?.(e.target.value);
    setOpen(true);
    setActiveIdx(-1);
  };

  const handleSelect = (opt: KAutocompleteOption) => {
    setInternal(opt.label);
    onChange?.(opt.value);
    onSelect?.(opt);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && activeIdx >= 0 && filtered[activeIdx]) { handleSelect(filtered[activeIdx]); }
    if (e.key === 'Escape') setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={wrapRef} className={className} style={{ position: 'relative' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, height: 40, padding: '0 12px',
        borderRadius: t.radius.md,
        border: `1.5px solid ${focused ? t.colors.brand.primary : t.colors.neutral[200]}`,
        backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
        transition: 'border-color 0.15s ease',
      }}>
        <Search size={16} color={t.colors.neutral[300]} />
        <input
          value={val} onChange={handleChange}
          onFocus={() => { setFocused(true); setOpen(true); }}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder} disabled={disabled}
          style={{
            flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent',
            fontFamily: font, fontSize: 14, color: t.colors.neutral[900], padding: 0,
          }}
        />
        {loading && <div className="animate-spin" style={{ width: 14, height: 14, border: `2px solid ${t.colors.neutral[200]}`, borderTopColor: t.colors.brand.primary, borderRadius: '50%' }} />}
        {allowClear && val && (
          <button onClick={() => { setInternal(''); onChange?.(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[300], display: 'flex', padding: 0 }}>
            <X size={14} />
          </button>
        )}
      </div>
      {open && filtered.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md,
          zIndex: 50, maxHeight: 240, overflowY: 'auto',
        }}>
          {filtered.map((opt, i) => (
            <button key={opt.value} onClick={() => handleSelect(opt)}
              onMouseEnter={() => setActiveIdx(i)}
              style={{
                width: '100%', padding: '8px 12px', border: 'none', background: activeIdx === i ? t.colors.neutral[100] : 'transparent',
                textAlign: 'left', fontFamily: font, fontSize: 14, cursor: 'pointer',
                color: t.colors.neutral[900], display: 'block',
              }}
            >
              <div style={{ fontWeight: 500 }}>{opt.label}</div>
              {opt.description && <div style={{ fontSize: 12, color: t.colors.neutral[400], marginTop: 2 }}>{opt.description}</div>}
            </button>
          ))}
        </div>
      )}
      {open && filtered.length === 0 && val && !loading && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md,
          zIndex: 50, padding: '16px 12px', textAlign: 'center', color: t.colors.neutral[300],
          fontFamily: font, fontSize: 13,
        }}>
          {noResultsText}
        </div>
      )}
    </div>
  );
}

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
  className?: string;
}

const DAYS_ES = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];
const MONTHS_ES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function getCalendarDays(year: number, month: number) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = (first.getDay() + 6) % 7;
  const days: (Date | null)[] = Array.from({ length: startDay }, () => null);
  for (let d = 1; d <= last.getDate(); d++) days.push(new Date(year, month, d));
  while (days.length % 7 !== 0) days.push(null);
  return days;
}

export function KDatePicker({ value, onChange, placeholder = 'Selecciona fecha', disabled, minDate, maxDate, className }: KDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value || new Date());

  const days = getCalendarDays(viewDate.getFullYear(), viewDate.getMonth());

  const isDisabled = (d: Date) => {
    if (minDate && isBefore(d, startOfDay(minDate))) return true;
    if (maxDate && isAfter(d, endOfDay(maxDate))) return true;
    return false;
  };

  const handleSelect = (d: Date) => {
    if (isDisabled(d)) return;
    onChange?.(d);
    setOpen(false);
  };

  return (
    <RadixPopover.Root open={open} onOpenChange={setOpen}>
      <RadixPopover.Trigger asChild>
        <button disabled={disabled} className={className} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 12px',
          borderRadius: t.radius.md, border: `1.5px solid ${t.colors.neutral[200]}`,
          backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
          fontFamily: font, fontSize: 14, cursor: disabled ? 'not-allowed' : 'pointer',
          color: value ? t.colors.neutral[900] : t.colors.neutral[300], minWidth: 180,
        }}>
          <CalendarIcon size={16} color={t.colors.neutral[300]} />
          {value ? format(value, 'dd MMM yyyy', { locale: es }) : placeholder}
        </button>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content sideOffset={8} style={{
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.lg,
          padding: 16, fontFamily: font, zIndex: 100, width: 280,
        }}>
          {/* Month/Year nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <button onClick={() => setViewDate(subMonths(viewDate, 1))} style={calNavBtn}><ChevronLeft size={16} /></button>
            <span style={{ fontSize: 14, fontWeight: 600, color: t.colors.neutral[900] }}>
              {MONTHS_ES[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button onClick={() => setViewDate(addMonths(viewDate, 1))} style={calNavBtn}><ChevronRight size={16} /></button>
          </div>
          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
            {DAYS_ES.map((d) => (
              <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: t.colors.neutral[400], padding: 4 }}>{d}</div>
            ))}
          </div>
          {/* Days */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
            {days.map((d, i) => {
              if (!d) return <div key={`e-${i}`} />;
              const selected = value && isSameDay(d, value);
              const today = isSameDay(d, new Date());
              const dis = isDisabled(d);
              return (
                <button key={i} onClick={() => handleSelect(d)} disabled={dis} style={{
                  width: 32, height: 32, borderRadius: t.radius.sm, border: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontFamily: font, cursor: dis ? 'not-allowed' : 'pointer',
                  backgroundColor: selected ? t.colors.brand.primary : 'transparent',
                  color: selected ? '#fff' : dis ? t.colors.neutral[300] : today ? t.colors.brand.primary : t.colors.neutral[900],
                  fontWeight: selected || today ? 600 : 400,
                  transition: 'all 0.1s ease',
                }}
                  onMouseEnter={(e) => { if (!selected && !dis) e.currentTarget.style.backgroundColor = t.colors.neutral[100]; }}
                  onMouseLeave={(e) => { if (!selected && !dis) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
          <RadixPopover.Arrow style={{ fill: t.colors.neutral[50] }} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

const calNavBtn: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: 28, height: 28, borderRadius: khorTokens.radius.sm,
  border: 'none', backgroundColor: 'transparent', cursor: 'pointer',
  color: khorTokens.colors.neutral[400],
};

/* ═══════════════════════════════════════════════
   KDateRangePicker — Rango de fechas
   ═══════════════════════════════════════════════ */
export interface KDateRange { from?: Date; to?: Date; }

export interface KDateRangePreset { label: string; range: KDateRange; }

export interface KDateRangePickerProps {
  value?: KDateRange;
  onChange?: (range: KDateRange | undefined) => void;
  placeholder?: string;
  presets?: KDateRangePreset[];
  disabled?: boolean;
  className?: string;
}

const defaultPresets: KDateRangePreset[] = [
  { label: 'Hoy', range: { from: new Date(), to: new Date() } },
  { label: 'Últimos 7 días', range: { from: subDays(new Date(), 6), to: new Date() } },
  { label: 'Últimos 30 días', range: { from: subDays(new Date(), 29), to: new Date() } },
  { label: 'Este mes', range: { from: startOfMonth(new Date()), to: endOfMonth(new Date()) } },
];

export function KDateRangePicker({ value, onChange, placeholder = 'Selecciona rango', presets = defaultPresets, disabled, className }: KDateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(value?.from || new Date());
  const [selecting, setSelecting] = useState<'from' | 'to'>('from');
  const [tempFrom, setTempFrom] = useState<Date | undefined>(value?.from);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const days = getCalendarDays(viewDate.getFullYear(), viewDate.getMonth());

  /* Reset state when popover opens */
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setSelecting('from');
      setTempFrom(value?.from);
      setHoverDate(null);
      setViewDate(value?.from || new Date());
    }
  };

  const handleDayClick = (d: Date) => {
    if (selecting === 'from') {
      setTempFrom(d);
      setSelecting('to');
      setHoverDate(null);
    } else {
      const from = tempFrom!;
      const range = isBefore(d, from) ? { from: d, to: from } : { from, to: d };
      onChange?.(range);
      setSelecting('from');
      setTempFrom(undefined);
      setHoverDate(null);
      setOpen(false);
    }
  };

  const handlePresetClick = (range: KDateRange) => {
    onChange?.(range);
    setSelecting('from');
    setTempFrom(undefined);
    setHoverDate(null);
    setOpen(false);
  };

  const handleClear = () => {
    onChange?.(undefined);
    setSelecting('from');
    setTempFrom(undefined);
    setHoverDate(null);
  };

  /* Determine if a day falls in the visual range */
  const isInRange = (d: Date) => {
    /* While selecting "to", show live preview from tempFrom to hoverDate */
    if (selecting === 'to' && tempFrom && hoverDate) {
      const start = isBefore(hoverDate, tempFrom) ? hoverDate : tempFrom;
      const end = isAfter(hoverDate, tempFrom) ? hoverDate : tempFrom;
      return (isAfter(d, start) || isSameDay(d, start)) && (isBefore(d, end) || isSameDay(d, end));
    }
    /* Otherwise show the committed range */
    if (!value?.from || !value?.to) return false;
    return (isAfter(d, value.from) || isSameDay(d, value.from)) && (isBefore(d, value.to) || isSameDay(d, value.to));
  };

  const isRangeStart = (d: Date) => {
    if (selecting === 'to' && tempFrom) return isSameDay(d, tempFrom);
    return value?.from ? isSameDay(d, value.from) : false;
  };

  const isRangeEnd = (d: Date) => {
    if (selecting === 'to' && tempFrom && hoverDate) {
      return isSameDay(d, isBefore(hoverDate, tempFrom) ? tempFrom : hoverDate);
    }
    return value?.to ? isSameDay(d, value.to) : false;
  };

  const formatRange = () => {
    if (!value?.from) return placeholder;
    const f = format(value.from, 'dd MMM', { locale: es });
    const to = value.to ? format(value.to, 'dd MMM yyyy', { locale: es }) : '...';
    return `${f} – ${to}`;
  };

  return (
    <RadixPopover.Root open={open} onOpenChange={handleOpenChange}>
      <RadixPopover.Trigger asChild>
        <button disabled={disabled} className={className} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 12px',
          borderRadius: t.radius.md, border: `1.5px solid ${t.colors.neutral[200]}`,
          backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
          fontFamily: font, fontSize: 14, cursor: disabled ? 'not-allowed' : 'pointer',
          color: value?.from ? t.colors.neutral[900] : t.colors.neutral[300], minWidth: 220,
        }}>
          <CalendarIcon size={16} color={t.colors.neutral[300]} />
          <span style={{ flex: 1, textAlign: 'left' }}>{formatRange()}</span>
          {value?.from && !disabled && (
            <span
              onClick={(e) => { e.stopPropagation(); handleClear(); }}
              style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: t.colors.neutral[400], marginLeft: 4 }}
            >
              <X size={14} />
            </span>
          )}
        </button>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content sideOffset={8} style={{
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.lg,
          padding: 0, fontFamily: font, zIndex: 100, display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ display: 'flex' }}>
            {/* Presets */}
            <div style={{ padding: 12, borderRight: `1px solid ${t.colors.neutral[200]}`, minWidth: 140 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: t.colors.neutral[400], marginBottom: 8, textTransform: 'uppercase' }}>Rangos</div>
              {presets.map((p) => (
                <button key={p.label} onClick={() => handlePresetClick(p.range)} style={{
                  width: '100%', padding: '6px 8px', border: 'none', background: 'none',
                  textAlign: 'left', fontFamily: font, fontSize: 13, cursor: 'pointer',
                  color: t.colors.neutral[500], borderRadius: t.radius.sm,
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = t.colors.neutral[100]; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {p.label}
                </button>
              ))}
            </div>
            {/* Calendar */}
            <div style={{ padding: 16, width: 280 }}>
              {/* Selection state indicator */}
              <div style={{
                fontSize: 11, fontWeight: 600, textAlign: 'center', marginBottom: 8,
                padding: '4px 8px', borderRadius: t.radius.sm,
                backgroundColor: selecting === 'to' ? 'rgba(224,77,54,0.08)' : t.colors.neutral[100],
                color: selecting === 'to' ? t.colors.brand.primary : t.colors.neutral[400],
              }}>
                {selecting === 'from' ? 'Selecciona fecha de inicio' : 'Selecciona fecha de fin'}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <button onClick={() => setViewDate(subMonths(viewDate, 1))} style={calNavBtn}><ChevronLeft size={16} /></button>
                <span style={{ fontSize: 14, fontWeight: 600, color: t.colors.neutral[900] }}>
                  {MONTHS_ES[viewDate.getMonth()]} {viewDate.getFullYear()}
                </span>
                <button onClick={() => setViewDate(addMonths(viewDate, 1))} style={calNavBtn}><ChevronRight size={16} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 4 }}>
                {DAYS_ES.map((d) => (
                  <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, color: t.colors.neutral[400], padding: 4 }}>{d}</div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
                {days.map((d, i) => {
                  if (!d) return <div key={`e-${i}`} />;
                  const inRange = isInRange(d);
                  const isStart = isRangeStart(d);
                  const isEnd = isRangeEnd(d);
                  const selected = isStart || isEnd;
                  return (
                    <button
                      key={i}
                      onClick={() => handleDayClick(d)}
                      onMouseEnter={(e) => {
                        if (selecting === 'to') setHoverDate(d);
                        if (!selected) e.currentTarget.style.backgroundColor = inRange ? 'rgba(224,77,54,0.18)' : t.colors.neutral[100];
                      }}
                      onMouseLeave={(e) => {
                        if (!selected) e.currentTarget.style.backgroundColor = inRange ? 'rgba(224,77,54,0.1)' : 'transparent';
                      }}
                      style={{
                        width: 32, height: 32, borderRadius: t.radius.sm, border: 'none',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 13, fontFamily: font, cursor: 'pointer',
                        backgroundColor: selected ? t.colors.brand.primary : inRange ? 'rgba(224,77,54,0.1)' : 'transparent',
                        color: selected ? '#fff' : t.colors.neutral[900], fontWeight: selected ? 600 : 400,
                        transition: 'all 0.1s ease',
                      }}
                    >
                      {d.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <RadixPopover.Arrow style={{ fill: t.colors.neutral[50] }} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

/* ═══════════════════════════════════════════════
   KSelectAdvanced — Multi-select con tags
   ═══════════════════════════════════════════════ */
export interface KSelectAdvancedOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
}

export interface KSelectAdvancedProps {
  options: KSelectAdvancedOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  mode?: 'single' | 'multiple' | 'tags';
  maxTagCount?: number;
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function KSelectAdvanced({
  options, value, onChange, placeholder = 'Seleccionar...', mode = 'single',
  maxTagCount = 3, showSearch = true, allowClear, disabled, loading, className,
}: KSelectAdvancedProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isMulti = mode === 'multiple' || mode === 'tags';
  const selected: string[] = isMulti ? (Array.isArray(value) ? value : value ? [value] : []) : [];
  const singleVal = !isMulti ? (typeof value === 'string' ? value : '') : '';

  const filtered = options.filter((o) => !search || o.label.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (optVal: string) => {
    if (isMulti) {
      const next = selected.includes(optVal) ? selected.filter((v) => v !== optVal) : [...selected, optVal];
      onChange?.(next);
    } else {
      onChange?.(optVal);
      setOpen(false);
      setSearch('');
    }
  };

  const handleRemoveTag = (optVal: string) => {
    onChange?.(selected.filter((v) => v !== optVal));
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) { setOpen(false); setSearch(''); }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const displayTags = selected.slice(0, maxTagCount);
  const overflowCount = selected.length - maxTagCount;
  const singleLabel = options.find((o) => o.value === singleVal)?.label;

  return (
    <div ref={wrapRef} className={className} style={{ position: 'relative' }}>
      <div onClick={() => !disabled && setOpen(true)} style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4,
        minHeight: 40, padding: '4px 12px', borderRadius: t.radius.md,
        border: `1.5px solid ${focused || open ? t.colors.brand.primary : t.colors.neutral[200]}`,
        backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
        cursor: disabled ? 'not-allowed' : 'pointer', transition: 'border-color 0.15s ease',
      }}>
        {isMulti && displayTags.map((v) => {
          const opt = options.find((o) => o.value === v);
          return (
            <span key={v} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '2px 8px', borderRadius: 4, backgroundColor: 'rgba(224,77,54,0.1)',
              color: t.colors.brand.primary, fontSize: 12, fontWeight: 500, fontFamily: font,
            }}>
              {opt?.label || v}
              <button onClick={(e) => { e.stopPropagation(); handleRemoveTag(v); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0 }}>
                <X size={12} />
              </button>
            </span>
          );
        })}
        {isMulti && overflowCount > 0 && (
          <span style={{ fontSize: 12, color: t.colors.neutral[400], fontFamily: font }}>+{overflowCount}</span>
        )}
        {!isMulti && <span style={{ fontSize: 14, fontFamily: font, color: singleLabel ? t.colors.neutral[900] : t.colors.neutral[300], flex: 1 }}>{singleLabel || placeholder}</span>}
        {isMulti && selected.length === 0 && !search && <span style={{ fontSize: 14, fontFamily: font, color: t.colors.neutral[300], flex: 1 }}>{placeholder}</span>}
        {showSearch && open && (
          <input
            autoFocus value={search} onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ flex: 1, minWidth: 60, border: 'none', outline: 'none', backgroundColor: 'transparent', fontFamily: font, fontSize: 14, color: t.colors.neutral[900], padding: 0 }}
            placeholder={isMulti && selected.length > 0 ? '' : placeholder}
          />
        )}
        {loading && <div className="animate-spin" style={{ width: 14, height: 14, border: `2px solid ${t.colors.neutral[200]}`, borderTopColor: t.colors.brand.primary, borderRadius: '50%' }} />}
        {allowClear && (isMulti ? selected.length > 0 : singleVal) && (
          <button onClick={(e) => { e.stopPropagation(); onChange?.(isMulti ? [] : ''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[300], display: 'flex', padding: 0 }}>
            <X size={14} />
          </button>
        )}
        <ChevronDown size={16} color={t.colors.neutral[300]} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease', flexShrink: 0 }} />
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md,
          zIndex: 50, maxHeight: 240, overflowY: 'auto',
        }}>
          {filtered.length === 0 ? (
            <div style={{ padding: 16, textAlign: 'center', color: t.colors.neutral[300], fontSize: 13, fontFamily: font }}>Sin resultados</div>
          ) : (
            filtered.map((opt) => {
              const isSelected = isMulti ? selected.includes(opt.value) : singleVal === opt.value;
              return (
                <button key={opt.value} onClick={() => !opt.disabled && handleSelect(opt.value)} disabled={opt.disabled} style={{
                  width: '100%', padding: '8px 12px', border: 'none', background: isSelected ? 'rgba(224,77,54,0.06)' : 'transparent',
                  textAlign: 'left', fontFamily: font, fontSize: 14, cursor: opt.disabled ? 'not-allowed' : 'pointer',
                  color: opt.disabled ? t.colors.neutral[300] : t.colors.neutral[900],
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
                  onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = t.colors.neutral[100]; }}
                  onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = isSelected ? 'rgba(224,77,54,0.06)' : 'transparent'; }}
                >
                  {opt.label}
                  {isSelected && <Check size={14} color={t.colors.brand.primary} />}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   KDescriptions — Lista clave-valor
   ═══════════════════════════════════════════════ */
export interface KDescriptionItem {
  label: React.ReactNode;
  children: React.ReactNode;
  span?: number;
}

export interface KDescriptionsProps {
  title?: React.ReactNode;
  extra?: React.ReactNode;
  bordered?: boolean;
  column?: number;
  layout?: 'horizontal' | 'vertical';
  items: KDescriptionItem[];
  className?: string;
}

export function KDescriptions({ title, extra, bordered, column = 3, layout = 'horizontal', items, className }: KDescriptionsProps) {
  const rows: KDescriptionItem[][] = [];
  let currentRow: KDescriptionItem[] = [];
  let currentSpan = 0;
  items.forEach((item) => {
    const span = item.span || 1;
    if (currentSpan + span > column) { rows.push(currentRow); currentRow = []; currentSpan = 0; }
    currentRow.push(item);
    currentSpan += span;
    if (currentSpan >= column) { rows.push(currentRow); currentRow = []; currentSpan = 0; }
  });
  if (currentRow.length) rows.push(currentRow);

  return (
    <div className={className} style={{ fontFamily: font }}>
      {(title || extra) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          {title && <KText variant="body-lg" color="navy">{title}</KText>}
          {extra}
        </div>
      )}
      <div style={{
        border: bordered ? `1px solid ${t.colors.neutral[200]}` : 'none',
        borderRadius: bordered ? t.radius.lg : 0, overflow: 'hidden',
      }}>
        {rows.map((row, ri) => (
          <div key={ri} style={{
            display: 'grid', gridTemplateColumns: `repeat(${column}, 1fr)`,
            borderBottom: ri < rows.length - 1 ? `1px solid ${t.colors.neutral[200]}` : 'none',
          }}>
            {row.map((item, ci) => (
              <div key={ci} style={{
                gridColumn: `span ${item.span || 1}`, padding: bordered ? '12px 16px' : '8px 0',
                borderRight: bordered && ci < row.length - 1 ? `1px solid ${t.colors.neutral[200]}` : 'none',
              }}>
                {layout === 'horizontal' ? (
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontSize: 13, color: t.colors.neutral[400], minWidth: 100, flexShrink: 0, fontWeight: 500 }}>{item.label}</span>
                    <span style={{ fontSize: 14, color: t.colors.neutral[900] }}>{item.children}</span>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: 12, color: t.colors.neutral[400], marginBottom: 4, fontWeight: 500 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: t.colors.neutral[900] }}>{item.children}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   KPopconfirm — Popover de confirmación
   ═══════════════════════════════════════════════ */
export interface KPopconfirmProps {
  children: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  icon?: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
}

export function KPopconfirm({
  children, title, description, okText = 'Confirmar', cancelText = 'Cancelar',
  onConfirm, onCancel, icon, placement = 'top', disabled,
}: KPopconfirmProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (onConfirm) {
      const result = onConfirm();
      if (result instanceof Promise) { setLoading(true); await result; setLoading(false); }
    }
    setOpen(false);
  };

  return (
    <RadixPopover.Root open={open} onOpenChange={(v) => { if (!disabled) setOpen(v); }}>
      <RadixPopover.Trigger asChild>{children}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content side={placement} sideOffset={8} style={{
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.lg,
          padding: 16, fontFamily: font, zIndex: 100, maxWidth: 300,
        }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <span style={{ color: t.colors.brand.accent, flexShrink: 0, marginTop: 2 }}>
              {icon || <AlertTriangle size={16} />}
            </span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: t.colors.neutral[900] }}>{title}</div>
              {description && <div style={{ fontSize: 13, color: t.colors.neutral[500], marginTop: 4 }}>{description}</div>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <KButton variant="ghost" size="sm" onClick={() => { onCancel?.(); setOpen(false); }}>{cancelText}</KButton>
            <KButton variant="primary" size="sm" loading={loading} onClick={handleConfirm}>{okText}</KButton>
          </div>
          <RadixPopover.Arrow style={{ fill: t.colors.neutral[50] }} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

/* ═══════════════════════════════════════════════
   KResult — Página de resultado/estado
   ═══════════════════════════════════════════════ */
export type KResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

export interface KResultProps {
  status: KResultStatus;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
}

const resultIconMap: Record<KResultStatus, { icon: React.ReactNode; color: string }> = {
  success: { icon: <CheckCircle size={64} />, color: khorTokens.colors.feedback.success },
  error: { icon: <XCircle size={64} />, color: khorTokens.colors.feedback.error },
  info: { icon: <Info size={64} />, color: khorTokens.colors.brand.navy },
  warning: { icon: <AlertCircle size={64} />, color: khorTokens.colors.brand.accent },
  '404': { icon: <FileX size={64} />, color: khorTokens.colors.neutral[400] },
  '403': { icon: <Lock size={64} />, color: khorTokens.colors.brand.accent },
  '500': { icon: <ServerCrash size={64} />, color: khorTokens.colors.feedback.error },
};

export function KResult({ status, title, subTitle, icon, extra, className }: KResultProps) {
  const cfg = resultIconMap[status];
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, textAlign: 'center', fontFamily: font }}>
      <div style={{ color: cfg.color, marginBottom: 24 }}>{icon || cfg.icon}</div>
      <h2 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: t.colors.neutral[900], marginBottom: 8 }}>{title}</h2>
      {subTitle && <p style={{ margin: 0, fontSize: 14, color: t.colors.neutral[500], maxWidth: 400, lineHeight: 1.6 }}>{subTitle}</p>}
      {extra && <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>{extra}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   KTimeline — Línea de tiempo
   ═══════════════════════════════════════════════ */
export interface KTimelineItem {
  children: React.ReactNode;
  color?: string;
  dot?: React.ReactNode;
  label?: React.ReactNode;
}

export interface KTimelineProps {
  items: KTimelineItem[];
  mode?: 'left' | 'alternate' | 'right';
  pending?: boolean | React.ReactNode;
  reverse?: boolean;
  className?: string;
}

export function KTimeline({ items, mode = 'left', pending, reverse, className }: KTimelineProps) {
  const displayItems = reverse ? [...items].reverse() : items;
  const pendingDot = <div className="animate-pulse" style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: t.colors.brand.primary }} />;

  return (
    <div className={className} style={{ position: 'relative', fontFamily: font }}>
      {displayItems.map((item, i) => {
        const isLast = i === displayItems.length - 1 && !pending;
        const isRight = mode === 'right' || (mode === 'alternate' && i % 2 === 1);
        const dotColor = item.color || t.colors.brand.primary;

        return (
          <div key={i} style={{
            display: 'flex', flexDirection: isRight ? 'row-reverse' : 'row',
            gap: 16, position: 'relative', paddingBottom: isLast ? 0 : 24,
          }}>
            {/* Line + Dot */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 20 }}>
              <div style={{
                width: item.dot ? undefined : 10, height: item.dot ? undefined : 10,
                borderRadius: '50%', backgroundColor: item.dot ? undefined : dotColor,
                border: item.dot ? 'none' : `2px solid ${t.colors.neutral[50]}`,
                boxShadow: item.dot ? 'none' : `0 0 0 2px ${dotColor}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1, flexShrink: 0,
              }}>
                {item.dot}
              </div>
              {!isLast && (
                <div style={{ width: 2, flex: 1, backgroundColor: t.colors.neutral[200], marginTop: 4 }} />
              )}
            </div>
            {/* Content */}
            <div style={{ flex: 1, paddingTop: 0, textAlign: isRight ? 'right' : 'left' }}>
              {item.label && <div style={{ fontSize: 12, color: t.colors.neutral[400], marginBottom: 4 }}>{item.label}</div>}
              <div style={{ fontSize: 14, color: t.colors.neutral[900], lineHeight: 1.5 }}>{item.children}</div>
            </div>
          </div>
        );
      })}
      {pending && (
        <div style={{ display: 'flex', gap: 16, position: 'relative' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 20 }}>
            {pendingDot}
          </div>
          <div style={{ fontSize: 14, color: t.colors.neutral[400] }}>
            {typeof pending === 'boolean' ? 'Cargando...' : pending}
          </div>
        </div>
      )}
    </div>
  );
}