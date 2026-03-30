/**
 * FigmaExportPage — Genera y descarga JSON compatible con Figma Variables
 * para sincronizar tokens de diseño bidirecionalmente.
 */
import React, { useState } from 'react';
import {
  Download, Copy, Check, Eye, FileJson, Palette,
  Type, Maximize, Square, ArrowRight, Info, ExternalLink,
} from 'lucide-react';
import { KButton, KText, KBadge } from '../components/design-system/atoms/index';
import { KCardSection, KTabs } from '../components/design-system/organisms/index';
import { khorTokens } from '../theme/khor-theme';
import { kToast } from '../components/design-system/organisms/index';

const t = khorTokens;

/* ─── Figma Variables JSON Generator (W3C DTCG Standard) ─────── */
function generateFigmaVariablesJSON() {
  return {
    Primitive: {
      Color: {
        Brand: {
          Primary: {
            Base: { $value: resolveHex(t.colors.brand.primary), $type: 'color' },
            Hover: { $value: resolveHex(t.colors.brand.primaryHover), $type: 'color' },
            Active: { $value: resolveHex(t.colors.brand.primaryActive), $type: 'color' },
          },
          Navy: {
            Base: { $value: resolveHex(t.colors.brand.navy), $type: 'color' },
            Hover: { $value: resolveHex(t.colors.brand.navyHover), $type: 'color' },
            Active: { $value: resolveHex(t.colors.brand.navyActive), $type: 'color' },
          },
          Accent: {
            Base: { $value: resolveHex(t.colors.brand.accent), $type: 'color' },
            Hover: { $value: resolveHex(t.colors.brand.accentHover), $type: 'color' },
            Active: { $value: resolveHex(t.colors.brand.accentActive), $type: 'color' },
          }
        },
        Neutral: Object.fromEntries(Object.entries(t.colors.neutral).map(([k, v]) => [
          k, 
          { $value: resolveHex(v), $type: 'color' }
        ])),
        Feedback: {
          Success: {
            Base: { $value: resolveHex(t.colors.feedback.success), $type: 'color' },
            Light: { $value: resolveHex(t.colors.feedback.successLight), $type: 'color' },
          },
          Error: {
            Base: { $value: resolveHex(t.colors.feedback.error), $type: 'color' },
            Light: { $value: resolveHex(t.colors.feedback.errorLight), $type: 'color' },
          },
          Warning: {
            Base: { $value: resolveHex(t.colors.feedback.warning), $type: 'color' },
            Light: { $value: resolveHex(t.colors.feedback.warningLight), $type: 'color' },
          },
          Info: {
            Base: { $value: resolveHex(t.colors.feedback.info), $type: 'color' },
            Light: { $value: resolveHex(t.colors.feedback.infoLight), $type: 'color' },
          },
        }
      }
    },
    Semantic: {
      Action: {
        Primary: {
          Default: { $value: resolveHex(t.semantic.action.primary.default), $type: 'color' },
          Hover: { $value: resolveHex(t.semantic.action.primary.hover), $type: 'color' },
          Active: { $value: resolveHex(t.semantic.action.primary.active), $type: 'color' },
        },
        Secondary: {
          Default: { $value: resolveHex(t.semantic.action.secondary.default), $type: 'color' },
          Hover: { $value: resolveHex(t.semantic.action.secondary.hover), $type: 'color' },
          Active: { $value: resolveHex(t.semantic.action.secondary.active), $type: 'color' },
        },
        Danger: {
          Default: { $value: resolveHex(t.semantic.action.danger.default), $type: 'color' },
          Hover: { $value: resolveHex(t.semantic.action.danger.hover), $type: 'color' },
          Active: { $value: resolveHex(t.semantic.action.danger.active), $type: 'color' },
        },
        Ghost: {
          Hover: { $value: resolveHex(t.semantic.action.ghost.hover), $type: 'color' },
        },
        Disabled: {
          Bg: { $value: resolveHex(t.semantic.action.disabled.bg), $type: 'color' },
          Text: { $value: resolveHex(t.semantic.action.disabled.text), $type: 'color' },
        }
      },
      Surface: {
        Page: { $value: resolveHex(t.semantic.surface.page), $type: 'color' },
        Card: { $value: resolveHex(t.semantic.surface.card), $type: 'color' },
        Raised: { $value: resolveHex(t.semantic.surface.raised), $type: 'color' },
        Overlay: { $value: resolveHex(t.semantic.surface.overlay), $type: 'color' },
      },
      Text: {
        Primary: { $value: resolveHex(t.semantic.text.primary), $type: 'color' },
        Secondary: { $value: resolveHex(t.semantic.text.secondary), $type: 'color' },
        Muted: { $value: resolveHex(t.semantic.text.muted), $type: 'color' },
        Disabled: { $value: resolveHex(t.semantic.text.disabled), $type: 'color' },
        OnAction: { $value: resolveHex(t.semantic.text.onAction), $type: 'color' },
        Link: { $value: resolveHex(t.semantic.text.link), $type: 'color' },
      },
      Border: {
        Default: { $value: resolveHex(t.semantic.border.default), $type: 'color' },
        Hover: { $value: resolveHex(t.semantic.border.hover), $type: 'color' },
        Focus: { $value: resolveHex(t.semantic.border.focus), $type: 'color' },
        Error: { $value: resolveHex(t.semantic.border.error), $type: 'color' },
        Disabled: { $value: resolveHex(t.semantic.border.disabled), $type: 'color' },
        Strong: { $value: resolveHex(t.semantic.border.strong), $type: 'color' },
      },
      Focus: {
        Ring: { $value: resolveHex(t.semantic.focus.ring), $type: 'color' }
      }
    },
    Token: {
      Size: {
        Spacing: Object.fromEntries(Object.entries(t.spacing).map(([k, v]) => [
          k.toUpperCase(), 
          { $value: `${resolveDimension(v)}px`, $type: 'dimension' }
        ])),
        Radius: Object.fromEntries(Object.entries(t.radius).map(([k, v]) => [
          k.toUpperCase(), 
          { $value: `${resolveDimension(v, 6)}px`, $type: 'dimension' }
        ])),
        BorderWidth: {
          Ring: { $value: `${resolveDimension(t.semantic.focus.ringWidth, 2)}px`, $type: 'dimension' },
          RingOffset: { $value: `${resolveDimension(t.semantic.focus.ringOffset, 2)}px`, $type: 'dimension' }
        }
      },
      Typography: {
        Family: {
          Primary: { $value: 'Raleway', $type: 'string' },
          Secondary: { $value: 'Plus Jakarta Sans', $type: 'string' },
        },
        H1: {
          Size: { $value: `${t.typography.h1.size}px`, $type: 'dimension' },
          Weight: { $value: t.typography.h1.weight, $type: 'fontWeight' },
          LineHeight: { $value: Math.round(t.typography.h1.size * t.typography.h1.lineHeight * 10) / 10, $type: 'number' },
        },
        H2: {
          Size: { $value: `${t.typography.h2.size}px`, $type: 'dimension' },
          Weight: { $value: t.typography.h2.weight, $type: 'fontWeight' },
          LineHeight: { $value: Math.round(t.typography.h2.size * t.typography.h2.lineHeight * 10) / 10, $type: 'number' },
        },
        H3: {
          Size: { $value: `${t.typography.h3.size}px`, $type: 'dimension' },
          Weight: { $value: t.typography.h3.weight, $type: 'fontWeight' },
          LineHeight: { $value: Math.round(t.typography.h3.size * t.typography.h3.lineHeight * 10) / 10, $type: 'number' },
        },
        BodyLg: {
          Size: { $value: `${t.typography.bodyLg.size}px`, $type: 'dimension' },
          Weight: { $value: t.typography.bodyLg.weight, $type: 'fontWeight' },
          LineHeight: { $value: Math.round(t.typography.bodyLg.size * t.typography.bodyLg.lineHeight * 10) / 10, $type: 'number' },
        },
        BodyMd: {
          Size: { $value: `${t.typography.bodyMd.size}px`, $type: 'dimension' },
          Weight: { $value: t.typography.bodyMd.weight, $type: 'fontWeight' },
          LineHeight: { $value: Math.round(t.typography.bodyMd.size * t.typography.bodyMd.lineHeight * 10) / 10, $type: 'number' },
        },
        Small: {
          Size: { $value: `${t.typography.small.size}px`, $type: 'dimension' },
          Weight: { $value: t.typography.small.weight, $type: 'fontWeight' },
          LineHeight: { $value: Math.round(t.typography.small.size * t.typography.small.lineHeight * 10) / 10, $type: 'number' },
        }
      },
      Layout: {
        SidebarWidth: { $value: `${t.layout.sidebarWidth}px`, $type: 'dimension' },
        HeaderHeight: { $value: `${t.layout.headerHeight}px`, $type: 'dimension' },
      },
      Icon: {
        SM: { $value: `${t.icon.sm}px`, $type: 'dimension' },
        MD: { $value: `${t.icon.md}px`, $type: 'dimension' },
        LG: { $value: `${t.icon.lg}px`, $type: 'dimension' },
        StrokeWidth: { $value: `${t.icon.strokeWidth}px`, $type: 'dimension' },
      }
    }
  };
}

