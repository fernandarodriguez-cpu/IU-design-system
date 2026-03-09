**Add your own guidelines here**
<!--

System Guidelines

Use this file to provide the AI with rules and guidelines you want it to follow.
This template outlines a few examples of things you can add. You can add your own sections and format it to suit your needs

TIP: More context isn't always better. It can confuse the LLM. Try and add the most important rules you need

# General guidelines

Any general rules you want the AI to follow.
For example:

* Only use absolute positioning when necessary. Opt for responsive and well structured layouts that use flexbox and grid by default
* Refactor code as you go to keep code clean
* Keep file sizes small and put helper functions and components in their own files.

--------------

# Design system guidelines
Rules for how the AI should make generations look like your company's design system

Additionally, if you select a design system to use in the prompt box, you can reference
your design system's components, tokens, variables and components.
For example:

* Use a base font-size of 14px
* Date formats should always be in the format “Jun 10”
* The bottom toolbar should only ever have a maximum of 4 items
* Never use the floating action button with the bottom toolbar
* Chips should always come in sets of 3 or more
* Don't use a dropdown if there are 2 or fewer options

You can also create sub sections and add more specific details
For example:


## Button
The Button component is a fundamental interactive element in our design system, designed to trigger actions or navigate
users through the application. It provides visual feedback and clear affordances to enhance user experience.

### Usage
Buttons should be used for important actions that users need to take, such as form submissions, confirming choices,
or initiating processes. They communicate interactivity and should have clear, action-oriented labels.

### Variants
* Primary Button
  * Purpose : Used for the main action in a section or page
  * Visual Style : Bold, filled with the primary brand color
  * Usage : One primary button per section to guide users toward the most important action
* Secondary Button
  * Purpose : Used for alternative or supporting actions
  * Visual Style : Outlined with the primary color, transparent background
  * Usage : Can appear alongside a primary button for less important actions
* Tertiary Button
  * Purpose : Used for the least important actions
  * Visual Style : Text-only with no border, using primary color
  * Usage : For actions that should be available but not emphasized
-->
# Khor Design System — Guia para IA

> Este documento es la fuente unica de verdad del sistema de diseno **Khor**.
> Usalo como contexto/prompt en cualquier IA generativa (ChatGPT, Claude, Figma Make, Cursor, v0, etc.)
> para que genere interfaces consistentes con nuestra marca.

**Version:** 1.0.0
**Generado:** 9 de marzo de 2026
**Stack:** React 19 + TypeScript + Tailwind CSS v4 + Radix UI + Lucide React + Recharts + Sonner
**Fuentes:** Raleway (titulos/UI) + Plus Jakarta Sans (cuerpo secundario)
**Arquitectura:** Atomic Design (Atomos > Moleculas > Organismos > Templates > Paginas)

## Instrucciones para la IA

Cuando generes interfaces para Khor:
1. **Usa SIEMPRE** los componentes prefijados con `K` (KButton, KInput, etc.) — nunca elementos HTML crudos para UI.
2. **Respeta los tokens** de color, tipografia y espaciado definidos abajo.
3. **Importa** componentes desde las rutas del sistema: `atoms`, `molecules`, `organisms`.
4. **No uses** Ant Design (antd), Material UI ni otros kits de UI — el sistema es autosuficiente.
5. **Prefiere** inline styles con `khorTokens` o CSS variables `var(--khor-*)` para coherencia.
6. **Iconos:** Usa solo `lucide-react` con `size={16|20|24}` y `strokeWidth={2}`.
7. **Graficos:** Usa `recharts` (LineChart, BarChart, AreaChart, PieChart) con los colores `chart-1` a `chart-5`.
8. **Notificaciones:** Usa `kToast({ type, title, description })` del organismo KToastManager (powered by Sonner).

---

## Design Tokens

### Colores de Marca

| Token | Hex | CSS Variable | Uso |
|-------|-----|-------------|-----|
| Primary | `#E04D36` | `var(--khor-primary)` | CTAs, botones principales, enlaces activos |
| Primary Hover | `#e8644f` | `var(--khor-primary-hover)` | Hover de primary |
| Primary Active | `#c9442f` | `var(--khor-primary-active)` | Click/active de primary |
| Navy | `#051758` | `var(--khor-navy)` | Sidebar, titulos, navegacion, headings |
| Navy Hover | `#0a2270` | `var(--khor-navy-hover)` | Hover de navy |
| Accent | `#FF9500` | `var(--khor-accent)` | Warnings, destacados, badges, CTA secundario |
| Accent Hover | `#ffaa33` | `var(--khor-accent-hover)` | Hover de accent |

