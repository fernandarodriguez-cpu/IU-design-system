"use client";

import * as React from "react";
import { cn } from "./utils";
import { VariantProps } from "class-variance-authority@0.7.1";
import { buttonVariants } from "./button";

// ==================== TYPES ====================

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size of buttons in group */
  size?: "sm" | "default" | "lg" | "icon";
  /** Variant of buttons in group */
  variant?: VariantProps<typeof buttonVariants>["variant"];
  /** Vertical orientation */
  vertical?: boolean;
  /** Children buttons */
  children: React.ReactNode;
}

// ==================== COMPONENT ====================

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, size, variant, vertical = false, children, ...props }, ref) => {
    // Clone children and add size/variant props if provided
    const buttons = React.Children.map(children, (child, index) => {
      if (!React.isValidElement(child)) return child;

      const isFirst = index === 0;
      const isLast = index === React.Children.count(children) - 1;

      // Add rounded classes based on position
      const roundedClasses = vertical
        ? cn(
            !isFirst && "rounded-t-none border-t-0",
            !isLast && "rounded-b-none"
          )
        : cn(
            !isFirst && "rounded-l-none border-l-0",
            !isLast && "rounded-r-none"
          );

      // Clone child with additional props
      return React.cloneElement(child as React.ReactElement<any>, {
        size: child.props.size || size,
        variant: child.props.variant || variant,
        className: cn(
          roundedClasses,
          child.props.className
        ),
      });
    });

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex",
          vertical ? "flex-col" : "flex-row",
          className
        )}
        role="group"
        {...props}
      >
        {buttons}
      </div>
    );
  }
);

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
