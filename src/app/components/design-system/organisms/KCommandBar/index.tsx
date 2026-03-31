import React, { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { Search, History, Sparkles, ChevronRight, Command as CommandIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { cn } from '../../../../../imports/utils';
import { KModal } from '../KModal';

/* ─── Types ─────────────────────────────────── */
interface CommandItem {
  id: string;
  title: string;
  category: 'Atomo' | 'Molecula' | 'Organismo' | 'Template' | 'Token';
  description?: string;
  keywords?: string[];
  url?: string;
}

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

// Mock Data
const commands: CommandItem[] = [
  // Atoms
  { id: 'btn', title: 'KButton', category: 'Atomo', description: 'Botón con variantes y estados.', keywords: ['boton', 'button', 'click'], url: '/atoms/button' },
  { id: 'inp', title: 'KInput', category: 'Atomo', description: 'Campo de texto básico.', keywords: ['input', 'texto', 'form'], url: '/atoms/input' },
  // ... more mock data could be here
];

/* ─── Component ─────────────────────────────── */
export function KCommandBar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [recents, setRecents] = useState<CommandItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('khor_command_recents');
    if (saved) setRecents(JSON.parse(saved));
  }, [open]);

  const handleSelect = (item: CommandItem) => {
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
        "fixed left-[50%] top-[50%] z-[9999] w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-xl border bg-[var(--khor-surface-page)] shadow-2xl font-primary text-[var(--khor-neutral-900)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
      )}
      overlayClassName="fixed inset-0 z-[9999] bg-[var(--khor-brand-navy)]/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    >
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-5 w-5 shrink-0 opacity-50" />
        <Command.Input 
          className="flex h-14 w-full rounded-md bg-transparent py-3 text-base outline-none disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-[var(--khor-neutral-400)] text-[var(--khor-neutral-900)]" 
          placeholder="¿Qué estás buscando? (ej. Componentes, Tokens...)" 
        />
        <div className="ml-2 flex shrink-0 items-center justify-center rounded-md border border-[var(--khor-neutral-200)] bg-[var(--khor-neutral-100)] px-2 text-xs font-semibold text-[var(--khor-neutral-500)] shadow-sm">
          ESC
        </div>
      </div>
      
      <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden px-2 py-3">
        <Command.Empty className="py-14 text-center text-sm">
          <Sparkles className="mx-auto mb-4 h-8 w-8 text-[var(--khor-neutral-300)]" />
          <p className="text-[var(--khor-neutral-600)]">No se encontraron resultados.</p>
          <p className="text-xs text-[var(--khor-neutral-400)] mt-1">Prueba buscando por nombre de componente o token.</p>
        </Command.Empty>
        
        {recents.length > 0 && (
          <Command.Group heading="Recientes" className="overflow-hidden px-1 text-[var(--khor-neutral-900)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-[var(--khor-neutral-500)]">
            {recents.map(item => (
              <CommandRow key={item.id} item={item} onSelect={() => handleSelect(item)} />
            ))}
          </Command.Group>
        )}

        <Command.Group heading="Resultados" className="overflow-hidden px-1 text-[var(--khor-neutral-900)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-[var(--khor-neutral-500)]">
          {commands.map(item => (
            <CommandRow key={item.id} item={item} onSelect={() => handleSelect(item)} />
          ))}
        </Command.Group>
      </Command.List>

      <div className="flex items-center gap-4 border-t bg-[var(--khor-neutral-50)] px-4 py-3 text-xs text-[var(--khor-neutral-500)]">
        <div className="flex items-center gap-1.5">
          <kbd className="rounded border bg-[var(--khor-neutral-200)] px-1.5 py-0.5 font-bold">↑↓</kbd> 
          <span>Navegar</span>
        </div>
        <div className="flex items-center gap-1.5">
          <kbd className="rounded border bg-[var(--khor-neutral-200)] px-1.5 py-0.5 font-bold">ENTER</kbd> 
          <span>Seleccionar</span>
        </div>
      </div>
    </Command.Dialog>
  );
}

function CommandRow({ item, onSelect }: { item: CommandItem; onSelect: () => void }) {
  return (
    <Command.Item
      value={`${item.title} ${item.description} ${item.category} ${item.keywords?.join(' ')}`}
      onSelect={onSelect}
      className="relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-2 py-2 text-sm outline-none data-[selected='true']:bg-[var(--khor-neutral-100)] data-[selected='true']:text-[var(--khor-neutral-900)] text-[var(--khor-neutral-700)] my-1"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--khor-neutral-200)] bg-[var(--khor-surface-page)] text-[var(--khor-primary)] group-data-[selected='true']:border-[var(--khor-primary)]">
        <ChevronRight className="h-4 w-4" />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="font-medium text-[var(--khor-neutral-900)]">{item.title}</span>
          <span className="rounded-full bg-[var(--khor-neutral-200)] px-1.5 py-0.5 text-[10px] uppercase font-bold text-[var(--khor-neutral-600)]">
            {item.category}
          </span>
        </div>
        {item.description && (
          <span className="text-xs text-[var(--khor-neutral-500)]">
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
    <div className="text-center py-10 border rounded-xl bg-[var(--khor-neutral-50)]">
      <button 
        onClick={() => setOpen(true)} 
        className="inline-flex items-center gap-2 rounded-md bg-[var(--khor-surface-page)] px-4 py-2 text-sm font-medium border shadow-sm hover:bg-[var(--khor-neutral-100)] transition-colors text-[var(--khor-neutral-900)] font-primary"
      >
        <CommandIcon className="h-4 w-4 text-[var(--khor-neutral-500)]" />
        Abrir Busqueda Global (⌘K)
      </button>
      <KCommandBar open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default KCommandBar;
