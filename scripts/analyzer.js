#!/usr/bin/env node
/**
 * Code Analyzer for Automated Dashboard
 * Extracts project data from codebase
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const { execSync } = require('child_process');

/**
 * Analyze all packages in the monorepo
 */
async function analyzePackages() {
  const packages = [];
  
  // Find all package.json files
  const packageFiles = await glob('packages/*/package.json', {
    ignore: ['**/node_modules/**'],
  });

  for (const file of packageFiles) {
    try {
      const content = JSON.parse(fs.readFileSync(file, 'utf8'));
      const dir = path.dirname(file);
      
      // Determine status based on various factors
      const status = await determinePackageStatus(dir, content);
      
      packages.push({
        name: content.name,
        description: content.description || 'No description',
        version: content.version,
        path: dir,
        status,
        dependencies: Object.keys(content.dependencies || {}),
        devDependencies: Object.keys(content.devDependencies || {}),
      });
    } catch (error) {
      console.error(`Error analyzing ${file}:`, error.message);
    }
  }

  return packages;
}

/**
 * Determine package status based on tests, TODOs, and build status
 */
async function determinePackageStatus(packageDir, packageJson) {
  let score = 0;
  const checks = [];

  // Check 1: Has dist/ folder (built)
  if (fs.existsSync(path.join(packageDir, 'dist'))) {
    score += 25;
    checks.push('built');
  }

  // Check 2: Has tests
  const testFiles = await glob(`${packageDir}/**/*.test.{ts,tsx,js,jsx}`, {
    ignore: ['**/node_modules/**'],
  });
  if (testFiles.length > 0) {
    score += 25;
    checks.push('has-tests');
  }

  // Check 3: No TODO/FIXME comments
  const sourceFiles = await glob(`${packageDir}/src/**/*.{ts,tsx,js,jsx}`, {
    ignore: ['**/node_modules/**'],
  });
  
  let hasTodos = false;
  for (const file of sourceFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (/TODO|FIXME/i.test(content)) {
      hasTodos = true;
      break;
    }
  }
  
  if (!hasTodos && sourceFiles.length > 0) {
    score += 25;
    checks.push('no-todos');
  }

  // Check 4: Has README
  if (fs.existsSync(path.join(packageDir, 'README.md'))) {
    score += 25;
    checks.push('documented');
  }

  // Determine status
  if (score >= 75) return 'complete';
  if (score >= 50) return 'in-progress';
  return 'pending';
}

/**
 * Analyze git commits
 */
function analyzeCommits(limit = 10) {
  try {
    const output = execSync(
      `git log --oneline -${limit} --format="%h|%s|%cd" --date=format:"%b %d, %Y"`,
      { encoding: 'utf8' }
    );

    return output
      .trim()
      .split('\n')
      .map(line => {
        const [hash, ...rest] = line.split('|');
        const date = rest.pop();
        const message = rest.join('|');
        return { hash, message, date };
      });
  } catch (error) {
    console.error('Error analyzing commits:', error.message);
    return [];
  }
}

/**
 * Calculate test coverage
 */
async function analyzeTestCoverage() {
  const packages = await glob('packages/*/package.json', {
    ignore: ['**/node_modules/**'],
  });

  let totalTests = 0;
  let packagesWithTests = 0;

  for (const pkgFile of packages) {
    const dir = path.dirname(pkgFile);
    const testFiles = await glob(`${dir}/**/*.test.{ts,tsx,js,jsx}`, {
      ignore: ['**/node_modules/**'],
    });

    if (testFiles.length > 0) {
      packagesWithTests++;
      totalTests += testFiles.length;
    }
  }

  return {
    totalTests,
    packagesWithTests,
    totalPackages: packages.length,
    coverage: packages.length > 0 
      ? Math.round((packagesWithTests / packages.length) * 100)
      : 0,
  };
}

/**
 * Find all TODOs and FIXMEs in codebase
 */
async function analyzeTodos() {
  const sourceFiles = await glob('packages/*/src/**/*.{ts,tsx,js,jsx}', {
    ignore: ['**/node_modules/**'],
  });

  const todos = [];

  for (const file of sourceFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const match = line.match(/(TODO|FIXME):\s*(.+)/i);
      if (match) {
        todos.push({
          type: match[1].toUpperCase(),
          message: match[2].trim(),
          file: path.relative(process.cwd(), file),
          line: index + 1,
        });
      }
    });
  }

  return todos;
}

/**
 * Read implementation plans
 */
async function analyzeImplementationPlans() {
  const planFiles = await glob('implementation/plans/PLAN_*.md');
  const plans = [];

  for (const file of planFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const name = path.basename(file, '.md').replace('PLAN_', '');
    
    // Simple status detection based on checkboxes
    const checkboxes = content.match(/- \[(x| )\]/gi) || [];
    const completed = checkboxes.filter(cb => cb.includes('x')).length;
    const total = checkboxes.length;

    plans.push({
      name,
      file: path.relative(process.cwd(), file),
      progress: total > 0 ? Math.round((completed / total) * 100) : 0,
      completed,
      total,
    });
  }

  return plans;
}

/**
 * Analyze entire project
 */
async function analyzeProject() {
  console.log('🔍 Analyzing project...\n');

  const [packages, commits, coverage, todos, plans] = await Promise.all([
    analyzePackages(),
    Promise.resolve(analyzeCommits()),
    analyzeTestCoverage(),
    analyzeTodos(),
    analyzeImplementationPlans(),
  ]);

  const analysis = {
    timestamp: new Date().toISOString(),
    packages,
    commits,
    coverage,
    todos,
    plans,
    stats: {
      totalPackages: packages.length,
      completePackages: packages.filter(p => p.status === 'complete').length,
      inProgressPackages: packages.filter(p => p.status === 'in-progress').length,
      pendingPackages: packages.filter(p => p.status === 'pending').length,
    },
  };

  console.log('✅ Analysis complete\n');
  console.log(`Packages: ${analysis.stats.completePackages}/${analysis.stats.totalPackages} complete`);
  console.log(`Test Coverage: ${coverage.coverage}%`);
  console.log(`TODOs: ${todos.length}`);
  console.log(`Plans: ${plans.length}\n`);

  return analysis;
}

// Run if called directly
if (require.main === module) {
  analyzeProject()
    .then(analysis => {
      // Output as JSON for piping
      if (process.argv.includes('--json')) {
        console.log(JSON.stringify(analysis, null, 2));
      }
    })
    .catch(error => {
      console.error('❌ Analysis failed:', error);
      process.exit(1);
    });
}

module.exports = {
  analyzePackages,
  analyzeCommits,
  analyzeTestCoverage,
  analyzeTodos,
  analyzeImplementationPlans,
  analyzeProject,
};
