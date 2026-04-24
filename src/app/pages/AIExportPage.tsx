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
import { organisms } from './OrganismsPage';


const t = khorTokens;

/* ─── Version (must match ChangelogPage & AppShell) ─── */
export const KHOR_VERSION = '4.3.1';


/* ─── Sections config ───────────────────────── */
export interface SectionConfig {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export const defaultSections: SectionConfig[] = [
  { id: 'header', label: 'Encabezado y contexto', description: 'Nombre, versión, stack tecnológico y propósito del sistema.', enabled: true },
  { id: 'tokens', label: 'Design Tokens', description: 'Charts elite, Forms semánticos, Icon scale, Colores, Tipografía, etc.', enabled: true },
  { id: 'darkmode', label: 'Dark Mode', description: 'Tokens alternativos para modo oscuro y CSS variables.', enabled: true },
  { id: 'atoms', label: 'Átomos (28)', description: 'API completa de 28 átomos: Incluyendo el nuevo KIcon y los 27 previos.', enabled: true },
  { id: 'molecules', label: 'Moléculas (33)', description: 'API completa de 33 moléculas coordinadas con el sistema Elite.', enabled: true },
  { id: 'organisms', label: 'Organismos (13)', description: 'Componentes complejos coordinados con el sistema Elite.', enabled: true },
  { id: 'templates', label: 'Templates y Patrones', description: 'Patrones de página: Dashboard Admin, CRUD Elite, Login SaaS, etc.', enabled: true },
  { id: 'layout', label: 'Layout (AppShell)', description: 'Estructura sidebar + header + canvas con dimensiones Elite.', enabled: true },
  { id: 'patterns', label: 'Patrones y Convenciones', description: 'Naming, imports, espaciado, responsive, accesibilidad.', enabled: true },
  { id: 'examples', label: 'Ejemplos de Código', description: 'Snippets listos para copiar/pegar de casos de uso comunes.', enabled: true },
];

/* ─── Markdown Generator ────────────────────── */
export function generateMarkdown(sections: SectionConfig[]): string {
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
1. **Identidad Visual:** NUNCA importes ni uses componentes directamente desde \`antd\`, \`@ant-design/*\`, Material UI o similares. Usa exclusivamente los componentes del sistema (prefijo \`K\`).
2. **Uso de Tokens (Prohibido Hardcode):** NUNCA uses colores hexadecimales. Usa SIEMPRE los Design Tokens (\`khorTokens\`) o CSS Variables (\`var(--khor-*)\`).
3. **Componentes Khor:** Ejemplo: \`KButton\`, \`KIcon\`, \`KCardSection\`.
4. **Iconografía:** Usa únicamente el componente \`KIcon\` (wrapper de Lucide). NO importes iconos directamente de lucide-react si existe \`KIcon\`.
5. **Layout:** Usa Tailwind CSS SOLO para el layout (grid, flex, spacing) y clases de utilidad de Khor.
6. **Lovable/v0 Context:** Usa los **Page Recipes** para acelerar la construcción y garantizar consistencia.

### ♿ Reglas Estrictas de Accesibilidad (A11y)
1. **Roles interactivos:** NUNCA uses \`onClick\` en elementos no interactivos (\`div\`). Usa siempre \`<KButton>\`.
  2. **Atributos ARIA:** Todo elemento sin texto visible DEBE tener un \`aria-label\`.
  3. **Movimiento reducido:** Nunca agregues animaciones CSS o JS sin verificar que el sistema respeta \`prefers-reduced-motion\`. Usa siempre los tokens de motion de Khor (\`\--khor-duration-*\`, \`\--khor-easing-*\`).
`);
  }

  if (enabled.has('tokens')) {
    parts.push(`
## 🎨 Especificación Técnica de Tokens (Elite SaaS Architecture)

La IA DEBE usar estos valores exactos:

\`\`\`css
:root {
  /* Elite Charts Palette (12 Colores) */
  --khor-chart-primary: #E04D36;   --khor-chart-secondary: #051758;
  --khor-chart-accent: #FF9500;    --khor-chart-success: #2E7D32;
  --khor-chart-error: #D32F2F;     --khor-chart-info: #1976D2;
  --khor-chart-teal: #008080;      --khor-chart-purple: #9C27B0;
  --khor-chart-pink: #E91E63;      --khor-chart-cyan: #00BCD4;
  --khor-chart-amber: #FFC107;     --khor-chart-gray: #9E9E9E;

  /* Form Validation Semantic States */
  --khor-form-error-bg: #FFEBEE;   --khor-form-error-border: #D32F2F;   --khor-form-error-text: #B71C1C;
  --khor-form-success-bg: #E8F5E9; --khor-form-success-border: #2E7D32; --khor-form-success-text: #1B5E20;
  --khor-form-warning-bg: #FFF3E0; --khor-form-warning-border: #FF9500; --khor-form-warning-text: #E65100;
  --khor-form-focus-ring: #E04D36;

  /* Iconography Scale */
  --khor-icon-xs: 12px; --khor-icon-sm: 16px; --khor-icon-md: 20px;
  --khor-icon-lg: 24px; --khor-icon-xl: 32px; --khor-icon-2xl: 48px;

  /* Semantic Layer 2: Actions */
  --khor-action-primary-default: #E04D36; --khor-action-primary-hover: #e8644f;
  --khor-action-secondary-default: #051758; --khor-action-secondary-hover: #0a2270;
  --khor-action-danger-default: #D32F2F; --khor-action-danger-hover: #B71C1C;
  --khor-action-ghost-hover: rgba(5, 23, 88, 0.06);
  --khor-action-disabled-bg: #EDF0F1; --khor-action-disabled-text: #A0AEC0;

  /* Semantic Layer 2: Surface & Overlay */
  --khor-surface-page: #f8faff; --khor-surface-card: #ffffff;
  --khor-surface-overlay: #ffffff; --khor-overlay-bg: rgba(255, 255, 255, 0.95);

  /* Semantic Layer 2: Borders */
  --khor-border-default: #D5DBE0; --khor-border-muted: #EDF0F1;
  --khor-border-strong: #A0AEC0; --khor-border-focus: #E04D36;
  --khor-border-error: #D32F2F; --khor-border-disabled: #EDF0F1;

  /* Semantic Layer 2: Typography */
  --khor-text-primary: #051758; --khor-text-secondary: #475a8f;
  --khor-text-muted: #94a9d8; --khor-text-disabled: #A0AEC0; --khor-text-on-action: #ffffff;

  /* Motion Tokens (v4.3) */
  --khor-duration-instant: 80ms; --khor-duration-fast: 100ms;
  --khor-duration-normal: 200ms; --khor-duration-slow: 400ms;
  --khor-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --khor-easing-enter: cubic-bezier(0, 0, 0.2, 1);
  --khor-easing-exit: cubic-bezier(0.4, 0, 1, 1);
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

### Architecture Layers (v4.3.0)
- **Breakpoints:** \`sm: 640px\`, \`md: 768px\`, \`lg: 1024px\`, \`xl: 1280px\`.
- **Z-Index:** \`dropdown: 1000\`, \`modal: 1400\`, \`toast: 1700\`.
- **Motion:** \`standard: cubic-bezier(0.4, 0, 0.2, 1)\`, \`spring: cubic-bezier(0.175, 0.885, 0.32, 1.275)\`.
- **Reduced Motion:** El sistema respeta \`prefers-reduced-motion\` globalmente.

### Registro de Cambios (Changelog)

| Versión | Fecha | Cambios |
|---------|-------|---------|
| **v4.3.1** | ${today} | **The Absolute 100:** Cierre definitivo de gaps de motion (easing enter/exit) y embebido de gobernanza para paridad total. |
| **v4.3.0** | 24 Abr 2026 | **The 100/100 Audit:** Sincronización total de paridad técnica y documental. |
| **v4.2.0** | 23 Abr 2026 | **Audit Recovery:** Restauración de Tokens Semánticos de 2ª Capa y Sistema de Densidad base. |
| **v4.1.1** | 20 Abr 2026 | **Refinement Phase:** Integración de Chart Palette (12), Form States detallados y nuevo sistema de Iconografía estandarizado (XS-2XL). |
| **v4.1.0** | 10 Abr 2026 | **Elite Upgrade:** Introducción de Layout Tokens, Z-Index Scale y Page Recipes. |

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
Grid de alta densidad con StatCards y Chart Palette v4.1.0.
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