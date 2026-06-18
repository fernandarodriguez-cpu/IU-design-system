/* ─── Figma tokens: Dropdown Selector (187674-27051 / 187675-31930 / 187675-39799) ───
   Size      : sm (32px) | md (36px) | lg (40px)
   State     : normal | focused | error | warning | disabled
   Disabled  : bg #F3F4F6, border #E5E7EB, text #9CA3AF — no opacity
   Focus     : border #E04D36, ring #E04D36/20
   Error     : border #D32F2F, ring #D32F2F/20
   Warning   : border #F59E0B, ring #F59E0B/20
   Default border : #D1D5DB
   Label position : top (upper label) | side (side label)
   Label props    : required (*) | optional | tooltip (ℹ) | helpText
──────────────────────────────────────────────────────────────────────────────── */
import React, { useState } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { cn } from '@/utils/cn';
import { KLabel } from '../../atoms/KLabel';

// ─── size tokens ──────────────────────────────────────────────────────────────
const SIZE = {
  sm: { h: 32, px: 10, fs: 12, iconSz: 13 },
  md: { h: 36, px: 12, fs: 13, iconSz: 14 },
  lg: { h: 40, px: 14, fs: 14, iconSz: 16 },
} as const;

// ─── status → border/ring classes ─────────────────────────────────────────────
const STATUS_TRIGGER: Record<string, string> = {
  default: 'border-[#D1D5DB] data-[state=open]:border-[#E04D36] data-[state=open]:shadow-[0_0_0_3px_rgba(224,77,54,0.15)] hover:border-[#E04D36]',
  error:   'border-[#D32F2F] data-[state=open]:shadow-[0_0_0_3px_rgba(211,47,47,0.15)]',
  warning: 'border-[#F59E0B] data-[state=open]:shadow-[0_0_0_3px_rgba(245,158,11,0.15)]',
};

const STATUS_HELP: Record<string, string> = {
  default: 'text-[#6B7280]',
  error:   'text-[#D32F2F]',
  warning: 'text-[#B45309]',
};

// ─── types ────────────────────────────────────────────────────────────────────
export type KSelectSize   = 'sm' | 'md' | 'lg';
export type KSelectStatus = 'default' | 'error' | 'warning';
export type KSelectLabelPosition = 'top' | 'side';

export interface KSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface KSelectFieldProps {
  // value
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  // options
  options?: KSelectOption[];
  placeholder?: string;
  // sizing & state
  size?: KSelectSize;
  status?: KSelectStatus;
  disabled?: boolean;
  /** Forces focused visual (playground/preview) */
  isFocused?: boolean;
  // label
  label?: React.ReactNode;
  labelPosition?: KSelectLabelPosition;
  required?: boolean;
  optional?: boolean;
  tooltip?: string;
  helpText?: string;
  // legacy compat
  error?: string | boolean;
  hint?: string;
  className?: string;
  style?: React.CSSProperties;
  block?: boolean;
}

// ─── Radix primitives (re-exported for advanced use) ─────────────────────────
export const KSelectRoot    = SelectPrimitive.Root;
export const KSelectGroup   = SelectPrimitive.Group;
export const KSelectValue   = SelectPrimitive.Value;

