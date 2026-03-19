import React, { useState, useRef } from 'react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KMentions — Sistema de menciones (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KMentionOption { value: string; label: string; avatar?: string; }

export interface KMentionsProps {
  value?: string;
  onChange?: (value: string) => void;
  options: KMentionOption[];
  placeholder?: string;
  trigger?: string;
  className?: string;
}

export function KMentions({ value: ctrlValue, onChange, options, placeholder = 'Escribe @ para mencionar...', trigger = '@', className }: KMentionsProps) {
  const [internal, setInternal] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [search, setSearch] = useState('');
  const val = ctrlValue !== undefined ? ctrlValue : internal;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const filtered = options.filter((o) => !search || o.label.toLowerCase().includes(search.toLowerCase()));

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setInternal(v);
    onChange?.(v);
    const lastAt = v.lastIndexOf(trigger);
    if (lastAt >= 0 && lastAt === v.length - 1) { setShowSuggestions(true); setSearch(''); }
    else if (lastAt >= 0) { const after = v.slice(lastAt + 1); if (!after.includes(' ')) { setShowSuggestions(true); setSearch(after); } else setShowSuggestions(false); }
    else setShowSuggestions(false);
  };

  const handleSelect = (opt: KMentionOption) => {
    const lastAt = val.lastIndexOf(trigger);
    const newVal = val.slice(0, lastAt) + `${trigger}${opt.label} `;
    setInternal(newVal);
    onChange?.(newVal);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  return (
    <div className={className} style={{ position: 'relative' }}>
      <textarea
        ref={textareaRef} value={val} onChange={handleChange} placeholder={placeholder} rows={3}
        style={{
          width: '100%', padding: 12, borderRadius: t.radius.md,
          border: `1.5px solid ${t.colors.neutral[200]}`,
          fontFamily: font, fontSize: 14, color: t.colors.neutral[900],
          resize: 'vertical', outline: 'none', backgroundColor: t.colors.neutral[50],
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = t.colors.brand.primary as string; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = t.colors.neutral[200] as string; }}
      />
      {showSuggestions && filtered.length > 0 && (
        <div style={{
          position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: 4,
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md,
          zIndex: 50, maxHeight: 160, overflowY: 'auto',
        }}>
          {filtered.map((opt) => (
            <button key={opt.value} onClick={() => handleSelect(opt)} style={{
              width: '100%', padding: '8px 12px', border: 'none', background: 'transparent',
              display: 'flex', alignItems: 'center', gap: 8, fontFamily: font, fontSize: 14,
              color: t.colors.neutral[900], cursor: 'pointer', textAlign: 'left',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = t.colors.neutral[100] as string; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {opt.avatar && <img src={opt.avatar} alt="" style={{ width: 24, height: 24, borderRadius: '50%' }} />}
              <span style={{ fontWeight: 500 }}>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default KMentions;
