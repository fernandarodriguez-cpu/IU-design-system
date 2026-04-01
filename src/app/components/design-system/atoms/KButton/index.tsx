import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../../../imports/utils';
import type { KButtonProps } from './types';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--khor-primary)] text-white! hover:bg-[var(--khor-primary-hover)] active:bg-[var(--khor-primary-active)] hover:shadow-md active:scale-95 transition-all',
        secondary: 'bg-[var(--khor-neutral-200)] text-[var(--khor-neutral-900)] hover:bg-[var(--khor-neutral-300)] active:bg-[var(--khor-neutral-400)] active:scale-95 transition-all',
        outline: 'border border-[var(--khor-neutral-300)] bg-transparent text-[var(--khor-neutral-700)] hover:bg-[var(--khor-neutral-100)] active:bg-[var(--khor-neutral-200)] active:scale-95 transition-all',
        ghost: 'bg-transparent text-[var(--khor-neutral-700)] hover:bg-[var(--khor-neutral-100)] active:bg-[var(--khor-neutral-200)] active:scale-95 transition-all',
        danger: 'bg-[var(--khor-error)] text-white! hover:bg-[var(--khor-action-danger-hover)] active:bg-[var(--khor-action-danger-active)] hover:shadow-md active:scale-95 transition-all',
        navy: 'bg-[var(--khor-navy)] text-white! hover:bg-[var(--khor-navy-hover)] active:bg-[var(--khor-navy-active)] hover:shadow-md active:scale-95 transition-all',
        dashed: 'border border-dashed border-[var(--khor-neutral-300)] bg-transparent text-[var(--khor-neutral-700)] hover:bg-[var(--khor-neutral-100)] active:bg-[var(--khor-neutral-200)] active:scale-95 transition-all',
        link: 'bg-transparent text-[var(--khor-primary)] underline-offset-4 hover:underline !p-0 !min-h-0 !h-auto',
        text: 'bg-transparent text-[var(--khor-neutral-700)] hover:bg-[var(--khor-neutral-100)] active:bg-[var(--khor-neutral-200)] transition-all',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-[var(--khor-density-height-input)] px-[var(--khor-density-spacing-md)] text-[var(--khor-density-font-body)]',
        lg: 'h-11 px-8',
        icon: 'h-9 w-9 p-0',
      },
      shape: {
        default: 'rounded-[var(--khor-density-radius)]',
        circle: 'rounded-full aspect-square p-0 flex-shrink-0',
        round: 'rounded-full',
      },
      fullWidth: {
        true: 'w-full',
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      shape: 'default',
    },
  }
);

export const KButton = React.forwardRef<HTMLButtonElement, KButtonProps>(function KButton(
  { 
    variant, kVariant, size = 'md', shape = 'default', 
    htmlType = 'button', type, className,
    fullWidth, block, loading, icon, iconPosition = 'start', children, disabled,
    ...rest 
  },
  ref,
) {
  const resolvedVariant = kVariant ?? variant ?? 'primary';
  const isFullWidth = fullWidth || block;
  const isDisabled = disabled || loading;

  // Manejo especial para size icon en shape circle puro
  let computedSize = size;
  if (shape === 'circle' && !children && icon) {
     computedSize = size === 'sm' ? 'sm' : (size === 'lg' ? 'lg' : 'icon');
  }

  const computedType = type ?? htmlType;

  return (
    <button
      ref={ref}
      type={computedType}
      disabled={isDisabled}
      className={cn(buttonVariants({ variant: resolvedVariant, size: computedSize, shape, fullWidth: isFullWidth, className }))}
      data-loading={loading}
      style={{ fontFamily: 'var(--font-primary)' }}
      {...rest}
    >
      {loading && <Loader2 className="h-[1.2em] w-[1.2em] animate-spin" />}
      {!loading && icon && iconPosition === 'start' && <span className="flex items-center justify-center pointer-events-none">{icon}</span>}
      {children && <span className="truncate">{children}</span>}
      {!loading && icon && iconPosition === 'end' && <span className="flex items-center justify-center pointer-events-none">{icon}</span>}
    </button>
  );
});

export default KButton;
