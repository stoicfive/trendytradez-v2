#!/usr/bin/env node
/**
 * Update GitHub Project Statuses
 * Updates issue statuses based on actual implementation state
 */

require('dotenv').config();
const { getGitHubService } = require('./github-service');
const { getState } = require('./state-manager');
const { getStoredProject, getProjectItem, getStatusField, updateItemStatus } = require('./github-projects');
const { getGitHubId } = require('./github-db');

/**
 * Determine status based on implementation state
 */
function determineStatus(planName) {
  const state = getState();
  
  // Check package completion
  const packageMap = {
    '00_PROJECT_SETUP': '@trendytradez/config',
    '01_SHARED_PACKAGES': ['@trendytradez/types', '@trendytradez/utils', '@trendytradez/theme'],
    '02_WIDGET_SYSTEM': '@trendytradez/widgets',
    '03_DASHBOARD_CORE': '@trendytradez/dashboard',
    '04_TRADING_TOOLS': null, // Not started
    '05_WEB_APP': null, // Not started
    '06_TESTING_QA': null, // In progress
    '07_DEPLOYMENT': null, // Not started
    'AUTOMATED_DASHBOARD': 'completed', // Done
    'UNIFIED_AUTOMATED_DASHBOARD': 'completed', // Done
    'GITHUB_INTEGRATION': 'completed', // Done
    'GITHUB_PROJECTS_KANBAN': 'in-progress' // Current work
  };
  
  const mapping = packageMap[planName];
  
  if (mapping === 'completed') return 'Done';
  if (mapping === 'in-progress') return 'In Progress';
  if (mapping === null) return 'To Do';
  
  // Check if packages exist and are complete
  if (Array.isArray(mapping)) {
    const packages = mapping.map(name => 
      state.packages.find(p => p.name === name)
    ).filter(Boolean);
    
    if (packages.length === 0) return 'To Do';
    if (packages.every(p => p.status === 'complete')) return 'Done';
    if (packages.some(p => p.status === 'in-progress')) return 'In Progress';
    return 'To Do';
  }
  
  const pkg = state.packages.find(p => p.name === mapping);
  if (!pkg) return 'To Do';
  if (pkg.status === 'complete') return 'Done';
  if (pkg.status === 'in-progress') return 'In Progress';
  return 'To Do';
}

/**
 * Update tracking issue status
 */
async function updateTrackingIssue(planName, status) {
  const github = getGitHubService();
  const mapping = getGitHubId('plan', planName);
  
  if (!mapping) {
    console.log(`   No tracking issue found for ${planName}`);
    return;
  }
  
  try {
    // Add status label
    const statusLabel = status.toLowerCase().replace(' ', '-');
    await github.addLabels(mapping.github_id, [statusLabel]);
    
    // Close if done
    if (status === 'Done') {
      await github.closeIssue(mapping.github_id);
      console.log(`   ✅ Closed tracking issue #${mapping.github_id}`);
    }
    
    // Add comment with status
    await github.createComment(
      mapping.github_id,
      `**Status Update**: ${status}\n\nAutomatically updated based on codebase state.`
    );
    
    console.log(`   ✅ Updated tracking issue #${mapping.github_id} → ${status}`);
  } catch (error) {
    console.error(`   ❌ Error updating tracking issue: ${error.message}`);
  }
}

/**
 * Update project board status
 */
async function updateProjectStatus(planName, status) {
  const project = getStoredProject(planName);
  
  if (!project) {
    console.log(`   No project found for ${planName}`);
    return;
  }
  
  try {
    // Get tracking issue
    const mapping = getGitHubId('plan', planName);
    if (!mapping) return;
    
    // Get project item
    const item = getProjectItem(mapping.github_id);
    if (!item) {
      console.log(`   No project item found for issue #${mapping.github_id}`);
      return;
    }
    
    // Get status field
    const statusField = await getStatusField(project.project_id);
    if (!statusField) {
      console.log(`   No status field found for project`);
      return;
    }
    
    // Find status option ID
    const statusOption = statusField.options.find(opt => opt.name === status);
    if (!statusOption) {
      console.log(`   Status option "${status}" not found`);
      return;
    }
    
    // Update status
    await updateItemStatus(
      project.project_id,
      item.item_id,
      statusField.id,
      statusOption.id
    );
    
    console.log(`   ✅ Updated project board → ${status}`);
  } catch (error) {
    console.error(`   ❌ Error updating project status: ${error.message}`);
  }
}

/**
 * Update all project statuses
 */
async function updateAllStatuses() {
  console.log('🔄 Updating project statuses based on codebase state...\n');
  
  const plans = [
    '00_PROJECT_SETUP',
    '01_SHARED_PACKAGES',
    '02_WIDGET_SYSTEM',
    '03_DASHBOARD_CORE',
    '04_TRADING_TOOLS',
    '05_WEB_APP',
    '06_TESTING_QA',
    '07_DEPLOYMENT',
    'AUTOMATED_DASHBOARD',
    'UNIFIED_AUTOMATED_DASHBOARD',
    'GITHUB_INTEGRATION',
    'GITHUB_PROJECTS_KANBAN'
  ];
  
  for (const planName of plans) {
    console.log(`\n📋 ${planName}`);
    
    const status = determineStatus(planName);
    console.log(`   Current status: ${status}`);
    
    // Update tracking issue
    await updateTrackingIssue(planName, status);
    
    // Update project board
    await updateProjectStatus(planName, status);
    
    // Rate limit protection
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n✅ All statuses updated!');
}

/**
 * Show current state summary
 */
function showStateSummary() {
  const state = getState();
  
  console.log('\n📊 Current Codebase State:\n');
  console.log('Packages:');
  state.packages.forEach(pkg => {
    const icon = pkg.status === 'complete' ? '✅' : 
                 pkg.status === 'in-progress' ? '🔄' : '⏳';
    console.log(`  ${icon} ${pkg.name}: ${pkg.status}`);
  });
  
  console.log(`\nPlans: ${state.plans.length} total`);
  console.log(`TODOs: ${state.todos.length} remaining`);
  console.log(`Test Coverage: ${state.stats.testCoverage}%`);
  console.log(`Recent Commits: ${state.commits.length}`);
}

// CLI
if (require.main === module) {
  const command = process.argv[2];
  
  if (command === 'summary') {
    showStateSummary();
  } else if (command === 'update') {
    updateAllStatuses()
      .then(() => process.exit(0))
      .catch(err => {
        console.error(err);
        process.exit(1);
      });
  } else {
    console.log('Usage:');
    console.log('  node update-project-statuses.js summary  # Show current state');
    console.log('  node update-project-statuses.js update   # Update all statuses');
  }
}

module.exports = { determineStatus, updateAllStatuses };
