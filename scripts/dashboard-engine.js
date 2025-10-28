#!/usr/bin/env node
/**
 * Dashboard Engine - Integrates watcher, analyzer, and state manager
 * Main orchestrator for automated dashboard system
 */

const { startWatcher } = require('./watcher');
const { analyzeProject } = require('./analyzer');
const { updateState, getState } = require('./state-manager');
const { broadcastUpdate } = require('./server');
const { syncGitHubStatus } = require('./sync-github-status');
const { refreshProjectStatus } = require('./refresh-project-status');

let isAnalyzing = false;

/**
 * Run analysis and update state
 */
async function runAnalysis() {
  if (isAnalyzing) {
    console.log('⏳ Analysis already in progress, skipping...');
    return;
  }

  isAnalyzing = true;
  
  try {
    console.log('\n🔄 Running analysis...');
    const analysis = await analyzeProject();
    
    console.log('💾 Updating state...');
    updateState(analysis);
    
    console.log('🔄 Refreshing GitHub Projects...');
    await refreshProjectStatus();
    
    console.log('🔄 Syncing GitHub status...');
    await syncGitHubStatus();
    
    console.log('✅ Dashboard updated\n');
    
    // Broadcast to WebSocket clients
    const state = getState();
    broadcastUpdate(state);
    
  } catch (error) {
    console.error('❌ Analysis failed:', error);
  } finally {
    isAnalyzing = false;
  }
}

/**
 * Start dashboard engine
 */
async function startEngine() {
  console.log('🚀 Starting Dashboard Engine\n');
  
  // Run initial analysis
  await runAnalysis();
  
  // Start file watcher
  const watcher = startWatcher();
  
  // Re-analyze on file changes
  watcher.on('all', () => {
    // Debounced by watcher already
    runAnalysis();
  });
  
  console.log('✅ Dashboard Engine running\n');
  console.log('Press Ctrl+C to stop\n');
}

// Run if called directly
if (require.main === module) {
  startEngine().catch(error => {
    console.error('❌ Engine failed:', error);
    process.exit(1);
  });
}

module.exports = { startEngine, runAnalysis };
