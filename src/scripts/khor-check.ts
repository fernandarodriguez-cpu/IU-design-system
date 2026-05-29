#!/usr/bin/env node

/**
 * khor-check.ts
 * A static analysis tool to enforce Khor Design System governance.
 * Scans components and user code to ensure compliance with token usage,
 * deprecations, and accessibility rules.
 */

import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve(process.cwd(), 'src/app');

const rules = [
  {
    id: 'primitive-token-usage',
    regex: /--khor-(slate|blue|red|green|yellow|gray|neutral|primary|secondary)-[0-9]{3}/g,
    message: 'Using primitive color token directly. Use a semantic token (e.g., --khor-surface-*) or khorTokens.colors.brand instead.',
    severity: 'warning'
  },
  {
    id: 'hardcoded-color',
    regex: /#[0-9a-fA-F]{3,6}|rgb\([^)]+\)|rgba\([^)]+\)/g,
    message: 'Found hardcoded color. Use khorTokens.colors or semantic tokens instead.',
    severity: 'warning'
  },
  {
    id: 'hardcoded-pixel-spacing',
    regex: /(padding|margin|gap):\s*['"]?[0-9]+px['"]?/g,
    message: 'Found hardcoded pixel spacing. Use khorTokens.spacing or var(--khor-space-*) instead.',
    severity: 'warning'
  },
  {
    id: 'hardcoded-radius',
    regex: /borderRadius:\s*['"]?[0-9]+px['"]?/g,
    message: 'Found hardcoded border radius. Use khorTokens.radius or var(--khor-radius-*) instead.',
    severity: 'warning'
  },
  {
    id: 'missing-aria-label',
    regex: /<button[^>]*>(?!.*aria-label)(?!.*>.*<\/button>)/g,
    message: 'Button element without aria-label or text content found.',
    severity: 'info'
  }
];

let totalIssues = 0;
let filesScanned = 0;

function scanFile(filePath: string) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    filesScanned++;
    const content = fs.readFileSync(filePath, 'utf8');
    
    rules.forEach(rule => {
      let match;
      while ((match = rule.regex.exec(content)) !== null) {
        // Simple logic to skip matches inside comments could be added here
        const line = content.substring(0, match.index).split('\n').length;
        console.log(`[${rule.severity.toUpperCase()}] ${path.relative(process.cwd(), filePath)}:${line} - ${rule.message} -> Found: ${match[0].substring(0, 50)}...`);
        totalIssues++;
      }
    });
  }
}

function walkDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        walkDir(fullPath);
      }
    } else {
      scanFile(fullPath);
    }
  }
}

console.log('🚀 Running Khor System Health Check...\n');
walkDir(SRC_DIR);

console.log('\n======================================');
console.log(`✅ Scanned ${filesScanned} files.`);
console.log(`⚠️ Found ${totalIssues} potential issues.`);
console.log('======================================\n');

if (totalIssues > 0) {
  console.log('💡 Tip: Run `npx eslint --fix` to auto-resolve some of these issues or consult the Khor AI Guide.');
} else {
  console.log('🎉 100/100! Your codebase is perfectly aligned with Khor Design System.');
}

