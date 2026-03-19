/**
 * WCAGCheckerPage — Verificador de Contraste WCAG en tiempo real.
 * Evalúa combinaciones de colores del sistema y custom contra estándares AA/AAA.
 */
import React, { useState, useMemo } from 'react';
import {
  CheckCircle, XCircle, AlertTriangle, Eye, Palette, ArrowRight,
  Info, RefreshCw, Copy, Check,
} from 'lucide-react';
import { KButton, KBadge } from '../components/design-system/atoms/index';
import { khorTokens } from '../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ─── Color Utility Functions ─── */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

type WcagLevel = 'AAA' | 'AA' | 'AA Large' | 'Fail';

function getWcagLevel(ratio: number): WcagLevel {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Large';
  return 'Fail';
}

function getLevelConfig(level: WcagLevel) {
  switch (level) {
    case 'AAA': return { color: '#2E7D32', bg: '#E8F5E9', icon: <CheckCircle size={14} /> };
    case 'AA': return { color: '#2E7D32', bg: '#E8F5E9', icon: <CheckCircle size={14} /> };
    case 'AA Large': return { color: '#E68600', bg: '#FFF3E0', icon: <AlertTriangle size={14} /> };
    case 'Fail': return { color: '#D32F2F', bg: '#FFEBEE', icon: <XCircle size={14} /> };
  }
}

/* ─── System Color Pairs ─── */
interface ColorPair {
  name: string;
  fg: string;
  bg: string;
  context: string;
}

const systemPairs: ColorPair[] = [
  // ─── Light Mode Pairs ───
  { name: 'Primary on White', fg: '#E04D36', bg: '#FFFFFF', context: 'Botones, badges, links' },
  { name: 'Navy on White', fg: '#051758', bg: '#FFFFFF', context: 'Headings, texto principal' },
  { name: 'White on Primary', fg: '#FFFFFF', bg: '#E04D36', context: 'Botón primary' },
  { name: 'White on Navy', fg: '#FFFFFF', bg: '#051758', context: 'Sidebar, botón navy' },
  { name: 'Accent on White', fg: '#FF9500', bg: '#FFFFFF', context: 'Warning badges, highlights' },
  { name: 'White on Accent', fg: '#FFFFFF', bg: '#FF9500', context: 'Botón accent' },
  { name: 'Success on White', fg: '#2E7D32', bg: '#FFFFFF', context: 'Badges éxito' },
  { name: 'Error on White', fg: '#D32F2F', bg: '#FFFFFF', context: 'Mensajes de error' },
  { name: 'Muted Text on White', fg: '#718096', bg: '#FFFFFF', context: 'Texto secundario (neutral[400])' },
  { name: 'Placeholder on Input', fg: '#A0AEC0', bg: '#EDF0F1', context: 'Placeholder en inputs' },
  { name: 'Nav Text on Navy', fg: 'rgba(255,255,255,179)', bg: '#051758', context: 'Items sidebar inactivos' },
  { name: 'Active Nav on Navy', fg: '#FFFFFF', bg: '#202f73', context: 'Item sidebar activo' },
  { name: 'Success on SuccessLight', fg: '#2E7D32', bg: '#E8F5E9', context: 'Alert success' },
  { name: 'Error on ErrorLight', fg: '#D32F2F', bg: '#FFEBEE', context: 'Alert error' },
  { name: 'Navy on InfoLight', fg: '#051758', bg: '#E3F2FD', context: 'Alert info' },
  // ─── Dark Mode Pairs ───
  { name: '[Dark] Foreground on BG', fg: '#E8EAF0', bg: '#22243A', context: 'Dark: texto principal sobre fondo' },
  { name: '[Dark] Primary on Dark BG', fg: '#E04D36', bg: '#1A1B2E', context: 'Dark: botones primary sobre card' },
  { name: '[Dark] White on Primary', fg: '#FFFFFF', bg: '#E04D36', context: 'Dark: texto en botón primary' },
  { name: '[Dark] Navy light on Dark', fg: '#8BA3D9', bg: '#22243A', context: 'Dark: navy token sobre fondo' },
  { name: '[Dark] Accent on Dark', fg: '#FFB340', bg: '#1A1B2E', context: 'Dark: accent/warning sobre card' },
  { name: '[Dark] Success on Dark', fg: '#4CAF50', bg: '#1B2E1C', context: 'Dark: alert success' },
  { name: '[Dark] Error on Dark', fg: '#EF5350', bg: '#2E1B1B', context: 'Dark: alert error' },
  { name: '[Dark] Info on Dark', fg: '#64B5F6', bg: '#1B242E', context: 'Dark: alert info' },
  { name: '[Dark] Muted on Dark BG', fg: '#8B90A8', bg: '#22243A', context: 'Dark: texto secundario' },
  { name: '[Dark] Border on Dark', fg: '#4A4E6A', bg: '#22243A', context: 'Dark: bordes y divisores' },
  { name: '[Dark] White on Sidebar', fg: '#FFFFFF', bg: '#0D1B3E', context: 'Dark: sidebar nav text' },
];