### Colores Neutros

| Token | Hex | CSS Variable | Uso |
|-------|-----|-------------|-----|
| neutral-50 | `#FFFFFF` | `var(--khor-neutral-50)` | Fondo de tarjetas, superficies |
| neutral-100 | `#EDF0F1` | `var(--khor-neutral-100)` | Fondo de canvas, inputs |
| neutral-200 | `#D5DBE0` | `var(--khor-neutral-200)` | Bordes, divisores |
| neutral-300 | `#A0AEC0` | `var(--khor-neutral-300)` | Texto placeholder |
| neutral-400 | `#718096` | `var(--khor-neutral-400)` | Texto secundario, muted |
| neutral-500 | `#4A5568` | `var(--khor-neutral-500)` | Texto cuerpo |
| neutral-900 | `#000000` | `var(--khor-neutral-900)` | Texto principal, headings |

### Colores de Feedback

| Token | Hex | Uso |
|-------|-----|-----|
| success | `#2E7D32` | Exito, confirmaciones, badges OK |
| success-light | `#E8F5E9` | Fondo de alertas/badges de exito |
| error | `#D32F2F` | Errores, validaciones fallidas |
| error-light | `#FFEBEE` | Fondo de alertas/badges de error |
| warning | `#FF9500` | Advertencias (coincide con accent) |
| warning-light | `#FFF3E0` | Fondo de advertencias |
| info | `#051758` | Informativo (coincide con navy) |
| info-light | `#E3F2FD` | Fondo de alertas informativas |

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
```css
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
```

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
| sm | `0 2px 4px rgba(0,0,0,0.05)` | Cards, inputs con focus |
| md | `0 4px 12px rgba(0,0,0,0.08)` | Dropdowns, popovers |
| lg | `0 12px 32px rgba(5,23,88,0.12)` | Modales, drawers |

### Tokens JS

```typescript
import { khorTokens } from './theme/khor-theme';

// Uso en inline styles:
style={{ color: khorTokens.colors.brand.primary }}
style={{ padding: khorTokens.spacing.md }}
style={{ borderRadius: khorTokens.radius.lg }}
style={{ boxShadow: khorTokens.shadows.sm }}
style={{ fontFamily: khorTokens.typography.fontPrimary }}
```

### CSS Variables (Tailwind v4)

Las CSS variables mapeadas permiten usar Tailwind directamente:
```
bg-background   → fondo del canvas (#EDF0F1 light / #22243A dark)
bg-card          → fondo de tarjetas (#FFFFFF light / #1A1B2E dark)
text-foreground  → texto principal
text-muted-foreground → texto secundario
border-border    → bordes
bg-primary / text-primary-foreground → boton principal
bg-destructive   → acciones destructivas
```

---

## Dark Mode

El sistema soporta modo oscuro via clase `.dark` en `<html>`. Se activa con `useTheme()` del `ThemeProvider`.

### Tokens Oscuros (principales cambios)

| Token | Light | Dark |
|-------|-------|------|
| neutral-50 | `#FFFFFF` | `#1A1B2E` |
| neutral-100 | `#EDF0F1` | `#22243A` |
| neutral-200 | `#D5DBE0` | `#2E3148` |
| neutral-300 | `#A0AEC0` | `#4A4E6A` |
| neutral-400 | `#718096` | `#8B90A8` |
| neutral-500 | `#4A5568` | `#B0B4C8` |
| neutral-900 | `#000000` | `#E8EAF0` |
| accent | `#FF9500` | `#FFB340` |
| navy | `#051758` | `#8BA3D9` |
| success | `#2E7D32` | `#4CAF50` |
| error | `#D32F2F` | `#EF5350` |

### Uso del ThemeProvider

```tsx
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
```

### Recomendacion para componentes custom

Usa `var(--khor-*)` en vez de valores hardcoded para que respondan al cambio de tema:
```tsx
// MAL:
style={{ backgroundColor: '#FFFFFF', color: '#000000' }}

// BIEN:
style={{ backgroundColor: 'var(--card)', color: 'var(--foreground)' }}
```

---

## Atomos (27 componentes)

Los atomos son la unidad mas pequena e indivisible de la interfaz.
Importar: `import { KButton, KInput, ... } from './components/design-system/atoms'`

### KButton
Boton principal del sistema con 6 variantes y 3 tamanos.
```tsx
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
```

### KInput
Campo de texto con soporte para iconos, password toggle, errores y estados.
```tsx
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
```

