import React from 'react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KAppLayoutProps {
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  collapsed?: boolean;
  fixedHeader?: boolean;
  fixedSidebar?: boolean;
}

/**
 * KAppLayout — Estructura base de la aplicación (Headless v4)
 * Reemplaza Layout de AntD por CSS Grid/Flexbox nativo con Tailwind.
 */
export function KAppLayout({ 
  sidebar, 
  header, 
  footer, 
  children, 
  collapsed,
  fixedHeader = true,
  fixedSidebar = true 
}: KAppLayoutProps) {
  // Calculamos anchos básicos dinámicos
  const sidebarWidth = collapsed ? 80 : 260; // Standard Khor Sidebar widths
  const headerHeight = 64; // Standard Khor header height

  return (
    <div className="min-h-screen flex flex-col bg-[var(--khor-neutral-50)]" style={{ fontFamily: font }}>
      {/* Sidebar (Sider alternativo) */}
      {sidebar && (
        <aside
          className={`
            fixed left-0 top-0 bottom-0 z-50 
            transition-all duration-300 ease-in-out
            border-r border-[var(--khor-neutral-200)] 
            bg-[var(--khor-brand-navy)]
            overflow-y-auto overflow-x-hidden
          `}
          style={{ 
            width: sidebarWidth,
            height: fixedSidebar ? '100vh' : 'auto',
            position: fixedSidebar ? 'fixed' : 'relative'
          }}
        >
          <div className="h-full w-full">
            {sidebar}
          </div>
        </aside>
      )}

      {/* Area Principal (Header + Content + Footer) */}
      <div 
        className="flex flex-col flex-1 transition-all duration-300 ease-in-out"
        style={{ 
          marginLeft: sidebar && fixedSidebar ? sidebarWidth : 0,
        }}
      >
        {/* Header (Header alternativo) */}
        {header && (
          <header 
            className={`
              flex items-center px-6 z-40 
              bg-[var(--khor-surface-page)] 
              border-b border-[var(--khor-neutral-200)]
              transition-all duration-300 ease-in-out
            `}
            style={{ 
              height: headerHeight,
              position: fixedHeader ? 'fixed' : 'relative',
              top: 0,
              right: 0,
              left: sidebar && fixedSidebar ? sidebarWidth : 0,
              width: 'auto'
            }}
          >
            <div className="w-full">
              {header}
            </div>
          </header>
        )}

        {/* Content Area */}
        <main 
          className="flex-1 p-6 transition-all"
          style={{ 
            marginTop: header && fixedHeader ? headerHeight : 0,
            minHeight: `calc(100vh - ${header && fixedHeader ? headerHeight : 0}px - ${footer ? 64 : 0}px)`
          }}
        >
          <div className="max-w-[1400px] mx-auto w-full animate-in fade-in duration-500">
            {children}
          </div>
        </main>

        {/* FooterArea */}
        {footer && (
          <footer 
            className="h-16 flex items-center justify-center border-t border-[var(--khor-neutral-200)] bg-[var(--khor-surface-page)] text-sm text-[var(--khor-neutral-500)]"
          >
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
}

export default KAppLayout;
