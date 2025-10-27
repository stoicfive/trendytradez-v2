/**
 * Tests for file system watcher
 */

const { describe, it, expect, beforeEach, afterEach } = require('vitest');
const fs = require('fs');
const path = require('path');
const { startWatcher, config } = require('../watcher');

describe('File System Watcher', () => {
  let watcher;
  const testDir = path.join(__dirname, 'test-files');

  beforeEach(() => {
    // Create test directory
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(async () => {
    // Close watcher
    if (watcher) {
      await watcher.close();
    }
    
    // Clean up test directory
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  it('should have valid configuration', () => {
    expect(config).toBeDefined();
    expect(config.watch).toBeDefined();
    expect(config.watch.paths).toBeInstanceOf(Array);
    expect(config.watch.ignore).toBeInstanceOf(Array);
    expect(config.watch.debounce).toBeGreaterThan(0);
  });

  it('should watch specified paths', () => {
    expect(config.watch.paths).toContain('packages/**/*.{ts,tsx,js,jsx,json}');
    expect(config.watch.paths).toContain('apps/**/*.{ts,tsx,js,jsx,json}');
    expect(config.watch.paths).toContain('*.md');
  });

  it('should ignore node_modules and dist', () => {
    expect(config.watch.ignore).toContain('**/node_modules/**');
    expect(config.watch.ignore).toContain('**/dist/**');
    expect(config.watch.ignore).toContain('**/.git/**');
  });

  it('should start watcher without errors', () => {
    expect(() => {
      watcher = startWatcher();
    }).not.toThrow();
    
    expect(watcher).toBeDefined();
  });

  it('should have debounce time of 500ms', () => {
    expect(config.watch.debounce).toBe(500);
  });
});
