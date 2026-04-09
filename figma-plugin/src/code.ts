import { khorMetadata } from './metadata';
import { khorTokensEcosystem } from './tokens';

/**
 * Khor Design System Sync — ADV07 v8.2
 * Modular Synthesis Engine: Montserrat Edition.
 */

figma.showUI(__html__, { width: 400, height: 750, title: "Khor DS — v8.2 Montserrat" });

const log = (msg: string) => figma.ui.postMessage({ type: 'log', message: msg });
const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- CONSTANTS ---
const NAVY_RGB = { r: 5/255, g: 23/255, b: 88/255 };
const WHITE_RGB = { r: 1, g: 1, b: 1 };

// --- UTILS ---
const hexToRgb = (hex: string) => {
    try {
        if (!hex) return WHITE_RGB;
        hex = hex.replace('#', '').trim();
        if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        return { 
            r: parseInt(hex.substring(0, 2), 16) / 255, 
            g: parseInt(hex.substring(2, 4), 16) / 255, 
            b: parseInt(hex.substring(4, 6), 16) / 255 
        };
    } catch(e) { return WHITE_RGB; } 
};

// --- ICON RESOLVER ---
async function findIcon(name: string): Promise<SceneNode | null> {
    const iconPage = figma.root.children.find(c => c.name.toLowerCase().includes("icon"));
    if (!iconPage) return null;
    
    const searchName = name.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`).replace(/^-/, '').toLowerCase();
    const iconNode = iconPage.findOne(n => n.name.toLowerCase() === name.toLowerCase() || n.name.toLowerCase() === searchName);
    
    if (iconNode && 'clone' in iconNode) {
        return iconNode.clone();
    }
    return null;
}

// --- KHOR BUILDER CLASS ---
class KhorBuilder {
    static getVar(name: string) {
        return figma.variables.getLocalVariables().find(v => v.name === name);
    }

    static getCollection() {
        return figma.variables.getLocalVariableCollections().find(c => c.name === "Khor Tokens");
    }

    static forceLightMode(node: SceneNode) {
        const coll = this.getCollection();
        if (coll && 'explicitVariableModes' in node) {
            const lightMode = coll.modes.find(m => m.name === "Light");
            if (lightMode) {
                node.setExplicitVariableMode(coll.id, lightMode.modeId);
            }
        }
    }

    static createFrame(parent: BaseReferenceNode, name: string, options: { 
        layout?: 'HORIZONTAL' | 'VERTICAL', 
        padding?: number | [number, number],
        gap?: number,
        bg?: string,
        radius?: number,
        align?: 'CENTER' | 'MIN' | 'MAX',
        border?: string,
        borderWeight?: number
    } = {}) {
        const frame = figma.createFrame();
        frame.name = name;
        if (options.layout) {
            frame.layoutMode = options.layout;
            frame.primaryAxisAlignItems = options.align || 'MIN';
            frame.counterAxisAlignItems = options.align || 'MIN';
            if (options.gap !== undefined) frame.itemSpacing = options.gap;
            if (options.padding) {
               if (Array.isArray(options.padding)) {
                   frame.paddingLeft = frame.paddingRight = options.padding[0];
                   frame.paddingTop = frame.paddingBottom = options.padding[1];
               } else {
                   frame.paddingLeft = frame.paddingRight = frame.paddingTop = frame.paddingBottom = options.padding;
               }
            }
        }
        if (options.radius) frame.cornerRadius = options.radius;
        if (options.bg) {
            const v = this.getVar(`Khor / Colors / ${options.bg}`);
            if (v) this.bindColor(frame, 'fills', v.id, NAVY_RGB);
            else frame.fills = [{ type: 'SOLID', color: hexToRgb(options.bg) }];
        }
        if (options.border) {
            frame.strokeWeight = options.borderWeight || 1;
            const v = this.getVar(`Khor / Colors / ${options.border}`);
            if (v) this.bindColor(frame, 'strokes', v.id, NAVY_RGB);
            else frame.strokes = [{ type: 'SOLID', color: hexToRgb(options.border) }];
        }

        this.forceLightMode(frame);
        (parent as any).appendChild(frame);
        return frame;
    }

    static bindColor(node: DefaultShapeMixin | FrameNode | TextNode, prop: 'fills' | 'strokes', variableId: string, fallbackRGB: RGB) {
        try {
            const paints: SolidPaint[] = [{ type: 'SOLID', color: fallbackRGB }];
            (node as any)[prop] = paints;
            const boundPaint = figma.variables.setBoundVariableForPaint(paints[0], 'color', variableId);
            (node as any)[prop] = [boundPaint];
            return true;
        } catch (e) { return false; }
    }

    static async createText(parent: FrameNode, content: string, options: { size?: number, bold?: boolean, color?: string } = {}) {
        const text = figma.createText();
        const font = { family: "Montserrat", style: options.bold ? "Bold" : "Regular" };
        await figma.loadFontAsync(font);
        text.fontName = font;
        text.characters = content;
        if (options.size) text.fontSize = options.size;
        if (options.color) {
            const v = this.getVar(`Khor / Colors / ${options.color}`);
            if (v) this.bindColor(text, 'fills', v.id, {r: 1, g: 1, b: 1});
        }
        parent.appendChild(text);
        return text;
    }

    static async applyMontserrat(node: TextNode) {
        const families = ["Raleway", "Inter", "Roboto", "Open Sans", "Plus Jakarta Sans", "Poppins"];
        const currentFont = node.fontName as FontName;
        if (families.includes(currentFont.family) || true) { // Forzamos Montserrat en casi todo
            const style = currentFont.style || "Regular";
            const newFont = { family: "Montserrat", style: style };
            try {
                await figma.loadFontAsync(newFont);
                node.fontName = newFont;
            } catch(e) {
                const fallback = { family: "Montserrat", style: "Regular" };
                await figma.loadFontAsync(fallback);
                node.fontName = fallback;
            }
        }
    }

    static smartMapColor(rgb: RGB): string | null {
        const { r, g, b } = rgb;
        // Navy Detect (Oscuros con tinte azulado o muy oscuros)
        if (r < 0.15 && g < 0.15 && b < 0.5) return "navy";
        // Primary Detect (Rojizos / Naranjas)
        if (r > 0.7 && g < 0.4 && b < 0.4) return "primary";
        // Success Detect (Verdes)
        if (g > 0.4 && r < 0.3 && b < 0.3) return "success";
        // Neutral Detect (Escala de grises)
        if (Math.abs(r-g) < 0.05 && Math.abs(g-b) < 0.05) {
            if (r > 0.9) return "white";
            if (r < 0.1) return "neutral-900";
            if (r < 0.3) return "neutral-800";
            if (r < 0.6) return "neutral-500";
            return "neutral-200";
        }
        return null;
    }
}

// --- RECIPES ---

async function drawKButton(node: ComponentNode, combo: any) {
    KhorBuilder.forceLightMode(node);
    const variantColors: any = {
        primary: { bg: "primary", fg: "white" },
        secondary: { bg: "neutral-200", fg: "neutral-900" },
        danger: { bg: "error", fg: "white" },
        navy: { bg: "navy", fg: "white" }
    };
    const c = variantColors[combo.variant as string] || variantColors.primary;
    
    node.layoutMode = 'HORIZONTAL';
    node.primaryAxisAlignItems = 'CENTER';
    node.counterAxisAlignItems = 'CENTER';
    node.itemSpacing = 8;
    node.paddingLeft = node.paddingRight = 16;
    node.cornerRadius = 8;
    
    const vB = KhorBuilder.getVar(`Khor / Colors / ${c.bg}`);
    if (vB) KhorBuilder.bindColor(node, 'fills', vB.id, NAVY_RGB);

    if (combo.icon) {
        const icon = await findIcon(combo.icon as string);
        if (icon) {
            node.appendChild(icon);
            if ('fills' in icon) {
                const vF = KhorBuilder.getVar(`Khor / Colors / ${c.fg}`);
                if (vF) KhorBuilder.bindColor(icon as any, 'fills', vF.id, WHITE_RGB);
            }
        }
    }

    await KhorBuilder.createText(node as any, "Button", { bold: true, color: c.fg });
}

async function drawKAvatar(node: ComponentNode, combo: any) {
    KhorBuilder.forceLightMode(node);
    const sM: any = { sm: 32, md: 40, lg: 56, xl: 80 };
    const px = sM[combo.size as string] || 40;
    
    const av = KhorBuilder.createFrame(node, "Avatar_Inner", {
        radius: (combo.shape === 'square' ? 8 : 999),
        bg: 'neutral-200'
    });
    av.resize(px, px);
    av.clipsContent = false;

    const vF = KhorBuilder.getVar("Khor / Colors / neutral-800");
    const text = await KhorBuilder.createText(av, "KH", { bold: true, size: px * 0.4 });
    if (vF) KhorBuilder.bindColor(text, 'fills', vF.id, NAVY_RGB);

    if (combo.status && combo.status !== 'offline') {
        const dot = figma.createEllipse();
        const dS = Math.max(8, px * 0.3); dot.resize(dS, dS);
        dot.strokes = [{ type: 'SOLID', color: WHITE_RGB }]; dot.strokeWeight = 1.5;
        
        const statusMap: any = { online: 'success', away: 'warning', busy: 'error' };
        const vS = KhorBuilder.getVar(`Khor / Colors / ${statusMap[combo.status]}`);
        if (vS) KhorBuilder.bindColor(dot, 'fills', vS.id, { r: 0, g: 1, b: 0 });
        
        av.appendChild(dot);
        dot.x = av.width - dS * 0.7; dot.y = av.height - dS * 0.7;
    }
}

async function drawKInput(node: ComponentNode, combo: any) {
    KhorBuilder.forceLightMode(node);
    node.layoutMode = 'VERTICAL';
    node.itemSpacing = 4;
    node.primaryAxisSizingMode = 'AUTO';
    node.counterAxisSizingMode = 'AUTO';
    node.layoutAlign = 'STRETCH';

    // 1. Label
    await KhorBuilder.createText(node as any, "Label Name", { bold: true, size: 12, color: 'neutral-700' });

    // 2. Input Row
    const row = KhorBuilder.createFrame(node, "Input_Row", {
        layout: 'HORIZONTAL',
        align: 'CENTER'
    });
    row.layoutAlign = 'STRETCH';

    // Addon Before
    if (combo.addonBefore) {
        const addon = KhorBuilder.createFrame(row, "Addon_Before", {
            layout: 'HORIZONTAL',
            padding: [12, 0],
            bg: 'neutral-100',
            border: 'neutral-200'
        });
        addon.strokeWeight = 1;
        await KhorBuilder.createText(addon, "https://", { size: 12, color: 'neutral-600' });
    }

    // Field Wrapper
    const wrapper = KhorBuilder.createFrame(row, "Field_Wrapper", {
        layout: 'HORIZONTAL',
        padding: [12, 10], // px-3 (12px)
        gap: 8,
        radius: 6,
        bg: combo.variant === 'filled' ? 'neutral-100' : 'neutral-50',
        border: combo.status === 'error' ? 'error' : 'neutral-200'
    });
    wrapper.layoutGrow = 1;
    
    if (combo.prefix) {
        const icon = await findIcon("Search");
        if (icon) wrapper.appendChild(icon);
    }

    await KhorBuilder.createText(wrapper, "Placeholder...", { size: 13, color: 'neutral-400' });

    if (combo.addonAfter) {
        const addon = KhorBuilder.createFrame(row, "Addon_After", {
            layout: 'HORIZONTAL',
            padding: [12, 0],
            bg: 'neutral-100',
            border: 'neutral-200'
        });
        await KhorBuilder.createText(addon, ".com", { size: 12, color: 'neutral-600' });
    }

    // 3. Feedback
    if (combo.status === 'error' || combo.helperText) {
        const help = await KhorBuilder.createText(node as any, "Mensaje de feedback informativo", { size: 11, color: combo.status === 'error' ? 'error' : 'neutral-500' });
        help.layoutAlign = 'STRETCH';
    }
}

async function drawKDataTable(node: ComponentNode, combo: any) {
    KhorBuilder.forceLightMode(node);
    node.layoutMode = 'VERTICAL';
    node.cornerRadius = 12;
    node.layoutAlign = 'STRETCH';
    node.clipsContent = true;
    
    const vBorder = KhorBuilder.getVar("Khor / Colors / neutral-200");
    if (vBorder) KhorBuilder.bindColor(node, 'strokes', vBorder.id, {r: 0.9, g: 0.9, b: 0.9});

    // 1. Toolbar
    const toolbar = KhorBuilder.createFrame(node, "Toolbar", {
        layout: 'HORIZONTAL',
        padding: [16, 12],
        bg: 'neutral-50',
        align: 'CENTER',
        gap: 12
    });
    toolbar.layoutAlign = 'STRETCH';
    await KhorBuilder.createText(toolbar, "Vista de Tabla", { bold: true, size: 14, color: 'neutral-900' });

    // 2. Header
    const header = KhorBuilder.createFrame(node, "TableHeader", {
        layout: 'HORIZONTAL',
        padding: [16, 12],
        bg: 'neutral-100',
        border: 'neutral-200'
    });
    header.layoutAlign = 'STRETCH';
    
    const cols = ["Nombre", "Status", "Fecha", "Acciones"];
    for (const col of cols) {
        const cell = KhorBuilder.createFrame(header, `Header_${col}`, { layout: 'HORIZONTAL' });
        cell.layoutGrow = 1;
        await KhorBuilder.createText(cell, col, { bold: true, size: 12, color: 'neutral-500' });
    }

    // 3. Rows
    const drawRow = async (name: string, status: string, isSelected: boolean = false) => {
        const row = KhorBuilder.createFrame(node, `Row_${name}`, {
            layout: 'HORIZONTAL',
            padding: [16, 12],
            bg: isSelected ? 'primary' : 'white',
            border: 'neutral-100'
        });
        row.layoutAlign = 'STRETCH';
        if (isSelected) row.opacity = 0.1; // Mimic primary-light/30
        
        const c1 = KhorBuilder.createFrame(row, "C_Name", { layout: 'HORIZONTAL' }); c1.layoutGrow = 1;
        await KhorBuilder.createText(c1, name, { size: 13, color: 'neutral-900' });
        
        const c2 = KhorBuilder.createFrame(row, "C_Status", { layout: 'HORIZONTAL' }); c2.layoutGrow = 1;
        await KhorBuilder.createText(c2, status, { size: 12, color: status === 'Active' ? 'success' : 'neutral-400' });
        
        const c3 = KhorBuilder.createFrame(row, "C_Date", { layout: 'HORIZONTAL' }); c3.layoutGrow = 1;
        await KhorBuilder.createText(c3, "Apr 08, 2026", { size: 12, color: 'neutral-400' });

        const c4 = KhorBuilder.createFrame(row, "C_Actions", { layout: 'HORIZONTAL' }); c4.layoutGrow = 1;
        const icon = await findIcon("MoreHorizontal"); if (icon) c4.appendChild(icon);
    };

    await drawRow("Dani Khor", "Active", true);
    await drawRow("Deepmind AI", "Processing", false);

    // 4. Pagination
    const footer = KhorBuilder.createFrame(node, "Pagination", {
        layout: 'HORIZONTAL',
        padding: [16, 12],
        bg: 'white',
        align: 'CENTER',
        border: 'neutral-200'
    });
    footer.layoutAlign = 'STRETCH';
    await KhorBuilder.createText(footer, "Página 1 de 10", { size: 12, color: 'neutral-500' });
}

// --- MAIN ENGINE ---

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'ui-ready') figma.ui.postMessage({ type: 'sync-data', data: khorMetadata });
    
    if (msg.type === 'sync-tokens') {
        try {
            log("🔄 Sincronizando Arquitectura Khor (Montserrat Edition)...");
            let coll = figma.variables.getLocalVariableCollections().find(c => c.name === "Khor Tokens") || figma.variables.createVariableCollection("Khor Tokens");
            if (coll.modes.length < 2) coll.addMode("Dark");
            const lId = coll.modes.find(m => m.name === "Light" || m.name === "Mode 1")?.modeId || coll.modes[0].modeId;
            const dId = coll.modes.find(m => m.name === "Dark")?.modeId || coll.modes[1].modeId;
            coll.renameMode(lId, "Light"); coll.renameMode(dId, "Dark");

            for (const [name, values] of Object.entries((khorTokensEcosystem as any).colors)) {
                const path = `Khor / Colors / ${name.replace('khor-', '').trim()}`;
                const v = figma.variables.getLocalVariables().find(vn => vn.name === path) || figma.variables.createVariable(path, coll.id, "COLOR");
                v.setValueForMode(lId, hexToRgb((values as any).light));
                v.setValueForMode(dId, hexToRgb((values as any).dark));
            }

            const dims = [{data:(khorTokensEcosystem as any).spacing,sub:'Spacing'},{data:(khorTokensEcosystem as any).radius,sub:'Radius'},{data:(khorTokensEcosystem as any).breakpoints,sub:'Breakpoints'}];
            dims.forEach(g=>{for(const[n,v]of Object.entries(g.data)){
                const p = `Khor / Dimensions / ${g.sub} / ${n.replace('khor-','').replace(g.sub.toLowerCase()+'-','').replace('space-','')}`;
                const vr = figma.variables.getLocalVariables().find(vn=>vn.name===p) || figma.variables.createVariable(p,coll.id,"FLOAT");
                const num = typeof v==='string'?parseFloat(v):v; if(!isNaN(num)) vr.setValueForMode(lId, num);
            }});
            log("✅ Sincronización completada.");
        } catch (e) { log("❌ Sync Error: " + e); }
    }

    if (msg.type === 'nuke-tokens') {
        log("☢️ Nuke: Limpiando colecciones antiguos...");
        figma.variables.getLocalVariableCollections().forEach(c => {
            if (c.name === "Khor Tokens") c.remove();
        });
        log("🧹 Limpieza completada.");
    }

    if (msg.type === 'insert-component') {
        try {
            const { component } = msg; log(`🚀 Sintetizando ${component.name} (v8.2)...`);
            const pN = `[v8.2] ${component.name}`;
            const page = figma.root.children.find(c => c.name === pN) as PageNode || figma.createPage();
            page.name = pN; figma.currentPage = page;
            
            const pM = component.props.filter((p: any) => p.options?.length > 0);
            const combs = generateCombinations(pM).slice(0, 50);
            const comps: ComponentNode[] = [];
            
            for (const combo of combs) {
                const node = figma.createComponent(); page.appendChild(node);
                node.name = Object.entries(combo).map(([k, v]) => `${k}=${v}`).join(', ');
                
                if (component.name === "KAvatar") await drawKAvatar(node, combo);
                if (component.name === "KButton") await drawKButton(node, combo);
                if (component.name === "KInput") await drawKInput(node, combo);
                if (component.name === "KDataTable") await drawKDataTable(node, combo);
                
                comps.push(node);
            }
            
            if (comps.length > 0) {
                const set = figma.combineAsVariants(comps, page);
                set.name = component.name;
                KhorBuilder.forceLightMode(set);
                figma.viewport.scrollAndZoomIntoView([set]);
                log("🎯 Paridad lograda.");
            }
        } catch (e) { log("❌ Fatal: " + e); }
    }
    
    if (msg.type === 'khorify-selection') {
        const selection = figma.currentPage.selection;
        if (selection.length === 0) { log("⚠️ Selecciona algo primero."); return; }
        
        log(`✨ Iniciando Magic Khor-ify en ${selection.length} nodos...`);
        let processedCount = 0;

        async function processNode(node: SceneNode) {
            processedCount++;
            KhorBuilder.forceLightMode(node);

            // 1. Tipografía
            if (node.type === "TEXT") {
                await KhorBuilder.applyMontserrat(node);
            }

            // 2. Colores (Fills)
            if ("fills" in node && Array.isArray(node.fills)) {
                const fill = node.fills[0];
                if (fill && fill.type === "SOLID") {
                    const token = KhorBuilder.smartMapColor(fill.color);
                    if (token) {
                        const v = KhorBuilder.getVar(`Khor / Colors / ${token}`);
                        if (v) KhorBuilder.bindColor(node as any, 'fills', v.id, fill.color);
                    }
                }
            }

            // 3. Colores (Strokes)
            if ("strokes" in node && Array.isArray(node.strokes)) {
                const stroke = node.strokes[0];
                if (stroke && stroke.type === "SOLID") {
                    const token = KhorBuilder.smartMapColor(stroke.color);
                    if (token) {
                        const v = KhorBuilder.getVar(`Khor / Colors / ${token}`);
                        if (v) KhorBuilder.bindColor(node as any, 'strokes', v.id, stroke.color);
                    }
                }
            }

            // Recurse
            if ("children" in node) {
                for (const child of node.children) {
                    await processNode(child);
                }
            }
        }

        for (const node of selection) { await processNode(node); }
        log(`✅ Khor-ify completado. ${processedCount} nodos procesados.`);
    }
    
    if (msg.type === 'extract-library') {
        const selection = figma.currentPage.selection;
        if (selection.length === 0) { log("⚠️ Selecciona un componente para auditar."); return; }
        
        log("🔍 Extrayendo ADN de diseño...");
        const auditNodes = selection.map(node => {
            const data: any = {
                name: node.name,
                type: node.type,
                properties: {}
            };

            if ("layoutMode" in node && node.layoutMode !== "NONE") {
                data.properties.autoLayout = {
                    mode: node.layoutMode,
                    padding: [node.paddingLeft, node.paddingTop, node.paddingRight, node.paddingBottom],
                    itemSpacing: node.itemSpacing,
                    primaryAlign: node.primaryAxisAlignItems,
                    counterAlign: node.counterAxisAlignItems
                };
            }

            if ("cornerRadius" in node) data.properties.radius = node.cornerRadius;
            if ("strokeWeight" in node) data.properties.borderWeight = node.strokeWeight;
            
            if (node.type === "TEXT") {
                data.properties.text = {
                    fontSize: node.fontSize,
                    fontWeight: (node.fontName as FontName)?.style,
                    characters: node.characters.substring(0, 30)
                };
            }

            return data;
        });

        figma.ui.postMessage({ type: 'display-json', data: JSON.stringify(auditNodes, null, 2) });
        log("✅ Auditoría generada correctamente.");
    }
};

function generateCombinations(props: any[]) {
    let res = [{}]; props.forEach(p => {
        let n: any[] = []; p.options.forEach((o: string) => res.forEach(r => n.push({ ...r, [p.name]: o })));
        res = n;
    }); return res;
}
