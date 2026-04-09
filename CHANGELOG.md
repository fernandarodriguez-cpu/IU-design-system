# Changelog — Khor Design System

Todos los cambios notables en este proyecto serán documentados en este archivo. Khor sigue una metodología de desarrollo por "Olas" (Waves) dentro de fases evolutivas.

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
