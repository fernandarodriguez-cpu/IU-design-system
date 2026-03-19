import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KTabsProps extends TabsProps { }

export function KTabs({ style, ...rest }: KTabsProps) {
  return (
    <Tabs
      style={{
        fontFamily: font,
        ...style
      }}
      {...rest}
    />
  );
}

export default KTabs;
