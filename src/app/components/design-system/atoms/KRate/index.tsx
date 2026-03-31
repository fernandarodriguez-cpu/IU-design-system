import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export interface KRateProps {
  count?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  allowHalf?: boolean;
  character?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KRate — Sistema de puntuación por estrellas (Headless v4)
 * Reemplaza AntD Rate con una implementación nativa táctil y animada.
 */
export function KRate({
  count = 5,
  value,
  defaultValue = 0,
  onChange,
  disabled,
  allowHalf = false,
  character,
  className,
  style,
}: KRateProps) {
  const [internalValue, setInternalValue] = useState(value || defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  useEffect(() => {
    if (value !== undefined) setInternalValue(value);
  }, [value]);

  const stars = Array.from({ length: count }, (_, i) => i + 1);
  const activeValue = hoverValue !== null ? hoverValue : internalValue;

  const handleClick = (val: number) => {
    if (disabled) return;
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div 
      className={cn("flex items-center gap-1 font-primary", disabled && "cursor-not-allowed opacity-70", className)} 
      style={style}
    >
      {stars.map((star) => {
        const isActive = star <= activeValue;
        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onMouseEnter={() => !disabled && setHoverValue(star)}
            onMouseLeave={() => !disabled && setHoverValue(null)}
            onClick={() => handleClick(star)}
            className={cn(
              "p-0.5 transition-all focus:outline-none",
              !disabled && "hover:scale-110 active:scale-95",
              isActive ? "text-[var(--khor-accent)] animate-in zoom-in-50 duration-200" : "text-[var(--khor-neutral-200)]"
            )}
          >
            {character ? character : (
              <Star 
                className={cn("w-5 h-5", isActive ? "fill-current" : "fill-transparent")} 
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default KRate;
