# Contribuir al Khor Design System

## Convención de Versiones (SemVer)

| Tipo | Cuándo | Ejemplo |
|------|--------|---------|
| **Major** (X.0.0) | Breaking changes en API de componentes | Renombrar prop `variant` → `type` |
| **Minor** (2.X.0) | Nuevos componentes, features, tokens | Agregar `KDatePicker` |
| **Patch** (2.7.X) | Fixes de bugs, ajustes de CSS | Corregir contraste en `KBadge` |

## Checklist para Nuevos Componentes

### Accesibilidad (obligatorio)
- [ ] Navegable con Tab / Shift+Tab
- [ ] Activable con Enter y/o Space
- [ ] Escape para cerrar (si aplica: dialogs, menus, dropdowns)
- [ ] `role` semántico apropiado
- [ ] `aria-label` o `aria-labelledby` presente
- [ ] `aria-expanded` / `aria-selected` / `aria-checked` según corresponda
- [ ] `aria-disabled` en estado disabled
- [ ] Contraste de colores ≥ 4.5:1 (AA)
- [ ] Focus ring visible vía `:focus-visible`

### Estados Requeridos
Cada componente debe documentar visualmente:
- Default
- Hover
- Active / Pressed
- Focus (ring visible)
- Disabled (opacity 50%, grayscale)
- Loading (si aplica)
- Error (si aplica)

### Tokens
- Usar tokens semánticos (`--khor-action-primary-default`) en lugar de primitivos (`--khor-primary`) cuando aplique
- Motion: usar `--khor-duration-normal` y `--khor-easing-standard` para transiciones

### Documentación
- Añadir al registro de átomos/moléculas/organismos
- Crear playground interactivo con controles
- Añadir props a la tabla de ComponentDoc
- Incluir guidelines de uso y AI notes

## Roadmap Futuro

### Testing Automatizado
- Vitest + Playwright ya instalados
- Pendiente: tests unitarios por componente
- Pendiente: Visual Regression Testing (snapshot-based)

### Storybook (Descartado)
Se intentó y se descartó. Los playgrounds nativos cumplen la función equivalente.
