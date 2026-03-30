import React from 'react';
import { Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KCheckboxProps extends CheckboxProps {
  label?: string;
}

export function KCheckbox({ 
  label, style, children, 
  variant, size, fullWidth, ...rest 
}: KCheckboxProps & { variant?: any, size?: any, fullWidth?: any }) {
  return (
    <Checkbox style={{ fontFamily: font, ...style }} {...rest}>
      {label || children}
    </Checkbox>
  );
}

export function KCheckboxGroup({ style, ...rest }: React.ComponentProps<typeof Checkbox.Group>) {
  return <Checkbox.Group style={{ fontFamily: font, ...style }} {...rest} />;
}

export default KCheckbox;
