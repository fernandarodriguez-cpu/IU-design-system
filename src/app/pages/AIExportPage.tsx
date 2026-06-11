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
import JSZip from 'jszip';
import { KCardSection } from '../components/design-system/organisms/KCardSection/index';
import { KTabs } from '../components/design-system/organisms/KTabs/index';
import { kToast } from '../components/design-system/organisms/KToast/index';
import { useTheme, ThemeConfig } from '../theme/theme-context';
import { patterns } from '../patterns/index';
import { atomsData as atoms } from './AtomsPage';
import { moleculesData as molecules } from './MoleculesPage';
import { organismsData as organisms } from './OrganismsPage';
import { khorTokens, generateCssBlock } from '../theme/khor-theme';
import { KHOR_VERSION } from '../version/version';

const t = khorTokens;


/* ─── Sections config ───────────────────────── */
export interface SectionConfig {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const atomCount = Object.keys(atoms).length;
const moleculeCount = Object.keys(molecules).length;
const organismCount = Object.keys(organisms).length;
const totalCount = atomCount + moleculeCount + organismCount + 11 + 6;

export const defaultSections: SectionConfig[] = [
  { id: 'header', label: 'Encabezado y contexto', description: 'Nombre, versión, stack tecnológico y propósito del sistema.', enabled: true },
  { id: 'index', label: 'Índice de Componentes', description: `Catálogo compacto con los ${totalCount} componentes del sistema.`, enabled: true },
  { id: 'tokens', label: 'Design Tokens', description: 'Charts elite, Forms semánticos, Icon scale, Colores, Tipografía, etc.', enabled: true },
  { id: 'darkmode', label: 'Dark Mode', description: 'Inversión semántica y tokens alternativos para modo oscuro.', enabled: true },
  { id: 'atoms', label: `Átomos (${atomCount})`, description: `API completa de ${atomCount} átomos: Sistema v5.0 optimizado.`, enabled: true },
  { id: 'molecules', label: `Moléculas (${moleculeCount})`, description: `API completa de ${moleculeCount} moléculas coordinadas con el sistema Elite.`, enabled: true },
  { id: 'organisms', label: `Organismos (${organismCount})`, description: `Componentes complejos coordinados con el sistema Elite.`, enabled: true },
  { id: 'templates', label: 'Templates y Patrones', description: 'Patrones de página: Dashboard Admin, CRUD Elite, Login SaaS, etc.', enabled: true },
  { id: 'layout', label: 'Layout (AppShell)', description: 'Estructura sidebar + header + canvas con dimensiones Elite.', enabled: true },
  { id: 'patterns', label: 'Patrones y Convenciones', description: '3-Layer Architecture, Fluid Typography, Naming, A11y.', enabled: true },
  { id: 'examples', label: 'Ejemplos de Código', description: 'Snippets listos para copiar/pegar de casos de uso comunes.', enabled: true },
];

/* ─── Front Matter for standalone guides ──── */
const FRONT_MATTER: Record<string, { module: string; dependencies: string[]; context_rule: string }> = {
  tokens: { module: 'Design Tokens', dependencies: [], context_rule: 'Este archivo define todos los Design Tokens del sistema Khor (colores, tipografía, espaciado, motion, radius, shadows). Es la fuente única de verdad para valores base y semánticos.' },
  atoms: { module: 'Átomos Core', dependencies: ['khor-guia-tokens.md'], context_rule: 'Contiene los componentes anatómicos base. Para colores, espaciados y tipografía, hereda estrictamente las variables declaradas en khor-guia-tokens.md.' },
  molecules: { module: 'Moléculas Compuestas', dependencies: ['khor-guia-tokens.md', 'khor-guia-atomos.md'], context_rule: 'Componentes compuestos. Cada molécula está construida combinando átomos de khor-guia-atomos.md bajo las reglas estéticas de khor-guia-tokens.md.' },
  organisms: { module: 'Organismos Complejos', dependencies: ['khor-guia-tokens.md', 'khor-guia-atomos.md', 'khor-guia-moleculas.md'], context_rule: 'Componentes complejos y contextuales. Construidos sobre moléculas y átomos, con lógica de negocio integral del ecosistema Khor.' },
};

function buildFrontMatter(layerFilter: string[]): string {
  const primaryLayer = layerFilter.find(id => FRONT_MATTER[id]);
  if (!primaryLayer) return '';
  const fm = FRONT_MATTER[primaryLayer];
  return `---
system: Sistema de Diseño Khor v${KHOR_VERSION}
module: ${fm.module}
dependencies: ${JSON.stringify(fm.dependencies)}
context_rule: ${fm.context_rule}
---

`;
}

/* ─── Markdown Generator ────────────────────── */
export function generateMarkdown(sections: SectionConfig[], theme: ThemeConfig, layerFilter?: string[]): string {
  const active = layerFilter ? new Set(layerFilter) : new Set(sections.filter((s) => s.enabled).map((s) => s.id));
  const parts: string[] = [];
  const today = new Date().toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  if (layerFilter) {
    parts.push(buildFrontMatter(layerFilter));
  }

  if (active.has('header')) {
    parts.push(`
# Sistema de Diseño Khor v${KHOR_VERSION}
Generado el: ${today}

Este documento es la única fuente de verdad para el desarrollo en el ecosistema Khor. Úsalo como contexto para que la IA genere código consistente, accesible y alineado con la marca.

## 🤖 Instrucciones Críticas para la IA (System Prompt)

Como IA, DEBES seguir estas reglas estrictamente al generar código:
1. **Identidad Visual y Core Engine:** Khor usa **Radix UI** para comportamiento/accesibilidad y **Tailwind CSS + CSS Variables** para la estética, emulando al 100% la API de Ant Design v5. **NUNCA importes ni instales componentes de \`antd\`, \`@ant-design/*\`, Material UI o similares**. Usa exclusivamente los componentes del sistema (prefijo \`K\`).
2. **Uso de Tokens (Prohibido Hardcode):** NUNCA uses colores hexadecimales. Usa SIEMPRE los Design Tokens (\`khorTokens\`) o CSS Variables (\`var(--khor-*)\`).
3. **Componentes Khor:** Ejemplo: \`KButton\`, \`KIcon\`, \`KCardSection\`.
4. **Iconografía:** Usa únicamente el componente \`KIcon\` (wrapper de Lucide). NO importes iconos directamente de lucide-react si existe \`KIcon\`.
5. **Layout:** Usa Tailwind CSS SOLO para el layout (grid, flex, spacing) y clases de utilidad de Khor.
6. **Lovable/v0 Context:** Usa los **Page Recipes** para acelerar la construcción y garantizar consistencia.

### ♿ Reglas Estrictas de Accesibilidad (A11y)
1. **Roles interactivos:** NUNCA uses \`onClick\` en elementos no interactivos (\`div\`). Usa siempre \`<KButton>\`.
2. **Atributos ARIA:** Todo elemento sin texto visible DEBE tener un \`aria-label\`.
3. **Movimiento reducido:** Nunca agregues animaciones CSS o JS sin verificar que el sistema respeta \`prefers-reduced-motion\`. Usa siempre los tokens de motion de Khor (\`\--khor-duration-*\`, \`\--khor-easing-*\`).

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
| \`data_massive_explorer\` | \`KDataTable\` (con virtualización activa) | Alta |
| \`step_by_step_flow\` | \`KFormWizard\` | Media |
| \`brand_call_to_action\` | \`KButton\` (Primary) + \`KIcon\` (Sparkles) | Baja |
| \`system_feedback_error\` | \`kToast\` (Error) o \`KResult\` (500/403) | Alta |
`);
  }

  /* ─── Component Index (compacto, para visibilidad en context windows pequeños) ─── */
  const renderComponentIndex = (): string => {
    const total = Object.keys(atoms).length + Object.keys(molecules).length + Object.keys(organisms).length;
    let idx = `## 📋 Catálogo de Componentes (${total} en total)\n\n`;
    idx += `*Este índice compacto permite a la IA ver el inventario completo incluso si el contexto se trunca en las secciones detalladas.*\n\n`;

    const renderLayerTable = (dict: Record<string, any>) => {
      let rows = '';
      Object.keys(dict).forEach(key => {
        const c = dict[key];
        rows += `| \`${c.name}\` | ${c.description} |\n`;
      });
      return rows;
    };

    idx += `### Átomos (${Object.keys(atoms).length})\n`;
    idx += `| Componente | Descripción |\n|-----------|-------------|\n`;
    idx += renderLayerTable(atoms);
    idx += `\n### Moléculas (${Object.keys(molecules).length})\n`;
    idx += `| Componente | Descripción |\n|-----------|-------------|\n`;
    idx += renderLayerTable(molecules);
    idx += `\n### Organismos (${Object.keys(organisms).length})\n`;
    idx += `| Componente | Descripción |\n|-----------|-------------|\n`;
    idx += renderLayerTable(organisms);
    idx += `\n---\n`;
    return idx;
  };

  if (active.has('index')) {
    parts.push(renderComponentIndex());
  }

  if (active.has('tokens')) {
    parts.push(`
## 🎨 Especificación Técnica de Tokens (Elite SaaS Architecture)

La IA DEBE usar estos valores exactos:

\`\`\`css
${generateCssBlock(theme)}
\`\`\`

### 🧩 khorTokens (Objeto JS Estricto)
Como referencia estructural, aquí tienes la definición de \`khorTokens\`. Úsala para referenciar variables en inline styles si Tailwind no es posible:
\`\`\`json
${JSON.stringify(khorTokens, null, 2)}
\`\`\`

### 🌑 Dual-Theme Semantic Mapping (Dark Mode Strategy)
La IA debe invertir los valores semánticos siguiendo este mapeo de "Inversión Inteligente":

| Semantic Token | Light Value (Default) | Dark Value (Adaptive) | Intent |
|----------------|----------------------|-----------------------|--------|
| \`--khor-surface-page\` | \`#F8FAFF\` | \`#0F111A\` | Canvas base |
| \`--khor-surface-card\` | \`#FFFFFF\` | \`#1A1B2E\` | Contenedores |
| \`--khor-text-primary\` | \`#051758\` | \`#E8EAF0\` | Lectura principal |
| \`--khor-text-secondary\` | \`#475A8F\` | \`#B0B4C8\` | Texto de apoyo |
| \`--khor-border-default\` | \`#D5DBE0\` | \`#2E3148\` | Separadores sutiles |
| \`--khor-surface-hover\` | \`rgba(5,23,88,0.04)\` | \`rgba(255,255,255,0.05)\` | Feedback interactivo |

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

### 🛡️ Seguridad y Robustez de Datos
1. **Sanitización Obligatoria:** NUNCA uses \`dangerouslySetInnerHTML\` con datos provenientes de props sin pasar por una capa de sanitización (ej. DOMPurify).
2. **Escape de Atributos:** Todo \`title\` o \`aria-label\` dinámico debe ser escapado para prevenir inyecciones de strings maliciosos.
3. **Validación de Tipos:** Usa TypeScript estricto para asegurar que las props de color o URL coincidan con los patrones permitidos por el sistema.

### 📐 Guías de Uso (Do & Don't)
- **Do:** Usa \`KStatCard\` solo para métricas numéricas con tendencia.
- **Don't:** No uses \`KButton\` primary para acciones secundarias (ej. "Cancelar").
- **Do:** Mantén una jerarquía de encabezados (\`h1\` -> \`h2\` -> \`h3\`) sin saltarte niveles.
- **Don't:** No hardcodees anchos (\`width: 200px\`). Usa el sistema de grid o tokens de espaciado.

### 🏛️ Gobernanza y Evolución (Elite Operations)
Para asegurar la estabilidad en la era de la IA, Khor sigue un contrato estricto:

1. **Versionado SemVer 2.0.0:**
   - **MAJOR (x.0.0):** Cambios que rompen la API o eliminan tokens/componentes.
   - **MINOR (0.x.0):** Nuevos componentes, props opcionales o nuevos tokens.
   - **PATCH (0.0.x):** Bugfixes estéticos o técnicos que no alteran la API.

2. **Ciclo de Vida del Componente:**
   - 🧪 **Experimental:** En desarrollo, API sujeta a cambios diarios.
   - ✅ **Stable:** Listos para producción, API garantizada.
   - ⚠️ **Deprecated:** En fase de retiro. La IA debe evitar su uso y sugerir el reemplazo documentado.

3. **Política de Deprecación:**
   Todo elemento deprecado se mantendrá durante un ciclo de **2 versiones menores** antes de su eliminación total en la siguiente versión mayor.

4. **Contrato para Agentes de IA:**
   Cuando la IA detecta que falta un patrón o componente, NO DEBE inventar estilos. Debe proponer una extensión del sistema basada en los **Design Tokens de Capa 1 y 2** existentes para mantener la coherencia del ADN visual.

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


### Elevación — Guía de uso obligatoria

| Nivel | Token | Componentes |
|-------|-------|-------------|
| 0 | \`--khor-elevation-0\` | Elementos inline, sin elevación |
| 1 | \`--khor-elevation-1\` | KCardSection, KStatCard, KTable |
| 2 | \`--khor-elevation-2\` | KDropdown, KTooltip, KPopconfirm |
| 3 | \`--khor-elevation-3\` | KDrawer, KSidesheet, Cabeceras fijas |
| 4 | \`--khor-elevation-4\` | KModal, KDialog |
| 5 | \`--khor-elevation-5\` | KToast, KNotification flotante |

### Architecture Layers (v4.3.0)
- **Breakpoints:** \`sm: 640px\`, \`md: 768px\`, \`lg: 1024px\`, \`xl: 1280px\`.
- **Z-Index:** \`dropdown: 1000\`, \`modal: 1400\`, \`toast: 1700\`.
- **Motion:** \`standard: cubic-bezier(0.4, 0, 0.2, 1)\`, \`spring: cubic-bezier(0.175, 0.885, 0.32, 1.275)\`.
### 🌍 Internacionalización (i18n) — RTL Native Support
Khor usa **CSS Logical Properties** en todos sus componentes, garantizando que la UI se espeje automáticamente en idiomas RTL (árabe, hebreo) sin cambios de código.

**Reglas para la IA:**
1. **NUNCA** uses \`margin-left\`, \`padding-right\`, \`text-align: left\`, \`border-left\`, \`left:\` o \`right:\` en estilos inline o Tailwind.
2. **SIEMPRE** usa sus equivalentes lógicos:
   | Físico (❌ Prohibido) | Lógico (✅ Obligatorio) | Tailwind |
   |----------------------|----------------------|----------|
   | \`margin-left\` | \`margin-inline-start\` | \`ms-*\` |
   | \`margin-right\` | \`margin-inline-end\` | \`me-*\` |
   | \`padding-left\` | \`padding-inline-start\` | \`ps-*\` |
   | \`padding-right\` | \`padding-inline-end\` | \`pe-*\` |
   | \`left:\` | \`inset-inline-start\` | \`start-*\` |
   | \`right:\` | \`inset-inline-end\` | \`end-*\` |
   | \`border-left\` | \`border-inline-start\` | \`border-is\` |
   | \`border-right\` | \`border-inline-end\` | \`border-ie\` |
   | \`text-align: left\` | \`text-align: start\` | \`text-start\` |
   | \`text-align: right\` | \`text-align: end\` | \`text-end\` |
3. **Grid offsets** usan \`margin-inline-start\` en \`layout.css\`.
4. Para activar RTL, añade \`dir="rtl"\` al elemento \`<html>\`. Khor se adapta automáticamente.

### ✍️ UX Writing & Content Strategy — Voice & Tone
Un sistema de diseño no es solo código; es cómo se comunica. Khor define una voz **Directa, Empática y Técnica**.

**Reglas de Capitalización:**
- **Sentence case (✅):** "Añadir nuevo usuario", "Guardar cambios". Se usa en TODO el sistema (botones, títulos, labels).
- **Title Case (❌):** "Añadir Nuevo Usuario". PROHIBIDO.
- **ALL CAPS (❌):** "GUARDAR". Solo se permite en badges muy específicos o elementos decorativos menores.

**Mensajes de Error (Contrato de redacción):**
La IA debe generar errores siguiendo esta estructura:
1. **¿Qué pasó?** (Sin jerga técnica: "No se pudo conectar" vs "Error 500").
2. **¿Por qué pasó?** (Si es útil: "Tu sesión ha expirado").
3. **¿Cómo solucionarlo?** (Acción clara: "Inicia sesión de nuevo").

**Empty States:**
Deben incluir un título claro, una ilustración (o icono \`KIcon\`) y una **acción primaria** para resolver el vacío.

**Formatos Universales:**
- **Fechas:** \`DD/MM/YYYY\` (o relativo: "hace 2 horas").
- **Números:** Separador de miles por espacio o punto según locale, coma para decimales.
- **Moneda:** Símbolo a la izquierda (\`$ 1.200,50\`).

### 🖱️ Interaction States & Accessibility
Khor utiliza un sistema de estados universales basado en capas semánticas.

**Focus-Visible Math (W3C A11y):**
- **Anillo:** \`var(--khor-focus-ring-width)\` (2px).
- **Offset:** \`var(--khor-focus-ring-offset)\` (2px).
- **Activación:** Solo debe activarse mediante teclado (clase \`focus-visible\`).
- **Color:** El color del anillo debe contrastar con el fondo. Por defecto es \`var(--khor-action-primary-default)\`.

**State Layers (Opacity Multipliers):**
La IA debe aplicar overlays de opacidad sobre el color base:
- **Hover:** \`8%\` overlay.
- **Pressed:** \`12%\` overlay.
- **Dragged:** \`16%\` overlay.

### 📱 Adaptive Layout & Grid Grammar
La UI debe mutar físicamente entre breakpoints para optimizar la ergonomía.

**Matemática de la Grilla:**
| Breakpoint | Margen | Gutter | Comportamiento |
|------------|--------|--------|----------------|
| **sm (Mobile)** | 16px | 16px | Edge-to-Edge activo |
| **md (Tablet)** | 24px | 24px | Contenido centrado |
| **lg+ (Desktop)** | 32px | 32px | Layout estructurado |

**Adaptive Component Mutation:**
- **Modales (Desktop):** Se centran en pantalla con overlay.
- **Modales (Mobile):** Mutan a **Bottom Sheets** (deslizan desde abajo, ocupan el ancho completo).
- **Tabs (Desktop):** Fila horizontal.
- **Tabs (Mobile):** Mutan a **Dropdown Select** o scroll horizontal si son pocos items.
- **Tablas (Mobile):** Mutan a **KCard list** si el ancho no permite visualizar 3 columnas críticas.

### 🖥️ SSR & Framework Readiness (Next.js / Remix / Astro)
Khor está diseñado para ser compatible con Server-Side Rendering:

**Reglas para la IA:**
1. **NUNCA** accedas a \`window\`, \`document\` o \`navigator\` fuera de \`useEffect\` o event handlers.
2. Para hooks que dependen del viewport (ej. \`useBreakpoint\`), siempre inicializa con un valor por defecto seguro (\`'xs'\`).
3. Si un componente necesita acceso al DOM en el render inicial, usa el patrón:
   \`\`\`tsx
   const [mounted, setMounted] = useState(false);
   useEffect(() => setMounted(true), []);
   if (!mounted) return <FallbackSkeleton />;
   \`\`\`
4. **"use client"** debe colocarse en componentes que usen hooks de React (useState, useEffect, etc.).
5. Componentes de Khor que interactúan con el DOM (ej. \`KTour\`) requieren \`"use client"\` en Next.js App Router.

### 🔒 Security Hardening (XSS / Sanitización)
Khor implementa políticas estrictas de seguridad para contenido dinámico:

**Reglas para la IA:**
1. **NUNCA** uses \`dangerouslySetInnerHTML\` sin sanitización previa con DOMPurify.
2. **SIEMPRE** escapa el contenido del usuario antes de renderizarlo en:
   - \`KTypography.Text\` con contenido dinámico
   - \`KDataTable\` con celdas personalizadas
   - \`kToast\` con mensajes del servidor
   - \`KTooltip\` con contenido variable
3. **Sanitización recomendada:**
   \`\`\`tsx
   import DOMPurify from 'dompurify';
   const clean = DOMPurify.sanitize(userInput, { ALLOWED_TAGS: ['b', 'i', 'em', 'strong'] });
   \`\`\`
4. **Content Security Policy (CSP):** Khor no inyecta estilos inline que violen CSP. Todos los estilos provienen de CSS Variables y Tailwind.
5. **URLs:** Valida toda URL del usuario con \`new URL()\` antes de usarla en \`href\`, \`src\` o \`action\`.

### 🧪 Testing Strategy (Playwright + Axe-core)
Khor formaliza una estrategia de testing de 3 niveles:

1. **Unit Tests (Vitest):**
   - Cada componente debe tener tests para: render default, variantes, estados disabled/loading, y callbacks.
   - Cobertura mínima: 80% de branches.

2. **Visual Regression (Playwright):**
   - Screenshots comparativos para cada componente en: Light Mode, Dark Mode, Compact Density y Mobile viewport.
   - Comando: \`npx playwright test --project=visual\`

3. **Accessibility (Axe-core):**
   - Cada página y componente se escanea con axe-core para detectar violaciones WCAG 2.1 AA.
   - Integración en CI: \`npx playwright test --project=a11y\`
   - Zero tolerance: cualquier violación de nivel "critical" o "serious" bloquea el merge.

**Ejemplo de test a11y:**
\`\`\`tsx
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('KButton meets WCAG 2.1 AA', async ({ page }) => {
  await page.goto('/components/atoms/button');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
\`\`\`

### 🎬 Motion Choreography — Recipe Book (Phase 3)
Khor define un vocabulario formal de movimiento basado en tokens CSS. Todo componente DEBE usar estos tokens, nunca valores de duración o easing hardcodeados.

**Durations:**
| Token | Valor | Uso |
|-------|-------|-----|
| \`--khor-duration-instant\` | 50ms | Micro-feedback (ripples, checkmarks) |
| \`--khor-duration-fast\` | 100ms | Hover states, color transitions |
| \`--khor-duration-normal\` | 200ms | Transiciones estándar de UI |
| \`--khor-duration-slow\` | 300ms | Expansiones de contenido, accordions |
| \`--khor-duration-slower\` | 500ms | Animaciones de entrada/hero sections |
| \`--khor-duration-entrance\` | 250ms | Elementos que aparecen (modals, dropdowns) |
| \`--khor-duration-exit\` | 200ms | Elementos que desaparecen (exit siempre más rápido) |

**Easing Curves:**
| Token | Curva | Uso |
|-------|-------|-----|
| \`--khor-easing-standard\` | cubic-bezier(0.4, 0, 0.2, 1) | Movimiento general, cambios de estado |
| \`--khor-easing-decelerate\` | cubic-bezier(0, 0, 0.2, 1) | Elementos que entran a escena |
| \`--khor-easing-accelerate\` | cubic-bezier(0.4, 0, 1, 1) | Elementos que salen de escena |
| \`--khor-easing-spring\` | cubic-bezier(0.175, 0.885, 0.32, 1.275) | Botones, toggles, microinteracciones |
| \`--khor-easing-bounce\` | cubic-bezier(0.34, 1.56, 0.64, 1) | Badges, contadores, notificaciones |
| \`--khor-easing-smooth\` | cubic-bezier(0.45, 0, 0.55, 1) | Scroll suave, transiciones de página |

**Reglas para la IA:**
1. **Entrada vs Salida:** Los elementos que entran deben usar \`duration-entrance\` + \`easing-decelerate\`. Los que salen deben usar \`duration-exit\` + \`easing-accelerate\`. La salida SIEMPRE es más rápida que la entrada.
2. **Jerarquía de movimiento:** Los elementos principales se animan primero. Los secundarios siguen con un stagger de 50-100ms.
3. **Reduced Motion:** Cuando \`prefers-reduced-motion: reduce\` está activo, todas las duraciones pasan a \`0ms\` y las transformaciones se desactivan. Solo se permiten cambios de opacidad.
4. **Scale interactions:** Botones usan \`active:scale-[0.98]\` para feedback táctil. Nunca excedas \`scale(1.05)\` para hovers.

**Motion Recipes precompuestos:**
\`\`\`css
/* Fade In */
transition: var(--khor-transition-fade);

/* Scale + Fade (botones, cards interactivos) */
transition: var(--khor-transition-scale), var(--khor-transition-fade);

/* Slide In (drawers, sidesheets) */
transition: var(--khor-transition-slide);

/* Color change (hover states) */
transition: var(--khor-transition-color);
\`\`\`

### 🔡 Fluid Typography — Responsive by Design
Khor utiliza un sistema de tipografía fluida basado en el estándar W3C DTCG. Los tamaños escalan automáticamente entre 320px y 1440px usando \`clamp()\`.

| Token Semántico | Comportamiento | Escala (Min → Max) |
|-----------------|----------------|-------------------|
| \`--khor-type-display-2xl\` | Hero titles | 48px → 72px |
| \`--khor-type-heading-lg\` | Page titles | 24px → 48px |
| \`--khor-type-body-xl\` | Lead text | 18px → 22px |
| \`--khor-type-body-md\` | UI base | 16px (Fixed) |
| \`--khor-type-body-sm\` | Ancillary text | 14px (Fixed) |

### 🧠 AI Runtime Intelligence (Phase 4)
Khor expone metadatos semánticos que permiten a los agentes de IA tomar decisiones inteligentes sobre la UI en tiempo de ejecución.

**Tokens de Estado Semántico:**
| Contexto | Recomendación de UI |
|----------|-------------------|
| **Urgency: high** | Usar \`KButton variant="danger"\`, animaciones rápidas (\`duration-fast\`), colores de alerta |
| **Urgency: low** | Usar \`KButton variant="ghost"\`, transiciones suaves (\`duration-slow\`), colores neutros |
| **Confidence: high** | Mostrar datos sin disclaimers, usar tipografía \`font-bold\` |
| **Confidence: low** | Añadir \`KAlert type="warning"\` con disclaimer, usar tipografía normal |
| **Data density: high** | Activar \`.compact\` density, usar \`KDataTable\` con filas condensadas |
| **Data density: low** | Mantener \`.comfortable\` density, usar \`KCardSection\` con espaciado generoso |

**Semantic Layout Compiler — Guía de Prompts:**
La IA puede generar layouts completos usando esta gramática de intención:

| Intent Prompt | Layout generado |
|--------------|----------------|
| "Dashboard ejecutivo con 4 KPIs y tabla" | Hero con 4x \`KStatCard\` + \`KDataTable\` |
| "Formulario de onboarding en 3 pasos" | \`KFormWizard\` con 3 \`KCardSection\` |
| "Página de detalle con sidebar de navegación" | Layout 6/18 con \`KAnchor\` + secciones |
| "Panel de control con filtros y gráficos" | \`KRow\`/\`KCol\` responsive + \`KSelectField\` + Charts |

### 📊 Data Visualization Architecture
Khor define reglas estrictas para la presentación de datos analíticos.

**Accesibilidad (A11y):**
- **Color + Shape:** NUNCA uses solo el color para distinguir series de datos. Usa patrones de relleno (dots, lines) o estilos de línea (solid, dashed, dotted).
- **Contraste:** Los colores de las gráficas deben cumplir con el ratio \`3:1\` contra el fondo.

**Data-Ink Ratio:**
- Elimina bordes innecesarios, sombras internas y líneas de grilla pesadas.
- Prioriza los datos sobre la decoración.
- Los tooltips deben ser simples, usando \`KTypography.Text\` con \`font-bold\` para el valor.

### 🤖 Figma MCP Synchronization Protocol
Este sistema está diseñado para ser la fuente de verdad absoluta para Agentes de IA vía el protocolo **MCP (Model Context Protocol)**.

**Reglas de Sincronización:**
1. **Source of Truth:** El código React/Tailwind es la fuente de verdad. El Agente debe actualizar Figma para reflejar el código, no al revés.
2. **Naming Contract:** Las capas en Figma deben coincidir exactamente con el nombre del componente en React (ej. \`KButton\`, \`KDataTable\`).
3. **Token Mapping:** El Agente debe usar la herramienta \`use_figma\` para mapear los tokens CTI (\`category-type-item\`) a las variables nativas de Figma.
4. **Bidireccionalidad:** Solo se permite la escritura en código desde Figma mediante un Pull Request generado por el Agente tras validación humana.

### Registro de Cambios (Changelog)

| Versión | Fecha | Cambios |
|---------|-------|---------|
| **v6.0.0** | ${today} | **The Holistic Standard:** Integración total de UX Writing (Voz y Tono), Taxonomía W3C CTI, State Layers universales, matemática de Focus-Visible y protocolo de sincronización Figma MCP. |
| **v5.0.0-beta** | ${today} | **Enterprise Hardening:** Layer 3 Component Tokens (KButton, KInput, KCard), RTL/i18n native con CSS Logical Properties, SSR guidelines (Next.js/Remix). |
| **v5.0.1-alpha** | ${today} | **Shadow & Layout Precision:** Evolución masiva de la fidelidad visual. Sombras multi-capa y sistema de grillas responsivas certificado para todos los breakpoints. |
| **v5.0.0-alpha** | ${today} | **The World-Class Foundation:** Migración total a arquitectura W3C Design Tokens, tipografía fluida, KDataTable empresarial, Command Palette con acciones, KFormWizard y testing con Playwright. |
| **v4.4.1** | ${today} | **KQA God Mode:** Sincronización de más de 20 organismos y moléculas con estados explícitos y Layer 3 Contextual Tokens. Nuevo script de auditoría y Patrones Maestros. |
| **v4.4.0** | 27 Abr 2026 | **Industry Reference:** Inyección de tokens de superficie interactiva, elevación semántica (0-5) y escala de neutros completa (600-800). |
| **v4.3.1** | 24 Abr 2026 | **The Absolute 100:** Cierre definitivo de gaps de motion (easing enter/exit). |
| **v4.3.0** | 24 Abr 2026 | **The 100/100 Audit:** Sincronización total de paridad técnica y documental. |
| **v4.2.0** | 23 Abr 2026 | **Audit Recovery:** Restauración de Tokens Semánticos de 2ª Capa y Sistema de Densidad base. |
| **v4.1.1** | 20 Abr 2026 | **Refinement Phase:** Integración de Chart Palette (12), Form States detallados y nuevo sistema de Iconografía estandarizado (XS-2XL). |
| **v4.1.0** | 10 Abr 2026 | **Elite Upgrade:** Introducción de Layout Tokens, Z-Index Scale y Page Recipes. |

---`);
  }

  if (active.has('darkmode')) {
    parts.push(`
## Dark Mode

El sistema soporta modo oscuro via clase \`.dark\` en \`<html>\`. Se activa con \`useTheme()\` del \`ThemeProvider\`.

### Tokens Oscuros (principales cambios)

| Token | Light | Dark |
|-------|-------|------|
| neutral-50 | \`#f8faff\` | \`#1A1B2E\` |
| neutral-100 | \`#f1f4ff\` | \`#22243A\` |
| neutral-200 | \`#e2eafc\` | \`#2E3148\` |
| neutral-300 | \`#cbd8f1\` | \`#4A4E6A\` |
| neutral-400 | \`#94a9d8\` | \`#8B90A8\` |
| neutral-500 | \`#647bb1\` | \`#B0B4C8\` |
| neutral-600 | \`#475a8f\` | \`#9BA3B5\` |
| neutral-700 | \`#33446b\` | \`#B8BDC8\` |
| neutral-800 | \`#1e2a4a\` | \`#D0D3DA\` |
| neutral-900 | \`#0f1a35\` | \`#E8EAF0\` |
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

  if (active.has('atoms')) {
    parts.push(renderDict('Átomos', 'Unidades indivisibles y fundamentales.', "import { KButton } from '@khor/design-system/atoms/index'", atoms));
  }

  if (active.has('molecules')) {
    parts.push(renderDict('Moléculas', 'Combinaciones de átomos con lógica de forma reutilizable.', "import { KFormField } from '@khor/design-system/molecules/index'", molecules));
  }

  if (active.has('organisms')) {
    parts.push(renderDict('Organismos', 'Componentes complejos o Layouts masivos con lógicas de portal, focus-traps y alto consumo de hooks.', "import { KDataTable } from '@khor/design-system/organisms/index'", organisms));
  }

  if (active.has('templates')) {
    parts.push(`
## 🏗️ Elite Page Recipes (High-Fidelity Patterns)

La IA debe usar estos "Blueprints" estructurales para construir páginas completas con un solo prompt.

### 1. KAppShell (Estructura Base de la Aplicación)
Estructura responsiva con Sidebar colapsable y Header fijo.
\`\`\`tsx
import { AppShell } from './components/AppShell';
import { SidebarItem } from './components/Sidebar';
// Iconos: en producción usa <KIcon name="Home" /> etc.
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
// Iconos: en producción usa <KIcon name="Plus" /> etc.
import { Plus, Edit, Trash2, Filter } from 'lucide-react';
import { KButton, KBadge, KInput } from './atoms';
import { KFormField, KDropdownMenu } from './molecules';
import { KDataTable, KDrawer, KCardSection, kToast } from './organisms';

function UserManagement() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="p-[var(--khor-space-layout-xs)]">
      <div className="flex justify-between items-center mb-[var(--khor-space-component-lg)]">
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
// Iconos: en producción usa <KIcon name="Users" /> etc.
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

---`);
  }

  if (active.has('layout')) {
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

  if (active.has('patterns')) {
    parts.push(`
## Patrones y Convenciones

### Naming
- Todos los componentes llevan prefijo \`K\`: KButton, KInput, KDataTable, etc.
- Props siguen camelCase: \`onChange\`, \`showIcon\`, \`pageSize\`.
- Variantes usan union types: \`'primary' | 'secondary' | 'outline'\`.

### 📦 Pathing Contract (Mapa Estricto de Importación)
La IA **DEBE** importar los componentes de manera indexada usando las rutas base del design system. NO busques subcarpetas profundas:

\`\`\`tsx
// Atomos base (30)
import { KButton, KInput, KBadge, KTag, KAvatar, KSwitch, KCheckbox, KRadio,
         KTooltip, KProgress, KTypography, KDivider, KAlert, KSkeleton, KSlider,
         KSpin, KTextArea, KIcon, KButtonGroup, KFloatButton,
         KSpace, KImage, KQRCode } from './components/design-system/atoms/index';

// Moleculas (33)
import { KFormField, KStatCard, KNavItem, KSelectField,
         KUserCell, KEmptyState, KBreadcrumb, KSteps, KDropdownMenu,
         KPopover, KAccordion, KInputNumber, KSegmented, KAutocomplete, KDatePicker,
         KDateRangePicker, KSelectAdvanced, KDescriptions, KPopconfirm, KResult,
         KTimeline, KCascader, KStatistic, KTimePicker, KColorPicker,
         KAnchor, KList, KDividerExtended } from './components/design-system/molecules/index';

// Organismos (15)
import { KDataTable, KModal, KSheet, KCardSection, KTabs,
         KToastProvider, kToast, KSparklineCell, KUpload, KTree, KTour, KFormList } from './components/design-system/organisms/index';

// Tokens
import { khorTokens } from './theme/khor-theme';
\`\`\`

> **Iconografía:** NO importes íconos directamente de \`lucide-react\` en la UI final. Usa SIEMPRE el wrapper \`<KIcon name="IconName" />\`.

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

### 🛑 Anti-patrones y Guardarraíles (Negative Prompting)
**❌ MAL (No hacer):**
- Usar \`antd\`, \`@ant-design/*\`, MUI, Chakra UI.
- Anidar modales (\`<KModal>\` dentro de \`<KModal>\`). Usa \`<KSheet>\` o wizards.
- Hardcodear colores (\`color: '#FF0000'\`).
- Escribir clases CSS globales no encapsuladas.
- Importar íconos directamente de \`lucide-react\` en el JSX final.
- Usar \`KText\` (Deprecado, usar \`KTypography.Text\`).
- Usar \`KEmpty\` (Deprecado, usar \`KEmptyState\`).

**✅ BIEN (Obligatorio):**
- Usar \`KIcon\` para todos los íconos (\`<KIcon name="Plus" />\`).
- Usar tokens semánticos (ej. \`var(--khor-text-primary)\`).
- Manejar layouts con Tailwind (ej. \`className="flex flex-col gap-4"\`).

### ⚙️ Gestión de Estado (State Assumption)
En Khor, la arquitectura de estado y formularios es estricta:
- **Estado Global:** Asume \`Zustand\`. No crees Contextos de React pesados para estado complejo.
- **Formularios:** Asume \`React Hook Form\` integrado con \`Zod\` para validación. Usa \`<KFormField>\` para envolver los inputs.

### 🎨 Tailwind Safe-List (Utilidades Permitidas)
Usa Tailwind **ÚNICAMENTE** para la estructura de layout:
- Permitido: Flexbox, Grid, Spacing (p-*, m-*, gap-*), Sizing (w-*, h-*), Position.
- Prohibido: Tipografía (text-lg, font-bold), Colores (bg-red-500, text-blue-300). Estas capas pertenecen a los tokens de Khor.

### 🌳 Component Decision Tree
- **¿Selección única corta (2-4)?** -> \`KRadio\`
- **¿Selección única larga (>5)?** -> \`KSelectField\`
- **¿Selección múltiple larga (>10)?** -> \`KSelectAdvanced\`
- **¿Búsqueda asíncrona?** -> \`KAutocomplete\`
- **¿Feedback bloqueante?** -> \`KModal\`
- **¿Feedback efímero?** -> \`kToast\`
- **¿Panel lateral de detalle?** -> \`KSheet\`
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

  if (active.has('examples')) {
    parts.push(`
## Ejemplos de Codigo

### Pagina CRUD basica
\`\`\`tsx
import { useState } from 'react';
// Iconos: en producción usa <KIcon name="Plus" /> etc.
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
// Iconos: en producción usa <KIcon name="Users" /> etc.
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
<KEmptyState
  icon={<KIcon name="Inbox" size="2xl" color="var(--khor-text-muted)" />}
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
  const { themeConfig: theme } = useTheme();
  const [sections, setSections] = useState<SectionConfig[]>(defaultSections);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [expandedPreview, setExpandedPreview] = useState(false);
  const previewRef = useRef<HTMLPreElement>(null);

  const markdown = useMemo(() => generateMarkdown(sections, theme), [sections, theme]);
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

  /* ─── Layer downloads (multi-guía para LLMs) ─── */
  const layerConfigs: { id: string; label: string; filename: string; sectionIds: string[]; icon: string }[] = [
    { id: 'tokens', label: 'Tokens', filename: 'khor-guia-tokens.md', sectionIds: ['tokens'], icon: '🎨' },
    { id: 'atoms', label: 'Átomos', filename: 'khor-guia-atomos.md', sectionIds: ['atoms'], icon: '⚛️' },
    { id: 'molecules', label: 'Moléculas', filename: 'khor-guia-moleculas.md', sectionIds: ['molecules'], icon: '🧬' },
    { id: 'organisms', label: 'Organismos', filename: 'khor-guia-organismos.md', sectionIds: ['organisms'], icon: '🧠' },
    { id: 'full', label: 'Guía Completa', filename: 'khor-guia-completa.md', sectionIds: [], icon: '📦' },
  ];

  const handleDownloadLayer = (layerId: string) => {
    const layer = layerConfigs.find(l => l.id === layerId);
    if (!layer) return;

    let content: string;
    if (layerId === 'full') {
      content = markdown;
    } else {
      content = generateMarkdown(sections, theme, layer.sectionIds);
    }

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = layer.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    kToast({ type: 'success', title: `Descargado: ${layer.label}`, description: layer.filename });
  };

  const handleDownloadAllLayers = async () => {
    const zip = new JSZip();
    const full = generateMarkdown(sections, theme);

    for (const l of layerConfigs) {
      if (l.id === 'full') continue;
      const content = generateMarkdown(sections, theme, l.sectionIds);
      zip.file(l.filename, content);
    }
    zip.file('khor-guia-completa.md', full);

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'khor-guias-completas.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    kToast({ type: 'success', title: 'ZIP generado', description: '5 guías individuales empaquetadas en khor-guias-completas.zip' });
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
            background: 'linear-gradient(135deg, var(--khor-chart-purple) 0%, var(--khor-chart-pink) 100%)',
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
                  onCheckedChange={() => toggleSection(section.id)}
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
              Descargas por capa
            </h3>
            <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: '0 0 12px' }}>
              Cada archivo cabe en contextos LLM pequeños. Usa la guía completa solo como referencia.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {layerConfigs.map((layer) => (
                <KButton
                  key={layer.id}
                  variant={layer.id === 'full' ? 'primary' : 'outline'}
                  block
                  icon={<Download size={16} />}
                  onClick={() => handleDownloadLayer(layer.id)}
                  disabled={enabledCount === 0}
                  style={{ justifyContent: 'flex-start' }}
                >
                  {layer.icon} {layer.label} — {layer.filename}
                </KButton>
              ))}
              <div style={{ height: 1, backgroundColor: 'var(--border)', margin: '4px 0' }} />
              <KButton
                variant="navy"
                block
                icon={<Download size={16} />}
                onClick={handleDownloadAllLayers}
                disabled={enabledCount === 0}
                style={{ justifyContent: 'flex-start' }}
              >
                📦 Descargar todo (ZIP) — khor-guias-completas.zip
              </KButton>
              <KButton
                variant="ghost"
                block
                icon={copied ? <Check size={16} /> : <Copy size={16} />}
                onClick={handleCopy}
                disabled={enabledCount === 0}
              >
                {copied ? 'Copiado!' : 'Copiar guía completa al portapapeles'}
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