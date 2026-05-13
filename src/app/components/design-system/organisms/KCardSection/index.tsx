import React from 'react';
import { KText } from '../../atoms/KText/index';
import { khorTokens } from '../../../../theme/khor-theme';
import { cn } from '../../../../../imports/utils';
const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KCardSectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  /** Fuerza el estado hover (útil para previews/playgrounds) */
  isHovered?: boolean;
}

export function KCardSection({ id, title, subtitle, extra, children, className, noPadding, isHovered }: KCardSectionProps) {
  return (
    <div
      id={id}
      className={cn(
        "flex flex-col overflow-hidden font-primary transition-all duration-300",
        "bg-[var(--khor-card-bg)] border-[var(--khor-card-border)] shadow-[var(--khor-card-shadow)] rounded-[var(--khor-card-radius)]",
        (isHovered) && "shadow-khor-md border-khor-primary translate-y-[-2px]",
        className
      )}
    >
      {title && (
        <div className="flex justify-between items-center px-[var(--khor-density-spacing-lg)] py-[var(--khor-density-spacing-md)] border-b border-[var(--khor-card-border)] opacity-95 transition-colors">
          <div>
            <KText variant="body-lg" color="navy" className="font-bold text-khor-text-primary tracking-tight">{title}</KText>
            {subtitle && <KText variant="small" color="secondary" className="text-xs opacity-70">{subtitle}</KText>}
          </div>
          {extra}
        </div>
      )}
      <div 
        className={cn(
          "flex-1",
          noPadding ? "p-0" : "p-[var(--khor-density-spacing-lg)]"
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default KCardSection;
