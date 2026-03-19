import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";
import { useTheme } from "../app/theme/theme-context";

// ============================================================================
// CARD VARIANTS (Ant Design Pattern)
// ============================================================================

const cardVariants = cva(
  "bg-card text-card-foreground border border-border flex flex-col transition-all",
  {
    variants: {
      size: {
        small: "[&_.card-header]:p-3 [&_.card-content]:p-3 [&_.card-footer]:p-3",
        middle: "[&_.card-header]:p-4 [&_.card-content]:p-4 [&_.card-footer]:p-4",
        large: "[&_.card-header]:p-6 [&_.card-content]:p-6 [&_.card-footer]:p-6",
      },
      hoverable: {
        true: "cursor-pointer hover:shadow-lg hover:-translate-y-0.5",
        false: "",
      },
    },
    defaultVariants: {
      size: "middle",
      hoverable: false,
    },
  }
);

// ============================================================================
// CARD ROOT
// ============================================================================

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  bordered?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, size, hoverable, bordered = true, style, ...props }, ref) => {
    const { tokens } = useTheme();

    const tokenStyles: React.CSSProperties = {
      borderRadius: tokens.geometry.lg,
      boxShadow: tokens.shadows.sm,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ size, hoverable }),
          !bordered && "border-0 shadow-none",
          className
        )}
        style={tokenStyles}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";

// ============================================================================
// CARD HEADER
// ============================================================================

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  const { tokens } = useTheme();

  const tokenStyles: React.CSSProperties = {
    gap: tokens.spacing[2],
    ...style,
  };

  return (
    <div
      ref={ref}
      className={cn(
        "card-header flex flex-col space-y-1.5 border-b border-border",
        className
      )}
      style={tokenStyles}
      {...props}
    />
  );
});

CardHeader.displayName = "CardHeader";

// ============================================================================
// CARD TITLE
// ============================================================================

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));

CardTitle.displayName = "CardTitle";

// ============================================================================
// CARD DESCRIPTION
// ============================================================================

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

CardDescription.displayName = "CardDescription";

// ============================================================================
// CARD CONTENT
// ============================================================================

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("card-content", className)} {...props} />
));

CardContent.displayName = "CardContent";

// ============================================================================
// CARD FOOTER
// ============================================================================

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "card-footer flex items-center border-t border-border",
      className
    )}
    {...props}
  />
));

CardFooter.displayName = "CardFooter";

// ============================================================================
// CARD ACTION (Extra)
// ============================================================================

const CardAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("absolute top-4 right-4", className)}
    {...props}
  />
));

CardAction.displayName = "CardAction";

// ============================================================================
// EXPORTS
// ============================================================================

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};