import React, { useState } from 'react';
import { Clock } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KTimePicker — Selector de hora (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KTimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  placeholder?: string;
  disabled?: boolean;
  format?: '12h' | '24h';
  className?: string;
}

export function KTimePicker({ value, onChange, placeholder = 'Seleccionar hora', disabled, format = '24h', className }: KTimePickerProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={className} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 12px',
      borderRadius: t.radius.md, border: `1.5px solid ${focused ? t.colors.brand.primary : t.colors.neutral[200]}`,
      backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
      transition: 'border-color 0.15s',
    }}>
      <Clock size={16} color={t.colors.neutral[300]} />
      <input
        type="time" value={value} onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        placeholder={placeholder} disabled={disabled}
        style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', fontFamily: font, fontSize: 14, color: value ? t.colors.neutral[900] : t.colors.neutral[300] }}
      />
    </div>
  );
}

export default KTimePicker;
