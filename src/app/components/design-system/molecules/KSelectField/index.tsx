import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, Check, ChevronUp } from 'lucide-react';
import { cn } from '../../../../../imports/utils';
import { KFormField } from '../KFormField/index';

/* ═══════════════════════════════════════════════
   KSelect — Primitivas (Radix UI + Tailwind)
   ═══════════════════════════════════════════════ */

export const KSelectRoot = SelectPrimitive.Root;
export const KSelectGroup = SelectPrimitive.Group;
export const KSelectValue = SelectPrimitive.Value;

export const KSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { error?: boolean }
>(({ className, children, error, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border bg-khor-surface-page px-3 py-2 text-sm ring-offset-khor-surface-page placeholder:text-khor-neutral-500 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 font-primary transition-all",
      error 
        ? "border-khor-feedback-error focus:ring-khor-feedback-error focus:ring-opacity-50 text-khor-feedback-error"
        : "border-khor-neutral-200 focus:ring-khor-primary-light focus:border-khor-primary text-foreground hover:border-khor-primary-light",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
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
      <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1 bg-khor-neutral-50">
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
      <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1 bg-khor-neutral-50">
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
      "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-khor-neutral-100 focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
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
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  loading?: boolean;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  size?: 'small' | 'middle' | 'large';
  allowClear?: boolean;
  showSearch?: boolean;
  status?: 'error' | 'warning';
}

export const KSelectField = React.forwardRef<HTMLButtonElement, KSelectFieldProps>(
  ({ label, placeholder, options = [], value, onChange, disabled, loading, error, hint, required, className, size = 'middle' }, ref) => {
    return (
      <KFormField 
        label={label} 
        required={required} 
        error={error} 
        hint={hint}
        className={className}
      >
        <KSelectRoot value={value} onValueChange={onChange} disabled={disabled || loading}>
          <KSelectTrigger 
            ref={ref} 
            error={!!error}
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
