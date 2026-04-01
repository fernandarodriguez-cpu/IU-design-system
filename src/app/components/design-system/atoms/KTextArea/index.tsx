import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../../../imports/utils';

const textareaVariants = cva(
  'flex w-full rounded-md border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--khor-primary)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-primary p-[var(--khor-density-spacing-sm)] resize-y min-h-[var(--khor-density-height-input)]',
  {
    variants: {
      variant: {
        outlined: 'border-[var(--khor-neutral-200)] bg-[var(--khor-neutral-50)] text-foreground',
        borderless: 'border-transparent bg-transparent text-foreground shadow-none focus-visible:ring-0',
        filled: 'border-transparent bg-[var(--khor-neutral-100)] text-foreground focus-within:bg-[var(--khor-neutral-50)]',
      },
      status: {
        default: '',
        error: 'border-[var(--khor-error)] focus-visible:ring-[var(--khor-error)]',
        warning: 'border-[var(--khor-warning)] focus-within:ring-[var(--khor-warning)]',
      }
    },
    defaultVariants: {
      variant: 'outlined',
      status: 'default',
    },
  }
);

export interface KTextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  error?: string;
  warning?: string;
  variant?: 'outlined' | 'borderless' | 'filled';
  block?: boolean;
}

export const KTextArea = React.forwardRef<HTMLTextAreaElement, KTextAreaProps>(
  function KTextArea(
    { error, warning, block, variant = 'outlined', className, style, disabled, ...rest },
    ref,
  ) {
    const status = error ? 'error' : warning ? 'warning' : 'default';
    const feedbackMsg = error || warning;
    const feedbackColor = error ? 'var(--khor-error)' : 'var(--khor-warning)';

    return (
      <div style={{ width: block ? '100%' : undefined, ...style }} className={cn("flex flex-col gap-1", block ? "w-full" : "", className)}>
        <textarea
          ref={ref}
          disabled={disabled}
          className={cn(textareaVariants({ variant, status }))}
          {...rest}
        />
        {feedbackMsg && (
          <p style={{ color: feedbackColor }} className="text-xs m-0 font-primary">
            {feedbackMsg}
          </p>
        )}
      </div>
    );
  }
);

export default KTextArea;
