#!/usr/bin/env node
/**
 * WebSocket & REST API Server for Automated Dashboard
 * Broadcasts real-time updates to connected clients
 */

const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const cors = require('cors');
const { getState, getStats } = require('./state-manager');

const PORT = process.env.PORT || 3001;
const WS_PORT = process.env.WS_PORT || 3002;

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// REST API endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/state', (req, res) => {
  try {
    const state = getState();
    res.json(state);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const stats = getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/packages', (req, res) => {
  try {
    const state = getState();
    res.json(state.packages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/commits', (req, res) => {
  try {
    const state = getState();
    res.json(state.commits);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/todos', (req, res) => {
  try {
    const state = getState();
    res.json(state.todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/plans', (req, res) => {
  try {
    const state = getState();
    res.json(state.plans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/sync', async (req, res) => {
  try {
    console.log('Starting GitHub sync...');
    const { refreshProjectStatus } = require('./refresh-project-status');
    const { syncGitHubStatus } = require('./sync-github-status');
    const { broadcastUpdate } = require('./server');
    
    await refreshProjectStatus();
    await syncGitHubStatus();
    
    const state = getState();
    broadcastUpdate(state);
    
    console.log('Sync completed successfully');
    res.json({ success: true, message: 'All changes are up to date' });
  } catch (error) {
    console.error('Sync failed:', error);
    res.status(500).json({ 
      success: false, 
      error: `Sync failed: ${error.message}` 
    });
  }
});

// Create HTTP server
const server = http.createServer(app);

// WebSocket server (only created when module is run directly)
let wss;
let clients = new Set();

function initializeWebSocket() {
  if (wss) return wss;
  
  wss = new WebSocketServer({ port: WS_PORT });
  clients = new Set();
  
  wss.on('connection', (ws) => {
    console.log('📱 Client connected');
    clients.add(ws);

    // Send initial state
    try {
      const state = getState();
      ws.send(JSON.stringify({ type: 'initial', data: state }));
    } catch (error) {
      console.error('Error sending initial state:', error);
    }

    ws.on('close', () => {
      console.log('📱 Client disconnected');
      clients.delete(ws);
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clients.delete(ws);
    });
  });
  
  return wss;
}

/**
 * Broadcast state update to all connected clients
 */
function broadcastUpdate(data) {
  const message = JSON.stringify({ type: 'update', data, timestamp: new Date().toISOString() });
  
  clients.forEach((client) => {
    if (client.readyState === 1) { // OPEN
      try {
        client.send(message);
      } catch (error) {
        console.error('Error broadcasting to client:', error);
      }
    }
  });

  console.log(`📡 Broadcasted update to ${clients.size} client(s)`);
}

/**
 * Start server
 */
function startServer() {
  // Initialize WebSocket
  initializeWebSocket();
  
  server.listen(PORT, () => {
    console.log(`🚀 REST API server running on http://localhost:${PORT}`);
    console.log(`🔌 WebSocket server running on ws://localhost:${WS_PORT}`);
    console.log('\nAPI Endpoints:');
    console.log(`  GET http://localhost:${PORT}/api/health`);
    console.log(`  GET http://localhost:${PORT}/api/state`);
    console.log(`  GET http://localhost:${PORT}/api/stats`);
    console.log(`  GET http://localhost:${PORT}/api/packages`);
    console.log(`  GET http://localhost:${PORT}/api/commits`);
    console.log(`  GET http://localhost:${PORT}/api/todos`);
    console.log(`  GET http://localhost:${PORT}/api/plans`);
    console.log('\nPress Ctrl+C to stop\n');
  });

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down servers...');
    
    if (wss) {
      wss.clients.forEach((client) => {
        client.close();
      });
      
      wss.close(() => {
        console.log('✅ WebSocket server closed');
      });
    }

    server.close(() => {
      console.log('✅ REST API server closed');
      process.exit(0);
    });
  });
}

// Run if called directly
if (require.main === module) {
  startServer();
}

module.exports = { startServer, broadcastUpdate };
