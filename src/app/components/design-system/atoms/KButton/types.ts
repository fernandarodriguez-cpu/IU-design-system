import { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

export type KButtonVariant = 'solid' | 'outlined' | 'dashed' | 'filled' | 'text' | 'link';
export type KButtonColor = 'default' | 'primary' | 'danger';
export type KButtonSize = 'sm' | 'md' | 'lg' | 'icon';
export type KButtonShape = 'default' | 'circle' | 'round';

type CombinedAttributes = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'size' | 'shape' | 'onClick'> & 
                         Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'size' | 'shape' | 'onClick'>;

export interface KButtonProps extends CombinedAttributes {
  /** Estilo funcional del botón (modern AntD 5.4+) */
  variant?: KButtonVariant | 'primary' | 'secondary' | 'outline' | 'ghost' | 'navy';
  /** Color semántico del botón (modern AntD 5.4+) */
  color?: KButtonColor;
  /** Alias para variant (retrocompatibilidad) */
  kVariant?: KButtonVariant | 'primary' | 'secondary' | 'outline' | 'ghost' | 'navy';
  /** Tamaño del botón */
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
  /** Estado de carga. Puede ser boolean o objeto con delay */
  loading?: boolean | { delay?: number };
  /** El botón se comporta como un enlace */
  href?: string;
  /** Target del enlace (si href está presente) */
  target?: string;
  /** Estado de error/peligro (Legacy/Combined style) */
  danger?: boolean;
  /** Fondo transparente (Legacy/Combined style) */
  ghost?: boolean;
  /** Insertar espacio automático entre dos caracteres */
  autoInsertSpace?: boolean;
  /** Clases CSS para sub-elementos internos */
  classNames?: {
    icon?: string;
    content?: string;
  };
  /** Estilos en línea para sub-elementos internos */
  styles?: {
    icon?: CSSProperties;
    content?: CSSProperties;
  };
  /** Handlers */
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
}
