import fs from 'fs';
import path from 'path';

function fixImports(dir) {
  let count = 0;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      count += fixImports(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('@Khor Engine-ui')) {
        content = content.replace(/@Khor Engine-ui/g, '@radix-ui');
        fs.writeFileSync(fullPath, content, 'utf8');
        count++;
      }
      if (content.includes('@KDS Core-ui')) { // Just in case it broke shadcn UI imports
        content = content.replace(/@KDS Core-ui/g, '@shadcn-ui');
        fs.writeFileSync(fullPath, content, 'utf8');
        count++;
      }
    }
  }
  return count;
}

const num = fixImports(path.join(process.cwd(), 'src/app/components/design-system'));
console.log('Fixed ' + num + ' files');
