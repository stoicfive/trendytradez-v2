#!/usr/bin/env node
/**
 * Sync GitHub Status Back to Dashboard
 * Pulls GitHub Projects status and updates plan progress
 */

require('dotenv').config();
const { getDatabase } = require('./state-manager');

async function syncGitHubStatus() {
  console.log('Syncing GitHub Projects status to dashboard...\n');
  
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
      // Get all tasks for this plan with their GitHub Projects status
      const tasks = db.prepare(`
        SELECT 
          gm.local_id, 
          gm.github_id,
          gpi.status
        FROM github_mappings gm
        LEFT JOIN github_project_items gpi ON gm.github_id = gpi.issue_id
        WHERE gm.local_type = 'task' 
        AND gm.local_id LIKE ?
      `).all(`${plan_name}:%`);
      
      if (tasks.length === 0) continue;
      
      let completed = 0;
      const total = tasks.length;
      
      // Count tasks that are in progress or done
      let inProgress = 0;
      for (const task of tasks) {
        if (task.status === 'Done') {
          completed++;
        } else if (task.status === 'In Progress') {
          inProgress++;
        }
      }
      
      // Progress includes both in-progress and completed tasks
      const totalProgress = completed + inProgress;
      
      const progress = total > 0 ? Math.round((totalProgress / total) * 100) : 0;
      
      // Update plan in database
      db.prepare(`
        UPDATE plans 
        SET progress = ?, completed = ?, total = ?, updated_at = CURRENT_TIMESTAMP
        WHERE name = ?
      `).run(progress, completed, total, plan_name);
      
      console.log(`${plan_name}: ${completed} done, ${inProgress} in progress, ${total - totalProgress} to do (${progress}%)`);
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
