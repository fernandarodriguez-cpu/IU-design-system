import React from 'react';
import { khorTokens } from '../../../../theme/khor-theme';
import { cn } from '@/utils/cn';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KFormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
  /** ID para asociar label con input */
  id?: string;
  /** Fuerza el estado hover (útil para previews/playgrounds) */
  isHovered?: boolean;
  /** Fuerza el estado de foco (útil para previews/playgrounds) */
  isFocused?: boolean;
}

/**
 * @figma-mcp-migration
 * Component: KFormField
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
export function KFormField({ label, required, error, hint, children, className, id, isHovered, isFocused }: KFormFieldProps) {
  const generatedId = React.useId();
  const finalId = id || generatedId;

  return (
    <div 
      className={cn(
        "flex flex-col", 
        "gap-[var(--khor-density-spacing-xs)]", // Density gap
        isHovered && "opacity-90",
        className
      )}
    >
      {label && (
        <label 
          htmlFor={finalId}
          className={cn(
            "text-[13px] font-semibold text-khor-text-secondary font-primary mb-0.5 block transition-colors",
            error && "text-khor-error",
            isFocused && "text-khor-primary"
          )}
        >
          {label}
          {required && <span className="text-khor-error ml-1">*</span>}
        </label>
      )}
      <div id={finalId} className="w-full">
        {/* We clone children to pass down error status if it's a KInput-like component */}
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
             // @ts-ignore
             return React.cloneElement(child, { 
                status: error ? 'error' : (child.props as any).status,
                id: finalId,
                isHovered: isHovered || (child.props as any).isHovered,
                isFocused: isFocused || (child.props as any).isFocused
             });
          }
          return child;
        })}
      </div>
      {error && <span className="text-xs text-khor-error font-medium font-primary mt-0.5 animate-in fade-in slide-in-from-top-1">{error}</span>}
      {!error && hint && <span className="text-xs text-khor-text-tertiary font-normal font-primary mt-0.5">{hint}</span>}
    </div>
  );
}

export default KFormField;
