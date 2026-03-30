# Changelog — Khor Design System

Todos los cambios notables en este proyecto serán documentados en este archivo.
El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), y este proyecto se adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
