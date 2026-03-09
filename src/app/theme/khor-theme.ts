/* ─────────────────────────────────────────────
   Khor Design Tokens  (JavaScript)
   Fuente de verdad para tokens consumidos en JS.
   Basado en los lineamientos de global-styles.md
   ───────────────────────────────────────────── */

export const khorTokens = {
  colors: {
    brand: {
      primary: '#E04D36',
      primaryHover: '#e8644f',
      primaryActive: '#c9442f',
      navy: '#051758',
      navyHover: '#0a2270',
      navyActive: '#030f40',
      accent: '#FF9500',
      accentHover: '#ffaa33',
      accentActive: '#e68600',
    },
    neutral: {
      50: '#FFFFFF',
      100: '#EDF0F1',
      200: '#D5DBE0',
      300: '#A0AEC0',
      400: '#718096',
      500: '#4A5568',
      900: '#000000',
    },
    feedback: {
      success: '#2E7D32',
      successLight: '#E8F5E9',
      error: '#D32F2F',
      errorLight: '#FFEBEE',
      warning: '#FF9500',
      warningLight: '#FFF3E0',
      info: '#051758',
      infoLight: '#E3F2FD',
    },
  },
  typography: {
    fontPrimary: "'Raleway', sans-serif",
    fontSecondary: "'Plus Jakarta Sans', sans-serif",
    h1: { size: 38, weight: 700, lineHeight: 1.2 },
    h2: { size: 30, weight: 700, lineHeight: 1.2 },
    h3: { size: 24, weight: 600, lineHeight: 1.3 },
    bodyLg: { size: 16, weight: 400, lineHeight: 1.5 },
    bodyMd: { size: 14, weight: 400, lineHeight: 1.5 },
    small: { size: 12, weight: 500, lineHeight: 1.5 },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.05)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
    lg: '0 12px 32px rgba(5,23,88,0.12)',
  },
  radius: {
    sm: 6,
    md: 8,
    lg: 10,
    xl: 14,
  },
  layout: {
    sidebarWidth: 260,
    headerHeight: 64,
  },
  icon: {
    sm: 16,
    md: 20,
    lg: 24,
    strokeWidth: 2,
  },
} as const;
