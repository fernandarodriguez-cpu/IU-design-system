import React from 'react';
import { Breadcrumb } from 'antd';
import type { BreadcrumbProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KBreadcrumbProps extends BreadcrumbProps { }

export function KBreadcrumb({ style, ...rest }: KBreadcrumbProps) {
  return (
    <Breadcrumb
      style={{ fontFamily: font, fontSize: 13, ...style }}
      {...rest}
    />
  );
}

export default KBreadcrumb;
