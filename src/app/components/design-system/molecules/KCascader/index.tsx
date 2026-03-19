import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ChevronDown, Check } from 'lucide-react';
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
  onChange?: (value: string[], selectedOptions: KCascaderOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function KCascader({ options, value = [], onChange, placeholder = 'Seleccionar...', disabled, className }: KCascaderProps) {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState<KCascaderOption[][]>([options]);
  const [selected, setSelected] = useState<KCascaderOption[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleSelect = (opt: KCascaderOption, level: number) => {
    const newSelected = [...selected.slice(0, level), opt];
    setSelected(newSelected);
    if (opt.children?.length) {
      setPath([...path.slice(0, level + 1), opt.children]);
    } else {
      const vals = newSelected.map((o) => o.value);
      onChange?.(vals, newSelected);
      setOpen(false);
    }
  };

  const displayLabel = selected.map((o) => o.label).join(' / ') || placeholder;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={wrapRef} className={className} style={{ position: 'relative' }}>
      <button onClick={() => !disabled && setOpen(!open)} disabled={disabled} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
        height: 40, padding: '0 12px', borderRadius: t.radius.md,
        border: `1.5px solid ${open ? t.colors.brand.primary : t.colors.neutral[200]}`,
        backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
        fontFamily: font, fontSize: 14, cursor: disabled ? 'not-allowed' : 'pointer',
        color: selected.length ? t.colors.neutral[900] : t.colors.neutral[300],
      }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayLabel}</span>
        <ChevronDown size={16} color={t.colors.neutral[300]} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 4,
          display: 'flex', backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md, zIndex: 50, overflow: 'hidden',
        }}>
          {path.map((levelOpts, level) => (
            <div key={level} style={{ minWidth: 160, maxHeight: 240, overflowY: 'auto', borderRight: level < path.length - 1 ? `1px solid ${t.colors.neutral[200]}` : 'none' }}>
              {levelOpts.map((opt) => {
                const isSelected = selected[level]?.value === opt.value;
                return (
                  <button key={opt.value} onClick={() => !opt.disabled && handleSelect(opt, level)} disabled={opt.disabled} style={{
                    width: '100%', padding: '8px 12px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: isSelected ? 'rgba(224,77,54,0.06)' : 'transparent', fontFamily: font, fontSize: 14,
                    color: opt.disabled ? t.colors.neutral[300] : t.colors.neutral[900], cursor: opt.disabled ? 'not-allowed' : 'pointer',
                  }}
                    onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = t.colors.neutral[100] as string; }}
                    onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = isSelected ? 'rgba(224,77,54,0.06)' : 'transparent'; }}
                  >
                    <span>{opt.label}</span>
                    {opt.children?.length ? <ChevronRight size={14} color={t.colors.neutral[300]} /> : isSelected ? <Check size={14} color={t.colors.brand.primary} /> : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default KCascader;
