# GitHub Integration - Implementation Plan

## Objective

Integrate automated dashboard with GitHub Projects, Issues, and Releases for bidirectional synchronization and automated CRUD operations.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Integration Flow                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Local Codebase Changes                                     │
│         ↓                                                    │
│  File Watcher → Analyzer → State Manager                    │
│         ↓                        ↓                           │
│  GitHub Sync Service ←──────────┘                           │
│         ↓                                                    │
│  GitHub API (Octokit)                                       │
│         ↓                                                    │
│  ┌──────────────────────────────────────┐                  │
│  │  GitHub Projects  │  Issues  │ Releases │                │
│  └──────────────────────────────────────┘                  │
│         ↓                                                    │
│  GitHub Webhooks                                            │
│         ↓                                                    │
│  Webhook Server → State Manager → Dashboard Update         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Features

### 1. Dashboard → GitHub Sync

**Automatic Actions**:
- Package marked complete → Close related GitHub issue
- New implementation plan → Create GitHub Project
- Story/subtask added → Create GitHub issue
- Milestone reached → Create GitHub Release
- Blocker detected → Add "blocked" label to issue

### 2. GitHub → Dashboard Sync

**Automatic Updates**:
- Issue closed → Update package status
- Project board updated → Sync local plans
- Release published → Update dashboard
- PR merged → Trigger analysis
- Issue labeled → Update priorities

### 3. Bidirectional Mapping

**Entity Mapping**:
- Epic → GitHub Project
- Story → GitHub Issue
- Subtask → GitHub Issue (sub-issue)
- Package → GitHub Milestone
- Commit → Linked to Issues (via commit message)

## Implementation Phases

### Phase 1: GitHub API Setup (Week 1)

**Goal**: Establish connection to GitHub API

**Tasks**:
1. Install Octokit SDK
2. Set up authentication (Personal Access Token)
3. Create GitHub service module
4. Test API connection
5. Implement rate limiting

**Deliverables**:
- `scripts/github-service.js` - GitHub API wrapper
- `.env.example` - Environment variables template
- Authentication configuration

**Dependencies**:
```json
{
  "@octokit/rest": "^20.0.0",
  "@octokit/webhooks": "^12.0.0",
  "dotenv": "^16.3.0"
}
```

### Phase 2: Dashboard → GitHub Sync (Week 1-2)

**Goal**: Push local changes to GitHub

**Tasks**:
1. Create sync service
2. Map local entities to GitHub entities
3. Implement create/update/delete operations
4. Add sync triggers to state manager
5. Handle conflicts and errors
6. Add sync status tracking

**Deliverables**:
- `scripts/github-sync.js` - Sync orchestrator
- `scripts/github-mapper.js` - Entity mapping
- Sync status in database

**Operations**:

**Create GitHub Project**:
```javascript
// When new plan created
async function createGitHubProject(plan) {
  const project = await octokit.projects.createForRepo({
    owner: 'username',
    repo: 'repo-name',
    name: plan.name,
    body: plan.description,
  });
  
  // Store mapping
  await storeMapping('plan', plan.id, project.id);
}
```

**Create GitHub Issue**:
```javascript
// When story/subtask added
async function createGitHubIssue(story) {
  const issue = await octokit.issues.create({
    owner: 'username',
    repo: 'repo-name',
    title: story.title,
    body: story.description,
    labels: [story.status, story.priority],
    milestone: story.packageId,
  });
  
  await storeMapping('story', story.id, issue.number);
}
```

**Update Issue Status**:
```javascript
// When package status changes
async function updateIssueStatus(packageId, status) {
  const issues = await getLinkedIssues(packageId);
  
  for (const issue of issues) {
    if (status === 'complete') {
      await octokit.issues.update({
        owner: 'username',
        repo: 'repo-name',
        issue_number: issue.number,
        state: 'closed',
      });
    }
  }
}
```

### Phase 3: GitHub → Dashboard Sync (Week 2)

**Goal**: Pull GitHub changes to local dashboard

**Tasks**:
1. Set up webhook endpoint
2. Implement webhook handlers
3. Process GitHub events
4. Update local state
5. Broadcast to dashboard
6. Handle webhook security

**Deliverables**:
- `scripts/github-webhooks.js` - Webhook server
- Webhook event handlers
- Security validation

**Webhook Events**:

**Issue Closed**:
```javascript
webhooks.on('issues.closed', async ({ payload }) => {
  const localStory = await getLocalEntity('issue', payload.issue.number);
  
  if (localStory) {
    await updateState({
      type: 'story',
      id: localStory.id,
      status: 'complete',
    });
    
    broadcastUpdate(getState());
  }
});
```

