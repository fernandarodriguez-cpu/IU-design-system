# Corán de Desarrollo para IA — Khor Design System v4

Esta guía define las **Reglas de Oro** para cualquier inteligencia artificial (o humano) que trabaje en el repositorio `Khordesignsystem`. Seguir estas reglas es obligatorio para mantener la integridad del sistema tras la migración a la arquitectura **Total Headless**.

---

## 👑 Reglas de Oro (The Golden Rules)

1.  **CERO Dependencias de Ant Design**: Está terminantemente prohibido importar nada de `antd`, `@ant-design/icons` o `@ant-design/colors`. El sistema es 100% independiente.
2.  **Primitivas Headless (Radix UI)**: Para cualquier componente interactivo complejo (Modales, Selects, Dropdowns, Tabs), utiliza **Radix UI**. No reinventes la rueda de la accesibilidad.
3.  **Tailwind CSS v4 al Límite**: No uses estilos en línea ni objetos de estilo de JS a menos que sea estrictamente necesario para cálculos dinámicos. Toda la estética debe residir en clases de Tailwind y variables de CSS (`khorTokens`).
4.  **Lucide React para Iconografía**: El estándar único para iconos es `lucide-react`. No uses SVGs crudos ni otras librerías de iconos.
5.  **Arquitectura de Componentes Compuestos**: Prefiere `KComponent.Root`, `KComponent.Trigger`, `KComponent.Content` para dar máxima flexibilidad al consumidor.
6.  **Tipado Estricto (TypeScript)**: Siempre define interfaces claras para las Props y exporta los tipos necesarios.

---

## 📅 Estándar para el Manejo de Fechas

**Librería Oficial**: `date-fns` & `date-fns-tz`
**Prohibido**: `dayjs`, `moment.js` o manipulación manual de strings de fecha.

### ¿Por qué `date-fns`?
*   **Interoperabilidad**: Usa objetos `Date` nativos de JavaScript.
*   **Tree-Shaking**: Solo se empaqueta lo que se usa (ej: `format`, `isValid`).
*   **Inmutabilidad**: Las funciones siempre devuelven una nueva instancia de fecha.

### Ejemplo de uso recomendado:
```tsx
import { format, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

const formattedDate = date && isValid(date) 
  ? format(date, 'dd/MM/yyyy', { locale: es }) 
  : 'Fecha no válida';
```

---

## 🏗️ Arquitectura de Componentes

### 1. Átomos (Atoms)
Componentes básicos e indivisibles (Botones, Inputs, Badges).
*   *Ubicación*: `src/app/components/design-system/atoms`

### 2. Moléculas (Molecules)
Combinaciones de átomos con lógica funcional (FormField, SearchInput, SelectField).
*   *Ubicación*: `src/app/components/design-system/molecules`

### 3. Organismos (Organisms)
Secciones complejas de la interfaz (DataTable, Form, AppLayout).
*   *Ubicación*: `src/app/components/design-system/organisms`

---

## 🎨 Especificación Técnica de Tokens (Fuente de Verdad)

Para garantizar que el código generado sea funcional, la IA DEBE mapear las variables a estos valores reales. Si el entorno de ejecución es aislado, la IA DEBE incluir este bloque CSS explícitamente:

```css
:root {
  /* Colores de Marca y Estado */
  --khor-brand-navy: #051758;
  --khor-brand-primary: #E04D36;
  --khor-brand-secondary: #051758; /* Mapped to Navy in Khor v4 */
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
```

---

## 🏗️ Definición de Propiedades de Componentes (Props)

La IA debe usar estas propiedades para asegurar que el diseño sea dinámico y no estático.

### KButton
*   **variant**: `'primary' | 'secondary' | 'ghost' | 'danger'` (Default: `'primary'`)
*   **size**: `'sm' | 'md' | 'lg'` (Default: `'md'`)
*   **fullWidth**: `boolean`
*   **icon**: `ReactNode` (Posición izquierda por defecto)

### KTypography
*   **level**: `1 | 2 | 3 | 4` (Mapea a h1-h4 con tamaños: 2rem, 1.5rem, 1.25rem, 1rem)
*   **type**: `'primary' | 'secondary' | 'success' | 'danger'`
*   **weight**: `'normal' | 'medium' | 'bold'` (400, 500, 700)

### KCardSection
*   **padding**: `'none' | 'sm' | 'md' | 'lg'` (Default: `'md'` = 24px)
*   **bordered**: `boolean` (Default: `true`)
*   **hoverable**: `boolean` (Añade sombra al pasar el mouse)

---

## 🛠️ Instrucciones de Implementación para IAs

Al generar un componente, si el usuario pide "usar el sistema Khor", la IA debe:

*   **Paso 1**: Verificar si el componente requiere un nuevo token. Si no existe, usar la escala de neutros definida.
*   **Paso 2**: Aplicar siempre `box-sizing: border-box` y la fuente `Inter` o `system-ui`.
*   **Paso 3**: Si se genera un archivo único (Single File), incluir el bloque `:root` con los tokens arriba definidos para garantizar que el render sea idéntico al diseño original.

---

## 🛠️ Herramientas Auxiliares de confianza
*   **Tablas**: `@tanstack/react-table` (TanStack Table)
*   **Formularios**: `react-hook-form`
*   **Validación**: `zod`
*   **Notificaciones**: `sonner`
*   **Comandos (⌘K)**: `cmdk`

---

> [!IMPORTANT]
> Si encuentras código antiguo que usa Ant Design, tu primera prioridad debe ser refactorizarlo siguiendo estas reglas antes de añadir nuevas funcionalidades.
