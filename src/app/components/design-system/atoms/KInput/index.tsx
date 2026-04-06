import React, { useState, useRef, useImperativeHandle } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../../../imports/utils';
import { Eye, EyeOff, XCircle } from 'lucide-react';

// Sub-components
import { KInputSearch } from './Search';
import { KTextArea } from './TextArea';
import { KInputOTP } from './OTP';

const inputVariants = cva(
  'flex w-full items-center justify-between rounded-md border text-sm transition-all focus-within:ring-2 focus-within:ring-khor-primary focus-within:ring-offset-2 overflow-hidden font-primary',
  {
    variants: {
      variant: {
        outlined: 'border-khor-neutral-200 bg-khor-neutral-50 text-khor-neutral-900',
        borderless: 'border-transparent bg-transparent text-khor-neutral-900 shadow-none focus-within:ring-0 px-0',
        filled: 'border-transparent bg-khor-neutral-100 text-khor-neutral-900 focus-within:bg-khor-neutral-50',
      },
      size: {
        sm: 'h-8 px-2 text-xs',
        md: 'h-[var(--khor-density-height-input)] px-3 text-[length:var(--khor-density-font-body)]',
        lg: 'h-12 px-4 text-base',
      },
      status: {
        default: '',
        error: 'border-khor-error focus-within:ring-khor-error',
        warning: 'border-khor-warning focus-within:ring-khor-warning',
      },
      disabled: {
        true: 'bg-khor-neutral-100 border-khor-neutral-200 opacity-60 cursor-not-allowed select-none pointer-events-none grayscale-[0.5]',
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

export interface KInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'status'> {
  size?: 'sm' | 'md' | 'lg';
  /** @deprecated use status="error" */
  error?: string | boolean;
  /** @deprecated use status="warning" */
  warning?: string | boolean;
  /** Mensaje de feedback debajo del input */
  helperText?: string;
  /** Estado visual del input */
  status?: 'error' | 'warning' | 'default';
  /** Ocupar 100% del ancho */
  block?: boolean;
  /** Estilo visual */
  variant?: 'outlined' | 'borderless' | 'filled';
  /** Icono o elemento al inicio */
  prefix?: React.ReactNode; 
  /** Icono o elemento al final */
  suffix?: React.ReactNode;
  /** Botón para limpiar el contenido */
  allowClear?: boolean | { clearIcon?: React.ReactNode };
  /** Mostrar contador de caracteres */
  showCount?: boolean | { formatter: (info: { value: string; count: number; maxLength?: number }) => React.ReactNode };
  /** Elemento pegado antes del input */
  addonBefore?: React.ReactNode;
  /** Elemento pegado después del input */
  addonAfter?: React.ReactNode;
  /** Callback llamado al presionar el botón de limpiar */
  onClear?: () => void;
}

/**
 * Base Input Component
 */
const BaseInput = React.forwardRef<HTMLInputElement, KInputProps>(function KInput(
  { 
    size = 'md', error, warning, helperText, status: propStatus, 
    block, variant = 'outlined', prefix, suffix, 
    allowClear, showCount, maxLength,
    addonBefore, addonAfter,
    onClear,
    className, style, disabled, value, defaultValue, onChange, ...rest 
  },
  ref,
) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const isControlled = value !== undefined;
  const currentVal = String(isControlled ? value : internalValue);
  
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!);

  const status = propStatus || (error ? 'error' : warning ? 'warning' : 'default');
  const feedbackMsg = typeof error === 'string' ? error : typeof warning === 'string' ? warning : helperText;
  
  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    if (onChange) {
      const event = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
    onClear?.();
    inputRef.current?.focus();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    if (onChange) onChange(e);
  };

  const renderAddon = (content: React.ReactNode, pos: 'before' | 'after') => {
    if (!content) return null;
    return (
      <div className={cn(
        "flex items-center justify-center bg-khor-neutral-100 border border-khor-neutral-200 px-3 text-khor-neutral-600 shrink-0 select-none",
        pos === 'before' ? "rounded-l-md border-r-0" : "rounded-r-md border-l-0"
      )}>
        {content}
      </div>
    );
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
      <div className="flex w-full group">
        {renderAddon(addonBefore, 'before')}
        <div className={cn(
          inputVariants({ variant, size, status, disabled }),
          addonBefore && "rounded-l-none",
          addonAfter && "rounded-r-none"
        )}>
          {prefix && <div className="mr-2 flex items-center text-khor-neutral-500 shrink-0">{prefix}</div>}
          <input
            ref={inputRef}
            disabled={disabled}
            value={currentVal}
            onChange={handleChange}
            maxLength={maxLength}
            className="w-full bg-transparent outline-none placeholder:text-khor-neutral-400 h-full disabled:cursor-not-allowed"
            {...rest}
          />
          <div className="flex items-center gap-2 shrink-0 ml-2">
            {allowClear && currentVal && !disabled && (
              <button 
                type="button" 
                onClick={handleClear}
                className="text-khor-neutral-400 hover:text-khor-neutral-600 transition-colors"
                title="Limpiar"
              >
                {typeof allowClear === 'object' && allowClear.clearIcon ? allowClear.clearIcon : <XCircle size={16} />}
              </button>
            )}
            {suffix && <div className="flex items-center text-khor-neutral-500">{suffix}</div>}
          </div>
        </div>
        {renderAddon(addonAfter, 'after')}
      </div>
      
      <div className="flex items-center justify-between px-1 text-[0px] leading-[0px]">
        {feedbackMsg && (
          <p className={cn(
            "text-xs m-0 font-primary",
            status === 'error' ? "text-khor-error" : status === 'warning' ? "text-khor-warning" : "text-khor-neutral-500"
          )} style={{ lineHeight: '1.2' }}>
            {feedbackMsg}
          </p>
        )}
        {renderCount()}
      </div>
    </div>
  );
});

export interface KInputPasswordProps extends KInputProps {
  /** 
   * Configuración del toggle de visibilidad.
   * boolean o objeto para controlar estado.
   */
  visibilityToggle?: boolean | { visible?: boolean; onVisibleChange?: (visible: boolean) => void };
  /** Renderizado personalizado del icono */
  iconRender?: (visible: boolean) => React.ReactNode;
}

/**
 * KInputPassword — Variante de input para contraseñas con toggle de visibilidad.
 */
export const KInputPassword = React.forwardRef<HTMLInputElement, KInputPasswordProps>(function KInputPassword(
  { prefix, suffix, visibilityToggle = true, iconRender, ...rest },
  ref,
) {
  const [internalVisible, setInternalVisible] = useState(false);
  const isToggleControlled = typeof visibilityToggle === 'object' && visibilityToggle.visible !== undefined;
  const visible = isToggleControlled ? (visibilityToggle as any).visible : internalVisible;

  const toggleVisibility = () => {
    const next = !visible;
    if (!isToggleControlled) setInternalVisible(next);
    if (typeof visibilityToggle === 'object' && visibilityToggle.onVisibleChange) {
      visibilityToggle.onVisibleChange(next);
    }
  };

  const passwordSuffix = visibilityToggle ? (
    <button
      type="button"
      onClick={toggleVisibility}
      className="flex items-center justify-center text-khor-neutral-400 hover:text-khor-neutral-600 outline-none transition-all hover:scale-110 active:scale-90"
      style={{ width: 20, height: 20 }}
      title={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
    >
      {iconRender ? iconRender(visible) : (visible ? <EyeOff size={16} /> : <Eye size={16} />)}
    </button>
  ) : null;

  return (
    <KInput
      {...rest}
      ref={ref}
      type={visible ? 'text' : 'password'}
      prefix={prefix}
      suffix={
        <div className="flex items-center gap-2">
          {suffix}
          {passwordSuffix}
        </div>
      }
    />
  );
});

// Composed Component Type
export interface CompoundedComponent extends React.ForwardRefExoticComponent<KInputProps & React.RefAttributes<HTMLInputElement>> {
  Password: typeof KInputPassword;
  Search: typeof KInputSearch;
  TextArea: typeof KTextArea;
  OTP: typeof KInputOTP;
}

export const KInput = BaseInput as CompoundedComponent;

KInput.Password = KInputPassword;
KInput.Search = KInputSearch;
KInput.TextArea = KTextArea;
KInput.OTP = KInputOTP;

KInput.displayName = "KInput";

export default KInput;
