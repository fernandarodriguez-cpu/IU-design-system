import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../../../imports/utils';
import { Eye, EyeOff, Search } from 'lucide-react';

const inputVariants = cva(
  'flex w-full items-center justify-between rounded-md border text-sm transition-colors focus-within:ring-2 focus-within:ring-[var(--khor-primary)] focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden font-primary',
  {
    variants: {
      variant: {
        outlined: 'border-[var(--khor-neutral-200)] bg-[var(--khor-neutral-50)] text-[var(--khor-neutral-900)]',
        borderless: 'border-transparent bg-transparent text-[var(--khor-neutral-900)] shadow-none focus-within:ring-0 px-0',
        filled: 'border-transparent bg-[var(--khor-neutral-100)] text-[var(--khor-neutral-900)] focus-within:bg-[var(--khor-neutral-50)]',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-[var(--khor-density-height-input)] px-[var(--khor-density-spacing-md)] text-[var(--khor-density-font-body)]',
        lg: 'h-11 px-6 text-base',
      },
      status: {
        default: '',
        error: 'border-[var(--khor-error)] focus-within:ring-[var(--khor-error)]',
        warning: 'border-[var(--khor-warning)] focus-within:ring-[var(--khor-warning)]',
      }
    },
    defaultVariants: {
      variant: 'outlined',
      size: 'md',
      status: 'default',
    },
  }
);

export interface KInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: 'sm' | 'md' | 'lg';
  error?: string;
  warning?: string;
  block?: boolean;
  variant?: 'outlined' | 'borderless' | 'filled';
  prefix?: React.ReactNode; 
  suffix?: React.ReactNode;
}

export const KInput = React.forwardRef<HTMLInputElement, KInputProps>(function KInput(
  { size = 'md', error, warning, block, variant = 'outlined', prefix, suffix, className, style, disabled, ...rest },
  ref,
) {
  const status = error ? 'error' : warning ? 'warning' : 'default';
  const feedbackMsg = error || warning;
  const feedbackColor = error ? 'var(--khor-error)' : 'var(--khor-warning)';

  return (
    <div style={{ width: block ? '100%' : undefined, ...style }} className={cn("flex flex-col gap-1", block ? "w-full" : "", className)}>
      <div className={cn(inputVariants({ variant, size, status }))}>
        {prefix && <div className="mr-2 flex items-center text-[var(--khor-neutral-500)] shrink-0">{prefix}</div>}
        <input
          ref={ref}
          disabled={disabled}
          className="w-full bg-transparent outline-none placeholder:text-[var(--khor-neutral-400)] h-full"
          {...rest}
        />
        {suffix && <div className="ml-2 flex items-center text-[var(--khor-neutral-500)] shrink-0">{suffix}</div>}
      </div>
      {feedbackMsg && (
        <p style={{ color: feedbackColor }} className="text-xs m-0 font-primary">
          {feedbackMsg}
        </p>
      )}
    </div>
  );
});

export interface KInputPasswordProps extends KInputProps {}

export const KInputPassword = React.forwardRef<HTMLInputElement, KInputPasswordProps>(function KInputPassword(
  { size = 'md', error, warning, block, variant = 'outlined', prefix, className, style, disabled, ...rest },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);
  const status = error ? 'error' : warning ? 'warning' : 'default';
  const feedbackMsg = error || warning;
  const feedbackColor = error ? 'var(--khor-error)' : 'var(--khor-warning)';

  return (
    <div style={{ width: block ? '100%' : undefined, ...style }} className={cn("flex flex-col gap-1", block ? "w-full" : "", className)}>
      <div className={cn(inputVariants({ variant, size, status }))}>
        {prefix && <div className="mr-2 flex items-center text-[var(--khor-neutral-500)] shrink-0">{prefix}</div>}
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          disabled={disabled}
          className="w-full bg-transparent outline-none placeholder:text-[var(--khor-neutral-400)] h-full"
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="ml-2 flex items-center text-[var(--khor-neutral-400)] hover:text-[var(--khor-neutral-600)] outline-none shrink-0"
          disabled={disabled}
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
      {feedbackMsg && (
        <p style={{ color: feedbackColor }} className="text-xs m-0 font-primary">
          {feedbackMsg}
        </p>
      )}
    </div>
  );
});

export interface KInputSearchProps extends Omit<KInputProps, 'onSearch'> {
  onSearch?: (value: string) => void;
  loading?: boolean;
}

export const KInputSearch = React.forwardRef<HTMLInputElement, KInputSearchProps>(function KInputSearch(
  { size = 'md', error, warning, block, variant = 'outlined', prefix, suffix, className, style, disabled, onSearch, loading, ...rest },
  ref,
) {
  const status = error ? 'error' : warning ? 'warning' : 'default';
  const feedbackMsg = error || warning;
  const feedbackColor = error ? 'var(--khor-error)' : 'var(--khor-warning)';

  return (
    <div style={{ width: block ? '100%' : undefined, ...style }} className={cn("flex flex-col gap-1", block ? "w-full" : "", className)}>
      <div className={cn(inputVariants({ variant, size, status }))}>
        {prefix && <div className="mr-2 flex items-center text-[var(--khor-neutral-500)] shrink-0">{prefix}</div>}
        <input
          ref={ref}
          type="search"
          disabled={disabled || loading}
          className="w-full bg-transparent outline-none placeholder:text-[var(--khor-neutral-400)] h-full"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onSearch) {
              onSearch(e.currentTarget.value);
            }
          }}
          {...rest}
        />
        <button
          type="button"
          onClick={(e) => {
            const inputElement = e.currentTarget.previousElementSibling as HTMLInputElement;
            if (onSearch && inputElement) {
              onSearch(inputElement.value);
            }
          }}
          className="ml-2 flex items-center text-[var(--khor-neutral-400)] hover:text-[var(--khor-primary)] outline-none shrink-0"
          disabled={disabled || loading}
        >
          {suffix || <Search size={16} />}
        </button>
      </div>
      {feedbackMsg && (
        <p style={{ color: feedbackColor }} className="text-xs m-0 font-primary">
          {feedbackMsg}
        </p>
      )}
    </div>
  );
});

export default KInput;
