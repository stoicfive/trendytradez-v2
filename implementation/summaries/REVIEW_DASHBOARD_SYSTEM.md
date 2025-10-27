# Dashboard System - Critical Review

## Critical Issues

### 1. **No Automated Codebase Watching**

**Problem**: Dashboard requires manual updates via CLI or JSON edits. No file system watching.
**Impact**: Defeats purpose of automated project management.
**Location**: `scripts/update-dashboard.js`, `dashboard/data/project-status.json`

### 2. **Hardcoded HTML Structure**

**Problem**: Epic/Story/Subtask hierarchy is hardcoded in `dashboard/index.html` (1211 lines). Not data-driven.
**Impact**: Cannot dynamically add/remove/update tasks from codebase changes.
**Location**: `dashboard/index.html` lines 600-940

### 3. **Disconnected from Codebase**

**Problem**: Dashboard data lives in isolated JSON. No integration with actual code files, git commits, or package.json changes.
**Impact**: Manual sync required. Data goes stale immediately.
**Location**: `dashboard/data/project-status.json`

### 4. **Inline Event Handlers**

**Problem**: Uses `onclick="toggleEpic('epic-1')"` in HTML instead of event delegation.
**Impact**: Not scalable for dynamic content. Violates CSP. Poor maintainability.
**Location**: `dashboard/index.html` lines 826, 836, etc.

### 5. **No Real-time Updates**

**Problem**: Dashboard is static HTML. Requires page refresh to see changes.
**Impact**: Not truly "automated" - user must manually refresh.
**Location**: All dashboard files

### 6. **Duplicate Data Sources**

**Problem**: Project status exists in 3 places: JSON, HTML, and actual codebase.
**Impact**: Constant sync issues. Single source of truth violated.
**Location**: `dashboard/data/project-status.json`, `dashboard/index.html`, actual packages

### 7. **No Tests**

**Problem**: Zero tests for dashboard scripts or data validation.
**Impact**: Breaking changes go unnoticed.
**Location**: No test files exist

### 8. **CLI Tool Limitations**

**Problem**: `update-dashboard.js` only updates JSON, not HTML structure. Stories/subtasks require manual HTML edits.
**Impact**: Half-automated solution. Still requires manual work.
**Location**: `scripts/update-dashboard.js` lines 89-94

## Architecture Flaws

- **Static HTML** instead of React/Vue components
- **No state management** for dynamic updates
- **No WebSocket/SSE** for real-time sync
- **No file watchers** (chokidar, nodemon)
- **No AST parsing** to detect code changes
- **No git hooks integration** beyond pre-commit validation
