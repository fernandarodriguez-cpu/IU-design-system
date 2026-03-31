import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../../../imports/utils';

export interface KSegmentedOption {
  label: React.ReactNode;
  value: string | number;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface KSegmentedProps {
  options: (string | number | KSegmentedOption)[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  block?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

const sizeStyles = {
  sm: "h-8 p-1 text-xs",
  md: "h-10 p-1 text-sm",
  lg: "h-12 p-1.5 text-base",
};

/**
 * KSegmented — Control segmentado animado (Headless v4)
 * Utiliza Framer Motion para la transición del fondo y Tailwind para el layout.
 */
export function KSegmented({ 
  options, 
  value, 
  onChange, 
  block, 
  disabled, 
  size = 'md', 
  className,
  style
}: KSegmentedProps) {
  
  const normalizedOptions: KSegmentedOption[] = options.map(opt => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { label: String(opt), value: opt };
    }
    return opt;
  });

  const [internalValue, setInternalValue] = React.useState(value || normalizedOptions[0]?.value);
  const activeValue = value !== undefined ? value : internalValue;

  const handleChange = (val: string | number) => {
    if (disabled) return;
    setInternalValue(val);
    onChange?.(val);
  };

  return (
    <div 
      className={cn(
        "inline-flex bg-[var(--khor-neutral-100)] rounded-lg font-primary p-1 border border-[var(--khor-neutral-200)] relative",
        block ? "w-full flex" : "w-max",
        disabled && "opacity-50 cursor-not-allowed",
        sizeStyles[size],
        className
      )}
      style={style}
    >
      {normalizedOptions.map((opt) => {
        const isActive = activeValue === opt.value;
        return (
          <button
            key={String(opt.value)}
            disabled={disabled || opt.disabled}
            onClick={() => handleChange(opt.value)}
            className={cn(
              "relative flex-1 flex items-center justify-center px-4 rounded-md transition-colors z-10 font-semibold",
              isActive ? "text-[var(--khor-neutral-900)]" : "text-[var(--khor-neutral-500)] hover:text-[var(--khor-neutral-700)]",
              (disabled || opt.disabled) ? "cursor-not-allowed" : "cursor-pointer"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="segmented-active"
                className="absolute inset-0 bg-white rounded-md shadow-sm z-[-1] border border-[var(--khor-neutral-200)/50]"
                transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
              />
            )}
            <div className="flex items-center gap-2">
              {opt.icon && <span className="shrink-0">{opt.icon}</span>}
              <span className="truncate">{opt.label}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default KSegmented;
