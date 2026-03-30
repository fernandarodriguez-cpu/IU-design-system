import React from 'react';
import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KTreeSelect — Selector de árbol (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KTreeSelectProps extends TreeSelectProps {
  className?: string;
}

/**
 * KTreeSelect: Selector jerárquico tipo árbol.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KTreeSelect({ 
  className, 
  style, 
  dropdownStyle, 
  variant,
  size,
  fullWidth,
  ...rest 
}: KTreeSelectProps & { variant?: any, size?: any, fullWidth?: any }) {
  return (
    <TreeSelect
      className={className}
      style={{ 
        width: '100%', 
        fontFamily: font, 
        ...style 
      }}
      dropdownStyle={{ 
        fontFamily: font, 
        ...dropdownStyle 
      }}
      size={size as any}
      {...rest}
    />
  );
}

export default KTreeSelect;
