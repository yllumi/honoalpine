#!/usr/bin/env bun

import { makePage } from './commands/make-page';

const args = process.argv.slice(2);
const command = args[0];
const name = args[1];

switch (command) {
  case 'page':
  case 'make:page':
    if (!name) {
      console.error('❌ Error: Page name is required');
      console.log('Usage: bun heroic page <name> [options]');
      console.log('Options:');
      console.log('  -s, --with-script    Generate script.js file');
      process.exit(1);
    }
    // Check for --with-script or -s flag
    const withScript = args.includes('-s') || args.includes('--with-script');
    await makePage(name, { withScript });
    break;
    
  case 'help':
  case '--help':
  case '-h':
    console.log(`
Heroic CLI - Code Generator

Usage:
  bun heroic <command> [arguments]

Available commands:
  page <name> [options]   Generate a new page with controller and template
  help                    Show this help message

Options:
  -s, --with-script       Generate script.js file

Examples:
  bun heroic page contact
  bun heroic page about -s
  bun heroic page profile --with-script
    `);
    break;
    
  default:
    console.error(`❌ Unknown command: ${command}`);
    console.log('Run "bun heroic help" for available commands');
    process.exit(1);
}
