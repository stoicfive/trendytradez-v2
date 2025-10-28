#!/usr/bin/env node
/**
 * Refresh GitHub Projects Status
 * Fetches latest status from GitHub Projects API and updates database
 */

require('dotenv').config();
const { graphql } = require('@octokit/graphql');
const { getDatabase } = require('./state-manager');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'stoicfive';
const GITHUB_REPO = process.env.GITHUB_REPO || 'trendytradez-v2';

if (!GITHUB_TOKEN) {
  console.error('GITHUB_TOKEN not set in .env');
  process.exit(1);
}

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${GITHUB_TOKEN}`,
  },
});

async function refreshProjectStatus() {
  console.log('Refreshing GitHub Projects status...\n');
  
  const db = getDatabase();
  
  try {
    // Get all projects from database
    const projects = db.prepare('SELECT DISTINCT project_id FROM github_project_items').all();
    
    for (const { project_id } of projects) {
      console.log(`Fetching items for project ${project_id}...`);
      
      // Query GitHub Projects API for items
      const { node } = await graphqlWithAuth(`
        query GetProjectItems($projectId: ID!) {
          node(id: $projectId) {
            ... on ProjectV2 {
              items(first: 100) {
                nodes {
                  id
                  content {
                    ... on Issue {
                      number
                    }
                  }
                  fieldValues(first: 10) {
                    nodes {
                      ... on ProjectV2ItemFieldSingleSelectValue {
                        name
                        field {
                          ... on ProjectV2SingleSelectField {
                            name
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `, {
        projectId: project_id,
      });
      
      if (!node || !node.items) continue;
      
      // Update each item's status
      for (const item of node.items.nodes) {
        if (!item.content) continue;
        
        const issueNumber = item.content.number;
        
        // Find status field
        const statusField = item.fieldValues.nodes.find(
          fv => fv.field && fv.field.name === 'Status'
        );
        
        const status = statusField ? statusField.name : 'To Do';
        
        // Update database
        db.prepare(`
          UPDATE github_project_items 
          SET status = ?, updated_at = CURRENT_TIMESTAMP
          WHERE project_id = ? AND issue_id = ?
        `).run(status, project_id, issueNumber);
        
        console.log(`  Issue #${issueNumber}: ${status}`);
      }
    }
    
    console.log('\nRefresh complete!');
  } catch (error) {
    console.error('Refresh failed:', error);
    if (error.errors) {
      console.error('GraphQL errors:', JSON.stringify(error.errors, null, 2));
    }
    process.exit(1);
  }
}

if (require.main === module) {
  refreshProjectStatus();
}

module.exports = { refreshProjectStatus };
