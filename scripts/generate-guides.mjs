// Script to generate guide .md files by building the project and extracting data
import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outDir = join(root, 'dist-guides');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

// We need to start the vite dev server and use it to fetch the page content
// But that's complex. Instead, let's extract the data structures from built files.

// After building, the data is embedded in JS bundles as object literals.
// We can extract it by reading the source files directly using string parsing.

// Read source files
const atomsSrc = readFileSync(join(root, 'src/app/pages/AtomsPage.tsx'), 'utf-8');
const moleculesSrc = readFileSync(join(root, 'src/app/pages/MoleculesPage.tsx'), 'utf-8');
const organismsSrc = readFileSync(join(root, 'src/app/pages/OrganismsPage.tsx'), 'utf-8');
const themingSrc = readFileSync(join(root, 'src/app/theme/khor-theme.ts'), 'utf-8');

// Extract markdown data from atomsData/moleculesData/organismsData exports
// The data-only exports destructure preview/playground/stateShowcase away, so we get clean data

// Let's take a different approach - parse the component entries as JavaScript object literals
// Since they're complex objects with strings, arrays, etc. this is fragile.

// SIMPLEST APPROACH: Run the Vite build, then extract markdown from the built bundles
// by using the built JS which has the data inlined.

console.log('Building project...');
execSync('npm run build', { cwd: root, stdio: 'pipe' });

// The data is in the built chunks. Let's find the relevant chunk files
import { glob } from 'glob';
const distDir = join(root, 'dist');
const files = [
  ...glob.sync('assets/AtomsPage-*.js', { cwd: distDir }),
  ...glob.sync('assets/MoleculesPage-*.js', { cwd: distDir }),
  ...glob.sync('assets/OrganismsPage-*.js', { cwd: distDir }),
];

console.log('Built files found:', files);

// Instead of parsing bundles, use esbuild to compile just the data extraction
// We need atomsData, moleculesData, organismsData as plain JSON

// Actually, the simplest approach: the data-only exports are just object destructuring:
// export const atomsData = {};
// Object.keys(atoms).forEach(key => { const { preview, playground, stateShowcase, ...data } = atoms[key]; atomsData[key] = data; });
// Since atoms is defined in the same file, we can't easily separate them.

// LET'S USE A COMPLETELY DIFFERENT APPROACH:
// Start vite dev server, use http to fetch rendered content
// Or: use node to eval the pre-built JavaScript bundles

// The bundles are ES modules. We can load them and extract exports.
// Let's try loading the AtomsPage bundle to get at the data-only exports.

// Actually, the bundles are chunked by Vite. The atoms data isn't in a standalone chunk.
// Let's extract the plain text data we need by regex from source.

// Build the markdown manually from source data using regex parsing
// We'll extract: name, description, props, a11ySummary, guidelines, aiNotes, filename, code for each entry

function extractEntries(source, category) {
  // Find all component entries by matching patterns like:
  // `'entry-id': { ... },` or `entry-id: { ... },`
  const entries = [];
  
  // Find the `export const atoms/molecules/organisms = {` start and `};` end
  const exportMatch = source.match(new RegExp(`export const ${category}\\s*=\\s*\\{`));
  if (!exportMatch) return entries;
  
  const startIdx = exportMatch.index;
  let depth = 0;
  let endIdx = startIdx;
  for (let i = startIdx; i < source.length; i++) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}') {
      depth--;
      if (depth === 0) { endIdx = i + 1; break; }
    }
  }
  
  const objStr = source.slice(startIdx, endIdx);
  
  // Now extract individual entry objects
  // Match: `key: { ... },` or `'key': { ... },`
  const entryRegex = /['"]?([\w-]+)['"]?\s*:\s*\{([\s\S]*?)\n\s*\},?\n\s*(?:['"]?[\w-]+['"]?\s*:|\/\/|\/\*|export|$)/g;
  
  let match;
  while ((match = entryRegex.exec(objStr)) !== null) {
    const id = match[1];
    const body = match[2];
    
    // Extract properties
    const name = body.match(/name:\s*'([^']+)'/)?.[1] || '';
    const description = body.match(/description:\s*'([^']+)'/)?.[1] || '';
    
    // Props array
    const propsStr = body.match(/props:\s*\[([\s\S]*?)\]/)?.[1] || '';
    const props = [...propsStr.matchAll(/\{ name:\s*'([^']+)',\s*type:\s*'([^']+)',[^}]*description:\s*'([^']+)'/g)]
      .map(m => ({ name: m[1], type: m[2], description: m[3] }));
    
    // Guidelines
    const guidelinesStr = body.match(/guidelines:\s*\[([\s\S]*?)\]/)?.[1] || '';
    const guidelines = [...guidelinesStr.matchAll(/'([^']+)'/g)].map(m => m[1]);
    
    // aiNotes
    const aiNotes = body.match(/aiNotes:\s*'([^']+)'/)?.[1] || '';
    
    // a11ySummary
    const a11yStr = body.match(/a11ySummary:\s*\{([\s\S]*?)\n\s*\}/)?.[1] || '';
    const keyboard = [...(a11yStr.match(/keyboard:\s*\[([\s\S]*?)\]/)?.[1] || '').matchAll(/'([^']+)'/g)].map(m => m[1]);
    const aria = [...(a11yStr.match(/aria:\s*\[([\s\S]*?)\]/)?.[1] || '').matchAll(/'([^']+)'/g)].map(m => m[1]);
    const contrast = a11yStr.match(/contrast:\s*'([^']+)'/)?.[1] || '';
    const score = parseInt(a11yStr.match(/score:\s*(\d+)/)?.[1] || '0');
    
    // Code
    const code = body.match(/code:\s*`([\s\S]*)`/)?.[1] || '';
    
    // Filename
    const filename = body.match(/filename:\s*'([^']+)'/)?.[1] || '';
    
    entries.push({ id, name, description, props, guidelines, aiNotes, a11ySummary: { keyboard, aria, contrast, score }, code, filename });
  }
  
  return entries;
}

