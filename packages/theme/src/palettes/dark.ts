import type { ThemePalette } from '@trendytradez/types';
import { colors } from '../tokens/colors';

/**
 * Dark mode palette
 */
export const darkPalette: ThemePalette = {
  mode: 'dark',
  colors: {
    primary: colors.primary[500],
    secondary: colors.info.main,
    background: '#0d1117',
    surface: '#161b22',
    error: colors.error.main,
    warning: colors.warning.main,
    info: colors.info.main,
    success: colors.success.main,
    text: {
      primary: '#e6edf3',
      secondary: '#8b949e',
      disabled: '#6e7681',
    },
    border: '#30363d',
    divider: '#21262d',
  },
};
