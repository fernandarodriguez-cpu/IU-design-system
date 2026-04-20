
# Sistema de Diseño Khor v10.6.0
Generado el: 20 de abril de 2026

Este documento es la única fuente de verdad para el desarrollo en el ecosistema Khor. Úsalo como contexto para que la IA genere código consistente, accesible y alineado con la marca.

## 🤖 Instrucciones Críticas para la IA (System Prompt)

Como IA, DEBES seguir estas reglas estrictamente al generar código:
1. **Identidad Visual:** NUNCA importes ni uses componentes directamente desde `antd`, `@ant-design/*`, Material UI o similares. Usa exclusivamente los componentes del sistema (prefijo `K`). Los componentes K* son la única abstracción oficial basada en Radix UI y Tailwind CSS v4; tú solo debes interactuar con la capa Khor.
2. **Uso de Tokens (Prohibido Hardcode):** NUNCA uses colores hexadecimales en el código (`#E04D36`). Usa SIEMPRE los Design Tokens (`khorTokens`) si estás en JS/TS, o CSS Variables (`var(--khor-*)`) si estás en CSS/Tailwind.
3. **Componentes Khor:** Ejemplo: `KButton`, `KInput`, `KCardSection`.
4. **Layout:** Usa Tailwind CSS SOLO para el layout (grid, flex, spacing) y clases de utilidad de Khor.
5. **React Router:** Usa `react-router` (v6/v7), NO `react-router-dom`.
6. **Iconografía:** Usa únicamente la librería `lucide-react`.
7. **Higiene del DOM:** Asegúrate de que las props personalizadas de Khor (ej. `variant`, `fullWidth`, `status`) no lleguen al elemento HTML nativo.
8. **Lovable/v0 Context:** Si estás generando una página completa, usa los **Patterns** (ej. `SidebarPattern`, `DashboardStatsPattern`) para acelerar la construcción y garantizar consistencia.

### ♿ Reglas Estrictas de Accesibilidad (A11y)
1. **Roles interactivos:** NUNCA uses `onClick` en elementos no interactivos (`div`, `span`). Usa siempre `<KButton>` o elementos semánticos.
2. **Atributos ARIA:** Todo elemento sin texto visible (ej. botones de solo ícono) DEBE tener un `aria-label` descriptivo.
3. **Imágenes:** Toda etiqueta `<img>` o componente de imagen debe incluir el atributo `alt`.
4. **Formularios:** Todos los inputs deben estar asociados a un label (usando el componente `KFormField`).


## 🎨 Especificación Técnica de Tokens (Fuente de Verdad)

Para que el código generado sea funcional, la IA DEBE conocer estos valores y DEBE incluirlos en su CSS global o mediante objeto de estilos si está en entorno aislado:

```css
:root {
  /* Colores de Marca y Estado */
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

  /* Geometría y Elevación (Myna-Adopted) */
  --khor-radius-sm: 6px;
  --khor-radius-md: 8px;
  --khor-radius-lg: 10px;
  --khor-radius-xl: 14px;
  --khor-shadow-sm: 0 1px 2px rgba(5,23,88,0.04), 0 1px 1px rgba(0,0,0,0.02);
  --khor-shadow-md: 0 4px 6px -1px rgba(5,23,88,0.08), 0 2px 4px -1px rgba(0,0,0,0.04);
  --khor-shadow-lg: 0 10px 15px -3px rgba(5,23,88,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
  --khor-shadow-xl: 0 20px 25px -5px rgba(5,23,88,0.12), 0 10px 10px -5px rgba(0,0,0,0.04);
  --khor-shadow-2xl: 0 25px 50px -12px rgba(5,23,88,0.25);
}
```

### Detalle Analítico de Tokens (Tabla extendida)

### Colores de Marca

| Token | Hex | CSS Variable | Uso |
|-------|-----|-------------|-----|
| Primary | `#E04D36` | `var(--khor-primary)` | CTAs, botones principales, enlaces activos |
| Secondary | `#051758` | `var(--khor-secondary)` | Botones secundarios, sidebar, titulos, navegacion |
| Accent | `#FF9500` | `var(--khor-accent)` | Warnings, destacados, badges, CTA destacado |

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
| info-light | `#E3F2FD` | Fondo de alertas informativas |
| teal | `#008080` | Color Teal de marca para dashboards |

### 📊 Escalas Funcionales (High-Fidelity)

Para estados complejos y visualización de datos, la IA DEBE usar estas escalas completas:

#### Success Scale
`50: #E8F5E9`, `100: #C8E6C9`, `200: #A5D6A7`, `300: #81C784`, `400: #66BB6A`, `500: #4CAF50`, `600: #43A047`, `700: #2E7D32`, `800: #1B5E20`, `900: #0D3E12`

#### Error Scale
`50: #FFEBEE`, `100: #FFCDD2`, `200: #EF9A9A`, `300: #E57373`, `400: #EF5350`, `500: #F44336`, `600: #E53935`, `700: #D32F2F`, `800: #C62828`, `900: #B71C1C`

#### Warning Scale
`50: #FFF3E0`, `100: #FFE0B2`, `200: #FFCC80`, `300: #FFB74D`, `400: #FFA726`, `500: #FF9800`, `600: #FB8C00`, `700: #F57C00`, `800: #EF6C00`, `900: #E65100`

#### Info Scale
`50: #E3F2FD`, `100: #BBDEFB`, `200: #90CAF9`, `300: #64B5F6`, `400: #42A5F5`, `500: #2196F3`, `600: #1E88E5`, `700: #1976D2`, `800: #1565C0`, `900: #0D47A1`

#### Teal Scale
`50: #E0F2F1`, `100: #B2DFDB`, `200: #80CBC4`, `300: #4DB6AC`, `400: #26A69A`, `500: #009688`, `600: #00897B`, `700: #00796B`, `800: #00695C`, `900: #004D40`

### 🌈 Feedback Extendido v10.4 (Paleta Premium)

| Token | Hex | Uso |
|-------|-----|-----|
| processing | `#0EA5E9` | Estados activos, progreso, sync |
| volcano | `#EA580C` | Alertas criticas, acento calido |
| gold | `#EAB308` | Destacados, premium, badges |
| lime | `#84CC16` | Crecimiento, ecologia, salud |
| purple | `#A855F7` | IA, magia, premium, funciones avanzadas |

**Nota para la IA:** En Tailwind v4, estos colores se consumen como `bg-khor-primary`, `text-khor-secondary`, `border-khor-accent`, etc.

### Tipografia

| Escala | Tamano | Peso | Line Height | Fuente |
|--------|--------|------|-------------|--------|
| display1| 64px | 700 (bold) | 1.1 | Montserrat |
| display2| 48px | 700 | 1.1 | Montserrat |
| h1 | 38px | 700 | 1.2 | Montserrat |
| h2 | 30px | 700 | 1.2 | Montserrat |
| h3 | 24px | 600 | 1.3 | Montserrat |
| body-lg | 16px | 400 | 1.5 | Montserrat |
| body-md | 14px | 400 | 1.5 | Montserrat |
| small | 12px | 500 | 1.5 | Montserrat |
| caption | 11px | 400 | 1.4 | Montserrat |
| overline| 10px | 600 | 1.2 | Montserrat |

**Importar fuentes:**
```css
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
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

### 🌑 Sombras (Construcción Técnica para Paridad Figma/Penpot)

Las sombras en Khor son multi-capa para realismo. La IA DEBE replicarlas exactamente en CSS:

| Token | CSS Variable (Box-Shadow) | Construcción Técnica (X, Y, Blur, Spread, Contrast) |
|-------|--------------------------|-------------------------------------------------------|
| **SM** | `var(--khor-shadow-sm)` | `0 1 2 [rgba(5,23,88,0.04)]`, `0 1 1 [rgba(0,0,0,0.02)]` |
| **MD** | `var(--khor-shadow-md)` | `0 4 6 -1 [rgba(5,23,88,0.08)]`, `0 2 4 -1 [rgba(0,0,0,0.04)]` |
| **LG** | `var(--khor-shadow-lg)` | `0 10 15 -3 [rgba(5,23,88,0.1)]`, `0 4 6 -2 [rgba(0,0,0,0.05)]` |
| **XL** | `var(--khor-shadow-xl)` | `0 20 25 -5 [rgba(5,23,88,0.12)]`, `0 10 10 -5 [rgba(0,0,0,0.04)]` |
| **2XL** | `var(--khor-shadow-2xl)` | `0 25 50 -12 [rgba(5,23,88,0.25)]` |
| **Inner** | `var(--khor-shadow-inner)` | `inset 0 2 4 [rgba(0,0,0,0.06)]` |

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

### Tokens Semánticos (Action, Surface, Text)

Khor v3.1 introduce tokens semánticos (independientes del modo claro/oscuro) para garantizar escalabilidad:
```css
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
```
*(IMPORTANTE para la IA: Preferir SIEMPRE la capa Semántica sobre primitivos crudos).*

### Tokens de Densidad (.khor-compact / .khor-comfortable)

Soportado a través de inyecciones automáticas o agregando `className="khor-compact"` en contenedores padre:
```css
/* .khor-compact reduce drásticamente vacíos para Data-dashboards */
--khor-density-spacing-md: 8px;      /* Default: 16px */
--khor-density-height-input: 28px;   /* Default: 36px */
--khor-density-font-body: 12px;      /* Default: 14px */
```

### Motion y Easing

Usa variables para animar componentes consistentes:
```css
transition: all var(--khor-duration-normal) var(--khor-easing-standard);

/* Durations */
--khor-duration-fast: 100ms;
--khor-duration-normal: 200ms;
--khor-duration-slow: 400ms;

/* Easings */
--khor-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
--khor-easing-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);  /* Efectos modales o drawer bounce */
```

### Accesibilidad WCAG (Los 8 Gaps de Clase Mundial)

Khor v3.1.2 soluciona los gaps críticos detectados en auditorías previas:
1. **Reducción de Movimiento:** Soporta `prefers-reduced-motion` para usuarios con sensibilidad vestibular.
2. **Foco Visible:** Anillos de enfoque de alto contraste (`focus-visible`) en todos los elementos interactivos.
3. **Jerarquía Semántica:** Estructura de encabezados (H1-H6) estrictamente secuencial.
4. **Contraste AA:** Todos los tokens de texto cumplen con el ratio 4.5:1 sobre sus fondos respectivos.
5. **Navegación por Teclado:** Soporte nativo para Tab, Enter, Escape y Flechas en todos los componentes.
6. **Anunciadores ARIA:** Uso de `aria-live` y roles semánticos para lectores de pantalla.
7. **Touch Targets:** Tamaño mínimo de click de 44x44px en elementos interactivos.
8. **Feedback de Error:** Mensajes de error claros vinculados mediante `aria-describedby`.

### Registro de Cambios (Changelog)

| Versión | Fecha | Cambios |
|---------|-------|---------|
| **v3.1.4** | 30 Mar 2026 | **Refinamiento:** Lógica `fullWidth` en KButton. Optimización del orden del System Prompt para IA. Inyección de reglas estrictas A11y. |
| **v3.1.3** | 30 Mar 2026 | **Gobernanza:** Implementación de Linter de Accesibilidad (jsx-a11y) y configuración externa. |
| **v3.1.2** | 30 Mar 2026 | **Gobernanza:** Restauración de instrucciones para IA. Solución de los 8 Gaps de Accesibilidad. |

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
## Átomos (31 componentes)

Unidades indivisibles y fundamentales.
Importar desde: `import { KButton } from '@khor/design-system/atoms/index'`

### KButton
Boton principal del sistema con 6 variantes semanticas de Khor (Radix UI + custom), incluyendo estados de interaccion (hover +10% brightness, active -10% brightness, disabled greyscale 50%).

> **Directrices IA**: Al generar interfaces, prioriza variant="primary" para la accion mas importante. Usa variant="navy" para acciones de navegacion. Los botones disabled deben ser ignorados por el flujo de IA.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Navega al componente y lanza focus ring. Enter/Space: Dispara evento onClick.
- **ARIA:** role="button" aria-disabled="true" y tabIndex={-1} cuando desactivado. aria-busy="true" global durante loading.
- **Contraste:** AAA sobre blanco

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `variant` | `'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'navy'` | No | `'primary'` | Variante visual del botón. |
| `size` | `'sm' | 'md' | 'lg'` | No | `'md'` | Tamaño del botón. |
| `icon` | `ReactNode` | No | - | Icono Lucide. Tamaño recomendado: 16px. |
| `iconPosition` | `'start' | 'end'` | No | `'start'` | Posición del icono relativa al texto. |
| `loading` | `boolean` | No | `false` | Muestra spinner de carga y deshabilita el botón. |
| `disabled` | `boolean` | No | `false` | Desactiva el botón. |
| `block` | `boolean` | No | `false` | Ancho completo del contenedor. |
| `onClick` | `(e: MouseEvent) => void` | No | - | Callback al hacer click. |
| `children` | `ReactNode` | Si | - | Contenido del botón. |

**Ejemplo de Uso:**
```tsx
import { KButton } from '@khor/design-system/atoms/index';

// Variantes disponibles: primary | secondary | outline | ghost | danger | navy
// Tamanos: sm | md | lg

<KButton variant="primary" size="md" icon={<Save size={16} />}>
  Guardar
</KButton>

<KButton danger size="sm" icon={<Trash2 size={16} />}>
  Eliminar
</KButton>

<KButton variant="navy" loading>
  Procesando...
</KButton>

<KButton variant="outline" disabled>
  Desactivado
</KButton>
```

**Guidelines UX:**
- Usa variant="primary" para la accion principal de una pantalla (maximo 1 por vista).
- Usa variant="danger" solo para acciones destructivas como "Eliminar" o "Despedir".
- Tamano sm para tablas y toolbars, md para formularios, lg para CTAs destacados.
- Siempre incluye un icono Lucide (16px, stroke 2px) para mejorar la escaneabilidad.

---

### KInput
Sistema unificado de entrada de datos. Incluye variantes para texto simple, contraseñas, búsquedas, áreas de texto multilínea y códigos OTP. Paridad 100% con Ant Design v5.

> **Directrices IA**: KInput es ahora un Compound Component. Prioriza el uso de KInput.Password y KInput.Search sobre tipos de input nativos para mejor accesibilidad y funcionalidad.

**Accesibilidad (ARIA & Keyboard - Score: 98/100)**
- **Keyboard:** Tab: Foco nativo al input. Esc: Limpia si allowClear=true. Arrow keys (OTP): Navegación entre slots. Enter (Search): Dispara búsqueda.
- **ARIA:** aria-invalid="true" cuando entra en error. role="textbox" (base/textarea). aria-label automáticamente inferido en OTP slots.
- **Contraste:** AA Mínimo para el texto ingresado (>4.5:1)

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `size` | `'sm' | 'md' | 'lg'` | No | `'md'` | Tamaño del componente. |
| `variant` | `'outlined' | 'borderless' | 'filled'` | No | `'outlined'` | Variante visual. |
| `status` | `'error' | 'warning'` | No | - | Estado de validación. |
| `prefix / suffix` | `ReactNode` | No | - | Elementos al inicio o final. |
| `allowClear` | `boolean | { clearIcon: ReactNode }` | No | - | Botón para limpiar el contenido. |
| `showCount` | `boolean | { formatter: Function }` | No | - | Muestra contador de caracteres. |
| `visibilityToggle (Password)` | `boolean | object` | No | - | Control de visibilidad de contraseña. |
| `enterButton (Search)` | `boolean | ReactNode` | No | - | Muestra botón de búsqueda. |
| `loading (Search)` | `boolean` | No | - | Estado de carga en búsqueda. |
| `autoSize (TextArea)` | `boolean | object` | No | - | Ajuste automático de altura. |

