import fs from 'fs';
import path from 'path';

/**
 * Khor Token Extractor — ADV03 Semantic Power-Up
 * Unifica el nombrado entre SaaS y Figma.
 */

const PROJECT_ROOT = process.cwd();
const THEME_CSS_PATH = path.join(PROJECT_ROOT, 'src/styles/theme.css');
const PLUGIN_TOKENS_PATH = path.join(PROJECT_ROOT, 'figma-plugin/src/tokens.ts');

function extract() {
    console.log('🧪 Extrayendo Tokens V6.0 (Semantic Power-Up)...');
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

    const tokens = {
        colors: {} as any,
        spacing: {} as any,
        radius: {} as any,
        shadows: {} as any,
        breakpoints: {} as any,
        containers: {} as any,
        typography_micro: {} as any,
        typography: {
            h1: { size: 38, weight: 'Bold', family: 'Montserrat' },
            h2: { size: 30, weight: 'Bold', family: 'Montserrat' },
            h3: { size: 24, weight: 'SemiBold', family: 'Montserrat' },
            bodyLg: { size: 16, weight: 'Regular', family: 'Montserrat' },
            bodyMd: { size: 14, weight: 'Regular', family: 'Montserrat' },
            small: { size: 12, weight: 'Medium', family: 'Montserrat' },
        }
    };

    Object.entries(vars).forEach(([name, data]) => {
        // En V6.0 MANTENEMOS el prefijo khor- para alineación total
        const cleanName = name.replace('--', ''); 
        
        const resolve = (val: string) => {
            if (val.startsWith('var(')) {
                const ref = val.match(/var\((--khor-[^,)]+)/)?.[1];
                return ref && vars[ref] ? vars[ref].light : val;
            }
            return val;
        };

        const val = resolve(data.light);
        const darkVal = data.dark ? resolve(data.dark) : val;

        if (name.includes('color') || name.includes('primary') || name.includes('navy') || name.includes('neutral') || name.includes('success') || name.includes('error') || name.includes('warning') || name.includes('action') || name.includes('text') || name.includes('surface') || name.includes('border') || name.includes('avatar')) {
            tokens.colors[cleanName] = { light: val, dark: darkVal };
        } else if (name.includes('breakpoint')) {
            tokens.breakpoints[cleanName] = parseInt(val) || val;
        } else if (name.includes('container')) {
            tokens.containers[cleanName] = parseInt(val) || val;
        } else if (name.includes('space')) {
            tokens.spacing[cleanName] = parseInt(val) || val;
        } else if (name.includes('radius')) {
            tokens.radius[cleanName] = parseInt(val) || val;
        } else if (name.includes('leading') || name.includes('tracking')) {
            tokens.typography_micro[cleanName] = val;
        } else if (name.includes('shadow')) {
            tokens.shadows[cleanName] = val;
        }
    });

    fs.writeFileSync(PLUGIN_TOKENS_PATH, `export const khorTokensEcosystem = ${JSON.stringify(tokens, null, 2)};`);
    console.log(`✅ Tokens V6.0 (Semantic) exportados.`);
}

extract();
