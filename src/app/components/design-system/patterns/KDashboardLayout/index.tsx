import React, { useState } from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';
import { KAppLayout } from '../../organisms/KAppLayout';
import { KCommandBar } from '../../organisms/KCommandBar';
import { KNavItem } from '../../molecules/KNavItem';
import { KButton } from '../../atoms/KButton';
import { KAvatar } from '../../atoms/KAvatar';
import { KDropdownMenuRoot, KDropdownMenuTrigger, KDropdownMenuContent, KDropdownMenuLabel, KDropdownMenuSeparator, KDropdownMenuItem } from '../../molecules/KDropdownMenu';

export interface DashboardNavigationItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

export interface KDashboardLayoutProps {
  /** Logo o componente visual superior del sidebar */
  logo?: React.ReactNode;
  /** Elementos de navegación principal */
  navigationItems: DashboardNavigationItem[];
  /** Usuario actual para el header */
  user?: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  /** Acciones a ejecutar desde el menú de usuario */
  onLogout?: () => void;
  onSettings?: () => void;
  /** Contenido principal de la página */
  children: React.ReactNode;
  /** Fuerza el estado colapsado inicial */
  defaultCollapsed?: boolean;
}

/**
 * KDashboardLayout — Patrón de Arquitectura SaaS
 * Orquesta KAppLayout, KCommandBar y navegación de manera automática.
 */
/**
 * @figma-mcp-migration
 * Component: KDashboardLayout
 * 
 * INSTRUCCIONES PARA AGENTES DE IA (VS Code / MCP):
 * Para migrar este componente a Figma, NO generar una matriz multiplicando todas las variables.
 * Utilizar Figma Component Properties V2 con la siguiente estructura:
 * 
 * 1. Variants (Estructurales):
 *    - Definir variantes puramente visuales/estructurales.
 * 2. Booleans (Encendido/Apagado):
 *    - Definir encendido/apagado para iconos o estados (isLoading, hasIcon).
 * 3. Color Variables (No usar variantes para colores semánticos):
 *    - El relleno/borde debe usar Figma Variables (Khor v6.0 Colors) asignado dinámicamente.
 *    - El consumidor del UI Kit cambiará el color del layer.
 */
export function KDashboardLayout({
  logo,
  navigationItems,
  user,
  onLogout,
  onSettings,
  children,
  defaultCollapsed = false
}: KDashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [commandBarOpen, setCommandBarOpen] = useState(false);

  // 1. Orquestar el Sidebar
  const renderSidebar = () => (
    <div className="flex flex-col h-full bg-khor-surface-inverse text-white">
      <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
        {logo || <div className="text-xl font-extrabold tracking-tight">SaaS App</div>}
      </div>
      <div className="flex-1 py-6 px-3 flex flex-col gap-1 overflow-y-auto">
        {navigationItems.map(item => (
          <KNavItem
            key={item.key}
            label={item.label}
            icon={item.icon}
            isActive={item.isActive}
            onClick={item.onClick}
            collapsed={collapsed}
          />
        ))}
      </div>
    </div>
  );

  // 2. Orquestar el Header
  const renderHeader = () => (
    <div className="flex items-center justify-between w-full h-full">
      <div className="flex items-center gap-4">
        <KButton 
          variant="ghost" 
          size="sm" 
          icon={<Menu size={20} />} 
          onClick={() => setCollapsed(!collapsed)}
          className="text-khor-text-secondary"
        />
        <KButton
          variant="outline"
          size="sm"
          className="w-64 justify-start text-khor-text-tertiary bg-khor-surface-subtle"
          icon={<Search size={14} />}
          onClick={() => setCommandBarOpen(true)}
        >
          <span className="flex-1 text-left">Buscar comandos...</span>
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </KButton>
      </div>

      <div className="flex items-center gap-4">
        <KButton variant="ghost" shape="circle" icon={<Bell size={18} />} className="text-khor-text-secondary" />
        
        {user && (
          <KDropdownMenuRoot>
            <KDropdownMenuTrigger className="outline-none">
              <KAvatar 
                src={user.avatarUrl} 
                fallback={user.name.charAt(0)} 
                size="sm" 
                className="cursor-pointer hover:ring-2 hover:ring-khor-primary hover:ring-offset-2 transition-all"
              />
            </KDropdownMenuTrigger>
            <KDropdownMenuContent align="end" className="w-56">
              <KDropdownMenuLabel>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold">{user.name}</span>
                  <span className="text-xs text-khor-text-secondary">{user.email}</span>
                </div>
              </KDropdownMenuLabel>
              <KDropdownMenuSeparator />
              <KDropdownMenuItem onClick={onSettings}>
                <User className="mr-2 h-4 w-4" />
                <span>Mi Perfil</span>
              </KDropdownMenuItem>
              <KDropdownMenuSeparator />
              <KDropdownMenuItem onClick={onLogout} className="text-khor-error focus:text-khor-error">
                Cerrar Sesión
              </KDropdownMenuItem>
            </KDropdownMenuContent>
          </KDropdownMenuRoot>
        )}
      </div>
    </div>
  );

  return (
    <>
      <KAppLayout
        sidebar={renderSidebar()}
        header={renderHeader()}
        collapsed={collapsed}
      >
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          {children}
        </div>
      </KAppLayout>

      <KCommandBar 
        open={commandBarOpen} 
        onOpenChange={setCommandBarOpen} 
      />
    </>
  );
}

export default KDashboardLayout;
