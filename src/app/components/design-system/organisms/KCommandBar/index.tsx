import React, { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { Search, History, Sparkles, ChevronRight, Command as CommandIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { cn } from '@/utils/cn';
import { KModal } from '../KModal';

import { searchIndex, SearchItem } from '../../../../metadata/search-index';

/* ─── Hook ──────────────────────────────────── */
export function useCommandBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return { open, setOpen };
}

// Convert search index to command items
const commands: SearchItem[] = searchIndex;

/* ─── Component ─────────────────────────────── */
/**
 * @figma-mcp-migration
 * Component: KCommandBar
 * 
 * INSTRUCCIONES PARA AGENTES DE IA (VS Code / MCP):
 * Para migrar este componente a Figma, NO generar una matriz multiplicando todas las variables.
 * Utilizar Figma Component Properties V2 con la siguiente estructura:
 * 
 * 1. Variants (Estructurales):
 *    - Definir variantes puramente visuales/estructurales.
 * 2. Booleans (Encendido/Apagado):
 *    - Definir encendido/apagado para iconos o estados (isLoading, hasIcon).
 * 3. Color Variables (No usar variantes para colores semánticos):
 *    - El relleno/borde debe usar Figma Variables (Khor v6.0 Colors) asignado dinámicamente.
 *    - El consumidor del UI Kit cambiará el color del layer.
 */
export function KCommandBar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [recents, setRecents] = useState<SearchItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('khor_command_recents');
    if (saved) setRecents(JSON.parse(saved));
  }, [open]);

  const handleSelect = (item: SearchItem) => {
    if (item.url.startsWith('#action:')) {
      const action = item.url.replace('#action:', '');
      switch (action) {
        case 'toggle-dark':
          document.documentElement.classList.toggle('dark');
          break;
        case 'export-ai':
          navigate('/ai-export');
          break;
        case 'clear-history':
          setRecents([]);
          localStorage.removeItem('khor_command_recents');
          break;
      }
      onClose();
      return;
    }

    if (item.url) navigate(item.url);
    const newRecents = [item, ...recents.filter(r => r.id !== item.id)].slice(0, 5);
    setRecents(newRecents);
    localStorage.setItem('khor_command_recents', JSON.stringify(newRecents));
    onClose();
  };

  return (
    <Command.Dialog 
      open={open} 
      onOpenChange={onClose}
      className={cn(
        "fixed left-[50%] top-[50%] z-[9999] w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-2xl border border-khor-slate-200 bg-white shadow-khor-xl font-primary text-khor-neutral-900 transition-all",
        "focus-within:ring-2 focus-within:ring-khor-primary/20 focus-within:border-khor-primary/50",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
      )}
      overlayClassName="fixed inset-0 z-[9999] bg-khor-brand-navy/60 backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      <div className="flex items-center border-b border-khor-slate-100 px-6 py-1">
        <Search className="mr-3 h-6 w-6 shrink-0 text-khor-primary opacity-70" />
        <Command.Input 
          className="flex h-16 w-full bg-transparent py-4 text-lg outline-none border-none ring-0 focus:ring-0 placeholder:text-khor-neutral-400 text-khor-neutral-900" 
          placeholder="¿Qué estás buscando? (ej. Componentes, Tokens...)" 
        />
        <div className="ml-4 flex shrink-0 items-center justify-center rounded-lg border border-khor-slate-200 bg-khor-slate-50 px-3 py-1 text-[10px] font-black text-khor-neutral-400 shadow-sm uppercase tracking-tighter">
          ESC
        </div>
      </div>
      
      <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden px-2 py-3">
        <Command.Empty className="py-14 text-center text-sm">
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-khor-neutral-300" />
          <p className="text-khor-neutral-600">No se encontraron resultados.</p>
          <p className="text-xs text-khor-neutral-400 mt-1">Prueba buscando por nombre de componente o token.</p>
        </Command.Empty>
        
        {recents.length > 0 && (
          <Command.Group heading="Recientes" className="overflow-hidden px-1 text-khor-neutral-900 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-khor-neutral-500">
            {recents.map(item => (
              <CommandRow key={item.id} item={item} onSelect={() => handleSelect(item)} />
            ))}
          </Command.Group>
        )}

        <Command.Group heading="Resultados" className="overflow-hidden px-1 text-khor-neutral-900 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-khor-neutral-500">
          {commands.map(item => (
            <CommandRow key={item.id} item={item} onSelect={() => handleSelect(item)} />
          ))}
        </Command.Group>
      </Command.List>

      <div className="flex items-center gap-4 border-t border-khor-slate-100 bg-khor-slate-50 px-4 py-3 text-xs text-khor-neutral-500">
        <div className="flex items-center gap-1.5">
          <kbd className="rounded border bg-khor-neutral-200 px-1.5 py-0.5 font-bold">↑↓</kbd> 
          <span>Navegar</span>
        </div>
        <div className="flex items-center gap-1.5">
          <kbd className="rounded border bg-khor-neutral-200 px-1.5 py-0.5 font-bold">ENTER</kbd> 
          <span>Seleccionar</span>
        </div>
      </div>
    </Command.Dialog>
  );
}

function CommandRow({ item, onSelect }: { item: SearchItem; onSelect: () => void }) {
  return (
    <Command.Item
      value={`${item.title} ${item.description} ${item.category} ${item.keywords?.join(' ')}`}
      onSelect={onSelect}
      className="relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-2 py-2 text-sm outline-none data-[selected='true']:bg-khor-slate-100 data-[selected='true']:text-khor-primary text-khor-neutral-700 my-1 transition-all"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-khor-slate-200 bg-white text-khor-primary group-data-[selected='true']:border-khor-primary shadow-khor-sm">
        <ChevronRight className="h-4 w-4" />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="font-medium text-khor-neutral-900">{item.title}</span>
          <span className={cn(
            "rounded-full px-1.5 py-0.5 text-[10px] uppercase font-bold",
            item.category === 'Tool' ? "bg-khor-primary/10 text-khor-primary" : 
            item.category === 'Pattern' ? "bg-purple-100 text-purple-600" :
            item.category === 'Action' ? "bg-amber-100 text-amber-600" :
            "bg-khor-slate-100 text-khor-neutral-600"
          )}>
            {item.category}
          </span>
        </div>
        {item.description && (
          <span className="text-xs text-khor-neutral-500">
            {item.description}
          </span>
        )}
      </div>
    </Command.Item>
  );
}

export function KCommandBarPreview() {
  const { open, setOpen } = useCommandBar();
  return (
    <div className="text-center py-10 border border-khor-slate-200 rounded-xl bg-khor-slate-50">
      <button 
        onClick={() => setOpen(true)} 
        className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-medium border border-khor-slate-200 shadow-khor-sm hover:bg-khor-slate-50 transition-all text-khor-neutral-900 font-primary active:scale-[0.98]"
      >
        <CommandIcon className="h-4 w-4 text-khor-neutral-500" />
        Abrir Busqueda Global (⌘K)
      </button>
      <KCommandBar open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default KCommandBar;
