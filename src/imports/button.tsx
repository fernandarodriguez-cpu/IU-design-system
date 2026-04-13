import React from 'react';
import { khorTokens } from '../theme/khor-theme';

export interface KButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
}

/**
 * KButton — Átomo de acción.
 * Basado en Radix + Tailwind V4 + Khor Tokens.
 */
export const KButton = React.forwardRef<HTMLButtonElement, KButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false, 
    loading = false, 
    icon, 
    iconPosition = 'start',
    children, 
    className = '', 
    disabled,
    ...props 
  }, ref) => {
    
    const variants = {
      primary: 'bg-khor-primary text-white hover:bg-khor-primary-hover active:bg-khor-primary-active border-transparent shadow-sm',
      secondary: 'bg-khor-navy text-white hover:bg-khor-navy-hover active:bg-khor-navy-active border-transparent',
      outline: 'bg-transparent border-khor-neutral-200 text-khor-neutral-900 hover:bg-khor-neutral-100 hover:border-khor-neutral-300',
      ghost: 'bg-transparent border-transparent text-khor-neutral-500 hover:bg-khor-neutral-100',
      danger: 'bg-khor-error text-white hover:bg-red-700 active:bg-red-800 border-transparent',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs h-8',
      md: 'px-4 py-2 text-sm h-10',
      lg: 'px-6 py-3 text-base h-12',
    };

    const baseClasses = [
      "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:pointer-events-none [&_svg]:shrink-0 min-h-[44px] min-w-[44px] font-[family-name:var(--font-family-primary,Montserrat,sans-serif)]",
      "font-primary border", // Se asume font-primary en CSS resolviendo a Montserrat
      variants[variant],
      sizes[size],
      fullWidth ? 'w-full' : '',
      className
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-2" />}
        {!loading && icon && iconPosition === 'start' && <span>{icon}</span>}
        {children}
        {!loading && icon && iconPosition === 'end' && <span>{icon}</span>}
      </button>
    );
  }
);

KButton.displayName = 'KButton';
