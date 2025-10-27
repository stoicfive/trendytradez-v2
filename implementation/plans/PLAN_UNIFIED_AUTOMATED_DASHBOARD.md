# Unified Automated Dashboard System

## Overview

Build a **portable, automated project management system** that:
1. Works in any project (like `/project-management-system/`)
2. Fully automated with file watching (fixes current limitations)
3. Single implementation, reusable everywhere

## Current State Analysis

### `/dashboard/` (Project-specific)
- Hardcoded HTML with 1211 lines
- Manual CLI updates only
- Not portable
- Tightly coupled to TrendyTradez v2

### `/project-management-system/` (Portable)
- Designed for reuse across projects
- Has setup script and templates
- Still requires manual updates
- Same limitations as `/dashboard/`

### Shared Problems
- No file system watching
- No real-time updates
- Manual CLI updates required
- Hardcoded HTML structure
- Disconnected from actual codebase

## Solution: Unified Automated System

Build ONE system that:
- **Portable**: Drop into any project
- **Automated**: Watches codebase, updates automatically
- **Real-time**: WebSocket updates
- **Intelligent**: Derives data from code

## Architecture

```
┌─────────────────────────────────────────────────────┐
│         Automated Dashboard System (Portable)       │
├─────────────────────────────────────────────────────┤
│                                                      │
│  File Watcher → Code Analyzer → State Manager       │
│       ↓              ↓               ↓              │
│  Detects all    Extracts data   Single source       │
│  changes        from code        of truth           │
│                                      ↓              │
│                              WebSocket Server       │
│                                      ↓              │
│                              React Dashboard        │
│                                                      │
└─────────────────────────────────────────────────────┘
```

## Implementation Plan

### Phase 1: Core Engine (Week 1)

**Location**: `project-management-system/engine/`

**Components**:
1. **File Watcher** (`watcher.js`)
   - Monitor all code changes
   - Configurable paths and ignore patterns
   - Debounced updates

2. **Code Analyzer** (`analyzer.js`)
   - Parse package.json files
   - Extract git commits
   - Analyze test coverage
   - Detect TODOs/FIXMEs
   - Read implementation plans

3. **State Manager** (`state.js`)
   - SQLite database
   - Auto-generate epics/stories/tasks
   - Calculate progress
   - Single source of truth

**Deliverables**:
- `engine/watcher.js`
- `engine/analyzer.js`
- `engine/state.js`
- `engine/config.json` (user-configurable)

### Phase 2: Server Layer (Week 1-2)

**Location**: `project-management-system/server/`

**Components**:
1. **WebSocket Server** (`ws-server.js`)
   - Real-time updates to dashboard
   - Broadcast state changes
   - Handle reconnections

2. **REST API** (`api-server.js`)
   - `/api/status` - Current project status
   - `/api/packages` - Package list
   - `/api/commits` - Recent commits
   - `/api/health` - System health

**Deliverables**:
- `server/ws-server.js`
- `server/api-server.js`
- `server/index.js` (combined server)

### Phase 3: Dashboard UI (Week 2-3)

**Location**: `project-management-system/dashboard-app/`

**Components**:
1. **React Application**
   - Dynamic components (Epic, Story, Task)
   - WebSocket client
   - Real-time updates
   - Offline mode

2. **Build System**
   - Vite for fast builds
   - Production bundle
   - Static export for portability

**Deliverables**:
- `dashboard-app/src/` (React components)
- `dashboard-app/dist/` (Built dashboard)

### Phase 4: Setup & Portability (Week 3)

**Location**: `project-management-system/`

**Components**:
1. **Setup Script** (`setup.js`)
   - Interactive configuration
   - Auto-detect project structure
   - Install dependencies
   - Configure git hooks

2. **Templates** (`templates/`)
   - Config templates
   - Package.json scripts
   - Git hook templates

3. **Documentation**
   - Installation guide
   - Configuration guide
   - Cascade AI instructions

**Deliverables**:
- Enhanced `setup.js`
- Configuration templates
- Complete documentation

### Phase 5: Intelligence (Week 4)

**Location**: `project-management-system/intelligence/`

**Components**:
1. **Smart Analysis** (`insights.js`)
   - Detect package completion
   - Predict timelines
   - Suggest next tasks
   - Alert on issues

2. **Dependency Tracking** (`deps.js`)
   - Track package dependencies
   - Detect circular deps
   - Suggest build order

**Deliverables**:
- `intelligence/insights.js`
- `intelligence/deps.js`

## File Structure