/* ─── Figma Styles JSON Generator (Pro Scheme: Paint/Text/Effect) ── */
function generateFigmaStylesJSON() {
  const paintStyles: any[] = [];

  const addPaint = (name: string, hexCode: string) => {
    paintStyles.push({
      name,
      paints: [{ type: "solid", hex: resolveHex(hexCode), opacity: 1 }]
    });
  };

  addPaint('Color/Brand/Primary', t.colors.brand.primary);
  addPaint('Color/Brand/Primary Hover', t.colors.brand.primaryHover);
  addPaint('Color/Brand/Primary Active', t.colors.brand.primaryActive);
  addPaint('Color/Brand/Navy', t.colors.brand.navy);
  addPaint('Color/Brand/Navy Hover', t.colors.brand.navyHover);
  addPaint('Color/Brand/Navy Active', t.colors.brand.navyActive);
  addPaint('Color/Brand/Accent', t.colors.brand.accent);
  addPaint('Color/Brand/Accent Hover', t.colors.brand.accentHover);
  addPaint('Color/Brand/Accent Active', t.colors.brand.accentActive);

  Object.entries(t.colors.neutral).forEach(([k, v]) => {
    addPaint(`Color/Neutral/${k.charAt(0).toUpperCase() + k.slice(1)}`, v);
  });

  addPaint('Color/Feedback/Success', t.colors.feedback.success);
  addPaint('Color/Feedback/Success Light', t.colors.feedback.successLight);
  addPaint('Color/Feedback/Error', t.colors.feedback.error);
  addPaint('Color/Feedback/Error Light', t.colors.feedback.errorLight);
  addPaint('Color/Feedback/Warning', t.colors.feedback.warning);
  addPaint('Color/Feedback/Warning Light', t.colors.feedback.warningLight);
  addPaint('Color/Feedback/Info', t.colors.feedback.info);
  addPaint('Color/Feedback/Info Light', t.colors.feedback.infoLight);

  const textStyles = [
    {
      name: "Typography/Heading/H1",
      font: { family: "Raleway", style: "Bold" },
      fontSize: t.typography.h1.size,
      lineHeight: { unit: "PIXELS", value: Math.round(t.typography.h1.size * t.typography.h1.lineHeight * 10) / 10 },
      letterSpacing: { unit: "PERCENT", value: 0 },
      paragraphSpacing: 0, textCase: "ORIGINAL", textDecoration: "NONE"
    },
    {
      name: "Typography/Heading/H2",
      font: { family: "Raleway", style: "Bold" },
      fontSize: t.typography.h2.size,
      lineHeight: { unit: "PIXELS", value: Math.round(t.typography.h2.size * t.typography.h2.lineHeight * 10) / 10 },
      letterSpacing: { unit: "PERCENT", value: 0 },
      paragraphSpacing: 0, textCase: "ORIGINAL", textDecoration: "NONE"
    },
    {
      name: "Typography/Heading/H3",
      font: { family: "Raleway", style: "SemiBold" },
      fontSize: t.typography.h3.size,
      lineHeight: { unit: "PIXELS", value: Math.round(t.typography.h3.size * t.typography.h3.lineHeight * 10) / 10 },
      letterSpacing: { unit: "PERCENT", value: 0 },
      paragraphSpacing: 0, textCase: "ORIGINAL", textDecoration: "NONE"
    },
    {
      name: "Typography/Body/Large",
      font: { family: "Plus Jakarta Sans", style: "Regular" },
      fontSize: t.typography.bodyLg.size,
      lineHeight: { unit: "PIXELS", value: Math.round(t.typography.bodyLg.size * t.typography.bodyLg.lineHeight * 10) / 10 },
      letterSpacing: { unit: "PERCENT", value: 0 },
      paragraphSpacing: 0, textCase: "ORIGINAL", textDecoration: "NONE"
    },
    {
      name: "Typography/Body/Medium",
      font: { family: "Plus Jakarta Sans", style: "Regular" },
      fontSize: t.typography.bodyMd.size,
      lineHeight: { unit: "PIXELS", value: Math.round(t.typography.bodyMd.size * t.typography.bodyMd.lineHeight * 10) / 10 },
      letterSpacing: { unit: "PERCENT", value: 0 },
      paragraphSpacing: 0, textCase: "ORIGINAL", textDecoration: "NONE"
    },
    {
      name: "Typography/Body/Small",
      font: { family: "Plus Jakarta Sans", style: "Medium" },
      fontSize: t.typography.small.size,
      lineHeight: { unit: "PIXELS", value: Math.round(t.typography.small.size * t.typography.small.lineHeight * 10) / 10 },
      letterSpacing: { unit: "PERCENT", value: 0 },
      paragraphSpacing: 0, textCase: "ORIGINAL", textDecoration: "NONE"
    }
  ];

  const effectStyles = [
    {
      name: "Effects/Shadow/SM",
      effects: [{ type: "DROP_SHADOW", color: { hex: "#000000", opacity: 0.05 }, offset: { x: 0, y: 1 }, radius: 2, spread: 0, visible: true, blendMode: "NORMAL" }]
    },
    {
      name: "Effects/Shadow/MD",
      effects: [{ type: "DROP_SHADOW", color: { hex: "#000000", opacity: 0.1 }, offset: { x: 0, y: 4 }, radius: 6, spread: -1, visible: true, blendMode: "NORMAL" }]
    },
    {
      name: "Effects/Shadow/LG",
      effects: [{ type: "DROP_SHADOW", color: { hex: "#000000", opacity: 0.1 }, offset: { x: 0, y: 10 }, radius: 15, spread: -3, visible: true, blendMode: "NORMAL" }]
    }
  ];

  return { paintStyles, textStyles, effectStyles };
}

