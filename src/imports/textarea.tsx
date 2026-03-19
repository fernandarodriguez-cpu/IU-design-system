"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";
import { useTokens } from "./useTokens";

// ============================================================================
// TEXTAREA VARIANTS (Ant Design Pattern)
// ============================================================================

const textareaVariants = cva(
  [
    // Base styles
    "flex w-full rounded-md border-2 bg-card px-3 py-2",
    "text-sm transition-all duration-200",
    "dark:bg-gray-800 dark:border-gray-600",
    
    // Placeholder
    "placeholder:text-muted-foreground",
    "dark:placeholder:text-muted-foreground",
    
    // Focus
    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 focus:border-primary-500",
    "dark:focus:ring-primary-400 dark:focus:border-primary-500",
    
    // Hover
    "hover:border-gray-400",
    "dark:hover:border-gray-500",
    
    // Disabled
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
    "dark:disabled:bg-gray-900",
    
    // Resize
    "resize-none",
  ],
  {
    variants: {
      size: {
        small: "min-h-[60px] text-sm px-2 py-1",
        middle: "min-h-[80px] text-sm px-3 py-2",
        large: "min-h-[120px] text-base px-3 py-2",
      },
      resize: {
        none: "resize-none",
        vertical: "resize-y",
        horizontal: "resize-x",
        both: "resize",
      },
    },
    defaultVariants: {
      size: "middle",
      resize: "none",
    },
  }
);

// ============================================================================
// TEXTAREA COMPONENT
// ============================================================================

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  showCount?: boolean;
  maxLength?: number;
  /** ID for error message (WCAG: aria-describedby) */
  errorMessageId?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, size, resize, showCount, maxLength, errorMessageId, id, ...props }, ref) => {
    const [charCount, setCharCount] = React.useState(0);
    const countId = id ? `${id}-count` : undefined;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      props.onChange?.(e);
    };

    // Build aria-describedby from count + error IDs
    const ariaDescribedBy = [countId, errorMessageId].filter(Boolean).join(' ') || undefined;

    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          id={id}
          className={cn(textareaVariants({ size, resize }), className)}
          maxLength={maxLength}
          onChange={handleChange}
          aria-describedby={ariaDescribedBy}
          {...props}
        />
        {showCount && (
          <div
            id={countId}
            className="absolute bottom-2 right-2 text-xs text-muted-foreground pointer-events-none"
            aria-live="polite"
          >
            {charCount}
            {maxLength && ` / ${maxLength}`}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };