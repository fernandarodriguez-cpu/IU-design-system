import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '../../../../../imports/utils';

export interface KSliderProps {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onValueChange?: (value: number[]) => void;
  showValue?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KSlider — Selector de rango (Headless v4)
 * Reemplaza AntD Slider con Radix UI primitives. Soporta rangos simples y dobles con una estética premium.
 */
export function KSlider({
  value,
  defaultValue = [50],
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onValueChange,
  showValue = false,
  className,
  style,
}: KSliderProps) {
  return (
    <div className={cn("flex items-center gap-4 w-full font-primary", className)} style={style}>
      <SliderPrimitive.Root
        className="relative flex items-center select-none touch-none w-full h-5 group"
        value={value}
        defaultValue={defaultValue}
        max={max}
        min={min}
        step={step}
        disabled={disabled}
        onValueChange={onValueChange}
      >
        <SliderPrimitive.Track className="bg-khor-neutral-200 relative grow rounded-full h-[6px] transition-colors group-hover:bg-khor-neutral-300">
          <SliderPrimitive.Range className="absolute bg-khor-primary rounded-full h-full shadow-[0_0_8px_rgba(var(--khor-primary-rgb),0.3)] transition-all" />
        </SliderPrimitive.Track>
        
        {(value || defaultValue).map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block w-5 h-5 bg-white border-2 border-khor-primary shadow-[0_4px_10px_rgba(0,0,0,0.15)] rounded-full hover:scale-110 focus:outline-none focus:ring-4 focus:ring-khor-primary-light/20 transition-all cursor-grab active:cursor-grabbing"
            aria-label="Value"
          />
        ))}
      </SliderPrimitive.Root>

      {showValue && (
        <span className="text-xs font-bold text-khor-neutral-500 min-w-[32px] text-right uppercase tracking-tighter">
          {(value || defaultValue).join(' - ')}
        </span>
      )}
    </div>
  );
}

export default KSlider;
