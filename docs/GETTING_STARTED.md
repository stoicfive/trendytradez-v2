# Getting Started with TrendyTradez v2

## Prerequisites

### Required
- **Node.js**: 20.x LTS ([Download](https://nodejs.org/))
- **PNPM**: 8.x ([Install](https://pnpm.io/installation))
- **Git**: Latest version

### Recommended
- **VS Code**: With TypeScript and ESLint extensions
- **Chrome/Firefox**: Latest version for development

---

## Initial Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/trendytradez-v2.git
cd trendytradez-v2
```

### 2. Install Dependencies
```bash
# Install PNPM globally (if not already installed)
npm install -g pnpm

# Install project dependencies
pnpm install
```

### 3. Build All Packages
```bash
# Build all packages in dependency order
pnpm build
```

### 4. Start Development Server
```bash
# Start the web app in development mode
pnpm dev
```

The app will be available at `http://localhost:5173`

---

## Development Workflow

### Working on a Package

```bash
# Navigate to package directory
cd packages/widgets

# Run tests in watch mode
pnpm test --watch

# Build the package
pnpm build
```

### Working on the Web App

```bash
# Start dev server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build

# Preview production build
pnpm preview
```

### Running Commands Across All Packages

```bash
# Run tests in all packages
pnpm -r test

# Build all packages
pnpm -r build

# Lint all packages
pnpm -r lint
```

---

## Available Commands

### Root Commands
```bash
pnpm dev          # Start development server
pnpm build        # Build all packages
pnpm test         # Run all tests
pnpm lint         # Lint all code
pnpm format       # Format all code
pnpm type-check   # Type check all packages
pnpm clean        # Clean all build artifacts
```

### Package-Specific Commands
```bash
# In any package directory
pnpm dev          # Start package in dev mode (if applicable)
pnpm build        # Build the package
pnpm test         # Run package tests
pnpm lint         # Lint package code
```

---

## Project Structure

```
trendytradez-v2/
├── apps/
│   └── web/              # Main web application
│       ├── src/
│       ├── public/
│       └── package.json
│
├── packages/
│   ├── ui/               # Shared UI components
│   ├── dashboard/        # Dashboard package
│   ├── widgets/          # Widget system
│   ├── theme/            # Theme system
│   ├── trading-tools/    # Trading calculators
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   └── config/           # Shared configs
│
├── docs/                 # Documentation
├── implementation/       # Implementation plans
└── scripts/              # Build scripts
```

---

## Development Tips

### Hot Module Replacement (HMR)
Changes to packages are automatically reflected in the web app thanks to Vite's HMR.

### TypeScript Errors
If you see TypeScript errors after pulling changes:
```bash
pnpm clean
pnpm install
pnpm build
```

### Turborepo Cache
Turborepo caches build outputs. To clear the cache:
```bash
pnpm turbo clean
```

### Debugging
Use VS Code's built-in debugger with the provided launch configurations.

---

## Common Issues

### Issue: PNPM command not found
**Solution**: Install PNPM globally
```bash
npm install -g pnpm
```

### Issue: Port 5173 already in use
**Solution**: Kill the process or use a different port
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
pnpm dev --port 3000
```

### Issue: Build fails with type errors
**Solution**: Ensure all packages are built in order
```bash
pnpm clean
pnpm install
pnpm build
```

### Issue: Tests fail after dependency update
**Solution**: Clear cache and reinstall
```bash
rm -rf node_modules
pnpm store prune
pnpm install
```

---

## Next Steps

1. **Read Implementation Plans**: Check `implementation/plans/` for detailed roadmaps
2. **Explore Packages**: Browse `packages/` to understand the architecture
3. **Run Tests**: Ensure everything works with `pnpm test`
4. **Start Coding**: Pick a task from the implementation plans

---

## Getting Help

- **Documentation**: Check `docs/` directory
- **Implementation Plans**: See `implementation/plans/`
- **Issues**: Create a GitHub issue
- **Discussions**: Use GitHub Discussions

---

**Happy Coding! 🚀**
