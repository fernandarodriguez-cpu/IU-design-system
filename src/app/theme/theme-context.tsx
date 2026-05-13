/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR THEME CONTEXT — AAA Accessibility   ║
 * ║  Provides Dark/Light & High Contrast      ║
 * ║  modes with system preference detection.   ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'light' | 'dark' | 'high-contrast';

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleDark: () => void;
  toggleHighContrast: () => void;
  isDark: boolean;
  isHighContrast: boolean;
  themeConfig: ThemeConfig;
  setThemeConfig: (config: ThemeConfig) => void;
  resetTheme: () => void;
}

export interface ThemeConfig {
  primary: string; secondary: string; accent: string;
  success: string; error: string; warning: string; info: string;
  fontHeading: string; fontBody: string; fontMono: string;
  h1Size: number; h2Size: number; h3Size: number; bodySize: number; smallSize: number;
  baseLineHeight: number;
  shadowSm: string; shadowMd: string; shadowLg: string; shadowColor: string;
  radiusSm: number; radiusMd: number; radiusLg: number; radiusXl: number;
  spaceXs: number; spaceSm: number; spaceMd: number; spaceLg: number; spaceXl: number;
}

export const defaultTheme: ThemeConfig = {
  primary: '#E04D36', secondary: '#051758', accent: '#FF9500',
  success: '#2E7D32', error: '#D32F2F', warning: '#E68600', info: '#1976D2',
  fontHeading: 'Montserrat', fontBody: 'Plus Jakarta Sans', fontMono: 'JetBrains Mono',
  h1Size: 38, h2Size: 30, h3Size: 24, bodySize: 14, smallSize: 12, baseLineHeight: 1.5,
  shadowSm: '0 1px 3px 0', shadowMd: '0 4px 12px 0', shadowLg: '0 10px 30px -4px', shadowColor: '#00000018',
  radiusSm: 6, radiusMd: 8, radiusLg: 10, radiusXl: 14,
  spaceXs: 4, spaceSm: 8, spaceMd: 16, spaceLg: 24, spaceXl: 40,
};

