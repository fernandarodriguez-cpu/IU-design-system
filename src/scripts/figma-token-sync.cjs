const fs = require('fs');
const path = require('path');

const FIGMA_PAT = process.env.FIGMA_PAT;
const FIGMA_FILE_ID = process.env.FIGMA_FILE_ID || 'eS7sKDiALM60Bulw0NMUHU';

async function syncTokens() {
  if (!FIGMA_PAT) {
    // No salimos con error, solo avisamos que usaremos el modo manifiesto
    console.log('⚠️ FIGMA_PAT no detectado. Se generará solo el manifiesto local.');
  }

  console.log('🎨 Analizando theme.css para extraer tokens complejos...');
  const cssPath = path.join(__dirname, '../styles/theme.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  // Separar bloques :root y .dark
  const rootMatch = cssContent.match(/:root\s*{([^}]+)}/);
  const darkMatch = cssContent.match(/\.dark\s*{([^}]+)}/);

  const rootContent = rootMatch ? rootMatch[1] : '';
  const darkContent = darkMatch ? darkMatch[1] : '';

  const parseTokens = (content) => {
    const tokens = {};
    const regex = /--(khor-[\w-]+):\s*([^;]+);/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const name = match[1];
      const value = match[2].trim();
      tokens[name] = value;
    }
    return tokens;
  };

  const lightTokens = parseTokens(rootContent);
  const darkTokens = parseTokens(darkContent);

  console.log(`✅ Tokens detectados: ${Object.keys(lightTokens).length} (Light), ${Object.keys(darkTokens).length} (Dark overrides).`);

  const hexToRgba = (hex) => {
    if (!hex.startsWith('#')) return null;
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return { r, g, b, a: 1 };
  };

  const parseValue = (val) => {
    if (val.startsWith('#')) return { type: 'COLOR', value: hexToRgba(val) };
    if (/^-?[\d.]+(px|rem|em)$/.test(val)) {
      const num = parseFloat(val);
      return { type: 'FLOAT', value: num };
    }
    const aliasMatch = val.match(/var\(--([\w-]+)\)/);
    if (aliasMatch) {
      return { type: 'ALIAS', name: aliasMatch[1] };
    }
    return null;
  };

  const allTokenNames = Array.from(new Set([...Object.keys(lightTokens), ...Object.keys(darkTokens)]));
  const variablesToCreate = [];

  for (const name of allTokenNames) {
    const lightVal = lightTokens[name];
    const darkVal = darkTokens[name] || lightVal;

    if (!lightVal) continue;

    const parsedLight = parseValue(lightVal);
    const parsedDark = parseValue(darkVal);

    if (parsedLight && parsedLight.type !== 'ALIAS') {
      variablesToCreate.push({
        name,
        type: parsedLight.type,
        light: parsedLight.value,
        dark: parsedDark ? parsedDark.value : parsedLight.value
      });
    }
  }

  // 1. Generar Manifiesto Local (Workflow para Planes Pro)
  const collectionName = 'Khor v6.0 System';
  const manifest = {
    version: '6.0.0',
    generatedAt: new Date().toISOString(),
    collectionName,
    variables: variablesToCreate
  };

  const manifestPath = path.join(__dirname, '../../khor-tokens-manifest.json');
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\n📄 Manifiesto generado en: ${manifestPath}`);
  console.log('💡 Tip: En planes Figma Pro, usa el botón "Import Manifest" en el plugin de Khor y selecciona este archivo.');

  // 2. Intentar Sincronización REST (Solo Enterprise)
  if (!FIGMA_PAT) {
    console.log('\n👋 Finalizado (Modo Manifiesto).');
    return;
  }

  console.log(`\n🚀 Iniciando sincronización REST en archivo ${FIGMA_FILE_ID}...`);
  const headers = { 
    'X-Figma-Token': FIGMA_PAT, 
    'Content-Type': 'application/json' 
  };

  try {
    // Crear o buscar colección
    const collectionResponse = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_ID}/variables`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        variableCollections: [
          { action: 'CREATE', name: collectionName, initialModeId: 'Light' }
        ]
      })
    });

    const collectionData = await collectionResponse.json();
    if (collectionData.error) {
      console.error('❌ Error API (REST):', collectionData.message);
      return;
    }

    const collection = collectionData.meta.variableCollections[0];
    const collectionId = collection.id;
    const lightModeId = collection.modes[0].modeId;

    // Añadir modo Dark
    const modeResponse = await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_ID}/variables`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        variableCollections: [
          { action: 'UPDATE', id: collectionId, addModes: [{ name: 'Dark' }] }
        ]
      })
    });
    const modeData = await modeResponse.json();
    const darkModeId = modeData.meta.variableCollections[0].modes.find(m => m.name === 'Dark').modeId;

    console.log(`✅ Colección "${collectionName}" lista en la nube.`);

    const BATCH_SIZE = 25;
    for (let i = 0; i < variablesToCreate.length; i += BATCH_SIZE) {
      const batch = variablesToCreate.slice(i, i + BATCH_SIZE);
      const variableActions = batch.map(v => ({
        action: 'CREATE',
        name: v.name.replace('khor-', '').split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('/'),
        resolvedType: v.type,
        variableCollectionId: collectionId,
        valuesByMode: {
          [lightModeId]: v.light,
          [darkModeId]: v.dark
        }
      }));

      await fetch(`https://api.figma.com/v1/files/${FIGMA_FILE_ID}/variables`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ variables: variableActions })
      });
      console.log(`📦 Procesado batch ${Math.floor(i/BATCH_SIZE) + 1}...`);
    }
    console.log('🎉 Sincronización REST completa.');
  } catch (e) {
    console.error('❌ Error durante la sincronización REST:', e.message);
  }
}

syncTokens().catch(err => console.error('❌ Error fatal:', err));