**Project Updated**:
```javascript
webhooks.on('project.edited', async ({ payload }) => {
  const localPlan = await getLocalEntity('project', payload.project.id);
  
  if (localPlan) {
    await updatePlan(localPlan.id, {
      name: payload.project.name,
      description: payload.project.body,
    });
  }
});
```

**Release Published**:
```javascript
webhooks.on('release.published', async ({ payload }) => {
  await updateState({
    type: 'release',
    version: payload.release.tag_name,
    notes: payload.release.body,
    publishedAt: payload.release.published_at,
  });
  
  // Notify dashboard
  broadcastUpdate({
    type: 'release',
    data: payload.release,
  });
});
```

### Phase 4: Automated Release Management (Week 2-3)

**Goal**: Auto-create releases when packages complete

**Tasks**:
1. Detect package completion
2. Generate release notes from commits
3. Create GitHub release
4. Tag repository
5. Attach build artifacts
6. Notify team

**Deliverables**:
- `scripts/release-manager.js` - Release automation
- Release notes generator
- Artifact uploader

**Auto-Release Flow**:
```javascript
async function handlePackageComplete(pkg) {
  // Check if all dependencies complete
  const allComplete = await checkDependencies(pkg);
  
  if (allComplete) {
    // Generate release notes
    const notes = await generateReleaseNotes(pkg);
    
    // Create release
    const release = await octokit.repos.createRelease({
      owner: 'username',
      repo: 'repo-name',
      tag_name: `v${pkg.version}`,
      name: `${pkg.name} v${pkg.version}`,
      body: notes,
      draft: false,
      prerelease: false,
    });
    
    // Update dashboard
    await updateState({
      type: 'release',
      packageId: pkg.id,
      releaseId: release.id,
    });
  }
}
```

### Phase 5: Project Board Sync (Week 3)

**Goal**: Sync GitHub Project boards with dashboard

**Tasks**:
1. Map columns to statuses
2. Sync card positions
3. Handle card moves
4. Update local state on board changes
5. Reflect local changes on board

**Deliverables**:
- Project board sync service
- Column mapping configuration
- Card position tracking

**Board Sync**:
```javascript
// Map board columns to statuses
const columnMapping = {
  'To Do': 'pending',
  'In Progress': 'in-progress',
  'Done': 'complete',
};

// Sync card movement
webhooks.on('project_card.moved', async ({ payload }) => {
  const column = await getColumn(payload.project_card.column_id);
  const status = columnMapping[column.name];
  
  const localEntity = await getLocalEntity(
    'card',
    payload.project_card.id
  );
  
  if (localEntity) {
    await updateStatus(localEntity.id, status);
    broadcastUpdate(getState());
  }
});
```

### Phase 6: Advanced Features (Week 3-4)

**Goal**: Add intelligent automation

**Tasks**:
1. Auto-assign issues based on expertise
2. Detect blockers from comments
3. Auto-label based on file changes
4. Generate progress reports
5. Slack/Discord notifications
6. Dependency tracking

**Deliverables**:
- Intelligent assignment system
- Blocker detection
- Auto-labeling
- Notification system

## Database Schema Extensions

Add GitHub mapping tables:

```sql
CREATE TABLE github_mappings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  local_type TEXT NOT NULL, -- 'plan', 'story', 'package'
  local_id INTEGER NOT NULL,
  github_type TEXT NOT NULL, -- 'project', 'issue', 'milestone'
  github_id TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(local_type, local_id)
);

CREATE TABLE github_sync_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  action TEXT NOT NULL, -- 'create', 'update', 'delete'
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  direction TEXT NOT NULL, -- 'to_github', 'from_github'
  status TEXT NOT NULL, -- 'success', 'failed'
  error TEXT,
  timestamp TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE github_webhooks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,
  payload TEXT NOT NULL,
  processed BOOLEAN DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

## Configuration

**`.env` file**:
```bash
# GitHub Configuration
GITHUB_TOKEN=ghp_your_personal_access_token
GITHUB_OWNER=your-username
GITHUB_REPO=your-repo-name
GITHUB_WEBHOOK_SECRET=your_webhook_secret

# Sync Settings
SYNC_ENABLED=true
SYNC_INTERVAL=300000  # 5 minutes
AUTO_RELEASE=true
AUTO_CLOSE_ISSUES=true

