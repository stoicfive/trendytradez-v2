#!/usr/bin/env node
/**
 * Sync GitHub Status Back to Dashboard
 * Pulls issue states from GitHub and updates plan progress
 */

require('dotenv').config();
const { getGitHubService } = require('./github-service');
const { getDatabase } = require('./state-manager');

async function syncGitHubStatus() {
  console.log('Syncing GitHub status to dashboard...\n');
  
  const github = getGitHubService();
  const db = getDatabase();
  
  try {
    // Get all plan mappings
    const plans = db.prepare(`
      SELECT DISTINCT 
        SUBSTR(local_id, 1, INSTR(local_id, ':') - 1) as plan_name
      FROM github_mappings 
      WHERE local_type = 'task'
    `).all();
    
    for (const { plan_name } of plans) {
      // Get all tasks for this plan
      const tasks = db.prepare(`
        SELECT local_id, github_id 
        FROM github_mappings 
        WHERE local_type = 'task' 
        AND local_id LIKE ?
      `).all(`${plan_name}:%`);
      
      if (tasks.length === 0) continue;
      
      let completed = 0;
      const total = tasks.length;
      
      // Check each task's GitHub status
      for (const task of tasks) {
        try {
          const issue = await github.getIssue(task.github_id);
          if (issue.state === 'closed') {
            completed++;
          }
        } catch (error) {
          console.error(`Error fetching issue #${task.github_id}:`, error.message);
        }
      }
      
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
      
      // Update plan in database
      db.prepare(`
        UPDATE plans 
        SET progress = ?, completed = ?, total = ?, updated_at = CURRENT_TIMESTAMP
        WHERE name = ?
      `).run(progress, completed, total, plan_name);
      
      console.log(`${plan_name}: ${completed}/${total} tasks (${progress}%)`);
    }
    
    console.log('\nSync complete!');
  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  syncGitHubStatus();
}

module.exports = { syncGitHubStatus };
