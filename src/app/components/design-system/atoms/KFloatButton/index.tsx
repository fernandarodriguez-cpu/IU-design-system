import React from 'react';
import { Plus } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

export interface KFloatButtonProps {
  icon?: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
  type?: 'primary' | 'default';
  position?: { bottom?: number; right?: number };
  className?: string;
}

/**
 * @figma-mcp-migration
 * Component: KFloatButton
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
export function KFloatButton({ icon = <Plus size={20} />, onClick, tooltip, type = 'primary', position = { bottom: 24, right: 24 }, className }: KFloatButtonProps) {
  return (
    <button
      onClick={onClick} title={tooltip} className={className}
      style={{
        position: 'fixed', bottom: position.bottom, right: position.right, zIndex: 100,
        width: 48, height: 48, borderRadius: '50%', border: 'none',
        backgroundColor: type === 'primary' ? t.colors.brand.primary : t.colors.neutral[50],
        color: type === 'primary' ? '#fff' : t.colors.neutral[500],
        boxShadow: t.shadows.lg, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {icon}
    </button>
  );
}

export default KFloatButton;
