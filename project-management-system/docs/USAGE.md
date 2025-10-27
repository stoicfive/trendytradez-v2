# Usage Guide

Complete guide to using the Project Management System.

## 🎯 Overview

The system provides:
- **Automated dashboard** - Track project progress visually
- **CLI tools** - Update via command line
- **Validation** - Ensure data integrity
- **Mobile responsive** - Access anywhere

## 📊 Dashboard Sections

### Overview Tab
- **Stats** - Plans complete, packages created, current phase
- **Current Status** - Recently completed work
- **Next Actions** - Current and upcoming tasks
- **Blockers** - Any issues blocking progress

### Implementation Plans Tab
- **Epics** - Major project phases
- **Stories** - Features within epics
- **Sub-tasks** - Individual tasks

### Packages Tab
- **Package Grid** - All project packages/modules
- **Status Badges** - Pending, In Progress, Complete

### Recent Commits Tab
- **Commit History** - Last 6 commits
- **Commit Details** - Message, date, hash

### Documentation Tab
- **Links** - Project documentation
- **Guides** - Setup and usage guides

### Commands Tab
- **CLI Reference** - Common commands
- **Quick Access** - Copy-paste commands

## 🔧 CLI Commands

### Update Package Status

```bash
# Mark complete
pnpm dashboard:update --package="package-name" --status="complete"

# Mark in progress
pnpm dashboard:update --package="package-name" --status="in-progress"

# Mark pending
pnpm dashboard:update --package="package-name" --status="pending"
```

### Update Progress

```bash
# Update plan progress
pnpm dashboard:update --plan --status="3/5"
```

### Manage Tasks

```bash
# Update current task
pnpm dashboard:update --current-task="Build Feature X" --task-desc="Implement new feature"
```

### Track Commits

```bash
# Add commit to dashboard
pnpm dashboard:update --add-commit="feat: implement feature X"
```

### Manage Blockers

```bash
# Set blocker
pnpm dashboard:update --set-blocker="Waiting for API documentation"

# Clear blocker
pnpm dashboard:update --clear-blocker
```

### Validate Data

```bash
# Validate dashboard data
pnpm dashboard:validate
```

## 🖥️ Development Server

Start live-reloading dashboard:

```bash
pnpm dashboard:dev
```

Opens at `http://localhost:3000`

## 📝 Manual Updates

### Edit JSON Directly

Edit `dashboard/data/project-status.json`:

```json
{
  "packages": [
    {
      "name": "new-package",
      "description": "Package description",
      "status": "pending"
    }
  ]
}
```

Always validate after manual edits:

```bash
pnpm dashboard:validate
```

### Add New Package

1. Edit `dashboard/data/project-status.json`
2. Add to `packages` array
3. Update `stats.packagesCreated.total`
4. Validate: `pnpm dashboard:validate`

### Update Epic/Story

Edit `dashboard/index.html` in the Implementation Plans section.

## 🔄 Typical Workflows

### Starting New Work

```bash
# 1. Update current task
pnpm dashboard:update --current-task="Build Authentication" --task-desc="Implement JWT auth"

# 2. Mark package in progress
pnpm dashboard:update --package="auth-package" --status="in-progress"

# 3. View dashboard
pnpm dashboard:dev
```

### Completing Work

```bash
# 1. Mark package complete
pnpm dashboard:update --package="auth-package" --status="complete"

# 2. Add commit
pnpm dashboard:update --add-commit="feat: implement authentication"

# 3. Validate
pnpm dashboard:validate

# 4. Commit dashboard update
git add project-management-system/dashboard/data/project-status.json
git commit -m "docs: mark auth package complete"
```

### Handling Blockers

```bash
# 1. Set blocker
pnpm dashboard:update --set-blocker="Waiting for design approval"

# 2. Update dashboard
git add project-management-system/dashboard/data/project-status.json
git commit -m "docs: add blocker for design approval"

# When resolved:
pnpm dashboard:update --clear-blocker
```

## 🎨 Customization

### Change Colors

Edit `dashboard/assets/css/styles.css`:

```css
/* Primary color */
.sidebar-nav a.active {
    background: #your-color;
}

/* Progress bars */
.progress-fill {
    background: linear-gradient(90deg, #color1, #color2);
}
```

### Change Dashboard Title

Edit `dashboard/index.html`:

```html
<title>Your Project - Dashboard</title>
<h1>Your Project - Dashboard</h1>
```

### Add Custom Sections

1. Add data to `project-status.json`
2. Update `schema.json` with new fields
3. Add rendering in `dashboard/assets/js/data-loader.js`
4. Add HTML container in `dashboard/index.html`

## 📱 Mobile Usage

The dashboard is fully responsive:
- **Hamburger menu** - Tap to open sidebar
- **Touch-friendly** - Large tap targets
- **Auto-close** - Sidebar closes after selection

## 🔍 Validation

The system validates:
- **JSON schema** - Correct data structure
- **Calculations** - Percentages match counts
- **Consistency** - Package counts match stats

Validation runs:
- **On demand** - `pnpm dashboard:validate`
- **Pre-commit** - Automatically before commits

## 🐛 Troubleshooting

### Dashboard doesn't update

1. Check JSON is valid: `pnpm dashboard:validate`
2. Hard refresh browser: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
3. Check browser console for errors

### CLI command fails

1. Check command syntax
2. Verify file paths are correct
3. Ensure Node.js 16+ is installed

### Validation fails

1. Run `pnpm dashboard:validate` for details
2. Check percentage calculations
3. Verify package counts
4. Ensure all required fields present

## 💡 Tips

1. **Update frequently** - Keep dashboard current
2. **Use CLI tools** - Faster than manual editing
3. **Validate before committing** - Catch errors early
4. **Keep it simple** - Don't over-complicate data
5. **Review regularly** - Use dashboard in standups/reviews

## 📚 Additional Resources

- [SETUP.md](./SETUP.md) - Installation guide
- [CASCADE_WORKFLOW.md](./CASCADE_WORKFLOW.md) - Cascade AI instructions
- [CUSTOMIZATION.md](./CUSTOMIZATION.md) - Advanced customization

---

**Happy project managing! 🚀**
