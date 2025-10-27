# Setup Guide

Complete guide to installing the Project Management System in your project.

## 📋 Prerequisites

- Node.js 16 or higher
- Package manager (PNPM, NPM, or Yarn)
- Git (optional, for pre-commit hooks)

## 🚀 Installation Steps

### Step 1: Copy Files

Copy the `project-management-system` folder to your project root:

```bash
cp -r project-management-system /path/to/your/project/
```

Or if you prefer a different location:

```bash
cp -r project-management-system /path/to/your/project/tools/pm-system
```

### Step 2: Install Dependencies

Add these dependencies to your project's `package.json`:

```json
{
  "devDependencies": {
    "ajv": "^8.17.1",
    "ajv-formats": "^3.0.1",
    "husky": "^9.1.7",
    "live-server": "^1.2.2"
  }
}
```

Then install:

```bash
pnpm install
# or
npm install
# or
yarn install
```

### Step 3: Add Scripts to package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dashboard:dev": "live-server project-management-system/dashboard/ --port=3000 --open=/index.html",
    "dashboard:validate": "node project-management-system/scripts/validate-dashboard.js",
    "dashboard:update": "node project-management-system/scripts/update-dashboard.js"
  }
}
```

### Step 4: Configure Project Data

Edit `project-management-system/dashboard/data/project-status.json`:

```json
{
  "meta": {
    "lastUpdated": "2025-10-27T00:00:00Z",
    "version": "0.1.0"
  },
  "stats": {
    "plansComplete": {
      "current": 0,
      "total": 5,
      "percentage": 0
    },
    "packagesCreated": {
      "current": 0,
      "total": 10,
      "percentage": 0
    },
    "currentPhase": "Week 1",
    "weeksTotal": "8-10"
  },
  "packages": [
    {
      "name": "your-package-name",
      "description": "Package description",
      "status": "pending"
    }
  ]
}
```

### Step 5: Set Up Pre-commit Hook (Optional)

If using Git, set up automatic validation:

```bash
# Initialize husky
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "node project-management-system/scripts/validate-dashboard.js"
```

### Step 6: Test Installation

```bash
# Validate dashboard data
pnpm dashboard:validate

# Start development server
pnpm dashboard:dev
```

## 🎨 Customization

### Change Dashboard Title

Edit `project-management-system/dashboard/index.html`:

```html
<h1>Your Project Name - Dashboard</h1>
```

### Change Colors

Edit `project-management-system/dashboard/assets/css/styles.css`:

```css
:root {
    --primary-color: #1f6feb;  /* Change to your brand color */
    --background: #0d1117;
    --sidebar: #161b22;
}
```

### Add Custom Packages

Edit `dashboard/data/project-status.json` and add to the `packages` array:

```json
{
  "packages": [
    {
      "name": "@your-org/new-package",
      "description": "Your package description",
      "status": "pending"
    }
  ]
}
```

## 🔧 Advanced Configuration

### Custom Data Schema

Modify `dashboard/data/schema.json` to add custom fields:

```json
{
  "properties": {
    "customField": {
      "type": "string",
      "description": "Your custom field"
    }
  }
}
```

### Custom CLI Commands

Extend `scripts/update-dashboard.js` with new commands:

```javascript
if (options['custom-command']) {
  // Your custom logic
  data.customField = options['custom-command'];
}
```

## 🐛 Troubleshooting

### Dashboard doesn't load

- Check that `dashboard/data/project-status.json` exists
- Verify JSON is valid: `pnpm dashboard:validate`
- Check browser console for errors

### Validation fails

- Run `pnpm dashboard:validate` to see specific errors
- Check that all required fields are present
- Verify percentage calculations are correct

### Pre-commit hook not working

- Ensure husky is installed: `npx husky install`
- Check hook file exists: `.husky/pre-commit`
- Make hook executable: `chmod +x .husky/pre-commit`

## 📚 Next Steps

- Read [USAGE.md](./USAGE.md) for how to use the system
- Read [CASCADE_WORKFLOW.md](./CASCADE_WORKFLOW.md) if using Cascade AI
- Customize the dashboard for your project

## 🆘 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the documentation
3. Check the original implementation in TrendyTradez v2

---

**Setup complete! Start managing your project with `pnpm dashboard:dev`**
