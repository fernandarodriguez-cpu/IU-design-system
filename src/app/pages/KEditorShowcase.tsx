/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR EDITOR SHOWCASE — Prototype          ║
 * ║  High-Fidelity Rich Text Experience       ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { useState } from 'react';
import { KEditor } from '../components/design-system/organisms/KEditor';
import { KText, KBadge, KButton } from '../components/design-system/atoms';
import { Sparkles, Save, Share2, Eye } from 'lucide-react';

export function KEditorShowcase() {
  const [content, setContent] = useState('<h1>Khor Design System</h1><p>Bienvenido al futuro de la edición SaaS.</p>');

  return (
    <div className="py-12 space-y-12 max-w-[1200px] mx-auto px-6">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <KBadge label="New Organism" color="purple" />
          <KText variant="display-1" className="font-black italic">KEditor <span className="text-khor-primary not-italic">Pro</span></KText>
          <KText variant="body-lg" className="max-w-2xl opacity-60">
            Un editor de texto enriquecido diseñado para la creación de contenido moderno con una interfaz minimalista y potente.
          </KText>
        </div>
        
        <div className="flex gap-2">
          <KButton variant="outline" icon={<Eye size={18} />}>Previsualizar</KButton>
          <KButton variant="primary" icon={<Save size={18} />}>Guardar Cambios</KButton>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* EDITOR AREA */}
        <div className="col-span-8 space-y-6">
          <KEditor 
            initialValue={content}
            onChange={setContent}
            minHeight={500}
          />
        </div>

        {/* SIDEBAR / INFO */}
        <aside className="col-span-4 space-y-6">
          <div className="khor-glass p-8 rounded-[2.5rem] border border-khor-border-default space-y-6">
            <div className="flex items-center gap-3">
              <Sparkles className="text-khor-primary" />
              <KText variant="h4" className="font-bold">IA Assistant</KText>
            </div>
            
            <KText variant="small" className="opacity-60 leading-relaxed">
              El editor está optimizado para trabajar con nuestro sistema de tokens, asegurando que el contenido mantenga la consistencia visual de KDS.
            </KText>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-khor-primary/5 border border-khor-primary/10">
                <KText variant="small" className="font-bold text-khor-primary">Tip Profesional</KText>
                <KText variant="small" className="opacity-70 mt-1">
                  Usa H1 y H2 para estructurar tu documento para SEO.
                </KText>
              </div>
            </div>

            <KButton block variant="secondary" icon={<Share2 size={18} />}>Compartir Borrador</KButton>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-khor-neutral-900 text-white space-y-4 shadow-2xl">
            <KText variant="h4" className="font-bold">Propiedades HTML</KText>
            <div className="bg-black/30 p-4 rounded-xl font-mono text-[10px] overflow-x-auto">
              {content}
            </div>
            <KText variant="small" className="opacity-40 italic">Salida lista para inyectar en bases de datos.</KText>
          </div>
        </aside>
      </div>
    </div>
  );
}
