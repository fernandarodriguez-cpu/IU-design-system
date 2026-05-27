const structure = JSON_STRUCTURE;
const lightTokens = JSON_LIGHT;
const darkTokens = JSON_DARK;

figma.showUI(__html__, { width: 340, height: 480 });

figma.ui.onmessage = async (msg) => {
  console.log('Mensaje recibido:', msg.type);
  if (msg.type === 'Sync Tokens') {
    figma.notify('🚀 Iniciando Sincronización...');
    await syncVariables();
  }
  if (msg.type === 'Populate Foundations') {
    await populateFoundations();
  }
};

async function syncVariables() {
  try {
    console.log('Buscando colección...');
    let collection = figma.variables.getLocalVariableCollections().find(c => c.name === 'Khor v6.0 Core');
    
    if (!collection) {
      console.log('Creando nueva colección...');
      collection = figma.variables.createVariableCollection('Khor v6.0 Core');
      figma.notify('🆕 Colección "Khor v6.0 Core" creada');
    }

    const lightModeId = collection.modes[0].modeId;
    let darkModeId = collection.modes.find(m => m.name === 'Dark')?.modeId || collection.addMode('Dark');

    const allTokens = Object.keys(lightTokens);
    let count = 0;

    console.log('Sincronizando ' + allTokens.length + ' tokens...');
    for (const name of allTokens) {
      try {
        const val = lightTokens[name].trim();
        let type = 'STRING';
        let finalVal = val;

        if (val.startsWith('#')) {
          type = 'COLOR';
          const hex = val.length === 4 ? '#' + val[1] + val[1] + val[2] + val[2] + val[3] + val[3] : val;
          finalVal = { r: parseInt(hex.slice(1,3),16)/255, g: parseInt(hex.slice(3,5),16)/255, b: parseInt(hex.slice(5,7),16)/255 };
        } else {
          let num = parseFloat(val);
          if (!isNaN(num) && /^-?[\\d.]+(px|rem|em|%)?$/.test(val)) {
            type = 'FLOAT';
            if (val.endsWith('rem') || val.endsWith('em')) num *= 16;
            finalVal = num;
          }
        }

        const varName = name.replace('khor-', '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('/');
        let v = figma.variables.getLocalVariables().find(v => v.name === varName && v.variableCollectionId === collection.id);
        
        if (!v) v = figma.variables.createVariable(varName, collection.id, type);
        v.setValueForMode(lightModeId, finalVal);
        const darkValue = darkTokens[name] ? darkTokens[name].trim() : lightTokens[name].trim();
        const parsedDark = parseVal(darkValue);
        v.setValueForMode(dModeId, parsedDark.v);
        count++;
      } catch (e) { console.error('Error en token:', name, e); }
    }
    figma.notify('✅ Sincronización terminada: ' + count + ' tokens');
  } catch (err) {
    figma.notify('❌ Error en Sync: ' + err.message);
    console.error(err);
  }
}

async function populateFoundations() {
  const collection = figma.variables.getLocalVariableCollections().find(c => c.name === 'Khor v6.0 Core');
  if (!collection) return figma.notify('❌ Sync Tokens primero');
  
  const vars = figma.variables.getLocalVariables().filter(v => v.variableCollectionId === collection.id);
  figma.notify('📊 Encontrados ' + vars.length + ' variables en Figma');
  
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });

  const cats = [
    { n: 'Colors', f: 'COLOR' },
    { n: 'Typography', f: 'FLOAT' }, // Simplificado para probar
    { n: 'Shadows', f: 'STRING' }
  ];

  for (const cat of cats) {
    let p = figma.root.children.find(page => page.name.includes(cat.n)) || figma.createPage();
    p.name = '💎 Foundations / ' + cat.n; figma.currentPage = p;
    for (const node of p.children) node.remove();

    const filtered = vars.filter(v => v.resolvedType === cat.f);
    if (filtered.length === 0) continue;

    const container = figma.createFrame();
    container.name = "Specs"; container.layoutMode = "VERTICAL"; container.paddingTop = 100; container.itemSpacing = 20;
    container.primaryAxisSizingMode = "AUTO"; container.counterAxisSizingMode = "AUTO";
    p.appendChild(container);

    for (const v of filtered) {
      const txt = figma.createText(); 
      txt.characters = v.name + ": " + JSON.stringify(v.valuesByMode[Object.keys(v.valuesByMode)[0]]);
      container.appendChild(txt);
    }
  }
}
