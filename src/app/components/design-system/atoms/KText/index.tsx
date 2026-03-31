import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../../../imports/utils';

export interface KTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'h1' | 'h2' | 'h3' | 'body-lg' | 'body-md' | 'small' | 'caption';
  color?: 'default' | 'secondary' | 'primary' | 'navy' | 'success' | 'error' | 'muted';
  as?: React.ElementType;
  strong?: boolean;
  italic?: boolean;
  underline?: boolean;
  delete?: boolean;
  mark?: boolean;
  code?: boolean;
  keyboard?: boolean;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
}

const textVariants = cva('font-primary m-0', {
  variants: {
    variant: {
      h1: 'text-[38px] font-bold leading-[1.2]',
      h2: 'text-[30px] font-bold leading-[1.2]',
      h3: 'text-[24px] font-semibold leading-[1.3]',
      'body-lg': 'text-[16px] font-normal leading-normal',
      'body-md': 'text-[14px] font-normal leading-normal',
      small: 'text-[12px] font-medium leading-normal',
      caption: 'text-[11px] font-normal leading-normal',
    },
    color: {
      default: 'text-[var(--khor-neutral-900)]',
      secondary: 'text-[var(--khor-neutral-500)]',
      primary: 'text-[var(--khor-primary)]',
      navy: 'text-[var(--khor-navy)]',
      success: 'text-[var(--khor-success)]',
      error: 'text-[var(--khor-error)]',
      muted: 'text-[var(--khor-neutral-400)]',
    },
    semanticType: {
      secondary: 'text-[var(--khor-neutral-500)]',
      success: 'text-[var(--khor-success)]',
      warning: 'text-[var(--khor-warning)]',
      danger: 'text-[var(--khor-error)]',
      default: '',
    }
  },
  defaultVariants: {
    variant: 'body-md',
    color: 'default',
    semanticType: 'default',
  }
});

export const KText = React.forwardRef<HTMLElement, KTextProps>(
  ({
    className,
    variant = 'body-md',
    color = 'default',
    type,
    as,
    strong,
    italic,
    underline,
    delete: del,
    mark,
    code,
    keyboard,
    children,
    ...props
  }, ref) => {
    // Determinar elemento HTML 
    let Component = as as any || 'span';
    if (!as) {
      if (variant === 'h1') Component = 'h1';
      else if (variant === 'h2') Component = 'h2';
      else if (variant === 'h3') Component = 'h3';
    }

    // Wrap children in formatting semantics
    let content = children;
    if (strong) content = <strong>{content}</strong>;
    if (italic) content = <em>{content}</em>;
    if (underline) content = <u>{content}</u>;
    if (del) content = <del>{content}</del>;
    if (mark) content = <mark className="bg-[var(--khor-warning-light)] px-1 rounded">{content}</mark>;
    if (code) content = <code className="bg-[var(--khor-neutral-100)] text-[var(--khor-error)] px-1.5 py-0.5 rounded text-[0.9em] font-mono">{content}</code>;
    if (keyboard) content = <kbd className="bg-[var(--khor-neutral-100)] border border-[var(--khor-neutral-300)] border-b-2 px-1.5 py-0.5 rounded text-[0.9em] font-mono">{content}</kbd>;

    return (
      <Component 
        ref={ref}
        className={cn(textVariants({ variant, color, semanticType: type || 'default', className }))}
        {...props}
      >
        {content}
      </Component>
    );
  }
);
KText.displayName = 'KText';

export interface KParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
}

export const KParagraph = React.forwardRef<HTMLParagraphElement, KParagraphProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p 
        ref={ref} 
        className={cn('mb-4 text-[14px] leading-relaxed text-[var(--khor-neutral-900)] font-primary', className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
KParagraph.displayName = 'KParagraph';

export const KLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <a 
        ref={ref} 
        className={cn('text-[var(--khor-text-link)] hover:underline cursor-pointer font-primary transition-colors hover:text-[var(--khor-primary-hover)] active:text-[var(--khor-primary-active)]', className)}
        {...props}
      >
        {children}
      </a>
    );
  }
);
KLink.displayName = 'KLink';

export default KText;
