/* ─── KDatePicker — Figma tokens (187675-42310 | 187677-9695 | 187677-9905)
   Input height  : sm=32px | md=36px | lg=40px  (mirrors KInput)
   Focus/accent  : #E04D36   |  Focus ring: rgba(224,77,54,0.15)
   Border        : #D1D5DB default | #D32F2F error | #F59E0B warning
   Disabled      : bg #F3F4F6, border #E5E7EB, text #9CA3AF
   Calendar today: ring-1 ring-[#E04D36]
   Calendar sel  : bg-[#E04D36] text-white
   Range middle  : bg-[#FEE8E4]
──────────────────────────────────────────────────────────────────────────────── */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { format, isValid, isToday, isSameDay, isBefore, isAfter } from 'date-fns';
import { CalendarDays, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
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

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// ─── Build 6-week grid (42 cells, Mon-start) ─────────────────────────────────
function buildGrid(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7; // Mon=0
  const grid: Date[] = [];
  for (let i = startOffset; i > 0; i--) grid.push(new Date(year, month, 1 - i));
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) grid.push(new Date(year, month, i));
  while (grid.length < 42) {
    const prev = grid[grid.length - 1];
    const d = new Date(prev);
    d.setDate(d.getDate() + 1);
    grid.push(d);
  }
  return grid;
}

// ─── Calendar nav header: << < Label > >> ─────────────────────────────────────
function CalendarNav({
  label, onPrevYear, onNextYear, onPrevMonth, onNextMonth,
  showPrevYear = true, showNextYear = true, showPrevMonth = true, showNextMonth = true,
}: {
  label: string;
  onPrevYear?: () => void; onNextYear?: () => void;
  onPrevMonth?: () => void; onNextMonth?: () => void;
  showPrevYear?: boolean; showNextYear?: boolean;
  showPrevMonth?: boolean; showNextMonth?: boolean;
}) {
  const nb = 'p-1 rounded hover:bg-[#F3F4F6] text-[#9CA3AF] hover:text-[#374151] transition-colors';
  return (
    <div className="flex items-center justify-between mb-3 px-1">
      <div className="flex">
        {showPrevYear  && <button type="button" className={nb} onClick={onPrevYear}><ChevronsLeft size={13} /></button>}
        {showPrevMonth && <button type="button" className={nb} onClick={onPrevMonth}><ChevronLeft size={13} /></button>}
      </div>
      <span className="text-[13px] font-semibold text-[#374151] select-none">{label}</span>
      <div className="flex">
        {showNextMonth && <button type="button" className={nb} onClick={onNextMonth}><ChevronRight size={13} /></button>}
        {showNextYear  && <button type="button" className={nb} onClick={onNextYear}><ChevronsRight size={13} /></button>}
      </div>
    </div>
  );
}

// ─── Day grid ─────────────────────────────────────────────────────────────────
interface DayGridProps {
  year: number; month: number;
  selected?: Date;
  rangeStart?: Date; rangeEnd?: Date; hoverDay?: Date | null;
  onDayClick: (d: Date) => void;
  onDayHover?: (d: Date | null) => void;
  minDate?: Date; maxDate?: Date;
}

