/* ─── Figma tokens: KInput (187673-24767 / 187675-34963 / 187675-34761) ────
   Size      : sm (32px) | md (36px) | lg (40px)
   State     : normal | focused | error | warning | disabled
   Disabled  : bg #F3F4F6, border #E5E7EB, text #9CA3AF — no opacity/grayscale
   Focus     : border #E04D36, ring #E04D36/20
   Error     : border #D32F2F, ring #D32F2F/20
   Warning   : border #F59E0B, ring #F59E0B/20
   Default border : #D1D5DB
   Prefix/Suffix  : icon left / right inside input
   Label position : top (upper label) | side (side label)
   Label props    : required (*) | optional (text) | tooltip (ℹ) | helpText
──────────────────────────────────────────────────────────────────────────── */
import React, { useState, useRef, useImperativeHandle } from 'react';
import { cn } from '@/utils/cn';
import { Eye, EyeOff, X } from 'lucide-react';
import { KLabel } from '../KLabel';

import { KInputSearch } from './Search';
import { KTextArea } from './TextArea';
import { KInputOTP } from './OTP';

// ─── size tokens ────────────────────────────────────────────────────────────
const SIZE = {
  sm: { h: 32, px: 10, fs: 12, iconSz: 13 },
  md: { h: 36, px: 12, fs: 13, iconSz: 14 },
  lg: { h: 40, px: 14, fs: 14, iconSz: 16 },
} as const;

// ─── border / ring per status ────────────────────────────────────────────────
const STATUS_CLASSES: Record<string, string> = {
  default: 'border-[#D1D5DB] focus-within:border-[#E04D36] focus-within:shadow-[0_0_0_3px_rgba(224,77,54,0.15)]',
  error:   'border-[#D32F2F] focus-within:shadow-[0_0_0_3px_rgba(211,47,47,0.15)]',
  warning: 'border-[#F59E0B] focus-within:shadow-[0_0_0_3px_rgba(245,158,11,0.15)]',
};

const STATUS_HELP: Record<string, string> = {
  default: 'text-[#6B7280]',
  error:   'text-[#D32F2F]',
  warning: 'text-[#B45309]',
};

// ─── types ───────────────────────────────────────────────────────────────────
export type KInputSize   = 'sm' | 'md' | 'lg';
export type KInputStatus = 'default' | 'error' | 'warning';
export type KInputLabelPosition = 'top' | 'side';

export interface KInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'status'> {
  size?: KInputSize;
  status?: KInputStatus;
  /** @deprecated use status="error" */
  error?: string | boolean;
  /** @deprecated use status="warning" */
  warning?: string | boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean | { clearIcon?: React.ReactNode };
  showCount?: boolean | { formatter: (info: { value: string; count: number; maxLength?: number }) => React.ReactNode };
  addonBefore?: React.ReactNode;
  addonAfter?: React.ReactNode;
  onClear?: () => void;
  block?: boolean;
  /** Forces focused visual (playground/preview) */
  isFocused?: boolean;
  /** Forces hovered visual (playground/preview) */
  isHovered?: boolean;

  // ── label props (Upper / Side label) ──────────────────────────────────────
  label?: React.ReactNode;
  labelPosition?: KInputLabelPosition;
  required?: boolean;
  optional?: boolean;
  tooltip?: string;
  helpText?: string;
}

