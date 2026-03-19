import React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { Copy } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KColorPicker — Selector de color (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  disabled?: boolean;
  className?: string;
}

const defaultColorPresets = [
  '#E04D36', '#051758', '#FF9500', '#2E7D32', '#D32F2F', '#1976D2',
  '#9C27B0', '#00BCD4', '#FF5722', '#795548', '#607D8B', '#E91E63',
  '#4CAF50', '#FF9800', '#3F51B5', '#009688',
];

export function KColorPicker({ value = '#E04D36', onChange, presets = defaultColorPresets, disabled, className }: KColorPickerProps) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>
        <button disabled={disabled} className={className} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 12px',
          borderRadius: t.radius.md, border: `1.5px solid ${t.colors.neutral[200]}`,
          backgroundColor: t.colors.neutral[50], fontFamily: font, fontSize: 14,
          cursor: disabled ? 'not-allowed' : 'pointer', color: t.colors.neutral[900],
        }}>
          <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: value, border: `1px solid ${t.colors.neutral[200]}` }} />
          {value}
        </button>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content sideOffset={8} style={{
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.lg,
          padding: 16, fontFamily: font, zIndex: 100, width: 240,
        }}>
          <div style={{ marginBottom: 12 }}>
            <input type="color" value={value} onChange={(e) => onChange?.(e.target.value)}
              style={{ width: '100%', height: 40, borderRadius: t.radius.md, border: `1px solid ${t.colors.neutral[200]}`, cursor: 'pointer' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 4 }}>
            {presets.map((c) => (
              <button key={c} onClick={() => onChange?.(c)} title={c} style={{
                width: 24, height: 24, borderRadius: 4, backgroundColor: c,
                border: value === c ? `2px solid ${t.colors.brand.primary}` : `1px solid ${t.colors.neutral[200]}`,
                cursor: 'pointer', transition: 'transform 0.1s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
            ))}
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={value} onChange={(e) => onChange?.(e.target.value)} maxLength={7}
              style={{ flex: 1, height: 32, padding: '0 8px', borderRadius: t.radius.sm, border: `1px solid ${t.colors.neutral[200]}`, fontFamily: 'monospace', fontSize: 13, outline: 'none' }} />
            <button onClick={() => navigator.clipboard?.writeText(value)} title="Copiar" style={{
              width: 32, height: 32, borderRadius: t.radius.sm, border: `1px solid ${t.colors.neutral[200]}`,
              backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: t.colors.neutral[400],
            }}><Copy size={14} /></button>
          </div>
          <RadixPopover.Arrow style={{ fill: t.colors.neutral[50] }} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

export default KColorPicker;
