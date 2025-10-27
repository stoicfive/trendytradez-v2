/**
 * Theme type definitions
 */

export type ThemeMode = 'dark' | 'light';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  error: string;
  warning: string;
  info: string;
  success: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  border: string;
  divider: string;
}

export interface ThemePalette {
  mode: ThemeMode;
  colors: ThemeColors;
}

export interface Theme {
  palette: ThemePalette;
  spacing: (factor: number) => number;
  borderRadius: number;
  shadows: string[];
  typography: {
    fontFamily: string;
    fontSize: number;
    fontWeightLight: number;
    fontWeightRegular: number;
    fontWeightMedium: number;
    fontWeightBold: number;
  };
}
