import React from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle, Search, ShieldAlert, FileWarning, Ghost } from 'lucide-react';
import { cn } from '@/utils/cn';

export type KResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

export interface KResultProps {
  status: KResultStatus;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  icon?: React.ReactNode;
  extra?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  /** Fuerza el estado hover (útil para previews/playgrounds) */
  isHovered?: boolean;
}

const statusIcons = {
  success: <div className="bg-khor-success/10 p-5 rounded-full"><CheckCircle2 className="w-16 h-16 text-khor-success" /></div>,
  error: <div className="bg-khor-error/10 p-5 rounded-full"><XCircle className="w-16 h-16 text-khor-error" /></div>,
  info: <div className="bg-khor-info/10 p-5 rounded-full"><Info className="w-16 h-16 text-khor-info" /></div>,
  warning: <div className="bg-khor-warning/10 p-5 rounded-full"><AlertTriangle className="w-16 h-16 text-khor-warning" /></div>,
  '404': <div className="relative"><Search className="w-20 h-20 text-khor-neutral-200" /><Ghost className="w-8 h-8 text-khor-neutral-400 absolute bottom-0 right-0 animate-bounce" /></div>,
  '403': <div className="bg-khor-surface-subtle p-6 rounded-3xl"><ShieldAlert className="w-20 h-20 text-khor-text-primary opacity-80" /></div>,
  '500': <div className="bg-khor-error/10 p-6 rounded-3xl border-2 border-dashed border-khor-error/20"><FileWarning className="w-20 h-20 text-khor-error/80" /></div>,
};

/**
 * KResult — Página de estado o resultado (Headless v4)
 */
/**
 * @figma-mcp-migration
 * Component: KResult
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
export function KResult({ 
  status = 'info', 
  title, 
  subTitle, 
  icon, 
  extra, 
  className, 
  style,
  children,
  isHovered
}: KResultProps) {
  
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center text-center font-primary transition-all duration-300",
        "p-[var(--khor-density-spacing-xl)]", // Density compliance
        isHovered && "scale-[1.01]",
        className
      )}
      style={style}
    >
      <div className="mb-[var(--khor-density-spacing-lg)] flex justify-center animate-in zoom-in duration-700">
        {icon || statusIcons[status]}
      </div>
      
      <h2 className="text-3xl font-extrabold text-khor-text-primary mb-3 tracking-tight">
        {title}
      </h2>
      
      {subTitle && (
        <div className="text-base text-khor-text-secondary max-w-xl mx-auto mb-10 font-medium leading-relaxed opacity-80">
          {subTitle}
        </div>
      )}

      {extra && (
        <div className="flex gap-4 justify-center items-center">
          {extra}
        </div>
      )}

      {children && (
        <div className="mt-12 w-full max-w-2xl mx-auto bg-khor-surface-subtle p-6 rounded-2xl border border-khor-border-muted shadow-khor-sm text-left">
          {children}
        </div>
      )}
    </div>
  );
}

export default KResult;