console.log('Extracting atoms data...');
const atoms = extractEntries(atomsSrc, 'atoms');
console.log(`Found ${atoms.length} atoms`);

console.log('Extracting molecules data...');
const molecules = extractEntries(moleculesSrc, 'molecules');
console.log(`Found ${molecules.length} molecules`);

console.log('Extracting organisms data...');
const organisms = extractEntries(organismsSrc, 'organisms');
console.log(`Found ${organisms.length} organisms`);

// Save extracted data as JSON
writeFileSync(join(outDir, 'extracted-data.json'), JSON.stringify({ atoms, molecules, organisms }, null, 2));

// Generate markdown guide
function generateGuide() {
  const lines = [];
  lines.push('# Khor Design System — Guía para IA');
  lines.push('');
  
  // Atoms section
  lines.push('## Átomos');
  lines.push('');
  for (const atom of atoms) {
    lines.push(`### ${atom.name} (\`${atom.id}\`)`);
    lines.push('');
    lines.push(atom.description);
    lines.push('');
    if (atom.filename) lines.push(`- **Archivo:** \`${atom.filename}\``);
    if (atom.aiNotes) lines.push(`- **Nota IA:** ${atom.aiNotes}`);
    lines.push('');
    
    if (atom.props.length > 0) {
      lines.push('**Props:**');
      lines.push('| Prop | Tipo | Descripción |');
      lines.push('|------|------|-------------|');
      for (const p of atom.props) {
        lines.push(`| \`${p.name}\` | \`${p.type}\` | ${p.description} |`);
      }
      lines.push('');
    }
    
    if (atom.a11ySummary.keyboard.length > 0 || atom.a11ySummary.aria.length > 0) {
      lines.push('**Accesibilidad:**');
      if (atom.a11ySummary.keyboard.length > 0) {
        lines.push(`- Keyboard: ${atom.a11ySummary.keyboard.join(', ')}`);
      }
      if (atom.a11ySummary.aria.length > 0) {
        lines.push(`- ARIA: ${atom.a11ySummary.aria.join(', ')}`);
      }
      if (atom.a11ySummary.contrast) lines.push(`- Contraste: ${atom.a11ySummary.contrast}`);
      lines.push('');
    }
    
    if (atom.guidelines.length > 0) {
      lines.push('**Guías:**');
      for (const g of atom.guidelines) lines.push(`- ${g}`);
      lines.push('');
    }
  }
  
  // Molecules section
  lines.push('## Moléculas');
  lines.push('');
  for (const mol of molecules) {
    lines.push(`### ${mol.name} (\`${mol.id}\`)`);
    lines.push('');
    lines.push(mol.description);
    lines.push('');
    if (mol.filename) lines.push(`- **Archivo:** \`${mol.filename}\``);
    if (mol.aiNotes) lines.push(`- **Nota IA:** ${mol.aiNotes}`);
    lines.push('');
    
    if (mol.props.length > 0) {
      lines.push('**Props:**');
      lines.push('| Prop | Tipo | Descripción |');
      lines.push('|------|------|-------------|');
      for (const p of mol.props) {
        lines.push(`| \`${p.name}\` | \`${p.type}\` | ${p.description} |`);
      }
      lines.push('');
    }
    
    if (mol.guidelines.length > 0) {
      lines.push('**Guías:**');
      for (const g of mol.guidelines) lines.push(`- ${g}`);
      lines.push('');
    }
  }
  
  // Organisms section
  lines.push('## Organismos');
  lines.push('');
  for (const org of organisms) {
    lines.push(`### ${org.name} (\`${org.id}\`)`);
    lines.push('');
    lines.push(org.description);
    lines.push('');
    if (org.filename) lines.push(`- **Archivo:** \`${org.filename}\``);
    if (org.aiNotes) lines.push(`- **Nota IA:** ${org.aiNotes}`);
    lines.push('');
    
    if (org.props.length > 0) {
      lines.push('**Props:**');
      lines.push('| Prop | Tipo | Descripción |');
      lines.push('|------|------|-------------|');
      for (const p of org.props) {
        lines.push(`| \`${p.name}\` | \`${p.type}\` | ${p.description} |`);
      }
      lines.push('');
    }
    
    if (org.guidelines.length > 0) {
      lines.push('**Guías:**');
      for (const g of org.guidelines) lines.push(`- ${g}`);
      lines.push('');
    }
  }
  
  return lines.join('\n');
}

const markdown = generateGuide();
writeFileSync(join(outDir, 'khor-system-guide.md'), markdown);
console.log(`Guide written: ${join(outDir, 'khor-system-guide.md')} (${markdown.length} chars)`);
