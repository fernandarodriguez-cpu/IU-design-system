# Auditoría — 4 Pendientes (v6.2.1)

## 1. Easings Fantasma en `generateCssBlock()`

El objeto `khorTokens.semantic.motion.easing` y `khorTokens.motion.easing` definen 7 easings, pero `generateCssBlock()` solo genera 4 en el CSS (`standard`, `enter`, `exit`, `spring`). Faltan **3 líneas**:

**Archivo:** `src/app/theme/khor-theme.ts:614-617`

**Antes:**
```ts
--khor-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
--khor-easing-enter: cubic-bezier(0, 0, 0.2, 1);
--khor-easing-exit: cubic-bezier(0.4, 0, 1, 1);
--khor-easing-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

**Después:**
```ts
--khor-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
--khor-easing-enter: cubic-bezier(0, 0, 0.2, 1);
--khor-easing-exit: cubic-bezier(0.4, 0, 1, 1);
--khor-easing-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
--khor-easing-decelerate: cubic-bezier(0, 0, 0.2, 1);
--khor-easing-accelerate: cubic-bezier(0.4, 0, 1, 1);
--khor-easing-emphasized: cubic-bezier(0.2, 0, 0, 1);
```

Además, actualizar `TokensPage.tsx` para mostrar los 3 easings faltantes en la UI:

**Archivo:** `src/app/pages/TokensPage.tsx:546-549`

**Antes:**
```tsx
{ n: 'Standard', v: 'cubic-bezier(0.4, 0, 0.2, 1)', var: '--khor-easing-standard' },
{ n: 'Spring', v: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', var: '--khor-easing-spring' },
{ n: 'Enter', v: 'cubic-bezier(0, 0, 0.2, 1)', var: '--khor-easing-enter' },
```

**Después:**
```tsx
{ n: 'Standard', v: 'cubic-bezier(0.4, 0, 0.2, 1)', var: '--khor-easing-standard' },
{ n: 'Spring', v: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', var: '--khor-easing-spring' },
{ n: 'Enter', v: 'cubic-bezier(0, 0, 0.2, 1)', var: '--khor-easing-enter' },
{ n: 'Exit', v: 'cubic-bezier(0.4, 0, 1, 1)', var: '--khor-easing-exit' },
{ n: 'Decelerate', v: 'cubic-bezier(0, 0, 0.2, 1)', var: '--khor-easing-decelerate' },
{ n: 'Accelerate', v: 'cubic-bezier(0.4, 0, 1, 1)', var: '--khor-easing-accelerate' },
{ n: 'Emphasized', v: 'cubic-bezier(0.2, 0, 0, 1)', var: '--khor-easing-emphasized' },
```

---

## 2. Fluid Typography — `generateCssBlock()` usa px fijos en vez de `clamp()`

La documentación en `AIExportPage.tsx` describe tipografía fluida con `clamp()`, pero `generateCssBlock()` emite valores fijos en `px`. Hay que reemplazar la sección de typography base sizing con valores `clamp()`.

**Archivo:** `src/app/theme/khor-theme.ts:590-601`

**Antes:**
```ts
/* Typography Base Sizing */
--khor-font-size-h1: 32px; --khor-font-size-h2: 28px;
--khor-font-size-h3: 24px; --khor-font-size-h4: 20px;
--khor-font-size-h5: 18px; --khor-font-size-h6: 16px;
--khor-font-size-body-lg: 16px; --khor-font-size-body-md: 14px;
--khor-font-size-body-sm: 13px; --khor-font-size-body-xs: 12px;
--khor-font-size-display-1: 48px; --khor-font-size-display-2: 40px;
--khor-font-size-display-2xl: 72px; --khor-font-size-display-xl: 56px;
--khor-font-size-heading-lg: 48px; --khor-font-size-heading-md: 40px;
--khor-font-size-heading-sm: 32px; --khor-font-size-heading-xs: 24px;
--khor-font-size-body-xl: 18px; --khor-font-size-code: 13px;
--khor-font-size-label: 14px; --khor-font-size-caption: 12px;
```

**Después (usar `clamp()` consistente con `theme.css`):**
```ts
/* Typography Base Sizing (Fluid) */
--khor-font-size-h1: clamp(1.75rem, 3vw + 1rem, 2.5rem);
--khor-font-size-h2: clamp(1.5rem, 2.5vw + 1rem, 2rem);
--khor-font-size-h3: clamp(1.25rem, 2vw + 0.5rem, 1.75rem);
--khor-font-size-h4: clamp(1.125rem, 1.5vw + 0.25rem, 1.375rem);
--khor-font-size-h5: clamp(1rem, 1.25vw + 0.2rem, 1.25rem);
--khor-font-size-h6: clamp(0.875rem, 1vw + 0.15rem, 1rem);
--khor-font-size-body-lg: clamp(1rem, 0.8vw + 0.15rem, 1.125rem);
--khor-font-size-body-md: clamp(0.875rem, 0.5vw + 0.1rem, 1rem);
--khor-font-size-body-sm: clamp(0.8125rem, 0.3vw + 0.05rem, 0.875rem);
--khor-font-size-body-xs: clamp(0.75rem, 0.25vw + 0.05rem, 0.8125rem);
--khor-font-size-display-1: clamp(2.5rem, 5vw + 1rem, 4.5rem);
--khor-font-size-display-2: clamp(2rem, 4vw + 0.8rem, 3rem);
--khor-font-size-display-2xl: clamp(4rem, 5vw + 1rem, 4.5rem);
--khor-font-size-display-xl: clamp(3rem, 4vw + 1rem, 3.5rem);
--khor-font-size-heading-lg: clamp(2rem, 3vw + 1rem, 2.5rem);
--khor-font-size-heading-md: clamp(1.5rem, 2vw + 1rem, 2rem);
--khor-font-size-heading-sm: clamp(1.25rem, 1.5vw + 1rem, 1.5rem);
--khor-font-size-heading-xs: clamp(1rem, 1.2vw + 0.25rem, 1.25rem);
--khor-font-size-body-xl: clamp(1.125rem, 1.2vw + 0.2rem, 1.375rem);
--khor-font-size-code: clamp(0.8125rem, 0.3vw + 0.05rem, 0.875rem);
--khor-font-size-label: clamp(0.875rem, 0.5vw + 0.1rem, 1rem);
--khor-font-size-caption: clamp(0.75rem, 0.25vw + 0.05rem, 0.8125rem);
```

---

## 3. `action-secondary-active` / `action-danger-active` — Referencias Huérfanas (Naming)

**Estado actual:** Las variables primitivas ya se agregaron en `:root` (v6.2.1), entonces ya no son "fantasma" en runtime. Pero el **naming problemático que se señaló en auditorías anteriores** no se ha corregido:

- Los tokens `--khor-secondary-active` y `--khor-error-active` existen como primitivas, pero:
  - `secondary-active` es ambiguo — podría confundirse con "fondo secundario en estado activo".
  - `error-active` tiene el mismo problema semántico.
  - Los tokens semánticos `--khor-action-secondary-active` y `--khor-action-danger-active` están correctamente scoped, pero dependen de primitivas con nombre genérico.

Si la decisión es mantener los nombres actuales (ya funcionan), este punto se puede marcar como **resuelto en runtime pero pendiente de rename en próxima breaking**.
Si se decide renombrar, los archivos afectados son:
- `src/styles/theme.css` (definición `:root` en líneas 24-27 y referencias en 518-522)
- `src/app/theme/khor-theme.ts` (objeto `khorTokens.semantic.action` líneas 281-282)
- `src/app/pages/FigmaExportPage.tsx` (hardcoded fallbacks líneas 355, 358)
- `src/app/components/design-system/atoms/KButton/index.tsx` (className línea 17)
- `figma-plugin/src/tokens.ts` (líneas 420-423)
- `penpot-plugin/src/tokens.json` (líneas 419-422)

---

## 4. Changelog / Version — Stale `6.0.0`

Tres archivos contienen versiones `6.0.0` desactualizadas:

### 4a. `src/scripts/figma-token-sync.cjs:87`

**Antes:** `version: '6.0.0',`
**Después:** `version: '6.2.1',`

### 4b. `src/scripts/mcp-tokens-studio-sync.cjs:30`

**Antes:** `clientInfo: { name: 'KDS-Agent-Sync', version: '6.0.0' }`
**Después:** `clientInfo: { name: 'KDS-Agent-Sync', version: '6.2.1' }`

### 4c. `khor-tokens-manifest.json:4` — collectionName

**Antes:** `"collectionName": "Khor v6.0 System"`
**Después:** `"collectionName": "Khor v6.2 System"`

(o `"Khor v6.2.1 System"` — decisión de naming, pero `6.0` está claramente obsoleto).

---

## Resumen de Archivos a Modificar

| # | Archivo | Cambio |
|---|---------|--------|
| 1 | `src/app/theme/khor-theme.ts` | +3 easings en `generateCssBlock()` |
| 1 | `src/app/pages/TokensPage.tsx` | +4 easings faltantes en UI table |
| 2 | `src/app/theme/khor-theme.ts` | Typography: px → `clamp()` en `generateCssBlock()` |
| 4a | `src/scripts/figma-token-sync.cjs` | `'6.0.0'` → `'6.2.1'` |
| 4b | `src/scripts/mcp-tokens-studio-sync.cjs` | `'6.0.0'` → `'6.2.1'` |
| 4c | `khor-tokens-manifest.json` | `"Khor v6.0 System"` → `"Khor v6.2 System"` |

**Nota:** El punto 3 (action-secondary-active) se documenta aquí para seguimiento, pero funcionalmente ya no es un bug desde v6.2.1.
