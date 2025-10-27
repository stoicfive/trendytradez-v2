# @trendytradez/config

Shared configuration files for TrendyTradez monorepo.

## Installation

```bash
pnpm add -D @trendytradez/config@workspace:*
```

## Usage

### ESLint

Create `.eslintrc.js` in your package:

```js
module.exports = {
  extends: ['@trendytradez/config/eslint'],
};
```

### TypeScript

Create `tsconfig.json` in your package:

```json
{
  "extends": "@trendytradez/config/typescript/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

For React packages:

```json
{
  "extends": "@trendytradez/config/typescript/react.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
```

### Prettier

Create `.prettierrc.js` in your package:

```js
module.exports = require('@trendytradez/config/prettier');
```

Or extend it:

```js
module.exports = {
  ...require('@trendytradez/config/prettier'),
  // Your overrides
  printWidth: 120,
};
```

## What's Included

### ESLint Config

- Base ESLint recommended rules
- TypeScript ESLint plugin
- React and React Hooks plugins
- Prettier integration (no conflicts)
- Sensible defaults for modern React + TypeScript

### TypeScript Configs

- **base.json**: Base TypeScript configuration
- **react.json**: React-specific TypeScript configuration

Features:
- Strict mode enabled
- Modern ES2022 target
- JSX support (react-jsx)
- Source maps and declarations
- No unused variables/parameters

### Prettier Config

- 2 spaces indentation
- Single quotes
- Semicolons
- 100 character line width
- Trailing commas (ES5)
- LF line endings

## Customization

You can extend any configuration in your package:

```js
// .eslintrc.js
module.exports = {
  extends: ['@trendytradez/config/eslint'],
  rules: {
    // Your custom rules
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
```

## Benefits

- Consistent code style across all packages
- Single source of truth for configuration
- Easy updates (update once, apply everywhere)
- Reduces boilerplate in each package
