/**
 * Khor Design System — Sync Engine v5.1.5
 * Optimized for local manifest import (Pro/Free plans)
 */

figma.showUI(__html__, { width: 340, height: 480, title: "Khor DS v5 Sync" });

const log = (msg: string) => figma.ui.postMessage({ type: 'log', message: msg });

const hexToRgb = (hex: any) => {
    if (!hex || typeof hex !== 'string') return { r: 1, g: 1, b: 1 };
    hex = hex.replace('#', '');
    if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    return {
        r: parseInt(hex.substring(0, 2), 16) / 255,
        g: parseInt(hex.substring(2, 4), 16) / 255,
        b: parseInt(hex.substring(4, 6), 16) / 255
    };
};

figma.ui.onmessage = async (msg) => {
    if (msg.type === 'import-manifest') {
        try {
            const { manifest } = msg;
            log(`📦 Importando ${manifest.variables.length} variables...`);

            // 1. Obtener o crear colección
            let coll = figma.variables.getLocalVariableCollections().find(c => c.name === manifest.collectionName) ||
                       figma.variables.createVariableCollection(manifest.collectionName);

            // 2. Asegurar modos Light y Dark
            if (coll.modes.length < 2) coll.addMode("Dark");
            const lightModeId = coll.modes[0].modeId;
            const darkModeId = coll.modes[1].modeId;
            coll.renameMode(lightModeId, "Light");
            coll.renameMode(darkModeId, "Dark");

            // 3. Sincronizar variables
            let created = 0;
            let updated = 0;

            for (const v of manifest.variables) {
                // Convertimos khor-primary a Khor/Primary
                const namePath = v.name
                    .replace('khor-', '')
                    .split('-')
                    .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
                    .join('/');

                let variable = figma.variables.getLocalVariables().find(vn => vn.name === namePath && vn.variableCollectionId === coll.id);
                
                if (!variable) {
                    variable = figma.variables.createVariable(namePath, coll.id, v.type);
                    created++;
                } else {
                    updated++;
                }

                if (v.type === 'COLOR') {
                    variable.setValueForMode(lightModeId, hexToRgb(v.light));
                    variable.setValueForMode(darkModeId, hexToRgb(v.dark));
                } else {
                    variable.setValueForMode(lightModeId, v.light);
                    variable.setValueForMode(darkModeId, v.dark);
                }
            }

            log(`✅ Éxito: ${created} creadas, ${updated} actualizadas.`);
        } catch (err) {
            log(`❌ Error: ${err}`, 'error');
        }
    }

    if (msg.type === 'nuke-tokens') {
        const collections = figma.variables.getLocalVariableCollections();
        let count = 0;
        for (const c of collections) {
            if (c.name.includes('Khor')) {
                c.remove();
                count++;
            }
        }
        log(`🧹 Limpieza completa: ${count} colecciones eliminadas.`);
    }
};
