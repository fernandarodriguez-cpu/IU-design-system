import React from 'react';
import { Cascader } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KCascader — Selector de niveles (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KCascaderOption {
  value: string;
  label: string;
  children?: KCascaderOption[];
  disabled?: boolean;
}

export interface KCascaderProps {
  options: KCascaderOption[];
  value?: string[];
  onChange?: (value: any, selectedOptions: KCascaderOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  multiple?: boolean;
  allowClear?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function KCascader({ options, value, onChange, placeholder = 'Seleccionar...', disabled, multiple, allowClear, className, style }: KCascaderProps) {
  return (
    <Cascader
      options={options}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      multiple={multiple as any}
      allowClear={allowClear}
      className={className}
      style={{ width: '100%', minHeight: 40, fontFamily: font, ...style }}
      dropdownStyle={{ fontFamily: font }}
    />
  );
}

export default KCascader;
