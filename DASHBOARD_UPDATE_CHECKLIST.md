# Dashboard Update Checklist

This checklist ensures the project dashboard stays current after each implementation step.

## 🚀 Dashboard System (Automated)

The dashboard now uses **automated updates** via JSON data:

### Dashboard Location
- **Data**: `/dashboard/data/project-status.json` (single source of truth)
- **UI**: `/dashboard/index.html` (dynamically renders from JSON)
- **Styles**: `/dashboard/assets/css/styles.css`
- **Scripts**: 
  - `/dashboard/assets/js/navigation.js` (navigation & collapsible)
  - `/dashboard/assets/js/data-loader.js` (dynamic rendering)
  - `/dashboard/assets/js/icons.js` (SVG icons)

### Legacy Files
- `project-dashboard.html` → Redirect to new dashboard
- `project-dashboard.html.deprecated` → Old static version (backup)

## ⚡ Quick Update Commands

Use the CLI tool instead of manual editing:

```bash
# Update package status
pnpm dashboard:update --package="@trendytradez/widgets" --status="complete"

# Update plan progress
pnpm dashboard:update --plan --status="3/8"

# Add commit
pnpm dashboard:update --add-commit="feat: new feature"

# Update current task
pnpm dashboard:update --current-task="Build Dashboard" --task-desc="Description"

# Set/clear blockers
pnpm dashboard:update --set-blocker="Waiting for API docs"
pnpm dashboard:update --clear-blocker

# Validate data
pnpm dashboard:validate
```

## After Completing a Package

**Automated Method** (Recommended):
```bash
pnpm dashboard:update --package="@trendytradez/widgets" --status="complete"
```

**Manual Method** (If needed):
- [ ] Edit `dashboard/data/project-status.json`
- [ ] Update package status: `"status": "complete"`
- [ ] Stats auto-calculate on update
- [ ] Run `pnpm dashboard:validate` to verify
- [ ] Commit JSON file

**What Updates Automatically**:
- ✅ Package status badge
- ✅ "Packages Created" stat (e.g., "2/9" → "3/9")
- ✅ Progress bar percentage
- ✅ Last updated timestamp

## After Each Git Commit

**Automated Method**:
```bash
pnpm dashboard:update --add-commit="feat: your commit message"
```

**What Updates Automatically**:
- ✅ Adds commit to "Recent Commits" section
- ✅ Includes message, date, and short hash
- ✅ Keeps only last 6 commits
- ✅ Updates timestamp

## After Updating Current Task

**Automated Method**:
```bash
pnpm dashboard:update --current-task="Build Dashboard Core" --task-desc="Create canvas layout"
```

**What Updates Automatically**:
- ✅ Updates first item in "Next Actions"
- ✅ Updates task description
- ✅ Updates timestamp

## After Setting/Clearing Blockers

**Set Blocker**:
```bash
pnpm dashboard:update --set-blocker="Waiting for API documentation"
```

**Clear Blocker**:
```bash
pnpm dashboard:update --clear-blocker
```

**What Updates Automatically**:
- ✅ Updates "Blockers & Notes" section
- ✅ Changes blocker status
- ✅ Updates message

## After Completing an Epic

**Automated Method**:
```bash
pnpm dashboard:update --plan --status="3/8"
```

**What Updates Automatically**:
- ✅ "Plans Complete" stat
- ✅ Overall progress bar percentage
- ✅ Timestamp

**Manual Updates Needed**:
- [ ] Update Epic/Story HTML in `dashboard/index.html` (for Implementation Plans tab)
- [ ] Update story status badges
- [ ] Update sub-task completion status

## 📊 What's Automated vs Manual

### ✅ Fully Automated (via CLI)
- Stats (Plans Complete, Packages Created, percentages)
- Package statuses
- Current Status items
- Next Actions
- Blockers & Notes
- Recent Commits
- Last Updated timestamp

### ⚠️ Manual Updates Required
- Epic/Story structure in Implementation Plans tab
- Sub-task completion status
- Story status badges
- Quick Links section
- Documentation links

---

## 📝 Example Update Flow

### Scenario: Just completed @trendytradez/ui package

**Step 1: Update via CLI**
```bash
pnpm dashboard:update --package="@trendytradez/ui" --status="complete"
```

**Step 2: Add commit**
```bash
pnpm dashboard:update --add-commit="feat: complete UI package with Tailwind and Tremor"
```

**Step 3: Validate**
```bash
pnpm dashboard:validate
```

**Step 4: Commit JSON**
```bash
git add dashboard/data/project-status.json
git commit -m "docs: mark UI package as complete"
```

**Step 5: Refresh dashboard**
- Open `dashboard/index.html` in browser
- Changes appear automatically! ✨

**What Updated Automatically**:
- ✅ "Packages Created" stat (5/9 → 6/9)
- ✅ Progress bar (56% → 67%)
- ✅ Package badge (Pending → Complete)
- ✅ Recent commit added
- ✅ Timestamp updated

---

## 🔄 Pre-commit Hook

The pre-commit hook automatically validates dashboard data:
- Runs `pnpm dashboard:validate`
- Checks JSON schema
- Validates calculations
- Prevents invalid data commits

To bypass (emergency only):
```bash
git commit --no-verify
```

---

## 📚 Additional Resources

- [WORKFLOW.md](./WORKFLOW.md) - Complete workflow guide
- [scripts/README.md](./scripts/README.md) - CLI tool documentation
- [dashboard/README.md](./dashboard/README.md) - Dashboard architecture

---

**Remember**: The dashboard data (`project-status.json`) is our single source of truth. Use CLI tools for updates!
