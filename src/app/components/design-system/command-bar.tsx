/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR COMMAND BAR — Búsqueda Global       ║
 * ║  Ctrl+K / Cmd+K para búsqueda rápida      ║
 * ║  de componentes, tokens y páginas.         ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router';
import {
  Search, Atom, Layers, Box, LayoutTemplate, Palette,
  Home, ArrowRight, Clock, Hash, Sparkles, Command,
} from 'lucide-react';
import { khorTokens } from '../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ─── Searchable registry ───────────────────── */
interface SearchItem {
  id: string;
  label: string;
  category: 'Inicio' | 'Tokens' | 'Átomo' | 'Molécula' | 'Organismo' | 'Template';
  path: string;
  keywords: string[];
  icon: React.ReactNode;
}

const categoryColors: Record<string, string> = {
  Inicio: t.colors.brand.navy,
  Tokens: t.colors.brand.accent,
  'Átomo': t.colors.feedback.info,
  'Molécula': t.colors.feedback.success,
  Organismo: t.colors.brand.primary,
  Template: '#8B5CF6',
};

const categoryIcons: Record<string, React.ReactNode> = {
  Inicio: <Home size={14} />,
  Tokens: <Palette size={14} />,
  'Átomo': <Atom size={14} />,
  'Molécula': <Layers size={14} />,
  Organismo: <Box size={14} />,
  Template: <LayoutTemplate size={14} />,
};

