import React from 'react';
import { Input } from 'antd';
import type { InputProps, InputRef } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

const sizeToAntd = (size?: 'sm' | 'md' | 'lg'): InputProps['size'] => {
  if (size === 'sm') return 'small';
  if (size === 'lg') return 'large';
  return 'middle';
};

export interface KInputProps extends Omit<InputProps, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  /** Mensaje de error: activa status="error" y muestra texto bajo el input */
  error?: string;
  /** Mensaje de advertencia: activa status="warning" y muestra texto bajo el input */
  warning?: string;
  /** Ancho completo del contenedor */
  block?: boolean;
  /** Estilo visual del input: outlined (borde), borderless (sin borde), filled (fondo sólido) */
  variant?: 'outlined' | 'borderless' | 'filled';
}

export const KInput = React.forwardRef<InputRef, KInputProps>(function KInput(
  { size = 'md', error, warning, status, style, block, variant = 'outlined', ...rest },
  ref,
) {
  const resolvedStatus = error ? 'error' : warning ? 'warning' : status;
  const feedbackMsg = error || warning;
  const feedbackColor = error ? t.colors.feedback.error : t.colors.feedback.warning;

  return (
    <div style={{ width: block ? '100%' : undefined }}>
      <Input
        ref={ref}
        size={sizeToAntd(size)}
        status={resolvedStatus}
        variant={variant}
        style={{ 
          fontFamily: font, 
          borderRadius: 'var(--khor-density-radius)', 
          height: 'var(--khor-density-height-input)', 
          fontSize: 'var(--khor-density-font-body)',
          paddingLeft: 'var(--khor-density-spacing-md)',
          paddingRight: 'var(--khor-density-spacing-md)',
          ...style 
        }}
        {...rest}
      />
      {feedbackMsg && (
        <p style={{ color: feedbackColor, fontSize: 12, marginTop: 4, fontFamily: font }}>
          {feedbackMsg}
        </p>
      )}
    </div>
  );
});

export interface KInputPasswordProps extends Omit<InputProps, 'size' | 'type'> {
  size?: 'sm' | 'md' | 'lg';
  error?: string;
  warning?: string;
  variant?: 'outlined' | 'borderless' | 'filled';
}

export const KInputPassword = React.forwardRef<InputRef, KInputPasswordProps>(function KInputPassword(
  { size = 'md', error, warning, status, style, variant = 'outlined', ...rest },
  ref,
) {
  const resolvedStatus = error ? 'error' : warning ? 'warning' : status;
  const feedbackMsg = error || warning;
  const feedbackColor = error ? t.colors.feedback.error : t.colors.feedback.warning;
  return (
    <div>
      <Input.Password
        ref={ref}
        size={sizeToAntd(size)}
        status={resolvedStatus}
        variant={variant}
        style={{ 
          fontFamily: font, 
          borderRadius: 'var(--khor-density-radius)', 
          height: 'var(--khor-density-height-input)', 
          fontSize: 'var(--khor-density-font-body)',
          paddingLeft: 'var(--khor-density-spacing-md)',
          paddingRight: 'var(--khor-density-spacing-md)',
          ...style 
        }}
        {...rest}
      />
      {feedbackMsg && (
        <p style={{ color: feedbackColor, fontSize: 12, marginTop: 4, fontFamily: font }}>
          {feedbackMsg}
        </p>
      )}
    </div>
  );
});

export interface KInputSearchProps extends Omit<InputProps, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  onSearch?: (value: string) => void;
  loading?: boolean;
  variant?: 'outlined' | 'borderless' | 'filled';
}

export const KInputSearch = React.forwardRef<InputRef, KInputSearchProps>(function KInputSearch(
  { size = 'md', style, variant = 'outlined', ...rest },
  ref,
) {
  return (
    <Input.Search
      ref={ref}
      size={sizeToAntd(size)}
      variant={variant}
      style={{ 
        fontFamily: font, 
        borderRadius: 'var(--khor-density-radius)', 
        height: 'var(--khor-density-height-input)', 
        fontSize: 'var(--khor-density-font-body)',
        ...style 
      }}
      {...rest}
    />
  );
});

export default KInput;
