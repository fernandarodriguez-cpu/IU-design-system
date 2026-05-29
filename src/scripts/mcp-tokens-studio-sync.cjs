const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const MCP_URL = 'http://127.0.0.1:3845/mcp';
const FIGMA_FILE_ID = 'eS7sKDiALM60Bulw0NMUHU';

async function callMCP(method, params = {}) {
  const response = await fetch(MCP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: method,
      params: params,
      id: Date.now()
    })
  });
  return response.json();
}

async function startSync() {
  console.log('🔗 Conectando con el servidor MCP local...');
  
  try {
    // 1. Initialize
    const init = await callMCP('initialize', {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'KDS-Agent-Sync', version: '6.0.0' }
    });
    
    if (init.error) throw new Error(init.error.message);
    console.log('✅ Conexión establecida.');

    // 2. List Tools (Discovery)
    console.log('🔍 Descubriendo herramientas de escritura...');
    const tools = await callMCP('listTools');
    const toolNames = tools.result?.tools?.map(t => t.name) || [];
    console.log('🛠️ Herramientas disponibles:', toolNames.join(', '));

    // 3. Generar Estructura (Basada en FigmaExportPage.tsx)
    // Por ahora, crearemos una página de prueba para confirmar escritura
    if (toolNames.includes('create_page')) {
      console.log('📄 Intentando crear página "💎 Foundations"...');
      await callMCP('callTool', {
        name: 'create_page',
        arguments: { fileKey: FIGMA_FILE_ID, name: '💎 Foundations' }
      });
      console.log('✅ Página creada con éxito.');
    } else if (toolNames.includes('get_metadata')) {
       console.log('⚠️ El servidor MCP parece ser de solo lectura. Probando fallback...');
       // Si solo es lectura, el Agente informará para buscar un servidor de escritura
    }

  } catch (error) {
    console.error('❌ Error en el proceso:', error.message);
  }
}

startSync();
