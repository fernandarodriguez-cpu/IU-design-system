import type { ButtonProps } from 'antd';

export type KButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'navy' | 'dashed' | 'link' | 'text';
export type KButtonSize = 'sm' | 'md' | 'lg';
export type KButtonShape = 'default' | 'circle' | 'round';
export type KButtonHtmlType = 'button' | 'submit' | 'reset';

export interface KButtonProps extends Omit<ButtonProps, 'size' | 'type' | 'variant' | 'shape' | 'htmlType'> {
  kVariant?: KButtonVariant;
  /** @deprecated use kVariant — maps to AntD Button type */
  variant?: KButtonVariant;
  size?: KButtonSize;
  /** Forma del botón: default | circle | round */
  shape?: KButtonShape;
  /** Tipo HTML nativo del botón en formularios */
  htmlType?: KButtonHtmlType;
  /** @deprecated usa icon de AntD directamente */
  iconPosition?: 'start' | 'end';
  /** Destructured to avoid DOM leakage */
  fullWidth?: boolean;
}
