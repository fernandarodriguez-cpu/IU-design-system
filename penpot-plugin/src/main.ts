/**
 * Khor Design System — Penpot Plugin
 * v0.3.0 - Elite Expansion Engine
 */

// --- CONFIGURACIÓN DE UI ---
const cacheBuster = `?v=${Date.now()}`;
penpot.ui.open("Khor Design System", "index.html" + cacheBuster, {
  width: 360,
  height: 640,
});

// --- CONSTANTES Y CONFIGURACIÓN ---
const ENGINE_VERSION = "0.3.0";

const BUTTON_VARIANTS: any = {
  // Common
  primary: { bg: "primary", text: "white" },
  secondary: { bg: "secondary", text: "white" },
  outline: { bg: "transparent", text: "primary", border: "primary" },
  ghost: { bg: "transparent", text: "primary" },
  danger: { bg: "error-600", text: "white" },
  navy: { bg: "secondary", text: "white" },
  // States
  success: { bg: "success", text: "white" },
  error: { bg: "error", text: "white" },
  warning: { bg: "warning", text: "white" },
  info: { bg: "info", text: "white" },
  processing: { bg: "processing", text: "white" },
  default: { bg: "neutral-500", text: "white" }
};

const COMPONENT_CONFIGS: any = {
  KButton: {
    padding: { small: [8, 4], middle: [16, 8], large: [24, 12] },
    fz: { small: 12, middle: 14, large: 16 },
    radius: 6
  },
  KTag: {
    padding: { small: [8, 2], middle: [10, 4], large: [12, 6] },
    fz: { small: 11, middle: 12, large: 14 },
    radius: 999
  },
  KBadge: {
    padding: { small: [4, 4], middle: [6, 6], large: [8, 8] },
    fz: { small: 9, middle: 10, large: 11 },
    radius: 999
  }
};

// --- UTILIDADES ---
function hexToRGBA(hex: string) {
  let r = 0, g = 0, b = 0, a = 1;
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16) / 255;
    g = parseInt(hex[1] + hex[1], 16) / 255;
    b = parseInt(hex[2] + hex[2], 16) / 255;
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16) / 255;
    g = parseInt(hex.substring(2, 4), 16) / 255;
    b = parseInt(hex.substring(4, 6), 16) / 255;
  }
  return { r, g, b, a };
}

// --- LÓGICA DE SINCRONIZACIÓN ---
function syncKhorTokens(tokens: any) {
  try {
    if (!tokens || !tokens.colors) return;
    const localColors = penpot.library.local.colors;
    
    let created = 0;
    let updated = 0;

    for (const [name, data] of Object.entries(tokens.colors)) {
      // FIX v0.3.0: Usar $value para compatibilidad con el nuevo JSON
      const hexValue = (data as any).$value;
      if (!hexValue || hexValue.startsWith('{') || hexValue === 'transparent') continue;

      const rgba = hexToRGBA(hexValue);
      const khorName = `Khor DS / ${name.replace(/-/g, ' / ')}`;
      
      const existing = localColors.find(c => c.name === khorName);

      if (existing) {
        existing.color = rgba;
        updated++;
      } else {
        const newColor = penpot.library.local.createColor();
        newColor.name = khorName;
        newColor.color = rgba;
        created++;
      }
    }

    penpot.ui.sendMessage({ 
      type: "sync-success", 
      stats: { created, updated, total: created + updated } 
    });
  } catch (error) {
    console.error("Sync Error:", error);
    penpot.ui.sendMessage({ type: "error", message: "Error de sincronización" });
  }
}

