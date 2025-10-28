/**
 * GitHub Projects v2 Integration
 * Manages GitHub Projects (Kanban boards) via GraphQL API
 */

require('dotenv').config();
const { graphql } = require('@octokit/graphql');
const { getDatabase } = require('./state-manager');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'stoicfive';
const GITHUB_REPO = process.env.GITHUB_REPO || 'trendytradez-v2';

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN not set in .env');
  process.exit(1);
}

// Initialize GraphQL client
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${GITHUB_TOKEN}`,
  },
});

/**
 * Get repository owner ID
 */
async function getOwnerId() {
  try {
    const { repository } = await graphqlWithAuth(`
      query GetOwner($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
          owner {
            id
          }
        }
      }
    `, {
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
    });

    return repository.owner.id;
  } catch (error) {
    console.error('Error getting owner ID:', error);
    throw error;
  }
}

/**
 * Create GitHub Project
 */
async function createProject({ name, description }) {
  try {
    const ownerId = await getOwnerId();

    const { createProjectV2 } = await graphqlWithAuth(`
      mutation CreateProject($ownerId: ID!, $title: String!) {
        createProjectV2(input: {
          ownerId: $ownerId
          title: $title
        }) {
          projectV2 {
            id
            number
            url
            title
          }
        }
      }
    `, {
      ownerId,
      title: name,
    });

    const project = createProjectV2.projectV2;
    console.log(`✅ Created project: ${project.title} (#${project.number})`);
    console.log(`   URL: ${project.url}`);

    return project;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

/**
 * Get project by number
 */
async function getProject(projectNumber) {
  try {
    const { repository } = await graphqlWithAuth(`
      query GetProject($owner: String!, $repo: String!, $number: Int!) {
        repository(owner: $owner, name: $repo) {
          projectV2(number: $number) {
            id
            number
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
    `, {
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      number: projectNumber,
    });

    return repository.projectV2;
  } catch (error) {
    console.error('Error getting project:', error);
    throw error;
  }
}

/**
 * Add issue to project
 */
async function addIssueToProject(projectId, issueNodeId) {
  try {
    const { addProjectV2ItemById } = await graphqlWithAuth(`
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
    `, {
      projectId,
      contentId: issueNodeId,
    });

    const itemId = addProjectV2ItemById.item.id;
    console.log(`✅ Added issue to project (item: ${itemId})`);

    return itemId;
  } catch (error) {
    console.error('Error adding issue to project:', error);
    throw error;
  }
}

/**
 * Update project item status
 */
async function updateItemStatus(projectId, itemId, fieldId, optionId) {
  try {
    await graphqlWithAuth(`
      mutation UpdateStatus($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: ProjectV2FieldValue!) {
        updateProjectV2ItemFieldValue(input: {
          projectId: $projectId
          itemId: $itemId
          fieldId: $fieldId
          value: $value
        }) {
          projectV2Item {
            id
          }
        }
      }
    `, {
      projectId,
      itemId,
      fieldId,
      value: {
        singleSelectOptionId: optionId,
      },
    });

    console.log(`✅ Updated item status`);
  } catch (error) {
    console.error('Error updating item status:', error);
    throw error;
  }
}

/**
 * Get status field ID and options
 */
async function getStatusField(projectId) {
  try {
    const { node } = await graphqlWithAuth(`
      query GetStatusField($projectId: ID!) {
        node(id: $projectId) {
          ... on ProjectV2 {
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
          }
        }
      }
    `, {
      projectId,
    });

    const statusField = node.fields.nodes.find(f => f.name === 'Status');
    return statusField;
  } catch (error) {
    console.error('Error getting status field:', error);
    throw error;
  }
}

/**
 * Store project in database
 */
function storeProject(planId, projectId, projectNumber, projectUrl, ownerId) {
  const db = getDatabase();

  try {
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO github_projects 
      (local_plan_id, project_id, project_number, project_url, owner_id, updated_at)
      VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);

    stmt.run(planId, projectId, projectNumber, projectUrl, ownerId);
    console.log(`✅ Stored project mapping: ${planId} → Project #${projectNumber}`);
  } finally {
    db.close();
  }
}

/**
 * Get project from database
 */
function getStoredProject(planId) {
  const db = getDatabase();

  try {
    const stmt = db.prepare(`
      SELECT * FROM github_projects WHERE local_plan_id = ?
    `);

    return stmt.get(planId);
  } finally {
    db.close();
  }
}

/**
 * Store project item
 */
function storeProjectItem(projectId, itemId, issueId, status) {
  const db = getDatabase();

  try {
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO github_project_items 
      (project_id, item_id, issue_id, status, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);

    stmt.run(projectId, itemId, issueId, status);
  } finally {
    db.close();
  }
}

/**
 * Get project item by issue ID
 */
function getProjectItem(issueId) {
  const db = getDatabase();

  try {
    const stmt = db.prepare(`
      SELECT * FROM github_project_items WHERE issue_id = ?
    `);

    return stmt.get(issueId);
  } finally {
    db.close();
  }
}

/**
 * List all projects
 */
function listProjects() {
  const db = getDatabase();

  try {
    const stmt = db.prepare(`
      SELECT * FROM github_projects ORDER BY created_at DESC
    `);

    return stmt.all();
  } finally {
    db.close();
  }
}

/**
 * Map local status to GitHub status
 */
function mapStatusToGitHub(localStatus) {
  const statusMap = {
    'pending': 'To Do',
    'in-progress': 'In Progress',
    'complete': 'Done',
    'blocked': 'Blocked',
  };

  return statusMap[localStatus] || 'To Do';
}

/**
 * Map GitHub status to local status
 */
function mapStatusToLocal(githubStatus) {
  const statusMap = {
    'To Do': 'pending',
    'In Progress': 'in-progress',
    'Done': 'complete',
    'Blocked': 'blocked',
  };

  return statusMap[githubStatus] || 'pending';
}

module.exports = {
  createProject,
  getProject,
  addIssueToProject,
  updateItemStatus,
  getStatusField,
  storeProject,
  getStoredProject,
  storeProjectItem,
  getProjectItem,
  listProjects,
  mapStatusToGitHub,
  mapStatusToLocal,
  getOwnerId,
};

// CLI
if (require.main === module) {
  const command = process.argv[2];

  if (command === 'list') {
    const projects = listProjects();
    console.log('\n📋 GitHub Projects:\n');
    projects.forEach(p => {
      console.log(`  #${p.project_number}: ${p.local_plan_id}`);
      console.log(`  URL: ${p.project_url}`);
      console.log(`  Created: ${p.created_at}\n`);
    });
  } else if (command === 'create') {
    const name = process.argv[3];
    if (!name) {
      console.error('Usage: node github-projects.js create "Project Name"');
      process.exit(1);
    }
    createProject({ name }).then(() => process.exit(0));
  } else {
    console.log('Usage:');
    console.log('  node github-projects.js list');
    console.log('  node github-projects.js create "Project Name"');
  }
}
