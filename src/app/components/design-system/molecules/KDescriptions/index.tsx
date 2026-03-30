import React from 'react';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KDescriptions — Lista clave-valor
   ═══════════════════════════════════════════════ */
export interface KDescriptionItem {
  label: React.ReactNode;
  children: React.ReactNode;
  span?: number;
  labelStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export interface KDescriptionsProps extends Omit<DescriptionsProps, 'items'> {
  items: KDescriptionItem[];
}

/**
 * KDescriptions: Componente para mostrar listas de información clave-valor.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KDescriptions({ 
  items, style, variant, size, fullWidth, ...rest 
}: KDescriptionsProps & { variant?: any, size?: any, fullWidth?: any }) {
  const antdItems = items.map((item, i) => ({
    key: i,
    label: item.label,
    children: item.children,
    span: item.span,
    labelStyle: item.labelStyle,
    contentStyle: item.contentStyle,
  }));

  return (
    <Descriptions
      items={antdItems}
      size={size as any}
      style={{ 
        fontFamily: font, 
        ...style 
      }}
      {...rest}
    />
  );
}

export default KDescriptions;
