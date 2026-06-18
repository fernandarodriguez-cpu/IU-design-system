import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import {
  Home, Atom, Layers, Box, Palette, Wrench,
  ChevronDown, ChevronLeft, ChevronRight, Search, BookOpen,
} from 'lucide-react';
import { KNavItem } from '../design-system/molecules/KNavItem';
import { patterns } from '../../patterns/index';
import { khorTokens } from '../../theme/khor-theme';
import { KHOR_VERSION } from '../../version/version';
import { KCommandBar, useCommandBar } from '../design-system/command-bar';
import khorCounts from '../../metadata/khor-counts.json';

/* Dot estilizado para sub-items en sidebar expandido */
const NavDot = () => (
  <span style={{
    width: 6, height: 6, borderRadius: '50%',
    backgroundColor: 'currentColor', opacity: 0.6,
    display: 'inline-block', flexShrink: 0,
  }} />
);

/* Sidebar background uses the brand navy, fixed regardless of theme */
const SIDEBAR_BG = khorTokens.colors.brand.navy;
const SIDEBAR_COLLAPSED_WIDTH = khorTokens.sizing[16];

interface NavSection {
  title: string;
  icon: React.ReactNode;
  path?: string;            // direct link — no sub-items
  items?: { label: string; path: string }[];
}

