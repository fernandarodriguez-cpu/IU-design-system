/**
 * Khor Design System — Ultra-Stable Engine
 * v0.4.3-LEGACY-SOLID
 * Fixes: Board as Body, Exact Sizing, Center Alignment
 */

const ENGINE_VERSION = "0.4.3-LEGACY-SOLID";

const COLORS = {
  primary: { bg: "primary", text: "white" },
  secondary: { bg: "secondary", text: "white" },
  outline: { bg: "transparent", text: "primary", border: "primary" },
  ghost: { bg: "transparent", text: "primary" },
  danger: { bg: "error-600", text: "white" },
  navy: { bg: "secondary", text: "white" },
  success: { bg: "success", text: "white" },
  error: { bg: "error", text: "white" },
  warning: { bg: "warning", text: "white" },
  info: { bg: "info", text: "white" },
  processing: { bg: "processing", text: "white" },
  default: { bg: "neutral-500", text: "neutral-900" }
};

const SIZES = {
  small: { h: 32, fz: 12, px: 12 },
  middle: { h: 40, fz: 14, px: 16 },
  large: { h: 48, fz: 16, px: 20 },
  default: { h: 40, fz: 13, px: 16 }
};

const CONFIGS = {
  KButton: { radius: 8 },
  KTag: { radius: 100 },
  KBadge: { radius: 100 }
};

penpot.ui.open("Khor Design System — Elite", "index.html?v=" + Date.now(), {
  width: 360,
  height: 640,
});

function findToken(query) {
  if (!query) return null;
  const colors = penpot.library.local.colors;
  const found = colors.find(c => 
    c.name.toLowerCase().endsWith(query.toLowerCase()) ||
    c.name.toLowerCase().includes(query.toLowerCase())
  );
  return found;
}

function createComponent(type, props) {
  try {
    const config = CONFIGS[type] || CONFIGS.KButton;
    const variantKey = props.variant || props.status || "primary";
    const variantColors = COLORS[variantKey] || COLORS.primary;
    const s = SIZES[props.size] || SIZES.default;
    const label = props.label || type;

    const bgToken = findToken(variantColors.bg);
    const textToken = findToken(variantColors.text);

    // 1. EL BOARD ES EL BOTÓN (Estrategia Directa)
    const board = penpot.createBoard();
    board.name = `${type} / ${variantKey} / ${props.size}`;
    
    // Dimensiones
    const estimatedWidth = Math.max(80, (label.length * 8) + (s.px * 3));
    board.resize(estimatedWidth, s.h);
    board.borderRadius = config.radius;

    // ALINEACIÓN TOTAL
    const flex = board.addFlexLayout();
    flex.dir = "column"; 
    flex.alignItems = "center";
    flex.justifyContent = "center";
    flex.horizontalSizing = "fix"; // Forzamos el tamaño calculado
    flex.verticalSizing = "fix";

    // COLOR (FIXED: Usando fillColorRefId)
    if (bgToken) {
      board.fills = [{
        fillColor: "#E04D36", 
        fillColorRefId: bgToken.id,
        fillOpacity: 1
      }];
    } else if (variantColors.bg !== "transparent") {
      board.fills = [{
        fillColor: "#E04D36",
        fillOpacity: 1
      }];
    } else {
      board.fills = [];
    }

    if (variantColors.border) {
      const borderToken = findToken(variantColors.border);
      board.strokes = [{
        strokeColor: borderToken ? borderToken.id : "#D1D5DB",
        strokeWidth: 1
      }];
    }

    // 2. TEXTO CENTRADO
    const text = penpot.createText(label);
    if (text) {
      board.appendChild(text);
      text.fontSize = s.fz;
      text.fontFamily = "Montserrat";
      text.fontWeight = 600;
      
      if (textToken) {
        text.fills = [{
          fillColor: "#FFFFFF",
          fillColorRefId: textToken.id,
          fillOpacity: 1
        }];
      } else {
        text.fills = [{
          fillColor: variantColors.text === "white" ? "#FFFFFF" : "#1F2937",
          fillOpacity: 1
        }];
      }
    }

    // Centrar en Viewport
    board.x = penpot.viewport.center.x - (board.width / 2);
    board.y = penpot.viewport.center.y - (board.height / 2);
    
    penpot.selection = [board];
    penpot.ui.sendMessage({ type: "create-success" });
    
  } catch (err) {
    penpot.ui.sendMessage({ type: "error", message: err.message });
  }
}

penpot.ui.onMessage((msg) => {
  if (msg.type === "sync-tokens") {
    const tokens = msg.tokens;
    let count = 0;
    for (const [name, data] of Object.entries(tokens.colors)) {
      const hex = data.$value;
      if (!hex || hex.startsWith("{")) continue;
      const khorName = "Khor DS / " + name.replace(/-/g, " / ");
      if (!penpot.library.local.colors.find(c => c.name === khorName)) {
        const newColor = penpot.library.local.createColor();
        newColor.name = khorName;
        newColor.color = hex;
        count++;
      }
    }
    penpot.ui.sendMessage({ type: "sync-success", stats: { total: count } });
  } else if (msg.type === "create-component") {
    createComponent(msg.component, msg.props);
  }
});
