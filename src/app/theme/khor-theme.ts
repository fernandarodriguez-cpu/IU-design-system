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
      success50: 'var(--khor-success-50)',
      success100: 'var(--khor-success-100)',
      success200: 'var(--khor-success-200)',
      success300: 'var(--khor-success-300)',
      success400: 'var(--khor-success-400)',
      success500: 'var(--khor-success-500)',
      success600: 'var(--khor-success-600)',
      success700: 'var(--khor-success-700)',
      success800: 'var(--khor-success-800)',
      success900: 'var(--khor-success-900)',

      error: 'var(--khor-error)',
      error50: 'var(--khor-error-50)',
      error100: 'var(--khor-error-100)',
      error200: 'var(--khor-error-200)',
      error300: 'var(--khor-error-300)',
      error400: 'var(--khor-error-400)',
      error500: 'var(--khor-error-500)',
      error600: 'var(--khor-error-600)',
      error700: 'var(--khor-error-700)',
      error800: 'var(--khor-error-800)',
      error900: 'var(--khor-error-900)',

      warning: 'var(--khor-warning)',
      warning50: 'var(--khor-warning-50)',
      warning100: 'var(--khor-warning-100)',
      warning200: 'var(--khor-warning-200)',
      warning300: 'var(--khor-warning-300)',
      warning400: 'var(--khor-warning-400)',
      warning500: 'var(--khor-warning-500)',
      warning600: 'var(--khor-warning-600)',
      warning700: 'var(--khor-warning-700)',
      warning800: 'var(--khor-warning-800)',
      warning900: 'var(--khor-warning-900)',

      info: 'var(--khor-info)',
      info50: 'var(--khor-info-50)',
      info100: 'var(--khor-info-100)',
      info200: 'var(--khor-info-200)',
      info300: 'var(--khor-info-300)',
      info400: 'var(--khor-info-400)',
      info500: 'var(--khor-info-500)',
      info600: 'var(--khor-info-600)',
      info700: 'var(--khor-info-700)',
      info800: 'var(--khor-info-800)',
      info900: 'var(--khor-info-900)',

      teal: 'var(--khor-teal)',
      teal50: 'var(--khor-teal-50)',
      teal100: 'var(--khor-teal-100)',
      teal200: 'var(--khor-teal-200)',
      teal300: 'var(--khor-teal-300)',
      teal400: 'var(--khor-teal-400)',
      teal500: 'var(--khor-teal-500)',
      teal600: 'var(--khor-teal-600)',
      teal700: 'var(--khor-teal-700)',
      teal800: 'var(--khor-teal-800)',
      teal900: 'var(--khor-teal-900)',

      processing: 'var(--khor-feedback-processing)',
      volcano: 'var(--khor-feedback-volcano)',
      gold: 'var(--khor-feedback-gold)',
      lime: 'var(--khor-feedback-lime)',
      purple: 'var(--khor-feedback-purple)',
      white: '#FFFFFF',
      black: '#000000',
      // Semantic Aliases for retrocompatibility
      successLight: 'var(--khor-success-100)',
      warningLight: 'var(--khor-warning-100)',
      errorLight: 'var(--khor-error-100)',
      infoLight: 'var(--khor-info-100)',
    },
  },
  typography: {
    fontPrimary: "var(--font-primary, 'Montserrat', sans-serif)",
    fontSecondary: "var(--font-secondary, 'Plus Jakarta Sans', sans-serif)",
    fontWeights: {
      light: 'var(--khor-font-weight-light)',
      regular: 'var(--khor-font-weight-regular)',
      medium: 'var(--khor-font-weight-medium)',
      semibold: 'var(--khor-font-weight-semibold)',
      bold: 'var(--khor-font-weight-bold)',
      extrabold: 'var(--khor-font-weight-extrabold)',
    },
    letterSpacing: {
      tighter: 'var(--khor-letter-spacing-tighter)',
      tight: 'var(--khor-letter-spacing-tight)',
      normal: 'var(--khor-letter-spacing-normal)',
      wide: 'var(--khor-letter-spacing-wide)',
      wider: 'var(--khor-letter-spacing-wider)',
    },
    h1: { size: 'var(--khor-font-size-h1)', weight: 'var(--khor-font-weight-bold)', lineHeight: 'var(--khor-line-height-heading)' },
    h2: { size: 'var(--khor-font-size-h2)', weight: 'var(--khor-font-weight-bold)', lineHeight: 'var(--khor-line-height-heading)' },
    h3: { size: 'var(--khor-font-size-h3)', weight: 'var(--khor-font-weight-semibold)', lineHeight: 'var(--khor-line-height-heading)' },
    h4: { size: 'var(--khor-font-size-h4)', weight: 'var(--khor-font-weight-semibold)', lineHeight: 'var(--khor-line-height-heading)' },
    h5: { size: 'var(--khor-font-size-h5)', weight: 'var(--khor-font-weight-semibold)', lineHeight: 'var(--khor-line-height-body)' },
    h6: { size: 'var(--khor-font-size-h6)', weight: 'var(--khor-font-weight-semibold)', lineHeight: 'var(--khor-line-height-body)' },
    bodyLg: { size: 'var(--khor-font-size-body-lg)', weight: 'var(--khor-font-weight-regular)', lineHeight: 'var(--khor-line-height-body)' },
    bodyMd: { size: 'var(--khor-font-size-body-md)', weight: 'var(--khor-font-weight-regular)', lineHeight: 'var(--khor-line-height-body)' },
    bodySm: { size: 'var(--khor-font-size-body-sm)', weight: 'var(--khor-font-weight-medium)', lineHeight: 'var(--khor-line-height-body)' },
    bodyXs: { size: 'var(--khor-font-size-body-xs)', weight: 'var(--khor-font-weight-semibold)', lineHeight: 1.2, letterSpacing: 'var(--khor-letter-spacing-wider)' },
    small: { size: 'var(--khor-font-size-body-sm)', weight: 'var(--khor-font-weight-medium)', lineHeight: 'var(--khor-line-height-body)' },
    display1: { size: 'var(--khor-font-size-display-1)', weight: 'var(--khor-font-weight-extrabold)', lineHeight: 'var(--khor-line-height-display)' },
    display2: { size: 'var(--khor-font-size-display-2)', weight: 'var(--khor-font-weight-extrabold)', lineHeight: 'var(--khor-line-height-display)' },
    caption: { size: 'var(--khor-font-size-caption)', weight: 'var(--khor-font-weight-regular)', lineHeight: 1.4 },
    overline: { size: 'var(--khor-font-size-body-xs)', weight: 'var(--khor-font-weight-semibold)', lineHeight: 1.2, letterSpacing: 'var(--khor-letter-spacing-wider)' },
    // New Fluid Aliases
    display2Xl: { size: 'var(--khor-font-size-display-2xl)', weight: 'var(--khor-font-weight-extrabold)', lineHeight: 'var(--khor-line-height-display)' },
    displayXl: { size: 'var(--khor-font-size-display-xl)', weight: 'var(--khor-font-weight-extrabold)', lineHeight: 'var(--khor-line-height-display)' },
    headingLg: { size: 'var(--khor-font-size-heading-lg)', weight: 'var(--khor-font-weight-bold)', lineHeight: 'var(--khor-line-height-heading)' },
    headingMd: { size: 'var(--khor-font-size-heading-md)', weight: 'var(--khor-font-weight-bold)', lineHeight: 'var(--khor-line-height-heading)' },
    headingSm: { size: 'var(--khor-font-size-heading-sm)', weight: 'var(--khor-font-weight-semibold)', lineHeight: 'var(--khor-line-height-heading)' },
    headingXs: { size: 'var(--khor-font-size-heading-xs)', weight: 'var(--khor-font-weight-semibold)', lineHeight: 'var(--khor-line-height-heading)' },
    bodyXl: { size: 'var(--khor-font-size-body-xl)', weight: 'var(--khor-font-weight-regular)', lineHeight: 'var(--khor-line-height-body)' },
    code: { size: 'var(--khor-font-size-code)', weight: 'var(--khor-font-weight-regular)', lineHeight: 'var(--khor-line-height-body)' },
    label: { size: 'var(--khor-font-size-label)', weight: 'var(--khor-font-weight-medium)', lineHeight: 'var(--khor-line-height-body)' },
  },
  sizing: {
    0: 'var(--khor-size-0)',
    1: 'var(--khor-size-1)',
    2: 'var(--khor-size-2)',
    3: 'var(--khor-size-3)',
    4: 'var(--khor-size-4)',
    5: 'var(--khor-size-5)',
    6: 'var(--khor-size-6)',
    8: 'var(--khor-size-8)',
    10: 'var(--khor-size-10)',
    12: 'var(--khor-size-12)',
    16: 'var(--khor-size-16)',
    20: 'var(--khor-size-20)',
    24: 'var(--khor-size-24)',
    32: 'var(--khor-size-32)',
    40: 'var(--khor-size-40)',
    48: 'var(--khor-size-48)',
    56: 'var(--khor-size-56)',
    64: 'var(--khor-size-64)',
    full: 'var(--khor-size-full)',
  },
  spacing: {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
    xxl: 48,
    // Density Tier 2
    densityXs: 'var(--khor-density-spacing-xs)',
    densitySm: 'var(--khor-density-spacing-sm)',
    densityMd: 'var(--khor-density-spacing-md)',
    densityLg: 'var(--khor-density-spacing-lg)',
    // Semantic Spacing (Industry Ref)
    componentXs: 'var(--khor-space-component-xs)',
    componentSm: 'var(--khor-space-component-sm)',
    componentMd: 'var(--khor-space-component-md)',
    componentLg: 'var(--khor-space-component-lg)',
    layoutXs: 'var(--khor-space-layout-xs)',
    layoutSm: 'var(--khor-space-layout-sm)',
    layoutMd: 'var(--khor-space-layout-md)',
    layoutLg: 'var(--khor-space-layout-lg)',
    layoutXl: 'var(--khor-space-layout-xl)',
  },
  shadows: {
    sm: 'var(--khor-shadow-sm)',
    md: 'var(--khor-shadow-md)',
    lg: 'var(--khor-shadow-lg)',
    xl: 'var(--khor-shadow-xl)',
    '2xl': 'var(--khor-shadow-2xl)',
    inner: 'var(--khor-shadow-inner)',
    // Elevation Scale
    elevation0: 'var(--khor-elevation-0)',
    elevation1: 'var(--khor-elevation-1)',
    elevation2: 'var(--khor-elevation-2)',
    elevation3: 'var(--khor-elevation-3)',
    elevation4: 'var(--khor-elevation-4)',
    elevation5: 'var(--khor-elevation-5)',
  },
  radius: {
    xs: 'var(--khor-radius-xs, 2px)' as unknown as number,
    sm: 'var(--khor-radius-sm, 6px)' as unknown as number,
    md: 'var(--khor-radius-md, 8px)' as unknown as number,
    lg: 'var(--khor-radius-lg, 10px)' as unknown as number,
    xl: 'var(--khor-radius-xl, 14px)' as unknown as number,
    '2xl': 'var(--khor-radius-2xl, 24px)' as unknown as number,
    '3xl': 'var(--khor-radius-3xl, 32px)' as unknown as number,
    full: 'var(--khor-radius-full, 9999px)' as unknown as number,
  },
  layout: {
    sidebarWidth: 260,
    sidebarWidthCollapsed: 64,
    headerHeight: 64,
    mainWidth: 1200,
    contentWidth: 960,
    containerWidth: 1440,
    // Breakpoints (Tailwind/DaisyUI Standard)
    breakpoints: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
  },
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    overlay: 1200,
    drawer: 1300,
    modal: 1400,
    popover: 1500,
    tooltip: 1600,
    toast: 1700,
  },
  icon: {
    xs: 'var(--khor-icon-xs)',
    sm: 'var(--khor-icon-sm)',
    md: 'var(--khor-icon-md)',
    lg: 'var(--khor-icon-lg)',
    xl: 'var(--khor-icon-xl)',
    xxl: 'var(--khor-icon-2xl)',
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
      overlayBg: 'var(--khor-overlay-bg)',
      overlayBackdrop: 'var(--khor-overlay-backdrop)',
      // Interactive States
      hover: 'var(--khor-surface-hover)',
      pressed: 'var(--khor-surface-pressed)',
      selected: 'var(--khor-surface-selected)',
      dragging: 'var(--khor-surface-dragging)',
      subtle: 'var(--khor-surface-subtle)',
    },
    motion: {
      duration: {
        instant: 'var(--khor-duration-instant)',
        fast: 'var(--khor-duration-fast)',
        normal: 'var(--khor-duration-normal)',
        slow: 'var(--khor-duration-slow)',
      },
      easing: {
        standard: 'var(--khor-easing-standard)',
        spring: 'var(--khor-easing-spring)',
        enter: 'var(--khor-easing-enter)',
        exit: 'var(--khor-easing-exit)',
        decelerate: 'var(--khor-easing-decelerate)',
        accelerate: 'var(--khor-easing-accelerate)',
        emphasized: 'var(--khor-easing-emphasized)',
      },
    },
    text: {
      primary: 'var(--khor-text-primary)',
      secondary: 'var(--khor-text-secondary)',
      muted: 'var(--khor-text-muted)',
      disabled: 'var(--khor-text-disabled)',
      onAction: 'var(--khor-text-on-action)',
      link: 'var(--khor-text-link)',
      linkHover: 'var(--khor-text-link-hover)',
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
    form: {
      error: { bg: 'var(--khor-form-error-bg)', border: 'var(--khor-form-error-border)', text: 'var(--khor-form-error-text)' },
      success: { bg: 'var(--khor-form-success-bg)', border: 'var(--khor-form-success-border)', text: 'var(--khor-form-success-text)' },
      warning: { bg: 'var(--khor-form-warning-bg)', border: 'var(--khor-form-warning-border)', text: 'var(--khor-form-warning-text)' },
      focusRing: 'var(--khor-form-focus-ring)',
    },
    focus: {
      ring: 'var(--khor-focus-ring-color)',
      ringWidth: 'var(--khor-focus-ring-width)',
      ringOffset: 'var(--khor-focus-ring-offset)',
      ringStyle: 'var(--khor-focus-ring-style)',
    },
    // Contextual Overrides (Layer 3)
    contextual: {
      sidebar: {
        bg: 'var(--khor-context-sidebar-bg)',
        text: 'var(--khor-context-sidebar-text)',
        textMuted: 'var(--khor-context-sidebar-text-muted)',
        border: 'var(--khor-context-sidebar-border)',
        hover: 'var(--khor-context-sidebar-hover)',
        active: 'var(--khor-context-sidebar-active)',
      },
      header: {
        bg: 'var(--khor-context-header-bg)',
        border: 'var(--khor-context-header-border)',
      }
    },
  },
  motion: {
    duration: { instant: 75, fast: 150, normal: 250, slow: 450, slower: 700 },
    easing: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
      decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
      accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    spring: { stiffness: 300, damping: 30 },
  },
  mobile: {
    safeAreaTop: 'env(safe-area-inset-top, 0px)',
    safeAreaBottom: 'env(safe-area-inset-bottom, 0px)',
    touchTargetMin: 44,
    touchTargetComfortable: 48,
    bottomNavHeight: 64,
  },
  charts: {
    primary: 'var(--khor-chart-primary)',
    secondary: 'var(--khor-chart-secondary)',
    accent: 'var(--khor-chart-accent)',
    success: 'var(--khor-chart-success)',
    error: 'var(--khor-chart-error)',
    info: 'var(--khor-chart-info)',
    teal: 'var(--khor-chart-teal)',
    purple: 'var(--khor-chart-purple)',
    pink: 'var(--khor-chart-pink)',
    cyan: 'var(--khor-chart-cyan)',
    amber: 'var(--khor-chart-amber)',
    gray: 'var(--khor-chart-gray)',
    palette: [
      'var(--khor-chart-primary)',
      'var(--khor-chart-secondary)',
      'var(--khor-chart-accent)',
      'var(--khor-chart-success)',
      'var(--khor-chart-error)',
      'var(--khor-chart-info)',
      'var(--khor-chart-teal)',
      'var(--khor-chart-purple)',
      'var(--khor-chart-pink)',
      'var(--khor-chart-cyan)',
      'var(--khor-chart-amber)',
      'var(--khor-chart-gray)',
    ],
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
    error: '#B71C1C',
    warning: '#E07800',
    info: '#1565C0',
    teal: '#0D7D7D',
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

/* ─── CSS Variables Block Generator ────────── */
export function generateCssBlock(theme?: {
  primary?: string; secondary?: string; accent?: string;
  success?: string; error?: string; warning?: string; info?: string;
  radiusSm?: number; radiusMd?: number; radiusLg?: number; radiusXl?: number;
}): string {
  const c = { ...khorStaticTokens.colors };
  const r = { ...khorStaticTokens.radius };
  if (theme) {
    if (theme.primary) c.primary = theme.primary;
    if (theme.secondary) { c.secondary = theme.secondary; c.navy = theme.secondary; }
    if (theme.accent) c.accent = theme.accent;
    if (theme.success) c.success = theme.success;
    if (theme.error) c.error = theme.error;
    if (theme.warning) c.warning = theme.warning;
    if (theme.info) c.info = theme.info;
    if (theme.radiusSm != null) r.sm = theme.radiusSm;
    if (theme.radiusMd != null) r.md = theme.radiusMd;
    if (theme.radiusLg != null) r.lg = theme.radiusLg;
    if (theme.radiusXl != null) r.xl = theme.radiusXl;
  }
  return `:root {
  /* Layer 1: Primitives - Radios Base */
  --khor-radius-xs: 2px;
  --khor-radius-sm: ${r.sm}px;
  --khor-radius-md: ${r.md}px;
  --khor-radius-lg: ${r.lg}px;
  --khor-radius-xl: ${r.xl}px;
  --khor-radius-2xl: 24px;
  --khor-radius-3xl: 32px;
  --khor-radius-full: 9999px;

  /* Elite Charts Palette (12 Colores) */
  --khor-chart-primary: ${c.primary};   --khor-chart-secondary: ${c.secondary};
  --khor-chart-accent: ${c.accent};    --khor-chart-success: ${c.success};
  --khor-chart-error: ${c.error};     --khor-chart-info: ${c.info};
  --khor-chart-teal: #008080;      --khor-chart-purple: #9C27B0;
  --khor-chart-pink: #E91E63;      --khor-chart-cyan: #00BCD4;
  --khor-chart-amber: #FFC107;     --khor-chart-gray: #9E9E9E;

  /* Neutrals (Full Slate-Blue Scale) */
  --khor-neutral-50: #f8faff;   --khor-neutral-100: #f1f4ff;
  --khor-neutral-200: #e2eafc;  --khor-neutral-300: #cbd8f1;
  --khor-neutral-400: #94a9d8;  --khor-neutral-500: #647bb1;
  --khor-neutral-600: #475a8f;  --khor-neutral-700: #33446b;
  --khor-neutral-800: #1e2a4a;  --khor-neutral-900: #0f1a35;
  --khor-neutral-secondary-50: #f8faff;  --khor-neutral-secondary-100: #f1f4ff;
  --khor-neutral-secondary-200: #e2eafc; --khor-neutral-secondary-300: #cbd8f1;
  --khor-neutral-secondary-400: #94a9d8; --khor-neutral-secondary-500: #647bb1;
  --khor-neutral-secondary-600: #475a8f; --khor-neutral-secondary-700: #33446b;
  --khor-neutral-secondary-800: #1e2a4a; --khor-neutral-secondary-900: #0f1a35;

  /* Form Validation Semantic States */
  --khor-form-error-bg: ${c.error}15;   --khor-form-error-border: ${c.error};   --khor-form-error-text: ${c.error};
  --khor-form-success-bg: ${c.success}15; --khor-form-success-border: ${c.success}; --khor-form-success-text: ${c.success};
  --khor-form-warning-bg: ${c.warning}15; --khor-form-warning-border: ${c.warning}; --khor-form-warning-text: ${c.warning};
  --khor-form-focus-ring: ${c.primary};

  /* Semantic Layer 2: Actions */
  --khor-action-primary-default: ${c.primary}; --khor-action-primary-hover: ${c.primaryHover};
  --khor-action-secondary-default: ${c.secondary}; --khor-action-secondary-hover: ${c.secondaryHover};
  --khor-action-danger-default: ${c.error}; --khor-action-danger-hover: #B71C1C;
  --khor-action-ghost-hover: rgba(5, 23, 88, 0.06);
  --khor-action-disabled-bg: #EDF0F1; --khor-action-disabled-text: #A0AEC0;
  --khor-action-primary-active: #c73a2a;

  /* Brand Color Aliases */
  --khor-primary: var(--khor-action-primary-default);
  --khor-primary-hover: var(--khor-action-primary-hover);
  --khor-primary-active: var(--khor-action-primary-active);
  --khor-secondary: var(--khor-action-secondary-default);
  --khor-secondary-hover: var(--khor-action-secondary-hover);
  --khor-secondary-active: #0d2a8a;
  --khor-accent: ${c.accent};
  --khor-accent-hover: #e68600;
  --khor-accent-active: #cc7800;
  --khor-navy: ${c.navy};
  --khor-navy-hover: ${c.secondaryHover};
  --khor-navy-active: #040f3a;
  --khor-success: ${c.success};
  --khor-error: #D32F2F;
  --khor-warning: ${c.warning};
  --khor-info: ${c.info};
  --khor-teal: ${c.teal};

  /* Semantic Layer 2: Surface & Overlay */
  --khor-surface-page: #f8faff; --khor-surface-card: #ffffff;
  --khor-surface-hover: rgba(5, 23, 88, 0.04); --khor-surface-pressed: rgba(5, 23, 88, 0.08);
  --khor-surface-selected: ${c.primary}15; --khor-surface-subtle: #F4F6F8;
  --khor-surface-overlay: #ffffff; --khor-surface-raised: #ffffff;
  --khor-surface-dragging: rgba(5, 23, 88, 0.12);
  --khor-overlay-bg: rgba(255, 255, 255, 0.95); --khor-overlay-backdrop: rgba(0, 0, 0, 0.45);

  /* Semantic Layer 2: Borders */
  --khor-border-default: #D5DBE0; --khor-border-muted: #EDF0F1;
  --khor-border-strong: #A0AEC0; --khor-border-hover: #A0AEC0;
  --khor-border-focus: ${c.primary}; --khor-border-error: ${c.error};
  --khor-border-disabled: #EDF0F1;

  /* Focus Ring */
  --khor-focus-ring-color: ${c.primary}; --khor-focus-ring-width: 2px;
  --khor-focus-ring-offset: 2px; --khor-focus-ring-style: solid;

  /* Semantic Layer 2: Typography */
  --khor-text-primary: ${c.secondary}; --khor-text-secondary: #475a8f;
  --khor-text-muted: #94a9d8; --khor-text-disabled: #A0AEC0; --khor-text-on-action: #ffffff;
  --khor-text-link: ${c.primary}; --khor-text-link-hover: ${c.primaryHover};

  /* Typography Base Sizing */
  --khor-font-size-h1: 32px; --khor-font-size-h2: 28px;
  --khor-font-size-h3: 24px; --khor-font-size-h4: 20px;
  --khor-font-size-h5: 18px; --khor-font-size-h6: 16px;
  --khor-font-size-body-lg: 16px; --khor-font-size-body-md: 14px;
  --khor-font-size-body-sm: 13px; --khor-font-size-body-xs: 12px;
  --khor-font-size-display-1: 48px; --khor-font-size-display-2: 40px;
  --khor-font-size-display-2xl: 72px; --khor-font-size-display-xl: 56px;
  --khor-font-size-heading-lg: 48px; --khor-font-size-heading-md: 40px;
  --khor-font-size-heading-sm: 32px; --khor-font-size-heading-xs: 24px;
  --khor-font-size-body-xl: 18px; --khor-font-size-code: 13px;
  --khor-font-size-label: 14px; --khor-font-size-caption: 12px;
  --khor-font-weight-light: 300; --khor-font-weight-regular: 400;
  --khor-font-weight-medium: 500; --khor-font-weight-semibold: 600;
  --khor-font-weight-bold: 700; --khor-font-weight-extrabold: 800;
  --khor-line-height-display: 1.1; --khor-line-height-heading: 1.25;
  --khor-line-height-body: 1.5; --khor-line-height-dynamic: 1.6;
  --khor-letter-spacing-tighter: -0.02em; --khor-letter-spacing-tight: -0.01em;
  --khor-letter-spacing-normal: 0em; --khor-letter-spacing-wide: 0.02em;
  --khor-letter-spacing-wider: 0.05em;

  /* Motion Tokens */
  --khor-duration-instant: 50ms; --khor-duration-fast: 150ms;
  --khor-duration-normal: 250ms; --khor-duration-slow: 450ms;
  --khor-easing-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --khor-easing-enter: cubic-bezier(0, 0, 0.2, 1);
  --khor-easing-exit: cubic-bezier(0.4, 0, 1, 1);
  --khor-easing-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --khor-transition-fade: opacity var(--khor-duration-normal) var(--khor-easing-standard);
  --khor-transition-scale: transform var(--khor-duration-normal) var(--khor-easing-standard);
  --khor-transition-slide: transform var(--khor-duration-normal) var(--khor-easing-standard);
  --khor-transition-color: color var(--khor-duration-normal) var(--khor-easing-standard), background-color var(--khor-duration-normal) var(--khor-easing-standard), border-color var(--khor-duration-normal) var(--khor-easing-standard);

  /* Elevation & Shadows */
  --khor-shadow-sm: 0 1px 2px rgba(5,23,88,0.04), 0 1px 1px rgba(0,0,0,0.02);
  --khor-shadow-md: 0 4px 6px -1px rgba(5,23,88,0.08), 0 2px 4px -1px rgba(0,0,0,0.04);
  --khor-shadow-lg: 0 10px 15px -3px rgba(5,23,88,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
  --khor-shadow-xl: 0 20px 25px -5px rgba(5,23,88,0.12), 0 10px 10px -5px rgba(0,0,0,0.04);
  --khor-shadow-2xl: 0 25px 50px -12px rgba(5,23,88,0.25);
  --khor-shadow-inner: inset 0 2px 4px 0 rgba(0,0,0,0.06);
  --khor-elevation-0: none;
  --khor-elevation-1: var(--khor-shadow-sm);
  --khor-elevation-2: var(--khor-shadow-md);
  --khor-elevation-3: var(--khor-shadow-lg);
  --khor-elevation-4: var(--khor-shadow-xl);
  --khor-elevation-5: var(--khor-shadow-2xl);

  /* Layout Grid System */
  --khor-grid-cols: 12;
  --khor-grid-gutter-sm: 16px; --khor-grid-margin-sm: 16px;
  --khor-grid-gutter-md: 24px; --khor-grid-margin-md: 24px;
  --khor-grid-gutter-lg: 32px; --khor-grid-margin-lg: 32px;
  --khor-grid-gutter-xl: 32px; --khor-grid-margin-xl: 40px;

  /* Semantic Spacing Tokens */
  --khor-space-layout-xs: 16px; --khor-space-layout-sm: 24px;
  --khor-space-layout-md: 32px; --khor-space-layout-lg: 48px;
  --khor-space-layout-xl: 64px;
  --khor-space-component-xs: 4px; --khor-space-component-sm: 8px;
  --khor-space-component-md: 12px; --khor-space-component-lg: 16px;
  --khor-density-spacing-xs: 4px; --khor-density-spacing-sm: 8px;
  --khor-density-spacing-md: 16px; --khor-density-spacing-lg: 24px;

  /* Sizing Scale */
  --khor-size-0: 0px; --khor-size-1: 4px; --khor-size-2: 8px;
  --khor-size-3: 12px; --khor-size-4: 16px; --khor-size-5: 20px;
  --khor-size-6: 24px; --khor-size-8: 32px; --khor-size-10: 40px;
  --khor-size-12: 48px; --khor-size-16: 64px; --khor-size-20: 80px;
  --khor-size-24: 96px; --khor-size-32: 128px; --khor-size-40: 160px;
  --khor-size-48: 192px; --khor-size-56: 224px; --khor-size-64: 256px;
  --khor-size-full: 100%;

  /* Icon Sizing */
  --khor-icon-xs: 12px; --khor-icon-sm: 14px; --khor-icon-md: 16px;
  --khor-icon-lg: 20px; --khor-icon-xl: 24px; --khor-icon-2xl: 32px;

  /* Layer 3: Component Specific Tokens */
  --khor-button-primary-bg:        var(--khor-action-primary-default);
  --khor-button-primary-text:      var(--khor-text-on-action);
  --khor-button-primary-shadow:    0 2px 4px rgba(224, 77, 54, 0.2);
  --khor-button-secondary-bg:      var(--khor-action-secondary-default);
  --khor-button-secondary-text:    var(--khor-text-on-action);
  --khor-input-bg:                 var(--khor-surface-card);
  --khor-input-border:             var(--khor-border-default);
  --khor-input-focus-border:       var(--khor-border-focus);
  --khor-input-focus-ring:         var(--khor-form-focus-ring);
  --khor-card-bg:                  var(--khor-surface-card);
  --khor-card-shadow:              var(--khor-shadow-md);
  --khor-card-radius:              var(--khor-radius-lg);

  /* Layer 3: Contextual Tokens */
  --khor-context-sidebar-bg:        var(--khor-chart-secondary);
  --khor-context-sidebar-text:      var(--khor-neutral-50);
  --khor-context-sidebar-text-muted:rgba(255, 255, 255, 0.55);
  --khor-context-sidebar-border:    rgba(255, 255, 255, 0.08);
  --khor-context-sidebar-hover:     rgba(255, 255, 255, 0.10);
  --khor-context-sidebar-active:    rgba(255, 255, 255, 0.15);
  --khor-context-header-bg:         var(--khor-surface-card);
  --khor-context-header-border:     var(--khor-border-default);
  --khor-context-header-text:       var(--khor-text-primary);

  /* Chart Array Mapping */
  --khor-chart-1: var(--khor-chart-primary);
  --khor-chart-2: var(--khor-chart-secondary);
  --khor-chart-3: var(--khor-chart-accent);
  --khor-chart-4: var(--khor-chart-success);
}`;
}