/* Handle rgba colors for the system pairs */
function colorToHex(color: string): string {
  if (color.startsWith('#')) return color;
  // Approximate rgba to a hex against white bg for contrast calc
  const m = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (m) {
    const [_, r, g, b, a] = m;
    const alpha = a ? parseFloat(a) : 1;
    const blend = (c: number) => Math.round(c * alpha + 255 * (1 - alpha));
    return '#' + [blend(+r), blend(+g), blend(+b)].map((c) => c.toString(16).padStart(2, '0')).join('');
  }
  return '#000000';
}

/* ─── Page Component ─── */
export function WCAGCheckerPage() {
  const [customFg, setCustomFg] = useState('#051758');
  const [customBg, setCustomBg] = useState('#FFFFFF');
  const [copied, setCopied] = useState(false);

  const customRatio = useMemo(() => contrastRatio(customFg, customBg), [customFg, customBg]);
  const customLevel = getWcagLevel(customRatio);

  const systemResults = useMemo(() =>
    systemPairs.map((pair) => {
      const fgHex = colorToHex(pair.fg);
      const bgHex = colorToHex(pair.bg);
      const ratio = contrastRatio(fgHex, bgHex);
      return { ...pair, ratio, level: getWcagLevel(ratio) };
    }),
    []
  );

  const passCount = systemResults.filter((r) => r.level === 'AA' || r.level === 'AAA').length;
  const partialCount = systemResults.filter((r) => r.level === 'AA Large').length;
  const failCount = systemResults.filter((r) => r.level === 'Fail').length;

  const handleCopyReport = async () => {
    const lines = systemResults.map((r) => `${r.name}: ${r.ratio.toFixed(2)}:1 — ${r.level}`);
    await navigator.clipboard.writeText(`WCAG Contrast Audit — Khor Design System\n${'='.repeat(50)}\n\n${lines.join('\n')}\n\nTotal: ${passCount} pass, ${partialCount} partial, ${failCount} fail`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ fontFamily: font }}>
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: t.colors.brand.primary, textTransform: 'uppercase', letterSpacing: 1 }}>Accesibilidad</span>
        <h2 style={{ margin: '4px 0 0', fontSize: 30, fontWeight: 700, color: 'var(--foreground)' }}>Verificador de Contraste WCAG</h2>
        <p style={{ margin: '8px 0 0', fontSize: 16, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
          Evalúa las combinaciones de colores del sistema contra los estándares WCAG 2.1.
          Ratio mínimo: 4.5:1 (AA normal), 3:1 (AA large text), 7:1 (AAA).
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div style={{ padding: 20, borderRadius: t.radius.lg, backgroundColor: '#E8F5E9', border: '1px solid #C8E6C9', textAlign: 'center' }}>
          <CheckCircle size={24} color="#2E7D32" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 28, fontWeight: 700, color: '#2E7D32' }}>{passCount}</div>
          <div style={{ fontSize: 13, color: '#2E7D32', fontWeight: 500 }}>Cumple AA/AAA</div>
        </div>
        <div style={{ padding: 20, borderRadius: t.radius.lg, backgroundColor: '#FFF3E0', border: '1px solid #FFE0B2', textAlign: 'center' }}>
          <AlertTriangle size={24} color="#E68600" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 28, fontWeight: 700, color: '#E68600' }}>{partialCount}</div>
          <div style={{ fontSize: 13, color: '#E68600', fontWeight: 500 }}>Solo Large Text</div>
        </div>
        <div style={{ padding: 20, borderRadius: t.radius.lg, backgroundColor: '#FFEBEE', border: '1px solid #FFCDD2', textAlign: 'center' }}>
          <XCircle size={24} color="#D32F2F" style={{ marginBottom: 8 }} />
          <div style={{ fontSize: 28, fontWeight: 700, color: '#D32F2F' }}>{failCount}</div>
          <div style={{ fontSize: 13, color: '#D32F2F', fontWeight: 500 }}>No Cumple</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
        {/* System Pairs Table */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--foreground)' }}>Pares del Sistema</h3>
            <KButton variant="outline" size="sm" icon={copied ? <Check size={14} /> : <Copy size={14} />} onClick={handleCopyReport}>
              {copied ? 'Copiado' : 'Copiar Reporte'}
            </KButton>
          </div>
          <div style={{ borderRadius: t.radius.lg, border: `1px solid var(--border)`, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--muted)' }}>
                  {['Muestra', 'Combinación', 'Contexto', 'Ratio', 'Nivel'].map((h) => (
                    <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid var(--border)`, color: 'var(--foreground)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {systemResults.map((r, i) => {
                  const cfg = getLevelConfig(r.level);
                  return (
                    <tr key={r.name} style={{ backgroundColor: i % 2 === 0 ? 'var(--card)' : 'var(--muted)' }}>
                      <td style={{ padding: '8px 12px', borderBottom: `1px solid var(--border)` }}>
                        <div style={{
                          width: 48, height: 28, borderRadius: 4,
                          backgroundColor: colorToHex(r.bg), border: '1px solid var(--border)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: colorToHex(r.fg), fontSize: 11, fontWeight: 700,
                        }}>Aa</div>
                      </td>
                      <td style={{ padding: '8px 12px', borderBottom: `1px solid var(--border)`, fontWeight: 500, color: 'var(--foreground)' }}>{r.name}</td>
                      <td style={{ padding: '8px 12px', borderBottom: `1px solid var(--border)`, color: 'var(--muted-foreground)' }}>{r.context}</td>
                      <td style={{ padding: '8px 12px', borderBottom: `1px solid var(--border)`, fontFamily: 'monospace', fontWeight: 600, color: 'var(--foreground)' }}>{r.ratio.toFixed(2)}:1</td>
                      <td style={{ padding: '8px 12px', borderBottom: `1px solid var(--border)` }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                          padding: '2px 8px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                          backgroundColor: cfg.bg, color: cfg.color,
                        }}>
                          {cfg.icon} {r.level}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom Checker */}
        <div style={{ position: 'sticky', top: 24 }}>
          <div style={{ padding: 20, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: `1px solid var(--border)` }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 600, color: 'var(--foreground)' }}>Checker Personalizado</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted-foreground)', display: 'block', marginBottom: 4 }}>Color de Texto</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="color" value={customFg} onChange={(e) => setCustomFg(e.target.value)} style={{ width: 32, height: 32, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 0 }} />
                  <input value={customFg} onChange={(e) => setCustomFg(e.target.value)} style={{ flex: 1, padding: '6px 10px', borderRadius: 6, border: `1px solid var(--border)`, fontSize: 13, fontFamily: 'monospace', color: 'var(--foreground)', backgroundColor: 'var(--card)' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 500, color: 'var(--muted-foreground)', display: 'block', marginBottom: 4 }}>Color de Fondo</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input type="color" value={customBg} onChange={(e) => setCustomBg(e.target.value)} style={{ width: 32, height: 32, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 0 }} />
                  <input value={customBg} onChange={(e) => setCustomBg(e.target.value)} style={{ flex: 1, padding: '6px 10px', borderRadius: 6, border: `1px solid var(--border)`, fontSize: 13, fontFamily: 'monospace', color: 'var(--foreground)', backgroundColor: 'var(--card)' }} />
                </div>
              </div>
              <button onClick={() => { const temp = customFg; setCustomFg(customBg); setCustomBg(temp); }} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '6px', border: `1px solid var(--border)`, borderRadius: 6,
                backgroundColor: 'transparent', cursor: 'pointer', fontSize: 12, color: 'var(--muted-foreground)', fontFamily: font,
              }}>
                <RefreshCw size={14} /> Intercambiar colores
              </button>
            </div>

            {/* Preview */}
            <div style={{
              padding: 24, borderRadius: t.radius.md, backgroundColor: customBg,
              border: '1px solid var(--border)', textAlign: 'center', marginBottom: 16,
            }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: customFg, marginBottom: 4 }}>Texto Grande</div>
              <div style={{ fontSize: 14, color: customFg }}>Texto normal de ejemplo para verificar legibilidad.</div>
            </div>

            {/* Result */}
            <div style={{
              padding: 16, borderRadius: t.radius.md,
              backgroundColor: getLevelConfig(customLevel).bg,
              border: `1px solid ${getLevelConfig(customLevel).color}20`,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: getLevelConfig(customLevel).color, fontFamily: 'monospace' }}>
                {customRatio.toFixed(2)}:1
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '4px 12px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                backgroundColor: getLevelConfig(customLevel).color,
                color: '#fff', marginTop: 8,
              }}>
                {getLevelConfig(customLevel).icon} {customLevel}
              </div>
              <div style={{ marginTop: 12, fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
                {customLevel === 'AAA' && 'Excelente. Cumple el nivel más estricto para todo tipo de texto.'}
                {customLevel === 'AA' && 'Cumple el estándar para texto normal (14px+) y grande.'}
                {customLevel === 'AA Large' && 'Solo válido para texto grande (18px+ o 14px bold). No cumple para texto normal.'}
                {customLevel === 'Fail' && 'No cumple ningún estándar WCAG. Mejorar el contraste.'}
              </div>
            </div>

            {/* WCAG Reference */}
            <div style={{ marginTop: 16, padding: 12, borderRadius: t.radius.sm, backgroundColor: 'var(--muted)', fontSize: 11, color: 'var(--muted-foreground)', lineHeight: 1.6 }}>
              <strong>Referencia WCAG 2.1:</strong><br />
              AAA: 7:1 (texto normal) &bull; AA: 4.5:1 (texto normal) &bull; AA Large: 3:1 (texto 18px+ o 14px bold)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}