```
project-management-system/
├── engine/                    # Core automation engine
│   ├── watcher.js            # File system watcher
│   ├── analyzer.js           # Code analyzer
│   ├── state.js              # State manager
│   └── config.json           # Configuration
│
├── server/                    # Server layer
│   ├── ws-server.js          # WebSocket server
│   ├── api-server.js         # REST API
│   └── index.js              # Combined server
│
├── dashboard-app/             # React dashboard
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── App.tsx
│   ├── dist/                 # Built dashboard
│   └── package.json
│
├── intelligence/              # Smart features
│   ├── insights.js
│   └── deps.js
│
├── scripts/                   # Setup & utilities
│   ├── setup.js              # Interactive setup
│   ├── install.js            # Install system
│   └── migrate.js            # Migrate from old system
│
├── templates/                 # Configuration templates
│   ├── config.template.json
│   ├── package.json.template
│   └── .env.template
│
├── docs/                      # Documentation
│   ├── SETUP.md
│   ├── CONFIGURATION.md
│   ├── CASCADE_WORKFLOW.md
│   └── API.md
│
├── dashboard.db              # SQLite database
├── config.json               # User configuration
└── README.md
```

## Configuration

**`config.json`** (user-editable):

```json
{
  "project": {
    "name": "Your Project",
    "description": "Project description",
    "root": "."
  },
  "watch": {
    "paths": ["packages/**", "apps/**", "*.md"],
    "ignore": ["node_modules", "dist", ".git"],
    "debounce": 500
  },
  "analysis": {
    "detectTodos": true,
    "calculateCoverage": true,
    "trackCommits": true,
    "parseImplementationPlans": true
  },
  "server": {
    "port": 3001,
    "wsPort": 3002,
    "host": "localhost"
  },
  "dashboard": {
    "title": "Project Dashboard",
    "theme": "dark",
    "autoRefresh": true
  }
}
```

## Installation (Any Project)

```bash
# 1. Copy system to project
cp -r project-management-system /path/to/your/project/

# 2. Run setup
cd your-project
node project-management-system/scripts/setup.js

# 3. Start system
pnpm dashboard:start
```

## Commands

```bash
# Start everything (watcher + server + UI)
pnpm dashboard:start

# Start individual components
pnpm dashboard:watch     # File watcher only
pnpm dashboard:serve     # Server only
pnpm dashboard:ui        # UI only

# Utilities
pnpm dashboard:analyze   # Manual analysis
pnpm dashboard:reset     # Reset state
pnpm dashboard:config    # Edit configuration
```

## Migration Path

### Step 1: Build New System
- Implement in `/project-management-system/`
- Keep old `/dashboard/` as reference
- Test with TrendyTradez v2

### Step 2: Test & Validate
- Run alongside old system
- Verify accuracy
- Fix bugs

### Step 3: Replace Old System
- Deprecate `/dashboard/`
- Deprecate manual CLI tools
- Update documentation

### Step 4: Extract & Package
- Make fully portable
- Test in new project
- Publish as npm package (optional)

## Success Criteria

- [ ] Drop into any project in <5 minutes
- [ ] Zero manual updates required
- [ ] Dashboard updates within 1 second
- [ ] Works offline with cached state
- [ ] Handles 1000+ files without lag
- [ ] 100% accurate status detection
- [ ] Fully documented
- [ ] Tested in 3+ different projects

## Dependencies

```json
{
  "dependencies": {
    "chokidar": "^3.5.3",
    "@babel/parser": "^7.23.0",
    "typescript": "^5.8.0",
    "simple-git": "^3.20.0",
    "better-sqlite3": "^9.2.0",
    "express": "^4.18.0",
    "ws": "^8.14.0",
    "glob": "^10.3.0"
  },
  "dashboard": {
    "react": "^18.3.1",
    "vite": "^5.0.0",
    "zustand": "^4.5.0",
    "tailwindcss": "^3.4.0"
  }
}
```

## Timeline

- **Week 1**: Core engine (watcher, analyzer, state)
- **Week 2**: Server layer + basic dashboard
- **Week 3**: Full dashboard UI + portability
- **Week 4**: Intelligence layer + polish

**Total**: 4 weeks

## Benefits

### For TrendyTradez v2
- Replace broken manual system
- Fully automated tracking
- Real-time updates

### For Future Projects
- Drop-in solution
- Zero configuration needed
- Works immediately

### For Development
- Single codebase to maintain
- Reusable across all projects
- Open source potential

## Next Steps

1. Create `/project-management-system/engine/` directory
2. Implement file watcher
3. Implement code analyzer
4. Build state manager
5. Create WebSocket server
6. Build React dashboard
7. Test in TrendyTradez v2
8. Extract and make portable
9. Test in new project
10. Document everything

---

**Goal**: One automated dashboard system, works everywhere, zero manual updates.
