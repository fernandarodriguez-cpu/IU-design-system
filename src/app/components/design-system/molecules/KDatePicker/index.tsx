import React, { useState } from 'react';
import { format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';
import { DayPicker, DateRange } from 'react-day-picker';
import { CalendarIcon, X } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';
import { cn } from '../../../../../imports/utils';
import { KPopoverRoot, KPopoverTrigger, KPopoverContent } from '../KPopover';

const t = khorTokens;

/* ═══════════════════════════════════════════════
   KDatePicker — Selector de fecha (Headless v4)
   ═══════════════════════════════════════════════ */
export interface KDateRange {
  from?: Date;
  to?: Date;
}

export interface KDateRangePickerProps {
  value?: KDateRange;
  onChange?: (range: KDateRange | undefined) => void;
  placeholder?: [string, string];
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'small' | 'middle' | 'large';
  allowClear?: boolean;
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
  // Props de paridad AntD
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
  allowClear?: boolean;
  showTime?: boolean | object;
}

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
  picker = 'date',
}: KDatePickerProps) {
  const [open, setOpen] = useState(false);

  const resolvedSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : size === 'middle' ? 'md' : (size as any);
  const heights = { sm: 'h-8 text-xs', md: 'h-10 text-sm', lg: 'h-12 text-base' };

  const statusClasses = status === 'error'
    ? 'border-khor-feedback-error focus:ring-khor-feedback-error'
    : status === 'warning'
      ? 'border-khor-feedback-warning focus:ring-khor-feedback-warning'
      : 'border-khor-neutral-200 focus:ring-khor-primary-light focus:border-khor-primary hover:border-khor-primary-light';

  const disabledClasses = disabled 
    ? 'bg-khor-neutral-100 cursor-not-allowed text-khor-neutral-400' 
    : 'bg-khor-surface-page text-khor-neutral-900 cursor-pointer';

  return (
    <div className={cn("relative w-full", className)} style={style}>
      <KPopoverRoot open={open} onOpenChange={disabled ? undefined : setOpen}>
        <KPopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex w-full items-center justify-between px-3 border rounded-md shadow-sm transition-all outline-none focus:ring-2 font-primary",
              heights[resolvedSize as keyof typeof heights] || heights.md,
              statusClasses,
              disabledClasses
            )}
          >
            <div className="flex items-center gap-2 overflow-hidden flex-1">
              <CalendarIcon className="w-4 h-4 text-khor-neutral-400 shrink-0 opacity-70" />
              <span className={cn("truncate", !value && 'text-khor-neutral-400')}>
                {value && isValid(value) ? format(value, 'dd/MM/yyyy', { locale: es }) : placeholder}
              </span>
            </div>
            {allowClear && value && !disabled && (
              <span 
                role="button"
                tabIndex={0}
                className="ml-2 hover:text-khor-feedback-error transition-colors p-1"
                onClick={(e) => { e.stopPropagation(); onChange?.(undefined); }}
              >
                <X className="w-3.5 h-3.5" />
              </span>
            )}
          </button>
        </KPopoverTrigger>
        <KPopoverContent align="start" className="p-0 border rounded-lg shadow-lg w-auto bg-khor-surface-page z-[100] mt-1">
          <DayPicker
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
            locale={es}
            disabled={[
              minDate ? { before: minDate } : false,
              maxDate ? { after: maxDate } : false,
            ].filter(Boolean) as any}
            classNames={{
              months: "p-3",
              caption: "flex justify-center pt-1 relative items-center mb-4",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-khor-neutral-100 rounded-md transition-all",
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse",
              head_row: "flex",
              head_cell: "text-khor-neutral-500 rounded-md w-9 font-normal text-[0.8rem] capitalize",
              row: "flex w-full mt-2",
              cell: "h-9 w-9 text-center text-sm p-0 relative rounded-md transition-colors",
              day: "h-9 w-9 p-0 font-normal hover:bg-khor-neutral-100 rounded-md transition-all",
              day_selected: "bg-khor-primary text-white hover:bg-khor-primary hover:text-white rounded-md font-semibold",
              day_today: "font-semibold bg-khor-neutral-50 text-khor-primary",
              day_outside: "text-khor-neutral-300 opacity-50",
              day_disabled: "text-khor-neutral-300 opacity-50 bg-transparent cursor-not-allowed",
              day_hidden: "invisible",
            }}
          />
        </KPopoverContent>
      </KPopoverRoot>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   KDateRangePicker — Selector de Rango (Headless v4)
   ═══════════════════════════════════════════════ */