/* ─── Style Dictionary Generator (DTCG Alias) ───────────────── */
function generateStyleDictionaryJSON() {
  // En v3.1.9 unificamos Variables y Style Dictionary bajo DTCG
  return generateFigmaVariablesJSON();
}

/* ─── Helpers ───────────────────────────────── */

/**
 * Mapping estático necesario porque los tokens consumen variables CSS 
 * que no pueden ser resueltas directamente por el JS del cliente 
 * al momento de generar el JSON (Figma requiere valores reales).
 */
const TOKEN_RESOLVER: Record<string, string> = {
  // Brand
  'var(--khor-primary)': '#E04D36',
  'var(--khor-primary-hover)': '#e8644f',
  'var(--khor-primary-active)': '#c9442f',
  'var(--khor-navy)': '#051758',
  'var(--khor-navy-hover)': '#0a2270',
  'var(--khor-navy-active)': '#030f40',
  'var(--khor-accent)': '#FF9500',
  'var(--khor-accent-hover)': '#ffaa33',
  'var(--khor-accent-active)': '#e68600',
  
  // Neutral
  'var(--khor-neutral-50)': '#FFFFFF',
  'var(--khor-neutral-100)': '#EDF0F1',
  'var(--khor-neutral-200)': '#D5DBE0',
  'var(--khor-neutral-300)': '#A0AEC0',
  'var(--khor-neutral-400)': '#718096',
  'var(--khor-neutral-500)': '#4A5568',
  'var(--khor-neutral-600)': '#2D3748',
  'var(--khor-neutral-700)': '#1A202C',
  'var(--khor-neutral-800)': '#11141C',
  'var(--khor-neutral-900)': '#000000',

  // Feedback
  'var(--khor-success)': '#2E7D32',
  'var(--khor-success-light)': '#E8F5E9',
  'var(--khor-error)': '#D32F2F',
  'var(--khor-error-light)': '#FFEBEE',
  'var(--khor-warning)': '#FF9500',
  'var(--khor-warning-light)': '#FFF3E0',
  'var(--khor-info)': '#051758',
  'var(--khor-info-light)': '#E3F2FD',

  // Semantic
  'var(--khor-action-primary-default)': '#E04D36',
  'var(--khor-action-primary-hover)': '#e8644f',
  'var(--khor-action-primary-active)': '#c9442f',
  'var(--khor-action-secondary-default)': '#EDF0F1',
  'var(--khor-action-secondary-hover)': '#D5DBE0',
  'var(--khor-action-secondary-active)': '#A0AEC0',
  'var(--khor-action-danger-default)': '#D32F2F',
  'var(--khor-action-danger-hover)': '#c62828',
  'var(--khor-action-danger-active)': '#b71c1c',
  'var(--khor-action-ghost-hover)': '#EDF0F1',
  'var(--khor-action-disabled-bg)': '#D5DBE0',
  'var(--khor-action-disabled-text)': '#718096',

  'var(--khor-surface-page)': '#EDF0F1',
  'var(--khor-surface-card)': '#FFFFFF',
  'var(--khor-surface-raised)': '#FFFFFF',
  'var(--khor-surface-overlay)': '#000000',

  'var(--khor-text-primary)': '#1A202C',
  'var(--khor-text-secondary)': '#4A5568',
  'var(--khor-text-muted)': '#718096',
  'var(--khor-text-disabled)': '#A0AEC0',
  'var(--khor-text-on-action)': '#FFFFFF',
  'var(--khor-text-link)': '#E04D36',

  'var(--khor-border-default)': '#D5DBE0',
  'var(--khor-border-hover)': '#A0AEC0',
  'var(--khor-border-focus)': '#E04D36',
  'var(--khor-border-error)': '#D32F2F',
  'var(--khor-border-disabled)': '#D5DBE0',
  'var(--khor-border-strong)': '#4A5568',

  'var(--khor-focus-ring)': '#ffaa33',
};

