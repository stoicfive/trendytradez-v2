#!/usr/bin/env node
/**
 * GitHub Service - API wrapper for GitHub integration
 * Handles authentication and API calls
 */

require('dotenv').config();
const { Octokit } = require('@octokit/rest');

class GitHubService {
  constructor() {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
      userAgent: 'automated-dashboard v1.0.0',
    });

    this.owner = process.env.GITHUB_OWNER;
    this.repo = process.env.GITHUB_REPO;
    
    if (!process.env.GITHUB_TOKEN) {
      console.warn('⚠️  GITHUB_TOKEN not set. GitHub integration disabled.');
    }
  }

  /**
   * Test GitHub connection
   */
  async testConnection() {
    try {
      const { data } = await this.octokit.users.getAuthenticated();
      console.log(`✅ Connected to GitHub as: ${data.login}`);
      return { success: true, user: data.login };
    } catch (error) {
      console.error('❌ GitHub connection failed:', error.message);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get rate limit status
   */
  async getRateLimit() {
    try {
      const { data } = await this.octokit.rateLimit.get();
      return {
        limit: data.rate.limit,
        remaining: data.rate.remaining,
        reset: new Date(data.rate.reset * 1000),
      };
    } catch (error) {
      console.error('Error getting rate limit:', error.message);
      return null;
    }
  }

  /**
   * Create GitHub issue
   */
  async createIssue({ title, body, labels = [], milestone = null }) {
    try {
      const { data } = await this.octokit.issues.create({
        owner: this.owner,
        repo: this.repo,
        title,
        body,
        labels,
        milestone,
      });

      console.log(`✅ Created issue #${data.number}: ${title}`);
      return data;
    } catch (error) {
      console.error('Error creating issue:', error.message);
      throw error;
    }
  }

  /**
   * Update GitHub issue
   */
  async updateIssue(issueNumber, { title, body, state, labels }) {
    try {
      const { data } = await this.octokit.issues.update({
        owner: this.owner,
        repo: this.repo,
        issue_number: issueNumber,
        title,
        body,
        state,
        labels,
      });

      console.log(`✅ Updated issue #${issueNumber}`);
      return data;
    } catch (error) {
      console.error(`Error updating issue #${issueNumber}:`, error.message);
      throw error;
    }
  }

  /**
   * Close GitHub issue
   */
  async closeIssue(issueNumber) {
    return this.updateIssue(issueNumber, { state: 'closed' });
  }

  /**
   * Create GitHub milestone
   */
  async createMilestone({ title, description, dueOn = null }) {
    try {
      const params = {
        owner: this.owner,
        repo: this.repo,
        title,
        description,
      };
      
      // Only add due_on if it's provided
      if (dueOn) {
        params.due_on = dueOn;
      }
      
      const { data } = await this.octokit.issues.createMilestone(params);

      console.log(`✅ Created milestone: ${title}`);
      return data;
    } catch (error) {
      console.error('Error creating milestone:', error.message);
      throw error;
    }
  }

  /**
   * Create GitHub release
   */
  async createRelease({ tagName, name, body, draft = false, prerelease = false }) {
    try {
      const { data } = await this.octokit.repos.createRelease({
        owner: this.owner,
        repo: this.repo,
        tag_name: tagName,
        name,
        body,
        draft,
        prerelease,
      });

      console.log(`✅ Created release: ${name}`);
      return data;
    } catch (error) {
      console.error('Error creating release:', error.message);
      throw error;
    }
  }

  /**
   * Get repository issues
   */
  async getIssues({ state = 'open', labels = null, milestone = null } = {}) {
    try {
      const { data } = await this.octokit.issues.listForRepo({
        owner: this.owner,
        repo: this.repo,
        state,
        labels,
        milestone,
      });

      return data;
    } catch (error) {
      console.error('Error getting issues:', error.message);
      throw error;
    }
  }

  /**
   * Get repository milestones
   */
  async getMilestones({ state = 'open' } = {}) {
    try {
      const { data } = await this.octokit.issues.listMilestones({
        owner: this.owner,
        repo: this.repo,
        state,
      });

      return data;
    } catch (error) {
      console.error('Error getting milestones:', error.message);
      throw error;
    }
  }

  /**
   * Add label to issue
   */
  async addLabels(issueNumber, labels) {
    try {
      await this.octokit.issues.addLabels({
        owner: this.owner,
        repo: this.repo,
        issue_number: issueNumber,
        labels,
      });

      console.log(`✅ Added labels to issue #${issueNumber}`);
    } catch (error) {
      console.error(`Error adding labels to issue #${issueNumber}:`, error.message);
  }
}

/**
 * Add label to issue
 */
async addLabels(issueNumber, labels) {
  try {
    await this.octokit.issues.addLabels({
      owner: this.owner,
      repo: this.repo,
      issue_number: issueNumber,
      labels,
    });

    console.log(`✅ Added labels to issue #${issueNumber}`);
  } catch (error) {
    console.error(`Error adding labels to issue #${issueNumber}:`, error.message);
    throw error;
  }
}

/**
 * Create or update issue comment
 */
async createComment(issueNumber, body) {
  try {
    const { data } = await this.octokit.issues.createComment({
      owner: this.owner,
      repo: this.repo,
      issue_number: issueNumber,
      body,
    });

    return data;
  } catch (error) {
    console.error(`Error creating comment on issue #${issueNumber}:`, error.message);
    throw error;
  }
}

/**
 * Get issue (with node_id for Projects API)
 * 
 * Note: The response includes the node_id which can be used with the Projects API.
 */
async getIssue(issueNumber) {
  try {
    const { data } = await this.octokit.issues.get({
      owner: this.owner,
      repo: this.repo,
      issue_number: issueNumber,
    });

    return data;
  } catch (error) {
    console.error(`Error getting issue #${issueNumber}:`, error.message);
    throw error;
  }
}

}

// Singleton instance
let instance = null;

function getGitHubService() {
  if (!instance) {
    instance = new GitHubService();
  }
  return instance;
}

// CLI test
if (require.main === module) {
  const service = getGitHubService();
  
  service.testConnection().then(result => {
    if (result.success) {
      service.getRateLimit().then(rateLimit => {
        if (rateLimit) {
          console.log(`\nRate Limit: ${rateLimit.remaining}/${rateLimit.limit}`);
          console.log(`Resets at: ${rateLimit.reset}`);
        }
      });
    }
  });
}

module.exports = { GitHubService, getGitHubService };
