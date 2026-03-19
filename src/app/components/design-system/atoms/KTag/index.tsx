import React from 'react';
import { Tag } from 'antd';
import type { TagProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export type KTagColor = 'primary' | 'navy' | 'accent' | 'success' | 'error' | 'warning' | 'info' | 'default';

export interface KTagProps extends Omit<TagProps, 'color'> {
  color?: KTagColor | string;
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

export function KTag({ color = 'default', style, children, ...rest }: KTagProps) {
  const resolvedColor = tagColorMap[color as KTagColor] ?? color;
  return (
    <Tag
      color={resolvedColor}
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
