/**
 * Khor Design System — Ultra-Stable Engine
 * v0.4.4-FINAL-STRIKE
 * This file is self-contained.
 */

// FORCE REBOOT
console.log("%c [KHOR ENGINE] BOOTING v0.4.4 FINAL STRIKE ", "background: #E04D36; color: white; font-weight: bold;");

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
  default: { bg: "neutral-500", text: "white" }
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

// UI OPEN WITH EXTREME CACHE BUSTER
const uiBuster = Date.now();
penpot.ui.open("Khor Design System — Elite", "index.html?v=" + uiBuster, {
  width: 360,
  height: 640,
});

function findToken(query) {
  if (!query) return null;
  return penpot.library.local.colors.find(c => 
    c.name.toLowerCase().endsWith(query.toLowerCase()) ||
    c.name.toLowerCase().includes(query.toLowerCase())
  );
}

function createComponent(type, props) {
  try {
    const variantKey = props.variant || props.status || "primary";
    const variantConfig = COLORS[variantKey] || COLORS.primary;
    const s = SIZES[props.size] || SIZES.default;
    const config = CONFIGS[type] || CONFIGS.KButton;
    const label = props.label || type;

    console.log(`[KHOR] Creating ${type} | Variant: ${variantKey} | Size: ${props.size}`);

    const bgToken = findToken(variantConfig.bg);
    const textToken = findToken(variantConfig.text);

    // EL BOARD ES EL CUERPO - NO RECTANGLES
    const board = penpot.createBoard();
    board.name = `${type} / ${variantKey} / ${props.size}`;
    
    // Dimensiones exactas
    const estimatedWidth = Math.max(80, (label.length * 9) + (s.px * 3));
    board.resize(estimatedWidth, s.h);
    board.borderRadius = config.radius;

    // Centrado Flex
    const flex = board.addFlexLayout();
    flex.dir = "column";
    flex.alignItems = "center";
    flex.justifyContent = "center";
    flex.horizontalSizing = "fix";
    flex.verticalSizing = "fix";

    // Fills con RefId + Fallback
    if (bgToken) {
      board.fills = [{ fillColor: "#E04D36", fillColorRefId: bgToken.id, fillOpacity: 1 }];
    } else if (variantConfig.bg !== "transparent") {
      board.fills = [{ fillColor: "#E04D36", fillOpacity: 1 }];
    } else {
      board.fills = [];
    }

    if (variantConfig.border) {
        const borderToken = findToken(variantConfig.border);
        board.strokes = [{ strokeColor: borderToken ? borderToken.id : "#D1D5DB", strokeWidth: 1 }];
    }

    // Texto Centrado
    const text = penpot.createText(label);
    if (text) {
      board.appendChild(text);
      text.fontSize = s.fz;
      text.fontFamily = "Montserrat";
      text.fontWeight = 600;
      
      if (textToken) {
        text.fills = [{ fillColor: "#FFFFFF", fillColorRefId: textToken.id, fillOpacity: 1 }];
      } else {
        text.fills = [{ fillColor: variantConfig.text === "white" ? "#FFFFFF" : "#1F2937", fillOpacity: 1 }];
      }
    }

    console.log(`[KHOR] Component ${board.name} Created Successfully`);
    penpot.ui.sendMessage({ type: "create-success" });
    
  } catch (err) {
    console.error("[KHOR ERROR]", err);
    penpot.ui.sendMessage({ type: "error", message: err.message });
  }
}

penpot.ui.onMessage((msg) => {
  if (msg.type === "create-component") {
    createComponent(msg.component, msg.props);
  } else if (msg.type === "sync-tokens") {
     // Token sync logic
     let count = 0;
     msg.tokens.colors && Object.entries(msg.tokens.colors).forEach(([name, data]) => {
         const hex = data.$value;
         if (!hex || hex.startsWith("{")) return;
         const khorName = "Khor DS / " + name.replace(/-/g, " / ");
         if (!penpot.library.local.colors.find(c => c.name === khorName)) {
             const nc = penpot.library.local.createColor();
             nc.name = khorName; nc.color = hex; count++;
         }
     });
     penpot.ui.sendMessage({ type: "sync-success", stats: { total: count } });
  }
});
