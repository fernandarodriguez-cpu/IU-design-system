const fs = require('fs');
const path = require('path');

// Estos valores vienen directamente de khorStaticTokens en khor-theme.ts
const staticTokens = {
  colors: {
    primary: '#E04D36',
    secondary: '#051758',
    accent: '#FF9500',
    success: '#2E7D32',
    error: '#B71C1C',
    warning: '#E07800',
    info: '#1565C0',
    white: '#FFFFFF',
    black: '#000000',
  },
  radius: { sm: 6, md: 8, lg: 10, xl: 14 },
  spacing: { xxs: 2, xs: 4, sm: 8, md: 16, lg: 24, xl: 40, xxl: 48 }
};

const tokensStudioJSON = {
  "global": {
    "colors": {
      "brand": {
        "primary": { "value": staticTokens.colors.primary, "type": "color" },
        "secondary": { "value": staticTokens.colors.secondary, "type": "color" },
        "accent": { "value": staticTokens.colors.accent, "type": "color" }
      },
      "feedback": {
        "success": { "value": staticTokens.colors.success, "type": "color" },
        "error": { "value": staticTokens.colors.error, "type": "color" },
        "warning": { "value": staticTokens.colors.warning, "type": "color" },
        "info": { "value": staticTokens.colors.info, "type": "color" }
      },
      "neutral": {
        "white": { "value": staticTokens.colors.white, "type": "color" },
        "black": { "value": staticTokens.colors.black, "type": "color" }
      }
    },
    "spacing": Object.fromEntries(Object.entries(staticTokens.spacing).map(([k, v]) => [k, { "value": `${v}px`, "type": "spacing" }])),
    "radius": Object.fromEntries(Object.entries(staticTokens.radius).map(([k, v]) => [k, { "value": `${v}px`, "type": "borderRadius" }]))
  }
};

fs.writeFileSync(
  path.join(__dirname, '../../kds-v6-tokens-studio.json'),
  JSON.stringify(tokensStudioJSON, null, 2)
);

console.log('✅ kds-v6-tokens-studio.json generado con éxito.');
