# Khor Advanced AI Plugin: Manifiesto de Visión y Arquitectura

## 📌 Resumen Ejecutivo
El "Tercer Plugin Avanzado" de Khor no es solo una herramienta de sincronización de tokens; es un **motor de reconstrucción semántica**. Su objetivo es permitir que los diseñadores generen, modifiquen y validen componentes complejos en herramientas de diseño (priorizando Penpot) utilizando la misma "fuente de verdad" que consumen los desarrolladores y las IAs: el **KDS Markdown AI Guide**.

---

## 🏗️ Arquitectura del Sistema

### 1. El Núcleo: Markdown-as-Context (MAC)
A diferencia de los plugins tradicionales que dependen de JSONs rígidos, este plugin utiliza el archivo `.md` generado por Khor como contexto primario.
- **Por qué**: El Markdown contiene la "intención" (ej: "Usa este botón para acciones destructivas"), lo cual es oro puro para un LLM.
- **Flujo**: Plugin -> Lee `kds_ai_guide.md` -> Envía fragmento relevante a LLM -> LLM devuelve instrucciones de dibujo SVG/Penpot.

### 2. Capa de Inteligencia (LLM Connector)
El plugin integra un conector con modelos de lenguaje (GPT-4o / Claude 3.5 Sonnet) para interpretar los requisitos del usuario.
- **Prompt Engineering**: El plugin actuará como un traductor entre las especificaciones del MD y el SDK de Penpot.
- **Generación Dinámica**: "Crea una variante de KSkeleton para un perfil de usuario usando los tokens de Blur 'md'".

### 3. Sincronización Bidireccional de Tokens
Integración nativa con la nueva escala de tokens:
- **Blur Engine**: Soporte para los 8 niveles de Backdrop y Layer blur detectados en la v10.4.5 (none, xs, sm, md, lg, xl, 2xl, 3xl).
- **Theme Sync**: Cambio instantáneo entre temas Claro/Oscuro en la mesa de trabajo de diseño basándose en los tokens reales del código.

---

## 🚀 Fases de Desarrollo

### Fase 1: Cimientos en Penpot (Penpot-Zero)
- Inicialización del plugin con el SDK oficial.
- Mapeo básico de colores y tipografía desde `theme.css`.

### Fase 2: El Motor de Reconstrucción (Markdown Parser)
- Desarrollo del parser que fragmenta el `ai_guide.md` en unidades de conocimiento consumibles por el plugin.
- Primera prueba de "Dibujo Asistido": Crear un `KButton` a partir de su descripción en MD.

### Fase 3: AI-Powered UI Workshop
- Interfaz de chat dentro del plugin para manipular componentes.
- Implementación de reglas de gobernanza: El plugin no permitirá diseños que rompan las reglas definidas en el MD (ej: "No uses Blur lg sobre superficies oscuras").

---

## ⚠️ Desafíos Técnicos
1. **Latencia**: La generación por IA debe ser lo suficientemente rápida para no romper el flujo creativo.
2. **Precisión**: Garantizar que el componente generado en Penpot sea visualmente idéntico al componente React.
3. **Consumo de Tokens (API)**: Gestión de costos y claves de API para el acceso al LLM.

---
> [!TIP]
> **Conclusión**: Este proyecto posiciona a Khor no solo como un Design System, sino como una **infraestructura de diseño asistido por IA**, cerrando la brecha entre el código y el lienzo creativo de forma definitiva.