const navigation: NavSection[] = [
  {
    title: 'Inicio',
    icon: <Home size={14} strokeWidth={1.5} />,
    path: '/',
  },
  {
    title: 'Tokens',
    icon: <Palette size={14} strokeWidth={1.5} />,
    items: [
      { label: 'Core Color Palette', path: '/tokens#color' },
      { label: 'Semantic Application Layer', path: '/tokens#semantic-layer' },
      { label: 'Density & Spacing Matrix', path: '/tokens#density' },
      { label: 'WCAG Contrast Cert', path: '/tokens#contrast' },
      { label: 'Fluid Typography System', path: '/tokens#font-family' },
      { label: 'Iconography Scale', path: '/tokens#iconography' },
      { label: 'Shadow Construction', path: '/tokens#shadow' },
      { label: 'Z-Index Scale', path: '/tokens#z-index' },
      { label: 'Motion & Easing', path: '/tokens#motion' },
    ],
  },
  {
    title: 'Átomos',
    icon: <Atom size={14} strokeWidth={1.5} />,
    items: [
      { label: 'Alert', path: '/atoms/alert' },
      { label: 'Avatar', path: '/atoms/avatar' },
      { label: 'Badge', path: '/atoms/badge' },
      { label: 'Button', path: '/atoms/button' },
      { label: 'ButtonGroup', path: '/atoms/button-group' },
      { label: 'Checkbox', path: '/atoms/checkbox' },
      { label: 'Divider', path: '/atoms/divider' },
      { label: 'ScrollBar', path: '/atoms/scrollbar' },
      { label: 'Skeleton', path: '/atoms/skeleton' },
      { label: 'Flex', path: '/atoms/flex' },
      { label: 'FloatButton', path: '/atoms/float-button' },
      { label: 'Grid (Row/Col)', path: '/atoms/grid' },
      { label: 'Image', path: '/atoms/image' },
      { label: 'Input', path: '/atoms/input' },
      { label: 'InputPassword', path: '/atoms/input-password' },
      { label: 'SearchInput', path: '/atoms/search-input' },
      { label: 'PhoneInput', path: '/atoms/phone-input' },
      { label: 'SelectInput', path: '/atoms/select-input' },
      { label: 'Progress', path: '/atoms/progress' },
      { label: 'QRCode', path: '/atoms/qrcode' },
      { label: 'Radio', path: '/atoms/radio' },
      { label: 'Slider', path: '/atoms/slider' },
      { label: 'Space', path: '/atoms/space' },
      { label: 'Spin', path: '/atoms/spin' },
      { label: 'Switch', path: '/atoms/switch' },
      { label: 'Tag', path: '/atoms/tag' },
      { label: 'TextArea', path: '/atoms/textarea' },
      { label: 'Tooltip', path: '/atoms/tooltip' },
      { label: 'Typography', path: '/atoms/typography' },
    ],
  },
  {
    title: 'Moléculas',
    icon: <Layers size={14} strokeWidth={1.5} />,
    items: [
      { label: 'Accordion', path: '/molecules/accordion' },
      { label: 'Anchor', path: '/molecules/anchor' },
      { label: 'Autocomplete', path: '/molecules/autocomplete' },
      { label: 'Breadcrumb', path: '/molecules/breadcrumb' },
      { label: 'Cascader', path: '/molecules/cascader' },
      { label: 'ColorPicker', path: '/molecules/color-picker' },
      { label: 'ContextMenu', path: '/molecules/context-menu' },
      { label: 'DatePicker', path: '/molecules/date-picker' },
      { label: 'Descriptions', path: '/molecules/descriptions' },
      { label: 'DividerExtended', path: '/molecules/divider-extended' },
      { label: 'DropdownMenu', path: '/molecules/dropdown' },
      { label: 'EmptyState', path: '/molecules/empty-state' },
      { label: 'FormField', path: '/molecules/form-field' },
      { label: 'HoverCard', path: '/molecules/hover-card' },
      { label: 'InputNumber', path: '/molecules/input-number' },
      { label: 'List', path: '/molecules/list' },
      { label: 'NavItem', path: '/molecules/nav-item' },
      { label: 'Popconfirm', path: '/molecules/popconfirm' },
      { label: 'Popover', path: '/molecules/popover' },
      { label: 'Result', path: '/molecules/result' },
      { label: 'Segmented', path: '/molecules/segmented' },
      { label: 'SelectAdvanced', path: '/molecules/select-advanced' },
      { label: 'SelectField', path: '/molecules/select-field' },
      { label: 'StatCard', path: '/molecules/stat-card' },
      { label: 'Statistic', path: '/molecules/statistic' },
      { label: 'Steps', path: '/molecules/steps' },
      { label: 'Timeline', path: '/molecules/timeline' },
      { label: 'TimePicker', path: '/molecules/time-picker' },
      { label: 'UserCell', path: '/molecules/user-cell' },
    ],
  },
  {
    title: 'Organismos',
    icon: <Box size={14} strokeWidth={1.5} />,
    items: [
      { label: 'Calendar', path: '/organisms/calendar' },
      { label: 'CardSection', path: '/organisms/card-section' },
      { label: 'Carousel', path: '/organisms/carousel' },
      { label: 'CommandBar', path: '/organisms/command-bar' },
      { label: 'DataTable', path: '/organisms/data-table' },
      { label: 'Form', path: '/organisms/form' },
      { label: 'FormList', path: '/organisms/form-list' },
      { label: 'FormWizard', path: '/organisms/form-wizard' },
      { label: 'LoginForm', path: '/organisms/login-form' },
      { label: 'Modal', path: '/organisms/modal' },
      { label: 'Pagination', path: '/organisms/pagination' },
      { label: 'Resizable', path: '/organisms/resizable' },
      { label: 'Sheet', path: '/organisms/sheet' },
      { label: 'SparklineCell', path: '/organisms/sparkline' },
      { label: 'Tabs', path: '/organisms/tabs' },
      { label: 'ToastManager', path: '/organisms/toast-manager' },
      { label: 'Tour', path: '/organisms/tour' },
      { label: 'Tree', path: '/organisms/tree' },
      { label: 'Upload', path: '/organisms/upload' },
      { label: 'Gantt Timeline', path: '/organisms/gantt' },
      { label: 'Header', path: '/organisms/header' },
      { label: 'Editor Pro', path: '/organisms/editor' },
      { label: 'SidebarMenu', path: '/organisms/sidebar-menu' },
      { label: 'Gráficas', path: '/organisms/charts' },
      { label: 'Page Layouts', path: '/layouts' },
    ],
  },
  {
    title: 'Patrones / Recipes',
    icon: <BookOpen size={14} strokeWidth={1.5} />,
    items: [
      { label: 'Todos los Patrones', path: '/patterns' },
      ...patterns.map(p => ({ label: p.title, path: `/patterns/${p.id}` })),
    ],
  },
  {
    title: 'Herramientas',
    icon: <Wrench size={14} strokeWidth={1.5} />,
    items: [
      { label: 'Theming en Vivo', path: '/theming' },
      { label: 'Explorador de Iconos', path: '/icons' },
      { label: 'hor Guardian (A11y)', path: '/guardian' },
      { label: 'Exportar a Figma', path: '/figma-export' },
      { label: 'Inspiración Elite', path: '/inspiration' },
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
          padding: collapsed ? '0' : `0 ${khorTokens.spacing.md}px`,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0,
        }}>
          {collapsed ? (
            <div style={{ width: khorTokens.sizing[8], height: khorTokens.sizing[8], borderRadius: khorTokens.radius.md, backgroundColor: khorTokens.colors.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: khorTokens.colors.feedback.white, fontWeight: khorTokens.typography.fontWeights.bold, fontSize: 14 }}>
              K
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: khorTokens.spacing.sm }}>
              {/* Logo placeholder */}
              <div style={{ width: khorTokens.sizing[8], height: khorTokens.sizing[8], borderRadius: khorTokens.radius.md, backgroundColor: khorTokens.colors.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: khorTokens.colors.feedback.white, fontWeight: khorTokens.typography.fontWeights.bold, fontSize: 14 }}>
                K
              </div>
              <div>
                <div style={{ color: khorTokens.colors.feedback.white, fontWeight: khorTokens.typography.fontWeights.bold, fontSize: khorTokens.typography.bodyLg.size, lineHeight: 1 }}>Khor</div>
                <div style={{ color: 'var(--khor-text-on-dark-muted)', fontSize: 10, fontWeight: khorTokens.typography.fontWeights.medium }}>Design System</div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, overflow: 'auto', padding: '12px 8px' }}>
          {navigation.map((section) => {
            const isDirectLink = !!section.path && !section.items;
            const isDirectActive = isDirectLink && location.pathname === section.path;
            const isSectionActive = !isDirectLink && !!section.items?.some(item => {
              const [itemPath] = item.path.split('#');
              return location.pathname === itemPath || location.pathname.startsWith(itemPath + '/');
            });
            const isAnyActive = isDirectActive || isSectionActive;

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
                      height: 50,
                      padding: 0,
                      border: 'none',
                      background: isAnyActive ? 'rgba(255,255,255,0.08)' : 'none',
                      color: isAnyActive ? 'var(--khor-text-on-dark)' : 'var(--khor-text-on-dark-secondary)',
                      cursor: 'pointer',
                      borderRadius: 0,
                      transition: 'background 0.15s ease, color 0.15s ease',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      if (!isAnyActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(47,71,143,1)';
                        e.currentTarget.style.color = 'var(--khor-text-on-dark)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = isAnyActive ? 'rgba(255,255,255,0.08)' : 'transparent';
                      e.currentTarget.style.color = isAnyActive ? 'var(--khor-text-on-dark)' : 'var(--khor-text-on-dark-secondary)';
                    }}
                  >
                    {isAnyActive && (
                      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 4, borderRadius: 0, backgroundColor: 'rgba(224,77,54,1)' }} />
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
                      gap: khorTokens.spacing.sm,
                      width: '100%',
                      height: 50,
                      padding: `0 ${khorTokens.spacing.md}px`,
                      border: 'none',
                      background: isDirectActive ? 'rgba(255,255,255,0.08)' : 'none',
                      color: isDirectActive ? '#ffffff' : 'rgba(179,180,187,1)',
                      fontSize: 14,
                      fontWeight: isDirectActive ? 600 : 400,
                      cursor: 'pointer',
                      fontFamily: khorTokens.typography.fontPrimary,
                      borderRadius: 0,
                      transition: 'background 0.15s ease, color 0.15s ease',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    onMouseEnter={(e) => {
                      if (!isDirectActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(47,71,143,1)';
                        e.currentTarget.style.color = 'var(--khor-text-on-dark)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isDirectActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'rgba(179,180,187,1)';
                      }
                    }}
                  >
                    {isDirectActive && (
                      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 4, borderRadius: 0, backgroundColor: 'rgba(224,77,54,1)' }} />
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
                        gap: khorTokens.spacing.sm,
                        width: '100%',
                        height: 50,
                        padding: `0 ${khorTokens.spacing.md}px`,
                        border: 'none',
                        background: isSectionActive ? 'rgba(255,255,255,0.08)' : 'none',
                        color: isSectionActive ? '#ffffff' : 'rgba(179,180,187,1)',
                        fontSize: 14,
                        fontWeight: isSectionActive ? 600 : 400,
                        cursor: 'pointer',
                        fontFamily: khorTokens.typography.fontPrimary,
                        borderRadius: 0,
                        transition: 'background 0.15s ease, color 0.15s ease',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                      onMouseEnter={(e) => {
                        if (!isSectionActive) {
                          e.currentTarget.style.backgroundColor = 'rgba(47,71,143,1)';
                          e.currentTarget.style.color = 'var(--khor-text-on-dark)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = isSectionActive ? 'rgba(255,255,255,0.08)' : 'transparent';
                        e.currentTarget.style.color = isSectionActive ? '#ffffff' : 'rgba(179,180,187,1)';
                      }}
                    >
                      {isSectionActive && (
                        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 4, borderRadius: 0, backgroundColor: 'rgba(224,77,54,1)' }} />
                      )}
                      {section.icon}
                      <span style={{ flex: 1, textAlign: 'left' }}>{section.title}</span>
                      {!collapsed && (
                        <span style={{ 
                          fontSize: 10, 
                          color: 'var(--khor-text-on-dark-disabled)',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          padding: '1px 6px', 
                          borderRadius: 4,
                          marginRight: 6,
                          fontWeight: 700
                        }}>
                          {section.title === 'Átomos' && khorCounts.atoms}
                          {section.title === 'Moléculas' && khorCounts.molecules}
                          {section.title === 'Organismos' && khorCounts.organisms}
                          {section.title === 'Patrones / Recipes' && khorCounts.patterns}
                        </span>
                      )}
                      {openSections[section.title] ? <ChevronDown size={14} strokeWidth={1.5} /> : <ChevronRight size={14} strokeWidth={1.5} />}
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

        {/* Collapse Toggle — same style as KSidebarMenu Ocultar */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            paddingLeft: 16,
            paddingRight: 16,
            height: 50,
            width: '100%',
            border: 'none',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            background: 'transparent',
            color: 'rgba(236,238,247,1)',
            cursor: 'pointer',
            fontFamily: khorTokens.typography.fontPrimary,
            fontSize: 14,
            fontWeight: 600,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            overflow: 'hidden',
            transition: 'background 0.15s ease, color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(47,71,143,1)';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'rgba(236,238,247,1)';
          }}
        >
          {collapsed
            ? <ChevronRight size={14} strokeWidth={1.5} style={{ flexShrink: 0 }} />
            : <><ChevronLeft size={14} strokeWidth={1.5} style={{ flexShrink: 0 }} />{!collapsed && <span>Ocultar</span>}</>
          }
        </button>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <header style={{
          height: khorTokens.layout.headerHeight,
          backgroundColor: 'var(--khor-surface-card)',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: khorTokens.spacing.md }}>
            <h3 style={{ margin: 0, fontSize: khorTokens.typography.h4.size, fontWeight: khorTokens.typography.fontWeights.semibold, color: 'var(--foreground)' }}>
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
              v{KHOR_VERSION}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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