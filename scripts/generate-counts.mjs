import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

function countAllIdsInObject(content, startMarker, endMarker) {
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) throw new Error(`Start marker not found: ${startMarker}`);
  const endIdx = content.indexOf(endMarker, startIdx);
  if (endIdx === -1) throw new Error(`End marker not found: ${endMarker}`);
  const section = content.slice(startIdx, endIdx);
  const matches = [...section.matchAll(/id: '/g)];
  return matches.length;
}

function countOwnLineIds(content, startMarker, endMarker) {
  const startIdx = content.indexOf(startMarker);
  if (startIdx === -1) throw new Error(`Start marker not found: ${startMarker}`);
  const endIdx = content.indexOf(endMarker, startIdx);
  if (endIdx === -1) throw new Error(`End marker not found: ${endMarker}`);
  const section = content.slice(startIdx, endIdx);
  const matches = [...section.matchAll(/^\s+id: '/gm)];
  return matches.length;
}

const atomsContent = readFileSync(resolve(root, 'src/app/pages/AtomsPage.tsx'), 'utf-8');
const moleculesContent = readFileSync(resolve(root, 'src/app/pages/MoleculesPage.tsx'), 'utf-8');
const organismsContent = readFileSync(resolve(root, 'src/app/pages/OrganismsPage.tsx'), 'utf-8');

const counts = {
  atoms: countAllIdsInObject(atomsContent,
    'export const atoms: Record<string, AtomEntry> = {',
    'export function AtomsPage()'),
  molecules: countAllIdsInObject(moleculesContent,
    'export const molecules: Record<string, MoleculeEntry> = {',
    'export function MoleculesPage()'),
  organisms: countOwnLineIds(organismsContent,
    'export const organisms: Record<string, OrganismEntry> = {',
    'export function OrganismsPage()'),
};

counts.patterns = 11;
counts.templates = 6;
counts.total = counts.atoms + counts.molecules + counts.organisms + counts.patterns + counts.templates;

const outputPath = resolve(root, 'src/app/metadata/khor-counts.json');
writeFileSync(outputPath, JSON.stringify(counts, null, 2) + '\n');
console.log('khor-counts.json generated:', JSON.stringify(counts));
