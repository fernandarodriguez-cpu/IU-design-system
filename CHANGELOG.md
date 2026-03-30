# Changelog — Khor Design System

Todos los cambios notables en este proyecto serán documentados en este archivo.
El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), y este proyecto se adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
