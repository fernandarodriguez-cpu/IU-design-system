# Pull Request Checklist

## 🛠️ Descripción de Cambios
Proporcione un breve resumen de los cambios realizados y el problema que resuelven.

## 📋 Checklist de Calidad
Por favor, marque las casillas que correspondan antes de solicitar revisión:

- [ ] **Versión Semántica:** ¿Se incrementó la versión en `AppShell.tsx`, `AIExportPage.tsx` y `ChangelogPage.tsx`?
- [ ] **Changelog:** ¿Se añadió una entrada detallada en `CHANGELOG.md` y en la `ChangelogPage.tsx`?
- [ ] **Higiene del DOM:** ¿Se aplicó destructuring para evitar fugas de props personalizadas (\`variant\`, \`size\`, etc.) al DOM?
- [ ] **Accesibilidad (WCAG):**
    - [ ] ¿El componente es navegable por teclado?
    - [ ] ¿Tiene etiquetas ARIA descriptivas?
    - [ ] ¿Pasa las pruebas de contraste AA (4.5:1)?
- [ ] **Tokens:** ¿Se utilizaron exclusivamente \`khorTokens\` o variables CSS (\`var(--khor-*)\`) en lugar de valores hardcoded?
- [ ] **IA Guide:** ¿Se verificó que los cambios se reflejen correctamente en la herramienta "Exportar Guía para IA"?

## 📸 Capturas de Pantalla (si aplica)
Adjunte imágenes o grabaciones si hay cambios visuales.
