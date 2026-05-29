import fs from 'fs';
import path from 'path';

const FIGMA_PATH = path.join(process.cwd(), 'dist/figma-plugin');

const getFolders = (dir: string) => {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && dirent.name.startsWith('K'))
    .map(dirent => dirent.name);
};

const baseDir = path.join(process.cwd(), 'src/app/components/design-system');
const structure = {
  foundations: ['Colors', 'Typography', 'Radius', 'Spacing', 'Shadows'],
  atoms: getFolders(path.join(baseDir, 'atoms')),
  molecules: getFolders(path.join(baseDir, 'molecules')),
  organisms: getFolders(path.join(baseDir, 'organisms'))
};

const cssPath = path.join(process.cwd(), 'src/styles/theme.css');
const cssContent = fs.readFileSync(cssPath, 'utf8');

// Parse a CSS block into a dictionary of tokens
const parseTokens = (content: string) => {
  const tokens: Record<string, string> = {};
  const regex = /--(khor-[\w-]+):\s*([^;]+);/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    tokens[match[1]] = match[2].trim();
  }
  return tokens;
};

// Deeply resolve var(--token) aliases
const resolveAliases = (tokens: Record<string, string>) => {
  const resolved = { ...tokens };
  let resolving = true;
  let maxDepth = 10; // Prevent infinite loops

  while (resolving && maxDepth > 0) {
    resolving = false;
    for (const key in resolved) {
      let val = resolved[key];
      const aliasMatch = val.match(/var\(--(khor-[\w-]+)\)/g);
      if (aliasMatch) {
        for (const m of aliasMatch) {
          const refKey = m.replace('var(--', '').replace(')', '');
          if (resolved[refKey]) {
            val = val.replace(m, resolved[refKey]);
            resolving = true;
          }
        }
        resolved[key] = val;
      }
    }
    maxDepth--;
  }
  return resolved;
};

// Parse CSS Blocks
const rootMatch = cssContent.match(/:root\s*{([\s\S]*?)}/);
const darkMatch = cssContent.match(/\.dark\s*{([\s\S]*?)}/);
const compactMatch = cssContent.match(/\.khor-compact\s*{([\s\S]*?)}/);
const comfortableMatch = cssContent.match(/\.khor-comfortable\s*{([\s\S]*?)}/);

const rawLight = rootMatch ? parseTokens(rootMatch[1]) : {};
const rawDark = darkMatch ? parseTokens(darkMatch[1]) : {};
const rawCompact = compactMatch ? parseTokens(compactMatch[1]) : {};
const rawComfortable = comfortableMatch ? parseTokens(comfortableMatch[1]) : {};

// Resolve aliases independently for Light and Dark modes
const lightTokens = resolveAliases(rawLight);
const darkTokens = resolveAliases({ ...rawLight, ...rawDark });
const compactTokens = resolveAliases({ ...rawLight, ...rawCompact });
const comfortableTokens = resolveAliases({ ...rawLight, ...rawComfortable });

// Evaluate clamp(min, pref, max)
const evaluateClamp = (clampStr: string, vw: number) => {
  const match = clampStr.match(/clamp\(([^,]+),\s*([^,]+),\s*([^)]+)\)/);
  if (!match) return null;

  const parseToPx = (val: string) => {
    if (val.includes('rem')) return parseFloat(val) * 16;
    if (val.includes('px')) return parseFloat(val);
    return 0;
  };

  const min = parseToPx(match[1]);
  const max = parseToPx(match[3]);

  // Evaluate pref (e.g. "5vw + 1rem" or "5vw + 0.8rem")
  const prefStr = match[2];
  let prefPx = 0;
  const parts = prefStr.split('+');
  for (const p of parts) {
    const pt = p.trim();
    if (pt.includes('vw')) {
      prefPx += (parseFloat(pt) / 100) * vw;
    } else {
      prefPx += parseToPx(pt);
    }
  }

  const result = Math.max(min, Math.min(prefPx, max));
  return Math.round(result); // Snap to pixel
};

const parseToFigmaType = (val: string) => {
  if (val.startsWith('#') && !val.includes(' ')) {
    return 'COLOR';
  }
  if (!isNaN(parseFloat(val)) && !val.includes('rgba') && !val.includes('shadow')) {
    return 'FLOAT';
  }
  return 'STRING';
};

// Build Collections Structure
const generateCollections = () => {
  const colors: any = { name: "Khor v6.0 Colors", modes: ["Light", "Dark"], variables: [] };
  const dimensions: any = { name: "Khor v6.0 Dimensions", modes: ["Mobile", "Tablet", "Desktop", "Desktop XL"], variables: [] };
  const density: any = { name: "Khor v6.0 Density", modes: ["Compact", "Default", "Comfortable"], variables: [] };
  
  // Collect all keys
  const allKeys = new Set([...Object.keys(lightTokens), ...Object.keys(darkTokens)]);

  for (const name of allKeys) {
    const lightVal = lightTokens[name] || '';
    const darkVal = darkTokens[name] || lightVal;
    
    // Figma Variable Name
    const figmaName = name.replace('khor-', '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('/');

    // 1. DIMENSIONS (Responsive with Clamp)
    if (lightVal.includes('clamp(')) {
      dimensions.variables.push({
        name: figmaName,
        type: 'FLOAT',
        values: {
          "Mobile": evaluateClamp(lightVal, 320),
          "Tablet": evaluateClamp(lightVal, 768),
          "Desktop": evaluateClamp(lightVal, 1440),
          "Desktop XL": evaluateClamp(lightVal, 1920)
        }
      });
      continue;
    }

    // 2. DENSITY (Has variants in compact/comfortable)
    if (name.includes('density')) {
      const type = parseToFigmaType(lightVal);
      density.variables.push({
        name: figmaName,
        type: type,
        values: {
          "Compact": compactTokens[name] || lightVal,
          "Default": lightVal,
          "Comfortable": comfortableTokens[name] || lightVal
        }
      });
      continue;
    }

    // 3. COLORS & STRINGS (Light / Dark)
    const type = parseToFigmaType(lightVal);
    colors.variables.push({
      name: figmaName,
      type: type,
      values: {
        "Light": lightVal,
        "Dark": darkVal
      }
    });
  }

  return [colors, dimensions, density];
};

const collectionsData = generateCollections();

const uiHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; margin: 0; padding: 16px; background: #f8faff; color: #051758; }
    .header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
    .logo { background: #E04D36; color: white; width: 28px; height: 28px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; }
    .card { background: white; border-radius: 10px; padding: 12px; border: 1px solid #edf0f1; margin-bottom: 10px; }
    .label { font-size: 10px; font-weight: 700; text-transform: uppercase; color: #718096; margin-bottom: 8px; display: block; }
    .btn-group { display: flex; flex-direction: column; gap: 6px; }
    button { background: #f1f4ff; border: 1px solid #e2eafc; color: #051758; padding: 10px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: space-between; }
    button:hover { background: #e2eafc; }
    button.primary { background: #E04D36; color: white; border: none; }
    #status { font-size: 11px; margin-top: 10px; color: #E04D36; font-weight: bold; text-align: center; }
  </style>
</head>
<body>
  <div class="header"><div class="logo">K</div><h2>KDS Manager Pro</h2></div>
  <div class="card">
    <span class="label">Advanced Multi-Mode Sync</span>
    <div class="btn-group">
      <button onclick="run('Sync')">🎨 Sync All Collections</button>
      <button onclick="run('Hierarchy')">📂 Build Hierarchy</button>
      <button onclick="run('Foundations')" class="primary">💎 Populate Foundations</button>
    </div>
  </div>
  <div id="status">Listo para sincronizar Modos y Breakpoints.</div>
  <script>
    function run(type) { parent.postMessage({ pluginMessage: { type: type } }, '*'); }
    window.onmessage = (e) => { if(e.data.pluginMessage) document.getElementById('status').innerText = e.data.pluginMessage; };
  </script>
</body>
</html>
`;

const pluginCode = `
const structure = ${JSON.stringify(structure)};
const collectionsData = ${JSON.stringify(collectionsData)};

figma.showUI(__html__, { width: 340, height: 420 });

figma.ui.onmessage = function(msg) {
  if (msg.type === 'Sync') syncVariables();
  if (msg.type === 'Hierarchy') buildStructure();
  if (msg.type === 'Foundations') populateFoundations();
};

function rgbToHex(r, g, b) {
  var toHex = function(c) {
    var h = Math.round(c * 255).toString(16);
    return h.length === 1 ? '0' + h : h;
  };
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

function parseShadowToEffects(cssStr) {
  if (typeof cssStr !== 'string') return [];
  var effects = [];
  var parts = cssStr.split(/,(?![^()]*\\))/);
  for (var i = 0; i < parts.length; i++) {
    var part = parts[i].trim();
    if (!part || part === 'none') continue;
    var isInset = part.indexOf('inset') !== -1;
    part = part.replace('inset', '').trim();
    
    var colorMatch = part.match(/rgba?\\([^)]+\\)|#[0-9a-fA-F]+/);
    if (!colorMatch) continue;
    var colorStr = colorMatch[0];
    part = part.replace(colorStr, '').trim();
    
    var nums = part.split(/\\s+/).map(function(n) { return parseFloat(n) || 0; });
    var x = nums[0] || 0;
    var y = nums[1] || 0;
    var blur = nums[2] || 0;
    var spread = nums[3] || 0;
    
    var r = 0, g = 0, b = 0, a = 1;
    if (colorStr.indexOf('rgb') !== -1) {
      var cNums = colorStr.match(/[\\d.]+/g);
      if (cNums && cNums.length >= 3) {
        r = parseFloat(cNums[0]) / 255;
        g = parseFloat(cNums[1]) / 255;
        b = parseFloat(cNums[2]) / 255;
        if (cNums.length > 3) a = parseFloat(cNums[3]);
      }
    } else if (colorStr.indexOf('#') !== -1) {
      var hex = colorStr.trim();
      if (hex.length === 4) hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
      r = parseInt(hex.slice(1, 3), 16) / 255;
      g = parseInt(hex.slice(3, 5), 16) / 255;
      b = parseInt(hex.slice(5, 7), 16) / 255;
      if (hex.length === 9) a = parseInt(hex.slice(7, 9), 16) / 255;
    }
    
    effects.push({
      type: isInset ? "INNER_SHADOW" : "DROP_SHADOW",
      color: { r: r, g: g, b: b, a: a },
      offset: { x: x, y: y },
      radius: blur,
      spread: spread,
      visible: true,
      blendMode: "NORMAL"
    });
  }
  return effects;
}

function hexToRgb(hex) {
  hex = hex.trim();
  if (hex.length === 4) hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  return { r: parseInt(hex.slice(1,3),16)/255, g: parseInt(hex.slice(3,5),16)/255, b: parseInt(hex.slice(5,7),16)/255 };
}

function parseVal(v, type) {
  if (typeof v === 'number') return { t: 'FLOAT', v: v };
  v = v.trim();
  if (type === 'COLOR' && v.indexOf('#') === 0) return { t: 'COLOR', v: hexToRgb(v) };
  if (type === 'FLOAT') {
    var n = parseFloat(v);
    if (!isNaN(n)) {
      if (v.indexOf('rem') !== -1 || v.indexOf('em') !== -1) n = n * 16;
      return { t: 'FLOAT', v: n };
    }
  }
  return { t: 'STRING', v: v };
}

async function syncVariables() {
  figma.notify('Iniciando Sincronización Multi-Modo...');
  try {
    var count = 0;
    for (var i = 0; i < collectionsData.length; i++) {
      var colData = collectionsData[i];
      var col = figma.variables.getLocalVariableCollections().find(function(c) { return c.name === colData.name; });
      if (!col) col = figma.variables.createVariableCollection(colData.name);

      // Setup modes
      var modeIds = {};
      for (var m = 0; m < colData.modes.length; m++) {
        var modeName = colData.modes[m];
        var existingMode = col.modes.find(function(x) { return x.name === modeName; });
        if (existingMode) {
          modeIds[modeName] = existingMode.modeId;
        } else {
          if (m === 0 && col.modes[0].name === 'Mode 1') {
            col.renameMode(col.modes[0].modeId, modeName);
            modeIds[modeName] = col.modes[0].modeId;
          } else {
            modeIds[modeName] = col.addMode(modeName);
          }
        }
      }

      // Sync variables
      for (var vIdx = 0; vIdx < colData.variables.length; vIdx++) {
        var vData = colData.variables[vIdx];
        var v = figma.variables.getLocalVariables().find(function(vn) { return vn.name === vData.name && vn.variableCollectionId === col.id; });
        if (v && v.resolvedType !== vData.type) {
          v.remove();
          v = null;
        }
        if (!v) v = figma.variables.createVariable(vData.name, col, vData.type);

        for (var m = 0; m < colData.modes.length; m++) {
          var modeName = colData.modes[m];
          var rawVal = vData.values[modeName];
          var parsed = parseVal(rawVal, vData.type);
          v.setValueForMode(modeIds[modeName], parsed.v);
        }

        if (vData.type === 'STRING' && (vData.name.toLowerCase().indexOf('shadow') !== -1 || vData.name.toLowerCase().indexOf('elevation') !== -1)) {
          var styleName = vData.name;
          var existingStyle = figma.getLocalEffectStyles().find(function(s) { return s.name === styleName; });
          if (!existingStyle) existingStyle = figma.createEffectStyle();
          existingStyle.name = styleName;
          var effects = parseShadowToEffects(vData.values[colData.modes[0]]);
          if (effects.length > 0) existingStyle.effects = effects;
        }
        count++;
      }
    }
    figma.notify('Completado: ' + count + ' variables en ' + collectionsData.length + ' colecciones');
  } catch (err) { figma.notify('Error: ' + err.message); console.error(err); }
}

async function findPageByName(name) {
  var search = name.replace(/[^a-zA-Z]/g, '').toLowerCase();
  var variations = [search, 'fundamentos' + search, 'foundations' + search];
  return figma.root.children.find(function(pg) {
    var pgName = pg.name.replace(/[^a-zA-Z]/g, '').toLowerCase();
    return variations.indexOf(pgName) !== -1 || pgName.indexOf(search) !== -1 || pgName === 'fundamentos';
  });
}

async function buildStructure() {
  var cats = [
    {n: 'Foundations', e: '💎'},
    {n: 'Atoms', e: '⚛️'},
    {n: 'Molecules', e: '🧪'},
    {n: 'Organisms', e: '🏗️'}
  ];
  for (var i = 0; i < cats.length; i++) {
    var c = cats[i];
    var p = await findPageByName(c.n);
    if (!p) { p = figma.createPage(); p.name = c.e + ' ' + c.n; }
  }
  figma.notify('Jerarquía actualizada');
}

async function populateFoundations() {
  figma.notify('Función simplificada para pruebas...');
}

`;

if (!fs.existsSync(FIGMA_PATH)) {
  fs.mkdirSync(FIGMA_PATH, { recursive: true });
}

fs.writeFileSync(path.join(FIGMA_PATH, 'ui.html'), uiHtml);
fs.writeFileSync(path.join(FIGMA_PATH, 'code.js'), pluginCode);

const manifest = {
  name: "Khor System Sync",
  id: "1351283626105417978",
  api: "1.0.0",
  main: "code.js",
  ui: "ui.html",
  editorType: ["figma"],
  networkAccess: {
    allowedDomains: ["*"]
  }
};

fs.writeFileSync(path.join(FIGMA_PATH, 'manifest.json'), JSON.stringify(manifest, null, 2));

console.log('✅ Compilación Multi-Modo exitosa en: ' + FIGMA_PATH);