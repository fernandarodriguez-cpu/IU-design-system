# Analisis Comparativo: 89 Elements vs Khor Design System
## Fecha: 2026-03-09
## Estado: COMPLETADO

---

## Resumen Ejecutivo

| Clasificacion        | Cantidad | Accion                           | Estado     |
|----------------------|----------|----------------------------------|------------|
| DUPLICADOS           | 47       | Eliminados de /Elements          | HECHO      |
| INTEGRADOS           | 16       | Nuevos componentes Khor          | HECHO      |
| UTILIDADES           | 3        | Eliminados (use-mobile, utils)   | HECHO      |
| PENDIENTES (futuro)  | 23       | Conservados en /Elements         | PENDIENTE  |
| **TOTAL**            | **89**   |                                  |            |

### Componentes integrados (v2.0 Nexus):

**10 Nuevas Moleculas** (molecules-extended.tsx):
KInputNumber, KSegmented, KAutocomplete, KDatePicker, KDateRangePicker,
KSelectAdvanced, KDescriptions, KPopconfirm, KResult, KTimeline

**5 Nuevos Organismos** (organisms-extended.tsx):
KUpload, KTree, KTour, KModalConfirm, KFormList

**1 Upgrade Mayor**:
KDataTable v2 con TanStack React Table (organisms.tsx)

### 23 archivos pendientes en /Elements para futura integracion:
affix, anchor, button-group, cascader, color-picker, divider, float-button,
image, input-password, input-search, list, mentions, notification, qrcode,
space, statistic, steps, tag, time-picker, transfer, tree-select,
typography, watermark

---

## 1. DUPLICADOS (47 archivos) - Eliminados de /Elements

Estos archivos tienen equivalente directo en el sistema Khor (atoms/molecules/organisms)
o en la capa UI primitiva (`/src/app/components/ui/`). No aportan funcionalidad nueva.

| # | Archivo Elements | Equivalente Khor | Equivalente UI |
|---|-----------------|-----------------|----------------|
| 1 | accordion.tsx | KAccordion (molecula) | ui/accordion.tsx |
| 2 | alert-dialog.tsx | — | ui/alert-dialog.tsx |
| 3 | alert.tsx | KAlert (atomo) | ui/alert.tsx |
| 4 | aspect-ratio.tsx | — | ui/aspect-ratio.tsx |
| 5 | avatar.tsx | KAvatar (atomo) | ui/avatar.tsx |
| 6 | badge.tsx | KBadge (atomo) | ui/badge.tsx |
| 7 | breadcrumb.tsx | KBreadcrumb (molecula) | ui/breadcrumb.tsx |
| 8 | button.tsx | KButton (atomo) | ui/button.tsx |
| 9 | calendar.tsx | — | ui/calendar.tsx |
| 10 | card.tsx | KCardSection (organismo) | ui/card.tsx |
| 11 | carousel.tsx | — | ui/carousel.tsx |
| 12 | chart.tsx | — | ui/chart.tsx |
| 13 | checkbox.tsx | KCheckbox (atomo) | ui/checkbox.tsx |
| 14 | collapsible.tsx | — | ui/collapsible.tsx |
| 15 | command.tsx | KCommandBar (organismo) | ui/command.tsx |
| 16 | context-menu.tsx | — | ui/context-menu.tsx |
| 17 | dialog.tsx | KModal (organismo) | ui/dialog.tsx |
| 18 | drawer.tsx | KDrawer (organismo) | ui/drawer.tsx |
| 19 | dropdown-menu.tsx | KDropdownMenu (molecula) | ui/dropdown-menu.tsx |
| 20 | form.tsx | KFormField (molecula) | ui/form.tsx |
| 21 | hover-card.tsx | — | ui/hover-card.tsx |
| 22 | input-otp.tsx | — | ui/input-otp.tsx |
| 23 | input.tsx | KInput (atomo) | ui/input.tsx |
| 24 | label.tsx | — | ui/label.tsx |
| 25 | menubar.tsx | — | ui/menubar.tsx |
| 26 | navigation-menu.tsx | — | ui/navigation-menu.tsx |
| 27 | pagination.tsx | (KDataTable tiene paginacion) | ui/pagination.tsx |
| 28 | popover.tsx | KPopover (molecula) | ui/popover.tsx |
| 29 | progress.tsx | KProgress (atomo) | ui/progress.tsx |
| 30 | radio-group.tsx | KRadio (atomo) | ui/radio-group.tsx |
| 31 | rate.tsx | KRate (atomo) | — |
| 32 | resizable.tsx | — | ui/resizable.tsx |
| 33 | scroll-area.tsx | — | ui/scroll-area.tsx |
| 34 | select.tsx | KSelectField (molecula) | ui/select.tsx |
| 35 | separator.tsx | KDivider (atomo) | ui/separator.tsx |
| 36 | sheet.tsx | — | ui/sheet.tsx |
| 37 | sidebar.tsx | AppShell sidebar | ui/sidebar.tsx |
| 38 | skeleton.tsx | KSkeleton (atomo) | ui/skeleton.tsx |
| 39 | slider.tsx | KSlider (atomo) | ui/slider.tsx |
| 40 | sonner.tsx | KToastManager (organismo) | ui/sonner.tsx |
| 41 | spin.tsx | KSpin (atomo) | — |
| 42 | switch.tsx | KSwitch (atomo) | ui/switch.tsx |
| 43 | table.tsx | KDataTable (organismo) | ui/table.tsx |
| 44 | tabs.tsx | KTabs (organismo) | ui/tabs.tsx |
| 45 | textarea.tsx | KTextArea (atomo) | ui/textarea.tsx |
| 46 | toggle-group.tsx | — | ui/toggle-group.tsx |
| 47 | toggle.tsx | — | ui/toggle.tsx |
| 48 | tooltip.tsx | KTooltip (atomo) | ui/tooltip.tsx |
| 49 | use-mobile.ts | — | ui/use-mobile.ts |
| 50 | utils.ts | — | ui/utils.ts |

