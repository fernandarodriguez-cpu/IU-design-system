import React, { useState, useEffect } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { Clock, Check } from 'lucide-react';
import { format, parse, isAfter } from 'date-fns';
import { cn } from '../../../../../imports/utils';
import { KButton } from '../../atoms/KButton';

export interface KTimePickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (time: string) => void;
  format?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  // Props de paridad AntD
  placeholder?: string;
  use12Hours?: boolean;
  allowClear?: boolean;
}

/**
 * KTimePicker — Selector de hora (Headless v4)
 */
export function KTimePicker({
  value,
  defaultValue = "12:00",
  onChange,
  format: timeFormat = "HH:mm",
  disabled = false,
  className,
  style,
  placeholder = "Seleccionar hora",
  use12Hours = false,
  allowClear = true,
}: KTimePickerProps) {
  const [internalValue, setInternalValue] = useState(value || defaultValue || "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

  const currentHH = internalValue.split(':')[0];
  const currentmm = internalValue.split(':')[1];

  const handleTimeChange = (newHH: string, Newmm: string) => {
    const newVal = `${newHH}:${Newmm}`;
    setInternalValue(newVal);
    onChange?.(newVal);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          disabled={disabled}
          className={cn(
            "flex items-center gap-3 w-full px-4 h-10 bg-white border border-khor-neutral-200 rounded-xl text-sm font-primary hover:border-khor-primary transition-all focus:ring-2 focus:ring-khor-primary-light/20 outline-none group",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          style={style}
        >
          <Clock className="w-4 h-4 text-khor-neutral-400 group-hover:text-khor-primary transition-colors" />
          <span className={cn(
            "flex-1 text-start font-bold tracking-tight",
            internalValue ? "text-khor-neutral-900" : "text-khor-neutral-400"
          )}>
            {internalValue}
          </span>
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          className="z-[1000] p-4 bg-white border border-khor-neutral-200 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-in zoom-in-95 duration-200 font-primary"
          sideOffset={8}
          align="start"
        >
          <div className="flex gap-1 h-64">
            {/* Horas */}
            <div className="flex flex-col overflow-y-auto pe-1 scrollbar-hide w-16">
              <span className="text-[10px] font-bold text-khor-neutral-400 uppercase tracking-widest text-center mb-2">HH</span>
              {hours.map(h => (
                <button
                  key={h}
                  onClick={() => handleTimeChange(h, currentmm)}
                  className={cn(
                    "py-2 rounded-lg text-sm transition-all focus:outline-none",
                    h === currentHH ? "bg-khor-primary text-white font-bold" : "hover:bg-khor-neutral-50 text-khor-neutral-700"
                  )}
                >
                  {h}
                </button>
              ))}
            </div>

            {/* Separador */}
            <div className="w-[1px] bg-khor-neutral-100 mx-2" />

            {/* Minutos */}
            <div className="flex flex-col overflow-y-auto pr-1 scrollbar-hide w-16">
              <span className="text-[10px] font-bold text-khor-neutral-400 uppercase tracking-widest text-center mb-2">mm</span>
              {minutes.map(m => (
                <button
                  key={m}
                  onClick={() => handleTimeChange(currentHH, m)}
                  className={cn(
                    "py-2 rounded-lg text-sm transition-all focus:outline-none",
                    m === currentmm ? "bg-khor-primary text-white font-bold" : "hover:bg-khor-neutral-50 text-khor-neutral-700"
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-khor-neutral-100 flex justify-end">
            <KButton size="sm" onClick={() => setOpen(false)}>
              Listo
            </KButton>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default KTimePicker;
