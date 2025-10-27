# TrendyTradez v2 - Workflow Checklist

## 📋 After Completing Any Work

### 1. Update Code & Tests
- [ ] Write/update code
- [ ] Add/update tests
- [ ] Run `pnpm test` - ensure all tests pass
- [ ] Run `pnpm lint` and `pnpm type-check`

### 2. Commit Changes
```bash
git add -A
git commit -m "type: description"
git push origin master
```

### 3. Update Dashboard Data

#### Option A: Automated (Recommended)
```bash
# After completing a package
pnpm dashboard:update --package="@trendytradez/package-name" --status="complete"

# After completing an epic
pnpm dashboard:update --epic="X" --status="complete"
```

#### Option B: Manual (When Needed)
Edit `dashboard/data/project-status.json` directly to update:
- `stats.plansComplete` - Epic completion count
- `stats.packagesCreated` - Package count
- `currentStatus` - Add new status items
- `nextActions` - Update what's next
- `packages` - Update package statuses

### 4. Verify Dashboard
```bash
pnpm dashboard:validate
```

### 5. View Dashboard
Open `dashboard/index.html` in browser or run:
```bash
pnpm dashboard:dev
```

## 🚨 Critical: Dashboard Sync Points

### When to Update Dashboard:

1. **After Creating a Package**
   ```bash
   pnpm dashboard:update --package="@trendytradez/new-package" --status="complete"
   ```

2. **After Completing a Story**
   - Manually update `dashboard/index.html` story status
   - Or update JSON structure to track stories

3. **After Completing an Epic**
   ```bash
   pnpm dashboard:update --epic="X" --status="complete"
   ```
   - Then manually update `currentStatus` in JSON
   - Update `nextActions` for what's next

4. **After Major Milestone**
   - Update `currentStatus` array
   - Update `stats.currentPhase`
   - Update `nextActions`

## 📊 Dashboard Data Structure

### Key Fields to Maintain:
- `meta.lastUpdated` - Auto-updated
- `stats.plansComplete` - Manual/CLI update
- `stats.packagesCreated` - Auto-calculated from packages array
- `currentStatus[]` - **Manual update required**
- `nextActions[]` - **Manual update required**
- `packages[]` - CLI update with --package flag
- `recentCommits[]` - Auto-updated from git

## ⚠️ Known Limitations

1. **Story Tracking**: Not in JSON, only in HTML
   - Stories are in `dashboard/index.html`
   - No CLI command to update them
   - Must update HTML manually

2. **Epic Completion**: Partial automation
   - CLI updates `plansComplete` counter
   - Must manually update `currentStatus` array
   - Must manually update `nextActions`

3. **Package Status**: Semi-automated
   - CLI updates individual package
   - Auto-calculates percentage
   - Must run command for each package

## 🔄 Recommended Workflow

### For Each Work Session:

1. **Start**: Check dashboard for current status
2. **Work**: Implement features, write tests
3. **Commit**: Git commit with clear message
4. **Update**: Run dashboard update commands
5. **Verify**: Check dashboard reflects changes
6. **Push**: Push to GitHub

### End of Epic:

1. Complete all stories
2. Run tests and ensure passing
3. Update dashboard:
   ```bash
   pnpm dashboard:update --epic="X" --status="complete"
   ```
4. **Manually edit** `dashboard/data/project-status.json`:
   - Add epic to `currentStatus` array
   - Update `nextActions` for next epic
   - Update `stats.currentPhase` if needed
5. Commit dashboard changes
6. Push to GitHub

## 🎯 Automation Improvements Needed

### Future Enhancements:
1. Add story tracking to JSON structure
2. Auto-update `currentStatus` on epic completion
3. Auto-update `nextActions` based on epic progress
4. Create `pnpm dashboard:sync` command to do full sync
5. Add pre-commit hook to remind about dashboard updates

## 📝 Quick Reference

```bash
# View dashboard
pnpm dashboard:dev

# Validate data
pnpm dashboard:validate

# Update package
pnpm dashboard:update --package="@trendytradez/name" --status="complete"

# Update epic
pnpm dashboard:update --epic="5" --status="complete"

# Add commit
pnpm dashboard:update --add-commit="feat: new feature"

# Set blocker
pnpm dashboard:update --set-blocker="Waiting for API access"

# Clear blocker
pnpm dashboard:update --clear-blocker
```
