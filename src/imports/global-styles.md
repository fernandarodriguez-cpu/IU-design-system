🎨 Estilos Globales: Cimientos del Sistema Khor

Este documento define las reglas visuales atómicas que rigen todos los componentes del sistema, garantizando coherencia y escalabilidad.

1. Tipografía (Typography)

Fuente Principal: Montserrat (SaaS / Moderno)

Fuente Secundaria: Plus Jakarta Sans (Opcional para UI densa)

1.1 Escala de Tamaños y Pesos

Nivel

Tamaño (px)

Line-Height

Peso (Weight)

Uso

H1
38px
1.2
700 (Bold)
Títulos de sección principal.
H2
30px
1.2
700 (Bold)
Títulos de módulos.
H3
24px
1.3
600 (SemiBold)
Títulos de tarjetas o modales.
Body LG
16px
1.5
400 (Regular)
Párrafos de lectura larga.
Body MD
14px
1.5
400 (Regular)
Texto estándar de la interfaz.
Small
12px
1.5
500 (Medium)
Etiquetas, tooltips y captions.
2. Espaciado y Layout (Grid System)

Basado en un sistema modular de 8px.

Token

Valor

Uso Sugerido

spacing.xs
4px
Entre icono y texto.
spacing.sm
8px
Padding interno de botones pequeños.
spacing.md
16px
Padding estándar de contenedores.
spacing.lg
24px
Espacio entre secciones.
spacing.xl
40px
Márgenes laterales de la página.
2.1 Grid de Contenido

● Columnas (Escritorio): 12 columnas con 24px de gutter.
● Columnas (Móvil): 4 columnas con 16px de margen.
3. Sombras y Elevación (Shadows)

Diseñadas para crear jerarquía visual sobre el fondo Azul Profundo o Blanco.

● Elevation Low (sm): 0 2px 4px rgba(0,0,0,0.05) - Para tarjetas simples.
● Elevation Medium (md): 0 4px 12px rgba(0,0,0,0.08) - Para Dropdowns y Menús.
● Elevation High (lg): 0 12px 32px rgba(5, 23, 88, 0.12) - Para Modales y Drawers.
4. Iconografía (Iconography)

Set Oficial: Lucide React (Estilo Outline, 2px stroke).

Reglas de Uso:

1. Grosor de trazo: Siempre 2px.
2. Tamaño:
○ Small: 16x16px (dentro de botones).
○ Medium: 20x20px (estándar).
○ Large: 24x24px (títulos de sección).
3. Color: Debe heredar el color del texto adyacente para mantener el contraste.
5. Layout Maestro (Shell)

● Sidebar Width: 260px (Azul Profundo #051758).
● Header Height: 64px (Blanco con sombra sm).
● Main Canvas: Fondo Neutro Muy Claro (#EDF0F1).