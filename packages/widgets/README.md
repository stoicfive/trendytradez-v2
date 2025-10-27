# @trendytradez/widgets

Widget system for TrendyTradez dashboard.

## Installation

```bash
pnpm add @trendytradez/widgets@workspace:*
```

## Usage

### Setup Widget Provider

```tsx
import { WidgetProvider } from '@trendytradez/widgets';

function App() {
  return (
    <WidgetProvider>
      <YourDashboard />
    </WidgetProvider>
  );
}
```

### Register Widget Types

```tsx
import { widgetRegistry } from '@trendytradez/widgets';

// Register a widget type
widgetRegistry.register({
  type: 'tradingview',
  label: 'TradingView Chart',
  description: 'Interactive trading chart',
  defaultSize: { width: 600, height: 400 },
  minSize: { width: 400, height: 300 },
  resizable: true,
  draggable: true,
});
```

### Use Widgets

```tsx
import { useWidgets, WidgetContainer } from '@trendytradez/widgets';

function Dashboard() {
  const { widgets, addWidget, removeWidget, updateWidget } = useWidgets();

  return (
    <div>
      <button onClick={() => addWidget('tradingview')}>
        Add Chart
      </button>

      {widgets.map((widget) => (
        <WidgetContainer
          key={widget.id}
          widget={widget}
          onRemove={removeWidget}
        >
          <YourWidgetContent widget={widget} />
        </WidgetContainer>
      ))}
    </div>
  );
}
```

## API

### WidgetRegistry

Singleton registry for widget type definitions.

**Methods:**
- `register(definition)` - Register a widget type
- `unregister(type)` - Unregister a widget type
- `get(type)` - Get widget definition by type
- `getAll()` - Get all registered widgets
- `has(type)` - Check if widget type is registered
- `clear()` - Clear all registered widgets

### WidgetProvider

React Context provider for widget state management.

**Props:**
- `children` - React children
- `initialWidgets?` - Initial widget state

### useWidgets()

Hook to access widget operations.

**Returns:**
- `widgets` - Array of all widgets
- `addWidget(type)` - Add a new widget
- `removeWidget(id)` - Remove a widget
- `updateWidget(id, updates)` - Update a widget
- `getWidget(id)` - Get a widget by ID

### WidgetContainer

Component that wraps widget content with positioning and controls.

**Props:**
- `widget` - Widget data
- `children` - Widget content
- `onMove?` - Move handler
- `onResize?` - Resize handler
- `onRemove?` - Remove handler

## Features

- Widget registry for type definitions
- React Context for state management
- Widget container with positioning
- Add, remove, and update operations
- TypeScript support
- Tested with Vitest

## Next Steps

- Add drag-and-drop with @dnd-kit
- Implement resize functionality
- Add widget persistence
- Create widget templates
