# Khor Design System — Sugerencias de Mejora

> Documento de propuestas de alto valor para diseñadores y desarrolladores.  
> Actualizado: 9 Mar 2026 | v2.3.0 "Prism"

---

## Para Diseñadores

### 1. Token Diff Viewer
Al modificar el tema en el Theming en Vivo, mostrar un diff visual lado a lado (antes vs despues) de cada token cambiado, con porcentaje de diferencia de contraste y luminosidad. Util para aprobar cambios en revisiones de diseno con stakeholders.

**Valor:** Reduce fricciones en la aprobacion de cambios de marca.  
**Complejidad estimada:** Media  
**Dependencias:** ThemingPage existente

---

### 2. Component Anatomy Viewer
Vista "rayos X" de cada componente que muestra padding, margin, border-radius y tokens aplicados como overlay visual interactivo (estilo DevTools pero para tokens de diseno). Al hacer hover sobre cada zona se muestra el token y su valor actual.

**Valor:** Elimina ambiguedades en la inspeccion de componentes.  
**Complejidad estimada:** Alta  
**Dependencias:** ComponentDoc, khorTokens

---

### 3. Figma Plugin Sync Bidireccional
Generar un manifiesto JSON que un plugin de Figma pueda consumir para actualizar Variables automaticamente, y viceversa: importar Variables de Figma para actualizar los tokens del sistema. Soporte para collections (colores, tipografia, spacing).

**Valor:** Conecta diseno y codigo sin esfuerzo manual.  
**Complejidad estimada:** Alta  
**Dependencias:** FigmaExportPage, khorTokens, Figma Plugin API

---

### 4. Design Handoff Page
Vista por componente con specs completas (spacing exacto en px, colores con hex y token name, tipografia, estados hover/focus/active/disabled) lista para copiar, orientada a entregar disenos a desarrollo sin ambiguedad. Incluye anotaciones de accesibilidad.

**Valor:** Agiliza handoff designer -> developer.  
**Complejidad estimada:** Media  
**Dependencias:** ComponentDoc, khorTokens

---

### 5. Icon Explorer
Catalogo visual de todos los iconos Lucide usados en el sistema con busqueda por nombre, categorias (navigation, actions, status, media), preview en diferentes tamanos (16, 20, 24, 32px), y snippet de importacion copiable. Opcionalmente, comparar con otros icon packs.

**Valor:** Centraliza la seleccion de iconos y evita duplicados.  
**Complejidad estimada:** Baja  
**Dependencias:** lucide-react

---

### 6. Color Palette Generator
Herramienta que a partir de un color primario genera automaticamente una paleta completa de 10 tonos (50-900), con variantes para fondos claros, bordes, hover y texto. Incluye preview de accesibilidad WCAG para cada tono generado.

**Valor:** Permite explorar rapidamente variantes de marca.  
**Complejidad estimada:** Media  
**Dependencias:** ThemingPage, WCAGCheckerPage

---

### 7. Responsive Preview Mode
Vista que muestre cada componente y patron en 4 breakpoints simultaneamente (mobile 375px, tablet 768px, desktop 1280px, ultrawide 1920px) para validar que el sistema se adapta correctamente. Panel de controles para rotar orientacion y simular dispositivos.

**Valor:** Garantiza calidad responsive sin salir de la plataforma.  
**Complejidad estimada:** Media  
**Dependencias:** PatternsPage, Templates

---

## Para Desarrolladores

### 8. Component API Playground Avanzado
Editor de props tipo Storybook con controles auto-generados desde las PropDef de cada componente: `select` para enums, `toggle` para booleans, `input` para strings, `slider` para numeros. Actualiza el codigo copiable en tiempo real y muestra el JSX resultante con syntax highlighting.

**Valor:** Documenta APIs de forma interactiva y reduce errores de uso.  
**Complejidad estimada:** Alta  
**Dependencias:** ComponentDoc, todos los componentes

---

### 9. Snippet Generator Contextual
Al combinar componentes en Patterns, generar automaticamente el snippet completo con: imports correctos, TypeScript types, estado inicial (useState), handlers, y comentarios explicativos. Boton "Copiar todo" que genera un archivo .tsx funcional.

**Valor:** De prototipo a produccion en un clic.  
**Complejidad estimada:** Media  
**Dependencias:** PatternsPage

---

### 10. Performance Metrics Dashboard
Medir y mostrar bundle size estimado de cada componente (gzipped), tree-shaking status, numero de dependencias internas, y grafico de dependencias entre atomos -> moleculas -> organismos -> templates. Alertas para componentes que excedan un umbral de tamano.

**Valor:** Optimiza el peso del sistema y su impacto en produccion.  
**Complejidad estimada:** Alta  
**Dependencias:** webpack/vite bundle analyzer

---

### 11. Migration Guide Generator
Herramienta que al cambiar tokens o romper APIs (breaking changes) genere automaticamente una guia de migracion con: search-and-replace sugerido, diff de props cambiadas, script codemod para migracion automatica, y timeline de deprecacion.

**Valor:** Reduce friccion en actualizaciones del sistema.  
**Complejidad estimada:** Alta  
**Dependencias:** ChangelogPage, khorTokens

---

### 12. CLI / Copy-Paste Install
Boton "Instalar en mi proyecto" por componente que genere: comando npm para dependencias, archivos de tokens necesarios, y el componente individual con sus dependencias internas resueltas. Soporte para instalar un subconjunto del sistema (solo atomos, solo un organismo con sus deps).

