"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// ============================================================================
// PROGRESS VARIANTS (Ant Design Pattern)
// ============================================================================

const progressVariants = cva(
  "relative w-full overflow-hidden bg-gray-200 dark:bg-gray-700",
  {
    variants: {
      size: {
        small: "h-1.5",
        middle: "h-2",
        large: "h-3",
      },
      status: {
        normal: "",
        success: "[&>div]:bg-green-500",
        exception: "[&>div]:bg-red-500",
        active: "[&>div]:bg-blue-500",
      },
    },
    defaultVariants: {
      size: "middle",
      status: "normal",
    },
  }
);

// ============================================================================
// PROGRESS COMPONENT
// ============================================================================

export interface ProgressProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, "value">,
    VariantProps<typeof progressVariants> {
  value?: number;
  showInfo?: boolean;
  format?: (percent?: number) => React.ReactNode;
  strokeColor?: string;
  strokeLinecap?: "round" | "square";
  /** Accessible label for screen readers */
  label?: string;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(
  (
    {
      className,
      value = 0,
      size,
      status,
      showInfo = true,
      format,
      strokeColor,
      strokeLinecap = "round",
      label,
      ...props
    },
    ref
  ) => {
    const normalizedValue = Math.min(Math.max(value, 0), 100);

    // Auto status based on value
    const actualStatus = status || (normalizedValue === 100 ? "success" : "normal");

    const getStatusIcon = () => {
      if (actualStatus === "success") return "✓";
      if (actualStatus === "exception") return "✕";
      return null;
    };

    return (
      <div className="flex items-center gap-2 w-full">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(
            progressVariants({ size, status: actualStatus }),
            strokeLinecap === "round" ? "rounded-full" : "rounded-none",
            className
          )}
          value={normalizedValue}
          aria-label={label || `Progreso: ${Math.round(normalizedValue)}%`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(normalizedValue)}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className={cn(
              "h-full transition-all duration-300 ease-in-out",
              strokeColor
                ? ""
                : actualStatus === "success"
                ? "bg-green-500"
                : actualStatus === "exception"
                ? "bg-red-500"
                : "bg-primary-500"
            )}
            style={{
              transform: `translateX(-${100 - normalizedValue}%)`,
              backgroundColor: strokeColor,
              borderRadius: strokeLinecap === "round" ? "9999px" : "0",
            }}
          />
        </ProgressPrimitive.Root>

        {showInfo && (
          <span className="text-sm text-muted-foreground whitespace-nowrap min-w-[3rem] text-right">
            {format ? (
              format(normalizedValue)
            ) : (
              <>
                {getStatusIcon() || `${Math.round(normalizedValue)}%`}
              </>
            )}
          </span>
        )}
      </div>
    );
  }
);

Progress.displayName = "Progress";

// ============================================================================
// PROGRESS CIRCLE (Bonus Component)
// ============================================================================

export interface ProgressCircleProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  status?: "normal" | "success" | "exception";
  showInfo?: boolean;
  format?: (percent?: number) => React.ReactNode;
  strokeColor?: string;
  className?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  percent = 0,
  size = 120,
  strokeWidth = 6,
  status,
  showInfo = true,
  format,
  strokeColor,
  className,
}) => {
  const normalizedPercent = Math.min(Math.max(percent, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (normalizedPercent / 100) * circumference;

  const actualStatus = status || (normalizedPercent === 100 ? "success" : "normal");

  const getColor = () => {
    if (strokeColor) return strokeColor;
    if (actualStatus === "success") return "#22c55e";
    if (actualStatus === "exception") return "#ef4444";
    return "var(--primary-500, #7428F5)";
  };

  return (
    <div className={cn("inline-flex items-center justify-center", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getColor()}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>

        {showInfo && (
          <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
            {format ? format(normalizedPercent) : `${Math.round(normalizedPercent)}%`}
          </div>
        )}
      </div>
    </div>
  );
};

export { Progress, ProgressCircle };