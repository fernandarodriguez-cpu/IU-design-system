"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox@1.1.4";
import { Check, Minus } from "lucide-react@0.487.0";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";
import { useTokens } from "../../utils/useTokens";

// ============================================================================
// CHECKBOX VARIANTS (Ant Design Pattern)
// ============================================================================

const checkboxVariants = cva(
  [
    // Base styles
    "peer inline-flex shrink-0 items-center justify-center",
    "rounded border-2 transition-all duration-200",
    
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
    "data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500",
    "dark:data-[state=checked]:bg-primary-500 dark:data-[state=checked]:border-primary-500",
    
    // Indeterminate state (handled with forceMount)
    "data-[state=indeterminate]:bg-primary-500 data-[state=indeterminate]:border-primary-500",
    "dark:data-[state=indeterminate]:bg-primary-500 dark:data-[state=indeterminate]:border-primary-500",
    
    // Disabled state
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        small: "h-3.5 w-3.5 rounded",
        middle: "h-4 w-4 rounded",
        large: "h-5 w-5 rounded-md",
      },
    },
    defaultVariants: {
      size: "middle",
    },
  }
);

const checkboxIconVariants = cva("", {
  variants: {
    size: {
      small: "h-2.5 w-2.5",
      middle: "h-3 w-3",
      large: "h-3.5 w-3.5",
    },
  },
  defaultVariants: {
    size: "middle",
  },
});

// ============================================================================
// CHECKBOX COMPONENT
// ============================================================================

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "type">,
    VariantProps<typeof checkboxVariants> {
  indeterminate?: boolean;
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, size, indeterminate, checked, ...props }, ref) => {
  const { tokens } = useTokens();

  // Handle indeterminate state
  const checkboxState = indeterminate ? "indeterminate" : checked;

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(checkboxVariants({ size }), className)}
      checked={checkboxState}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="flex items-center justify-center text-white"
        forceMount={indeterminate}
      >
        {indeterminate ? (
          <Minus className={cn(checkboxIconVariants({ size }))} strokeWidth={3} />
        ) : (
          <Check className={cn(checkboxIconVariants({ size }))} strokeWidth={3} />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
});

Checkbox.displayName = "Checkbox";

// ============================================================================
// CHECKBOX GROUP (Context API)
// ============================================================================

interface CheckboxGroupContextValue {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
}

const CheckboxGroupContext = React.createContext<CheckboxGroupContextValue | undefined>(
  undefined
);

const useCheckboxGroup = () => {
  const context = React.useContext(CheckboxGroupContext);
  if (!context) {
    throw new Error("CheckboxGroup.Item must be used within CheckboxGroup");
  }
  return context;
};

// ============================================================================
// CHECKBOX GROUP COMPONENT
// ============================================================================

export interface CheckboxGroupProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  disabled?: boolean;
  size?: "small" | "middle" | "large";
  children: React.ReactNode;
  className?: string;
}

const CheckboxGroup = ({
  value: controlledValue,
  defaultValue = [],
  onChange,
  disabled,
  size = "middle",
  children,
  className,
}: CheckboxGroupProps) => {
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);

  // Controlled vs Uncontrolled
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = React.useCallback(
    (newValue: string[]) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [controlledValue, onChange]
  );

  const contextValue = React.useMemo(
    () => ({
      value,
      onChange: handleChange,
      disabled,
      size,
    }),
    [value, handleChange, disabled, size]
  );

  return (
    <CheckboxGroupContext.Provider value={contextValue}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </CheckboxGroupContext.Provider>
  );
};

// ============================================================================
// CHECKBOX GROUP ITEM
// ============================================================================

export interface CheckboxGroupItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const CheckboxGroupItem = ({
  value,
  children,
  disabled: itemDisabled,
  className,
}: CheckboxGroupItemProps) => {
  const { value: groupValue, onChange, disabled: groupDisabled, size } = useCheckboxGroup();

  const isChecked = groupValue.includes(value);
  const isDisabled = itemDisabled || groupDisabled;

  const handleCheckedChange = (checked: boolean) => {
    const newValue = checked
      ? [...groupValue, value]
      : groupValue.filter((v) => v !== value);
    onChange(newValue);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Checkbox
        id={`checkbox-${value}`}
        checked={isChecked}
        onCheckedChange={handleCheckedChange}
        disabled={isDisabled}
        size={size}
      />
      <label
        htmlFor={`checkbox-${value}`}
        className={cn(
          "text-sm cursor-pointer select-none",
          isDisabled && "cursor-not-allowed opacity-50"
        )}
      >
        {children}
      </label>
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

CheckboxGroup.Item = CheckboxGroupItem;

export { Checkbox, CheckboxGroup };
