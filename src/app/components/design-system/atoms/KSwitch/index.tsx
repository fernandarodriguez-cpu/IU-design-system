import React from 'react';
import { Switch } from 'antd';
import type { SwitchProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KSwitchProps extends SwitchProps {
  label?: string;
}

export function KSwitch({ label, style, ...rest }: KSwitchProps) {
  const switchElement = (
    <Switch
      style={{
        backgroundColor: (rest.checked || rest.defaultChecked) ? t.colors.brand.primary : undefined,
        ...style
      }}
      {...rest}
    />
  );

  if (!label) return switchElement;

  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: rest.disabled ? 'not-allowed' : 'pointer' }}>
      {switchElement}
      <span style={{ fontSize: 14, color: rest.disabled ? t.colors.neutral[300] : t.colors.neutral[900], fontFamily: font }}>
        {label}
      </span>
    </label>
  );
}

export default KSwitch;
