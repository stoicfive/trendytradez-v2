#!/usr/bin/env node
/**
 * CLI tool to update dashboard data
 * Usage: node scripts/update-dashboard.js --package="@trendytradez/widgets" --status="complete"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dataPath = path.join(__dirname, '../dashboard/data/project-status.json');

// Parse command line arguments
const args = process.argv.slice(2);
const options = {};

args.forEach(arg => {
  const [key, value] = arg.replace(/^--/, '').split('=');
  options[key] = value?.replace(/['"]/g, '');
});

// Load current data
let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Update based on command
if (options.package && options.status) {
  // Update package status
  const pkg = data.packages.find(p => p.name === options.package);
  if (pkg) {
    pkg.status = options.status;
    console.log(`✅ Updated ${options.package} to ${options.status}`);
  } else {
    console.error(`❌ Package ${options.package} not found`);
    process.exit(1);
  }

  // Recalculate stats
  const completePackages = data.packages.filter(p => p.status === 'complete').length;
  data.stats.packagesCreated.current = completePackages;
  data.stats.packagesCreated.percentage = Math.round((completePackages / data.stats.packagesCreated.total) * 100);
}

if (options.plan && options.status) {
  // Update plan status
  data.stats.plansComplete.current = parseInt(options.status.split('/')[0]);
  data.stats.plansComplete.percentage = Math.round((data.stats.plansComplete.current / data.stats.plansComplete.total) * 100);
  console.log(`✅ Updated plans to ${options.status}`);
}

if (options['add-commit']) {
  // Add recent commit
  const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
  const commitDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  data.recentCommits.unshift({
    message: options['add-commit'],
    hash: commitHash,
    date: commitDate
  });

  // Keep only last 6 commits
  data.recentCommits = data.recentCommits.slice(0, 6);
  console.log(`✅ Added commit: ${options['add-commit']}`);
}

if (options['current-task']) {
  // Update current task
  if (data.nextActions[0]) {
    data.nextActions[0].title = options['current-task'];
    data.nextActions[0].description = options['task-desc'] || data.nextActions[0].description;
    console.log(`✅ Updated current task: ${options['current-task']}`);
  }
}

if (options['set-blocker']) {
  // Set blocker
  data.blockers.hasBlockers = true;
  data.blockers.message = options['set-blocker'];
  console.log(`✅ Set blocker: ${options['set-blocker']}`);
}

if (options['clear-blocker']) {
  // Clear blocker
  data.blockers.hasBlockers = false;
  data.blockers.message = "All systems operational. Ready to proceed with implementation.";
  console.log(`✅ Cleared blockers`);
}

if (options.story && options.status) {
  // Story completion - this is a placeholder, actual implementation would update the HTML
  console.log(`✅ Story ${options.story} marked as ${options.status}`);
  console.log(`⚠️  Note: Story status updates require manual HTML update in dashboard/index.html`);
  console.log(`   Or update the JSON data structure to include story tracking`);
}

if (options.initiative && options.status) {
  // Initiative completion
  const initiative = data.initiatives?.find(i => i.id === options.initiative);
  if (initiative) {
    initiative.status = options.status;
    const completeInitiatives = data.initiatives.filter(i => i.status === 'complete').length;
    data.stats.initiativesComplete.current = completeInitiatives;
    data.stats.initiativesComplete.percentage = Math.round((completeInitiatives / data.stats.initiativesComplete.total) * 100);
    console.log(`✅ Initiative ${initiative.name} marked as ${options.status}`);
  }
}

if (options.epic && options.status) {
  // Epic completion - find and update in initiatives
  const epicId = options.epic.startsWith('epic-') ? options.epic : `epic-${options.epic}`;
  let found = false;
  
  data.initiatives?.forEach(initiative => {
    const epic = initiative.epics.find(e => e.id === epicId);
    if (epic) {
      epic.status = options.status;
      found = true;
      console.log(`✅ Epic ${epic.name} in ${initiative.name} marked as ${options.status}`);
      
      // Update epic stats
      let totalEpics = 0;
      let completeEpics = 0;
      data.initiatives.forEach(init => {
        totalEpics += init.epics.length;
        completeEpics += init.epics.filter(e => e.status === 'complete').length;
      });
      data.stats.epicsComplete.current = completeEpics;
      data.stats.epicsComplete.total = totalEpics;
      data.stats.epicsComplete.percentage = Math.round((completeEpics / totalEpics) * 100);
    }
  });
  
  if (!found) {
    console.log(`⚠️  Epic ${epicId} not found in initiatives`);
  }
}

// Auto-update recent commits from git
try {
  const recentCommits = execSync('git log --oneline -6 --format="%h|%s|%cd" --date=format:"%b %d, %Y"')
    .toString()
    .trim()
    .split('\n')
    .map(line => {
      const [hash, ...rest] = line.split('|');
      const date = rest.pop();
      const message = rest.join('|');
      return { message, hash, date };
    });
  data.recentCommits = recentCommits;
  console.log(`✅ Auto-updated recent commits from git`);
} catch (error) {
  console.log(`⚠️  Could not auto-update commits: ${error.message}`);
}

// Update timestamp
data.meta.lastUpdated = new Date().toISOString();

// Save updated data
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`\n📝 Dashboard data updated successfully!`);
console.log(`   Run: pnpm dashboard:validate to verify`);
