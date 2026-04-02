import React, { useState, useRef, useEffect } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Copy, Check, Edit2, ExternalLink } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

// --- Types ---

type TypographyType = 'secondary' | 'success' | 'warning' | 'danger';

export interface BaseTypographyProps {
  /** Estado de validación/semántica */
  type?: TypographyType;
  /** Desactivar interacción */
  disabled?: boolean;
  /** Estilo negrita */
  strong?: boolean;
  /** Estilo cursiva */
  italic?: boolean;
  /** Estilo subrayado */
  underline?: boolean;
  /** Estilo tachado */
  delete?: boolean;
  /** Estilo resaltado */
  mark?: boolean;
  /** Estilo código */
  code?: boolean;
  /** Estilo tecla */
  keyboard?: boolean;
  /** Truncado con puntos suspensivos */
  ellipsis?: boolean | { rows?: number; expandable?: boolean; suffix?: string };
  /** Copiar al portapapeles */
  copyable?: boolean | { text?: string; onCopy?: () => void };
  /** Edición en línea */
  editable?: boolean | { onChange?: (val: string) => void; onStart?: () => void; onEnd?: () => void };
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// --- Variants ---

const typographyVariants = cva('font-primary m-0 transition-colors', {
  variants: {
    type: {
      secondary: 'text-khor-neutral-500',
      success: 'text-khor-success',
      warning: 'text-khor-warning',
      danger: 'text-khor-error',
      default: 'text-khor-neutral-900',
    },
    disabled: {
      true: 'text-khor-neutral-300 cursor-not-allowed select-none',
      false: '',
    },
    ellipsis: {
      true: 'truncate block',
      false: '',
    }
  },
  defaultVariants: {
    type: 'default',
    disabled: false,
    ellipsis: false,
  }
});

// --- Internal Formatters ---

const formatContent = (content: React.ReactNode, props: BaseTypographyProps) => {
  let result = content;
  if (props.strong) result = <strong>{result}</strong>;
  if (props.italic) result = <em>{result}</em>;
  if (props.underline) result = <u>{result}</u>;
  if (props.delete) result = <del>{result}</del>;
  if (props.mark) result = <mark className="bg-khor-warning-light px-1 rounded">{result}</mark>;
  if (props.code) result = <code className="bg-khor-neutral-100 text-khor-error px-1.5 py-0.5 rounded text-[0.9em] font-mono">{result}</code>;
  if (props.keyboard) result = <kbd className="bg-khor-neutral-100 border border-khor-neutral-300 border-b-2 px-1.5 py-0.5 rounded text-[0.85em] font-mono shadow-sm">{result}</kbd>;
  return result;
};

// --- Helper: Copy & Edit ---

const ExtraActions = ({ props, textValue, onUpdate }: { props: BaseTypographyProps, textValue: string, onUpdate?: (val: string) => void }) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(textValue);

