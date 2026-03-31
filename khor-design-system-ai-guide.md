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

## 🎨 Design Tokens

Todos los tokens están expuestos como variables CSS y a través del objeto `khorTokens`.
*   **Primary**: `--khor-primary` (#E04D36)
*   **Navy**: `--khor-brand-navy` (#051758)
*   **Neutral 900**: `--khor-neutral-900`
*   **Typography**: `font-primary` (definida en el archivo de Tailwind).

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
