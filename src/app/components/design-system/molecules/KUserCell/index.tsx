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
  size?: 'sm' | 'md';
}

export function KUserCell({ name, email, avatar, role, size = 'md' }: KUserCellProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: font }}>
      <KAvatar name={name} src={avatar} size={size === 'sm' ? 32 : 40} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <KText variant={size === 'sm' ? 'body-md' : 'body-md'} strong color="default" style={{ lineHeight: 1.2 }}>{name}</KText>
        {email && <KText variant="caption" color="secondary">{email}</KText>}
        {role && !email && <KText variant="caption" color="secondary">{role}</KText>}
      </div>
    </div>
  );
}

export default KUserCell;
