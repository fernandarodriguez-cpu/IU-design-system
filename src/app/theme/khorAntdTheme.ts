/**
 * ╔════════════════════════════════════════════════════════════╗
 * ║  KHOR → ANT DESIGN THEME BRIDGE                             ║
 * ║                                                            ║
 * ║  Maps the live Khor `themeConfig` (the runtime source of   ║
 * ║  truth written to :root by theme-context) onto Ant Design  ║
 * ║  5 design tokens, so every AntD-based K* component renders  ║
 * ║  with the exact Khor / Figma look.                          ║
 * ║                                                            ║
 * ║  This is the keystone of the Radix → AntD migration:        ║
 * ║  get the mapping right and every later component inherits   ║
 * ║  the correct visuals automatically.                         ║
 * ╚════════════════════════════════════════════════════════════╝
 */
import { theme as antdTheme, type ThemeConfig as AntdThemeConfig } from 'antd';
import type { ThemeConfig as KhorThemeConfig } from './theme-context';

/* ─── Static structural tokens ───────────────────────────────────
   These come from src/styles/theme.css and are NOT user-customizable
   (heights, paddings, button radii, fixed text colors). They map 1:1
   onto AntD's control sizing, which is why fidelity is achievable:
     khor-button-height  sm/md/lg = 24 / 32 / 40  ≡ AntD controlHeight SM/_/LG
     khor-radius         sm/md/lg =  4 /  6 /  8
   ──────────────────────────────────────────────────────────────── */
const KHOR = {
  // control sizing
  controlHeightSM: 24, // --khor-button-height-sm
  controlHeight: 32, // --khor-button-height-md
  controlHeightLG: 40, // --khor-button-height-lg
  // radii
  borderRadiusSM: 4, // --khor-radius-sm / --khor-button-radius-sm
  borderRadius: 6, // --khor-radius-md / --khor-button-radius-md
  borderRadiusLG: 8, // --khor-radius-lg / --khor-button-radius-lg
  // fixed colors (never follow brand primary — see theme-context)
  textPrimary: '#051758', // --khor-text-primary (always navy)
  textSecondary: '#475A8F', // --khor-text-secondary
  textLabel: '#8489AB', // --khor-text-label
  textMuted: '#94A3B8', // --khor-text-muted / placeholder
  borderDefault: '#CBD5E1', // --khor-border-default (slate-200/300)
  borderHover: '#94A3B8', // --khor-border-hover (slate-400)
  surfaceCard: '#FFFFFF', // --khor-surface-card
  surfacePage: '#F8FAFC', // --khor-surface-page (neutral-50)
  surfaceHover: 'rgba(5, 23, 88, 0.04)', // --khor-surface-hover
  // button primary hover/active (Figma) — independent of algorithm-derived shades
  primaryHover: '#2F478F', // --khor-button-primary-bg-hover (blue-500)
  buttonFontWeight: 600, // --khor-button-font-weight (semibold)
  buttonPaddingInline: 16, // --khor-button-padding-x-md
} as const;

/**
 * Build an Ant Design ThemeConfig from the live Khor themeConfig.
 *
 * Brand colors (primary/secondary/accent/feedback) and typography are
 * read from `t` so industry presets and custom-brand changes flow into
 * AntD automatically. Structural sizing comes from the static KHOR map.
 */
export function buildKhorAntdTheme(t: KhorThemeConfig): AntdThemeConfig {
  return {
    algorithm: antdTheme.defaultAlgorithm, // light only today; swap to darkAlgorithm when dark mode returns
    cssVar: true, // emit CSS variables → coexists with the .dark class strategy & runtime switching
    hashed: true,
    token: {
      // ── Brand & feedback (dynamic, from themeConfig) ──
      colorPrimary: t.primary, // KButton primary bg = --khor-action-primary = --khor-primary
      colorInfo: t.info,
      colorSuccess: t.success,
      colorWarning: t.warning,
      colorError: t.error,
      colorLink: t.primary,

      // ── Text (fixed Khor navy scale) ──
      colorTextBase: KHOR.textPrimary,
      colorText: KHOR.textPrimary,
      colorTextSecondary: KHOR.textSecondary,
      colorTextTertiary: KHOR.textLabel,
      colorTextQuaternary: KHOR.textMuted,
      colorTextPlaceholder: KHOR.textMuted,

      // ── Surfaces & borders ──
      colorBgBase: KHOR.surfaceCard,
      colorBgContainer: KHOR.surfaceCard,
      colorBgLayout: KHOR.surfacePage,
      colorBorder: KHOR.borderDefault,
      colorBorderSecondary: KHOR.borderDefault,
      controlItemBgHover: KHOR.surfaceHover,

      // ── Radii ──
      borderRadius: KHOR.borderRadius,
      borderRadiusSM: KHOR.borderRadiusSM,
      borderRadiusLG: KHOR.borderRadiusLG,

      // ── Typography ──
      fontFamily: `'${t.fontBody}', sans-serif`,
      fontSize: t.bodySize, // 14
      lineHeight: t.baseLineHeight, // 1.5

      // ── Control sizing (Khor button heights) ──
      controlHeight: KHOR.controlHeight,
      controlHeightSM: KHOR.controlHeightSM,
      controlHeightLG: KHOR.controlHeightLG,

      wireframe: false,
    },
    components: {
      Button: {
        fontWeight: KHOR.buttonFontWeight,
        primaryShadow: 'none', // Khor buttons use token shadows, not AntD's blue glow
        defaultShadow: 'none',
        dangerShadow: 'none',
        paddingInline: KHOR.buttonPaddingInline,
        colorPrimaryHover: KHOR.primaryHover, // Figma hover = blue-500
        borderRadius: KHOR.borderRadius,
        borderRadiusSM: KHOR.borderRadiusSM,
        borderRadiusLG: KHOR.borderRadiusLG,
      },
      Input: {
        activeBorderColor: t.primary,
        hoverBorderColor: t.primary,
        activeShadow: '0 0 0 2px rgba(5, 23, 88, 0.10)', // --khor-input-focus-ring
        colorBorder: KHOR.borderDefault,
        paddingBlock: 6,
      },
      Checkbox: {
        colorPrimary: t.secondary, // Figma: checked fill = #E04D36 (secondary), not brand primary
        colorPrimaryHover: t.secondary,
        borderRadiusSM: 4,
        controlInteractiveSize: 16, // --khor checkbox is 16×16
      },
      Radio: {
        colorPrimary: t.secondary, // Figma: selected ring + dot = #E04D36 (secondary)
        radioSize: 16, // Khor radio outer 16px
        dotSize: 7, // Khor inner dot 7px
        // Radio buttons (optionType="button")
        buttonSolidCheckedBg: t.secondary,
        buttonSolidCheckedHoverBg: t.secondary,
      },
      Switch: {
        colorPrimary: t.primary, // Figma: switch checked track = #051758 navy (primary), NOT secondary
        colorPrimaryHover: KHOR.primaryHover,
        // Khor track/handle dimensions (medium 44×24 thumb20 / small 36×20 thumb16)
        trackHeight: 24,
        trackHeightSM: 20,
        trackMinWidth: 44,
        trackMinWidthSM: 36,
        handleSize: 20,
        handleSizeSM: 16,
        trackPadding: 2,
      },
    },
  };
}
