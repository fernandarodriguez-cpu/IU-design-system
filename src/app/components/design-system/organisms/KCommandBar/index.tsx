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
    // Atoms
    { id: 'btn', title: 'KButton', category: 'Atomo', description: 'Botón con variantes y estados.', keywords: ['boton', 'button', 'click'], url: '/atoms/button' },
    { id: 'btng', title: 'KButtonGroup', category: 'Atomo', description: 'Grupo de botones.', keywords: ['group', 'botones'], url: '/atoms/button-group' },
    { id: 'inp', title: 'KInput', category: 'Atomo', description: 'Campo de texto básico.', keywords: ['input', 'texto', 'form'], url: '/atoms/input' },
    { id: 'inps', title: 'KInputSearch', category: 'Atomo', description: 'Input con búsqueda.', keywords: ['search', 'buscar'], url: '/atoms/input-search' },
    { id: 'inpp', title: 'KInputPassword', category: 'Atomo', description: 'Input para contraseñas.', keywords: ['password', 'seguridad'], url: '/atoms/input-password' },
    { id: 'txt', title: 'KText', category: 'Atomo', description: 'Componente de tipografía.', keywords: ['text', 'typography', 'label'], url: '/atoms/typography' },
    { id: 'avt', title: 'KAvatar', category: 'Atomo', description: 'Círculo de perfil o iniciales.', keywords: ['avatar', 'user', 'user-circle'], url: '/atoms/avatar' },
    { id: 'bdg', title: 'KBadge', category: 'Atomo', description: 'Insignia de estado o conteo.', keywords: ['badge', 'status', 'chip'], url: '/atoms/badge' },
    { id: 'tag', title: 'KTag', category: 'Atomo', description: 'Etiqueta o chip de información.', keywords: ['tag', 'chip', 'label'], url: '/atoms/tag' },
    { id: 'swi', title: 'KSwitch', category: 'Atomo', description: 'Interruptor de estado.', keywords: ['switch', 'toggle', 'on/off'], url: '/atoms/switch' },
    { id: 'chk', title: 'KCheckbox', category: 'Atomo', description: 'Casilla de verificación.', keywords: ['checkbox', 'check', 'form'], url: '/atoms/checkbox' },
    { id: 'rad', title: 'KRadio', category: 'Atomo', description: 'Botón de opción única.', keywords: ['radio', 'option', 'form'], url: '/atoms/radio' },
    { id: 'spc', title: 'KSpace', category: 'Atomo', description: 'Contenedor de espaciado.', keywords: ['space', 'gap', 'layout'], url: '/atoms/space' },
    { id: 'div', title: 'KDivider', category: 'Atomo', description: 'Línea separadora.', keywords: ['divider', 'line', 'hr'], url: '/atoms/divider' },
    { id: 'skel', title: 'KSkeleton', category: 'Atomo', description: 'Estado de carga visual.', keywords: ['skeleton', 'loading', 'placeholder'], url: '/atoms/skeleton' },
    { id: 'spin', title: 'KSpin', category: 'Atomo', description: 'Indicador de carga circular.', keywords: ['spin', 'loading', 'loader'], url: '/atoms/spin' },
    
    // Molecules
    { id: 'ff', title: 'KFormField', category: 'Molecula', description: 'Campo de formulario con label.', keywords: ['form', 'field', 'input'], url: '/molecules/form-field' },
    { id: 'src', title: 'KSearchInput', category: 'Molecula', description: 'Barra de búsqueda sofisticada.', keywords: ['search', 'input', 'filter'], url: '/molecules/search-input' },
    { id: 'sc', title: 'KStatCard', category: 'Molecula', description: 'Tarjeta de estadística con sparkline.', keywords: ['stat', 'card', 'kpi'], url: '/molecules/stat-card' },
    { id: 'sel', title: 'KSelectField', category: 'Molecula', description: 'Selector con búsqueda.', keywords: ['select', 'dropdown', 'form'], url: '/molecules/select-field' },
    { id: 'dtp', title: 'KDatePicker', category: 'Molecula', description: 'Selector de fecha.', keywords: ['date', 'calendar', 'time'], url: '/molecules/date-picker' },
    { id: 'stp', title: 'KSteps', category: 'Molecula', description: 'Indicador de progreso de pasos.', keywords: ['steps', 'progress', 'stepper'], url: '/molecules/steps' },
    { id: 'brd', title: 'KBreadcrumb', category: 'Molecula', description: 'Ruta de navegación.', keywords: ['breadcrumb', 'path', 'nav'], url: '/molecules/breadcrumb' },
    { id: 'tl', title: 'KTimeline', category: 'Molecula', description: 'Línea de tiempo de eventos.', keywords: ['timeline', 'events', 'history'], url: '/molecules/timeline' },
    { id: 'tt', title: 'KTooltip', category: 'Molecula', description: 'Mensaje emergente al hover.', keywords: ['tooltip', 'info', 'hint'], url: '/molecules/tooltip' },
    { id: 'pp', title: 'KPopover', category: 'Molecula', description: 'Panel emergente interactivo.', keywords: ['popover', 'popup', 'panel'], url: '/molecules/popover' },
    { id: 'pc', title: 'KPopconfirm', category: 'Molecula', description: 'Confirmación rápida.', keywords: ['popconfirm', 'confirm', 'delete'], url: '/molecules/popconfirm' },
    
    // Organisms
    { id: 'dt', title: 'KDataTable', category: 'Organismo', description: 'Tabla avanzada con filtros.', keywords: ['tabla', 'table', 'data'], url: '/organisms/data-table' },
    { id: 'form', title: 'KForm', category: 'Organismo', description: 'Sistema de formularios reactivos.', keywords: ['form', 'registro', 'hooks'], url: '/organisms/form' },
    { id: 'mod', title: 'KModal', category: 'Organismo', description: 'Ventana emergente principal.', keywords: ['modal', 'dialog', 'popup'], url: '/organisms/modal' },
    { id: 'drw', title: 'KDrawer', category: 'Organismo', description: 'Panel lateral deslizable.', keywords: ['drawer', 'side', 'panel'], url: '/organisms/drawer' },
    { id: 'not', title: 'KNotification', category: 'Organismo', description: 'Sistema de notificaciones push.', keywords: ['notification', 'toast', 'alert'], url: '/organisms/notification' },
    { id: 'msg', title: 'KMessage', category: 'Organismo', description: 'Mensajes de estado rápidos.', keywords: ['message', 'toast', 'notice'], url: '/organisms/message' },
    { id: 'clnd', title: 'KCalendar', category: 'Organismo', description: 'Calendario de eventos completo.', keywords: ['calendar', 'date', 'events'], url: '/organisms/calendar' },
    { id: 'tree', title: 'KTree', category: 'Organismo', description: 'Vista jerárquica de datos.', keywords: ['tree', 'hierarquia', 'arbol'], url: '/organisms/tree' },
    { id: 'upld', title: 'KUpload', category: 'Organismo', description: 'Carga de archivos drag&drop.', keywords: ['upload', 'files', 'dropzone'], url: '/organisms/upload' },
    { id: 'flist', title: 'KFormList', category: 'Organismo', description: 'Campos dinámicos repetibles.', keywords: ['form', 'list', 'dynamic'], url: '/organisms/form-list' },
    { id: 'cb', title: 'KCommandBar', category: 'Organismo', description: 'Búsqueda global (⌘K).', keywords: ['search', 'command', 'palette'], url: '/organisms/command-bar' },
    { id: 'layout', title: 'KAppLayout', category: 'Organismo', description: 'Estructura principal de App.', keywords: ['layout', 'sidebar', 'shell'], url: '/organisms/app-layout' },
    
    // Tokens
    { id: 'tok', title: 'khorTokens', category: 'Token', description: 'Sistema central de variables.', keywords: ['colors', 'typography', 'spacing'], url: '/tokens' },
    { id: 'col', title: 'Colección de Colores', category: 'Token', description: 'Paleta completa de marca.', keywords: ['brand', 'primary', 'navy'], url: '/tokens#colores' },
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
        position: 'fixed', inset: 0, backgroundColor: 'rgba(5, 23, 88, 0.4)', // Khor Navy with opacity
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: '15vh', zIndex: 9999, backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%', maxWidth: 640, backgroundColor: t.colors.neutral[50],
          borderRadius: t.radius.xl || 12, boxShadow: t.shadows.lg,
          overflow: 'hidden', animation: 'scaleIn 0.15s ease-out',
          border: `1px solid ${t.colors.neutral[200]}`,
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ padding: '16px 20px', borderBottom: `1px solid ${t.colors.neutral[200]}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Search size={20} color={t.colors.neutral[400]} />
          <input
            autoFocus
            tabIndex={0}
            placeholder="¿Qué estás buscando?"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={e => {
              if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
              }
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                const max = search ? filtered.length - 1 : recents.length - 1;
                setActiveIndex(prev => Math.min(prev + 1, Math.max(0, max)));
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex(prev => Math.max(prev - 1, 0));
              }
              if (e.key === 'Enter') {
                e.preventDefault();
                const activeList = search ? filtered : recents;
                if (activeList[activeIndex]) handleSelect(activeList[activeIndex]);
              }
            }}
            style={{
              flex: 1, border: 'none', outline: 'none', fontSize: 16,
              fontFamily: font, color: t.colors.brand.navy,
              background: 'transparent',
            }}
          />
          <div onClick={onClose} style={{ cursor: 'pointer', display: 'flex' }}>
            <KTag color="default">ESC</KTag>
          </div>
        </div>

        <div style={{ maxHeight: 400, overflowY: 'auto', padding: '12px 0' }}>
          {!search && recents.length > 0 && (
            <div style={{ padding: '0 8px 8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, paddingLeft: 12, color: t.colors.neutral[400] }}>
                <History size={12} /> <KText variant="caption" color="muted">RECIENTES</KText>
              </div>
              {recents.map((item, i) => <CommandRow key={item.id} item={item} active={i === activeIndex} onClick={() => handleSelect(item)} />)}
            </div>
          )}

          {search && filtered.length > 0 && (
            <div style={{ padding: '0 8px' }}>
              {filtered.map((item, i) => (
                <CommandRow key={item.id} item={item} active={i === activeIndex} onClick={() => handleSelect(item)} />
              ))}
            </div>
          )}

          {search && filtered.length === 0 && (
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
              <Sparkles size={32} color={t.colors.neutral[200]} style={{ marginBottom: 12 }} />
              <KText variant="body-md" color="secondary">No se encontraron resultados para "{search}"</KText>
              <div><KText variant="small" color="muted">Prueba buscando por nombre de componente o token.</KText></div>
            </div>
          )}
        </div>

        <div style={{ 
          padding: '12px 20px', 
          backgroundColor: t.colors.neutral[100], 
          borderTop: `1px solid ${t.colors.neutral[200]}`, 
          display: 'flex', 
          gap: 16 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ padding: '2px 6px', borderRadius: 4, background: t.colors.neutral[200], fontSize: 10, fontWeight: 700 }}>↑↓</div>
            <KText variant="caption" color="secondary">Navegar</KText>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ padding: '2px 6px', borderRadius: 4, background: t.colors.neutral[200], fontSize: 10, fontWeight: 700 }}>ENTER</div>
            <KText variant="caption" color="secondary">Seleccionar</KText>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Command size={12} color={t.colors.neutral[400]} />
            <div style={{ padding: '2px 6px', borderRadius: 4, background: t.colors.neutral[200], fontSize: 10, fontWeight: 700 }}>K</div>
            <KText variant="caption" color="secondary">Abrir/Cerrar</KText>
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
