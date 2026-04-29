import{j as e}from"./vendor-ui-DIwXcyFn.js";import{r as h}from"./vendor-react-qxSCTQlm.js";import{u as w,h as B,v as I,b as k,g as P,p as R,i as v}from"./index-DFtbdt_C.js";import{K as z,a as L}from"./AtomsPage-DdVyH3EK.js";import{molecules as U}from"./MoleculesPage-DXOj-7_8.js";import{organisms as M}from"./OrganismsPage-Cs9jMmJG.js";import{al as N,aH as $,aG as S,q as O,Z as G,u as q,C as A,a as F,d as W,e as H,i as V,k as _,aI as X}from"./vendor-icons-C7ulT-u7.js";import"./vendor-charts-DQ39u6k0.js";import"./ComponentDoc-CvuHqVTD.js";import"./CodeBlock-DqkoeIXy.js";import"./index-B4_qytUN.js";import"./es-Cd5y1Rzp.js";const n=B,Z="5.0.0-alpha",J=[{id:"header",label:"Encabezado y contexto",description:"Nombre, versión, stack tecnológico y propósito del sistema.",enabled:!0},{id:"tokens",label:"Design Tokens",description:"Charts elite, Forms semánticos, Icon scale, Colores, Tipografía, etc.",enabled:!0},{id:"darkmode",label:"Dark Mode",description:"Inversión semántica y tokens alternativos para modo oscuro.",enabled:!0},{id:"atoms",label:"Átomos (30)",description:"API completa de 30 átomos: Sistema v5.0 optimizado.",enabled:!0},{id:"molecules",label:"Moléculas (33)",description:"API completa de 33 moléculas coordinadas con el sistema Elite.",enabled:!0},{id:"organisms",label:"Organismos (15)",description:"Componentes complejos coordinados con el sistema Elite.",enabled:!0},{id:"templates",label:"Templates y Patrones",description:"Patrones de página: Dashboard Admin, CRUD Elite, Login SaaS, etc.",enabled:!0},{id:"layout",label:"Layout (AppShell)",description:"Estructura sidebar + header + canvas con dimensiones Elite.",enabled:!0},{id:"patterns",label:"Patrones y Convenciones",description:"3-Layer Architecture, Fluid Typography, Naming, A11y.",enabled:!0},{id:"examples",label:"Ejemplos de Código",description:"Snippets listos para copiar/pegar de casos de uso comunes.",enabled:!0}];function Q(b,a){const l=new Set(b.filter(d=>d.enabled).map(d=>d.id)),i=[],f=new Date().toLocaleDateString("es-MX",{year:"numeric",month:"long",day:"numeric"});l.has("header")&&i.push(`
# Sistema de Diseño Khor v${Z}
Generado el: ${f}

Este documento es la única fuente de verdad para el desarrollo en el ecosistema Khor. Úsalo como contexto para que la IA genere código consistente, accesible y alineado con la marca.

## 🤖 Instrucciones Críticas para la IA (System Prompt)

Como IA, DEBES seguir estas reglas estrictamente al generar código:
1. **Identidad Visual:** NUNCA importes ni uses componentes directamente desde \`antd\`, \`@ant-design/*\`, Material UI o similares. Usa exclusivamente los componentes del sistema (prefijo \`K\`).
2. **Uso de Tokens (Prohibido Hardcode):** NUNCA uses colores hexadecimales. Usa SIEMPRE los Design Tokens (\`khorTokens\`) o CSS Variables (\`var(--khor-*)\`).
3. **Componentes Khor:** Ejemplo: \`KButton\`, \`KIcon\`, \`KCardSection\`.
4. **Iconografía:** Usa únicamente el componente \`KIcon\` (wrapper de Lucide). NO importes iconos directamente de lucide-react si existe \`KIcon\`.
5. **Layout:** Usa Tailwind CSS SOLO para el layout (grid, flex, spacing) y clases de utilidad de Khor.
6. **Lovable/v0 Context:** Usa los **Page Recipes** para acelerar la construcción y garantizar consistencia.

### ♿ Reglas Estrictas de Accesibilidad (A11y)
1. **Roles interactivos:** NUNCA uses \`onClick\` en elementos no interactivos (\`div\`). Usa siempre \`<KButton>\`.
2. **Atributos ARIA:** Todo elemento sin texto visible DEBE tener un \`aria-label\`.
3. **Movimiento reducido:** Nunca agregues animaciones CSS o JS sin verificar que el sistema respeta \`prefers-reduced-motion\`. Usa siempre los tokens de motion de Khor (\`--khor-duration-*\`, \`--khor-easing-*\`).

### 🏗️ Arquitectura de 3 Capas (World-Class Standard)
El sistema Khor se organiza en 3 capas de tokens:
1. **Layer 1: Primitives:** Valores base inmutables (ej. \`--khor-primary-500\`, \`--khor-space-4\`).
2. **Layer 2: Semantics:** Alias basados en intención (\`--khor-text-primary\`, \`--khor-surface-card\`). **ÚSALOS SIEMPRE.**
3. **Layer 3: Components/Contextual:** Overrides para áreas específicas (\`--khor-context-sidebar-bg\`, \`--khor-grid-header-bg\`).

### 🧠 Semantic Intent Mapping (v5.0 Strategy)
Como IA, DEBES elegir componentes basados en la **Intención Semántica** del flujo, no solo por estética:

| Intent | Pattern / Component Requerido | Gravedad |
|--------|------------------------------|----------|
| \`critical_confirmation\` | \`KModal\` (Confirm) + \`KButton\` (Danger) | Alta |
| \`data_massive_explorer\` | \`KDataGrid\` (con virtualización activa) | Alta |
| \`step_by_step_flow\` | \`KFormWizard\` | Media |
| \`brand_call_to_action\` | \`KButton\` (Primary) + \`KIcon\` (Sparkles) | Baja |
| \`system_feedback_error\` | \`KMessage\` (Error) o \`KResult\` (500/403) | Alta |

### 🔠 Fluid Typography (Responsive by Design)
Khor v5.0 usa tipografía fluida basada en \`clamp()\`. NO sobrescribas tamaños de fuente con media queries. Usa los tokens semánticos:
- \`display-2xl\`, \`display-xl\`: Para títulos de gran impacto (Fluid 48px -> 72px).
- \`heading-lg\` a \`heading-xs\`: Para jerarquía de contenido (Fluid 24px -> 48px).
- \`body-xl\`, \`body-lg\`, \`body-md\`, \`body-sm\`: Para lectura estandarizada.
`),l.has("tokens")&&i.push(`
## 🎨 Especificación Técnica de Tokens (Elite SaaS Architecture)

La IA DEBE usar estos valores exactos:

\`\`\`css
:root {
  /* Elite Charts Palette (12 Colores) */
  --khor-chart-primary: ${a.primary};   --khor-chart-secondary: ${a.secondary};
  --khor-chart-accent: ${a.accent};    --khor-chart-success: ${a.success};
  --khor-chart-error: ${a.error};     --khor-chart-info: ${a.info};
  --khor-chart-teal: #008080;      --khor-chart-purple: #9C27B0;
  --khor-chart-pink: #E91E63;      --khor-chart-cyan: #00BCD4;
  --khor-chart-amber: #FFC107;     --khor-chart-gray: #9E9E9E;

  /* Neutrals (Full Slate-Blue Scale) */
  --khor-neutral-50: #f8faff;   --khor-neutral-100: #edf0f1;
  --khor-neutral-200: #d5dbe0;  --khor-neutral-300: #a0aec0;
  --khor-neutral-400: #718096;  --khor-neutral-500: #4a5568;
  --khor-neutral-600: #5A6475;  --khor-neutral-700: #3D4552;
  --khor-neutral-800: #252C38;  --khor-neutral-900: #000000;

  /* Form Validation Semantic States */
  --khor-form-error-bg: ${a.error}15;   --khor-form-error-border: ${a.error};   --khor-form-error-text: ${a.error};
  --khor-form-success-bg: ${a.success}15; --khor-form-success-border: ${a.success}; --khor-form-success-text: ${a.success};
  --khor-form-warning-bg: ${a.warning}15; --khor-form-warning-border: ${a.warning}; --khor-form-warning-text: ${a.warning};
  --khor-form-focus-ring: ${a.primary};

  /* Semantic Layer 2: Actions */
  --khor-action-primary-default: ${a.primary}; --khor-action-primary-hover: #e8644f;
  --khor-action-secondary-default: ${a.secondary}; --khor-action-secondary-hover: #0a2270;
  --khor-action-danger-default: ${a.error}; --khor-action-danger-hover: #B71C1C;
  --khor-action-ghost-hover: rgba(5, 23, 88, 0.06);
  --khor-action-disabled-bg: #EDF0F1; --khor-action-disabled-text: #A0AEC0;

  /* Semantic Layer 2: Surface & Overlay (Interactive Ref) */
  --khor-surface-page: #f8faff; --khor-surface-card: #ffffff;
  --khor-surface-hover: rgba(5, 23, 88, 0.04); --khor-surface-pressed: rgba(5, 23, 88, 0.08);
  --khor-surface-selected: ${a.primary}15; --khor-surface-subtle: #F4F6F8;
  --khor-surface-overlay: #ffffff; --khor-overlay-bg: rgba(255, 255, 255, 0.95);

  /* Layer 3: Contextual Tokens — secciones invertidas */
  --khor-context-sidebar-bg:        var(--khor-navy);
  --khor-context-sidebar-text:      var(--khor-neutral-50);
  --khor-context-sidebar-text-muted:rgba(255, 255, 255, 0.55);
  --khor-context-sidebar-border:    rgba(255, 255, 255, 0.08);
  --khor-context-sidebar-hover:     rgba(255, 255, 255, 0.10);
  --khor-context-sidebar-active:    rgba(255, 255, 255, 0.15);
  --khor-context-header-bg:         var(--khor-surface-card);
  --khor-context-header-border:     var(--khor-border-default);

  /* Semantic Layer 2: Borders */
  --khor-border-default: #D5DBE0; --khor-border-muted: #EDF0F1;
  --khor-border-strong: #A0AEC0; --khor-border-focus: ${a.primary};
  --khor-border-error: ${a.error}; --khor-border-disabled: #EDF0F1;
  --khor-focus-ring-color: ${a.primary}; --khor-focus-ring-width: 2px;
  --khor-focus-ring-offset: 2px; --khor-focus-ring-style: solid;

  /* Semantic Layer 2: Typography */
  --khor-text-primary: ${a.secondary}; --khor-text-secondary: #475a8f;
  --khor-text-muted: #94a9d8; --khor-text-disabled: #A0AEC0; --khor-text-on-action: #ffffff;

  /* Motion Tokens (v4.3) */
  --khor-duration-instant: 80ms; --khor-duration-fast: 100ms;
  --khor-duration-normal: 200ms; --khor-duration-slow: 400ms;
  --khor-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --khor-easing-enter: cubic-bezier(0, 0, 0.2, 1);
  --khor-easing-exit: cubic-bezier(0.4, 0, 1, 1);

  /* Elevation Tokens (Semantic Level 0-5) */
  --khor-elevation-0: none;
  --khor-elevation-1: 0 1px 3px rgba(5, 23, 88, 0.06), 0 1px 2px rgba(5, 23, 88, 0.04);
  --khor-elevation-2: 0 4px 12px rgba(5, 23, 88, 0.08), 0 2px 4px rgba(5, 23, 88, 0.05);
  --khor-elevation-3: 0 8px 24px rgba(5, 23, 88, 0.10), 0 4px 8px rgba(5, 23, 88, 0.06);
  --khor-elevation-4: 0 16px 48px rgba(5, 23, 88, 0.14), 0 8px 16px rgba(5, 23, 88, 0.08);
  --khor-elevation-5: 0 24px 64px rgba(5, 23, 88, 0.18), 0 12px 24px rgba(5, 23, 88, 0.10);

  /* Semantic Spacing Tokens (Aliases) */
  --khor-space-layout-xs: 16px; --khor-space-layout-sm: 24px;
  --khor-space-layout-md: 32px; --khor-space-layout-lg: 48px;
  --khor-space-layout-xl: 64px;
  --khor-space-component-xs: 4px; --khor-space-component-sm: 8px;
  --khor-space-component-md: 12px; --khor-space-component-lg: 16px;
}
\`\`\`

### ♿ Accesibilidad Global: Reduced Motion
El sistema respeta las preferencias del usuario. **Regla Obligatoria:** Implementar este bloque en el CSS base:

\`\`\`css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Alto contraste — WCAG AAA Readiness */
@media (prefers-contrast: more) {
  :root {
    --khor-focus-ring-color: #000000;
    --khor-focus-ring-width: 3px;
    --khor-focus-ring-offset: 3px;
    --khor-border-default: #000000;
    --khor-text-secondary: #051758;
    --khor-text-muted: #475a8f;
  }
}
\`\`\`

### 📏 Sistema de Densidad (Full Specification)
La IA debe aplicar estas clases al contenedor raíz para heredar el modelo de caja correcto:

\`\`\`css
/* COMPACT — dashboards con datos masivos */
.khor-compact {
  --khor-density-spacing-xs: 2px; --khor-density-spacing-sm: 4px;
  --khor-density-spacing-md: 8px; --khor-density-spacing-lg: 12px;
  --khor-density-height-input: 28px; --khor-density-height-row: 32px;
  --khor-density-font-body: 12px; --khor-density-font-label: 11px;
  --khor-density-radius: 6px;
}

/* COMFORTABLE — onboarding, formularios críticos */
.khor-comfortable {
  --khor-density-spacing-xs: 6px; --khor-density-spacing-sm: 12px;
  --khor-density-spacing-md: 24px; --khor-density-spacing-lg: 40px;
  --khor-density-height-input: 48px; --khor-density-height-row: 60px;
  --khor-density-font-body: 16px; --khor-density-font-label: 14px;
  --khor-density-radius: 10px;
}
\`\`\`

### 🎨 Detalle Analítico de Tokens Elite (Layer 2)

| Categoría | Token | Uso |
|-----------|-------|-----|
| **Surface** | \`surface-page\` | Fondo principal de la aplicación |
| **Surface** | \`surface-card\` | Fondo de contenedores y secciones |
| **Action** | \`action-primary\` | Botones principales y CTAs |
| **Action** | \`action-primary-hover\` | Estado hover de botones principales |
| **Border** | \`border-focus\` | Anillo de accesibilidad (Focus Ring) |
| **Border** | \`border-error\` | Bordes de validación fallida |

### ♿ Tabla de Contraste WCAG 2.1 (Pares Certificados)
*IA: Usa solo estas combinaciones. Las marcadas con ⚠️ son solo para uso decorativo.*

| Fondo | Texto | Ratio | WCAG | Nota |
|-------|-------|-------|------|------|
| \`surface-card\` (#FFF) | \`text-primary\` (#051758) | 16.2:1 | **AAA** | Texto principal |
| \`surface-card\` (#FFF) | \`text-secondary\` (#475A8F) | 6.8:1 | **AA** | Texto secundario |
| \`action-primary\` (#E04D36) | \`text-on-action\` (#FFF) | 4.8:1 | **AA** | Texto sobre botón |
| \`surface-card\` (#FFF) | \`error\` (#D32F2F) | 5.1:1 | **AA** | Textos de error |
| \`surface-card\` (#FFF) | \`neutral-400\` (#718096) | 4.6:1 | **AA** | Texto secundario OK |
| \`surface-card\` (#FFF) | \`neutral-300\` (#A0AEC0) | 2.8:1 | ⚠️ **FAIL** | Solo decorativo |
| \`surface-card\` (#FFF) | \`accent\` (#FF9500) | 2.5:1 | ⚠️ **FAIL** | Solo iconos ≥24px |
| \`navy\` (#051758) | \`neutral-50\` (#FFF) | 17.5:1 | **AAA** | Sidebar / Invertido |
| \`navy\` (#051758) | \`accent\` (#FF9500) | 7.1:1 | **AAA** | Badges en sidebar OK |

### ♿ Alto Contraste (WCAG AAA Readiness)
Cuando \`prefers-contrast: more\` está activo, el sistema aplica:
- \`focus-ring-width\`: 3px
- \`focus-ring-offset\`: 3px
- \`text-secondary\` elevado a ratio 7:1+ (AAA)

### 📊 Dark Mode Feedback (SaaS Recovery)
| Token | Light | Dark (Audit v4.2 Fix) |
|-------|-------|------------------------|
| success-light | #E8F5E9 | #1B3A1C |
| error-light | #FFEBEE | #3B1212 |
| warning-light | #FFF3E0 | #3B2500 |
| info-light | #E3F2FD | #0D1F3C |

### 📜 Gobernanza y Contribución (Khor Elite Standards)
El sistema sigue estándares estrictos para mantener la paridad IA/Humanos.
1. **Prefijo K:** Todo componente debe empezar con "K" (ej. \`KButton\`).
2. **Cero Dependencias:** Prohibido instalar librerías de UI externas (MUI, AntD).
3. **Capa Semántica 2:** Priorizar \`action-primary-default\` sobre colores base.
4. **Metadata IA:** Todo componente nuevo debe incluir \`a11ySummary\` y \`aiNotes\` en su registro.
5. **Checklist:** Props tipadas, Soporte Dark Mode, Soporte Densidad.

### Elevación — Guía de uso obligatoria

| Nivel | Token | Componentes |
|-------|-------|-------------|
| 0 | \`--khor-elevation-0\` | Elementos inline, sin elevación |
| 1 | \`--khor-elevation-1\` | KCardSection, KStatCard, KTable |
| 2 | \`--khor-elevation-2\` | KDropdown, KTooltip, KPopconfirm |
| 3 | \`--khor-elevation-3\` | KDrawer, KSidesheet, KAffix activo |
| 4 | \`--khor-elevation-4\` | KModal, KDialog |
| 5 | \`--khor-elevation-5\` | KToast, KNotification flotante |

### Architecture Layers (v4.3.0)
- **Breakpoints:** \`sm: 640px\`, \`md: 768px\`, \`lg: 1024px\`, \`xl: 1280px\`.
- **Z-Index:** \`dropdown: 1000\`, \`modal: 1400\`, \`toast: 1700\`.
- **Motion:** \`standard: cubic-bezier(0.4, 0, 0.2, 1)\`, \`spring: cubic-bezier(0.175, 0.885, 0.32, 1.275)\`.
- **Reduced Motion:** El sistema respeta \`prefers-reduced-motion\` globalmente.

### Registro de Cambios (Changelog)

| Versión | Fecha | Cambios |
|---------|-------|---------|
| **v5.0.0-alpha** | ${f} | **The World-Class Foundation:** Migración total a arquitectura W3C Design Tokens, tipografía fluida, KDataGrid empresarial, Command Palette con acciones, KFormWizard y testing con Playwright. |
| **v4.4.1** | ${f} | **KQA God Mode:** Sincronización de más de 20 organismos y moléculas con estados explícitos y Layer 3 Contextual Tokens. Nuevo script de auditoría y Patrones Maestros. |
| **v4.4.0** | 27 Abr 2026 | **Industry Reference:** Inyección de tokens de superficie interactiva, elevación semántica (0-5) y escala de neutros completa (600-800). |
| **v4.3.1** | 24 Abr 2026 | **The Absolute 100:** Cierre definitivo de gaps de motion (easing enter/exit). |
| **v4.3.0** | 24 Abr 2026 | **The 100/100 Audit:** Sincronización total de paridad técnica y documental. |
| **v4.2.0** | 23 Abr 2026 | **Audit Recovery:** Restauración de Tokens Semánticos de 2ª Capa y Sistema de Densidad base. |
| **v4.1.1** | 20 Abr 2026 | **Refinement Phase:** Integración de Chart Palette (12), Form States detallados y nuevo sistema de Iconografía estandarizado (XS-2XL). |
| **v5.0.0-alpha** | 10 Abr 2026 | **Elite Upgrade:** Introducción de Layout Tokens, Z-Index Scale y Page Recipes. |

---`),l.has("darkmode")&&i.push("\n## Dark Mode\n\nEl sistema soporta modo oscuro via clase `.dark` en `<html>`. Se activa con `useTheme()` del `ThemeProvider`.\n\n### Tokens Oscuros (principales cambios)\n\n| Token | Light | Dark |\n|-------|-------|------|\n| neutral-50 | `#FFFFFF` | `#1A1B2E` |\n| neutral-100 | `#EDF0F1` | `#22243A` |\n| neutral-200 | `#D5DBE0` | `#2E3148` |\n| neutral-300 | `#A0AEC0` | `#4A4E6A` |\n| neutral-400 | `#718096` | `#8B90A8` |\n| neutral-500 | `#4A5568` | `#B0B4C8` |\n| neutral-600 | `#5A6475` | `#9BA3B5` |\n| neutral-700 | `#3D4552` | `#B8BDC8` |\n| neutral-800 | `#252C38` | `#D0D3DA` |\n| neutral-900 | `#000000` | `#E8EAF0` |\n| accent | `#FF9500` | `#FFB340` |\n| navy | `#051758` | `#8BA3D9` |\n| success | `#2E7D32` | `#4CAF50` |\n| error | `#D32F2F` | `#EF5350` |\n\n### Uso del ThemeProvider\n\n```tsx\nimport { ThemeProvider, useTheme } from './theme/theme-context';\n\n// En el root:\n<ThemeProvider>\n  <App />\n</ThemeProvider>\n\n// En cualquier componente:\nconst { mode, toggle, isDark } = useTheme();\n// mode: 'light' | 'dark'\n// toggle(): cambia el modo\n// isDark: boolean\n```\n\n### Recomendacion para componentes custom\n\nUsa `var(--khor-*)` en vez de valores hardcoded para que respondan al cambio de tema:\n```tsx\n// MAL:\nstyle={{ backgroundColor: '#FFFFFF', color: '#000000' }}\n\n// BIEN:\nstyle={{ backgroundColor: 'var(--card)', color: 'var(--foreground)' }}\n```\n\n---");const u=(d,g,y,x)=>{const c=Object.keys(x);let s=`## ${d} (${c.length} componentes)

${g}
Importar desde: \`${y}\`

`;return c.forEach(C=>{const r=x[C];s+=`### ${r.name}
${r.description}

`,r.aiNotes&&(s+=`> **Directrices IA**: ${r.aiNotes}

`),r.a11ySummary&&(s+=`**Accesibilidad (ARIA & Keyboard - Score: ${r.a11ySummary.score}/100)**
`,s+=`- **Keyboard:** ${r.a11ySummary.keyboard.join(" ")}
`,s+=`- **ARIA:** ${r.a11ySummary.aria.join(" ")}
`,s+=`- **Contraste:** ${r.a11ySummary.contrast}

`),r.props&&r.props.length>0&&(s+=`**Props Principales:**
`,s+=`| Prop | Tipo | Requerido | Default | Descripcion |
`,s+=`|------|------|-----------|---------|-------------|
`,r.props.forEach(p=>{s+=`| \`${p.name}\` | \`${p.type}\` | ${p.required?"Si":"No"} | ${p.default?`\`${p.default}\``:"-"} | ${p.description} |
`}),s+=`
`),r.code&&(s+=`**Ejemplo de Uso:**
\`\`\`tsx
${r.code}
\`\`\`

`),r.guidelines&&r.guidelines.length>0&&(s+=`**Guidelines UX:**
`,r.guidelines.forEach(p=>{s+=`- ${p}
`}),s+=`
`),s+=`---

`}),s};return l.has("atoms")&&i.push(u("Átomos","Unidades indivisibles y fundamentales.","import { KButton } from '@khor/design-system/atoms/index'",L)),l.has("molecules")&&i.push(u("Moléculas","Combinaciones de átomos con lógica de forma reutilizable.","import { KFormField } from '@khor/design-system/molecules/index'",U)),l.has("organisms")&&i.push(u("Organismos","Componentes complejos o Layouts masivos con lógicas de portal, focus-traps y alto consumo de hooks.","import { KDataTable } from '@khor/design-system/organisms/index'",M)),l.has("templates")&&i.push(`
## 🏗️ Elite Page Recipes (High-Fidelity Patterns)

La IA debe usar estos "Blueprints" estructurales para construir páginas completas con un solo prompt.

### 1. KAppShell (Estructura Base de la Aplicación)
Estructura responsiva con Sidebar colapsable y Header fijo.
\`\`\`tsx
import { AppShell } from './components/AppShell';
import { SidebarItem } from './components/Sidebar';
import { Home, Users, Settings, LogOut } from 'lucide-react';

// Úsalo como el Layout principal de tus rutas
function MainLayout() {
  return (
    <AppShell
      sidebarItems={[
        { label: 'Dashboard', icon: <Home />, path: '/', active: true },
        { label: 'Usuarios', icon: <Users />, path: '/users' },
        { label: 'Ajustes', icon: <Settings />, path: '/settings' },
      ]}
      user={{ name: 'Admin User', role: 'Superadmin' }}
      onLogout={() => {}}
    >
      <Outlet /> {/* Contenido inyectado por el router */}
    </AppShell>
  );
}
\`\`\`

### 2. KCRUDPage (Gestión de Datos Elite)
Patrón avanzado para tablas con búsqueda, filtros y Drawer de detalle.
\`\`\`tsx
import { Plus, Edit, Trash2, Filter } from 'lucide-react';
import { KButton, KBadge, KInput } from './atoms';
import { KFormField, KDropdownMenu } from './molecules';
import { KDataTable, KDrawer, KCardSection, kToast } from './organisms';

function UserManagement() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="p-khor-6">
      <div className="flex justify-between items-center mb-khor-6">
        <div>
          <h1 className="text-khor-h2 font-bold text-khor-secondary">Usuarios</h1>
          <p className="text-khor-body-md text-khor-neutral-500">Gestión centralizada de colaboradores.</p>
        </div>
        <KButton variant="primary" icon={<Plus size={16} />}>Añadir Usuario</KButton>
      </div>

      <KCardSection>
        <KDataTable 
          columns={columns} 
          data={data} 
          searchable 
          extra={<KButton variant="ghost" icon={<Filter size={16} />}>Filtros</KButton>}
          onRowClick={(row) => { setSelectedUser(row); setDrawerOpen(true); }}
        />
      </KCardSection>

      <KDrawer 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        title="Detalle del Usuario"
        width={480}
      >
        {selectedUser && <UserDetailView user={selectedUser} />}
      </KDrawer>
    </div>
  );
}
\`\`\`

### 3. KDashboardGrid (Métricas y Visualización)
Grid de alta densidad con StatCards y Chart Palette v5.0.0-alpha.
\`\`\`tsx
import { Users, TrendingUp, DollarSign } from 'lucide-react';
import { KStatCard } from './molecules';
import { KCardSection } from './organisms';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from 'recharts';
import { khorTokens } from './theme/khor-theme';

function DashboardGrid() {
  return (
    <div className="space-y-khor-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-khor-4">
        <KStatCard title="Ventas Totales" value="$12.4k" change={+8.2} icon={<DollarSign />} />
        <KStatCard title="Usuarios Activos" value="2,840" change={+12.5} icon={<Users />} />
        <KStatCard title="Churn Rate" value="1.2%" change={-2.1} icon={<TrendingUp />} />
      </div>

      <KCardSection title="Rendimiento Mensual">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke={khorTokens.colors.neutral[400]} fontSize={12} />
              <Tooltip cursor={{fill: 'rgba(0,0,0,0.05)'}} />
              <Bar dataKey="value" fill="var(--khor-chart-1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </KCardSection>
    </div>
  );
}
\`\`\`

### 4. KAuthLayout (Layout Centrado para Login/Registro)
\`\`\`tsx
function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-khor-secondary p-khor-4">
      <div className="w-full max-w-[420px] bg-white rounded-khor-xl shadow-khor-xl p-khor-8">
        <div className="text-center mb-khor-8">
          <img src="/logo.svg" className="h-khor-10 mx-auto mb-khor-4" />
          <h2 className="text-khor-h3 font-bold text-khor-secondary">Bienvenido a Khor</h2>
          <p className="text-khor-body-sm text-khor-neutral-400">Ingresa tus credenciales</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
\`\`\`

### Convenciones de Paginas
- **Rutas:** Todas las paginas deben estar en \`/src/app/pages\`.
- **Componentes:** Usa exclusivamente componentes Khor para mantener la paridad con Figma y Penpot.
- **Espaciado:** Usa clases \`p-khor-*\`, \`m-khor-*\` o \`gap-khor-*\` basadas en la escala de 4px.
- **Tokens:** Prefiere siempre \`khorTokens\` en JS o las CSS variables directas \`var(--khor-*)\`.

---`),l.has("layout")&&i.push(`
## Layout — AppShell

Estructura principal de la aplicacion con sidebar fijo, header y area de contenido.

\`\`\`
┌─────────────┬──────────────────────────────────┐
│             │  Header (64px, bg-card)          │
│  Sidebar    ├──────────────────────────────────┤
│  (260px)    │                                  │
│  Navy       │  Canvas (bg-background)          │
│  #051758    │  padding: 24px                   │
│             │  max-width: 1100px               │
│  Colapsable │                                  │
│  a 64px     │  <Outlet /> (React Router)       │
│             │                                  │
└─────────────┴──────────────────────────────────┘
\`\`\`

### Dimensiones
- **Sidebar:** 260px expandido, 64px colapsado
- **Header:** 64px de alto
- **Canvas:** padding 24px, max-width 1100px centrado

### Sidebar
- Fondo: Navy (#051758), texto blanco
- Secciones colapsables: Inicio, Tokens, Atomos, Moleculas, Organismos, Templates, Herramientas
- Logo placeholder "K" con bg primary

### Header
- Fondo: var(--card) (responde a dark mode)
- Contiene: titulo, badge version, toggle dark mode (Sol/Luna), buscador (Ctrl+K), badge "IA Ready"

### Routing
\`\`\`tsx
import { createBrowserRouter } from 'react-router'; // NO react-router-dom

const router = createBrowserRouter([
  {
    path: '/',
    Component: AppShell,
    children: [
      { index: true, Component: HomePage },
      { path: 'tokens', Component: TokensPage },
      { path: 'atoms/:id', Component: AtomsPage },
      { path: 'molecules/:id', Component: MoleculesPage },
      { path: 'organisms/:id', Component: OrganismsPage },
      { path: 'templates/:id', Component: TemplatesPage },
      // ... herramientas
    ],
  },
]);
\`\`\`

---`),l.has("patterns")&&(i.push(`
## Patrones y Convenciones

### Naming
- Todos los componentes llevan prefijo \`K\`: KButton, KInput, KDataTable, etc.
- Props siguen camelCase: \`onChange\`, \`showIcon\`, \`pageSize\`.
- Variantes usan union types: \`'primary' | 'secondary' | 'outline'\`.

### Imports
\`\`\`tsx
// Atomos base (18)
import { KButton, KInput, KBadge, KTag, KAvatar, KSwitch, KCheckbox, KRadio,
         KTooltip, KProgress, KText, KDivider, KAlert, KSkeleton, KSlider,
         KRate, KSpin, KTextArea } from './components/design-system/atoms/index';

// Atomos extendidos (9)
import { KButtonGroup, KInputPassword, KInputSearch, KFloatButton,
         KAffix, KSpace, KImage, KWatermark, KQRCode } from './components/design-system/atoms-extended';

// Moleculas base (12)
import { KFormField, KSearchInput, KStatCard, KNavItem, KSelectField,
         KUserCell, KEmptyState, KBreadcrumb, KSteps, KDropdownMenu,
         KPopover, KAccordion } from './components/design-system/molecules/index';

// Moleculas extendidas (10)
import { KInputNumber, KSegmented, KAutocomplete, KDatePicker, KDateRangePicker,
         KSelectAdvanced, KDescriptions, KPopconfirm, KResult, KTimeline } from './components/design-system/molecules-extended';

// Moleculas wave3 (11)
import { KCascader, KStatistic, KTimePicker, KMentions, KColorPicker,
         KAnchor, KList, KTransfer, KDividerExtended, KTreeSelect } from './components/design-system/molecules-wave3';

// Organismos base (8)
import { KDataTable, KModal, KDrawer, KCardSection, KTabs,
         KToastProvider, kToast, KSparklineCell } from './components/design-system/organisms/index';

// Organismos extendidos (5)
import { KUpload, KTree, KTour, KModalConfirm, KFormList } from './components/design-system/organisms-extended';

// Tokens
import { khorTokens } from './theme/khor-theme';

// Iconos (siempre Lucide)
import { Plus, Edit, Trash2, Download, Search, ... } from 'lucide-react';
\`\`\`

### Espaciado consistente
- Gaps entre elementos: \`khorTokens.spacing.sm\` (8px)
- Padding de secciones: \`khorTokens.spacing.lg\` (24px)
- Margin entre secciones: 32px

### Responsive
- Grid: \`gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'\`
- Cards: min-width 280px
- Tablas: scroll horizontal en mobile
- Sidebar: colapsable a 64px

### Accesibilidad
- Todos los componentes interactivos tienen \`aria-label\` o label asociado
- Focus visible con outline khor-primary
- Contraste minimo WCAG AA (4.5:1 para texto normal)
- Navegacion completa por teclado (Tab, Enter, Escape, Flechas)
- No anidar \`<button>\` dentro de \`<button>\` — usar \`<div role="button">\` si es necesario

### Cosas a EVITAR
- NO usar \`antd\`, \`@ant-design/*\`, Material UI, ni Chakra UI
- NO usar \`react-router-dom\` — usar \`react-router\`
- NO usar \`React.Fragment\` con props inválidos (key, className) — usar \`<span>\` o \`<div style={{ display: 'contents' }}>\`
- NO anidar \`<button>\` dentro de \`<button>\`
- NO hardcodear colores — usar tokens o CSS variables
`),R.forEach(d=>{i.push(`
### Patrón Modular: ${d.title}
${d.description}
\`\`\`tsx
${d.code}
\`\`\`
`)}),i.push("---")),l.has("examples")&&i.push(`
## Ejemplos de Codigo

### Pagina CRUD basica
\`\`\`tsx
import { useState } from 'react';
import { Plus, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { KButton, KBadge, KInput } from './atoms';
import { KFormField, KDropdownMenu } from './molecules';
import { KDataTable, KModal, KCardSection, kToast } from './organisms';
import { khorTokens } from './theme/khor-theme';

function UsersPage() {
  const [users, setUsers] = useState([...]);
  const [modalOpen, setModalOpen] = useState(false);

  const columns = [
    { key: 'name', title: 'Nombre', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email' },
    { key: 'status', title: 'Estado', dataIndex: 'status',
      render: (val: string) => <KBadge status={val as any} label={val} /> },
    { key: 'actions', title: '', dataIndex: 'id',
      render: (_, record) => (
        <KDropdownMenu
          trigger={<MoreHorizontal size={16} />}
          items={[
            { label: 'Editar', icon: <Edit size={14} />, onClick: () => handleEdit(record) },
            { label: 'Eliminar', icon: <Trash2 size={14} />, danger: true, onClick: () => handleDelete(record) },
          ]}
        />
      ),
    },
  ];

  return (
    <KCardSection
      title="Usuarios"
      subtitle="Gestiona los usuarios del sistema"
      extra={<KButton variant="primary" icon={<Plus size={16} />} onClick={() => setModalOpen(true)}>Nuevo</KButton>}
    >
      <KDataTable columns={columns} data={users} searchable searchPlaceholder="Buscar usuario..." />

      <KModal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo Usuario"
        footer={<><KButton variant="ghost" onClick={() => setModalOpen(false)}>Cancelar</KButton>
                  <KButton variant="primary" onClick={handleSave}>Guardar</KButton></>}>
        <KFormField label="Nombre" required>
          <KInput placeholder="Nombre completo" />
        </KFormField>
        <KFormField label="Email" required>
          <KInput type="email" placeholder="email@empresa.com" />
        </KFormField>
      </KModal>
    </KCardSection>
  );
}
\`\`\`

### Dashboard con metricas
\`\`\`tsx
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { KStatCard } from './molecules';
import { KCardSection, KTabs } from './organisms';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { khorTokens } from './theme/khor-theme';

function DashboardPage() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 32 }}>
        <KStatCard title="Usuarios" value="1,234" icon={<Users size={20} />}
          change={12.5} changeLabel="vs mes anterior" sparkData={[10, 25, 30, 45, 60, 80]} />
        <KStatCard title="Ingresos" value="$45,678" icon={<DollarSign size={20} />}
          change={-3.2} changeLabel="vs mes anterior" sparkData={[80, 60, 45, 50, 40, 35]} />
      </div>

      <KCardSection title="Tendencias">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={khorTokens.colors.brand.primary} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </KCardSection>
    </div>
  );
}
\`\`\`

### Formulario con validacion
\`\`\`tsx
import { KButton, KInput, KCheckbox } from './atoms';
import { KFormField, KSelectField } from './molecules';
import { kToast } from './organisms';

function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    // Validar...
    kToast({ type: 'success', title: 'Enviado', description: 'Tu mensaje fue enviado correctamente.' });
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 500 }}>
      <KFormField label="Nombre" required error={errors.name}>
        <KInput placeholder="Tu nombre" />
      </KFormField>
      <KFormField label="Email" required error={errors.email}>
        <KInput type="email" placeholder="tu@email.com" />
      </KFormField>
      <KFormField label="Departamento">
        <KSelectField options={[
          { label: 'Ventas', value: 'sales' },
          { label: 'Soporte', value: 'support' },
          { label: 'Ingenieria', value: 'engineering' },
        ]} placeholder="Selecciona..." />
      </KFormField>
      <KCheckbox label="Acepto los terminos y condiciones" />
      <KButton variant="primary" onClick={handleSubmit}>Enviar</KButton>
    </form>
  );
}
\`\`\`
### Patrones de Estado — Page-Level Patterns

#### 1. Empty State (Primera vez / Sin resultados)
Estructura: Ilustración → Título → Descripción → CTA primario.
\`\`\`tsx
<KEmpty
  image={<KIcon name="inbox" size="2xl" color="var(--khor-text-muted)" />}
  title="No hay registros aún"
  description="Crea tu primer registro para comenzar a ver datos aquí."
  extra={<KButton variant="primary">Crear registro</KButton>}
/>
\`\`\`

#### 2. Error State (Fallo de carga)
\`\`\`tsx
<KResult
  status="500"
  title="Error de conexión"
  subTitle="No pudimos cargar la información. Reintenta en unos momentos."
  extra={<KButton variant="primary" onClick={() => window.location.reload()}>Reintentar</KButton>}
/>
\`\`\`

#### 3. Loading State (Skeleton)
\`\`\`tsx
<div className="flex flex-col gap-4">
  <KSkeleton height={40} width="60%" /> {/* Título */}
  <KSkeleton height={44} count={5} />    {/* Filas de tabla */}
</div>
\`\`\`

---
`),i.join(`
`)}function Y(b){return b.split(/\s+/).filter(Boolean).length}function me(){const{themeConfig:b}=w(),[a,l]=h.useState(J),[i,f]=h.useState(!1),[u,d]=h.useState(!0),[g,y]=h.useState(!1),x=h.useRef(null),c=h.useMemo(()=>Q(a,b),[a,b]),s=h.useMemo(()=>Y(c),[c]),C=h.useMemo(()=>c.split(`
`).length,[c]),r=a.filter(o=>o.enabled).length,p=o=>{l(t=>t.map(m=>m.id===o?{...m,enabled:!m.enabled}:m))},T=()=>{const o=new Blob([c],{type:"text/markdown;charset=utf-8"}),t=URL.createObjectURL(o),m=document.createElement("a");m.href=t,m.download="khor-design-system-ai-guide.md",document.body.appendChild(m),m.click(),document.body.removeChild(m),URL.revokeObjectURL(t),v({type:"success",title:"Descarga iniciada",description:"khor-design-system-ai-guide.md descargado."})},K=async()=>{let o=!1;try{await navigator.clipboard.writeText(c),o=!0}catch{try{const t=document.createElement("textarea");t.value=c,t.style.position="fixed",t.style.left="-9999px",t.style.top="-9999px",t.style.opacity="0",document.body.appendChild(t),t.focus(),t.select(),o=document.execCommand("copy"),document.body.removeChild(t)}catch{o=!1}}o?(f(!0),v({type:"success",title:"Copiado",description:"Todo el markdown fue copiado al portapapeles."}),setTimeout(()=>f(!1),2e3)):(v({type:"warning",title:"No se pudo copiar automaticamente",description:'Usa el boton "Seleccionar todo" en la vista previa y copia manualmente con Ctrl+C / Cmd+C.'}),d(!0),y(!0))},E=()=>{if(x.current){const o=document.createRange();o.selectNodeContents(x.current);const t=window.getSelection();t&&(t.removeAllRanges(),t.addRange(o)),v({type:"info",title:"Texto seleccionado",description:"Ahora presiona Ctrl+C (o Cmd+C) para copiar."})}},D=()=>l(o=>o.map(t=>({...t,enabled:!0}))),j=()=>l(o=>o.map(t=>({...t,enabled:!1})));return e.jsxs("div",{style:{fontFamily:n.typography.fontPrimary},children:[e.jsx("div",{style:{marginBottom:32},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:12,marginBottom:8},children:[e.jsx("div",{style:{width:44,height:44,borderRadius:n.radius.md,background:"linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(N,{size:24,color:"#fff"})}),e.jsxs("div",{children:[e.jsx("h1",{style:{margin:0,fontSize:28,color:"var(--foreground)"},children:"Exportar Guia para IA"}),e.jsx("p",{style:{margin:0,fontSize:14,color:"var(--muted-foreground)"},children:"Genera un archivo .md con todo el sistema de diseno para usar como contexto en cualquier IA."})]})]})}),e.jsx(z,{type:"info",title:"Prompt portatil para IAs generativas",description:"Este archivo .md contiene tokens, APIs de componentes, patrones y ejemplos del sistema Khor. Pegalo como contexto en ChatGPT, Claude, Cursor, Figma Make, v0 o cualquier asistente IA para que genere interfaces 100% consistentes con Khor.",className:"mb-6"}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:24},children:[e.jsxs("div",{style:{backgroundColor:"var(--card)",borderRadius:n.radius.lg,padding:24,border:"1px solid var(--border)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16},children:[e.jsxs("h3",{style:{margin:0,fontSize:16,color:"var(--foreground)"},children:[e.jsx($,{size:18,style:{display:"inline",marginRight:8,verticalAlign:"middle"}}),"Secciones a incluir"]}),e.jsxs("div",{style:{display:"flex",gap:8},children:[e.jsx("button",{onClick:D,style:{background:"none",border:"none",cursor:"pointer",fontSize:12,color:n.colors.brand.primary,fontFamily:n.typography.fontPrimary,textDecoration:"underline"},children:"Todas"}),e.jsx("button",{onClick:j,style:{background:"none",border:"none",cursor:"pointer",fontSize:12,color:"var(--muted-foreground)",fontFamily:n.typography.fontPrimary,textDecoration:"underline"},children:"Ninguna"})]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:a.map(o=>e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",borderRadius:n.radius.md,border:`1px solid ${o.enabled?"var(--khor-primary)30":"var(--border)"}`,backgroundColor:o.enabled?"rgba(224,77,54,0.03)":"transparent",transition:"all 0.15s ease"},children:[e.jsxs("div",{style:{flex:1,minWidth:0},children:[e.jsx("div",{style:{fontSize:14,fontWeight:500,color:"var(--foreground)"},children:o.label}),e.jsx("div",{style:{fontSize:12,color:"var(--muted-foreground)",marginTop:2},children:o.description})]}),e.jsx(I,{checked:o.enabled,onCheckedChange:()=>p(o.id),size:"small"})]},o.id))})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsxs("div",{style:{backgroundColor:"var(--card)",borderRadius:n.radius.lg,padding:24,border:"1px solid var(--border)"},children:[e.jsxs("h3",{style:{margin:"0 0 16px",fontSize:16,color:"var(--foreground)"},children:[e.jsx(S,{size:18,style:{display:"inline",marginRight:8,verticalAlign:"middle"}}),"Resumen del documento"]}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[{label:"Secciones",value:`${r}/${a.length}`,color:n.colors.brand.primary},{label:"Palabras",value:s.toLocaleString(),color:n.colors.brand.navy},{label:"Lineas",value:C.toLocaleString(),color:n.colors.brand.accent},{label:"Tamano aprox.",value:`${(new Blob([c]).size/1024).toFixed(1)} KB`,color:n.colors.feedback.success}].map(o=>e.jsxs("div",{style:{padding:12,borderRadius:n.radius.md,backgroundColor:`${o.color}08`,border:`1px solid ${o.color}15`},children:[e.jsx("div",{style:{fontSize:12,color:"var(--muted-foreground)",marginBottom:4},children:o.label}),e.jsx("div",{style:{fontSize:20,fontWeight:700,color:o.color},children:o.value})]},o.label))})]}),e.jsxs("div",{style:{backgroundColor:"var(--card)",borderRadius:n.radius.lg,padding:24,border:"1px solid var(--border)"},children:[e.jsxs("h3",{style:{margin:"0 0 12px",fontSize:16,color:"var(--foreground)"},children:[e.jsx(O,{size:18,style:{display:"inline",marginRight:8,verticalAlign:"middle"}}),"Compatible con"]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:8},children:["ChatGPT","Claude","Figma Make","Cursor","v0 (Vercel)","Windsurf","GitHub Copilot","Gemini","Bolt"].map(o=>e.jsx("span",{style:{padding:"4px 12px",borderRadius:999,fontSize:12,fontWeight:500,backgroundColor:"var(--khor-neutral-100)",color:"var(--foreground)",border:"1px solid var(--border)"},children:o},o))})]}),e.jsxs("div",{style:{backgroundColor:"var(--card)",borderRadius:n.radius.lg,padding:24,border:"1px solid var(--border)"},children:[e.jsxs("h3",{style:{margin:"0 0 16px",fontSize:16,color:"var(--foreground)"},children:[e.jsx(G,{size:18,style:{display:"inline",marginRight:8,verticalAlign:"middle"}}),"Acciones"]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[e.jsx(k,{variant:"primary",block:!0,icon:e.jsx(q,{size:16}),onClick:T,disabled:r===0,children:"Descargar .md"}),e.jsx(k,{variant:"outline",block:!0,icon:i?e.jsx(A,{size:16}):e.jsx(F,{size:16}),onClick:K,disabled:r===0,children:i?"Copiado!":"Copiar al portapapeles"}),e.jsx(k,{variant:"ghost",block:!0,icon:u?e.jsx(W,{size:16}):e.jsx(H,{size:16}),onClick:()=>d(!u),disabled:r===0,children:u?"Ocultar vista previa":"Ver vista previa"})]})]})]})]}),u&&e.jsxs("div",{style:{backgroundColor:"var(--card)",borderRadius:n.radius.lg,border:"1px solid var(--border)",overflow:"hidden"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 20px",borderBottom:"1px solid var(--border)",backgroundColor:"var(--khor-neutral-100)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx(S,{size:16,style:{color:"var(--muted-foreground)"}}),e.jsx("span",{style:{fontSize:13,fontWeight:500,color:"var(--foreground)"},children:"khor-design-system-ai-guide.md"}),e.jsx(P,{status:"info",label:`${s.toLocaleString()} palabras`,dot:!1})]}),e.jsxs("button",{onClick:()=>y(!g),style:{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:4,fontSize:12,color:"var(--muted-foreground)",fontFamily:n.typography.fontPrimary},children:[g?e.jsx(V,{size:14}):e.jsx(_,{size:14}),g?"Colapsar":"Expandir completo"]})]}),e.jsx("pre",{ref:x,style:{padding:20,margin:0,fontSize:12,lineHeight:1.6,color:"var(--foreground)",fontFamily:"'Plus Jakarta Sans', monospace",whiteSpace:"pre-wrap",wordBreak:"break-word",maxHeight:g?"none":500,overflow:g?"visible":"auto"},children:c}),e.jsxs("div",{style:{padding:"12px 20px",borderTop:"1px solid var(--border)",display:"flex",gap:8},children:[e.jsx(k,{variant:"outline",icon:i?e.jsx(A,{size:16}):e.jsx(F,{size:16}),onClick:K,style:{flex:1},children:i?"Copiado!":"Copiar al portapapeles"}),e.jsx(k,{variant:"ghost",icon:e.jsx(X,{size:16}),onClick:E,style:{flex:1},children:"Seleccionar todo (Ctrl+C)"})]})]})]})}export{me as AIExportPage,Z as KHOR_VERSION,J as defaultSections,Q as generateMarkdown};
