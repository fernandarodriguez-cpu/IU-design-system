import React from 'react';
import { Search, CheckCircle2, XCircle, Info, AlertTriangle, ShieldAlert, FileWarning, Ghost } from 'lucide-react';
import { cn } from '../../../../../imports/utils';
import { KButton } from '../../atoms/KButton/index';
import { KText } from '../../atoms/KText/index';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

const statusIcons = {
  success: <div className="bg-khor-success-light p-4 rounded-full"><CheckCircle2 className="w-16 h-16 text-khor-success" /></div>,
  error: <div className="bg-khor-error-light p-4 rounded-full"><XCircle className="w-16 h-16 text-khor-error" /></div>,
  info: <div className="bg-khor-info-light p-4 rounded-full"><Info className="w-16 h-16 text-khor-info" /></div>,
  warning: <div className="bg-khor-warning-light p-4 rounded-full"><AlertTriangle className="w-16 h-16 text-khor-warning" /></div>,
  '404': <div className="relative"><Search className="w-20 h-20 text-khor-neutral-200" /><Ghost className="w-8 h-8 text-khor-neutral-400 absolute bottom-0 right-0 animate-bounce" /></div>,
  '403': <div className="bg-khor-surface-subtle p-6 rounded-3xl"><ShieldAlert className="w-20 h-20 text-khor-navy opacity-80" /></div>,
  '500': <div className="bg-khor-error-light/30 p-6 rounded-3xl border-2 border-dashed border-khor-error/20"><FileWarning className="w-20 h-20 text-khor-error/80" /></div>,
};

export interface KEmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  actionLabel?: string;
  onAction?: () => void;
  actions?: React.ReactNode;
  variant?: 'default' | 'simple';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
  /** Fuerza el estado hover (útil para previews/playgrounds) */
  isHovered?: boolean;
}

export function KEmptyState({ 
  title, 
  description, 
  icon, 
  image,
  actionLabel, 
  onAction, 
  actions,
  variant = 'default',
  size = 'md',
  className,
  children,
  isHovered
}: KEmptyStateProps) {
  const iconSize = size === 'sm' ? 20 : size === 'lg' ? 40 : 28;
  const containerSize = size === 'sm' ? "w-16 h-16" : size === 'lg' ? "w-32 h-32" : "w-24 h-24";

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center font-primary transition-all duration-300",
        "p-[var(--khor-density-spacing-xl)] gap-[var(--khor-density-spacing-md)]", // Density compliance
        isHovered && "scale-[1.02]",
        className
      )}
    >
      <div className={cn(
        "flex items-center justify-center transition-all duration-500",
        variant === 'default' 
          ? cn("bg-khor-surface-subtle rounded-full text-khor-neutral-300 shadow-inner", containerSize) 
          : "text-khor-neutral-200"
      )}>
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className={cn("object-contain", variant === 'default' ? "w-3/5 h-3/5" : "w-full h-full")} 
          />
        ) : (
          icon || <Search size={variant === 'default' ? iconSize : iconSize * 1.5} />
        )}
      </div>

      <div className={cn("flex flex-col gap-1", size === 'sm' ? "max-w-[240px]" : "max-w-[400px]")}>
        <KText 
          variant={size === 'lg' ? 'h2' : size === 'sm' ? 'body-md' : 'h3'} 
          strong={size === 'sm'}
          className="text-khor-text-primary tracking-tight"
        >
          {title}
        </KText>
        {description && (
          <KText variant={size === 'sm' ? 'caption' : 'body-md'} color="secondary" className="opacity-80">
            {description}
          </KText>
        )}
      </div>

      {(actionLabel || actions) && (
        <div className="flex gap-3 mt-2">
          {actions || (actionLabel && (
            <KButton onClick={onAction} size={size === 'sm' ? 'sm' : 'md'}>
              {actionLabel}
            </KButton>
          ))}
        </div>
      )}

      {children && <div className="w-full mt-4">{children}</div>}
    </div>
  );
}

export default KEmptyState;
