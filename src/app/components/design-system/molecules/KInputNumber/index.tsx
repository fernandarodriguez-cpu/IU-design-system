import React, { useState, useEffect, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export interface KInputNumberProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  // Props de paridad AntD
  controls?: boolean;
  status?: 'error' | 'warning';
}

const sizeClasses = {
  sm: "h-8 px-2 text-xs",
  md: "h-10 px-3 text-sm",
  lg: "h-12 px-4 text-base",
};

/**
 * KInputNumber — Input numérico con controles integrados (Headless v4)
 * Reemplaza AntD InputNumber con un input nativo controlado y botones de Lucide.
 */
export function KInputNumber({
  value,
  defaultValue,
  onChange,
  min,
  max,
  step = 1,
  precision,
  disabled,
  readOnly,
  size = 'md',
  placeholder,
  className,
  style,
  fullWidth,
}: KInputNumberProps) {
  const [internalValue, setInternalValue] = useState<number | undefined>(value !== undefined ? value : defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const updateValue = (newValue: number | undefined) => {
    if (disabled || readOnly) return;
    
    let val = newValue;
    if (val !== undefined) {
      if (min !== undefined) val = Math.max(min, val);
      if (max !== undefined) val = Math.min(max, val);
      if (precision !== undefined) val = parseFloat(val.toFixed(precision));
    }

    setInternalValue(val);
    onChange?.(val);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === '' ? undefined : Number(e.target.value);
    updateValue(val);
  };

  const onIncrement = () => updateValue((internalValue ?? 0) + step);
  const onDecrement = () => updateValue((internalValue ?? 0) - step);

  return (
    <div 
      className={cn(
        "relative flex items-center group font-primary transition-all",
        fullWidth ? "w-full" : "w-max",
        className
      )}
      style={style}
    >
      <input
        ref={inputRef}
        type="number"
        value={internalValue === undefined ? '' : internalValue}
        onChange={handleInputChange}
        disabled={disabled}
        readOnly={readOnly}
        min={min}
        max={max}
        step={step}
        placeholder={placeholder}
        className={cn(
          "w-full bg-khor-surface-page border border-khor-neutral-200 rounded-md outline-none transition-all pr-12 focus:border-khor-primary focus:ring-2 focus:ring-khor-primary-light font-semibold",
          disabled && "bg-khor-neutral-100 cursor-not-allowed opacity-60",
          sizeClasses[size]
        )}
      />
      
      {/* Controles laterales */}
      {!readOnly && !disabled && (
        <div className="absolute right-[1px] h-[calc(100%-2px)] flex flex-col border-l border-khor-neutral-200 rounded-r-md overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={onIncrement}
            className="flex-1 px-2 bg-khor-neutral-50 hover:bg-khor-neutral-100 border-b border-khor-neutral-200 transition-colors active:bg-khor-neutral-200"
          >
            <Plus className="w-3 h-3 text-khor-neutral-500" />
          </button>
          <button
            type="button"
            onClick={onDecrement}
            className="flex-1 px-2 bg-khor-neutral-50 hover:bg-khor-neutral-100 transition-colors active:bg-khor-neutral-200"
          >
            <Minus className="w-3 h-3 text-khor-neutral-500" />
          </button>
        </div>
      )}
    </div>
  );
}

export default KInputNumber;
