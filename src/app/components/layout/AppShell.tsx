/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR APP SHELL — Template Principal      ║
 * ║  Sidebar (260px Navy) + Header (64px) +   ║
 * ║  Canvas (#EDF0F1)                         ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import {
  Home, Atom, Layers, Box, LayoutTemplate, Palette,
  ChevronDown, ChevronRight, Sparkles, Menu, X, Search,
  Shield, Clock, Figma, Moon, Sun, Bot, Brush, BookOpen,
} from 'lucide-react';
import { KNavItem } from '../design-system/molecules';
import { KText } from '../design-system/atoms';
import { khorTokens } from '../../theme/khor-theme';
import { KCommandBar, useCommandBar } from '../design-system/command-bar';
import { useTheme } from '../../theme/theme-context';

/* Dot estilizado para sub-items en sidebar expandido */
const NavDot = () => (
  <span style={{
    width: 6, height: 6, borderRadius: '50%',
    backgroundColor: 'currentColor', opacity: 0.6,
    display: 'inline-block', flexShrink: 0,
  }} />
);

/* Color fijo del sidebar — no debe cambiar con dark mode */
const SIDEBAR_BG = '#051758';
const SIDEBAR_COLLAPSED_WIDTH = 64;

interface NavSection {
  title: string;
  icon: React.ReactNode;
  path?: string;            // direct link — no sub-items
  items?: { label: string; path: string }[];
}

const navigation: NavSection[] = [
  {
    title: 'Inicio',
    icon: <Home size={18} strokeWidth={2} />,
    path: '/',
  },
  {
    title: 'Tokens',
    icon: <Palette size={18} strokeWidth={2} />,
    items: [
      { label: 'Colores', path: '/tokens#colores' },
      { label: 'Tipografía', path: '/tokens#tipografia' },
      { label: 'Espaciado', path: '/tokens#espaciado' },
      { label: 'Sombras', path: '/tokens#sombras' },
      { label: 'Código', path: '/tokens#codigo' },
    ],
  },
  {
    title: 'Átomos',
    icon: <Atom size={18} strokeWidth={2} />,
    items: [
      { label: 'KAffix', path: '/atoms/affix' },
      { label: 'KAlert', path: '/atoms/alert' },
      { label: 'KAvatar', path: '/atoms/avatar' },
      { label: 'KBadge', path: '/atoms/badge' },
      { label: 'KButton', path: '/atoms/button' },
      { label: 'KButtonGroup', path: '/atoms/button-group' },
      { label: 'KCheckbox', path: '/atoms/checkbox' },
      { label: 'KDivider', path: '/atoms/divider' },
      { label: 'KFloatButton', path: '/atoms/float-button' },
      { label: 'KImage', path: '/atoms/image' },
      { label: 'KInput', path: '/atoms/input' },
      { label: 'KInputPassword', path: '/atoms/input-password' },
      { label: 'KInputSearch', path: '/atoms/input-search' },
      { label: 'KProgress', path: '/atoms/progress' },
      { label: 'KQRCode', path: '/atoms/qrcode' },
      { label: 'KRadio', path: '/atoms/radio' },
      { label: 'KRate', path: '/atoms/rate' },
      { label: 'KSkeleton', path: '/atoms/skeleton' },
      { label: 'KSlider', path: '/atoms/slider' },
      { label: 'KSpace', path: '/atoms/space' },
      { label: 'KSpin', path: '/atoms/spin' },
      { label: 'KSwitch', path: '/atoms/switch' },
      { label: 'KTag', path: '/atoms/tag' },
      { label: 'KTextArea', path: '/atoms/textarea' },
      { label: 'KTooltip', path: '/atoms/tooltip' },
      { label: 'KTypography', path: '/atoms/typography' },
      { label: 'KWatermark', path: '/atoms/watermark' },
    ],
  },
  {
    title: 'Moléculas',
    icon: <Layers size={18} strokeWidth={2} />,
    items: [
      { label: 'KAccordion', path: '/molecules/accordion' },
      { label: 'KAnchor', path: '/molecules/anchor' },
      { label: 'KAutocomplete', path: '/molecules/autocomplete' },
      { label: 'KBreadcrumb', path: '/molecules/breadcrumb' },
      { label: 'KCascader', path: '/molecules/cascader' },
      { label: 'KColorPicker', path: '/molecules/color-picker' },
      { label: 'KDatePicker', path: '/molecules/date-picker' },
      { label: 'KDateRangePicker', path: '/molecules/date-range' },
      { label: 'KDescriptions', path: '/molecules/descriptions' },
      { label: 'KDividerExt', path: '/molecules/divider-ext' },
      { label: 'KDropdownMenu', path: '/molecules/dropdown' },
      { label: 'KEmptyState', path: '/molecules/empty-state' },
      { label: 'KFormField', path: '/molecules/form-field' },
      { label: 'KInputNumber', path: '/molecules/input-number' },
      { label: 'KList', path: '/molecules/list' },
      { label: 'KMentions', path: '/molecules/mentions' },
      { label: 'KNavItem', path: '/molecules/nav-item' },
      { label: 'KPopconfirm', path: '/molecules/popconfirm' },
      { label: 'KPopover', path: '/molecules/popover' },
      { label: 'KResult', path: '/molecules/result' },
      { label: 'KSearchInput', path: '/molecules/search-input' },
      { label: 'KSegmented', path: '/molecules/segmented' },
      { label: 'KSelectAdvanced', path: '/molecules/select-advanced' },
      { label: 'KSelectField', path: '/molecules/select-field' },
      { label: 'KStatCard', path: '/molecules/stat-card' },
      { label: 'KStatistic', path: '/molecules/statistic' },
      { label: 'KSteps', path: '/molecules/steps' },
      { label: 'KTimeline', path: '/molecules/timeline' },
      { label: 'KTimePicker', path: '/molecules/time-picker' },
      { label: 'KTransfer', path: '/molecules/transfer' },
      { label: 'KTreeSelect', path: '/molecules/tree-select' },
      { label: 'KUserCell', path: '/molecules/user-cell' },
    ],
  },
  {
    title: 'Organismos',
    icon: <Box size={18} strokeWidth={2} />,
    items: [
      { label: 'KCardSection', path: '/organisms/card-section' },
      { label: 'KCommandBar', path: '/organisms/command-bar' },
      { label: 'KDataTable', path: '/organisms/data-table' },
      { label: 'KDrawer', path: '/organisms/drawer' },
      { label: 'KFormList', path: '/organisms/form-list' },
      { label: 'KModal', path: '/organisms/modal' },
      { label: 'KModalConfirm', path: '/organisms/modal-confirm' },
      { label: 'KSparklineCell', path: '/organisms/sparkline' },
      { label: 'KTabs', path: '/organisms/tabs' },
      { label: 'KToastManager', path: '/organisms/toast-manager' },
      { label: 'KTour', path: '/organisms/tour' },
      { label: 'KTree', path: '/organisms/tree' },
      { label: 'KUpload', path: '/organisms/upload' },
    ],
  },
  {
    title: 'Patrones / Recipes',
    icon: <BookOpen size={18} strokeWidth={2} />,
    items: [
      { label: 'Todos los Patrones', path: '/patterns' },
      { label: 'Login', path: '/templates/login' },
      { label: 'Dashboard', path: '/templates/dashboard' },
      { label: 'CRUD Table', path: '/templates/crud' },
      { label: 'Formulario Multi-Paso', path: '/templates/form' },
    ],
  },
  {
    title: 'Herramientas',
    icon: <Sparkles size={18} strokeWidth={2} />,
    items: [
      { label: 'Theming en Vivo', path: '/theming' },
      { label: 'Contraste WCAG', path: '/wcag-checker' },
      { label: 'Accesibilidad WCAG', path: '/accessibility' },
      { label: 'Exportar a Figma', path: '/figma-export' },
      { label: 'Guía para IA', path: '/ai-export' },
      { label: 'Changelog', path: '/changelog' },
    ],
  },
];

