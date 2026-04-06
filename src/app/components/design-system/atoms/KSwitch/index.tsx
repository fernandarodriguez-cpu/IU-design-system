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
}

export const KSwitch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, KSwitchProps>(function KSwitch(
  { className, label, children, size = 'md', loading, disabled, checkedChildren, unCheckedChildren, ...rest }, ref
) {
  const isSmall = size === 'sm' || size === 'small';
  const content = label || children;
  
  const switchElement = (
    <div className={cn("relative inline-flex items-center", (disabled || loading) ? "cursor-not-allowed opacity-50" : "cursor-pointer")}>
      <SwitchPrimitive.Root
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "peer group relative inline-flex shrink-0 items-center rounded-full border-2 border-transparent transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khor-primary focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-100",
          "hover:data-[state=unchecked]:bg-khor-neutral-400",
          "data-[state=checked]:bg-khor-success data-[state=unchecked]:bg-khor-neutral-300",
          isSmall ? "min-w-[28px] h-[16px]" : "min-w-[44px] h-[22px]",
          className
        )}
        {...rest}
      >
        <span className={cn(
          "absolute inset-0 flex items-center justify-between pointer-events-none select-none text-white font-medium",
          isSmall ? "text-[10px]" : "text-xs"
        )}>
          <span className={cn(
            "flex-1 flex justify-start opacity-0 group-data-[state=checked]:opacity-100 transition-opacity",
            isSmall ? "pl-1 mr-[12px]" : "pl-1.5 mr-[18px]"
          )}>
             {checkedChildren}
          </span>
          <span className={cn(
            "flex-1 flex justify-end opacity-100 group-data-[state=checked]:opacity-0 transition-opacity",
            isSmall ? "pr-1 ml-[12px]" : "pr-1.5 ml-[18px]"
          )}>
             {unCheckedChildren}
          </span>
        </span>

        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-white shadow-sm ring-0 transition-transform relative flex items-center justify-center",
            isSmall 
              ? "h-[12px] w-[12px] data-[state=checked]:translate-x-[12px] data-[state=unchecked]:translate-x-0" 
              : "h-[18px] w-[18px] data-[state=checked]:translate-x-[22px] data-[state=unchecked]:translate-x-0"
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
