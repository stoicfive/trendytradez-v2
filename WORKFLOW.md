# TrendyTradez v2 - Development Workflow

## Overview

Automated development workflow with real-time dashboard tracking and GitHub integration.

## Daily Development Workflow

### 1. Start Development Environment

```bash
# Terminal 1: Start dashboard system
pnpm dashboard:start

# Terminal 2: Start dashboard UI (optional)
cd dashboard-app && npm run dev

# Terminal 3: Start development server
pnpm dev
```

### 2. Write Code

- Make changes to packages or apps
- File watcher automatically detects changes
- Dashboard updates in real-time (<3 seconds)
- No manual updates needed

### 3. Check Progress

```bash
# View current state
pnpm dashboard:state

# Check dashboard UI
open http://localhost:3003

# View stats
curl http://localhost:3001/api/stats | jq
```

### 4. Sync to GitHub (Optional)

```bash
# Sync packages and plans to GitHub
pnpm github:sync

# Test connection
pnpm github:test
```

### 5. Commit Changes

```bash
# Pre-commit hooks run automatically
git add .
git commit -m "feat: your feature description"

# Dashboard validates automatically
# Analysis runs on commit
```

## Package Development Workflow

### Creating New Package

```bash
# 1. Create package directory
mkdir packages/new-feature
cd packages/new-feature

# 2. Initialize package
pnpm init

# 3. Add to workspace
cd ../..
pnpm install

# 4. Dashboard detects automatically
# Check: curl http://localhost:3001/api/packages | jq
```

### Completing Package

Requirements for "complete" status:
- ✅ Has `dist/` folder (built)
- ✅ Has tests
- ✅ Has README.md
- ✅ No TODO/FIXME comments
- ✅ All dependencies resolved

Dashboard automatically marks complete when requirements met.

### Syncing to GitHub

```bash
# Sync package to GitHub milestone
pnpm github:sync

# Check GitHub
open https://github.com/stoicfive/trendytradez-v2/milestones
```

## Implementation Plan Workflow

### Creating Plan

```bash
# 1. Create plan file
touch implementation/plans/PLAN_NEW_FEATURE.md

# 2. Add tasks with checkboxes
# - [ ] Task 1
# - [ ] Task 2
# - [x] Task 3 (completed)

# 3. Dashboard detects automatically
# Progress calculated from checked boxes
```

### Tracking Progress

- Dashboard shows progress percentage
- Updates automatically when you check tasks
- Syncs to GitHub tracking issue

### Completing Plan

- Check all tasks
- Dashboard shows 100% progress
- GitHub issue auto-closes (if synced)

## Testing Workflow

### Running Tests

```bash
# All tests
pnpm test

# Specific package
cd packages/widgets && pnpm test

# Watch mode
pnpm test --watch

# Coverage automatically calculated
# Dashboard shows coverage percentage
```

### Before Committing

```bash
pnpm lint
pnpm type-check
pnpm test
pnpm format
```

Pre-commit hooks run these automatically.

## GitHub Integration Workflow

### Initial Setup

```bash
# 1. Create .env file
cp .env.example .env

# 2. Add GitHub token
# Get from: https://github.com/settings/tokens

# 3. Test connection
pnpm github:test

# 4. Initial sync
pnpm github:sync
```

### Ongoing Sync

**Automatic** (when file watcher running):
- Code changes → Dashboard updates
- Dashboard updates → Available for sync

**Manual** (when needed):
```bash
pnpm github:sync
```

### Webhook Setup (Optional)

For GitHub → Dashboard updates:

```bash
# 1. Start webhook server
pnpm github:webhooks

# 2. Configure in GitHub
# Settings → Webhooks → Add webhook
# URL: https://your-domain.com/webhooks/github
# Secret: From .env file
```

## Troubleshooting Workflow

### Dashboard Not Updating

```bash
# 1. Check services running
curl http://localhost:3001/api/health
curl http://localhost:3004/health

# 2. Restart dashboard
pnpm dashboard:start

# 3. Manual analysis
pnpm dashboard:analyze
```

### GitHub Sync Issues

```bash
# 1. Test connection
pnpm github:test

# 2. Check sync stats
node scripts/github-db.js stats

# 3. View mappings
node scripts/github-db.js mappings

# 4. Retry sync
pnpm github:sync
```

### Port Conflicts

```bash
# Kill processes on ports
lsof -ti:3001 | xargs kill  # API
lsof -ti:3002 | xargs kill  # WebSocket
lsof -ti:3003 | xargs kill  # Dashboard UI
lsof -ti:3004 | xargs kill  # Webhooks
```

## Best Practices

### Code Organization

- Keep packages focused and small
- Use workspace dependencies
- Follow naming conventions
- Write tests alongside code

### Documentation

- Update README when adding features
- Document breaking changes
- Keep implementation plans current
- Add JSDoc comments

### Git Workflow

- Use conventional commits
- Create feature branches
- Keep commits atomic
- Write descriptive messages

### Dashboard Usage

- Let automation handle updates
- Check dashboard before committing
- Sync to GitHub regularly
- Monitor sync statistics

## Automation Benefits

### What's Automated

✅ Package status detection
✅ Test coverage calculation
✅ TODO/FIXME extraction
✅ Plan progress tracking
✅ Commit history
✅ Dashboard updates
✅ GitHub synchronization
✅ Real-time UI updates

### What's Manual

❌ Writing code
❌ Creating plans
❌ Configuring GitHub token
❌ Reviewing changes
❌ Merging PRs

## Quick Reference

### Essential Commands

```bash
pnpm dashboard:start    # Start automation
pnpm dashboard:state    # View state
pnpm github:sync        # Sync to GitHub
pnpm github:test        # Test connection
pnpm dev                # Start dev server
pnpm test               # Run tests
```

### Essential URLs

- Dashboard UI: http://localhost:3003
- API: http://localhost:3001/api/stats
- GitHub Repo: https://github.com/stoicfive/trendytradez-v2
- Milestones: https://github.com/stoicfive/trendytradez-v2/milestones
- Issues: https://github.com/stoicfive/trendytradez-v2/issues

### Essential Files

- `.env` - Configuration
- `dashboard.db` - State database
- `COMMANDS.md` - All commands
- `QUICK_START.md` - Setup guide
- `PROJECT_MANAGEMENT_SYSTEM.md` - Full system docs

---

**Last Updated**: October 27, 2025  
**Version**: 2.0.0-alpha
