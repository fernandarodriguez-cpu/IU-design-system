import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
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
  filterOption?: (input: string, option: KAutocompleteOption) => boolean;
  className?: string;
}

export function KAutocomplete({
  value: ctrlValue, onChange, onSelect, options, loading, placeholder = 'Buscar...',
  disabled, allowClear, noResultsText = 'Sin resultados', filterOption, className,
}: KAutocompleteProps) {
  const [internal, setInternal] = useState('');
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const val = ctrlValue !== undefined ? ctrlValue : internal;
  const wrapRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!val) return options;
    const fn = filterOption || ((input, opt) => opt.label.toLowerCase().includes(input.toLowerCase()));
    return options.filter((opt) => fn(val, opt));
  }, [val, options, filterOption]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternal(e.target.value);
    onChange?.(e.target.value);
    setOpen(true);
    setActiveIdx(-1);
  };

  const handleSelect = (opt: KAutocompleteOption) => {
    setInternal(opt.label);
    onChange?.(opt.value);
    onSelect?.(opt);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && activeIdx >= 0 && filtered[activeIdx]) { handleSelect(filtered[activeIdx]); }
    if (e.key === 'Escape') setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={wrapRef} className={className} style={{ position: 'relative' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, height: 40, padding: '0 12px',
        borderRadius: t.radius.md,
        border: `1.5px solid ${focused ? t.colors.brand.primary : t.colors.neutral[200]}`,
        backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
        transition: 'border-color 0.15s ease',
      }}>
        <Search size={16} color={t.colors.neutral[300]} />
        <input
          value={val} onChange={handleChange}
          onFocus={() => { setFocused(true); setOpen(true); }}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder} disabled={disabled}
          style={{
            flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent',
            fontFamily: font, fontSize: 14, color: t.colors.neutral[900], padding: 0,
          }}
        />
        {loading && <div className="animate-spin" style={{ width: 14, height: 14, border: `2px solid ${t.colors.neutral[200]}`, borderTopColor: t.colors.brand.primary, borderRadius: '50%' }} />}
        {allowClear && val && (
          <button onClick={() => { setInternal(''); onChange?.(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[300], display: 'flex', padding: 0 }}>
            <X size={14} />
          </button>
        )}
      </div>
      {open && filtered.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md,
          zIndex: 50, maxHeight: 240, overflowY: 'auto',
        }}>
          {filtered.map((opt, i) => (
            <button key={opt.value} onClick={() => handleSelect(opt)}
              onMouseEnter={() => setActiveIdx(i)}
              style={{
                width: '100%', padding: '8px 12px', border: 'none', background: activeIdx === i ? t.colors.neutral[100] : 'transparent',
                textAlign: 'left', fontFamily: font, fontSize: 14, cursor: 'pointer',
                color: t.colors.neutral[900], display: 'block',
              }}
            >
              <div style={{ fontWeight: 500 }}>{opt.label}</div>
              {opt.description && <div style={{ fontSize: 12, color: t.colors.neutral[400], marginTop: 2 }}>{opt.description}</div>}
            </button>
          ))}
        </div>
      )}
      {open && filtered.length === 0 && val && !loading && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md,
          zIndex: 50, padding: '16px 12px', textAlign: 'center', color: t.colors.neutral[300],
          fontFamily: font, fontSize: 13,
        }}>
          {noResultsText}
        </div>
      )}
    </div>
  );
}

export default KAutocomplete;
