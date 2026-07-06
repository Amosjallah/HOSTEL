#!/usr/bin/env node
// scripts/expireHolds.js
// Standalone cron script for hold expiry.
// Run via: node scripts/expireHolds.js
// Schedule: */5 * * * * node /path/to/scripts/expireHolds.js

import dotenv from 'dotenv';
dotenv.config({ path: '../backend/.env' });

import { expireHolds } from '../backend/src/services/holdExpiryService.js';

console.log('⏱ Running hold expiry check (standalone)...');
expireHolds()
  .then(count => {
    console.log(`✅ Done. ${count} hold(s) expired.`);
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
