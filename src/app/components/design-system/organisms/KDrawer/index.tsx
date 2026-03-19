import React from 'react';
import { Drawer } from 'antd';
import type { DrawerProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KDrawerProps extends DrawerProps { }

export function KDrawer({ style, ...rest }: KDrawerProps) {
  return (
    <Drawer
      style={{
        fontFamily: font,
        ...style
      }}
      {...rest}
    />
  );
}

export default KDrawer;
