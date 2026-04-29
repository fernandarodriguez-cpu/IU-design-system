import React from 'react';
import { cn } from '../../../../../imports/utils';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

export interface KNavItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  collapsed?: boolean;
}

export const KNavItem = React.forwardRef<HTMLButtonElement, KNavItemProps>(function KNavItem(
  { icon, label, active, badge, collapsed, className, ...rest }, ref
) {
  return (
    <button
      ref={ref}
      style={{
        backgroundColor: active ? 'var(--khor-surface-selected)' : 'transparent',
        color: active ? 'var(--khor-text-on-action)' : 'rgba(255,255,255,0.7)',
        fontWeight: active ? t.typography.fontWeights.semibold : t.typography.fontWeights.regular,
      }}
      className={cn(
        "relative flex w-full items-center border-none font-primary text-xs transition-all duration-150 ease-in h-10 cursor-pointer outline-none",
        collapsed ? "justify-center p-2.5" : "justify-start px-4 py-0 gap-2.5",
        !active && "hover:bg-khor-surface-hover hover:text-white/90",
        className
      )}
      {...rest}
    >
      <span className={cn("flex items-center", active ? "text-white" : "text-white/70")}>
        {icon}
      </span>
      
      {!collapsed && (
        <span className="flex-1 truncate text-left">
          {label}
        </span>
      )}

      {!collapsed && badge !== undefined && badge > 0 && (
        <span 
          className="min-w-[18px] rounded-full bg-khor-primary px-1.5 py-[1px] text-center text-[10px] font-semibold text-white"
        >
          {badge}
        </span>
      )}

      {active && (
        <div 
          style={{ backgroundColor: t.colors.brand.primary }}
          className="absolute bottom-0 right-0 top-0 w-1 rounded-l-sm" 
        />
      )}
    </button>
  );
});

export default KNavItem;
