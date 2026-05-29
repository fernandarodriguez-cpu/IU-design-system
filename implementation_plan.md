# Plan de Implementación: Fix Figma Plugin (Shadows & Duplication)

## 1. Visión General
El usuario ha detectado dos comportamientos anómalos en el plugin `KDS Manager Pro` (`figma-plugin-generator.ts`):
1. **Páginas de Foundations Duplicadas**: La función `populateFoundations` está creando o duplicando las páginas de las categorías (`💎 Foundations / Colors`, `💎 Foundations / Shadows`, etc.) de forma desorganizada.
2. **Tokens de Sombras Defectuosos**: Las sombras no se están parseando correctamente y no se visualizan en la documentación.

## 2. Análisis del Problema y Hallazgos

He analizado el archivo `src/scripts/figma-plugin-generator.ts` y la hoja de estilos `theme.css`. He encontrado la raíz de ambos problemas:

### A. Bug de las Sombras (Shadows)
El método `parseVal` actual hace esto:
```javascript
var n = parseFloat(v);
if (!isNaN(n)) { ... return FLOAT }
```
Cuando el token de sombra llega como `"0 4px 6px rgba(0,0,0,0.1)"`, la función `parseFloat` devuelve `0` (ignorando el resto del string). Como `0` es un número válido, **convierte el token de sombra completo en un triste FLOAT de valor `0`**. Por eso los tokens de sombra estaban vacíos y no se podían procesar en la sección de Shadows.

### B. Bug de las Páginas Duplicadas
Actualmente, el plugin crea 5 páginas separadas (ej. `💎 Foundations / Colors`, `💎 Foundations / Shadows`). Cada vez que se corre, dependiendo del flujo, puede ocasionar que se dupliquen las vistas porque los `find` no están coincidiendo exactamente con la estructura de páginas existente, o porque están divididas innecesariamente.

## 3. Cambios Propuestos

### [MODIFY] `src/scripts/figma-plugin-generator.ts`

1. **Corrección de `parseVal`:** 
   Modificaré las comprobaciones para que, si el string contiene espacios (ej. `"0 4px"`) o la palabra `rgba`/`inset` (o si es `none`), se trate estrictamente como un `STRING` y no como un `FLOAT`.
   
2. **Creación de `Effect Styles` reales:**
   Escribiré un pequeño parser nativo en JS ES5 dentro del plugin (`parseShadow`).
   En la fase de sincronización, cuando detectemos que el token es una sombra, además de guardarlo como variable de texto, **crearemos un Effect Style nativo en Figma** para que el diseñador pueda usarlo en cualquier capa.

3. **Consolidación de la página `💎 Foundations`:**
   En lugar de crear múltiples páginas separadas, usaré la única página `💎 Foundations` (creada en `buildStructure`). Dentro de esa misma página, organizaremos todos los tokens en columnas (Frames Verticales). Las sombras tendrán su propio rectángulo visual demostrando el `Effect Style` en vivo.

## User Review Required

> [!IMPORTANT]
> ¿Estás de acuerdo con unificar todas las secciones (Colors, Typography, Shadows, Spacing, Radius) en una única página llamada `💎 Foundations` dentro de Figma (usando columnas o secciones) o prefieres que sigan existiendo páginas separadas por cada categoría? (Te recomiendo unificarla para tener un tablero de Foundations más limpio).

## Verification Plan

- Ejecutar `npx tsx src/scripts/figma-plugin-generator.ts`.
- Cargar el plugin en Figma y correr "Sync Tokens" y "Populate Foundations".
- Verificar que las sombras (ej. Khor Shadow Md) existen como **Effect Styles** listos para usar en Figma.
- Confirmar que ya no hay páginas duplicadas en el panel izquierdo.
