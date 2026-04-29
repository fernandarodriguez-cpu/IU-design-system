# Changelog — Khor Design System

Todos los cambios notables en este proyecto serán documentados en este archivo. Khor sigue una metodología de desarrollo por "Olas" (Waves) dentro de fases evolutivas.

## [4.4.1] — 2026-04-27
### 💎 Ola 19: Khor Quality Audit (KQA) — "God Mode" Maturity
- **Atomic Refinement**: Actualización de 9 átomos (`KCheckbox`, `KRadio`, `KSwitch`, `KSelect`, `KTag`, `KBadge`, `KAvatar`, `KSlider`, `KProgress`) con soporte total para estados de interacción explícitos.
- **Molecule Upgrade**: Refactorización de 5 moléculas (`KFormField`, `KStatCard`, `KInput.Search`, `KResult`, `KEmptyState`) a Tailwind nativo y tokens semánticos de Layer 2.
- **Organism Overhaul**: Sincronización de 5 organismos complejos (`KDataTable`, `KCardSection`, `KModal`, `KDrawer`, `KTabs`) con el motor de densidad y accesibilidad ARIA avanzada.
- **State-Aware Ecosystem**: Inyección de props `isHovered`, `isFocused`, `isPressed` en todo el sistema para garantizar previsualizaciones perfectas en herramientas de diseño (Figma/Penpot).
- **Metadata V5.0**: Regeneración del manifiesto universal con 116 componentes auditados y listos para sincronización con el plugin.

## [4.4.0] — 2026-04-27
### 🚀 Ola 18: Industry Reference Upgrade & Universal Bridge
- **Elite Pillars**: Implementación de arquitectura de superficies (Layer 2), elevación semántica (0-5) y espaciado optimizado para SaaS.
- **Universal Manifest**: Creación del "Puente Universal" para Plugins (Figma/Penpot) vía exportación de manifiesto dinámico sincronizado.
- **State-Aware Components**: Actualización masiva de `KButton` y `KInput` con props de estado explícitos (`isHovered`, `isPressed`, `isActive`, `isFocused`).
- **Live Theme Sync**: Unificación total del Editor de Temas con la Guía de IA; personalización dinámica de exportaciones según el branding del usuario.
- **A11y Refresh**: Anillo de enfoque global (`focus-ring`) y soporte nativo para `prefers-reduced-motion`.

## [4.3.0] — 2026-04-24
### 🎯 Ola 17: The 100/100 Audit — Technical Perfection
- **Auditoría Claude 100/100**: Cierre total de los 8 gaps técnicos históricos.
- **Semantic Tokens**: Integración completa de la escala interactiva (Hover/Disabled/Action) en el núcleo CSS.
- **Density Engine**: Implementación de contextos dinámicos (`.khor-compact` / `.khor-comfortable`).
- **AI Guide v4.3**: Rediseño del generador de guías con tablas de contraste WCAG y reglas de gobernanza para LLMs.

## [4.0.5] — 2026-04-10
### 🌊 Ola 16: Refinamiento de Feedback e Infraestructura
- **KNotification**: Consolidación de la arquitectura imperativa. Mejora visual con opacidad dinámica del 95% para apilamiento profesional y base sólida blanca.
- **KScrollBar**: Restauración de la navegación global y adición de controles dinámicos en el playground (tamaños, orientación, auto-hide).
- **KSkeleton**: Implementación de animaciones por defecto y soporte multiforme (Círculo, Rectángulo, Líneas) sincronizado con el estado de carga.
- **Tokens v10.4.5**: Expansión del motor de tokens para incluir escalas de Blur (Backdrop & Layer) y alineación técnica con Penpot.

## [v4.0.4] — 2026-04-07
### 🌊 Ola 15: Finalización de Base y Gobernanza
- **Estabilización Final**: Restauración del registro total de organismos (KTabs, KCalendar, KDrawer, etc.).
- **Limpieza de Deuda**: Eliminación total de rastros de Storybook (archivos, carpetas y dependencias) para dar paso a la documentación nativa "Playground Pro".
- **IA-Ready**: Reparación del exportador en `AIExportPage.tsx` para incluir el contexto completo de organismos en las guías generadas para IAs.
- **Preparación de ADV01**: Localización de la carpeta de plugin para Figma y preparación de la arquitectura de metadatos.

## [v4.0.3] — 2026-04-02
### 🌊 Ola 14: Theme Logic & Contrast AAA
- **Accesibilidad**: Auditoría de contraste WCAG AAA en todos los tokens semánticos.
- **Error Handling**: Implementación de `ErrorPage.tsx` y Error Boundary global en el enrutamiento.
- **Performance**: Optimización de `KDataTable` con soporte para virtualización (10,000+ filas).

## [v4.0.0] — 2026-03-24
### 🌊 Ola 8-13: Core Parity & Layout Governance
- **Paridad AntD**: Alcance del 100% de paridad funcional con Ant Design v5 en átomos y moléculas.
- **Layout Engine**: Creación de `KRow`, `KCol` y `KFlex` para gobernanza responsiva.
- **Patterns Registry**: Migración a un sistema modular de registro de patrones (SaaS Dashboards, Login Templates, Wizards).

## [v3.0.0] — 2026-03-10
### 🌊 Ola 1-7: Foundation & Token Engine
- **Atomic Design**: Implementación de la arquitectura base: Átomos, Moléculas, Organismos.
- **DSG Engine**: Creación del motor de Design Tokens basado en variables CSS y Tailwind v4.
- **Playground Pro**: Primeras versiones del sistema de documentación interactiva "Zero Storybook".

---
*Este sistema de diseño es propiedad de Khor. Todos los derechos reservados.*
