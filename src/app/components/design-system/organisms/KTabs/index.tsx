import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../../../../imports/utils';

export interface KTabItem {
  key: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface KTabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  items?: KTabItem[];
  type?: 'line' | 'card' | 'pill';
  centered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  tabBarExtraContent?: React.ReactNode;
}

const KTabsRoot = TabsPrimitive.Root;

export const KTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-[var(--khor-density-height-md)] items-center justify-center rounded-xl bg-khor-surface-subtle p-1 text-khor-text-tertiary shadow-inner",
      className
    )}
    {...props}
  />
));
KTabsList.displayName = TabsPrimitive.List.displayName;

export const KTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { isHovered?: boolean }
>(({ className, isHovered, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khor-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-khor-primary data-[state=active]:shadow-khor-sm hover:bg-khor-surface-hover data-[state=active]:hover:bg-white font-primary",
      isHovered && "bg-khor-surface-hover",
      className
    )}
    {...props}
  />
));
KTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const KTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khor-primary focus-visible:ring-offset-2 font-primary animate-in fade-in-0 zoom-in-95 duration-300",
      className
    )}
    {...props}
  />
));
KTabsContent.displayName = TabsPrimitive.Content.displayName;

/**
 * KTabs — Sistema de pestañas altamente flexible (Headless v4)
 * Soporta API de alto nivel (items) y arquitectura de componentes compuestos.
 */
export const KTabs = React.forwardRef<
  React.ElementRef<typeof KTabsRoot>,
  KTabsProps
>(({ items, type = 'pill', centered, size = 'md', tabBarExtraContent, className, children, ...props }, ref) => {
  if (items) {
    return (
      <KTabsRoot ref={ref} className={cn("w-full", className)} {...props}>
        <div className={cn("flex items-center border-b border-khor-border-muted mb-4", type !== 'line' && "border-none")}>
          <KTabsList 
            className={cn(
              centered && "mx-auto",
              type === 'line' && "bg-transparent border-none p-0 h-auto gap-8",
              type === 'card' && "bg-khor-surface-subtle border border-khor-border-default rounded-t-lg p-0 h-auto",
              size === 'sm' ? "h-[var(--khor-density-height-sm)]" : size === 'lg' ? "h-[var(--khor-density-height-lg)]" : "h-[var(--khor-density-height-md)]"
            )}
          >
            {items.map((item) => (
              <KTabsTrigger
                key={item.key}
                value={item.key}
                disabled={item.disabled}
                className={cn(
                  type === 'line' && "bg-transparent border-b-2 border-transparent rounded-none px-0 py-2 data-[state=active]:bg-transparent data-[state=active]:border-khor-primary data-[state=active]:shadow-none",
                  type === 'card' && "bg-transparent border-r border-khor-border-default last:border-r-0 rounded-none px-6 py-3 data-[state=active]:bg-white data-[state=active]:shadow-none data-[state=active]:border-b-white -mb-[1px]",
                  size === 'sm' && "text-xs px-2 py-1",
                  size === 'lg' && "text-base px-5 py-2.5"
                )}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  {item.label}
                </div>
              </KTabsTrigger>
            ))}
          </KTabsList>
          {tabBarExtraContent && <div className="ml-auto">{tabBarExtraContent}</div>}
        </div>
        {items.map((item) => (
          <KTabsContent key={item.key} value={item.key}>
            {item.children}
          </KTabsContent>
        ))}
      </KTabsRoot>
    );
  }

  return (
    <KTabsRoot ref={ref} className={className} {...props}>
      {children}
    </KTabsRoot>
  );
});

KTabs.displayName = "KTabs";

export default KTabs;
