import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../../../imports/utils';
import type { KButtonProps } from './types';
export type { KButtonProps };
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer border border-transparent shadow-khor-sm relative overflow-hidden active:scale-[0.97]',
  {
    variants: {
      variant: {
        primary: 'bg-khor-action-primary text-khor-text-on-action hover:bg-khor-action-primary-hover active:bg-khor-action-primary-active hover:shadow-khor-md after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-white/20 after:pointer-events-none',
        secondary: 'bg-khor-secondary text-khor-text-on-action hover:bg-khor-secondary-hover active:bg-khor-action-secondary-active hover:shadow-khor-md after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-white/20 after:pointer-events-none',
        outline: 'border-khor-border-strong bg-transparent text-khor-text-primary hover:bg-khor-surface-hover active:bg-khor-surface-pressed hover:border-khor-border-hover shadow-none',
        ghost: 'bg-transparent text-khor-text-primary hover:bg-khor-action-ghost-hover active:bg-khor-surface-pressed shadow-none',
        danger: 'bg-khor-action-danger text-khor-text-on-action hover:bg-khor-action-danger-hover active:bg-khor-action-danger-active hover:shadow-khor-md after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-white/20',
        link: 'bg-transparent text-khor-action-primary underline-offset-4 hover:underline !p-0 !min-h-0 !h-auto border-none shadow-none active:scale-100',
        text: 'bg-transparent text-khor-text-primary hover:bg-khor-action-ghost-hover active:bg-khor-surface-pressed border-none shadow-none',
        solid: 'bg-khor-action-primary text-khor-text-on-action hover:bg-khor-action-primary-hover active:bg-khor-action-primary-active hover:shadow-khor-md after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-white/20',
        filled: 'bg-khor-surface-page text-khor-text-primary hover:bg-khor-surface-hover active:bg-khor-surface-pressed border-none shadow-none',
      },
      size: {
        sm: 'h-[var(--khor-density-height-sm)] min-w-[var(--khor-density-min-width-button)] px-[var(--khor-space-3)] text-xs',
        md: 'h-[var(--khor-density-height-md)] min-w-[var(--khor-density-min-width-button)] px-[var(--khor-space-4)] text-[length:var(--khor-density-font-body)]',
        lg: 'h-[var(--khor-density-height-lg)] min-w-[var(--khor-density-min-width-button)] px-[var(--khor-space-8)]',
        icon: 'h-[var(--khor-density-height-md)] w-[var(--khor-density-height-md)] p-0 !min-w-0',
      },
      color: {
        default: '',
        primary: 'bg-khor-action-primary text-khor-text-on-action hover:bg-khor-action-primary-hover',
        secondary: 'bg-khor-secondary text-khor-text-on-action hover:bg-khor-secondary-hover',
        danger: 'bg-khor-action-danger text-khor-text-on-action hover:bg-khor-action-danger-hover',
        processing: 'bg-khor-feedback-processing text-khor-text-on-action hover:opacity-90',
        volcano: 'bg-khor-feedback-volcano text-khor-text-on-action hover:opacity-90',
        gold: 'bg-khor-feedback-gold text-khor-text-on-action hover:opacity-90',
        lime: 'bg-khor-feedback-lime text-black hover:opacity-90',
        purple: 'bg-khor-feedback-purple text-khor-text-on-action hover:opacity-90',
      },
      shape: {
        default: 'rounded-[var(--khor-radius-md)]',
        circle: 'rounded-full aspect-square p-0 flex-shrink-0',
        round: 'rounded-full px-6',
      },
      fullWidth: {
        true: 'w-full',
      },
      ghost: {
        true: 'bg-transparent shadow-none',
      },
      isHovered: {
        true: 'bg-khor-surface-hover shadow-khor-md ring-2 ring-khor-action-primary/10',
      },
      isPressed: {
        true: 'bg-khor-surface-pressed scale-[0.97] shadow-none',
      },
      isActive: {
        true: 'ring-2 ring-khor-action-primary ring-offset-2',
      },
      danger: {
        true: '',
      }
    },
    compoundVariants: [
      // Semantic Colors + Outline
      { variant: 'outline', color: 'primary', className: 'text-khor-action-primary border-khor-action-primary/30 hover:bg-khor-success-light/20' },
      { variant: 'outline', color: 'secondary', className: 'text-khor-secondary border-khor-secondary/30 hover:bg-khor-secondary/5' },
      { variant: 'outline', color: 'danger', className: 'text-khor-action-danger border-khor-action-danger/30 hover:bg-khor-error-light/20' },
      { variant: 'outline', color: 'volcano', className: 'text-khor-feedback-volcano border-khor-feedback-volcano/30 hover:bg-khor-feedback-volcano/5' },
      
      // Semantic Colors + Link/Text
      { variant: 'link', color: 'secondary', className: 'text-khor-secondary' },
      { variant: 'text', color: 'secondary', className: 'text-khor-secondary' },

      // Legacy Danger compatibility
      { variant: 'primary', danger: true, className: 'bg-khor-error hover:bg-khor-error/90' },
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
    href, target, danger: rawDanger, ghost, autoInsertSpace = true,
    isHovered, isPressed, isActive,
    classNames, styles, onClick,
    loading: rawLoading, icon, iconPosition = 'start', block, fullWidth, disabled, children,
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
    color: color as any,
    size: computedSize, 
    shape, 
    fullWidth: isFullWidth, 
    ghost,
    isHovered,
    isPressed,
    isActive,
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
