import React from 'react';
import { Avatar } from 'antd';
import type { AvatarProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KAvatarProps extends AvatarProps {
  /** Nombre completo para generar iniciales automáticamente */
  name?: string;
  /** Estado de presencia: online | offline | busy | away */
  status?: 'online' | 'offline' | 'busy' | 'away';
  /** Forma del avatar. Default: 'circle' */
  shape?: 'circle' | 'square';
  /** Distancia entre los bordes del avatar y el texto de las iniciales (px) */
  gap?: number;
}

const statusColorMap = {
  online: t.colors.feedback.success,
  offline: t.colors.neutral[300],
  busy: t.colors.feedback.error,
  away: t.colors.feedback.warning,
};

const statusSizeMap = { small: 8, default: 10, large: 14 };

export function KAvatar({ name, status, src, style, size = 'default', shape = 'circle', gap, children, ...rest }: KAvatarProps) {
  const initials = name ? name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2) : undefined;
  const dotSize = typeof size === 'number' ? Math.max(8, size * 0.22) : (statusSizeMap[size as keyof typeof statusSizeMap] || 10);

  const avatarElement = (
    <Avatar
      src={src}
      size={size}
      shape={shape}
      gap={gap}
      style={{
        backgroundColor: !src && !rest.icon ? t.colors.brand.navy : undefined,
        fontFamily: font,
        ...style,
      }}
      {...rest}
    >
      {!src && !children && !rest.icon ? initials : children}
    </Avatar>
  );

  if (!status) return avatarElement;

  return (
    <div style={{ position: 'relative', display: 'inline-flex' }}>
      {avatarElement}
      <span style={{
        position: 'absolute', bottom: 0, right: 0,
        width: dotSize, height: dotSize,
        borderRadius: '50%',
        backgroundColor: statusColorMap[status],
        border: '2px solid white',
        zIndex: 1,
      }} />
    </div>
  );
}

export function KAvatarGroup(props: React.ComponentProps<typeof Avatar.Group>) {
  return <Avatar.Group {...props} />;
}

export default KAvatar;