### KTextArea
Area de texto multilinea con contador de caracteres.
```tsx
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
```

### KBadge
Indicador de estado con punto de color y texto.
```tsx
interface KBadgeProps {
  status?: 'success' | 'error' | 'warning' | 'info' | 'default';
  label: string;
  dot?: boolean;             // Default: true, muestra circulo de color
  className?: string;
}

<KBadge status="success" label="Activo" />
<KBadge status="error" label="Error" />
<KBadge status="warning" label="Pendiente" dot={false} />
```

### KTag
Etiqueta/chip con color y opcion de cierre.
```tsx
interface KTagProps {
  color?: 'primary' | 'navy' | 'accent' | 'success' | 'error' | 'warning' | 'default';
  closable?: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
}

<KTag color="primary">React</KTag>
<KTag color="navy" closable onClose={handleRemove}>Filtro</KTag>
```

### KAvatar
Avatar circular con imagen, iniciales, tamanos y estado de conexion.
```tsx
interface KAvatarProps {
  src?: string;              // URL de imagen
  name?: string;             // Genera iniciales si no hay src
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

<KAvatar name="Ana Garcia" status="online" />
<KAvatar src="/photo.jpg" size="lg" />
```

### KSwitch
Toggle on/off basado en Radix Switch.
```tsx
interface KSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'small' | 'default';
  className?: string;
}
```

### KCheckbox
Casilla de verificacion con estado indeterminate (Radix Checkbox).
```tsx
interface KCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  label?: string;
  className?: string;
}
```

### KRadio
Grupo de opciones radio con layout vertical/horizontal (Radix RadioGroup).
```tsx
interface KRadioProps {
  options: { label: string; value: string; disabled?: boolean }[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  variant?: 'default' | 'card';  // 'card' muestra cada opcion como tarjeta
  className?: string;
}
```

### KTooltip
Tooltip accesible basado en Radix Tooltip.
```tsx
interface KTooltipProps {
  title: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  children: ReactNode;       // Trigger element
  className?: string;
}

<KTooltip title="Guardar cambios" placement="top">
  <KButton variant="primary">Guardar</KButton>
</KTooltip>
```

### KProgress
Barra de progreso basada en Radix Progress.
```tsx
interface KProgressProps {
  percent: number;           // 0-100
  status?: 'active' | 'success' | 'error';
  size?: 'small' | 'default';
  showInfo?: boolean;        // Muestra porcentaje, default: true
  strokeColor?: string;      // Color custom de la barra
  className?: string;
}
```

### KText
Componente tipografico semantico.
```tsx
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
```

### KDivider
Linea separadora horizontal.
```tsx
<KDivider className="my-4" />
```

### KAlert
Alerta con icono, titulo, descripcion y cierre opcional.
```tsx
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
```

### KSkeleton
Placeholder de carga animado.
```tsx
interface KSkeletonProps {
  width?: string | number;   // Default: '100%'
  height?: string | number;  // Default: 16
  circle?: boolean;          // Renderiza circulo
  lines?: number;            // Multiples lineas
  className?: string;
}

<KSkeleton lines={3} />
<KSkeleton circle width={48} height={48} />
```

### KSlider
Deslizador de rango basado en Radix Slider.
```tsx
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
```

### KRate
Calificacion con estrellas.
```tsx
interface KRateProps {
  value?: number;
  defaultValue?: number;
  count?: number;            // Numero de estrellas, default: 5
  onChange?: (value: number) => void;
  disabled?: boolean;
  size?: number;             // Tamano en px, default: 20
  className?: string;
}
```

### KSpin
Spinner de carga con texto opcional.
```tsx
interface KSpinProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  tip?: string;              // Texto debajo del spinner
  className?: string;
}

<KSpin size="lg" tip="Cargando datos..." />
```

### KButtonGroup
Grupo de botones con diseño uniforme.
```tsx
interface KButtonGroupProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

<KButtonGroup size="md">
  <KButton variant="primary">Opcion 1</KButton>
  <KButton variant="secondary">Opcion 2</KButton>
  <KButton variant="outline">Opcion 3</KButton>
</KButtonGroup>
```

### KInputPassword
Input de password con visibilidad toggle.
```tsx
interface KInputPasswordProps {
  placeholder?: string;
  value?: string;
  onChange?: (e) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

<KInputPassword placeholder="Password" />
```

### KFloatButton
Boton flotante para acciones rapidas.
```tsx
interface KFloatButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

<KFloatButton icon={<Plus size={20} />} onClick={handleAdd} size="md" />
```

---

## Moleculas (33 componentes)

