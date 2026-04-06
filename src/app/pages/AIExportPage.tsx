/**
 * AIExportPage — Genera y descarga un archivo .md completo con todo
 * el sistema de diseno Khor, optimizado como prompt/guia para IAs.
 */
import React, { useState, useMemo, useRef } from 'react';
import {
  Download, Copy, Check, Eye, EyeOff, FileText,
  Bot, Sparkles, Info, Zap, Settings2,
  ChevronDown, ChevronRight, MousePointerClick,
} from 'lucide-react';
import { KButton } from '../components/design-system/atoms/KButton/index';
import { KText } from '../components/design-system/atoms/KText/index';
import { KBadge } from '../components/design-system/atoms/KBadge/index';
import { KAlert } from '../components/design-system/atoms/KAlert/index';
import { KSwitch } from '../components/design-system/atoms/KSwitch/index';
import { KCardSection } from '../components/design-system/organisms/KCardSection/index';
import { KTabs } from '../components/design-system/organisms/KTabs/index';
import { kToast } from '../components/design-system/organisms/KToast/index';
import { khorTokens } from '../theme/khor-theme';
import { patterns } from '../patterns/index';
import { atoms } from './AtomsPage';
import { molecules } from './MoleculesPage';
// import { organisms } from './OrganismsPage';
const organisms = {}; // Temporary dummy for isolation testing

const t = khorTokens;

/* ─── Version (must match ChangelogPage & AppShell) ─── */
const KHOR_VERSION = '4.0.2';

