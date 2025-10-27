# Dashboard Organization Structure

## Current Structure

```
dashboard/
├── index.html              # Main dashboard UI
├── data/
│   └── project-status.json # Project state (auto-updated)
├── assets/
│   ├── css/
│   │   └── styles.css      # Dashboard styles
│   └── js/
│       └── navigation.js   # Dashboard interactions
├── INITIATIVES.md          # High-level initiative tracking
└── ORGANIZATION.md         # This file
```

## Proposed Reorganization

```
dashboard/
├── index.html
├── README.md               # Dashboard overview
├── data/
│   ├── project-status.json
│   ├── initiatives.json    # Structured initiative data
│   └── metrics.json        # Performance/quality metrics
├── assets/
│   ├── css/
│   │   ├── base.css        # Base styles (<500 lines)
│   │   ├── components.css  # Component styles (<500 lines)
│   │   └── utilities.css   # Utility classes
│   ├── js/
│   │   ├── dashboard.js    # Main dashboard logic (<500 lines)
│   │   ├── navigation.js   # Navigation (<500 lines)
│   │   ├── data-loader.js  # Data loading
│   │   └── renderer.js     # DOM rendering
│   └── icons/              # SVG icons
├── docs/
│   ├── INITIATIVES.md      # Initiative tracking
│   ├── ORGANIZATION.md     # This file
│   └── METRICS.md          # Metrics tracking
└── templates/              # HTML templates for sections
    ├── epic.html
    ├── story.html
    └── package.html
```

## Code Organization Rules

### File Size Limits
- **Maximum 500 lines per file**
- Split when approaching 400 lines
- Use modular imports/exports

### Modularity Principles
1. **Single Responsibility**: Each file does one thing
2. **Clear Boundaries**: Explicit imports/exports
3. **Reusability**: Extract common patterns
4. **Testability**: Easy to test in isolation

### Naming Conventions
- **Files**: kebab-case (e.g., `data-loader.js`)
- **Functions**: camelCase (e.g., `loadProjectData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FILE_SIZE`)
- **Classes**: PascalCase (e.g., `DashboardRenderer`)

### File Structure Template
```javascript
/**
 * @file Brief description
 * @module module-name
 */

// 1. Imports
import { dependency } from './path';

// 2. Constants
const CONFIG = {};

// 3. Types (if TypeScript)
interface DataType {}

// 4. Main logic
function mainFunction() {}

// 5. Exports
export { mainFunction };
```

## Initiative Organization

### Tracking Levels
1. **Initiatives** - High-level goals (months)
2. **Epics** - Major features (weeks)
3. **Stories** - User features (days)
4. **Tasks** - Implementation work (hours)

### Documentation Flow
```
INITIATIVES.md (high-level)
    ↓
dashboard/data/initiatives.json (structured)
    ↓
dashboard/index.html (visual)
    ↓
WORKFLOW_CHECKLIST.md (process)
```

## Maintenance Guidelines

### Weekly
- [ ] Update initiative status
- [ ] Check file sizes
- [ ] Review metrics
- [ ] Update dashboard data

### Monthly
- [ ] Reorganize if needed
- [ ] Archive completed initiatives
- [ ] Review code organization
- [ ] Update documentation

### Per Initiative
- [ ] Create feature branch
- [ ] Update INITIATIVES.md
- [ ] Follow file size limits
- [ ] Maintain modularity
- [ ] Update on completion

---

**Last Updated**: October 27, 2025
