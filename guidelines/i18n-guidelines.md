# Guía de Internacionalización (i18n) — Khor Design System

## Propiedades Lógicas CSS

Para soporte RTL (Right-to-Left), usar **propiedades lógicas** en lugar de físicas:

| ❌ Físico | ✅ Lógico |
|-----------|----------|
| `margin-left` | `margin-inline-start` |
| `margin-right` | `margin-inline-end` |
| `padding-left` | `padding-inline-start` |
| `padding-right` | `padding-inline-end` |
| `text-align: left` | `text-align: start` |
| `text-align: right` | `text-align: end` |
| `float: left` | `float: inline-start` |
| `border-left` | `border-inline-start` |
| `left` / `right` | `inset-inline-start` / `inset-inline-end` |

## Activar RTL

```html
<html dir="rtl" lang="ar">
```

El token `[dir="rtl"]` en `theme.css` activa `direction: rtl` automáticamente.

## Fallbacks Tipográficos

| Script | Token CSS | Fuentes |
|--------|-----------|---------|
| Árabe | `--font-fallback-arabic` | Noto Sans Arabic, Segoe UI |
| CJK | `--font-fallback-cjk` | Noto Sans SC, Hiragino Sans |
| Hebreo | `--font-fallback-hebrew` | Noto Sans Hebrew, Segoe UI |

### Uso

```css
.my-arabic-text {
  font-family: var(--font-fallback-arabic);
}
```

## Testing RTL

1. Añadir `dir="rtl"` al `<html>` tag
2. Verificar que los layouts se espejean correctamente
3. Revisar que iconos de flechas/navegación se inviertan
4. Confirmar que los textos largos no se desbordan
