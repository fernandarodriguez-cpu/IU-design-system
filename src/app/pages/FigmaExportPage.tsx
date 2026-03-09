/**
 * FigmaExportPage — Genera y descarga JSON compatible con Figma Variables
 * para sincronizar tokens de diseño bidirecionalmente.
 */
import React, { useState } from 'react';
import {
  Download, Copy, Check, Eye, FileJson, Palette,
  Type, Maximize, Square, ArrowRight, Info, ExternalLink,
} from 'lucide-react';
import { KButton, KText, KBadge } from '../components/design-system/atoms';
import { KCardSection, KTabs } from '../components/design-system/organisms';
import { khorTokens } from '../theme/khor-theme';
import { kToast } from '../components/design-system/organisms';

const t = khorTokens;

/* ─── Figma Variables JSON Generator ────────── */
function generateFigmaVariablesJSON() {
  const collections = [
    {
      name: 'Khor/Brand Colors',
      modes: [{ name: 'Default', variables: [
        { name: 'primary', type: 'COLOR', value: hexToRgba(t.colors.brand.primary) },
        { name: 'primary-hover', type: 'COLOR', value: hexToRgba(t.colors.brand.primaryHover) },
        { name: 'primary-active', type: 'COLOR', value: hexToRgba(t.colors.brand.primaryActive) },
        { name: 'navy', type: 'COLOR', value: hexToRgba(t.colors.brand.navy) },
        { name: 'navy-hover', type: 'COLOR', value: hexToRgba(t.colors.brand.navyHover) },
        { name: 'navy-active', type: 'COLOR', value: hexToRgba(t.colors.brand.navyActive) },
        { name: 'accent', type: 'COLOR', value: hexToRgba(t.colors.brand.accent) },
        { name: 'accent-hover', type: 'COLOR', value: hexToRgba(t.colors.brand.accentHover) },
        { name: 'accent-active', type: 'COLOR', value: hexToRgba(t.colors.brand.accentActive) },
      ]}],
    },
    {
      name: 'Khor/Neutral',
      modes: [{ name: 'Default', variables: Object.entries(t.colors.neutral).map(([key, hex]) => ({
        name: `neutral-${key}`,
        type: 'COLOR' as const,
        value: hexToRgba(hex),
      }))}],
    },
    {
      name: 'Khor/Feedback',
      modes: [{ name: 'Default', variables: [
        { name: 'success', type: 'COLOR', value: hexToRgba(t.colors.feedback.success) },
        { name: 'success-light', type: 'COLOR', value: hexToRgba(t.colors.feedback.successLight) },
        { name: 'error', type: 'COLOR', value: hexToRgba(t.colors.feedback.error) },
        { name: 'error-light', type: 'COLOR', value: hexToRgba(t.colors.feedback.errorLight) },
        { name: 'warning', type: 'COLOR', value: hexToRgba(t.colors.feedback.warning) },
        { name: 'warning-light', type: 'COLOR', value: hexToRgba(t.colors.feedback.warningLight) },
        { name: 'info', type: 'COLOR', value: hexToRgba(t.colors.feedback.info) },
        { name: 'info-light', type: 'COLOR', value: hexToRgba(t.colors.feedback.infoLight) },
      ]}],
    },
    {
      name: 'Khor/Spacing',
      modes: [{ name: 'Default', variables: Object.entries(t.spacing).map(([key, val]) => ({
        name: `spacing-${key}`,
        type: 'FLOAT' as const,
        value: val,
      }))}],
    },
    {
      name: 'Khor/Radius',
      modes: [{ name: 'Default', variables: Object.entries(t.radius).map(([key, val]) => ({
        name: `radius-${key}`,
        type: 'FLOAT' as const,
        value: val,
      }))}],
    },
    {
      name: 'Khor/Typography',
      modes: [{ name: 'Default', variables: [
        { name: 'font-primary', type: 'STRING', value: 'Raleway' },
        { name: 'font-secondary', type: 'STRING', value: 'Plus Jakarta Sans' },
        { name: 'h1-size', type: 'FLOAT', value: t.typography.h1.size },
        { name: 'h1-weight', type: 'FLOAT', value: t.typography.h1.weight },
        { name: 'h1-line-height', type: 'FLOAT', value: t.typography.h1.lineHeight },
        { name: 'h2-size', type: 'FLOAT', value: t.typography.h2.size },
        { name: 'h2-weight', type: 'FLOAT', value: t.typography.h2.weight },
        { name: 'h3-size', type: 'FLOAT', value: t.typography.h3.size },
        { name: 'h3-weight', type: 'FLOAT', value: t.typography.h3.weight },
        { name: 'body-lg-size', type: 'FLOAT', value: t.typography.bodyLg.size },
        { name: 'body-md-size', type: 'FLOAT', value: t.typography.bodyMd.size },
        { name: 'small-size', type: 'FLOAT', value: t.typography.small.size },
      ]}],
    },
  ];

  return {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    generator: 'Khor Design System',
    figmaVariables: {
      collections,
    },
  };
}

