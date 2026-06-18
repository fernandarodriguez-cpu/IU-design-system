import React, { useState } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@/utils/cn';
import { KTooltip } from '../../molecules/KTooltip/index';

export interface KSliderTooltipProps {
  formatter?: (value: number) => React.ReactNode;
  open?: boolean;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  color?: string;
  className?: string;
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
  /** Forces hover visual */
  isHovered?: boolean;
  /** Forces focus visual */
  isFocused?: boolean;
  /** Forces pressed/drag visual */
  isPressed?: boolean;
  /** Label shown above the slider (Slider selector Upper label) */
  label?: React.ReactNode;
  /** Icon rendered to the left of the track */
  prefixIcon?: React.ReactNode;
  /** Icon rendered to the right of the track */
  suffixIcon?: React.ReactNode;
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
    label,
    prefixIcon,
    suffixIcon,
    ...rest
  }, ref) {
    const initialVal = defaultValue !== undefined ? defaultValue : (range ? [0, 0] : 0);
    const [internalValue, setInternalValue] = useState<number | number[]>(value !== undefined ? value : initialVal);

    React.useEffect(() => {
      if (value !== undefined) setInternalValue(value);
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
        <div className={cn('absolute pointer-events-none', vertical ? 'inset-y-0 right-0 w-full' : 'inset-x-0 top-0 h-full')}>
          {markKeys.map((markVal) => {
            const markObj = marks[markVal];
            const isObject = typeof markObj === 'object' && markObj !== null && 'label' in markObj && !React.isValidElement(markObj);
            const content = isObject ? (markObj as any).label : markObj;
            const customStyle = isObject ? (markObj as any).style : {};
            const percentage = ((markVal - min) / (max - min)) * 100;
            const pos = reverse ? (100 - percentage) : percentage;
            const isActive = range
              ? (arrayValue[0] <= markVal && markVal <= arrayValue[arrayValue.length - 1])
              : markVal <= arrayValue[0];
            return (
              <div
                key={markVal}
                className={cn(
                  'absolute flex items-center justify-center pointer-events-auto',
                  vertical ? 'translate-y-[50%] right-full pr-2' : 'translate-x-[-50%] top-full pt-1',
                )}
                style={{ [vertical ? 'bottom' : 'left']: `${pos}%`, ...customStyle }}
              >
                <span
                  className={cn('absolute block', vertical ? 'h-1 w-[6px] right-[-6px]' : 'w-1 h-[6px] top-[-6px]')}
                  style={{ backgroundColor: disabled ? '#E5E7EB' : isActive ? '#051758' : '#D1D5DB' }}
                />
                <span
                  className="text-xs font-primary"
                  style={{ color: disabled ? '#9CA3AF' : isActive ? '#374151' : '#9CA3AF', fontWeight: isActive ? 500 : 400, ...customStyle }}
                >
                  {content}
                </span>
              </div>
            );
          })}
        </div>
      );
    };

    // ── core slider row ──────────────────────────────────────────────────────────
    const sliderRow = (
      <div
        className={cn(
          'flex font-primary',
          vertical ? 'flex-col items-center h-full w-fit gap-2' : 'items-center w-full gap-3',
          !label && className,
        )}
        style={!label ? style : undefined}
      >
        {/* prefix icon */}
        {prefixIcon && (
          <span className={cn('flex shrink-0 items-center', disabled ? 'text-[#D1D5DB]' : 'text-[#9CA3AF]')}>
            {prefixIcon}
          </span>
        )}

        {/* slider primitive */}
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            'relative flex items-center select-none touch-none',
            vertical ? 'flex-col w-5 h-full' : 'w-full h-5',
            isHovered && 'scale-[1.01]',
          )}
          value={arrayValue}
          max={max}
          min={min}
          step={step || 1}
          disabled={disabled}
          orientation={vertical ? 'vertical' : 'horizontal'}
          dir={reverse ? 'rtl' : 'ltr'}
          inverted={vertical ? reverse : false}
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
          {...rest}
        >
          <SliderPrimitive.Track
            className={cn(
              'relative rounded-full transition-colors',
              vertical ? 'w-[var(--khor-density-spacing-sm)] grow' : 'grow h-[var(--khor-density-spacing-sm)]',
            )}
            style={{ backgroundColor: disabled ? '#E5E7EB' : '#D1D5DB' }}
          >
            <SliderPrimitive.Range
              className={cn(
                'absolute rounded-full transition-all',
                vertical ? 'w-full' : 'h-full',
              )}
              style={{ backgroundColor: disabled ? '#9CA3AF' : '#051758' }}
            />
          </SliderPrimitive.Track>

          {arrayValue.map((val, i) => {
            const hasFormatter = tooltipConfig.formatter !== undefined;
            const tooltipTitle = hasFormatter ? tooltipConfig.formatter!(val) : val;

            const thumbColor = disabled ? '#9CA3AF' : '#051758';
            const Thumb = (
              <SliderPrimitive.Thumb
                key={i}
                className={cn(
                  'block rounded-full transition-all outline-none cursor-grab active:cursor-grabbing',
                  'shadow-[0_1px_4px_rgba(0,0,0,0.18)]',
                  disabled && 'opacity-60 cursor-not-allowed',
                  !disabled && 'hover:scale-110',
                  (isPressed || isHovered) && 'scale-110',
                  isFocused && 'ring-2 ring-offset-1',
                )}
                style={{
                  width: 18,
                  height: 18,
                  backgroundColor: '#FFFFFF',
                  border: `2px solid ${thumbColor}`,
                  outline: 'none',
                  ...(isFocused ? { boxShadow: `0 0 0 3px rgba(5,23,88,0.2)` } : {}),
                }}
                aria-label="Value"
              />
            );

            if (tooltip === false || (hasFormatter && tooltipTitle === null)) return Thumb;

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

        {/* suffix icon */}
        {suffixIcon && (
          <span className={cn('flex shrink-0 items-center', disabled ? 'text-[#D1D5DB]' : 'text-[#9CA3AF]')}>
            {suffixIcon}
          </span>
        )}

        {showValue && !marks && (
          <span className="text-xs font-bold text-khor-neutral-500 min-w-[32px] uppercase tracking-tighter text-right">
            {arrayValue.join(' – ')}
          </span>
        )}
      </div>
    );

    // ── with label wrapper ───────────────────────────────────────────────────────
    if (label) {
      return (
        <div className={cn('flex flex-col gap-2 w-full font-primary', className)} style={style}>
          <label className="text-sm font-medium text-[#374151] leading-none select-none">
            {label}
          </label>
          {sliderRow}
        </div>
      );
    }

    return sliderRow;
  },
);

KSlider.displayName = 'KSlider';
export default KSlider;
