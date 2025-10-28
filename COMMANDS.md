# TrendyTradez v2 - Commands Reference

## Setup Commands

### Install Dependencies

```bash
pnpm install
```

**Description**: Install all dependencies for the monorepo  
**When to use**: First time setup or after pulling changes  
**Expected output**: Dependencies installed in all packages

### Install PNPM Globally

```bash
npm install -g pnpm
```

**Description**: Install PNPM package manager globally  
**When to use**: First time setup if PNPM not installed  
**Expected output**: PNPM available globally

---

## Development Commands

### Start Development Server

```bash
pnpm dev
```

**Description**: Start all development servers  
**When to use**: During active development  
**Expected output**: Dev servers running on configured ports

### Build All Packages

```bash
pnpm build
```

**Description**: Build all packages in dependency order  
**When to use**: Before deployment or testing production build  
**Expected output**: Built artifacts in dist/ folders

### Clean Build Artifacts

```bash
pnpm clean
```

**Description**: Remove all build artifacts and caches  
**When to use**: When experiencing build issues  
**Expected output**: All dist/ and .turbo/ folders removed

---

## Testing Commands

### Run All Tests

```bash
pnpm test
```

**Description**: Run tests across all packages  
**When to use**: Before committing changes  
**Expected output**: Test results for all packages

### Run Tests in Watch Mode

```bash
pnpm test --watch
```

**Description**: Run tests in watch mode for active development  
**When to use**: During test-driven development  
**Expected output**: Tests re-run on file changes

### Run Tests in Specific Package

```bash
cd packages/widgets && pnpm test
```

**Description**: Run tests for a specific package  
**When to use**: When working on a specific package  
**Expected output**: Test results for that package only

---

## Code Quality Commands

### Lint Code

```bash
pnpm lint
```

**Description**: Run ESLint across all packages  
**When to use**: Before committing changes  
**Expected output**: Linting errors and warnings

### Fix Linting Issues

```bash
pnpm lint --fix
```

**Description**: Automatically fix linting issues  
**When to use**: To quickly fix auto-fixable issues  
**Expected output**: Fixed files reported

### Format Code

```bash
pnpm format
```

**Description**: Format all code with Prettier  
**When to use**: Before committing changes  
**Expected output**: Formatted files reported

### Type Check

```bash
pnpm type-check
```

**Description**: Run TypeScript type checking  
**When to use**: Before committing changes  
**Expected output**: Type errors if any

---

## Package Management Commands

### Add Dependency to Root

```bash
pnpm add -Dw <package-name>
```

**Description**: Add dev dependency to root workspace  
**When to use**: Adding tools used across all packages  
**Example**: `pnpm add -Dw prettier`

### Add Dependency to Specific Package

```bash
pnpm --filter @trendytradez/ui add <package-name>
```

**Description**: Add dependency to specific package  
**When to use**: Adding package-specific dependencies  
**Example**: `pnpm --filter @trendytradez/ui add react`

### Add Internal Package Dependency

```bash
pnpm --filter @trendytradez/dashboard add @trendytradez/widgets@workspace:*
```

**Description**: Link internal packages  
**When to use**: When one package depends on another  
**Expected output**: Workspace dependency added

### List All Packages

```bash
pnpm -r list
```

**Description**: List all packages in workspace  
**When to use**: To verify workspace structure  
**Expected output**: All packages listed

---

## Turborepo Commands

### Clear Turbo Cache

```bash
pnpm turbo clean
```

**Description**: Clear Turborepo cache  
**When to use**: When experiencing caching issues  
**Expected output**: Cache cleared

### Run Command in All Packages

```bash
pnpm -r <command>
```

**Description**: Run command in all packages  
**Example**: `pnpm -r build`  
**Expected output**: Command executed in each package

### Run Command in Specific Package

```bash
pnpm --filter <package-name> <command>
```

**Description**: Run command in specific package  
**Example**: `pnpm --filter @trendytradez/ui build`  
**Expected output**: Command executed in specified package

---

## Git Commands

### Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