export const KSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      className={cn(
        'relative z-50 min-w-[8rem] overflow-hidden rounded-md border border-[#E5E7EB]',
        'bg-white text-[#1e293b] shadow-lg font-primary',
        'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
        'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
        position === 'popper' && 'translate-y-1',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ScrollUpButton className="flex cursor-default items-center justify-center py-1 text-[#9CA3AF]">
        <ChevronUp className="h-4 w-4" />
      </SelectPrimitive.ScrollUpButton>
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectPrimitive.ScrollDownButton className="flex cursor-default items-center justify-center py-1 text-[#9CA3AF]">
        <ChevronDown className="h-4 w-4" />
      </SelectPrimitive.ScrollDownButton>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
KSelectContent.displayName = 'KSelectContent';

export const KSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm',
      'outline-none transition-colors',
      'focus:bg-[#FFF5F4] focus:text-[#E04D36]',
      'data-[disabled]:pointer-events-none data-[disabled]:text-[#9CA3AF]',
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-[#E04D36]" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
KSelectItem.displayName = 'KSelectItem';

// ─── KSelectField ─────────────────────────────────────────────────────────────
export const KSelectField = React.forwardRef<HTMLButtonElement, KSelectFieldProps>(
  function KSelectField(
    {
      value, defaultValue, onChange,
      options = [], placeholder = 'Seleccionar',
      size = 'md', status: propStatus, disabled,
      isFocused,
      label, labelPosition = 'top', required, optional, tooltip, helpText,
      error, hint,
      className, style, block,
    },
    ref,
  ) {
    const s = SIZE[size];
    const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
    const isControlled = value !== undefined;
    const currentVal = isControlled ? value : internalValue;

    const status: KSelectStatus = propStatus
      || (error ? 'error' : 'default');

    const feedbackMsg = helpText
      || (typeof error === 'string' ? error : '')
      || hint || '';

    const handleChange = (v: string) => {
      if (!isControlled) setInternalValue(v);
      onChange?.(v);
    };

    // ── trigger ──────────────────────────────────────────────────────────────
    const trigger = (
      <SelectPrimitive.Root
        value={currentVal || ''}
        onValueChange={handleChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          ref={ref}
          className={cn(
            'flex w-full items-center justify-between rounded-md border bg-white',
            'font-primary outline-none focus:outline-none focus-visible:outline-none transition-all duration-150',
            !disabled && STATUS_TRIGGER[status],
            isFocused && !disabled && 'border-[#E04D36] shadow-[0_0_0_3px_rgba(224,77,54,0.15)]',
            disabled && 'bg-[#F3F4F6] border-[#E5E7EB] pointer-events-none',
          )}
          style={{ height: s.h, paddingLeft: s.px, paddingRight: s.px, fontSize: s.fs }}
        >
          <span className={cn(
            'flex-1 truncate text-left',
            currentVal ? (disabled ? 'text-[#9CA3AF]' : 'text-[#1e293b]') : 'text-[#9CA3AF]',
          )}>
            <SelectPrimitive.Value placeholder={placeholder} />
          </span>
          <SelectPrimitive.Icon asChild>
            <ChevronDown
              className={cn('shrink-0 transition-transform duration-150 [[data-state=open]_&]:rotate-180', disabled ? 'text-[#D1D5DB]' : 'text-[#9CA3AF]')}
              style={{ width: s.iconSz, height: s.iconSz, marginLeft: 6 }}
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <KSelectContent>
          {options.map(opt => (
            <KSelectItem key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </KSelectItem>
          ))}
        </KSelectContent>
      </SelectPrimitive.Root>
    );

    // ── help text ─────────────────────────────────────────────────────────────
    const helpNode = feedbackMsg ? (
      <span className={cn('text-xs leading-none', STATUS_HELP[status])} style={{ fontSize: 11 }}>
        {feedbackMsg}
      </span>
    ) : null;

    // ── label ─────────────────────────────────────────────────────────────────
    const labelNode = label ? (
      <KLabel size={size === 'lg' ? 'md' : 'sm'} required={required} optional={optional} info={tooltip} disabled={disabled}>
        {label}
      </KLabel>
    ) : null;

    const outerStyle: React.CSSProperties = { width: block ? '100%' : undefined, ...style };

    if (!label) {
      return (
        <div className={cn('flex flex-col gap-1', block && 'w-full', className)} style={outerStyle}>
          {trigger}
          {helpNode}
        </div>
      );
    }

    if (labelPosition === 'side') {
      return (
        <div className={cn('flex items-start gap-3', block && 'w-full', className)} style={outerStyle}>
          <div className="flex items-center shrink-0" style={{ height: s.h }}>
            {labelNode}
            <span className={cn('ml-0.5', disabled ? 'text-[#9CA3AF]' : 'text-[#374151]')} style={{ fontSize: s.fs }}>:</span>
          </div>
          <div className="flex flex-col gap-1 flex-1">
            {trigger}
            {helpNode}
          </div>
        </div>
      );
    }

    // top (default)
    return (
      <div className={cn('flex flex-col gap-1', block && 'w-full', className)} style={outerStyle}>
        {labelNode}
        {trigger}
        {helpNode}
      </div>
    );
  },
);

KSelectField.displayName = 'KSelectField';
export default KSelectField;
