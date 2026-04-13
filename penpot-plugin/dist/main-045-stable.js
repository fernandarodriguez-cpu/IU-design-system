/**
 * Khor Design System — Elite Expansion Engine
 * v0.4.5-EXPANSION (High Fidelity)
 * Support for: Icons, States (Loading, Disabled), Correct Colors (Navy, Outline)
 */

const ENGINE_VERSION = "0.4.5-EXPANSION";
console.log(`[Khor Engine] Version ${ENGINE_VERSION} Initializing...`);

const COLORS = {
  primary: { bg: "#E04D36", text: "#FFFFFF", token: "primary" },
  secondary: { bg: "#051758", text: "#FFFFFF", token: "secondary" },
  navy: { bg: "#051758", text: "#FFFFFF", token: "navy" },
  outline: { bg: "transparent", text: "#4A5568", border: "#D5DBE0", token: "outline" },
  ghost: { bg: "transparent", text: "#4A5568", token: "ghost" },
  danger: { bg: "#F44336", text: "#FFFFFF", token: "error" },
  success: { bg: "#4CAF50", text: "#FFFFFF", token: "success" },
  warning: { bg: "#FFC107", text: "#FFFFFF", token: "warning" },
  info: { bg: "#2196F3", text: "#FFFFFF", token: "info" },
  processing: { bg: "#0EA5E9", text: "#FFFFFF", token: "processing" },
  default: { bg: "#EDF0F1", text: "#051758", token: "neutral-200" }
};

const SIZES = {
  sm: { h: 32, fz: 12, px: 12 },
  md: { h: 40, fz: 14, px: 16 },
  lg: { h: 48, fz: 16, px: 20 },
  default: { h: 40, fz: 13, px: 16 }
};

const CONFIGS = {
  KButton: { radius: 8 },
  KTag: { radius: 100 },
  KBadge: { radius: 100 }
};

// UI OPEN WITH EXTREME CACHE BUSTER
penpot.ui.open("Khor Design System — Elite", "index.html?v=" + Date.now(), {
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
    let variantConfig = JSON.parse(JSON.stringify(COLORS[variantKey] || COLORS.primary));
    const s = SIZES[props.size] || SIZES.default;
    const config = CONFIGS[type] || CONFIGS.KButton;
    const label = props.label || type;

    // Apply DISABLED style override
    if (props.disabled) {
      variantConfig.bg = "#EDF0F1";
      variantConfig.text = "#A0AEC0";
      variantConfig.border = "";
      variantConfig.token = "neutral-200";
    }

    const bgToken = findToken(variantConfig.token);
    const textToken = findToken("white"); // Default for light text if needed

    // BOARD AS BODY
    const board = penpot.createBoard();
    board.name = `${type} / ${variantKey} / ${props.size}` + (props.disabled ? " (Disabled)" : "");
    
    // Auto-layout centered
    const flex = board.addFlexLayout();
    flex.dir = "row";
    flex.alignItems = "center";
    flex.justifyContent = "center";
    flex.columnGap = 8;
    flex.horizontalSizing = "auto";
    flex.verticalSizing = "fix";
    flex.horizontalPadding = s.px;
    flex.verticalPadding = 0;

    // RESIZE (Min width)
    board.resize(Math.max(80, 0), s.h);
    board.borderRadius = config.radius;

    // BACKGROUND
    if (bgToken) {
      board.fills = [{ fillColor: variantConfig.bg, fillColorRefId: bgToken.id, fillOpacity: 1 }];
    } else if (variantConfig.bg !== "transparent") {
      board.fills = [{ fillColor: variantConfig.bg, fillOpacity: 1 }];
    } else {
      board.fills = [];
    }

    // BORDERS (Outline mode)
    if (variantConfig.border || variantKey === "outline") {
      const borderHex = variantConfig.border || (props.disabled ? "#D5DBE0" : "#D5DBE0");
      board.strokes = [{ strokeColor: borderHex, strokeWidth: 1 }];
    }

    // --- CHILDREN (Ordered by iconPosition) ---

    // 1. Loader / Icon Start
    if (props.loading || (props.showIcon && props.iconPosition === 'start')) {
        const icon = penpot.createEllipse();
        icon.name = props.loading ? "Loading Spinner" : "Icon Start";
        icon.resize(16, 16);
        icon.fills = [{ fillColor: variantConfig.text, fillOpacity: 1 }];
        if (props.loading) {
            icon.strokes = [{ strokeColor: variantConfig.text, strokeWidth: 2, strokeDasharray: "4 4" }];
            icon.fills = [];
        }
        board.appendChild(icon);
    }

    // 2. Text
    const text = penpot.createText(label);
    if (text) {
      board.appendChild(text);
      text.fontSize = s.fz;
      text.fontFamily = "Montserrat";
      text.fontWeight = 600;
      text.fills = [{ fillColor: variantConfig.text, fillOpacity: 1 }];
    }

    // 3. Icon End
    if (!props.loading && props.showIcon && props.iconPosition === 'end') {
        const icon = penpot.createEllipse();
        icon.name = "Icon End";
        icon.resize(16, 16);
        icon.fills = [{ fillColor: variantConfig.text, fillOpacity: 1 }];
        board.appendChild(icon);
    }

    // Position in viewport
    board.x = penpot.viewport.center.x - 40;
    board.y = penpot.viewport.center.y - 20;
    
    penpot.selection = [board];
    penpot.ui.sendMessage({ type: "create-success" });
    
  } catch (err) {
    console.error(`[Khor Engine] Fatal:`, err);
    penpot.ui.sendMessage({ type: "error", message: err.message });
  }
}

penpot.ui.onMessage((msg) => {
  if (msg.type === "create-component") {
    createComponent(msg.component, msg.props);
  } else if (msg.type === "sync-tokens") {
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
