/**
 * ChangelogPage — Timeline interactivo del historial de versiones
 * del Khor Design System.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Plus, RefreshCw, Wrench, Trash2, ArrowRight,
  Tag, GitBranch, Calendar, Package, Zap, Star,
  ChevronDown, ChevronRight,
} from 'lucide-react';
import { KButton, KBadge, KText } from '../components/design-system/atoms/index';
import { khorTokens } from '../theme/khor-theme';

const t = khorTokens;

type ChangeType = 'added' | 'changed' | 'fixed' | 'removed' | 'breaking';

interface ChangeItem {
  type: ChangeType;
  component?: string;
  componentPath?: string;
  description: string;
}

interface VersionEntry {
  version: string;
  date: string;
  codename?: string;
  summary: string;
  highlights?: string[];
  changes: ChangeItem[];
  stats?: { added: number; changed: number; fixed: number };
}

const changeTypeConfig: Record<ChangeType, { color: string; bg: string; icon: React.ReactNode; label: string }> = {
  added: { color: t.colors.feedback.success, bg: t.colors.feedback.successLight, icon: <Plus size={12} />, label: 'Nuevo' },
  changed: { color: '#1976D2', bg: '#E3F2FD', icon: <RefreshCw size={12} />, label: 'Cambio' },
  fixed: { color: t.colors.brand.accent, bg: t.colors.feedback.warningLight, icon: <Wrench size={12} />, label: 'Fix' },
  removed: { color: t.colors.feedback.error, bg: t.colors.feedback.errorLight, icon: <Trash2 size={12} />, label: 'Removido' },
  breaking: { color: '#9C27B0', bg: '#F3E5F5', icon: <Zap size={12} />, label: 'Breaking' },
};

const changelog: VersionEntry[] = [
  {
    version: '5.3.0-alpha',
    date: '18 de Mayo, 2026',
    codename: 'The Spring Cleaning',
    summary: 'Purga arquitectónica: eliminación de bloatware AntD, unificación de notificaciones en KToast, consolidación de tablas en KDataTable y renombrado semántico.',
    highlights: [
      'Eliminación de 6 componentes heredados de bajo uso (KTransfer, KTreeSelect, KAffix, KMentions, KWatermark, KRate)',
      'Unificación de 3 APIs de notificación (KNotification, KMessage, KToast) en una sola: kToast',
      'KDataGrid eliminado — KDataTable es el único componente de datos',
      'KModalConfirm integrado como sub-API de KModal',
      'Nuevo componente KResizable para paneles divisibles',
    ],
    changes: [
      { type: 'removed', description: 'Eliminación de KTransfer, KTreeSelect, KAffix, KMentions, KWatermark y KRate — componentes heredados de AntD de bajo uso en SaaS moderno.' },
      { type: 'removed', component: 'KNotification', description: 'KNotification y KMessage eliminados. Toda la funcionalidad unificada en kToast (Sonner).' },
      { type: 'removed', component: 'KDataGrid', description: 'KDataGrid eliminado. KDataTable (TanStack Table) es ahora el único componente de datos.' },
      { type: 'changed', component: 'KModal', componentPath: '/organisms/modal', description: 'KModalConfirm integrado como sub-API: KModal.confirm(), KModal.success(), KModal.error(), KModal.warning(), KModal.info().' },
      { type: 'changed', component: 'KSheet', componentPath: '/organisms/sheet', description: 'KDrawer renombrado a KSheet, alineado con la nomenclatura estándar de la industria.' },
      { type: 'added', component: 'KResizable', componentPath: '/organisms/resizable', description: 'Nuevo componente de paneles divisibles (split-panes) para interfaces tipo IDE y dashboards densos.' },
      { type: 'changed', description: 'Actualización del AI Guide: todas las referencias a componentes eliminados actualizadas a sus reemplazos modernos.' },
      { type: 'fixed', description: 'TypeScript ignoreDeprecations actualizado a 6.0 para compatibilidad con TS 7.x.' },
    ],
    stats: { added: 1, changed: 4, fixed: 1 },
  },
  {
    version: '5.2.0-alpha',
    date: '15 de Mayo, 2026',
    codename: 'Agentification & Multi-Mode',
    summary: 'Sincronización multi-modo en Figma y agentificación de 89 componentes con limpieza de marca.',
    changes: [
      { type: 'added', component: 'Figma Sync', description: 'Resolución profunda de alias y evaluación de clamps para anchos responsivos (Desktop XL incluido).' },
      { type: 'added', component: 'Figma Sync', description: 'Soporte de colecciones múltiples: Khor v6.0 Colors, Dimensions y Density en Figma.' },
      { type: 'changed', component: 'KButton', description: 'Eliminación de versión redundante simplificada; KButton unificado bajo CVA como única fuente de verdad.' },
      { type: 'added', component: 'KDS Core', description: 'Inyección de manifiesto @figma-mcp-migration en 89 componentes para guiar su migración automática hacia Figma vía IA.' },
      { type: 'changed', component: 'Docs', description: 'Eliminación de rastros textuales de frameworks legacy (Radix, AntD) para asentar la identidad autónoma de KDS, con nuevo CREDITS.md oficial.' },
    ],
    stats: { added: 3, changed: 2, fixed: 0 },
  },
  {
    version: '5.1.6-alpha',
    date: '13 de Mayo, 2026',
    codename: 'The Clean Canvas',
    summary: 'Refactorización total del plugin de Figma para una experiencia de sincronización simplificada y coherente con v5.',
    changes: [
      { type: 'changed', component: 'Figma Plugin', description: 'Nueva interfaz minimalista centrada en la importación de manifiestos JSON para evitar restricciones de API REST.' },
      { type: 'changed', component: 'Sync Engine', description: 'Alineación de la estructura de nombres de variables (Khor/Category/Token) con el esquema oficial de KDS v5.' },
      { type: 'fixed', component: 'Figma Plugin', description: 'Corrección de fallos en el renderizado de la UI del plugin y limpieza de código legado de versiones anteriores.' },
    ],
    stats: { added: 0, changed: 2, fixed: 1 },
  },
  {
    version: '5.1.5-alpha',
    date: '13 de Mayo, 2026',
    codename: 'The Bridge Builder',
    summary: 'Implementación del "Manifest Workflow" para democratizar la sincronización de Figma en todos los planes.',
    changes: [
      { type: 'added', component: 'Sync Engine', description: 'Generación automática de un archivo "khor-tokens-manifest.json" para importación offline.' },
      { type: 'added', component: 'Figma Plugin', description: 'Nueva capacidad de "Import Manifest" que permite crear y actualizar variables sin necesidad de la API REST Enterprise.' },
      { type: 'changed', component: 'Infrastructure', description: 'Reconstrucción del plugin con soporte nativo para el nuevo motor de síntesis de variables.' },
    ],
    stats: { added: 2, changed: 1, fixed: 0 },
  },
  {
    version: '5.1.4-alpha',
    date: '13 de Mayo, 2026',
    codename: 'The Secure Sync',
    summary: 'Habilitación de carga nativa de variables de entorno para sincronización de Figma.',
    changes: [
      { type: 'added', component: 'Sync Engine', description: 'Uso del flag --env-file para cargar automáticamente el PAT de Figma desde el archivo .env sin dependencias externas.' },
      { type: 'fixed', component: 'Security', description: 'Añadida validación de existencia de tokens antes de iniciar procesos de red, evitando fallos silenciosos.' },
    ],
    stats: { added: 1, changed: 1, fixed: 0 },
  },
  {
    version: '5.1.3-alpha',
    date: '13 de Mayo, 2026',
    codename: 'The Ghost in the Script',
    summary: 'Parche de seguridad crítico y refuerzo de infraestructura de repositorio.',
    changes: [
      { type: 'fixed', component: 'Security', description: 'Eliminación del Figma Personal Access Token (PAT) del código fuente y migración a variables de entorno (process.env).' },
      { type: 'added', component: 'Infrastructure', description: 'Creación de archivo .gitignore estándar para prevenir filtraciones de secretos y archivos de sistema en el futuro.' },
      { type: 'added', component: 'Scripts', description: 'Añadido script "figma-sync" al package.json para facilitar la ejecución segura del motor de sincronización.' },
    ],
    stats: { added: 2, changed: 0, fixed: 1 },
  },
  {
    version: '5.1.2-alpha',
    date: '13 de Mayo, 2026',
    codename: 'The Visual Purifier',
    summary: 'Saneamiento completo de variantes tipográficas en páginas de showcase y refuerzo de gobernanza.',
    changes: [
      { type: 'fixed', component: 'InspirationPage', description: 'Corrección de múltiples instancias de variantes obsoletas (body-sm) reemplazándolas por "small" para mantener la integridad visual.' },
      { type: 'changed', component: 'Governance', description: 'Validación de cumplimiento de .cursorrules en componentes de alto impacto (Bento Grids y Trial Bars).' },
    ],
    stats: { added: 0, changed: 1, fixed: 1 },
  },
  {
    version: '5.1.1-alpha',
    date: '12 de Mayo, 2026',
    codename: 'The String Escaper',
    summary: 'Hotfix para errores de formato de fecha en visualizaciones de larga escala.',
    changes: [
      { type: 'fixed', component: 'KGantt Engine', description: 'Escape de literales en cadenas de formato (Semana, Era) para cumplir con el estándar Unicode de date-fns.' },
      { type: 'changed', component: 'Governance', description: 'Actualización de .cursorrules para incluir la obligatoriedad de escapar texto literal en formatos de fecha.' },
    ],
    stats: { added: 0, changed: 1, fixed: 1 },
  },
  {
    version: '5.1.0-alpha',
    date: '12 de Mayo, 2026',
    codename: 'The Inventory Synchronizer',
    summary: 'Sincronización completa de metadatos y contadores de componentes en el sidebar.',
    changes: [
      { type: 'changed', component: 'Metadata', description: 'Actualización de khor-counts.json para reflejar con precisión el inventario actual de Átomos (30), Moléculas (31) y Organismos (24).' },
      { type: 'fixed', component: 'AppShell', description: 'Corrección de badges numéricos en el sidebar para evitar discrepancias visuales con el inventario real.' },
    ],
    stats: { added: 0, changed: 2, fixed: 0 },
  },
  {
    version: '5.0.9-alpha',
    date: '12 de Mayo, 2026',
    codename: 'The Structural Polishing',
    summary: 'Refactorización de la arquitectura de navegación y mejora de la experiencia de usuario en KEditor.',
    changes: [
      { type: 'changed', component: 'AppShell', description: 'Reubicación de KGantt Timeline y KEditor Pro a la sección de Organismos, alineándolos con su peso arquitectónico.' },
      { type: 'fixed', component: 'KEditor Pro', description: 'Corrección del botón de Enlace; ahora solo solicita la URL al ser clickeado, eliminando prompts intrusivos en render.' },
      { type: 'changed', component: 'Routes', description: 'Actualización de rutas a /organisms/gantt y /organisms/editor para mantener la consistencia semántica.' },
    ],
    stats: { added: 0, changed: 2, fixed: 1 },
  },
  {
    version: '5.0.8-alpha',
    date: '12 de Mayo, 2026',
    codename: 'The AI Architect',
    summary: 'Implementación de reglas de gobernanza para IA y saneamiento completo de variantes tipográficas.',
    changes: [
      { type: 'added', component: 'Governance', description: 'Actualización de .cursorrules con reglas estrictas sobre variantes de KText y tokens de date-fns para prevenir errores recurrentes.' },
      { type: 'fixed', component: 'KGantt', description: 'Eliminación final de variantes body-sm en el componente, asegurando compatibilidad total con el esquema de diseño.' },
    ],
    stats: { added: 1, changed: 0, fixed: 1 },
  },
  {
    version: '5.0.7-alpha',
    date: '12 de Mayo, 2026',
    codename: 'The Fluid Navigator',
    summary: 'Mejora de la experiencia de navegación en KGantt mediante gestos y corrección de motor de fechas.',
    changes: [
      { type: 'added', component: 'KGantt UX', description: 'Soporte para zoom fluido mediante la rueda del ratón (Ctrl + Scroll) para cambios rápidos de escala.' },
      { type: 'fixed', component: 'KGantt Engine', description: 'Corrección de RangeError causado por el uso de tokens Unicode obsoletos (DD/YYYY) en date-fns.' },
    ],
    stats: { added: 1, changed: 0, fixed: 1 },
  },
  {
    version: '5.0.6-alpha',
    date: '12 de Mayo, 2026',
    codename: 'The Stability Patch',
    summary: 'Hotfix crítico para resolver errores de importación y consistencia de variantes en moléculas core.',
    changes: [
      { type: 'fixed', component: 'KTrialBar', description: 'Corrección de ruta de importación de KTypography/KText que causaba fallo en el análisis de Vite.' },
      { type: 'fixed', component: 'System', description: 'Saneamiento de variantes de KText (body-sm -> small) para cumplir con el esquema oficial de tipos.' },
    ],
    stats: { added: 0, changed: 0, fixed: 2 },
  },
  {
    version: '5.0.5-alpha',
    date: '12 de Mayo, 2026',
    codename: 'The Content Architect',
    summary: 'Lanzamiento del organismo KEditor Pro, un editor de texto enriquecido con interfaz minimalista y potente.',
    changes: [
      { type: 'added', component: 'KEditor Pro', description: 'Nuevo organismo de edición Rich Text con soporte para formato avanzado, modo pantalla completa y conteo de palabras.' },
      { type: 'fixed', component: 'GanttShowcase', description: 'Corrección de errores de tipado en variantes de botones, textos y tipos de datos del KGantt.' },
      { type: 'added', component: 'Docs', description: 'Nueva página de Showcase para KEditor Pro con previsualización en vivo.' },
    ],
    stats: { added: 2, changed: 0, fixed: 1 },
  },
  {
    version: '5.0.4-alpha',
    date: '12 de Mayo, 2026',
    codename: 'Interactive Timeline Mastery',
    summary: 'Evolución interactiva del KGantt con soporte para edición directa y visualización de flujos de trabajo.',
    changes: [
      { type: 'added', component: 'KGantt Interactive', description: 'Soporte para arrastrar (Drag) y redimensionar (Resize) tareas directamente en el canvas.' },
      { type: 'added', component: 'KGantt Visuals', description: 'Sistema de dependencias visuales mediante flechas SVG dinámicas entre tareas.' },
      { type: 'fixed', component: 'Changelog', description: 'Corrección de errores de tipado y alineación de esquemas en el historial de versiones.' },
      { type: 'changed', component: 'Gantt Showcase', description: 'Actualización del panel de control con modo edición/lectura y toggles de visualización avanzada.' },
    ],
    stats: { added: 2, changed: 1, fixed: 1 },
  },
  {
    version: '5.0.3-alpha',
    date: '12 de Mayo, 2026',
    codename: 'Enterprise Timeline & Agenda',
    summary: 'Lanzamiento del organismo KGantt, un motor de línea de tiempo ultra-configurable para visualización de recursos y planificación compleja.',
    changes: [
      { type: 'added', component: 'KGantt', description: 'Nuevo organismo KGantt con soporte para zoom dinámico (minutos a años).' },
      { type: 'added', component: 'KGantt Config', description: 'Intervalos de tiempo configurables (5, 10, 15, 30, 60 min).' },
      { type: 'added', component: 'Docs', description: 'Nueva página de Showcase para KGantt con panel de configuración en vivo.' },
      { type: 'fixed', component: 'System', description: 'Sincronización de versiones en todos los descargables y meta-archivos.' },
    ],
    stats: { added: 3, changed: 0, fixed: 1 },
  },
  {
    version: '5.0.2-alpha',
    date: '12 de Mayo, 2026',
    codename: 'Beyond UI & AI Governance',
    summary: 'Integración de patrones de alta fidelidad inspirados en Beyond UI y formalización de reglas de gobernanza para IA.',
    changes: [
      { type: 'added', component: 'KBentoGrid', description: 'Nuevo átomo KBentoGrid y KBentoItem para layouts de marketing tipo bento.' },
      { type: 'added', component: 'KTrialBar', description: 'Nueva molécula KTrialBar para gestión de monetización y upsell en SaaS.' },
      { type: 'added', component: 'Governance', description: 'Implementación de .cursorrules en la raíz para gobernanza estricta de agentes de IA.' },
      { type: 'added', component: 'Theming', description: 'Nuevos "Industry Presets" (AI, Fintech, Healthcare) en el panel de Theming.' },
      { type: 'added', component: 'Visual Tokens', description: 'Tokens y utilidades de Glassmorphism (.khor-glass) integrados en el core.' },
      { type: 'added', component: 'Docs', description: 'Nueva página de "Inspiración Elite" para mostrar patrones avanzados.' },
    ],
    stats: { added: 6, changed: 0, fixed: 0 },
  },
  {
    version: '5.0.1-alpha',
    date: '12 de mayo de 2026',
    codename: 'Shadow & Layout Precision',
    summary: 'Evolución masiva de la fidelidad visual. Implementación de sombras multi-capa con desglose técnico de color/opacidad y sistema de grillas responsivas certificado para Sm, Md, Lg y Xl.',
    highlights: [
      'Multi-Layer Shadows: Desglose técnico de sombras (SM-2XL e Inner) con control preciso de offset, blur, spread, color y opacidad.',
      'Layout Grid System: Documentación oficial de grillas de 12 columnas con especificación de gutter y offset para todos los breakpoints.',
      'Figma-SaaS Parity: Sincronización total entre el generador de plugin de Figma y la documentación del SaaS.',
      'Accessibility Audit: Verificación de contraste en sombras y visibilidad de grillas.'
    ],
    changes: [
      { type: 'added', component: 'Shadow Tokens', description: 'Nuevos tokens Shadow 2XL y Shadow Inner con soporte multi-capa.' },
      { type: 'added', component: 'Layout Grid', description: 'Especificación técnica de columnas, gutters y márgenes por breakpoint.' },
      { type: 'changed', component: 'Tokens Page', description: 'Nueva visualización técnica del desglose de capas de sombra y matriz de layout.' },
      { type: 'changed', component: 'Figma Plugin', description: 'Actualización del motor de población de Foundations para incluir el sistema de Layout.' },
    ],
    stats: { added: 4, changed: 2, fixed: 0 },
  },
  {
    version: '5.0.0-alpha',
    date: '28 de abril de 2026',
    codename: 'The World-Class Foundation',
    summary: 'Reinvención total de la arquitectura de tokens para cumplir con el estándar W3C Design Tokens (DTCG). Implementación de escalas matemáticas puras para tipografía fluida, espaciado y radios, junto con una arquitectura de 3 capas (Primitive, Semantic, Component).',
    highlights: [
      'W3C Design Tokens: Adopción oficial del estándar DTCG ($value, $type) para interoperabilidad total.',
      'Fluid Typography: Escala tipográfica responsiva basada en clamp() para una legibilidad perfecta en cualquier pantalla.',
      'KDataGrid (Enterprise): Implementación de grilla de alto rendimiento con virtualización, pinning y filtrado avanzado.',
      'Command Palette: Evolución de KCommandBar hacia una paleta de comandos con acciones y atajos de teclado.',
      'KFormWizard: Nuevo organismo para orquestación de flujos multi-paso complejos.',
      'Visual Regression Testing: Integración de Playwright para garantizar la estabilidad visual automática.',
      'AI Intent Architecture: Nueva capa semántica de "Intenciones" para guiar el razonamiento de la IA.'
    ],
    changes: [
      { type: 'added', component: 'KDataGrid', description: 'Grilla empresarial con virtualización (100k+ filas), column pinning y multi-sorting.' },
      { type: 'added', component: 'KFormWizard', description: 'Orquestador de formularios multi-paso con navegación protegida.' },
      { type: 'changed', component: 'KCommandBar', description: 'Evolución a Command Palette con soporte para ejecución de acciones (#action:).' },
      { type: 'added', component: 'Playwright', description: 'Suite de pruebas de regresión visual automatizada.' },
      { type: 'added', component: 'AI Guide', description: 'Introducción del Semantic Intent Engine para mapeo de intenciones.' },
    ],
    stats: { added: 15, changed: 5, fixed: 0 },
  },
  {
    version: '4.4.0',
    date: '27 de abril de 2026',
    codename: 'Industry Reference Upgrade',
    summary: 'Evolución del sistema hacia estándares de arquitectura de élite (Primer/Material You). Introducción de escalas semánticas de superficie, elevación y espaciado, junto con patrones de página estandarizados.',
    highlights: [
      'Interactive Surface Layer: Tokens compartidos para hover, pressed y selected en todo el sistema.',
      'Semantic Elevation: Nueva escala de niveles 0-5 para jerarquía de profundidad coherente.',
      'Full Neutral Scale: Inyección de neutros 600, 700 y 800 para evitar hardcoding de grises.',
      'Semantic Spacing: Alias de layout y componentes para decisiones de espaciado basadas en intención.',
      'A11y Excellence: Focus rings configurables y soporte nativo para prefers-contrast: more.',
      'Page-Level Patterns: Documentación de estructuras para Empty, Error y Loading states.'
    ],
    changes: [
      { type: 'added', component: 'Tokens', description: 'Nuevas capas semánticas de superficie, elevación y espaciado.' },
      { type: 'added', component: 'A11y', description: 'Soporte para modo de alto contraste y anillos de foco configurables.' },
      { type: 'added', component: 'AI Guide', description: 'Guías de patrones de página (Empty/Error/Loading).' },
    ],
    stats: { added: 12, changed: 4, fixed: 0 },
  },
  {
    version: '4.3.1',
    date: '24 de abril de 2026',
    codename: 'The Absolute 100',
    summary: 'Cierre definitivo de la auditoría v4.3.0. Implementación de easings asimétricos (enter/exit) y consolidación de la gobernanza directamente en la guía de IA para eliminar dependencias de archivos externos.',
    highlights: [
      'Motion Perfection: Registro de --khor-easing-enter y --khor-easing-exit para transiciones naturales.',
      'Embedded Governance: Integración de las reglas de CONTRIBUTING.md en el motor de exportación SaaS.',
      'Audit Parity: Alcanzado el score de 100/100 tras la remediación de gaps de documentación estructural.'
    ],
    changes: [
      { type: 'added', component: 'Easings', description: 'Nuevos tokens de easing asimétricos para transiciones de entrada y salida.' },
      { type: 'changed', component: 'AI Guide', description: 'Embebed de reglas de gobernanza para autonomía total de la IA.' },
    ],
    stats: { added: 1, changed: 1, fixed: 0 },
  },
  {
    version: '4.3.0',
    date: '24 de abril de 2026',
    codename: 'The 100/100 Audit',
    summary: 'Versión definitiva de paridad técnica y documental. Cierre total de los 6 gaps de auditoría v4.2.0. Implementación del sistema de densidad dinámico, motion tokens, accesibilidad global (Reduced Motion) y tablas de contraste certificadas expandidas.',
    highlights: [
      'Density Excellence: Implementación de bloques CSS completos para .khor-compact y .khor-comfortable con paridad en componentes core.',
      'Accessibility Mastery: Inyección de @media prefers-reduced-motion y guía de contraste numérico completa (12+ pares).',
      'Motion Registry: Registro oficial de tokens de duración y easing en CSS y JS para animaciones predecibles.',
      'Semantic Layer 2 Sync: Sincronización total de tokens de hover, estados deshabilitados y feedback en Dark Mode.',
      'Governance: Publicación de CONTRIBUTING.md y checklist de calidad para el crecimiento del sistema.'
    ],
    changes: [
      { type: 'added', component: 'Reduced Motion', description: 'Soporte global para preferencias de movimiento reducido en todo el sistema.' },
      { type: 'changed', component: 'KButton / KInput', description: 'Refactorización total para consumir tokens de densidad y semántica Layer 2.' },
      { type: 'added', component: 'Motion Tokens', description: 'Tokens CSS oficiales: --khor-duration-* y --khor-easing-*.' },
      { type: 'changed', component: 'AI Guide', description: 'Expansión masiva del generador SaaS con especificaciones técnicas completas.' },
    ],
    stats: { added: 2, changed: 2, fixed: 0 },
  },
  {
    version: '4.2.0',
    date: '23 de abril de 2026',
    codename: 'Audit Recovery',
    summary: 'Restauración crítica de la integridad técnica tras la regresión v4.1.1. Recuperación de la Capa Semántica 2 de tokens, implementación del Sistema de Densidad dinámico y blindaje de accesibilidad WCAG 2.1 para alcanzar el score de 100/100.',
    highlights: [
      'Semantic Tier 2: Restauración de tokens para Surface, Action, Border y Typography, permitiendo temas dinámicos reales.',
      'Density System: Implementación de contextos .khor-compact y .khor-comfortable para adaptabilidad de interfaz.',
      'Accessibility Shield: Soporte global para prefers-reduced-motion y nueva tabla de contraste WCAG certificada.',
      'AI Documentation Mastery: El motor de exportación ahora genera guías con paridad total de tokens y guías A11y avanzadas.',
      'Contributing Standard: Creación de CONTRIBUTING.md para estandarizar el crecimiento del sistema.'
    ],
    changes: [
      { type: 'added', component: 'Density System', description: 'Sistema de clases CSS para control de espaciado y alturas basado en el contexto.' },
      { type: 'changed', component: 'theme.css', description: 'Restauración de 40+ tokens semánticos de segunda capa.' },
      { type: 'added', component: 'WCAG Contrast Table', description: 'Visualización de pares de colores certificados en la página de Tokens.' },
      { type: 'changed', component: 'AIExportPage', description: 'Sincronización del generador de Markdown con la arquitectura v4.2.0.' },
      { type: 'added', description: 'Guía de contribución oficial (CONTRIBUTING.md) añadida al repositorio.' },
    ],
    stats: { added: 3, changed: 2, fixed: 0 },
  },
  {
    version: '4.1.1',
    date: '20 de abril de 2026',
    codename: 'Elite Refinement',
    summary: 'Fase de refinamiento final para la arquitectura SaaS. Integración de paletas de datos secuenciales, estados de validación semánticos avanzados y el nuevo sistema de iconografía centralizado basado en Lucide.',
    highlights: [
      'DataViz Mastery: Implementación de la paleta Chart Elite de 12 colores optimizada para Recharts.',
      'Semantic Form States: Tokens específicos para Success, Error y Warning con paridad de branding.',
      'Iconography System: Creación del átomo KIcon y el Explorador de Iconos para estandarizar el uso de Lucide.',
      'AI Export Audit: Sincronización del motor de exportación con la taxonomía v4.1.1.'
    ],
    changes: [
      { type: 'added', component: 'KIcon', description: 'Wrapper atómico oficial para lucide-react con escala de tamaños tokenizada (XS-2XL).' },
      { type: 'added', component: 'IconExplorerPage', description: 'Nueva herramienta interna para búsqueda y visualización de 1,400+ iconos del sistema.' },
      { type: 'changed', component: 'Chart Palette', description: 'Expansión de la paleta a 12 colores con nombres semánticos (Primary, Secondary, Accent, etc.).' },
      { type: 'added', component: 'Form Tokens', description: 'Tokens semánticos de validación: --khor-form-error-bg, border, y text.' },
    ],
    stats: { added: 3, changed: 1, fixed: 0 },
  },
  {
    version: '4.1.0',
    date: '10 de abril de 2026',
    codename: 'Elite SaaS Architecture',
    summary: 'Evolución inicial hacia una arquitectura Enterprise SaaS. Introducción de tokens de Layout (Breakpoints), escalas de Z-Index y Motion Easings avanzados.',
    highlights: [
      'Elite SaaS Architect: Introducción de Layout Breakpoints (sm-2xl) para interfaces responsivas.',
      'Z-Index Layering: Establecimiento de una escala rigurosa de 7 capas.',
      'Motion Mastery: Curvas de aceleración estandarizadas (Emphasized, Decelerate).',
      'Page Recipes: Blueprints de alta fidelidad (KAppShell, KCRUDPage, KDashboardGrid) integrados en AI Guide.'
    ],
    changes: [
      { type: 'added', component: 'Layout Tokens', description: 'Nuevos tokens responsivos (--khor-breakpoint-*) y dimensiones de container/sidebar.' },
      { type: 'added', component: 'Z-Index Scale', description: 'Sistema de capas unificado (--khor-z-*) para dropdowns y modales.' },
      { type: 'added', component: 'Motion Tokens', description: 'Escala de duraciones y curvas de easing bezier personalizadas.' },
      { type: 'changed', component: 'AIExportPage', description: 'Inyección de Page Recipes y sincronización de versión v5.0.0-alpha.' },
    ],
    stats: { added: 3, changed: 1, fixed: 0 },
  },
  {
    version: '4.0.4',
    date: '7 de abril de 2026',
    codename: 'Core Mastery & IA-Ready',
    summary: 'Estabilización final de la base del sistema. Restauración total de organismos, optimización del exportador de IA y limpieza absoluta de Storybook para dar paso a la Phase 6 (ADV01).',
    highlights: [
      'Restauración 100%: Todos los organismos (KTabs, KCalendar, KDrawer, etc.) están plenamente operativos.',
      'Zero Deuda Técnica: Remoción completa de Storybook del bundle y la estructura de archivos.',
      'IA Guide Mastery: El exportador de IA ahora incluye contexto real de Organismos para mejores prompts.',
      'Roadmap Activado: Inicio de la arquitectura para el plugin de Figma en src/app/components/figma.'
    ],
    changes: [
      { type: 'fixed', component: 'Organisms', description: 'Restauración del registro maestro y solución de errores 404 en componentes complejos.' },
      { type: 'removed', description: 'Eliminación masiva de archivos .stories.tsx y dependencias de Storybook.' },
      { type: 'changed', component: 'AIExportPage', description: 'Versión v4.0.4 y restauración de la importación dinámica de organismos.' },
      { type: 'changed', component: 'HomePage', description: 'Actualización visual del Dashboard con indicadores de éxito de la Ola 15.' }
    ],
    stats: { added: 0, changed: 2, fixed: 2 },
  },
  {
    version: '4.0.3',
    date: '7 de abril de 2026',
    codename: 'Production & Governance',
    summary: 'Culminación de las Olas 13, 14 y 15. Establecimiento de gobernanza AAA para contraste y layout responsivo, y despliegue del ecosistema local de exportación orientado a agentes de IA.',
    highlights: [
      'Motor de alto contraste (.high-contrast) inyectado nativamente con detección automática de prefers-color-scheme desde OS.',
      'Accessibility Core AAA: Focus rings asimétricos globales que escalan su grosor en modos de contraste alto, logrando paridad con normativas gubernamentales.',
      'Gobernanza Responsiva: Refactorizado el sistema de celdas (KRow/KCol/KFlex) eliminando configuraciones manuales.',
      'Ecosistema AI Extendido: JSZip export engine ahora compila el archivo "ai_system_prompt.txt" listo para inyectarse a un LLM.',
      'SaaS Patterns fluidos: SaaSWizardPattern reconstruido para mobile-first.'
    ],
    changes: [
      { type: 'added', component: 'JSZip Exporter', componentPath: '/', description: 'Expansión del algoritmo de descarga para compilar paramétricamente "ai_system_prompt.txt" y encapsular todo el design system.' },
      { type: 'changed', component: 'theme.css', componentPath: '/theming', description: 'Nueva capa de infraestructura CSS para alto contraste con mutación automática de variables (--khor-neutral-50 a #000000).' },
      { type: 'changed', component: 'KButton', componentPath: '/atoms/button', description: 'Remoción de la dependencia a "ring" de Tailwind para adherirse al Outline global dinámico estipulado para estándares WCAG.' },
      { type: 'changed', component: 'KBadge', componentPath: '/atoms/badge', description: 'Token text reemplazado de neutral-700 a dynamic foreground para lecturas impecables en contextos invertidos o polarizados.' },
      { type: 'added', component: 'SaaSWizardPattern', componentPath: '/patterns/saas-wizard', description: 'Arquitectura responsiva estricta añadida usando las primitivas KRow y KCol auditadas.' },
      { type: 'breaking', description: 'Tokens visuales de foco eliminados del DOM de forma aislada, gobernanza transferida a theme.css central.' }
    ],
    stats: { added: 2, changed: 3, fixed: 1 },
  },
  {
    version: '4.0.2',
    date: '1 de abril de 2026',
    codename: 'Recipes',
    summary: 'Migración completa de templates legacy (TPL:) al nuevo sistema modular de SaaS Recipes de alta fidelidad. Resolución del error crítico de KDataTable. Exportación Markdown AI-ready en Theming en Vivo. Unificación del sidebar y eliminación de deuda técnica.',
    highlights: [
      '3 nuevas SaaS Recipes de producción: Login Profesional, Gestión CRUD y Onboarding Multi-Paso.',
      'Fix crítico: "Columns require an id" — columnas KDataTable ahora usan id + accessorKey (TanStack standard).',
      'Exportación .md para AI/LLMs en Theming en Vivo con especificación completa de tokens, variables CSS y guías.',
      'Eliminación total de templates legacy (TPL:) del sidebar, rutas y código fuente.',
      'Fix de colapso de paneles en Theming en Vivo (flexShrink).',
      'Registry unificado con 11 patrones SaaS de alta fidelidad.',
    ],
    changes: [
      { type: 'added', component: 'SaaSLoginPattern', componentPath: '/patterns/saas-login', description: 'Nuevo recipe de login profesional SaaS con KLoginForm, branding de marca y diseño premium con gradientes sutiles.' },
      { type: 'added', component: 'SaaSCRUDTablePattern', componentPath: '/patterns/saas-crud', description: 'Nuevo recipe CRUD con KDataTable, KUserCell, KSparklineCell, KBreadcrumb y panel de estadísticas. Todas las columnas con id explícito (fix TanStack).' },
      { type: 'added', component: 'SaaSWizardPattern', componentPath: '/patterns/saas-wizard', description: 'Nuevo recipe de onboarding multi-paso con KSteps, validación de formularios, selección de planes y pantalla de confirmación.' },
      { type: 'fixed', component: 'KDataTable', componentPath: '/organisms/data-table', description: 'Resolución del error "Columns require an id when using a non-string header" — todas las columnas ahora incluyen id explícito según estándar TanStack Table.' },
      { type: 'changed', component: 'ThemingPage', componentPath: '/theming', description: 'Nueva exportación Markdown AI-ready con especificación completa: colores, tipografía, sombras, radii, espaciado, guía para LLMs y ejemplo CSS.' },
      { type: 'fixed', component: 'ThemingPage', componentPath: '/theming', description: 'Corrección del colapso de paneles laterales al expandir secciones (flexShrink: 0 en SectionCard).' },
      { type: 'changed', component: 'AppShell', componentPath: '/', description: 'Eliminación de 4 entradas hardcoded TPL: del sidebar. Navegación ahora 100% dinámica desde el registry de patrones.' },
      { type: 'removed', description: 'TemplatesPage.tsx eliminado y ruta /templates/:id removida de routes.ts.' },
      { type: 'changed', component: 'patterns/index', componentPath: '/patterns', description: 'Registry unificado con 11 patrones: 2 Dashboard, 5 SaaS, 4 Datos/Feedback. Categorías actualizadas.' },
    ],
    stats: { added: 3, changed: 4, fixed: 2 },
  },
  {
    version: '4.0.0',
    date: '31 de marzo de 2026',
    codename: 'Transformation',
    summary: 'Lanzamiento oficial de Khor v4.0.0: La gran transformación Headless. Eliminación total de Ant Design y DayJS. El sistema ahora es 100% autónomo, basado en Radix UI y Tailwind CSS v4, logrando un control total sobre el DOM, el rendimiento y la accesibilidad.',
    highlights: [
      'Zero External UI Dependencies: Ant Design ha sido completamente reemplazado por componentes de arquitectura pura.',
      'Agnostic Date Engine: Migración total de DayJS a date-fns + objetos Date nativos.',
      'Tailwind CSS v4 Native: Aprovechamiento de las nuevas capacidades de la engine de Tailwind para un sistema de tokens ultra-mínimo.',
      'Stable Molecules & Organisms: Estabilización de componentes complejos (TreeSelect, DatePicker, DataTable) en entornos 100% controlados.',
    ],
    changes: [
      { type: 'breaking', description: 'Eliminación definitiva de ConfigProvider y cualquier rastro de la librería antd en el bundle.' },
      { type: 'removed', description: 'Dependencias obsoletas removidas: antd, dayjs y plugins asociados.' },
      { type: 'changed', component: 'AIExportPage', description: 'Guía IA actualizada para generar código libre de referencias legacy.' },
      { type: 'changed', component: 'HomePage', description: 'Exportador ZIP alineado a la nueva arquitectura v4.0.0.' },
    ],
    stats: { added: 5, changed: 20, fixed: 15 },
  },
  {
    version: '3.2.1',
    date: '30 de marzo de 2026',
    codename: '100% Token Coverage',
    summary: 'Expansión del exportador DTCG (Design Tokens) para abarcar la totalidad del sistema de diseño, resolviendo variables referenciadas y añadiendo la colección Semantic.',
    changes: [
      { type: 'added', component: 'FigmaExportPage', description: 'Incorporación de la raíz "Semantic" con Action, Surface, Text, Border y Focus.' },
      { type: 'added', component: 'FigmaExportPage', description: 'Inclusión de métricas faltantes: Layout, Iconos y tamaños secundarios de tipografía (H3, Body, Small).' },
      { type: 'fixed', component: 'FigmaExportPage', description: 'Creación de un parser para limpiar variables CSS de radio (ej. extraer "6" de "var(--radius, 6px)").' },
    ]
  },
  {
    version: '3.2.0',
    date: '30 de marzo de 2026',
    codename: 'Pro Styles & Components',
    summary: 'Refactorización del exportador Figma Styles al esquema de arquitectura compleja (paintStyles, textStyles, effectStyles) para sombras, colores con opacidad y tipografía con unidades absolutas. Aclaración de la barrera JSON/Markdown para componentes.',
    changes: [
      { type: 'changed', component: 'FigmaExportPage', description: 'Implementación de paintStyles (Solid) con propiedades hex y opacity.' },
      { type: 'added', component: 'FigmaExportPage', description: 'Implementación de textStyles con unidades de medida rígidas (PIXELS) para Figma.' },
      { type: 'added', component: 'FigmaExportPage', description: 'Implementación de effectStyles (DROP_SHADOW) para sincronización de sombras automáticas.' },
    ]
  },
  {
    version: '3.1.9',
    date: '30 de marzo de 2026',
    codename: 'DTCG Standard Final',
    summary: 'Implementación definitiva del estándar Design Token Community Group ($value, $type) con estructura jerárquica Primitive/Token para compatibilidad total con Figma.',
    changes: [
      { type: 'changed', component: 'FigmaExportPage', description: 'Estructuración del JSON en carpetas raíz "Primitive" y "Token".' },
      { type: 'changed', component: 'FigmaExportPage', description: 'Uso obligatorio de $value y $type en todas las definiciones de variables.' },
      { type: 'changed', component: 'FigmaExportPage', description: 'Unificación de exportadores Variables y Style Dictionary bajo la misma base DTCG.' },
    ]
  },
  {
    version: '3.1.8',
    date: '30 de marzo de 2026',
    codename: 'Universal Exporters Refactor',
    summary: 'Refactorización total de los motores de exportación para cumplir con los estándares de la industria: Official Figma Format y W3C Design Tokens (DTCG).',
    changes: [
      { type: 'changed', component: 'FigmaExportPage', description: 'Nueva estructura "Official Figma" con valuesByMode para Variables.' },
      { type: 'changed', component: 'FigmaExportPage', description: 'Adopción del estándar W3C DTCG ($value, $type) para Style Dictionary.' },
      { type: 'changed', component: 'FigmaExportPage', description: 'Simplificación a Mapa Plano para Figma Styles legacy.' },
    ]
  },
  {
    version: '3.1.7',
    date: '30 de marzo de 2026',
    codename: 'Figma Final Polish',
    summary: 'Aplanamiento total del JSON a array raíz, implementación de jerarquía de carpetas con "/" y conversión de line-height a píxeles absolutos para compatibilidad total con el motor de Figma.',
    changes: [
      { type: 'changed', component: 'FigmaExportPage', description: 'Exportación directa como array raíz (sin objetos contenedores).' },
      { type: 'changed', component: 'FigmaExportPage', description: 'Jerarquía "/" en nombres de variables (ej. Primary/Hover, H1/Size).' },
      { type: 'added', component: 'FigmaExportPage', description: 'Cálculo automático de Line Height en píxeles (size * multiplier) para variables FLOAT.' },
    ]
  },
  {
    version: '3.1.6',
    date: '30 de marzo de 2026',
    codename: 'Figma Structure Refinement',
    summary: 'Aplanamiento de la estructura JSON para Figma Variables y optimización de nomenclatura de tipografía para compatibilidad total con plugins.',
    changes: [
      { type: 'changed', component: 'FigmaExportPage', description: 'Remoción de la envoltura figmaVariables y metadatos extras; collections ahora en la raíz.' },
      { type: 'changed', component: 'FigmaExportPage', description: 'Renombrado de variables de fuente de font-* a typo-family-* para evitar colisiones.' },
    ]
  },
  {
    version: '3.1.5',
    date: '30 de marzo de 2026',
    codename: 'Figma Exporter Hotfix',
    summary: 'Corrección crítica en el exportador de Figma Variables. Se implementó un motor de resolución de tokens para transformar variables CSS en valores hexadecimales reales compatibles con Figma.',
    changes: [
      { type: 'fixed', component: 'FigmaExportPage', description: 'Solución al bug de canales RGB nulos en el JSON de exportación mediante resolveHex.' },
      { type: 'changed', component: 'FigmaExportPage', description: 'Soporte mejorado para exportación de Figma Styles y Variables con valores estáticos.' },
    ]
  },
  {
    version: '3.1.4',
    date: '30 de marzo de 2026',
    codename: 'Refinamiento & IA Guide',
    summary: 'Implementación de lógica fullWidth en botones, limpieza de linter y optimización del exportador de IA para maximizar la efectividad de los prompts.',
    changes: [
      { type: 'added', description: 'Implementación funcional de prop fullWidth en KButton usando Tailwind w-full.' },
      { type: 'fixed', description: 'Corrección de variables no utilizadas (iconPosition) detectadas por el linter en KButton.' },
      { type: 'changed', component: 'AIExportPage', description: 'Reordenamiento de prompts (Instrucciones primero) para evitar "Lost in the Middle".' },
      { type: 'added', component: 'AIExportPage', description: 'Nueva sección de "Reglas Estrictas de Accesibilidad (A11y)" en la guía auto-generada.' },
    ]
  },
  {
    version: '3.1.3',
    date: '30 de marzo de 2026',
    codename: 'Gobernanza Automatizada',
    summary: 'Implementación de Linter de Accesibilidad (jsx-a11y) y configuración externa para asegurar la calidad del DOM.',
    changes: [
      { type: 'added', description: 'Instalación de ESLint v9 con soporte Flat Config (eslint.config.js).' },
      { type: 'added', description: 'Plugin de accesibilidad jsx-a11y configurado con reglas recomendadas.' },
      { type: 'changed', description: 'Remoción de configuración de linter en package.json para mayor limpieza.' },
    ]
  },

  {
    version: '3.1.2',
    date: '30 de marzo de 2026',
    codename: 'Gobernanza & Accesibilidad',
    summary: 'Restauración de instrucciones críticas para IA, remediación de Gaps de accesibilidad WCAG y mejora de la infraestructura de movimiento.',
    changes: [
      { type: 'added', description: 'Implementación de prefers-reduced-motion y focus-visible global.' },
      { type: 'changed', component: 'AIExportPage', description: 'Restauración del bloque "Instrucciones IA" y actualización de la IA Guide con normativas de accesibilidad.' },
      { type: 'fixed', description: 'Solución de los 8 gaps detectados en la auditoría de clase mundial.' },
    ]
  },
  {
    version: '3.1.1',
    date: '30 Mar 2026',
    codename: 'Refinement',
    summary: 'Optimización institucional orientada a la perfección del DOM y la accesibilidad. Eliminación masiva de fugas de abstracción (prop-drifting) y completado de la capa de motion y semántica de segunda capa.',
    highlights: [
      'Destructuring Masivo: Limpieza total de atributos no-estándar en el DOM para todos los átomos.',
      'Accessibility Core: Soporte nativo para prefers-reduced-motion y easings asimétricos de entrada/salida.',
      'Semantic Expansion: Cobertura total de tokens de Bordes y variantes de Acción (Ghost, Disabled).',
    ],
    changes: [
      { type: 'fixed', description: 'Prevención de warnings de React mediante destructuring selectivo en componentes raíz.' },
      { type: 'added', component: 'theme.css', description: 'Nuevos tokens de motion (instant), easings asimétricos y optimización de feedback-light en Dark Mode.' },
      { type: 'added', component: 'CHANGELOG.md', description: 'Creación de archivo físico de registro de cambios en la raíz del repositorio.' },
    ],
    stats: { added: 5, changed: 45, fixed: 12 },
  },
  {
    version: '3.1.0',
    date: '27 Mar 2026',
    codename: 'Density & AI',
    summary: 'Implementación del sistema global de Density Tokens y adición escalada de grillas de validación (State Showcase) a lo largo del sistema de componentes. Además, refactorización masiva del Exportador de IA para ser 100% dinámico y sincronizarse en tiempo real con las guías de Accesibilidad ARIA.',
    highlights: [
      'Density Tokens: Nuevo sistema unificado para controlar compacidad (.khor-compact) y comodidad (.khor-comfortable).',
      'Auditoría Exhaustiva V2: Incorporación por Olas de reportes sintéticos de accesibilidad a los 73 componentes del sistema.',
      'Exportador IA Dinámico: AIExportPage ahora procesa el Markdown on-the-fly, mapeando Props, Notas de IA, Keyboard handlers y ARIA de los diccionarios reales.',
    ],
    changes: [
      { type: 'added', component: 'theme.css', description: 'Declaración de variables semánticas de densidad (radius, espaciados, fonts, etc), modificadores (.khor-compact) y completado de la escala neutral oscura (600, 700, 800).' },
      { type: 'changed', component: 'AIExportPage', componentPath: '/ai-export', description: 'Reescritura del generador MD (-1,000 líneas codificadas). Ahora construye el manual leyendo directamente los exports de los componentes (AtomsPage, MoleculesPage, OrganismsPage) e inyecta reglas sistémicas.' },
      { type: 'changed', component: 'KButton', componentPath: '/atoms/button', description: 'Atado el box-model base a variables del ecosistema Density (height-input, padding, radius_sm/md/lg).' },
    ],
    stats: { added: 15, changed: 78, fixed: 2 },
  },
  {
    version: '3.0.0',
    date: '27 Mar 2026',
    codename: 'World-Class',
    summary: 'Evolución del Khor Design System a un ecosistema de clase mundial. Implementación de nueva arquitectura de tokens semánticos (superficies, bordes y acciones), motion principles, accesibilidad global exhaustiva, y el nuevo Playground Pro con Live Code integrado.',
    highlights: [
      'Tokens Semánticos de 2da Capa: Abstracción robusta para dark mode perfecto (Surface, Text, Border, Action).',
      'Motion Tokens: Curvas de aceleración (ease, bounce, spring) y durations estandarizados globalmente.',
      'Accesibilidad Global: Focus rings universales, soporte a prefers-reduced-motion y un skip-to-content incorporado.',
      'Playground Pro: ComponentDoc evolucionado con "State Showcase" y paneles de Live Code para autogenerar JSX real.',
      'Internacionalización (i18n): Soporte RTL nativo y font fallbacks reforzados.',
    ],
    changes: [
      { type: 'added', component: 'theme.css', description: 'Declaración de tokens de motion, utilidades A11y (.khor-skip-link, prefers-reduced-motion) y variables semánticas (action, surface, border).' },
      { type: 'changed', component: 'ComponentDoc', description: 'Nueva arquitectura con pestañas dinámicas de "Live Code", "Resumen de Accesibilidad" y "Estados Exhaustivos".' },
      { type: 'added', component: 'AtomsPage', description: 'Los 5 átomos principales ahora cuentan con su propio Live Code interactivo para testing sin Storybook.' },
      { type: 'added', component: 'AccessibilityPage', description: 'Documentación consolidada sobre principios A11y y las directrices WCAG soportadas.' },
      { type: 'breaking', description: 'Dependencia de evaluadores externos removida; la propia documentación garantiza la fidelidad de estado.' },
    ],
    stats: { added: 30, changed: 20, fixed: 5 },
  },
  {
    version: '2.7.0',
    date: '26 Mar 2026',
    codename: 'Modularity',
    summary: 'Arquitectura escalable para Patrones/Recipes. Se desacopló el archivo monolítico en módulos independientes, implementando un registro central indexado. La navegación lateral y las páginas ahora se renderizan dinámicamente.',
    highlights: [
      'Refactorización DX completa: 8 Patrones modulares en src/app/patterns/',
      'Enrutamiento aislado: nueva ruta /patterns/:id para vista aislada por cada patrón',
      'Generación dinámica de menú lateral desde el registro de patrones exportado',
      'Visibilidad Permanente: los bloques de código fuente siempre están visibles para facilitar el "copiar y pegar"',
    ],
    changes: [
      { type: 'added', description: 'Registro centralizado en src/app/patterns/index.ts con interface unificada que permite extender el design system fácilmente.' },
      { type: 'changed', component: 'PatternsPage', description: 'Refactorización masiva: el archivo monolítico se redujo drásticamente al extraer los 8 patrones funcionales hacia módulos aislados.' },
      { type: 'changed', component: 'AppShell', description: 'Navegación lateral del panel principal es completamente dinámica y conectada al registro central.' },
      { type: 'added', component: 'Router', description: 'Nueva ruta /patterns/:id integrada en routes.ts.' },
    ],
    stats: { added: 10, changed: 2, fixed: 0 },
  },
  {
    version: '2.6.0',
    date: '25 Mar 2026',
    codename: 'Antigravity',
    summary: 'Finalización de la Auditoría Integral 2026. El sistema ha sido saneado, refactorizado y optimizado en 10 fases estratégicas. Se resolvieron errores críticos de build, se unificó la arquitectura sobre Ant Design v5 con Khor Design Tokens y se alcanzó el 100% de type-safety en la documentación.',
    highlights: [
      'Auditoría de 10 Fases: Revisión y refactorización de 87 componentes (30 Átomos, 33 Moléculas, 24 Organismos).',
      'Build Stability: Eliminación de imports versionados inválidos y resolución de conflictos de Rollup.',
      'AntD v5 Alignment: Todos los organismos y patrones ahora envuelven componentes de Ant Design con tokens personalizados.',
      'Polish Final: Búsqueda global (⌘K) actualizada con índice completo y HomePage con métricas reales.',
    ],
    changes: [
      { type: 'fixed', description: 'Corrección de errores de importación críticos en Molecules y Organisms que impedían el build de producción.' },
      { type: 'changed', component: 'KCommandBar', description: 'Índice de búsqueda actualizado para incluir los 87 componentes del sistema.' },
      { type: 'changed', component: 'HomePage', description: 'Estadísticas actualizadas a conteos reales: 30 Átomos, 33 Moléculas, 24 Organismos.' },
      { type: 'added', description: 'Nuevos Organismos auditados: KFormList, KTree, KUpload, KTour, KCalendar, KCarousel.' },
      { type: 'changed', component: 'TemplatesPage', description: 'Refactorización de templates para usar organismos estándar (ej: KLoginForm).' },
    ],
    stats: { added: 10, changed: 5, fixed: 3 },
  },
  {
    version: '2.5.0',
    date: '10 Mar 2026',
    codename: 'Eclipse',
    summary: 'Sincronización global de marca con Ant Design 5 y cierre total de brechas (Gap Closure). El sistema ahora utiliza ConfigProvider para inyectar tokens de Khor automáticamente en todos los componentes subordinados, asegurando una identidad visual coherente y soporte nativo para Dark Mode.',
    highlights: [
      'Sincronización de Marca: Integración de ConfigProvider para inyectar colores (#E04D36), tipografía y radii en AntD.',
      'Cierre de Gaps: 100% de las propiedades de AntD expuestas en Átomos, Moléculas y Organismos.',
      'Refactorización Pro: KSlider (range), KSegmented (icon mapping) y KDataTable (columnas fijas y ellipsis).',
      'Estabilidad: Verificación completa de tipos y build de producción (Zero Errors).',
    ],
    changes: [
      { type: 'changed', component: 'App', componentPath: '/', description: 'Implementación de ConfigProvider para inyección global de tokens Khor en componentes Ant Design.' },
      { type: 'changed', description: 'Átomos actualizados: KButton (href, shape), KInput (status, block), KBadge (overflow, offset), KAvatar (icon, gap) ahora exponen API completa de AntD.' },
      { type: 'changed', description: 'Moléculas actualizadas: KSlider (soporte range), KSegmented (objetos con icono), KDatePicker (presets, status), KPopconfirm (okButtonProps).' },
      { type: 'added', component: 'KDataTable', componentPath: '/organisms/data-table', description: 'Soporte para columnas fijas (fixed) y truncado inteligente (ellipsis) integrado en el motor de tablas.' },
      { type: 'fixed', description: 'Resolución de conflictos de tipos en KSlider y KSegmented causados por uniones de tipos de Ant Design 5.' },
    ],
    stats: { added: 1, changed: 3, fixed: 1 },
  },
  {
    version: '2.4.0',
    date: '9 Mar 2026',
    codename: 'Clarity',
    summary: 'Guía para IA completamente actualizada con los 73 componentes del sistema (27 átomos, 33 moléculas, 13 organismos). Botón de copiar al portapapeles corregido con fallback para entornos sandboxed. Nuevo botón "Seleccionar todo" en la vista previa. Versión sincronizada en AppShell, Changelog y Guía IA.',
    highlights: [
      'Guía IA: 73 componentes documentados con interfaces y ejemplos (antes solo 38)',
      'Imports actualizados: rutas separadas para atoms, atoms-extended, molecules, molecules-extended, molecules-wave3, organisms, organisms-extended',
      'Clipboard fix: fallback con execCommand para iframes sandboxed + auto-show preview si falla',
      'Botón "Seleccionar todo" en la vista previa para copia manual con Ctrl+C / Cmd+C',
      'Versión dinámica: el .md exportado siempre muestra la versión actual del sistema (ya no hardcoded 1.0.0)',
    ],
    changes: [
      { type: 'changed', component: 'AIExportPage', componentPath: '/ai-export', description: 'Guía IA actualizada: 27 átomos (antes 18), 33 moléculas (antes 12), 13 organismos (antes 8). Incluye todos los componentes extendidos: KInputSearch, KAffix, KSpace, KImage, KWatermark, KQRCode, KInputNumber, KSegmented, KAutocomplete, KDateRangePicker, KSelectAdvanced, KDescriptions, KPopconfirm, KResult, KTimeline, KCascader, KStatistic, KTimePicker, KMentions, KAnchor, KList, KDividerExtended, KTreeSelect, KNotificationContainer.' },
      { type: 'fixed', component: 'AIExportPage', componentPath: '/ai-export', description: 'Botón "Copiar al portapapeles" corregido: implementado fallback con document.execCommand("copy") vía textarea oculto cuando navigator.clipboard falla en entornos sandboxed (iframes). Si ambos fallan, muestra toast de warning y auto-abre la vista previa expandida.' },
      { type: 'added', component: 'AIExportPage', componentPath: '/ai-export', description: 'Nuevo botón "Seleccionar todo (Ctrl+C)" en la barra inferior de la vista previa. Usa window.getSelection() para seleccionar todo el texto del <pre> y muestra toast informativo.' },
      { type: 'changed', component: 'AIExportPage', componentPath: '/ai-export', description: 'Versión del documento ahora es dinámica (const KHOR_VERSION = "3.1.3") en vez de hardcoded "1.0.0". Sección de Imports en Patrones actualizada con rutas de todos los módulos extendidos.' },
      { type: 'changed', component: 'AppShell', componentPath: '/', description: 'Badge de versión actualizado a v3.1.3 en header.' },
    ],
    stats: { added: 1, changed: 3, fixed: 1 },
  },
  {
    version: '2.3.0',
    date: '9 Mar 2026',
    codename: 'Prism',
    summary: 'Theming en Vivo completamente reconstruido con personalización profunda: tipografía (3 familias, escala completa), sombras (offset, blur, color), border radius (4 niveles), espaciado (5 niveles), 8 colores de marca/feedback. Galería de 6 presets de marca (Corporate, Startup, Healthcare, Fintech, Dark). Color "Navy" renombrado a "Secundario" en la UI.',
    highlights: [
      'Theming completo: 30+ tokens editables con preview en vivo (Componentes, Tipografía, Sombras/Radii)',
      '6 presets de marca: Khor Default, Corporate Blue, Startup Fresh, Dark Professional, Healthcare, Fintech',
      'Tipografía: fuentes de heading/body/mono seleccionables + escala tipográfica visual + line-height',
      'Sombras: offsets SM/MD/LG + color de sombra + preview de elevación en tiempo real',
      '"Navy" renombrado a "Secundario" en UI del Theming (internamente sigue mapeando a --khor-navy)',
      'Sidebar: secciones inician colapsadas, "Inicio" es link directo sin sub-item, Templates unificados en Patrones/Recipes',
      'Documento SUGERENCIAS.md con 20 propuestas priorizadas para diseñadores y developers',
    ],
    changes: [
      { type: 'changed', component: 'ThemingPage', componentPath: '/theming', description: 'Reconstrucción completa: de 11 tokens a 30+. Nuevas secciones de Tipografía (3 font families, 5 tamaños, line-height), Sombras (3 niveles con offset libre + color), Border Radius (4 niveles SM-XL), Espaciado (5 niveles XS-XL). Todos con previews en vivo.' },
      { type: 'added', description: 'Galería de 6 presets de marca: Khor Default, Corporate Blue, Startup Fresh, Dark Professional, Healthcare, Fintech. Cada uno aplica colores, fuentes y radii coherentes.' },
      { type: 'added', description: 'Tabs de preview: Componentes (botones, badges, alertas, forms), Tipografía (escala visual, fuentes), Sombras y Radii (previews de elevación y esquinas).' },
      { type: 'changed', description: 'Label "Navy" renombrado a "Secundario" en panel de Theming para claridad del usuario. Internamente sigue mapeando a --khor-navy.' },
      { type: 'added', description: 'Exportación mejorada: CSS con 30+ variables, SCSS con variables completas, JSON en formato W3C DTCG con typography, shadows, radius y spacing.' },
      { type: 'added', description: 'SectionCard colapsable en panel de controles para mejor organización (Colores abierto por defecto, demás cerrados).' },
      { type: 'changed', component: 'AppShell', componentPath: '/', description: 'Sidebar reestructurado: secciones inician colapsadas por defecto. "Inicio" es ahora link directo (sin sub-item "Vista General"). Sección "Templates" eliminada y unificada dentro de "Patrones / Recipes" junto con los patrones interactivos.' },
      { type: 'added', description: 'SUGERENCIAS.md: documento con 20 propuestas de alto valor priorizadas (P1-P4) para diseñadores y desarrolladores, incluyendo Icon Explorer, Accessibility Simulation, Token Diff Viewer, Component Anatomy y más.' },
    ],
    stats: { added: 5, changed: 3, fixed: 0 },
  },
  {
    version: '2.2.0',
    date: '9 Mar 2026',
    codename: 'Horizon',
    summary: 'Nuevas herramientas de diseño: Patrones/Recipes interactivos, Theming en Vivo con exportación multi-formato, Verificador de Contraste WCAG con pares light/dark mode, y fix completo del KDateRangePicker. ComponentDoc ahora incluye botón Copy Snippet.',
    highlights: [
      '7 patrones interactivos: Dashboard Stats, Form Validation, Filterable List, Login, Paginated Table, Wizard Multi-Step, Settings Page',
      'Theming en Vivo: ajusta colores, radii y spacing con preview en tiempo real + exportación CSS/SCSS/JSON/theme.css completo',
      'WCAG Checker con 26 pares de colores (15 light + 11 dark mode) y checker personalizado',
      'KDateRangePicker completamente reconstruido: hover preview, indicador from/to, clear button, reset de estado',
      'ComponentDoc con botón "Copiar Snippet" rápido en header',
      'Átomos reordenados A-Z (KAffix → KWatermark)',
      'Sidebar colapsado: solo muestra iconos de sección, clic expande',
    ],
    changes: [
      { type: 'added', description: 'PatternsPage (/patterns): 7 patrones interactivos — Dashboard con Stats+Filtros, Formulario con Validación, Lista Filtrable, Login con Branding, Tabla con Paginación, Wizard Multi-Step, Settings Page. Cada patrón con código copiable.' },
      { type: 'added', description: 'ThemingPage (/theming): Panel de theming en vivo que modifica CSS custom properties en tiempo real. 5 colores + 3 radii + 3 spacings. Vista previa de botones, badges, alertas, formularios y progress. Exportación a CSS, SCSS, JSON y theme.css completo.' },
      { type: 'added', description: 'WCAGCheckerPage (/wcag-checker): Verificador de contraste WCAG 2.1 con 26 pares de colores del sistema (15 light mode + 11 dark mode). Checker personalizado para cualquier par de colores. Reporte copiable. Niveles AAA/AA/AA Large/Fail.' },
      { type: 'fixed', component: 'KDateRangePicker', componentPath: '/molecules/date-range', description: 'Reconstrucción completa: hover preview del rango durante selección, indicador visual "from/to", botón X para limpiar, reset de tempFrom al usar presets, handleOpenChange resetea estado.' },
      { type: 'added', component: 'ComponentDoc', description: 'Botón "Copiar Snippet" en header de cada documentación de componente. Dark mode fix en tabla de props y secciones de guías/AI notes.' },
      { type: 'changed', description: 'Átomos reordenados alfabéticamente A-Z en sidebar (KAffix → KWatermark, 27 items).' },
      { type: 'changed', description: 'Sidebar colapsado rediseñado: solo muestra iconos de las 7 secciones principales. Clic en cualquier icono expande el sidebar completo.' },
      { type: 'fixed', description: 'Bug de dark mode en sidebar: backgroundColor usaba var(--khor-navy) que en dark mode se volvía azul claro. Ahora usa color fijo #051758.' },
      { type: 'changed', description: 'Navegación de Herramientas actualizada: Patrones/Recipes, Theming en Vivo, Contraste WCAG, Accesibilidad WCAG, Exportar a Figma, Guía IA, Changelog.' },
    ],
    stats: { added: 4, changed: 3, fixed: 2 },
  },
  {
    version: '2.1.0',
    date: '9 Mar 2026',
    codename: 'Nexus Complete',
    summary: 'Integración completa de los 89 archivos de Elements. 27 átomos, 33 moléculas, 13 organismos. Migración de tokens a CSS variables para soporte de Dark Mode automático. Directorio /Elements eliminado.',
    highlights: [
      '9 nuevos átomos: KButtonGroup, KInputPassword, KInputSearch, KFloatButton, KImage, KAffix, KSpace, KQRCode, KWatermark',
      '11 nuevas moléculas: KCascader, KStatistic, KTimePicker, KMentions, KColorPicker, KAnchor, KList, KNotification, KDividerExt, KTreeSelect, KTransfer',
      'khorTokens migrado a CSS custom properties var() — dark mode automático en inline styles',
      'Directorio /Elements completamente vaciado — 89/89 archivos procesados',
    ],
    changes: [
      { type: 'added', description: '9 nuevos átomos en atoms-extended.tsx: KButtonGroup, KInputPassword, KInputSearch, KFloatButton, KImage (con preview lightbox), KAffix (sticky wrapper), KSpace, KQRCode (generador visual), KWatermark.' },
      { type: 'added', description: '11 nuevas moléculas en molecules-wave3.tsx: KCascader, KStatistic, KTimePicker, KMentions (@menciones), KColorPicker (Radix), KAnchor (scroll spy), KList, KNotification (sistema persistente), KDividerExt (con texto), KTreeSelect, KTransfer (dual list).' },
      { type: 'breaking', description: 'khorTokens migrado de valores hex estáticos a CSS custom properties var(). Todos los componentes con inline styles ahora responden automáticamente al toggle de dark mode.' },
      { type: 'added', description: 'khorStaticColors exportado para contextos sin CSS (canvas, cálculos de color).' },
      { type: 'removed', description: '23 archivos restantes eliminados de /Elements. Directorio completamente procesado.' },
      { type: 'changed', description: 'Sidebar actualizado con 27 átomos, 33 moléculas y 13 organismos. Command Bar actualizado.' },
    ],
    stats: { added: 22, changed: 2, fixed: 0 },
  },
  {
    version: '2.0.0',
    date: '9 Mar 2026',
    codename: 'Nexus',
    summary: 'Análisis comparativo de 89 componentes externos, integración de 16 componentes de alta prioridad, KDataTable v2 con TanStack React Table, y limpieza masiva de duplicados.',
    highlights: [
      'KDataTable v2 con TanStack React Table: column toggle, row selection, CSV export, sticky header, page size selector',
      '10 nuevas moléculas: KInputNumber, KSegmented, KAutocomplete, KDatePicker, KDateRangePicker, KSelectAdvanced, KDescriptions, KPopconfirm, KResult, KTimeline',
      '5 nuevos organismos: KUpload, KTree, KTour, KModalConfirm, KFormList',
      'Eliminación de 66 archivos duplicados de /Elements, 23 archivos restantes para integración futura',
      'Renombrado SparklineCell → KSparklineCell y CommandBar → KCommandBar para homologar nombres',
    ],
    changes: [
      { type: 'breaking', component: 'KDataTable', componentPath: '/organisms/data-table', description: 'KDataTable reescrito con TanStack React Table. Nuevas props: enableRowSelection, enableColumnToggle, enableExport, stickyHeader, maxHeight, pageSizes, onSelectionChange. API de columns mantiene retrocompatibilidad.' },
      { type: 'added', description: '10 nuevas moléculas en molecules-extended.tsx: KInputNumber, KSegmented, KAutocomplete, KDatePicker, KDateRangePicker, KSelectAdvanced, KDescriptions, KPopconfirm, KResult, KTimeline.' },
      { type: 'added', description: '5 nuevos organismos en organisms-extended.tsx: KUpload (drag & drop), KTree (vista de árbol con checkable), KTour (onboarding guiado), KModalConfirm (confirmación declarativa), KFormList (campos dinámicos).' },
      { type: 'changed', component: 'KSparklineCell', componentPath: '/organisms/sparkline', description: 'Renombrado de SparklineCell a KSparklineCell para homologar nomenclatura.' },
      { type: 'changed', component: 'KCommandBar', componentPath: '/organisms/command-bar', description: 'Renombrado de CommandBar a KCommandBar en sidebar y search registry.' },
      { type: 'removed', description: '66 archivos duplicados eliminados de /Elements (47 duplicados directos + 16 integrados + 3 utilitarios). 23 archivos restantes conservados para futura integración.' },
      { type: 'added', description: 'Instalación de @tanstack/react-table como dependencia para el motor de tablas profesional.' },
      { type: 'added', description: 'Respaldo completo en /src/app/_backup/ con manifiesto y análisis comparativo documentado.' },
    ],
    stats: { added: 19, changed: 2, fixed: 0 },
  },
  {
    version: '1.3.0',
    date: '6 Mar 2026',
    codename: 'Atlas',
    summary: 'Modo oscuro completo, auditoría de accesibilidad WCAG AA, exportación Figma Variables, y changelog interactivo.',
    highlights: [
      'Dark Mode con tokens completos y persistencia en localStorage',
      'Auditoría WCAG AA con scores por componente',
      'Exportación JSON compatible con Figma Variables',
      'Changelog interactivo con timeline visual',
    ],
    changes: [
      { type: 'added', description: 'Theme Context con dark/light mode toggle y persistencia en localStorage.' },
      { type: 'added', description: 'Página de Auditoría de Accesibilidad con scores WCAG AA para 19 componentes.' },
      { type: 'added', description: 'Página de Changelog interactivo con timeline visual y filtros.' },
      { type: 'added', description: 'Exportación de tokens como Figma Variables JSON en la página de Tokens.' },
      { type: 'added', description: 'Dark Mode tokens: colores neutrales, feedback y sombras para tema oscuro.' },
      { type: 'changed', component: 'AppShell', componentPath: '/', description: 'Sidebar actualizado con nuevas secciones de navegación (Accesibilidad, Changelog, Figma Export).' },
    ],
    stats: { added: 6, changed: 1, fixed: 0 },
  },
  {
    version: '1.2.0',
    date: '5 Mar 2026',
    codename: 'Beacon',
    summary: 'Command Bar funcional con Ctrl+K, playgrounds interactivos para todos los organismos, y mejoras de búsqueda.',
    highlights: [
      'Command Bar (⌘K) con búsqueda fuzzy y 44 items indexados',
      '4 nuevos playgrounds interactivos para organismos',
      'Historial de búsquedas recientes en localStorage',
    ],
    changes: [
      { type: 'added', component: 'KCommandBar', componentPath: '/organisms/command-bar', description: 'Command Bar funcional con búsqueda fuzzy, navegación por teclado, y historial de recientes.' },
      { type: 'added', component: 'KDataTable', componentPath: '/organisms/data-table', description: 'Playground interactivo con controles de paginación, búsqueda y estado de carga.' },
      { type: 'added', component: 'KModal', componentPath: '/organisms/modal', description: 'Playground interactivo con controles de título y ancho configurable.' },
      { type: 'added', component: 'KDrawer', componentPath: '/organisms/drawer', description: 'Playground interactivo con controles de posición, título y ancho.' },
      { type: 'added', component: 'KToastManager', componentPath: '/organisms/toast-manager', description: 'Playground interactivo con controles de tipo, título, descripción y duración.' },
      { type: 'changed', component: 'AppShell', componentPath: '/', description: 'Integración del Command Bar con hook useCommandBar() en el layout principal.' },
    ],
    stats: { added: 5, changed: 1, fixed: 0 },
  },
  {
    version: '1.1.0',
    date: '4 Mar 2026',
    codename: 'Core',
    summary: 'Correcciones de HTML válido, playgrounds faltantes, conteos actualizados y verificación completa de la auditoría.',
    highlights: [
      'Playgrounds faltantes añadidos para KTooltip, KDivider y KPopover',
      'Corrección de anidamiento ilegal de <button> en KDropdownMenu',
      'Eliminación de React.Fragment con props inválidos',
    ],
    changes: [
      { type: 'added', component: 'KTooltip', componentPath: '/atoms/tooltip', description: 'Playground interactivo añadido con controles de placement y título.' },
      { type: 'added', component: 'KDivider', componentPath: '/atoms/divider', description: 'Playground interactivo añadido.' },
      { type: 'added', component: 'KPopover', componentPath: '/molecules/popover', description: 'Playground interactivo añadido con controles de posición.' },
      { type: 'fixed', component: 'KDropdownMenu', componentPath: '/molecules/dropdown', description: 'Corregido anidamiento ilegal de <button> dentro de <button>. Trigger cambiado a <div role="button">.' },
      { type: 'fixed', description: 'Reemplazados React.Fragment con props inválidos por <span> y <div style={{ display: "contents" }}>.' },
      { type: 'changed', description: 'Conteo de átomos actualizado a 18/18 en HomePage.' },
      { type: 'changed', description: 'Playgrounds de CardSection y Tabs añadidos en organismos (2/8 iniciales).' },
    ],
    stats: { added: 3, changed: 2, fixed: 2 },
  },
  {
    version: '1.0.0',
    date: '3 Mar 2026',
    codename: 'Genesis',
    summary: 'Lanzamiento inicial del Khor Design System con arquitectura Atomic Design completa.',
    highlights: [
      '18 átomos, 12 moléculas, 8 organismos y 4 templates',
      'Tokens de diseño completos (colores, tipografía, espaciado, sombras)',
      'Documentación interactiva con ComponentDoc',
      'Descarga ZIP del sistema de diseño',
    ],
    changes: [
      { type: 'added', description: '18 átomos: KButton, KInput, KTextArea, KBadge, KTag, KAvatar, KSwitch, KCheckbox, KRadio, KTooltip, KProgress, KText, KDivider, KAlert, KSkeleton, KSlider, KRate, KSpin.' },
      { type: 'added', description: '12 moléculas: KFormField, KSearchInput, KStatCard, KNavItem, KSelectField, KUserCell, KEmptyState, KBreadcrumb, KSteps, KDropdownMenu, KPopover, KAccordion.' },
      { type: 'added', description: '8 organismos: KDataTable, KSparklineCell, KModal, KDrawer, KCardSection, KTabs, KToastManager, KCommandBar.' },
      { type: 'added', description: '4 templates: Login, Dashboard, CRUD Table, Formulario Multi-Paso.' },
      { type: 'added', description: 'AppShell con sidebar Navy colapsable y header con búsqueda.' },
      { type: 'added', description: 'ComponentDoc: plantilla de documentación con tabs (Preview, Playground, Código, Docs).' },
      { type: 'added', description: 'TokensPage: documentación visual de colores, tipografía, espaciado y sombras.' },
      { type: 'added', description: 'HomePage con estadísticas, principios del sistema y quick start.' },
      { type: 'added', description: 'handleDownloadZip: generación de ZIP real con JSZip incluyendo tokens, catálogos y README.' },
    ],
    stats: { added: 9, changed: 0, fixed: 0 },
  },
];

export function ChangelogPage() {
  const navigate = useNavigate();
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(new Set([changelog[0].version]));
  const [typeFilter, setTypeFilter] = useState<ChangeType | 'all'>('all');

  const toggleVersion = (v: string) => {
    setExpandedVersions((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  };

  return (
    <div style={{ fontFamily: t.typography.fontPrimary }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: t.colors.brand.primary, textTransform: 'uppercase', letterSpacing: 1 }}>
            Historial
          </span>
        </div>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: t.colors.brand.navy }}>
          Changelog
        </h2>
        <p style={{ margin: '8px 0 0', fontSize: 16, color: t.colors.neutral[500], lineHeight: 1.5 }}>
          Historial completo de versiones, cambios, mejoras y correcciones del Khor Design System.
        </p>
      </div>

      {/* Filter bar */}
      <div style={{
        display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center',
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: t.colors.neutral[400], marginRight: 4 }}>Filtrar por:</span>
        {(['all', 'added', 'changed', 'fixed', 'removed', 'breaking'] as const).map((f) => {
          const isAll = f === 'all';
          const cfg = !isAll ? changeTypeConfig[f] : null;
          return (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '5px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                border: `1px solid ${typeFilter === f ? (cfg?.color || t.colors.brand.navy) : t.colors.neutral[200]}`,
                backgroundColor: typeFilter === f ? (cfg?.bg || `${t.colors.brand.navy}08`) : 'transparent',
                color: typeFilter === f ? (cfg?.color || t.colors.brand.navy) : t.colors.neutral[400],
                cursor: 'pointer', fontFamily: t.typography.fontPrimary,
              }}
            >
              {cfg?.icon}
              {isAll ? 'Todos' : cfg?.label}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: 32 }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: 11, top: 0, bottom: 0, width: 2,
          backgroundColor: t.colors.neutral[200],
        }} />

        {changelog.map((entry, vi) => {
          const isExpanded = expandedVersions.has(entry.version);
          const isLatest = vi === 0;
          const filteredChanges = typeFilter === 'all'
            ? entry.changes
            : entry.changes.filter((c) => c.type === typeFilter);

          return (
            <div key={entry.version} style={{ position: 'relative', marginBottom: 32 }}>
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: -32 + 4, top: 20,
                width: 16, height: 16, borderRadius: '50%',
                backgroundColor: isLatest ? t.colors.brand.primary : t.colors.neutral[50],
                border: `3px solid ${isLatest ? t.colors.brand.primary : t.colors.neutral[300]}`,
                zIndex: 1,
              }} />

              {/* Version Card */}
              <div style={{
                backgroundColor: t.colors.neutral[50],
                borderRadius: t.radius.lg,
                boxShadow: isLatest ? t.shadows.md : t.shadows.sm,
                border: `1px solid ${isLatest ? `${t.colors.brand.primary}20` : t.colors.neutral[200]}`,
                overflow: 'hidden',
              }}>
                {/* Version Header */}
                <button
                  onClick={() => toggleVersion(entry.version)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16, width: '100%',
                    padding: '20px 24px', border: 'none', backgroundColor: 'transparent',
                    cursor: 'pointer', fontFamily: t.typography.fontPrimary, textAlign: 'left',
                  }}
                >
                  {/* Version tag */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: t.radius.md,
                    backgroundColor: isLatest ? `${t.colors.brand.primary}10` : t.colors.neutral[100],
                    border: `1px solid ${isLatest ? `${t.colors.brand.primary}20` : t.colors.neutral[200]}`,
                    flexShrink: 0,
                  }}>
                    <Tag size={14} style={{ color: isLatest ? t.colors.brand.primary : t.colors.neutral[400] }} />
                    <span style={{
                      fontSize: 16, fontWeight: 700,
                      color: isLatest ? t.colors.brand.primary : t.colors.brand.navy,
                    }}>v{entry.version}</span>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      {entry.codename && (
                        <span style={{
                          fontSize: 14, fontWeight: 600, color: t.colors.brand.navy,
                        }}>"{entry.codename}"</span>
                      )}
                      {isLatest && (
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                          backgroundColor: t.colors.feedback.successLight, color: t.colors.feedback.success,
                          textTransform: 'uppercase', letterSpacing: 0.5,
                        }}>Actual</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, fontSize: 12, color: t.colors.neutral[400] }}>
                      <Calendar size={12} />
                      <span>{entry.date}</span>
                      {entry.stats && (
                        <>
                          <span style={{ color: t.colors.neutral[200] }}>|</span>
                          {entry.stats.added > 0 && <span style={{ color: t.colors.feedback.success }}>+{entry.stats.added}</span>}
                          {entry.stats.changed > 0 && <span style={{ color: '#1976D2' }}>~{entry.stats.changed}</span>}
                          {entry.stats.fixed > 0 && <span style={{ color: t.colors.brand.accent }}>!{entry.stats.fixed}</span>}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Expand */}
                  {isExpanded ? <ChevronDown size={16} style={{ color: t.colors.neutral[300] }} /> : <ChevronRight size={16} style={{ color: t.colors.neutral[300] }} />}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div style={{ padding: '0 24px 20px', borderTop: `1px solid ${t.colors.neutral[200]}` }}>
                    {/* Summary */}
                    <p style={{ fontSize: 14, color: t.colors.neutral[500], lineHeight: 1.6, margin: '16px 0' }}>
                      {entry.summary}
                    </p>

                    {/* Highlights */}
                    {entry.highlights && entry.highlights.length > 0 && (
                      <div style={{
                        padding: 16, borderRadius: t.radius.md,
                        backgroundColor: `${t.colors.brand.primary}06`,
                        border: `1px solid ${t.colors.brand.primary}15`,
                        marginBottom: 16,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: t.colors.brand.primary, fontSize: 12, fontWeight: 600 }}>
                          <Star size={14} />
                          Highlights
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 20, listStyle: 'none' }}>
                          {entry.highlights.map((h, i) => (
                            <li key={i} style={{ fontSize: 13, color: t.colors.neutral[500], lineHeight: 1.8, position: 'relative' }}>
                              <span style={{ position: 'absolute', left: -16, color: t.colors.brand.primary }}>-</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Changes */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {filteredChanges.length === 0 ? (
                        <p style={{ fontSize: 13, color: t.colors.neutral[300], fontStyle: 'italic', textAlign: 'center', padding: 16 }}>
                          No hay cambios de este tipo en esta versión.
                        </p>
                      ) : (
                        filteredChanges.map((change, ci) => {
                          const cfg = changeTypeConfig[change.type];
                          return (
                            <div
                              key={ci}
                              style={{
                                display: 'flex', alignItems: 'flex-start', gap: 10,
                                padding: '10px 12px', borderRadius: t.radius.sm,
                                backgroundColor: t.colors.neutral[100],
                              }}
                            >
                              {/* Type badge */}
                              <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: 3,
                                fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999,
                                backgroundColor: cfg.bg, color: cfg.color,
                                flexShrink: 0, marginTop: 1,
                              }}>
                                {cfg.icon} {cfg.label}
                              </span>

                              {/* Description */}
                              <div style={{ flex: 1, fontSize: 13, color: t.colors.neutral[500], lineHeight: 1.5 }}>
                                {change.component && (
                                  <button
                                    onClick={() => change.componentPath && navigate(change.componentPath)}
                                    style={{
                                      background: 'none', border: 'none', cursor: change.componentPath ? 'pointer' : 'default',
                                      fontWeight: 600, color: t.colors.brand.navy, fontFamily: t.typography.fontPrimary,
                                      fontSize: 13, padding: 0, marginRight: 4,
                                      textDecoration: change.componentPath ? 'underline' : 'none',
                                      textDecorationColor: `${t.colors.brand.navy}30`,
                                    }}
                                  >
                                    {change.component}
                                  </button>
                                )}
                                {change.description}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* End of timeline */}
        <div style={{
          position: 'relative', paddingLeft: 0,
          textAlign: 'center', color: t.colors.neutral[300], fontSize: 12,
        }}>
          <div style={{
            position: 'absolute', left: -32 + 7, top: 4,
            width: 10, height: 10, borderRadius: '50%',
            backgroundColor: t.colors.neutral[200],
          }} />
          <span style={{ fontStyle: 'italic' }}>Inicio del proyecto</span>
        </div>
      </div>
    </div>
  );
}