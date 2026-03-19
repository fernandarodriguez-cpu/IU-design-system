import React, { useState, useEffect, useMemo } from 'react';
import { Search, History, Sparkles, X, ChevronRight, Command } from 'lucide-react';
import { useNavigate } from 'react-router';
import { khorTokens } from '../../../../theme/khor-theme';
import { KText, KBadge, KTag, KButton } from '../../atoms';

const t = khorTokens;
const font = t.typography.fontPrimary;

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

/* ─── Component ─────────────────────────────── */
export function KCommandBar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [recents, setRecents] = useState<CommandItem[]>([]);

  // Mock data for search
  const commands: CommandItem[] = [
    { id: '1', title: 'KButton', category: 'Atomo', description: 'Boton principal con variantes.', keywords: ['boton', 'button', 'click'], url: '/atoms/button' },
    { id: '2', title: 'KInput', category: 'Atomo', description: 'Campo de texto basico.', keywords: ['input', 'texto', 'form'], url: '/atoms/input' },
    { id: '3', title: 'KDataTable', category: 'Organismo', description: 'Tabla avanzada con busqueda.', keywords: ['tabla', 'table', 'data'], url: '/organisms/data-table' },
    { id: '4', title: 'KUserCell', category: 'Molecula', description: 'Celda de usuario para tablas.', keywords: ['usuario', 'user', 'avatar'], url: '/molecules/user-cell' },
    { id: '5', title: 'colors.brand.primary', category: 'Token', description: 'Color principal (#E04D36).', keywords: ['color', 'rojo', 'brand'], url: '/tokens#colores' },
  ];

  const handleSelect = (item: CommandItem) => {
    if (item.url) {
      navigate(item.url);
    }
    const newRecents = [item, ...recents.filter(r => r.id !== item.id)].slice(0, 5);
    setRecents(newRecents);
    localStorage.setItem('khor_command_recents', JSON.stringify(newRecents));
    onClose();
  };

  const filtered = useMemo(() => {
    if (!search) return [];
    return commands.filter(c =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.keywords?.some(k => k.toLowerCase().includes(search.toLowerCase()))
    ).slice(0, 5);
  }, [search]);

  useEffect(() => {
    if (open) {
      setSearch('');
      setActiveIndex(0);
      const saved = localStorage.getItem('khor_command_recents');
      if (saved) setRecents(JSON.parse(saved));
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '15vh', zIndex: 9999, backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%', maxWidth: 640, backgroundColor: '#FFFFFF',
          borderRadius: 12, boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          overflow: 'hidden', animation: 'scaleIn 0.15s ease-out',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.colors.neutral[200]}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Search size={20} color={t.colors.neutral[300]} />
          <input
            autoFocus
            placeholder="¿Que estas buscando?"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={e => {
              if (e.key === 'Escape') onClose();
              if (e.key === 'ArrowDown') {
                const max = search ? filtered.length - 1 : recents.length - 1;
                setActiveIndex(prev => Math.min(prev + 1, Math.max(0, max)));
              }
              if (e.key === 'ArrowUp') setActiveIndex(prev => Math.max(prev - 1, 0));
              if (e.key === 'Enter') {
                const activeList = search ? filtered : recents;
                if (activeList[activeIndex]) handleSelect(activeList[activeIndex]);
              }
            }}
            style={{
              flex: 1, border: 'none', outline: 'none', fontSize: 16,
              fontFamily: font, color: t.colors.brand.navy,
            }}
          />
          <div onClick={onClose} style={{ cursor: 'pointer', display: 'flex' }}>
            <KTag color="default">ESC</KTag>
          </div>
        </div>

        <div style={{ maxHeight: 400, overflowY: 'auto', padding: '12px 0' }}>
          {!search && recents.length > 0 && (
            <div style={{ padding: '0 16px 8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: t.colors.neutral[400] }}>
                <History size={12} /> <KText variant="caption" color="muted">RECIENTES</KText>
              </div>
              {recents.map((item, i) => <CommandRow key={item.id} item={item} active={i === activeIndex} onClick={() => handleSelect(item)} />)}
            </div>
          )}

          {search && filtered.length > 0 && (
            <div style={{ padding: '0 4px' }}>
              {filtered.map((item, i) => (
                <CommandRow key={item.id} item={item} active={i === activeIndex} onClick={() => handleSelect(item)} />
              ))}
            </div>
          )}

          {search && filtered.length === 0 && (
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
              <Sparkles size={32} color={t.colors.neutral[100]} style={{ marginBottom: 12 }} />
              <KText variant="body-md" color="secondary">No se encontraron resultados para "{search}"</KText>
              <KText variant="small" color="muted">Prueba buscando por nombre de componente o token.</KText>
            </div>
          )}
        </div>

        <div style={{ padding: '12px 20px', backgroundColor: t.colors.neutral[50], borderTop: `1px solid ${t.colors.neutral[200]}`, display: 'flex', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <KTag color="default" style={{ padding: '0 4px' }}>↓↑</KTag>
            <KText variant="caption" color="secondary">Navegar</KText>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <KTag color="default" style={{ padding: '0 4px' }}>ENTER</KTag>
            <KText variant="caption" color="secondary">Seleccionar</KText>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Command size={12} color={t.colors.neutral[400]} />
            <KTag color="default" style={{ padding: '0 4px' }}>K</KTag>
            <KText variant="caption" color="secondary">Cerrar</KText>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommandRow({ item, active, onClick }: { item: CommandItem; active: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px',
        borderRadius: 8, margin: '2px 8px', cursor: 'pointer',
        backgroundColor: active ? t.colors.neutral[200] : 'transparent',
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: active ? '#FFF' : t.colors.neutral[100], color: t.colors.brand.primary,
      }}>
        <ChevronRight size={16} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <KText variant="body-md" strong={active}>{item.title}</KText>
          <KBadge status="default" label={item.category} style={{ fontSize: 10, height: 16 }} />
        </div>
        <KText variant="small" color="muted">{item.description}</KText>
      </div>
    </div>
  );
}

export function KCommandBarPreview() {
  const { open, setOpen } = useCommandBar();
  return (
    <div style={{ textAlign: 'center', padding: '40px 0', border: '1px solid #eee', borderRadius: 12 }}>
      <KButton variant="secondary" onClick={() => setOpen(true)} icon={<Command size={16} />}>
        Abrir Busqueda Global (⌘K)
      </KButton>
      <KCommandBar open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default KCommandBar;
