# Changelog — Khor Design System

Todos los cambios notables en este proyecto serán documentados en este archivo.
El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), y este proyecto se adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.2.1] - 2026-03-30
### 100% Token Coverage (Ola 8.0)
#### Added
- **Semantic Root**: Mapeo completo de tokens bajo la jerarquía `Semantic` (Action, Surface, Text, Border, Focus) listos para Tokens Studio.
- **Métricas Faltantes**: Incorporación de Layout, Iconos y todos los tamaños secundarios de tipografía (H3, BodyLg, BodyMd, Small).
#### Fixed
- **Dimension Parser**: Implementación de `resolveDimension` para limpiar las variables CSS rotas en propiedades como `Radius` (ej. extrayendo `6` de `var(--radius-sm, 6px)`).

---

## [3.2.0] - 2026-03-30
### Pro Styles & Components (Ola 7.0)
#### Changed
- **Figma Styles Ecosystem**: Refactorización profunda. El mapa plano anterior fue reemplazado por la arquitectura sólida `paintStyles`, `textStyles` y `effectStyles` para colores, tipografía pixel-perfect y sombras (Drop Shadows).
- **Component Clarification**: Los átomos, moléculas y organismos se exportan estructuralmente a través de la Guía AI (Markdown), ya que el JSON está diseñado estrictamente para Tokens de Diseño.
- **Soporte de Opacidad**: Preparación para que los `paintStyles` soporten opacidad (`opacity: 1`).

---

## [3.1.9] - 2026-03-30
### DTCG Standard Final (Ola 6.7)
#### Changed
- **W3C DTCG Standard**: Refactorización total al formato **Design Token Community Group**. Ahora todos los tokens usan `$value` y `$type` para compatibilidad nativa con plugins de Figma.
- **Hierarchical Structure**: Organización en niveles semánticos (`Primitive` y `Token`), facilitando la navegación de variables en Figma.
- **Unified Engines**: Unificación de los motores de exportación para Variables y Style Dictionary bajo una sola base técnica robusta.

---

## [3.1.8] - 2026-03-30
### Universal Exporters Refactor (Ola 6.6)
#### Changed
- **Figma Variables JSON**: Transición al formato **Official Figma** con `valuesByMode`. Esto permite que el plugin oficial de Figma asigne valores a los modos de forma nativa.
- **Style Dictionary**: Adopción de la especificación **W3C Design Tokens (DTCG)** usando los prefijos `$` (`$value`, `$type`).
- **Figma Styles**: Simplificación a un mapa plano de Llave-Valor para compatibilidad universal con plugins legacy.

---

## [3.1.7] - 2026-03-30
### Figma Final Polish (Ola 6.5)
#### Changed
- **Figma Variables JSON**: Transición a **Array Raíz**. El archivo ahora exporta directamente la colección de variables sin envolturas de metadatos.
- **Variable Hierarchy**: Implementación de nomenclatura jerárquica mediante barras diagonales (`/`). Esto organiza automáticamente los tokens en carpetas dentro de Figma (ej. `Primary/Base`, `H1/Line Height`).
- **Typography Calculations**: Conversión de multiplicadores de `line-height` a valores absolutos en píxeles. Figma Variables ahora recibe el cálculo exacto (ej. 1.2 -> 45.6px).

---

## [3.1.6] - 2026-03-30
### Figma Structure Refinement (Ola 6.4)
#### Changed
- **Figma Variables JSON**: Aplanamiento del objeto de exportación. La propiedad `collections` ahora reside en el primer nivel del JSON para compatibilidad nativa con *Variables Import*.
- **Typography Tokens**: Renombrado de variables de fuente a `typo-family-primary` y `typo-family-secondary` para evitar conflictos de nombres reservados en Figma.

---

## [3.1.5] - 2026-03-30
### Figma Exporter Hotfix (Ola 6.3)
#### Fixed
- **Figma Variables JSON**: Solución al problema de canales RGB nulos. Se implementó `resolveHex` para traducir variables CSS (`var(--khor-*)`) a valores hexadecimales reales compatibles con el motor de importación de Figma.
- **Figma Styles**: Sincronización de estilos legacy con valores estáticos resueltos.

