"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";
import { useTokens } from "./useTokens";

// ============================================================================
// AVATAR VARIANTS (Ant Design Pattern)
// ============================================================================

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        small: "h-6 w-6 text-xs",
        middle: "h-10 w-10 text-sm",
        large: "h-14 w-14 text-base",
      },
    },
    defaultVariants: {
      size: "middle",
    },
  }
);

// ============================================================================
// AVATAR ROOT
// ============================================================================

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ...props }, ref) => {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );
});

Avatar.displayName = "Avatar";

// ============================================================================
// AVATAR IMAGE
// ============================================================================

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full object-cover", className)}
    {...props}
  />
));

AvatarImage.displayName = "AvatarImage";

// ============================================================================
// AVATAR FALLBACK
// ============================================================================

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full",
      "bg-gray-100 text-gray-600 font-medium",
      "dark:bg-gray-800 dark:text-gray-300",
      className
    )}
    {...props}
  />
));

AvatarFallback.displayName = "AvatarFallback";

// ============================================================================
// AVATAR GROUP (Helper Component)
// ============================================================================

export interface AvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  size?: "small" | "middle" | "large";
  className?: string;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ children, max, size = "middle", className }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const displayChildren = max ? childrenArray.slice(0, max) : childrenArray;
    const surplus = max && childrenArray.length > max ? childrenArray.length - max : 0;

    return (
      <div ref={ref} className={cn("flex items-center -space-x-2", className)}>
        {displayChildren.map((child, index) =>
          React.isValidElement(child)
            ? React.cloneElement(child, {
                ...child.props,
                size,
                className: cn("ring-2 ring-white dark:ring-gray-950", child.props.className),
                key: index,
              } as any)
            : child
        )}
        {surplus > 0 && (
          <Avatar size={size} className="ring-2 ring-white dark:ring-gray-950">
            <AvatarFallback>+{surplus}</AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  }
);

AvatarGroup.displayName = "AvatarGroup";

// ============================================================================
// EXPORTS
// ============================================================================

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup };
