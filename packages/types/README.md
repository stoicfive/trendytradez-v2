# @trendytradez/types

Shared TypeScript type definitions for TrendyTradez.

## Installation

```bash
pnpm add @trendytradez/types@workspace:*
```

## Usage

```typescript
import type { Widget, Dashboard, Theme } from '@trendytradez/types';

const widget: Widget = {
  id: 'widget-1',
  type: 'tradingview',
  position: { x: 0, y: 0 },
  size: { width: 400, height: 300 },
  config: { title: 'My Chart' },
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

## Available Types

### Widget Types
- `Widget` - Complete widget definition
- `WidgetType` - Widget type union
- `WidgetConfig` - Widget configuration
- `WidgetDefinition` - Widget type definition
- `Position` - Widget position
- `Size` - Widget size

### Dashboard Types
- `Dashboard` - Complete dashboard definition
- `DashboardLayout` - Dashboard layout configuration
- `DashboardSettings` - Dashboard settings

### Theme Types
- `Theme` - Complete theme definition
- `ThemeMode` - Theme mode ('dark' | 'light')
- `ThemePalette` - Theme color palette
- `ThemeColors` - Theme color definitions
