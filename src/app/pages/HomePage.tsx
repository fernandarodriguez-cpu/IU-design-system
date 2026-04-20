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
import { KButton, KText, KBadge, KTag } from '../components/design-system/atoms/index';
import { KStatCard } from '../components/design-system/molecules/index';
import { kToast, KCardSection } from '../components/design-system/organisms/index';
import { khorTokens } from '../theme/khor-theme';

import { generateMarkdown, defaultSections } from './AIExportPage';
// Removed hardcoded stats as they are now being moved to the sidebar counters.

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
pnpm add tailwindcss @tailwindcss/vite## Arquitectura V4.1.0 (Elite SaaS)
Khor v4.1.0 ha alcanzado la madurez total, integrando tokens de Layout, Z-Index y Motion para construcción de aplicaciones complejas.
- **UI Core:** Radix UI Primitives (Headless)
- **Styling:** Tailwind CSS v4 + Khor Design Tokens
- **Atomic Engine:** 100% Technical Parity with Figma/Penpot

## Estructura

\`\`\`
khor-design-system/
├── theme/
│   └── khor-theme.ts        ← Tokens de diseño (v4.1.0)
├── atoms/
│   └── index.tsx            ← 32 átomos auditados
├── molecules/
│   └── index.tsx            ← 33 moléculas auditadas
├── organisms/
│   └── index.tsx            ← 24 organismos auditados
├── patterns/
│   └── index.ts             ← 11 patrones SaaS de alta fidelidad
└── README.md
\`\`\`

## Uso Básico

\`\`\`tsx
import { KButton, KInput, KBadge } from './atoms';
import { KFormField, KStatCard } from './molecules';
import { KDataTable, kToast } from './organisms';
import { SidebarPattern, DashboardStatsPattern } from './patterns';
\`\`\`

## Colores de Marca y Feedback

| Token     | Hex       | Uso                         |
|-----------|-----------|------------------------------|
| Primary   | #E04D36   | CTAs, acciones principales   |
| Secondary | #051758   | Sidebar, títulos, navegación |
| Accent    | #FF9500   | Warnings, destacados         |
| Success   | #2E7D32   | Estados positivos            |
| Error     | #D32F2F   | Estados críticos             |

## Componentes

### Átomos (32)
KAffix, KAlert, KAvatar, KAvatarGroup, KBadge, KButton, KButtonGroup, KCheckbox, KCheckableTag, KCol, KDivider, KFlex, KFloatButton, KImage, KInput, KInputPassword, KInputSearch, KProgress, KQRCode, KRadio, KRate, KRow, KSkeleton, KSlider, KSpace, KSpin, KSwitch, KTag, KTextArea, KTooltip, KTypography, KWatermark

### Moléculas (33)
KAccordion, KAnchor, KAutocomplete, KBreadcrumb, KCascader, KColorPicker, KDatePicker, KDateRangePicker, KDescriptions, KDividerExtended, KDropdownMenu, KEmptyState, KFormField, KInputNumber, KList, KMentions, KNavItem, KPopconfirm, KPopover, KResult, KSearchInput, KSegmented, KSelectAdvanced, KSelectField, KStatCard, KStatistic, KSteps, KTimeline, KTimePicker, KTransfer, KTreeSelect, KUserCell

### Organismos (24)
KCalendar, KCardSection, KCarousel, KCommandBar, KDataTable, KDrawer, KForm, KFormItem, KFormList, KLoginForm, KModal, KModalConfirm, KNotification, KMessage, KPagination, KSparklineCell, KTabs, kToast, KToastProvider, KTour, KTree, KUpload, kNotification, kMessage

### Patrones Modulares (11)
DashboardStatsPattern, FormValidationPattern, FilterableListPattern, LoginFormPattern, PaginatedTablePattern, WizardPattern, SettingsPattern, SidebarPattern, AdvancedFiltersPattern, BillingPattern, SaaSLoginPattern
bleListPattern, LoginFormPattern, PaginatedTablePattern, WizardPattern, SettingsPattern, SidebarPattern
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

  // Compile AI System Prompt
  ds.file('ai_system_prompt.txt', generateMarkdown(defaultSections));

  // Generate ZIP and download
  const blob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'khor-design-system-v4.1.0.zip';
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <KTag color="volcano">v4.1.0 Elite</KTag>
            <KTag color="volcano">SaaS Architecture</KTag>
            <KTag color="#FF9500">ADV01: High-Fidelity</KTag>
            <KTag color="volcano">IA Guide Ready</KTag>
          </div>
          <h1 style={{ margin: '0 0 12px', fontSize: 38, fontWeight: 700, color: '#fff' }}>
            Khor Design System
          </h1>
          <p style={{ margin: '0 0 24px', fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 600, lineHeight: 1.6 }}>
            La fuente unica de verdad para construir aplicaciones SaaS y moviles con una experiencia de usuario excepcional y desarrollo agil.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <KButton
              variant="primary"
              onClick={() => navigate('/atoms/button')}
              icon={<ArrowRight size={16} />}
              iconPosition="end"
            >
              Explorar Componentes
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
      {/* Stats section removed in favor of Sidebar counters for a cleaner "Discovery" experience */}

      {/* Principles */}
      <KCardSection
        title="Principios del Sistema"
        className="mb-8"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {principles.map((p) => (
            <div key={p.title} style={{
              padding: 24,
              borderRadius: khorTokens.radius.md,
              border: `1px solid ${khorTokens.colors.neutral[200]}`,
              display: 'flex',
              gap: 16,
              alignItems: 'flex-start',
              transition: 'all 0.2s ease',
              backgroundColor: 'var(--card)',
            }}>
              <div style={{
                width: 48,
                height: 48,
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
                <h4 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: khorTokens.colors.brand.navy }}>{p.title}</h4>
                <p style={{ margin: 0, fontSize: 13, color: khorTokens.colors.neutral[400], lineHeight: 1.6 }}>{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </KCardSection>


      {/* Quick Start */}
      <KCardSection title="Inicio Rápido" className="mb-8">
        <div style={{
          backgroundColor: '#1e1e2e',
          borderRadius: khorTokens.radius.md,
          padding: 24,
          color: '#cdd6f4',
          fontSize: 13,
          fontFamily: "'Plus Jakarta Sans', monospace",
          lineHeight: 1.8,
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
        }}>
          <div><span style={{ color: '#89b4fa' }}>import</span> {'{ KButton, KInput, KBadge }'} <span style={{ color: '#89b4fa' }}>from</span> <span style={{ color: '#a6e3a1' }}>'@khor/design-system/atoms'</span>;</div>
          <div><span style={{ color: '#89b4fa' }}>import</span> {'{ KFormField, KStatCard }'} <span style={{ color: '#89b4fa' }}>from</span> <span style={{ color: '#a6e3a1' }}>'@khor/design-system/molecules'</span>;</div>
          <div><span style={{ color: '#89b4fa' }}>import</span> {'{ KDataTable, kToast }'} <span style={{ color: '#89b4fa' }}>from</span> <span style={{ color: '#a6e3a1' }}>'@khor/design-system/organisms'</span>;</div>
          <br />
          <div style={{ color: '#6c7086' }}>{'// Usa los componentes con tokens Khor integrados'}</div>
          <div>{'<KButton variant="primary" size="md">Guardar</KButton>'}</div>
        </div>
      </KCardSection>


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
      <KCardSection title="Herramientas">
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
                backgroundColor: 'var(--card)',
                cursor: 'pointer',
                display: 'flex', gap: 16, alignItems: 'flex-start',
                fontFamily: khorTokens.typography.fontPrimary,
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: 'var(--khor-shadow-sm)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${tool.color}60`;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = 'var(--khor-shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = khorTokens.colors.neutral[200];
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--khor-shadow-sm)';
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: khorTokens.radius.md,
                backgroundColor: `${tool.color}10`, color: tool.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>{tool.icon}</div>
              <div>
                <h4 style={{ margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: khorTokens.colors.brand.navy }}>{tool.title}</h4>
                <p style={{ margin: 0, fontSize: 13, color: khorTokens.colors.neutral[400], lineHeight: 1.5 }}>{tool.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </KCardSection>
    </div>
  );
}