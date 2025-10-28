#!/usr/bin/env node
/**
 * Sync Plan Tasks to GitHub Projects
 * Creates individual issues for each task in a plan and adds them to the project board
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { getGitHubService } = require('./github-service');
const { storeMapping, getGitHubId, logSync } = require('./github-db');
const { 
  addIssueToProject, 
  getStoredProject,
  storeProjectItem 
} = require('./github-projects');

const PLANS_DIR = path.join(__dirname, '../implementation/plans');

/**
 * Parse tasks from plan markdown
 */
function parsePlanTasks(planContent, planName) {
  const tasks = [];
  const lines = planContent.split('\n');
  
  let inTaskSection = false;
  let currentSection = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect section headers
    if (line.startsWith('##')) {
      currentSection = line.replace(/^##\s*/, '').trim();
      inTaskSection = currentSection.toLowerCase().includes('task') || 
                      currentSection.toLowerCase().includes('success') ||
                      currentSection.toLowerCase().includes('implementation');
    }
    
    // Parse checkbox tasks
    if (line.match(/^-\s*\[[ x]\]/)) {
      const isComplete = line.includes('[x]');
      const taskText = line.replace(/^-\s*\[[ x]\]\s*/, '').trim();
      
      if (taskText && taskText.length > 3) {
        tasks.push({
          title: taskText,
          completed: isComplete,
          section: currentSection,
          planName: planName
        });
      }
    }
  }
  
  return tasks;
}

/**
 * Get all plan files
 */
function getPlanFiles() {
  if (!fs.existsSync(PLANS_DIR)) {
    console.error(`Plans directory not found: ${PLANS_DIR}`);
    return [];
  }
  
  return fs.readdirSync(PLANS_DIR)
    .filter(file => file.startsWith('PLAN_') && file.endsWith('.md'))
    .map(file => ({
      name: file.replace('PLAN_', '').replace('.md', ''),
      path: path.join(PLANS_DIR, file)
    }));
}

/**
 * Sync tasks for a single plan
 */
async function syncPlanTasks(planFile) {
  const github = getGitHubService();
  const planName = planFile.name;
  
  console.log(`\n📋 Processing plan: ${planName}`);
  
  // Get project for this plan
  const project = getStoredProject(planName);
  if (!project) {
    console.log(`   ⚠️  No project found for ${planName}, skipping`);
    return;
  }
  
  console.log(`   Project #${project.project_number}: ${project.project_url}`);
  
  // Read and parse plan
  const planContent = fs.readFileSync(planFile.path, 'utf-8');
  const tasks = parsePlanTasks(planContent, planName);
  
  console.log(`   Found ${tasks.length} tasks`);
  
  if (tasks.length === 0) {
    console.log(`   No tasks to sync`);
    return;
  }
  
  let created = 0;
  let skipped = 0;
  
  // Create issue for each task
  for (const task of tasks) {
    try {
      // Check if issue already exists
      const taskId = `${planName}:${task.title.substring(0, 50)}`;
      const existing = getGitHubId('task', taskId);
      
      if (existing) {
        skipped++;
        continue;
      }
      
      // Create issue
      const labels = ['task', planName.toLowerCase()];
      if (task.completed) labels.push('completed');
      
      const issue = await github.createIssue({
        title: `[${planName}] ${task.title}`,
        body: `**Plan**: ${planName}\n**Section**: ${task.section}\n\nTask from implementation plan.`,
        labels: labels
      });
      
      // Store mapping
      storeMapping('task', taskId, 'issue', issue.number);
      
      // Add to project
      const issueData = await github.getIssue(issue.number);
      const itemId = await addIssueToProject(project.project_id, issueData.node_id);
      
      // Store project item
      const status = task.completed ? 'Done' : 'To Do';
      storeProjectItem(project.project_id, itemId, issue.number, status);
      
      logSync('create', 'task', issue.number, 'to_github', 'success');
      
      created++;
      console.log(`   ✅ Created issue #${issue.number}: ${task.title.substring(0, 60)}...`);
      
      // Rate limit protection
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`   ❌ Error creating task: ${error.message}`);
      logSync('create', 'task', taskId, 'to_github', 'failed', error.message);
    }
  }
  
  console.log(`   📊 Summary: ${created} created, ${skipped} skipped`);
}

/**
 * Sync all plans
 */
async function syncAllPlans() {
  console.log('🔄 Syncing plan tasks to GitHub Projects...\n');
  
  const planFiles = getPlanFiles();
  console.log(`Found ${planFiles.length} plans\n`);
  
  for (const planFile of planFiles) {
    await syncPlanTasks(planFile);
  }
  
  console.log('\n✅ All plans synced!');
}

/**
 * Sync single plan
 */
async function syncSinglePlan(planName) {
  const planFiles = getPlanFiles();
  const planFile = planFiles.find(p => p.name === planName);
  
  if (!planFile) {
    console.error(`Plan not found: ${planName}`);
    console.log('Available plans:');
    planFiles.forEach(p => console.log(`  - ${p.name}`));
    process.exit(1);
  }
  
  await syncPlanTasks(planFile);
}

// CLI
if (require.main === module) {
  const command = process.argv[2];
  
  if (command === 'all') {
    syncAllPlans().then(() => process.exit(0)).catch(err => {
      console.error(err);
      process.exit(1);
    });
  } else if (command) {
    syncSinglePlan(command).then(() => process.exit(0)).catch(err => {
      console.error(err);
      process.exit(1);
    });
  } else {
    console.log('Usage:');
    console.log('  node sync-plan-tasks.js all              # Sync all plans');
    console.log('  node sync-plan-tasks.js PLAN_NAME        # Sync specific plan');
    console.log('\nExample:');
    console.log('  node sync-plan-tasks.js 00_PROJECT_SETUP');
  }
}

module.exports = { parsePlanTasks, syncPlanTasks, syncAllPlans };
