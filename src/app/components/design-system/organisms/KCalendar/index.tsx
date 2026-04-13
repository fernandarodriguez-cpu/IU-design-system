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
  setMonth,
  eachMonthOfInterval,
  startOfYear,
  endOfYear
} from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '../../../../../imports/utils';
import { KButton } from '../../atoms/KButton';

export interface KCalendarProps {
  value?: Date;
  defaultValue?: Date;
  mode?: 'month' | 'year';
  onChange?: (date: Date) => void;
  onPanelChange?: (date: Date, mode: 'month' | 'year') => void;
  dateCellRender?: (date: Date) => React.ReactNode;
  monthCellRender?: (date: Date) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KCalendar — Calendario de vista completa (Headless v4)
 * Soporta vistas de mes y año, renderizado de celdas personalizado y navegación fluida.
 */
export function KCalendar({
  value,
  defaultValue = new Date(),
  mode: initialMode = 'month',
  onChange,
  onPanelChange,
  dateCellRender,
  monthCellRender,
  className,
  style,
}: KCalendarProps) {
  const [currentDate, setCurrentDate] = useState(value || defaultValue);
  const [mode, setMode] = useState<'month' | 'year'>(initialMode);

  const onDateClick = (date: Date) => {
    setCurrentDate(date);
    onChange?.(date);
  };

  const changeMode = (newMode: 'month' | 'year') => {
    setMode(newMode);
    onPanelChange?.(currentDate, newMode);
  };

  const handlePrev = () => {
    const next = mode === 'month' ? subMonths(currentDate, 1) : setYear(currentDate, getYear(currentDate) - 1);
    setCurrentDate(next);
  };

  const handleNext = () => {
    const next = mode === 'month' ? addMonths(currentDate, 1) : setYear(currentDate, getYear(currentDate) + 1);
    setCurrentDate(next);
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between px-6 py-4 border-b border-khor-neutral-200 bg-white rounded-t-xl">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-khor-primary-light/10 rounded-lg text-khor-primary">
          <CalendarIcon className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-extrabold text-khor-neutral-900 capitalize tracking-tight">
            {mode === 'month' 
               ? format(currentDate, 'MMMM yyyy', { locale: es })
               : format(currentDate, 'yyyy', { locale: es })}
          </h3>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex bg-khor-neutral-100 p-1 rounded-lg">
           <button 
             onClick={() => changeMode('month')}
             className={cn("px-3 py-1 text-xs font-bold rounded-md transition-all", mode === 'month' ? "bg-white text-khor-primary shadow-sm" : "text-khor-neutral-500")}
           >Mes</button>
           <button 
             onClick={() => changeMode('year')}
             className={cn("px-3 py-1 text-xs font-bold rounded-md transition-all", mode === 'year' ? "bg-white text-khor-primary shadow-sm" : "text-khor-neutral-500")}
           >Año</button>
        </div>

        <div className="flex border border-khor-neutral-200 rounded-lg overflow-hidden bg-white">
          <button onClick={handlePrev} className="p-2 hover:bg-khor-neutral-50 border-r transition-colors"><ChevronLeft size={16}/></button>
          <button onClick={handleNext} className="p-2 hover:bg-khor-neutral-50 transition-colors"><ChevronRight size={16}/></button>
        </div>
        
        <KButton variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>Hoy</KButton>
      </div>
    </div>
  );

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dayLabels = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, currentDate);
        const isToday = isSameDay(day, new Date());

        days.push(
          <div
            key={day.toString()}
            className={cn(
              "relative min-h-[120px] p-3 border-r border-b border-khor-neutral-100 transition-all bg-white hover:bg-khor-neutral-50/50 cursor-pointer group",
              !isCurrentMonth && "bg-khor-neutral-50/30 text-khor-neutral-300"
            )}
            onClick={() => onDateClick(cloneDay)}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={cn(
                "text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full transition-colors",
                isSelected && "bg-khor-primary text-white shadow-md",
                isToday && !isSelected && "text-khor-primary ring-1 ring-khor-primary",
                !isSelected && !isToday && isCurrentMonth && "text-khor-neutral-700 group-hover:text-khor-primary"
              )}>
                {format(day, 'd')}
              </span>
            </div>
            <div className="overflow-hidden mt-1">
              {dateCellRender?.(cloneDay)}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(<div key={day.toString()} className="grid grid-cols-7">{days}</div>);
      days = [];
    }

    return (
      <div className="flex flex-col bg-white">
        <div className="grid grid-cols-7 bg-khor-neutral-50 border-b">
           {dayLabels.map(d => <div key={d} className="py-2 text-center text-[10px] font-bold text-khor-neutral-400 uppercase tracking-widest">{d}</div>)}
        </div>
        {rows}
      </div>
    );
  };

  const renderYearView = () => {
    const months = eachMonthOfInterval({
      start: startOfYear(currentDate),
      end: endOfYear(currentDate)
    });

    return (
      <div className="grid grid-cols-3 md:grid-cols-4 bg-white min-h-[400px]">
        {months.map(month => {
          const isSelected = isSameMonth(month, currentDate);
          const isCurrentMonth = isSameMonth(month, new Date());
          
          return (
            <div 
              key={month.toString()}
              onClick={() => { setCurrentDate(month); setMode('month'); }}
              className="p-6 border-r border-b border-khor-neutral-100 hover:bg-khor-neutral-50 transition-colors cursor-pointer group flex flex-col gap-2"
            >
              <div className={cn(
                "text-sm font-bold capitalize transition-colors",
                isSelected ? "text-khor-primary" : "text-khor-neutral-700 group-hover:text-khor-primary",
                isCurrentMonth && "underline decoration-2 underline-offset-4 decoration-khor-primary"
              )}>
                {format(month, 'MMMM', { locale: es })}
              </div>
              <div className="flex-1 overflow-hidden mt-2">
                 {monthCellRender?.(month)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("w-full border border-khor-neutral-200 rounded-xl shadow-lg overflow-hidden font-primary", className)} style={style}>
      {renderHeader()}
      {mode === 'month' ? renderMonthView() : renderYearView()}
    </div>
  );
}

export default KCalendar;
