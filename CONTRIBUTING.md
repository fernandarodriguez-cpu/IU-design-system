# Contribuyendo a Khor Design System

¡Gracias por ayudar a construir el sistema de diseño de Khor! Este documento detalla el proceso para proponer cambios y mantener la calidad de clase mundial.

## Principios de Diseño
1. **Tokens Primero**: Nunca uses valores hardcoded. Usa \`khorTokens\` en JS o \`var(--khor-*)\` en CSS.
2. **Accesibilidad (A11y)**: Todo componente debe ser operable vía teclado y cumplir con contrastes WCAG AA.
3. **Composición sobre Configuración**: Prefiere componentes pequeños y combinables antes que props monolíticas.

## Proceso de Desarrollo
1. **Ramas**: Crea una rama descriptiva como \`feat/nuevo-boton\` o \`fix/padding-input\`.
2. **Versionado**: Seguimos [SemVer](https://semver.org/).
   - Fixes: \`x.x.PATCH\`
   - Features: \`x.MINOR.x\`
   - Breaking: \`MAJOR.x.x\`
3. **Documentación**: Si creas un componente, DEBES añadir su respectivo playground en la página correspondiente (Atoms, Molecules u Organisms).

## Destructuring & DOM Hygiene
Es CRÍTICO que las props personalizadas del sistema (como \`variant\`, \`size\`, \`fullWidth\`, etc.) **NO** se filtren al elemento HTML nativo.

**Mal:**
\`\`\`tsx
export const KComponent = (props) => <div {...props} />;
// Esto inyecta variant="primary" al <div>, causando warnings de React.
\`\`\`

**Bien:**
\`\`\`tsx
export const KComponent = ({ variant, size, ...props }) => <div {...props} />;
// Ahora props solo contiene atributos estándar (className, style, id, etc.)
\`\`\`

## Roadmap de Clase Mundial
Estamos trabajando para llegar al 100/100 en la auditoría. Los pilares actuales son:
- Higiene total del DOM (Destructuring masivo).
- Soporte RTL.
- Motion tokens sistematizados.
- Documentación dinámica para IA.
