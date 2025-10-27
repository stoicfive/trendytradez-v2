#!/usr/bin/env node
/**
 * Validate dashboard data against schema
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Load schema and data
const schemaPath = path.join(__dirname, '../dashboard/data/schema.json');
const dataPath = path.join(__dirname, '../dashboard/data/project-status.json');

try {
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  // Validate
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    console.error('❌ Dashboard data validation failed:');
    console.error(JSON.stringify(validate.errors, null, 2));
    process.exit(1);
  }

  // Additional custom validations
  const errors = [];

  // Check percentages match calculations
  if (data.stats.initiativesComplete) {
    const initPercentage = Math.round((data.stats.initiativesComplete.current / data.stats.initiativesComplete.total) * 100);
    if (initPercentage !== data.stats.initiativesComplete.percentage) {
      errors.push(`Initiatives percentage mismatch: expected ${initPercentage}, got ${data.stats.initiativesComplete.percentage}`);
    }
  }

  if (data.stats.epicsComplete) {
    const epicsPercentage = Math.round((data.stats.epicsComplete.current / data.stats.epicsComplete.total) * 100);
    if (epicsPercentage !== data.stats.epicsComplete.percentage) {
      errors.push(`Epics percentage mismatch: expected ${epicsPercentage}, got ${data.stats.epicsComplete.percentage}`);
    }
  }

  const packagesPercentage = Math.round((data.stats.packagesCreated.current / data.stats.packagesCreated.total) * 100);
  if (packagesPercentage !== data.stats.packagesCreated.percentage) {
    errors.push(`Packages percentage mismatch: expected ${packagesPercentage}, got ${data.stats.packagesCreated.percentage}`);
  }

  // Check package count matches stats
  const completePackages = data.packages.filter(p => p.status === 'complete').length;
  if (completePackages !== data.stats.packagesCreated.current) {
    errors.push(`Package count mismatch: ${completePackages} complete packages, but stats show ${data.stats.packagesCreated.current}`);
  }

  if (errors.length > 0) {
    console.error('❌ Dashboard data validation failed:');
    errors.forEach(err => console.error(`  - ${err}`));
    process.exit(1);
  }

  console.log('✅ Dashboard data is valid!');
  console.log(`   - ${data.packages.length} packages`);
  console.log(`   - ${data.recentCommits.length} recent commits`);
  console.log(`   - Last updated: ${data.meta.lastUpdated}`);

} catch (error) {
  console.error('❌ Error validating dashboard:', error.message);
  process.exit(1);
}
