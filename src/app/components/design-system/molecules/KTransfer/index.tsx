import React, { useState } from 'react';
import { Search, ChevronRight, ChevronLeft } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';
import { KCheckbox } from '../../atoms';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KTransfer — Transferencia entre listas (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KTransferItem { key: string; label: string; description?: string; disabled?: boolean; }

export interface KTransferProps {
  dataSource: KTransferItem[];
  targetKeys: string[];
  onChange: (targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void;
  titles?: [string, string];
  showSearch?: boolean;
  className?: string;
}

export function KTransfer({ dataSource, targetKeys, onChange, titles = ['Disponible', 'Seleccionado'], showSearch, className }: KTransferProps) {
  const [leftChecked, setLeftChecked] = useState<Set<string>>(new Set());
  const [rightChecked, setRightChecked] = useState<Set<string>>(new Set());
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');

  const leftItems = dataSource.filter((i) => !targetKeys.includes(i.key));
  const rightItems = dataSource.filter((i) => targetKeys.includes(i.key));

  const moveRight = () => {
    const keys = Array.from(leftChecked);
    onChange([...targetKeys, ...keys], 'right', keys);
    setLeftChecked(new Set());
  };
  const moveLeft = () => {
    const keys = Array.from(rightChecked);
    onChange(targetKeys.filter((k) => !keys.includes(k)), 'left', keys);
    setRightChecked(new Set());
  };

  const renderPanel = (items: KTransferItem[], checked: Set<string>, setChecked: (s: Set<string>) => void, title: string, search: string, setSearch: (s: string) => void) => (
    <div style={{ flex: 1, border: `1px solid ${t.colors.neutral[200]}`, borderRadius: t.radius.md, overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', borderBottom: `1px solid ${t.colors.neutral[200]}`, fontSize: 13, fontWeight: 600, color: t.colors.neutral[900], display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{title}</span>
        <span style={{ fontSize: 12, color: t.colors.neutral[400] }}>{checked.size}/{items.length}</span>
      </div>
      {showSearch && (
        <div style={{ padding: '8px 12px', borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 32, padding: '0 8px', borderRadius: t.radius.sm, border: `1px solid ${t.colors.neutral[200]}` }}>
            <Search size={14} color={t.colors.neutral[300]} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..."
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 12, fontFamily: font, backgroundColor: 'transparent' }} />
          </div>
        </div>
      )}
      <div style={{ maxHeight: 240, overflowY: 'auto' }}>
        {items.filter((i) => !search || i.label.toLowerCase().includes(search.toLowerCase())).map((item) => (
          <label key={item.key} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', fontSize: 13, fontFamily: font,
            cursor: item.disabled ? 'not-allowed' : 'pointer', opacity: item.disabled ? 0.5 : 1,
            color: t.colors.neutral[900],
          }}>
            <KCheckbox
              checked={checked.has(item.key)}
              disabled={item.disabled}
              onChange={(v) => { const next = new Set(checked); v ? next.add(item.key) : next.delete(item.key); setChecked(next); }}
            />
            {item.label}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className={className} style={{ display: 'flex', gap: 12, alignItems: 'center', fontFamily: font }}>
      {renderPanel(leftItems, leftChecked, setLeftChecked, titles[0], leftSearch, setLeftSearch)}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={moveRight} disabled={leftChecked.size === 0} style={{
          width: 32, height: 32, borderRadius: t.radius.sm, border: `1px solid ${t.colors.neutral[200]}`,
          backgroundColor: leftChecked.size > 0 ? t.colors.brand.primary : 'transparent',
          color: leftChecked.size > 0 ? '#fff' : t.colors.neutral[300], cursor: leftChecked.size > 0 ? 'pointer' : 'not-allowed',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><ChevronRight size={16} /></button>
        <button onClick={moveLeft} disabled={rightChecked.size === 0} style={{
          width: 32, height: 32, borderRadius: t.radius.sm, border: `1px solid ${t.colors.neutral[200]}`,
          backgroundColor: rightChecked.size > 0 ? t.colors.brand.primary : 'transparent',
          color: rightChecked.size > 0 ? '#fff' : t.colors.neutral[300], cursor: rightChecked.size > 0 ? 'pointer' : 'not-allowed',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><ChevronLeft size={16} /></button>
      </div>
      {renderPanel(rightItems, rightChecked, setRightChecked, titles[1], rightSearch, setRightSearch)}
    </div>
  );
}

export default KTransfer;
