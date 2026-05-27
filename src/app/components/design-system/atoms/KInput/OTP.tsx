import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/utils/cn';

export interface KInputOTPProps {
  /** Número de slots. Default: 6 */
  length?: number;
  /** Valor del OTP */
  value?: string;
  /** Valor inicial */
  defaultValue?: string;
  /** Callback cuando cambia el valor */
  onChange?: (value: string) => void;
  /** Callback cuando se completan todos los campos */
  onComplete?: (value: string) => void;
  /** Máscara para los caracteres */
  mask?: string | boolean;
  /** Estado de error */
  status?: 'error' | 'warning' | 'default';
  /** Deshabilitar el input */
  disabled?: boolean;
  /** Clase CSS adicional */
  className?: string;
  /** Estilos adicionales */
  style?: React.CSSProperties;
  /** Tamaño de los slots */
  size?: 'sm' | 'md' | 'lg';
}

export const KInputOTP = ({
  length = 6,
  value,
  defaultValue = '',
  onChange,
  onComplete,
  mask,
  status = 'default',
  disabled,
  className,
  style,
  size = 'md',
}: KInputOTPProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue.slice(0, length));
  const isControlled = value !== undefined;
  const currentVal = (isControlled ? value : internalValue).padEnd(length, ' ');
  const chars = currentVal.split('');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length);
  }, [length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (val === '') return; // Handled by KeyDown

    const newChar = val.slice(-1); // Always take the last typed char
    const newChars = [...chars];
    newChars[index] = newChar;
    
    const newVal = newChars.join('').trimEnd();
    if (!isControlled) setInternalValue(newVal);
    onChange?.(newVal);

    if (newVal.length === length) {
      onComplete?.(newVal);
    }

    // Auto-focus next
    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !chars[index].trim() && index > 0) {
      // Focus previous if current is empty
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Backspace') {
      const newChars = [...chars];
      newChars[index] = ' ';
      const newVal = newChars.join('').trimEnd();
      if (!isControlled) setInternalValue(newVal);
      onChange?.(newVal);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const data = e.clipboardData.getData('text').slice(0, length);
    if (!isControlled) setInternalValue(data);
    onChange?.(data);
    if (data.length === length) onComplete?.(data);
    
    // Focus last slot filled
    const nextIdx = Math.min(data.length, length - 1);
    inputRefs.current[nextIdx]?.focus();
  };

  const slotSize = size === 'sm' ? 32 : size === 'lg' ? 56 : 44;

  return (
    <div 
      className={cn("flex items-center gap-2", className)} 
      style={style}
      onPaste={handlePaste}
    >
      {chars.map((char, i) => (
        <input
          key={i}
          ref={el => inputRefs.current[i] = el}
          disabled={disabled}
          value={char.trim()}
          onChange={e => handleChange(e, i)}
          onKeyDown={e => handleKeyDown(e, i)}
          autoComplete="one-time-code"
          inputMode="numeric"
          className={cn(
            "flex items-center justify-center text-center border-2 rounded-lg font-primary font-bold transition-all focus:outline-none",
            status === 'error' ? "border-khor-error focus:ring-khor-error/20" : status === 'warning' ? "border-khor-warning" : "border-khor-neutral-200 focus:border-khor-primary focus:ring-4 focus:ring-khor-primary/10",
            disabled && "bg-khor-neutral-100 opacity-60 cursor-not-allowed",
            "text-khor-neutral-900"
          )}
          style={{
            width: slotSize,
            height: slotSize,
            fontSize: slotSize * 0.45,
          }}
          type={mask ? 'password' : 'text'}
        />
      ))}
    </div>
  );
};

KInputOTP.displayName = "KInput.OTP";