/* ─── Sections config ───────────────────────── */
interface SectionConfig {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const defaultSections: SectionConfig[] = [
  { id: 'header', label: 'Encabezado y contexto', description: 'Nombre, version, stack tecnologico y proposito del sistema.', enabled: true },
  { id: 'tokens', label: 'Design Tokens', description: 'Colores de marca, neutrales, feedback, tipografia, espaciado, radios y sombras.', enabled: true },
  { id: 'darkmode', label: 'Dark Mode', description: 'Tokens alternativos para modo oscuro y CSS variables.', enabled: true },
  { id: 'atoms', label: 'Atomos (27)', description: 'API completa de 27 atomos: 18 base + 9 extendidos (ButtonGroup, InputPassword, FloatButton, etc.).', enabled: true },
  { id: 'molecules', label: 'Moleculas (33)', description: 'API completa de 33 moleculas: 12 base + 10 extendidas + 11 wave3 (DatePicker, ColorPicker, Transfer, etc.).', enabled: true },
  { id: 'organisms', label: 'Organismos (13)', description: 'API de 13 organismos: 8 base + 5 extendidos (Upload, Tree, Tour, ModalConfirm, FormList).', enabled: true },
  { id: 'templates', label: 'Templates y Patrones', description: 'Patrones de pagina: Login, Dashboard, CRUD Table, Formulario Multi-Paso, y convenciones.', enabled: true },
  { id: 'layout', label: 'Layout (AppShell)', description: 'Estructura sidebar + header + canvas con dimensiones y comportamiento.', enabled: true },
  { id: 'patterns', label: 'Patrones y Convenciones', description: 'Naming, imports, espaciado, responsive, accesibilidad.', enabled: true },
  { id: 'examples', label: 'Ejemplos de Codigo', description: 'Snippets listos para copiar/pegar de casos de uso comunes.', enabled: true },
];

/* ─── Markdown Generator ────────────────────── */
function generateMarkdown(sections: SectionConfig[]): string {
  const enabled = new Set(sections.filter((s) => s.enabled).map((s) => s.id));
  const parts: string[] = [];
  const today = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  if (enabled.has('header')) {
    parts.push(`
# Sistema de Diseño Khor v${KHOR_VERSION}
Generado el: ${today}

Este documento es la única fuente de verdad para el desarrollo en el ecosistema Khor. Úsalo como contexto para que la IA genere código consistente, accesible y alineado con la marca.

## 🤖 Instrucciones Críticas para la IA (System Prompt)

Como IA, DEBES seguir estas reglas estrictamente al generar código:
1. **Identidad Visual:** NUNCA importes ni uses componentes directamente desde \`antd\`, \`@ant-design/*\`, Material UI o similares. Usa exclusivamente los componentes del sistema (prefijo \`K\`). Los componentes K* son la única abstracción oficial basada en Radix UI y Tailwind CSS v4; tú solo debes interactuar con la capa Khor.
2. **Componentes Khor:** Ejemplo: \`KButton\`, \`KInput\`, \`KCardSection\`.
3. **Estilos:** Usa Tailwind CSS SOLO para el layout (grid, flex, spacing) y clases de utilidad de Khor. NUNCA hardcodees colores hexadecimales; usa siempre los Design Tokens (\`khorTokens\`) o CSS Variables (\`var(--khor-*)\`).
4. **React Router:** Usa \`react-router\` (v6/v7), NO \`react-router-dom\`.
5. **Iconografía:** Usa únicamente la librería \`lucide-react\`.
6. **Higiene del DOM:** Asegúrate de que las props personalizadas de Khor (ej. \`variant\`, \`fullWidth\`) no lleguen al elemento HTML nativo.

### ♿ Reglas Estrictas de Accesibilidad (A11y)
1. **Roles interactivos:** NUNCA uses \`onClick\` en elementos no interactivos (\`div\`, \`span\`). Usa siempre \`<KButton>\` o elementos semánticos.
2. **Atributos ARIA:** Todo elemento sin texto visible (ej. botones de solo ícono) DEBE tener un \`aria-label\` descriptivo.
3. **Imágenes:** Toda etiqueta \`<img>\` o componente de imagen debe incluir el atributo \`alt\`.
4. **Formularios:** Todos los inputs deben estar asociados a un label (usando el componente \`KFormField\`).
`);
  }

  if (enabled.has('tokens')) {
    parts.push(`
## 🎨 Especificación Técnica de Tokens (Fuente de Verdad)

Para que el código generado sea funcional, la IA DEBE conocer estos valores y DEBE incluirlos en su CSS global o mediante objeto de estilos si está en entorno aislado:

\`\`\`css
:root {
  /* Colores de Marca y Estado */
  --khor-brand-navy: #051758;
  --khor-brand-primary: #E04D36;
  --khor-brand-secondary: #051758;
  --khor-brand-accent: #FF9500;
  --khor-status-success: #2E7D32;
  --khor-status-error: #D32F2F;
  --khor-status-info: #051758;

  /* Neutros y Superficies */
  --khor-neutral-50: #FFFFFF;    /* Surface Page / Card */
  --khor-neutral-100: #EDF0F1;   /* Canvas Background */
  --khor-neutral-200: #D5DBE0;   /* Borders / Dividers */
  --khor-neutral-300: #A0AEC0;   /* Placeholders */
  --khor-neutral-400: #718096;   /* Muted Text */
  --khor-neutral-500: #4A5568;   /* Body Text */
  --khor-neutral-800: #11141C;   /* Dark Text */
  --khor-neutral-900: #051758;   /* Heading Text */

  /* Geometría y Elevación */
  --khor-radius-sm: 6px;
  --khor-radius-md: 8px;
  --khor-radius-lg: 10px;
  --khor-radius-xl: 14px;
  --khor-shadow-sm: 0 2px 4px rgba(0,0,0,0.05);
  --khor-shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --khor-shadow-lg: 0 12px 32px rgba(5,23,88,0.12);
}
\`\`\`

### Detalle Analítico de Tokens (Tabla extendida)

### Colores de Marca

| Token | Hex | CSS Variable | Uso |
|-------|-----|-------------|-----|
| Primary | \`#E04D36\` | \`var(--khor-primary)\` | CTAs, botones principales, enlaces activos |
| Primary Hover | \`#e8644f\` | \`var(--khor-primary-hover)\` | Hover de primary |
| Primary Active | \`#c9442f\` | \`var(--khor-primary-active)\` | Click/active de primary |
| Navy | \`#051758\` | \`var(--khor-navy)\` | Sidebar, titulos, navegacion, headings |
| Navy Hover | \`#0a2270\` | \`var(--khor-navy-hover)\` | Hover de navy |
| Accent | \`#FF9500\` | \`var(--khor-accent)\` | Warnings, destacados, badges, CTA secundario |
| Accent Hover | \`#ffaa33\` | \`var(--khor-accent-hover)\` | Hover de accent |

### Colores Neutros

| Token | Hex | CSS Variable | Uso |
|-------|-----|-------------|-----|
| neutral-50 | \`#FFFFFF\` | \`var(--khor-neutral-50)\` | Fondo de tarjetas, superficies |
| neutral-100 | \`#EDF0F1\` | \`var(--khor-neutral-100)\` | Fondo de canvas, inputs |
| neutral-200 | \`#D5DBE0\` | \`var(--khor-neutral-200)\` | Bordes, divisores |
| neutral-300 | \`#A0AEC0\` | \`var(--khor-neutral-300)\` | Texto placeholder |
| neutral-400 | \`#718096\` | \`var(--khor-neutral-400)\` | Texto secundario, muted |
| neutral-500 | \`#4A5568\` | \`var(--khor-neutral-500)\` | Texto cuerpo |
| neutral-900 | \`#000000\` | \`var(--khor-neutral-900)\` | Texto principal, headings |

### Colores de Feedback

| Token | Hex | Uso |
|-------|-----|-----|
| success | \`#2E7D32\` | Exito, confirmaciones, badges OK |
| success-light | \`#E8F5E9\` | Fondo de alertas/badges de exito |
| error | \`#D32F2F\` | Errores, validaciones fallidas |
| error-light | \`#FFEBEE\` | Fondo de alertas/badges de error |
| warning | \`#FF9500\` | Advertencias (coincide con accent) |
| warning-light | \`#FFF3E0\` | Fondo de advertencias |
| info | \`#051758\` | Informativo (coincide con navy) |
| info-light | \`#E3F2FD\` | Fondo de alertas informativas |

**Nota para la IA:** En Tailwind v4, estos colores se consumen como \`bg-khor-primary\`, \`text-khor-navy\`, \`border-khor-accent\`, etc.

### Tipografia

| Escala | Tamano | Peso | Line Height | Fuente |
|--------|--------|------|-------------|--------|
| h1 | 38px | 700 (bold) | 1.2 | Raleway |
| h2 | 30px | 700 | 1.2 | Raleway |
| h3 | 24px | 600 (semi) | 1.3 | Raleway |
| body-lg | 16px | 400 | 1.5 | Raleway |
| body-md | 14px | 400 | 1.5 | Raleway |
| small | 12px | 500 | 1.5 | Raleway |

**Importar fuentes:**
\`\`\`css
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
\`\`\`

### Espaciado

| Token | Valor | Uso |
|-------|-------|-----|
| xs | 4px | Gaps minimos, padding interno icons |
| sm | 8px | Gaps entre elementos pequenos |
| md | 16px | Padding estandar, gaps de formulario |
| lg | 24px | Padding de secciones, gaps de cards |
| xl | 40px | Padding de pagina, separacion mayor |

### Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| sm | 6px | Badges, tags, chips |
| md | 8px | Inputs, botones, dropdowns |
| lg | 10px | Cards, modales, drawers |
| xl | 14px | Hero sections, contenedores grandes |

### Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| sm | \`0 2px 4px rgba(0,0,0,0.05)\` | Cards, inputs con focus |
| md | \`0 4px 12px rgba(0,0,0,0.08)\` | Dropdowns, popovers |
| lg | \`0 12px 32px rgba(5,23,88,0.12)\` | Modales, drawers |

### Tokens JS

\`\`\`typescript
import { khorTokens } from './theme/khor-theme';

// Uso en inline styles:
style={{ color: khorTokens.colors.brand.primary }}
style={{ padding: khorTokens.spacing.md }}
style={{ borderRadius: khorTokens.radius.lg }}
style={{ boxShadow: khorTokens.shadows.sm }}
style={{ fontFamily: khorTokens.typography.fontPrimary }}
\`\`\`

### Tokens Semánticos (Action, Surface, Text)

Khor v3.1 introduce tokens semánticos (independientes del modo claro/oscuro) para garantizar escalabilidad:
\`\`\`css
/* Capa Semantic - Surface */
var(--khor-surface-page)       /* Fondo general, ant-layout */
var(--khor-surface-card)       /* Fondos blancos/panels modales */
var(--khor-surface-overlay)    /* Backdrop de drawers/modals */

/* Capa Semantic - Text */
var(--khor-text-primary)       /* Titulos */
var(--khor-text-secondary)     /* Descripciones */
var(--khor-text-disabled)      /* Texto bloqueado */

/* Capa Semantic - Action */
var(--khor-action-primary-default) /* Botones primary, links fuertes */
var(--khor-action-primary-hover)
\`\`\`
*(IMPORTANTE para la IA: Preferir SIEMPRE la capa Semántica sobre primitivos crudos).*

### Tokens de Densidad (.khor-compact / .khor-comfortable)

Soportado a través de inyecciones automáticas o agregando \`className="khor-compact"\` en contenedores padre:
\`\`\`css
/* .khor-compact reduce drásticamente vacíos para Data-dashboards */
--khor-density-spacing-md: 8px;      /* Default: 16px */
--khor-density-height-input: 28px;   /* Default: 36px */
--khor-density-font-body: 12px;      /* Default: 14px */
\`\`\`

### Motion y Easing

Usa variables para animar componentes consistentes:
\`\`\`css
transition: all var(--khor-duration-normal) var(--khor-easing-standard);

/* Durations */
--khor-duration-fast: 100ms;
--khor-duration-normal: 200ms;
--khor-duration-slow: 400ms;

/* Easings */
--khor-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
--khor-easing-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);  /* Efectos modales o drawer bounce */
\`\`\`

### Accesibilidad WCAG (Los 8 Gaps de Clase Mundial)

Khor v3.1.2 soluciona los gaps críticos detectados en auditorías previas:
1. **Reducción de Movimiento:** Soporta \`prefers-reduced-motion\` para usuarios con sensibilidad vestibular.
2. **Foco Visible:** Anillos de enfoque de alto contraste (\`focus-visible\`) en todos los elementos interactivos.
3. **Jerarquía Semántica:** Estructura de encabezados (H1-H6) estrictamente secuencial.
4. **Contraste AA:** Todos los tokens de texto cumplen con el ratio 4.5:1 sobre sus fondos respectivos.
5. **Navegación por Teclado:** Soporte nativo para Tab, Enter, Escape y Flechas en todos los componentes.
6. **Anunciadores ARIA:** Uso de \`aria-live\` y roles semánticos para lectores de pantalla.
7. **Touch Targets:** Tamaño mínimo de click de 44x44px en elementos interactivos.
8. **Feedback de Error:** Mensajes de error claros vinculados mediante \`aria-describedby\`.

### Registro de Cambios (Changelog)

| Versión | Fecha | Cambios |
|---------|-------|---------|
| **v3.1.4** | 30 Mar 2026 | **Refinamiento:** Lógica \`fullWidth\` en KButton. Optimización del orden del System Prompt para IA. Inyección de reglas estrictas A11y. |
| **v3.1.3** | 30 Mar 2026 | **Gobernanza:** Implementación de Linter de Accesibilidad (jsx-a11y) y configuración externa. |
| **v3.1.2** | 30 Mar 2026 | **Gobernanza:** Restauración de instrucciones para IA. Solución de los 8 Gaps de Accesibilidad. |

---`);
  }

  if (enabled.has('darkmode')) {
    parts.push(`
## Dark Mode

El sistema soporta modo oscuro via clase \`.dark\` en \`<html>\`. Se activa con \`useTheme()\` del \`ThemeProvider\`.

### Tokens Oscuros (principales cambios)

| Token | Light | Dark |
|-------|-------|------|
| neutral-50 | \`#FFFFFF\` | \`#1A1B2E\` |
| neutral-100 | \`#EDF0F1\` | \`#22243A\` |
| neutral-200 | \`#D5DBE0\` | \`#2E3148\` |
| neutral-300 | \`#A0AEC0\` | \`#4A4E6A\` |
| neutral-400 | \`#718096\` | \`#8B90A8\` |
| neutral-500 | \`#4A5568\` | \`#B0B4C8\` |
| neutral-900 | \`#000000\` | \`#E8EAF0\` |
| accent | \`#FF9500\` | \`#FFB340\` |
| navy | \`#051758\` | \`#8BA3D9\` |
| success | \`#2E7D32\` | \`#4CAF50\` |
| error | \`#D32F2F\` | \`#EF5350\` |

### Uso del ThemeProvider

\`\`\`tsx
import { ThemeProvider, useTheme } from './theme/theme-context';

// En el root:
<ThemeProvider>
  <App />
</ThemeProvider>

// En cualquier componente:
const { mode, toggle, isDark } = useTheme();
// mode: 'light' | 'dark'
// toggle(): cambia el modo
// isDark: boolean
\`\`\`

### Recomendacion para componentes custom

Usa \`var(--khor-*)\` en vez de valores hardcoded para que respondan al cambio de tema:
\`\`\`tsx
// MAL:
style={{ backgroundColor: '#FFFFFF', color: '#000000' }}

// BIEN:
style={{ backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
\`\`\`

---`);
  }

  const renderDict = (title: string, desc: string, importPath: string, dict: Record<string, any>) => {
    const keys = Object.keys(dict);
    let md = `## ${title} (${keys.length} componentes)\n\n${desc}\nImportar desde: \`${importPath}\`\n\n`;
    
    keys.forEach(key => {
      const comp = dict[key];
      md += `### ${comp.name}\n${comp.description}\n\n`;
      
      if (comp.aiNotes) {
        md += `> **Directrices IA**: ${comp.aiNotes}\n\n`;
      }

      if (comp.a11ySummary) {
        md += `**Accesibilidad (ARIA & Keyboard - Score: ${comp.a11ySummary.score}/100)**\n`;
        md += `- **Keyboard:** ${comp.a11ySummary.keyboard.join(' ')}\n`;
        md += `- **ARIA:** ${comp.a11ySummary.aria.join(' ')}\n`;
        md += `- **Contraste:** ${comp.a11ySummary.contrast}\n\n`;
      }

      if (comp.props && comp.props.length > 0) {
        md += `**Props Principales:**\n`;
        md += `| Prop | Tipo | Requerido | Default | Descripcion |\n`;
        md += `|------|------|-----------|---------|-------------|\n`;
        comp.props.forEach((p: any) => {
          md += `| \`${p.name}\` | \`${p.type}\` | ${p.required ? 'Si' : 'No'} | ${p.default ? `\`${p.default}\`` : '-'} | ${p.description} |\n`;
        });
        md += `\n`;
      }

      if (comp.code) {
        md += `**Ejemplo de Uso:**\n\`\`\`tsx\n${comp.code}\n\`\`\`\n\n`;
      }

      if (comp.guidelines && comp.guidelines.length > 0) {
        md += `**Guidelines UX:**\n`;
        comp.guidelines.forEach((g: string) => {
          md += `- ${g}\n`;
        });
        md += `\n`;
      }

      md += `---\n\n`;
    });
    return md;
  };

  if (enabled.has('atoms')) {
    parts.push(renderDict('Átomos', 'Unidades indivisibles y fundamentales.', "import { KButton } from '@khor/design-system/atoms/index'", atoms));
  }

  if (enabled.has('molecules')) {
    parts.push(renderDict('Moléculas', 'Combinaciones de átomos con lógica de forma reutilizable.', "import { KFormField } from '@khor/design-system/molecules/index'", molecules));
  }

  if (enabled.has('organisms')) {
    parts.push(renderDict('Organismos', 'Componentes complejos o Layouts masivos con lógicas de portal, focus-traps y alto consumo de hooks.', "import { KDataTable } from '@khor/design-system/organisms/index'", organisms));
  }

  if (enabled.has('templates')) {
    parts.push(`
## Templates y Patrones (4 patrones de pagina)

### Login Template
Pantalla de inicio de sesion con formulario centrado, logo y fondo navy.
- Componentes usados: KButton(primary), KInput, KFormField, KCheckbox
- Layout: centrado vertical y horizontal, card blanca sobre fondo navy

### Dashboard Template
Panel de metricas con stats, graficos y tabla de datos recientes.
- Componentes usados: KStatCard (x4), KCardSection, KDataTable, KTabs, recharts
- Layout: grid responsivo con 4 columnas de stats arriba, grafico y tabla abajo

### CRUD Table Template
Tabla de datos completa con busqueda, paginacion, modal de crear/editar y drawer de detalle.
- Componentes usados: KDataTable, KModal, KDrawer, KButton, KFormField, KInput, KBadge, KDropdownMenu
- Patron: listado → accion → modal/drawer → confirmacion → toast

### Formulario Multi-Paso Template
Wizard de 4 pasos con validacion por paso, stepper visual y resumen final.
- Componentes usados: KSteps, KFormField, KInput, KSelectField, KRadio, KCheckbox, KButton
- Patron: paso 1 (datos) → paso 2 (config) → paso 3 (revision) → paso 4 (confirmacion)

### Convenciones de Paginas
- **Rutas:** Todas las paginas deben estar en \`/src/app/pages\` y seguir la estructura de carpetas.
- **Componentes:** Usa componentes de \`design-system\` para mantener consistencia.
- **Estilos:** Usa Tailwind CSS para estilos y \`khorTokens\` para tokens.
- **Accesibilidad:** Asegura que todos los componentes sean accesibles y cumplan con WCAG AA.

---`);
  }

  if (enabled.has('layout')) {
    parts.push(`
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

---`);
  }

  if (enabled.has('patterns')) {
    parts.push(`
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
`);

    patterns.forEach(p => {
      parts.push(`
### Patrón Modular: ${p.title}
${p.description}
\`\`\`tsx
${p.code}
\`\`\`
`);
    });

    parts.push(`---`);
  }

  if (enabled.has('examples')) {
    parts.push(`
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
`);
  }

  return parts.join('\n');
}

/* ─── Word count helper ─────────────────────── */
function wordCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/* ─── Component ─────────────────────────────── */
export function AIExportPage() {
  const [sections, setSections] = useState<SectionConfig[]>(defaultSections);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [expandedPreview, setExpandedPreview] = useState(false);
  const previewRef = useRef<HTMLPreElement>(null);

  const markdown = useMemo(() => generateMarkdown(sections), [sections]);
  const words = useMemo(() => wordCount(markdown), [markdown]);
  const lines = useMemo(() => markdown.split('\n').length, [markdown]);
  const enabledCount = sections.filter((s) => s.enabled).length;

  const toggleSection = (id: string) => {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'khor-design-system-ai-guide.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    kToast({ type: 'success', title: 'Descarga iniciada', description: 'khor-design-system-ai-guide.md descargado.' });
  };

  const handleCopy = async () => {
    // Try clipboard API first, then fallback to execCommand
    let success = false;
    try {
      await navigator.clipboard.writeText(markdown);
      success = true;
    } catch {
      // Fallback: create a hidden textarea, select and copy
      try {
        const textarea = document.createElement('textarea');
        textarea.value = markdown;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        success = false;
      }
    }

    if (success) {
      setCopied(true);
      kToast({ type: 'success', title: 'Copiado', description: 'Todo el markdown fue copiado al portapapeles.' });
      setTimeout(() => setCopied(false), 2000);
    } else {
      kToast({
        type: 'warning',
        title: 'No se pudo copiar automaticamente',
        description: 'Usa el boton "Seleccionar todo" en la vista previa y copia manualmente con Ctrl+C / Cmd+C.',
      });
      // Auto-show preview so user can use "select all"
      setShowPreview(true);
      setExpandedPreview(true);
    }
  };

  const handleSelectAll = () => {
    if (previewRef.current) {
      const range = document.createRange();
      range.selectNodeContents(previewRef.current);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
      kToast({ type: 'info', title: 'Texto seleccionado', description: 'Ahora presiona Ctrl+C (o Cmd+C) para copiar.' });
    }
  };

  const selectAll = () => setSections((prev) => prev.map((s) => ({ ...s, enabled: true })));
  const selectNone = () => setSections((prev) => prev.map((s) => ({ ...s, enabled: false })));

  return (
    <div style={{ fontFamily: t.typography.fontPrimary }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 44, height: 44, borderRadius: t.radius.md,
            background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Bot size={24} color="#fff" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, color: 'var(--foreground)' }}>
              Exportar Guia para IA
            </h1>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--muted-foreground)' }}>
              Genera un archivo .md con todo el sistema de diseno para usar como contexto en cualquier IA.
            </p>
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <KAlert
        type="info"
        title="Prompt portatil para IAs generativas"
        description="Este archivo .md contiene tokens, APIs de componentes, patrones y ejemplos del sistema Khor. Pegalo como contexto en ChatGPT, Claude, Cursor, Figma Make, v0 o cualquier asistente IA para que genere interfaces 100% consistentes con Khor."
        className="mb-6"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
        {/* Left: Section Toggles */}
        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: t.radius.lg,
          padding: 24,
          border: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ margin: 0, fontSize: 16, color: 'var(--foreground)' }}>
              <Settings2 size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
              Secciones a incluir
            </h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={selectAll}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 12, color: t.colors.brand.primary, fontFamily: t.typography.fontPrimary,
                  textDecoration: 'underline',
                }}
              >
                Todas
              </button>
              <button
                onClick={selectNone}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: 12, color: 'var(--muted-foreground)', fontFamily: t.typography.fontPrimary,
                  textDecoration: 'underline',
                }}
              >
                Ninguna
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sections.map((section) => (
              <div
                key={section.id}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', borderRadius: t.radius.md,
                  border: `1px solid ${section.enabled ? 'var(--khor-primary)' + '30' : 'var(--border)'}`,
                  backgroundColor: section.enabled ? 'rgba(224,77,54,0.03)' : 'transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>
                    {section.label}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginTop: 2 }}>
                    {section.description}
                  </div>
                </div>
                <KSwitch
                  checked={section.enabled}
                  onChange={() => toggleSection(section.id)}
                  size="small"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Stats & Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Stats */}
          <div style={{
            backgroundColor: 'var(--card)',
            borderRadius: t.radius.lg,
            padding: 24,
            border: '1px solid var(--border)',
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, color: 'var(--foreground)' }}>
              <FileText size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
              Resumen del documento
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Secciones', value: `${enabledCount}/${sections.length}`, color: t.colors.brand.primary },
                { label: 'Palabras', value: words.toLocaleString(), color: t.colors.brand.navy },
                { label: 'Lineas', value: lines.toLocaleString(), color: t.colors.brand.accent },
                { label: 'Tamano aprox.', value: `${(new Blob([markdown]).size / 1024).toFixed(1)} KB`, color: t.colors.feedback.success },
              ].map((stat) => (
                <div key={stat.label} style={{
                  padding: 12, borderRadius: t.radius.md,
                  backgroundColor: `${stat.color}08`, border: `1px solid ${stat.color}15`,
                }}>
                  <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 4 }}>{stat.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Target audience */}
          <div style={{
            backgroundColor: 'var(--card)',
            borderRadius: t.radius.lg,
            padding: 24,
            border: '1px solid var(--border)',
          }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 16, color: 'var(--foreground)' }}>
              <Sparkles size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
              Compatible con
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {[
                'ChatGPT', 'Claude', 'Figma Make', 'Cursor', 'v0 (Vercel)',
                'Windsurf', 'GitHub Copilot', 'Gemini', 'Bolt',
              ].map((ai) => (
                <span key={ai} style={{
                  padding: '4px 12px', borderRadius: 999,
                  fontSize: 12, fontWeight: 500,
                  backgroundColor: 'var(--khor-neutral-100)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                }}>
                  {ai}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div style={{
            backgroundColor: 'var(--card)',
            borderRadius: t.radius.lg,
            padding: 24,
            border: '1px solid var(--border)',
          }}>
            <h3 style={{ margin: '0 0 16px', fontSize: 16, color: 'var(--foreground)' }}>
              <Zap size={18} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
              Acciones
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <KButton
                variant="primary"
                block
                icon={<Download size={16} />}
                onClick={handleDownload}
                disabled={enabledCount === 0}
              >
                Descargar .md
              </KButton>
              <KButton
                variant="outline"
                block
                icon={copied ? <Check size={16} /> : <Copy size={16} />}
                onClick={handleCopy}
                disabled={enabledCount === 0}
              >
                {copied ? 'Copiado!' : 'Copiar al portapapeles'}
              </KButton>
              <KButton
                variant="ghost"
                block
                icon={showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                onClick={() => setShowPreview(!showPreview)}
                disabled={enabledCount === 0}
              >
                {showPreview ? 'Ocultar vista previa' : 'Ver vista previa'}
              </KButton>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      {showPreview && (
        <div style={{
          backgroundColor: 'var(--card)',
          borderRadius: t.radius.lg,
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 20px',
            borderBottom: '1px solid var(--border)',
            backgroundColor: 'var(--khor-neutral-100)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileText size={16} style={{ color: 'var(--muted-foreground)' }} />
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--foreground)' }}>
                khor-design-system-ai-guide.md
              </span>
              <KBadge status="info" label={`${words.toLocaleString()} palabras`} dot={false} />
            </div>
            <button
              onClick={() => setExpandedPreview(!expandedPreview)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 4,
                fontSize: 12, color: 'var(--muted-foreground)',
                fontFamily: t.typography.fontPrimary,
              }}
            >
              {expandedPreview ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              {expandedPreview ? 'Colapsar' : 'Expandir completo'}
            </button>
          </div>
          <pre
            ref={previewRef}
            style={{
              padding: 20,
              margin: 0,
              fontSize: 12,
              lineHeight: 1.6,
              color: 'var(--foreground)',
              fontFamily: "'Plus Jakarta Sans', monospace",
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              maxHeight: expandedPreview ? 'none' : 500,
              overflow: expandedPreview ? 'visible' : 'auto',
            }}
          >
            {markdown}
          </pre>
          <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
            <KButton
              variant="outline"
              icon={copied ? <Check size={16} /> : <Copy size={16} />}
              onClick={handleCopy}
              style={{ flex: 1 }}
            >
              {copied ? 'Copiado!' : 'Copiar al portapapeles'}
            </KButton>
            <KButton
              variant="ghost"
              icon={<MousePointerClick size={16} />}
              onClick={handleSelectAll}
              style={{ flex: 1 }}
            >
              Seleccionar todo (Ctrl+C)
            </KButton>
          </div>
        </div>
      )}
    </div>
  );
}