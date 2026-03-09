"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch@1.1.3";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";
import { useTokens } from "../../utils/useTokens";

// ============================================================================
// SWITCH VARIANTS (Ant Design Pattern)
// ============================================================================

const switchVariants = cva(
  [
    // Base styles
    "peer inline-flex shrink-0 items-center cursor-pointer",
    "transition-all duration-200 ease-in-out",
    
    // Focus styles
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
    "dark:focus-visible:ring-primary-400 dark:focus-visible:ring-offset-gray-950",
    
    // Unchecked state
    "data-[state=unchecked]:bg-gray-200",
    "dark:data-[state=unchecked]:bg-gray-700",
    
    // Checked state
    "data-[state=checked]:bg-primary-500",
    "dark:data-[state=checked]:bg-primary-500",
    
    // Disabled state
    "disabled:cursor-not-allowed disabled:opacity-50",
    
    // Shadow
    "shadow-inner",
  ],
  {
    variants: {
      size: {
        small: "h-4 w-7",
        middle: "h-5 w-9",
        large: "h-6 w-11",
      },
    },
    defaultVariants: {
      size: "middle",
    },
  }
);

const switchThumbVariants = cva(
  [
    "pointer-events-none block bg-white shadow-lg",
    "transition-all duration-200 ease-in-out",
    "rounded-full",
    "dark:bg-white",
  ],
  {
    variants: {
      size: {
        small: [
          "h-3 w-3",
          "data-[state=checked]:translate-x-3.5",
          "data-[state=unchecked]:translate-x-0.5",
        ],
        middle: [
          "h-4 w-4",
          "data-[state=checked]:translate-x-4.5",
          "data-[state=unchecked]:translate-x-0.5",
        ],
        large: [
          "h-5 w-5",
          "data-[state=checked]:translate-x-5.5",
          "data-[state=unchecked]:translate-x-0.5",
        ],
      },
    },
    defaultVariants: {
      size: "middle",
    },
  }
);

// ============================================================================
// SWITCH COMPONENT
// ============================================================================

export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "asChild">,
    VariantProps<typeof switchVariants> {}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size = "middle", ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      className={cn(switchVariants({ size }), "rounded-full", className)}
      {...props}
    >
      <SwitchPrimitive.Thumb className={cn(switchThumbVariants({ size }))} />
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = "Switch";

// ============================================================================
// SWITCH WITH LABEL COMPONENT (Convenience wrapper)
// ============================================================================

export interface SwitchWithLabelProps {
  id?: string;
  label: string;
  description?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  className?: string;
}

const SwitchWithLabel = React.forwardRef<HTMLDivElement, SwitchWithLabelProps>(
  (
    {
      id,
      label,
      description,
      checked,
      onCheckedChange,
      disabled,
      size = "middle",
      className,
    },
    ref
  ) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div ref={ref} className={cn("flex items-center justify-between", className)}>
        <div className="flex-1">
          <label
            htmlFor={switchId}
            className={cn(
              "text-sm font-medium cursor-pointer select-none",
              disabled && "cursor-not-allowed opacity-50"
            )}
          >
            {label}
          </label>
          {description && (
            <p
              className={cn(
                "text-sm text-muted-foreground",
                disabled && "opacity-50"
              )}
            >
              {description}
            </p>
          )}
        </div>
        <Switch
          id={switchId}
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          size={size}
        />
      </div>
    );
  }
);

SwitchWithLabel.displayName = "SwitchWithLabel";

// ============================================================================
// EXPORTS
// ============================================================================

export { Switch, SwitchWithLabel };