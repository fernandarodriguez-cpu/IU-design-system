import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval,
  getYear,
  getMonth,
  setYear,
  setMonth
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../../../../../imports/utils';
import { KButton } from '../../atoms/KButton';

export interface KCalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  onPanelChange?: (date: Date, mode: 'month' | 'year') => void;
  dateCellRender?: (date: Date) => React.ReactNode;
  monthCellRender?: (date: Date) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KCalendar — Calendario de vista completa (Headless v4)
 * Implementación 100% nativa con date-fns y Tailwind. Soporta renderizado de celdas personalizado y navegación fluida.
 */
export function KCalendar({
  value = new Date(),
  onChange,
  onPanelChange,
  dateCellRender,
  monthCellRender,
  className,
  style,
}: KCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(value);

  const nextMonth = () => {
    const next = addMonths(currentMonth, 1);
    setCurrentMonth(next);
    onPanelChange?.(next, 'month');
  };

  const prevMonth = () => {
    const prev = subMonths(currentMonth, 1);
    setCurrentMonth(prev);
    onPanelChange?.(prev, 'month');
  };

  const onDateClick = (day: Date) => {
    onChange?.(day);
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--khor-neutral-200)] bg-white rounded-t-xl">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[var(--khor-primary-light)]/10 rounded-lg text-[var(--khor-primary)]">
          <CalendarIcon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-extrabold text-[var(--khor-neutral-900)] capitalize tracking-tight">
            {format(currentMonth, 'MMMM yyyy', { locale: es })}
          </h3>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <KButton variant="neutral" size="sm" onClick={() => setCurrentMonth(new Date())}>
          Hoy
        </KButton>
        <div className="flex border border-[var(--khor-neutral-200)] rounded-lg overflow-hidden bg-white">
          <button onClick={prevMonth} className="p-2 hover:bg-[var(--khor-neutral-50)] transition-colors border-r border-[var(--khor-neutral-200)]">
            <ChevronLeft className="w-4 h-4 text-[var(--khor-neutral-600)]" />
          </button>
          <button onClick={nextMonth} className="p-2 hover:bg-[var(--khor-neutral-50)] transition-colors">
            <ChevronRight className="w-4 h-4 text-[var(--khor-neutral-600)]" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderDays = () => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return (
      <div className="grid grid-cols-7 bg-[var(--khor-neutral-50)] border-b border-[var(--khor-neutral-200)]">
        {days.map((day, i) => (
          <div key={i} className="py-3 text-center text-[10px] font-bold text-[var(--khor-neutral-400)] uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, value);
        const isToday = isSameDay(day, new Date());

        days.push(
          <div
            key={day.toString()}
            className={cn(
              "relative min-h-[120px] p-2 border-r border-b border-[var(--khor-neutral-100)] transition-all bg-white hover:bg-[var(--khor-neutral-50)]/50 cursor-pointer group",
              !isCurrentMonth && "bg-[var(--khor-neutral-50)]/30 text-[var(--khor-neutral-300)]"
            )}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={cn(
                "text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full transition-colors",
                isSelected && "bg-[var(--khor-primary)] text-white shadow-md",
                isToday && !isSelected && "text-[var(--khor-primary)] ring-1 ring-[var(--khor-primary)]",
                !isSelected && !isToday && isCurrentMonth && "text-[var(--khor-neutral-700)] group-hover:text-[var(--khor-primary)]"
              )}>
                {format(day, dateFormat)}
              </span>
            </div>
            
            <div className="overflow-hidden">
              {dateCellRender ? dateCellRender(cloneDay) : null}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="bg-white">{rows}</div>;
  };

  return (
    <div 
      className={cn("w-full border border-[var(--khor-neutral-200)] rounded-xl shadow-sm overflow-hidden font-primary", className)} 
      style={style}
    >
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
}

export default KCalendar;
