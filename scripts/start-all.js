#!/usr/bin/env node
/**
 * Start all dashboard services
 * Runs server and engine together
 */

const { spawn } = require('child_process');
const path = require('path');

const services = [];

function startService(name, script) {
  console.log(`🚀 Starting ${name}...`);
  
  const service = spawn('node', [path.join(__dirname, script)], {
    stdio: 'inherit',
  });

  service.on('error', (error) => {
    console.error(`❌ ${name} error:`, error);
  });

  service.on('exit', (code) => {
    console.log(`🛑 ${name} exited with code ${code}`);
  });

  services.push({ name, process: service });
  return service;
}

function startAll() {
  console.log('🚀 Starting Automated Dashboard System\n');
  
  // Start server first
  startService('Server', 'server.js');
  
  // Wait a bit then start engine
  setTimeout(() => {
    startService('Engine', 'dashboard-engine.js');
  }, 1000);

  // Graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n\n🛑 Shutting down all services...');
    
    services.forEach(({ name, process }) => {
      console.log(`Stopping ${name}...`);
      process.kill('SIGINT');
    });

    setTimeout(() => {
      console.log('✅ All services stopped');
      process.exit(0);
    }, 2000);
  });
}

if (require.main === module) {
  startAll();
}

module.exports = { startAll };
