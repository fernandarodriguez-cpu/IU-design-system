import React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { Check, X, Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

/* ─── Figma tokens: KSwitch (187678-36733) ────────────────────
   Size    : small (36×20, thumb 16px) | medium (44×24, thumb 20px)
   Checked : bg #051758 | hover #1e3a6e | disabled bg-slate-400
   Unchecked: bg #cbd5e1 | hover #94a3b8 | disabled bg-slate-200
   Thumb   : white, shadow, translate-x on checked
   Text    : "ON" left / "OFF" right — white
   Icon    : Check left / X right — white / muted
   Loading : spinner in thumb
──────────────────────────────────────────────────────────────── */

export interface KSwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  label?:             React.ReactNode;
  size?:              'small' | 'medium' | 'sm' | 'md' | 'default';
  loading?:           boolean;
  showText?:          boolean;
  showIcon?:          boolean;
  checkedChildren?:   React.ReactNode;
  unCheckedChildren?: React.ReactNode;
}

const SIZES = {
  small:  { trackW: 36, trackH: 20, thumbSz: 16, dx: 16, fs: 8,  iconSz: 9,  loaderSz: 9  },
  medium: { trackW: 44, trackH: 24, thumbSz: 20, dx: 20, fs: 10, iconSz: 10, loaderSz: 11 },
};

export const KSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  KSwitchProps
>(function KSwitch(
  { className, label, size = 'medium', loading, disabled,
    showText, showIcon, checkedChildren, unCheckedChildren, ...rest },
  ref
) {
  // Normalize legacy size values
  const sz = SIZES[(size === 'sm' || size === 'small') ? 'small' : 'medium'];
  const hasInner = showText || showIcon || checkedChildren !== undefined || unCheckedChildren !== undefined;

  const switchEl = (
    <SwitchPrimitive.Root
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'group relative inline-flex shrink-0 items-center rounded-full',
        'border-2 border-transparent transition-colors duration-200 outline-none',
        'focus-visible:ring-2 focus-visible:ring-[#051758]/30 focus-visible:ring-offset-2',
        // enabled colors
        'data-[state=checked]:bg-[#051758]',
        'data-[state=unchecked]:bg-slate-300',
        // hover
        'hover:data-[state=checked]:bg-[#1e3a6e]',
        'hover:data-[state=unchecked]:bg-slate-400',
        // disabled colors
        'disabled:cursor-not-allowed',
        'disabled:data-[state=checked]:bg-slate-400',
        'disabled:data-[state=unchecked]:bg-slate-200',
        className,
      )}
      style={{ width: sz.trackW, height: sz.trackH, minWidth: sz.trackW }}
      {...rest}
    >
      {/* ── Inner text / icon ── */}
      {hasInner && (
        <>
          {/* Checked side (ON / ✓ / custom) — left of track */}
          <span
            className={cn(
              'absolute flex items-center justify-center text-white',
              'opacity-0 group-data-[state=checked]:opacity-100',
              'group-disabled:opacity-60',
              'transition-opacity duration-200 pointer-events-none select-none',
            )}
            style={{ left: 4, top: '50%', transform: 'translateY(-50%)', fontSize: sz.fs, fontWeight: 700, lineHeight: 1 }}
          >
            {showIcon
              ? <Check size={sz.iconSz} strokeWidth={3} />
              : showText
                ? 'ON'
                : checkedChildren}
          </span>

          {/* Unchecked side (OFF / ✗ / custom) — right of track */}
          <span
            className={cn(
              'absolute flex items-center justify-center text-slate-100',
              'opacity-100 group-data-[state=checked]:opacity-0',
              'group-disabled:text-slate-400',
              'transition-opacity duration-200 pointer-events-none select-none',
            )}
            style={{ right: 4, top: '50%', transform: 'translateY(-50%)', fontSize: sz.fs, fontWeight: 700, lineHeight: 1 }}
          >
            {showIcon
              ? <X size={sz.iconSz} strokeWidth={3} />
              : showText
                ? 'OFF'
                : unCheckedChildren}
          </span>
        </>
      )}

      {/* ── Thumb ── */}
      <SwitchPrimitive.Thumb
        className={cn(
          'relative block rounded-full bg-white',
          'flex items-center justify-center',
          'transition-transform duration-200',
          'data-[state=checked]:translate-x-[var(--sw-dx)]',
          'data-[state=unchecked]:translate-x-0',
        )}
        style={{
          width: sz.thumbSz,
          height: sz.thumbSz,
          boxShadow: '0 1px 4px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
          ['--sw-dx' as string]: `${sz.dx}px`,
        }}
      >
        {loading && (
          <Loader2
            className="animate-spin text-[#051758] absolute"
            style={{ width: sz.loaderSz, height: sz.loaderSz }}
          />
        )}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );

  if (!label) return switchEl;

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer select-none',
        (disabled || loading) && 'cursor-not-allowed opacity-60',
      )}
    >
      {switchEl}
      <span
        className={cn(
          'font-medium leading-none text-[#1e293b]',
          (size === 'small' || size === 'sm') ? 'text-xs' : 'text-sm',
        )}
      >
        {label}
      </span>
    </label>
  );
});

KSwitch.displayName = 'KSwitch';
export default KSwitch;
