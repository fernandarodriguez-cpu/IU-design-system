import React from 'react';
import { KSpace, KSpaceSize } from '../KSpace';
import { cn } from '@/utils/cn';

export interface KButtonGroupProps {
  children: React.ReactNode;
  size?: KSpaceSize;
  className?: string;
  direction?: 'horizontal' | 'vertical';
}

/**
 * KButtonGroup — Grupo de botones con espaciado consistente.
 * Utiliza KSpace internamente para gestionar el gap.
 */
/**
 * @figma-mcp-migration
 * Component: KButtonGroup
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
export function KButtonGroup({ 
  children, 
  className, 
  size = 'sm',
  direction = 'horizontal' 
}: KButtonGroupProps) {
  return (
    <KSpace 
      direction={direction} 
      size={size} 
      className={cn("inline-flex", className)}
    >
      {children}
    </KSpace>
  );
}

export default KButtonGroup;
