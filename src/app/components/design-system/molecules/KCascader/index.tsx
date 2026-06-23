import React from 'react';
import { Cascader as AntCascader, type CascaderProps as AntCascaderProps } from 'antd';
import { cn } from '@/utils/cn';

/* ─── KCascader ─────────────────────────────────────────────────
   Migrated to Ant Design (was a custom KPopover-based implementation).
   The hierarchical selector now renders AntD's <Cascader>. Navy primary
   (#051758), secondary (#E04D36), radius 6, control heights 24/32/40 and
   Montserrat come from the global theme bridge (khorAntdTheme.ts); this
   wrapper only maps the Khor public API onto AntD and keeps the Khor
   surface look + font-primary affordances.
──────────────────────────────────────────────────────────────── */

export interface KCascaderOption {
  value: string | number;
  label: string;
  children?: KCascaderOption[];
  disabled?: boolean;
}

export type KCascaderSize = 'sm' | 'md' | 'lg';
export type KCascaderStatus = 'default' | 'error' | 'warning';

export interface KCascaderProps {
  options: KCascaderOption[];
  value?: (string | number)[];
  defaultValue?: (string | number)[];
  onChange?: (value: (string | number)[], selectedOptions: KCascaderOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  changeOnSelect?: boolean;
  showSearch?: boolean;
  /** Multiple selection mode */
  multiple?: boolean;
  /** Show clear ("x") affordance */
  allowClear?: boolean;
  size?: KCascaderSize;
  status?: KCascaderStatus;
  className?: string;
  style?: React.CSSProperties;
}

// Khor size → AntD size
const SIZE_MAP: Record<KCascaderSize, AntCascaderProps['size']> = {
  sm: 'small',
  md: 'middle',
  lg: 'large',
};

/**
 * KCascader — Selector jerárquico multinivel.
 * Wrapper sobre AntD Cascader, tematizado por el bridge global (khorAntdTheme.ts).
 */
export function KCascader({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Seleccionar...',
  disabled,
  changeOnSelect = false,
  showSearch = false,
  multiple = false,
  allowClear = true,
  size = 'md',
  status = 'default',
  className,
  style,
}: KCascaderProps) {
  return (
    <AntCascader
      // KCascaderOption uses {value,label,children} which matches AntD's
      // default fieldNames, so options pass through unchanged.
      options={options as unknown as AntCascaderProps['options']}
      value={value as any}
      defaultValue={defaultValue as any}
      onChange={(val, selectedOptions) =>
        onChange?.(
          (val as (string | number)[]) ?? [],
          (selectedOptions as unknown as KCascaderOption[]) ?? [],
        )
      }
      placeholder={placeholder}
      disabled={disabled}
      changeOnSelect={changeOnSelect}
      showSearch={showSearch}
      multiple={multiple as any}
      allowClear={allowClear}
      size={SIZE_MAP[size]}
      status={status === 'default' ? undefined : status}
      style={{ width: '100%', ...style }}
      className={cn('font-primary', className)}
      rootClassName="font-primary"
    />
  );
}

KCascader.displayName = 'KCascader';

export default KCascader;
