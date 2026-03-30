import React from 'react';
import { Breadcrumb } from 'antd';
import type { BreadcrumbProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KBreadcrumbProps extends BreadcrumbProps { }

/**
 * KBreadcrumb: Sistema de navegación por jerarquía.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KBreadcrumb({ 
  style, variant, size, fullWidth, ...rest 
}: KBreadcrumbProps & { variant?: any, size?: any, fullWidth?: any }) {
  return (
    <Breadcrumb
      style={{ 
        fontFamily: font, 
        fontSize: 13, 
        ...style 
      }}
      {...rest}
    />
  );
}

export default KBreadcrumb;
