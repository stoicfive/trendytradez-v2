# @trendytradez/utils

Shared utility functions for TrendyTradez.

## Installation

```bash
pnpm add @trendytradez/utils@workspace:*
```

## Usage

```typescript
import { clamp, truncate, isValidEmail } from '@trendytradez/utils';

// Math utilities
const value = clamp(150, 0, 100); // 100

// String utilities
const short = truncate('Long text here', 10); // 'Long te...'

// Validation utilities
const valid = isValidEmail('user@example.com'); // true
```

## Available Utilities

### Math
- `clamp(value, min, max)` - Clamps a number between min and max
- `roundTo(value, decimals)` - Rounds to specified decimal places
- `roundToGrid(value, gridSize)` - Rounds to nearest grid size

### String
- `truncate(str, maxLength, suffix?)` - Truncates string with ellipsis
- `capitalize(str)` - Capitalizes first letter
- `capitalizeWords(str)` - Capitalizes each word

### Validation
- `isValidEmail(email)` - Validates email format
- `isValidNumber(value)` - Checks if value is a valid number
- `isInRange(value, min, max)` - Checks if number is in range

### Date
- `formatDate(date, format)` - Formats date to string
- `getRelativeTime(date)` - Gets relative time string

## Testing

```bash
pnpm test
pnpm test:watch
```