function resolveDimension(value: any, fallback = 0): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    // try to match 'var(... , Xpx)' or 'var(..., X)'
    const match = value.match(/,\s*(\d+(?:\.\d+)?)(px|rem)?\s*\)/);
    if (match) return parseFloat(match[1]);
    const num = parseFloat(value);
    if (!isNaN(num)) return num;
  }
  return fallback;
}

function resolveHex(value: any): string {
  if (typeof value !== 'string') return '#000000';
  if (value.startsWith('#')) return value;
  if (value.startsWith('var(')) {
    // Intentar resolver desde el mapeador
    return TOKEN_RESOLVER[value] || '#000000';
  }
  return '#000000';
}

function hexToRgba(value: any) {
  const hex = resolveHex(value);
  
  // Limpiar el hex si viene con alpha o formato corto
  const cleanHex = hex.replace('#', '');
  const rHex = cleanHex.length === 3 ? cleanHex[0] + cleanHex[0] : cleanHex.slice(0, 2);
  const gHex = cleanHex.length === 3 ? cleanHex[1] + cleanHex[1] : cleanHex.slice(2, 4);
  const bHex = cleanHex.length === 3 ? cleanHex[2] + cleanHex[2] : cleanHex.slice(4, 6);

  const r = (parseInt(rHex, 16) || 0) / 255;
  const g = (parseInt(gHex, 16) || 0) / 255;
  const b = (parseInt(bHex, 16) || 0) / 255;
  
  return { 
    r: Math.round(r * 1000) / 1000, 
    g: Math.round(g * 1000) / 1000, 
    b: Math.round(b * 1000) / 1000, 
    a: 1 
  };
}