---

## 2. INTEGRADOS (16 archivos) - Nuevos componentes Khor

Estos componentes NO existen en el sistema Khor actual y aportan funcionalidad nueva significativa.
Recomendacion: integrar con prefijo K y tokens Khor.

| # | Archivo Elements | Tipo sugerido | Descripcion | Prioridad |
|---|-----------------|--------------|-------------|-----------|
| 1 | **data-table.tsx** | Organismo | Tabla avanzada con TanStack Table: column toggle, row selection, CSV export, sticky header, filtros por columna, page size selector | **ALTA** |
| 2 | affix.tsx | Atomo | Fijar elementos al hacer scroll (sticky wrapper) | Baja |
| 3 | anchor.tsx | Molecula | Navegacion tipo scroll-spy con anclas | Media |
| 4 | autocomplete.tsx | Molecula | Input con sugerencias/autocompletado | **Alta** |
| 5 | button-group.tsx | Atomo | Grupo de botones conectados | Media |
| 6 | cascader.tsx | Molecula | Selector en cascada (pais > estado > ciudad) | Media |
| 7 | color-picker.tsx | Molecula | Selector de color | Media |
| 8 | date-picker.tsx | Molecula | Selector de fecha | **Alta** |
| 9 | date-range-picker.tsx | Molecula | Selector de rango de fechas | **Alta** |
| 10 | descriptions.tsx | Molecula | Lista de descripcion clave-valor (detalle de registro) | **Alta** |
| 11 | float-button.tsx | Atomo | Boton flotante de accion (FAB) | Baja |
| 12 | form-list.tsx | Organismo | Lista dinamica de formularios (agregar/eliminar filas) | **Alta** |
| 13 | image.tsx | Atomo | Imagen con preview/lightbox y fallback | Media |
| 14 | input-number.tsx | Atomo | Input numerico con controles +/- | **Alta** |
| 15 | list.tsx | Molecula | Componente de lista con paginacion y acciones | Media |
| 16 | mentions.tsx | Molecula | Input con menciones @usuario | Media |
| 17 | modal-confirm.tsx | Organismo | Modal de confirmacion programatica | **Alta** |
| 18 | notification.tsx | Organismo | Sistema de notificaciones alternativo | Media |
| 19 | popconfirm.tsx | Molecula | Popover de confirmacion | **Alta** |
| 20 | qrcode.tsx | Atomo | Generador de codigos QR | Baja |
| 21 | result.tsx | Molecula | Pagina de resultado (exito/error/403/404/500) | **Alta** |
| 22 | segmented.tsx | Atomo | Control segmentado (tabs inline tipo iOS) | **Alta** |
| 23 | select-advanced.tsx | Molecula | Select avanzado con multi-select y tags | **Alta** |
| 24 | space.tsx | Utilidad | Componente de espaciado entre elementos | Baja |
| 25 | statistic.tsx | Molecula | Display de estadistica con formato numerico | Media |
| 26 | time-picker.tsx | Molecula | Selector de hora | Media |
| 27 | timeline.tsx | Molecula | Linea de tiempo para eventos/historial | **Alta** |
| 28 | tour.tsx | Organismo | Tour guiado paso a paso (onboarding) | **Alta** |
| 29 | transfer.tsx | Organismo | Lista de transferencia (dual list) | Media |
| 30 | tree.tsx | Molecula | Vista de arbol expandible/colapsable | **Alta** |
| 31 | tree-select.tsx | Molecula | Select con estructura de arbol | Media |
| 32 | typography.tsx | Atomo | Sistema tipografico extendido (Title, Text, Paragraph, Link) | Media |
| 33 | upload.tsx | Organismo | Subida de archivos con drag & drop, previews, progreso | **Alta** |
| 34 | watermark.tsx | Utilidad | Marca de agua sobre contenido | Baja |

---

## 3. REVISION/MERGE (12 archivos) - Evaluar mejoras

Estos tienen equivalente parcial en Khor pero podrian aportar mejoras o variantes adicionales.

