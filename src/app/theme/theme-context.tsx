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
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  setMode: () => {},
  toggleDark: () => {},
  toggleHighContrast: () => {},
  isDark: false,
  isHighContrast: false,
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
      return 'light';
    } catch {
      return 'light';
    }
  });

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
      isHighContrast: mode === 'high-contrast'
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