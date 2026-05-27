import React from 'react';
import { cn } from '@/utils/cn';
import { Info } from 'lucide-react';
import { KTooltip } from '../../molecules/KTooltip';

export interface KLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  info?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * KLabel — Componente para etiquetas de formulario.
 * Soporta indicador de obligatoriedad y tooltip de información.
 */
/**
 * @figma-mcp-migration
 * Component: KLabel
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
export const KLabel = React.forwardRef<HTMLLabelElement, KLabelProps>(function KLabel(
  { required, info, size = 'md', className, children, ...rest },
  ref,
) {
  const sizeClasses = {
    sm: "text-xs mb-0.5",
    md: "text-sm mb-1",
    lg: "text-base mb-1.5",
  };

  return (
    <label
      ref={ref}
      className={cn(
        "inline-flex items-center font-medium font-primary text-foreground/80 select-none",
        sizeClasses[size],
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      
      {required && (
        <span className="ml-1 text-khor-error" title="Requerido">
          *
        </span>
      )}
      
      {info && (
        <KTooltip title={info}>
          <Info size={14} className="ml-1.5 text-khor-neutral-400 cursor-help hover:text-khor-primary transition-colors" />
        </KTooltip>
      )}
    </label>
  );
});

export default KLabel;
