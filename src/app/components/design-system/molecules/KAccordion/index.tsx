import React from 'react';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KAccordionProps extends CollapseProps { }

/**
 * KAccordion: Sistema de colapso para organizar contenidos en paneles.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KAccordion({ 
  style, variant, size, fullWidth, ...rest 
}: KAccordionProps & { variant?: any, size?: any, fullWidth?: any }) {
  return (
    <Collapse
      ghost
      expandIconPosition="end"
      style={{
        fontFamily: font,
        backgroundColor: 'transparent',
        ...style
      }}
      {...rest}
    />
  );
}

export default KAccordion;
