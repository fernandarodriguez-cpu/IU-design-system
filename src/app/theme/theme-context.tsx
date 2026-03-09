/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR THEME CONTEXT — Dark/Light Mode     ║
 * ║  Provides theme switching with persisted   ║
 * ║  preference in localStorage.               ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  toggle: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  toggle: () => {},
  isDark: false,
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    try {
      return (localStorage.getItem('khor-theme-mode') as ThemeMode) || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('khor-theme-mode', mode);
    } catch {}
    // Toggle the .dark class on <html> so CSS variables respond
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const toggle = useCallback(() => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggle, isDark: mode === 'dark' }}>
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