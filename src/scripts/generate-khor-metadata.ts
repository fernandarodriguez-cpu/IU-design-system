import fs from 'fs';
import path from 'path';
import * as ts from 'typescript';

/**
 * Khor Metadata Generator V3.0 — ADV04 Stabilization
 * Deep Scan: Atoms, Molecules, Organisms, Patterns.
 */

const PROJECT_ROOT = process.cwd();
const DS_ROOT = path.join(PROJECT_ROOT, 'src/app/components/design-system');
const PATTERNS_ROOT = path.join(PROJECT_ROOT, 'src/app/patterns');

interface PropMetadata { name: string; type: string; required: boolean; description: string; options?: string[]; isIcon?: boolean; defaultValue?: any; }
interface ComponentMetadata { name: string; category: string; path: string; props: PropMetadata[]; }

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
       arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

function parseFileForProps(filePath: string): { name: string; props: PropMetadata[] }[] {
  const sourceCode = fs.readFileSync(filePath, 'utf-8');
  const sourceFile = ts.createSourceFile(filePath, sourceCode, ts.ScriptTarget.Latest, true);
  const results: { name: string; props: PropMetadata[] }[] = [];
  const typeAliases: Record<string, string[]> = {};
  
  // Basic heuristic: find exported interfaces that likely represent component props
  function firstPass(node: ts.Node) {
      if (ts.isTypeAliasDeclaration(node) && ts.isUnionTypeNode(node.type)) {
          const options: string[] = [];
          node.type.types.forEach(t => {
              if (ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal)) options.push(t.literal.text);
          });
          if (options.length > 0) typeAliases[node.name.text] = options;
      }
      ts.forEachChild(node, firstPass);
  }

  const defaultValues: Record<string, string> = {};

  function findDefaults(node: ts.Node) {
    if (ts.isVariableDeclaration(node) && node.initializer && ts.isArrowFunction(node.initializer)) {
       const params = node.initializer.parameters[0];
       if (params && ts.isObjectBindingPattern(params.name)) {
          params.name.elements.forEach(el => {
            if (ts.isBindingElement(el) && el.initializer && ts.isIdentifier(el.name)) {
               defaultValues[el.name.text] = el.initializer.getText();
            }
          });
       }
    }
    ts.forEachChild(node, findDefaults);
  }

  function visit(node: ts.Node) {
    if (ts.isInterfaceDeclaration(node) && (node.name.text.endsWith('Props') || node.name.text.startsWith('K'))) {
      const compName = node.name.text.replace('Props', '');
      if (compName.length < 3) return;

      const props: PropMetadata[] = [];
      node.members.forEach((member) => {
        if (ts.isPropertySignature(member) && ts.isIdentifier(member.name)) {
          const propName = member.name.text;
          const propType = member.type ? sourceCode.substring(member.type.pos, member.type.end).trim() : 'any';
          let options: string[] | undefined = undefined;
          const isIcon = propType.includes('LucideIcon') || propName.toLowerCase().includes('icon');

          if (member.type && ts.isUnionTypeNode(member.type)) {
            const unionOptions: string[] = [];
            member.type.types.forEach((t) => {
              if (ts.isLiteralTypeNode(t) && ts.isStringLiteral(t.literal)) unionOptions.push(t.literal.text);
              else if (t.kind === ts.SyntaxKind.BooleanKeyword) unionOptions.push('true', 'false');
            });
            if (unionOptions.length > 0) options = unionOptions;
          } else if (member.type && ts.isTypeReferenceNode(member.type)) {
               const refName = member.type.typeName.getText(sourceFile);
               if (typeAliases[refName]) options = typeAliases[refName];
          } else if (member.type && member.type.kind === ts.SyntaxKind.BooleanKeyword) options = ['true', 'false'];

          if (compName === "KAvatar") {
              if (propName === 'size') options = ['sm', 'md', 'lg', 'xl'];
              if (propName === 'shape') options = ['circle', 'square'];
              if (propName === 'status') options = ['online', 'offline', 'busy', 'away'];
          }

          props.push({ 
            name: propName, 
            type: propType, 
            required: !member.questionToken, 
            description: '', 
            options,
            isIcon,
            defaultValue: defaultValues[propName]
          });
        }
      });
      if (props.length > 0) results.push({ name: compName, props });
    }
    ts.forEachChild(node, visit);
  }

  firstPass(sourceFile);
  findDefaults(sourceFile);
  visit(sourceFile);
  return results;
}

function generate() {
  const metadata: ComponentMetadata[] = [];

  // Categorías estándar del DS Core
  ['atom', 'molecule', 'organism'].forEach((cat) => {
    const dir = path.join(DS_ROOT, cat + 's');
    getAllFiles(dir).forEach((file) => {
      parseFileForProps(file).forEach((comp) => {
        if (!metadata.find(m => m.name === comp.name)) {
          metadata.push({ name: comp.name, category: cat, path: file.replace(PROJECT_ROOT, ''), props: comp.props });
        }
      });
    });
  });

  // Categoría especial: Patrones
  getAllFiles(PATTERNS_ROOT).forEach((file) => {
      parseFileForProps(file).forEach((comp) => {
          if (!metadata.find(m => m.name === comp.name)) {
              metadata.push({ name: comp.name, category: 'pattern', path: file.replace(PROJECT_ROOT, ''), props: comp.props });
          }
      });
  });

  const output = { version: '5.0.0', generatedAt: new Date().toISOString(), components: metadata };
  fs.writeFileSync(path.join(PROJECT_ROOT, 'figma-plugin/src/metadata.ts'), `export const khorMetadata = ${JSON.stringify(output, null, 2)};`);
  console.log(`✅ Metadata V5.0 (Deep Scan) generada: ${metadata.length} componentes encontrados.`);
}

generate();
