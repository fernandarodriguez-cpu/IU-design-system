/**
 * ChangelogPage — Timeline interactivo del historial de versiones
 * del Khor Design System.
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Plus, RefreshCw, Wrench, Trash2, ArrowRight,
  Tag, GitBranch, Calendar, Package, Zap, Star,
  ChevronDown, ChevronRight,
} from 'lucide-react';
import { KButton, KBadge, KText } from '../components/design-system/atoms';
import { khorTokens } from '../theme/khor-theme';

const t = khorTokens;

type ChangeType = 'added' | 'changed' | 'fixed' | 'removed' | 'breaking';

interface ChangeItem {
  type: ChangeType;
  component?: string;
  componentPath?: string;
  description: string;
}

interface VersionEntry {
  version: string;
  date: string;
  codename?: string;
  summary: string;
  highlights?: string[];
  changes: ChangeItem[];
  stats?: { added: number; changed: number; fixed: number };
}

const changeTypeConfig: Record<ChangeType, { color: string; bg: string; icon: React.ReactNode; label: string }> = {
  added: { color: t.colors.feedback.success, bg: t.colors.feedback.successLight, icon: <Plus size={12} />, label: 'Nuevo' },
  changed: { color: '#1976D2', bg: '#E3F2FD', icon: <RefreshCw size={12} />, label: 'Cambio' },
  fixed: { color: t.colors.brand.accent, bg: t.colors.feedback.warningLight, icon: <Wrench size={12} />, label: 'Fix' },
  removed: { color: t.colors.feedback.error, bg: t.colors.feedback.errorLight, icon: <Trash2 size={12} />, label: 'Removido' },
  breaking: { color: '#9C27B0', bg: '#F3E5F5', icon: <Zap size={12} />, label: 'Breaking' },
};

const changelog: VersionEntry[] = [
  {
    version: '1.3.0',
    date: '6 Mar 2026',
    codename: 'Atlas',
    summary: 'Modo oscuro completo, auditoría de accesibilidad WCAG AA, exportación Figma Variables, y changelog interactivo.',
    highlights: [
      'Dark Mode con tokens completos y persistencia en localStorage',
      'Auditoría WCAG AA con scores por componente',
      'Exportación JSON compatible con Figma Variables',
      'Changelog interactivo con timeline visual',
    ],
    changes: [
      { type: 'added', description: 'Theme Context con dark/light mode toggle y persistencia en localStorage.' },
      { type: 'added', description: 'Página de Auditoría de Accesibilidad con scores WCAG AA para 19 componentes.' },
      { type: 'added', description: 'Página de Changelog interactivo con timeline visual y filtros.' },
      { type: 'added', description: 'Exportación de tokens como Figma Variables JSON en la página de Tokens.' },
      { type: 'added', description: 'Dark Mode tokens: colores neutrales, feedback y sombras para tema oscuro.' },
      { type: 'changed', component: 'AppShell', componentPath: '/', description: 'Sidebar actualizado con nuevas secciones de navegación (Accesibilidad, Changelog, Figma Export).' },
    ],
    stats: { added: 6, changed: 1, fixed: 0 },
  },
  {
    version: '1.2.0',
    date: '5 Mar 2026',
    codename: 'Beacon',
    summary: 'Command Bar funcional con Ctrl+K, playgrounds interactivos para todos los organismos, y mejoras de búsqueda.',
    highlights: [
      'Command Bar (⌘K) con búsqueda fuzzy y 44 items indexados',
      '4 nuevos playgrounds interactivos para organismos',
      'Historial de búsquedas recientes en localStorage',
    ],
    changes: [
      { type: 'added', component: 'KCommandBar', componentPath: '/organisms/command-bar', description: 'Command Bar funcional con búsqueda fuzzy, navegación por teclado, y historial de recientes.' },
      { type: 'added', component: 'KDataTable', componentPath: '/organisms/data-table', description: 'Playground interactivo con controles de paginación, búsqueda y estado de carga.' },
      { type: 'added', component: 'KModal', componentPath: '/organisms/modal', description: 'Playground interactivo con controles de título y ancho configurable.' },
      { type: 'added', component: 'KDrawer', componentPath: '/organisms/drawer', description: 'Playground interactivo con controles de posición, título y ancho.' },
      { type: 'added', component: 'KToastManager', componentPath: '/organisms/toast-manager', description: 'Playground interactivo con controles de tipo, título, descripción y duración.' },
      { type: 'changed', component: 'AppShell', componentPath: '/', description: 'Integración del Command Bar con hook useCommandBar() en el layout principal.' },
    ],
    stats: { added: 5, changed: 1, fixed: 0 },
  },
  {
    version: '1.1.0',
    date: '4 Mar 2026',
    codename: 'Core',
    summary: 'Correcciones de HTML válido, playgrounds faltantes, conteos actualizados y verificación completa de la auditoría.',
    highlights: [
      'Playgrounds faltantes añadidos para KTooltip, KDivider y KPopover',
      'Corrección de anidamiento ilegal de <button> en KDropdownMenu',
      'Eliminación de React.Fragment con props inválidos',
    ],
    changes: [
      { type: 'added', component: 'KTooltip', componentPath: '/atoms/tooltip', description: 'Playground interactivo añadido con controles de placement y título.' },
      { type: 'added', component: 'KDivider', componentPath: '/atoms/divider', description: 'Playground interactivo añadido.' },
      { type: 'added', component: 'KPopover', componentPath: '/molecules/popover', description: 'Playground interactivo añadido con controles de posición.' },
      { type: 'fixed', component: 'KDropdownMenu', componentPath: '/molecules/dropdown', description: 'Corregido anidamiento ilegal de <button> dentro de <button>. Trigger cambiado a <div role="button">.' },
      { type: 'fixed', description: 'Reemplazados React.Fragment con props inválidos por <span> y <div style={{ display: "contents" }}>.' },
      { type: 'changed', description: 'Conteo de átomos actualizado a 18/18 en HomePage.' },
      { type: 'changed', description: 'Playgrounds de CardSection y Tabs añadidos en organismos (2/8 iniciales).' },
    ],
    stats: { added: 3, changed: 2, fixed: 2 },
  },
  {
    version: '1.0.0',
    date: '3 Mar 2026',
    codename: 'Genesis',
    summary: 'Lanzamiento inicial del Khor Design System con arquitectura Atomic Design completa.',
    highlights: [
      '18 átomos, 12 moléculas, 8 organismos y 4 templates',
      'Tokens de diseño completos (colores, tipografía, espaciado, sombras)',
      'Documentación interactiva con ComponentDoc',
      'Descarga ZIP del sistema de diseño',
    ],
    changes: [
      { type: 'added', description: '18 átomos: KButton, KInput, KTextArea, KBadge, KTag, KAvatar, KSwitch, KCheckbox, KRadio, KTooltip, KProgress, KText, KDivider, KAlert, KSkeleton, KSlider, KRate, KSpin.' },
      { type: 'added', description: '12 moléculas: KFormField, KSearchInput, KStatCard, KNavItem, KSelectField, KUserCell, KEmptyState, KBreadcrumb, KSteps, KDropdownMenu, KPopover, KAccordion.' },
      { type: 'added', description: '8 organismos: KDataTable, SparklineCell, KModal, KDrawer, KCardSection, KTabs, KToastManager, CommandBar (placeholder).' },
      { type: 'added', description: '4 templates: Login, Dashboard, CRUD Table, Formulario Multi-Paso.' },
      { type: 'added', description: 'AppShell con sidebar Navy colapsable y header con búsqueda.' },
      { type: 'added', description: 'ComponentDoc: plantilla de documentación con tabs (Preview, Playground, Código, Docs).' },
      { type: 'added', description: 'TokensPage: documentación visual de colores, tipografía, espaciado y sombras.' },
      { type: 'added', description: 'HomePage con estadísticas, principios del sistema y quick start.' },
      { type: 'added', description: 'handleDownloadZip: generación de ZIP real con JSZip incluyendo tokens, catálogos y README.' },
    ],
    stats: { added: 9, changed: 0, fixed: 0 },
  },
];

export function ChangelogPage() {
  const navigate = useNavigate();
  const [expandedVersions, setExpandedVersions] = useState<Set<string>>(new Set([changelog[0].version]));
  const [typeFilter, setTypeFilter] = useState<ChangeType | 'all'>('all');

  const toggleVersion = (v: string) => {
    setExpandedVersions((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  };

  return (
    <div style={{ fontFamily: t.typography.fontPrimary }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: t.colors.brand.primary, textTransform: 'uppercase', letterSpacing: 1 }}>
            Historial
          </span>
        </div>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: t.colors.brand.navy }}>
          Changelog
        </h2>
        <p style={{ margin: '8px 0 0', fontSize: 16, color: t.colors.neutral[500], lineHeight: 1.5 }}>
          Historial completo de versiones, cambios, mejoras y correcciones del Khor Design System.
        </p>
      </div>

      {/* Filter bar */}
      <div style={{
        display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center',
      }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: t.colors.neutral[400], marginRight: 4 }}>Filtrar por:</span>
        {(['all', 'added', 'changed', 'fixed', 'removed', 'breaking'] as const).map((f) => {
          const isAll = f === 'all';
          const cfg = !isAll ? changeTypeConfig[f] : null;
          return (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '5px 12px', borderRadius: 999, fontSize: 11, fontWeight: 600,
                border: `1px solid ${typeFilter === f ? (cfg?.color || t.colors.brand.navy) : t.colors.neutral[200]}`,
                backgroundColor: typeFilter === f ? (cfg?.bg || `${t.colors.brand.navy}08`) : 'transparent',
                color: typeFilter === f ? (cfg?.color || t.colors.brand.navy) : t.colors.neutral[400],
                cursor: 'pointer', fontFamily: t.typography.fontPrimary,
              }}
            >
              {cfg?.icon}
              {isAll ? 'Todos' : cfg?.label}
            </button>
          );
        })}
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: 32 }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute', left: 11, top: 0, bottom: 0, width: 2,
          backgroundColor: t.colors.neutral[200],
        }} />

        {changelog.map((entry, vi) => {
          const isExpanded = expandedVersions.has(entry.version);
          const isLatest = vi === 0;
          const filteredChanges = typeFilter === 'all'
            ? entry.changes
            : entry.changes.filter((c) => c.type === typeFilter);

          return (
            <div key={entry.version} style={{ position: 'relative', marginBottom: 32 }}>
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: -32 + 4, top: 20,
                width: 16, height: 16, borderRadius: '50%',
                backgroundColor: isLatest ? t.colors.brand.primary : t.colors.neutral[50],
                border: `3px solid ${isLatest ? t.colors.brand.primary : t.colors.neutral[300]}`,
                zIndex: 1,
              }} />

              {/* Version Card */}
              <div style={{
                backgroundColor: t.colors.neutral[50],
                borderRadius: t.radius.lg,
                boxShadow: isLatest ? t.shadows.md : t.shadows.sm,
                border: `1px solid ${isLatest ? `${t.colors.brand.primary}20` : t.colors.neutral[200]}`,
                overflow: 'hidden',
              }}>
                {/* Version Header */}
                <button
                  onClick={() => toggleVersion(entry.version)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 16, width: '100%',
                    padding: '20px 24px', border: 'none', backgroundColor: 'transparent',
                    cursor: 'pointer', fontFamily: t.typography.fontPrimary, textAlign: 'left',
                  }}
                >
                  {/* Version tag */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: t.radius.md,
                    backgroundColor: isLatest ? `${t.colors.brand.primary}10` : t.colors.neutral[100],
                    border: `1px solid ${isLatest ? `${t.colors.brand.primary}20` : t.colors.neutral[200]}`,
                    flexShrink: 0,
                  }}>
                    <Tag size={14} style={{ color: isLatest ? t.colors.brand.primary : t.colors.neutral[400] }} />
                    <span style={{
                      fontSize: 16, fontWeight: 700,
                      color: isLatest ? t.colors.brand.primary : t.colors.brand.navy,
                    }}>v{entry.version}</span>
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      {entry.codename && (
                        <span style={{
                          fontSize: 14, fontWeight: 600, color: t.colors.brand.navy,
                        }}>"{entry.codename}"</span>
                      )}
                      {isLatest && (
                        <span style={{
                          fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                          backgroundColor: t.colors.feedback.successLight, color: t.colors.feedback.success,
                          textTransform: 'uppercase', letterSpacing: 0.5,
                        }}>Actual</span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, fontSize: 12, color: t.colors.neutral[400] }}>
                      <Calendar size={12} />
                      <span>{entry.date}</span>
                      {entry.stats && (
                        <>
                          <span style={{ color: t.colors.neutral[200] }}>|</span>
                          {entry.stats.added > 0 && <span style={{ color: t.colors.feedback.success }}>+{entry.stats.added}</span>}
                          {entry.stats.changed > 0 && <span style={{ color: '#1976D2' }}>~{entry.stats.changed}</span>}
                          {entry.stats.fixed > 0 && <span style={{ color: t.colors.brand.accent }}>!{entry.stats.fixed}</span>}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Expand */}
                  {isExpanded ? <ChevronDown size={16} style={{ color: t.colors.neutral[300] }} /> : <ChevronRight size={16} style={{ color: t.colors.neutral[300] }} />}
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div style={{ padding: '0 24px 20px', borderTop: `1px solid ${t.colors.neutral[200]}` }}>
                    {/* Summary */}
                    <p style={{ fontSize: 14, color: t.colors.neutral[500], lineHeight: 1.6, margin: '16px 0' }}>
                      {entry.summary}
                    </p>

                    {/* Highlights */}
                    {entry.highlights && entry.highlights.length > 0 && (
                      <div style={{
                        padding: 16, borderRadius: t.radius.md,
                        backgroundColor: `${t.colors.brand.primary}06`,
                        border: `1px solid ${t.colors.brand.primary}15`,
                        marginBottom: 16,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: t.colors.brand.primary, fontSize: 12, fontWeight: 600 }}>
                          <Star size={14} />
                          Highlights
                        </div>
                        <ul style={{ margin: 0, paddingLeft: 20, listStyle: 'none' }}>
                          {entry.highlights.map((h, i) => (
                            <li key={i} style={{ fontSize: 13, color: t.colors.neutral[500], lineHeight: 1.8, position: 'relative' }}>
                              <span style={{ position: 'absolute', left: -16, color: t.colors.brand.primary }}>-</span>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Changes */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {filteredChanges.length === 0 ? (
                        <p style={{ fontSize: 13, color: t.colors.neutral[300], fontStyle: 'italic', textAlign: 'center', padding: 16 }}>
                          No hay cambios de este tipo en esta versión.
                        </p>
                      ) : (
                        filteredChanges.map((change, ci) => {
                          const cfg = changeTypeConfig[change.type];
                          return (
                            <div
                              key={ci}
                              style={{
                                display: 'flex', alignItems: 'flex-start', gap: 10,
                                padding: '10px 12px', borderRadius: t.radius.sm,
                                backgroundColor: t.colors.neutral[100],
                              }}
                            >
                              {/* Type badge */}
                              <span style={{
                                display: 'inline-flex', alignItems: 'center', gap: 3,
                                fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 999,
                                backgroundColor: cfg.bg, color: cfg.color,
                                flexShrink: 0, marginTop: 1,
                              }}>
                                {cfg.icon} {cfg.label}
                              </span>

                              {/* Description */}
                              <div style={{ flex: 1, fontSize: 13, color: t.colors.neutral[500], lineHeight: 1.5 }}>
                                {change.component && (
                                  <button
                                    onClick={() => change.componentPath && navigate(change.componentPath)}
                                    style={{
                                      background: 'none', border: 'none', cursor: change.componentPath ? 'pointer' : 'default',
                                      fontWeight: 600, color: t.colors.brand.navy, fontFamily: t.typography.fontPrimary,
                                      fontSize: 13, padding: 0, marginRight: 4,
                                      textDecoration: change.componentPath ? 'underline' : 'none',
                                      textDecorationColor: `${t.colors.brand.navy}30`,
                                    }}
                                  >
                                    {change.component}
                                  </button>
                                )}
                                {change.description}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* End of timeline */}
        <div style={{
          position: 'relative', paddingLeft: 0,
          textAlign: 'center', color: t.colors.neutral[300], fontSize: 12,
        }}>
          <div style={{
            position: 'absolute', left: -32 + 7, top: 4,
            width: 10, height: 10, borderRadius: '50%',
            backgroundColor: t.colors.neutral[200],
          }} />
          <span style={{ fontStyle: 'italic' }}>Inicio del proyecto</span>
        </div>
      </div>
    </div>
  );
}
