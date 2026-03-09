"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot@1.1.2";
import { cva, type VariantProps } from "class-variance-authority@0.7.1";
import { Loader2 } from "lucide-react@0.487.0";
import { cn } from "./utils";
import { useTokens } from "../../utils/useTokens";

// ==================== VARIANT ALIAS MAP ====================
// Provides backwards-compatible mapping from shadcn-style `variant`
// to Hiumanlab Elements `type` convention (Ant Design pattern).

const VARIANT_TO_TYPE_MAP: Record<string, string> = {
  outline: "default",
  ghost: "text",
  destructive: "primary", // combined with danger=true
  secondary: "default",
  link: "link",
};

// ==================== TYPES ====================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as child component */
  asChild?: boolean;
  /** Loading state with spinner */
  loading?: boolean;
  /** Icon element (positioned based on iconPosition) */
  icon?: React.ReactNode;
  /** Icon position */
  iconPosition?: "start" | "end";
  /** Block-level button (full width) */
  block?: boolean;
  /** Danger styling */
  danger?: boolean;
  /** HTML button type */
  htmlType?: "button" | "submit" | "reset";
  /**
   * @deprecated Use `type` instead. This alias exists for shadcn/ui compatibility.
   * Maps: outline->default, ghost->text, destructive->primary+danger, link->link
   */
  variant?: "outline" | "ghost" | "destructive" | "secondary" | "link";
}

// ==================== VARIANTS ====================

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background [&_svg]:pointer-events-none [&_svg]:shrink-0 min-h-[44px] min-w-[44px] font-[family-name:var(--font-family-primary,Raleway,sans-serif)]",
  {
    variants: {
      type: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-primary border border-primary",
        default: "bg-background text-foreground border border-input hover:bg-accent hover:text-accent-foreground hover:border-accent focus-visible:ring-ring",
        dashed: "bg-background text-foreground border border-dashed border-input hover:bg-accent hover:text-accent-foreground hover:border-accent focus-visible:ring-ring",
        text: "text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
        link: "text-primary underline-offset-4 hover:underline focus-visible:ring-primary",
        branded: "border-0 hover:opacity-90 focus-visible:ring-primary",
      },
      size: {
        small: "h-6 px-2 text-xs [&_svg]:size-3",
        middle: "h-8 px-4 text-sm [&_svg]:size-4",
        large: "h-10 px-6 text-base [&_svg]:size-4",
        // shadcn-compatible aliases
        sm: "h-6 px-2 text-xs [&_svg]:size-3",
        default: "h-8 px-4 text-sm [&_svg]:size-4",
        lg: "h-10 px-6 text-base [&_svg]:size-4",
        icon: "h-8 w-8 p-0 [&_svg]:size-4",
      },
      shape: {
        default: "rounded-md",
        circle: "rounded-full aspect-square p-0",
        round: "rounded-full",
      },
      block: {
        true: "w-full",
        false: "",
      },
      danger: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Danger variants
      {
        type: "primary",
        danger: true,
        className: "bg-destructive border-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
      },
      {
        type: "default",
        danger: true,
        className: "text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive",
      },
      {
        type: "dashed",
        danger: true,
        className: "text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive",
      },
      {
        type: "text",
        danger: true,
        className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
      },
      {
        type: "link",
        danger: true,
        className: "text-destructive hover:text-destructive/80",
      },
      // Icon-only adjustments for circle
      {
        shape: "circle",
        size: "small",
        className: "size-6 p-0",
      },
      {
        shape: "circle",
        size: "middle",
        className: "size-8 p-0",
      },
      {
        shape: "circle",
        size: "large",
        className: "size-10 p-0",
      },
    ],
    defaultVariants: {
      type: "default",
      size: "middle",
      shape: "default",
      block: false,
      danger: false,
    },
  }
);

// ==================== COMPONENT ====================

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type: typeProp,
      variant: variantProp,
      size,
      shape,
      block,
      danger: dangerProp,
      asChild = false,
      loading = false,
      icon,
      iconPosition = "start",
      disabled,
      children,
      htmlType = "button",
      style,
      ...props
    },
    ref
  ) => {
    const tokens = useTokens();
    const Comp = asChild ? Slot : "button";

    // Resolve type: explicit `type` takes precedence, then map `variant`
    let resolvedType = typeProp || "default";
    let resolvedDanger = dangerProp || false;

    if (!typeProp && variantProp) {
      if (variantProp === "destructive") {
        resolvedType = "primary";
        resolvedDanger = true;
      } else {
        resolvedType = (VARIANT_TO_TYPE_MAP[variantProp] || "default") as typeof resolvedType;
      }
    }

    // Determine if this is an icon-only button
    const isIconOnly = !children && (icon || loading);

    // For "branded" type, force white text and no border via inline style
    // This is bulletproof: inline styles beat any CSS class regardless of specificity
    const isBranded = resolvedType === "branded";

    // Apply dynamic token-based styles
    const tokenStyles: React.CSSProperties = {
      borderRadius:
        shape === "circle" || shape === "round"
          ? "999px"
          : size === "small" || size === "sm"
          ? tokens.geometry.sm
          : size === "large" || size === "lg"
          ? tokens.geometry.lg
          : tokens.geometry.md,
      ...(isBranded ? { color: '#ffffff', border: 'none' } : {}),
      ...style,
    };

    const content = (
      <>
        {/* Loading or Icon at Start */}
        {iconPosition === "start" && (loading || icon) && (
          <span className="inline-flex items-center">
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              icon
            )}
          </span>
        )}

        {/* Children */}
        {children}

        {/* Icon at End (only if not loading or loading is at start) */}
        {iconPosition === "end" && !loading && icon && (
          <span className="inline-flex items-center">{icon}</span>
        )}
      </>
    );

    return (
      <Comp
        ref={ref}
        type={htmlType}
        data-slot="button"
        className={cn(
          buttonVariants({
            type: resolvedType,
            size,
            shape: isIconOnly && shape === "default" ? "circle" : shape,
            block,
            danger: resolvedDanger,
          }),
          className
        )}
        style={tokenStyles}
        disabled={disabled || loading}
        aria-disabled={disabled || loading || undefined}
        aria-busy={loading || undefined}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