const allItems: SearchItem[] = [
  // Inicio
  { id: 'home', label: 'Vista General', category: 'Inicio', path: '/', keywords: ['home', 'inicio', 'overview', 'dashboard'], icon: <Home size={16} /> },
  // Tokens
  { id: 'tokens', label: 'Colores y Tipografía', category: 'Tokens', path: '/tokens', keywords: ['colors', 'typography', 'fonts', 'spacing', 'tokens', 'colores', 'tipografia'], icon: <Palette size={16} /> },
  // Átomos
  { id: 'a-button', label: 'KButton', category: 'Átomo', path: '/atoms/button', keywords: ['button', 'boton', 'cta', 'accion', 'click'], icon: <Atom size={16} /> },
  { id: 'a-input', label: 'KInput', category: 'Átomo', path: '/atoms/input', keywords: ['input', 'text', 'field', 'campo', 'texto', 'formulario'], icon: <Atom size={16} /> },
  { id: 'a-badge', label: 'KBadge', category: 'Átomo', path: '/atoms/badge', keywords: ['badge', 'etiqueta', 'estado', 'status', 'indicator'], icon: <Atom size={16} /> },
  { id: 'a-tag', label: 'KTag', category: 'Átomo', path: '/atoms/tag', keywords: ['tag', 'chip', 'label', 'etiqueta', 'filtro'], icon: <Atom size={16} /> },
  { id: 'a-avatar', label: 'KAvatar', category: 'Átomo', path: '/atoms/avatar', keywords: ['avatar', 'photo', 'user', 'foto', 'usuario', 'perfil'], icon: <Atom size={16} /> },
  { id: 'a-switch', label: 'KSwitch', category: 'Átomo', path: '/atoms/switch', keywords: ['switch', 'toggle', 'interruptor', 'on off'], icon: <Atom size={16} /> },
  { id: 'a-checkbox', label: 'KCheckbox', category: 'Átomo', path: '/atoms/checkbox', keywords: ['checkbox', 'check', 'casilla', 'verificar'], icon: <Atom size={16} /> },
  { id: 'a-radio', label: 'KRadio', category: 'Átomo', path: '/atoms/radio', keywords: ['radio', 'option', 'opcion', 'seleccion'], icon: <Atom size={16} /> },
  { id: 'a-tooltip', label: 'KTooltip', category: 'Átomo', path: '/atoms/tooltip', keywords: ['tooltip', 'hint', 'ayuda', 'hover', 'popover'], icon: <Atom size={16} /> },
  { id: 'a-progress', label: 'KProgress', category: 'Átomo', path: '/atoms/progress', keywords: ['progress', 'bar', 'barra', 'progreso', 'loading', 'carga'], icon: <Atom size={16} /> },
  { id: 'a-typography', label: 'KTypography', category: 'Átomo', path: '/atoms/typography', keywords: ['text', 'typography', 'heading', 'titulo', 'tipografia', 'fuente'], icon: <Atom size={16} /> },
  { id: 'a-alert', label: 'KAlert', category: 'Átomo', path: '/atoms/alert', keywords: ['alert', 'alerta', 'warning', 'error', 'notificacion', 'mensaje'], icon: <Atom size={16} /> },
  { id: 'a-skeleton', label: 'KSkeleton', category: 'Átomo', path: '/atoms/skeleton', keywords: ['skeleton', 'loading', 'placeholder', 'carga', 'esqueleto'], icon: <Atom size={16} /> },
  { id: 'a-slider', label: 'KSlider', category: 'Átomo', path: '/atoms/slider', keywords: ['slider', 'range', 'rango', 'deslizador'], icon: <Atom size={16} /> },
  { id: 'a-rate', label: 'KRate', category: 'Átomo', path: '/atoms/rate', keywords: ['rate', 'stars', 'rating', 'estrellas', 'calificacion', 'puntuacion'], icon: <Atom size={16} /> },
  { id: 'a-spin', label: 'KSpin', category: 'Átomo', path: '/atoms/spin', keywords: ['spin', 'spinner', 'loading', 'carga', 'girando'], icon: <Atom size={16} /> },
  { id: 'a-divider', label: 'KDivider', category: 'Átomo', path: '/atoms/divider', keywords: ['divider', 'separator', 'linea', 'divisor', 'separador'], icon: <Atom size={16} /> },
  { id: 'a-textarea', label: 'KTextArea', category: 'Átomo', path: '/atoms/textarea', keywords: ['textarea', 'multiline', 'texto', 'parrafo', 'comentario'], icon: <Atom size={16} /> },
  // Moléculas
  { id: 'm-formfield', label: 'KFormField', category: 'Molécula', path: '/molecules/form-field', keywords: ['form', 'field', 'label', 'formulario', 'campo', 'validacion'], icon: <Layers size={16} /> },
  { id: 'm-search', label: 'KSearchInput', category: 'Molécula', path: '/molecules/search-input', keywords: ['search', 'buscar', 'filtrar', 'find'], icon: <Layers size={16} /> },
  { id: 'm-stat', label: 'KStatCard', category: 'Molécula', path: '/molecules/stat-card', keywords: ['stat', 'metric', 'kpi', 'estadistica', 'metrica', 'numero'], icon: <Layers size={16} /> },
  { id: 'm-nav', label: 'KNavItem', category: 'Molécula', path: '/molecules/nav-item', keywords: ['nav', 'navigation', 'menu', 'sidebar', 'item', 'enlace'], icon: <Layers size={16} /> },
  { id: 'm-select', label: 'KSelectField', category: 'Molécula', path: '/molecules/select-field', keywords: ['select', 'dropdown', 'combo', 'lista', 'seleccionar', 'opcion'], icon: <Layers size={16} /> },
  { id: 'm-usercell', label: 'KUserCell', category: 'Molécula', path: '/molecules/user-cell', keywords: ['user', 'cell', 'employee', 'usuario', 'empleado', 'persona'], icon: <Layers size={16} /> },
  { id: 'm-empty', label: 'KEmptyState', category: 'Molécula', path: '/molecules/empty-state', keywords: ['empty', 'state', 'vacio', 'no data', 'sin datos', 'placeholder'], icon: <Layers size={16} /> },
  { id: 'm-breadcrumb', label: 'KBreadcrumb', category: 'Molécula', path: '/molecules/breadcrumb', keywords: ['breadcrumb', 'navigation', 'ruta', 'path', 'migas'], icon: <Layers size={16} /> },
  { id: 'm-steps', label: 'KSteps', category: 'Molécula', path: '/molecules/steps', keywords: ['steps', 'stepper', 'wizard', 'pasos', 'progreso', 'multi'], icon: <Layers size={16} /> },
  { id: 'm-dropdown', label: 'KDropdownMenu', category: 'Molécula', path: '/molecules/dropdown', keywords: ['dropdown', 'menu', 'context', 'opciones', 'acciones'], icon: <Layers size={16} /> },
  { id: 'm-popover', label: 'KPopover', category: 'Molécula', path: '/molecules/popover', keywords: ['popover', 'popup', 'flotante', 'overlay', 'panel'], icon: <Layers size={16} /> },
  { id: 'm-accordion', label: 'KAccordion', category: 'Molécula', path: '/molecules/accordion', keywords: ['accordion', 'collapse', 'expandir', 'colapsar', 'acordeon', 'faq'], icon: <Layers size={16} /> },
  // Organismos
  { id: 'o-datatable', label: 'KDataTable', category: 'Organismo', path: '/organisms/data-table', keywords: ['table', 'data', 'tabla', 'datos', 'grid', 'lista', 'crud'], icon: <Box size={16} /> },
  { id: 'o-modal', label: 'KModal', category: 'Organismo', path: '/organisms/modal', keywords: ['modal', 'dialog', 'dialogo', 'popup', 'confirmar'], icon: <Box size={16} /> },
  { id: 'o-drawer', label: 'KDrawer', category: 'Organismo', path: '/organisms/drawer', keywords: ['drawer', 'panel', 'lateral', 'slide', 'sidebar', 'detalle'], icon: <Box size={16} /> },
  { id: 'o-cardsection', label: 'KCardSection', category: 'Organismo', path: '/organisms/card-section', keywords: ['card', 'section', 'tarjeta', 'seccion', 'contenedor', 'grupo'], icon: <Box size={16} /> },
  { id: 'o-tabs', label: 'KTabs', category: 'Organismo', path: '/organisms/tabs', keywords: ['tabs', 'pestana', 'tab', 'navegacion', 'contenido'], icon: <Box size={16} /> },
  { id: 'o-toast', label: 'KToastManager', category: 'Organismo', path: '/organisms/toast-manager', keywords: ['toast', 'notification', 'notificacion', 'mensaje', 'alerta', 'snackbar'], icon: <Box size={16} /> },
  { id: 'o-sparkline', label: 'SparklineCell', category: 'Organismo', path: '/organisms/sparkline', keywords: ['sparkline', 'chart', 'grafico', 'tendencia', 'mini', 'linea'], icon: <Box size={16} /> },
  { id: 'o-commandbar', label: 'CommandBar', category: 'Organismo', path: '/organisms/command-bar', keywords: ['command', 'bar', 'search', 'buscar', 'ia', 'ai', 'ctrl k'], icon: <Box size={16} /> },
  // Templates
  { id: 't-login', label: 'Login', category: 'Template', path: '/templates/login', keywords: ['login', 'auth', 'signin', 'iniciar sesion', 'autenticacion'], icon: <LayoutTemplate size={16} /> },
  { id: 't-dashboard', label: 'Dashboard', category: 'Template', path: '/templates/dashboard', keywords: ['dashboard', 'panel', 'metricas', 'overview', 'resumen', 'inicio'], icon: <LayoutTemplate size={16} /> },
  { id: 't-crud', label: 'CRUD Table', category: 'Template', path: '/templates/crud', keywords: ['crud', 'table', 'tabla', 'crear', 'editar', 'eliminar', 'listar'], icon: <LayoutTemplate size={16} /> },
  { id: 't-form', label: 'Formulario Multi-Paso', category: 'Template', path: '/templates/form', keywords: ['form', 'formulario', 'wizard', 'multi', 'paso', 'step', 'registro'], icon: <LayoutTemplate size={16} /> },
  // Herramientas
  { id: 'h-a11y', label: 'Auditoría de Accesibilidad', category: 'Inicio', path: '/accessibility', keywords: ['accessibility', 'accesibilidad', 'wcag', 'aria', 'a11y', 'contraste', 'keyboard', 'screen reader'], icon: <Home size={16} /> },
  { id: 'h-figma', label: 'Exportar a Figma', category: 'Inicio', path: '/figma-export', keywords: ['figma', 'export', 'variables', 'tokens', 'json', 'style dictionary', 'design tokens'], icon: <Home size={16} /> },
  { id: 'h-changelog', label: 'Changelog', category: 'Inicio', path: '/changelog', keywords: ['changelog', 'versiones', 'historial', 'cambios', 'releases', 'notas'], icon: <Home size={16} /> },
  { id: 'h-ai-export', label: 'Guia para IA', category: 'Inicio', path: '/ai-export', keywords: ['ia', 'ai', 'prompt', 'guia', 'markdown', 'export', 'chatgpt', 'claude', 'cursor', 'figma make', 'contexto', 'llm'], icon: <Home size={16} /> },
];

