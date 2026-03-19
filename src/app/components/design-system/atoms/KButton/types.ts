import type { ButtonProps } from 'antd';

export type KButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'navy' | 'dashed' | 'link' | 'text';
export type KButtonSize = 'sm' | 'md' | 'lg';

export interface KButtonProps extends Omit<ButtonProps, 'size' | 'type' | 'variant'> {
  kVariant?: KButtonVariant;
  /** @deprecated use kVariant — maps to AntD Button type */
  variant?: KButtonVariant;
  size?: KButtonSize;
  /** @deprecated usa icon de AntD directamente */
  iconPosition?: 'start' | 'end';
}
