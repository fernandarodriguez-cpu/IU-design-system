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
  Shield, Clock, Figma, Moon, Sun, Bot,
} from 'lucide-react';
import { KNavItem } from '../design-system/molecules';
import { KText } from '../design-system/atoms';
import { khorTokens } from '../../theme/khor-theme';
import { KCommandBar, useCommandBar } from '../design-system/command-bar';
import { useTheme } from '../../theme/theme-context';

interface NavSection {
  title: string;
  icon: React.ReactNode;
  items: { label: string; path: string }[];
}

const navigation: NavSection[] = [
  {
    title: 'Inicio',
    icon: <Home size={18} strokeWidth={2} />,
    items: [{ label: 'Vista General', path: '/' }],
  },
  {
    title: 'Tokens',
    icon: <Palette size={18} strokeWidth={2} />,
    items: [{ label: 'Colores y Tipografía', path: '/tokens' }],
  },
  {
    title: 'Átomos',
    icon: <Atom size={18} strokeWidth={2} />,
    items: [
      { label: 'KButton', path: '/atoms/button' },
      { label: 'KInput', path: '/atoms/input' },
      { label: 'KBadge', path: '/atoms/badge' },
      { label: 'KTag', path: '/atoms/tag' },
      { label: 'KAvatar', path: '/atoms/avatar' },
      { label: 'KSwitch', path: '/atoms/switch' },
      { label: 'KCheckbox', path: '/atoms/checkbox' },
      { label: 'KRadio', path: '/atoms/radio' },
      { label: 'KTooltip', path: '/atoms/tooltip' },
      { label: 'KProgress', path: '/atoms/progress' },
      { label: 'KTypography', path: '/atoms/typography' },
      { label: 'KAlert', path: '/atoms/alert' },
      { label: 'KSkeleton', path: '/atoms/skeleton' },
      { label: 'KSlider', path: '/atoms/slider' },
      { label: 'KRate', path: '/atoms/rate' },
      { label: 'KSpin', path: '/atoms/spin' },
      { label: 'KDivider', path: '/atoms/divider' },
      { label: 'KTextArea', path: '/atoms/textarea' },
    ],
  },
  {
    title: 'Moléculas',
    icon: <Layers size={18} strokeWidth={2} />,
    items: [
      { label: 'KFormField', path: '/molecules/form-field' },
      { label: 'KSearchInput', path: '/molecules/search-input' },
      { label: 'KStatCard', path: '/molecules/stat-card' },
      { label: 'KNavItem', path: '/molecules/nav-item' },
      { label: 'KSelectField', path: '/molecules/select-field' },
      { label: 'KUserCell', path: '/molecules/user-cell' },
      { label: 'KEmptyState', path: '/molecules/empty-state' },
      { label: 'KBreadcrumb', path: '/molecules/breadcrumb' },
      { label: 'KSteps', path: '/molecules/steps' },
      { label: 'KDropdownMenu', path: '/molecules/dropdown' },
      { label: 'KPopover', path: '/molecules/popover' },
      { label: 'KAccordion', path: '/molecules/accordion' },
    ],
  },
  {
    title: 'Organismos',
    icon: <Box size={18} strokeWidth={2} />,
    items: [
      { label: 'KDataTable', path: '/organisms/data-table' },
      { label: 'KModal', path: '/organisms/modal' },
      { label: 'KDrawer', path: '/organisms/drawer' },
      { label: 'KCardSection', path: '/organisms/card-section' },
      { label: 'KTabs', path: '/organisms/tabs' },
      { label: 'KToastManager', path: '/organisms/toast-manager' },
      { label: 'SparklineCell', path: '/organisms/sparkline' },
      { label: 'CommandBar', path: '/organisms/command-bar' },
    ],
  },
  {
    title: 'Templates',
    icon: <LayoutTemplate size={18} strokeWidth={2} />,
    items: [
      { label: 'Login', path: '/templates/login' },
      { label: 'Dashboard', path: '/templates/dashboard' },
      { label: 'CRUD Table', path: '/templates/crud' },
      { label: 'Formulario', path: '/templates/form' },
    ],
  },
  {
    title: 'Herramientas',
    icon: <Sparkles size={18} strokeWidth={2} />,
    items: [
      { label: 'Accesibilidad WCAG', path: '/accessibility' },
      { label: 'Exportar a Figma', path: '/figma-export' },
      { label: 'Guia para IA', path: '/ai-export' },
      { label: 'Changelog', path: '/changelog' },
    ],
  },
];

export function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    Inicio: true,
    Tokens: true,
    'Átomos': true,
    'Moléculas': true,
    Organismos: true,
    Templates: true,
    Herramientas: true,
  });
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
          width: collapsed ? 64 : khorTokens.layout.sidebarWidth,
          minWidth: collapsed ? 64 : khorTokens.layout.sidebarWidth,
          backgroundColor: khorTokens.colors.brand.navy,
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
          {navigation.map((section) => (
            <div key={section.title} style={{ marginBottom: 4 }}>
              {!collapsed && (
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
              )}
              {(collapsed || openSections[section.title]) && (
                <div style={{ marginTop: 2 }}>
                  {section.items.map((item) => (
                    <KNavItem
                      key={item.path}
                      label={item.label}
                      active={location.pathname === item.path}
                      onClick={() => navigate(item.path)}
                      collapsed={collapsed}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
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
              v1.0.0
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