# Webhook Server
WEBHOOK_PORT=3004
WEBHOOK_PATH=/webhooks/github
```

**`config/github.json`**:
```json
{
  "sync": {
    "enabled": true,
    "interval": 300000,
    "retryAttempts": 3,
    "retryDelay": 5000
  },
  "mapping": {
    "epic": "project",
    "story": "issue",
    "subtask": "issue",
    "package": "milestone"
  },
  "labels": {
    "pending": "status: pending",
    "in-progress": "status: in progress",
    "complete": "status: complete",
    "blocked": "blocked"
  },
  "automation": {
    "autoCreateIssues": true,
    "autoCloseIssues": true,
    "autoCreateReleases": true,
    "autoAssignIssues": false
  }
}
```

## API Endpoints

Add to REST API:

```javascript
// Manual sync trigger
POST /api/github/sync

// Get sync status
GET /api/github/sync/status

// Get GitHub mappings
GET /api/github/mappings

// Webhook endpoint
POST /webhooks/github

// Test GitHub connection
GET /api/github/test
```

## Commands

```bash
# Sync with GitHub
pnpm github:sync

# Test GitHub connection
pnpm github:test

# Start webhook server
pnpm github:webhooks

# Create release
pnpm github:release --package=@org/name

# Map existing entities
pnpm github:map
```

## Security

1. **Authentication**:
   - Use Personal Access Token (PAT)
   - Store in environment variables
   - Never commit tokens

2. **Webhook Security**:
   - Validate webhook signatures
   - Use webhook secret
   - Verify payload authenticity

3. **Rate Limiting**:
   - Respect GitHub API limits (5000/hour)
   - Implement exponential backoff
   - Queue requests

4. **Permissions Required**:
   - `repo` - Full repository access
   - `project` - Project access
   - `admin:repo_hook` - Webhook management

## Error Handling

```javascript
// Retry logic
async function syncWithRetry(operation, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      // Exponential backoff
      await sleep(Math.pow(2, i) * 1000);
    }
  }
}

// Conflict resolution
async function resolveConflict(local, remote) {
  // Last write wins
  if (new Date(remote.updated_at) > new Date(local.updated_at)) {
    return remote;
  }
  return local;
}
```

## Testing Strategy

1. **Unit Tests**:
   - GitHub service methods
   - Mapping functions
   - Webhook handlers

2. **Integration Tests**:
   - End-to-end sync flow
   - Webhook processing
   - Conflict resolution

3. **Manual Testing**:
   - Create issue on GitHub → Check dashboard
   - Mark package complete → Check GitHub
   - Move card on board → Check dashboard

## Monitoring

```javascript
// Sync metrics
{
  totalSyncs: 150,
  successfulSyncs: 148,
  failedSyncs: 2,
  averageSyncTime: 1200, // ms
  lastSync: '2025-10-27T23:00:00Z',
  githubApiCalls: 450,
  rateLimitRemaining: 4550
}
```

## Migration Path

1. **Phase 1**: Install dependencies, set up auth
2. **Phase 2**: Implement one-way sync (Dashboard → GitHub)
3. **Phase 3**: Test with subset of entities
4. **Phase 4**: Add webhook support (GitHub → Dashboard)
5. **Phase 5**: Enable full bidirectional sync
6. **Phase 6**: Add automation features

## Success Criteria

- [ ] Dashboard changes sync to GitHub within 5 seconds
- [ ] GitHub changes sync to dashboard within 10 seconds
- [ ] 99% sync success rate
- [ ] Zero data loss during conflicts
- [ ] Webhook processing < 500ms
- [ ] Support 100+ entities without lag
- [ ] Graceful handling of GitHub API limits

## Timeline

- **Week 1**: GitHub API setup + Dashboard → GitHub sync
- **Week 2**: GitHub → Dashboard sync + Webhooks
- **Week 3**: Project board sync + Release automation
- **Week 4**: Advanced features + Testing

**Total**: 4 weeks for full integration

## Benefits

- ✅ Single source of truth across systems
- ✅ No manual updates needed
- ✅ Real-time synchronization
- ✅ Automated release management
- ✅ Team visibility on GitHub
- ✅ Local development + GitHub collaboration
- ✅ Audit trail of all changes

## Risks & Mitigation

**Risk**: GitHub API rate limits
**Mitigation**: Implement caching, batch operations, respect limits

**Risk**: Sync conflicts
**Mitigation**: Last-write-wins strategy, conflict logging

**Risk**: Webhook delivery failures
**Mitigation**: Retry mechanism, webhook queue

**Risk**: Authentication issues
**Mitigation**: Token refresh, fallback auth methods

## Next Steps

1. Review and approve plan
2. Set up GitHub repository
3. Create Personal Access Token
4. Install dependencies
5. Implement Phase 1
6. Test with small dataset
7. Roll out incrementally

---

**Goal**: Seamless integration between local dashboard and GitHub for automated project management across all systems.
