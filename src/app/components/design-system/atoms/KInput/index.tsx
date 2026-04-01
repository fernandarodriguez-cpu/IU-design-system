import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../../../imports/utils';
import { Eye, EyeOff } from 'lucide-react';

const inputVariants = cva(
  'flex w-full items-center justify-between rounded-md border text-sm transition-all focus-within:ring-2 focus-within:ring-[var(--khor-primary)] focus-within:ring-offset-2 overflow-hidden font-primary',
  {
    variants: {
      variant: {
        outlined: 'border-[var(--khor-neutral-200)] bg-[var(--khor-neutral-50)] text-[var(--khor-neutral-900)]',
        borderless: 'border-transparent bg-transparent text-[var(--khor-neutral-900)] shadow-none focus-within:ring-0 px-0',
        filled: 'border-transparent bg-[var(--khor-neutral-100)] text-[var(--khor-neutral-900)] focus-within:bg-[var(--khor-neutral-50)]',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-[var(--khor-density-height-input)] px-3 text-[var(--khor-density-font-body)]',
        lg: 'h-12 px-4 text-base',
      },
      status: {
        default: '',
        error: 'border-[var(--khor-error)] focus-within:ring-[var(--khor-error)]',
        warning: 'border-[var(--khor-warning)] focus-within:ring-[var(--khor-warning)]',
      },
      disabled: {
        true: 'bg-[var(--khor-neutral-100)] border-[var(--khor-neutral-200)] opacity-60 cursor-not-allowed select-none pointer-events-none grayscale-[0.5]',
        false: '',
      }
    },
    defaultVariants: {
      variant: 'outlined',
      size: 'md',
      status: 'default',
      disabled: false,
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

/**
 * KInput — Componente de entrada de texto base.
 */
export const KInput = React.forwardRef<HTMLInputElement, KInputProps>(function KInput(
  { size = 'md', error, warning, block, variant = 'outlined', prefix, suffix, className, style, disabled, ...rest },
  ref,
) {
  const status = error ? 'error' : warning ? 'warning' : 'default';
  const feedbackMsg = error || warning;
  const feedbackColor = error ? 'var(--khor-error)' : 'var(--khor-warning)';

  return (
    <div style={{ width: block ? '100%' : undefined, ...style }} className={cn("flex flex-col gap-1", block ? "w-full" : "", className)}>
      <div className={cn(inputVariants({ variant, size, status, disabled }))}>
        {prefix && <div className="mr-2 flex items-center text-[var(--khor-neutral-500)] shrink-0">{prefix}</div>}
        <input
          ref={ref}
          disabled={disabled}
          className="w-full bg-transparent outline-none placeholder:text-[var(--khor-neutral-400)] h-full disabled:cursor-not-allowed"
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

/**
 * KInputPassword — Variante de input para contraseñas con toggle de visibilidad.
 */
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
      <div className={cn(inputVariants({ variant, size, status, disabled }))}>
        {prefix && <div className="mr-2 flex items-center text-[var(--khor-neutral-500)] shrink-0">{prefix}</div>}
        <input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          disabled={disabled}
          className="w-full bg-transparent outline-none placeholder:text-[var(--khor-neutral-400)] h-full disabled:cursor-not-allowed"
          {...rest}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className={cn(
            "ml-2 flex items-center justify-center text-[var(--khor-neutral-400)] hover:text-[var(--khor-neutral-600)] outline-none shrink-0 transition-all hover:scale-110 active:scale-90",
            disabled && "hidden"
          )}
          style={{ width: 32, height: 32 }}
          title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
