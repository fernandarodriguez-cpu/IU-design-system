import React, { useState } from 'react';
import { Home, Layers, Settings, ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { KBadge } from '../components/design-system/atoms/KBadge/index';
import { KNavItem } from '../components/design-system/molecules/KNavItem/index';
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

  const SIDEBAR_BG = t.colors.brand.secondary;
  const toggleSection = (s: string) => setOpenSections(prev => ({ ...prev, [s]: !prev[s] }));
  const NavDot = () => <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor', opacity: 0.6, display: 'inline-block', flexShrink: 0 }} />;

  return (
    <div style={{ height: 500, display: 'flex', borderRadius: t.radius.xl, overflow: 'hidden', border: `1px solid ${t.semantic.border.default}`, backgroundColor: t.semantic.surface.page }}>
      {/* Sidebar Layout */}
      <aside style={{
        width: collapsed ? t.sizing[16] : t.layout.sidebarWidth,
        backgroundColor: SIDEBAR_BG,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease',
        overflow: 'hidden'
      }}>
        <div style={{ height: t.sizing[16], display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? 0 : `0 ${t.spacing.md}px`, borderBottom: `1px solid ${t.colors.neutral[700]}`, flexShrink: 0 }}>
          {collapsed ? (
            <div style={{ width: t.sizing[8], height: t.sizing[8], borderRadius: t.radius.md, backgroundColor: t.colors.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.colors.feedback.white, fontWeight: t.typography.fontWeights.bold }}>K</div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.sm }}>
              <div style={{ width: t.sizing[8], height: t.sizing[8], borderRadius: t.radius.md, backgroundColor: t.colors.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.colors.feedback.white, fontWeight: t.typography.fontWeights.bold }}>K</div>
              <div>
                <div style={{ color: t.colors.feedback.white, fontWeight: t.typography.fontWeights.bold, fontSize: t.typography.bodyMd.size, lineHeight: 1 }}>Khor</div>
                <div style={{ color: `${t.colors.feedback.white}80`, fontSize: t.typography.bodyXs.size, fontWeight: t.typography.fontWeights.medium }}>System</div>
              </div>
            </div>
          )}
        </div>
        <nav style={{ flex: 1, padding: `${t.spacing.sm}px ${t.spacing.xs}px`, overflowY: 'auto' }}>
          {nav.map(section => {
            const isDirectLink = !!section.path && !section.items;
            const isDirectActive = isDirectLink && activePath === section.path;

            return (
              <div key={section.title} style={{ marginBottom: t.spacing.xs }}>
                {collapsed ? (
                  <button onClick={() => isDirectLink ? setActivePath(section.path!) : setCollapsed(false)} title={section.title} style={{
                    width: '100%', height: t.sizing[11], display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', borderRadius: t.radius.md,
                    background: isDirectActive ? `${t.colors.feedback.white}1f` : 'transparent',
                    color: isDirectActive ? t.colors.feedback.white : `${t.colors.feedback.white}99`, cursor: 'pointer', transition: 'all 0.15s ease', position: 'relative'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${t.colors.feedback.white}14`; e.currentTarget.style.color = t.colors.feedback.white; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = isDirectActive ? `${t.colors.feedback.white}1f` : 'transparent'; e.currentTarget.style.color = isDirectActive ? t.colors.feedback.white : `${t.colors.feedback.white}99`; }}
                  >
                    {isDirectActive && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', backgroundColor: t.colors.brand.primary }} />}
                    {section.icon}
                  </button>
                ) : isDirectLink ? (
                  <button onClick={() => setActivePath(section.path!)} style={{
                    width: '100%', padding: `${t.spacing.sm}px ${t.spacing.md}px`, display: 'flex', alignItems: 'center', gap: t.spacing.sm, border: 'none', borderRadius: t.radius.md,
                    background: isDirectActive ? `${t.colors.feedback.white}1f` : 'transparent',
                    color: isDirectActive ? t.colors.feedback.white : `${t.colors.feedback.white}b3`, fontSize: t.typography.bodyXs.size, fontWeight: t.typography.fontWeights.semibold, fontFamily: font, textTransform: 'uppercase', letterSpacing: t.typography.letterSpacing.wider, cursor: 'pointer', position: 'relative', transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => { if(!isDirectActive) { e.currentTarget.style.backgroundColor = `${t.colors.feedback.white}0f`; e.currentTarget.style.color = t.colors.feedback.white; } }}
                  onMouseLeave={(e) => { if(!isDirectActive) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = `${t.colors.feedback.white}b3`; } }}
                  >
                    {isDirectActive && <div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 3, height: 20, borderRadius: '0 3px 3px 0', backgroundColor: t.colors.brand.primary }} />}
                    {section.icon}<span>{section.title}</span>
                  </button>
                 ) : (
                  <>
                    <button onClick={() => toggleSection(section.title)} style={{
                      width: '100%', padding: `${t.spacing.xs}px ${t.spacing.md}px`, display: 'flex', alignItems: 'center', gap: t.spacing.sm, border: 'none', background: 'transparent',
                      color: `${t.colors.feedback.white}66`, fontSize: t.typography.bodyXs.size, fontWeight: t.typography.fontWeights.semibold, fontFamily: font, textTransform: 'uppercase', letterSpacing: t.typography.letterSpacing.wider, cursor: 'pointer'
                    }}>
                      {section.icon}<span style={{ flex: 1, textAlign: 'left' }}>{section.title}</span>
                      {openSections[section.title] ? <ChevronDown size={t.icon.xs} /> : <ChevronRight size={t.icon.xs} />}
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
        <div style={{ padding: t.spacing.sm, borderTop: `1px solid ${t.colors.neutral[700]}` }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{
            width: '100%', padding: t.spacing.sm, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: t.spacing.sm, border: 'none', borderRadius: t.radius.md,
            background: `${t.colors.feedback.white}0d`, color: `${t.colors.feedback.white}80`, fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.medium, fontFamily: font, cursor: 'pointer', transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${t.colors.feedback.white}1a`; e.currentTarget.style.color = t.colors.feedback.white; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${t.colors.feedback.white}0d`; e.currentTarget.style.color = `${t.colors.feedback.white}80`; }}
          >
            {collapsed ? <Menu size={t.icon.sm} /> : <><X size={t.icon.xs} /> Colapsar</>}
          </button>
        </div>
      </aside>

      {/* Demo App Canvas */}
      <div style={{ flex: 1, padding: t.spacing.xl, display: 'flex', flexDirection: 'column', gap: t.spacing.md }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ margin: 0, fontSize: t.typography.bodyLg.size, fontWeight: t.typography.fontWeights.semibold, color: t.semantic.text.primary }}>Área de Trabajo Principal</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.sm }}>
            <span style={{ fontSize: t.typography.bodySm.size, color: t.semantic.text.muted }}>Ruta Activa:</span>
            <KBadge status="info" label={activePath} />
          </div>
        </div>
        <div style={{ padding: t.spacing.xl, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, borderRadius: t.radius.lg, boxShadow: t.shadows.lg }}>
          <p style={{ margin: 0, fontSize: t.typography.bodySm.size, color: t.semantic.text.primary, lineHeight: 1.6 }}>
            Este es un entorno de demostración encapsulado. Interactúa con el menú lateral para ver cómo cambian los estados (expansión de acordeones y activación de rutas) independientemente del enrutamiento real de la aplicación.
          </p>
          <p style={{ margin: `${t.spacing.md}px 0 0`, fontSize: t.typography.bodySm.size, color: t.semantic.text.primary, lineHeight: 1.6 }}>
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

  return (
    <aside style={{
      width: collapsed ? t.sizing[16] : t.layout.sidebarWidth,
      backgroundColor: t.colors.brand.secondary,
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.2s ease', overflow: 'hidden',
      height: '100vh'
    }}>
      {/* HEADER LOGO */}
      <div style={{ height: t.sizing[16], display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? 0 : '0 20px', borderBottom: \`1px solid \${t.colors.neutral[700]}\`, flexShrink: 0 }}>
        {collapsed ? (
          <div style={{ width: t.sizing[8], height: t.sizing[8], borderRadius: t.radius.md, backgroundColor: t.colors.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.colors.feedback.white, fontWeight: t.typography.fontWeights.bold }}>K</div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.sm }}>
             <div style={{ width: t.sizing[8], height: t.sizing[8], borderRadius: t.radius.md, backgroundColor: t.colors.brand.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.colors.feedback.white, fontWeight: t.typography.fontWeights.bold }}>K</div>
             <div style={{ color: t.colors.feedback.white, fontWeight: t.typography.fontWeights.bold, fontSize: t.typography.bodyMd.size, lineHeight: 1 }}>Khor</div>
          </div>
        )}
      </div>

      {/* NAVIGATION */}
      <nav style={{ flex: 1, padding: \`\${t.spacing.sm}px \${t.spacing.xs}px\`, overflowY: 'auto' }}>
        {nav.map(section => (
          <div key={section.title} style={{ marginBottom: t.spacing.xs }}>
            {/* Logic for collapsible sections and sub-items */}
          </div>
        ))}
      </nav>

      {/* FOOTER COLLAPSE TOGGLE */}
      <div style={{ padding: t.spacing.sm, borderTop: \`1px solid \${t.colors.neutral[700]}\` }}>
        <button onClick={() => setCollapsed(!collapsed)} style={{
          width: '100%', padding: t.spacing.sm, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: t.spacing.sm, border: 'none', borderRadius: t.radius.md,
          background: \`\${t.colors.feedback.white}0d\`, color: \`\${t.colors.feedback.white}80\`, fontSize: t.typography.bodySm.size, cursor: 'pointer'
        }}>
          {collapsed ? <Menu size={t.icon.md} /> : <><X size={t.icon.sm} /> Colapsar</>}
        </button>
      </div>
    </aside>
  );
}`,
};
