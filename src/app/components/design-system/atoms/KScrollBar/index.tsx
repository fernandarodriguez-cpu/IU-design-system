import React from 'react';
import { cn } from '@/utils/cn';

export interface KScrollBarProps {
  /** Orientación del scroll */
  orientation?: 'vertical' | 'horizontal' | 'both';
  /** Grosor de la barra en px */
  size?: 'small' | 'middle' | 'large';
  /** Esconder la barra cuando no hay hover */
  autoHide?: boolean;
  /** Clase personalizada para el contenedor */
  className?: string;
  /** Estilo personalizado para el contenedor */
  style?: React.CSSProperties;
  /** Contenido sobre el que se aplica el scroll */
  children?: React.ReactNode;
}

/**
 * KScrollBar — Átomo para estilización premium de barras de desplazamiento.
 * Centraliza la estética de los scrollbars en el sistema para evitar variaciones nativas feas.
 */
/**
 * @figma-mcp-migration
 * Component: KScrollBar
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
export const KScrollBar = React.forwardRef<HTMLDivElement, KScrollBarProps>(
  ({ 
    orientation = 'vertical', 
    size = 'middle', 
    autoHide = true, 
    className, 
    style, 
    children 
  }, ref) => {
    
    const sizeMap = {
      small: 'scrollbar-thin',
      middle: 'scrollbar-md',
      large: 'scrollbar-lg'
    };

    const scrollClass = cn(
      "overflow-auto",
      orientation === 'vertical' && "overflow-x-hidden overflow-y-auto",
      orientation === 'horizontal' && "overflow-y-hidden overflow-x-auto",
      orientation === 'both' && "overflow-auto",
      "khor-scrollbar",
      sizeMap[size],
      autoHide && "khor-scrollbar-autohide",
      className
    );

    return (
      <div 
        ref={ref}
        className={scrollClass}
        style={style}
      >
        {children}
        
        <style dangerouslySetInnerHTML={{ __html: `
          .khor-scrollbar {
            scrollbar-color: var(--khor-neutral-300) transparent;
          }
          
          .khor-scrollbar::-webkit-scrollbar {
            width: ${size === 'small' ? '4px' : size === 'large' ? '10px' : '6px'};
            height: ${size === 'small' ? '4px' : size === 'large' ? '10px' : '6px'};
          }

          .khor-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }

          .khor-scrollbar::-webkit-scrollbar-thumb {
            background: var(--khor-neutral-300);
            border-radius: 10px;
            border: 2px solid transparent;
            background-clip: content-box;
            transition: background 0.2s ease;
          }

          .khor-scrollbar::-webkit-scrollbar-thumb:hover {
            background: var(--khor-neutral-400);
            background-clip: content-box;
          }

          .khor-scrollbar-autohide::-webkit-scrollbar-thumb {
            opacity: 0;
          }

          .khor-scrollbar-autohide:hover::-webkit-scrollbar-thumb {
            opacity: 1;
          }
        `}} />
      </div>
    );
  }
);

KScrollBar.displayName = 'KScrollBar';

export default KScrollBar;
