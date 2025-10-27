# Implementation Plan: Shared Packages

## Overview
Create foundational shared packages that will be used across all apps and features in the monorepo.

---

## Objectives
- ✅ Create `@trendytradez/types` package for shared TypeScript types
- ✅ Create `@trendytradez/utils` package for utility functions
- ✅ Create `@trendytradez/ui` package for shared UI components
- ✅ Create `@trendytradez/theme` package for theming system
- ✅ Create `@trendytradez/config` package for shared configuration
- ✅ Ensure all packages are properly typed and tested

---

## Success Criteria
- [ ] All packages compile without TypeScript errors
- [ ] All packages have >80% test coverage
- [ ] Packages can be imported by other packages/apps
- [ ] Documentation exists for all public APIs
- [ ] Storybook stories created for UI components

---

## Package Structure

### @trendytradez/types
```
packages/types/
├── src/
│   ├── widget.ts          # Widget-related types
│   ├── dashboard.ts       # Dashboard types
│   ├── theme.ts           # Theme types
│   ├── user.ts            # User types (future)
│   └── index.ts           # Barrel export
├── package.json
├── tsconfig.json
└── README.md
```

### @trendytradez/utils
```
packages/utils/
├── src/
│   ├── math/              # Math utilities
│   ├── string/            # String utilities
│   ├── date/              # Date utilities
│   ├── validation/        # Validation utilities
│   └── index.ts
├── __tests__/
├── package.json
├── tsconfig.json
└── README.md
```

### @trendytradez/ui
```
packages/ui/
├── src/
│   ├── Button/
│   ├── Card/
│   ├── Modal/
│   ├── Input/
│   ├── Select/
│   └── index.ts
├── __tests__/
├── .storybook/
├── package.json
├── tsconfig.json
└── README.md
```

### @trendytradez/theme
```
packages/theme/
├── src/
│   ├── ThemeProvider.tsx
│   ├── useTheme.ts
│   ├── palettes/
│   │   ├── dark.ts
│   │   ├── light.ts
│   │   └── index.ts
│   ├── tokens/
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   └── index.ts
├── __tests__/
├── package.json
├── tsconfig.json
└── README.md
```

### @trendytradez/config
```
packages/config/
├── src/
│   ├── eslint/
│   ├── typescript/
│   ├── vitest/
│   └── index.ts
├── package.json
└── README.md
```

---

## Implementation Steps

### Step 1: Create @trendytradez/types Package
**Acceptance Criteria**: Types package compiles and exports all types

**Tasks**:
1. Create package structure
2. Define core types:
   ```typescript
   // widget.ts
   export interface Widget {
     id: string;
     type: WidgetType;
     position: Position;
     size: Size;
     config: WidgetConfig;
   }
   
   export type WidgetType = 
     | 'tradingview' 
     | 'calculator' 
     | 'chart' 
     | 'table' 
     | 'note';
   
   export interface Position {
     x: number;
     y: number;
     z?: number;
   }
   
   export interface Size {
     width: number;
     height: number;
   }
   ```
3. Create barrel exports
4. Add JSDoc documentation
5. Configure package.json with proper exports

### Step 2: Create @trendytradez/utils Package
**Acceptance Criteria**: Utils package has 100% test coverage

**Tasks**:
1. Create package structure
2. Implement utility functions:
   ```typescript
   // math/clamp.ts
   export function clamp(value: number, min: number, max: number): number {
     return Math.min(Math.max(value, min), max);
   }
   
   // string/truncate.ts
   export function truncate(str: string, maxLength: number): string {
     return str.length > maxLength 
       ? `${str.slice(0, maxLength)}...` 
       : str;
   }
   
   // validation/isValidEmail.ts
   export function isValidEmail(email: string): boolean {
     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
   }
   ```
3. Write comprehensive unit tests
4. Add JSDoc documentation
5. Create barrel exports

### Step 3: Create @trendytradez/ui Package
**Acceptance Criteria**: UI components render correctly and have Storybook stories

