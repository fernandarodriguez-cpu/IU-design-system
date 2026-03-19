import React from 'react';
import { Badge, Tag } from 'antd';
import type { BadgeProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KBadge — Badge contador flotante Y status badge
   API completa AntD: count, dot, overflowCount,
   showZero, status, color, offset, size, text…
   ═══════════════════════════════════════════════ */
export type KBadgeStatus = 'success' | 'error' | 'warning' | 'info' | 'default';

export interface KBadgeProps extends BadgeProps {
  /** Compat: muestra como badge de status inline (chip) */
  label?: string;
  /** Compat: status semántico de Khor */
  khorStatus?: KBadgeStatus;
}

const tagColorMap: Record<KBadgeStatus, string> = {
  success: t.colors.feedback.success,
  error: t.colors.feedback.error,
  warning: t.colors.feedback.warning,
  info: t.colors.brand.primary,
  default: t.colors.neutral[500],
};

export function KBadge({ label, khorStatus, children, status, style, ...rest }: KBadgeProps) {
  // Modo "Status Badge" (chip de estado lateral)
  // Se activa si hay label y NO hay children (AntD Badge con text)
  if (label && !children) {
    const kStatus = khorStatus || status as KBadgeStatus;
    const color = (kStatus && tagColorMap[kStatus]) || t.colors.neutral[500];

    return (
      <Tag
        style={{
          fontFamily: font,
          marginInlineEnd: 0,
          borderRadius: 999,
          fontWeight: 600,
          fontSize: 11,
          padding: '2px 10px',
          backgroundColor: `color-mix(in srgb, ${color}, transparent 90%)`,
          color: color,
          border: `1px solid color-mix(in srgb, ${color}, transparent 80%)`,
          ...style
        }}
        {...rest}
      >
        {label}
      </Tag>
    );
  }

  // Modo "Badge Contador" (flotante sobre children o punto)
  return (
    <Badge
      status={status}
      style={{ fontFamily: font, ...style }}
      {...rest}
    >
      {children}
    </Badge>
  );
}

export default KBadge;
