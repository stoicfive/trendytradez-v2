# Cascade AI Workflow Instructions

Instructions for Cascade AI on how to use this Project Management System.

## 🎯 Overview

This project uses an **automated dashboard system** for tracking progress. As Cascade AI, you should:
1. Update the dashboard after completing work
2. Validate data before committing
3. Follow the established workflow patterns

## 📍 System Location

The dashboard system is located at:
- **Data**: `project-management-system/dashboard/data/project-status.json`
- **Scripts**: `project-management-system/scripts/`
- **Dashboard UI**: `project-management-system/dashboard/index.html`

## 🔄 Workflow Patterns

### After Completing a Package

```bash
# Update package status
pnpm dashboard:update --package="@org/package-name" --status="complete"

# Validate
pnpm dashboard:validate

# Commit
git add project-management-system/dashboard/data/project-status.json
git commit -m "docs: mark package-name as complete"
```

### After Each Significant Commit

```bash
# Add commit to dashboard
pnpm dashboard:update --add-commit="feat: your commit message"
```

### When Starting New Work

```bash
# Update current task
pnpm dashboard:update --current-task="Build New Feature" --task-desc="Description of the work"
```

### When Blocked

```bash
# Set blocker
pnpm dashboard:update --set-blocker="Waiting for API documentation"

# Clear when resolved
pnpm dashboard:update --clear-blocker
```

## 📊 What to Update

### Automatically Updated (via CLI)
- ✅ Package statuses
- ✅ Stats (percentages, counts)
- ✅ Current tasks
- ✅ Blockers
- ✅ Recent commits
- ✅ Timestamps

### Manually Updated (edit JSON)
- ⚠️ Package list (adding new packages)
- ⚠️ Epic/Story structure
- ⚠️ Current status items
- ⚠️ Next actions list

## 🎨 CLI Commands Reference

### Package Management
```bash
# Mark package complete
pnpm dashboard:update --package="@org/name" --status="complete"

# Mark in progress
pnpm dashboard:update --package="@org/name" --status="in-progress"

# Mark pending
pnpm dashboard:update --package="@org/name" --status="pending"
```

### Progress Tracking
```bash
# Update plan progress
pnpm dashboard:update --plan --status="3/8"
```

### Task Management
```bash
# Update current task
pnpm dashboard:update --current-task="Task Name" --task-desc="Description"
```

### Blocker Management
```bash
# Set blocker
pnpm dashboard:update --set-blocker="Reason for blocker"

# Clear blocker
pnpm dashboard:update --clear-blocker
```

### Commit Tracking
```bash
# Add commit to dashboard
pnpm dashboard:update --add-commit="commit message"
```

### Validation
```bash
# Always validate before committing
pnpm dashboard:validate
```

## 🔍 Pre-commit Hook

The system has a pre-commit hook that automatically validates dashboard data.

**What it checks:**
- JSON schema compliance
- Percentage calculations
- Package count consistency
- Data integrity

**If validation fails:**
1. Run `pnpm dashboard:validate` to see errors
2. Fix the issues in `project-status.json`
3. Try committing again

**To bypass (emergency only):**
```bash
git commit --no-verify
```

## 📝 Best Practices

### 1. Update After Each Milestone
```bash
# Complete a feature
git commit -m "feat: implement feature X"

# Update dashboard
pnpm dashboard:update --add-commit="feat: implement feature X"
```

### 2. Keep Stats Accurate
```bash
# After completing work, update immediately
pnpm dashboard:update --package="@org/name" --status="complete"
```

### 3. Communicate Blockers
```bash
# If blocked, update dashboard
pnpm dashboard:update --set-blocker="Clear description of blocker"
```

### 4. Validate Before Committing
```bash
# Always validate
pnpm dashboard:validate

# Then commit
git add project-management-system/dashboard/data/project-status.json
git commit -m "docs: update dashboard"
```

## 🎯 When to Update

### ✅ Always Update After:
- Completing a package
- Finishing a major feature
- Significant commits
- Changing project phase
- Encountering blockers
- Resolving blockers

### ⚠️ Consider Updating After:
- Minor bug fixes
- Documentation updates
- Refactoring work
- Test additions

### ❌ Don't Update For:
- Typo fixes
- Formatting changes
- Comment updates
- Very minor tweaks

## 🔧 Troubleshooting

### Validation Fails
```bash
# See detailed errors
pnpm dashboard:validate

# Common issues:
# - Percentage mismatch: Recalculate manually
# - Package count wrong: Check complete packages
# - Invalid JSON: Use JSON validator
```

### CLI Command Fails
```bash
# Check command syntax
pnpm dashboard:update --help

# Verify file exists
ls project-management-system/dashboard/data/project-status.json

# Check Node.js version
node --version  # Should be 16+
```

### Dashboard Not Updating
```bash
# Refresh browser
# Check browser console for errors
# Verify JSON is valid
pnpm dashboard:validate
```

## 📚 Additional Resources

- **[USAGE.md](./USAGE.md)** - Detailed usage guide
- **[SETUP.md](./SETUP.md)** - Installation guide
- **Data Schema**: `dashboard/data/schema.json`
- **Update Script**: `scripts/update-dashboard.js`

## 🎓 Example Workflow

Here's a complete example of a typical workflow:

```bash
# 1. Start new feature
pnpm dashboard:update --current-task="Build Authentication" --task-desc="Implement JWT auth"

# 2. Do the work
# ... write code ...

# 3. Commit work
git add .
git commit -m "feat: implement JWT authentication"

# 4. Update dashboard
pnpm dashboard:update --add-commit="feat: implement JWT authentication"
pnpm dashboard:update --package="@org/auth" --status="complete"

# 5. Validate
pnpm dashboard:validate

# 6. Commit dashboard update
git add project-management-system/dashboard/data/project-status.json
git commit -m "docs: mark auth package complete"

# 7. View dashboard
pnpm dashboard:dev
```

## 💡 Tips for Cascade AI

1. **Be Proactive** - Update dashboard as you complete work, not at the end
2. **Use CLI Tools** - Don't manually edit JSON unless necessary
3. **Always Validate** - Run validation before committing
4. **Keep It Current** - Dashboard should always reflect actual project state
5. **Communicate** - Use blockers to communicate issues

---

**Remember**: The dashboard is the single source of truth for project status. Keep it updated!
