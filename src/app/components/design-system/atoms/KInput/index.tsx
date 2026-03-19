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
  error?: string; // mapeado a status="error"
  block?: boolean;
}

export const KInput = React.forwardRef<InputRef, KInputProps>(function KInput(
  { size = 'md', error, status, style, block, ...rest },
  ref,
) {
  const resolvedStatus = error ? 'error' : status;
  return (
    <div style={{ width: block ? '100%' : undefined }}>
      <Input
        ref={ref}
        size={sizeToAntd(size)}
        status={resolvedStatus}
        style={{ fontFamily: font, borderRadius: t.radius.md, ...style }}
        {...rest}
      />
      {error && (
        <p style={{ color: t.colors.feedback.error, fontSize: 12, marginTop: 4, fontFamily: font }}>
          {error}
        </p>
      )}
    </div>
  );
});

export interface KInputPasswordProps extends Omit<InputProps, 'size' | 'type'> {
  size?: 'sm' | 'md' | 'lg';
  error?: string;
}

export const KInputPassword = React.forwardRef<InputRef, KInputPasswordProps>(function KInputPassword(
  { size = 'md', error, status, style, ...rest },
  ref,
) {
  return (
    <div>
      <Input.Password
        ref={ref}
        size={sizeToAntd(size)}
        status={error ? 'error' : status}
        style={{ fontFamily: font, borderRadius: t.radius.md, ...style }}
        {...rest}
      />
      {error && (
        <p style={{ color: t.colors.feedback.error, fontSize: 12, marginTop: 4, fontFamily: font }}>
          {error}
        </p>
      )}
    </div>
  );
});

export interface KInputSearchProps extends Omit<InputProps, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  onSearch?: (value: string) => void;
  loading?: boolean;
}

export const KInputSearch = React.forwardRef<InputRef, KInputSearchProps>(function KInputSearch(
  { size = 'md', style, ...rest },
  ref,
) {
  return (
    <Input.Search
      ref={ref}
      size={sizeToAntd(size)}
      style={{ fontFamily: font, ...style }}
      {...rest}
    />
  );
});

export default KInput;