Combinaciones de atomos que forman unidades funcionales reutilizables.
Importar: `import { KFormField, KSearchInput, ... } from './components/design-system/molecules'`

### KFormField
Wrapper de formulario con label, error y hint.
```tsx
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
```

### KSearchInput
Input de busqueda con icono de lupa, boton de limpiar y debounce.
```tsx
interface KSearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}
```

### KStatCard
Tarjeta de metrica/KPI con valor, icono, tendencia y sparkline.
```tsx
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
```

### KNavItem
Item de navegacion para sidebar.
```tsx
interface KNavItemProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  collapsed?: boolean;       // Solo muestra icono
}
```

### KSelectField
Select/dropdown customizado.
```tsx
interface KSelectFieldProps {
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
```

### KUserCell
Celda de usuario con avatar, nombre y metadata.
```tsx
interface KUserCellProps {
  name: string;
  subtitle?: string;
  avatar?: string;           // URL de imagen
  status?: 'online' | 'offline' | 'busy' | 'away';
}
```

### KEmptyState
Estado vacio con icono, titulo y accion.
```tsx
interface KEmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;        // Boton o CTA
}
```

### KBreadcrumb
Migas de pan para navegacion.
```tsx
interface KBreadcrumbProps {
  items: { label: string; href?: string; onClick?: () => void }[];
}

<KBreadcrumb items={[
  { label: 'Inicio', onClick: () => navigate('/') },
  { label: 'Usuarios', onClick: () => navigate('/users') },
  { label: 'Detalle' },
]} />
```

### KSteps
Stepper/wizard para procesos multi-paso.
```tsx
interface KStepsProps {
  current: number;           // Paso actual (0-based)
  items: { title: string; description?: string }[];
  direction?: 'horizontal' | 'vertical';
}
```

### KDropdownMenu
Menu contextual con opciones (usa div role="button" como trigger, no button anidado).
```tsx
interface KDropdownMenuProps {
  trigger: ReactNode;
  items: { label: string; icon?: ReactNode; onClick?: () => void; danger?: boolean; disabled?: boolean }[];
}
```

### KPopover
Panel flotante basado en Radix Popover.
```tsx
interface KPopoverProps {
  trigger: ReactNode;
  children: ReactNode;       // Contenido del popover
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}
```

### KAccordion
Acordeon colapsable basado en Radix Accordion.
```tsx
interface KAccordionProps {
  items: { value: string; title: string; content: ReactNode }[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
}
```

### KDatePicker
Selector de fecha con calendario.
```tsx
interface KDatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

<KDatePicker placeholder="Selecciona una fecha" />
```

### KColorPicker
Selector de color con paleta.
```tsx
interface KColorPickerProps {
  value?: string;            // Hex color
  onChange?: (color: string) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

<KColorPicker value="#FF9500" />
```

### KTransfer
Componente de transferencia de elementos entre listas.
```tsx
interface KTransferProps {
  dataSource: { key: string; title: string }[];
  targetKeys?: string[];
  onChange?: (targetKeys: string[]) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

<KTransfer
  dataSource={[
    { key: '1', title: 'Item 1' },
    { key: '2', title: 'Item 2' },
    { key: '3', title: 'Item 3' },
  ]}
  targetKeys={['2']}
  onChange={handleTransferChange}
/>
```

---

## Organismos (13 componentes)

Componentes complejos que conforman secciones completas de UI.
Importar: `import { KDataTable, KModal, ... } from './components/design-system/organisms'`

### KDataTable
Tabla de datos con sorting, paginacion, busqueda y acciones.
```tsx
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
```

### KModal
Dialogo modal basado en Radix Dialog.
```tsx
interface KModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;        // Botones de accion
  size?: 'sm' | 'md' | 'lg';
}
```

### KDrawer
Panel lateral deslizante (desde la derecha).
```tsx
interface KDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: number;            // Default: 400
}
```

### KCardSection
Tarjeta contenedora con titulo, subtitulo y acciones.
```tsx
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
```

### KTabs
Pestanas de navegacion basadas en Radix Tabs.
```tsx
interface KTabsProps {
  items: { key: string; label: string; children: ReactNode }[];
  defaultActiveKey?: string;
}
```

### KToastManager / kToast
Sistema de notificaciones toast (Sonner).
```tsx
// Disparar un toast desde cualquier lugar:
import { kToast } from './organisms';

kToast({ type: 'success', title: 'Guardado', description: 'Cambios aplicados.' });
kToast({ type: 'error', title: 'Error', description: 'Fallo la operacion.' });
kToast({ type: 'warning', title: 'Atencion', description: 'Revisa los campos.' });
kToast({ type: 'info', title: 'Info', description: 'Proceso en curso.' });

// El KToastProvider debe estar en el root:
<KToastProvider />
```

