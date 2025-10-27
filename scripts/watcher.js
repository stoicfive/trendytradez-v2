#!/usr/bin/env node
/**
 * File System Watcher for Automated Dashboard
 * Monitors codebase changes and triggers analysis
 */

const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

// Configuration
const config = {
  watch: {
    paths: [
      'packages/**/*.{ts,tsx,js,jsx,json}',
      'apps/**/*.{ts,tsx,js,jsx,json}',
      '*.md',
      'package.json',
      'pnpm-workspace.yaml',
    ],
    ignore: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/*.test.{ts,tsx,js,jsx}',
    ],
    debounce: 500, // ms
  },
};

// Debounce helper
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Change event handler
const handleChange = debounce((eventType, filePath) => {
  const timestamp = new Date().toISOString();
  const relativePath = path.relative(process.cwd(), filePath);
  
  console.log(`[${timestamp}] ${eventType.toUpperCase()}: ${relativePath}`);
  
  // TODO: Trigger code analyzer here
  // For now, just log the change
}, config.watch.debounce);

// Initialize watcher
function startWatcher() {
  console.log('🔍 Starting file system watcher...\n');
  console.log('Watching paths:');
  config.watch.paths.forEach(p => console.log(`  - ${p}`));
  console.log('\nIgnoring:');
  config.watch.ignore.forEach(p => console.log(`  - ${p}`));
  console.log('\n✅ Watcher active. Press Ctrl+C to stop.\n');

  const watcher = chokidar.watch(config.watch.paths, {
    ignored: config.watch.ignore,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 300,
      pollInterval: 100,
    },
  });

  // Event handlers
  watcher
    .on('add', (filePath) => handleChange('add', filePath))
    .on('change', (filePath) => handleChange('change', filePath))
    .on('unlink', (filePath) => handleChange('delete', filePath))
    .on('error', (error) => console.error('❌ Watcher error:', error))
    .on('ready', () => {
      console.log('👀 Watching for changes...\n');
    });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Stopping watcher...');
    watcher.close().then(() => {
      console.log('✅ Watcher stopped');
      process.exit(0);
    });
  });

  return watcher;
}

// Run if called directly
if (require.main === module) {
  startWatcher();
}

module.exports = { startWatcher, config };
