#!/usr/bin/env node
/**
 * GitHub Sync Service
 * Syncs local dashboard state to GitHub
 */

require('dotenv').config();
const { getGitHubService } = require('./github-service');
const { getState } = require('./state-manager');
const { storeMapping, getGitHubId, logSync } = require('./github-db');
const { 
  createProject, 
  addIssueToProject, 
  getStatusField,
  updateItemStatus,
  storeProject, 
  getStoredProject,
  storeProjectItem,
  mapStatusToGitHub,
  getOwnerId 
} = require('./github-projects');

const SYNC_ENABLED = process.env.SYNC_ENABLED === 'true';
const AUTO_CLOSE_ISSUES = process.env.AUTO_CLOSE_ISSUES === 'true';

/**
 * Sync package to GitHub milestone
 */
async function syncPackageToMilestone(pkg) {
  if (!SYNC_ENABLED) return;

  const github = getGitHubService();
  
  try {
    // Check if milestone already exists
    const existingMapping = getGitHubId('package', pkg.name);
    
    if (existingMapping) {
      console.log(`Package ${pkg.name} already synced to milestone #${existingMapping.github_id}`);
      return;
    }

    // Create milestone
    const milestone = await github.createMilestone({
      title: pkg.name,
      description: pkg.description || 'No description',
    });

    // Store mapping
    storeMapping('package', pkg.name, 'milestone', milestone.number);
    logSync('create', 'milestone', milestone.number, 'to_github', 'success');

    console.log(`✅ Synced package ${pkg.name} to milestone #${milestone.number}`);
    return milestone;
  } catch (error) {
    console.error(`Error syncing package ${pkg.name}:`, error.message);
    logSync('create', 'package', pkg.name, 'to_github', 'failed', error.message);
    throw error;
  }
}

/**
 * Sync package status to GitHub
 */
async function syncPackageStatus(pkg) {
  if (!SYNC_ENABLED || !AUTO_CLOSE_ISSUES) return;

  const github = getGitHubService();
  
  try {
    // Get milestone mapping
    const milestoneMapping = getGitHubId('package', pkg.name);
    
    if (!milestoneMapping) {
      console.log(`No milestone found for package ${pkg.name}, skipping status sync`);
      return;
    }

    // If package is complete, close all related issues
    if (pkg.status === 'complete') {
      const issues = await github.getIssues({
        state: 'open',
        milestone: milestoneMapping.github_id,
      });

      for (const issue of issues) {
        await github.closeIssue(issue.number);
        logSync('update', 'issue', issue.number, 'to_github', 'success');
      }

      console.log(`✅ Closed ${issues.length} issues for completed package ${pkg.name}`);
    }
  } catch (error) {
    console.error(`Error syncing package status ${pkg.name}:`, error.message);
    logSync('update', 'package', pkg.name, 'to_github', 'failed', error.message);
  }
}

/**
 * Create GitHub issue from TODO
 */
async function createIssueFromTodo(todo) {
  if (!SYNC_ENABLED) return;

  const github = getGitHubService();
  
  try {
    // Check if already synced
    const existingMapping = getGitHubId('todo', `${todo.file}:${todo.line}`);
    
    if (existingMapping) {
      console.log(`TODO already synced to issue #${existingMapping.github_id}`);
      return;
    }

    // Create issue
    const issue = await github.createIssue({
      title: `${todo.type}: ${todo.message}`,
      body: `**File**: \`${todo.file}\`\n**Line**: ${todo.line}\n\n${todo.message}`,
      labels: [todo.type.toLowerCase(), 'automated'],
    });

    // Store mapping
    storeMapping('todo', `${todo.file}:${todo.line}`, 'issue', issue.number);
    logSync('create', 'issue', issue.number, 'to_github', 'success');

    console.log(`✅ Created issue #${issue.number} from TODO`);
    return issue;
  } catch (error) {
    console.error(`Error creating issue from TODO:`, error.message);
    logSync('create', 'todo', `${todo.file}:${todo.line}`, 'to_github', 'failed', error.message);
  }
}

/**
 * Sync plan to tracking issue AND GitHub Project
 */
