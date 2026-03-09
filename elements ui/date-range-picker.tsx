import * as React from "react"
import { Calendar as CalendarIcon, X } from "lucide-react"
import { format, startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns"
import { es } from "date-fns/locale"
import { DateRange } from "react-day-picker"

import { cn } from "./utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  placeholder?: string
  presets?: DateRangePreset[]
  showPresets?: boolean
  minDate?: Date
  maxDate?: Date
  disabled?: boolean
  className?: string
  align?: "start" | "center" | "end"
}

export interface DateRangePreset {
  label: string
  range: DateRange
}

const defaultPresets: DateRangePreset[] = [
  {
    label: "Hoy",
    range: {
      from: startOfDay(new Date()),
      to: endOfDay(new Date()),
    },
  },
  {
    label: "Últimos 7 días",
    range: {
      from: startOfDay(subDays(new Date(), 6)),
      to: endOfDay(new Date()),
    },
  },
  {
    label: "Últimos 30 días",
    range: {
      from: startOfDay(subDays(new Date(), 29)),
      to: endOfDay(new Date()),
    },
  },
  {
    label: "Esta semana",
    range: {
      from: startOfWeek(new Date(), { locale: es }),
      to: endOfWeek(new Date(), { locale: es }),
    },
  },
  {
    label: "Este mes",
    range: {
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date()),
    },
  },
  {
    label: "Mes anterior",
    range: {
      from: startOfMonth(subDays(startOfMonth(new Date()), 1)),
      to: endOfMonth(subDays(startOfMonth(new Date()), 1)),
    },
  },
]

export function DateRangePicker({
  value,
  onChange,
  placeholder = "Selecciona un rango de fechas",
  presets = defaultPresets,
  showPresets = true,
  minDate,
  maxDate,
  disabled = false,
  className,
  align = "center",
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedRange, setSelectedRange] = React.useState<DateRange | undefined>(value)

  React.useEffect(() => {
    setSelectedRange(value)
  }, [value])

  const handleSelect = (range: DateRange | undefined) => {
    setSelectedRange(range)
    onChange?.(range)
  }

  const handlePresetClick = (preset: DateRangePreset) => {
    handleSelect(preset.range)
    setOpen(false)
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleSelect(undefined)
  }

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) return placeholder

    if (!range.to) {
      return format(range.from, "dd 'de' MMMM, yyyy", { locale: es })
    }

    const isSameMonth = range.from.getMonth() === range.to.getMonth()
    const isSameYear = range.from.getFullYear() === range.to.getFullYear()

    if (isSameMonth && isSameYear) {
      return `${format(range.from, "dd", { locale: es })} - ${format(
        range.to,
        "dd 'de' MMMM, yyyy",
        { locale: es }
      )}`
    }

    if (isSameYear) {
      return `${format(range.from, "dd 'de' MMM", { locale: es })} - ${format(
        range.to,
        "dd 'de' MMM, yyyy",
        { locale: es }
      )}`
    }

    return `${format(range.from, "dd/MM/yy", { locale: es })} - ${format(
      range.to,
      "dd/MM/yy",
      { locale: es }
    )}`
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "justify-start text-left gap-2 w-full",
            !selectedRange && "text-[var(--text-tertiary)]",
            className
          )}
        >
          <CalendarIcon className="h-4 w-4 flex-shrink-0" />
          <span className="flex-1 truncate">{formatDateRange(selectedRange)}</span>
          {selectedRange && !disabled && (
            <X
              className="h-4 w-4 flex-shrink-0 opacity-50 hover:opacity-100"
              onClick={handleClear}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <div className="flex">
          {/* Presets sidebar */}
          {showPresets && presets.length > 0 && (
            <div className="flex flex-col gap-1 border-r border-[var(--border-primary)] p-3 min-w-[140px]">
              <p className="text-sm mb-1 px-2">Rangos rápidos</p>
              {presets.map((preset, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePresetClick(preset)}
                  className="justify-start"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          )}

          {/* Calendar */}
          <div className="p-3">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={selectedRange?.from}
              selected={selectedRange}
              onSelect={handleSelect}
              numberOfMonths={2}
              disabled={(date) => {
                if (minDate && date < minDate) return true
                if (maxDate && date > maxDate) return true
                return false
              }}
            />
            
            {/* Action buttons */}
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--border-primary)] mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  handleSelect(undefined)
                  setOpen(false)
                }}
              >
                Limpiar
              </Button>
              <Button
                size="sm"
                onClick={() => setOpen(false)}
              >
                Aplicar
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
