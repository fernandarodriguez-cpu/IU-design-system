import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, Check, ChevronUp, XCircle } from 'lucide-react';
import { cn } from '../../../../../imports/utils';
import { KFormField } from '../KFormField/index';
import { KSelectAdvanced } from '../KSelectAdvanced/index';

/* ═══════════════════════════════════════════════
   KSelect — Primitivas (Radix UI + Tailwind)
   ═══════════════════════════════════════════════ */

export const KSelectRoot = SelectPrimitive.Root;
export const KSelectGroup = SelectPrimitive.Group;
export const KSelectValue = SelectPrimitive.Value;

export const KSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { error?: boolean; allowClear?: boolean; onClear?: () => void; hasValue?: boolean }
>(({ className, children, error, allowClear, onClear, hasValue, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "relative flex h-10 w-full items-center justify-between rounded-md border bg-khor-surface-page px-3 py-2 text-sm ring-offset-khor-surface-page placeholder:text-khor-neutral-500 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 font-primary transition-all pe-8",
      error 
        ? "border-khor-feedback-error focus:ring-khor-feedback-error focus:ring-opacity-50 text-khor-feedback-error"
        : "border-khor-neutral-200 focus:ring-khor-primary-light focus:border-khor-primary text-foreground hover:border-khor-primary-light",
      className
    )}
    {...props}
  >
    <div className="flex-1 truncate text-start">{children}</div>
    <div className="absolute end-2 flex items-center gap-1">
      {allowClear && hasValue && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClear?.();
          }}
          className="text-khor-neutral-400 hover:text-khor-neutral-600 transition-colors z-10 p-0.5"
        >
          <XCircle size={14} className="fill-khor-surface-page" />
        </button>
      )}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </div>
  </SelectPrimitive.Trigger>
));
KSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export const KSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-khor-neutral-200 bg-khor-surface-page text-foreground shadow-md animate-in fade-in-80 zoom-in-95 font-primary",
        position === "popper" && "translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1 bg-khor-surface-subtle">
        <ChevronUp className="h-4 w-4" />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1 bg-khor-surface-subtle">
        <ChevronDown className="h-4 w-4" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
KSelectContent.displayName = SelectPrimitive.Content.displayName;

export const KSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none transition-colors focus:bg-khor-surface-hover focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute start-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-khor-primary" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
KSelectItem.displayName = SelectPrimitive.Item.displayName;

/* ═══════════════════════════════════════════════
   KSelectField — Molécula de conveniencia
   ═══════════════════════════════════════════════ */

export interface KSelectFieldProps {
  label?: string;
  placeholder?: string;
  options?: { label: string; value: string; disabled?: boolean }[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: any) => void;
  disabled?: boolean;
  loading?: boolean;
  error?: string | boolean;
  hint?: string;
  required?: boolean;
  className?: string;
  size?: 'small' | 'middle' | 'large';
  allowClear?: boolean;
  showSearch?: boolean; // Se habilitará futuramente o se redirige a KSelectAdvanced
  status?: 'error' | 'warning';
  mode?: 'single' | 'multiple' | 'tags';
}

export const KSelectField = React.forwardRef<HTMLButtonElement, KSelectFieldProps>(
  ({ 
    label, placeholder, options = [], value, defaultValue, onChange, 
    disabled, loading, error, hint, required, className, 
    size = 'middle', allowClear, status, mode = 'single', showSearch 
  }, ref) => {
    
    // Si el modo es multiple o tags (o requiere search nativo no soportado por Radix Select), usamos KSelectAdvanced
    if (mode === 'multiple' || mode === 'tags' || showSearch) {
      const advancedValue = value !== undefined ? (mode === 'single' ? String(value) : value) : undefined;
      return (
        <KFormField 
          label={label} 
          required={required} 
          error={typeof error === 'string' ? error : undefined} 
          hint={hint}
          className={className}
        >
          <KSelectAdvanced
            placeholder={placeholder}
            options={options}
            mode={mode}
            value={advancedValue as any}
            onChange={onChange}
            disabled={disabled || loading}
            status={status || (error ? 'error' : undefined)}
            className={cn(
              size === 'small' && "min-h-8 text-xs",
              size === 'large' && "min-h-12 text-base"
            )}
            allowClear={allowClear}
          />
        </KFormField>
      );
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [internalValue, setInternalValue] = React.useState<string | undefined>(
      (value !== undefined ? String(value) : defaultValue !== undefined ? String(defaultValue) : undefined)
    );
    const isControlled = value !== undefined;
    const currentVal = isControlled ? String(value) : internalValue;

    const handleValueChange = (newVal: string) => {
      if (!isControlled) setInternalValue(newVal);
      onChange?.(newVal);
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue("");
      onChange?.("");
    };

    return (
      <KFormField 
        label={label} 
        required={required} 
        error={typeof error === 'string' ? error : undefined} 
        hint={hint}
        className={className}
      >
        <KSelectRoot 
          value={currentVal === "" ? undefined : currentVal} 
          onValueChange={handleValueChange} 
          disabled={disabled || loading}
        >
          <KSelectTrigger 
            ref={ref} 
            error={!!error || status === 'error'}
            allowClear={allowClear}
            onClear={handleClear}
            hasValue={!!currentVal}
            className={cn(
              size === 'small' && "h-8 px-2 text-xs",
              size === 'large' && "h-12 px-4 text-base"
            )}
          >
            <KSelectValue placeholder={placeholder} />
          </KSelectTrigger>
          <KSelectContent>
            {options.map((opt) => (
              <KSelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </KSelectItem>
            ))}
          </KSelectContent>
        </KSelectRoot>
      </KFormField>
    );
  }
);

KSelectField.displayName = 'KSelectField';

export default KSelectField;
