"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

// ============================================================================
// SLIDER VARIANTS (Ant Design Pattern)
// ============================================================================

const sliderVariants = cva(
  "relative flex w-full touch-none items-center select-none",
  {
    variants: {
      size: {
        small: "[&_.slider-track]:h-1 [&_.slider-thumb]:h-3 [&_.slider-thumb]:w-3",
        middle: "[&_.slider-track]:h-1.5 [&_.slider-thumb]:h-4 [&_.slider-thumb]:w-4",
        large: "[&_.slider-track]:h-2 [&_.slider-thumb]:h-5 [&_.slider-thumb]:w-5",
      },
    },
    defaultVariants: {
      size: "middle",
    },
  }
);

// ============================================================================
// SLIDER COMPONENT
// ============================================================================

export interface SliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "defaultValue">,
    VariantProps<typeof sliderVariants> {
  defaultValue?: number | number[];
  marks?: Record<number, string | React.ReactNode>;
  dots?: boolean;
  step?: number;
  tooltip?: boolean;
  tooltipFormat?: (value: number) => string;
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      size,
      defaultValue,
      value,
      min = 0,
      max = 100,
      step = 1,
      marks,
      dots = false,
      tooltip = false,
      tooltipFormat,
      disabled,
      ...props
    },
    ref
  ) => {
    const normalizedDefaultValue = Array.isArray(defaultValue)
      ? defaultValue
      : defaultValue !== undefined
      ? [defaultValue]
      : [min];

    const normalizedValue = Array.isArray(value) ? value : value !== undefined ? [value] : undefined;

    const currentValue = normalizedValue || normalizedDefaultValue;

    // Generate dot positions
    const dotPositions = React.useMemo(() => {
      if (!dots || !step) return [];
      const positions = [];
      for (let i = min; i <= max; i += step) {
        positions.push(i);
      }
      return positions;
    }, [dots, step, min, max]);

    return (
      <div className="relative w-full pb-6">
        <SliderPrimitive.Root
          ref={ref}
          className={cn(sliderVariants({ size }), disabled && "opacity-50", className)}
          defaultValue={normalizedDefaultValue}
          value={normalizedValue}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          {...props}
        >
          <SliderPrimitive.Track className="slider-track relative w-full grow overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <SliderPrimitive.Range className="absolute h-full rounded-full bg-primary-500" />
          </SliderPrimitive.Track>

          {currentValue.map((_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              className={cn(
                "slider-thumb block rounded-full border-2 border-primary-500 bg-white",
                "shadow-md transition-all",
                "hover:scale-110 hover:shadow-lg",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50",
                "dark:bg-gray-800 dark:border-primary-400"
              )}
            >
              {tooltip && (
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  {tooltipFormat ? tooltipFormat(currentValue[index]) : currentValue[index]}
                </div>
              )}
            </SliderPrimitive.Thumb>
          ))}

          {/* Dots */}
          {dots && dotPositions.length > 0 && (
            <div className="absolute inset-0 flex items-center pointer-events-none">
              {dotPositions.map((pos) => {
                const percentage = ((pos - min) / (max - min)) * 100;
                return (
                  <div
                    key={pos}
                    className="absolute w-1 h-1 rounded-full bg-gray-400 dark:bg-gray-500"
                    style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
                  />
                );
              })}
            </div>
          )}
        </SliderPrimitive.Root>

        {/* Marks */}
        {marks && (
          <div className="relative w-full mt-2">
            {Object.entries(marks).map(([value, label]) => {
              const percentage = ((Number(value) - min) / (max - min)) * 100;
              return (
                <div
                  key={value}
                  className="absolute text-xs text-muted-foreground"
                  style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
                >
                  {label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };