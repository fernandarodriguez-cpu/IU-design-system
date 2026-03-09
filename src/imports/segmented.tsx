import * as React from 'react';
import { cn } from './utils';

export interface SegmentedOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedProps {
  options: SegmentedOption[] | string[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  block?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

export function Segmented({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  block = false,
  disabled = false,
  size = 'default',
  className
}: SegmentedProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const normalizedOptions: SegmentedOption[] = options.map(opt =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  );

  const handleChange = (newValue: string) => {
    if (disabled) return;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    default: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg',
        block && 'w-full',
        className
      )}
    >
      {normalizedOptions.map((option) => {
        const isActive = value === option.value;
        const isDisabled = disabled || option.disabled;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleChange(option.value)}
            disabled={isDisabled}
            className={cn(
              'flex items-center gap-2 rounded-md font-medium transition-all',
              sizeClasses[size],
              block && 'flex-1',
              isActive && 'bg-card shadow-sm',
              !isActive && 'text-muted-foreground',
              !isDisabled && !isActive && 'hover:text-foreground',
              isDisabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}