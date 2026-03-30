import React from 'react';
import { Tag } from 'antd';
import type { TagProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export type KTagColor = 'primary' | 'navy' | 'accent' | 'success' | 'error' | 'warning' | 'info' | 'default';

export interface KTagProps extends Omit<TagProps, 'color' | 'bordered'> {
  color?: KTagColor | string;
  /** Icono a mostrar antes del texto del tag */
  icon?: React.ReactNode;
  /** Muestra o oculta el borde. Default: true */
  bordered?: boolean;
}

const tagColorMap: Record<KTagColor, string> = {
  primary: t.colors.brand.primary,
  navy: t.colors.brand.navy,
  accent: t.colors.brand.accent,
  success: t.colors.feedback.success,
  error: t.colors.feedback.error,
  warning: t.colors.feedback.warning,
  info: t.colors.brand.primary,
  default: t.colors.neutral[500],
};

export function KTag({ 
  color = 'default', style, children, icon, bordered = true, 
  variant, size, ...rest 
}: KTagProps & { variant?: any, size?: any }) {
  const resolvedColor = tagColorMap[color as KTagColor] ?? color;
  return (
    <Tag
      color={resolvedColor}
      icon={icon}
      bordered={bordered}
      style={{ fontFamily: font, borderRadius: 6, fontSize: 12, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function KCheckableTag({ style, ...rest }: React.ComponentProps<typeof Tag.CheckableTag>) {
  return <Tag.CheckableTag style={{ fontFamily: font, borderRadius: 6, ...style }} {...rest} />;
}

export default KTag;
