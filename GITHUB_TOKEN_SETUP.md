# GitHub Token Setup for Projects

## Issue

Your current GitHub token doesn't have permission to create Projects v2.

**Error**: `Resource not accessible by personal access token`

## Solution

Create a new Personal Access Token with the correct scopes.

### Step 1: Generate New Token

1. Go to: https://github.com/settings/tokens/new
2. Name: `TrendyTradez v2 - Dashboard & Projects`
3. Expiration: 90 days (or your preference)

### Step 2: Select Required Scopes

**Required scopes** (check these boxes):

✅ **repo** - Full control of private repositories
  - Includes: repo:status, repo_deployment, public_repo, repo:invite, security_events

✅ **project** - Full control of projects
  - Includes: read:project, write:project

✅ **admin:repo_hook** - Full control of repository hooks
  - Needed for webhooks

### Step 3: Generate and Copy Token

1. Click "Generate token" at bottom
2. **Copy the token immediately** (you won't see it again!)
3. Token format: `github_pat_...` (starts with `github_pat_`)

### Step 4: Update .env File

```bash
# Open .env file
nano .env

# Or use your editor
code .env
```

Replace the `GITHUB_TOKEN` line:

```bash
GITHUB_TOKEN=github_pat_YOUR_NEW_TOKEN_HERE
```

### Step 5: Verify Token

```bash
# Test connection
pnpm github:test

# Should show:
# ✅ Connected to GitHub as stoicfive
# ✅ Rate limit: 5000/5000
# ✅ Token scopes: repo, project, admin:repo_hook
```

### Step 6: Try Again

```bash
# Create test project
node scripts/github-projects.js create "Test Project"

# Full sync (creates projects for all plans)
pnpm github:sync
```

## Token Scopes Explained

| Scope | Why Needed | Used For |
|-------|------------|----------|
| `repo` | Access repository data | Milestones, Issues, Releases |
| `project` | Manage Projects v2 | Create projects, add items, update status |
| `admin:repo_hook` | Manage webhooks | Receive GitHub events |

## Security Notes

- ⚠️ Never commit `.env` file (already in `.gitignore`)
- ⚠️ Never share your token
- ⚠️ Revoke old tokens after creating new one
- ✅ Token expires 2026-01-25 (current one)
- ✅ Set expiration reminder

## Troubleshooting

### "Resource not accessible"
- Token missing `project` scope
- Regenerate with correct scopes

### "Bad credentials"
- Token expired or revoked
- Generate new token

### "Not Found"
- Repository doesn't exist
- Check `GITHUB_OWNER` and `GITHUB_REPO` in `.env`

## Current Token Info

From error message:
- Expiration: 2026-01-25 19:37:35 -0500
- Rate limit: 5000 requests/hour
- Missing scope: `project`

## Next Steps

1. Generate new token with `project` scope
2. Update `.env` file
3. Run `pnpm github:test` to verify
4. Run `pnpm github:sync` to create projects

---

**Need help?** Check: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens
