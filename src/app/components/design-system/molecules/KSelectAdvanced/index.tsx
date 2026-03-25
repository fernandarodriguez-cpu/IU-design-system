import React from 'react';
import { Select } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KSelectAdvanced — Selector avanzado (Multi/Tags)
   ═══════════════════════════════════════════════ */
export interface KSelectAdvancedOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
}

export interface KSelectAdvancedProps {
  options: KSelectAdvancedOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  mode?: 'single' | 'multiple' | 'tags';
  maxTagCount?: number | 'responsive';
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  loading?: boolean;
  status?: 'error' | 'warning';
  className?: string;
  style?: React.CSSProperties;
}

export function KSelectAdvanced({
  options, value, onChange, placeholder = 'Seleccionar...', mode = 'single',
  maxTagCount = 3, showSearch = true, allowClear, disabled, loading, status, className, style,
}: KSelectAdvancedProps) {
  
  const antdMode = mode === 'single' ? undefined : mode;

  return (
    <Select
      mode={antdMode}
      value={value}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      maxTagCount={maxTagCount}
      showSearch={showSearch}
      allowClear={allowClear}
      disabled={disabled}
      loading={loading}
      status={status}
      className={className}
      style={{ width: '100%', minHeight: 40, fontFamily: font, ...style }}
      dropdownStyle={{ fontFamily: font }}
    />
  );
}

export default KSelectAdvanced;
