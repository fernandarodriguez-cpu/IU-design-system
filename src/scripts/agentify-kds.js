import fs from 'fs';
import path from 'path';

const ROOT_DIR = path.join(process.cwd(), 'src/app/components/design-system');

const MCP_MANIFESTO = `/**
 * @figma-mcp-migration
 * Component: KCOMPONENT_PLACEHOLDER
 * 
 * INSTRUCCIONES PARA AGENTES DE IA (VS Code / MCP):
 * Para migrar este componente a Figma, NO generar una matriz multiplicando todas las variables.
 * Utilizar Figma Component Properties V2 con la siguiente estructura:
 * 
 * 1. Variants (Estructurales):
 *    - Definir variantes puramente visuales/estructurales.
 * 2. Booleans (Encendido/Apagado):
 *    - Definir encendido/apagado para iconos o estados (isLoading, hasIcon).
 * 3. Color Variables (No usar variantes para colores semánticos):
 *    - El relleno/borde debe usar Figma Variables (Khor v6.0 Colors) asignado dinámicamente.
 *    - El consumidor del UI Kit cambiará el color del layer.
 */
`;

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Clean Branding from comments and literal strings (not imports)
  // Reemplaza referencias a AntD/Ant Design
  content = content.replace(/(?<!import[\s\S]*?)(\bAntD v5\b|\bAntD\b|\bAnt Design\b|\bparidad AntD\b|\bAntD 5\b)/gi, 'Khor DS');
  
  // Reemplaza referencias a Radix (que no estén en imports)
  content = content.replace(/(?<!import\s+\*\s+as\s+[a-zA-Z]+\s+from\s+['"]@radix-ui\/.*?['"]\s*;[\s\S]*?)(\bRadix UI\b|\bRadix\b)/gi, 'Khor Engine');

  // Reemplaza referencias a Shadcn
  content = content.replace(/(?<!import[\s\S]*?)(\bShadcn UI\b|\bShadcn\b|\bShad\b)/gi, 'KDS Core');

  // 2. Inject @figma-mcp-migration if it doesn't exist
  if (!content.includes('@figma-mcp-migration')) {
    // Find the export statement
    // Match export function K... or export const K...
    const exportRegex = /(export\s+(?:function|const)\s+(K[A-Za-z0-9]+))/;
    const match = content.match(exportRegex);
    if (match) {
      const compName = match[2];
      const manifesto = MCP_MANIFESTO.replace('KCOMPONENT_PLACEHOLDER', compName);
      content = content.replace(exportRegex, manifesto + '$1');
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  return false;
}

function traverseDir(dir) {
  let modifiedCount = 0;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      modifiedCount += traverseDir(fullPath);
    } else if (file === 'index.tsx' || file.startsWith('K') && file.endsWith('.tsx')) {
      if (processFile(fullPath)) {
        modifiedCount++;
      }
    }
  }
  return modifiedCount;
}

console.log('Iniciando Agentificación y Limpieza de Marca...');
const count = traverseDir(ROOT_DIR);
console.log(`Completado. Modificados ${count} archivos de componentes.`);
