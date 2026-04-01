import React from 'react';
import { cn } from '../../../../../imports/utils';
import { Info } from 'lucide-react';
import { KTooltip } from '../../molecules/KTooltip';

export interface KLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  info?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * KLabel — Componente para etiquetas de formulario.
 * Soporta indicador de obligatoriedad y tooltip de información.
 */
export const KLabel = React.forwardRef<HTMLLabelElement, KLabelProps>(function KLabel(
  { required, info, size = 'md', className, children, ...rest },
  ref,
) {
  const sizeClasses = {
    sm: "text-xs mb-0.5",
    md: "text-sm mb-1",
    lg: "text-base mb-1.5",
  };

  return (
    <label
      ref={ref}
      className={cn(
        "inline-flex items-center font-medium font-primary text-foreground/80 select-none",
        sizeClasses[size],
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      
      {required && (
        <span className="ml-1 text-[var(--khor-error)]" title="Requerido">
          *
        </span>
      )}
      
      {info && (
        <KTooltip title={info}>
          <Info size={14} className="ml-1.5 text-[var(--khor-neutral-400)] cursor-help hover:text-[var(--khor-primary)] transition-colors" />
        </KTooltip>
      )}
    </label>
  );
});

export default KLabel;