  const handleCopy = () => {
    const textToCopy = typeof props.copyable === 'object' ? props.copyable.text || textValue : textValue;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    if (typeof props.copyable === 'object') props.copyable.onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  const startEdit = () => {
    setIsEditing(true);
    if (typeof props.editable === 'object') props.editable.onStart?.();
  };

  const saveEdit = () => {
    setIsEditing(false);
    onUpdate?.(editValue);
    if (typeof props.editable === 'object') props.editable.onEnd?.();
  };

  return (
    <span className="inline-flex items-center gap-2 ml-2 pointer-events-auto">
      {props.copyable && (
        <button 
          onClick={handleCopy}
          className="text-khor-neutral-400 hover:text-khor-primary transition-colors p-1 rounded hover:bg-black/5"
          title="Copiar"
        >
          {copied ? <Check size={14} className="text-khor-success" /> : <Copy size={14} />}
        </button>
      )}
      {props.editable && !isEditing && (
        <button 
          onClick={startEdit}
          className="text-khor-neutral-400 hover:text-khor-primary transition-colors p-1 rounded hover:bg-black/5"
          title="Editar"
        >
          <Edit2 size={14} />
        </button>
      )}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-xl shadow-2xl border border-khor-neutral-200 min-w-[320px] max-w-lg w-full">
            <h4 className="text-sm font-semibold text-khor-navy mb-3">Editar contenido</h4>
            <textarea 
              autoFocus
              className="w-full p-3 border border-khor-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-khor-primary focus:border-transparent outline-none transition-all h-32"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-khor-neutral-600 hover:bg-khor-neutral-100 rounded-lg"
              >
                Cancelar
              </button>
              <button 
                onClick={saveEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-khor-primary hover:bg-khor-primary-hover rounded-lg shadow-sm"
              >
                Guardar cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </span>
  );
};

// --- Sub-components ---

export const KTitle = React.forwardRef<HTMLHeadingElement, BaseTypographyProps & { level?: 1 | 2 | 3 | 4 | 5 }>(
  ({ level = 1, children, className, ...props }, ref) => {
    const Component = `h${level}` as any;
    const levelClasses = {
      1: 'text-[38px] font-bold leading-[1.2]',
      2: 'text-[30px] font-bold leading-[1.2]',
      3: 'text-[24px] font-semibold leading-[1.3]',
      4: 'text-[20px] font-semibold leading-[1.4]',
      5: 'text-[16px] font-semibold leading-[1.5]',
    }[level];

    return (
      <Component 
        ref={ref}
        className={cn(typographyVariants({ type: props.type, disabled: props.disabled }), levelClasses, className)}
        style={props.style}
      >
        {formatContent(children, props)}
        <ExtraActions props={props} textValue={children?.toString() || ''} onUpdate={(val) => {
          if (typeof props.editable === 'object') props.editable.onChange?.(val);
        }} />
      </Component>
    );
  }
);

export const KText = React.forwardRef<HTMLSpanElement, BaseTypographyProps & { 
  variant?: 'body-lg' | 'body-md' | 'small' | 'caption' | 'h1' | 'h2' | 'h3';
  color?: string;
}>(
  ({ children, className, variant = 'body-md', color, ...props }, ref) => {
    const variantClasses = {
      h1: 'text-[38px] font-bold leading-[1.2]',
      h2: 'text-[30px] font-bold leading-[1.2]',
      h3: 'text-[24px] font-semibold leading-[1.3]',
      'body-lg': 'text-[16px] leading-normal',
      'body-md': 'text-[14px] leading-normal',
      small: 'text-[12px] leading-normal',
      caption: 'text-[11px] leading-normal',
    }[variant];

    const ellipsisStyles = typeof props.ellipsis === 'object' && props.ellipsis.rows ? {
      display: '-webkit-box',
      WebkitLineClamp: props.ellipsis.rows,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden',
    } : {};

    return (
      <span 
        ref={ref}
        className={cn(
          typographyVariants({ type: props.type, disabled: props.disabled, ellipsis: !!props.ellipsis }), 
          variantClasses, 
          className
        )}
        style={{ ...props.style, ...ellipsisStyles, color: color || props.style?.color }}
      >
        {formatContent(children, props)}
        <ExtraActions props={props} textValue={children?.toString() || ''} onUpdate={(val) => {
          if (typeof props.editable === 'object') props.editable.onChange?.(val);
        }} />
      </span>
    );
  }
);

export const KParagraph = React.forwardRef<HTMLParagraphElement, BaseTypographyProps>(
  ({ children, className, ...props }, ref) => {
    const ellipsisStyles = typeof props.ellipsis === 'object' && props.ellipsis.rows ? {
      display: '-webkit-box',
      WebkitLineClamp: props.ellipsis.rows,
      WebkitBoxOrient: 'vertical' as const,
      overflow: 'hidden',
    } : {};

    return (
      <p 
        ref={ref}
        className={cn(
          typographyVariants({ type: props.type, disabled: props.disabled, ellipsis: !!props.ellipsis }), 
          'mb-4 leading-relaxed',
          className
        )}
        style={{ ...props.style, ...ellipsisStyles }}
      >
        {formatContent(children, props)}
        <ExtraActions props={props} textValue={children?.toString() || ''} onUpdate={(val) => {
          if (typeof props.editable === 'object') props.editable.onChange?.(val);
        }} />
      </p>
    );
  }
);

export const KLink = React.forwardRef<HTMLAnchorElement, BaseTypographyProps & React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ children, className, ...props }, ref) => {
    return (
      <a 
        ref={ref}
        className={cn(
          'text-khor-text-link hover:underline cursor-pointer transition-all inline-flex items-center gap-1',
          props.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          className
        )}
        {...props}
      >
        {formatContent(children, props)}
        {props.target === '_blank' && <ExternalLink size={12} className="opacity-50" />}
      </a>
    );
  }
);

// --- Compound Typography ---

const KTypographyRoot = ({ children, className, style }: { children: React.ReactNode, className?: string, style?: React.CSSProperties }) => (
  <article className={cn('typography font-primary', className)} style={style}>
    {children}
  </article>
);

const Typography = KTypographyRoot as any;
Typography.Title = KTitle;
Typography.Text = KText;
Typography.Paragraph = KParagraph;
Typography.Link = KLink;

export { Typography as KTypography };
export default Typography;