/* ─── Figma Styles JSON Generator ───────────── */
function generateFigmaStylesJSON() {
  return {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    generator: 'Khor Design System',
    styles: {
      colors: {
        'Brand/Primary': t.colors.brand.primary,
        'Brand/Primary Hover': t.colors.brand.primaryHover,
        'Brand/Primary Active': t.colors.brand.primaryActive,
        'Brand/Navy': t.colors.brand.navy,
        'Brand/Navy Hover': t.colors.brand.navyHover,
        'Brand/Navy Active': t.colors.brand.navyActive,
        'Brand/Accent': t.colors.brand.accent,
        'Brand/Accent Hover': t.colors.brand.accentHover,
        'Brand/Accent Active': t.colors.brand.accentActive,
        ...Object.fromEntries(Object.entries(t.colors.neutral).map(([k, v]) => [`Neutral/${k}`, v])),
        'Feedback/Success': t.colors.feedback.success,
        'Feedback/Success Light': t.colors.feedback.successLight,
        'Feedback/Error': t.colors.feedback.error,
        'Feedback/Error Light': t.colors.feedback.errorLight,
        'Feedback/Warning': t.colors.feedback.warning,
        'Feedback/Warning Light': t.colors.feedback.warningLight,
        'Feedback/Info': t.colors.feedback.info,
        'Feedback/Info Light': t.colors.feedback.infoLight,
      },
      typography: {
        'Heading/H1': { fontFamily: 'Raleway', fontSize: t.typography.h1.size, fontWeight: t.typography.h1.weight, lineHeight: t.typography.h1.lineHeight },
        'Heading/H2': { fontFamily: 'Raleway', fontSize: t.typography.h2.size, fontWeight: t.typography.h2.weight, lineHeight: t.typography.h2.lineHeight },
        'Heading/H3': { fontFamily: 'Raleway', fontSize: t.typography.h3.size, fontWeight: t.typography.h3.weight, lineHeight: t.typography.h3.lineHeight },
        'Body/Large': { fontFamily: 'Plus Jakarta Sans', fontSize: t.typography.bodyLg.size, fontWeight: t.typography.bodyLg.weight, lineHeight: t.typography.bodyLg.lineHeight },
        'Body/Medium': { fontFamily: 'Plus Jakarta Sans', fontSize: t.typography.bodyMd.size, fontWeight: t.typography.bodyMd.weight, lineHeight: t.typography.bodyMd.lineHeight },
        'Body/Small': { fontFamily: 'Plus Jakarta Sans', fontSize: t.typography.small.size, fontWeight: t.typography.small.weight, lineHeight: t.typography.small.lineHeight },
      },
      effects: {
        'Shadow/SM': t.shadows.sm,
        'Shadow/MD': t.shadows.md,
        'Shadow/LG': t.shadows.lg,
      },
    },
  };
}

/* ─── Design Tokens JSON (Style Dictionary) ─── */
function generateStyleDictionaryJSON() {
  return {
    $schema: 'https://design-tokens.github.io/community-group/format/',
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    generator: 'Khor Design System',
    color: {
      brand: {
        primary: { $value: t.colors.brand.primary, $type: 'color', $description: 'CTA principal, botones primarios' },
        'primary-hover': { $value: t.colors.brand.primaryHover, $type: 'color' },
        'primary-active': { $value: t.colors.brand.primaryActive, $type: 'color' },
        navy: { $value: t.colors.brand.navy, $type: 'color', $description: 'Sidebar, títulos, navegación' },
        accent: { $value: t.colors.brand.accent, $type: 'color', $description: 'Warning, destacados' },
      },
      neutral: Object.fromEntries(
        Object.entries(t.colors.neutral).map(([k, v]) => [k, { $value: v, $type: 'color' }])
      ),
      feedback: {
        success: { $value: t.colors.feedback.success, $type: 'color' },
        'success-light': { $value: t.colors.feedback.successLight, $type: 'color' },
        error: { $value: t.colors.feedback.error, $type: 'color' },
        'error-light': { $value: t.colors.feedback.errorLight, $type: 'color' },
        warning: { $value: t.colors.feedback.warning, $type: 'color' },
        'warning-light': { $value: t.colors.feedback.warningLight, $type: 'color' },
        info: { $value: t.colors.feedback.info, $type: 'color' },
        'info-light': { $value: t.colors.feedback.infoLight, $type: 'color' },
      },
    },
    spacing: Object.fromEntries(
      Object.entries(t.spacing).map(([k, v]) => [k, { $value: `${v}px`, $type: 'dimension' }])
    ),
    borderRadius: Object.fromEntries(
      Object.entries(t.radius).map(([k, v]) => [k, { $value: `${v}px`, $type: 'dimension' }])
    ),
    shadow: {
      sm: { $value: t.shadows.sm, $type: 'shadow' },
      md: { $value: t.shadows.md, $type: 'shadow' },
      lg: { $value: t.shadows.lg, $type: 'shadow' },
    },
  };
}

/* ─── Helpers ───────────────────────────────── */
function hexToRgba(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r: Math.round(r * 1000) / 1000, g: Math.round(g * 1000) / 1000, b: Math.round(b * 1000) / 1000, a: 1 };
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