**Ejemplo de Uso:**
```tsx
import { KInput } from '@khor/design-system/atoms/index';

// 1. Base Input con Limpieza
<KInput placeholder="Email" allowClear />

// 2. Password (Compound)
<KInput.Password placeholder="Contrasena" visibilityToggle />

// 3. Search (Compound)
<KInput.Search 
  placeholder="Buscar..." 
  loading 
  enterButton="Buscar" 
  onSearch={v => console.log(v)} 
/>

// 4. TextArea (Compound)
<KInput.TextArea 
  autoSize={{ minRows: 2, maxRows: 6 }} 
  showCount 
/>

// 5. OTP (Compound)
<KInput.OTP length={6} onComplete={v => alert(v)} />
```

**Guidelines UX:**
- Utiliza KInput como namespace para acceder a todas las variantes (.Password, .Search, etc).
- Prefiere allowClear para mejorar la experiencia de usuario en filtros.
- Usa status="error" para validaciones obligatorias fallidas.
- OTP gestiona el foco automáticamente; no es necesario manejar refs manuales.

---

### KBadge
Notificador de estados o contadores sobre elementos. Incluye variante Ribbon para cintas en esquinas. Paridad 100% con Ant Design v5.

> **Directrices IA**: KBadge soporta modo standalone (dot+text) y modo flotante (count). Usa Ribbon para banners promocionales o de estado en esquinas.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** No aplica nativamente.
- **ARIA:** role="status" aplicable al contenedor padre. title para tooltips nativos.
- **Contraste:** AAA sobre elemento indicador, AA sobre texto adjunto.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `status` | `'success' | 'error' | 'warning' | 'info' | 'default' | 'processing'` | No | - | Estado semántico predefinido. |
| `text` | `ReactNode` | No | - | Texto junto al punto (en standalone mode). |
| `count` | `ReactNode` | No | - | Valor numérico o nodo a mostrar en el badge. |
| `overflowCount` | `number` | No | `99` | Límite máximo antes de mostrar "+". |
| `dot` | `boolean` | No | - | Muestra un punto rojo (o color status) sin número. |
| `offset` | `[x, y]` | No | - | Desplazamiento del badge. |
| `color` | `string` | No | - | Color de fondo personalizado (hex o preset). |
| `size` | `'default' | 'small'` | No | - | Tamaño del badge. |
| `title` | `string` | No | - | Texto al pasar el mouse. |
| `KBadge.Ribbon` | `Sub-component` | No | - | Cinta decorativa para esquinas. |

**Ejemplo de Uso:**
```tsx
import { KBadge } from '@khor/design-system/atoms/index';

// 1. Contador sobre icono
<KBadge count={5}>
  <Bell size={24} />
</KBadge>

// 2. Estado standalone (AntD Style)
<KBadge status="success" text="Aprobado" />

// 3. Ribbon (Cinta)
<KBadge.Ribbon text="VIP" color="gold">
  <Card>Contenido</Card>
</KBadge.Ribbon>
```

**Guidelines UX:**
- Usa status para indicadores de sistema standalone.
- Usa count para notificaciones de usuario sobre iconos o avatares.
- Ribbon es ideal para destacar tarjetas o secciones completas.

---

### KTag
Etiqueta de categorizacion con colores del sistema. Soporta cierre (closable) para tags removibles.

> **Directrices IA**: KTag implementa paridad total con AntD v5. Incluye CheckableTag y gestión interna de visibilidad si onClose no se maneja externamente.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Space/Enter: Cierra el tag si es "closable" y tiene foco.
- **ARIA:** role="status" para tags informativos. aria-label para el botón de cierre.
- **Contraste:** Relación 4.5:1 mantenida en todos los presets de color.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `color` | `KTagColor | string` | No | - | Presets de AntD (magenta, volcano, gold, etc.) o color CSS. |
| `closable` | `boolean` | No | - | Muestra un botón de cierre. |
| `bordered` | `boolean` | No | `true` | Define si tiene borde visible. |
| `icon` | `ReactNode` | No | - | Icono al inicio del tag. |
| `onClose` | `(e) => void` | No | - | Callback al cerrar. Si no se provee, el componente se oculta automáticamente. |
| `closeIcon` | `ReactNode` | No | - | Icono de cierre personalizado. |
| `checked` | `boolean` | No | - | Estado en CheckableTag. |
| `KTag.CheckableTag` | `Sub-component` | No | - | Variante interactiva tipo toggle. |

**Ejemplo de Uso:**
```tsx
import { KTag } from '@khor/design-system/atoms/index';

// 1. Uso Básico y Colores
<KTag color="blue">Nuevo</KTag>
<KTag color="success">Completado</KTag>

// 2. Removible (Closable)
<KTag closable onClose={() => console.log('Removido')}>
  Eliminar
</KTag>

// 3. Seleccionable (Checkable)
<KTag.CheckableTag 
  checked={checked} 
  onChange={(val) => setChecked(val)}
>
  Tag Seleccionable
</KTag.CheckableTag>

// 4. Con Icono y Personalización
<KTag icon={<Star size={12} />} color="gold" bordered={false}>
  Premium
</KTag>
```

**Guidelines UX:**
- Usa CheckableTag para filtros persistentes.
- Usa colores semánticos (success, error) para estados del sistema.
- Los colores de preset AntD son ideales para categorización visual variada.

---

