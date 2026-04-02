import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../../../imports/utils';
import type { KButtonProps } from './types';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer border border-transparent',
  {
    variants: {
      variant: {
        primary: 'bg-khor-primary text-white! hover:bg-khor-primary-hover active:bg-khor-primary-active hover:shadow-md active:scale-95 transition-all',
        secondary: 'bg-khor-neutral-200 text-khor-neutral-900 hover:bg-khor-neutral-300 active:bg-khor-neutral-400 active:scale-95 transition-all',
        outline: 'border-khor-neutral-300 bg-transparent text-khor-neutral-700 hover:bg-khor-neutral-100 active:bg-khor-neutral-200 active:scale-95 transition-all',
        outlined: 'border-khor-neutral-300 bg-transparent text-khor-neutral-700 hover:bg-khor-neutral-100 active:bg-khor-neutral-200 active:scale-95 transition-all',
        ghost: 'bg-transparent text-khor-neutral-700 hover:bg-khor-neutral-100 active:bg-khor-neutral-200 active:scale-95 transition-all',
        danger: 'bg-khor-error text-white! hover:bg-khor-action-danger-hover active:bg-khor-action-danger-active hover:shadow-md active:scale-95 transition-all',
        navy: 'bg-khor-navy text-white! hover:bg-khor-navy-hover active:bg-khor-navy-active hover:shadow-md active:scale-95 transition-all',
        dashed: 'border-dashed border-khor-neutral-300 bg-transparent text-khor-neutral-700 hover:bg-khor-neutral-100 active:bg-khor-neutral-200 active:scale-95 transition-all',
        link: 'bg-transparent text-khor-primary underline-offset-4 hover:underline !p-0 !min-h-0 !h-auto border-none',
        text: 'bg-transparent text-khor-neutral-700 hover:bg-khor-neutral-100 active:bg-khor-neutral-200 transition-all border-none',
        solid: 'bg-khor-primary text-white! hover:bg-khor-primary-hover active:bg-khor-primary-active',
        filled: 'bg-khor-neutral-100 text-khor-neutral-900 hover:bg-khor-neutral-200 border-none',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-[var(--khor-density-height-input)] px-[var(--khor-density-spacing-md)] text-[length:var(--khor-density-font-body)]',
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
      },
      danger: {
        true: '',
      },
      ghost: {
        true: 'bg-transparent!',
      }
    },
    compoundVariants: [
      // Danger combinations
      { variant: 'primary', danger: true, className: 'bg-khor-error hover:bg-khor-action-danger-hover active:bg-khor-action-danger-active' },
      { variant: 'solid', danger: true, className: 'bg-khor-error hover:bg-khor-action-danger-hover active:bg-khor-action-danger-active' },
      { variant: 'secondary', danger: true, className: 'text-khor-error bg-khor-error-light/10 hover:bg-khor-error-light/20 active:bg-khor-error-light/30' },
      { variant: 'outline', danger: true, className: 'text-khor-error border-khor-error hover:bg-khor-error-light/10' },
      { variant: 'outlined', danger: true, className: 'text-khor-error border-khor-error hover:bg-khor-error-light/10' },
      { variant: 'dashed', danger: true, className: 'text-khor-error border-khor-error hover:bg-khor-error-light/10' },
      { variant: 'text', danger: true, className: 'text-khor-error hover:bg-khor-error-light/10' },
      { variant: 'link', danger: true, className: 'text-khor-error' },
      
      // Ghost combinations
      { variant: 'primary', ghost: true, className: 'text-khor-primary border-khor-primary hover:bg-khor-primary-light/10 active:bg-khor-primary-light/20' },
      { variant: 'primary', ghost: true, danger: true, className: 'text-khor-error border-khor-error hover:bg-khor-error-light/10 active:bg-khor-error-light/20' },
      { variant: 'navy', ghost: true, className: 'text-khor-navy border-khor-navy hover:bg-khor-navy/10 active:bg-khor-navy/20' },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      shape: 'default',
    },
  }
);