**Tasks**:
1. Create package structure
2. Set up Storybook configuration
3. Implement base components:
   - Button (primary, secondary, ghost variants)
   - Card (with header, body, footer)
   - Modal (with focus trap and accessibility)
   - Input (text, number, email)
   - Select (dropdown)
4. Add component tests
5. Create Storybook stories for each component
6. Ensure WCAG 2.1 AA compliance
7. Add prop type documentation

### Step 4: Create @trendytradez/theme Package
**Acceptance Criteria**: Theme system works with dark/light modes

**Tasks**:
1. Create package structure
2. Define design tokens:
   ```typescript
   // tokens/colors.ts
   export const colors = {
     primary: {
       50: '#e3f2fd',
       100: '#bbdefb',
       // ... more shades
       900: '#0d47a1',
     },
     // ... more color scales
   };
   ```
3. Create theme palettes (dark, light)
4. Implement ThemeProvider component
5. Create useTheme hook
6. Add localStorage persistence
7. Support system preference detection
8. Add tests for theme switching

### Step 5: Create @trendytradez/config Package
**Acceptance Criteria**: Config package exports shareable configs

**Tasks**:
1. Create package structure
2. Create shareable ESLint config
3. Create shareable TypeScript config
4. Create shareable Vitest config
5. Document usage for each config

### Step 6: Set Up Package Dependencies
**Acceptance Criteria**: All packages install and build correctly

**Tasks**:
1. Configure internal package dependencies
2. Add external dependencies (React, etc.)
3. Test package installation: `pnpm install`
4. Test package builds: `pnpm turbo build`

### Step 7: Create Documentation
**Acceptance Criteria**: Each package has comprehensive README

**Tasks**:
1. Write README for each package
2. Include installation instructions
3. Add usage examples
4. Document all public APIs
5. Add migration guides (if applicable)

---

## Dependencies

### @trendytradez/types
```json
{
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.8.0"
  }
}
```

### @trendytradez/utils
```json
{
  "dependencies": {
    "@trendytradez/types": "workspace:*"
  },
  "devDependencies": {
    "vitest": "^3.0.0"
  }
}
```

### @trendytradez/ui
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@trendytradez/types": "workspace:*",
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.0"
  },
  "devDependencies": {
    "@storybook/react": "^8.0.0",
    "@testing-library/react": "^14.0.0",
    "vitest": "^3.0.0"
  }
}
```

### @trendytradez/theme
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "@trendytradez/types": "workspace:*"
  },
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "vitest": "^3.0.0"
  }
}
```

---

## Testing Requirements

### Unit Tests
- [ ] All utility functions tested
- [ ] Theme switching logic tested
- [ ] Type guards and validators tested

### Component Tests
- [ ] All UI components render correctly
- [ ] Component props work as expected
- [ ] Accessibility attributes present
- [ ] Keyboard navigation works

### Integration Tests
- [ ] Theme provider works with components
- [ ] Utils work with types
- [ ] Cross-package imports work

---

## Potential Risks

### Risk 1: Circular Dependencies
**Mitigation**: Establish clear dependency hierarchy, use dependency graph tools

### Risk 2: Type Complexity
**Mitigation**: Start with simple types, iterate based on usage

### Risk 3: Over-Engineering Utils
**Mitigation**: Only add utils when needed by multiple packages, avoid premature abstraction

---

## Timeline
- **Estimated Effort**: 3-4 days
- **Phase**: Foundation (Week 1-2)

---

## Related Plans
- PLAN_00_PROJECT_SETUP.md (prerequisite)
- PLAN_02_WIDGET_SYSTEM.md (depends on this)
- PLAN_03_DASHBOARD_CORE.md (depends on this)

---

## Notes
- Keep packages focused and single-purpose
- Avoid premature optimization
- Document breaking changes clearly
- Use semantic versioning for packages

---

**Status**: Pending  
**Priority**: High  
**Assignee**: TBD  
**Created**: October 27, 2025
