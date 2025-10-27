/**
 * GitHub Database Extensions
 * Adds GitHub mapping tables to existing database
 */

const { getDatabase } = require('./state-manager');

/**
 * Initialize GitHub tables
 */
function initializeGitHubTables() {
  const db = getDatabase();
  
  try {
    db.exec(`
      CREATE TABLE IF NOT EXISTS github_mappings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        local_type TEXT NOT NULL,
        local_id TEXT NOT NULL,
        github_type TEXT NOT NULL,
        github_id TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(local_type, local_id)
      );

      CREATE TABLE IF NOT EXISTS github_sync_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id TEXT NOT NULL,
        direction TEXT NOT NULL,
        status TEXT NOT NULL,
        error TEXT,
        timestamp TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS github_webhooks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_type TEXT NOT NULL,
        payload TEXT NOT NULL,
        processed BOOLEAN DEFAULT 0,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_mappings_local ON github_mappings(local_type, local_id);
      CREATE INDEX IF NOT EXISTS idx_mappings_github ON github_mappings(github_type, github_id);
      CREATE INDEX IF NOT EXISTS idx_sync_log_timestamp ON github_sync_log(timestamp);
      CREATE INDEX IF NOT EXISTS idx_webhooks_processed ON github_webhooks(processed);
    `);

    console.log('✅ GitHub tables initialized');
  } catch (error) {
    console.error('Error initializing GitHub tables:', error);
    throw error;
  } finally {
    db.close();
  }
}

/**
 * Store GitHub mapping
 */
function storeMapping(localType, localId, githubType, githubId) {
  const db = getDatabase();
  
  try {
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO github_mappings (local_type, local_id, github_type, github_id, updated_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `);

    stmt.run(localType, localId.toString(), githubType, githubId.toString());
    console.log(`✅ Stored mapping: ${localType}:${localId} → ${githubType}:${githubId}`);
  } finally {
    db.close();
  }
}

/**
 * Get GitHub ID from local entity
 */
function getGitHubId(localType, localId) {
  const db = getDatabase();
  
  try {
    const stmt = db.prepare(`
      SELECT github_id, github_type FROM github_mappings
      WHERE local_type = ? AND local_id = ?
    `);

    return stmt.get(localType, localId.toString());
  } finally {
    db.close();
  }
}

/**
 * Get local ID from GitHub entity
 */
function getLocalId(githubType, githubId) {
  const db = getDatabase();
  
  try {
    const stmt = db.prepare(`
      SELECT local_id, local_type FROM github_mappings
      WHERE github_type = ? AND github_id = ?
    `);

    return stmt.get(githubType, githubId.toString());
  } finally {
    db.close();
  }
}

/**
 * Log sync operation
 */
function logSync(action, entityType, entityId, direction, status, error = null) {
  const db = getDatabase();
  
  try {
    const stmt = db.prepare(`
      INSERT INTO github_sync_log (action, entity_type, entity_id, direction, status, error)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(action, entityType, entityId.toString(), direction, status, error);
  } finally {
    db.close();
  }
}

/**
 * Get sync statistics
 */
function getSyncStats() {
  const db = getDatabase();
  
  try {
    const total = db.prepare('SELECT COUNT(*) as count FROM github_sync_log').get();
    const successful = db.prepare('SELECT COUNT(*) as count FROM github_sync_log WHERE status = ?').get('success');
    const failed = db.prepare('SELECT COUNT(*) as count FROM github_sync_log WHERE status = ?').get('failed');
    const lastSync = db.prepare('SELECT timestamp FROM github_sync_log ORDER BY timestamp DESC LIMIT 1').get();

    return {
      totalSyncs: total.count,
      successfulSyncs: successful.count,
      failedSyncs: failed.count,
      lastSync: lastSync ? lastSync.timestamp : null,
    };
  } finally {
    db.close();
  }
}

/**
 * Get all mappings
 */
function getAllMappings() {
  const db = getDatabase();
  
  try {
    return db.prepare('SELECT * FROM github_mappings ORDER BY created_at DESC').all();
  } finally {
    db.close();
  }
}

// CLI commands
if (require.main === module) {
  const command = process.argv[2];

  switch (command) {
    case 'init':
      initializeGitHubTables();
      break;

    case 'stats':
      console.log(JSON.stringify(getSyncStats(), null, 2));
      break;

    case 'mappings':
      console.log(JSON.stringify(getAllMappings(), null, 2));
      break;

    default:
      console.log('Usage: node github-db.js [init|stats|mappings]');
      process.exit(1);
  }
}

module.exports = {
  initializeGitHubTables,
  storeMapping,
  getGitHubId,
  getLocalId,
  logSync,
  getSyncStats,
  getAllMappings,
};
