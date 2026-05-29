import React from 'react';
import { cn } from '@/utils/cn';
import { KText } from '../../atoms/KText';
import { KDivider } from '../../atoms/KDivider';

export interface SettingsNavigationItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  isDestructive?: boolean;
}

export interface KSettingsShellProps {
  title: string;
  description?: string;
  navigationItems: SettingsNavigationItem[];
  children: React.ReactNode;
  className?: string;
}

/**
 * KSettingsShell — Patrón de Arquitectura para Configuración
 * Organiza un menú lateral de preferencias y un panel de contenido activo.
 */
/**
 * @figma-mcp-migration
 * Component: KSettingsShell
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
export function KSettingsShell({
  title,
  description,
  navigationItems,
  children,
  className
}: KSettingsShellProps) {
  return (
    <div className={cn("flex flex-col w-full max-w-6xl mx-auto font-primary animate-in fade-in duration-500", className)}>
      {/* Settings Header */}
      <div className="flex flex-col gap-2 mb-8">
        <KText variant="h2" className="text-khor-text-primary tracking-tight font-extrabold">{title}</KText>
        {description && (
          <KText variant="body-lg" className="text-khor-text-secondary max-w-2xl opacity-80">
            {description}
          </KText>
        )}
        <KDivider className="mt-4 mb-0 border-khor-border-muted" />
      </div>

      {/* Settings Layout (Sidebar + Content) */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        
        {/* Settings Navigation */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-1">
          {navigationItems.map(item => (
            <button
              key={item.key}
              onClick={item.onClick}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all text-left w-full",
                item.isActive 
                  ? "bg-khor-surface-selected text-khor-primary shadow-khor-sm" 
                  : "text-khor-text-secondary hover:bg-khor-surface-hover hover:text-khor-text-primary",
                item.isDestructive && !item.isActive && "hover:text-khor-error hover:bg-khor-error/10",
                item.isDestructive && item.isActive && "bg-khor-error/10 text-khor-error shadow-none"
              )}
            >
              {item.icon && <span className={cn("shrink-0", item.isActive ? "text-current" : "opacity-70")}>{item.icon}</span>}
              <span>{item.label}</span>
            </button>
          ))}
        </aside>

        {/* Settings Content Area */}
        <main className="flex-1 min-w-0">
          <div className="bg-khor-surface-card border border-khor-border-default rounded-[var(--khor-radius-xl)] shadow-khor-sm p-[var(--khor-density-spacing-xl)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default KSettingsShell;
