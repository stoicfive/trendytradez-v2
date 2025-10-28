# Implementation Plan: GitHub Projects Kanban Integration

## Overview

Extend GitHub integration to automatically create and sync GitHub Projects (v2) with Kanban boards for visual project management.

## Objectives

- Auto-create GitHub Projects from implementation plans
- Sync issues to project boards
- Map local status to Kanban columns
- Bidirectional sync (board changes → local state)
- Drag-and-drop updates reflected locally

## Current State

### What Works ✅
- Packages → Milestones
- Plans → Tracking Issues
- TODOs → Issues
- Webhook server for events

### What's Missing ❌
- GitHub Projects creation
- Kanban board management
- Column/status mapping
- Card movement tracking

## Architecture

### Data Flow

```
Local Plans → GitHub Projects → Kanban Boards
     ↓              ↓                ↓
  Issues    →   Project Items  →  Columns
     ↓              ↓                ↓
  Status    →   Field Values   →  To Do/In Progress/Done
```

### GitHub Projects v2 API

Uses GraphQL API (not REST):
- `createProjectV2` - Create project
- `addProjectV2ItemById` - Add issue to project
- `updateProjectV2ItemFieldValue` - Update status
- `projectV2` queries - Read project data

## Implementation Phases

### Phase 1: Project Creation

**Goal**: Auto-create GitHub Projects from plans

**Tasks**:
- [ ] Add GraphQL client to `github-service.js`
- [ ] Implement `createProject(name, description)` method
- [ ] Implement `getProject(projectId)` method
- [ ] Store project mappings in database
- [ ] Add `project_id` to `github_mappings` table

**Database Schema**:
```sql
ALTER TABLE github_mappings ADD COLUMN project_id INTEGER;
ALTER TABLE github_mappings ADD COLUMN project_number INTEGER;
```

**API Methods**:
```javascript
async createProject({ name, description, owner })
async getProject(projectNumber)
async listProjects()
```

### Phase 2: Board Configuration

**Goal**: Set up Kanban columns and fields

**Tasks**:
- [ ] Get project field definitions
- [ ] Configure status field (To Do, In Progress, Done)
- [ ] Map local status to GitHub status
- [ ] Add priority field (optional)
- [ ] Add labels field (optional)

**Status Mapping**:
```javascript
const STATUS_MAP = {
  'pending': 'To Do',
  'in-progress': 'In Progress',
  'complete': 'Done',
  'blocked': 'Blocked'
};
```

**Field Configuration**:
```javascript
async getProjectFields(projectId)
async updateProjectField(projectId, fieldId, value)
```

### Phase 3: Issue → Project Sync

**Goal**: Add issues to project boards

**Tasks**:
- [ ] Implement `addIssueToProject(projectId, issueId)` method
- [ ] Sync existing issues to projects
- [ ] Set initial status based on local state
- [ ] Update project items when status changes
- [ ] Handle issue removal from projects

**Sync Logic**:
```javascript
// When creating tracking issue
const issue = await createIssue(...)
const project = await getOrCreateProject(planName)
await addIssueToProject(project.id, issue.id)
await updateIssueStatus(project.id, issue.id, 'To Do')
```

### Phase 4: Webhook Integration

**Goal**: Receive project board updates

**Tasks**:
- [ ] Add `projects_v2_item` webhook event handler
- [ ] Handle status field changes
- [ ] Update local state when cards move
- [ ] Handle card additions/removals
- [ ] Log all project events

**Webhook Events**:
- `projects_v2_item.created` - Card added
- `projects_v2_item.edited` - Status changed
- `projects_v2_item.deleted` - Card removed
- `projects_v2_item.converted` - Issue converted

**Event Handler**:
```javascript
webhooks.on('projects_v2_item.edited', async ({ payload }) => {
  // Get local entity from issue mapping
  const localEntity = getLocalId('issue', payload.projects_v2_item.content_node_id)
  
  // Update local status based on new field value
  if (payload.changes.field_value) {
    const newStatus = mapGitHubStatusToLocal(payload.changes.field_value.to)
    updateLocalStatus(localEntity.local_type, localEntity.local_id, newStatus)
  }
})
```

### Phase 5: Advanced Features

**Goal**: Enhanced project management

**Tasks**:
- [ ] Auto-create views (Board, Table, Roadmap)
- [ ] Sync package milestones to projects
- [ ] Add custom fields (effort, priority)
- [ ] Implement project templates
- [ ] Add project-level progress tracking

## Database Extensions

### New Tables

```sql
-- GitHub Projects mapping
CREATE TABLE IF NOT EXISTS github_projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  local_plan_id TEXT NOT NULL,
  project_id TEXT NOT NULL,
  project_number INTEGER NOT NULL,
  project_url TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(local_plan_id)
);

-- Project field mappings
CREATE TABLE IF NOT EXISTS github_project_fields (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  field_id TEXT NOT NULL,
  field_name TEXT NOT NULL,
  field_type TEXT NOT NULL,
  options TEXT, -- JSON array of options
  created_at TEXT NOT NULL
);

-- Project item status
CREATE TABLE IF NOT EXISTS github_project_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  issue_id INTEGER NOT NULL,
  status TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(project_id, item_id)
);
```

## Configuration

### Environment Variables

```bash
# .env additions
GITHUB_PROJECT_OWNER=stoicfive
GITHUB_PROJECT_TEMPLATE=automated-dashboard
GITHUB_PROJECT_AUTO_CREATE=true
GITHUB_PROJECT_DEFAULT_VIEW=board
```

### Project Template

