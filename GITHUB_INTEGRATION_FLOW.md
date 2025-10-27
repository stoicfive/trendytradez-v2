# GitHub Integration - End-to-End Flow

## System Architecture

```
Local Codebase ←→ Dashboard ←→ GitHub
```

## Flow 1: Local Changes → GitHub

### Trigger
Developer makes code changes (adds package, updates plan, etc.)

### Process
1. **File Watcher** detects change (500ms debounce)
2. **Analyzer** extracts project data
3. **State Manager** updates SQLite database
4. **Sync Service** reads changes
5. **GitHub API** creates/updates entities
6. **Mapping stored** in database

### Example: New Package
```
Code: Create packages/new-feature/
  ↓
Watcher: Detects new package.json
  ↓
Analyzer: Extracts package info
  ↓
State: Stores in database
  ↓
Sync: Creates GitHub milestone
  ↓
Mapping: Links package → milestone #8
```

### Commands
```bash
pnpm dashboard:start   # Start watcher + analyzer
pnpm github:sync       # Manual sync
```

## Flow 2: GitHub Changes → Local

### Trigger
Team member closes issue, merges PR, publishes release on GitHub

### Process
1. **GitHub** sends webhook POST request
2. **Webhook Server** receives event (port 3004)
3. **Event Handler** processes payload
4. **Database** looks up mapping
5. **State Manager** updates local data
6. **Dashboard** reflects changes

### Example: Issue Closed
```
GitHub: User closes issue #5
  ↓
Webhook: POST /webhooks/github
  ↓
Handler: Processes "issues.closed" event
  ↓
Lookup: Finds local plan mapping
  ↓
Update: Marks plan as complete
  ↓
Dashboard: Shows updated status
```

### Setup
```bash
pnpm github:webhooks   # Start webhook server
# Configure webhook in GitHub repo settings
```

## Flow 3: Full Sync

### When to Use
- Initial setup
- After manual GitHub changes
- Periodic reconciliation

### Process
```bash
pnpm github:sync
```

1. Reads all packages from database
2. Creates/updates GitHub milestones
3. Reads all plans from database
4. Creates/updates tracking issues
5. Stores all mappings
6. Logs sync operations

### Output
```
✅ Synced 7 packages to milestones
✅ Synced 10 plans to tracking issues
✅ 17 mappings stored
```

## Data Mappings

| Local Entity | GitHub Entity | Mapping |
|--------------|---------------|---------|
| Package | Milestone | package:name → milestone:number |
| Plan | Issue (tracking) | plan:name → issue:number |
| TODO | Issue | todo:file:line → issue:number |
| Commit | Linked to issues | Via commit message |

## Event Handlers

### Webhook Events Processed

**Issues**:
- `issues.opened` → Log new issue
- `issues.closed` → Update local plan/package
- `issues.edited` → Sync changes

**Milestones**:
- `milestone.closed` → Mark package complete

**Releases**:
- `release.published` → Notify dashboard

**Push/PR**:
- `push` → Trigger re-analysis
- `pull_request.closed` (merged) → Trigger re-analysis

## Database Tables

### github_mappings
```sql
local_type | local_id | github_type | github_id
package    | @org/ui  | milestone   | 5
plan       | SETUP    | issue       | 1
```

### github_sync_log
```sql
action | entity_type | direction   | status
create | milestone   | to_github   | success
update | issue       | from_github | success
```

## Ports

- **3001**: REST API
- **3002**: WebSocket (real-time dashboard)
- **3003**: Dashboard UI
- **3004**: GitHub Webhooks

## Authentication

**GitHub Token** (`.env`):
```bash
GITHUB_TOKEN=github_pat_...
GITHUB_WEBHOOK_SECRET=...
```

**Scopes Required**:
- `repo` - Full repository access
- `admin:repo_hook` - Webhook management
- `project` - Project access

## Error Handling

**Rate Limits**: 5000 calls/hour
- Tracked automatically
- Logged in sync operations

**Conflicts**: Last-write-wins
- GitHub change overwrites local
- Local sync overwrites GitHub

**Failures**: Logged to `github_sync_log`
- Retry manually with `pnpm github:sync`

## Complete Workflow

### Developer Flow
```
1. Write code locally
2. Dashboard auto-updates (file watcher)
3. Changes sync to GitHub (auto or manual)
4. Team sees updates on GitHub
5. Team closes issues on GitHub
6. Webhook updates local dashboard
7. Developer sees team progress
```

### Startup Sequence
```bash
# Terminal 1: Backend
pnpm dashboard:start

# Terminal 2: Webhooks
pnpm github:webhooks

# Terminal 3: Dashboard UI
cd dashboard-app && npm run dev

# One-time: Sync to GitHub
pnpm github:sync
```

## Monitoring

**Check Sync Status**:
```bash
node scripts/github-db.js stats
```

**Check Mappings**:
```bash
node scripts/github-db.js mappings
```

**Test Connection**:
```bash
pnpm github:test
```

## Production Deployment

1. Deploy webhook server with public URL
2. Configure GitHub webhook with public URL
3. Set environment variables
4. Start all services
5. Run initial sync

**Public Webhook URL** (use ngrok for testing):
```bash
ngrok http 3004
# Use ngrok URL in GitHub webhook settings
```

---

**Result**: Seamless bidirectional sync between local development and GitHub project management.
