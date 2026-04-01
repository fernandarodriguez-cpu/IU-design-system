import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export interface KSwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: React.ReactNode;
  size?: 'sm' | 'md';
  loading?: boolean;
}

export const KSwitch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, KSwitchProps>(function KSwitch(
  { className, label, children, size = 'md', loading, disabled, ...rest }, ref
) {
  const isSmall = size === 'sm';
  const content = label || children;
  
  const switchElement = (
    <div className="relative inline-flex items-center">
      <SwitchPrimitive.Root
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--khor-primary)] focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-[var(--khor-primary)] data-[state=unchecked]:bg-[var(--khor-neutral-300)] hover:data-[state=unchecked]:bg-[var(--khor-neutral-400)]",
          isSmall ? "h-4 w-7" : "h-5 w-9",
          className
        )}
        {...rest}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-[var(--khor-surface-page)] shadow-lg ring-0 transition-transform",
            "data-[state=checked]:translate-x-full data-[state=unchecked]:translate-x-0 ml-[1px]",
            isSmall ? "h-3 w-3" : "h-4 w-4"
          )}
        />
      </SwitchPrimitive.Root>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className={cn("animate-spin text-white opacity-80", isSmall ? "w-2.5 h-2.5" : "w-3 h-3")} />
        </div>
      )}
    </div>
  );

  if (!content) return switchElement;

  return (
    <label className={cn(
      "inline-flex items-center gap-2 cursor-pointer font-primary",
      (disabled || loading) ? "cursor-not-allowed opacity-50" : ""
    )}>
      {switchElement}
      <span className={cn(
        "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[var(--khor-neutral-900)]",
        isSmall ? "text-xs" : "text-sm"
      )}>
        {content}
      </span>
    </label>
  );
});

KSwitch.displayName = 'KSwitch';

export default KSwitch;
