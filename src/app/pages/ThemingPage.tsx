/**
 * ThemingPage — Panel de Theming en Vivo completo para Khor Design System.
 * Permite ajustar colores, tipografía, sombras, radii, spacing y ver preview en tiempo real.
 * Incluye presets de marca y exportación multi-formato.
 */
import React, { useState, useCallback, useMemo } from 'react';
import {
  Palette, RotateCcw, Download, Copy, Check, Sun, Moon,
  Type, Maximize, Square, Eye, Layers, Zap, Droplets,
  ChevronDown, ChevronRight, Sparkles,
} from 'lucide-react';
import { KButton, KInput, KBadge, KSwitch, KProgress, KAlert, KAvatar, KTag, KCheckbox } from '../components/design-system/atoms';
import { KStatCard, KFormField, KSearchInput } from '../components/design-system/molecules';
import { khorTokens } from '../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ─── Types ─── */
interface ThemeConfig {
  // Colors
  primary: string;
  secondary: string;    // internamente se mapea a --khor-navy
  accent: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  // Typography
  fontHeading: string;
  fontBody: string;
  fontMono: string;
  h1Size: number;
  h2Size: number;
  h3Size: number;
  bodySize: number;
  smallSize: number;
  baseLineHeight: number;
  // Shadows
  shadowSm: string;
  shadowMd: string;
  shadowLg: string;
  shadowColor: string;
  // Radius
  radiusSm: number;
  radiusMd: number;
  radiusLg: number;
  radiusXl: number;
  // Spacing
  spaceXs: number;
  spaceSm: number;
  spaceMd: number;
  spaceLg: number;
  spaceXl: number;
}

const defaultTheme: ThemeConfig = {
  primary: '#E04D36',
  secondary: '#051758',
  accent: '#FF9500',
  success: '#2E7D32',
  error: '#D32F2F',
  warning: '#E68600',
  info: '#1976D2',
  fontHeading: 'Raleway',
  fontBody: 'Plus Jakarta Sans',
  fontMono: 'JetBrains Mono',
  h1Size: 38,
  h2Size: 30,
  h3Size: 24,
  bodySize: 14,
  smallSize: 12,
  baseLineHeight: 1.5,
  shadowSm: '0 1px 3px 0',
  shadowMd: '0 4px 12px 0',
  shadowLg: '0 10px 30px -4px',
  shadowColor: '#00000018',
  radiusSm: 6,
  radiusMd: 8,
  radiusLg: 10,
  radiusXl: 14,
  spaceXs: 4,
  spaceSm: 8,
  spaceMd: 16,
  spaceLg: 24,
  spaceXl: 40,
};

/* ─── Presets ─── */
interface ThemePreset {
  name: string;
  description: string;
  accent_color: string;
  config: Partial<ThemeConfig>;
}

const presets: ThemePreset[] = [
  {
    name: 'Khor Default',
    description: 'Configuración oficial del Design System',
    accent_color: '#E04D36',
    config: { ...defaultTheme },
  },
  {
    name: 'Corporate Blue',
    description: 'Profesional y corporativo',
    accent_color: '#1565C0',
    config: {
      primary: '#1565C0', secondary: '#0D2137', accent: '#FF8F00',
      success: '#2E7D32', error: '#C62828', warning: '#EF6C00', info: '#0277BD',
      fontHeading: 'Inter', fontBody: 'Inter',
      radiusSm: 4, radiusMd: 6, radiusLg: 8, radiusXl: 12,
    },
  },
  {
    name: 'Startup Fresh',
    description: 'Moderno y energético',
    accent_color: '#7C3AED',
    config: {
      primary: '#7C3AED', secondary: '#1E1B4B', accent: '#06B6D4',
      success: '#059669', error: '#DC2626', warning: '#D97706', info: '#6366F1',
      fontHeading: 'Poppins', fontBody: 'DM Sans',
      radiusSm: 8, radiusMd: 12, radiusLg: 16, radiusXl: 24,
    },
  },
  {
    name: 'Dark Professional',
    description: 'Elegante y sobrio',
    accent_color: '#10B981',
    config: {
      primary: '#10B981', secondary: '#111827', accent: '#F59E0B',
      success: '#059669', error: '#EF4444', warning: '#D97706', info: '#3B82F6',
      fontHeading: 'Space Grotesk', fontBody: 'Inter',
      radiusSm: 4, radiusMd: 8, radiusLg: 12, radiusXl: 16,
    },
  },
  {
    name: 'Healthcare',
    description: 'Confiable y accesible',
    accent_color: '#0891B2',
    config: {
      primary: '#0891B2', secondary: '#164E63', accent: '#F97316',
      success: '#15803D', error: '#B91C1C', warning: '#CA8A04', info: '#0284C7',
      fontHeading: 'Nunito', fontBody: 'Nunito Sans',
      radiusSm: 6, radiusMd: 10, radiusLg: 14, radiusXl: 20,
    },
  },
  {
    name: 'Fintech',
    description: 'Precision y confianza',
    accent_color: '#0F766E',
    config: {
      primary: '#0F766E', secondary: '#0C1222', accent: '#CA8A04',
      success: '#16A34A', error: '#DC2626', warning: '#EA580C', info: '#2563EB',
      fontHeading: 'IBM Plex Sans', fontBody: 'IBM Plex Sans',
      fontMono: 'IBM Plex Mono',
      radiusSm: 4, radiusMd: 6, radiusLg: 8, radiusXl: 10,
      h1Size: 36, bodySize: 15,
    },
  },
];

