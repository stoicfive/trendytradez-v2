# TrendyTradez v2 - Development Workflow

## 📋 Overview

This document describes the automated workflow for managing the TrendyTradez v2 project.

## 🚀 Quick Start

### Daily Development
```bash
# Start development
pnpm dev

# Run dashboard locally
pnpm dashboard:dev

# Update dashboard after completing work
pnpm dashboard:update --package="@trendytradez/widgets" --status="complete"

# Validate changes
pnpm dashboard:validate

# Commit (pre-commit hooks run automatically)
git add .
git commit -m "feat: complete widgets package"
```

## 📊 Dashboard Management

### Automated Updates

Instead of manually editing HTML, use the CLI:

```bash
# Update package status
pnpm dashboard:update --package="@trendytradez/widgets" --status="complete"
pnpm dashboard:update --package="@trendytradez/dashboard" --status="in-progress"

# Update plan progress
pnpm dashboard:update --plan --status="3/8"

# Add commit to dashboard
pnpm dashboard:update --add-commit="feat: implement new feature"

# Update current task
pnpm dashboard:update --current-task="Build Dashboard" --task-desc="Create canvas layout"

# Set/clear blockers
pnpm dashboard:update --set-blocker="Waiting for API docs"
pnpm dashboard:update --clear-blocker
```

### Manual Data Editing

Edit `dashboard/data/project-status.json` directly if needed:

```json
{
  "stats": {
    "packagesCreated": {
      "current": 6,
      "total": 9,
      "percentage": 67
    }
  },
  "packages": [
    {
      "name": "@trendytradez/widgets",
      "description": "Widget system package",
      "status": "complete"
    }
  ]
}
```

Always run validation after manual edits:
```bash
pnpm dashboard:validate
```

## 🔍 Pre-commit Hooks

Automatically runs on every commit:

1. **Dashboard Validation** - Ensures data integrity
2. **Linting** - Fixes code style issues
3. **Type Checking** - Catches TypeScript errors
4. **Tests** - Runs all unit tests

To bypass (emergency only):
```bash
git commit --no-verify
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests for specific package
pnpm --filter @trendytradez/widgets test
```

## 🏗️ Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @trendytradez/widgets build

# Clean and rebuild
pnpm clean && pnpm build
```

## 📝 Code Quality

```bash
# Lint all code
pnpm lint

# Format all code
pnpm format

# Type check
pnpm type-check
```

## 🎯 Workflow Best Practices

### 1. Feature Development

```bash
# 1. Create feature branch
git checkout -b feature/new-widget

# 2. Develop feature
# ... write code ...

# 3. Update dashboard
pnpm dashboard:update --current-task="Building new widget"

# 4. Run tests
pnpm test

# 5. Commit (hooks run automatically)
git add .
git commit -m "feat: add new widget type"

# 6. Update dashboard on completion
pnpm dashboard:update --add-commit="feat: add new widget type"
```

### 2. Package Completion

```bash
# 1. Mark package as complete
pnpm dashboard:update --package="@trendytradez/widgets" --status="complete"

# 2. Validate
pnpm dashboard:validate

# 3. Commit dashboard update
git add dashboard/data/project-status.json
git commit -m "docs: mark widgets package as complete"
```

### 3. Handling Blockers

```bash
# Set blocker
pnpm dashboard:update --set-blocker="Waiting for design approval"

# Clear when resolved
pnpm dashboard:update --clear-blocker
```

## 📂 Project Structure

```
trendytradez-v2/
├── packages/           # Monorepo packages
├── apps/              # Applications
├── dashboard/         # Project dashboard
│   ├── data/         # Dashboard data (JSON)
│   ├── assets/       # CSS, JS, icons
│   └── index.html    # Dashboard UI
├── scripts/          # Automation scripts
│   ├── validate-dashboard.js
│   └── update-dashboard.js
└── .husky/           # Git hooks
```

## 🔄 CI/CD Pipeline

### GitHub Actions (Future)

```yaml
# Planned workflow
- Validate dashboard data
- Run linting
- Run type checking
- Run tests
- Build packages
- Deploy dashboard
```

## 📚 Additional Resources

- [Dashboard Scripts README](./scripts/README.md)
- [Dashboard Update Checklist](./DASHBOARD_UPDATE_CHECKLIST.md)
- [Project Summary](./PROJECT_SUMMARY.md)
- [Commands Reference](./COMMANDS.md)

## 🆘 Troubleshooting

### Pre-commit Hook Fails

```bash
# Check what failed
pnpm dashboard:validate  # Dashboard validation
pnpm lint               # Linting
pnpm type-check         # Type checking
pnpm test               # Tests

# Fix issues and try again
git add .
git commit -m "fix: resolve issues"
```

### Dashboard Validation Errors

```bash
# View detailed errors
pnpm dashboard:validate

# Common issues:
# - Percentage mismatch: Recalculate manually
# - Package count mismatch: Check package statuses
# - Invalid JSON: Use JSON validator
```

### Development Server Issues

```bash
# Kill existing server
lsof -ti:3000 | xargs kill -9

# Restart
pnpm dashboard:dev
```

## 💡 Tips

1. **Always validate** after updating dashboard data
2. **Use CLI tools** instead of manual HTML editing
3. **Run tests** before committing
4. **Keep commits atomic** - one feature per commit
5. **Update dashboard** as you complete work, not at the end

## 🎓 Learning Resources

- [Turborepo Docs](https://turbo.build/repo/docs)
- [PNPM Workspaces](https://pnpm.io/workspaces)
- [Husky Git Hooks](https://typicode.github.io/husky/)
- [JSON Schema](https://json-schema.org/)
