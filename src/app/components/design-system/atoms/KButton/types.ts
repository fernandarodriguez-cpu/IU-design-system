import { ButtonHTMLAttributes, ReactNode } from 'react';

export type KButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'navy' | 'dashed' | 'link' | 'text';
export type KButtonSize = 'sm' | 'md' | 'lg' | 'icon';
export type KButtonShape = 'default' | 'circle' | 'round';

export interface KButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  kVariant?: KButtonVariant;
  /** @deprecated use kVariant — maps to Tailwind variants */
  variant?: KButtonVariant;
  size?: KButtonSize;
  /** Forma del botón: default | circle | round */
  shape?: KButtonShape;
  /** Tipo HTML nativo del botón en formularios */
  htmlType?: 'button' | 'submit' | 'reset';
  /** Native type property for DOM attributes */
  type?: 'button' | 'submit' | 'reset';
  /** Optional icon to render inside the button */
  icon?: ReactNode;
  /** Position of the icon relative to the children */
  iconPosition?: 'start' | 'end';
  /** Ocupar 100% de anchura */
  fullWidth?: boolean;
  /** Alias para fullWidth (retrocompatibilidad AntD) */
  block?: boolean;
  /** Estado de carga */
  loading?: boolean;
}