/* ─── Hook for global keyboard shortcut ─────── */
export function useCommandBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return { open, setOpen };
}

/* ─── Command Bar Component ─────────────────── */
export interface KCommandBarProps {
  open: boolean;
  onClose: () => void;
}

export function KCommandBar({ open, onClose }: KCommandBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('khor-cmd-recent') || '[]');
    } catch { return []; }
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Filter results
  const results = useMemo(() => {
    if (!query.trim()) {
      // Show recents first, then popular items
      const recents = recentIds
        .map((id) => allItems.find((item) => item.id === id))
        .filter(Boolean) as SearchItem[];
      if (recents.length > 0) return recents;
      // Default: show all grouped by category
      return allItems.slice(0, 12);
    }
    const q = query.toLowerCase().trim();
    const scored = allItems.map((item) => {
      let score = 0;
      if (item.label.toLowerCase().includes(q)) score += 10;
      if (item.label.toLowerCase().startsWith(q)) score += 5;
      if (item.category.toLowerCase().includes(q)) score += 3;
      item.keywords.forEach((kw) => {
        if (kw.includes(q)) score += 2;
        if (kw.startsWith(q)) score += 1;
      });
      return { item, score };
    });
    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((s) => s.item);
  }, [query, recentIds]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results.length, query]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const handleSelect = useCallback((item: SearchItem) => {
    // Save to recents
    const newRecents = [item.id, ...recentIds.filter((id) => id !== item.id)].slice(0, 5);
    setRecentIds(newRecents);
    try { localStorage.setItem('khor-cmd-recent', JSON.stringify(newRecents)); } catch {}
    navigate(item.path);
    onClose();
  }, [navigate, onClose, recentIds]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
    }
  }, [results, selectedIndex, handleSelect]);

  if (!open) return null;

  const showRecentLabel = !query.trim() && recentIds.length > 0;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(5, 23, 88, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
          animation: 'khorFadeIn 0.15s ease',
        }}
      />
      {/* Dialog */}
      <div
        style={{
          position: 'fixed',
          top: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 560,
          maxWidth: '92vw',
          maxHeight: '70vh',
          backgroundColor: t.colors.neutral[50],
          borderRadius: t.radius.xl,
          boxShadow: '0 25px 60px rgba(5,23,88,0.25), 0 0 0 1px rgba(5,23,88,0.08)',
          fontFamily: font,
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'khorScaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '16px 20px',
          borderBottom: `1px solid ${t.colors.neutral[200]}`,
        }}>
          <Search size={20} style={{ color: t.colors.neutral[300], flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar componentes, tokens, templates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: 16,
              color: t.colors.brand.navy,
              fontFamily: font,
              backgroundColor: 'transparent',
            }}
          />
          <kbd style={{
            fontSize: 11,
            padding: '2px 8px',
            borderRadius: 4,
            backgroundColor: t.colors.neutral[100],
            border: `1px solid ${t.colors.neutral[200]}`,
            color: t.colors.neutral[400],
            flexShrink: 0,
          }}>ESC</kbd>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          style={{
            overflow: 'auto',
            padding: '8px',
            flex: 1,
          }}
        >
          {showRecentLabel && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px',
              fontSize: 11,
              fontWeight: 600,
              color: t.colors.neutral[400],
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              <Clock size={12} />
              Recientes
            </div>
          )}
          {!showRecentLabel && !query.trim() && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px',
              fontSize: 11,
              fontWeight: 600,
              color: t.colors.neutral[400],
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              <Sparkles size={12} />
              Sugerencias
            </div>
          )}
          {query.trim() && results.length === 0 && (
            <div style={{
              padding: '32px 16px',
              textAlign: 'center',
              color: t.colors.neutral[400],
              fontSize: 14,
            }}>
              <Search size={32} style={{ color: t.colors.neutral[200], marginBottom: 8 }} />
              <p style={{ margin: 0 }}>No se encontraron resultados para "<strong>{query}</strong>"</p>
              <p style={{ margin: '4px 0 0', fontSize: 12, color: t.colors.neutral[300] }}>Intenta con otro término de búsqueda</p>
            </div>
          )}
          {results.map((item, i) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setSelectedIndex(i)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                padding: '10px 12px',
                border: 'none',
                borderRadius: t.radius.md,
                backgroundColor: i === selectedIndex ? `${t.colors.brand.primary}0A` : 'transparent',
                cursor: 'pointer',
                fontFamily: font,
                transition: 'background-color 0.1s ease',
                textAlign: 'left',
              }}
            >
              {/* Category Icon */}
              <div style={{
                width: 32, height: 32,
                borderRadius: t.radius.sm,
                backgroundColor: `${categoryColors[item.category] || t.colors.neutral[300]}12`,
                color: categoryColors[item.category] || t.colors.neutral[500],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {categoryIcons[item.category] || item.icon}
              </div>

              {/* Label + Category */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: i === selectedIndex ? t.colors.brand.navy : t.colors.neutral[900],
                }}>
                  {item.label}
                </div>
                <div style={{
                  fontSize: 11,
                  color: t.colors.neutral[400],
                  marginTop: 1,
                }}>
                  {item.category}
                </div>
              </div>

              {/* Arrow */}
              {i === selectedIndex && (
                <ArrowRight size={14} style={{ color: t.colors.brand.primary, flexShrink: 0 }} />
              )}
            </button>
          ))}
        </div>

        {/* Footer with hints */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderTop: `1px solid ${t.colors.neutral[200]}`,
          fontSize: 11,
          color: t.colors.neutral[400],
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <kbd style={kbdStyle}>↑</kbd><kbd style={kbdStyle}>↓</kbd> Navegar
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <kbd style={kbdStyle}>↵</kbd> Abrir
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <kbd style={kbdStyle}>esc</kbd> Cerrar
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: t.colors.brand.primary }}>
            <Command size={12} />
            <span style={{ fontWeight: 600 }}>Khor DS</span>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes khorFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes khorScaleIn {
          from { opacity: 0; transform: translateX(-50%) scale(0.96); }
          to { opacity: 1; transform: translateX(-50%) scale(1); }
        }
      `}</style>
    </>
  );
}

const kbdStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 20,
  height: 18,
  padding: '0 4px',
  fontSize: 10,
  fontWeight: 600,
  borderRadius: 3,
  backgroundColor: t.colors.neutral[100],
  border: `1px solid ${t.colors.neutral[200]}`,
  color: t.colors.neutral[500],
};

/* ─── Command Bar Preview for Docs ──────────── */
export function KCommandBarPreview() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoQuery, setDemoQuery] = useState('');
  const demoResults = useMemo(() => {
    if (!demoQuery.trim()) return allItems.slice(0, 6);
    const q = demoQuery.toLowerCase();
    return allItems.filter((item) =>
      item.label.toLowerCase().includes(q) ||
      item.keywords.some((kw) => kw.includes(q))
    ).slice(0, 6);
  }, [demoQuery]);

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <button
          onClick={() => setDemoOpen(!demoOpen)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 20px',
            borderRadius: t.radius.md,
            border: `1px solid ${t.colors.neutral[200]}`,
            backgroundColor: t.colors.neutral[50],
            cursor: 'pointer',
            fontFamily: font,
            fontSize: 14,
            color: t.colors.neutral[400],
            transition: 'all 0.15s ease',
            boxShadow: t.shadows.sm,
          }}
        >
          <Search size={16} />
          <span>Buscar componentes...</span>
          <kbd style={{
            marginLeft: 16,
            backgroundColor: t.colors.neutral[100],
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: 11,
            border: `1px solid ${t.colors.neutral[200]}`,
            fontWeight: 600,
          }}>⌘K</kbd>
        </button>
      </div>

      {demoOpen && (
        <div style={{
          backgroundColor: t.colors.neutral[50],
          borderRadius: t.radius.lg,
          boxShadow: t.shadows.lg,
          border: `1px solid ${t.colors.neutral[200]}`,
          overflow: 'hidden',
          maxWidth: 480,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 16px',
            borderBottom: `1px solid ${t.colors.neutral[200]}`,
          }}>
            <Search size={16} style={{ color: t.colors.neutral[300] }} />
            <input
              type="text"
              placeholder="Buscar..."
              value={demoQuery}
              onChange={(e) => setDemoQuery(e.target.value)}
              style={{
                flex: 1, border: 'none', outline: 'none', fontSize: 14,
                fontFamily: font, backgroundColor: 'transparent',
                color: t.colors.brand.navy,
              }}
            />
          </div>
          <div style={{ padding: 6, maxHeight: 260, overflow: 'auto' }}>
            {demoResults.map((item, i) => (
              <div
                key={item.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: t.radius.sm,
                  backgroundColor: i === 0 ? `${t.colors.brand.primary}08` : 'transparent',
                  fontSize: 13,
                }}
              >
                <div style={{
                  width: 26, height: 26, borderRadius: 6,
                  backgroundColor: `${categoryColors[item.category]}12`,
                  color: categoryColors[item.category],
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {categoryIcons[item.category]}
                </div>
                <span style={{ flex: 1, color: t.colors.neutral[900], fontWeight: i === 0 ? 500 : 400 }}>{item.label}</span>
                <span style={{ fontSize: 10, color: t.colors.neutral[400] }}>{item.category}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}