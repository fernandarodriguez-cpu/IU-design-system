import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KSearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function KSearchInput({ placeholder = 'Buscar...', value, onChange, onSearch, size = 'md', className }: KSearchInputProps) {
  const [internal, setInternal] = useState(value || '');
  const [focused, setFocused] = useState(false);
  const val = value !== undefined ? value : internal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternal(e.target.value);
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    setInternal('');
    onChange?.('');
  };

  const heights: Record<'sm' | 'md' | 'lg', number> = { sm: 32, md: 40, lg: 48 };

  return (
    <div
      className={className}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        height: heights[size], padding: '0 12px',
        borderRadius: t.radius.lg, backgroundColor: t.colors.neutral[50],
        border: `1.5px solid ${focused ? t.colors.brand.primary : t.colors.neutral[200]}`,
        transition: 'border-color 0.15s ease', minWidth: 200,
      }}
    >
      <Search size={16} color={t.colors.neutral[300]} strokeWidth={2} />
      <input
        placeholder={placeholder}
        value={val}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.(val)}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: font, fontSize: size === 'sm' ? 12 : 14,
          color: t.colors.neutral[900], padding: 0, minWidth: 0,
        }}
      />
      {val && (
        <button onClick={handleClear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[300], display: 'flex', padding: 0 }}>
          <X size={14} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

export default KSearchInput;
