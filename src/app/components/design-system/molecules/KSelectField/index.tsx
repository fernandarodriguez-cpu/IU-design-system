import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KSelectFieldProps extends SelectProps {
  label?: string;
}

export function KSelectField({ label, style, ...rest }: KSelectFieldProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 500, color: t.colors.neutral[500], fontFamily: font }}>
          {label}
        </label>
      )}
      <Select
        style={{ width: '100%', fontFamily: font, ...style }}
        {...rest}
      />
    </div>
  );
}

export default KSelectField;
