import React from 'react';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KAccordionProps extends CollapseProps { }

export function KAccordion({ style, ...rest }: KAccordionProps) {
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
