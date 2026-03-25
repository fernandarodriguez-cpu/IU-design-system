import React from 'react';
import { AutoComplete, Input } from 'antd';
import { Search } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KAutocomplete — Input con sugerencias
   ═══════════════════════════════════════════════ */
export interface KAutocompleteOption {
  value: string;
  label: string;
  description?: string;
}

export interface KAutocompleteProps {
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (option: KAutocompleteOption) => void;
  options: KAutocompleteOption[];
  loading?: boolean;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  noResultsText?: string;
  filterOption?: (input: string, option: any) => boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function KAutocomplete({
  value, onChange, onSelect, options, loading, placeholder = 'Buscar...',
  disabled, allowClear, filterOption, className, style,
}: KAutocompleteProps) {
  
  const mappedOptions = options.map(opt => ({
    value: opt.value,
    label: (
      <div style={{ display: 'flex', flexDirection: 'column', padding: '4px 0' }}>
        <div style={{ fontWeight: 500, color: t.colors.brand.navy, fontSize: 13 }}>{opt.label}</div>
        {opt.description && (
          <div style={{ fontSize: 11, color: t.colors.neutral[400], marginTop: 2 }}>
            {opt.description}
          </div>
        )}
      </div>
    ),
    option: opt,
    // Add plain text label for filtering if needed
    filterText: opt.label.toLowerCase()
  }));

  const defaultFilter = (input: string, option: any) => 
    option.option.label.toLowerCase().includes(input.toLowerCase()) || 
    (option.option.description?.toLowerCase().includes(input.toLowerCase()) || false);

  return (
    <AutoComplete
      value={value}
      options={mappedOptions}
      onSelect={(_, opt: any) => onSelect?.(opt.option)}
      onChange={onChange}
      disabled={disabled}
      allowClear={allowClear}
      className={className}
      filterOption={filterOption || defaultFilter}
      style={{ width: '100%', ...style }}
      popupClassName="khor-autocomplete-dropdown"
    >
      <Input
        placeholder={placeholder}
        prefix={<Search size={16} color={t.colors.neutral[300]} />}
        style={{ 
          height: 40, 
          borderRadius: t.radius.md, 
          fontFamily: font,
          fontSize: 14,
          backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50]
        }}
        suffix={loading ? (
          <div className="animate-spin" style={{ 
            width: 14, height: 14, 
            border: `2px solid ${t.colors.neutral[200]}`, 
            borderTopColor: t.colors.brand.primary, 
            borderRadius: '50%' 
          }} />
        ) : null}
      />
    </AutoComplete>
  );
}

export default KAutocomplete;