async function syncPlanToProject(plan) {
  if (!SYNC_ENABLED) return;

  const github = getGitHubService();
  
  try {
    // Check if issue already exists
    const existingMapping = getGitHubId('plan', plan.name);
    let issue;
    
    if (existingMapping) {
      console.log(`Plan ${plan.name} already synced to project #${existingMapping.github_id}`);
      issue = { number: existingMapping.github_id };
    } else {
      // Create tracking issue
      issue = await github.createIssue({
        title: `[Plan] ${plan.name}`,
        body: `Implementation plan tracking issue\n\nProgress: ${plan.progress}%\nTasks: ${plan.completed}/${plan.total}`,
        labels: ['plan', 'tracking'],
      });

      // Store mapping
      storeMapping('plan', plan.name, 'issue', issue.number);
      logSync('create', 'issue', issue.number, 'to_github', 'success');
      console.log(`✅ Created tracking issue #${issue.number} for plan ${plan.name}`);
    }

    // Check if project already exists
    const existingProject = getStoredProject(plan.name);
    
    if (existingProject) {
      console.log(`Project already exists for plan ${plan.name} (#${existingProject.project_number})`);
      return;
    }

    // Create GitHub Project
    const projectName = `TrendyTradez v2 - ${plan.name}`;
    const project = await createProject({
      name: projectName,
      description: `Auto-generated project for ${plan.name} implementation plan`,
    });

    // Store project mapping
    const ownerId = await getOwnerId();
    storeProject(plan.name, project.id, project.number, project.url, ownerId);
    logSync('create', 'project', project.number, 'to_github', 'success');

    // Get issue node ID for adding to project
    const issueData = await github.getIssue(issue.number);
    
    // Add issue to project
    const itemId = await addIssueToProject(project.id, issueData.node_id);
    
    // Store project item
    storeProjectItem(project.id, itemId, issue.number, 'To Do');

    console.log(`✅ Created project #${project.number} and added issue #${issue.number}`);
    return { issue, project };
  } catch (error) {
    console.error(`Error syncing plan ${plan.name}:`, error.message);
    logSync('create', 'plan', plan.name, 'to_github', 'failed', error.message);
  }
}

/**
 * Update plan progress on GitHub
 */
async function updatePlanProgress(plan) {
  if (!SYNC_ENABLED) return;

  const github = getGitHubService();
  
  try {
    const mapping = getGitHubId('plan', plan.name);
    
    if (!mapping) {
      console.log(`No GitHub issue found for plan ${plan.name}`);
      return;
    }

    // Update issue with progress
    await github.createComment(mapping.github_id, 
      `**Progress Update**: ${plan.progress}% (${plan.completed}/${plan.total} tasks completed)`
    );

    // Close issue if plan is complete
    if (plan.progress === 100) {
      await github.closeIssue(mapping.github_id);
      console.log(`✅ Closed tracking issue for completed plan ${plan.name}`);
    }

    logSync('update', 'issue', mapping.github_id, 'to_github', 'success');
  } catch (error) {
    console.error(`Error updating plan progress:`, error.message);
    logSync('update', 'plan', plan.name, 'to_github', 'failed', error.message);
  }
}

/**
 * Full sync - sync all entities to GitHub
 */
async function fullSync() {
  if (!SYNC_ENABLED) {
    console.log('⚠️  GitHub sync is disabled. Set SYNC_ENABLED=true in .env');
    return;
  }

  console.log('🔄 Starting full GitHub sync...\n');

  try {
    const state = getState();

    // Sync packages to milestones
    console.log('📦 Syncing packages to milestones...');
    for (const pkg of state.packages) {
      await syncPackageToMilestone(pkg);
      await syncPackageStatus(pkg);
    }

    // Sync TODOs to issues
    console.log('\n📝 Syncing TODOs to issues...');
    for (const todo of state.todos.slice(0, 10)) { // Limit to 10 to avoid rate limits
      await createIssueFromTodo(todo);
    }

    // Sync plans to tracking issues
    console.log('\n📋 Syncing plans to tracking issues...');
    for (const plan of state.plans) {
      await syncPlanToProject(plan);
    }

    console.log('\n✅ Full sync complete!');
  } catch (error) {
    console.error('❌ Full sync failed:', error);
    throw error;
  }
}

/**
 * Sync single entity
 */
async function syncEntity(type, entity) {
  if (!SYNC_ENABLED) return;

  switch (type) {
    case 'package':
      await syncPackageToMilestone(entity);
      await syncPackageStatus(entity);
      break;
    case 'todo':
      await createIssueFromTodo(entity);
      break;
    case 'plan':
      await syncPlanToProject(entity);
      break;
    default:
      console.warn(`Unknown entity type: ${type}`);
  }
}

// CLI commands
if (require.main === module) {
  const command = process.argv[2];

  switch (command) {
    case 'full':
      fullSync().catch(error => {
        console.error('Sync failed:', error);
        process.exit(1);
      });
      break;

    case 'test':
      const github = getGitHubService();
      github.testConnection().then(result => {
        if (result.success) {
          console.log('✅ GitHub connection successful');
          process.exit(0);
        } else {
          console.error('❌ GitHub connection failed');
          process.exit(1);
        }
      });
      break;

    default:
      console.log('Usage: node github-sync.js [full|test]');
      console.log('  full - Perform full sync of all entities');
      console.log('  test - Test GitHub connection');
      process.exit(1);
  }
}

module.exports = {
  syncPackageToMilestone,
  syncPackageStatus,
  createIssueFromTodo,
  syncPlanToProject,
  updatePlanProgress,
  fullSync,
  syncEntity,
};
