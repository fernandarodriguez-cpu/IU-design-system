import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';
import { KFormField } from '../KFormField';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KSelectFieldProps extends SelectProps {
  label?: string;
  required?: boolean;
  error?: string;
  hint?: string;
}

/**
 * KSelectField: Selector desplegable con soporte de etiqueta y errores.
 * Refinado para evitar fugas de props al DOM (variant, size, fullWidth).
 */
export function KSelectField({ 
  label, 
  required, 
  error, 
  hint, 
  style, 
  status,
  variant,
  size,
  fullWidth,
  ...rest 
}: KSelectFieldProps & { variant?: any, size?: any, fullWidth?: any }) {
  const selectElement = (
    <Select
      style={{ width: '100%', fontFamily: font, ...style }}
      status={error ? 'error' : status}
      size={size as any}
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
