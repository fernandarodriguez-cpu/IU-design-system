import React from 'react';
import { KAvatar } from '../../atoms/KAvatar/index';
import { KText } from '../../atoms/KText/index';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KUserCellProps {
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'busy' | 'away';
  onClick?: () => void;
  className?: string;
}

/**
 * @figma-mcp-migration
 * Component: KUserCell
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
export function KUserCell({ 
  name, 
  email, 
  avatar, 
  role, 
  size = 'md', 
  status,
  onClick,
  className 
}: KUserCellProps) {
  const avatarSize = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;

  return (
    <div 
      className={className}
      onClick={onClick}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 12, 
        fontFamily: font,
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <KAvatar name={name} src={avatar} size={avatarSize} status={status} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <KText 
          variant={size === 'sm' ? 'caption' : 'body-md'} 
          strong 
          color="default" 
          style={{ lineHeight: 1.2 }}
        >
          {name}
        </KText>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: size === 'sm' ? 0 : 2 }}>
          {role && <KText variant="caption" color="secondary">{role}</KText>}
          {email && <KText variant="caption" color="muted">{email}</KText>}
        </div>
      </div>
    </div>
  );
}

export default KUserCell;
