import React from 'react';
import { Radio } from 'antd';
import type { RadioGroupProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KRadioProps extends Omit<RadioGroupProps, 'size'> {
  options: { label: string; value: string | number; disabled?: boolean }[];
  direction?: 'horizontal' | 'vertical';
  variant?: 'default' | 'button';
  size?: 'sm' | 'md' | 'lg';
}

const sizeToAntd = (size?: 'sm' | 'md' | 'lg') => {
  if (size === 'sm') return 'small';
  if (size === 'lg') return 'large';
  return 'middle';
};

export function KRadio({ direction, variant = 'default', size = 'md', style, ...rest }: KRadioProps) {
  return (
    <Radio.Group
      optionType={variant === 'button' ? 'button' : 'default'}
      size={sizeToAntd(size)}
      style={{
        display: 'flex', flexDirection: direction === 'vertical' ? 'column' : 'row', gap: 8,
        fontFamily: font, ...style,
      }}
      {...rest}
    />
  );
}

export default KRadio;
