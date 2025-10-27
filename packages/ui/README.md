# @trendytradez/ui

UI component library for TrendyTradez using Tailwind CSS and Tremor.

## Installation

```bash
pnpm add @trendytradez/ui@workspace:*
```

## Setup

Import the styles in your app:

```tsx
import '@trendytradez/ui/styles.css';
```

## Usage

### Custom Components

```tsx
import { Card, KPICard, Button, Input } from '@trendytradez/ui';

function MyComponent() {
  return (
    <div>
      <KPICard
        title="Total Revenue"
        value="$45,231"
        delta="+12.5%"
        deltaType="increase"
      />

      <Card>
        <h2>Widget Content</h2>
      </Card>

      <Button variant="primary" size="md">
        Click Me
      </Button>

      <Input label="Email" placeholder="Enter email" />
    </div>
  );
}
```

### Tremor Components

All Tremor components are re-exported for convenience:

```tsx
import {
  AreaChart,
  BarChart,
  LineChart,
  DonutChart,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Badge,
  BadgeDelta,
  Select,
  SelectItem,
} from '@trendytradez/ui';

function Dashboard() {
  return (
    <div>
      <AreaChart
        data={data}
        index="date"
        categories={["Sales"]}
        colors={["blue"]}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Value</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* rows */}
        </TableBody>
      </Table>
    </div>
  );
}
```

## Utility Functions

### cn() - Class Name Merger

Combines clsx and tailwind-merge for optimal Tailwind class handling:

```tsx
import { cn } from '@trendytradez/ui';

function MyComponent({ className }) {
  return (
    <div className={cn('bg-gray-900 p-4', className)}>
      Content
    </div>
  );
}
```

## Styling

### Tailwind Classes

Use Tailwind utility classes for custom styling:

```tsx
<div className="flex items-center gap-4 rounded-lg bg-gray-900 p-4">
  <span className="text-sm font-medium text-gray-300">Label</span>
</div>
```

### Theme Colors

TrendyTradez brand colors are available:

- `brand-50` through `brand-900`
- `gray-50` through `gray-950`

## Components

### Card

Wrapper around Tremor Card with dark theme styling.

**Props:**
- `children` - Card content
- `className?` - Additional classes
- `decoration?` - Border decoration position
- `decorationColor?` - Decoration color

### KPICard

Display key performance indicators.

**Props:**
- `title` - KPI title
- `value` - KPI value
- `delta?` - Change percentage
- `deltaType?` - 'increase' | 'decrease' | 'unchanged'
- `className?` - Additional classes

### Button

Custom button component.

**Props:**
- `variant?` - 'primary' | 'secondary' | 'ghost' | 'danger'
- `size?` - 'sm' | 'md' | 'lg'
- `children` - Button content
- Standard button HTML attributes

### Input

Form input component.

**Props:**
- `label?` - Input label
- `error?` - Error message
- Standard input HTML attributes

## Tremor Documentation

For full Tremor component documentation, visit:
https://www.tremor.so/docs/getting-started/introduction
