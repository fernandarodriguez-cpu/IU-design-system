import React from 'react';
import { KAvatar, KText } from '../../atoms';
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
