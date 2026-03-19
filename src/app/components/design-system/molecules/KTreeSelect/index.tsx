import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KTreeSelect — Selector de árbol (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KTreeSelectNode { key: string; title: string; children?: KTreeSelectNode[]; disabled?: boolean; }

export interface KTreeSelectProps {
  data: KTreeSelectNode[];
  value?: string;
  onChange?: (value: string, node: KTreeSelectNode) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function KTreeSelect({ data, value, onChange, placeholder = 'Seleccionar...', disabled, className }: KTreeSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const findNode = (nodes: KTreeSelectNode[], key: string): KTreeSelectNode | undefined => {
    for (const n of nodes) {
      if (n.key === key) return n;
      if (n.children) { const found = findNode(n.children, key); if (found) return found; }
    }
  };
  const selectedNode = value ? findNode(data, value) : undefined;

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const renderNodes = (nodes: KTreeSelectNode[], depth: number): React.ReactNode => (
    nodes.map((node) => (
      <div key={node.key}>
        <button
          onClick={() => { if (!node.disabled) { onChange?.(node.key, node); setOpen(false); } }}
          disabled={node.disabled}
          style={{
            width: '100%', padding: '6px 12px', paddingLeft: depth * 16 + 12, border: 'none',
            background: value === node.key ? 'rgba(224,77,54,0.06)' : 'transparent',
            fontFamily: font, fontSize: 13, cursor: node.disabled ? 'not-allowed' : 'pointer',
            color: node.disabled ? t.colors.neutral[300] : t.colors.neutral[900], textAlign: 'left',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
          onMouseEnter={(e) => { if (value !== node.key) e.currentTarget.style.backgroundColor = t.colors.neutral[100] as string; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = value === node.key ? 'rgba(224,77,54,0.06)' : 'transparent'; }}
        >
          {node.title}
          {value === node.key && <Check size={14} color={t.colors.brand.primary} />}
        </button>
        {node.children && renderNodes(node.children, depth + 1)}
      </div>
    ))
  );

  return (
    <div ref={wrapRef} className={className} style={{ position: 'relative' }}>
      <button onClick={() => !disabled && setOpen(!open)} disabled={disabled} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
        height: 40, padding: '0 12px', borderRadius: t.radius.md,
        border: `1.5px solid ${open ? t.colors.brand.primary : t.colors.neutral[200]}`,
        backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
        fontFamily: font, fontSize: 14, cursor: disabled ? 'not-allowed' : 'pointer',
        color: selectedNode ? t.colors.neutral[900] : t.colors.neutral[300],
      }}>
        {selectedNode?.title || placeholder}
        <ChevronDown size={16} color={t.colors.neutral[300]} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md,
          zIndex: 50, maxHeight: 280, overflowY: 'auto',
        }}>
          {renderNodes(data, 0)}
        </div>
      )}
    </div>
  );
}

export default KTreeSelect;
