import React from 'react';
import { Slider as AntSlider } from 'antd';
import { cn } from '@/utils/cn';

/* ─── KSlider ───────────────────────────────────────────────────
   Migrated to Ant Design (was @radix-ui/react-slider + KTooltip).
   Track navy (#051758) comes from colorPrimary in khorAntdTheme.ts.
   label / prefixIcon / suffixIcon / showValue remain Khor layout
   affordances wrapped around the AntD Slider.
──────────────────────────────────────────────────────────────── */

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
  isHovered?: boolean;
  isFocused?: boolean;
  isPressed?: boolean;
  label?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

export const KSlider = React.forwardRef<HTMLDivElement, KSliderProps>(function KSlider(
  {
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
    label,
    prefixIcon,
    suffixIcon,
  },
  ref,
) {
  // AntD tooltip config
  const tooltipConfig =
    tooltip === false
      ? { open: false as const }
      : typeof tooltip === 'object'
        ? {
            formatter: tooltip.formatter,
            open: tooltip.open,
            placement: tooltip.placement ?? (vertical ? 'right' : 'top'),
          }
        : undefined;

  const currentArray = Array.isArray(value)
    ? value
    : value !== undefined
      ? [value]
      : Array.isArray(defaultValue)
        ? defaultValue
        : defaultValue !== undefined
          ? [defaultValue]
          : [min];

  const sliderRow = (
    <div
      className={cn(
        'flex font-primary',
        vertical ? 'flex-col items-center h-full w-fit gap-2' : 'items-center w-full gap-3',
        !label && className,
      )}
      style={!label ? style : undefined}
    >
      {prefixIcon && (
        <span className={cn('flex shrink-0 items-center', disabled ? 'text-[#D1D5DB]' : 'text-[#9CA3AF]')}>
          {prefixIcon}
        </span>
      )}

      <AntSlider
        // @ts-expect-error AntD types split range/single value; runtime handles both
        range={range}
        value={value as any}
        defaultValue={defaultValue as any}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        vertical={vertical}
        reverse={reverse}
        marks={marks as any}
        tooltip={tooltipConfig as any}
        onChange={(v: any) => onChange?.(v)}
        onChangeComplete={(v: any) => onAfterChange?.(v)}
        className={cn('grow', vertical ? 'h-full' : 'w-full', isHovered && 'scale-[1.01]')}
        style={vertical ? { height: '100%' } : undefined}
      />

      {suffixIcon && (
        <span className={cn('flex shrink-0 items-center', disabled ? 'text-[#D1D5DB]' : 'text-[#9CA3AF]')}>
          {suffixIcon}
        </span>
      )}

      {showValue && !marks && (
        <span className="text-xs font-bold text-khor-neutral-500 min-w-[32px] uppercase tracking-tighter text-right">
          {currentArray.join(' – ')}
        </span>
      )}
    </div>
  );

  if (label) {
    return (
      <div ref={ref} className={cn('flex flex-col gap-2 w-full font-primary', className)} style={style}>
        <label className="text-sm font-medium text-[#374151] leading-none select-none">{label}</label>
        {sliderRow}
      </div>
    );
  }

  return (
    <div ref={ref} className="contents">
      {sliderRow}
    </div>
  );
});

KSlider.displayName = 'KSlider';
export default KSlider;