// ─── BaseInput ───────────────────────────────────────────────────────────────
const BaseInput = React.forwardRef<HTMLInputElement, KInputProps>(function KInput(
  {
    size = 'md', status: propStatus, error, warning,
    prefix, suffix, allowClear, showCount, maxLength,
    addonBefore, addonAfter, onClear,
    isFocused, isHovered,
    block, className, style, disabled,
    value, defaultValue, onChange,
    label, labelPosition = 'top', required, optional, tooltip, helpText,
    ...rest
  },
  ref,
) {
  const s = SIZE[size];
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current!);

  const [internalValue, setInternalValue] = useState<string>(
    typeof defaultValue === 'string' ? defaultValue : '',
  );
  const isControlled = value !== undefined;
  const currentVal = String(isControlled ? (value ?? '') : internalValue);

  const status: KInputStatus = propStatus || (error ? 'error' : warning ? 'warning' : 'default');
  const feedbackMsg = helpText
    || (typeof error === 'string' ? error : '')
    || (typeof warning === 'string' ? warning : '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onChange?.({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    onClear?.();
    inputRef.current?.focus();
  };

  const showClearBtn = allowClear && currentVal && !disabled;

  // ── wrapper ────────────────────────────────────────────────────────────────
  const inputBox = (
    <div className={cn('flex w-full', addonBefore || addonAfter ? '' : '')}>
      {addonBefore && (
        <div className="flex items-center justify-center shrink-0 px-3 bg-[#F9FAFB] border border-[#D1D5DB] border-r-0 rounded-l-md text-sm text-[#6B7280]">
          {addonBefore}
        </div>
      )}

      {/* inner field */}
      <div
        className={cn(
          'relative flex w-full items-center',
          'rounded-md border bg-white transition-all duration-150',
          // status-based border + focus ring
          !disabled && STATUS_CLASSES[status],
          // focus forced (playground)
          isFocused && !disabled && 'border-[#E04D36] shadow-[0_0_0_3px_rgba(224,77,54,0.15)]',
          // hover forced
          isHovered && !disabled && 'border-[#E04D36]',
          // disabled
          disabled && 'bg-[#F3F4F6] border-[#E5E7EB] pointer-events-none',
          addonBefore && 'rounded-l-none',
          addonAfter  && 'rounded-r-none',
        )}
        style={{ height: s.h }}
      >
        {/* prefix icon */}
        {prefix && (
          <div
            className={cn('flex shrink-0 items-center', disabled ? 'text-[#D1D5DB]' : 'text-[#9CA3AF]')}
            style={{ paddingLeft: s.px, paddingRight: 6 }}
          >
            {prefix}
          </div>
        )}

        {/* input */}
        <input
          ref={inputRef}
          disabled={disabled}
          value={currentVal}
          defaultValue={undefined}
          onChange={handleChange}
          maxLength={maxLength}
          className={cn(
            'min-w-0 flex-1 bg-transparent outline-none focus-visible:outline-none h-full',
            'placeholder:text-[#9CA3AF]',
            disabled ? 'text-[#9CA3AF] cursor-not-allowed' : 'text-[#1e293b]',
          )}
          style={{
            paddingLeft: prefix ? 4 : s.px,
            paddingRight: 4,
            fontSize: s.fs,
          }}
          {...rest}
        />

        {/* right side: clear + suffix + count */}
        <div
          className="flex shrink-0 items-center gap-1 self-stretch"
          style={{ paddingRight: suffix ? 0 : s.px }}
        >
          {showClearBtn && (
            <button
              type="button"
              onClick={handleClear}
              tabIndex={-1}
              className="flex items-center text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
            >
              {typeof allowClear === 'object' && allowClear.clearIcon
                ? allowClear.clearIcon
                : <X size={s.iconSz - 1} />}
            </button>
          )}

          {showCount && (() => {
            const info = { value: currentVal, count: currentVal.length, maxLength };
            return typeof showCount === 'object' && showCount.formatter
              ? showCount.formatter(info)
              : <span className="text-[10px] text-[#9CA3AF] font-mono">{currentVal.length}{maxLength ? `/${maxLength}` : ''}</span>;
          })()}

          {suffix && (
            <div className={cn('flex items-center', disabled ? 'text-[#D1D5DB]' : 'text-[#9CA3AF]')}>
              {suffix}
            </div>
          )}
        </div>
      </div>

      {addonAfter && (
        <div className="flex items-center justify-center shrink-0 px-3 bg-[#F9FAFB] border border-[#D1D5DB] border-l-0 rounded-r-md text-sm text-[#6B7280]">
          {addonAfter}
        </div>
      )}
    </div>
  );

  // ── help text ──────────────────────────────────────────────────────────────
  const helpNode = feedbackMsg ? (
    <span
      className={cn('text-xs leading-none', STATUS_HELP[status])}
      style={{ fontSize: 11 }}
    >
      {feedbackMsg}
    </span>
  ) : null;

  // ── label node ─────────────────────────────────────────────────────────────
  const labelNode = label ? (
    <KLabel
      size={size === 'lg' ? 'md' : 'sm'}
      required={required}
      optional={optional}
      info={tooltip}
      disabled={disabled}
    >
      {label}
    </KLabel>
  ) : null;

  // ── layout ─────────────────────────────────────────────────────────────────
  const outerStyle: React.CSSProperties = { width: block ? '100%' : undefined, ...style };

  if (!label) {
    return (
      <div className={cn('flex flex-col gap-1', block && 'w-full', className)} style={outerStyle}>
        {inputBox}
        {helpNode}
      </div>
    );
  }

  if (labelPosition === 'side') {
    return (
      <div className={cn('flex items-start gap-3', block && 'w-full', className)} style={outerStyle}>
        <div className="flex items-center shrink-0" style={{ height: s.h }}>
          {labelNode}
          {label && <span className={cn('ml-0.5', disabled ? 'text-[#9CA3AF]' : 'text-[#374151]')} style={{ fontSize: s.fs }}>:</span>}
        </div>
        <div className="flex flex-col gap-1 flex-1">
          {inputBox}
          {helpNode}
        </div>
      </div>
    );
  }

  // top (default)
  return (
    <div className={cn('flex flex-col gap-1', block && 'w-full', className)} style={outerStyle}>
      {labelNode}
      {inputBox}
      {helpNode}
    </div>
  );
},
);

