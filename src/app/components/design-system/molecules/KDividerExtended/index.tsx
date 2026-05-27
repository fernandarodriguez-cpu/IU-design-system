import React from 'react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KDividerExtended — Separador con texto (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KDividerExtendedProps {
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  dashed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * @figma-mcp-migration
 * Component: KDividerExtended
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
export function KDividerExtended({ children, orientation = 'horizontal', dashed, className, style }: KDividerExtendedProps) {
  if (orientation === 'vertical') {
    return <div className={className} style={{ display: 'inline-block', width: 1, height: '1em', backgroundColor: t.colors.neutral[200], margin: '0 8px', verticalAlign: 'middle', borderStyle: dashed ? 'dashed' : 'solid', ...style }} />;
  }
  if (children) {
    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '16px 0', ...style }}>
        <div style={{ flex: 1, height: 1, backgroundColor: t.colors.neutral[200], borderStyle: dashed ? 'dashed' : 'solid' }} />
        <span style={{ fontSize: 13, color: t.colors.neutral[400], fontFamily: font, whiteSpace: 'nowrap' }}>{children}</span>
        <div style={{ flex: 1, height: 1, backgroundColor: t.colors.neutral[200], borderStyle: dashed ? 'dashed' : 'solid' }} />
      </div>
    );
  }
  return <div className={className} style={{ height: 1, backgroundColor: t.colors.neutral[200], margin: '16px 0', borderStyle: dashed ? 'dashed' : 'solid', ...style }} />;
}

export default KDividerExtended;
