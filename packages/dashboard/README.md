# @trendytradez/dashboard

Main dashboard package for TrendyTradez - brings together widgets, UI components, and state management.

## Features

- Dashboard canvas with grid system
- Layout components (Header, Sidebar, Toolbar)
- State management with Zustand
- Fullscreen mode
- Keyboard shortcuts
- Widget management integration

## Installation

```bash
pnpm add @trendytradez/dashboard
```

## Usage

```tsx
import { Dashboard, DashboardProvider } from '@trendytradez/dashboard';

function App() {
  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  );
}
```

## Components

### Dashboard
Main dashboard component with canvas and layout.

### DashboardProvider
Context provider for dashboard state management.

### Header
Top navigation bar with branding and controls.

### Sidebar
Side navigation panel.

### Toolbar
Floating toolbar for quick actions.

## State Management

Uses Zustand for lightweight, performant state management:
- Widget positions and sizes
- Layout configuration
- UI preferences
- Fullscreen state

## Keyboard Shortcuts

- `F11` - Toggle fullscreen
- `Ctrl/Cmd + S` - Save layout
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo
