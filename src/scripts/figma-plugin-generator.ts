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

const parseTokens = (content: string) => {
  const tokens: Record<string, string> = {};
  const regex = /--(khor-[\w-]+):\s*([^;]+);/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    tokens[match[1]] = match[2].trim();
  }
  return tokens;
};

const lightTokens = parseTokens(cssContent);
const darkTokens = lightTokens; // Fallback or extracted specifically if needed

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
    <span class="label">Foundations & Sync</span>
    <div class="btn-group">
      <button onclick="run('Sync')">🎨 Sync Tokens (${Object.keys(lightTokens).length})</button>
      <button onclick="run('Hierarchy')">📂 Build Hierarchy</button>
      <button onclick="run('Foundations')" class="primary">💎 Populate Foundations</button>
    </div>
  </div>
  <div id="status">Listo</div>
  <script>
    function run(type) { parent.postMessage({ pluginMessage: { type: type } }, '*'); }
    window.onmessage = (e) => { if(e.data.pluginMessage) document.getElementById('status').innerText = e.data.pluginMessage; };
  </script>
</body>
</html>
`;

const pluginCode = `
const structure = ${JSON.stringify(structure)};
const lightTokens = ${JSON.stringify(lightTokens)};
const darkTokens = ${JSON.stringify(darkTokens)};

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

async function syncVariables() {
  figma.notify('Iniciando Sincronización...');
  try {
    var col = figma.variables.getLocalVariableCollections().find(function(c) { return c.name === 'Khor v6.0 Core'; });
    if (!col) col = figma.variables.createVariableCollection('Khor v6.0 Core');
    var lMode = col.modes[0].modeId;
    var dModeObj = col.modes.find(function(m) { return m.name === 'Dark'; });
    var dMode = dModeObj ? dModeObj.modeId : col.addMode('Dark');

    var hexToRgb = function(hex) {
      hex = hex.trim();
      if (hex.length === 4) hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
      return { r: parseInt(hex.slice(1,3),16)/255, g: parseInt(hex.slice(3,5),16)/255, b: parseInt(hex.slice(5,7),16)/255 };
    };

    var parseVal = function(v) {
      v = v.trim();
      if (v.indexOf('#') === 0 && v.indexOf(' ') === -1) return { t: 'COLOR', v: hexToRgb(v) };
      if (v.indexOf('rgba') !== -1 || v.indexOf(' ') !== -1 || v === 'none' || v.indexOf('inset') !== -1) return { t: 'STRING', v: v };
      var n = parseFloat(v);
      if (!isNaN(n)) {
        if (v.indexOf('rem') !== -1 || v.indexOf('em') !== -1) n = n * 16;
        return { t: 'FLOAT', v: n };
      }
      return { t: 'STRING', v: v };
    };

    var count = 0;
    var keys = Object.keys(lightTokens);
    for (var i = 0; i < keys.length; i++) {
      try {
        var name = keys[i];
        var pL = parseVal(lightTokens[name]);
        var vName = name.replace('khor-', '').split('-').map(function(s) { return s.charAt(0).toUpperCase() + s.slice(1); }).join('/');
        var v = figma.variables.getLocalVariables().find(function(vn) { return vn.name === vName && vn.variableCollectionId === col.id; });
        if (v && v.resolvedType !== pL.t) {
          v.remove();
          v = null;
        }
        if (!v) v = figma.variables.createVariable(vName, col, pL.t);
        v.setValueForMode(lMode, pL.v);
        if (darkTokens[name]) v.setValueForMode(dMode, parseVal(darkTokens[name]).v);
        
        if (pL.t === 'STRING' && (vName.toLowerCase().indexOf('shadow') !== -1 || vName.toLowerCase().indexOf('elevation') !== -1)) {
          var styleName = vName;
          var existingStyle = figma.getLocalEffectStyles().find(function(s) { return s.name === styleName; });
          if (!existingStyle) existingStyle = figma.createEffectStyle();
          existingStyle.name = styleName;
          var effects = parseShadowToEffects(pL.v);
          if (effects.length > 0) existingStyle.effects = effects;
        }
        
        count++;
      } catch (e) {}
    }
    figma.notify('Completado: ' + count + ' tokens');
  } catch (err) { figma.notify('Error: ' + err.message); }
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
  var col = figma.variables.getLocalVariableCollections().find(function(c) { return c.name === 'Khor v6.0 Core'; });
  if (!col) return figma.notify('Sync primero');
  var vars = figma.variables.getLocalVariables().filter(function(v) { return v.variableCollectionId === col.id; });
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  var cats = [
    {n:'Colors', f:'COLOR'}, 
    {n:'Typography', f:'FLOAT'}, 
    {n:'Radius', f:'FLOAT'}, 
    {n:'Spacing', f:'FLOAT'}, 
    {n:'Shadows', f:'STRING'},
    {n:'Layout', f:'LAYOUT'}
  ];
  for (var i = 0; i < cats.length; i++) {
    var cat = cats[i];
    var p = await findPageByName(cat.n);
    if (!p) { 
      p = figma.createPage(); p.name = '💎 Foundations / ' + cat.n; 
    }
    figma.currentPage = p;
    
    var container = p.children.find(function(c) { return c.name === "KDS-Generated-" + cat.n; });
    if (container) container.remove();
    
    var filtered = vars.filter(function(v) {
      if (cat.f === 'COLOR') return v.resolvedType === 'COLOR';
      if (cat.f === 'LAYOUT') return v.name.toLowerCase().indexOf('layout-grid') !== -1;
      var n = v.name.toLowerCase();
      if (cat.n === 'Shadows') return n.indexOf('shadow') !== -1 || n.indexOf('elevation') !== -1;
      return n.indexOf(cat.n.toLowerCase().substring(0, cat.n.length - 1)) !== -1;
    });

    if (filtered.length === 0 && cat.f !== 'LAYOUT') continue;
    
    container = figma.createFrame();
    container.name = "KDS-Generated-" + cat.n;
    container.layoutMode = "VERTICAL";
    container.paddingTop = 100;
    container.paddingLeft = 100;
    container.itemSpacing = 32;
    container.primaryAxisSizingMode = "AUTO";
    container.counterAxisSizingMode = "AUTO";
    container.fills = [];
    p.appendChild(container);

    if (cat.f === 'LAYOUT') {
      var gridSpecs = [
        { name: 'Sm', cols: 12, gutter: 16, margin: 16 },
        { name: 'Md', cols: 12, gutter: 24, margin: 24 },
        { name: 'Lg', cols: 12, gutter: 32, margin: 32 },
        { name: 'Xl', cols: 12, gutter: 32, margin: 40 }
      ];
      for (var g = 0; g < gridSpecs.length; g++) {
        var spec = gridSpecs[g];
        var row = figma.createFrame();
        row.layoutMode = "HORIZONTAL";
        row.counterAxisAlignItems = "CENTER";
        row.itemSpacing = 24;
        row.fills = [];
        
        var visual = figma.createFrame();
        visual.resize(200, 80);
        visual.cornerRadius = 8;
        visual.fills = [{type:'SOLID', color:{r:0.95, g:0.96, b:1}}];
        visual.strokes = [{type:'SOLID', color:{r:0.88, g:0.92, b:1}}];
        
        // Draw dummy columns
        var colW = (200 - (spec.margin * 2) - (spec.gutter * (spec.cols - 1))) / spec.cols;
        // In this small visual, we'll just show 4 columns to represent
        for (var c = 0; c < 6; c++) {
          var col = figma.createRectangle();
          col.resize(15, 60);
          col.fills = [{type:'SOLID', color:{r:0.87, g:0.3, b:0.21}, opacity: 0.1}];
          col.x = 20 + (c * 25);
          col.y = 10;
          visual.appendChild(col);
        }
        row.appendChild(visual);

        var textGroup = figma.createFrame();
        textGroup.layoutMode = "VERTICAL";
        textGroup.itemSpacing = 4;
        textGroup.fills = [];
        
        var nameTxt = figma.createText();
        nameTxt.characters = "Grid " + spec.name;
        nameTxt.fontSize = 16;
        nameTxt.fontName = { family: "Inter", style: "Bold" };
        textGroup.appendChild(nameTxt);

        var detailTxt = figma.createText();
        detailTxt.characters = spec.cols + " Columnas • Gutter " + spec.gutter + "px • Offset " + spec.margin + "px";
        detailTxt.fontSize = 13;
        detailTxt.opacity = 0.7;
        textGroup.appendChild(detailTxt);
        
        row.appendChild(textGroup);
        container.appendChild(row);
      }
    } else {
      for (var k = 0; k < filtered.length; k++) {
        var v = filtered[k];
        var row = figma.createFrame();
        row.layoutMode = "HORIZONTAL";
        row.counterAxisAlignItems = "CENTER";
        row.itemSpacing = 24;
        row.fills = [];
        
        var val = v.valuesByMode[Object.keys(v.valuesByMode)[0]];
        var displayVal = JSON.stringify(val);

        if (v.resolvedType === 'COLOR') {
          var sw = figma.createRectangle();
          sw.resize(80,80);
          sw.cornerRadius = 12;
          sw.fills = [figma.variables.setBoundVariableForPaint({type:'SOLID', color:{r:1,g:1,b:1}}, 'color', v)];
          row.appendChild(sw);
          displayVal = rgbToHex(val.r, val.g, val.b).toUpperCase();
        } else if (cat.n === 'Shadows') {
          var sw = figma.createRectangle();
          sw.resize(80,80);
          sw.cornerRadius = 12;
          sw.fills = [{type: 'SOLID', color: {r:1, g:1, b:1}}];
          var existingStyle = figma.getLocalEffectStyles().find(function(s) { return s.name === v.name; });
          if (existingStyle) {
            sw.effectStyleId = existingStyle.id;
          } else {
            var effects = parseShadowToEffects(val);
            if (effects.length > 0) sw.effects = effects;
          }
          row.appendChild(sw);
        }
        
        var textGroup = figma.createFrame();
        textGroup.layoutMode = "VERTICAL";
        textGroup.itemSpacing = 4;
        textGroup.fills = [];
        
        var nameTxt = figma.createText();
        nameTxt.characters = v.name;
        nameTxt.fontSize = 14;
        nameTxt.fontName = { family: "Inter", style: "Bold" };
        textGroup.appendChild(nameTxt);

        var valTxt = figma.createText();
        valTxt.characters = displayVal;
        valTxt.fontSize = 12;
        valTxt.opacity = 0.6;
        textGroup.appendChild(valTxt);
        
        row.appendChild(textGroup);
        container.appendChild(row);
      }
    }
  }

  figma.notify('Foundations actualizadas');
}

`;

if (!fs.existsSync(FIGMA_PATH)) fs.mkdirSync(FIGMA_PATH, { recursive: true });
fs.writeFileSync(path.join(FIGMA_PATH, 'ui.html'), uiHtml);
fs.writeFileSync(path.join(FIGMA_PATH, 'code.js'), pluginCode);

console.log('✅ Sistema unificado con emojis en: ' + FIGMA_PATH);