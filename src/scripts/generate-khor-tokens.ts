import fs from 'fs';
import path from 'path';

/**
 * Khor Token Extractor — ADV03 Semantic Power-Up (v10.4.5)
 * Motor Centralizado para Figma, Penpot y Web.
 */

const PROJECT_ROOT = process.cwd();
const THEME_CSS_PATH = path.join(PROJECT_ROOT, 'src/styles/theme.css');
const FIGMA_TOKENS_PATH = path.join(PROJECT_ROOT, 'figma-plugin/src/tokens.ts');
const PENPOT_TOKENS_PATH = path.join(PROJECT_ROOT, 'penpot-plugin/src/tokens.json');

// Crear carpetas si no existen
const ensureDirectoryExistence = (filePath: string) => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) return true;
    fs.mkdirSync(dirname, { recursive: true });
};

function extract() {
    console.log('🧪 DSG Engine: Procesando Khor Tokens v10.4.5...');
    const cssContent = fs.readFileSync(THEME_CSS_PATH, 'utf-8');

    const vars: Record<string, { light: string, dark?: string }> = {};
    const sanitize = (str: string) => str.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n/g, '').trim();

    // 1. Extraer :root (Light)
    const rootMatch = cssContent.match(/:root\s*{([\s\S]*?)}/);
    if (rootMatch) {
        rootMatch[1].split(';').forEach(line => {
            const [rawName, rawVal] = line.split(':');
            if (rawName && rawVal) {
                const name = sanitize(rawName);
                const val = sanitize(rawVal);
                if (name.startsWith('--khor-')) vars[name] = { light: val };
            }
        });
    }

    // 2. Extraer .dark (Dark)
    const darkMatch = cssContent.match(/\.dark\s*{([\s\S]*?)}/);
    if (darkMatch) {
        darkMatch[1].split(';').forEach(line => {
            const [rawName, rawVal] = line.split(':');
            if (rawName && rawVal) {
                const name = sanitize(rawName);
                const val = sanitize(rawVal);
                if (vars[name]) vars[name].dark = val;
            }
        });
    }

    // ─── Estructura de Salida Unificada ───
    const tokens: any = {
        colors: {},
        spacing: {},
        radius: {},
        shadows: {},
        blur: {},
        opacity: {},
        rotate: {},
        stroke: {},
        sizing: {},
        numbers: {},
        typography_micro: {},
        typography: {
            h1: { size: 40, weight: 'Bold', family: 'Montserrat' },
            h2: { size: 32, weight: 'Bold', family: 'Montserrat' },
            h3: { size: 24, weight: 'SemiBold', family: 'Montserrat' },
            bodyLg: { size: 16, weight: 'Regular', family: 'Montserrat' },
            bodyMd: { size: 14, weight: 'Regular', family: 'Montserrat' },
            small: { size: 12, weight: 'Medium', family: 'Montserrat' },
        }
    };

    // Función de resolución de variables anidadas
    const resolve = (val: string) => {
        if (val.startsWith('var(')) {
            const ref = val.match(/var\((--khor-[^,)]+)/)?.[1];
            return ref && vars[ref] ? resolve(vars[ref].light) : val;
        }
        return val;
    };

    Object.entries(vars).forEach(([name, data]) => {
        const cleanName = name.replace('--khor-', ''); 
        const val = resolve(data.light);
        const darkVal = data.dark ? resolve(data.dark) : val;

        // Categorización Semántica
        if (name.includes('color') || name.includes('primary') || name.includes('secondary') || name.includes('neutral') || name.includes('success') || name.includes('error') || name.includes('warning') || name.includes('info') || name.includes('action') || name.includes('text') || name.includes('surface') || name.includes('border') || name.includes('avatar') || name.includes('teal')) {
            tokens.colors[cleanName] = { light: val, dark: darkVal };
        } else if (name.includes('blur') || name.includes('backdrop')) {
            tokens.blur[cleanName] = val;
        } else if (name.includes('opacity')) {
            tokens.opacity[cleanName] = val;
        } else if (name.includes('rotate')) {
            tokens.rotate[cleanName] = val;
        } else if (name.includes('stroke')) {
            tokens.stroke[cleanName] = val;
        } else if (name.includes('size-')) {
            tokens.sizing[cleanName] = val;
        } else if (name.includes('space')) {
            tokens.spacing[cleanName] = val;
        } else if (name.includes('radius')) {
            tokens.radius[cleanName] = val;
        } else if (name.includes('shadow')) {
            tokens.shadows[cleanName] = val;
        } else if (name.includes('number')) {
            tokens.numbers[cleanName] = val;
        } else if (name.includes('leading') || name.includes('tracking')) {
            tokens.typography_micro[cleanName] = val;
        }
    });

    // ─── Exportación 1: FIGMA (TypeScript) ───
    ensureDirectoryExistence(FIGMA_TOKENS_PATH);
    fs.writeFileSync(FIGMA_TOKENS_PATH, `/** AUTO-GENERATED - DO NOT EDIT **/\nexport const khorTokensEcosystem = ${JSON.stringify(tokens, null, 2)};`);

    // ─── Exportación 2: PENPOT (W3C DTCG JSON) ───
    const w3cTokens: any = {};
    const convertToW3C = (obj: any, path: string[] = []) => {
        Object.entries(obj).forEach(([key, val]: [string, any]) => {
            if (typeof val === 'object' && val !== null && !val.light) {
                convertToW3C(val, [...path, key]);
            } else {
                let target = w3cTokens;
                path.forEach(p => { 
                    if (!target[p]) target[p] = {};
                    target = target[p];
                });
                
                const typeMap: any = {
                    colors: 'color',
                    spacing: 'dimension',
                    sizing: 'dimension',
                    radius: 'dimension',
                    stroke: 'dimension',
                    blur: 'blur',
                    opacity: 'number',
                    shadows: 'shadow'
                };

                target[key] = {
                    "$value": val.light || val,
                    "$type": typeMap[path[0]] || 'other'
                };
            }
        });
    };

    convertToW3C(tokens);
    ensureDirectoryExistence(PENPOT_TOKENS_PATH);
    fs.writeFileSync(PENPOT_TOKENS_PATH, JSON.stringify(w3cTokens, null, 2));

    console.log(`✅ DSG Engine: Sincronización dual completada.`);
    console.log(`   - Figma: ${FIGMA_TOKENS_PATH}`);
    console.log(`   - Penpot: ${PENPOT_TOKENS_PATH}`);
}

extract();
