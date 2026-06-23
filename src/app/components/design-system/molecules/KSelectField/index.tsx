/* ─── Figma tokens: Dropdown Selector (187674-27051 / 187675-31930 / 187675-39799) ───
   Size      : sm (32px) | md (36px) | lg (40px)
   Focus     : border #E04D36, ring #E04D36/20  | Error #D32F2F | Warning #F59E0B
   Migrado a Ant Design (antes @radix-ui/react-select). El trigger ahora es
   un AntD Select; el label/help/side-label de Khor se conservan intactos.
──────────────────────────────────────────────────────────────────────────────── */
import React from 'react';
import { Select as AntSelect } from 'antd';
import { cn } from '@/utils/cn';
import { KLabel } from '../../atoms/KLabel';

// ─── size tokens ──────────────────────────────────────────────────────────────
const SIZE = {
  sm: { h: 32, fs: 12 },
  md: { h: 36, fs: 13 },
  lg: { h: 40, fs: 14 },
} as const;

// per-size height/font overrides on the AntD selector (Khor heights ≠ AntD defaults)
const SIZE_CLASS: Record<string, string> = {
  sm: '[&_.ant-select-selector]:!h-[32px] [&_.ant-select-selector]:!text-[12px] [&_.ant-select-selection-item]:!leading-[30px] [&_.ant-select-selection-placeholder]:!leading-[30px]',
  md: '[&_.ant-select-selector]:!h-[36px] [&_.ant-select-selector]:!text-[13px] [&_.ant-select-selection-item]:!leading-[34px] [&_.ant-select-selection-placeholder]:!leading-[34px]',
  lg: '[&_.ant-select-selector]:!h-[40px] [&_.ant-select-selector]:!text-[14px] [&_.ant-select-selection-item]:!leading-[38px] [&_.ant-select-selection-placeholder]:!leading-[38px]',
};

const STATUS_HELP: Record<string, string> = {
  default: 'text-[#6B7280]',
  error: 'text-[#D32F2F]',
  warning: 'text-[#B45309]',
};

// ─── types ────────────────────────────────────────────────────────────────────
export type KSelectSize = 'sm' | 'md' | 'lg';
export type KSelectStatus = 'default' | 'error' | 'warning';
export type KSelectLabelPosition = 'top' | 'side';

export interface KSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface KSelectFieldProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options?: KSelectOption[];
  placeholder?: string;
  size?: KSelectSize;
  status?: KSelectStatus;
  disabled?: boolean;
  isFocused?: boolean;
  label?: React.ReactNode;
  labelPosition?: KSelectLabelPosition;
  required?: boolean;
  optional?: boolean;
  tooltip?: string;
  helpText?: string;
  error?: string | boolean;
  hint?: string;
  className?: string;
  style?: React.CSSProperties;
  block?: boolean;
}

export const KSelectField = React.forwardRef<HTMLDivElement, KSelectFieldProps>(
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
    const status: KSelectStatus = propStatus || (error ? 'error' : 'default');
    const feedbackMsg = helpText || (typeof error === 'string' ? error : '') || hint || '';

    // ── trigger: AntD Select ───────────────────────────────────────────────────
    const trigger = (
      <AntSelect
        value={value}
        defaultValue={defaultValue}
        onChange={(v) => onChange?.(v as string)}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        status={status === 'default' ? undefined : status}
        className={cn(
          'w-full font-primary',
          SIZE_CLASS[size],
          // Khor focus border = secondary #E04D36 (AntD default focus is navy primary)
          status === 'default' &&
            '[&.ant-select-focused_.ant-select-selector]:!border-[#E04D36] [&.ant-select-focused_.ant-select-selector]:!shadow-[0_0_0_3px_rgba(224,77,54,0.15)] [&:hover_.ant-select-selector]:!border-[#E04D36]',
          isFocused && !disabled && '[&_.ant-select-selector]:!border-[#E04D36] [&_.ant-select-selector]:!shadow-[0_0_0_3px_rgba(224,77,54,0.15)]',
        )}
        // Khor selected-option tint
        popupClassName="font-primary [&_.ant-select-item-option-selected]:!bg-[#FFF5F4] [&_.ant-select-item-option-selected]:!text-[#E04D36]"
        style={{ fontSize: s.fs }}
      />
    );

    const helpNode = feedbackMsg ? (
      <span className={cn('text-xs leading-none', STATUS_HELP[status])} style={{ fontSize: 11 }}>
        {feedbackMsg}
      </span>
    ) : null;

    const labelNode = label ? (
      <KLabel size={size === 'lg' ? 'md' : 'sm'} required={required} optional={optional} info={tooltip} disabled={disabled}>
        {label}
      </KLabel>
    ) : null;

    const outerStyle: React.CSSProperties = { width: block ? '100%' : undefined, ...style };

    if (!label) {
      return (
        <div ref={ref} className={cn('flex flex-col gap-1', block && 'w-full', className)} style={outerStyle}>
          {trigger}
          {helpNode}
        </div>
      );
    }

    if (labelPosition === 'side') {
      return (
        <div ref={ref} className={cn('flex items-start gap-3', block && 'w-full', className)} style={outerStyle}>
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

    return (
      <div ref={ref} className={cn('flex flex-col gap-1', block && 'w-full', className)} style={outerStyle}>
        {labelNode}
        {trigger}
        {helpNode}
      </div>
    );
  },
);

KSelectField.displayName = 'KSelectField';

/* ─── Compatibility shims for the former Radix Select primitives ────
   Public export surface preserved; none are used directly. Prefer the
   <KSelectField options=…> convenience API or AntD Select directly. */
const Passthrough: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const KSelectRoot = Passthrough;
export const KSelectGroup = Passthrough;
export const KSelectValue = Passthrough;
export const KSelectContent = Passthrough;
export const KSelectItem = Passthrough;

export default KSelectField;
