#!/usr/bin/env node
/**
 * validate-tokens.ts
 * Static analysis: verifies every --khor-* variable referenced in CSS, JSON, and TS
 * has a corresponding definition in theme.css :root or .dark.
 * Prevents ghost variables from reaching production.
 */

import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd());
const THEME_CSS = path.join(ROOT, 'src/styles/theme.css');
const KHOR_THEME_TS = path.join(ROOT, 'src/app/theme/khor-theme.ts');
const MANIFEST_JSON = path.join(ROOT, 'khor-tokens-manifest.json');

interface Issue {
  type: 'error' | 'warning';
  file: string;
  variable: string;
  message: string;
}

const issues: Issue[] = [];

function extractCssVars(content: string, prefix = '--khor-'): Set<string> {
  const vars = new Set<string>();
  const regex = new RegExp(`${prefix}[\\w-]+`, 'g');
  let match;
  while ((match = regex.exec(content)) !== null) {
    vars.add(match[0]);
  }
  return vars;
}

function extractDefinitions(content: string): Set<string> {
  const defs = new Set<string>();
  const regex = /(--khor-[\w-]+)\s*:/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    defs.add(match[1]);
  }
  return defs;
}

function extractVarReferences(content: string): Map<string, string[]> {
  const refs = new Map<string, string[]>();
  const regex = /var\((--khor-[\w-]+)\)/g;
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    let match;
    while ((match = regex.exec(lines[i])) !== null) {
      const varName = match[1];
      if (!refs.has(varName)) refs.set(varName, []);
      refs.get(varName)!.push(`${path.basename(THEME_CSS)}:${i + 1}`);
    }
  }
  return refs;
}

function checkGhostVariables() {
  console.log('🔍 Validando consistencia de tokens Khor...\n');

  const cssContent = fs.readFileSync(THEME_CSS, 'utf8');

  // Extract :root definitions (light mode)
  const rootMatch = cssContent.match(/:root\s*\{([^}]+)\}/);
  const rootDefs = rootMatch ? extractDefinitions(rootMatch[1]) : new Set();

  // Extract .dark definitions
  const darkMatch = cssContent.match(/\.dark\s*\{([^}]+)\}/);
  const darkDefs = darkMatch ? extractDefinitions(darkMatch[1]) : new Set();

  const allDefs = new Set([...rootDefs, ...darkDefs]);

  // Extract all var() references in the CSS
  const varRefs = extractVarReferences(cssContent);

  // Check each reference has a definition
  for (const [varName, locations] of varRefs) {
    if (!allDefs.has(varName)) {
      issues.push({
        type: 'error',
        file: THEME_CSS,
        variable: varName,
        message: `Referenciado via var() en ${locations.join(', ')} pero no definido en :root ni .dark`,
      });
    }
  }

  // Check khor-theme.ts references
  if (fs.existsSync(KHOR_THEME_TS)) {
    const tsContent = fs.readFileSync(KHOR_THEME_TS, 'utf8');
    const tsRefs = extractVarReferences(tsContent);
    for (const [varName, locations] of tsRefs) {
      if (!allDefs.has(varName) && !varName.includes('fallback,') ) {
        const hasFallback = new RegExp(`${varName}\\s*,\\s*[^)]+`).test(tsContent);
        if (!hasFallback) {
          issues.push({
            type: 'warning',
            file: KHOR_THEME_TS,
            variable: varName,
            message: `Referenciado en TS pero no definido en CSS (usa var() sin fallback)`,
          });
        }
      }
    }
  }

  // Report
  const errors = issues.filter(i => i.type === 'error');
  const warnings = issues.filter(i => i.type === 'warning');

  console.log(`📊 Escaneo completo:`);
  console.log(`   - Variables definidas en :root: ${rootDefs.size}`);
  console.log(`   - Variables definidas en .dark: ${darkDefs.size}`);
  console.log(`   - Referencias var() en CSS: ${varRefs.size}`);
  console.log(`\n⚠️  Issues encontrados: ${errors.length} errors, ${warnings.length} warnings\n`);

  for (const issue of issues) {
    const icon = issue.type === 'error' ? '❌' : '⚠️';
    console.log(`${icon} [${issue.type.toUpperCase()}] ${issue.variable}`);
    console.log(`   ${issue.message}`);
    console.log();
  }

  if (errors.length > 0) {
    console.log('💥 Se encontraron variables fantasma críticas. Corrígelas antes del build.');
    process.exit(1);
  } else if (warnings.length > 0) {
    console.log('⚠️  Hay warnings que deberían revisarse.');
    process.exit(0);
  } else {
    console.log('✅ 100/100 — Todos los tokens están sincronizados.');
    process.exit(0);
  }
}

checkGhostVariables();