function downloadJSON(data: any, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  kToast({ type: 'success', title: 'Descarga iniciada', description: `${filename} se está descargando.` });
}

function CodePreview({ data, filename }: { data: any; filename: string }) {
  const [copied, setCopied] = useState(false);
  const json = JSON.stringify(data, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    kToast({ type: 'success', title: 'Copiado', description: 'JSON copiado al portapapeles.' });
  };

  return (
    <div style={{ borderRadius: t.radius.lg, overflow: 'hidden', border: `1px solid ${t.colors.neutral[200]}` }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 16px', backgroundColor: '#1e1e2e', color: '#cdd6f4', fontSize: 12,
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <FileJson size={14} />
          {filename}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: '#cdd6f4', cursor: 'pointer', fontSize: 12, padding: '4px 8px', borderRadius: 4 }}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copiado' : 'Copiar'}
          </button>
          <button onClick={() => downloadJSON(data, filename)} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: '#cdd6f4', cursor: 'pointer', fontSize: 12, padding: '4px 8px', borderRadius: 4 }}>
            <Download size={14} /> Descargar
          </button>
        </div>
      </div>
      <pre style={{
        margin: 0, padding: 20, backgroundColor: '#1e1e2e', color: '#cdd6f4',
        fontSize: 12, lineHeight: 1.6, overflowX: 'auto', maxHeight: 400,
      }}>
        <code>{json}</code>
      </pre>
    </div>
  );
}

