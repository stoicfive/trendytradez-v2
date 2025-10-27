/**
 * Tests for code analyzer
 */

const { describe, it, expect } = require('vitest');
const {
  analyzePackages,
  analyzeCommits,
  analyzeTestCoverage,
  analyzeTodos,
  analyzeImplementationPlans,
  analyzeProject,
} = require('../analyzer');

describe('Code Analyzer', () => {
  it('should analyze packages', async () => {
    const packages = await analyzePackages();
    
    expect(packages).toBeInstanceOf(Array);
    expect(packages.length).toBeGreaterThan(0);
    
    // Check package structure
    const pkg = packages[0];
    expect(pkg).toHaveProperty('name');
    expect(pkg).toHaveProperty('description');
    expect(pkg).toHaveProperty('status');
    expect(['complete', 'in-progress', 'pending']).toContain(pkg.status);
  });

  it('should analyze git commits', () => {
    const commits = analyzeCommits(5);
    
    expect(commits).toBeInstanceOf(Array);
    expect(commits.length).toBeGreaterThan(0);
    expect(commits.length).toBeLessThanOrEqual(5);
    
    // Check commit structure
    const commit = commits[0];
    expect(commit).toHaveProperty('hash');
    expect(commit).toHaveProperty('message');
    expect(commit).toHaveProperty('date');
  });

  it('should analyze test coverage', async () => {
    const coverage = await analyzeTestCoverage();
    
    expect(coverage).toHaveProperty('totalTests');
    expect(coverage).toHaveProperty('packagesWithTests');
    expect(coverage).toHaveProperty('totalPackages');
    expect(coverage).toHaveProperty('coverage');
    
    expect(coverage.coverage).toBeGreaterThanOrEqual(0);
    expect(coverage.coverage).toBeLessThanOrEqual(100);
  });

  it('should analyze TODOs', async () => {
    const todos = await analyzeTodos();
    
    expect(todos).toBeInstanceOf(Array);
    
    // If there are TODOs, check structure
    if (todos.length > 0) {
      const todo = todos[0];
      expect(todo).toHaveProperty('type');
      expect(todo).toHaveProperty('message');
      expect(todo).toHaveProperty('file');
      expect(todo).toHaveProperty('line');
      expect(['TODO', 'FIXME']).toContain(todo.type);
    }
  });

  it('should analyze implementation plans', async () => {
    const plans = await analyzeImplementationPlans();
    
    expect(plans).toBeInstanceOf(Array);
    expect(plans.length).toBeGreaterThan(0);
    
    // Check plan structure
    const plan = plans[0];
    expect(plan).toHaveProperty('name');
    expect(plan).toHaveProperty('file');
    expect(plan).toHaveProperty('progress');
    expect(plan.progress).toBeGreaterThanOrEqual(0);
    expect(plan.progress).toBeLessThanOrEqual(100);
  });

  it('should analyze entire project', async () => {
    const analysis = await analyzeProject();
    
    expect(analysis).toHaveProperty('timestamp');
    expect(analysis).toHaveProperty('packages');
    expect(analysis).toHaveProperty('commits');
    expect(analysis).toHaveProperty('coverage');
    expect(analysis).toHaveProperty('todos');
    expect(analysis).toHaveProperty('plans');
    expect(analysis).toHaveProperty('stats');
    
    // Check stats
    expect(analysis.stats).toHaveProperty('totalPackages');
    expect(analysis.stats).toHaveProperty('completePackages');
    expect(analysis.stats).toHaveProperty('inProgressPackages');
    expect(analysis.stats).toHaveProperty('pendingPackages');
    
    // Verify totals add up
    const { completePackages, inProgressPackages, pendingPackages, totalPackages } = analysis.stats;
    expect(completePackages + inProgressPackages + pendingPackages).toBe(totalPackages);
  });
});
