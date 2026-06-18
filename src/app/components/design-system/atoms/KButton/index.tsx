import React, { useState, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { KButtonProps } from './types';
export type { KButtonProps };
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-[var(--khor-button-font-weight)] leading-[var(--khor-button-line-height)] transition-all duration-200 disabled:pointer-events-none disabled:bg-[var(--khor-button-disabled-bg)] disabled:border-[var(--khor-button-disabled-border)] disabled:text-[var(--khor-button-disabled-text)] disabled:shadow-none select-none cursor-pointer border border-transparent shadow-khor-sm relative overflow-hidden active:scale-[0.97]',
  {
    variants: {
      variant: {
        primary: 'bg-[var(--khor-button-primary-bg)] text-[var(--khor-button-primary-text)] border-[var(--khor-button-primary-border)] hover:bg-[var(--khor-button-primary-bg-hover)] hover:border-[var(--khor-button-primary-bg-hover)] active:scale-[0.98] hover:shadow-[var(--khor-button-primary-shadow)] transition-all after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-white/20 after:pointer-events-none',
        secondary: 'bg-[var(--khor-button-secondary-bg)] text-[var(--khor-button-secondary-text)] border-[var(--khor-button-secondary-bg)] hover:bg-[var(--khor-button-secondary-bg-hover)] hover:border-[var(--khor-button-secondary-bg-hover)] active:scale-[0.98] transition-all after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-white/20 after:pointer-events-none',
        outline: 'border-[var(--khor-button-outline-border)] bg-transparent text-[var(--khor-button-outline-text)] hover:border-[var(--khor-button-outline-hover)] hover:text-[var(--khor-button-outline-hover)] shadow-none',
        dashed: 'border-dashed border-[var(--khor-button-dashed-border)] bg-transparent text-[var(--khor-button-dashed-text)] hover:border-[var(--khor-button-outline-hover)] hover:text-[var(--khor-button-outline-hover)] shadow-none',
        ghost: 'bg-transparent border-[var(--khor-button-ghost-border)] text-[var(--khor-button-ghost-text)] hover:border-[var(--khor-button-ghost-hover-color)] hover:text-[var(--khor-button-ghost-hover-color)] shadow-none',
        navy: 'bg-khor-navy border-khor-navy text-[var(--khor-button-primary-text)] hover:bg-[var(--khor-button-primary-bg-hover)] hover:border-[var(--khor-button-primary-bg-hover)] active:scale-[0.98] transition-all',
        danger: 'bg-khor-action-danger text-khor-text-on-action hover:bg-khor-action-danger-hover active:bg-khor-action-danger-active hover:shadow-khor-md after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-white/20',
        link: 'bg-transparent text-khor-action-primary underline-offset-4 hover:underline hover:text-[var(--khor-button-outline-hover)] !p-0 !min-h-0 !h-auto border-none shadow-none active:scale-100',
        text: 'bg-transparent text-khor-text-primary hover:bg-khor-action-ghost-hover hover:text-[var(--khor-button-outline-hover)] active:bg-khor-surface-pressed border-none shadow-none',
        solid: 'bg-khor-action-primary text-khor-text-on-action hover:bg-khor-action-primary-hover active:bg-khor-action-primary-active hover:shadow-khor-md after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-white/20',
        filled: 'bg-khor-surface-page text-khor-text-primary hover:bg-khor-surface-hover active:bg-khor-surface-pressed border-none shadow-none',
      },
      size: {
        sm: 'h-[var(--khor-button-height-sm)] min-w-[var(--khor-density-min-width-button)] px-[var(--khor-button-padding-x-sm)] text-[length:var(--khor-button-font-size)] rounded-[var(--khor-button-radius-sm)]',
        md: 'h-[var(--khor-button-height-md)] min-w-[var(--khor-density-min-width-button)] px-[var(--khor-button-padding-x-md)] text-[length:var(--khor-button-font-size)] rounded-[var(--khor-button-radius-md)]',
        lg: 'h-[var(--khor-button-height-lg)] min-w-[var(--khor-density-min-width-button)] px-[var(--khor-button-padding-x-lg)] text-[length:var(--khor-button-font-size)] rounded-[var(--khor-button-radius-lg)]',
        icon: 'h-[var(--khor-button-height-md)] w-[var(--khor-button-height-md)] p-0 !min-w-0 rounded-[var(--khor-button-radius-md)]',
      },
      // Figma Button "Color" axis (Blue/Red) — sin clases propias: el tinte real
      // se aplica vía compoundVariants, ya que cada variant (filled/outlined/text)
      // necesita pintar el color en una propiedad distinta (bg vs border/text).
      color: {
        default: '',
        secondary: '',
        danger: '',
      },
      shape: {
        default: '',
        circle: 'rounded-full aspect-square p-0 flex-shrink-0',
        round: 'rounded-full',
      },
      fullWidth: {
        true: 'w-full',
      },
      // Figma Button "Ghost=True" — convierte cualquier Type filled/outlined en el
      // mismo tratamiento: fondo transparente, borde y texto en tono ghost (azul u rojo).
      ghost: {
        true: 'bg-transparent shadow-none border-[var(--khor-button-ghost-border)] text-[var(--khor-button-ghost-text)] hover:border-[var(--khor-button-ghost-hover-color)] hover:text-[var(--khor-button-ghost-hover-color)] after:hidden',
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
      // Figma Button "Color=Red" (--khor-secondary) sobre variantes "filled"
      { variant: ['primary', 'secondary', 'solid', 'filled', 'navy'], color: 'secondary', className: 'bg-khor-secondary border-khor-secondary text-khor-text-on-action hover:bg-khor-secondary-hover hover:border-khor-secondary-hover' },
      { variant: ['primary', 'secondary', 'solid', 'filled', 'navy'], color: 'danger', className: 'bg-khor-action-danger border-khor-action-danger text-khor-text-on-action hover:bg-khor-action-danger-hover' },

      // Figma Button "Color=Red" sobre variantes "outlined" (Outline/Dashed)
      { variant: ['outline', 'dashed'], color: 'secondary', className: 'text-khor-secondary border-khor-secondary/60 hover:bg-khor-secondary/5' },
      { variant: ['outline', 'dashed'], color: 'danger', className: 'text-khor-action-danger border-khor-action-danger/60 hover:bg-khor-error-light/20' },

      // Figma Button "Color=Red" sobre variantes "text" (Ghost/Text/Link)
      { variant: 'ghost', color: 'secondary', className: 'border-[var(--khor-button-ghost-border-red)] text-[var(--khor-button-ghost-border-red)]' },
      { variant: 'ghost', color: 'danger', className: 'border-khor-action-danger text-khor-action-danger' },
      { variant: ['link', 'text'], color: 'secondary', className: 'text-khor-secondary' },
      { variant: ['link', 'text'], color: 'danger', className: 'text-khor-action-danger' },

      // Figma Button "Ghost=True" boolean (combinable con Primary/Outline/Dashed) + Color=Red
      { ghost: true, color: 'secondary', className: 'border-[var(--khor-button-ghost-border-red)] text-[var(--khor-button-ghost-border-red)] hover:border-[var(--khor-button-ghost-hover-color-red)] hover:text-[var(--khor-button-ghost-hover-color-red)]' },

      // Legacy Danger compatibility (prop booleano danger, no relacionado con color)
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
/**
 * @figma-mcp-migration
 * Component: KButton
 * 
 * INSTRUCCIONES PARA AGENTES DE IA (VS Code / MCP):
 * Para migrar este componente a Figma, NO generar una matriz multiplicando todas las variables.
 * Utilizar Figma Component Properties V2 con la siguiente estructura:
 * 
 * 1. Variants (Estructurales):
 *    - variant: [primary, secondary, outline, ghost, danger, link, text, solid, filled]
 *    - size: [sm, md, lg, icon]
 *    - shape: [default, circle, round]
 * 
 * 2. Booleans (Encendido/Apagado):
 *    - hasIconLeft: true/false
 *    - hasIconRight: true/false
 *    - isLoading: true/false
 * 
 * 3. Text Property:
 *    - label: "Button Text"
 * 
 * 4. Color Variables (No usar variantes para colores semánticos):
 *    - El relleno/borde debe usar Figma Variables (Khor v6.0 Colors) asignado dinámicamente.
 *    - El prop 'color' (primary, secondary, etc) NO debe ser una Variante física en Figma,
 *      sino que el consumidor del UI Kit cambiará el color del layer.
 */
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
  const resolvedVariant = kVariant ?? variant ?? 'primary';

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
