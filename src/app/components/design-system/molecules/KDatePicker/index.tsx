import React, { useState, useEffect } from 'react';
import { format, isValid, addDays, startOfDay, endOfDay, subDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { DayPicker, DateRange } from 'react-day-picker';
import { CalendarIcon, X, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';
import { cn } from '../../../../../imports/utils';
import { KPopoverRoot, KPopoverTrigger, KPopoverContent } from '../KPopover';
import { KButton } from '../../atoms/KButton';

const t = khorTokens;

/* ═══════════════════════════════════════════════
   Types & Interfaces
   ═══════════════════════════════════════════════ */

export interface KDateRange {
  from?: Date;
  to?: Date;
}

export interface KDatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  status?: 'error' | 'warning';
  size?: 'sm' | 'md' | 'lg' | 'small' | 'middle' | 'large';
  className?: string;
  style?: React.CSSProperties;
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
  allowClear?: boolean;
  showTime?: boolean;
}

export interface KDateRangePickerProps {
  value?: KDateRange;
  onChange?: (range: KDateRange | undefined) => void;
  placeholder?: [string, string];
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'small' | 'middle' | 'large';
  allowClear?: boolean;
  showTime?: boolean;
  presets?: { label: string; value: [Date, Date] }[];
}

/* ═══════════════════════════════════════════════
   KDatePicker — Single Selector
   ═══════════════════════════════════════════════ */
export function KDatePicker({
  value,
  onChange,
  placeholder = 'Selecciona una fecha',
  disabled,
  minDate,
  maxDate,
  status,
  size = 'md',
  className,
  style,
  allowClear = true,
  showTime = false,
}: KDatePickerProps) {
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date | undefined>(value);

  useEffect(() => { setTempDate(value); }, [value]);

  const resolvedSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : size === 'middle' ? 'md' : (size as any);
  const heights = { sm: 'h-8 text-xs', md: 'h-10 text-sm', lg: 'h-12 text-base' };

  const handleConfirm = () => {
    onChange?.(tempDate);
    setOpen(false);
  };

  return (
    <div className={cn("relative w-full font-primary", className)} style={style}>
      <KPopoverRoot open={open} onOpenChange={disabled ? undefined : setOpen}>
        <KPopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex w-full items-center justify-between px-3 border rounded-md shadow-sm transition-all outline-none focus:ring-2",
              heights[resolvedSize as keyof typeof heights] || heights.md,
              status === 'error' ? "border-khor-feedback-error focus:ring-khor-feedback-error" : "border-khor-neutral-200 focus:ring-khor-primary-light",
              disabled ? "bg-khor-neutral-100 cursor-not-allowed" : "bg-khor-surface-page cursor-pointer hover:border-khor-primary"
            )}
          >
            <div className="flex items-center gap-2 overflow-hidden flex-1">
              <CalendarIcon className="w-4 h-4 text-khor-neutral-400 shrink-0" />
              <span className={cn("truncate", !value && 'text-khor-neutral-400')}>
                {value && isValid(value) ? format(value, showTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy', { locale: es }) : placeholder}
              </span>
            </div>
            {allowClear && value && !disabled && (
              <X className="w-3.5 h-3.5 text-khor-neutral-400 hover:text-khor-feedback-error" onClick={(e) => { e.stopPropagation(); onChange?.(undefined); }} />
            )}
          </button>
        </KPopoverTrigger>
        <KPopoverContent align="start" className="p-0 border rounded-lg shadow-xl w-auto bg-khor-surface-page z-[100] mt-1 overflow-hidden">
          <DayPicker
            mode="single"
            selected={tempDate}
            onSelect={(date) => {
              setTempDate(date);
              if (!showTime) {
                onChange?.(date);
                setOpen(false);
              }
            }}
            locale={es}
          />
          {showTime && (
            <div className="p-3 border-t bg-khor-neutral-50 flex items-center justify-between gap-4">
              <input 
                type="time" 
                className="text-sm font-bold p-1 border rounded"
                value={tempDate ? format(tempDate, 'HH:mm') : '00:00'}
                onChange={(e) => {
                  if (tempDate) {
                    const [h, m] = e.target.value.split(':');
                    const d = new Date(tempDate);
                    d.setHours(parseInt(h), parseInt(m));
                    setTempDate(d);
                  }
                }}
              />
              <KButton size="sm" onClick={handleConfirm}>OK</KButton>
            </div>
          )}
        </KPopoverContent>
      </KPopoverRoot>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   KDateRangePicker — Selector de Rango
   ═══════════════════════════════════════════════ */
export function KDateRangePicker({
  value,
  onChange,
  placeholder = ['Inicio', 'Fin'],
  disabled,
  className,
  size = 'md',
  allowClear = true,
  showTime = false,
  presets = [],
}: KDateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [tempRange, setTempRange] = useState<KDateRange | undefined>(value);

  useEffect(() => { setTempRange(value); }, [value]);

  const resolvedSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : size === 'middle' ? 'md' : (size as any);
  const heights = { sm: 'h-8 text-xs', md: 'h-10 text-sm', lg: 'h-12 text-base' };

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) return;
    const newRange = { from: range.from, to: range.to };
    setTempRange(newRange);
    if (!showTime && newRange.from && newRange.to) {
      onChange?.(newRange);
      setOpen(false);
    }
  };

  const handleConfirm = () => {
    onChange?.(tempRange);
    setOpen(false);
  };

  const formattedValue = tempRange?.from
    ? tempRange.to
      ? `${format(tempRange.from, showTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy')} - ${format(tempRange.to, showTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy')}`
      : `${format(tempRange.from, showTime ? 'dd/MM/yyyy HH:mm' : 'dd/MM/yyyy')} - ${placeholder[1]}`
    : `${placeholder[0]} - ${placeholder[1]}`;

  return (
    <div className={cn("relative w-full font-primary", className)}>
      <KPopoverRoot open={open} onOpenChange={disabled ? undefined : setOpen}>
        <KPopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex w-full items-center justify-between px-3 border border-khor-neutral-200 rounded-md shadow-sm transition-all outline-none focus:ring-2 focus:ring-khor-primary-light",
              heights[resolvedSize as keyof typeof heights] || heights.md,
              disabled ? 'bg-khor-neutral-100 cursor-not-allowed' : 'bg-khor-surface-page hover:border-khor-primary'
            )}
          >
            <div className="flex items-center gap-2 overflow-hidden flex-1">
              <CalendarIcon className="w-4 h-4 text-khor-neutral-400" />
              <span className={cn("truncate text-sm", !tempRange?.from && 'text-khor-neutral-400')}>
                {formattedValue}
              </span>
            </div>
            {allowClear && tempRange?.from && !disabled && (
              <X className="w-3.5 h-3.5 text-khor-neutral-400" onClick={(e) => { e.stopPropagation(); onChange?.(undefined); }} />
            )}
          </button>
        </KPopoverTrigger>
        <KPopoverContent align="start" className="p-0 border rounded-lg shadow-2xl w-auto bg-khor-surface-page z-[100] mt-1 overflow-hidden flex flex-col sm:flex-row">
          {presets.length > 0 && (
            <div className="flex flex-col gap-1 p-3 border-r border-khor-neutral-100 bg-khor-neutral-50 min-w-32">
              <span className="text-[10px] font-bold text-khor-neutral-400 uppercase mb-2">Atajos</span>
              {presets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => { onChange?.({ from: p.value[0], to: p.value[1] }); setOpen(false); }}
                  className="text-left py-1 text-xs hover:text-khor-primary"
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}
          <div className="flex flex-col">
            <DayPicker
              mode="range"
              selected={tempRange ? { from: tempRange.from, to: tempRange.to } : undefined}
              onSelect={handleSelect}
              locale={es}
              numberOfMonths={2}
              classNames={{
                months: "flex flex-col sm:flex-row gap-4 p-4",
                head_cell: "text-khor-neutral-400 font-normal text-[0.8rem] pb-2",
                day: "h-9 w-9 p-0 font-normal hover:bg-khor-neutral-100 rounded-md transition-all relative aria-selected:bg-khor-primary aria-selected:text-white",
                day_range_start: "bg-khor-primary text-white rounded-l-md rounded-r-none",
                day_range_end: "bg-khor-primary text-white rounded-r-md rounded-l-none",
                day_range_middle: "bg-khor-primary-light/30 text-khor-primary rounded-none",
                day_today: "font-bold text-khor-primary underline underline-offset-4",
              }}
            />
            {(showTime || tempRange?.from) && (
              <div className="p-3 border-t bg-khor-neutral-50 flex flex-col gap-3">
                {showTime && (
                  <div className="flex justify-around bg-white p-2 border rounded shadow-sm">
                    <input 
                      type="time" 
                      value={tempRange?.from ? format(tempRange.from, 'HH:mm') : '00:00'}
                      onChange={(e) => {
                        if (tempRange?.from) {
                          const [h, m] = e.target.value.split(':');
                          const d = new Date(tempRange.from);
                          d.setHours(parseInt(h), parseInt(m));
                          setTempRange({ ...tempRange, from: d });
                        }
                      }}
                      className="text-xs font-bold"
                    />
                    <span className="text-khor-neutral-300">|</span>
                    <input 
                      type="time" 
                      value={tempRange?.to ? format(tempRange.to, 'HH:mm') : '23:59'}
                      onChange={(e) => {
                        if (tempRange?.to) {
                          const [h, m] = e.target.value.split(':');
                          const d = new Date(tempRange.to);
                          d.setHours(parseInt(h), parseInt(m));
                          setTempRange({...tempRange, to: d });
                        }
                      }}
                      className="text-xs font-bold"
                    />
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <KButton size="sm" variant="outline" onClick={() => setOpen(false)}>Cancelar</KButton>
                  <KButton size="sm" onClick={handleConfirm} disabled={!tempRange?.from || !tempRange?.to}>Aplicar</KButton>
                </div>
              </div>
            )}
          </div>
        </KPopoverContent>
      </KPopoverRoot>
    </div>
  );
}

export default KDatePicker;
