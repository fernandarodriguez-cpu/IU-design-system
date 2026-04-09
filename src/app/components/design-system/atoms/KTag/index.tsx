import React, { useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../../../imports/utils';
import { X } from 'lucide-react';

export type KTagColor = 
  | 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info' | 'default' | 'processing'
  | 'magenta' | 'red' | 'volcano' | 'orange' | 'gold' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple'
  // Legacy
  | 'navy';

const tagVariants = cva(
  'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-semibold font-primary border transition-all focus:outline-none focus:ring-2 focus:ring-khor-primary focus:ring-offset-2 select-none',
  {
    variants: {
      color: {
        primary: 'bg-khor-primary/10 text-khor-primary border-khor-primary/20',
        secondary: 'bg-khor-secondary/10 text-khor-secondary border-khor-secondary/20',
        navy: 'bg-khor-secondary/10 text-khor-secondary border-khor-secondary/20',
        accent: 'bg-khor-accent/10 text-khor-accent border-khor-accent/20',
        success: 'bg-khor-success/10 text-khor-success border-khor-success/20',
        error: 'bg-khor-error/10 text-khor-error border-khor-error/20',
        warning: 'bg-khor-warning/10 text-khor-warning border-khor-warning/20',
        info: 'bg-khor-info/10 text-khor-info border-khor-info/20',
        processing: 'bg-khor-primary/10 text-khor-primary border-khor-primary/20 animate-pulse',
        default: 'bg-khor-neutral-100 text-khor-neutral-600 border-khor-neutral-200',
        // AntD Presets
        magenta: 'bg-pink-50 text-pink-600 border-pink-200',
        red: 'bg-red-50 text-red-600 border-red-200',
        volcano: 'bg-orange-50 text-orange-700 border-orange-200',
        orange: 'bg-orange-50 text-orange-600 border-orange-200',
        gold: 'bg-amber-50 text-amber-600 border-amber-200',
        lime: 'bg-lime-50 text-lime-600 border-lime-200',
        green: 'bg-green-50 text-green-600 border-green-200',
        cyan: 'bg-cyan-50 text-cyan-600 border-cyan-200',
        blue: 'bg-blue-50 text-blue-600 border-blue-200',
        geekblue: 'bg-indigo-50 text-indigo-600 border-indigo-200',
        purple: 'bg-purple-50 text-purple-600 border-purple-200',
      },
      bordered: {
        true: '',
        false: 'border-transparent',
      }
    },
    defaultVariants: {
      color: 'default',
      bordered: true,
    }
  }
);

export interface KTagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Color predefinido o CSS color */
  color?: KTagColor | string;
  /** Estado semántico (v4) */
  status?: 'success' | 'processing' | 'error' | 'warning' | 'default';
  /** Icono al inicio */
  icon?: React.ReactNode;
  /** Si tiene borde visible */
  bordered?: boolean;
  /** Si es eliminable */
  closable?: boolean;
  /** Icono de cierre personalizado */
  closeIcon?: React.ReactNode;
  /** Evento al cerrar */
  onClose?: (e: React.MouseEvent) => void;
  /** Estilos semánticos */
  styles?: {
    root?: React.CSSProperties;
    closeIcon?: React.CSSProperties;
  };
  /** Clases semánticas */
  classNames?: {
    root?: string;
    closeIcon?: string;
  };
}

/**
 * KTag — Etiqueta pequeña para categorización o estados.
 */
const KTagInternal = React.forwardRef<HTMLSpanElement, KTagProps>(function KTag(
  { className, color, status, bordered = true, icon, closable, closeIcon, onClose, children, style, styles, classNames, ...rest }, ref
) {
  const [visible, setVisible] = useState(true);
  
  const finalColor = status || color || 'default';
  const isCustomColor = color && !['primary', 'secondary', 'navy', 'accent', 'success', 'error', 'warning', 'info', 'default', 'processing', 'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'].includes(color) && !status;
  
  const customStyles = isCustomColor ? {
    backgroundColor: color, 
    color: '#fff',
    borderColor: 'transparent',
  } : {};

  if (!visible) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onClose) {
      onClose(e);
    } else {
      setVisible(false);
    }
  };

  return (
    <span
      ref={ref}
      className={cn(
        tagVariants({ color: isCustomColor ? undefined : finalColor as any, bordered }), 
        classNames?.root,
        className
      )}
      style={{ ...customStyles, ...styles?.root, ...style }}
      {...rest}
    >
      {icon && <span className="flex items-center shrink-0">{icon}</span>}
      <span className="leading-none whitespace-nowrap">{children}</span>
      {closable && (
        <span 
          className={cn(
            "cursor-pointer opacity-60 hover:opacity-100 transition-opacity ml-1 flex items-center justify-center hover:bg-black/5 rounded-full p-0.5",
            classNames?.closeIcon
          )}
          onClick={handleClose}
          style={styles?.closeIcon}
          title="Eliminar"
        >
          {closeIcon || <X size={12} />}
        </span>
      )}
    </span>
  );
});

// --- CheckableTag ---

export interface KCheckableTagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const KCheckableTag = React.forwardRef<HTMLSpanElement, KCheckableTagProps>(function KCheckableTag(
  { className, checked = false, onChange, children, style, ...rest }, ref
) {
  return (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold font-primary transition-all select-none cursor-pointer border',
        checked 
          ? 'bg-khor-primary text-white border-khor-primary shadow-sm' 
          : 'bg-khor-neutral-100 text-khor-neutral-600 border-khor-neutral-200 hover:bg-khor-neutral-200 hover:border-khor-neutral-300',
        className
      )}
      onClick={() => onChange?.(!checked)}
      style={style}
      {...rest}
    >
      {children}
    </span>
  );
});

// --- Compound Assignment ---

type CompoundedComponent = typeof KTagInternal & {
  CheckableTag: typeof KCheckableTag;
};

export const KTag = KTagInternal as CompoundedComponent;
KTag.CheckableTag = KCheckableTag;

KTag.displayName = 'KTag';
KCheckableTag.displayName = 'KTag.CheckableTag';

export default KTag;