// --- FACTORY UNIVERSAL DE COMPONENTES ---
function createKhorComponent(type: string, props: any) {
  try {
    const config = COMPONENT_CONFIGS[type];
    const variantKey = props.variant || props.status || 'primary';
    const variantColors = BUTTON_VARIANTS[variantKey] || BUTTON_VARIANTS.primary;
    const [px, py] = config.padding[props.size] || config.padding.middle;
    const fz = config.fz[props.size] || config.fz.middle;

    const localColors = penpot.library.local.colors;
    
    // Búsqueda de tokens (mejorada para el nuevo nesting)
    const findToken = (search: string) => {
      const parts = search.split('/');
      const lastPart = parts[parts.length - 1].toLowerCase();
      return localColors.find(c => c.name.toLowerCase().endsWith(lastPart));
    };

    const bgToken = findToken(variantColors.bg);
    const textToken = findToken(variantColors.text);

    console.log(`Buscando tokens para: bg=${variantColors.bg}, text=${variantColors.text}`);
    if (bgToken) console.log(`Token BG encontrado: ${bgToken.name} (${bgToken.id})`);

    const boardNode = penpot.createBoard();
    boardNode.name = `${type} / ${props.variant || props.status || 'default'} / ${props.size}`;
    
    // Auto-layout en el Board
    const flex = boardNode.addFlexLayout();
    flex.dir = "column"; 
    flex.alignItems = "center";
    flex.justifyContent = "center";
    flex.horizontalPadding = 0;
    flex.verticalPadding = 0;
    flex.horizontalSizing = 'auto';
    flex.verticalSizing = 'auto';

    // Rectángulo de fondo (Cuerpo del Átomo)
    const rect = penpot.createRectangle();
    rect.name = "Body";
    rect.resize(80, 40); // Base incremental
    rect.borderRadius = config.radius;
    
    // Estilo del cuerpo
    if (bgToken) {
      rect.fills = [{ 
        fillColor: "#E04D36", // Fallback visible
        fillColorRefId: bgToken.id,
        fillOpacity: 1
      }]; 
    } else if (variantColors.bg !== "transparent") {
      rect.fills = [{ 
        fillColor: "#E04D36",
        fillOpacity: 1
      }]; 
    } else {
      rect.fills = []; // Ghost/Transparent
    }

    if (variantColors.border) {
      const borderToken = findToken(variantColors.border);
      rect.strokes = [{
        strokeColor: borderToken ? borderToken.id : "#e0e0e0",
        strokeWidth: 1
      }];
    }

    boardNode.appendChild(rect);

    // Texto (Encima del rectángulo)
    const textNode = penpot.createText(props.label || type);
    if (textNode) {
      rect.appendChild(textNode); // Meterlo dentro del rect para layout relativo si es posible, o sobre el board
      // Nota: En Penpot, si el board tiene flex, los hijos se alinean.
      // Re-ubicamos el texto al board para que el flex lo centre
      boardNode.appendChild(textNode);
      
      textNode.fontSize = fz;
      textNode.fontFamily = "Montserrat";
      textNode.fontWeight = 600;
      
      if (textToken) {
        textNode.fills = [{ 
          fillColor: "#ffffff",
          fillColorRefId: textToken.id,
          fillOpacity: 1
        }];
      } else {
        textNode.fills = [{ 
          fillColor: variantColors.text === "white" ? "#FFFFFF" : "#333333",
          fillOpacity: 1
        }];
      }
    }

    // Centrar en Viewport
    boardNode.x = penpot.viewport.center.x - 50;
    boardNode.y = penpot.viewport.center.y - 25;
    
    penpot.selection = [boardNode];

    return true;
  } catch (err) {
    console.error("Factory Error:", err);
    throw err;
  }
}

// --- GESTIÓN DE MENSAJES ---
penpot.ui.onMessage((message) => {
  switch (message.type) {
    case "sync-tokens":
      syncKhorTokens(message.tokens);
      break;
    case "create-component":
      try {
        createKhorComponent(message.component, message.props);
        penpot.ui.sendMessage({ type: "create-success" });
      } catch (e: any) {
        penpot.ui.sendMessage({ type: "error", message: e.message });
      }
      break;
  }
});
