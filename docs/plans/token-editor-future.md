# 🎨 Token Editor — Plan de Mejora Futura

## Problema
KDS tiene tokens de diseño (`khorStaticTokens`, `ThemeConfig`) pero el usuario no puede modificarlos desde la UI. Solo hay 4 presets fijos. Para personalizar, hay que editar código TypeScript a mano.

## Objetivo
UI visual donde el usuario modifique cualquier token y vea el cambio **al instante** en componentes y exportación de guías LLM.

## Arquitectura Propuesta

```
┌──────────────┐     ┌──────────────────┐
│ Token Store   │────>│ CSS Variables    │──> Componentes
│ (React State) │     │ (:root updates)  │
│               │     │                  │
│ merge(khor    │     │ generateCssBlock │──> Markdown Export
│ StaticTokens, │     │ (from store)     │
│ userOverrides)│     │                  │
└──────┬───────┘     └──────────────────┘
       │
       │  ┌──────────────────┐
       └──│ Token Editor UI  │
          │ (ThemingPage)    │
          │ sliders, inputs, │
          │ color pickers    │
          └──────────────────┘
```

## Pasos de Implementación

### Fase 1 — Sliders Básicos (medio día)
- Crear `useTokenStore` hook con estado global
- Sliders para radius (sm/md/lg/xl)
- Sliders para spacing (xs/sm/md/lg/xl)
- Vista previa en vivo en el mismo panel (KButton, KInput, KCard)
- `generateCssBlock` ya acepta `theme` — conectar al store

### Fase 2 — Paleta Completa (1-2 días)
- Color pickers para primary, secondary, accent, success, error, warning, info
- Selector de tipografía para fontHeading, fontBody
- Preview de botones, inputs, badges con colores activos
- Reset a preset (DEFAULT, AI_MODERN, FINTECH_SECURE, HEALTHCARE_CLEAN)

### Fase 3 — Export/Import y Preview Real (2-3 días)
- Exportar tema como JSON
- Importar tema desde JSON
- Vista previa con componentes reales en sandbox/iframe
- Tooltip "componentes afectados" al cambiar un token
- Historial de cambios (deshacer/rehacer)

## Archivos a Modificar/Crear
- `src/app/store/useTokenStore.ts` — nuevo
- `src/app/components/tokens/TokenEditor.tsx` — nuevo
- `src/app/components/tokens/ColorPicker.tsx` — nuevo
- `src/app/components/tokens/SliderField.tsx` — nuevo
- `src/app/pages/ThemingPage.tsx` — integrar TokenEditor
- `src/app/theme/khor-theme.ts` — `generateCssBlock()` ya preparado

## Dependencias
- `react-colorful` (color picker, 3KB gzip)
- Ninguna otra externa

## Riesgos
- Testing visual por combinación de tokens (snapshots por preset)
- Perf: debounce 100ms en sliders para evitar re-layouts constantes
- Algunos tokens difíciles de parametrizar (sombras multi-capa, transiciones compuestas)
- Matriz tokens→CSS vars→componentes debe mantenerse sincronizada manualmente
