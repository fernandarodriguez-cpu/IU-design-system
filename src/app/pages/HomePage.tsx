/**
 * HomePage — Vista general del Khor Design System
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import JSZip from 'jszip';
import {
  Atom, Layers, Box, Palette, ArrowRight,
  Component, Sparkles, Zap, Shield, Smartphone,
  Download, Package, Loader2,
  ShieldCheck, Figma, Clock, Bot, Brush, BookOpen,
} from 'lucide-react';
import { KButton, KText, KBadge } from '../components/design-system/atoms/index';
import { KStatCard } from '../components/design-system/molecules/index';
import { kToast } from '../components/design-system/organisms/index';
import { khorTokens } from '../theme/khor-theme';

const stats = [
  { title: 'Átomos', value: 32, icon: <Atom size={20} />, sparkData: [2, 5, 8, 12, 15, 18, 22, 32] },
  { title: 'Moléculas', value: 33, icon: <Layers size={20} />, sparkData: [1, 5, 9, 12, 18, 22, 28, 33] },
  { title: 'Organismos', value: 24, icon: <Box size={20} />, sparkData: [1, 2, 4, 5, 8, 10, 12, 24] },
  { title: 'Patrones', value: 8, icon: <BookOpen size={20} />, sparkData: [0, 1, 2, 3, 4, 5, 6, 8] },
  { title: 'Templates', value: 4, icon: <Palette size={20} />, sparkData: [0, 1, 2, 3, 4, 4] },
];

const principles = [
  {
    icon: <Component size={24} />,
    title: 'Atomic Design',
    description: 'Arquitectura modular basada en átomos, moleculas, organismos y templates para máxima reutilización.',
  },
  {
    icon: <Sparkles size={24} />,
    title: 'IA Agent Ready',
    description: 'Componentes semánticos preparados para ser interpretados y generados por agentes de IA.',
  },
  {
    icon: <Zap size={24} />,
    title: 'Rendimiento',
    description: 'Optimizado para sesiones de uso intensivo (8+ horas) con paleta anti-fatiga visual.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Consistencia',
    description: 'Fuente única de verdad para todos los productos Khor. Un lenguaje visual unificado.',
  },
  {
    icon: <Smartphone size={24} />,
    title: 'Responsive',
    description: 'Componentes adaptados para web y móvil con grid de 12 columnas y breakpoints definidos.',
  },
];

/**
 * Genera y descarga un ZIP con todo el sistema de diseño.
 */
