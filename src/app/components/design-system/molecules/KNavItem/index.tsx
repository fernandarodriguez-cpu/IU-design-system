import React from 'react';
import { cn } from '../../../../../imports/utils';

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
      className={cn(
        "relative flex w-full items-center border-none font-primary text-xs transition-all duration-150 ease-in h-10 cursor-pointer outline-none",
        collapsed ? "justify-center p-2.5" : "justify-start px-4 py-0 gap-2.5",
        active 
          ? "bg-[#202f73] font-semibold text-white" 
          : "bg-transparent font-normal text-white/70 hover:bg-white/5 hover:text-white/90",
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
        <div className="absolute bottom-0 right-0 top-0 w-1 rounded-l-sm bg-khor-primary" />
      )}
    </button>
  );
});

export default KNavItem;
