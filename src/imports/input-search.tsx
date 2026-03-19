"use client";

import * as React from "react";
import { Input, InputProps } from "./input";
import { Button } from "./button";
import { Search, Loader2 } from "lucide-react";
import { cn } from "./utils";

// ==================== TYPES ====================

export interface InputSearchProps extends Omit<InputProps, 'prefix'> {
  /** Callback when search is triggered */
  onSearch?: (value: string, event?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => void;
  /** Show enter button */
  enterButton?: boolean | React.ReactNode;
  /** Loading state */
  loading?: boolean;
}

// ==================== COMPONENT ====================

const InputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  (
    {
      className,
      onSearch,
      enterButton = false,
      loading = false,
      size = "middle",
      allowClear = true,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>("");
    const isControlled = props.value !== undefined;
    const value = isControlled ? String(props.value || "") : internalValue;

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInternalValue(e.target.value);
        }
        props.onChange?.(e);
      },
      [isControlled, props]
    );

    const handleSearch = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>) => {
        onSearch?.(value, e);
      },
      [onSearch, value]
    );

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
          handleSearch(e);
        }
        props.onKeyDown?.(e);
      },
      [handleSearch, props]
    );

    const handleClear = React.useCallback(() => {
      if (!isControlled) {
        setInternalValue("");
      }
      props.onClear?.();
    }, [isControlled, props]);

    // Without enter button - just an input with search icon
    if (!enterButton) {
      return (
        <Input
          ref={ref}
          prefix={loading ? <Loader2 className="size-4 animate-spin" /> : <Search className="size-4" />}
          allowClear={allowClear}
          size={size}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onClear={handleClear}
          className={className}
          {...props}
        />
      );
    }

    // With enter button - input + button combo
    const buttonSizeMap = {
      small: "sm",
      middle: "default",
      large: "lg",
    } as const;

    const buttonContent = typeof enterButton === "boolean" ? (
      loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Search className="size-4" />
      )
    ) : (
      enterButton
    );

    return (
      <div className={cn("flex gap-2 w-full", className)}>
        <Input
          ref={ref}
          prefix={<Search className="size-4" />}
          allowClear={allowClear}
          size={size}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onClear={handleClear}
          className="flex-1"
          {...props}
        />
        <Button
          type="button"
          size={buttonSizeMap[size]}
          onClick={handleSearch}
          disabled={loading || props.disabled}
        >
          {buttonContent}
        </Button>
      </div>
    );
  }
);

InputSearch.displayName = "InputSearch";

export { InputSearch };