export const industryPresets: Record<string, ThemeConfig> = {
  DEFAULT: defaultTheme,
  AI_MODERN: {
    ...defaultTheme,
    primary: '#8B5CF6', secondary: '#1E1B4B', accent: '#34D399',
    fontHeading: 'Inter', fontBody: 'Inter',
    radiusSm: 8, radiusMd: 12, radiusLg: 20, radiusXl: 32,
    shadowColor: 'rgba(139, 92, 246, 0.15)',
  },
  FINTECH_SECURE: {
    ...defaultTheme,
    primary: '#0F172A', secondary: '#334155', accent: '#0284C7',
    fontHeading: 'Plus Jakarta Sans', fontBody: 'Inter',
    radiusSm: 2, radiusMd: 4, radiusLg: 6, radiusXl: 8,
    shadowColor: 'rgba(0, 0, 0, 0.12)',
  },
  HEALTHCARE_CLEAN: {
    ...defaultTheme,
    primary: '#0D9488', secondary: '#134E4A', accent: '#F59E0B',
    fontHeading: 'Outfit', fontBody: 'Inter',
    radiusSm: 12, radiusMd: 16, radiusLg: 24, radiusXl: 32,
    spaceMd: 20, spaceLg: 32,
    shadowColor: 'rgba(13, 148, 136, 0.1)',
  }
};

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  setMode: () => {},
  toggleDark: () => {},
  toggleHighContrast: () => {},
  isDark: false,
  isHighContrast: false,
  themeConfig: defaultTheme,
  setThemeConfig: () => {},
  resetTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    try {
      const stored = localStorage.getItem('khor-theme-mode') as ThemeMode;
      if (stored === 'light' || stored === 'dark' || stored === 'high-contrast') {
        return stored;
      }
      // System preference fallback
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (e) {
      // Ignorar errores de localStorage en SSR o modo incógnito
    }
    return 'light';
  });

  const [themeConfig, setThemeConfigState] = useState<ThemeConfig>(() => {
    try {
      const stored = localStorage.getItem('khor-custom-theme');
      return stored ? JSON.parse(stored) : defaultTheme;
    } catch {
      return defaultTheme;
    }
  });

  const setThemeConfig = useCallback((config: ThemeConfig) => {
    setThemeConfigState(config);
    localStorage.setItem('khor-custom-theme', JSON.stringify(config));
  }, []);

  const resetTheme = useCallback(() => {
    setThemeConfig(defaultTheme);
  }, [setThemeConfig]);

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('khor-theme-mode', mode);
    } catch {}
    
    const html = document.documentElement;
    
    // Cleanup previous classes
    html.classList.remove('dark', 'high-contrast');
    
    // Apply new classes
    if (mode === 'dark') {
      html.classList.add('dark');
    } else if (mode === 'high-contrast') {
      html.classList.add('dark'); // High contrast builds upon dark topology in Khor
      html.classList.add('high-contrast');
    }
    
    html.setAttribute('data-theme', mode);
  }, [mode]);

  // Apply custom theme properties to :root
  useEffect(() => {
    const root = document.documentElement;
    const t = themeConfig;
    
    const props = {
      '--khor-primary': t.primary,
      '--khor-secondary': t.secondary,
      '--khor-accent': t.accent,
      '--khor-success': t.success,
      '--khor-error': t.error,
      '--khor-warning': t.warning,
      '--khor-info': t.info,
      '--font-primary': `'${t.fontHeading}', sans-serif`,
      '--font-secondary': `'${t.fontBody}', sans-serif`,
      '--font-mono': `'${t.fontMono}', monospace`,
      '--khor-h1-size': `${t.h1Size}px`,
      '--khor-h2-size': `${t.h2Size}px`,
      '--khor-h3-size': `${t.h3Size}px`,
      '--khor-body-size': `${t.bodySize}px`,
      '--khor-small-size': `${t.smallSize}px`,
      '--khor-line-height': t.baseLineHeight,
      '--khor-radius-sm': `${t.radiusSm}px`,
      '--khor-radius-md': `${t.radiusMd}px`,
      '--khor-radius-lg': `${t.radiusLg}px`,
      '--khor-radius-xl': `${t.radiusXl}px`,
      '--khor-space-xs': `${t.spaceXs}px`,
      '--khor-space-sm': `${t.spaceSm}px`,
      '--khor-space-md': `${t.spaceMd}px`,
      '--khor-space-lg': `${t.spaceLg}px`,
      '--khor-space-xl': `${t.spaceXl}px`,
      '--khor-shadow-sm': `${t.shadowSm} ${t.shadowColor}`,
      '--khor-shadow-md': `${t.shadowMd} ${t.shadowColor}`,
      '--khor-shadow-lg': `${t.shadowLg} ${t.shadowColor}`,
    };

    Object.entries(props).forEach(([key, value]) => {
      root.style.setProperty(key, String(value));
    });
  }, [themeConfig]);

  const toggleDark = useCallback(() => {
    setModeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const toggleHighContrast = useCallback(() => {
    setModeState((prev) => (prev === 'high-contrast' ? 'dark' : 'high-contrast'));
  }, []);

  return (
    <ThemeContext.Provider value={{ 
      mode, 
      setMode, 
      toggleDark, 
      toggleHighContrast, 
      isDark: mode === 'dark' || mode === 'high-contrast',
      isHighContrast: mode === 'high-contrast',
      themeConfig,
      setThemeConfig,
      resetTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

/* ─── Dark Mode Tokens ──────────────────────── */
export const darkTokens = {
  colors: {
    brand: {
      primary: '#E04D36',
      primaryHover: '#e8644f',
      primaryActive: '#c9442f',
      navy: '#8BA3D9',
      navyHover: '#A3B8E6',
      navyActive: '#7391CC',
      accent: '#FFB340',
      accentHover: '#FFC266',
      accentActive: '#E6A030',
    },
    neutral: {
      50: '#1A1B2E',
      100: '#22243A',
      200: '#2E3148',
      300: '#4A4E6A',
      400: '#8B90A8',
      500: '#B0B4C8',
      900: '#E8EAF0',
    },
    feedback: {
      success: '#4CAF50',
      successLight: '#1B2E1C',
      error: '#EF5350',
      errorLight: '#2E1B1B',
      warning: '#FFB340',
      warningLight: '#2E271B',
      info: '#64B5F6',
      infoLight: '#1B242E',
    },
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.3)',
    md: '0 4px 12px rgba(0,0,0,0.4)',
    lg: '0 12px 32px rgba(0,0,0,0.5)',
  },
};