/* ─── Page Component ────────────────────────── */
export function FigmaExportPage() {
  const figmaVars = generateFigmaVariablesJSON();
  const figmaStyles = generateFigmaStylesJSON();
  const styleDictionary = generateStyleDictionaryJSON();

  const exportFormats = [
    {
      key: 'figma-vars',
      label: 'Figma Variables',
      icon: <Palette size={16} />,
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            padding: 16, borderRadius: t.radius.md,
            backgroundColor: t.colors.feedback.infoLight,
            border: `1px solid ${t.colors.brand.navy}15`,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <Info size={16} style={{ color: t.colors.brand.navy, flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ margin: 0, fontSize: 13, color: t.colors.neutral[500], lineHeight: 1.5 }}>
                  <strong>Figma Variables</strong> son la forma nativa de Figma para gestionar tokens de diseño.
                  Este JSON define 6 colecciones con todos los tokens de Khor organizados en Brand Colors,
                  Neutral, Feedback, Spacing, Radius y Typography. Impórtalo con el plugin
                  <strong> Variables Import</strong> o <strong>Tokens Studio</strong>.
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <KButton variant="primary" icon={<Download size={16} />} onClick={() => downloadJSON(figmaVars, 'khor-figma-variables.json')}>
              Descargar Figma Variables
            </KButton>
          </div>

          <CodePreview data={figmaVars} filename="khor-figma-variables.json" />
        </div>
      ),
    },
    {
      key: 'figma-styles',
      label: 'Figma Styles',
      icon: <Square size={16} />,
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            padding: 16, borderRadius: t.radius.md,
            backgroundColor: t.colors.feedback.warningLight,
            border: `1px solid ${t.colors.brand.accent}20`,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <Info size={16} style={{ color: t.colors.brand.accent, flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ margin: 0, fontSize: 13, color: t.colors.neutral[500], lineHeight: 1.5 }}>
                  <strong>Figma Styles</strong> es el formato legacy para colores, tipografía y efectos.
                  Útil para equipos que aún no han migrado a Variables. Compatible con plugins como
                  <strong> Figma Tokens</strong> y <strong>Design Token Exporter</strong>.
                </p>
              </div>
            </div>
          </div>

          <KButton variant="primary" icon={<Download size={16} />} onClick={() => downloadJSON(figmaStyles, 'khor-figma-styles.json')}>
            Descargar Figma Styles
          </KButton>

          <CodePreview data={figmaStyles} filename="khor-figma-styles.json" />
        </div>
      ),
    },
    {
      key: 'style-dictionary',
      label: 'Style Dictionary',
      icon: <Type size={16} />,
      children: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            padding: 16, borderRadius: t.radius.md,
            backgroundColor: t.colors.feedback.successLight,
            border: `1px solid ${t.colors.feedback.success}20`,
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <Info size={16} style={{ color: t.colors.feedback.success, flexShrink: 0, marginTop: 2 }} />
              <div>
                <p style={{ margin: 0, fontSize: 13, color: t.colors.neutral[500], lineHeight: 1.5 }}>
                  <strong>W3C Design Tokens Format</strong> (DTCG) — el estándar abierto para tokens de diseño.
                  Compatible con <strong>Style Dictionary</strong>, <strong>Tokens Studio</strong>,
                  <strong> Figma</strong> y otras herramientas. Usa la notación <code>$value</code> / <code>$type</code>.
                </p>
              </div>
            </div>
          </div>

          <KButton variant="primary" icon={<Download size={16} />} onClick={() => downloadJSON(styleDictionary, 'khor-design-tokens.json')}>
            Descargar Design Tokens
          </KButton>

          <CodePreview data={styleDictionary} filename="khor-design-tokens.json" />
        </div>
      ),
    },
  ];

  return (
    <div style={{ fontFamily: t.typography.fontPrimary }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: t.colors.brand.primary, textTransform: 'uppercase', letterSpacing: 1 }}>
            Integración
          </span>
        </div>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: t.colors.brand.navy }}>
          Exportar a Figma
        </h2>
        <p style={{ margin: '8px 0 0', fontSize: 16, color: t.colors.neutral[500], lineHeight: 1.5 }}>
          Exporta los tokens del Khor Design System en formatos compatibles con Figma y herramientas de design tokens.
          Mantén sincronizados diseño y código con una fuente única de verdad.
        </p>
      </div>

      {/* Format Cards Overview */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 16, marginBottom: 32,
      }}>
        {[
          { title: 'Figma Variables', desc: '6 colecciones, 45+ variables. Para Figma moderno.', icon: <Palette size={24} />, badge: 'Recomendado', badgeColor: t.colors.feedback.success },
          { title: 'Figma Styles', desc: 'Colores, tipografía y efectos. Formato legacy.', icon: <Square size={24} />, badge: 'Legacy', badgeColor: t.colors.brand.accent },
          { title: 'Style Dictionary', desc: 'W3C DTCG format. Multi-plataforma.', icon: <Type size={24} />, badge: 'Estándar', badgeColor: t.colors.feedback.info },
        ].map((card) => (
          <div key={card.title} style={{
            backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg, padding: 24,
            boxShadow: t.shadows.sm, border: `1px solid ${t.colors.neutral[200]}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: t.radius.md,
                backgroundColor: `${t.colors.brand.primary}08`, color: t.colors.brand.primary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{card.icon}</div>
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
                backgroundColor: `${card.badgeColor}15`, color: card.badgeColor,
              }}>{card.badge}</span>
            </div>
            <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 600, color: t.colors.brand.navy }}>{card.title}</h4>
            <p style={{ margin: 0, fontSize: 13, color: t.colors.neutral[400], lineHeight: 1.4 }}>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Tabs with content */}
      <KTabs items={exportFormats} />

      {/* Workflow guide */}
      <div style={{
        marginTop: 32, padding: 24, borderRadius: t.radius.lg,
        backgroundColor: t.colors.neutral[50], border: `1px solid ${t.colors.neutral[200]}`,
        boxShadow: t.shadows.sm,
      }}>
        <h3 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700, color: t.colors.brand.navy }}>
          Flujo de Sincronización
        </h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            { step: '1', label: 'Descarga JSON', sub: 'Elige el formato' },
            { step: '2', label: 'Importa en Figma', sub: 'Tokens Studio / Variables Import' },
            { step: '3', label: 'Aplica tokens', sub: 'A tus componentes Figma' },
            { step: '4', label: 'Sincroniza', sub: 'Actualiza cuando cambien tokens' },
          ].map((s, i) => (
            <div key={s.step} style={{ display: 'contents' }}>
              <div style={{
                flex: 1, minWidth: 160, padding: 16,
                borderRadius: t.radius.md, backgroundColor: t.colors.neutral[100],
                textAlign: 'center',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  backgroundColor: `${t.colors.brand.primary}10`,
                  color: t.colors.brand.primary,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 8px', fontSize: 13, fontWeight: 700,
                }}>{s.step}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: t.colors.brand.navy }}>{s.label}</div>
                <div style={{ fontSize: 11, color: t.colors.neutral[400], marginTop: 2 }}>{s.sub}</div>
              </div>
              {i < 3 && <ArrowRight size={16} style={{ color: t.colors.neutral[300], flexShrink: 0 }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}