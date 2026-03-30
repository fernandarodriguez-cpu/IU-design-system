import React from 'react';
import { Dropdown } from 'antd';
import type { DropdownProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KDropdownMenuProps extends DropdownProps {
  children: React.ReactElement;
}

/**
 * KDropdownMenu: Menú desplegable para acciones secundarias.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KDropdownMenu({ 
  children, overlayStyle, 
  variant, size, fullWidth, ...rest 
}: KDropdownMenuProps & { variant?: any, size?: any, fullWidth?: any }) {
  return (
    <Dropdown
      overlayStyle={{ 
        fontFamily: font, 
        ...overlayStyle 
      }}
      {...rest}
    >
      {children}
    </Dropdown>
  );
}

export default KDropdownMenu;