/* ─── Font Options ─── */
const fontOptions = [
  'Raleway', 'Plus Jakarta Sans', 'Inter', 'Poppins', 'DM Sans',
  'Space Grotesk', 'Nunito', 'Nunito Sans', 'IBM Plex Sans',
  'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Source Sans Pro',
  'Work Sans', 'Manrope', 'Outfit', 'Figtree',
];

const monoFontOptions = [
  'JetBrains Mono', 'IBM Plex Mono', 'Fira Code', 'Source Code Pro',
  'Roboto Mono', 'SF Mono', 'Consolas',
];

/* ─── Helper Components ─── */
function ColorInput({ label, hint, value, onChange }: { label: string; hint?: string; value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <input
        type="color" value={value} onChange={(e) => onChange(e.target.value)}
        style={{ width: 32, height: 32, border: 'none', borderRadius: 6, cursor: 'pointer', padding: 0, background: 'none', flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--foreground)', display: 'flex', alignItems: 'center', gap: 4 }}>
          {label}
          {hint && <span style={{ fontSize: 10, color: 'var(--muted-foreground)', fontWeight: 400 }}>({hint})</span>}
        </div>
        <input
          value={value} onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%', border: `1px solid var(--border)`, borderRadius: 4, padding: '2px 6px',
            fontSize: 11, fontFamily: 'monospace', color: 'var(--foreground)', backgroundColor: 'var(--card)',
          }}
        />
      </div>
    </div>
  );
}

function SliderInput({ label, value, onChange, min, max, unit, step = 1 }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; unit: string; step?: number }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--foreground)' }}>{label}</span>
        <span style={{ fontSize: 11, color: 'var(--muted-foreground)', fontFamily: 'monospace' }}>{value}{unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: '#E04D36' }} />
    </div>
  );
}

function SelectInput({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--foreground)', marginBottom: 4 }}>{label}</div>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{
        width: '100%', padding: '6px 10px', borderRadius: 6, border: `1px solid var(--border)`,
        fontSize: 13, fontFamily: font, color: 'var(--foreground)', backgroundColor: 'var(--card)',
        cursor: 'pointer',
      }}>
        {options.map((o) => <option key={o} value={o} style={{ fontFamily: o }}>{o}</option>)}
      </select>
    </div>
  );
}

function SectionCard({ icon, title, children, defaultOpen = true }: { icon: React.ReactNode; title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderRadius: 10, backgroundColor: 'var(--card)', border: `1px solid var(--border)`, overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{
        display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '14px 16px',
        border: 'none', background: 'none', cursor: 'pointer', fontFamily: font, color: 'var(--foreground)',
      }}>
        <span style={{ color: 'var(--muted-foreground)' }}>{icon}</span>
        <span style={{ flex: 1, textAlign: 'left', fontSize: 13, fontWeight: 600 }}>{title}</span>
        {open ? <ChevronDown size={14} color="var(--muted-foreground)" /> : <ChevronRight size={14} color="var(--muted-foreground)" />}
      </button>
      {open && <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>}
    </div>
  );
}

/* ─── Shadow builder helper ─── */
function buildShadow(offset: string, color: string): string {
  return `${offset} ${color}`;
}

