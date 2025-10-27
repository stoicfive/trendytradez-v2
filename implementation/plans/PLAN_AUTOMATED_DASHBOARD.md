# Implementation Plan: Automated Project Dashboard

## Objective

Build a fully automated project management dashboard that watches codebase changes and updates the UI in real-time without manual intervention.

## Architecture

### Core Components

1. **File System Watcher** - Monitor all code changes
2. **Code Analyzer** - Parse files to extract project data
3. **State Manager** - Single source of truth for project status
4. **Real-time Server** - Push updates to dashboard
5. **React Dashboard** - Dynamic UI that updates automatically

## Implementation Steps

### Phase 1: File System Watcher (Week 1)

**Goal**: Detect all file changes in codebase

**Tasks**:
- Install chokidar for file watching
- Watch `packages/*/`, `apps/*/`, `*.md`, `package.json` files
- Debounce changes (500ms) to avoid excessive updates
- Log all detected changes with timestamps
- Ignore `node_modules/`, `dist/`, `.git/`

**Deliverables**:
- `scripts/watcher.js` - File system watcher
- Logs showing detected changes

### Phase 2: Code Analyzer (Week 1-2)

**Goal**: Extract project data from codebase automatically

**Tasks**:
- Parse `package.json` files to detect packages and their status
- Analyze test files to calculate coverage
- Parse git commits to track progress
- Read implementation plan markdown files
- Extract TODO/FIXME comments from code
- Detect new files, modified files, deleted files

**Deliverables**:
- `scripts/analyzer.js` - Code analysis engine
- Functions: `analyzePackages()`, `analyzeTests()`, `analyzeCommits()`

### Phase 3: State Manager (Week 2)

**Goal**: Single source of truth derived from codebase

**Tasks**:
- Create state schema matching dashboard needs
- Auto-generate epics from implementation plans
- Auto-generate stories from package.json files
- Auto-generate subtasks from test files
- Calculate progress percentages automatically
- Detect blockers from code comments
- Store state in SQLite for persistence

**Deliverables**:
- `scripts/state-manager.js` - State management
- `dashboard.db` - SQLite database

### Phase 4: Real-time Server (Week 2-3)

**Goal**: Push updates to dashboard instantly

**Tasks**:
- Create Express server with WebSocket support
- Integrate file watcher with state manager
- Broadcast state changes to connected clients
- Add REST API for manual queries
- Implement reconnection logic
- Add health check endpoint

**Deliverables**:
- `scripts/server.js` - WebSocket server
- API endpoints: `/api/status`, `/api/packages`, `/api/commits`

### Phase 5: React Dashboard (Week 3-4)

**Goal**: Dynamic UI that updates automatically

**Tasks**:
- Migrate from static HTML to React
- Use WebSocket client for real-time updates
- Implement Epic/Story/Subtask components
- Add animations for status changes
- Show live update indicators
- Add manual refresh button as fallback
- Make fully responsive

**Deliverables**:
- `dashboard-app/` - React application
- Components: `Epic`, `Story`, `Subtask`, `StatusCard`

### Phase 6: Intelligence Layer (Week 4)

**Goal**: Smart insights and predictions

**Tasks**:
- Detect when packages are "done" (tests pass, no TODOs)
- Predict completion dates based on velocity
- Suggest next tasks based on dependencies
- Alert on stale branches or PRs
- Detect breaking changes

**Deliverables**:
- `scripts/intelligence.js` - Smart analysis
- Dashboard insights section

## Technical Stack

- **File Watching**: chokidar
- **Code Parsing**: @babel/parser, typescript compiler API
- **Git Integration**: simple-git
- **Database**: better-sqlite3
- **Server**: Express + ws (WebSocket)
- **Frontend**: React 18 + Vite
- **State**: Zustand or Jotai
- **Styling**: Tailwind CSS

## Data Flow

```
Code Change → Watcher → Analyzer → State Manager → WebSocket → React Dashboard
     ↓                                    ↓
  Git Commit                         SQLite DB
```

## Configuration

```json
{
  "watch": {
    "paths": ["packages/**", "apps/**", "*.md"],
    "ignore": ["node_modules", "dist", ".git"],
    "debounce": 500
  },
  "analysis": {
    "detectTodos": true,
    "calculateCoverage": true,
    "trackCommits": true
  },
  "server": {
    "port": 3001,
    "wsPort": 3002
  }
}
```

## File Structure

```
scripts/
├── watcher.js           # File system watcher
├── analyzer.js          # Code analysis
├── state-manager.js     # State management
├── server.js            # WebSocket server
└── intelligence.js      # Smart insights

dashboard-app/
├── src/
│   ├── components/
│   │   ├── Epic.tsx
│   │   ├── Story.tsx
│   │   ├── Subtask.tsx
│   │   └── StatusCard.tsx
│   ├── hooks/
│   │   └── useWebSocket.ts
│   ├── App.tsx
│   └── main.tsx
└── package.json

dashboard.db             # SQLite database
config.json              # Configuration
```

## Success Criteria

- [ ] Dashboard updates within 1 second of code change
- [ ] Zero manual updates required
- [ ] 100% accurate package status detection
- [ ] Real-time commit tracking
- [ ] Automatic epic/story generation
- [ ] Test coverage calculated automatically
- [ ] Works offline (uses cached state)
- [ ] Handles 1000+ file changes without lag

## Migration Path

1. Keep existing HTML dashboard as fallback
2. Build new system alongside
3. Test with subset of packages
4. Gradual rollout
5. Deprecate old system once stable

## Testing Strategy

- Unit tests for analyzer functions
- Integration tests for watcher → state flow
- E2E tests for WebSocket communication
- Load tests with simulated file changes
- Manual testing with real development workflow

## Risks & Mitigation

**Risk**: File watcher performance issues
**Mitigation**: Debouncing, ignore patterns, incremental updates

**Risk**: State synchronization bugs
**Mitigation**: Immutable state, transaction logs, rollback capability

**Risk**: WebSocket connection drops
**Mitigation**: Auto-reconnect, offline mode, state persistence

**Risk**: Parsing errors on malformed code
**Mitigation**: Try-catch, graceful degradation, error reporting

## Timeline

- Week 1: File watcher + basic analyzer
- Week 2: State manager + server
- Week 3: React dashboard + WebSocket
- Week 4: Intelligence layer + polish

**Total**: 4 weeks for full automation

## Dependencies

```json
{
  "chokidar": "^3.5.3",
  "@babel/parser": "^7.23.0",
  "typescript": "^5.8.0",
  "simple-git": "^3.20.0",
  "better-sqlite3": "^9.2.0",
  "express": "^4.18.0",
  "ws": "^8.14.0",
  "react": "^18.3.1",
  "vite": "^5.0.0",
  "zustand": "^4.5.0"
}
```

## Commands

```bash
# Start automated dashboard system
pnpm dashboard:watch

# Start dashboard server
pnpm dashboard:serve

# Start dashboard UI
pnpm dashboard:dev

# Run all (watcher + server + UI)
pnpm dashboard:start

# Analyze codebase manually
pnpm dashboard:analyze

# Reset dashboard state
pnpm dashboard:reset
```

## Notes

- This replaces manual CLI updates completely
- Dashboard becomes the single source of truth
- All project data derived from actual code
- No more JSON editing or HTML updates
- True "automated project management"
