#!/usr/bin/env node
/**
 * Setup script for Project Management System
 * Initializes the system in a new project
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setup() {
  console.log('\n🚀 Project Management System Setup\n');
  console.log('This script will configure the dashboard for your project.\n');

  // Get project details
  const projectName = await question('Project name: ');
  const projectDesc = await question('Project description: ');
  const totalPackages = await question('Total number of packages/modules (default: 10): ') || '10';
  const totalPlans = await question('Total number of implementation plans (default: 5): ') || '5';
  const projectWeeks = await question('Estimated project duration in weeks (default: 8-10): ') || '8-10';

  console.log('\n📝 Configuring dashboard...\n');

  // Load template
  const templatePath = path.join(__dirname, '../templates/project-status.template.json');
  const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));

  // Update with project details
  template.meta.lastUpdated = new Date().toISOString();
  template.stats.packagesCreated.total = parseInt(totalPackages);
  template.stats.plansComplete.total = parseInt(totalPlans);
  template.stats.weeksTotal = projectWeeks;
  template.currentStatus[0].title = `${projectName} Setup`;
  template.currentStatus[0].description = projectDesc;

  // Save configuration
  const dataPath = path.join(__dirname, '../dashboard/data/project-status.json');
  fs.writeFileSync(dataPath, JSON.stringify(template, null, 2));

  console.log('✅ Dashboard data configured\n');

  // Update dashboard title
  const dashboardPath = path.join(__dirname, '../dashboard/index.html');
  let dashboardHtml = fs.readFileSync(dashboardPath, 'utf8');
  dashboardHtml = dashboardHtml.replace(
    /<title>.*?<\/title>/,
    `<title>${projectName} - Project Dashboard</title>`
  );
  dashboardHtml = dashboardHtml.replace(
    /TrendyTradez v2 - Project Dashboard/g,
    `${projectName} - Dashboard`
  );
  dashboardHtml = dashboardHtml.replace(
    /Next-generation trading dashboard platform/,
    projectDesc
  );
  fs.writeFileSync(dashboardPath, dashboardHtml);

  console.log('✅ Dashboard HTML updated\n');

  // Check if package.json exists
  const projectRoot = path.join(__dirname, '../..');
  const packageJsonPath = path.join(projectRoot, 'package.json');
  
  if (fs.existsSync(packageJsonPath)) {
    const addScripts = await question('Add dashboard scripts to package.json? (y/n): ');
    
    if (addScripts.toLowerCase() === 'y') {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // Add scripts
      packageJson.scripts = packageJson.scripts || {};
      packageJson.scripts['dashboard:dev'] = 'live-server project-management-system/dashboard/ --port=3000 --open=/index.html';
      packageJson.scripts['dashboard:validate'] = 'node project-management-system/scripts/validate-dashboard.js';
      packageJson.scripts['dashboard:update'] = 'node project-management-system/scripts/update-dashboard.js';
      
      // Add devDependencies
      packageJson.devDependencies = packageJson.devDependencies || {};
      packageJson.devDependencies['ajv'] = '^8.17.1';
      packageJson.devDependencies['ajv-formats'] = '^3.0.1';
      packageJson.devDependencies['husky'] = '^9.1.7';
      packageJson.devDependencies['live-server'] = '^1.2.2';
      
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('✅ package.json updated\n');
      
      const installDeps = await question('Install dependencies now? (y/n): ');
      if (installDeps.toLowerCase() === 'y') {
        console.log('\n📦 Installing dependencies...\n');
        try {
          execSync('pnpm install', { stdio: 'inherit', cwd: projectRoot });
          console.log('\n✅ Dependencies installed\n');
        } catch (error) {
          console.log('\n⚠️  Could not install with pnpm, try npm or yarn manually\n');
        }
      }
    }
  }

  // Setup git hooks
  if (fs.existsSync(path.join(projectRoot, '.git'))) {
    const setupHooks = await question('Setup pre-commit validation hook? (y/n): ');
    
    if (setupHooks.toLowerCase() === 'y') {
      try {
        execSync('npx husky install', { cwd: projectRoot });
        execSync('npx husky add .husky/pre-commit "node project-management-system/scripts/validate-dashboard.js"', { cwd: projectRoot });
        console.log('✅ Pre-commit hook configured\n');
      } catch (error) {
        console.log('⚠️  Could not setup git hooks automatically\n');
        console.log('   Run manually: npx husky install && npx husky add .husky/pre-commit "node project-management-system/scripts/validate-dashboard.js"\n');
      }
    }
  }

  console.log('🎉 Setup complete!\n');
  console.log('Next steps:');
  console.log('  1. Review dashboard/data/project-status.json');
  console.log('  2. Run: pnpm dashboard:dev (or npm/yarn)');
  console.log('  3. Read docs/CASCADE_WORKFLOW.md for Cascade AI instructions');
  console.log('  4. Read docs/USAGE.md for usage guide\n');

  rl.close();
}

setup().catch(error => {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
});