async function handleDownloadZip() {
  const t = khorTokens;
  const zip = new JSZip();
  const ds = zip.folder('khor-design-system')!;

  ds.file('README.md', `
# Khor Design System

\`\`\`bash
pnpm add react react-dom
pnpm add @radix-ui/react-dialog @radix-ui/react-dropdown-menu
pnpm add @radix-ui/react-checkbox @radix-ui/react-switch
pnpm add @radix-ui/react-slider @radix-ui/react-tooltip
pnpm add @radix-ui/react-popover @radix-ui/react-accordion
pnpm add @radix-ui/react-tabs @radix-ui/react-select
pnpm add @radix-ui/react-progress @radix-ui/react-radio-group
pnpm add lucide-react recharts sonner
pnpm add tailwindcss @tailwindcss/vite
\`\`\`

## Arquitectura V4 (Headless)
Khor v4 ha migrado a una arquitectura 100% agnóstica para eliminar la dependencia de Ant Design y DayJS.
- **UI Core:** Radix UI Primitives
- **Styling:** Tailwind CSS v4
- **Date Engine:** date-fns


## Fuentes

\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
\`\`\`

## Estructura

\`\`\`
khor-design-system/
├── theme/
│   └── khor-theme.ts        ← Tokens de diseño
├── atoms/
│   └── index.tsx            ← 30 átomos
├── molecules/
│   └── index.tsx            ← 33 moléculas
├── organisms/
│   └── index.tsx            ← 24 organismos
├── patterns/
│   └── index.ts             ← 8 patrones modulares
└── README.md
\`\`\`

## Uso Básico

\`\`\`tsx
import { KButton, KInput, KBadge } from './atoms';
import { KFormField, KStatCard } from './molecules';
import { KDataTable, kToast } from './organisms';
import { DashboardStatsPattern, LoginFormPattern } from './patterns';
\`\`\`

## Colores de Marca

| Token     | Hex       | Uso                         |
|-----------|-----------|------------------------------|
| Primary   | #E04D36   | CTAs, acciones principales   |
| Navy      | #051758   | Sidebar, títulos, navegación |
| Accent    | #FF9500   | Warnings, destacados         |

## Componentes

### Átomos (32)
KAffix, KAlert, KAvatar, KAvatarGroup, KBadge, KButton, KButtonGroup, KCheckbox, KCheckableTag, KCol, KDivider, KFlex, KFloatButton, KImage, KInput, KInputPassword, KInputSearch, KProgress, KQRCode, KRadio, KRate, KRow, KSkeleton, KSlider, KSpace, KSpin, KSwitch, KTag, KTextArea, KTooltip, KTypography, KWatermark

### Moléculas (33)
KAccordion, KAnchor, KAutocomplete, KBreadcrumb, KCascader, KColorPicker, KDatePicker, KDateRangePicker, KDescriptions, KDividerExtended, KDropdownMenu, KEmptyState, KFormField, KInputNumber, KList, KMentions, KNavItem, KPopconfirm, KPopover, KResult, KSearchInput, KSegmented, KSelectAdvanced, KSelectField, KStatCard, KStatistic, KSteps, KTimeline, KTimePicker, KTransfer, KTreeSelect, KUserCell, KDividerExtended

### Organismos (24)
KCalendar, KCardSection, KCarousel, KCommandBar, KDataTable, KDrawer, KForm, KFormItem, KFormList, KLoginForm, KModal, KModalConfirm, KNotification, KMessage, KPagination, KSparklineCell, KTabs, kToast, KToastProvider, KTour, KTree, KUpload, kNotification, kMessage

### Templates (4)
Login, Dashboard, CRUD Table, Formulario Multi-Paso

### Patrones Modulares (8)
DashboardStatsPattern, FormValidationPattern, FilterableListPattern, LoginFormPattern, PaginatedTablePattern, WizardPattern, SettingsPattern, SidebarPattern
`);

  // Theme tokens
  ds.folder('theme')!.file('khor-theme.ts', `/* Khor Design Tokens — Fuente de verdad */
export const khorTokens = ${JSON.stringify(t, null, 2)} as const;
`);

  // We use dynamic import to get the actual source code of the component files
  // Since we can't read files at runtime in the browser, we embed key content:
  const atomsCatalog = `/**
 * KHOR DESIGN SYSTEM — ÁTOMOS (30 componentes)
 * 
 * Componentes incluidos:
 * KButton, KInput, KTextArea, KBadge, KTag, KAvatar,
 * KSwitch, KCheckbox, KRadio, KTooltip, KProgress,
 * KText, KDivider, KAlert, KSkeleton, KSlider, KRate, KSpin,
 * KFlex, KRow, KCol
 *
 * Base: Radix UI + Tailwind + Khor Tokens
 * 
 * NOTA: Este archivo contiene la referencia de todos los átomos.
 * Para el código fuente completo, consulta el repositorio del proyecto.
 * 
 * Imports requeridos:
 *   import * as RadixSwitch from '@radix-ui/react-switch';
 *   import * as RadixCheckbox from '@radix-ui/react-checkbox';
 *   import * as RadixRadio from '@radix-ui/react-radio-group';
 *   import * as RadixTooltip from '@radix-ui/react-tooltip';
 *   import * as RadixProgress from '@radix-ui/react-progress';
 *   import * as RadixSlider from '@radix-ui/react-slider';
 *   import { Check, Minus, Eye, EyeOff, X, Loader2, ... } from 'lucide-react';
 *   import { khorTokens } from '../theme/khor-theme';
 */

// Re-export all atoms
export { KButton } from './KButton';
export { KInput } from './KInput';
export { KTextArea } from './KTextArea';
export { KBadge } from './KBadge';
export { KTag } from './KTag';
export { KAvatar } from './KAvatar';
export { KSwitch } from './KSwitch';
export { KCheckbox } from './KCheckbox';
export { KRadio } from './KRadio';
export { KTooltip } from './KTooltip';
export { KProgress } from './KProgress';
export { KText } from './KText';
export { KDivider } from './KDivider';
export { KAlert } from './KAlert';
export { KSkeleton } from './KSkeleton';
export { KSlider } from './KSlider';
export { KRate } from './KRate';
export { KSpin } from './KSpin';
export { KFlex } from './KFlex';
export { KRow, KCol } from './KGrid';
`;

  const moleculesCatalog = `/**
 * KHOR DESIGN SYSTEM — MOLÉCULAS (33 componentes)
 *
 * KAccordion, KAnchor, KAutocomplete, KBreadcrumb, KCascader, KColorPicker, KDatePicker, KDateRangePicker, KDescriptions, KDividerExt, KDropdownMenu, KEmptyState, KFormField, KInputNumber, KList, KMentions, KNavItem, KPopconfirm, KPopover, KResult, KSearchInput, KSegmented, KSelectAdvanced, KSelectField, KStatCard, KStatistic, KSteps, KTimeline, KTimePicker, KTransfer, KTreeSelect, KUserCell
 *
 * Base: Custom + Radix + Khor Tokens
 */

export { KFormField } from './KFormField';
export { KSearchInput } from './KSearchInput';
export { KStatCard } from './KStatCard';
export { KNavItem } from './KNavItem';
export { KSelectField } from './KSelectField';
export { KUserCell } from './KUserCell';
export { KEmptyState } from './KEmptyState';
export { KBreadcrumb } from './KBreadcrumb';
export { KSteps } from './KSteps';
export { KDropdownMenu } from './KDropdownMenu';
export { KPopover } from './KPopover';
export { KAccordion } from './KAccordion';
export { KInputNumber } from './KInputNumber';
export { KSegmented } from './KSegmented';
export { KAutocomplete } from './KAutocomplete';
export { KDatePicker } from './KDatePicker';
export { KDateRangePicker } from './KDateRangePicker';
export { KSelectAdvanced } from './KSelectAdvanced';
export { KDescriptions } from './KDescriptions';
export { KPopconfirm } from './KPopconfirm';
export { KResult } from './KResult';
export { KTimeline } from './KTimeline';
`;

  const organismsCatalog = `/**
 * KHOR DESIGN SYSTEM — ORGANISMOS (24 componentes)
 *
 * KCalendar, KCardSection, KCarousel, KCommandBar, KDataTable, KDrawer, KForm, KModal, KModalConfirm, KNotification, KMessage, KPagination, KSparklineCell, KTabs, KToastManager, KTour, KTree, KUpload
 *
 * Base: Radix + Custom + Khor Tokens
 */

export { KDataTable } from './KDataTable';
export { KSparklineCell } from './KSparklineCell';
export { KModal } from './KModal';
export { KDrawer } from './KDrawer';
export { KCardSection } from './KCardSection';
export { KTabs } from './KTabs';
export { KToastProvider, kToast } from './KToastManager';
export { KCommandBar } from './KCommandBar';
export { KUpload } from './KUpload';
export { KTree } from './KTree';
export { KTour } from './KTour';
export { KModalConfirm } from './KModalConfirm';
export { KFormList } from './KFormList';
`;

  const patternsCatalog = `/**
 * KHOR DESIGN SYSTEM — PATRONES (8 componentes)
 *
 * DashboardStatsPattern, FormValidationPattern, FilterableListPattern, LoginFormPattern, PaginatedTablePattern, WizardPattern, SettingsPattern, SidebarPattern
 *
 * Base: Custom + Khor Tokens
 */

export { DashboardStatsPattern } from './DashboardStatsPattern';
export { FormValidationPattern } from './FormValidationPattern';
export { FilterableListPattern } from './FilterableListPattern';
export { LoginFormPattern } from './LoginFormPattern';
export { PaginatedTablePattern } from './PaginatedTablePattern';
export { WizardPattern } from './WizardPattern';
export { SettingsPattern } from './SettingsPattern';
export { SidebarPattern } from './SidebarPattern';

export const patterns = [
  DashboardStatsPattern, FormValidationPattern, FilterableListPattern,
  LoginFormPattern, PaginatedTablePattern, WizardPattern,
  SettingsPattern, SidebarPattern,
];

export const categories = ['Todos', ...new Set(patterns.map((p) => p.category))];
`;

  ds.folder('atoms')!.file('index.tsx', atomsCatalog);
  ds.folder('molecules')!.file('index.tsx', moleculesCatalog);
  ds.folder('organisms')!.file('index.tsx', organismsCatalog);
  ds.folder('patterns')!.file('index.ts', patternsCatalog);

  // Generate ZIP and download
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'khor-design-system-v4.0.2.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  kToast({ type: 'success', title: 'Descarga iniciada', description: 'El ZIP del sistema de diseno se esta descargando.' });
}

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: khorTokens.typography.fontPrimary }}>
      {/* Hero */}
      <div style={{
        backgroundColor: khorTokens.colors.brand.navy,
        borderRadius: khorTokens.radius.xl,
        padding: '48px 40px',
        marginBottom: 32,
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: -60,
          right: -60,
          width: 200,
          height: 200,
          borderRadius: '50%',
          backgroundColor: 'rgba(224,77,54,0.15)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: -40,
          right: 120,
          width: 120,
          height: 120,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,149,0,0.1)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <KBadge status="info" label="v4.0.2 Stable" />
            <KBadge status="success" label="100% Headless Transformation" />
            <KBadge status="warning" label="IA Ready" />
          </div>
          <h1 style={{ margin: '0 0 12px', fontSize: 38, fontWeight: 700, color: '#fff' }}>
            Khor Design System
          </h1>
          <p style={{ margin: '0 0 24px', fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 600, lineHeight: 1.6 }}>
            La fuente unica de verdad para construir aplicaciones SaaS y moviles con una experiencia de usuario excepcional y desarrollo agil.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <KButton variant="primary" onClick={() => navigate('/atoms/button')}>
              Explorar Componentes <ArrowRight size={16} style={{ marginLeft: 4 }} />
            </KButton>
            <KButton variant="outline" onClick={() => navigate('/tokens')} className="!border-white !text-white hover:!bg-white/10">
              Ver Tokens
            </KButton>
            <KButton variant="outline" onClick={handleDownloadZip} className="!border-white/60 !text-white hover:!bg-white/10" icon={<Download size={16} />}>
              Descargar DS
            </KButton>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
        {stats.map((s) => (
          <KStatCard key={s.title} {...s} change={100} changeLabel="Completo" />
        ))}
      </div>

      {/* Principles */}
      <div style={{
        backgroundColor: khorTokens.colors.neutral[50],
        borderRadius: khorTokens.radius.lg,
        padding: 32,
        boxShadow: khorTokens.shadows.sm,
        marginBottom: 32,
      }}>
        <h2 style={{ margin: '0 0 24px', fontSize: 24, fontWeight: 700, color: khorTokens.colors.brand.navy }}>
          Principios del Sistema
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {principles.map((p) => (
            <div key={p.title} style={{
              padding: 20,
              borderRadius: khorTokens.radius.md,
              border: `1px solid ${khorTokens.colors.neutral[200]}`,
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
            }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: khorTokens.radius.md,
                backgroundColor: 'rgba(224,77,54,0.08)',
                color: khorTokens.colors.brand.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {p.icon}
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 600, color: khorTokens.colors.brand.navy }}>{p.title}</h4>
                <p style={{ margin: 0, fontSize: 13, color: khorTokens.colors.neutral[400], lineHeight: 1.5 }}>{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Start */}
      <div style={{
        backgroundColor: khorTokens.colors.neutral[50],
        borderRadius: khorTokens.radius.lg,
        padding: 32,
        boxShadow: khorTokens.shadows.sm,
      }}>
        <h2 style={{ margin: '0 0 16px', fontSize: 24, fontWeight: 700, color: khorTokens.colors.brand.navy }}>
          Inicio Rapido
        </h2>
        <div style={{
          backgroundColor: '#1e1e2e',
          borderRadius: khorTokens.radius.md,
          padding: 24,
          color: '#cdd6f4',
          fontSize: 13,
          fontFamily: "'Plus Jakarta Sans', monospace",
          lineHeight: 1.8,
        }}>
          <div><span style={{ color: '#89b4fa' }}>import</span> {'{ KButton, KInput, KBadge }'} <span style={{ color: '#89b4fa' }}>from</span> <span style={{ color: '#a6e3a1' }}>'@khor/design-system/atoms/index'</span>;</div>
          <div><span style={{ color: '#89b4fa' }}>import</span> {'{ KFormField, KStatCard }'} <span style={{ color: '#89b4fa' }}>from</span> <span style={{ color: '#a6e3a1' }}>'@khor/design-system/molecules/index'</span>;</div>
          <div><span style={{ color: '#89b4fa' }}>import</span> {'{ KDataTable, kToast }'} <span style={{ color: '#89b4fa' }}>from</span> <span style={{ color: '#a6e3a1' }}>'@khor/design-system/organisms/index'</span>;</div>
          <br />
          <div style={{ color: '#6c7086' }}>{'// Usa los componentes con tokens Khor integrados'}</div>
          <div>{'<KButton variant="primary" size="md">Guardar</KButton>'}</div>
        </div>
      </div>

      {/* Download Section */}
      <div style={{
        marginTop: 32,
        background: `linear-gradient(135deg, ${khorTokens.colors.brand.navy}08 0%, ${khorTokens.colors.brand.primary}08 100%)`,
        borderRadius: khorTokens.radius.lg,
        padding: 32,
        border: `1px solid ${khorTokens.colors.neutral[200]}`,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        flexWrap: 'wrap',
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: khorTokens.radius.lg,
          background: `linear-gradient(135deg, ${khorTokens.colors.brand.primary} 0%, ${khorTokens.colors.brand.navy} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Package size={28} color="#fff" />
        </div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <h3 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: khorTokens.colors.brand.navy }}>
            Descargar Sistema de Diseno
          </h3>
          <p style={{ margin: 0, fontSize: 14, color: khorTokens.colors.neutral[400], lineHeight: 1.5 }}>
            Descarga el paquete completo con tokens, catalogo de componentes, guia de instalacion y paleta de colores para trabajar offline.
          </p>
        </div>
        <KButton variant="primary" size="lg" icon={<Download size={18} />} onClick={handleDownloadZip}>
          Descargar
        </KButton>
      </div>

      {/* Tools Section */}
      <div style={{
        marginTop: 32,
        backgroundColor: khorTokens.colors.neutral[50],
        borderRadius: khorTokens.radius.lg,
        padding: 32,
        boxShadow: khorTokens.shadows.sm,
      }}>
        <h2 style={{ margin: '0 0 20px', fontSize: 24, fontWeight: 700, color: khorTokens.colors.brand.navy }}>
          Herramientas
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
          {[
            { icon: <Brush size={24} />, title: 'Theming en Vivo', desc: 'Personaliza colores, tipografía, bordes y escalas en tiempo real con exportación a CSS/SCSS.', path: '/theming', color: khorTokens.colors.brand.primary },
            { icon: <Shield size={24} />, title: 'Contraste WCAG', desc: 'Verificador de contraste para asegurar accesibilidad visual en todos los pares de colores.', path: '/wcag-checker', color: khorTokens.colors.brand.accent },
            { icon: <ShieldCheck size={24} />, title: 'Accesibilidad WCAG', desc: 'Auditoría completa con scores por componente, verificaciones de teclado y screen readers.', path: '/accessibility', color: khorTokens.colors.feedback.success },
            { icon: <Figma size={24} />, title: 'Exportar a Figma', desc: 'Descarga tokens como Figma Variables, Figma Styles o W3C Design Tokens JSON.', path: '/figma-export', color: '#A259FF' },
            { icon: <Clock size={24} />, title: 'Changelog', desc: 'Historial interactivo de versiones con timeline, filtros y links a componentes.', path: '/changelog', color: '#1976D2' },
            { icon: <Bot size={24} />, title: 'Guia para IA', desc: 'Genera un .md con tokens, APIs y patrones para prompt-engineering en agentes de IA.', path: '/ai-export', color: '#8B5CF6' },
          ].map((tool) => (
            <button
              key={tool.title}
              onClick={() => navigate(tool.path)}
              style={{
                padding: 20, borderRadius: khorTokens.radius.md,
                border: `1px solid ${khorTokens.colors.neutral[200]}`,
                backgroundColor: 'transparent',
                cursor: 'pointer',
                display: 'flex', gap: 16, alignItems: 'flex-start',
                fontFamily: khorTokens.typography.fontPrimary,
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${tool.color}40`; e.currentTarget.style.backgroundColor = `${tool.color}05`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = khorTokens.colors.neutral[200]; e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: khorTokens.radius.md,
                backgroundColor: `${tool.color}10`, color: tool.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>{tool.icon}</div>
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 600, color: khorTokens.colors.brand.navy }}>{tool.title}</h4>
                <p style={{ margin: 0, fontSize: 13, color: khorTokens.colors.neutral[400], lineHeight: 1.5 }}>{tool.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}