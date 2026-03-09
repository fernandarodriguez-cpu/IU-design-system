import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

// ============================================================================
// SKELETON VARIANTS (Ant Design Pattern)
// ============================================================================

const skeletonVariants = cva("animate-pulse bg-gray-200 dark:bg-gray-700 rounded", {
  variants: {
    variant: {
      default: "",
      circle: "rounded-full",
      text: "rounded h-4",
      button: "rounded h-10",
      avatar: "rounded-full",
      input: "rounded h-10 w-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// ============================================================================
// SKELETON BASE COMPONENT
// ============================================================================

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  active?: boolean;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, active = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          skeletonVariants({ variant }),
          !active && "animate-none",
          className
        )}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

// ============================================================================
// SKELETON AVATAR (Preset)
// ============================================================================

export interface SkeletonAvatarProps {
  size?: "small" | "middle" | "large" | number;
  shape?: "circle" | "square";
  active?: boolean;
  className?: string;
}

const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = "middle",
  shape = "circle",
  active = true,
  className,
}) => {
  const sizeMap = {
    small: "h-8 w-8",
    middle: "h-10 w-10",
    large: "h-14 w-14",
  };

  const sizeClass = typeof size === "number" ? "" : sizeMap[size];
  const style = typeof size === "number" ? { width: size, height: size } : undefined;

  return (
    <Skeleton
      variant={shape === "circle" ? "circle" : "default"}
      active={active}
      className={cn(sizeClass, className)}
      style={style}
    />
  );
};

// ============================================================================
// SKELETON BUTTON (Preset)
// ============================================================================

export interface SkeletonButtonProps {
  size?: "small" | "middle" | "large";
  shape?: "default" | "circle" | "round";
  active?: boolean;
  block?: boolean;
  className?: string;
}

const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  size = "middle",
  shape = "default",
  active = true,
  block = false,
  className,
}) => {
  const sizeMap = {
    small: "h-7 w-20",
    middle: "h-8 w-24",
    large: "h-10 w-28",
  };

  return (
    <Skeleton
      variant={shape === "circle" ? "circle" : "default"}
      active={active}
      className={cn(
        sizeMap[size],
        block && "w-full",
        shape === "round" && "rounded-full",
        className
      )}
    />
  );
};

// ============================================================================
// SKELETON INPUT (Preset)
// ============================================================================

export interface SkeletonInputProps {
  size?: "small" | "middle" | "large";
  active?: boolean;
  block?: boolean;
  className?: string;
}

const SkeletonInput: React.FC<SkeletonInputProps> = ({
  size = "middle",
  active = true,
  block = true,
  className,
}) => {
  const sizeMap = {
    small: "h-7",
    middle: "h-8",
    large: "h-10",
  };

  return (
    <Skeleton
      variant="input"
      active={active}
      className={cn(sizeMap[size], block && "w-full", className)}
    />
  );
};

// ============================================================================
// SKELETON PARAGRAPH (Preset)
// ============================================================================

export interface SkeletonParagraphProps {
  rows?: number;
  width?: string | string[];
  active?: boolean;
  className?: string;
}

const SkeletonParagraph: React.FC<SkeletonParagraphProps> = ({
  rows = 3,
  width,
  active = true,
  className,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: rows }).map((_, index) => {
        let lineWidth = "100%";

        if (Array.isArray(width)) {
          lineWidth = width[index] || "100%";
        } else if (typeof width === "string") {
          lineWidth = width;
        } else if (index === rows - 1) {
          // Last line is shorter by default
          lineWidth = "60%";
        }

        return (
          <Skeleton
            key={index}
            variant="text"
            active={active}
            style={{ width: lineWidth }}
          />
        );
      })}
    </div>
  );
};

// ============================================================================
// SKELETON IMAGE (Preset)
// ============================================================================

export interface SkeletonImageProps {
  width?: string | number;
  height?: string | number;
  active?: boolean;
  className?: string;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({
  width = "100%",
  height = 200,
  active = true,
  className,
}) => {
  return (
    <Skeleton
      active={active}
      className={className}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
    />
  );
};

// ============================================================================
// SKELETON COMPOSITE (Full Card Example)
// ============================================================================

export interface SkeletonCardProps {
  loading?: boolean;
  active?: boolean;
  avatar?: boolean;
  title?: boolean;
  paragraph?: boolean | { rows?: number };
  children?: React.ReactNode;
  className?: string;
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({
  loading = true,
  active = true,
  avatar = true,
  title = true,
  paragraph = true,
  children,
  className,
}) => {
  if (!loading) {
    return <>{children}</>;
  }

  const paragraphRows = typeof paragraph === "object" ? paragraph.rows : 3;

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center space-x-4">
        {avatar && <SkeletonAvatar size="large" active={active} />}
        <div className="flex-1 space-y-2">
          {title && <Skeleton variant="text" active={active} className="w-1/2" />}
          {paragraph && <SkeletonParagraph rows={paragraphRows} active={active} />}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export {
  Skeleton,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonInput,
  SkeletonParagraph,
  SkeletonImage,
  SkeletonCard,
};
