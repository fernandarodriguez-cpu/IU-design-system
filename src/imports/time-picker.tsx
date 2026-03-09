import * as React from 'react';
import { Clock } from 'lucide-react';
import { cn } from './utils';
import { Button } from './button';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { ScrollArea } from './scroll-area';

export interface TimePickerProps {
  value?: string; // Format: "HH:mm" or "HH:mm:ss"
  onChange?: (time: string) => void;
  placeholder?: string;
  disabled?: boolean;
  format?: '12' | '24';
  showSeconds?: boolean;
  step?: number; // Minutes step (5, 15, 30, etc)
  className?: string;
}

export function TimePicker({
  value,
  onChange,
  placeholder = 'Selecciona hora',
  disabled = false,
  format = '24',
  showSeconds = false,
  step = 1,
  className
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedHour, setSelectedHour] = React.useState<number>(0);
  const [selectedMinute, setSelectedMinute] = React.useState<number>(0);
  const [selectedSecond, setSelectedSecond] = React.useState<number>(0);
  const [period, setPeriod] = React.useState<'AM' | 'PM'>('AM');

  // Parse value into components
  React.useEffect(() => {
    if (value) {
      const parts = value.split(':');
      const hour = parseInt(parts[0]);
      const minute = parseInt(parts[1]);
      const second = parts[2] ? parseInt(parts[2]) : 0;

      if (format === '12') {
        setPeriod(hour >= 12 ? 'PM' : 'AM');
        setSelectedHour(hour % 12 || 12);
      } else {
        setSelectedHour(hour);
      }
      
      setSelectedMinute(minute);
      setSelectedSecond(second);
    }
  }, [value, format]);

  // Generate hours
  const hours = React.useMemo(() => {
    const max = format === '12' ? 12 : 23;
    const min = format === '12' ? 1 : 0;
    const result = [];
    for (let i = min; i <= max; i++) {
      result.push(i);
    }
    return result;
  }, [format]);

  // Generate minutes
  const minutes = React.useMemo(() => {
    const result = [];
    for (let i = 0; i < 60; i += step) {
      result.push(i);
    }
    return result;
  }, [step]);

  // Generate seconds
  const seconds = React.useMemo(() => {
    const result = [];
    for (let i = 0; i < 60; i++) {
      result.push(i);
    }
    return result;
  }, []);

  const handleSelect = () => {
    let hour = selectedHour;
    
    if (format === '12') {
      if (period === 'PM' && hour !== 12) hour += 12;
      if (period === 'AM' && hour === 12) hour = 0;
    }

    const timeStr = showSeconds
      ? `${hour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}:${selectedSecond.toString().padStart(2, '0')}`
      : `${hour.toString().padStart(2, '0')}:${selectedMinute.toString().padStart(2, '0')}`;
    
    onChange?.(timeStr);
    setOpen(false);
  };

  const formatDisplay = (value: string) => {
    if (!value) return placeholder;
    
    const parts = value.split(':');
    let hour = parseInt(parts[0]);
    const minute = parts[1];
    const second = parts[2];

    if (format === '12') {
      const period = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
      return showSeconds
        ? `${hour}:${minute}:${second} ${period}`
        : `${hour}:${minute} ${period}`;
    }

    return showSeconds
      ? `${parts[0]}:${minute}:${second}`
      : `${parts[0]}:${minute}`;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground',
            className
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {formatDisplay(value || '')}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex gap-2 p-3">
          {/* Hours */}
          <div className="flex flex-col items-center">
            <div className="text-xs font-semibold mb-2 text-gray-600">Hora</div>
            <ScrollArea className="h-[200px] w-16">
              <div className="flex flex-col gap-1 p-1">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    variant={selectedHour === hour ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => setSelectedHour(hour)}
                  >
                    {hour.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex items-center text-2xl font-bold text-muted-foreground">:</div>

          {/* Minutes */}
          <div className="flex flex-col items-center">
            <div className="text-xs font-semibold mb-2 text-gray-600">Min</div>
            <ScrollArea className="h-[200px] w-16">
              <div className="flex flex-col gap-1 p-1">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    variant={selectedMinute === minute ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-center"
                    onClick={() => setSelectedMinute(minute)}
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Seconds */}
          {showSeconds && (
            <>
              <div className="flex items-center text-2xl font-bold text-muted-foreground">:</div>
              <div className="flex flex-col items-center">
                <div className="text-xs font-semibold mb-2 text-gray-600">Seg</div>
                <ScrollArea className="h-[200px] w-16">
                  <div className="flex flex-col gap-1 p-1">
                    {seconds.map((second) => (
                      <Button
                        key={second}
                        variant={selectedSecond === second ? 'default' : 'ghost'}
                        size="sm"
                        className="w-full justify-center"
                        onClick={() => setSelectedSecond(second)}
                      >
                        {second.toString().padStart(2, '0')}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </>
          )}

          {/* AM/PM Toggle */}
          {format === '12' && (
            <div className="flex flex-col items-center">
              <div className="text-xs font-semibold mb-2 text-gray-600">&nbsp;</div>
              <div className="flex flex-col gap-2 mt-[76px]">
                <Button
                  variant={period === 'AM' ? 'default' : 'ghost'}
                  size="sm"
                  className="w-12"
                  onClick={() => setPeriod('AM')}
                >
                  AM
                </Button>
                <Button
                  variant={period === 'PM' ? 'default' : 'ghost'}
                  size="sm"
                  className="w-12"
                  onClick={() => setPeriod('PM')}
                >
                  PM
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-3 flex justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            size="sm"
            onClick={handleSelect}
          >
            Seleccionar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export interface TimeRangePickerProps {
  startValue?: string;
  endValue?: string;
  onStartChange?: (time: string) => void;
  onEndChange?: (time: string) => void;
  disabled?: boolean;
  format?: '12' | '24';
  step?: number;
  className?: string;
}

export function TimeRangePicker({
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  disabled = false,
  format = '24',
  step = 1,
  className
}: TimeRangePickerProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <TimePicker
        value={startValue}
        onChange={onStartChange}
        placeholder="Hora inicio"
        disabled={disabled}
        format={format}
        step={step}
        className="flex-1"
      />
      <span className="text-gray-500">-</span>
      <TimePicker
        value={endValue}
        onChange={onEndChange}
        placeholder="Hora fin"
        disabled={disabled}
        format={format}
        step={step}
        className="flex-1"
      />
    </div>
  );
}