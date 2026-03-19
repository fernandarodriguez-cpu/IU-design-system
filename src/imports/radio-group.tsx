"use client";

import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";
import { useTokens } from "./useTokens";

// ============================================================================
// RADIO VARIANTS (Ant Design Pattern)
// ============================================================================

const radioVariants = cva(
  [
    // Base styles
    "peer inline-flex shrink-0 items-center justify-center",
    "rounded-full border-2 transition-all duration-200",
    
    // Focus styles
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
    "dark:focus-visible:ring-primary-400 dark:focus-visible:ring-offset-gray-950",
    
    // Unchecked state
    "border-gray-300 bg-white",
    "dark:border-gray-600 dark:bg-gray-800",
    
    // Hover state (unchecked)
    "hover:border-primary-500",
    "dark:hover:border-primary-400",
    
    // Checked state (via data-state)
    "data-[state=checked]:border-primary-500 data-[state=checked]:bg-white",
    "dark:data-[state=checked]:border-primary-500 dark:data-[state=checked]:bg-gray-800",
    
    // Disabled state
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300",
  ],
  {
    variants: {
      size: {
        small: "h-3.5 w-3.5",
        middle: "h-4 w-4",
        large: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "middle",
    },
  }
);

const radioIndicatorVariants = cva(
  "flex items-center justify-center",
  {
    variants: {
      size: {
        small: "h-1.5 w-1.5",
        middle: "h-2 w-2",
        large: "h-2.5 w-2.5",
      },
    },
    defaultVariants: {
      size: "middle",
    },
  }
);

// ============================================================================
// RADIO CONTEXT (for size propagation)
// ============================================================================

interface RadioGroupContextValue {
  size?: "small" | "middle" | "large";
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(
  undefined
);

const useRadioGroup = () => {
  return React.useContext(RadioGroupContext);
};

// ============================================================================
// RADIO GROUP COMPONENT
// ============================================================================

export interface RadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>, "asChild"> {
  size?: "small" | "middle" | "large";
}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, size = "middle", ...props }, ref) => {
  const contextValue = React.useMemo(() => ({ size }), [size]);

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <RadioGroupPrimitive.Root
        ref={ref}
        className={cn("grid gap-2", className)}
        {...props}
      />
    </RadioGroupContext.Provider>
  );
});

RadioGroup.displayName = "RadioGroup";

// ============================================================================
// RADIO GROUP ITEM COMPONENT
// ============================================================================

export interface RadioGroupItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "asChild">,
    VariantProps<typeof radioVariants> {}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, size: itemSize, ...props }, ref) => {
  const groupContext = useRadioGroup();
  const size = itemSize || groupContext?.size || "middle";

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(radioVariants({ size }), className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle
          className={cn(
            radioIndicatorVariants({ size }),
            "fill-primary-500 text-primary-500"
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});

RadioGroupItem.displayName = "RadioGroupItem";

// ============================================================================
// RADIO WITH LABEL COMPONENT (Convenience wrapper)
// ============================================================================

export interface RadioWithLabelProps {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  className?: string;
}

const RadioWithLabel = React.forwardRef<HTMLDivElement, RadioWithLabelProps>(
  ({ value, label, description, disabled, size, className }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-start gap-2", className)}>
        <RadioGroupItem
          id={`radio-${value}`}
          value={value}
          disabled={disabled}
          size={size}
          className={description ? "mt-0.5" : ""}
        />
        <div className="flex-1">
          <label
            htmlFor={`radio-${value}`}
            className={cn(
              "text-sm cursor-pointer select-none",
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
      </div>
    );
  }
);

RadioWithLabel.displayName = "RadioWithLabel";

// ============================================================================
// EXPORTS
// ============================================================================

export { RadioGroup, RadioGroupItem, RadioWithLabel };