import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const textareaVariants = cva(
  'flex w-full rounded-md border text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khor-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-primary p-khor-3 resize-y min-h-[var(--khor-density-height-input)]',
  {
    variants: {
      variant: {
        outlined: 'border-khor-neutral-200 bg-khor-neutral-50 text-foreground',
        borderless: 'border-transparent bg-transparent text-foreground shadow-none focus-visible:ring-0',
        filled: 'border-transparent bg-khor-neutral-100 text-foreground focus-within:bg-khor-neutral-50',
      },
      status: {
        default: '',
        error: 'border-khor-error focus-visible:ring-khor-error',
        warning: 'border-khor-warning focus-within:ring-khor-warning',
      }
    },
    defaultVariants: {
      variant: 'outlined',
      status: 'default',
    },
  }
);

export interface KTextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'status'> {
  /** Error message or boolean */
  error?: string | boolean;
  /** Warning message or boolean */
  warning?: string | boolean;
  /** Status visual */
  status?: 'error' | 'warning' | 'default';
  /** Ocupar 100% de la anchura */
  block?: boolean;
  /** Estilo visual */
  variant?: 'outlined' | 'borderless' | 'filled';
  /** 
   * Ajuste automático de altura. 
   * Puede ser boolean o objeto con minRows y maxRows.
   */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  /** Mostrar contador de caracteres */
  showCount?: boolean | { formatter: (info: { value: string; count: number; maxLength?: number }) => React.ReactNode };
}

export const KTextArea = React.forwardRef<HTMLTextAreaElement, KTextAreaProps>(
  function KTextArea(
    { error, warning, status: propStatus, block, variant = 'outlined', autoSize, showCount, maxLength, className, style, disabled, onChange, value, defaultValue, ...rest },
    ref,
  ) {
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const isControlled = value !== undefined;
    const currentVal = String(isControlled ? value : internalValue);
    
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    React.useImperativeHandle(ref, () => textAreaRef.current!);

    const status = propStatus || (error ? 'error' : warning ? 'warning' : 'default');
    const feedbackMsg = typeof error === 'string' ? error : typeof warning === 'string' ? warning : undefined;

    // Lógica de auto-resize
    useEffect(() => {
      if (autoSize && textAreaRef.current) {
        const node = textAreaRef.current;
        node.style.height = 'auto';
        let targetHeight = node.scrollHeight;
        
        if (typeof autoSize === 'object') {
          const lineHeight = 20; // Aproximación basica
          if (autoSize.minRows) targetHeight = Math.max(targetHeight, autoSize.minRows * lineHeight);
          if (autoSize.maxRows) targetHeight = Math.min(targetHeight, autoSize.maxRows * lineHeight);
        }
        
        node.style.height = `${targetHeight}px`;
      }
    }, [currentVal, autoSize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const countInfo = {
      value: currentVal,
      count: currentVal.length,
      maxLength,
    };

    const renderCount = () => {
      if (!showCount) return null;
      if (typeof showCount === 'object' && showCount.formatter) {
        return showCount.formatter(countInfo);
      }
      return (
        <span className="text-[10px] text-khor-neutral-400 ml-auto font-mono">
          {countInfo.count}{maxLength ? ` / ${maxLength}` : ''}
        </span>
      );
    };

    return (
      <div style={{ width: block ? '100%' : undefined, ...style }} className={cn("flex flex-col gap-1", block ? "w-full" : "", className)}>
        <textarea
          ref={textAreaRef}
          disabled={disabled}
          value={currentVal}
          onChange={handleChange}
          maxLength={maxLength}
          className={cn(
            textareaVariants({ variant, status }),
            autoSize && "overflow-hidden resize-none"
          )}
          {...rest}
        />
        <div className="flex items-center justify-between px-1">
           {feedbackMsg && (
             <p className={cn(
               "text-xs m-0 font-primary",
               status === 'error' ? "text-khor-error" : "text-khor-warning"
             )}>
               {feedbackMsg}
             </p>
           )}
           {renderCount()}
        </div>
      </div>
    );
  }
);

KTextArea.displayName = "KInput.TextArea";
