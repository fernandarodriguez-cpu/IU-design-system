import React from 'react';
import { Typography } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body-lg' | 'body-md' | 'small' | 'caption';
  color?: 'default' | 'secondary' | 'primary' | 'navy' | 'success' | 'error' | 'muted';
  children: React.ReactNode;
  className?: string;
  as?: string;
  copyable?: boolean | object;
  editable?: boolean | object;
  ellipsis?: boolean | object;
  mark?: boolean;
  code?: boolean;
  keyboard?: boolean;
  underline?: boolean;
  delete?: boolean;
  strong?: boolean;
  italic?: boolean;
  type?: 'secondary' | 'success' | 'warning' | 'danger';
}

const textColorMap: Record<string, string> = {
  default: t.colors.neutral[900],
  secondary: t.colors.neutral[500],
  primary: t.colors.brand.primary,
  navy: t.colors.brand.navy,
  success: t.colors.feedback.success,
  error: t.colors.feedback.error,
  muted: t.colors.neutral[300],
};

const textSizeMap: Record<string, React.CSSProperties> = {
  h1: { fontSize: 38, fontWeight: 700, lineHeight: 1.2 },
  h2: { fontSize: 30, fontWeight: 700, lineHeight: 1.2 },
  h3: { fontSize: 24, fontWeight: 600, lineHeight: 1.3 },
  'body-lg': { fontSize: 16, fontWeight: 400, lineHeight: 1.5 },
  'body-md': { fontSize: 14, fontWeight: 400, lineHeight: 1.5 },
  small: { fontSize: 12, fontWeight: 500, lineHeight: 1.5 },
  caption: { fontSize: 11, fontWeight: 400, lineHeight: 1.4 },
};

export function KText({
  variant = 'body-md', color = 'default', children, className, as,
  copyable, editable, ellipsis, mark, code, keyboard, underline,
  delete: del, strong, italic, type, ...rest
}: KTextProps) {
  const textStyle: React.CSSProperties = {
    ...textSizeMap[variant],
    color: textColorMap[color],
    fontFamily: font,
    margin: 0,
  };

  const textProps = { copyable, editable, ellipsis, mark, code, keyboard, underline, delete: del, strong, italic, type } as any;

  if (variant === 'h1') return <Typography.Title level={1} className={className} style={textStyle} {...textProps}>{children}</Typography.Title>;
  if (variant === 'h2') return <Typography.Title level={2} className={className} style={textStyle} {...textProps}>{children}</Typography.Title>;
  if (variant === 'h3') return <Typography.Title level={3} className={className} style={textStyle} {...textProps}>{children}</Typography.Title>;

  return (
    <Typography.Text className={className} style={textStyle} {...textProps}>
      {children}
    </Typography.Text>
  );
}

export function KLink(props: React.ComponentProps<typeof Typography.Link>) {
  return <Typography.Link style={{ fontFamily: font }} {...props} />;
}

export function KParagraph(props: React.ComponentProps<typeof Typography.Paragraph>) {
  return <Typography.Paragraph style={{ fontFamily: font }} {...props} />;
}

export default KText;
