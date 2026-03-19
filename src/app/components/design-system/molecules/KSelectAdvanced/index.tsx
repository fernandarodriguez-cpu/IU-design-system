import React, { useState, useRef, useEffect } from 'react';
import { X, Check, ChevronDown } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KSelectAdvanced — Multi-select con tags
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
  maxTagCount?: number;
  showSearch?: boolean;
  allowClear?: boolean;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export function KSelectAdvanced({
  options, value, onChange, placeholder = 'Seleccionar...', mode = 'single',
  maxTagCount = 3, showSearch = true, allowClear, disabled, loading, className,
}: KSelectAdvancedProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isMulti = mode === 'multiple' || mode === 'tags';
  const selected: string[] = isMulti ? (Array.isArray(value) ? value : value ? [value] : []) : [];
  const singleVal = !isMulti ? (typeof value === 'string' ? value : '') : '';

  const filtered = options.filter((o) => !search || o.label.toLowerCase().includes(search.toLowerCase()));

  const handleSelect = (optVal: string) => {
    if (isMulti) {
      const next = selected.includes(optVal) ? selected.filter((v) => v !== optVal) : [...selected, optVal];
      onChange?.(next);
    } else {
      onChange?.(optVal);
      setOpen(false);
      setSearch('');
    }
  };

  const handleRemoveTag = (optVal: string) => {
    onChange?.(selected.filter((v) => v !== optVal));
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) { setOpen(false); setSearch(''); }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const displayTags = selected.slice(0, maxTagCount);
  const overflowCount = selected.length - maxTagCount;
  const singleLabel = options.find((o) => o.value === singleVal)?.label;

  return (
    <div ref={wrapRef} className={className} style={{ position: 'relative' }}>
      <div onClick={() => !disabled && setOpen(true)} style={{
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4,
        minHeight: 40, padding: '4px 12px', borderRadius: t.radius.md,
        border: `1.5px solid ${focused || open ? t.colors.brand.primary : t.colors.neutral[200]}`,
        backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
        cursor: disabled ? 'not-allowed' : 'pointer', transition: 'border-color 0.15s ease',
      }}>
        {isMulti && displayTags.map((v) => {
          const opt = options.find((o) => o.value === v);
          return (
            <span key={v} style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '2px 8px', borderRadius: 4, backgroundColor: 'rgba(224,77,54,0.1)',
              color: t.colors.brand.primary, fontSize: 12, fontWeight: 500, fontFamily: font,
            }}>
              {opt?.label || v}
              <button onClick={(e) => { e.stopPropagation(); handleRemoveTag(v); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0 }}>
                <X size={12} />
              </button>
            </span>
          );
        })}
        {isMulti && overflowCount > 0 && (
          <span style={{ fontSize: 12, color: t.colors.neutral[400], fontFamily: font }}>+{overflowCount}</span>
        )}
        {!isMulti && <span style={{ fontSize: 14, fontFamily: font, color: singleLabel ? t.colors.neutral[900] : t.colors.neutral[300], flex: 1 }}>{singleLabel || placeholder}</span>}
        {isMulti && selected.length === 0 && !search && <span style={{ fontSize: 14, fontFamily: font, color: t.colors.neutral[300], flex: 1 }}>{placeholder}</span>}
        {showSearch && open && (
          <input
            autoFocus value={search} onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
            style={{ flex: 1, minWidth: 60, border: 'none', outline: 'none', backgroundColor: 'transparent', fontFamily: font, fontSize: 14, color: t.colors.neutral[900], padding: 0 }}
            placeholder={isMulti && selected.length > 0 ? '' : placeholder}
          />
        )}
        {loading && <div className="animate-spin" style={{ width: 14, height: 14, border: `2px solid ${t.colors.neutral[200]}`, borderTopColor: t.colors.brand.primary, borderRadius: '50%' }} />}
        {allowClear && (isMulti ? selected.length > 0 : singleVal) && (
          <button onClick={(e) => { e.stopPropagation(); onChange?.(isMulti ? [] : ''); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[300], display: 'flex', padding: 0 }}>
            <X size={14} />
          </button>
        )}
        <ChevronDown size={16} color={t.colors.neutral[300]} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease', flexShrink: 0 }} />
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md,
          zIndex: 50, maxHeight: 240, overflowY: 'auto',
        }}>
          {filtered.length === 0 ? (
            <div style={{ padding: 16, textAlign: 'center', color: t.colors.neutral[300], fontSize: 13, fontFamily: font }}>Sin resultados</div>
          ) : (
            filtered.map((opt) => {
              const isSelected = isMulti ? selected.includes(opt.value) : singleVal === opt.value;
              return (
                <button key={opt.value} onClick={() => !opt.disabled && handleSelect(opt.value)} disabled={opt.disabled} style={{
                  width: '100%', padding: '8px 12px', border: 'none', background: isSelected ? 'rgba(224,77,54,0.06)' : 'transparent',
                  textAlign: 'left', fontFamily: font, fontSize: 14, cursor: opt.disabled ? 'not-allowed' : 'pointer',
                  color: opt.disabled ? t.colors.neutral[300] : t.colors.neutral[900],
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
                  onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = t.colors.neutral[100]; }}
                  onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = isSelected ? 'rgba(224,77,54,0.06)' : 'transparent'; }}
                >
                  {opt.label}
                  {isSelected && <Check size={14} color={t.colors.brand.primary} />}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

export default KSelectAdvanced;
