/* ─────────────────────────────────────────────
   Khor Design Tokens  (JavaScript)
   Fuente de verdad para tokens consumidos en JS.
   
   v2.0: Migrado a CSS custom properties var()
   para soporte automático de Dark Mode.
   Los componentes que usen estos tokens en inline
   styles responderán automáticamente al toggle
   de tema .dark en el <html>.
   ───────────────────────────────────────────── */

export const khorTokens = {
  colors: {
    brand: {
      primary: 'var(--khor-primary)',
      primaryHover: 'var(--khor-primary-hover)',
      primaryActive: 'var(--khor-primary-active)',
      navy: 'var(--khor-navy)',
      navyHover: 'var(--khor-navy-hover)',
      navyActive: 'var(--khor-navy-active)',
      accent: 'var(--khor-accent)',
      accentHover: 'var(--khor-accent-hover)',
      accentActive: 'var(--khor-accent-active)',
    },
    neutral: {
      50: 'var(--khor-neutral-50)',
      100: 'var(--khor-neutral-100)',
      200: 'var(--khor-neutral-200)',
      300: 'var(--khor-neutral-300)',
      400: 'var(--khor-neutral-400)',
      500: 'var(--khor-neutral-500)',
      900: 'var(--khor-neutral-900)',
    },
    feedback: {
      success: 'var(--khor-success)',
      successLight: 'var(--khor-success-light)',
      error: 'var(--khor-error)',
      errorLight: 'var(--khor-error-light)',
      warning: 'var(--khor-warning)',
      warningLight: 'var(--khor-warning-light)',
      info: 'var(--khor-info)',
      infoLight: 'var(--khor-info-light)',
    },
  },
  typography: {
    fontPrimary: "var(--font-primary, 'Raleway', sans-serif)",
    fontSecondary: "var(--font-secondary, 'Plus Jakarta Sans', sans-serif)",
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
    sm: 'var(--khor-shadow-sm)',
    md: 'var(--khor-shadow-md)',
    lg: 'var(--khor-shadow-lg)',
  },
  radius: {
    sm: 'var(--khor-radius-sm, 6px)' as unknown as number,
    md: 'var(--khor-radius-md, 8px)' as unknown as number,
    lg: 'var(--khor-radius-lg, 10px)' as unknown as number,
    xl: 'var(--khor-radius-xl, 14px)' as unknown as number,
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
  semantic: {
    action: {
      primary: { default: 'var(--khor-action-primary-default)', hover: 'var(--khor-action-primary-hover)', active: 'var(--khor-action-primary-active)' },
      secondary: { default: 'var(--khor-action-secondary-default)', hover: 'var(--khor-action-secondary-hover)', active: 'var(--khor-action-secondary-active)' },
      danger: { default: 'var(--khor-action-danger-default)', hover: 'var(--khor-action-danger-hover)', active: 'var(--khor-action-danger-active)' },
    },
    surface: {
      page: 'var(--khor-surface-page)',
      card: 'var(--khor-surface-card)',
      raised: 'var(--khor-surface-raised)',
      overlay: 'var(--khor-surface-overlay)',
    },
    text: {
      primary: 'var(--khor-text-primary)',
      secondary: 'var(--khor-text-secondary)',
      muted: 'var(--khor-text-muted)',
      disabled: 'var(--khor-text-disabled)',
      onAction: 'var(--khor-text-on-action)',
      link: 'var(--khor-text-link)',
    },
    border: {
      default: 'var(--khor-border-default)',
      hover: 'var(--khor-border-hover)',
      focus: 'var(--khor-border-focus)',
      error: 'var(--khor-border-error)',
    },
    focus: {
      ring: 'var(--khor-focus-ring)',
      ringWidth: 'var(--khor-focus-ring-width)',
      ringOffset: 'var(--khor-focus-ring-offset)',
    },
  },
  motion: {
    duration: { fast: 100, normal: 200, slow: 400, slower: 600 },
    easing: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      enter: 'cubic-bezier(0, 0, 0.2, 1)',
      exit: 'cubic-bezier(0.4, 0, 1, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    spring: { stiffness: 300, damping: 30 },
  },
} as const;

/**
 * Static token values for contexts that can't use CSS variables 
 * (like Ant Design's ConfigProvider which needs raw strings/numbers to calculate derivatives).
 */
export const khorStaticTokens = {
  colors: {
    primary: '#E04D36',
    primaryHover: '#e8644f',
    navy: '#051758',
    accent: '#FF9500',
    success: '#2E7D32',
    error: '#D32F2F',
    warning: '#FF9500', // Or #E68600
    info: '#051758',
    white: '#FFFFFF',
    black: '#000000',
  },
  radius: {
    sm: 6,
    md: 8,
    lg: 10,
    xl: 14,
  },
  typography: {
    fontPrimary: "'Raleway', sans-serif",
    fontSecondary: "'Plus Jakarta Sans', sans-serif",
  }
} as const;