function DayGrid({ year, month, selected, rangeStart, rangeEnd, hoverDay, onDayClick, onDayHover, minDate, maxDate }: DayGridProps) {
  const grid = buildGrid(year, month);
  const effectiveEnd = rangeEnd || (hoverDay ?? undefined);
  const hasRange = Boolean(rangeStart && effectiveEnd);
  const [lo, hi] = hasRange
    ? (isBefore(rangeStart!, effectiveEnd!) ? [rangeStart!, effectiveEnd!] : [effectiveEnd!, rangeStart!])
    : [null, null];

  return (
    <div style={{ width: 252 }}>
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-[11px] font-medium text-[#9CA3AF] text-center h-7 flex items-center justify-center">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {grid.map((day, i) => {
          const inMonth    = day.getMonth() === month;
          const todayDay   = isToday(day);
          const isSel      = selected ? isSameDay(day, selected) : false;
          const isStart    = rangeStart ? isSameDay(day, rangeStart) : false;
          const isEnd      = effectiveEnd ? isSameDay(day, effectiveEnd) : false;
          const inRange    = lo && hi && isAfter(day, lo) && isBefore(day, hi);
          const isPicked   = isSel || isStart || isEnd;
          const sameEnds   = hasRange && rangeStart && effectiveEnd && isSameDay(rangeStart, effectiveEnd);
          const isDisabled = Boolean((minDate && isBefore(day, minDate)) || (maxDate && isAfter(day, maxDate)));

          return (
            <div key={i} className="relative flex items-center justify-center h-8">
              {/* Range stripe */}
              {hasRange && !sameEnds && (inRange || isStart || isEnd) && (
                <div className={cn(
                  'absolute inset-y-0 bg-[#FEE8E4] pointer-events-none',
                  inRange  && 'inset-x-0',
                  isStart  && !isEnd  && 'left-1/2 right-0',
                  isEnd    && !isStart && 'left-0 right-1/2',
                  isStart  && isEnd   && 'hidden',
                )} />
              )}
              <button
                type="button"
                disabled={isDisabled}
                onClick={() => onDayClick(day)}
                onMouseEnter={() => onDayHover?.(day)}
                onMouseLeave={() => onDayHover?.(null)}
                className={cn(
                  'relative w-7 h-7 flex items-center justify-center rounded-full',
                  'text-[12px] font-primary transition-all select-none z-10',
                  inMonth ? (isPicked ? 'text-white' : 'text-[#374151]') : 'text-[#D1D5DB]',
                  isDisabled && 'opacity-40 cursor-not-allowed pointer-events-none',
                  !isDisabled && !isPicked && 'hover:bg-[#F3F4F6]',
                  todayDay  && !isPicked && 'ring-1 ring-[#E04D36] font-semibold',
                  isPicked  && 'bg-[#E04D36] text-white',
                )}
              >
                {day.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Month grid (3 × 4) ───────────────────────────────────────────────────────
function MonthGrid({ year, selected, onChange }: { year: number; selected?: Date; onChange: (d: Date) => void }) {
  return (
    <div className="grid grid-cols-3 gap-1 p-2" style={{ width: 252 }}>
      {MONTH_NAMES.map((m, i) => {
        const isSel = Boolean(selected && selected.getMonth() === i && selected.getFullYear() === year);
        return (
          <button key={m} type="button"
            onClick={() => onChange(new Date(year, i, selected?.getDate() ?? 1))}
            className={cn(
              'py-2 rounded-md text-[13px] font-primary transition-colors',
              isSel ? 'bg-[#E04D36] text-white font-semibold' : 'hover:bg-[#F3F4F6] text-[#374151]',
            )}
          >{m}</button>
        );
      })}
    </div>
  );
}

// ─── Year grid (decade: 12 cells = prev + 10 + next) ─────────────────────────
function YearGrid({ decadeStart, selected, onChange }: { decadeStart: number; selected?: Date; onChange: (d: Date) => void }) {
  const years = Array.from({ length: 12 }, (_, i) => decadeStart - 1 + i);
  return (
    <div className="grid grid-cols-3 gap-1 p-2" style={{ width: 252 }}>
      {years.map(y => {
        const isSel    = selected?.getFullYear() === y;
        const inDecade = y >= decadeStart && y <= decadeStart + 9;
        return (
          <button key={y} type="button"
            onClick={() => onChange(new Date(y, selected?.getMonth() ?? 0, 1))}
            className={cn(
              'py-2 rounded-md text-[13px] font-primary transition-colors',
              isSel     ? 'bg-[#E04D36] text-white font-semibold' :
              inDecade  ? 'hover:bg-[#F3F4F6] text-[#374151]' : 'hover:bg-[#F3F4F6] text-[#D1D5DB]',
            )}
          >{y}</button>
        );
      })}
    </div>
  );
}

// ─── Scrollable time column ───────────────────────────────────────────────────
const HH_OPTIONS = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const MS_OPTIONS = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

function TimeCol({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
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
    <div
      ref={ref}
      onScroll={handleScroll}
      className="overflow-y-auto"
      style={{ height: ITEM_H * 6, scrollSnapType: 'y mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div style={{ paddingTop: ITEM_H * 2.5, paddingBottom: ITEM_H * 2.5 }}>
        {options.map(opt => (
          <div key={opt}
            onClick={() => { onChange(opt); scrollTo(opt); }}
            style={{ height: ITEM_H, scrollSnapAlign: 'start' }}
            className={cn(
              'flex items-center justify-center text-[13px] cursor-pointer font-primary select-none w-12 rounded-md transition-all',
              opt === value ? 'bg-[#E04D36] text-white font-semibold shadow-sm' : 'text-[#374151] hover:bg-[#F3F4F6]',
            )}
          >{opt}</div>
        ))}
      </div>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface KDateRange { from?: Date; to?: Date; }

export type KDatePickerType          = 'date' | 'datetime' | 'month' | 'year';
export type KDatePickerSize          = 'sm' | 'md' | 'lg';
export type KDatePickerStatus        = 'default' | 'error' | 'warning';
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

// ─── Trigger button style helper ─────────────────────────────────────────────
function triggerCls(status: KDatePickerStatus, disabled: boolean | undefined, open: boolean) {
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

// ─── KDatePicker ──────────────────────────────────────────────────────────────
export function KDatePicker({
  value, defaultValue, onChange,
  placeholder = 'Seleccionar día',
  disabled, minDate, maxDate,
  status = 'default', size = 'md',
  className, style,
  type = 'date', allowClear = true,
  label, labelPosition = 'top',
  required, optional, tooltip, helpText, block,
}: KDatePickerProps) {
  const s = SIZE[size];
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<Date | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internalValue;

  const [viewDate, setViewDate] = useState(() => current || new Date());
  const [decadeStart, setDecadeStart] = useState(() => Math.floor(((current || new Date()).getFullYear()) / 10) * 10);
  const [tempDay, setTempDay] = useState<Date | undefined>(current);
  const [timeH, setTimeH] = useState(() => current ? String(current.getHours()).padStart(2, '0') : '00');
  const [timeM, setTimeM] = useState(() => current ? String(current.getMinutes()).padStart(2, '0') : '00');
  const [timeS, setTimeS] = useState(() => current ? String(current.getSeconds()).padStart(2, '0') : '00');

  useEffect(() => {
    const v = isControlled ? value : internalValue;
    if (v) {
      setViewDate(new Date(v));
      setDecadeStart(Math.floor(v.getFullYear() / 10) * 10);
      setTempDay(v);
      setTimeH(String(v.getHours()).padStart(2, '0'));
      setTimeM(String(v.getMinutes()).padStart(2, '0'));
      setTimeS(String(v.getSeconds()).padStart(2, '0'));
    }
  }, [value, isControlled]); // eslint-disable-line react-hooks/exhaustive-deps

  const commit = (d: Date | undefined) => {
    if (!isControlled) setInternalValue(d);
    onChange?.(d);
    setOpen(false);
  };

  const handleDaySelect = (d: Date) => {
    if (type === 'datetime') {
      setTempDay(d);
    } else {
      commit(d);
    }
  };

  const handleNow = () => {
    const now = new Date();
    setTimeH(String(now.getHours()).padStart(2, '0'));
    setTimeM(String(now.getMinutes()).padStart(2, '0'));
    setTimeS(String(now.getSeconds()).padStart(2, '0'));
    setTempDay(now);
    setViewDate(now);
  };

  const handleAccept = () => {
    const base = tempDay || current || new Date();
    const nd = new Date(base);
    nd.setHours(parseInt(timeH), parseInt(timeM), parseInt(timeS));
    commit(nd);
  };

  const selectedForGrid = type === 'datetime' ? tempDay : current;

  const displayValue = current && isValid(current)
    ? type === 'month'
      ? `${MONTH_NAMES[current.getMonth()]} ${current.getFullYear()}`
    : type === 'year'
      ? String(current.getFullYear())
    : type === 'datetime'
      ? `${format(current, 'dd/MM/yyyy')} ${timeH}:${timeM}:${timeS}`
    : format(current, 'dd/MM/yyyy')
    : undefined;

  const prevYear  = () => setViewDate(d => { const n = new Date(d); n.setFullYear(n.getFullYear() - 1); return n; });
  const nextYear  = () => setViewDate(d => { const n = new Date(d); n.setFullYear(n.getFullYear() + 1); return n; });
  const prevMonth = () => setViewDate(d => { const n = new Date(d); n.setMonth(n.getMonth() - 1); return n; });
  const nextMonth = () => setViewDate(d => { const n = new Date(d); n.setMonth(n.getMonth() + 1); return n; });

  const popupContent = (
    <div className="border border-[#E5E7EB] rounded-lg shadow-xl bg-white overflow-hidden" style={{ marginTop: 4 }}>
      {/* Date / Datetime view */}
      {(type === 'date' || type === 'datetime') && (
        <div className="flex">
          <div className="p-4">
            <CalendarNav label={`${MONTH_NAMES[viewDate.getMonth()]} ${viewDate.getFullYear()}`}
              onPrevYear={prevYear} onNextYear={nextYear}
              onPrevMonth={prevMonth} onNextMonth={nextMonth} />
            <DayGrid year={viewDate.getFullYear()} month={viewDate.getMonth()}
              selected={selectedForGrid}
              onDayClick={handleDaySelect}
              minDate={minDate} maxDate={maxDate} />
          </div>
          {type === 'datetime' && (
            <div className="border-l border-[#F3F4F6] flex">
              {[{ label: 'HH', opts: HH_OPTIONS, val: timeH, set: setTimeH },
                { label: 'MM', opts: MS_OPTIONS, val: timeM, set: setTimeM },
                { label: 'SS', opts: MS_OPTIONS, val: timeS, set: setTimeS },
              ].map(col => (
                <div key={col.label} className="flex flex-col items-center px-2 pt-3 pb-2">
                  <div className="text-[10px] font-semibold text-[#9CA3AF] uppercase mb-1 tracking-wider">{col.label}</div>
                  <TimeCol options={col.opts} value={col.val} onChange={col.set} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Month view */}
      {type === 'month' && (
        <div className="p-4">
          <CalendarNav label={String(viewDate.getFullYear())}
            onPrevYear={prevYear} onNextYear={nextYear}
            showPrevMonth={false} showNextMonth={false} />
          <MonthGrid year={viewDate.getFullYear()} selected={current}
            onChange={(d) => commit(d)} />
        </div>
      )}

      {/* Year view */}
      {type === 'year' && (
        <div className="p-4">
          <CalendarNav label={`${decadeStart}–${decadeStart + 9}`}
            onPrevYear={() => setDecadeStart(d => d - 10)}
            onNextYear={() => setDecadeStart(d => d + 10)}
            showPrevMonth={false} showNextMonth={false} />
          <YearGrid decadeStart={decadeStart} selected={current}
            onChange={(d) => commit(d)} />
        </div>
      )}

      {/* Footer */}
      {(type === 'date' || type === 'datetime') && (
        <div className="border-t border-[#F3F4F6] px-4 py-2 flex items-center justify-between">
          {type === 'date' && (
            <button type="button" onClick={() => commit(new Date())}
              className="text-[12px] font-medium text-[#E04D36] hover:text-[#C43D28] transition-colors">
              Hoy
            </button>
          )}
          {type === 'datetime' && (
            <>
              <button type="button" onClick={handleNow}
                className="text-[12px] font-medium text-[#E04D36] hover:text-[#C43D28] transition-colors">
                Ahora
              </button>
              <button type="button" onClick={handleAccept}
                className="px-3 py-1 bg-[#E04D36] text-white text-[12px] font-medium rounded-md hover:bg-[#C43D28] transition-colors">
                Aceptar
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );

  const trigger = (
    <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button type="button" disabled={disabled}
          className={triggerCls(status, disabled, open)}
          style={{ height: s.h, paddingLeft: s.px, paddingRight: s.px }}>
          <span className={cn('flex-1 text-left truncate', displayValue ? (disabled ? 'text-[#9CA3AF]' : 'text-[#1e293b]') : 'text-[#9CA3AF]')}
            style={{ fontSize: s.fs }}>
            {displayValue || placeholder}
          </span>
          <CalendarDays style={{ width: s.iconSz, height: s.iconSz, marginLeft: 6, flexShrink: 0 }}
            className={disabled ? 'text-[#D1D5DB]' : 'text-[#9CA3AF]'} />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start" sideOffset={4}
          className="z-[200] outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          {popupContent}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );

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

// ─── KDateRangePicker ─────────────────────────────────────────────────────────
export function KDateRangePicker({
  value, defaultValue, onChange,
  placeholder = ['Fecha Inicio', 'Fecha fin'],
  disabled, minDate, maxDate,
  status = 'default', size = 'md',
  className, style,
  allowClear = true, presets = [],
  label, labelPosition = 'top',
  required, optional, tooltip, helpText, block,
}: KDateRangePickerProps) {
  const s = SIZE[size];
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<KDateRange | undefined>(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internalValue;

  // Two-step picking: start → end
  const [picking, setPicking] = useState<'start' | 'end'>('start');
  const [tempRange, setTempRange] = useState<KDateRange | undefined>(current);
  const [hoverDay, setHoverDay] = useState<Date | null>(null);

  // Left calendar view (right = left + 1 month)
  const [leftView, setLeftView] = useState<Date>(() => {
    const d = current?.from || new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const rightView = new Date(leftView.getFullYear(), leftView.getMonth() + 1, 1);

  useEffect(() => {
    if (!open) {
      setPicking('start');
      setHoverDay(null);
      setTempRange(current);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDayClick = (d: Date) => {
    if (picking === 'start') {
      setTempRange({ from: d, to: undefined });
      setPicking('end');
    } else {
      const from = tempRange?.from;
      if (from) {
        const [lo, hi] = isBefore(d, from) ? [d, from] : [from, d];
        setTempRange({ from: lo, to: hi });
        setPicking('start');
      }
    }
  };

  const handleAccept = () => {
    if (tempRange?.from && tempRange?.to) {
      if (!isControlled) setInternalValue(tempRange);
      onChange?.(tempRange);
      setOpen(false);
    }
  };

  const fmtDate = (d?: Date) => d && isValid(d) ? format(d, 'dd MMM yyyy') : undefined;
  const startText = fmtDate(current?.from) || placeholder[0];
  const endText   = fmtDate(current?.to)   || placeholder[1];
  const hasStart  = Boolean(current?.from);
  const hasEnd    = Boolean(current?.to);

  const prevYear  = () => setLeftView(d => { const n = new Date(d); n.setFullYear(n.getFullYear() - 1); return n; });
  const nextYear  = () => setLeftView(d => { const n = new Date(d); n.setFullYear(n.getFullYear() + 1); return n; });
  const prevMonth = () => setLeftView(d => { const n = new Date(d); n.setMonth(n.getMonth() - 1); return n; });
  const nextMonth = () => setLeftView(d => { const n = new Date(d); n.setMonth(n.getMonth() + 1); return n; });

  const popupContent = (
    <div className="border border-[#E5E7EB] rounded-lg shadow-xl bg-white overflow-hidden" style={{ marginTop: 4 }}>
      <div className="flex">
        {/* Left calendar */}
        <div className="p-4">
          <CalendarNav label={`${MONTH_NAMES[leftView.getMonth()]} ${leftView.getFullYear()}`}
            onPrevYear={prevYear} onPrevMonth={prevMonth}
            onNextYear={nextYear} onNextMonth={nextMonth}
            showNextMonth={false} showNextYear={false} />
          <DayGrid year={leftView.getFullYear()} month={leftView.getMonth()}
            rangeStart={tempRange?.from} rangeEnd={tempRange?.to}
            hoverDay={picking === 'end' ? hoverDay : null}
            onDayClick={handleDayClick}
            onDayHover={d => setHoverDay(d)}
            minDate={minDate} maxDate={maxDate} />
        </div>
        <div className="w-px bg-[#F3F4F6] self-stretch" />
        {/* Right calendar */}
        <div className="p-4">
          <CalendarNav label={`${MONTH_NAMES[rightView.getMonth()]} ${rightView.getFullYear()}`}
            onPrevYear={prevYear} onPrevMonth={prevMonth}
            onNextYear={nextYear} onNextMonth={nextMonth}
            showPrevMonth={false} showPrevYear={false} />
          <DayGrid year={rightView.getFullYear()} month={rightView.getMonth()}
            rangeStart={tempRange?.from} rangeEnd={tempRange?.to}
            hoverDay={picking === 'end' ? hoverDay : null}
            onDayClick={handleDayClick}
            onDayHover={d => setHoverDay(d)}
            minDate={minDate} maxDate={maxDate} />
        </div>
      </div>
      {/* Footer */}
      <div className="border-t border-[#F3F4F6] px-4 py-2 flex items-center justify-between">
        <span className="text-[11px] text-[#9CA3AF]">
          {picking === 'end' ? 'Selecciona fecha de fin' : 'Selecciona fecha de inicio'}
        </span>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => setOpen(false)}
            className="text-[12px] font-medium text-[#6B7280] hover:text-[#374151] transition-colors px-2 py-1 rounded">
            Cancelar
          </button>
          <button type="button" onClick={handleAccept}
            disabled={!tempRange?.from || !tempRange?.to}
            className="px-3 py-1 bg-[#E04D36] text-white text-[12px] font-medium rounded-md hover:bg-[#C43D28] transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );

  const trigger = (
    <PopoverPrimitive.Root open={open} onOpenChange={disabled ? undefined : setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button type="button" disabled={disabled}
          className={triggerCls(status, disabled, open)}
          style={{ height: s.h, paddingLeft: s.px, paddingRight: s.px }}>
          <span className={cn('truncate', hasStart ? (disabled ? 'text-[#9CA3AF]' : 'text-[#1e293b]') : 'text-[#9CA3AF]')}
            style={{ fontSize: s.fs }}>
            {startText}
          </span>
          <span className="mx-1.5 text-[#9CA3AF] shrink-0" style={{ fontSize: s.fs }}>→</span>
          <span className={cn('flex-1 truncate text-left', hasEnd ? (disabled ? 'text-[#9CA3AF]' : 'text-[#1e293b]') : 'text-[#9CA3AF]')}
            style={{ fontSize: s.fs }}>
            {endText}
          </span>
          <CalendarDays style={{ width: s.iconSz, height: s.iconSz, marginLeft: 6, flexShrink: 0 }}
            className={disabled ? 'text-[#D1D5DB]' : 'text-[#9CA3AF]'} />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="start" sideOffset={4}
          className="z-[200] outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        >
          {popupContent}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );

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

export default KDatePicker;
