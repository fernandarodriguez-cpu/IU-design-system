import React, { useState } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../../../../imports/utils';
import { KTooltip } from '../../molecules/KTooltip/index';

export interface KSliderTooltipProps {
  formatter?: (value: number) => React.ReactNode;
  open?: boolean;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  color?: string;
  className?: string; // Add more configurations if necessary
}

export interface KSliderProps {
  value?: number | number[];
  defaultValue?: number | number[];
  min?: number;
  max?: number;
  step?: number | null;
  disabled?: boolean;
  onChange?: (value: number | number[]) => void;
  onAfterChange?: (value: number | number[]) => void;
  showValue?: boolean;
  className?: string;
  style?: React.CSSProperties;
  range?: boolean;
  vertical?: boolean;
  reverse?: boolean;
  tooltip?: KSliderTooltipProps | boolean;
  marks?: Record<number, React.ReactNode | { style?: React.CSSProperties; label: React.ReactNode }>;
  /** Fuerza el estado hover */
  isHovered?: boolean;
  /** Fuerza el estado de foco */
  isFocused?: boolean;
  /** Fuerza el estado de presión/arrastre */
  isPressed?: boolean;
}

export const KSlider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, KSliderProps>(
  function KSlider({
    value,
    defaultValue,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    onChange,
    onAfterChange,
    showValue = false,
    className,
    style,
    range = false,
    vertical = false,
    reverse = false,
    tooltip,
    marks,
    isHovered,
    isFocused,
    isPressed,
    ...rest
  }, ref) {
    // Manejo de valores controlados y no controlados
    const initialVal = defaultValue !== undefined ? defaultValue : (range ? [0, 0] : 0);
    const [internalValue, setInternalValue] = useState<number | number[]>(value !== undefined ? value : initialVal);

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value);
      }
    }, [value]);

    const isControlled = value !== undefined;
    const arrayValue = Array.isArray(internalValue) ? internalValue : [internalValue];

    const handleValueChange = (newVal: number[]) => {
      const parsedVal = range ? newVal : newVal[0];
      if (!isControlled) setInternalValue(parsedVal);
      onChange?.(parsedVal);
    };

    const handleValueCommit = (newVal: number[]) => {
      onAfterChange?.(range ? newVal : newVal[0]);
    };

    const tooltipConfig = typeof tooltip === 'object' ? tooltip : tooltip === false ? { formatter: () => null } : {};
    const tooltipPlacement = tooltipConfig.placement || (vertical ? 'right' : 'top');

    const renderMarks = () => {
      if (!marks) return null;
      const markKeys = Object.keys(marks).map(Number).sort((a, b) => a - b);
      
      return (
        <div className={cn("absolute pointer-events-none", vertical ? "inset-y-0 right-0 w-full" : "inset-x-0 top-0 h-full")}>
          {markKeys.map((markVal) => {
            const markObj = marks[markVal];
            const isObject = typeof markObj === 'object' && markObj !== null && 'label' in markObj && !React.isValidElement(markObj);
            const content = isObject ? (markObj as any).label : markObj;
            const customStyle = isObject ? (markObj as any).style : {};
            
            // Calculate percentage position
            const percentage = ((markVal - min) / (max - min)) * 100;
            const pos = reverse ? (100 - percentage) : percentage;
            
            // Si el valor actual es mayor o igual que esta marca, podría tener un estilo "activo".
            const isActive = range ? (arrayValue[0] <= markVal && markVal <= arrayValue[arrayValue.length - 1]) : markVal <= arrayValue[0];

            return (
              <div 
                key={markVal} 
                className={cn(
                  "absolute flex items-center justify-center pointer-events-auto",
                  vertical ? "translate-y-[50%] right-full pr-2" : "translate-x-[-50%] top-full pt-1" // Ajustar para vertical
                )}
                style={{
                  [vertical ? 'bottom' : 'left']: `${pos}%`,
                  ...customStyle
                }}
              >
                {/* Visual Tick */}
                <span className={cn(
                  "absolute block",
                  vertical ? "h-1 w-[6px] right-[-6px]" : "w-1 h-[6px] top-[-6px]",
                  isActive ? "bg-khor-interactive-primary" : "bg-khor-neutral-300"
                )} />
                {/* Content */}
                <span className={cn("text-xs font-primary", isActive ? "text-khor-text-primary font-medium" : "text-khor-text-tertiary")}
                      style={customStyle}>
                  {content}
                </span>
              </div>
            );
          })}
        </div>
      );
    };

    return (
      <div className={cn("flex font-primary", vertical ? "flex-col items-center h-full w-fit gap-2" : "items-center w-full gap-4", className)} style={style}>
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "relative flex items-center select-none touch-none", 
            vertical ? "flex-col w-5 h-full" : "w-full h-5",
            isHovered && "scale-[1.01]"
          )}
          value={arrayValue}
          max={max}
          min={min}
          step={step || 1}
          disabled={disabled}
          orientation={vertical ? "vertical" : "horizontal"}
          dir={reverse ? "rtl" : "ltr"} // Radical change for reverse on horizontal. Inverted might be needed for vertical
          inverted={vertical ? reverse : false} // Support for vertical inversion
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
          {...rest}
        >
          <SliderPrimitive.Track className={cn("bg-khor-neutral-200 relative rounded-full transition-colors", vertical ? "w-[var(--khor-density-spacing-sm)] grow" : "grow h-[var(--khor-density-spacing-sm)]")}>
            <SliderPrimitive.Range className={cn("absolute bg-khor-interactive-primary rounded-full shadow-sm transition-all", vertical ? "w-full" : "h-full")} />
          </SliderPrimitive.Track>
          
          {arrayValue.map((val, i) => {
            const hasFormatter = tooltipConfig.formatter !== undefined;
            const tooltipTitle = hasFormatter ? tooltipConfig.formatter!(val) : val;
            
            const Thumb = (
              <SliderPrimitive.Thumb
                key={i}
                className={cn(
                  "block w-[calc(var(--khor-density-spacing-md)+2px)] h-[calc(var(--khor-density-spacing-md)+2px)] bg-khor-surface-primary border-2 border-khor-interactive-primary rounded-full transition-all outline-none cursor-grab active:cursor-grabbing shadow-khor-sm",
                  "focus-visible:ring-[var(--khor-focus-ring-width)] focus-visible:ring-[var(--khor-focus-ring-color)] focus-visible:ring-offset-1",
                  disabled && "opacity-50 cursor-not-allowed",
                  !disabled && "hover:scale-110 hover:shadow-khor-md",
                  (isPressed || isHovered) && "scale-110 shadow-khor-md",
                  isFocused && "ring-2 ring-khor-interactive-primary ring-offset-1"
                )}
                aria-label="Value"
              />
            );

            // Hide tooltip if undefined formatter returns null, or if strictly false
            if (tooltip === false || (hasFormatter && tooltipTitle === null)) {
              return Thumb;
            }

            return (
              <KTooltip 
                key={i} 
                title={tooltipTitle} 
                placement={tooltipPlacement} 
                open={tooltipConfig.open}
                color={tooltipConfig.color}
              >
                {Thumb}
              </KTooltip>
            );
          })}
          {marks && renderMarks()}
        </SliderPrimitive.Root>

        {showValue && !marks && (
          <span className="text-xs font-bold text-khor-neutral-500 min-w-[32px] uppercase tracking-tighter text-right">
            {arrayValue.join(' - ')}
          </span>
        )}
      </div>
    );
  }
);

KSlider.displayName = 'KSlider';
export default KSlider;