```javascript
const PROJECT_TEMPLATE = {
  name: 'TrendyTradez v2 - {PLAN_NAME}',
  description: 'Auto-generated from implementation plan',
  fields: [
    { name: 'Status', type: 'single_select', options: ['To Do', 'In Progress', 'Done', 'Blocked'] },
    { name: 'Priority', type: 'single_select', options: ['Low', 'Medium', 'High', 'Critical'] },
    { name: 'Effort', type: 'single_select', options: ['XS', 'S', 'M', 'L', 'XL'] }
  ],
  views: [
    { name: 'Board', type: 'board', groupBy: 'Status' },
    { name: 'Table', type: 'table' },
    { name: 'Roadmap', type: 'roadmap' }
  ]
};
```

## Commands

### New Commands

```bash
# Create project from plan
pnpm github:create-project --plan="AUTOMATED_DASHBOARD"

# Sync all issues to projects
pnpm github:sync-projects

# List all projects
pnpm github:list-projects

# Update project status
pnpm github:update-project --project=1 --issue=5 --status="In Progress"
```

## User Flows

### Flow 1: Auto-Create Project

```
1. Create implementation plan (PLAN_NEW_FEATURE.md)
2. Dashboard detects plan
3. Run: pnpm github:sync
4. System creates:
   - Tracking issue
   - GitHub Project
   - Project board with columns
   - Adds issue to project
5. View on GitHub Projects
```

### Flow 2: Move Card on Board

```
1. Team member drags card to "In Progress"
2. GitHub sends webhook
3. Webhook handler updates local state
4. Dashboard shows updated status
5. Developer sees change in real-time
```

### Flow 3: Complete Task

```
1. Developer checks task in plan
2. Dashboard updates progress
3. Sync to GitHub
4. Project card moves to "Done"
5. Progress bar updates on project
```

## API Integration

### GraphQL Queries

```graphql
# Create project
mutation CreateProject($ownerId: ID!, $title: String!) {
  createProjectV2(input: {
    ownerId: $ownerId
    title: $title
  }) {
    projectV2 {
      id
      number
      url
    }
  }
}

# Add issue to project
mutation AddIssueToProject($projectId: ID!, $contentId: ID!) {
  addProjectV2ItemById(input: {
    projectId: $projectId
    contentId: $contentId
  }) {
    item {
      id
    }
  }
}

# Update status field
mutation UpdateStatus($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: String!) {
  updateProjectV2ItemFieldValue(input: {
    projectId: $projectId
    itemId: $itemId
    fieldId: $fieldId
    value: { 
      singleSelectOptionId: $value
    }
  }) {
    projectV2Item {
      id
    }
  }
}

# Query project
query GetProject($number: Int!, $owner: String!, $repo: String!) {
  repository(owner: $owner, name: $repo) {
    projectV2(number: $number) {
      id
      title
      url
      fields(first: 20) {
        nodes {
          ... on ProjectV2SingleSelectField {
            id
            name
            options {
              id
              name
            }
          }
        }
      }
      items(first: 100) {
        nodes {
          id
          content {
            ... on Issue {
              id
              number
              title
            }
          }
          fieldValues(first: 20) {
            nodes {
              ... on ProjectV2ItemFieldSingleSelectValue {
                name
                field {
                  ... on ProjectV2SingleSelectField {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

## Testing

### Unit Tests

```javascript
describe('GitHub Projects Integration', () => {
  test('creates project from plan', async () => {
    const project = await createProject({
      name: 'Test Plan',
      description: 'Test description'
    });
    expect(project.number).toBeDefined();
  });

  test('adds issue to project', async () => {
    const item = await addIssueToProject(projectId, issueId);
    expect(item.id).toBeDefined();
  });

  test('updates item status', async () => {
    await updateItemStatus(projectId, itemId, 'In Progress');
    const item = await getProjectItem(projectId, itemId);
    expect(item.status).toBe('In Progress');
  });
});
```

### Integration Tests

- Create project via API
- Add multiple issues
- Update status fields
- Verify webhook events
- Check local state updates

## Success Criteria

- [ ] Projects auto-created for all plans
- [ ] Issues automatically added to projects
- [ ] Status syncs bidirectionally
- [ ] Webhook events processed correctly
- [ ] Board changes reflect in dashboard
- [ ] <5 second sync latency
- [ ] 100% mapping accuracy

## Timeline

- **Phase 1**: 4 hours (Project creation)
- **Phase 2**: 3 hours (Board configuration)
- **Phase 3**: 4 hours (Issue sync)
- **Phase 4**: 3 hours (Webhooks)
- **Phase 5**: 4 hours (Advanced features)

**Total**: ~18 hours

## Dependencies

- GitHub token with `project` scope
- GraphQL client library (`@octokit/graphql`)
- Existing webhook infrastructure
- Database schema extensions

## Risks

- **GraphQL complexity**: Projects v2 uses GraphQL, not REST
- **Field IDs**: Dynamic field IDs require lookup
- **Rate limits**: GraphQL has separate rate limits
- **Webhook delays**: Project events may have latency

## Mitigation

- Use `@octokit/graphql` for type safety
- Cache field IDs in database
- Implement exponential backoff
- Add event queue for webhooks

## Next Steps

1. Install GraphQL dependencies
2. Implement Phase 1 (project creation)
3. Test with single plan
4. Add webhook handlers
5. Roll out to all plans

## References

- [GitHub Projects v2 API](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-api-to-manage-projects)
- [GraphQL API](https://docs.github.com/en/graphql)
- [Project Webhooks](https://docs.github.com/en/webhooks-and-events/webhooks/webhook-events-and-payloads#projects_v2_item)

---

**Status**: 📋 Planned  
**Priority**: Medium  
**Effort**: Large (~18 hours)
