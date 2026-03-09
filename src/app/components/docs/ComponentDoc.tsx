/**
 * ComponentDoc — Plantilla reutilizable para documentar
 * un componente del Design System Khor.
 * Con soporte para vista previa, playground interactivo,
 * código descargable y documentación de props.
 */
import React, { useState } from 'react';
import { Eye, Code, Settings, BookOpen } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { khorTokens } from '../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface ComponentDocProps {
  name: string;
  category: string;
  description: string;
  preview: React.ReactNode;
  playground?: React.ReactNode;
  code: string;
  filename: string;
  props: PropDef[];
  guidelines?: string[];
  aiNotes?: string;
}

type TabKey = 'preview' | 'playground' | 'code' | 'docs';

export function ComponentDoc({
  name, category, description, preview, playground, code, filename, props, guidelines, aiNotes,
}: ComponentDocProps) {
  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: 'preview', label: 'Vista Previa', icon: <Eye size={16} /> },
    ...(playground ? [{ key: 'playground' as TabKey, label: 'Playground', icon: <Settings size={16} /> }] : []),
    { key: 'code', label: 'Código', icon: <Code size={16} /> },
    { key: 'docs', label: 'Documentación', icon: <BookOpen size={16} /> },
  ];

  const [active, setActive] = useState<TabKey>('preview');

  return (
    <div style={{ fontFamily: font }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: t.colors.brand.primary, textTransform: 'uppercase', letterSpacing: 1 }}>
            {category}
          </span>
        </div>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: t.colors.brand.navy }}>{name}</h2>
        <p style={{ margin: '8px 0 0', fontSize: 16, color: t.colors.neutral[500], lineHeight: 1.5 }}>{description}</p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: 0, borderBottom: `2px solid ${t.colors.neutral[200]}`, marginBottom: 20 }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 16px', border: 'none',
              borderBottom: `2px solid ${active === tab.key ? t.colors.brand.primary : 'transparent'}`,
              marginBottom: -2, background: 'none', cursor: 'pointer',
              fontFamily: font, fontSize: 14, fontWeight: 500,
              color: active === tab.key ? t.colors.brand.primary : t.colors.neutral[400],
              transition: 'all 0.15s ease',
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {active === 'preview' && (
        <div style={{ padding: 32, backgroundColor: t.colors.neutral[100], borderRadius: t.radius.lg, border: `1px solid ${t.colors.neutral[200]}` }}>
          {preview}
        </div>
      )}

      {active === 'playground' && playground && (
        <div style={{ padding: 24, backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg, border: `1px solid ${t.colors.neutral[200]}` }}>
          {playground}
        </div>
      )}

      {active === 'code' && (
        <CodeBlock code={code} filename={filename} />
      )}

      {active === 'docs' && (
        <div>
          {/* Props Table */}
          <h4 style={{ fontSize: 16, fontWeight: 600, color: t.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Propiedades</h4>
          <div style={{ overflowX: 'auto', borderRadius: t.radius.md, border: `1px solid ${t.colors.neutral[200]}` }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ backgroundColor: t.colors.neutral[100] }}>
                  {['Prop', 'Tipo', 'Default', 'Requerido', 'Descripción'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${t.colors.neutral[200]}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.map((p, i) => (
                  <tr key={p.name} style={{ backgroundColor: i % 2 === 0 ? '#fff' : t.colors.neutral[100] }}>
                    <td style={{ padding: '10px 16px', fontWeight: 500, color: t.colors.brand.navy, borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
                      <code style={{ backgroundColor: 'rgba(5,23,88,0.06)', padding: '2px 6px', borderRadius: 4, fontSize: 12 }}>{p.name}</code>
                    </td>
                    <td style={{ padding: '10px 16px', color: t.colors.brand.primary, borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
                      <code style={{ fontSize: 12 }}>{p.type}</code>
                    </td>
                    <td style={{ padding: '10px 16px', color: t.colors.neutral[400], borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
                      {p.default || '—'}
                    </td>
                    <td style={{ padding: '10px 16px', borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
                      {p.required ? <span style={{ color: t.colors.feedback.error, fontWeight: 500 }}>Sí</span> : 'No'}
                    </td>
                    <td style={{ padding: '10px 16px', color: t.colors.neutral[500], borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
                      {p.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Guidelines */}
          {guidelines && guidelines.length > 0 && (
            <div style={{ marginTop: 24 }}>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: t.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Guías de Uso</h4>
              <ul style={{ paddingLeft: 20, color: t.colors.neutral[500], fontSize: 14, lineHeight: 1.8, margin: 0 }}>
                {guidelines.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
          )}

          {/* AI Notes */}
          {aiNotes && (
            <div style={{
              marginTop: 24, padding: 16, borderRadius: t.radius.md,
              backgroundColor: '#E3F2FD', border: `1px solid ${t.colors.brand.navy}20`,
            }}>
              <h4 style={{ fontSize: 14, fontWeight: 600, color: t.colors.brand.navy, margin: '0 0 8px' }}>Notas para Agente IA</h4>
              <p style={{ margin: 0, fontSize: 13, color: t.colors.neutral[500], lineHeight: 1.6 }}>{aiNotes}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
