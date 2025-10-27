import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ThemeMode, Theme } from '@trendytradez/types';
import { createTheme } from './createTheme';

interface ThemeContextValue {
  mode: ThemeMode;
  theme: Theme;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}

/**
 * Theme Provider Component
 * Manages theme state and provides theme context to children
 */
export function ThemeProvider({ children, defaultMode = 'dark' }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme-mode');
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }

      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }

    return defaultMode;
  });

  const theme = useMemo(() => createTheme(mode), [mode]);

  useEffect(() => {
    // Persist to localStorage
    localStorage.setItem('theme-mode', mode);

    // Update document class for CSS
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(mode);

    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme.palette.colors.background);
    }
  }, [mode, theme]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const value = useMemo(
    () => ({
      mode,
      theme,
      setMode,
      toggleMode,
    }),
    [mode, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to access theme context
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
