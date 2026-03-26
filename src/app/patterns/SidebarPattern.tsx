import React, { useState } from 'react';
import { Home, Layers, Settings, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { KBadge } from '../components/design-system/atoms/index';
import { KNavItem } from '../components/design-system/molecules/index';
import { khorTokens } from '../theme/khor-theme';
import { Pattern } from './types';

const t = khorTokens;
const font = t.typography.fontPrimary;

function SidebarPatternComponent() {
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({ 'Componentes': true });
  const [activePath, setActivePath] = useState('/components/buttons');

  const nav = [
    { title: 'Dashboard', icon: <Home size={18} strokeWidth={2} />, path: '/dashboard' },
    {
      title: 'Componentes', icon: <Layers size={18} strokeWidth={2} />,
      items: [
        { label: 'Botones (Atoms)', path: '/components/buttons' },
        { label: 'Formularios (Mols)', path: '/components/forms' },
      ]
    },
    { title: 'Configuración', icon: <Settings size={18} strokeWidth={2} />, path: '/settings' }
  ];

  const SIDEBAR_BG = '#051758';
  const toggleSection = (t: string) => setOpenSections(prev => ({ ...prev, [t]: !prev[t] }));
  const NavDot = () => <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor', opacity: 0.6, display: 'inline-block', flexShrink: 0 }} />;

  return (
    <div style={{ height: 500, display: 'flex', borderRadius: t.radius.xl, overflow: 'hidden', border: '1px solid var(--border)', backgroundColor: 'var(--background)' }}>
      {/* Sidebar Layout */}
      <aside style={{
        width: collapsed ? 64 : 260,
        backgroundColor: SIDEBAR_BG,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease',
        overflow: 'hidden'
      }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? 0 : '0 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
          {collapsed ? (
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: t.colors.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>K</div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: t.colors.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>K</div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>Khor</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 500 }}>System</div>
              </div>
            </div>
          )}
        </div>
        <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
          {nav.map(section => {
            const isDirectLink = !!section.path && !section.items;
            const isDirectActive = isDirectLink && activePath === section.path;

            return (
              <div key={section.title} style={{ marginBottom: 4 }}>
                {collapsed ? (
                  <button onClick={() => isDirectLink ? setActivePath(section.path!) : setCollapsed(false)} title={section.title} style={{
                    width: '100%', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: 8,
                    background: isDirectActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                    color: isDirectActive ? '#fff' : 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.15s ease', position: 'relative'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isDirectActive ? 'rgba(255,255,255,0.12)' : 'transparent'; e.currentTarget.style.color = isDirectActive ? '#fff' : 'rgba(255,255,255,0.6)'; }}
                  >
                    {isDirectActive && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', backgroundColor: '#E04D36' }} />}
                    {section.icon}
                  </button>
                ) : isDirectLink ? (
                  <button onClick={() => setActivePath(section.path!)} style={{
                    width: '100%', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, border: 'none', borderRadius: 8,
                    background: isDirectActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                    color: isDirectActive ? '#fff' : 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer', position: 'relative', transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => { if(!isDirectActive) { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = '#fff'; } }}
                  onMouseLeave={(e) => { if(!isDirectActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; } }}
                  >
                    {isDirectActive && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', backgroundColor: '#E04D36' }} />}
                    {section.icon}<span>{section.title}</span>
                  </button>
                ) : (
                  <>
                    <button onClick={() => toggleSection(section.title)} style={{
                      width: '100%', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: 'transparent',
                      color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600, fontFamily: font, textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer'
                    }}>
                      {section.icon}<span style={{ flex: 1, textAlign: 'left' }}>{section.title}</span>
                      {openSections[section.title] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                    </button>
                    {openSections[section.title] && section.items && (
                      <div style={{ marginTop: 2 }}>
                        {section.items.map(item => (
                          <KNavItem key={item.path} icon={<NavDot />} label={item.label} active={activePath === item.path} onClick={() => setActivePath(item.path)} />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </nav>
        <div style={{ padding: 8, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{
            width: '100%', padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none', borderRadius: t.radius.md,
            background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500, fontFamily: font, cursor: 'pointer', transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
          >
            {collapsed ? <Menu size={16} /> : <><X size={14} /> Colapsar</>}
          </button>
        </div>
      </aside>

      {/* Demo App Canvas */}
      <div style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h4 style={{ margin: 0, fontSize: 20, fontWeight: 600, color: 'var(--foreground)' }}>Área de Trabajo Principal</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, color: 'var(--muted-foreground)' }}>Ruta Activa:</span>
          <KBadge variant="primary">{activePath}</KBadge>
        </div>
        <div style={{ padding: 16, backgroundColor: 'var(--card)', border: '1px solid var(--border)', borderRadius: t.radius.lg }}>
          <p style={{ margin: 0, fontSize: 14, color: 'var(--foreground)', lineHeight: 1.6 }}>
            Este es un entorno de demostración encapsulado. Interactúa con el menú lateral para ver cómo cambian los estados (expansión de acordeones y activación de rutas) independientemente del enrutamiento real de la aplicación.
          </p>
          <p style={{ margin: '12px 0 0', fontSize: 14, color: 'var(--foreground)', lineHeight: 1.6 }}>
            Usa el botón de <strong>Colapsar</strong> en la parte inferior para ver el comportamiento adaptativo (collapse a 64px) optimizado para sistemas de alta densidad.
          </p>
        </div>
      </div>
    </div>
  );
}

export const SidebarPattern: Pattern = {
  id: 'sidebar-navigation',
  title: 'Menú Lateral (Sidebar) Corporativo',
  description: 'Estructura repetitiva de navegación lateral. Mantiene el branding navy, soporte para secciones anidadas y un modo colapsado adaptativo.',
  category: 'Navegación',
  component: <SidebarPatternComponent />,
  code: `import { useState } from 'react';
import { Home, Layers, Settings, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { KNavItem } from '@khor/molecules';
// Importa tus tokens de tema (t.colors.brand.primary) si es necesario.

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [activePath, setActivePath] = useState('/dashboard');

  const nav = [
    { title: 'Dashboard', icon: <Home size={18} strokeWidth={2} />, path: '/dashboard' },
    {
      title: 'Componentes', icon: <Layers size={18} strokeWidth={2} />,
      items: [
        { label: 'Botones (Atoms)', path: '/components/buttons' },
        { label: 'Formularios (Mols)', path: '/components/forms' },
      ]
    },
    { title: 'Configuración', icon: <Settings size={18} strokeWidth={2} />, path: '/settings' }
  ];

  const toggleSection = (t: string) => setOpenSections(prev => ({ ...prev, [t]: !prev[t] }));
  const NavDot = () => <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor', opacity: 0.6, display: 'inline-block', flexShrink: 0 }} />;

  return (
    <aside style={{
      width: collapsed ? 64 : 260,
      backgroundColor: '#051758', // SIDEBAR_BG
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.2s ease', overflow: 'hidden',
      height: '100vh' // Ajusta según el layout padre
    }}>
      {/* HEADER LOGO */}
      <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? 0 : '0 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
        {collapsed ? (
          <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#E04D36', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>K</div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: '#E04D36', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700 }}>K</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>Khor</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 500 }}>System</div>
            </div>
          </div>
        )}
      </div>

      {/* NAVIGATION */}
      <nav style={{ flex: 1, padding: '12px 8px', overflowY: 'auto' }}>
        {nav.map(section => {
          const isDirectLink = !!section.path && !section.items;
          const isDirectActive = isDirectLink && activePath === section.path;

          return (
            <div key={section.title} style={{ marginBottom: 4 }}>
              {collapsed ? (
                /* COLLAPSED ITEM */
                <button onClick={() => isDirectLink ? setActivePath(section.path!) : setCollapsed(false)} title={section.title} style={{
                  width: '100%', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: 8,
                  background: isDirectActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: isDirectActive ? '#fff' : 'rgba(255,255,255,0.6)', cursor: 'pointer', transition: 'all 0.15s ease', position: 'relative'
                }}>
                  {isDirectActive && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', backgroundColor: '#E04D36' }} />}
                  {section.icon}
                </button>
              ) : isDirectLink ? (
                /* DIRECT LINK (NO ITEMS) */
                <button onClick={() => setActivePath(section.path!)} style={{
                  width: '100%', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, border: 'none', borderRadius: 8,
                  background: isDirectActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                  color: isDirectActive ? '#fff' : 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer', position: 'relative'
                }}>
                  {isDirectActive && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', backgroundColor: '#E04D36' }} />}
                  {section.icon}<span>{section.title}</span>
                </button>
              ) : (
                /* SECTION WITH SUB-ITEMS */
                <>
                  <button onClick={() => toggleSection(section.title)} style={{
                    width: '100%', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: 'transparent',
                    color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, cursor: 'pointer'
                  }}>
                    {section.icon}<span style={{ flex: 1, textAlign: 'left' }}>{section.title}</span>
                    {openSections[section.title] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                  </button>
                  {openSections[section.title] && section.items && (
                    <div style={{ marginTop: 2 }}>
                      {section.items.map(item => (
                        <KNavItem key={item.path} icon={<NavDot />} label={item.label} active={activePath === item.path} onClick={() => setActivePath(item.path)} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </nav>

      {/* FOOTER COLLAPSE TOGGLE */}
      <div style={{ padding: 8, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={() => setCollapsed(!collapsed)} style={{
          width: '100%', padding: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none', borderRadius: 8,
          background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontSize: 12, cursor: 'pointer'
        }}>
          {collapsed ? <Menu size={16} /> : <><X size={14} /> Colapsar</>}
        </button>
      </div>
    </aside>
  );
}`,
};
