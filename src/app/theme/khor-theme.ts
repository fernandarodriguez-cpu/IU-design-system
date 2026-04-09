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
      secondary: 'var(--khor-secondary)',
      secondaryHover: 'var(--khor-secondary-hover)',
      secondaryActive: 'var(--khor-secondary-active)',
      accent: 'var(--khor-accent)',
      accentHover: 'var(--khor-accent-hover)',
      accentActive: 'var(--khor-accent-active)',
      // Legacy alias
      navy: 'var(--khor-navy)',
      navyHover: 'var(--khor-navy-hover)',
      navyActive: 'var(--khor-navy-active)',
    },
    neutral: {
      50: 'var(--khor-neutral-50)',
      100: 'var(--khor-neutral-100)',
      200: 'var(--khor-neutral-200)',
      300: 'var(--khor-neutral-300)',
      400: 'var(--khor-neutral-400)',
      500: 'var(--khor-neutral-500)',
      600: 'var(--khor-neutral-600)',
      700: 'var(--khor-neutral-700)',
      800: 'var(--khor-neutral-800)',
      900: 'var(--khor-neutral-900)',
    },
    neutralSecondary: {
      50: 'var(--khor-neutral-secondary-50)',
      100: 'var(--khor-neutral-secondary-100)',
      200: 'var(--khor-neutral-secondary-200)',
      300: 'var(--khor-neutral-secondary-300)',
      400: 'var(--khor-neutral-secondary-400)',
      500: 'var(--khor-neutral-secondary-500)',
      600: 'var(--khor-neutral-secondary-600)',
      700: 'var(--khor-neutral-secondary-700)',
      800: 'var(--khor-neutral-secondary-800)',
      900: 'var(--khor-neutral-secondary-900)',
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
      processing: 'var(--khor-feedback-processing)',
      volcano: 'var(--khor-feedback-volcano)',
      gold: 'var(--khor-feedback-gold)',
      lime: 'var(--khor-feedback-lime)',
      purple: 'var(--khor-feedback-purple)',
    },
  },
  typography: {
    fontPrimary: "var(--font-primary, 'Montserrat', sans-serif)",
    fontSecondary: "var(--font-secondary, 'Plus Jakarta Sans', sans-serif)",
    h1: { size: 'var(--khor-font-size-h1)', weight: 700, lineHeight: 'var(--khor-line-height-heading)' },
    h2: { size: 'var(--khor-font-size-h2)', weight: 700, lineHeight: 'var(--khor-line-height-heading)' },
    h3: { size: 'var(--khor-font-size-h3)', weight: 600, lineHeight: 'var(--khor-line-height-heading)' },
    h4: { size: 'var(--khor-font-size-h4)', weight: 600, lineHeight: 'var(--khor-line-height-heading)' },
    h5: { size: 'var(--khor-font-size-h5)', weight: 600, lineHeight: 'var(--khor-line-height-body)' },
    h6: { size: 'var(--khor-font-size-h6)', weight: 600, lineHeight: 'var(--khor-line-height-body)' },
    bodyLg: { size: 'var(--khor-font-size-body-lg)', weight: 400, lineHeight: 'var(--khor-line-height-body)' },
    bodyMd: { size: 'var(--khor-font-size-body-md)', weight: 400, lineHeight: 'var(--khor-line-height-body)' },
    small: { size: 'var(--khor-font-size-body-sm)', weight: 500, lineHeight: 'var(--khor-line-height-body)' },
    // Myna-Adopted Extended Scale
    display1: { size: 'var(--khor-font-size-display-1)', weight: 800, lineHeight: 'var(--khor-line-height-display)' },
    display2: { size: 'var(--khor-font-size-display-2)', weight: 800, lineHeight: 'var(--khor-line-height-display)' },
    caption: { size: 'var(--khor-font-size-body-sm)', weight: 400, lineHeight: 1.4 },
    overline: { size: 'var(--khor-font-size-body-xs)', weight: 600, lineHeight: 1.2, letterSpacing: '0.05em' },
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
    xl: 'var(--khor-shadow-xl)',
    '2xl': 'var(--khor-shadow-2xl)',
    inner: 'var(--khor-shadow-inner)',
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
      ghost: { hover: 'var(--khor-action-ghost-hover)' },
      disabled: { bg: 'var(--khor-action-disabled-bg)', text: 'var(--khor-action-disabled-text)' },
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
      muted: 'var(--khor-border-muted)',
      strong: 'var(--khor-border-strong)',
      hover: 'var(--khor-border-hover)',
      focus: 'var(--khor-border-focus)',
      error: 'var(--khor-border-error)',
      disabled: 'var(--khor-border-disabled)',
    },
    focus: {
      ring: 'var(--khor-focus-ring)',
      ringWidth: 'var(--khor-focus-ring-width)',
      ringOffset: 'var(--khor-focus-ring-offset)',
    },
  },
  motion: {
    duration: { instant: 80, fast: 100, normal: 200, slow: 400, slower: 600 },
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
 * (like Canvas, calculations, or third-party libraries requiring raw values).
 */
export const khorStaticTokens = {
  colors: {
    primary: '#E04D36',
    primaryHover: '#e8644f',
    secondary: '#051758',
    secondaryHover: '#0a2270',
    accent: '#FF9500',
    success: '#2E7D32',
    error: '#D32F2F',
    warning: '#FF9500',
    info: '#051758',
    white: '#FFFFFF',
    black: '#000000',
    // Legacy alias
    navy: '#051758',
  },
  radius: {
    sm: 6,
    md: 8,
    lg: 10,
    xl: 14,
  },
  typography: {
    fontPrimary: "'Montserrat', sans-serif",
    fontSecondary: "'Plus Jakarta Sans', sans-serif",
  }
} as const;
