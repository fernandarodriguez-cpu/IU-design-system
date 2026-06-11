# Changelog — Khor Design System

Todos los cambios notables en este proyecto serán documentados en este archivo. Khor sigue una metodología de desarrollo por "Olas" (Waves) dentro de fases evolutivas.

## [6.0.0-beta] — 2026-06-11
### 🧹 Ola 23: AI Guide Hardening — Token Purge & Elite Standards
- **KText deprecado en guía IA**: Reemplazadas todas las referencias de `KText` por `KTypography.Text` en el markdown generado por `AIExportPage.tsx`, eliminando recomendaciones del componente deprecado.
- **Tokenización de colores hardcodeados**: Sustitución de 11+ valores hex hardcodeados (`#eee`, `#f5f5f5`, `#ccc`, `#666`, `#333`, `#051758`, gradient purple/pink) por tokens semánticos de Khor (`khorTokens.colors.neutral`, `khorTokens.colors.brand`, `var(--khor-chart-*)`) en playgrounds y previews de `AtomsPage.tsx`, `MoleculesPage.tsx` y `AIExportPage.tsx`.
- **Escala neutral corregida**: Actualización de la paleta neutral (50-900) en el generador de guía IA para coincidir con la escala Slate-Blue de `theme.css`.
- **Verificación de integridad**: Build de producción verificado sin errores.

## [5.3.0-alpha] — 2026-05-18
### 🧹 Ola 21: The Spring Cleaning — Independencia Arquitectónica
- **Eliminación de Bloatware AntD**: Purga de 6 componentes heredados de bajo uso (`KTransfer`, `KTreeSelect`, `KAffix`, `KMentions`, `KWatermark`, `KRate`) reduciendo la superficie del sistema y el peso del bundle.
- **Unificación de Notificaciones**: `KNotification` y `KMessage` eliminados. Todo el feedback del sistema se canaliza ahora exclusivamente a través de `kToast` (Sonner), el estándar de la industria. Reducción de 3 APIs a 1.
- **Consolidación de Tablas**: `KDataGrid` eliminado. `KDataTable` (TanStack Table) es ahora el único componente de datos, con soporte para virtualización, column pinning, expansión de filas y exportación CSV.
- **Fusión de Modales**: `KModalConfirm` integrado como sub-API dentro de `KModal` (`KModal.confirm()`, `KModal.success()`, etc.). Sin archivos duplicados.
- **Renombrado Semántico**: `KDrawer` → `KSheet`, alineado con la nomenclatura estándar de shadcn/ui y la industria moderna.
- **Nuevo Componente**: `KResizable` — Paneles divisibles (split-panes) para interfaces tipo IDE y dashboards densos.
- **Limpieza de Registros**: Actualización de sidebar, índices de exportación, AI Guide, y documentación de organismos para reflejar la nueva arquitectura optimizada.
- **TypeScript & Build**: Actualización de `ignoreDeprecations` a TS 6.0. Build de producción verificado sin errores.
- **Resultado**: Reducción del bundle `OrganismsPage` de 106.59 kB → 100.21 kB (−6%).

## [5.2.0-alpha] — 2026-05-15
### 🌟 Ola 20: Figma MCP Sync & Agentification
- **Agentification**: Inyección de manifiestos `@figma-mcp-migration` en los 89 componentes de KDS, dictando instrucciones precisas a IA y MCP para la sincronización dinámica en Figma utilizando Component Properties V2.
- **Limpieza de Marca**: Eliminación de dependencias textuales heredadas ("AntD", "Radix", "Shadcn") en toda la documentación y comentarios internos, consolidando KDS como un framework semánticamente autónomo. Se centralizó el agradecimiento en `CREDITS.md`.
- **Single Source of Truth**: Eliminación de la copia residual simplificada de botones (`src/imports/button.tsx`) consolidando `KButton` (CVA) como la única fuente real.
- **Multi-Mode Sync**: Actualización profunda del generador de plugin de Figma para inyectar colecciones nativas (Colors, Dimensions, Density) resolviendo `clamp()` variables y alias anidados (`var(--token)`).

## [5.1.6-alpha] — 2026-05-13
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
