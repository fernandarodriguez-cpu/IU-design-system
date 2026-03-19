"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X, Loader2 } from "lucide-react";
import { cn } from "./utils";
import { useTokens } from "./useTokens";

// ==================== TYPES ====================

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'>,
    VariantProps<typeof inputVariants> {
  /** Prefix icon or text element */
  prefix?: React.ReactNode;
  /** Suffix icon or text element */
  suffix?: React.ReactNode;
  /** Element to render before the input (connected visually) */
  addonBefore?: React.ReactNode;
  /** Element to render after the input (connected visually) */
  addonAfter?: React.ReactNode;
  /** Show clear button */
  allowClear?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Status of input */
  status?: 'error' | 'warning' | 'success';
  /** Show character count (requires maxLength) */
  showCount?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Container className */
  containerClassName?: string;
  /** ID for error message element (WCAG: aria-describedby) */
  errorMessageId?: string;
  /** ID for description/help text element (WCAG: aria-describedby) */
  descriptionId?: string;
}

// ==================== VARIANTS ====================

const inputVariants = cva(
  "w-full outline-none transition-all placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        small: "h-6 text-xs",
        middle: "h-8 text-sm",
        large: "h-10 text-base",
      },
      variant: {
        outlined: "bg-background",
        filled: "bg-input-background dark:bg-input/30",
        borderless: "bg-transparent",
      },
    },
    defaultVariants: {
      size: "middle",
      variant: "outlined",
    },
  }
);

const inputWrapperVariants = cva(
  "group inline-flex items-center gap-2 border rounded-md transition-all w-full",
  {
    variants: {
      size: {
        small: "h-6 px-2",
        middle: "h-8 px-3",
        large: "h-10 px-4",
      },
      variant: {
        outlined: "bg-background border-input",
        filled: "bg-input-background dark:bg-input/30 border-transparent",
        borderless: "bg-transparent border-transparent px-0",
      },
      status: {
        default: "",
        error: "border-destructive focus-within:border-destructive focus-within:ring-destructive/20",
        warning: "border-warning focus-within:border-warning focus-within:ring-warning/20",
        success: "border-success focus-within:border-success focus-within:ring-success/20",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed bg-muted/50",
        false: "",
      },
    },
    compoundVariants: [
      {
        variant: "outlined",
        status: "default",
        className: "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
      },
      {
        variant: "filled",
        status: "default",
        className: "focus-within:border-primary focus-within:ring-primary/20 focus-within:ring-[3px]",
      },
      {
        variant: "borderless",
        status: "default",
        className: "focus-within:ring-0",
      },
    ],
    defaultVariants: {
      size: "middle",
      variant: "outlined",
      status: "default",
      disabled: false,
    },
  }
);

// ==================== COMPONENT ====================

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      type = "text",
      size,
      variant,
      status = "default",
      prefix,
      suffix,
      addonBefore,
      addonAfter,
      allowClear,
      loading,
      showCount,
      maxLength,
      disabled,
      onClear,
      onChange,
      value: controlledValue,
      defaultValue,
      errorMessageId,
      descriptionId,
      ...props
    },
    ref
  ) => {
    const tokens = useTokens();
    const [internalValue, setInternalValue] = React.useState<string>(
      (defaultValue as string) || ""
    );
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const valueString = String(value || "");

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInternalValue(e.target.value);
        }
        onChange?.(e);
      },
      [isControlled, onChange]
    );

    const handleClear = React.useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (!isControlled) {
          setInternalValue("");
        }
        
        // Create synthetic event for onChange
        const input = (ref as React.RefObject<HTMLInputElement>)?.current;
        if (input) {
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
          )?.set;
          nativeInputValueSetter?.call(input, "");
          
          const event = new Event("input", { bubbles: true });
          input.dispatchEvent(event);
        }
        
        onClear?.();
      },
      [isControlled, onClear, ref]
    );

    const showClearButton = allowClear && valueString.length > 0 && !disabled;
    const hasPrefix = prefix || loading;
    const hasSuffix = suffix || showClearButton || (showCount && maxLength);

    const characterCount = maxLength ? `${valueString.length}/${maxLength}` : `${valueString.length}`;

    // Input content (wrapper + input)
    const inputContent = (
      <div
        data-slot="input-wrapper"
        className={cn(
          inputWrapperVariants({
            size,
            variant,
            status,
            disabled: disabled || loading,
          }),
          addonBefore && "rounded-l-none border-l-0",
          addonAfter && "rounded-r-none border-r-0",
          containerClassName
        )}
        style={{
          borderRadius: addonBefore || addonAfter ? undefined : tokens.geometry.md,
        }}
      >
        {/* Prefix */}
        {hasPrefix && (
          <span className="inline-flex items-center text-muted-foreground shrink-0">
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              prefix
            )}
          </span>
        )}

        {/* Input */}
        <input
          ref={ref}
          type={type}
          data-slot="input"
          className={cn(
            inputVariants({ size, variant }),
            "flex-1 bg-transparent border-0 px-0 focus:ring-0 focus:outline-none min-w-0",
            className
          )}
          disabled={disabled || loading}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          aria-describedby={errorMessageId ? errorMessageId : descriptionId}
          {...props}
        />

        {/* Suffix */}
        {hasSuffix && (
          <span className="inline-flex items-center gap-1.5 text-muted-foreground shrink-0">
            {showClearButton && (
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center justify-center size-4 rounded-sm hover:bg-muted/80 transition-colors"
                tabIndex={-1}
              >
                <X className="size-3" />
              </button>
            )}
            {suffix}
          </span>
        )}
      </div>
    );

    return (
      <div className="w-full">
        {/* Addon wrapper if addons are present */}
        {(addonBefore || addonAfter) ? (
          <div className="flex w-full">
            {addonBefore && (
              <span 
                className={cn(
                  "inline-flex items-center px-3 border border-input bg-muted text-muted-foreground rounded-l-md border-r-0",
                  size === "small" && "h-6 text-xs",
                  size === "middle" && "h-8 text-sm",
                  size === "large" && "h-10 text-base",
                )}
                style={{
                  borderTopLeftRadius: tokens.geometry.md,
                  borderBottomLeftRadius: tokens.geometry.md,
                }}
              >
                {addonBefore}
              </span>
            )}
            {inputContent}
            {addonAfter && (
              <span 
                className={cn(
                  "inline-flex items-center px-3 border border-input bg-muted text-muted-foreground rounded-r-md border-l-0",
                  size === "small" && "h-6 text-xs",
                  size === "middle" && "h-8 text-sm",
                  size === "large" && "h-10 text-base",
                )}
                style={{
                  borderTopRightRadius: tokens.geometry.md,
                  borderBottomRightRadius: tokens.geometry.md,
                }}
              >
                {addonAfter}
              </span>
            )}
          </div>
        ) : (
          inputContent
        )}

        {/* Character Count */}
        {showCount && maxLength && (
          <div className="flex justify-end mt-1">
            <span
              className={cn(
                "text-xs",
                valueString.length >= maxLength
                  ? "text-destructive"
                  : "text-muted-foreground"
              )}
            >
              {characterCount}
            </span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };