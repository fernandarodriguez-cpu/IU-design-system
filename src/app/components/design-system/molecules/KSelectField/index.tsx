import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

import { KFormField } from '../KFormField';

export interface KSelectFieldProps extends SelectProps {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
}

export function KSelectField({ 
  label, 
  required, 
  error, 
  hint, 
  style, 
  status,
  ...rest 
}: KSelectFieldProps) {
  const selectElement = (
    <Select
      style={{ width: '100%', fontFamily: font, ...style }}
      status={error ? 'error' : status}
      {...rest}
    />
  );

  if (label) {
    return (
      <KFormField 
        label={label} 
        required={required} 
        error={error} 
        hint={hint}
      >
        {selectElement}
      </KFormField>
    );
  }

  return selectElement;
}

export default KSelectField;
