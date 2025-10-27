# Dashboard Scripts

Automation scripts for managing the TrendyTradez dashboard.

## Available Scripts

### `validate-dashboard.js`

Validates dashboard data against the JSON schema.

```bash
pnpm dashboard:validate
```

**Checks:**
- Schema validation
- Percentage calculations
- Package count consistency
- Data integrity

### `update-dashboard.js`

CLI tool to update dashboard data programmatically.

```bash
# Update package status
pnpm dashboard:update --package="@trendytradez/widgets" --status="complete"

# Update plan progress
pnpm dashboard:update --plan --status="3/8"

# Add recent commit
pnpm dashboard:update --add-commit="feat: add new feature"

# Update current task
pnpm dashboard:update --current-task="Build Dashboard Core" --task-desc="Create canvas layout"

# Set blocker
pnpm dashboard:update --set-blocker="Waiting for API documentation"

# Clear blocker
pnpm dashboard:update --clear-blocker
```

**Features:**
- Automatic percentage calculation
- Commit tracking
- Timestamp updates
- Data validation

## Workflow

### Manual Update (Old Way)
```bash
# Edit dashboard/index.html manually (100+ lines)
git add dashboard/index.html
git commit -m "update dashboard"
```

### Automated Update (New Way)
```bash
# Update via CLI (one command)
pnpm dashboard:update --package="@trendytradez/widgets" --status="complete"

# Validation runs automatically in pre-commit hook
git add dashboard/data/project-status.json
git commit -m "feat: complete widgets package"
```

## Pre-commit Hook

Automatically runs on every commit:
1. Validates dashboard data
2. Runs linter
3. Runs type checker
4. Runs tests

To bypass (not recommended):
```bash
git commit --no-verify
```

## Development Server

Start live-reloading dashboard:
```bash
pnpm dashboard:dev
```

Opens at `http://localhost:3000`

## Data Structure

Dashboard data is stored in `dashboard/data/project-status.json`:

```json
{
  "meta": { "lastUpdated": "...", "version": "..." },
  "stats": { "plansComplete": {...}, "packagesCreated": {...} },
  "packages": [...],
  "currentStatus": [...],
  "nextActions": [...],
  "blockers": {...},
  "recentCommits": [...]
}
```

Schema validation ensures data integrity.
