/**
 * AIExportPage — Genera y descarga un archivo .md completo con todo
 * el sistema de diseno Khor, optimizado como prompt/guia para IAs.
 */
import React, { useState, useMemo } from 'react';
import {
  Download, Copy, Check, Eye, EyeOff, FileText,
  Bot, Sparkles, Info, Zap, Settings2,
  ChevronDown, ChevronRight,
} from 'lucide-react';
import { KButton, KText, KBadge, KAlert, KSwitch } from '../components/design-system/atoms';
import { KCardSection, KTabs } from '../components/design-system/organisms';
import { kToast } from '../components/design-system/organisms';
import { khorTokens } from '../theme/khor-theme';

const t = khorTokens;

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
  { id: 'atoms', label: 'Atomos (18)', description: 'API completa de cada atomo: props, variantes, ejemplos de uso.', enabled: true },
  { id: 'molecules', label: 'Moleculas (12)', description: 'API completa de cada molecula con composicion de atomos.', enabled: true },
  { id: 'organisms', label: 'Organismos (8)', description: 'API de organismos complejos: tablas, modales, drawers, tabs, toast.', enabled: true },
  { id: 'templates', label: 'Templates (4)', description: 'Patrones de pagina: Login, Dashboard, CRUD Table, Formulario Multi-Paso.', enabled: true },
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
    parts.push(`# Khor Design System — Guia para IA

> Este documento es la fuente unica de verdad del sistema de diseno **Khor**.
> Usalo como contexto/prompt en cualquier IA generativa (ChatGPT, Claude, Figma Make, Cursor, v0, etc.)
> para que genere interfaces consistentes con nuestra marca.

**Version:** 1.0.0
**Generado:** ${today}
**Stack:** React 19 + TypeScript + Tailwind CSS v4 + Radix UI + Lucide React + Recharts + Sonner
**Fuentes:** Raleway (titulos/UI) + Plus Jakarta Sans (cuerpo secundario)
**Arquitectura:** Atomic Design (Atomos > Moleculas > Organismos > Templates > Paginas)

## Instrucciones para la IA

Cuando generes interfaces para Khor:
1. **Usa SIEMPRE** los componentes prefijados con \`K\` (KButton, KInput, etc.) — nunca elementos HTML crudos para UI.
2. **Respeta los tokens** de color, tipografia y espaciado definidos abajo.
3. **Importa** componentes desde las rutas del sistema: \`atoms\`, \`molecules\`, \`organisms\`.
4. **No uses** Ant Design (antd), Material UI ni otros kits de UI — el sistema es autosuficiente.
5. **Prefiere** inline styles con \`khorTokens\` o CSS variables \`var(--khor-*)\` para coherencia.
6. **Iconos:** Usa solo \`lucide-react\` con \`size={16|20|24}\` y \`strokeWidth={2}\`.
7. **Graficos:** Usa \`recharts\` (LineChart, BarChart, AreaChart, PieChart) con los colores \`chart-1\` a \`chart-5\`.
8. **Notificaciones:** Usa \`kToast({ type, title, description })\` del organismo KToastManager (powered by Sonner).

---`);
  }

  if (enabled.has('tokens')) {
    parts.push(`
## Design Tokens

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

### CSS Variables (Tailwind v4)

Las CSS variables mapeadas permiten usar Tailwind directamente:
\`\`\`
bg-background   → fondo del canvas (#EDF0F1 light / #22243A dark)
bg-card          → fondo de tarjetas (#FFFFFF light / #1A1B2E dark)
text-foreground  → texto principal
text-muted-foreground → texto secundario
border-border    → bordes
bg-primary / text-primary-foreground → boton principal
bg-destructive   → acciones destructivas
\`\`\`

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

  if (enabled.has('atoms')) {
    parts.push(`
## Atomos (18 componentes)

Los atomos son la unidad mas pequena e indivisible de la interfaz.
Importar: \`import { KButton, KInput, ... } from './components/design-system/atoms'\`

### KButton
Boton principal del sistema con 6 variantes y 3 tamanos.
\`\`\`tsx
interface KButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'navy';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;          // Icono de Lucide
  iconPosition?: 'start' | 'end';
  loading?: boolean;         // Muestra spinner y deshabilita
  block?: boolean;           // Ancho 100%
}

// Ejemplos:
<KButton variant="primary" size="md">Guardar</KButton>
<KButton variant="outline" icon={<Download size={16} />}>Exportar</KButton>
<KButton variant="danger" loading>Eliminando...</KButton>
<KButton variant="navy" block>Accion completa</KButton>
<KButton variant="ghost" size="sm">Cancelar</KButton>
\`\`\`

### KInput
Campo de texto con soporte para iconos, password toggle, errores y estados.
\`\`\`tsx
interface KInputProps {
  placeholder?: string;
  type?: string;             // 'text' | 'password' | 'email' | 'number' | etc.
  disabled?: boolean;
  error?: string;            // Muestra borde rojo + mensaje
  prefix?: ReactNode;        // Icono izquierdo
  suffix?: ReactNode;        // Icono derecho
  value?: string;
  onChange?: (e) => void;
  size?: 'sm' | 'md' | 'lg';
  showPasswordToggle?: boolean;  // Solo para type="password"
  className?: string;
}

<KInput placeholder="Email" prefix={<Mail size={16} />} />
<KInput type="password" showPasswordToggle />
<KInput error="Campo requerido" />
\`\`\`

### KTextArea
Area de texto multilinea con contador de caracteres.
\`\`\`tsx
interface KTextAreaProps {
  placeholder?: string;
  rows?: number;             // Default: 4
  disabled?: boolean;
  value?: string;
  onChange?: (e) => void;
  error?: string;
  maxLength?: number;
  showCount?: boolean;       // Muestra "X/maxLength"
  className?: string;
}
\`\`\`

### KBadge
Indicador de estado con punto de color y texto.
\`\`\`tsx
interface KBadgeProps {
  status?: 'success' | 'error' | 'warning' | 'info' | 'default';
  label: string;
  dot?: boolean;             // Default: true, muestra circulo de color
  className?: string;
}

<KBadge status="success" label="Activo" />
<KBadge status="error" label="Error" />
<KBadge status="warning" label="Pendiente" dot={false} />
\`\`\`

### KTag
Etiqueta/chip con color y opcion de cierre.
\`\`\`tsx
interface KTagProps {
  color?: 'primary' | 'navy' | 'accent' | 'success' | 'error' | 'warning' | 'default';
  closable?: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
}

<KTag color="primary">React</KTag>
<KTag color="navy" closable onClose={handleRemove}>Filtro</KTag>
\`\`\`

### KAvatar
Avatar circular con imagen, iniciales, tamanos y estado de conexion.
\`\`\`tsx
interface KAvatarProps {
  src?: string;              // URL de imagen
  name?: string;             // Genera iniciales si no hay src
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

<KAvatar name="Ana Garcia" status="online" />
<KAvatar src="/photo.jpg" size="lg" />
\`\`\`

### KSwitch
Toggle on/off basado en Radix Switch.
\`\`\`tsx
interface KSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'small' | 'default';
  className?: string;
}
\`\`\`

### KCheckbox
Casilla de verificacion con estado indeterminate (Radix Checkbox).
\`\`\`tsx
interface KCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  label?: string;
  className?: string;
}
\`\`\`

### KRadio
Grupo de opciones radio con layout vertical/horizontal (Radix RadioGroup).
\`\`\`tsx
interface KRadioProps {
  options: { label: string; value: string; disabled?: boolean }[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  variant?: 'default' | 'card';  // 'card' muestra cada opcion como tarjeta
  className?: string;
}
\`\`\`

### KTooltip
Tooltip accesible basado en Radix Tooltip.
\`\`\`tsx
interface KTooltipProps {
  title: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  children: ReactNode;       // Trigger element
  className?: string;
}

<KTooltip title="Guardar cambios" placement="top">
  <KButton variant="primary">Guardar</KButton>
</KTooltip>
\`\`\`

### KProgress
Barra de progreso basada en Radix Progress.
\`\`\`tsx
interface KProgressProps {
  percent: number;           // 0-100
  status?: 'active' | 'success' | 'error';
  size?: 'small' | 'default';
  showInfo?: boolean;        // Muestra porcentaje, default: true
  strokeColor?: string;      // Color custom de la barra
  className?: string;
}
\`\`\`

### KText
Componente tipografico semantico.
\`\`\`tsx
interface KTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body-lg' | 'body-md' | 'small' | 'label' | 'overline';
  color?: 'default' | 'muted' | 'primary' | 'navy' | 'success' | 'error' | 'accent' | 'white';
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;  // Overridear el tag HTML
}

<KText variant="h1">Titulo Principal</KText>
<KText variant="body-md" color="muted">Texto secundario</KText>
<KText variant="overline" color="primary">SECCION</KText>
\`\`\`

### KDivider
Linea separadora horizontal.
\`\`\`tsx
<KDivider className="my-4" />
\`\`\`

### KAlert
Alerta con icono, titulo, descripcion y cierre opcional.
\`\`\`tsx
interface KAlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  closable?: boolean;
  onClose?: () => void;
  showIcon?: boolean;        // Default: true
  className?: string;
}

<KAlert type="success" title="Guardado" description="Los cambios fueron guardados." closable />
<KAlert type="error" title="Error" description="No se pudo conectar." />
\`\`\`

### KSkeleton
Placeholder de carga animado.
\`\`\`tsx
interface KSkeletonProps {
  width?: string | number;   // Default: '100%'
  height?: string | number;  // Default: 16
  circle?: boolean;          // Renderiza circulo
  lines?: number;            // Multiples lineas
  className?: string;
}

<KSkeleton lines={3} />
<KSkeleton circle width={48} height={48} />
\`\`\`

### KSlider
Deslizador de rango basado en Radix Slider.
\`\`\`tsx
interface KSliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  showValue?: boolean;       // Muestra valor numerico
  className?: string;
}
\`\`\`

### KRate
Calificacion con estrellas.
\`\`\`tsx
interface KRateProps {
  value?: number;
  defaultValue?: number;
  count?: number;            // Numero de estrellas, default: 5
  onChange?: (value: number) => void;
  disabled?: boolean;
  size?: number;             // Tamano en px, default: 20
  className?: string;
}
\`\`\`

### KSpin
Spinner de carga con texto opcional.
\`\`\`tsx
interface KSpinProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  tip?: string;              // Texto debajo del spinner
  className?: string;
}

<KSpin size="lg" tip="Cargando datos..." />
\`\`\`

---`);
  }

  if (enabled.has('molecules')) {
    parts.push(`
## Moleculas (12 componentes)

Combinaciones de atomos que forman unidades funcionales reutilizables.
Importar: \`import { KFormField, KSearchInput, ... } from './components/design-system/molecules'\`

### KFormField
Wrapper de formulario con label, error y hint.
\`\`\`tsx
interface KFormFieldProps {
  label: string;
  required?: boolean;        // Muestra asterisco rojo
  error?: string;            // Mensaje de error
  hint?: string;             // Texto de ayuda
  children: ReactNode;       // El input/select/textarea
  className?: string;
}

<KFormField label="Email" required error={errors.email}>
  <KInput placeholder="usuario@empresa.com" />
</KFormField>
\`\`\`

### KSearchInput
Input de busqueda con icono de lupa, boton de limpiar y debounce.
\`\`\`tsx
interface KSearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}
\`\`\`

### KStatCard
Tarjeta de metrica/KPI con valor, icono, tendencia y sparkline.
\`\`\`tsx
interface KStatCardProps {
  title: string;
  value: number | string;
  icon?: ReactNode;
  change?: number;           // Porcentaje de cambio
  changeLabel?: string;
  sparkData?: number[];      // Datos para mini-grafico
  className?: string;
}

<KStatCard title="Usuarios" value={1234} change={12.5} changeLabel="vs mes anterior"
  icon={<Users size={20} />} sparkData={[10, 25, 30, 45, 60, 80]} />
\`\`\`

### KNavItem
Item de navegacion para sidebar.
\`\`\`tsx
interface KNavItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;       // Solo muestra icono
}
\`\`\`

### KSelectField
Select/dropdown customizado.
\`\`\`tsx
interface KSelectFieldProps {
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
\`\`\`

### KUserCell
Celda de usuario con avatar, nombre y metadata.
\`\`\`tsx
interface KUserCellProps {
  name: string;
  subtitle?: string;
  avatar?: string;           // URL de imagen
  status?: 'online' | 'offline' | 'busy' | 'away';
}
\`\`\`

### KEmptyState
Estado vacio con icono, titulo y accion.
\`\`\`tsx
interface KEmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;        // Boton o CTA
}
\`\`\`

### KBreadcrumb
Migas de pan para navegacion.
\`\`\`tsx
interface KBreadcrumbProps {
  items: { label: string; href?: string; onClick?: () => void }[];
}

<KBreadcrumb items={[
  { label: 'Inicio', onClick: () => navigate('/') },
  { label: 'Usuarios', onClick: () => navigate('/users') },
  { label: 'Detalle' },
]} />
\`\`\`

### KSteps
Stepper/wizard para procesos multi-paso.
\`\`\`tsx
interface KStepsProps {
  current: number;           // Paso actual (0-based)
  items: { title: string; description?: string }[];
  direction?: 'horizontal' | 'vertical';
}
\`\`\`

### KDropdownMenu
Menu contextual con opciones (usa div role="button" como trigger, no button anidado).
\`\`\`tsx
interface KDropdownMenuProps {
  trigger: ReactNode;
  items: { label: string; icon?: ReactNode; onClick?: () => void; danger?: boolean; disabled?: boolean }[];
}
\`\`\`

### KPopover
Panel flotante basado en Radix Popover.
\`\`\`tsx
interface KPopoverProps {
  trigger: ReactNode;
  children: ReactNode;       // Contenido del popover
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}
\`\`\`

### KAccordion
Acordeon colapsable basado en Radix Accordion.
\`\`\`tsx
interface KAccordionProps {
  items: { value: string; title: string; content: ReactNode }[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
}
\`\`\`

---`);
  }

  if (enabled.has('organisms')) {
    parts.push(`
## Organismos (8 componentes)

Componentes complejos que conforman secciones completas de UI.
Importar: \`import { KDataTable, KModal, ... } from './components/design-system/organisms'\`

### KDataTable
Tabla de datos con sorting, paginacion, busqueda y acciones.
\`\`\`tsx
interface KDataTableColumn<T> {
  key: string;
  title: string;
  dataIndex: string;
  render?: (value: any, record: T, index: number) => ReactNode;
  sortable?: boolean;
  width?: number | string;
}

interface KDataTableProps<T> {
  columns: KDataTableColumn<T>[];
  data: T[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  actions?: ReactNode;       // Botones en el header de la tabla
  pageSize?: number;
}

<KDataTable
  columns={[
    { key: 'name', title: 'Nombre', dataIndex: 'name', sortable: true },
    { key: 'status', title: 'Estado', dataIndex: 'status',
      render: (val) => <KBadge status={val} label={val} /> },
  ]}
  data={users}
  searchable
  actions={<KButton variant="primary" icon={<Plus size={16} />}>Nuevo</KButton>}
/>
\`\`\`

### KModal
Dialogo modal basado en Radix Dialog.
\`\`\`tsx
interface KModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;        // Botones de accion
  size?: 'sm' | 'md' | 'lg';
}
\`\`\`

### KDrawer
Panel lateral deslizante (desde la derecha).
\`\`\`tsx
interface KDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: number;            // Default: 400
}
\`\`\`

### KCardSection
Tarjeta contenedora con titulo, subtitulo y acciones.
\`\`\`tsx
interface KCardSectionProps {
  title: string;
  subtitle?: string;
  extra?: ReactNode;         // Acciones en la esquina superior
  children: ReactNode;
  className?: string;
}

<KCardSection title="Usuarios Recientes" extra={<KButton variant="ghost">Ver todos</KButton>}>
  {/* Contenido */}
</KCardSection>
\`\`\`

### KTabs
Pestanas de navegacion basadas en Radix Tabs.
\`\`\`tsx
interface KTabsProps {
  items: { key: string; label: string; children: ReactNode }[];
  defaultActiveKey?: string;
}
\`\`\`

### KToastManager / kToast
Sistema de notificaciones toast (Sonner).
\`\`\`tsx
// Disparar un toast desde cualquier lugar:
import { kToast } from './organisms';

kToast({ type: 'success', title: 'Guardado', description: 'Cambios aplicados.' });
kToast({ type: 'error', title: 'Error', description: 'Fallo la operacion.' });
kToast({ type: 'warning', title: 'Atencion', description: 'Revisa los campos.' });
kToast({ type: 'info', title: 'Info', description: 'Proceso en curso.' });

// El KToastProvider debe estar en el root:
<KToastProvider />
\`\`\`

### SparklineCell
Mini-grafico de linea para usar dentro de tablas o cards.
\`\`\`tsx
interface SparklineCellProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}
\`\`\`

### CommandBar (KCommandBar)
Barra de comandos global activada con Ctrl+K / Cmd+K.
\`\`\`tsx
// Integrado en AppShell, no requiere configuracion manual.
// Busca componentes, tokens y paginas con fuzzy search.
// Soporta navegacion por teclado (flechas + Enter).
// Historial persiste en localStorage.
\`\`\`

---`);
  }

  if (enabled.has('templates')) {
    parts.push(`
## Templates (4 patrones de pagina)

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
// Atomos
import { KButton, KInput, KBadge, KTag, KAvatar, KSwitch, KCheckbox, KRadio,
         KTooltip, KProgress, KText, KDivider, KAlert, KSkeleton, KSlider,
         KRate, KSpin, KTextArea } from './components/design-system/atoms';

// Moleculas
import { KFormField, KSearchInput, KStatCard, KNavItem, KSelectField,
         KUserCell, KEmptyState, KBreadcrumb, KSteps, KDropdownMenu,
         KPopover, KAccordion } from './components/design-system/molecules';

// Organismos
import { KDataTable, KModal, KDrawer, KCardSection, KTabs,
         KToastProvider, kToast } from './components/design-system/organisms';

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

---`);
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
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      kToast({ type: 'success', title: 'Copiado', description: 'Todo el markdown fue copiado al portapapeles.' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      kToast({ type: 'error', title: 'Error', description: 'No se pudo copiar al portapapeles.' });
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
        description="Este archivo .md contiene tokens, APIs de componentes, patrones y ejemplos del sistema Khor. Pegalo como contexto en ChatGPT, Claude, Cursor, Figma Make, v0 o cualquier asistente IA para que genere interfaces 100% consistentes con tu marca."
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
          <pre style={{
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
          }}>
            {markdown}
          </pre>
        </div>
      )}
    </div>
  );
}