**Description**: Create and switch to new feature branch  
**When to use**: Starting new feature work  
**Example**: `git checkout -b feature/widget-system`

### Commit Changes

```bash
git add .
git commit -m "feat: your commit message"
```

**Description**: Stage and commit changes  
**When to use**: After completing a logical unit of work  
**Format**: Use conventional commits (feat, fix, docs, refactor, test, chore)

### Push Changes

```bash
git push origin <branch-name>
```

**Description**: Push local changes to remote  
**When to use**: After committing changes  
**Example**: `git push origin feature/widget-system`

---

## Deployment Commands

### Preview Production Build

```bash
pnpm build && pnpm preview
```

**Description**: Build and preview production version  
**When to use**: Before deploying to production  
**Expected output**: Production server running locally

---

## Troubleshooting Commands

### Clear All Node Modules

```bash
rm -rf node_modules && pnpm install
```

**Description**: Remove and reinstall all dependencies  
**When to use**: When experiencing dependency issues  
**Expected output**: Fresh installation

### Clear PNPM Store

```bash
pnpm store prune
```

**Description**: Remove unreferenced packages from store  
**When to use**: To free up disk space  
**Expected output**: Store cleaned

### Check for Outdated Packages

```bash
pnpm outdated
```

**Description**: List outdated dependencies  
**When to use**: During maintenance  
**Expected output**: List of packages with updates available

---

## Automated Dashboard Commands

### Start Dashboard System

```bash
pnpm dashboard:start
```

**Description**: Start file watcher, analyzer, and servers  
**When to use**: To monitor project in real-time  
**Expected output**: All services running (ports 3001, 3002, 3003)

### Run Analysis Once

```bash
pnpm dashboard:analyze
```

**Description**: Run code analysis without watching  
**When to use**: To update dashboard state manually  
**Expected output**: Analysis results and updated database

### View Current State

```bash
pnpm dashboard:state
```

**Description**: View current project state from database  
**When to use**: To check current metrics  
**Expected output**: JSON with packages, plans, stats

### View Dashboard Stats

```bash
node scripts/state-manager.js stats
```

**Description**: View dashboard statistics  
**When to use**: To see summary metrics  
**Expected output**: Package count, coverage, TODOs

---

## GitHub Integration Commands

### Sync to GitHub

```bash
pnpm github:sync
```

**Description**: Full sync of packages and plans to GitHub  
**When to use**: After major changes or initial setup  
**Expected output**: Milestones and issues created on GitHub

### Test GitHub Connection

```bash
pnpm github:test
```

**Description**: Test GitHub API connection  
**When to use**: To verify token and permissions  
**Expected output**: Connection status and rate limit

### Start Webhook Server

```bash
pnpm github:webhooks
```

**Description**: Start webhook server for GitHub events  
**When to use**: To receive GitHub updates locally  
**Expected output**: Server running on port 3004

### View GitHub Mappings

```bash
node scripts/github-db.js mappings
```

**Description**: View local to GitHub entity mappings  
**When to use**: To see what's synced  
**Expected output**: List of all mappings

### View Sync Statistics

```bash
node scripts/github-db.js stats
```

**Description**: View GitHub sync statistics  
**When to use**: To check sync health  
**Expected output**: Total syncs, success rate, last sync time

---

## Common Workflows

### Starting Development

```bash
pnpm install
pnpm build
pnpm dev
```

### Before Committing

```bash
pnpm lint
pnpm type-check
pnpm test
pnpm format
pnpm dashboard:analyze  # Update dashboard
```

### Starting Dashboard System

```bash
# Terminal 1: Backend services
pnpm dashboard:start

# Terminal 2: Webhook server (optional)
pnpm github:webhooks

# Terminal 3: Dashboard UI
cd dashboard-app && npm run dev

# One-time: Sync to GitHub
pnpm github:sync
```

### Adding New Package

```bash
mkdir packages/new-package
cd packages/new-package
pnpm init
# Edit package.json
cd ../..
pnpm install
```

---

**Last Updated**: October 27, 2025  
**Version**: 2.0.0-alpha