| # | Archivo Elements | Equivalente Khor | Mejoras potenciales |
|---|-----------------|-----------------|---------------------|
| 1 | data-table.tsx | KDataTable | TanStack Table, column visibility, row selection, CSV export, sticky headers, page size selector. **Recomendacion: REEMPLAZAR KDataTable con version mejorada** |
| 2 | divider.tsx | KDivider | Soporta texto en el divisor, orientacion vertical. Merge parcial. |
| 3 | input-password.tsx | KInput (type=password) | Componente dedicado, podria ser wrapper. Mantener KInput. |
| 4 | input-search.tsx | KSearchInput | Similar. Mantener KSearchInput. |
| 5 | notification.tsx | KToastManager | Notificaciones persistentes vs toast efimero. Complementario. |
| 6 | steps.tsx | KSteps | Version con iconos custom y status. Evaluar merge. |
| 7 | tag.tsx | KTag | Version con animaciones y variantes extra. Evaluar merge. |
| 8 | typography.tsx | KText | Sistema mas completo (Title, Paragraph, Link, copyable, ellipsis). **Considerar adoptar.** |

---

## 4. ANALISIS DETALLADO: Tablas

### KDataTable actual (organisms.tsx)
- Sorting basico (click en header)
- Busqueda global de texto
- Paginacion simple (10 por pagina fijo)
- Render custom por celda
- Inline styles con khorTokens
- **Sin**: row selection, column toggle, CSV export, page size selector, sticky header, column filters

### DataTable de Elements (data-table.tsx)
- **TanStack React Table** (profesional, industria standard)
- Sorting multi-columna
- Filtros por columna individuales
- Visibilidad de columnas (toggle)
- Row selection (individual y masiva)
- Exportacion CSV integrada
- Page size selector (10, 20, 30, 40, 50)
- Sticky header
- Skeleton loading
- Custom row className
- Usa CSS variables `var(--border-primary)`, `var(--bg-secondary)`, etc.

### Recomendacion para Tablas
**Crear KDataTable v2** que:
1. Use TanStack React Table como motor interno
2. Mantenga la API simplificada del KDataTable actual (columns con `dataIndex` + `render`)
3. Agregue las features avanzadas como props opcionales:
   - `enableRowSelection`, `enableColumnToggle`, `enableExport`
   - `stickyHeader`, `maxHeight`, `pageSizes`
4. Use CSS variables `var()` para dark mode
5. Mantenga el prefijo K y la estetica Khor
6. **NOTA**: data-table.tsx importa `@tanstack/react-table@8.20.5` — necesitara instalacion via npm

---

## 5. COMPONENTES DE ALTA PRIORIDAD PARA INTEGRACION

Los componentes marcados como **Alta prioridad** que deberian integrarse primero:

1. **KDataTable v2** (data-table.tsx) — Motor TanStack, column toggle, row select, export
2. **KDatePicker** (date-picker.tsx) — Selector de fecha esencial para formularios
3. **KDateRangePicker** (date-range-picker.tsx) — Rango de fechas para reportes/filtros
4. **KInputNumber** (input-number.tsx) — Input numerico con controles
5. **KAutocomplete** (autocomplete.tsx) — Busqueda con sugerencias
6. **KSelectAdvanced** (select-advanced.tsx) — Multi-select con tags
7. **KUpload** (upload.tsx) — Subida de archivos con drag & drop
8. **KTree** (tree.tsx) — Vista de arbol
9. **KTimeline** (timeline.tsx) — Linea de tiempo
10. **KTour** (tour.tsx) — Onboarding guiado
11. **KDescriptions** (descriptions.tsx) — Detalle clave-valor
12. **KFormList** (form-list.tsx) — Formularios dinamicos
13. **KPopconfirm** (popconfirm.tsx) — Confirmacion en popover
14. **KModalConfirm** (modal-confirm.tsx) — Confirmacion programatica
15. **KResult** (result.tsx) — Paginas de resultado/estado
16. **KSegmented** (segmented.tsx) — Control segmentado

---

## 6. NOTAS IMPORTANTES

### Sobre AntD
Varios componentes en Elements son extracciones/reimplementaciones de patrones AntD:
- cascader, descriptions, float-button, mentions, popconfirm, result, segmented,
  statistic, steps, tag, timeline, tour, transfer, tree, tree-select, typography, watermark
  
Estan **reimplementados en React puro** (sin dependencia de antd), usando:
- Lucide React para iconos
- Radix UI para primitivas accesibles
- CSS variables para temas
- Tailwind para layout

**No introducen dependencia de antd**, lo cual es correcto segun las reglas del proyecto.

### Sobre la tabla data-table.tsx
Importa `@tanstack/react-table@8.20.5` que **NO esta instalado** actualmente.
Antes de integrar, se necesita: `install_package(['@tanstack/react-table'])`

### Sobre dark mode
Los componentes de Elements usan `var(--border-primary)`, `var(--bg-secondary)`, etc.
que son CSS variables, lo cual los hace **compatibles con dark mode** de forma nativa.
Esto es una ventaja vs los componentes Khor actuales que usan `khorTokens` inline.