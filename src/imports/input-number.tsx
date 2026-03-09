import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "./utils"
import { Button } from "./button"

export interface InputNumberProps {
  value?: number
  onChange?: (value: number | undefined) => void
  min?: number
  max?: number
  step?: number
  precision?: number
  formatter?: (value: number) => string
  parser?: (displayValue: string) => number
  disabled?: boolean
  size?: 'small' | 'middle' | 'large'
  className?: string
  placeholder?: string
  controls?: boolean
  keyboard?: boolean
}

const sizeClasses = {
  small: "h-7 text-sm",
  middle: "h-8",
  large: "h-10 text-base",
}

const buttonSizeClasses = {
  small: "h-7 w-7",
  middle: "h-8 w-8",
  large: "h-10 w-10",
}

export function InputNumber({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  precision,
  formatter,
  parser,
  disabled = false,
  size = 'middle',
  className,
  placeholder = "0",
  controls = true,
  keyboard = true,
}: InputNumberProps) {
  const [displayValue, setDisplayValue] = React.useState('')
  const [isFocused, setIsFocused] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Format number with precision
  const formatNumber = (num: number): number => {
    if (precision !== undefined) {
      return Number(num.toFixed(precision))
    }
    return num
  }

  // Update display value when value prop changes
  React.useEffect(() => {
    if (value !== undefined && !isFocused) {
      if (formatter) {
        setDisplayValue(formatter(value))
      } else {
        setDisplayValue(formatNumber(value).toString())
      }
    } else if (value === undefined && !isFocused) {
      setDisplayValue('')
    }
  }, [value, formatter, precision, isFocused])

  const parseDisplayValue = (display: string): number | undefined => {
    if (!display) return undefined

    let parsed: number
    
    if (parser) {
      parsed = parser(display)
    } else {
      // Remove non-numeric characters except decimal point, minus
      const cleaned = display.replace(/[^\d.-]/g, '')
      parsed = parseFloat(cleaned)
    }

    if (isNaN(parsed)) return undefined

    return formatNumber(parsed)
  }

  const clampValue = (val: number): number => {
    return Math.min(Math.max(val, min), max)
  }

  const updateValue = (newValue: number | undefined) => {
    if (newValue === undefined) {
      onChange?.(undefined)
      return
    }

    const clamped = clampValue(newValue)
    const formatted = formatNumber(clamped)
    onChange?.(formatted)
  }

  const handleIncrement = () => {
    const currentValue = value ?? 0
    const newValue = currentValue + step
    updateValue(clampValue(newValue))
    inputRef.current?.focus()
  }

  const handleDecrement = () => {
    const currentValue = value ?? 0
    const newValue = currentValue - step
    updateValue(clampValue(newValue))
    inputRef.current?.focus()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setDisplayValue(inputValue)
  }

  const handleBlur = () => {
    setIsFocused(false)
    const parsed = parseDisplayValue(displayValue)
    updateValue(parsed)
  }

  const handleFocus = () => {
    setIsFocused(true)
    if (value !== undefined) {
      // Show raw number when focused
      setDisplayValue(value.toString())
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!keyboard) return

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      handleIncrement()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      handleDecrement()
    }
  }

  const isMinDisabled = value !== undefined && value <= min
  const isMaxDisabled = value !== undefined && value >= max

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      {controls && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleDecrement}
          disabled={disabled || isMinDisabled}
          className={cn(
            "rounded-r-none border-r-0",
            buttonSizeClasses[size]
          )}
        >
          <Minus className="h-4 w-4" />
        </Button>
      )}

      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        value={displayValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "flex w-full border border-[var(--border-primary)] bg-[var(--bg-primary)] px-3 py-2",
          "text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-0",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-colors",
          sizeClasses[size],
          controls ? "rounded-none" : "rounded-md",
          !controls && "text-center"
        )}
      />

      {controls && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleIncrement}
          disabled={disabled || isMaxDisabled}
          className={cn(
            "rounded-l-none border-l-0",
            buttonSizeClasses[size]
          )}
        >
          <Plus className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
