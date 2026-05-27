import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

const regex = /import\s*\{\s*cn\s*\}\s*from\s*['"][^'"]*imports\/utils['"];?/g;
const replacement = "import { cn } from '@/utils/cn';";

let fileCount = 0;
let modifiedCount = 0;

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules or .git if we happen to traverse them
      if (file !== 'node_modules' && file !== '.git') {
        walkDir(filePath);
      }
    } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
      fileCount++;
      const content = fs.readFileSync(filePath, 'utf8');
      if (regex.test(content)) {
        const updatedContent = content.replace(regex, replacement);
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        console.log(`[MIGRATED] ${path.relative(rootDir, filePath)}`);
        modifiedCount++;
      }
    }
  }
}

console.log('Starting migration of cn imports...');
walkDir(srcDir);
console.log(`\nMigration completed!`);
console.log(`Total TypeScript files analyzed: ${fileCount}`);
console.log(`Total files updated: ${modifiedCount}`);
