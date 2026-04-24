# Contribuyendo al Khor Design System

¡Gracias por ayudar a construir la infraestructura visual de Khor! Para mantener la integridad técnica y visual (especialmente para que la IA pueda seguir siendo nuestra "Fuente de Verdad"), sigue estas directrices.

## 🚀 Arquitectura de Componentes

Todos los componentes deben seguir el patrón de **Atomic Design** y estar ubicados en:
- `src/app/components/design-system/atoms`
- `src/app/components/design-system/molecules`
- `src/app/components/design-system/organisms`

### Reglas de Oro
1. **Prefijo K:** Todos los componentes exportados deben empezar con "K" (ej. `KButton`).
2. **Cero Dependencias Externas:** No instales librerías de UI adicionales (MUI, AntD, etc.). El sistema es independiente.
3. **Propiedades Estrictas:** Usa TypeScript para definir props claras y documentadas.

## 🎨 Uso de Design Tokens

NUNCA uses valores hardcoded (hex, pixels manuales para spacing).
- **CSS:** Usa variables `var(--khor-*)`.
- **JS/React:** Usa el objeto `khorTokens` desde `@/app/theme/khor-theme`.

### Capas Semánticas
Prioriza siempre los tokens semánticos de **Capa 2** sobre los colores base:
- ✅ `var(--khor-action-primary-default)`
- ❌ `var(--khor-primary)` (solo para definiciones base)

## ♿ Accesibilidad (A11y)

Es innegociable alcanzar un score de 100/100 en las auditorías de accesibilidad.
- **Contraste:** Verifica que tus combinaciones sigan la Tabla de Contraste WCAG en la página de Tokens.
- **Teclado:** Todo componente interactivo debe ser operable vía teclado (Tab, Enter, Space).
- **ARIA:** Incluye atributos ARIA necesarios si el componente no es semánticamente obvio.

## 🤖 Documentación para la IA

Cada vez que añadas un componente, DEBES actualizar su metadato en la página correspondiente (`AtomsPage.tsx`, etc.):
- `description`: Qué hace.
- `a11ySummary`: Resumen técnico de accesibilidad.
- `aiNotes`: Instrucciones específicas para que Claude/v0 usen el componente correctamente.

## 🛠️ Flujo de Trabajo

1. Crea el componente en su carpeta correspondiente.
2. Define los estilos en el `.tsx` usando Tailwind o CSS Modules (si es complejo).
3. Añade el componente al `index.ts` de su categoría.
4. Documenta el componente en la página de Playground.
5. Verifica que los tokens se exporten correctamente en `AIExportPage.tsx`.