// ─── KInputPassword ───────────────────────────────────────────────────────────
export interface KInputPasswordProps extends KInputProps {
  visibilityToggle?: boolean | { visible?: boolean; onVisibleChange?: (visible: boolean) => void };
  iconRender?: (visible: boolean) => React.ReactNode;
}

export const KInputPassword = React.forwardRef<HTMLInputElement, KInputPasswordProps>(
  function KInputPassword({ prefix, suffix, visibilityToggle = true, iconRender, ...rest }, ref) {
    const [internalVisible, setInternalVisible] = useState(false);
    const isControlled = typeof visibilityToggle === 'object' && visibilityToggle.visible !== undefined;
    const visible = isControlled ? (visibilityToggle as any).visible : internalVisible;

    const toggle = () => {
      if (!isControlled) setInternalVisible(v => !v);
      if (typeof visibilityToggle === 'object') visibilityToggle.onVisibleChange?.(!visible);
    };

    const eyeBtn = visibilityToggle ? (
      <button
        type="button"
        onClick={toggle}
        className="flex items-center text-[#9CA3AF] hover:text-[#6B7280] transition-colors outline-none"
        tabIndex={-1}
      >
        {iconRender ? iconRender(visible) : (visible ? <EyeOff size={14} /> : <Eye size={14} />)}
      </button>
    ) : null;

    return (
      <KInput
        {...rest}
        ref={ref}
        type={visible ? 'text' : 'password'}
        prefix={prefix}
        suffix={<div className="flex items-center gap-1">{suffix}{eyeBtn}</div>}
      />
    );
  },
);

// ─── Compound type ─────────────────────────────────────────────────────────────
export interface CompoundedComponent
  extends React.ForwardRefExoticComponent<KInputProps & React.RefAttributes<HTMLInputElement>> {
  Password: typeof KInputPassword;
  Search: typeof KInputSearch;
  TextArea: typeof KTextArea;
  OTP: typeof KInputOTP;
}

export const KInput = BaseInput as CompoundedComponent;
KInput.Password = KInputPassword;
KInput.Search   = KInputSearch;
KInput.TextArea = KTextArea;
KInput.OTP      = KInputOTP;
KInput.displayName = 'KInput';

export default KInput;
