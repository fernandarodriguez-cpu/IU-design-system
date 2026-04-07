import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../../../../imports/utils';
import { KDropdownMenu } from '../KDropdownMenu';
import { KDropdownMenuProps } from '../KDropdownMenu';

export interface KBreadcrumbItem {
  key?: string | number;
  title: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  menu?: KDropdownMenuProps['menu'];
}

export interface KBreadcrumbProps {
  items: KBreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * KBreadcrumb — Sistema de navegación jerárquica (Headless v4)
 * Reemplaza AntD Breadcrumb con una estructura pura y accesible, optimizada con Tailwind y Lucide.
 */
export function KBreadcrumb({
  items,
  separator = <ChevronRight className="w-3.5 h-3.5" />,
  className,
  style,
}: KBreadcrumbProps) {
  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex items-center flex-wrap gap-2 text-sm font-primary", className)} 
      style={style}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        let ItemContent = (
          <div className={cn(
            "flex items-center gap-1.5 group px-1 rounded-md transition-all",
            !isLast && "hover:bg-khor-neutral-100/50"
          )}>
            {item.icon && <span className="text-khor-neutral-400 group-hover:text-khor-primary transition-colors">{item.icon}</span>}
            <span className={cn(
              "transition-colors",
              isLast ? "font-extrabold text-khor-neutral-900 cursor-default" : "text-khor-neutral-500 hover:text-khor-primary font-medium"
            )}>
              {item.title}
            </span>
            {item.menu && <ChevronRight className="w-3 h-3 rotate-90 text-khor-neutral-300" />}
          </div>
        );

        // Si tiene menu, envolver en Dropdown
        if (item.menu && !isLast) {
          ItemContent = (
            <KDropdownMenu menu={item.menu} placement="bottomLeft">
              <button type="button" className="outline-none">
                {ItemContent}
              </button>
            </KDropdownMenu>
          );
        }

        return (
          <React.Fragment key={item.key || index}>
            {item.href && !isLast ? (
              <a 
                href={item.href} 
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-khor-primary-light rounded-md"
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
              >
                {ItemContent}
              </a>
            ) : item.onClick && !isLast ? (
              <button 
                type="button" 
                onClick={item.onClick}
                className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-khor-primary-light rounded-md"
              >
                {ItemContent}
              </button>
            ) : (
              ItemContent
            )}
            
            {!isLast && (
              <span className="text-khor-neutral-300 shrink-0 select-none mx-0.5">
                {separator}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default KBreadcrumb;
