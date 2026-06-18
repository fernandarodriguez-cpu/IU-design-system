import React, { useState, useRef, useImperativeHandle } from 'react';
import { Search, X, Mic } from 'lucide-react';
import { cn } from '@/utils/cn';

/* ─── Figma tokens: KSearch (187676-6781) ──────────────────────
   Size  : small (32px) | medium (36px) | large (40px)
   Enter : default (inline search icon) | icon (red btn, icon)
           | text (red btn, icon + "Buscar")
   Suffix: microphone icon before the enter section
   Colors: Enter btn bg #E04D36 | border default #D1D5DB
           focus border #E04D36 | disabled bg #F3F4F6
──────────────────────────────────────────────────────────────── */

export type KSearchEnter = 'default' | 'icon' | 'text';

export interface KSearchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  size?: 'small' | 'medium' | 'large';
  enter?: KSearchEnter;
  suffix?: boolean;
  allowClear?: boolean;
  loading?: boolean;
  enterText?: string;
  onSearch?: (value: string, e?: React.KeyboardEvent | React.MouseEvent) => void;
  className?: string;
  style?: React.CSSProperties;
}

const SIZES = {
  small:  { h: 32, fs: 12, px: 10, iconSz: 13, btnMinW: 32, gap: 6 },
  medium: { h: 36, fs: 13, px: 12, iconSz: 14, btnMinW: 36, gap: 8 },
  large:  { h: 40, fs: 14, px: 14, iconSz: 16, btnMinW: 40, gap: 8 },
};

export const KSearch = React.forwardRef<HTMLInputElement, KSearchProps>(
  function KSearch(
    {
      size = 'medium',
      enter = 'default',
      suffix = false,
      allowClear = false,
      loading = false,
      enterText = 'Buscar',
      onSearch,
      disabled,
      value,
      defaultValue,
      onChange,
      className,
      style,
      placeholder = 'Buscar',
      onKeyDown,
      ...rest
    },
    ref,
  ) {
    const s = SIZES[size];
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const [internalValue, setInternalValue] = useState<string>(
      typeof defaultValue === 'string' ? defaultValue : '',
    );
    const isControlled = value !== undefined;
    const currentVal = isControlled ? String(value ?? '') : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue('');
      const syntheticEvent = {
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange?.(syntheticEvent);
      onSearch?.('');
      inputRef.current?.focus();
    };

    const handleSearch = (e?: React.MouseEvent | React.KeyboardEvent) => {
      if (disabled || loading) return;
      onSearch?.(currentVal, e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') handleSearch(e);
      onKeyDown?.(e);
    };

    const hasValue = currentVal.length > 0;
    const showClear = allowClear && hasValue && !disabled;
    const hasEnterBtn = enter === 'icon' || enter === 'text';

    return (
      <div
        className={cn(
          'group/ks relative flex w-full items-center overflow-hidden',
          'rounded-md border border-[#D1D5DB] bg-white transition-all duration-150',
          'focus-within:border-[#E04D36] focus-within:shadow-[0_0_0_3px_rgba(224,77,54,0.15)]',
          disabled && 'pointer-events-none border-[#E5E7EB] bg-[#F3F4F6] opacity-60',
          className,
        )}
        style={{ height: s.h, ...style }}
      >
        {/* Input */}
        <input
          ref={inputRef}
          disabled={disabled}
          value={currentVal}
          defaultValue={undefined}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={cn(
            'min-w-0 flex-1 bg-transparent outline-none focus-visible:outline-none',
            'text-[#1e293b] placeholder:text-[#9CA3AF] disabled:cursor-not-allowed',
          )}
          style={{ paddingLeft: s.px, paddingRight: 4, fontSize: s.fs }}
          {...rest}
        />

        {/* Suffix icons area */}
        <div
          className="flex shrink-0 items-center"
          style={{ paddingRight: 0, gap: s.gap }}
        >
          {/* Clear button */}
          {showClear && (
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center justify-center text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
              style={{ paddingLeft: s.gap }}
              tabIndex={-1}
            >
              <X size={s.iconSz - 1} />
            </button>
          )}

          {/* Microphone (suffix) */}
          {suffix && (
            <span className="flex items-center text-[#9CA3AF]">
              <Mic size={s.iconSz} />
            </span>
          )}

          {/* ── Enter section: always has divider + explicit height so border spans full input height ── */}
          {enter === 'default' && (
            <button
              type="button"
              disabled={disabled || loading}
              onClick={handleSearch}
              className={cn(
                'flex shrink-0 items-center justify-center text-[#9CA3AF]',
                'border-l border-[#D1D5DB]',
                'hover:text-[#051758] transition-colors',
              )}
              style={{ paddingLeft: s.px, paddingRight: s.px, height: s.h }}
              tabIndex={0}
            >
              <Search size={s.iconSz} className={loading ? 'animate-pulse' : ''} />
            </button>
          )}

          {enter === 'icon' && (
            <button
              type="button"
              disabled={disabled || loading}
              onClick={handleSearch}
              className={cn(
                'flex shrink-0 items-center justify-center',
                'bg-[#051758] text-white',
                'hover:bg-[#0A1F60] active:bg-[#030E38]',
                'transition-colors duration-150',
                'border-l border-[#D1D5DB]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051758]/40',
                'rounded-r-[5px]',
              )}
              style={{ width: s.h, height: s.h, minWidth: s.h }}
              tabIndex={0}
            >
              <Search size={s.iconSz} className={loading ? 'animate-pulse' : ''} />
            </button>
          )}

          {enter === 'text' && (
            <button
              type="button"
              disabled={disabled || loading}
              onClick={handleSearch}
              className={cn(
                'flex shrink-0 items-center justify-center gap-1.5',
                'bg-[#051758] text-white font-medium',
                'hover:bg-[#0A1F60] active:bg-[#030E38]',
                'transition-colors duration-150',
                'border-l border-[#D1D5DB]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051758]/40',
                'rounded-r-[5px]',
              )}
              style={{ height: s.h, paddingLeft: s.px, paddingRight: s.px, fontSize: s.fs }}
              tabIndex={0}
            >
              <Search size={s.iconSz} className={loading ? 'animate-pulse' : ''} />
              {enterText}
            </button>
          )}
        </div>
      </div>
    );
  },
);

KSearch.displayName = 'KSearch';
export default KSearch;