#### Changed
- **Color Conversion**: Función `hexToRgba` más robusta con fallback a negro puro en caso de error de parseo.

---

## [3.1.4] - 2026-03-30
### Refinamiento & IA Guide (Ola 6.2)
#### Added
- **FullWidth Logic**: Soporte real para `fullWidth` en `KButton` inyectando la clase `w-full` de Tailwind v4.
- **A11y System Prompt**: Inyección de 4 reglas imperativas de accesibilidad en el exportador de IA.

#### Improved
- **AI Prompt Order**: Reordenamiento estratégico de la guía IA (Instrucciones primero) para combatir el efecto "Lost in the Middle".
- **Architecture Clarity**: Aclaración en la documentación sobre el uso de componentes K* como única abstracción oficial sobre librerías base (AntD/Radix).

#### Fixed
- **Linter Errors**: Limpieza de variables no utilizadas en `KButton`.

---

## [3.1.3] - 2026-03-30
### Gobernanza Automatizada (Ola 6.1)
#### Added
- **ESLint v9 + Flat Config**: Sistema de linting profesional configurado externamente (`eslint.config.js`).
- **A11y Enforcement**: Reglas de accesibilidad (`jsx-a11y`) activadas para prevenir errores en el DOM.

#### Improved
- **Package Cleanliness**: Remoción de bloques de configuración interna en `package.json`.

---

## [3.1.2] - 2026-03-30
### Gobernanza & Accesibilidad (Ola 6)
#### Added
- **Global Focus Ring**: Anillo de enfoque de alto contraste (`focus-visible`) en todos los elementos interactivos.
- **PR Template**: Estándar mandatorio para contribuciones (Checklist de versión, changelog, a11y).
- **IA Guide Instructions**: Restauración del "Prompt Base" crítico para asegurar la calidad del código generado por IAs.

#### Improved
- **AI-Ready Sync**: Inyección de normativas WCAG (8 Gaps) en la guía auto-generada.
- **AppShell & Changelog**: Actualización visual de la versión y sincronización de historial.

#### Fixed
- Solución de los 8 Gaps detectados en la auditoría de Clase Mundial (Focus Visible, Motion Preference, AI Governance, etc.).

---

## [3.1.1] - 2026-03-30
### Refinement (Ola 5)
#### Added
- Motion tokens: `instant` (80ms).
- Easings asimétricos: `enter` y `exit` optimizados para transiciones de UI.
- Feedback Light (Modo Oscuro): Colores optimizados para mejor contraste en fondos oscuros.
- Semantic Border Tokens: `border-disabled`, `border-strong`.
- Semantic Action Tokens: `action-ghost-hover`, `action-disabled`.
- Soporte para `prefers-reduced-motion` a nivel global en `theme.css`.

#### Fixed
- Destructuring Masivo: Eliminación del 100% de los warnings de React por inyección de props no estándar (e.g., `fullWidth`, `variant`) en el DOM (en progreso).

---

## [3.1.0] - 2026-03-27
### Density & AI (Ola 4)
#### Added
- **Density Tokens**: Sistema de 3 niveles (.khor-compact, root, .khor-comfortable).
- **Playground Pro V2**: Grillas de validación de estados y resúmenes de accesibilidad.
- **AI Dynamic Export**: Generación de documentación dinámica síncrona con el código.
- Escala neutral oscura ampliada (600, 700, 800).

---

## [3.0.0] - 2026-03-27
### World-Class
#### Added
- Arquitectura de tokens semánticos (superficies, bordes y acciones).
- Live Code Playground.
- Soporte global para Dark Mode.
- Primera gran auditoría de accesibilidad.

---

## [2.0.0] - 2026-03-10
### Ant Design Integration
#### Added
- Wrappers para componentes de Ant Design.
- Sistema inicial de tokens CSS.
