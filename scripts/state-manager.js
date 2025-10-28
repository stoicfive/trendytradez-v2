#!/usr/bin/env node
/**
 * State Manager for Automated Dashboard
 * Single source of truth using SQLite
 */

const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '../dashboard.db');

/**
 * Initialize database with schema
 */
function initializeDatabase() {
  const db = new Database(DB_PATH);

  // Enable foreign keys
  db.pragma('foreign_keys = ON');

  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS project_meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      description TEXT,
      version TEXT,
      path TEXT,
      status TEXT CHECK(status IN ('pending', 'in-progress', 'complete')),
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS commits (
      hash TEXT PRIMARY KEY,
      message TEXT NOT NULL,
      date TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT CHECK(type IN ('TODO', 'FIXME')),
      message TEXT NOT NULL,
      file TEXT NOT NULL,
      line INTEGER NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS plans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      file TEXT NOT NULL,
      progress INTEGER DEFAULT 0,
      completed INTEGER DEFAULT 0,
      total INTEGER DEFAULT 0,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS analysis_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
      data TEXT NOT NULL
    );
  `);

  return db;
}

/**
 * Get database instance
 */
function getDatabase() {
  if (!fs.existsSync(DB_PATH)) {
    return initializeDatabase();
  }
  return new Database(DB_PATH);
}

/**
 * Update project state from analysis
 */
function updateState(analysis) {
  const db = getDatabase();

  try {
    db.transaction(() => {
      // Update packages
      const deletePackages = db.prepare('DELETE FROM packages');
      deletePackages.run();

      const insertPackage = db.prepare(`
        INSERT INTO packages (name, description, version, path, status)
        VALUES (?, ?, ?, ?, ?)
      `);

      for (const pkg of analysis.packages) {
        insertPackage.run(pkg.name, pkg.description, pkg.version, pkg.path, pkg.status);
      }

      // Update commits (keep last 20)
      const deleteOldCommits = db.prepare(`
        DELETE FROM commits WHERE hash NOT IN (
          SELECT hash FROM commits ORDER BY created_at DESC LIMIT 20
        )
      `);
      deleteOldCommits.run();

      const insertCommit = db.prepare(`
        INSERT OR REPLACE INTO commits (hash, message, date)
        VALUES (?, ?, ?)
      `);

      for (const commit of analysis.commits) {
        insertCommit.run(commit.hash, commit.message, commit.date);
      }

      // Update TODOs
      const deleteTodos = db.prepare('DELETE FROM todos');
      deleteTodos.run();

      const insertTodo = db.prepare(`
        INSERT INTO todos (type, message, file, line)
        VALUES (?, ?, ?, ?)
      `);

      for (const todo of analysis.todos) {
        insertTodo.run(todo.type, todo.message, todo.file, todo.line);
      }

      // Update plans
      const deletePlans = db.prepare('DELETE FROM plans');
      deletePlans.run();

      const insertPlan = db.prepare(`
        INSERT INTO plans (name, file, progress, completed, total)
        VALUES (?, ?, ?, ?, ?)
      `);

      for (const plan of analysis.plans) {
        insertPlan.run(plan.name, plan.file, plan.progress, plan.completed, plan.total);
      }

      // Update meta
      const upsertMeta = db.prepare(`
        INSERT OR REPLACE INTO project_meta (key, value, updated_at)
        VALUES (?, ?, CURRENT_TIMESTAMP)
      `);

      upsertMeta.run('last_analysis', analysis.timestamp);
      upsertMeta.run('total_packages', analysis.stats.totalPackages.toString());
      upsertMeta.run('complete_packages', analysis.stats.completePackages.toString());
      upsertMeta.run('test_coverage', analysis.coverage.coverage.toString());

      // Log analysis
      const insertLog = db.prepare(`
        INSERT INTO analysis_log (data) VALUES (?)
      `);
      insertLog.run(JSON.stringify(analysis));
    })();

    console.log('✅ State updated successfully');
  } catch (error) {
    console.error('❌ Error updating state:', error);
    throw error;
  } finally {
    db.close();
  }
}

/**
 * Get current state
 */
function getState() {
  const db = getDatabase();

  try {
    const packages = db.prepare('SELECT * FROM packages ORDER BY name').all();
    const commits = db.prepare('SELECT * FROM commits ORDER BY date DESC LIMIT 10').all();
    const todos = db.prepare('SELECT * FROM todos ORDER BY file, line').all();
    const plans = db.prepare('SELECT * FROM plans ORDER BY name').all();
    const meta = db.prepare('SELECT key, value FROM project_meta').all();

    const stats = getStats();

    // Get GitHub stats
    const githubProjects = db.prepare('SELECT COUNT(*) as count FROM github_projects').get();
    const githubMappings = db.prepare('SELECT COUNT(*) as count FROM github_mappings WHERE github_type = "issue"').get();
    const githubMilestones = db.prepare('SELECT COUNT(*) as count FROM github_mappings WHERE github_type = "milestone"').get();
    const lastSync = db.prepare('SELECT MAX(timestamp) as last FROM github_sync_log WHERE status = "success"').get();

    // Convert meta array to object
    const metaObj = {};
    meta.forEach(({ key, value }) => {
      metaObj[key] = value;
    });

    return {
      packages,
      commits,
      todos,
      plans,
      stats,
      meta: metaObj,
      github: {
        projects: githubProjects?.count || 0,
        issues: githubMappings?.count || 0,
        milestones: githubMilestones?.count || 0,
        lastSync: lastSync?.last || null,
        syncStatus: lastSync?.last ? 'success' : null
      },
      lastUpdated: new Date().toISOString()
    };
  } finally {
    db.close();
  }
}

/**
 * Reset database
 */
function resetState() {
  if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
    console.log('✅ Database reset');
  }
  initializeDatabase();
}

/**
 * Get database statistics
 */
function getStats() {
  const db = getDatabase();

  try {
    const packageCount = db.prepare('SELECT COUNT(*) as count FROM packages').get();
    const commitCount = db.prepare('SELECT COUNT(*) as count FROM commits').get();
    const todoCount = db.prepare('SELECT COUNT(*) as count FROM todos').get();
    const planCount = db.prepare('SELECT COUNT(*) as count FROM plans').get();

    return {
      packages: packageCount.count,
      commits: commitCount.count,
      todos: todoCount.count,
      plans: planCount.count,
    };
  } finally {
    db.close();
  }
}

// CLI commands
if (require.main === module) {
  const command = process.argv[2];

  switch (command) {
    case 'init':
      initializeDatabase();
      console.log('✅ Database initialized');
      break;

    case 'reset':
      resetState();
      break;

    case 'stats':
      console.log(JSON.stringify(getStats(), null, 2));
      break;

    case 'state':
      console.log(JSON.stringify(getState(), null, 2));
      break;

    default:
      console.log('Usage: node state-manager.js [init|reset|stats|state]');
      process.exit(1);
  }
}

module.exports = {
  initializeDatabase,
  getDatabase,
  updateState,
  getState,
  resetState,
  getStats,
};