### KAvatar
Avatar de usuario con soporte para imagen, iniciales autoajustables, icono, estado de presencia y color personalizable. KAvatarGroup soporta max count con indicador +N. Paridad completa con AntD Avatar.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Cuando onClick está definido, el avatar es focuseable con Tab y activable con Enter/Space.
- **ARIA:** alt se aplica automáticamente a la imagen. Si se omite, usa name como fallback. El indicador de estado incluye aria-label descriptivo. onClick convierte el avatar en role="button" con tabIndex=0.
- **Contraste:** AAA entre texto blanco (#FFF) y fondo Navy (#051758). Indicadores de estado cumplen WCAG AA.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `src` | `string` | No | - | URL de imagen del avatar. |
| `alt` | `string` | No | - | Texto alternativo para la imagen (accesibilidad). Si se omite, usa name. |
| `srcSet` | `string` | No | - | Atributo srcSet para imágenes responsive. |
| `crossOrigin` | `'' | 'anonymous' | 'use-credentials'` | No | - | Política CORS para la imagen. |
| `draggable` | `boolean` | No | - | Si la imagen es arrastrable. |
| `name` | `string` | No | - | Nombre de usuario. Las iniciales se generan automáticamente (primeras 2 palabras). |
| `icon` | `ReactNode` | No | - | Icono a mostrar como fallback en lugar de iniciales. |
| `size` | `'sm' | 'md' | 'lg' | 'xl' | number` | No | `'md'` | Tamaño del avatar. Acepta valor numérico en px. |
| `shape` | `'circle' | 'square'` | No | `'circle'` | Forma del avatar. |
| `status` | `'online' | 'offline' | 'busy' | 'away'` | No | - | Indicador de presencia con punto de color. |
| `gap` | `number` | No | `4` | Distancia en px entre el borde y el texto de iniciales. Controla el auto-sizing del texto. |
| `color` | `string` | No | - | Color de fondo personalizado. Default: Navy (#051758). |
| `onError` | `() => boolean | void` | No | - | Callback cuando la imagen falla. Retornar false previene el fallback automático. |
| `onClick` | `(e: MouseEvent) => void` | No | - | Handler de click. Convierte el avatar en elemento interactivo con role="button". |
| `children` | `ReactNode` | No | - | Contenido personalizado (texto, icono, etc.). |

**Ejemplo de Uso:**
```tsx
import { KAvatar, KAvatarGroup } from '@khor/design-system/atoms/index';

// Imagen con alt
<KAvatar src="/avatar.jpg" alt="Maria Garcia" size="lg" status="online" />

// Iniciales automáticas
<KAvatar name="Maria Garcia" size="md" status="busy" />

// Icono personalizado
<KAvatar icon={<User size={20} />} size="md" />

// Color personalizado
<KAvatar name="AB" color="#7C3AED" />

// Auto-size texto (gap controla el padding interno)
<KAvatar name="Alexander Benjamin" size="sm" gap={2} />

// Avatar Group con max count
<KAvatarGroup max={3} size="md" shape="circle">
  <KAvatar name="Juan Pérez" status="online" />
  <KAvatar name="María García" status="away" />
  <KAvatar name="Carlos Ruiz" />
  <KAvatar name="Ana López" />
</KAvatarGroup>

// onError: prevenir fallback
<KAvatar src="/maybe-broken.jpg" onError={() => { console.log('Error!'); return false; }} />
```

**Guidelines UX:**
- Cuando hay imagen (src), se muestra. Si falla, cae a icon > iniciales > fallback (User icon).
- El fondo de las iniciales usa color.brand.navy por defecto. Usa la prop color para personalizar.
- Tamaño sm para listas densas, md para headers, lg/xl para perfiles.
- gap controla el auto-sizing del texto: valores bajos permiten texto más grande, valores altos más padding.
- KAvatarGroup con max muestra los primeros N avatares y un indicador "+X" con los sobrantes.
- Siempre incluir alt cuando se usa src para cumplir con accesibilidad WCAG.

---

### KSwitch
Interruptor on/off con etiqueta opcional. Para configuraciones binarias.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Navega. Barra Espaciadora: Alterna (toggle).
- **ARIA:** role="switch" (nativamente mapeado por Radix). aria-checked se sincroniza.
- **Contraste:** AAA en el punto blanco sobre track activo

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `checked` | `boolean` | No | - | Estado actual. |
| `onCheckedChange` | `(checked: boolean) => void` | No | - | Callback al cambiar. |
| `size` | `'small' | 'default'` | No | `'default'` | Tamaño del switch. |
| `checkedChildren / unCheckedChildren` | `ReactNode` | No | - | Texto o iconos dentro del track. |

**Ejemplo de Uso:**
```tsx
import { KSwitch } from '@khor/design-system/atoms/index';

<KSwitch
  label="Notificaciones activas"
  checked={isActive}
  onCheckedChange={setIsActive}
  checkedChildren="ON"
  unCheckedChildren="OFF"
/>
```

**Guidelines UX:**
- Siempre incluye una etiqueta descriptiva.
- Usa para preferencias binarias, no para acciones transaccionales.

---

### KCheckbox
Casilla de verificación básica para selección de estados booleanos o grupos de opciones múltiples con KCheckbox.Group.

> **Directrices IA**: KCheckbox utiliza Radix UI Checkbox bajo el capó. Soporta paridad total con AntD v5 incluyendo Group y Indeterminate.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Enfocar casilla. Space: Cambiar estado (checked/unchecked).
- **ARIA:** role="checkbox" aplicado automáticamente. aria-checked refleja el estado actual incluyendo indeterminate.
- **Contraste:** Borde y check cumplen con ratio 3:1 mínimo.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `checked` | `boolean | 'indeterminate'` | No | - | Estado de la casilla. |
| `label` | `ReactNode` | No | - | Texto descriptivo adjunto. |
| `status` | `'error' | 'warning' | 'default'` | No | - | Variante de validación. |
| `disabled` | `boolean` | No | - | Desactiva la interacción. |
| `KCheckbox.Group` | `Sub-component` | No | - | Contenedor para múltiples opciones. |
| `options` | `string[] | Option[]` | No | - | Opciones dinámicas para el grupo. |
| `styles` | `object` | No | - | Estilos semánticos (root, input, label). |

**Ejemplo de Uso:**
```tsx
import { KCheckbox } from '@khor/design-system/atoms/index';

// 1. Uso básico
<KCheckbox label="Aceptar términos" />

// 2. Estado indeterminado (Radix/AntD Parity)
<KCheckbox checked="indeterminate" label="Selección parcial" />

// 3. Grupo de opciones
<KCheckbox.Group 
  options={[
    { label: 'Manzana', value: 'apple' },
    { label: 'Pera', value: 'pear' },
    { label: 'Naranja', value: 'orange', disabled: true },
  ]} 
  defaultValue={['apple']} 
  onChange={(values) => console.log(values)} 
/>
```

**Guidelines UX:**
- Usa Checkbox para opciones no excluyentes (múltiple selección).
- El estado indeterminate es útil para checkboxes "padre" que controlan una lista.
- Prefiere KCheckbox.Group para manejar estados de formularios complejos.

---

### KRadio
Grupo de opciones mutuamente excluyentes con soporte para layout vertical/horizontal y variante de boton.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Up/Down/Left/Right: Mueve el foco al siguiente/previo item y lo selecciona. Tab: Entra y sale del contenedor principal.
- **ARIA:** role="radiogroup" asignado al contenedor role="radio" y aria-checked asignados a cada elemento.
- **Contraste:** AAA en anillo indicador

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `options` | `{ label: string; value: string | number; disabled?: boolean }[] | string[]` | Si | - | Array de opciones del grupo de radio. |
| `value` | `string` | No | - | Valor actualmente seleccionado (controlado). |
| `onValueChange` | `(value: string) => void` | No | - | Callback al cambiar la selección. |
| `direction` | `'horizontal' | 'vertical'` | No | `'horizontal'` | Orientación del grupo de opciones. |
| `optionType` | `'default' | 'button'` | No | `'default'` | Estilo visual: radio clásico o grupo de botones. |
| `buttonStyle` | `'solid' | 'outline'` | No | `'outline'` | Aplica solo cuando optionType="button". solid=relleno, outline=solo borde. |
| `size` | `'small' | 'default' | 'large'` | No | `'default'` | Tamaño del grupo de radio. |
| `disabled` | `boolean` | No | `false` | Deshabilita todas las opciones del grupo. |

**Ejemplo de Uso:**
```tsx
import { KRadio } from '@khor/design-system/atoms/index';

<KRadio.Group
  options={[
    { label: 'Empleado', value: 'emp' },
    { label: 'Contratista', value: 'con' },
  ]}
  value={tipo}
  onValueChange={setTipo}
/>

// Variante de botones
<KRadio.Group optionType="button" options={...} />
```

**Guidelines UX:**
- Máximo 5-6 opciones. Para más opciones, usa KSelectField.
- optionType="button" ideal para filtros y toggles de vista.
- KRadio.Button puede usarse standalone para casos personalizados dentro de un Group.

---

### KTooltip
Informacion contextual al pasar el cursor. Usa la elevacion media (shadow md).

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Al recibir el foco por teclado, Tooltip se expande auto.
- **ARIA:** role="tooltip" asignado. Se enlaza dinámicamente con aria-describedby al elemento desencadenador.
- **Contraste:** AAA sobre UI oscura

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `title` | `string` | Si | - | Texto del tooltip. |
| `placement` | `'top' | 'bottom' | 'left' | 'right'` | No | `'top'` | Posicion. |
| `children` | `ReactNode` | Si | - | Elemento que activa el tooltip. |

**Ejemplo de Uso:**
```tsx
import { KTooltip } from '@khor/design-system/atoms/index';

<KTooltip title="Guardar cambios" placement="top">
  <KButton variant="primary">Guardar</KButton>
</KTooltip>
```

**Guidelines UX:**
- Maximo 60 caracteres por tooltip.
- No uses para informacion critica — esa debe ser visible siempre.

---

### KProgress
Barra de progreso para indicar completitud de procesos, cargas o pasos.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** No interactivo. Funciona como indicador pasivo.
- **ARIA:** role="progressbar" aria-valuenow, aria-valuemin, aria-valuemax manejados dinámicamente.
- **Contraste:** AAA entre color de la barra (ej: #2E7D32) y track neutro.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `value` | `number` | Si | - | Porcentaje de progreso (0-100). |
| `max` | `number` | No | `100` | Valor maximo. |
| `status` | `'success' | 'exception' | 'active'` | No | - | Estado visual. |
| `showInfo` | `boolean` | No | `true` | Muestra el porcentaje. |
| `strokeColor` | `string` | No | - | Color personalizado de la barra. |

**Ejemplo de Uso:**
```tsx
import { KProgress } from '@khor/design-system/atoms/index';

<KProgress value={75} />
<KProgress value={100} status="success" />
<KProgress value={30} strokeColor="#FF9500" />
```

**Guidelines UX:**
- Usa status="success" cuando llega a 100%.
- strokeColor por defecto es el Rojo Khor primary.

---

### KTypography
Sistema completo de texto que incluye encabezados (Title), párrafos, enlaces y texto básico con interacciones avanzadas (Edición, Copia, Truncado).

> **Directrices IA**: Implementa paridad total con AntD v5. Soporta props legadas (variant, color) en KText para compatibilidad.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Enfoque automático al entrar en modo edición. Soporte de ESC para cancelar edición.
- **ARIA:** Uso correcto de etiquetas h1-h5. aria-label en botones de copia y edición.
- **Contraste:** Todos los tipos semánticos cumplen con ratio 4.5:1 mín.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `KTypography.Title` | `Sub-component` | No | - | Heading con prop level (1-5). |
| `copyable` | `boolean | object` | No | - | Permite copiar el texto al portapapeles. |
| `editable` | `boolean | object` | No | - | Habilita edición en línea in-place. |
| `ellipsis` | `boolean | object` | No | - | Truncado de texto con soporte multi-línea (rows). |
| `type` | `'secondary' | 'success' | 'warning' | 'danger'` | No | - | Variante semántica de color. |
| `strong | italic | underline | code | mark | keyboard` | `boolean` | No | - | Formatos de estilo rápido. |

**Ejemplo de Uso:**
```tsx
import { KTypography } from '@khor/design-system/atoms/index';

// 1. Encabezado con nivel
<KTypography.Title level={2}>Título Principal</KTypography.Title>

// 2. Texto Interactivo
<KTypography.Paragraph copyable editable={{ onChange: (val) => update(val) }}>
  Contenido editable y copiable.
</KTypography.Paragraph>

// 3. Formato Semántico
<KTypography.Text type="danger" strong underline>
  Error importante subrayado
</KTypography.Text>

// 4. Enlaces
<KTypography.Link href="https://khor.com" target="_blank">
  Documentación
</KTypography.Link>
```

**Guidelines UX:**
- Usa KTypography.Title para jerarquía visual clara (SEO friendly).
- El modo editable es ideal para nombres de archivos o configuraciones rápidas.
- Asegura que el texto copiable sea útil para el usuario (ids, tokens, rutas).

---

### KAlert
Componente de alerta con 4 tipos semánticos (success, error, warning, info). Incluye icono automático, título, descripción y opción de cerrar.

> **Directrices IA**: KAlert para mensajes de feedback que permanecen visibles. La IA debe elegir el tipo correcto según el contexto.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Space/Enter: Descarta alerta si closable tiene foco.
- **ARIA:** role="alert" implementado para live regions (lector la anunciará inmediatamente). aria-label en el icono de cierre.
- **Contraste:** AAA sobre combinaciones fondo tintado / texto oscuro nativo de alerta.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `type` | `'success' | 'error' | 'warning' | 'info'` | No | `'info'` | Tipo semántico de la alerta. |
| `title` | `string` | Si | - | Título de la alerta. |
| `description` | `string` | No | - | Descripción detallada. |
| `closable` | `boolean` | No | `false` | Permite cerrar la alerta. |
| `showIcon` | `boolean` | No | `true` | Muestra icono semántico. |
| `onClose` | `() => void` | No | - | Callback al cerrar. |

**Ejemplo de Uso:**
```tsx
import { KAlert } from '@khor/design-system/atoms/index';

<KAlert type="success" title="Guardado exitoso" description="Los cambios fueron aplicados." closable />
<KAlert type="error" title="Error" description="No se pudo procesar la solicitud." />
<KAlert type="warning" title="Atención" description="Faltan campos obligatorios." />
<KAlert type="info" title="Info" description="Nueva actualización disponible." />
```

**Guidelines UX:**
- Usa para mensajes de feedback persistentes (no para notificaciones efímeras, usa KToast para eso).
- El tipo debe coincidir con la semántica del mensaje.

---

### KSkeleton
Placeholder de carga que indica al usuario que el contenido está cargando. Soporta rectángulos, círculos y múltiples líneas de texto.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** No aplicable.
- **ARIA:** role="status" o aria-busy="true" recomendado para el contenedor padre mientras la carga ocurre.
- **Contraste:** Animación pulsante cumple con directrices de destello sutil (sin parpadeos rápidos).

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `width` | `number | string` | No | `'100%'` | Ancho del skeleton. |
| `height` | `number | string` | No | `16` | Alto del skeleton. |
| `circle` | `boolean` | No | - | Forma circular (para avatares). |
| `lines` | `number` | No | - | Número de líneas de texto (la última es más corta). |

**Ejemplo de Uso:**
```tsx
import { KSkeleton } from '@khor/design-system/atoms/index';

<KSkeleton lines={3} />
<KSkeleton circle height={48} />
<KSkeleton width={200} height={40} />
```

**Guidelines UX:**
- Usa para indicar carga de contenido, no para carga de página completa (usa KSpin para eso).

---

### KSlider
Control deslizante para seleccionar un valor numérico dentro de un rango. Basado en Radix UI Slider con tokens Khor.

**Accesibilidad (ARIA & Keyboard - Score: 95/100)**
- **Keyboard:** Up/Right: Sube valor. Down/Left: Baja valor. Home/End: Valores extremos.
- **ARIA:** role="slider" aria-valuenow, aria-valuemin, aria-valuemax inyectados. aria-disabled cuando aplica.
- **Contraste:** AAA sobre punto visual, AA track sobre fondo de tarjeta.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `value` | `number[]` | No | - | Valor controlado (array de numeros). |
| `defaultValue` | `number[]` | No | `[50]` | Valor inicial. |
| `min` | `number` | No | `0` | Valor mínimo. |
| `max` | `number` | No | `100` | Valor máximo. |
| `step` | `number` | No | `1` | Incremento. |
| `onValueChange` | `(value: number[]) => void` | No | - | Callback al cambiar. |
| `disabled` | `boolean` | No | - | Desactiva el slider. |
| `showValue` | `boolean` | No | `true` | Muestra el valor actual. |

**Ejemplo de Uso:**
```tsx
import { KSlider } from '@khor/design-system/atoms/index';

<KSlider value={[volume]} onValueChange={(v) => setVolume(v[0])} min={0} max={100} step={1} />
<KSlider defaultValue={[50]} disabled />
```

**Guidelines UX:**
- Usa para valores continuos como volumen, brillo, porcentaje.
- Para valores discretos con pocas opciones, usa KRadio variant="button".

---

### KRate
Componente de calificación con estrellas. Permite al usuario seleccionar una puntuación de 1 a N.

**Accesibilidad (ARIA & Keyboard - Score: 90/100)**
- **Keyboard:** Left/Right: Mueve foco individual entre estrellas. Enter/Space: Confirma calificación.
- **ARIA:** Construido internamente como radiogroup o slider bidireccional. aria-label global del contenedor recomendado.
- **Contraste:** AAA en estado seleccionado (Accent: Naranja Khor).

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `value` | `number` | No | - | Valor controlado. |
| `defaultValue` | `number` | No | `0` | Valor inicial. |
| `count` | `number` | No | `5` | Número de estrellas. |
| `onChange` | `(value: number) => void` | No | - | Callback al seleccionar. |
| `disabled` | `boolean` | No | - | Solo lectura. |
| `allowHalf` | `boolean` | No | `false` | Permite medias estrellas. |

**Ejemplo de Uso:**
```tsx
import { KRate } from '@khor/design-system/atoms/index';

<KRate value={rating} onChange={setRating} />
<KRate defaultValue={4} count={10} />
<KRate defaultValue={3} disabled />
```

**Guidelines UX:**
- Usa para evaluaciones, feedback de satisfacción.
- El color accent (naranja) se usa por convención para estrellas.

---

### KSpin
Indicador de carga circular con texto opcional. Para estados de carga de página o secciones completas.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** No aplicable.
- **ARIA:** role="status" aplicable al contenedor padre.
- **Contraste:** AAA asegurada en texto tip.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `size` | `'sm' | 'md' | 'lg' | 'xl'` | No | `'md'` | Tamaño del spinner. |
| `color` | `string` | No | `khor.primary` | Color del spinner. |

**Ejemplo de Uso:**
```tsx
import { KSpin } from '@khor/design-system/atoms/index';

<KSpin size="md" />
<KSpin size="lg" />
<KSpin size="sm" color="#051758" />
```

**Guidelines UX:**
- Usa para carga de secciones o páginas completas.
- Para carga de contenido específico, usa KSkeleton.

---

### KDivider
Separador visual horizontal para dividir secciones de contenido. Usa el color neutral.200 del sistema.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** No interactivo.
- **ARIA:** role="separator" detectado nativamente por lectores de pantalla.
- **Contraste:** Decorative (Contraste visual AA).

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `className` | `string` | No | - | Clase CSS adicional. |

**Ejemplo de Uso:**
```tsx
import { KDivider } from '@khor/design-system/atoms/index';

<div>
  <p>Contenido A</p>
  <KDivider />
  <p>Contenido B</p>
</div>
```

**Guidelines UX:**
- Usa para separar secciones dentro de cards o formularios.
- No abuses de dividers — el espaciado y agrupacion son mas efectivos.

---

### KTextArea
Area de texto multilinea con soporte para contador de caracteres, longitud maxima, estados de error y redimensionamiento vertical.

**Accesibilidad (ARIA & Keyboard - Score: 95/100)**
- **Keyboard:** Tab: Navega adentro/fuera. Enter: Salto de línea.
- **ARIA:** aria-invalid se enciende automáticamente. aria-describedby apunta al texto de error.
- **Contraste:** AA textos grises, AAA texto negro

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `placeholder` | `string` | No | - | Texto placeholder. |
| `rows` | `number` | No | `4` | Numero de filas visibles. |
| `disabled` | `boolean` | No | `false` | Desactiva el textarea. |
| `value` | `string` | No | - | Valor controlado. |
| `onChange` | `(e) => void` | No | - | Callback al cambiar. |
| `error` | `string` | No | - | Mensaje de error. |
| `maxLength` | `number` | No | - | Longitud maxima de caracteres. |

**Ejemplo de Uso:**
```tsx
import { KTextArea } from '@khor/design-system/atoms/index';

<KTextArea
  placeholder="Descripcion..."
  rows={4}
  maxLength={500}
/>

<KTextArea
  placeholder="Campo obligatorio"
  error="Este campo es obligatorio"
/>
```

**Guidelines UX:**
- Usa showCount con maxLength para campos con limite de caracteres.
- rows=3-4 para campos cortos, 6+ para descripciones largas.

---

### KButtonGroup
Agrupa botones relacionados en una fila unificada con bordes compartidos o espaciado controlado.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `size` | `'sm' | 'md' | 'lg'` | No | - | Espaciado entre botones. |
| `direction` | `'horizontal' | 'vertical'` | No | - | Flujo. |

**Ejemplo de Uso:**
```tsx
<KButtonGroup>
  <KButton variant="secondary">Anterior</KButton>
  <KButton variant="secondary">Siguiente</KButton>
</KButtonGroup>
```

**Guidelines UX:**
- Usa para acciones relacionadas como paginacion o vistas.

---

### KSearchInput
Input de búsqueda unificado con icono y botón de limpieza.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `placeholder` | `string` | No | - | Placeholder. |
| `size` | `'sm' | 'md' | 'lg'` | No | - | Tamaño. |
| `onSearch` | `(v: string) => void` | No | - | Callback de búsqueda. |

**Ejemplo de Uso:**
```tsx
<KSearchInput onSearch={(v) => console.log(v)} />
```

**Guidelines UX:**
- Centralizado en Atoms para uso global.
- Usa para búsquedas primarias en el sistema.

---

### KLabel
Etiqueta para campos de formulario con indicador de campo obligatorio y tooltip de informacion.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `children` | `ReactNode` | Si | - | Texto. |
| `required` | `boolean` | No | - | Muestra asterisco. |
| `info` | `string` | No | - | Texto del icono de informacion. |

**Ejemplo de Uso:**
```tsx
<KLabel required info="Ingresa un correo institucional">Email</KLabel>
```

**Guidelines UX:**
- Usa siempre para mejorar la accesibilidad de los inputs.

---

### KInputPassword
Input de contraseña con toggle de visibilidad (ojo abierto/cerrado).

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Space/Enter: Alterna visibilidad en el botón del ojo.
- **ARIA:** aria-pressed o title refleja visualmente el estado de revelación.
- **Contraste:** AAA

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `value` | `string` | No | - | Valor. |
| `onChange` | `(v) => void` | No | - | Callback. |
| `error` | `string` | No | - | Error. |

**Ejemplo de Uso:**
```tsx
<KInputPassword value={pass} onChange={setPass} />
```

**Guidelines UX:**
- Siempre incluye el toggle de visibilidad.

---

### KFloatButton
Botón flotante (FAB) fijo en la esquina de la pantalla. Ideal para acciones principales.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Es alcanzable por orden del DOM.
- **ARIA:** Se provee el aria-label desde tooltip internamente.
- **Contraste:** AAA sobre UI general

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `icon` | `ReactNode` | No | - | Ícono. |
| `onClick` | `() => void` | No | - | Callback. |
| `type` | `'primary'|'default'` | No | - | Estilo. |

**Ejemplo de Uso:**
```tsx
<KFloatButton icon={<Plus />} onClick={handleAdd} tooltip="Nuevo empleado" />
```

**Guidelines UX:**
- Solo un FAB por pantalla. Usa para la acción más importante.

---

### KImage
Imagen con preview lightbox al hacer clic, fallback para errores de carga y bordes redondeados.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Space/Enter: Si preview=true activa el lightbox.
- **ARIA:** Requiere prop alt explícito nativamente.
- **Contraste:** Decorative

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `src` | `string` | Si | - | URL. |
| `preview` | `boolean` | No | `true` | Lightbox. |
| `fallback` | `string` | No | - | Fallback. |

**Ejemplo de Uso:**
```tsx
<KImage src="/photo.jpg" width={200} height={150} preview />
```

**Guidelines UX:**
- Usa preview para imágenes que necesitan verse en grande.

---

### KAffix
Envuelve contenido para fijarlo al viewport al hacer scroll. Útil para toolbars o filtros.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `offsetTop` | `number` | No | - | Distancia desde arriba para activar. |
| `offsetBottom` | `number` | No | - | Distancia desde abajo. |

**Ejemplo de Uso:**
```tsx
<KAffix offsetTop={64}>
  <Toolbar />
</KAffix>
```

**Guidelines UX:**
- offsetTop=64 para respetar el header de 64px.

---

### KSpace
Componente de layout para espaciar elementos con gap consistente. Soporta dirección, wrap, splitters y tamaños personalizados.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `direction` | `'horizontal' | 'vertical'` | No | `'horizontal'` | Dirección del flujo. |
| `size` | `number | 'sm' | 'md' | 'lg' | [number, number]` | No | `'md'` | Espacio entre elementos. |
| `align` | `'start' | 'end' | 'center' | 'baseline'` | No | - | Alineación de items. |
| `wrap` | `boolean` | No | `false` | Permite salto de línea. |
| `split` | `ReactNode` | No | - | Elemento separador entre items. |

**Ejemplo de Uso:**
```tsx
import { KSpace, KDivider } from '@khor/design-system/atoms/index';

<KSpace direction="horizontal" size="md" wrap split={<KDivider />}>
  <KButton>A</KButton>
  <KButton>B</KButton>
</KSpace>
```

**Guidelines UX:**
- Usa size="middle" (16px) por defecto para la mayoría de layouts.
- El split con KDivider vertical es ideal para barras de herramientas.

---

### KQRCode
Generador visual de código QR a partir de texto o URL. Usa canvas para renderizado.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `value` | `string` | Si | - | Texto o URL a codificar. |
| `size` | `number` | No | `128` | Tamaño en px. |
| `color` | `string` | No | - | Color de los módulos. |

**Ejemplo de Uso:**
```tsx
<KQRCode value="https://khor.app" size={128} />
```

**Guidelines UX:**
- Nota: patrón visual representativo. Para QR reales, integra una librería como qrcode.

---

### KWatermark
Overlay de marca de agua sobre cualquier contenido. Útil para documentos confidenciales o previews.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `text` | `string` | Si | - | Texto de la marca de agua. |
| `fontSize` | `number` | No | `14` | Tamaño de fuente. |
| `rotate` | `number` | No | `-22` | Ángulo de rotación. |

**Ejemplo de Uso:**
```tsx
<KWatermark text="BORRADOR">
  <DocumentPreview />
</KWatermark>
```

**Guidelines UX:**
- Usa para documentos confidenciales o borradores.

---

### KFlex
Contenedor Flex moderno para alinear y distribuir elementos fácilmente.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `vertical` | `boolean` | No | `false` | Dirección vertical (column). |
| `wrap` | `boolean | string` | No | - | Propiedad flex-wrap. |
| `justify` | `string` | No | - | justify-content. |
| `align` | `string` | No | - | align-items. |
| `gap` | `string | number | [number, number]` | No | - | Espaciado entre items. |

**Ejemplo de Uso:**
```tsx
<KFlex gap="md" align="center" justify="space-between">
  <div>Item 1</div>
  <div>Item 2</div>
</KFlex>
```

**Guidelines UX:**
- Uso preferente sobre KSpace para layouts complejos o distribuciones no estándar.

---

### KGrid (Row/Col)
Sistema de rejilla responsiva de 24 columnas (Grid System) para crear layouts complejos que se adaptan a cualquier resolución.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `gutter` | `number | [number, number]` | No | - | Espaciado entre columnas (horizontal, vertical). |
| `span` | `number` | No | - | Número de columnas a ocupar (1-24) para KCol. |
| `xs, sm, md, lg, xl, xxl` | `number | object` | No | - | Ancho responsivo para KCol (Proximamente). |
| `offset` | `number` | No | - | Número de columnas a desplazar hacia la derecha. |

**Ejemplo de Uso:**
```tsx
import { KRow, KCol } from '@khor/design-system/atoms/index';

<KRow gutter={[16, 16]}>
  <KCol span={12}>
    <Card />
  </KCol>
</KRow>
```

**Guidelines UX:**
- Usa gutters múltiplos de 8 (ej. 16, 24).
- Ideal para dashboards y formularios multi-columna.

---

### KScrollBar
Átomo para estilización premium de barras de desplazamiento. Centraliza la estética de los scrollbars en el sistema para evitar variaciones nativas feas.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `orientation` | `'vertical' | 'horizontal' | 'both'` | No | `'vertical'` | Orientación del scroll. |
| `size` | `'small' | 'middle' | 'large'` | No | `'middle'` | Grosor de la barra. |
| `autoHide` | `boolean` | No | `true` | Esconde la barra si no hay hover. |
| `children` | `ReactNode` | No | - | Contenido a scrollear. |

**Ejemplo de Uso:**
```tsx
import { KScrollBar } from '@khor/design-system/atoms/index';

<KScrollBar 
  size="middle" 
  orientation="vertical" 
  autoHide={true} 
  style={{ height: 300 }}
>
  {/* contenido largo */}
</KScrollBar>
```

**Guidelines UX:**
- Usa para contenedores con contenido que excede su tamaño.
- Evita scrollbars en elementos minúsculos.

---


## Moléculas (32 componentes)

Combinaciones de átomos con lógica de forma reutilizable.
Importar desde: `import { KFormField } from '@khor/design-system/molecules/index'`

### KFormField
Envuelve cualquier input con etiqueta, indicador de requerido, mensaje de error y texto de ayuda. Es el bloque fundamental para construir formularios consistentes.

> **Directrices IA**: Al generar formularios, cada campo debe estar envuelto en KFormField. Los campos required deben validarse antes de enviar.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** El campo de entrada envuelto hereda su teclado natural.
- **ARIA:** Enlaza dinámicamente el "id" del input con su "label for". Inyecta aria-invalid y asocia el error con aria-describedby.
- **Contraste:** AAA sobre etiquetas y textos de error.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `label` | `string` | Si | - | Etiqueta del campo. |
| `required` | `boolean` | No | `false` | Muestra asterisco rojo de campo obligatorio. |
| `error` | `string` | No | - | Mensaje de error. Se muestra en rojo debajo del input. |
| `hint` | `string` | No | - | Texto de ayuda. Solo se muestra si no hay error. |
| `children` | `ReactNode` | Si | - | El input o componente de formulario. |

**Ejemplo de Uso:**
```tsx
import { KFormField } from '@khor/design-system/molecules/index';
import { KInput } from '@khor/design-system/atoms/index';

<KFormField label="Nombre Completo" required>
  <KInput placeholder="Ej: Maria Garcia" />
</KFormField>

<KFormField
  label="Email"
  required
  error="El formato del email no es valido"
>
  <KInput placeholder="email@empresa.com" />
</KFormField>

<KFormField
  label="Departamento"
  hint="Selecciona el area correspondiente"
>
  <KInput placeholder="Buscar..." />
</KFormField>
```

**Guidelines UX:**
- Usa siempre KFormField para envolver inputs en formularios.
- Los mensajes de error deben ser descriptivos y actionables.
- El hint se oculta cuando hay un error activo.

---

### KStatCard
Tarjeta de metrica con valor destacado, indicador de cambio (tendencia), sparkline integrada y descripcion contextual.

> **Directrices IA**: Las StatCards son ideales para que la IA resuma KPIs. El cambio porcentual y sparkData dan contexto temporal al agente.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Completamente estático por defecto (no interactivo).
- **ARIA:** El gráfico sparkline interno usa aria-hidden="true" para no estorbar al lector, los datos numéricos explican todo.
- **Contraste:** AAA en valor numérico. AA en el texto de tendencia.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `title` | `string` | Si | - | Titulo de la metrica. |
| `value` | `string | number` | Si | - | Valor principal de la metrica. |
| `change` | `number` | No | - | Porcentaje de cambio. Positivo = verde, Negativo = rojo. |
| `changeLabel` | `string` | No | - | Contexto del cambio (ej: "vs. mes anterior"). |
| `sparkData` | `number[]` | No | - | Array de datos para el mini grafico sparkline. |
| `icon` | `ReactNode` | No | - | Icono Lucide representativo. |

**Ejemplo de Uso:**
```tsx
import { KStatCard } from '@khor/design-system/molecules/index';

<KStatCard
  title="Total Empleados"
  value="1,247"
  change={12.5}
  changeLabel="vs. mes anterior"
  sparkData={[40, 45, 42, 50, 48, 55, 60]}
  icon={<Users size={20} />}
/>
```

**Guidelines UX:**
- Usa en dashboards con grid de 3-4 columnas.
- El sparkData debe tener al menos 5 puntos para ser legible.
- change positivo muestra icono TrendingUp en verde, negativo muestra TrendingDown en rojo.

---

### KNavItem
Item de navegacion para el Sidebar con icono, etiqueta, badge numerico y estado activo. Disenado para el fondo Navy.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Entra al item. Enter/Space: Ejecuta onClick simulado como Link.
- **ARIA:** role="menuitem" o enlace. Atributo aria-current="page" recomendado si active=true.
- **Contraste:** AAA sobre el fondo Navy institucional.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `icon` | `ReactNode` | No | - | Icono Lucide (18px recomendado). |
| `label` | `string` | Si | - | Texto del item. |
| `active` | `boolean` | No | `false` | Estado activo (fondo rojo 20% opacity). |
| `badge` | `number` | No | - | Numero de notificacion. |
| `onClick` | `() => void` | No | - | Callback al hacer click. |
| `collapsed` | `boolean` | No | `false` | Modo colapsado (solo icono). |

**Ejemplo de Uso:**
```tsx
import { KNavItem } from '@khor/design-system/molecules/index';

<KNavItem
  icon={<Home size={18} />}
  label="Dashboard"
  active={currentPath === '/'}
  onClick={() => navigate('/')}
/>

<KNavItem
  icon={<Users size={18} />}
  label="Empleados"
  badge={24}
  onClick={() => navigate('/empleados')}
/>
```

**Guidelines UX:**
- Solo un item activo a la vez.
- Iconos a 18px con stroke 2px.
- Badge solo para conteos de notificacion relevantes.

---

### KSelectField
Campo de seleccion custom con etiqueta, dropdown nativo y validacion, envuelto en KFormField para consistencia.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Up/Down: Navega entre opciones. Enter: Confirma selección. Esc: Cierra dropdown.
- **ARIA:** role="combobox", aria-expanded y aria-controls vinculados al listbox.
- **Contraste:** AAA. El borde de foco es del color Primary Khor.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `label` | `string` | No | - | Etiqueta del campo. |
| `placeholder` | `string` | No | - | Texto placeholder. |
| `options` | `SelectProps["options"]` | Si | - | Opciones del select. |
| `value` | `string | number` | No | - | Valor seleccionado. |
| `onChange` | `(value) => void` | No | - | Callback al seleccionar. |
| `required` | `boolean` | No | - | Marca como requerido. |
| `error` | `string` | No | - | Mensaje de error. |
| `hint` | `string` | No | - | Texto de ayuda. |
| `disabled` | `boolean` | No | - | Desactiva el select. |
| `loading` | `boolean` | No | - | Estado de carga. |
| `showSearch` | `boolean` | No | - | Habilita busqueda. |
| `mode` | `"multiple" | "tags"` | No | - | Modo de seleccion. |

**Ejemplo de Uso:**
```tsx
import { KSelectField } from '@khor/design-system/molecules/index';

<KSelectField
  label="Departamento"
  placeholder="Seleccionar..."
  options={[
    { label: 'Recursos Humanos', value: 'rh' },
    { label: 'Tecnologia', value: 'tech' },
  ]}
  value={dept}
  onChange={setDept}
  required
/>
```

**Guidelines UX:**
- Para hasta 7 opciones. Si hay mas, considera un select con busqueda.

---

### KUserCell
Celda de usuario con avatar, nombre, rol y estado. Ideal para tablas y listas de empleados.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Atrapa el foco si tiene onClick (convirtiéndose en botón).
- **ARIA:** Avatar con alt="" si es decorativo o iniciales. Si es clickeable, asume role="button".
- **Contraste:** AAA entre el nombre principal y fondo.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `name` | `string` | Si | - | Nombre del usuario. |
| `email` | `string` | No | - | Correo electronico. |
| `role` | `string` | No | - | Rol o cargo. |
| `avatar` | `string` | No | - | URL de la foto. |
| `size` | `'sm' | 'md' | 'lg'` | No | `'md'` | Tamano de la celda. |
| `status` | `'online' | 'offline' | 'busy' | 'away'` | No | - | Estado de actividad. |
| `onClick` | `() => void` | No | - | Callback al hacer click. |

**Ejemplo de Uso:**
```tsx
import { KUserCell } from '@khor/design-system/molecules/index';

<KUserCell
  name="Maria Garcia"
  role="Gerente de RH"
  avatar="/avatar.jpg"
  status="online"
/>
```

**Guidelines UX:**
- Usa dentro de tablas en la columna de usuario.
- Si no hay avatar, se generan iniciales automaticamente.

---

### KEmptyState
Estado vacio para tablas, listas o secciones sin datos. Incluye icono, titulo, descripcion y accion principal.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** El botón de acción es 100% interactivo y atrapa el foco por defecto.
- **ARIA:** El icono usa aria-hidden="true" ya que el título explica el estado.
- **Contraste:** AAA en títulos. AA en descripciones corporativas.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `icon` | `ReactNode` | No | - | Icono grande (48px recomendado). |
| `title` | `string` | Si | - | Titulo del estado vacio. |
| `description` | `string` | No | - | Descripcion con contexto. |
| `action` | `ReactNode` | No | - | Boton de accion principal. |

**Ejemplo de Uso:**
```tsx
import { KEmptyState } from '@khor/design-system/molecules/index';

<KEmptyState
  icon={<Inbox size={48} />}
  title="No hay empleados registrados"
  description="Agrega tu primer empleado para comenzar."
  action={
    <KButton variant="primary" icon={<Users size={16} />}>
      Agregar Empleado
    </KButton>
  }
/>
```

**Guidelines UX:**
- Siempre incluye una accion que resuelva el estado vacio.
- El icono debe ser de 48px con color neutral.300.

---

### KBreadcrumb
Sistema de navegacion jerarquica para indicar la posicion actual en la aplicacion.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Navega por cada enlace del breadcrumb.
- **ARIA:** role="navigation" y aria-label="breadcrumb" inyectados nativamente. aria-current="page" en el último elemento (no clickeable).
- **Contraste:** AA sobre fondo blanco/gris.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `items` | `BreadcrumbItemType[]` | Si | - | Arreglo de items ({ title, href, icon, menu, onClick }). |
| `separator` | `ReactNode` | No | - | Separador custom (default: /). |

**Ejemplo de Uso:**
```tsx
import { KBreadcrumb } from '@khor/design-system/molecules/index';

<KBreadcrumb
  items={[
    { title: 'Inicio', href: '/', icon: <Home size={14} /> },
    { title: 'Empleados', href: '/empleados' },
    { title: 'Perfil' }
  ]}
  separator=">"
/>
```

**Guidelines UX:**
- El último item es la página actual y no tiene onClick.
- Máximo 4-5 niveles de profundidad.

---

### KSteps
Componente de pasos para procesos multi-paso como wizards, onboarding o flujos de aprobación. Muestra el progreso y permite navegar entre pasos.

> **Directrices IA**: KSteps es clave para que la IA guíe al usuario en flujos multi-paso. El current indica dónde está el usuario.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Foco en pasos individuales si onChange está definido (interactivos).
- **ARIA:** aria-current="step" en el paso activo. aria-label indicando progreso (ej. Paso 2 de 3).
- **Contraste:** AAA sobre anillos azules/primarios de progreso.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `items` | `KStepItem[]` | Si | - | Array de pasos con title y description opcional. |
| `current` | `number` | Si | - | Índice del paso actual (base 0). |
| `onChange` | `(step: number) => void` | No | - | Callback al hacer click en un paso. |

**Ejemplo de Uso:**
```tsx
import { KSteps } from '@khor/design-system/molecules/index';

<KSteps
  current={currentStep}
  onChange={setCurrentStep}
  items={[
    { title: 'Datos Personales', description: 'Nombre, email' },
    { title: 'Puesto', description: 'Departamento' },
    { title: 'Confirmar' },
  ]}
/>
```

**Guidelines UX:**
- Máximo 5-6 pasos. Para más, usa un flujo diferente.
- La descripción es opcional pero mejora la comprensión.

---

### KDropdownMenu
Menú contextual desplegable con soporte para iconos, items peligrosos, separadores y estados deshabilitados.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Space/Enter: Abre el menú. Up/Down: Navega entre items. Esc: Cierra el menú.
- **ARIA:** role="menu" y role="menuitem" manejados estrictamente por Radix UI. aria-haspopup="menu" y aria-expanded en el trigger.
- **Contraste:** AAA sobre fondo blanco. AAA en texto danger.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `menu` | `MenuProps` | Si | - | Configuracion del menu ({ items, onClick }). |
| `trigger` | `("click" | "hover" | "contextMenu")[]` | No | `['hover']` | Eventos que activan el menu. |
| `placement` | `string` | No | - | Posicion del menu. |
| `arrow` | `boolean | object` | No | - | Mostrar flecha indicadora. |
| `disabled` | `boolean` | No | - | Desactivar dropdown. |

**Ejemplo de Uso:**
```tsx
import { KDropdownMenu } from '@khor/design-system/molecules/index';

<KDropdownMenu 
  menu={{ 
    items: [
      { key: 'edit', label: 'Editar', icon: <Edit size={14} /> },
      { key: 'delete', label: 'Eliminar', danger: true }
    ] 
  }}
  placement="bottomLeft"
>
  <KButton>Acciones</KButton>
</KDropdownMenu>
```

**Guidelines UX:**
- Usa para acciones secundarias agrupadas.
- El disparador suele ser un KButton de tipo ghost o secondary.

---

### KPopover
Panel emergente con contenido rico. A diferencia del tooltip, puede contener formularios, listas o contenido interactivo.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Space/Enter: Si el trigger es click, lo expone. Esc: Cierra el popover abierto y retorna foco.
- **ARIA:** El trigger usa aria-expanded y aria-controls. El panel usa role="dialog" o "tooltip".
- **Contraste:** AAA sobre fondos con elevación (shadow overlay).

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `content` | `ReactNode` | Si | - | Contenido del popover. |
| `title` | `ReactNode` | No | - | Título opcional. |
| `placement` | `TooltipPlacement` | No | `'bottom'` | Posición. |
| `trigger` | `'click' | 'hover' | 'focus'` | No | `'click'` | Evento disparador. |
| `arrow` | `boolean | object` | No | - | Mostrar flecha. |

**Ejemplo de Uso:**
```tsx
import { KPopover } from '@khor/design-system/molecules/index';

<KPopover
  title="Título opcional"
  content={<div>Contenido rico</div>}
  placement="bottom"
  trigger="click"
>
  <KButton>Abrir Popover</KButton>
</KPopover>
```

**Guidelines UX:**
- Usa para contenido interactivo. Para texto simple, usa KTooltip.

---

### KAccordion
Secciones colapsables para organizar contenido agrupado. Soporta modo single (solo una abierta) y multiple.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Navega por los headers. Space/Enter: Expande o colapsa.
- **ARIA:** Headers nativos con aria-expanded. aria-controls id vincula al panel con role="region".
- **Contraste:** AAA entre texto del header y fondo neutral.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `items` | `CollapseProps["items"]` | Si | - | Array de secciones con key, label y children. |
| `accordion` | `boolean` | No | `false` | Modo acordeón (solo una abierta a la vez). |
| `ghost` | `boolean` | No | `false` | Sin fondo ni bordes. |
| `expandIconPosition` | `'start' | 'end'` | No | `'end'` | Posición del icono. |
| `onChange` | `(key: string | string[]) => void` | No | - | Callback al cambiar. |

**Ejemplo de Uso:**
```tsx
import { KAccordion } from '@khor/design-system/molecules/index';

<KAccordion
  items={[
    { key: '1', label: 'Pregunta 1', children: <p>Respuesta 1</p> },
    { key: '2', label: 'Pregunta 2', children: <p>Respuesta 2</p> },
  ]}
  defaultActiveKey={['1']}
/>
```

**Guidelines UX:**
- Usa single para FAQs y multiple para configuraciones.
- El título debe ser descriptivo del contenido.

---

### KInputNumber
Input numerico con controles +/- integrados, limites min/max, paso configurable y precision decimal.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Up/Down: Incrementa o decrementa según paso (step).
- **ARIA:** role="spinbutton", aria-valuenow, aria-valuemin, aria-valuemax vinculados.
- **Contraste:** AAA con bordes claros y texto input.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `value` | `number` | No | - | Valor controlado. |
| `onChange` | `(v: number) => void` | No | - | Callback al cambiar. |
| `min` | `number` | No | - | Valor mínimo. |
| `max` | `number` | No | - | Valor máximo. |
| `step` | `number` | No | `1` | Incremento. |
| `precision` | `number` | No | - | Decimales. |
| `size` | `'sm' | 'md' | 'lg'` | No | `'md'` | Tamaño del input. |
| `controls` | `boolean` | No | `true` | Mostrar botones +/-. |
| `disabled` | `boolean` | No | - | Desactivar. |

**Ejemplo de Uso:**
```tsx
import { KInputNumber } from '@khor/molecules-extended';

<KInputNumber value={qty} onChange={setQty} min={0} max={100} />
```

**Guidelines UX:**
- Usa precision para valores monetarios.
- Define min/max para evitar valores invalidos.

---

### KSegmented
Control segmentado tipo iOS para alternar entre opciones mutuamente excluyentes.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Left/Right: Mueve el foco y selección entre segmentos instantáneamente.
- **ARIA:** Actúa como role="radiogroup" y items con role="radio" más aria-checked.
- **Contraste:** AAA fondo de pastilla sobre overlay gris ligero.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `options` | `(string | KSegmentedOption)[]` | Si | - | Opciones a mostrar. |
| `value` | `string` | No | - | Valor seleccionado. |
| `onChange` | `(v: string) => void` | No | - | Callback al cambiar. |
| `block` | `boolean` | No | `false` | Ancho completo. |
| `size` | `'sm' | 'md' | 'lg'` | No | `'md'` | Tamaño. |
| `disabled` | `boolean` | No | - | Desactivar todo el control. |

**Ejemplo de Uso:**
```tsx
import { KSegmented } from '@khor/molecules-extended';

<KSegmented options={['Diario','Semanal','Mensual']} value={period} onChange={setPeriod} />
```

**Guidelines UX:**
- Usa para 2-5 opciones.
- Soporta iconos junto al label.

---

### KAutocomplete
Input con sugerencias filtradas en tiempo real, opciones con descripción y estado de carga.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Up/Down: Navega sugerencias. Enter: Confirma input. Esc: Cierra listbox.
- **ARIA:** role="combobox", aria-autocomplete="list".
- **Contraste:** AAA

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `options` | `KAutocompleteOption[]` | Si | - | Opciones con value, label y description. |
| `onSelect` | `(opt: KAutocompleteOption) => void` | No | - | Callback al seleccionar. |
| `onChange` | `(value: string) => void` | No | - | Callback al cambiar el texto. |
| `loading` | `boolean` | No | - | Muestra un spinner de carga. |
| `allowClear` | `boolean` | No | - | Permite limpiar el input. |
| `placeholder` | `string` | No | - | Texto de ayuda. |

**Ejemplo de Uso:**
```tsx
import { KAutocomplete } from '@khor/design-system/molecules/index';

<KAutocomplete 
  placeholder="Buscar..." 
  options={options} 
  onSelect={(opt) => console.log(opt)} 
  allowClear 
/>
```

**Guidelines UX:**
- Usa para listas largas donde el usuario necesita filtrar.
- La descripción ayuda a diferenciar opciones similares.

---

### KDatePicker
Selector de fecha con calendario desplegable, navegación mensual y formato en español.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Entra al input. Enter: Abre el calendario. Flechas: Permite navegar días en el panel abierto.
- **ARIA:** El input tiene role="combobox" de forma implícita. El panel del calendario anuncia los días y meses navegados.
- **Contraste:** AAA sobre días hábiles. AA sobre días fuera de mes.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `value` | `Date` | No | - | Fecha seleccionada. |
| `onChange` | `(d: Date) => void` | No | - | Callback. |
| `picker` | `'date' | 'week' | 'month' | 'year'` | No | `'date'` | Tipo de selector. |
| `minDate` | `Date` | No | - | Fecha mínima. |
| `maxDate` | `Date` | No | - | Fecha máxima. |
| `showTime` | `boolean` | No | - | Habilitar selector de hora. |

**Ejemplo de Uso:**
```tsx
import { KDatePicker } from '@khor/design-system/molecules/index';

<KDatePicker 
  value={date} 
  onChange={setDate} 
  picker="date" 
/>
```

**Guidelines UX:**
- Formato español configurado por defecto.
- Usa minDate/maxDate para restringir el rango seleccionable.

---

### KDateRangePicker
Selector de rango de fechas con presets (Hoy, 7 días, 30 días, Este mes) y calendario dual.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Navega entre input de inicio y fin. Flechas: Permiten seleccionar los rangos.
- **ARIA:** Ambos inputs están emparejados bajo aria-labels descriptivos de rango.
- **Contraste:** AAA entre inputs. AAA panel.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `value` | `KDateRange` | No | - | Rango { from, to }. |
| `onChange` | `(r: KDateRange) => void` | No | - | Callback. |
| `presets` | `KDateRangePreset[]` | No | - | Rangos predefinidos. |
| `placeholder` | `[string, string]` | No | - | Textos de ayuda. |

**Ejemplo de Uso:**
```tsx
import { KDateRangePicker } from '@khor/design-system/molecules/index';

<KDateRangePicker 
  value={range} 
  onChange={setRange} 
  presets={customPresets} 
/>
```

**Guidelines UX:**
- Incluye presets para rangos comunes (Hoy, Últimos 7 días, etc).
- Ideal para filtros de fechas en tablas y dashboards.

---

### KSelectAdvanced
Selector múltiple avanzado con soporte para etiquetas (tags), búsqueda integrada y límite de visualización.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Backspace: Elimina el último tag seleccionado si el input está vacío. Enter: Añade el tag escrito en mode="tags".
- **ARIA:** Cada chip (tag) seleccionado actúa como un elemento individual aria-label.
- **Contraste:** AAA en los tags. AAA en input libre.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `options` | `KSelectAdvancedOption[]` | Si | - | Opciones a mostrar. |
| `mode` | `'single' | 'multiple' | 'tags'` | No | `'single'` | Modo de selección. |
| `maxTagCount` | `number | 'responsive'` | No | `3` | Número máximo de tags visibles. |
| `allowClear` | `boolean` | No | - | Permite limpiar la selección. |
| `loading` | `boolean` | No | - | Estado de carga. |
| `status` | `'error' | 'warning'` | No | - | Estado de validación. |

**Ejemplo de Uso:**
```tsx
import { KSelectAdvanced } from '@khor/design-system/molecules/index';

<KSelectAdvanced 
  options={roles} 
  mode="multiple" 
  maxTagCount={2} 
  allowClear 
/>
```

**Guidelines UX:**
- Usa "multiple" para selección de una lista fija.
- Usa "tags" para permitir al usuario ingresar nuevos valores.

---

### KDescriptions
Lista de información en formato clave-valor, ideal para mostrar detalles de perfiles o registros técnicos.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Contenido puramente estático/de lectura.
- **ARIA:** Se convierte a estructura semántica de tabla (table/tr/th/td) garantizando lectura tabular perfecta en screen readers.
- **Contraste:** AAA en los labels (color navy text).

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `items` | `KDescriptionItem[]` | Si | - | Lista de elementos (label, children, span). |
| `title` | `ReactNode` | No | - | Título de la sección. |
| `bordered` | `boolean` | No | `false` | Muestra bordes alrededor de las celdas. |
| `column` | `number` | No | `3` | Número de columnas por fila. |
| `size` | `'default' | 'middle' | 'small'` | No | `'default'` | Tamaño de la lista. |

**Ejemplo de Uso:**
```tsx
import { KDescriptions } from '@khor/design-system/molecules/index';

<KDescriptions 
  title="Detalles" 
  items={items} 
  bordered 
  column={2} 
/>
```

**Guidelines UX:**
- Usa "span" en los items para que ocupen múltiples columnas.
- El modo "bordered" es ideal para vistas de tipo formulario o ficha técnica.

---

### KPopconfirm
Caja de confirmación compacta que aparece junto al elemento de activación para acciones rápidas.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Space/Enter: Abre el dialog. Tab: Atrapa el foco de inmediato en los botones de Ok/Cancel.
- **ARIA:** Abre una estructura role="dialog" o role="alertdialog" que exige acción.
- **Contraste:** AAA para la pregunta prioritaria.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `title` | `ReactNode` | Si | - | Título de la confirmación. |
| `description` | `ReactNode` | No | - | Información adicional sobre la acción. |
| `onConfirm` | `() => void` | No | - | Callback al confirmar. |
| `onCancel` | `() => void` | No | - | Callback al cancelar. |
| `okText` | `string` | No | `'OK'` | Texto del botón principal. |
| `cancelText` | `string` | No | `'Cancel'` | Texto del botón secundario. |
| `placement` | `string` | No | `'top'` | Ubicación del popover. |

**Ejemplo de Uso:**
```tsx
import { KPopconfirm } from '@khor/design-system/molecules/index';

<KPopconfirm 
  title="¿Estás seguro?" 
  onConfirm={handleDelete}
>
  <KButton>Eliminar</KButton>
</KPopconfirm>
```

**Guidelines UX:**
- Usa para acciones destructivas que no requieren un Modal completo.
- Mantén los mensajes cortos y directos.

---

### KResult
Página de resultado para estados de éxito, error, advertencia o páginas de error (404, 500).

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Solo elementos interactivos (extra buttons) reciben foco.
- **ARIA:** Icono puramente decorativo aria-hidden="true". El título es un role="heading".
- **Contraste:** AAA. El ícono asume colores semánticos AA (Verde, Rojo, Amarillo, Azul).

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `status` | `'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'` | Si | - | Estado del resultado. |
| `title` | `ReactNode` | Si | - | Título principal. |
| `subTitle` | `ReactNode` | No | - | Texto explicativo secundario. |
| `extra` | `ReactNode` | No | - | Área para botones de acción. |
| `icon` | `ReactNode` | No | - | Icono personalizado. |

**Ejemplo de Uso:**
```tsx
import { KResult } from '@khor/design-system/molecules/index';

<KResult 
  status="success" 
  title="Completado" 
  subTitle="Acción realizada con éxito" 
/>
```

**Guidelines UX:**
- Usa para feedbacks de página completa.
- Define acciones claras en la propiedad "extra" para guiar al usuario.

---

### KTimeline
Visualización de eventos cronológicos o hitos de un proceso de forma vertical.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Estático (no interactivo), a menos que el contenido inyectado tenga enlaces.
- **ARIA:** Es renderizado como una lista nativa (ul/li). Excelente para lectura secuencial.
- **Contraste:** AAA. Los círculos de estado actúan de apoyo visual.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `items` | `TimelineItemProps[]` | Si | - | Lista de eventos con children, label, color. |
| `mode` | `'left' | 'right' | 'alternate'` | No | `'left'` | Alineación de los elementos. |
| `pending` | `boolean | ReactNode` | No | - | Muestra un estado pendiente al final. |
| `reverse` | `boolean` | No | - | Invierte el orden cronológico. |

**Ejemplo de Uso:**
```tsx
import { KTimeline } from '@khor/design-system/molecules/index';

<KTimeline 
  items={[{ children: 'Creado' }, { children: 'Aprobado' }]} 
  mode="alternate" 
/>
```

**Guidelines UX:**
- Usa "label" para mostrar fechas u horas junto a los hitos.
- El modo "alternate" es ideal para narrativas o logs de actividad.

---

### KCascader
Selector multinivel para navegar por estructuras jerárquicas complejas (ej: Ubicación, Categorías).

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Up/Down: Recorre opciones verticales. Left/Right: Expande/Contrae el nivel jerárquico.
- **ARIA:** Sigue el patrón de combobox con sub-menús expandibles (aria-expanded).
- **Contraste:** AAA sobre paneles desplegables.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `options` | `KCascaderOption[]` | Si | - | Estructura jerárquica de opciones. |
| `value` | `string[]` | No | - | Valores seleccionados en orden. |
| `onChange` | `(value, options) => void` | No | - | Callback al cambiar la selección. |
| `multiple` | `boolean` | No | - | Permite selección múltiple. |
| `placeholder` | `string` | No | - | Texto de ayuda. |

**Ejemplo de Uso:**
```tsx
import { KCascader } from '@khor/design-system/molecules/index';

<KCascader 
  options={treeData} 
  onChange={(val) => console.log(val)} 
  allowClear 
/>
```

**Guidelines UX:**
- Ideal para estructuras de más de 2 niveles jerárquicos.
- Usa "allowClear" si la selección no es obligatoria.

---

### KStatistic
Valor estadístico grande con título, prefijo/sufijo y tendencia de cambio.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Lectura pasiva.
- **ARIA:** Los iconos ArrowUp/ArrowDown son decorativos, el string de texto expone la tendencia a screen readers.
- **Contraste:** AAA para el valor principal en tamaño grande.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `title` | `ReactNode` | No | - | Etiqueta del dato. |
| `value` | `string | number` | Si | - | Valor a mostrar. |
| `precision` | `number` | No | - | Decimales a mostrar. |
| `prefix` | `ReactNode` | No | - | Contenido antes del valor. |
| `suffix` | `ReactNode` | No | - | Contenido después del valor. |
| `trend` | `'up' | 'down'` | No | - | Dirección de la tendencia. |
| `trendValue` | `string | number` | No | - | Porcentaje o valor de cambio. |

**Ejemplo de Uso:**
```tsx
import { KStatistic } from '@khor/design-system/molecules/index';

<KStatistic 
  title="Ventas" 
  value={45000} 
  prefix="$" 
  trend="up" 
  trendValue="15%" 
/>
```

**Guidelines UX:**
- Usa para dashboards o KPIs importantes.
- Combina con prefijos como "$" o "MXN" para contextos financieros.

---

### KTimePicker
Selector de hora con formato personalizable (12h/24h) y selección de intervalos.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Up/Down: Recorre horas/minutos. Enter: Confirma la selección.
- **ARIA:** Popup interactivo recibe role="dialog", columns rol="listbox".
- **Contraste:** AAA entre texto del campo y fondo neutro.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `value` | `string | Dayjs` | No | - | Valor seleccionado. |
| `onChange` | `(timeString) => void` | No | - | Callback al cambiar la hora. |
| `format` | `string` | No | `'HH:mm:ss'` | Formato de visualización. |
| `use12Hours` | `boolean` | No | - | Usa formato de 12 horas. |
| `allowClear` | `boolean` | No | `true` | Permite limpiar la selección. |

**Ejemplo de Uso:**
```tsx
import { KTimePicker } from '@khor/design-system/molecules/index';

<KTimePicker 
  format="HH:mm" 
  use12Hours={false}
  onChange={(time) => console.log(time)} 
/>
```

**Guidelines UX:**
- Ideal para agendar citas o definir horarios operativos.
- Usa "use12Hours" si el contexto cultural lo requiere.

---

### KTooltip
Componente de texto informativo que aparece al pasar el cursor sobre un elemento. Ideal para dar contexto adicional sin sobrecargar la interfaz.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Focus: El tooltip aparece al recibir :focus-visible en el botón/hijo.
- **ARIA:** Usa aria-describedby apuntando al ID dinámico del popup. role="tooltip" asignado al popup.
- **Contraste:** AAA sobre paneles oscuros predeterminados.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `title` | `ReactNode` | Si | - | Contenido del tooltip. |
| `placement` | `'top' | 'bottom' | 'left' | 'right' ...` | No | `'top'` | Posición relativa al elemento. |
| `trigger` | `'hover' | 'focus' | 'click'` | No | `'hover'` | Acción que dispara el tooltip. |
| `color` | `string` | No | - | Color de fondo personalizado. |

**Ejemplo de Uso:**
```tsx
import { KTooltip } from '@khor/design-system/molecules/index';

<KTooltip title="Ayuda para el usuario">
  <KButton icon={<Info size={16} />} />
</KTooltip>
```

**Guidelines UX:**
- Útil para explicar iconos o abreviaturas.
- Evita tooltips con demasiado texto; mantén el mensaje corto.

---

### KMentions
Caja de texto que sugiere opciones de mención al escribir un disparador (ej: @).

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Pulsar el trigger (@), activa el panel. Up/Down recorren opciones. Enter/Espacio inserta la mención.
- **ARIA:** Anuncia combinaciones de búsqueda con aria-live.
- **Contraste:** AAA en las opciones listadas.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `options` | `KMentionOption[]` | Si | - | Lista de posibles menciones. |
| `trigger` | `string` | No | `'@'` | Carácter que dispara el menú. |
| `placeholder` | `string` | No | - | Texto de ayuda. |
| `autoSize` | `boolean` | No | - | Ajuste automático de altura. |

**Ejemplo de Uso:**
```tsx
import { KMentions } from '@khor/design-system/molecules/index';

<KMentions 
  trigger="@" 
  options={[{ value: 'user1', label: 'Dani' }]} 
/>
```

**Guidelines UX:**
- Usa etiquetas con avatares para una mejor UX de mención.
- Ideal para comentarios, chats o sistemas de feedback.

---

### KColorPicker
Selector de color con soporte para formatos HEX, RGB, HSB y paleta de presets.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Accede al swatch principal. Espacio: Lanza el panel de selección.
- **ARIA:** El panel asume role="dialog" o "application" para capturar atajos de espectro.
- **Contraste:** Decorativo en el panel de espectro. AAA en el texto HEX/RGB.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `value` | `string | Color` | No | - | Color seleccionado. |
| `onChange` | `(color) => void` | No | - | Callback al cambiar el color. |
| `showText` | `boolean` | No | `false` | Muestra el código de color junto al picker. |
| `presets` | `Presets[]` | No | - | Paleta de colores sugeridos. |

**Ejemplo de Uso:**
```tsx
import { KColorPicker } from '@khor/design-system/molecules/index';

<KColorPicker 
  value="#E04D36" 
  onChange={(color) => console.log(color)} 
  showText 
/>
```

**Guidelines UX:**
- Usa para configuraciones de marca o personalización de UI.
- Prefiere formatos HEX para mayor compatibilidad.

---

### KAnchor
Sistema de navegación por anclas para desplazarse rápidamente por diferentes secciones de una página.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Navega por los enlaces naturales del anchor (etiquetas `<a>` reales). Enter: Scrollea suavemente.
- **ARIA:** Se convierte en un bloque semántico bajo role="navigation".
- **Contraste:** AAA. El link activo se resalta en primary Khor.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `items` | `AnchorLink[]` | Si | - | Lista de enlaces de navegación. |
| `offsetTop` | `number` | No | `0` | Distancia al borde superior antes de activar. |
| `affix` | `boolean` | No | `true` | Fija el menú en pantalla. |

**Ejemplo de Uso:**
```tsx
import { KAnchor } from '@khor/design-system/molecules/index';

<KAnchor 
  items={[
    { key: '1', href: '#intro', title: 'Intro' },
    { key: '2', href: '#usage', title: 'Uso' }
  ]} 
/>
```

**Guidelines UX:**
- Ideal para páginas largas de documentación o reportes.
- Asegura que los IDs de destino existan en el DOM.

---

### KList
Lista genérica para mostrar colecciones de datos con soporte para avatares, metadatos y acciones.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Lectura pasiva iterada sobre elementos internos.
- **ARIA:** Genera structure_role="list" y los ítems con role="listitem". Si los ítems cambian, soporte en aria-live.
- **Contraste:** AAA sobre líneas divisorias grises.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `items` | `KListItem[]` | Si | - | Colección de elementos a listar. |
| `bordered` | `boolean` | No | `false` | Muestra bordes exteriores. |
| `size` | `'small' | 'middle' | 'large'` | No | `'middle'` | Tamaño del espaciado. |
| `header` | `ReactNode` | No | - | Cabecera de la lista. |
| `footer` | `ReactNode` | No | - | Pie de la lista. |

**Ejemplo de Uso:**
```tsx
import { KList } from '@khor/design-system/molecules/index';

<KList 
  items={[
    { key: '1', title: 'Registro A', description: 'Detalle' },
    { key: '2', title: 'Registro B' }
  ]} 
  bordered 
/>
```

**Guidelines UX:**
- Usa para mostrar información estructurada repetitiva.
- Combina con avatares para facilitar el reconocimiento visual.

---

### KDividerExtended
Divisor con soporte para texto central y estilo dashed.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Separador visual pasivo (no atrapa foco).
- **ARIA:** Role nativo "separator". El texto inyectado respeta el DOM normal.
- **Contraste:** Línea visual AA.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `children` | `ReactNode` | No | - | Texto central. |
| `dashed` | `boolean` | No | - | Estilo dashed. |

**Ejemplo de Uso:**
```tsx
<KDividerExtended>O continúa con</KDividerExtended>
```

**Guidelines UX:**
- Usa con texto para separar secciones semánticas.

---

### KTreeSelect
Selector de árbol jerárquico que permite navegar y seleccionar elementos en estructuras multinivel.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Flechas Arriba/Abajo: Navega items. Flecha Derecha: Expande nodo padre. Flecha Izquierda: Contrae nodo.
- **ARIA:** Se convierte en role="tree" y emite estados usando aria-expanded, aria-selected.
- **Contraste:** AAA sobre paneles desplegables.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `treeData` | `DataNode[]` | Si | - | Estructura jerárquica de datos. |
| `value` | `string` | No | - | Valor seleccionado. |
| `placeholder` | `string` | No | - | Texto de ayuda. |
| `treeDefaultExpandAll` | `boolean` | No | - | Expande todos los nodos por defecto. |

**Ejemplo de Uso:**
```tsx
import { KTreeSelect } from '@khor/design-system/molecules/index';

<KTreeSelect 
  treeData={treeData} 
  placeholder="Seleccionar área" 
  onChange={(val) => setVal(val)} 
/>
```

**Guidelines UX:**
- Usa para clasificaciones complejas como organigramas o categorías anidadas.
- Mantén la profundidad razonable (3-4 niveles máx) para asegurar legibilidad.

---

### KTransfer
Componente de doble lista para mover elementos entre una columna de origen y una de destino.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Entra al panel. Arrows: Selecciona items internos. Space: Toggle elemento. Tab hacia los botones de flecha o enter para transferir.
- **ARIA:** Aria-live configurado para la caja de estado y notificar transferencias dinámicamente.
- **Contraste:** AAA sobre botones primarios in-between matrices.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `dataSource` | `KTransferItem[]` | Si | - | Elementos disponibles y seleccionados. |
| `targetKeys` | `string[]` | Si | - | Keys de los elementos en la columna derecha. |
| `onChange` | `(nextKeys) => void` | No | - | Callback al mover elementos. |
| `showSearch` | `boolean` | No | `false` | Habilita caja de búsqueda en columnas. |

**Ejemplo de Uso:**
```tsx
import { KTransfer } from '@khor/design-system/molecules/index';

<KTransfer 
  dataSource={data} 
  targetKeys={targetKeys} 
  onChange={(nextKeys) => setTargetKeys(nextKeys)} 
  showSearch 
/>
```

**Guidelines UX:**
- Ideal para asignación de roles, permisos o selección múltiple con orden relevante.
- Usa "showSearch" si la lista supera los 10 elementos.

---


## Organismos (20 componentes)

Componentes complejos o Layouts masivos con lógicas de portal, focus-traps y alto consumo de hooks.
Importar desde: `import { KDataTable } from '@khor/design-system/organisms/index'`

### KDataTable
Tabla de datos con busqueda integrada, ordenamiento, paginacion y soporte para celdas con sparklines. Diseñada para manejar listas de empleados, transacciones y registros operativos.

> **Directrices IA**: KDataTable es el organismo central para listar datos. La IA puede extraer datos de las filas, filtrar por busqueda, y analizar sparklines para detectar tendencias.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Navega por botones de acciones, cabeceras y paginación. Enter: Permite ordenar columnas.
- **ARIA:** Usa etiqueta <table> con <thead> y <tbody>, ofreciendo lectura estructural a lectores de pantalla.
- **Contraste:** AAA entre datos y el fondo de las filas alternas.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `data` | `T[]` | Si | - | Array de datos. |
| `columns` | `ColumnDef[]` | Si | - | Definición de columnas. |
| `virtual` | `boolean` | No | - | Habilita virtualización para alto volumen. |
| `size` | `'small' | 'middle' | 'large'` | No | `'middle'` | Tamaño de la tabla. |
| `rowExpansion` | `object` | No | - | Configuración para filas expandibles. |

**Ejemplo de Uso:**
```tsx
import { KDataTable, KSparklineCell } from '@khor/design-system/organisms/index';

const columns = [
  {
    key: 'name',
    title: 'Empleado',
    dataIndex: 'name',
    sortable: true,
    render: (v) => <KUserCell name={v} />,
  },
  { key: 'dept', title: 'Departamento', dataIndex: 'dept', sortable: true },
  {
    key: 'status',
    title: 'Estado',
    dataIndex: 'status',
    render: (v) => <KBadge status={v} label={statusLabels[v]} />,
  },
  {
    key: 'trend',
    title: 'Tendencia',
    dataIndex: 'trend',
    render: (v) => <KSparklineCell data={v} />,
  },
];

<KDataTable
  columns={columns}
  data={employees}
  searchPlaceholder="Buscar empleados..."
  actions={<KButton variant="primary" size="sm">Nuevo</KButton>}
  onRowClick={(record) => openDetail(record)}
/>
```

**Guidelines UX:**
- Usa KSparklineCell para mostrar tendencias en columnas numericas.
- Siempre incluye al menos un boton de accion principal (Nuevo, Exportar, etc).
- Las columnas con sortable: true permiten ordenamiento automatico.

---

### KSparklineCell
Mini grafico de linea disenado para celdas de tabla. Muestra tendencias en un espacio minimo usando recharts.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Visualización no interactiva pasiva.
- **ARIA:** aria-hidden="true" oculto a lectores (el valor real numérico debe ir a su lado en texto puro para blind-support).
- **Contraste:** AA para el trazado visual del vector.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `data` | `number[]` | Si | - | Array de valores numericos para el grafico. |
| `color` | `string` | No | `khor.primary` | Color de la linea. |
| `width` | `number` | No | `80` | Ancho en pixeles. |
| `height` | `number` | No | `24` | Alto en pixeles. |

**Ejemplo de Uso:**
```tsx
import { KSparklineCell } from '@khor/design-system/organisms/index';

// Dentro de una columna de KDataTable
{
  key: 'trend',
  title: 'Tendencia',
  dataIndex: 'trend',
  render: (data) => (
    <KSparklineCell
      data={data}
      color="#2E7D32"
      width={80}
      height={24}
    />
  ),
}
```

**Guidelines UX:**
- Minimo 5 puntos de datos para una linea legible.
- Usa colores de feedback: verde para crecimiento, rojo para decrecimiento.
- Mantel el tamano pequeno (80-100px) para no dominar la tabla.

---

### KModal
Dialogo modal centrado con titulo, contenido y footer personalizable. Usa la sombra alta (shadow lg) del sistema.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Queda atrapado en los elementos interactivos del Modal (Focus Trap). Esc: Se define como única anulación rápida para cierre (Abort).
- **ARIA:** Role nativo "dialog" provisto explícitamente y complementado con aria-modal="true".
- **Contraste:** AAA del modal flotante contra la cortina negra 50% transparente.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `open` | `boolean` | Si | - | Controla la visibilidad. |
| `onClose` | `() => void` | Si | - | Callback al cerrar. |
| `title` | `string` | Si | - | Titulo del modal. |
| `children` | `ReactNode` | Si | - | Contenido del modal. |
| `footer` | `ReactNode` | No | - | Botones de accion del footer. |
| `width` | `number` | No | `520` | Ancho en pixeles. |

**Ejemplo de Uso:**
```tsx
import { KModal } from '@khor/design-system/organisms/index';

const [open, setOpen] = useState(false);

<KModal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirmar Accion"
  footer={
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
      <KButton variant="secondary" onClick={() => setOpen(false)}>
        Cancelar
      </KButton>
      <KButton variant="primary" onClick={handleConfirm}>
        Confirmar
      </KButton>
    </div>
  }
>
  <p>Contenido del modal...</p>
</KModal>
```

**Guidelines UX:**
- Usa para confirmaciones y formularios cortos.
- Footer siempre con Cancelar (secondary) + Accion (primary).

---

### KDrawer
Panel lateral deslizable para detalles, formularios o inspectores. Aparece desde el lado derecho por defecto.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tab: Ciclo de enfoque atrapado lateralmente. Esc: Cierre con atajo rápido.
- **ARIA:** Implementa role="dialog" al igual que Modal. El DOM inyecta el cajón en el primer nivel (Portal) de document.body para evitar quiebres de z-index.
- **Contraste:** AAA sobre el panel lateral descolorando el contenido principal.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `open` | `boolean` | Si | - | Controla la visibilidad. |
| `onClose` | `() => void` | Si | - | Callback al cerrar. |
| `title` | `string` | Si | - | Titulo del drawer. |
| `children` | `ReactNode` | Si | - | Contenido. |
| `width` | `number` | No | `400` | Ancho. |
| `placement` | `'left' | 'right'` | No | `'right'` | Lado de aparicion. |
| `footer` | `ReactNode` | No | - | Footer con acciones. |

**Ejemplo de Uso:**
```tsx
import { KDrawer } from '@khor/design-system/organisms/index';

<KDrawer
  open={open}
  onClose={() => setOpen(false)}
  title="Detalle de Empleado"
  width={400}
  footer={...}
>
  <KFormField label="Nombre">
    <KInput value={name} onChange={...} />
  </KFormField>
</KDrawer>
```

**Guidelines UX:**
- Usa para formularios largos o detalle de registros.
- Width de 400-600px dependiendo del contenido.

---

### KCardSection
Tarjeta contenedora para agrupar contenido relacionado con titulo, subtitulo y acciones extra.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Atrapa navegación en acciones extra del título.
- **ARIA:** Organiza en landmarks lógicos si es parte principal de una página.
- **Contraste:** AAA sobre la plataforma blanca primaria de Khor.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `title` | `string` | No | - | Titulo de la seccion. |
| `subtitle` | `string` | No | - | Subtitulo. |
| `extra` | `ReactNode` | No | - | Contenido extra en el header (botones, etc). |
| `children` | `ReactNode` | Si | - | Contenido de la tarjeta. |
| `noPadding` | `boolean` | No | `false` | Remueve el padding del body. |

**Ejemplo de Uso:**
```tsx
import { KCardSection } from '@khor/design-system/organisms/index';

<KCardSection
  title="Informacion Personal"
  subtitle="Datos basicos del empleado"
  extra={<KButton variant="secondary" size="sm">Editar</KButton>}
>
  {/* Contenido */}
</KCardSection>
```

**Guidelines UX:**
- Usa para agrupar campos relacionados en formularios o vistas de detalle.

---

### KTabs
Navegacion por pestanas con soporte para iconos y contenido por tab.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Left/Right: Mueve el foco entre las tablist activas. Enter/Space: Selecciona el tab focalizado.
- **ARIA:** Contenedor usa role="tablist". Cada pestaña es role="tab". Contenido asume role="tabpanel".
- **Contraste:** AAA sobre el tab activo con barra de indicación inferior.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `defaultValue` | `string` | No | - | Tab activo por defecto. |
| `onValueChange` | `(key: string) => void` | No | - | Callback al cambiar de tab. |
| `children` | `ReactNode` | Si | - | Sub-componentes KTabsList, KTabsTrigger y KTabsContent. |

**Ejemplo de Uso:**
```tsx
import { KTabs, KTabsList, KTabsTrigger, KTabsContent } from '@khor/design-system/organisms/index';

<KTabs defaultValue="general" onValueChange={(key) => setActiveTab(key)}>
  <KTabsList>
    <KTabsTrigger value="general">General</KTabsTrigger>
    <KTabsTrigger value="docs">Documentos</KTabsTrigger>
  </KTabsList>
  <KTabsContent value="general">Contenido Gral</KTabsContent>
  <KTabsContent value="docs">Contenido Docs</KTabsContent>
</KTabs>
```

**Guidelines UX:**
- Maximo 5-6 tabs. Para mas, usa navegacion por menu.
- Incluye icono Lucide para mejorar legibilidad.

---

### KToastManager
Sistema de notificaciones tipo toast con 4 variantes semanticas (success, error, warning, info). Usa la libreria Sonner con estilos Khor.

> **Directrices IA**: kToast es la forma estandar de comunicar resultados de acciones al usuario. La IA debe usar success para confirmaciones y error para fallos.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Enfoque general usando sistemas nativos del layout.
- **ARIA:** Portal en viewport con aria-live="polite" o "assertive".
- **Contraste:** AAA texto y fondos de alerta semánticos.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `type` | `'success' | 'error' | 'warning' | 'info'` | No | `'info'` | Tipo semantico de la notificacion. |
| `title` | `string` | Si | - | Titulo del toast. |
| `description` | `string` | No | - | Descripcion adicional. |
| `duration` | `number` | No | `4000` | Duracion en milisegundos. |

**Ejemplo de Uso:**
```tsx
import { KToastProvider, kToast } from '@khor/design-system/organisms/index';

// 1. Agrega el Provider en tu layout principal
<KToastProvider />

// 2. Llama kToast() desde cualquier lugar
kToast({
  type: 'success',
  title: 'Empleado registrado',
  description: 'Maria Garcia fue dada de alta exitosamente.',
});

kToast({
  type: 'error',
  title: 'Error al guardar',
  description: 'No se pudo conectar con el servidor.',
  duration: 6000,
});

kToast({
  type: 'warning',
  title: 'Contrato por vencer',
  description: 'El contrato vence en 5 dias.',
});

kToast({
  type: 'info',
  title: 'Actualizacion disponible',
});
```

**Guidelines UX:**
- Agrega <KToastProvider /> una sola vez en el layout raiz.
- Usa kToast() como funcion imperativa — no necesita hooks ni estado.
- success para acciones completadas, error para fallos, warning para advertencias, info para notificaciones generales.

---

### KCommandBar
Barra de búsqueda global activada con Ctrl+K (o Cmd+K en Mac). Permite buscar componentes, tokens, templates y navegar rápidamente por todo el Design System. Incluye historial de recientes y navegación por teclado.

> **Directrices IA**: El Command Bar es la interfaz principal de búsqueda. Contiene un registro de todos los componentes con keywords en español e inglés para máxima encontrabilidad.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Cmd/Ctrl + K: Activa modal. Up/Down: Navega entre filas de resultados al instante. Enter: Acción selectora.
- **ARIA:** Role "combobox" y aria-autocomplete.
- **Contraste:** AAA en resultados, inputs base y atajos visuales.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `open` | `boolean` | Si | - | Controla la visibilidad del Command Bar. |
| `onClose` | `() => void` | Si | - | Callback al cerrar. |

**Ejemplo de Uso:**
```tsx
import { KCommandBar, useCommandBar } from '@khor/design-system/command-bar';

// 1. Hook para el shortcut global (en tu layout)
const { open, setOpen } = useCommandBar();

// 2. Renderiza el Command Bar
<KCommandBar open={open} onClose={() => setOpen(false)} />

// 3. Botón opcional para abrir manualmente
<button onClick={() => setOpen(true)}>
  Buscar... ⌘K
</button>

// Funcionalidades:
// - Búsqueda fuzzy por nombre, categoría y keywords
// - Navegación con flechas ↑↓ y Enter
// - Historial de últimas 5 búsquedas (localStorage)
// - Agrupación por categoría (Átomo, Molécula, Organismo, Template)
// - Cierre con Escape o click fuera
```

**Guidelines UX:**
- Usa useCommandBar() en el layout raíz para registrar el shortcut global.
- El Command Bar busca en todos los componentes del Design System.
- Los recientes se guardan en localStorage automáticamente.
- Navega con ↑↓ y selecciona con Enter.

---

### KUpload
Componente de subida de archivos con zona de drag & drop, lista de archivos con estado (subiendo, completado, error), progreso y previews de imagen.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Space/Enter sobre el área abre el file explorer nativo.
- **ARIA:** Input type="file" real y envuelto en label clickable por diseño de forma que se mantiene accesible.
- **Contraste:** AAA base para textos principales.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `multiple` | `boolean` | No | - | Permitir multiples archivos. |
| `accept` | `string` | No | - | Tipos de archivo aceptados. |
| `maxSize` | `number` | No | - | Tamano maximo en bytes. |
| `maxFiles` | `number` | No | - | Limite de archivos. |
| `value` | `KUploadFile[]` | No | - | Lista de archivos. |
| `onChange` | `(files) => void` | No | - | Callback al cambiar. |
| `onUpload` | `(file: File) => Promise<KUploadFile>` | No | - | Funcion de subida custom. |
| `listType` | `'text' | 'picture'` | No | `'text'` | Tipo de lista. |

**Ejemplo de Uso:**
```tsx
import { KUpload } from '@khor/design-system/organisms/index';

<KUpload
  multiple
  accept="image/*,.pdf"
  maxSize={5 * 1024 * 1024}
  value={files}
  onChange={setFiles}
  onUpload={async (file) => { /* upload logic */ }}
/>
```

**Guidelines UX:**
- Define maxSize para evitar uploads excesivos.
- Usa onUpload para integracion con API.

---

### KTree
Vista de arbol expandible/colapsable con soporte para seleccion, checkboxes, iconos y lineas de conexion. Ideal para jerarquias de carpetas o categorias.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Flechas de dirección: Navegación multinivel y apertura (ArrowRight)/Cierre (ArrowLeft) del árbol.
- **ARIA:** role="tree" para nodo base. role="treeitem" nativo en hijos.
- **Contraste:** AA sobre guías o líneas de conexión estructuradas.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `data` | `KTreeNode[]` | Si | - | Nodos con key, title y children. |
| `checkable` | `boolean` | No | - | Mostrar checkboxes. |
| `showLine` | `boolean` | No | - | Lineas de conexion. |
| `showIcon` | `boolean` | No | `true` | Iconos de carpeta/archivo. |
| `onSelect` | `(keys, info) => void` | No | - | Al seleccionar nodo. |
| `onCheck` | `(keys) => void` | No | - | Al checkear nodo. |

**Ejemplo de Uso:**
```tsx
import { KTree } from '@khor/design-system/organisms/index';

<KTree
  data={treeData}
  checkable
  showLine
  onSelect={(keys) => setSelected(keys)}
/>
```

**Guidelines UX:**
- Usa showLine para jerarquias profundas.
- V4 maneja expansion de forma interna por defecto.

---

### KTour
Tour guiado paso a paso para onboarding. Resalta elementos de la UI con mascara, muestra cards con titulo, descripcion y navegacion entre pasos.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Escape: Cierra el tour. Navegación en footer popover por flechas/tab.
- **ARIA:** Actúa como Alert Dialog (interrumpe flujo temporalmente). Mismo focus trap que los Modales.
- **Contraste:** AAA sobre capas altas oscurecedoras.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `steps` | `KTourStep[]` | Si | - | Pasos con title, description, target y placement. |
| `open` | `boolean` | No | - | Activar el tour. |
| `onClose` | `() => void` | No | - | Al cerrar. |
| `onFinish` | `() => void` | No | - | Al completar todos los pasos. |

**Ejemplo de Uso:**
```tsx
import { KTour } from '@khor/design-system/organisms/index';

<KTour
  open={showTour}
  onClose={() => setShowTour(false)}
  onFinish={() => markOnboardingComplete()}
  steps={[
    { title: 'Bienvenido', description: 'Este es el dashboard.', target: '#dashboard' },
    { title: 'Sidebar', description: 'Navega entre secciones.', target: '#sidebar' },
  ]}
/>
```

**Guidelines UX:**
- Usa targets con selectores CSS únicos.
- Máximo 5-7 pasos por tour para evitar fatiga.

---

### KModalConfirm
Diálogo de confirmación declarativo para acciones críticas. Soporta tipos semánticos (confirm, success, error) y estados asíncronos.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Escape: Cierra el diálogo. Focus trap mientras está abierto.
- **ARIA:** role="alertdialog" para notificar severidad.
- **Contraste:** AAA sobre la superficie del sistema.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `open` | `boolean` | Si | - | Visibilidad. |
| `type` | `'confirm'|'success'|'error'` | No | - | Tipo semántico. |
| `onOk` | `() => void | Promise` | No | - | Callback al aceptar. |

**Ejemplo de Uso:**
```tsx
import { KModalConfirm } from '@khor/design-system/organisms/index';

<KModalConfirm
  open={showConfirm}
  onClose={() => setShowConfirm(false)}
  type="confirm"
  title="¿Eliminar registro?"
  content="Esta acción no se puede deshacer."
  onOk={async () => { await deleteAction(); }}
/>
```

**Guidelines UX:**
- Usa para acciones que requieren validación explícita del usuario.

---

### KFormList
Lista dinámica de campos de formulario. Permite agregar, eliminar y reordenar filas. Ideal para formularios con ítems repetibles.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Teclado opera el adicinamiento nativamente a través de Tab desde el botón de sumar.
- **ARIA:** Cada sub-objeto actúa de forma pasiva, pero se alerta su entrada mediante focus automático.
- **Contraste:** AA sobre listados anidados.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `name` | `string` | Si | - | Nombre del campo array. |
| `renderItem` | `(field, index, ops) => ReactNode` | Si | - | Render de cada fila. |
| `addText` | `string` | No | `'Agregar campo'` | Texto del botón agregar. |

**Ejemplo de Uso:**
```tsx
import { KForm, KFormList, KInput } from '@khor/design-system/organisms/index';

<KForm initialValues={{ members: [{ name: 'Juan' }] }}>
  <KFormList 
    name="members" 
    renderItem={(field) => (
      <div style={{ display: 'flex', gap: 8 }}>
        <KForm.Item {...field} name={[field.name, 'name']}>
          <KInput placeholder="Nombre" />
        </KForm.Item>
      </div>
    )}
  />
</KForm>
```

**Guidelines UX:**
- Usa maxItems para evitar formularios demasiado largos.
- renderItem recibe operaciones add/remove.

---

### KCarousel
Carrusel de contenido con soporte para autoplay, efectos y navegación. Diseñado para integrarse con el diseño minimalista de Khor DS.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Flechas: Navega entre slides. Space/Enter sobre dots: Salta a slide.
- **ARIA:** Role="region" con aria-roledescription="carousel".
- **Contraste:** AAA sobre el fondo del slide.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `autoplay` | `boolean` | No | `false` | Auto-reproducción. |
| `dots` | `boolean` | No | `true` | Indicadores de posición. |
| `effect` | `'scroll' | 'fade'` | No | `'scroll'` | Efecto de transición. |

**Ejemplo de Uso:**
```tsx
import { KCarousel } from '@khor/design-system/organisms/index';

<KCarousel autoplay dots>
  <div>Slide 1</div>
  <div>Slide 2</div>
</KCarousel>
```

**Guidelines UX:**
- Usa autoplay solo cuando sea necesario para no distraer.
- Max 5 slides recomendados.

---

### KCalendar
Calendario completo interactivo diseñado para Khor DS. Soporta vistas de mes y año, selección de fechas, y eventos personalizados mediante renderCell.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** ArrowKeys: Navega entre días de la cuadrícula. PageUp/Down: Salta entre meses. Enter: Selecciona fecha.
- **ARIA:** Grid-based accessibility with ARIA roles for days and navigation. Announcements for month changes via live region.
- **Contraste:** AAA entre número de día y fondo de grilla.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `value` | `Date` | No | - | Fecha seleccionada controlada. |
| `onChange` | `(date: Date) => void` | No | - | Callback al seleccionar una fecha. |
| `onPanelChange` | `(date, mode) => void` | No | - | Al cambiar de mes/año. |
| `dateCellRender` | `(date) => ReactNode` | No | - | Renderizado custom de celda de día. |
| `monthCellRender` | `(date) => ReactNode` | No | - | Renderizado custom de celda de mes. |

**Ejemplo de Uso:**
```tsx
import { KCalendar } from '@khor/design-system/organisms/index';

<KCalendar
  onChange={(date) => console.log(date)}
  onPanelChange={(date, mode) => console.log(mode)}
/>
```

**Guidelines UX:**
- Ideal para agendar citas, eventos y calendarios editoriales.

---

### KForm
Sistema de formularios avanzado con validación integrada, manejo de estado y layout flexible. Basado en react-hook-form para máxima eficiencia.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Operaciones nativas en todos los inputs de children. Enter sobre un input dispara el submit general automáticamente.
- **ARIA:** Los label (KForm.Item) están vinculados por id a los inputs internos usando for (HTMLFor), crucial para VoiceOver.
- **Contraste:** N/A: Estructura contenedora pasiva.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `layout` | `'horizontal'|'vertical'|'inline'` | No | `'horizontal'` | Disposición de etiquetas y campos. |
| `onSubmit` | `(values) => void` | No | - | Callback al enviar con éxito. |
| `methods` | `UseFormReturn` | No | - | Instancia de react-hook-form (KForm.useForm). |

**Ejemplo de Uso:**
```tsx
import { KForm, KInput, KButton } from '@khor/design-system/organisms/index';

const methods = KForm.useForm({ defaultValues: { username: '' } });

<KForm methods={methods} onSubmit={(values) => console.log(values)}>
  <KForm.Item name="username" label="Usuario">
    <KForm.Field
      name="username"
      rules={{ required: 'Requerido' }}
      render={({ field }) => <KInput {...field} placeholder="Usuario" />}
    />
  </KForm.Item>
  <KButton variant="primary" htmlType="submit">Enviar</KButton>
</KForm>
```

**Guidelines UX:**
- Usa KForm.Item para envolver cada campo.
- Define rules en KForm.Field para validación automática.

---

### KNotification
Notificaciones emergentes imperativas que aparecen en las esquinas de la pantalla. Ideales para avisos de larga duración o que requieren más contexto.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Las notificaciones no atrapan el foco a menos que contengan acciones explícitas.
- **ARIA:** Role "alert" o "status" inyectado dinámicamente en el DOM.
- **Contraste:** AAA sobre la superficie modal del sistema.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `message` | `ReactNode` | Si | - | Cuerpo principal (título) del aviso. |
| `description` | `ReactNode` | No | - | Contenido adicional detallado. |
| `type` | `'success'|'error'|'warning'|'info'` | No | `'info'` | Tipo semántico del estado. |
| `opacity` | `number` | No | `0.95` | Nivel de opacidad (0 a 1) para el efecto de apilamiento. |
| `duration` | `number` | No | `5000` | Milisegundos antes de cerrar. |

**Ejemplo de Uso:**
```tsx
import { kNotification } from '@khor/design-system/organisms/index';

kNotification.success({
  message: 'Certificación Guardada',
  description: 'El documento ha sido procesado y archivado.',
  opacity: 0.95, // Control de transparencia opcional
});
```

**Guidelines UX:**
- Usa para avisos que no deben desaparecer tan pronto como un Toast.
- Soporta iconos y estilos semánticos.

---

### KMessage
Mensajes de feedback globales que aparecen centrados en la parte superior. Muy ligeros y automáticos.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Interacción pasiva: No interrumpe la navegación del teclado.
- **ARIA:** Aria-live polite para mensajes informativos comunes.
- **Contraste:** AAA sobre el fondo centrado.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `content` | `ReactNode` | Si | - | Contenido del mensaje. |
| `duration` | `number` | No | `3` | Segundos antes de cerrar. |

**Ejemplo de Uso:**
```tsx
import { kMessage } from '@khor/design-system/organisms/index';

kMessage.success('Acción completada');
kMessage.warning('El archivo es demasiado grande');
const hide = kMessage.loading('Subiendo...', 0);
// hide() cierra el mensaje
```

**Guidelines UX:**
- Usa para feedbacks inmediatos y breves (copiar, descargar, guardar).

---

### KPagination
Control de navegación para grandes conjuntos de datos. Soporta cambio de página, tamaño de página y salto rápido.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Arrow Keys mueven entre páginas. Tabulador permite entrar a controles Quick-Jump.
- **ARIA:** Navegación listitem con etiqueta aria-current="page".
- **Contraste:** AAA controlando número activo en fondo navy.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `total` | `number` | Si | - | Número total de registros. |
| `pageSize` | `number` | No | - | Registros por página. |
| `onChange` | `(page, size) => void` | No | - | Callback al cambiar. |

**Ejemplo de Uso:**
```tsx
import { KPagination } from '@khor/design-system/organisms/index';

<KPagination
  total={100}
  pageSize={10}
  onChange={(page, size) => console.log(page, size)}
  showSizeChanger
/>
```

**Guidelines UX:**
- Usa debajo de listas o grillas de cards que no usen KDataTable.

---

### KLoginForm
Formulario de inicio de sesión estándar con campos de email y contraseña, validación integrada y estado de carga.

**Accesibilidad (ARIA & Keyboard - Score: 100/100)**
- **Keyboard:** Tabulación rígida orientada a User->Password->Button. Enter realiza Submit.
- **ARIA:** Type="email" y "password" nativos con autocompletado habilitado.
- **Contraste:** AAA según reglas universales de formulario.

**Props Principales:**
| Prop | Tipo | Requerido | Default | Descripcion |
|------|------|-----------|---------|-------------|
| `onFinish` | `(values) => void` | No | - | Callback al enviar el formulario con éxito. |
| `loading` | `boolean` | No | - | Muestra estado de carga en el botón. |

**Ejemplo de Uso:**
```tsx
import { KLoginForm } from '@khor/design-system/organisms/index';

<KLoginForm 
  onFinish={(values) => login(values)} 
  loading={isLoggingIn} 
/>
```

**Guidelines UX:**
- Centra el formulario en un contenedor de ancho máximo (ej. 400px).

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


### Patrón Modular: Dashboard con Stats + Filtros
Panel de métricas con KStatCard, filtros de periodo y sparklines. Ideal para vistas resumen.
```tsx
import { KStatCard } from '@khor/molecules';

// Stats con sparklines y filtro de periodo
<KStatCard title="Ingresos" value="$48,250" change={12.5}
  changeLabel="vs. periodo anterior"
  icon={<DollarSign size={20} />}
  sparkData={[30, 40, 35, 50, 49, 60, 70, 91]}
/>
```


### Patrón Modular: Dashboard Principal SaaS
Interfaz central de mando avanzada con KPIs animados, gestión de infraestructura vía KDataTable (Wave 11) y micro-interacciones premium.
```tsx
<KStatCard 
  title="MRR" 
  value="$45k" 
  change={12.5} 
/>
```


### Patrón Modular: Login Aero-Glass SaaS
Interfaz de entrada ultra-moderna con efectos de cristal (glassmorphism), animaciones reactivas de error (shake) y micro-interacciones Wave 12.
```tsx
<KLoginForm onFinish={handleLogin} />
```


### Patrón Modular: Gestión CRUD para SaaS
Patrón avanzado de gestión de datos con KDataTable, KSparklineCell y acciones integradas. Resuelve errores comunes de IDs en tablas TanStack.
```tsx
import { KDataTable, KUserCell, KSparklineCell } from '@khor/organisms';

// Configuración de columnas (TanStack Style)
const columns = [
  { 
    id: 'name', 
    accessorKey: 'name', 
    header: 'Colaborador',
    cell: ({ getValue }) => <KUserCell name={getValue()} />
  }
];

// Uso del componente
<KDataTable columns={columns} data={teamMembers} />
```


### Patrón Modular: Onboarding Dinámico Wave 13
Wizard de configuración corporativa fluido con adaptabilidad responsiva integral y micro-interacciones de validación.
```tsx
<KSteps items={steps} current={step} />
```


### Patrón Modular: Gestión de Facturación SaaS
Panel completo para gestión de planes, métodos de pago e historial de facturas. Incluye indicadores de uso con KProgress y tablas de datos.
```tsx
<KDataTable columns={billingColumns} data={invoices} />
```


### Patrón Modular: Onboarding SaaS Progresivo
Flujo de configuración inicial multi-paso con tracking lateral y estados de confirmación. Maximiza la conversión mediante progressive disclosure.
```tsx
<KSteps items={[
  { title: 'Empresa', icon: <Building2 /> },
  { title: 'Equipo', icon: <Users /> },
  { title: 'Seguridad', icon: <ShieldCheck /> }
]} />
```


### Patrón Modular: Explorador con Filtros Avanzados
Sistema de búsqueda y filtrado dinámico para grandes conjuntos de datos. Incluye gestión de tags activos, selectores inteligentes y visualización en grid.
```tsx
<KFormField label="Estado">
  <KSelectField options={[...]} />
</KFormField>
```


### Patrón Modular: Lista Filtrable con Acciones
Lista de datos con búsqueda, badges de estado/rol y acciones inline (editar, eliminar).
```tsx
import { KSearchInput } from '@khor/atoms';
import { KButton, KBadge } from '@khor/atoms';

// Barra de búsqueda + botón de acción
<div style={{ display: 'flex', gap: t.spacing.sm }}>
  <KSearchInput placeholder="Buscar..." value={search} onChange={setSearch} />
  <KButton variant="primary" icon={<Plus size={t.icon.sm} />}>Nuevo</KButton>
</div>
// Lista con badges y acciones
{users.map(u => (
  <div key={u.id}>
    <KBadge status={u.role === 'Admin' ? 'info' : 'default'} label={u.role} />
    <KButton variant="ghost" size="sm" icon={<Edit size={t.icon.xs} />} />
  </div>
))}
```


### Patrón Modular: Tabla con Paginación
Tabla de datos con búsqueda, paginación y acciones inline (editar, eliminar).
```tsx
import { KSearchInput, KStatCard } from '@khor/molecules';
import { KButton, KBadge } from '@khor/atoms';

// Barra de búsqueda + botón de acción
<div style={{ display: 'flex', gap: t.spacing.sm }}>
  <KSearchInput placeholder="Buscar..." value={search} onChange={setSearch} />
  <KButton variant="primary" icon={<Plus size={t.icon.sm} />}>Nuevo</KButton>
</div>
// Lista con badges y acciones
{users.map(u => (
  <div key={u.id}>
    <KBadge status={u.role === 'Admin' ? 'info' : 'default'} label={u.role} />
    <KButton variant="ghost" size="sm" icon={<Edit size={t.icon.xs} />} />
  </div>
))}
```


### Patrón Modular: Galería de Estados Vacíos
Colección de patrones para manejar estados de carga, errores de conexión, búsquedas sin resultados y paywalls de suscripción. Mejora la resiliencia de la interfaz.
```tsx
<KEmptyState 
  title="Sin resultados" 
  actions={<KButton>Reintentar</KButton>} 
/>
```

---