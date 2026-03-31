import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../../../imports/utils';

export type KTagColor = 'primary' | 'navy' | 'accent' | 'success' | 'error' | 'warning' | 'info' | 'default';

const tagVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold font-primary border transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--khor-primary)] focus:ring-offset-2',
  {
    variants: {
      color: {
        primary: 'bg-[color-mix(in_srgb,var(--khor-primary)_10%,transparent)] text-[var(--khor-primary)] border-[color-mix(in_srgb,var(--khor-primary)_20%,transparent)]',
        navy: 'bg-[color-mix(in_srgb,var(--khor-navy)_10%,transparent)] text-[var(--khor-navy)] border-[color-mix(in_srgb,var(--khor-navy)_20%,transparent)]',
        accent: 'bg-[color-mix(in_srgb,var(--khor-accent)_10%,transparent)] text-[var(--khor-accent)] border-[color-mix(in_srgb,var(--khor-accent)_20%,transparent)]',
        success: 'bg-[color-mix(in_srgb,var(--khor-success)_10%,transparent)] text-[var(--khor-success)] border-[color-mix(in_srgb,var(--khor-success)_20%,transparent)]',
        error: 'bg-[color-mix(in_srgb,var(--khor-error)_10%,transparent)] text-[var(--khor-error)] border-[color-mix(in_srgb,var(--khor-error)_20%,transparent)]',
        warning: 'bg-[color-mix(in_srgb,var(--khor-warning)_10%,transparent)] text-[var(--khor-warning)] border-[color-mix(in_srgb,var(--khor-warning)_20%,transparent)]',
        info: 'bg-[color-mix(in_srgb,var(--khor-info)_10%,transparent)] text-[var(--khor-info)] border-[color-mix(in_srgb,var(--khor-info)_20%,transparent)]',
        default: 'bg-[var(--khor-neutral-100)] text-[var(--khor-neutral-600)] border-[var(--khor-neutral-200)]',
      },
      bordered: {
        true: '',
        false: 'border-transparent',
      }
    },
    defaultVariants: {
      color: 'default',
      bordered: true,
    }
  }
);

export interface KTagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  color?: KTagColor | string;
  icon?: React.ReactNode;
  bordered?: boolean;
  closable?: boolean;
  onClose?: (e: React.MouseEvent) => void;
}

export const KTag = React.forwardRef<HTMLSpanElement, KTagProps>(function KTag(
  { className, color = 'default', bordered = true, icon, closable, onClose, children, style, ...rest }, ref
) {
  // If color is not standard, we inject it via style roughly
  const isCustomColor = color && !['primary', 'navy', 'accent', 'success', 'error', 'warning', 'info', 'default'].includes(color);
  
  const customStyles = isCustomColor ? {
    backgroundColor: color, 
    color: '#fff',
    borderColor: color,
  } : {};

  return (
    <span
      ref={ref}
      className={cn(tagVariants({ color: isCustomColor ? undefined : color as any, bordered }), className)}
      style={{ ...customStyles, ...style }}
      {...rest}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
      {closable && (
        <span 
          className="cursor-pointer opacity-60 hover:opacity-100 transition-opacity ml-1"
          onClick={(e) => {
            e.stopPropagation();
            onClose?.(e);
          }}
        >
          ×
        </span>
      )}
    </span>
  );
});
KTag.displayName = 'KTag';

export interface KCheckableTagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const KCheckableTag = React.forwardRef<HTMLSpanElement, KCheckableTagProps>(function KCheckableTag(
  { className, checked = false, onChange, children, ...rest }, ref
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded flex-shrink-0 cursor-pointer px-2 py-0.5 text-xs font-semibold font-primary transition-colors',
        checked 
          ? 'bg-[var(--khor-primary)] text-white' 
          : 'bg-transparent text-[var(--khor-neutral-900)] hover:bg-[var(--khor-neutral-100)] border border-transparent hover:border-[var(--khor-neutral-200)]',
        className
      )}
      onClick={() => onChange?.(!checked)}
      {...rest}
    >
      {children}
    </span>
  );
});
KCheckableTag.displayName = 'KCheckableTag';

export default KTag;
