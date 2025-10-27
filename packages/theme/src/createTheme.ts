import type { ThemeMode, Theme } from '@trendytradez/types';
import { darkPalette, lightPalette } from './palettes';
import { getSpacing, typography } from './tokens';

/**
 * Creates a theme object based on the mode
 */
export function createTheme(mode: ThemeMode): Theme {
  const palette = mode === 'dark' ? darkPalette : lightPalette;

  return {
    palette,
    spacing: getSpacing,
    borderRadius: 8,
    shadows: [
      'none',
      '0 1px 3px rgba(0, 0, 0, 0.12)',
      '0 2px 6px rgba(0, 0, 0, 0.16)',
      '0 4px 12px rgba(0, 0, 0, 0.20)',
      '0 8px 24px rgba(0, 0, 0, 0.24)',
    ],
    typography: {
      fontFamily: typography.fontFamily.sans,
      fontSize: 16,
      fontWeightLight: typography.fontWeight.light,
      fontWeightRegular: typography.fontWeight.regular,
      fontWeightMedium: typography.fontWeight.medium,
      fontWeightBold: typography.fontWeight.bold,
    },
  };
}