/**
 * Función interna para insertar espacio entre dos caracteres (CJK o similar)
 */
const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

function insertSpace(child: React.ReactNode, needSpace: boolean) {
  if (child === null || child === undefined) return null;
  if (!needSpace) return child;
  if (typeof child === 'string' && isTwoCNChar(child)) {
    return child.split('').join(' ');
  }
  return child;
}

export const KButton = React.forwardRef<any, KButtonProps>(function KButton(
  { 
    variant, color, kVariant, size = 'md', shape = 'default', 
    htmlType = 'button', type, className,
    fullWidth, block, loading: rawLoading, icon, iconPosition = 'start', children, disabled,
    href, target, danger: rawDanger, ghost, autoInsertSpace = true,
    classNames, styles, onClick,
    ...rest 
  },
  ref,
) {
  const [innerLoading, setInnerLoading] = useState(false);
  const loading = typeof rawLoading === 'object' ? innerLoading : rawLoading;
  const delay = typeof rawLoading === 'object' ? rawLoading.delay : 0;

  useEffect(() => {
    let timer: any;
    if (typeof rawLoading === 'object' && rawLoading.delay) {
       if (rawLoading.delay > 0) {
          timer = setTimeout(() => setInnerLoading(true), rawLoading.delay);
       } else {
          setInnerLoading(true);
       }
    } else {
      setInnerLoading(!!rawLoading);
    }
    return () => timer && clearTimeout(timer);
  }, [rawLoading]);

  // Manejo de color vs danger
  const danger = rawDanger || color === 'danger';
  
  // Resolución de variate moderna vs legacy
  let resolvedVariant = kVariant ?? variant ?? 'primary';
  if (color === 'primary' && !variant) resolvedVariant = 'primary';
  
  const isFullWidth = fullWidth || block;
  const isDisabled = disabled || loading;

  // Manejo especial para size icon en shape circle puro
  let computedSize = size;
  if (shape === 'circle' && !children && icon) {
     computedSize = size === 'sm' ? 'sm' : (size === 'lg' ? 'lg' : 'icon');
  }

  const computedClasses = cn(buttonVariants({ 
    variant: resolvedVariant as any, 
    size: computedSize, 
    shape, 
    fullWidth: isFullWidth, 
    danger, 
    ghost,
    className 
  }));

  const commonProps = {
    ref,
    className: computedClasses,
    'data-loading': loading,
    style: { fontFamily: 'var(--font-primary)', ...rest.style },
    onClick: (e: any) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    },
    ...rest
  };

  // Lógica de espaciado
  const processedChildren = React.Children.map(children, (child) => 
    insertSpace(child, autoInsertSpace && React.Children.count(children) === 1)
  );

  const content = (
    <>
      {(loading || innerLoading) && (
        <span className={cn("shrink-0", classNames?.icon)} style={styles?.icon}>
          <Loader2 className="h-[1.2em] w-[1.2em] animate-spin" />
        </span>
      )}
      {!loading && !innerLoading && icon && iconPosition === 'start' && (
        <span className={cn("flex items-center justify-center pointer-events-none shrink-0", classNames?.icon)} style={styles?.icon}>
          {icon}
        </span>
      )}
      {children && (
        <span className={cn("truncate", classNames?.content)} style={styles?.content}>
          {processedChildren}
        </span>
      )}
      {!loading && !innerLoading && icon && iconPosition === 'end' && (
        <span className={cn("flex items-center justify-center pointer-events-none shrink-0", classNames?.icon)} style={styles?.icon}>
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a 
        href={isDisabled ? undefined : href} 
        target={target} 
        {...(isDisabled ? { 'aria-disabled': true } : {})}
        {...(commonProps as any)}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type ?? htmlType}
      disabled={isDisabled}
      {...commonProps}
    >
      {content}
    </button>
  );
});

KButton.displayName = "KButton";

export default KButton;