/* ─── Page Component ─── */
export function ThemingPage() {
  const [theme, setTheme] = useState<ThemeConfig>({ ...defaultTheme });
  const [copied, setCopied] = useState<string | null>(null);
  const [activePreview, setActivePreview] = useState<'components' | 'typography' | 'shadows'>('components');

  const update = useCallback(<K extends keyof ThemeConfig>(key: K, val: ThemeConfig[K]) => {
    setTheme((prev) => ({ ...prev, [key]: val }));
    const root = document.documentElement;
    const cssMap: Partial<Record<keyof ThemeConfig, string>> = {
      primary: '--khor-primary', secondary: '--khor-navy', accent: '--khor-accent',
      success: '--khor-success', error: '--khor-error', warning: '--khor-warning', info: '--khor-info',
      radiusSm: '--khor-radius-sm', radiusMd: '--khor-radius-md', radiusLg: '--khor-radius-lg', radiusXl: '--khor-radius-xl',
    };
    const cssVar = cssMap[key];
    if (cssVar) {
      root.style.setProperty(cssVar, typeof val === 'number' ? `${val}px` : String(val));
    }
    // Font updates
    if (key === 'fontHeading') root.style.setProperty('--font-primary', `'${val}', sans-serif`);
    if (key === 'fontBody') root.style.setProperty('--font-secondary', `'${val}', sans-serif`);
  }, []);

  const applyPreset = (preset: Partial<ThemeConfig>) => {
    const merged = { ...defaultTheme, ...preset };
    setTheme(merged);
    // Apply all to CSS
    Object.entries(merged).forEach(([k, v]) => update(k as keyof ThemeConfig, v as any));
  };

  const resetTheme = () => applyPreset(defaultTheme);

  /* ─── Generators ─── */
  const generateCSS = useCallback(() => `:root {
  /* ═══════════════════════════════════════════
     Khor Design System — Custom Theme
     Generated: ${new Date().toISOString()}
     ═══════════════════════════════════════════ */

  /* ── Colores de Marca ── */
  --khor-primary: ${theme.primary};
  --khor-primary-hover: ${adjustBrightness(theme.primary, 15)};
  --khor-primary-active: ${adjustBrightness(theme.primary, -15)};
  --khor-navy: ${theme.secondary};
  --khor-navy-hover: ${adjustBrightness(theme.secondary, 20)};
  --khor-navy-active: ${adjustBrightness(theme.secondary, -10)};
  --khor-accent: ${theme.accent};
  --khor-accent-hover: ${adjustBrightness(theme.accent, 15)};
  --khor-accent-active: ${adjustBrightness(theme.accent, -15)};

  /* ── Feedback ── */
  --khor-success: ${theme.success};
  --khor-success-light: ${hexToLightBg(theme.success)};
  --khor-error: ${theme.error};
  --khor-error-light: ${hexToLightBg(theme.error)};
  --khor-warning: ${theme.warning};
  --khor-warning-light: ${hexToLightBg(theme.warning)};
  --khor-info: ${theme.info};
  --khor-info-light: ${hexToLightBg(theme.info)};

  /* ── Tipografía ── */
  --font-primary: '${theme.fontHeading}', sans-serif;
  --font-secondary: '${theme.fontBody}', sans-serif;
  --font-mono: '${theme.fontMono}', monospace;
  --khor-h1-size: ${theme.h1Size}px;
  --khor-h2-size: ${theme.h2Size}px;
  --khor-h3-size: ${theme.h3Size}px;
  --khor-body-size: ${theme.bodySize}px;
  --khor-small-size: ${theme.smallSize}px;
  --khor-line-height: ${theme.baseLineHeight};

  /* ── Sombras ── */
  --khor-shadow-sm: ${theme.shadowSm} ${theme.shadowColor};
  --khor-shadow-md: ${theme.shadowMd} ${theme.shadowColor};
  --khor-shadow-lg: ${theme.shadowLg} ${theme.shadowColor};

  /* ── Border Radius ── */
  --khor-radius-sm: ${theme.radiusSm}px;
  --khor-radius-md: ${theme.radiusMd}px;
  --khor-radius-lg: ${theme.radiusLg}px;
  --khor-radius-xl: ${theme.radiusXl}px;

  /* ── Espaciado ── */
  --khor-space-xs: ${theme.spaceXs}px;
  --khor-space-sm: ${theme.spaceSm}px;
  --khor-space-md: ${theme.spaceMd}px;
  --khor-space-lg: ${theme.spaceLg}px;
  --khor-space-xl: ${theme.spaceXl}px;

  /* ── Mapped Tokens ── */
  --primary: var(--khor-primary);
  --primary-foreground: #FFFFFF;
  --accent: var(--khor-accent);
  --destructive: var(--khor-error);
  --ring: var(--khor-primary);
  --radius: var(--khor-radius-lg);
}`, [theme]);

  const generateSCSS = useCallback(() => `// Khor Design System — SCSS Variables
// Generated: ${new Date().toISOString()}

// Colors
$khor-primary: ${theme.primary};
$khor-primary-hover: ${adjustBrightness(theme.primary, 15)};
$khor-secondary: ${theme.secondary};
$khor-accent: ${theme.accent};
$khor-success: ${theme.success};
$khor-error: ${theme.error};
$khor-warning: ${theme.warning};
$khor-info: ${theme.info};

// Typography
$khor-font-heading: '${theme.fontHeading}', sans-serif;
$khor-font-body: '${theme.fontBody}', sans-serif;
$khor-font-mono: '${theme.fontMono}', monospace;
$khor-h1-size: ${theme.h1Size}px;
$khor-h2-size: ${theme.h2Size}px;
$khor-h3-size: ${theme.h3Size}px;
$khor-body-size: ${theme.bodySize}px;
$khor-small-size: ${theme.smallSize}px;
$khor-line-height: ${theme.baseLineHeight};

// Shadows
$khor-shadow-sm: ${theme.shadowSm} ${theme.shadowColor};
$khor-shadow-md: ${theme.shadowMd} ${theme.shadowColor};
$khor-shadow-lg: ${theme.shadowLg} ${theme.shadowColor};

// Radius
$khor-radius-sm: ${theme.radiusSm}px;
$khor-radius-md: ${theme.radiusMd}px;
$khor-radius-lg: ${theme.radiusLg}px;
$khor-radius-xl: ${theme.radiusXl}px;

// Spacing
$khor-space-xs: ${theme.spaceXs}px;
$khor-space-sm: ${theme.spaceSm}px;
$khor-space-md: ${theme.spaceMd}px;
$khor-space-lg: ${theme.spaceLg}px;
$khor-space-xl: ${theme.spaceXl}px;`, [theme]);

  const generateJSON = useCallback(() => JSON.stringify({
    $schema: 'https://design-tokens.github.io/community-group/format/',
    generator: 'Khor Design System – Theme Builder',
    generatedAt: new Date().toISOString(),
    colors: {
      primary: { $value: theme.primary, $type: 'color' },
      'primary-hover': { $value: adjustBrightness(theme.primary, 15), $type: 'color' },
      secondary: { $value: theme.secondary, $type: 'color' },
      accent: { $value: theme.accent, $type: 'color' },
      success: { $value: theme.success, $type: 'color' },
      error: { $value: theme.error, $type: 'color' },
      warning: { $value: theme.warning, $type: 'color' },
      info: { $value: theme.info, $type: 'color' },
    },
    typography: {
      fontHeading: { $value: theme.fontHeading, $type: 'fontFamily' },
      fontBody: { $value: theme.fontBody, $type: 'fontFamily' },
      fontMono: { $value: theme.fontMono, $type: 'fontFamily' },
      h1Size: { $value: `${theme.h1Size}px`, $type: 'dimension' },
      h2Size: { $value: `${theme.h2Size}px`, $type: 'dimension' },
      h3Size: { $value: `${theme.h3Size}px`, $type: 'dimension' },
      bodySize: { $value: `${theme.bodySize}px`, $type: 'dimension' },
      smallSize: { $value: `${theme.smallSize}px`, $type: 'dimension' },
      lineHeight: { $value: theme.baseLineHeight, $type: 'number' },
    },
    shadows: {
      sm: { $value: `${theme.shadowSm} ${theme.shadowColor}`, $type: 'shadow' },
      md: { $value: `${theme.shadowMd} ${theme.shadowColor}`, $type: 'shadow' },
      lg: { $value: `${theme.shadowLg} ${theme.shadowColor}`, $type: 'shadow' },
    },
    radius: {
      sm: { $value: `${theme.radiusSm}px`, $type: 'dimension' },
      md: { $value: `${theme.radiusMd}px`, $type: 'dimension' },
      lg: { $value: `${theme.radiusLg}px`, $type: 'dimension' },
      xl: { $value: `${theme.radiusXl}px`, $type: 'dimension' },
    },
    spacing: {
      xs: { $value: `${theme.spaceXs}px`, $type: 'dimension' },
      sm: { $value: `${theme.spaceSm}px`, $type: 'dimension' },
      md: { $value: `${theme.spaceMd}px`, $type: 'dimension' },
      lg: { $value: `${theme.spaceLg}px`, $type: 'dimension' },
      xl: { $value: `${theme.spaceXl}px`, $type: 'dimension' },
    },
  }, null, 2), [theme]);

  const handleCopy = async (content: string, label: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleDownload = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ fontFamily: font }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: t.colors.brand.primary, textTransform: 'uppercase', letterSpacing: 1 }}>Personalización</span>
        <h2 style={{ margin: '4px 0 0', fontSize: 30, fontWeight: 700, color: 'var(--foreground)' }}>Theming en Vivo</h2>
        <p style={{ margin: '8px 0 0', fontSize: 16, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
          Personaliza todos los tokens del Design System — colores, tipografía, sombras, border radius y espaciado.
          Los cambios se reflejan en tiempo real. Exporta el tema completo en CSS, SCSS o JSON.
        </p>
      </div>

      {/* Presets Gallery */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)', marginBottom: 10 }}>Presets de Marca</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 }}>
          {presets.map((p) => {
            const isActive = theme.primary === (p.config.primary || defaultTheme.primary) && theme.secondary === (p.config.secondary || defaultTheme.secondary);
            return (
              <button key={p.name} onClick={() => applyPreset(p.config)} style={{
                padding: '12px 14px', borderRadius: 10, textAlign: 'left', cursor: 'pointer', fontFamily: font,
                border: `2px solid ${isActive ? p.accent_color : 'var(--border)'}`,
                backgroundColor: isActive ? `${p.accent_color}08` : 'var(--card)',
                transition: 'all 0.15s ease',
              }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
                  {[p.config.primary, p.config.secondary, p.config.accent].filter(Boolean).map((c, i) => (
                    <div key={i} style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: c, border: '1px solid var(--border)' }} />
                  ))}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>{p.name}</div>
                <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 2 }}>{p.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 24, alignItems: 'start' }}>
        {/* ═══ Controls Panel ═══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'sticky', top: 24, maxHeight: 'calc(100vh - 120px)', overflow: 'auto' }}>

          {/* Colors */}
          <SectionCard icon={<Palette size={15} />} title="Colores">
            <ColorInput label="Primario" hint="CTAs, links, focus" value={theme.primary} onChange={(v) => update('primary', v)} />
            <ColorInput label="Secundario" hint="sidebar, headings, nav" value={theme.secondary} onChange={(v) => update('secondary', v)} />
            <ColorInput label="Acento" hint="highlights, warnings" value={theme.accent} onChange={(v) => update('accent', v)} />
            <div style={{ height: 1, backgroundColor: 'var(--border)', margin: '2px 0' }} />
            <ColorInput label="Éxito" value={theme.success} onChange={(v) => update('success', v)} />
            <ColorInput label="Error" value={theme.error} onChange={(v) => update('error', v)} />
            <ColorInput label="Warning" value={theme.warning} onChange={(v) => update('warning', v)} />
            <ColorInput label="Info" value={theme.info} onChange={(v) => update('info', v)} />
          </SectionCard>

          {/* Typography */}
          <SectionCard icon={<Type size={15} />} title="Tipografía" defaultOpen={false}>
            <SelectInput label="Fuente de Títulos" value={theme.fontHeading} onChange={(v) => update('fontHeading', v)} options={fontOptions} />
            <SelectInput label="Fuente de Cuerpo" value={theme.fontBody} onChange={(v) => update('fontBody', v)} options={fontOptions} />
            <SelectInput label="Fuente Monoespaciada" value={theme.fontMono} onChange={(v) => update('fontMono', v)} options={monoFontOptions} />
            <div style={{ height: 1, backgroundColor: 'var(--border)', margin: '2px 0' }} />
            <SliderInput label="H1" value={theme.h1Size} onChange={(v) => update('h1Size', v)} min={24} max={56} unit="px" />
            <SliderInput label="H2" value={theme.h2Size} onChange={(v) => update('h2Size', v)} min={20} max={44} unit="px" />
            <SliderInput label="H3" value={theme.h3Size} onChange={(v) => update('h3Size', v)} min={16} max={36} unit="px" />
            <SliderInput label="Cuerpo" value={theme.bodySize} onChange={(v) => update('bodySize', v)} min={12} max={20} unit="px" />
            <SliderInput label="Small" value={theme.smallSize} onChange={(v) => update('smallSize', v)} min={10} max={14} unit="px" />
            <SliderInput label="Line Height" value={theme.baseLineHeight} onChange={(v) => update('baseLineHeight', v)} min={1} max={2} unit="" step={0.1} />
          </SectionCard>

          {/* Shadows */}
          <SectionCard icon={<Layers size={15} />} title="Sombras" defaultOpen={false}>
            <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginBottom: 4 }}>
              Define offset y blur como <code style={{ padding: '1px 4px', backgroundColor: 'var(--muted)', borderRadius: 3, fontSize: 10 }}>x y blur spread</code>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--foreground)', marginBottom: 4 }}>Shadow SM</div>
              <input value={theme.shadowSm} onChange={(e) => update('shadowSm', e.target.value)} style={inputStyle} placeholder="0 1px 3px 0" />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--foreground)', marginBottom: 4 }}>Shadow MD</div>
              <input value={theme.shadowMd} onChange={(e) => update('shadowMd', e.target.value)} style={inputStyle} placeholder="0 4px 12px 0" />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--foreground)', marginBottom: 4 }}>Shadow LG</div>
              <input value={theme.shadowLg} onChange={(e) => update('shadowLg', e.target.value)} style={inputStyle} placeholder="0 10px 30px -4px" />
            </div>
            <ColorInput label="Color de sombra" value={theme.shadowColor} onChange={(v) => update('shadowColor', v)} />
            {/* Shadow Preview */}
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              {[
                { label: 'SM', shadow: buildShadow(theme.shadowSm, theme.shadowColor) },
                { label: 'MD', shadow: buildShadow(theme.shadowMd, theme.shadowColor) },
                { label: 'LG', shadow: buildShadow(theme.shadowLg, theme.shadowColor) },
              ].map((s) => (
                <div key={s.label} style={{
                  flex: 1, height: 48, borderRadius: theme.radiusMd, backgroundColor: 'var(--card)',
                  boxShadow: s.shadow, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 600, color: 'var(--muted-foreground)',
                }}>{s.label}</div>
              ))}
            </div>
          </SectionCard>

          {/* Radius */}
          <SectionCard icon={<Square size={15} />} title="Border Radius" defaultOpen={false}>
            <SliderInput label="SM" value={theme.radiusSm} onChange={(v) => update('radiusSm', v)} min={0} max={20} unit="px" />
            <SliderInput label="MD" value={theme.radiusMd} onChange={(v) => update('radiusMd', v)} min={0} max={24} unit="px" />
            <SliderInput label="LG" value={theme.radiusLg} onChange={(v) => update('radiusLg', v)} min={0} max={32} unit="px" />
            <SliderInput label="XL" value={theme.radiusXl} onChange={(v) => update('radiusXl', v)} min={0} max={40} unit="px" />
            {/* Radius Preview */}
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              {[
                { label: `${theme.radiusSm}px`, r: theme.radiusSm },
                { label: `${theme.radiusMd}px`, r: theme.radiusMd },
                { label: `${theme.radiusLg}px`, r: theme.radiusLg },
                { label: `${theme.radiusXl}px`, r: theme.radiusXl },
              ].map((s) => (
                <div key={s.label} style={{
                  flex: 1, height: 40, borderRadius: s.r, backgroundColor: 'var(--muted)',
                  border: `2px solid ${theme.primary}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 600, color: 'var(--muted-foreground)',
                }}>{s.label}</div>
              ))}
            </div>
          </SectionCard>

          {/* Spacing */}
          <SectionCard icon={<Maximize size={15} />} title="Espaciado" defaultOpen={false}>
            <SliderInput label="XS" value={theme.spaceXs} onChange={(v) => update('spaceXs', v)} min={0} max={8} unit="px" />
            <SliderInput label="SM" value={theme.spaceSm} onChange={(v) => update('spaceSm', v)} min={2} max={16} unit="px" />
            <SliderInput label="MD" value={theme.spaceMd} onChange={(v) => update('spaceMd', v)} min={8} max={32} unit="px" />
            <SliderInput label="LG" value={theme.spaceLg} onChange={(v) => update('spaceLg', v)} min={16} max={48} unit="px" />
            <SliderInput label="XL" value={theme.spaceXl} onChange={(v) => update('spaceXl', v)} min={24} max={80} unit="px" />
            {/* Spacing Preview */}
            <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', marginTop: 4 }}>
              {[theme.spaceXs, theme.spaceSm, theme.spaceMd, theme.spaceLg, theme.spaceXl].map((s, i) => (
                <div key={i} style={{
                  width: s, height: s, borderRadius: 3,
                  backgroundColor: `${theme.primary}${30 + i * 15}`,
                  flexShrink: 0,
                }} title={`${s}px`} />
              ))}
            </div>
          </SectionCard>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 0' }}>
            <KButton variant="outline" icon={<RotateCcw size={16} />} onClick={resetTheme} style={{ width: '100%' }}>
              Restaurar Defaults
            </KButton>
            <KButton variant="primary" icon={copied === 'css' ? <Check size={16} /> : <Copy size={16} />} onClick={() => handleCopy(generateCSS(), 'css')} style={{ width: '100%' }}>
              {copied === 'css' ? 'CSS Copiado' : 'Copiar CSS'}
            </KButton>
          </div>

          {/* Export */}
          <SectionCard icon={<Download size={15} />} title="Exportar Tema" defaultOpen={false}>
            <button onClick={() => handleDownload(generateCSS(), 'khor-theme.css')} style={exportBtnStyle}>
              <Download size={14} /> CSS Custom Properties
            </button>
            <button onClick={() => handleDownload(generateSCSS(), 'khor-theme.scss')} style={exportBtnStyle}>
              <Download size={14} /> SCSS Variables
            </button>
            <button onClick={() => handleDownload(generateJSON(), 'khor-tokens.json')} style={exportBtnStyle}>
              <Download size={14} /> JSON (W3C DTCG)
            </button>
          </SectionCard>
        </div>

        {/* ═══ Preview Panel ═══ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Preview Tabs */}
          <div style={{ display: 'flex', gap: 0, borderBottom: `2px solid var(--border)` }}>
            {(['components', 'typography', 'shadows'] as const).map((tab) => {
              const labels = { components: 'Componentes', typography: 'Tipografía', shadows: 'Sombras y Radii' };
              const icons = { components: <Sparkles size={14} />, typography: <Type size={14} />, shadows: <Layers size={14} /> };
              return (
                <button key={tab} onClick={() => setActivePreview(tab)} style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px', border: 'none',
                  borderBottom: `2px solid ${activePreview === tab ? theme.primary : 'transparent'}`,
                  marginBottom: -2, background: 'none', cursor: 'pointer', fontFamily: font, fontSize: 13, fontWeight: 500,
                  color: activePreview === tab ? theme.primary : 'var(--muted-foreground)',
                }}>
                  {icons[tab]} {labels[tab]}
                </button>
              );
            })}
          </div>

          {/* Components Preview */}
          {activePreview === 'components' && (
            <div style={{ padding: 24, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: `1px solid var(--border)` }}>
              {/* Buttons */}
              <PreviewSection title="Botones">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <KButton variant="primary">Primario</KButton>
                  <KButton variant="secondary">Secundario</KButton>
                  <KButton variant="outline">Outline</KButton>
                  <KButton variant="ghost">Ghost</KButton>
                  <KButton variant="danger">Peligro</KButton>
                  <KButton variant="navy">Secundario Dark</KButton>
                </div>
              </PreviewSection>

              {/* Badges & Tags */}
              <PreviewSection title="Badges y Tags">
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                  <KBadge variant="primary">Primario</KBadge>
                  <KBadge variant="success">Éxito</KBadge>
                  <KBadge variant="warning">Warning</KBadge>
                  <KBadge variant="error">Error</KBadge>
                  <KBadge variant="default">Default</KBadge>
                  <KTag>React</KTag>
                  <KTag closable>TypeScript</KTag>
                </div>
              </PreviewSection>

              {/* Alerts */}
              <PreviewSection title="Alertas">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <KAlert type="success" message="Operación exitosa" description="Tus cambios han sido guardados." showIcon />
                  <KAlert type="error" message="Error al procesar" showIcon />
                  <KAlert type="warning" message="Revisa los datos antes de continuar" showIcon />
                  <KAlert type="info" message="Nueva versión disponible" showIcon />
                </div>
              </PreviewSection>

              {/* Form Elements */}
              <PreviewSection title="Formularios">
                <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <KFormField label="Nombre" required>
                    <KInput placeholder="Escribe tu nombre..." />
                  </KFormField>
                  <KFormField label="Email" error="Este campo es obligatorio">
                    <KInput placeholder="tu@empresa.com" error />
                  </KFormField>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <KCheckbox label="Aceptar términos" />
                    <KSwitch checked={true} onChange={() => {}} />
                  </div>
                </div>
              </PreviewSection>

              {/* Progress & Avatars */}
              <PreviewSection title="Progreso y Avatares" noBorder>
                <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <KProgress value={75} />
                  <KProgress value={45} />
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <KAvatar name="Ana García" size="md" />
                  <KAvatar name="Carlos López" size="md" />
                  <KAvatar name="María Torres" size="md" />
                </div>
              </PreviewSection>
            </div>
          )}

          {/* Typography Preview */}
          {activePreview === 'typography' && (
            <div style={{ padding: 24, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: `1px solid var(--border)` }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ padding: 20, borderRadius: 8, backgroundColor: 'var(--background)' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
                    Fuente de Títulos: <span style={{ color: theme.primary }}>{theme.fontHeading}</span>
                  </p>
                  <h1 style={{ fontFamily: `'${theme.fontHeading}', sans-serif`, fontSize: theme.h1Size, fontWeight: 700, lineHeight: theme.baseLineHeight, margin: '0 0 8px', color: 'var(--foreground)' }}>
                    Heading 1 — {theme.h1Size}px
                  </h1>
                  <h2 style={{ fontFamily: `'${theme.fontHeading}', sans-serif`, fontSize: theme.h2Size, fontWeight: 700, lineHeight: theme.baseLineHeight, margin: '0 0 8px', color: 'var(--foreground)' }}>
                    Heading 2 — {theme.h2Size}px
                  </h2>
                  <h3 style={{ fontFamily: `'${theme.fontHeading}', sans-serif`, fontSize: theme.h3Size, fontWeight: 600, lineHeight: theme.baseLineHeight, margin: '0', color: 'var(--foreground)' }}>
                    Heading 3 — {theme.h3Size}px
                  </h3>
                </div>

                <div style={{ padding: 20, borderRadius: 8, backgroundColor: 'var(--background)' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
                    Fuente de Cuerpo: <span style={{ color: theme.primary }}>{theme.fontBody}</span>
                  </p>
                  <p style={{ fontFamily: `'${theme.fontBody}', sans-serif`, fontSize: theme.bodySize, lineHeight: theme.baseLineHeight, margin: '0 0 8px', color: 'var(--foreground)' }}>
                    <strong>Body ({theme.bodySize}px)</strong> — El Khor Design System proporciona una experiencia visual coherente
                    y accesible para aplicaciones SaaS de gestión de talento humano.
                  </p>
                  <p style={{ fontFamily: `'${theme.fontBody}', sans-serif`, fontSize: theme.smallSize, lineHeight: theme.baseLineHeight, margin: '0', color: 'var(--muted-foreground)' }}>
                    <strong>Small ({theme.smallSize}px)</strong> — Texto secundario, captions, labels de formulario y metadata.
                  </p>
                </div>

                <div style={{ padding: 20, borderRadius: 8, backgroundColor: 'var(--background)' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
                    Fuente Monoespaciada: <span style={{ color: theme.primary }}>{theme.fontMono}</span>
                  </p>
                  <pre style={{ fontFamily: `'${theme.fontMono}', monospace`, fontSize: theme.bodySize, lineHeight: 1.6, margin: 0, padding: 16, borderRadius: 6, backgroundColor: '#1e1e2e', color: '#cdd6f4', overflowX: 'auto' }}>
{`const theme = {
  primary: '${theme.primary}',
  secondary: '${theme.secondary}',
  fontHeading: '${theme.fontHeading}',
};`}
                  </pre>
                </div>

                {/* Type Scale Visual */}
                <div style={{ padding: 20, borderRadius: 8, backgroundColor: 'var(--background)' }}>
                  <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
                    Escala Tipográfica
                  </p>
                  {[
                    { label: 'H1', size: theme.h1Size, font: theme.fontHeading, weight: 700 },
                    { label: 'H2', size: theme.h2Size, font: theme.fontHeading, weight: 700 },
                    { label: 'H3', size: theme.h3Size, font: theme.fontHeading, weight: 600 },
                    { label: 'Body', size: theme.bodySize, font: theme.fontBody, weight: 400 },
                    { label: 'Small', size: theme.smallSize, font: theme.fontBody, weight: 500 },
                  ].map((t) => (
                    <div key={t.label} style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 8, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted-foreground)', width: 40, flexShrink: 0, fontFamily: 'monospace' }}>{t.label}</span>
                      <span style={{ fontSize: 11, color: 'var(--muted-foreground)', width: 40, flexShrink: 0, fontFamily: 'monospace' }}>{t.size}px</span>
                      <span style={{ fontFamily: `'${t.font}', sans-serif`, fontSize: t.size, fontWeight: t.weight, color: 'var(--foreground)', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Khor Design System
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Shadows & Radii Preview */}
          {activePreview === 'shadows' && (
            <div style={{ padding: 24, borderRadius: t.radius.lg, backgroundColor: 'var(--card)', border: `1px solid var(--border)` }}>
              {/* Shadows */}
              <PreviewSection title="Sombras">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                  {[
                    { label: 'Shadow SM', shadow: buildShadow(theme.shadowSm, theme.shadowColor), desc: theme.shadowSm },
                    { label: 'Shadow MD', shadow: buildShadow(theme.shadowMd, theme.shadowColor), desc: theme.shadowMd },
                    { label: 'Shadow LG', shadow: buildShadow(theme.shadowLg, theme.shadowColor), desc: theme.shadowLg },
                  ].map((s) => (
                    <div key={s.label} style={{
                      padding: 24, borderRadius: theme.radiusLg, backgroundColor: 'var(--background)',
                      boxShadow: s.shadow, textAlign: 'center',
                    }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)', marginBottom: 4 }}>{s.label}</div>
                      <code style={{ fontSize: 11, color: 'var(--muted-foreground)', fontFamily: `'${theme.fontMono}', monospace` }}>{s.desc}</code>
                    </div>
                  ))}
                </div>
              </PreviewSection>

              {/* Radii */}
              <PreviewSection title="Border Radius">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                  {[
                    { label: 'SM', r: theme.radiusSm },
                    { label: 'MD', r: theme.radiusMd },
                    { label: 'LG', r: theme.radiusLg },
                    { label: 'XL', r: theme.radiusXl },
                  ].map((s) => (
                    <div key={s.label} style={{
                      height: 80, borderRadius: s.r, backgroundColor: 'var(--background)',
                      border: `2px solid ${theme.primary}30`, display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--foreground)' }}>{s.r}px</div>
                      <div style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </PreviewSection>

              {/* Spacing */}
              <PreviewSection title="Espaciado" noBorder>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: 'XS', val: theme.spaceXs },
                    { label: 'SM', val: theme.spaceSm },
                    { label: 'MD', val: theme.spaceMd },
                    { label: 'LG', val: theme.spaceLg },
                    { label: 'XL', val: theme.spaceXl },
                  ].map((s) => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--muted-foreground)', width: 24, fontFamily: 'monospace' }}>{s.label}</span>
                      <span style={{ fontSize: 11, color: 'var(--muted-foreground)', width: 36, fontFamily: 'monospace' }}>{s.val}px</span>
                      <div style={{ height: 20, width: s.val, backgroundColor: `${theme.primary}40`, borderRadius: 3, transition: 'width 0.2s ease' }} />
                    </div>
                  ))}
                </div>
              </PreviewSection>
            </div>
          )}

          {/* CSS Preview */}
          <div style={{ borderRadius: t.radius.lg, overflow: 'hidden', border: `1px solid var(--border)` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', backgroundColor: '#1e1e2e', color: '#cdd6f4', fontSize: 12 }}>
              <span style={{ fontWeight: 600 }}>khor-theme.css</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => handleCopy(generateCSS(), 'css-block')} style={codeActionBtn}>
                  {copied === 'css-block' ? <Check size={12} /> : <Copy size={12} />}
                  {copied === 'css-block' ? 'Copiado' : 'Copiar'}
                </button>
                <button onClick={() => handleDownload(generateCSS(), 'khor-theme.css')} style={codeActionBtn}>
                  <Download size={12} /> Descargar
                </button>
              </div>
            </div>
            <pre style={{ margin: 0, padding: 16, backgroundColor: '#1e1e2e', color: '#cdd6f4', fontSize: 12, lineHeight: 1.6, overflowX: 'auto', maxHeight: 300 }}>
              <code>{generateCSS()}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */
function PreviewSection({ title, children, noBorder }: { title: string; children: React.ReactNode; noBorder?: boolean }) {
  return (
    <div style={{ marginBottom: noBorder ? 0 : 24, paddingBottom: noBorder ? 0 : 24, borderBottom: noBorder ? 'none' : `1px solid var(--border)` }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>{title}</div>
      {children}
    </div>
  );
}

/* ─── Styles ─── */
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '6px 10px', borderRadius: 6, border: `1px solid var(--border)`,
  fontSize: 13, fontFamily: 'monospace', color: 'var(--foreground)', backgroundColor: 'var(--card)',
};

const exportBtnStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
  border: `1px solid var(--border)`, borderRadius: 6, backgroundColor: 'transparent',
  cursor: 'pointer', fontSize: 13, fontWeight: 500, color: 'var(--foreground)',
  fontFamily: khorTokens.typography.fontPrimary, transition: 'all 0.15s ease', width: '100%',
};

const codeActionBtn: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none',
  color: '#cdd6f4', cursor: 'pointer', fontSize: 11, padding: '3px 8px', borderRadius: 4,
};

/* ─── Helpers ─── */
function adjustBrightness(hex: string, percent: number) {
  const h = hex.replace('#', '');
  if (h.length !== 6) return hex;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const adj = (c: number) => Math.round(Math.min(255, Math.max(0, c + (c * percent / 100))));
  return `#${adj(r).toString(16).padStart(2, '0')}${adj(g).toString(16).padStart(2, '0')}${adj(b).toString(16).padStart(2, '0')}`;
}

function hexToLightBg(hex: string) {
  const h = hex.replace('#', '');
  if (h.length !== 6) return '#f5f5f5';
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const blend = (c: number) => Math.round(c * 0.08 + 255 * 0.92);
  return `#${blend(r).toString(16).padStart(2, '0')}${blend(g).toString(16).padStart(2, '0')}${blend(b).toString(16).padStart(2, '0')}`;
}
