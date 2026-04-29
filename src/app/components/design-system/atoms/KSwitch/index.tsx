import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export interface KSwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?: React.ReactNode;
  size?: 'sm' | 'md' | 'small' | 'default';
  loading?: boolean;
  checkedChildren?: React.ReactNode;
  unCheckedChildren?: React.ReactNode;
  /** Fuerza el estado hover (útil para previews/playgrounds) */
  isHovered?: boolean;
  /** Fuerza el estado de foco (útil para previews/playgrounds) */
  isFocused?: boolean;
}

export const KSwitch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, KSwitchProps>(function KSwitch(
  { className, label, children, size = 'md', loading, disabled, checkedChildren, unCheckedChildren, isHovered, isFocused, ...rest }, ref
) {
  const isSmall = size === 'sm' || size === 'small';
  const content = label || children;
  
  const switchElement = (
    <div className={cn("relative inline-flex items-center", (disabled || loading) ? "cursor-not-allowed opacity-50" : "cursor-pointer")}>
      <SwitchPrimitive.Root
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "peer group relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-[var(--khor-focus-ring-width)] focus-visible:ring-[var(--khor-focus-ring-color)] focus-visible:ring-offset-[var(--khor-focus-ring-offset)]",
          "disabled:cursor-not-allowed disabled:opacity-100",
          "hover:data-[state=unchecked]:bg-khor-slate-300 hover:bg-khor-surface-hover",
          "data-[state=checked]:bg-khor-primary data-[state=unchecked]:bg-khor-slate-200",
          isHovered && "ring-2 ring-khor-primary/10",
          isFocused && "ring-[var(--khor-focus-ring-width)] ring-[var(--khor-focus-ring-color)] ring-offset-1",
          isSmall 
            ? "min-w-[calc(var(--khor-density-height-sm)*1.2)] h-[calc(var(--khor-density-height-sm)*0.6)]" 
            : "min-w-[calc(var(--khor-density-height-md)*1.4)] h-[calc(var(--khor-density-height-md)*0.7)]",
          className
        )}
        {...rest}
      >
        <span className={cn(
          "absolute inset-0 flex items-center justify-between pointer-events-none select-none text-white font-medium",
          isSmall ? "text-[9px]" : "text-[11px]"
        )}>
          <span className={cn(
            "flex-1 flex justify-start opacity-0 group-data-[state=checked]:opacity-100 transition-opacity",
            isSmall ? "pl-1 mr-[10px]" : "pl-1.5 mr-[14px]"
          )}>
             {checkedChildren}
          </span>
          <span className={cn(
            "flex-1 flex justify-end opacity-100 group-data-[state=checked]:opacity-0 transition-opacity",
            isSmall ? "pr-1 ml-[10px]" : "pr-1.5 ml-[14px]"
          )}>
             {unCheckedChildren}
          </span>
        </span>

        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-white shadow-khor-sm ring-0 transition-transform relative flex items-center justify-center border border-black/5",
            isSmall 
              ? "h-[calc(var(--khor-density-height-sm)*0.5)] w-[calc(var(--khor-density-height-sm)*0.5)] data-[state=checked]:translate-x-[calc(var(--khor-density-height-sm)*0.6)] data-[state=unchecked]:translate-x-0" 
              : "h-[calc(var(--khor-density-height-md)*0.6)] w-[calc(var(--khor-density-height-md)*0.6)] data-[state=checked]:translate-x-[calc(var(--khor-density-height-md)*0.7)] data-[state=unchecked]:translate-x-0"
          )}
        >
          {loading && (
            <Loader2 className={cn("animate-spin text-khor-primary absolute", isSmall ? "w-[8px] h-[8px]" : "w-[12px] h-[12px]")} />
          )}
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
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
        "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-khor-neutral-900",
        isSmall ? "text-xs" : "text-sm"
      )}>
        {content}
      </span>
    </label>
  );
});

KSwitch.displayName = 'KSwitch';

export default KSwitch;
