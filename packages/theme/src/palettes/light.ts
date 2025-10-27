import type { ThemePalette } from '@trendytradez/types';
import { colors } from '../tokens/colors';

/**
 * Light mode palette
 */
export const lightPalette: ThemePalette = {
  mode: 'light',
  colors: {
    primary: colors.primary[600],
    secondary: colors.info.dark,
    background: '#ffffff',
    surface: '#f6f8fa',
    error: colors.error.dark,
    warning: colors.warning.dark,
    info: colors.info.dark,
    success: colors.success.dark,
    text: {
      primary: '#24292f',
      secondary: '#57606a',
      disabled: '#8c959f',
    },
    border: '#d0d7de',
    divider: '#e1e4e8',
  },
};