### KSparklineCell
Mini-grafico de linea para usar dentro de tablas o cards.
```tsx
interface KSparklineCellProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}
```

### KCommandBar
Barra de comandos global activada con Ctrl+K / Cmd+K.
```tsx
// Integrado en AppShell, no requiere configuracion manual.
// Busca componentes, tokens y paginas con fuzzy search.
// Soporta navegacion por teclado (flechas + Enter).
// Historial persiste en localStorage.
```

### KUpload
Componente de subida de archivos.
```tsx
interface KUploadProps {
  onUpload?: (files: File[]) => void;
  multiple?: boolean;
  accept?: string;           // MIME types
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

<KUpload onUpload={handleUpload} multiple accept="image/*" size="md" />
```

### KTree
Arbol de navegacion o seleccion.
```tsx
interface KTreeProps {
  data: { key: string; title: string; children?: KTreeProps['data'] }[];
  selectedKeys?: string[];
  onSelect?: (keys: string[]) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

<KTree
  data={[
    { key: '1', title: 'Item 1' },
    { key: '2', title: 'Item 2', children: [
      { key: '2-1', title: 'Subitem 1' },
      { key: '2-2', title: 'Subitem 2' },
    ] },
  ]}
  selectedKeys={['2-1']}
  onSelect={handleSelect}
/>
```

### KTour
Guia de usuario para introducir nuevas funcionalidades.
```tsx
interface KTourProps {
  steps: { key: string; title: string; content: ReactNode; target: string }[];
  current?: number;
  onStepChange?: (index: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

<KTour
  steps={[
    { key: 'step1', title: 'Paso 1', content: <KText>Descripción del paso 1</KText>, target: '#element1' },
    { key: 'step2', title: 'Paso 2', content: <KText>Descripción del paso 2</KText>, target: '#element2' },
  ]}
  current={0}
  onStepChange={handleStepChange}
/>
```

### KModalConfirm
Modal de confirmacion para acciones criticas.
```tsx
interface KModalConfirmProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  onConfirm: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

<KModalConfirm
  open={confirmOpen}
  onClose={() => setConfirmOpen(false)}
  title="Confirmar eliminación"
  description="¿Estás seguro de que quieres eliminar este elemento?"
  onConfirm={handleDelete}
/>
```

### KFormList
Lista de formularios dinámicos para entradas múltiples.
```tsx
interface KFormListProps {
  fields: { key: string; name: string }[];
  onAdd?: () => void;
  onRemove?: (key: string) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

<KFormList
  fields={[
    { key: '1', name: 'Campo 1' },
    { key: '2', name: 'Campo 2' },
  ]}
  onAdd={handleAddField}
  onRemove={handleRemoveField}
/>
```

---

## Layout — AppShell

Estructura principal de la aplicacion con sidebar fijo, header y area de contenido.

```
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
```

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
```tsx
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
```

---

## Patrones y Convenciones

### Naming
- Todos los componentes llevan prefijo `K`: KButton, KInput, KDataTable, etc.
- Props siguen camelCase: `onChange`, `showIcon`, `pageSize`.
- Variantes usan union types: `'primary' | 'secondary' | 'outline'`.

### Imports
```tsx
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
```

### Espaciado consistente
- Gaps entre elementos: `khorTokens.spacing.sm` (8px)
- Padding de secciones: `khorTokens.spacing.lg` (24px)
- Margin entre secciones: 32px

### Responsive
- Grid: `gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'`
- Cards: min-width 280px
- Tablas: scroll horizontal en mobile
- Sidebar: colapsable a 64px

### Accesibilidad
- Todos los componentes interactivos tienen `aria-label` o label asociado
- Focus visible con outline khor-primary
- Contraste minimo WCAG AA (4.5:1 para texto normal)
- Navegacion completa por teclado (Tab, Enter, Escape, Flechas)
- No anidar `<button>` dentro de `<button>` — usar `<div role="button">` si es necesario

### Cosas a EVITAR
- NO usar `antd`, `@ant-design/*`, Material UI, ni Chakra UI
- NO usar `react-router-dom` — usar `react-router`
- NO usar `React.Fragment` con props inválidos (key, className) — usar `<span>` o `<div style={{ display: 'contents' }}>`
- NO anidar `<button>` dentro de `<button>`
- NO hardcodear colores — usar tokens o CSS variables

---