**Valor:** Permite adopcion incremental del sistema.  
**Complejidad estimada:** Alta  
**Dependencias:** Todos los componentes, khorTokens

---

### 13. Component Testing Recipes
Para cada componente, proveer recetas de testing con React Testing Library y Vitest: tests de renderizado, tests de interaccion (click, type, select), tests de accesibilidad (axe-core), y tests de snapshot. Codigo copiable por componente.

**Valor:** Promueve calidad y cobertura de tests.  
**Complejidad estimada:** Media  
**Dependencias:** @testing-library/react, vitest

---

## Transversales (Diseno + Dev)

### 14. Component Usage Analytics
Dashboard que muestre: que componentes se usan mas en los Patterns/Templates, cuales no tienen playground, cobertura de documentacion (% de componentes con docs completas, AI notes, playground), y matrix de combinaciones probadas.

**Valor:** Identifica brechas y prioriza mejoras.  
**Complejidad estimada:** Media  
**Dependencias:** PatternsPage, ComponentDoc

---

### 15. Visual Regression Baseline
Captura automatica de screenshots de cada componente en cada variante/estado como baseline para detectar regresiones visuales al cambiar tokens. Comparador de imagenes con resaltado de diferencias pixel-a-pixel. Integracion con CI/CD opcional.

**Valor:** Previene regresiones visuales invisibles.  
**Complejidad estimada:** Alta  
**Dependencias:** Playwright/Puppeteer, CI pipeline

---

### 16. Multi-brand Theme Gallery
Expandir los presets actuales a una galeria publica donde equipos puedan explorar, previsualizar y descargar temas completos con preview full-page de como se ve cada template con el tema aplicado. Soporte para importar/exportar temas como archivos .khor-theme.

**Valor:** Acelera el onboarding de nuevas marcas.  
**Complejidad estimada:** Media  
**Dependencias:** ThemingPage, Templates

---

### 17. Accessibility Simulation Mode
Modo de simulacion que aplica filtros CSS para mostrar como ve la interfaz un usuario con: deuteranopia (rojo-verde), protanopia, tritanopia, acromatopsia (escala de grises), y vision borrosa. Toggle rapido desde el header para validar disenos sin herramientas externas.

**Valor:** Promueve diseno inclusivo de forma practica.  
**Complejidad estimada:** Baja  
**Dependencias:** CSS filters, ThemeContext

---

### 18. Component Composition Builder
Editor visual drag-and-drop donde el usuario puede arrastrar atomos y moleculas para construir nuevos organismos o patrones. Genera el JSX resultante automaticamente con props configurables. Permite guardar composiciones como patrones custom.

**Valor:** Democratiza la creacion de nuevos patrones.  
**Complejidad estimada:** Muy Alta  
**Dependencias:** react-dnd, todos los componentes

---

### 19. Internationalization (i18n) Preview
Panel que permite previsualizar todos los componentes con textos en diferentes idiomas (espanol, ingles, portugues, aleman) para validar que layouts no se rompen con textos mas largos o cortos. Incluye textos de ejemplo RTL (arabe/hebreo).

**Valor:** Valida robustez del sistema ante multiples idiomas.  
**Complejidad estimada:** Media  
**Dependencias:** Textos de ejemplo, ComponentDoc

---

### 20. Design Token Linter
Herramienta que analiza el codigo de los componentes y detecta: valores hardcodeados que deberian ser tokens (e.g., `color: '#E04D36'` en vez de `color: t.colors.brand.primary`), inconsistencias de espaciado, y usos de tokens deprecated. Reporta con sugerencias de fix.

**Valor:** Garantiza consistencia y adherencia al sistema.  
**Complejidad estimada:** Alta  
**Dependencias:** AST parsing, khorTokens

---

## Matriz de Prioridad

| #  | Sugerencia                    | Valor   | Complejidad | Prioridad |
|----|-------------------------------|---------|-------------|-----------|
| 5  | Icon Explorer                 | Alto    | Baja        | P1        |
| 17 | Accessibility Simulation      | Alto    | Baja        | P1        |
| 1  | Token Diff Viewer             | Alto    | Media       | P1        |
| 6  | Color Palette Generator       | Alto    | Media       | P1        |
| 9  | Snippet Generator Contextual  | Alto    | Media       | P2        |
| 14 | Component Usage Analytics     | Alto    | Media       | P2        |
| 4  | Design Handoff Page           | Alto    | Media       | P2        |
| 7  | Responsive Preview Mode       | Alto    | Media       | P2        |
| 16 | Multi-brand Theme Gallery     | Medio   | Media       | P2        |
| 13 | Component Testing Recipes     | Alto    | Media       | P2        |
| 19 | i18n Preview                  | Medio   | Media       | P3        |
| 8  | API Playground Avanzado       | Alto    | Alta        | P3        |
| 2  | Component Anatomy Viewer      | Alto    | Alta        | P3        |
| 3  | Figma Plugin Sync             | Muy Alto| Alta        | P3        |
| 20 | Design Token Linter           | Alto    | Alta        | P3        |
| 10 | Performance Metrics           | Medio   | Alta        | P4        |
| 11 | Migration Guide Generator     | Medio   | Alta        | P4        |
| 12 | CLI / Copy-Paste Install      | Alto    | Alta        | P4        |
| 15 | Visual Regression Baseline    | Alto    | Alta        | P4        |
| 18 | Composition Builder           | Alto    | Muy Alta    | P4        |

---

*Documento generado para el equipo Khor. Revision periodica recomendada al cierre de cada release.*