export interface KDateRange {
  from?: Date;
  to?: Date;
}

export interface KDateRangePickerProps {
  value?: KDateRange;
  onChange?: (range: KDateRange | undefined) => void;
  placeholder?: [string, string];
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'small' | 'middle' | 'large';
  allowClear?: boolean;
}

export function KDateRangePicker({
  value,
  onChange,
  placeholder = ['Inicio', 'Fin'],
  disabled,
  className,
  size = 'md',
  allowClear = true,
}: KDateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const resolvedSize = size === 'small' ? 'sm' : size === 'large' ? 'lg' : size === 'middle' ? 'md' : (size as any);
  const heights = { sm: 'h-8 text-xs', md: 'h-10 text-sm', lg: 'h-12 text-base' };

  const handleSelect = (range: DateRange | undefined) => {
    if (!range) {
      onChange?.(undefined);
      return;
    }
    onChange?.({ from: range.from, to: range.to });
  };

  const formattedValue = value?.from
    ? value.to
      ? `${format(value.from, 'dd/MM/yyyy', { locale: es })} - ${format(value.to, 'dd/MM/yyyy', { locale: es })}`
      : `${format(value.from, 'dd/MM/yyyy', { locale: es })} - ${placeholder[1]}`
    : `${placeholder[0]} - ${placeholder[1]}`;

  return (
    <div className={cn("relative w-full", className)}>
      <KPopoverRoot open={open} onOpenChange={disabled ? undefined : setOpen}>
        <KPopoverTrigger asChild>
          <button
            type="button"
            disabled={disabled}
            className={cn(
              "flex w-full items-center justify-between px-3 border border-khor-neutral-200 rounded-md shadow-sm transition-all outline-none focus:ring-2 focus:ring-khor-primary-light font-primary",
              heights[resolvedSize as keyof typeof heights] || heights.md,
              disabled ? 'bg-khor-neutral-100 cursor-not-allowed text-khor-neutral-400' : 'bg-khor-surface-page text-khor-neutral-900 cursor-pointer hover:border-khor-primary-light'
            )}
          >
            <div className="flex items-center gap-2 overflow-hidden flex-1">
              <CalendarIcon className="w-4 h-4 text-khor-neutral-400 shrink-0 opacity-70" />
              <span className={cn("truncate", !value?.from && 'text-khor-neutral-400')}>
                {formattedValue}
              </span>
            </div>
            {allowClear && (value?.from || value?.to) && !disabled && (
              <span 
                role="button"
                tabIndex={0}
                className="ml-2 hover:text-khor-feedback-error transition-colors p-1"
                onClick={(e) => { e.stopPropagation(); onChange?.(undefined); }}
              >
                <X className="w-3.5 h-3.5" />
              </span>
            )}
          </button>
        </KPopoverTrigger>
        <KPopoverContent align="start" className="p-0 border rounded-lg shadow-lg w-auto bg-khor-surface-page z-[100] mt-1">
          <DayPicker
            mode="range"
            selected={value ? { from: value.from, to: value.to } : undefined}
            onSelect={handleSelect}
            locale={es}
            numberOfMonths={2}
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 p-3",
              table: "w-full border-collapse",
              day: "h-9 w-9 p-0 font-normal hover:bg-khor-neutral-100 rounded-md transition-all",
              day_range_start: "bg-khor-primary text-white rounded-md",
              day_range_end: "bg-khor-primary text-white rounded-md",
              day_selected: "bg-khor-primary-light text-khor-primary",
              day_today: "font-semibold bg-khor-neutral-50 text-khor-primary",
            }}
          />
        </KPopoverContent>
      </KPopoverRoot>
    </div>
  );
}

export default KDatePicker;
