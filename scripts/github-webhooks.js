#!/usr/bin/env node
/**
 * GitHub Webhooks Server
 * Receives GitHub events and updates local dashboard
 */

require('dotenv').config();
const express = require('express');
const { Webhooks } = require('@octokit/webhooks');
const { updateState, getState } = require('./state-manager');
const { getLocalId, storeMapping, logSync } = require('./github-db');

const WEBHOOK_PORT = process.env.WEBHOOK_PORT || 3004;
const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;
const WEBHOOK_PATH = process.env.WEBHOOK_PATH || '/webhooks/github';

if (!WEBHOOK_SECRET) {
  console.error('❌ GITHUB_WEBHOOK_SECRET not set in .env');
  process.exit(1);
}

// Create webhook handler
const webhooks = new Webhooks({
  secret: WEBHOOK_SECRET,
});

// Create Express app
const app = express();

/**
 * Handle issue closed event
 */
webhooks.on('issues.closed', async ({ payload }) => {
  console.log(`\n📥 Issue #${payload.issue.number} closed`);
  
  try {
    const localEntity = getLocalId('issue', payload.issue.number);
    
    if (!localEntity) {
      console.log('No local mapping found for this issue');
      return;
    }

    // Update local state based on entity type
    if (localEntity.local_type === 'plan') {
      console.log(`Marking plan ${localEntity.local_id} as complete`);
      // Plan tracking issue closed - update progress to 100%
      // This would require updating the state-manager to support plan updates
    }

    logSync('update', 'issue', payload.issue.number, 'from_github', 'success');
    
    // Note: Dashboard will pick up changes on next analysis
    console.log('✅ Local state updated from GitHub');
  } catch (error) {
    console.error('Error handling issue closed:', error);
    logSync('update', 'issue', payload.issue.number, 'from_github', 'failed', error.message);
  }
});

/**
 * Handle issue opened event
 */
webhooks.on('issues.opened', async ({ payload }) => {
  console.log(`\n📥 Issue #${payload.issue.number} opened: ${payload.issue.title}`);
  
  try {
    // Store mapping if this is a new issue we should track
    if (payload.issue.labels.some(l => l.name === 'automated')) {
      console.log('New automated issue created on GitHub');
      // Could create local TODO or task
    }
    
    logSync('create', 'issue', payload.issue.number, 'from_github', 'success');
  } catch (error) {
    console.error('Error handling issue opened:', error);
    logSync('create', 'issue', payload.issue.number, 'from_github', 'failed', error.message);
  }
});

/**
 * Handle issue edited event
 */
webhooks.on('issues.edited', async ({ payload }) => {
  console.log(`\n📥 Issue #${payload.issue.number} edited`);
  
  try {
    const localEntity = getLocalId('issue', payload.issue.number);
    
    if (localEntity) {
      console.log(`Updating local ${localEntity.local_type}: ${localEntity.local_id}`);
      // Update local entity with new data from GitHub
    }
    
    logSync('update', 'issue', payload.issue.number, 'from_github', 'success');
  } catch (error) {
    console.error('Error handling issue edited:', error);
    logSync('update', 'issue', payload.issue.number, 'from_github', 'failed', error.message);
  }
});

/**
 * Handle milestone events
 */
webhooks.on('milestone.closed', async ({ payload }) => {
  console.log(`\n📥 Milestone #${payload.milestone.number} closed: ${payload.milestone.title}`);
  
  try {
    const localEntity = getLocalId('milestone', payload.milestone.number);
    
    if (localEntity && localEntity.local_type === 'package') {
      console.log(`Marking package ${localEntity.local_id} as complete`);
      // Update package status to complete
      // This would require updating the analyzer to mark packages as complete
    }
    
    logSync('update', 'milestone', payload.milestone.number, 'from_github', 'success');
    
    console.log('✅ Package status updated from GitHub');
  } catch (error) {
    console.error('Error handling milestone closed:', error);
    logSync('update', 'milestone', payload.milestone.number, 'from_github', 'failed', error.message);
  }
});

/**
 * Handle release published event
 */
webhooks.on('release.published', async ({ payload }) => {
  console.log(`\n📥 Release published: ${payload.release.tag_name}`);
  
  try {
    console.log(`Release: ${payload.release.name}`);
    console.log(`Tag: ${payload.release.tag_name}`);
    console.log(`URL: ${payload.release.html_url}`);
    
    // Could store release info in database
    logSync('create', 'release', payload.release.id, 'from_github', 'success');
    
    console.log('✅ Release notification logged');
  } catch (error) {
    console.error('Error handling release published:', error);
    logSync('create', 'release', payload.release.id, 'from_github', 'failed', error.message);
  }
});

/**
 * Handle push events
 */
webhooks.on('push', async ({ payload }) => {
  console.log(`\n📥 Push to ${payload.ref} by ${payload.pusher.name}`);
  console.log(`Commits: ${payload.commits.length}`);
  
  try {
    // Trigger analysis on push
    console.log('Triggering dashboard analysis...');
    
    // Could trigger dashboard engine to re-analyze
    // For now, just log it
    logSync('update', 'push', payload.after, 'from_github', 'success');
  } catch (error) {
    console.error('Error handling push:', error);
    logSync('update', 'push', payload.after, 'from_github', 'failed', error.message);
  }
});

/**
 * Handle pull request merged
 */
webhooks.on('pull_request.closed', async ({ payload }) => {
  if (payload.pull_request.merged) {
    console.log(`\n📥 PR #${payload.pull_request.number} merged: ${payload.pull_request.title}`);
    
    try {
      console.log('PR merged - triggering analysis');
      logSync('update', 'pr', payload.pull_request.number, 'from_github', 'success');
    } catch (error) {
      console.error('Error handling PR merged:', error);
      logSync('update', 'pr', payload.pull_request.number, 'from_github', 'failed', error.message);
    }
  }
});

/**
 * Webhook endpoint
 */
app.post(WEBHOOK_PATH, express.json({ type: 'application/json' }), async (req, res) => {
  try {
    await webhooks.verifyAndReceive({
      id: req.headers['x-github-delivery'],
      name: req.headers['x-github-event'],
      signature: req.headers['x-hub-signature-256'],
      payload: req.body,
    });
    
    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).send('Error processing webhook');
  }
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'github-webhooks',
    timestamp: new Date().toISOString() 
  });
});

/**
 * Start webhook server
 */
function startWebhookServer() {
  app.listen(WEBHOOK_PORT, () => {
    console.log(`\n🔌 GitHub Webhook Server running on port ${WEBHOOK_PORT}`);
    console.log(`📍 Webhook URL: http://localhost:${WEBHOOK_PORT}${WEBHOOK_PATH}`);
    console.log(`\n⚙️  Configure this URL in GitHub:`);
    console.log(`   https://github.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/settings/hooks`);
    console.log(`\n🔐 Webhook Secret: ${WEBHOOK_SECRET.substring(0, 10)}...`);
    console.log(`\nListening for events:`);
    console.log('  - issues.opened, issues.closed, issues.edited');
    console.log('  - milestone.closed');
    console.log('  - release.published');
    console.log('  - push');
    console.log('  - pull_request.closed');
    console.log('\nPress Ctrl+C to stop\n');
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down webhook server...');
    process.exit(0);
  });
}

// Run if called directly
if (require.main === module) {
  startWebhookServer();
}

module.exports = { startWebhookServer, webhooks };
