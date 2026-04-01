import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '../../../../../imports/utils';
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

  const heights: Record<'sm' | 'md' | 'lg', string | number> = { 
    sm: 32, 
    md: 'var(--khor-density-height-input)', 
    lg: 48 
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 border transition-all duration-200 group bg-[var(--khor-neutral-50)]",
        focused ? "border-[var(--khor-primary)] ring-2 ring-[var(--khor-primary)]/10" : "border-[var(--khor-neutral-200)]",
        size === 'sm' ? "rounded-md" : "rounded-lg",
        className
      )}
      style={{
        height: typeof heights[size] === 'number' ? `${heights[size]}px` : heights[size],
        minWidth: 200,
      }}
    >
      <Search 
        size={size === 'sm' ? 14 : 18} 
        className={cn("transition-colors", focused ? "text-[var(--khor-primary)]" : "text-[var(--khor-neutral-400)]")} 
        strokeWidth={2.5} 
      />
      <input
        placeholder={placeholder}
        value={val}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.(val)}
        className="flex-1 bg-transparent border-none outline-none font-primary text-foreground placeholder:text-[var(--khor-neutral-400)] min-w-0"
        style={{
          fontSize: size === 'sm' ? 12 : 14,
          padding: 0,
        }}
      />
      {val && (
        <button 
          onClick={handleClear}
          className="flex items-center justify-center p-1 text-[var(--khor-neutral-300)] hover:text-[var(--khor-neutral-500)] transition-colors hover:bg-[var(--khor-neutral-100)] rounded-full"
        >
          <X size={14} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

export default KSearchInput;
