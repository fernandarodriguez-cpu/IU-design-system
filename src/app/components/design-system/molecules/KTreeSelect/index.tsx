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

export function KTreeSelect({ className, style, dropdownStyle, ...rest }: KTreeSelectProps) {
  return (
    <TreeSelect
      className={className}
      style={{ width: '100%', fontFamily: font, ...style }}
      dropdownStyle={{ fontFamily: font, ...dropdownStyle }}
      {...rest}
    />
  );
}

export default KTreeSelect;
