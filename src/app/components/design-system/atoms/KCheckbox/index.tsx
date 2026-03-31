import React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check, Minus } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export interface KCheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  label?: React.ReactNode;
}

export const KCheckbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, KCheckboxProps>(function KCheckbox(
  { className, label, children, ...rest }, ref
) {
  const content = label || children;

  return (
    <label className={cn(
      "inline-flex items-center gap-2 cursor-pointer font-primary",
      rest.disabled ? "cursor-not-allowed opacity-50" : "",
      className
    )}>
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "peer shrink-0 p-0 h-4 w-4 rounded-sm border border-[var(--khor-neutral-300)] bg-[var(--khor-surface-page)]",
          "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--khor-primary)] focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-[var(--khor-primary)] data-[state=checked]:border-[var(--khor-primary)] data-[state=checked]:text-white",
          "data-[state=indeterminate]:bg-[var(--khor-primary)] data-[state=indeterminate]:border-[var(--khor-primary)] data-[state=indeterminate]:text-white"
        )}
        {...rest}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
          {rest.checked === 'indeterminate' ? (
            <Minus className="h-3 w-3" strokeWidth={3} />
          ) : (
            <Check className="h-3 w-3" strokeWidth={3} />
          )}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {content && (
        <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[var(--khor-neutral-900)]">
          {content}
        </span>
      )}
    </label>
  );
});

KCheckbox.displayName = 'KCheckbox';

export default KCheckbox;
