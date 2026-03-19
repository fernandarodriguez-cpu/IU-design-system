import React from 'react';
import { Radio } from 'antd';
import type { RadioGroupProps, RadioProps } from 'antd';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KRadioProps extends Omit<RadioGroupProps, 'size'> {
  options: { label: string; value: string | number; disabled?: boolean }[];
  direction?: 'horizontal' | 'vertical';
  variant?: 'default' | 'button';
  size?: 'sm' | 'md' | 'lg';
  /** Aplica solo cuando variant="button": solid (fondo relleno) | outline (solo borde) */
  buttonStyle?: 'solid' | 'outline';
}

export interface KRadioItemProps extends RadioProps {
  label?: string;
}

const sizeToAntd = (size?: 'sm' | 'md' | 'lg') => {
  if (size === 'sm') return 'small';
  if (size === 'lg') return 'large';
  return 'middle';
};

/** Radio.Group con opciones configurables mediante array */
export function KRadio({ direction, variant = 'default', size = 'md', buttonStyle = 'solid', style, ...rest }: KRadioProps) {
  return (
    <Radio.Group
      optionType={variant === 'button' ? 'button' : 'default'}
      buttonStyle={buttonStyle}
      size={sizeToAntd(size)}
      style={{
        display: 'flex', flexDirection: direction === 'vertical' ? 'column' : 'row', gap: 8,
        fontFamily: font, ...style,
      }}
      {...rest}
    />
  );
}

/** Radio individual para uso standalone o en formularios personalizados */
export function KRadioItem({ label, style, children, ...rest }: KRadioItemProps) {
  return (
    <Radio style={{ fontFamily: font, ...style }} {...rest}>
      {label || children}
    </Radio>
  );
}

export default KRadio;