export function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const { open: cmdOpen, setOpen: setCmdOpen } = useCommandBar();
  const { mode, toggle: toggleTheme, isDark } = useTheme();

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', fontFamily: khorTokens.typography.fontPrimary }}>
      {/* Sidebar */}
      <aside
        style={{
          width: collapsed ? SIDEBAR_COLLAPSED_WIDTH : khorTokens.layout.sidebarWidth,
          minWidth: collapsed ? SIDEBAR_COLLAPSED_WIDTH : khorTokens.layout.sidebarWidth,
          backgroundColor: SIDEBAR_BG,
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.2s ease, min-width 0.2s ease',
          overflow: 'hidden',
        }}
      >
        {/* Logo Area */}
        <div style={{
          height: khorTokens.layout.headerHeight,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? '0' : '0 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
        }}>
          {collapsed ? (
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: khorTokens.colors.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
              K
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {/* Logo placeholder */}
              <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: khorTokens.colors.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>
                K
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>Khor</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 500 }}>Design System</div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, overflow: 'auto', padding: '12px 8px' }}>
          {navigation.map((section) => {
            const isDirectLink = !!section.path && !section.items;
            const isDirectActive = isDirectLink && location.pathname === section.path;

            return (
            <div key={section.title} style={{ marginBottom: 4 }}>
              {collapsed ? (
                /* ── Collapsed: solo icono de sección ── */
                <button
                  onClick={() => {
                    if (isDirectLink) {
                      navigate(section.path!);
                    } else {
                      setCollapsed(false);
                    }
                  }}
                  title={section.title}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: 44,
                    padding: 0,
                    border: 'none',
                    background: isDirectActive ? 'rgba(255,255,255,0.12)' : 'none',
                    color: isDirectActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)',
                    cursor: 'pointer',
                    borderRadius: 8,
                    transition: 'all 0.15s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isDirectActive ? 'rgba(255,255,255,0.12)' : 'transparent';
                    e.currentTarget.style.color = isDirectActive ? '#FFFFFF' : 'rgba(255,255,255,0.6)';
                  }}
                >
                  {isDirectActive && (
                    <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', backgroundColor: '#E04D36' }} />
                  )}
                  {section.icon}
                </button>
              ) : isDirectLink ? (
                /* ── Expanded: direct link (no sub-items) ── */
                <button
                  onClick={() => navigate(section.path!)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    width: '100%',
                    padding: '8px 12px',
                    border: 'none',
                    background: isDirectActive ? 'rgba(255,255,255,0.12)' : 'none',
                    color: isDirectActive ? '#FFFFFF' : 'rgba(255,255,255,0.7)',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: khorTokens.typography.fontPrimary,
                    borderRadius: 8,
                    transition: 'all 0.15s ease',
                    position: 'relative',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!isDirectActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.color = '#FFFFFF';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isDirectActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                    }
                  }}
                >
                  {isDirectActive && (
                    <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', backgroundColor: '#E04D36' }} />
                  )}
                  {section.icon}
                  <span>{section.title}</span>
                </button>
              ) : (
                /* ── Expanded: cabecera de sección + sub-items ── */
                <>
                  <button
                    onClick={() => toggleSection(section.title)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      width: '100%',
                      padding: '6px 12px',
                      border: 'none',
                      background: 'none',
                      color: 'rgba(255,255,255,0.4)',
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      cursor: 'pointer',
                      fontFamily: khorTokens.typography.fontPrimary,
                    }}
                  >
                    {section.icon}
                    <span style={{ flex: 1, textAlign: 'left' }}>{section.title}</span>
                    {openSections[section.title] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </button>
                  {openSections[section.title] && section.items && (
                    <div style={{ marginTop: 2 }}>
                      {section.items.map((item) => {
                        const [itemPath, itemHash] = item.path.split('#');
                        const isActive = itemHash
                          ? location.pathname === itemPath && location.hash === `#${itemHash}`
                          : location.pathname === item.path;
                        return (
                          <KNavItem
                            key={item.path}
                            icon={<NavDot />}
                            label={item.label}
                            active={isActive}
                            onClick={() => {
                              if (itemHash) {
                                navigate(itemPath);
                                setTimeout(() => {
                                  const el = document.getElementById(itemHash);
                                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }, 100);
                              } else {
                                navigate(item.path);
                              }
                            }}
                          />
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
            );
          })}
        </nav>

        {/* Collapse Toggle */}
        <div style={{ padding: 8, borderTop: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: '100%',
              padding: '10px',
              border: 'none',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.5)',
              borderRadius: khorTokens.radius.md,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              fontSize: 12,
              fontFamily: khorTokens.typography.fontPrimary,
            }}
          >
            {collapsed ? <Menu size={16} /> : <><X size={14} /> Colapsar</>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <header style={{
          height: khorTokens.layout.headerHeight,
          backgroundColor: 'var(--card)',
          boxShadow: 'var(--khor-shadow-sm)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          flexShrink: 0,
          zIndex: 10,
          borderBottom: '1px solid var(--border)',
          transition: 'background-color 0.2s ease, border-color 0.2s ease',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: 'var(--foreground)' }}>
              Khor Design System
            </h3>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: 999,
              backgroundColor: 'var(--khor-success-light)',
              color: 'var(--khor-success)',
            }}>
              v2.4.0
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: khorTokens.radius.md,
                border: '1px solid var(--border)',
                backgroundColor: isDark ? 'var(--khor-neutral-200)' : 'transparent',
                cursor: 'pointer', color: isDark ? 'var(--khor-accent)' : 'var(--muted-foreground)',
                transition: 'all 0.2s ease',
              }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            {/* Command bar hint */}
            <div
              onClick={() => setCmdOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 16px',
                borderRadius: khorTokens.radius.md,
                border: '1px solid var(--border)',
                color: 'var(--muted-foreground)',
                fontSize: 13,
                cursor: 'pointer',
              }}>
              <Search size={14} />
              <span>Buscar componentes...</span>
              <kbd style={{ backgroundColor: 'var(--muted)', padding: '1px 6px', borderRadius: 4, fontSize: 11, border: '1px solid var(--border)' }}>Ctrl+K</kbd>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: khorTokens.radius.md, backgroundColor: 'rgba(224,77,54,0.08)', color: khorTokens.colors.brand.primary, fontSize: 12, fontWeight: 600 }}>
              <Sparkles size={14} />
              IA Ready
            </div>
          </div>
        </header>

        {/* Canvas */}
        <main style={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: 'var(--background)',
          padding: khorTokens.spacing.lg,
          transition: 'background-color 0.2s ease',
        }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>

        {/* Command Bar */}
        <KCommandBar open={cmdOpen} onClose={() => setCmdOpen(false)} />
      </div>
    </div>
  );
}