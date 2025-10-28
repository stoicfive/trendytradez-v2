# Quick Start Guide - Automated Dashboard System

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Node.js 20 LTS
- PNPM 8.x
- GitHub account (for integration)

### Step 1: Install Dependencies

```bash
pnpm install
```

### Step 2: Build Packages

```bash
pnpm build
```

### Step 3: Start Dashboard System

```bash
# Terminal 1: Start backend services
pnpm dashboard:start
```

This starts:
- File watcher (monitors code changes)
- Code analyzer (extracts metrics)
- REST API (port 3001)
- WebSocket server (port 3002)

### Step 4: Start Dashboard UI

```bash
# Terminal 2: Start React dashboard
cd dashboard-app && npm run dev
```

Dashboard opens at: http://localhost:3003

### Step 5: Configure GitHub (Optional)

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your GitHub token
# Get token from: https://github.com/settings/tokens
```

Required scopes:
- `repo` - Full repository access
- `admin:repo_hook` - Webhook management
- `project` - Project access

### Step 6: Sync to GitHub

```bash
# One-time sync
pnpm github:sync
```

This creates:
- GitHub milestones for packages
- GitHub issues for plans
- Entity mappings in database

### Step 7: Start Webhooks (Optional)

```bash
# Terminal 3: Start webhook server
pnpm github:webhooks
```

For production, configure webhook in GitHub:
- URL: `https://your-domain.com/webhooks/github`
- Secret: From `.env` file
- Events: Issues, Milestones, Releases, Push, PRs

## ✅ Verify Everything Works

### Check Services

```bash
# API health
curl http://localhost:3001/api/health

# View packages
curl http://localhost:3001/api/packages | jq

# View stats
curl http://localhost:3001/api/stats | jq
```

### Check GitHub Connection

```bash
pnpm github:test
```

### View Dashboard

Open http://localhost:3003 in browser

You should see:
- 7 packages tracked
- 6/7 complete (86%)
- Test coverage: 63%
- Recent commits
- Implementation plans

## 📊 What You Get

### Real-Time Tracking
- Package status updates automatically
- Test coverage calculated from code
- TODOs extracted from comments
- Plans parsed from markdown
- Commits tracked from git

### GitHub Integration
- Packages → Milestones
- Plans → Tracking issues
- Auto-close on completion
- Bidirectional sync

### Zero Manual Updates
- No JSON files to edit
- No CLI commands to run
- Everything derived from code
- Updates in <3 seconds

## 🎯 Common Tasks

### View Current State

```bash
pnpm dashboard:state
```

### Run Analysis Manually

```bash
pnpm dashboard:analyze
```

### Check Sync Status

```bash
node scripts/github-db.js stats
```

### View GitHub Mappings

```bash
node scripts/github-db.js mappings
```

## 🔧 Troubleshooting

### Dashboard not updating?
1. Check file watcher is running
2. Verify WebSocket connection (green indicator)
3. Check browser console for errors

### GitHub sync failing?
1. Verify token in `.env`
2. Check token permissions
3. Review sync logs: `node scripts/github-db.js stats`

### Port already in use?
```bash
# Kill processes on ports
lsof -ti:3001 | xargs kill
lsof -ti:3002 | xargs kill
lsof -ti:3003 | xargs kill
lsof -ti:3004 | xargs kill
```

## 📚 Next Steps

- Read [PROJECT_MANAGEMENT_SYSTEM.md](./PROJECT_MANAGEMENT_SYSTEM.md) for full details
- Check [GITHUB_INTEGRATION_FLOW.md](./GITHUB_INTEGRATION_FLOW.md) for sync flows
- Review [E2E_TEST_RESULTS.md](./E2E_TEST_RESULTS.md) for validation
- See [COMMANDS.md](./COMMANDS.md) for all commands

## 🎉 You're Done!

Your automated dashboard is now tracking your project in real-time with zero manual intervention!
