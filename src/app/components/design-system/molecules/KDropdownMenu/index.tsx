import React from 'react';
import { Dropdown } from 'antd';
import type { DropdownProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KDropdownMenuProps extends DropdownProps {
  children: React.ReactElement;
}

export function KDropdownMenu({ children, overlayStyle, ...rest }: KDropdownMenuProps) {
  return (
    <Dropdown
      overlayStyle={{ fontFamily: font, ...overlayStyle }}
      {...rest}
    >
      {children}
    </Dropdown>
  );
}

export default KDropdownMenu;
