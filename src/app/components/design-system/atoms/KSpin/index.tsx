import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface KSpinProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  fullscreen?: boolean;
}

const sizeMap = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-10 h-10",
  xl: "w-16 h-16",
};

/**
 * KSpin — Indicador de carga (Headless v4)
 * Reemplaza AntD Spin con un componente nativo animado y estéticamente refinado.
 */
/**
 * @figma-mcp-migration
 * Component: KSpin
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
export function KSpin({ 
  size = 'md', 
  color, 
  className, 
  style,
  label,
  fullscreen = false
}: KSpinProps) {
  
  const spinner = (
    <div 
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        fullscreen && "fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm"
      )}
    >
      <Loader2 
        className={cn(
          "animate-spin transition-all",
          sizeMap[size] || sizeMap.md,
          !color && "text-khor-primary",
          className
        )}
        style={{ color, ...style }}
      />
      {label && (
        <span className="text-sm font-bold text-khor-neutral-500 animate-pulse uppercase tracking-widest font-primary">
          {label}
        </span>
      )}
    </div>
  );

  return spinner;
}

export default KSpin;
