# @trendytradez/theme

Theme system for TrendyTradez with dark/light mode support.

## Installation

```bash
pnpm add @trendytradez/theme@workspace:*
```

## Usage

### Basic Setup

```tsx
import { ThemeProvider } from '@trendytradez/theme';

function App() {
  return (
    <ThemeProvider defaultMode="dark">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Using Theme in Components

```tsx
import { useTheme } from '@trendytradez/theme';

function MyComponent() {
  const { theme, mode, toggleMode } = useTheme();

  return (
    <div style={{ 
      backgroundColor: theme.palette.colors.background,
      color: theme.palette.colors.text.primary,
      padding: theme.spacing(4)
    }}>
      <h1>Current mode: {mode}</h1>
      <button onClick={toggleMode}>Toggle Theme</button>
    </div>
  );
}
```

### Accessing Design Tokens

```tsx
import { colors, spacing, typography } from '@trendytradez/theme';

// Use colors
const primaryColor = colors.primary[500];

// Use spacing
const padding = spacing[4]; // '1rem'

// Use typography
const fontFamily = typography.fontFamily.sans;
```

## Features

- Dark and light mode support
- Automatic system preference detection
- LocalStorage persistence
- Type-safe theme tokens
- React Context API
- Design tokens (colors, spacing, typography)

## API

### ThemeProvider

Props:
- `children`: React.ReactNode
- `defaultMode?`: 'dark' | 'light' (default: 'dark')

### useTheme()

Returns:
- `mode`: Current theme mode ('dark' | 'light')
- `theme`: Complete theme object
- `setMode(mode)`: Set theme mode
- `toggleMode()`: Toggle between dark and light

### Theme Object

```typescript
{
  palette: {
    mode: 'dark' | 'light',
    colors: {
      primary: string,
      secondary: string,
      background: string,
      surface: string,
      error: string,
      warning: string,
      info: string,
      success: string,
      text: {
        primary: string,
        secondary: string,
        disabled: string
      },
      border: string,
      divider: string
    }
  },
  spacing: (factor: number) => string,
  borderRadius: number,
  shadows: string[],
  typography: {
    fontFamily: string,
    fontSize: number,
    fontWeightLight: number,
    fontWeightRegular: number,
    fontWeightMedium: number,
    fontWeightBold: number
  }
}
```

## Design Tokens

### Colors

- Primary: Brand blue (#0f62fe)
- Gray scale: 50-900
- Semantic: success, error, warning, info

### Spacing

- Based on 4px grid
- Factor 1 = 4px, Factor 4 = 16px, etc.

### Typography

- Font families: sans-serif, monospace
- Font sizes: xs (12px) to 5xl (48px)
- Font weights: light (300) to bold (700)
