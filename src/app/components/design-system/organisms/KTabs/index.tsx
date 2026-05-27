import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/utils/cn';

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

// Context to share type/size properties with compound children
const KTabsContext = React.createContext<{
  type?: 'line' | 'card' | 'pill';
  size?: 'sm' | 'md' | 'lg';
  centered?: boolean;
}>({
  type: 'pill',
  size: 'md',
  centered: false,
});

/**
 * @figma-mcp-migration
 * Component: KTabsList
 */
export const KTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  const { type = 'pill', size = 'md', centered } = React.useContext(KTabsContext);
  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center font-primary",
        
        // Dynamic size classes for height
        size === 'sm' ? "h-[var(--khor-density-height-sm)]" : size === 'lg' ? "h-[var(--khor-density-height-lg)]" : "h-[var(--khor-density-height-md)]",
        
        // Dynamic styling depending on variant
        type === 'pill' && "rounded-xl bg-khor-surface-subtle p-1 text-khor-text-tertiary shadow-inner",
        type === 'line' && "bg-transparent border-none p-0 h-auto gap-8 border-b border-khor-border-muted w-full justify-start",
        type === 'card' && "bg-khor-surface-subtle border border-khor-border-default rounded-t-lg p-0 h-auto",
        
        centered && "mx-auto",
        className
      )}
      {...props}
    />
  );
});
KTabsList.displayName = TabsPrimitive.List.displayName;

export const KTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & { isHovered?: boolean }
>(({ className, isHovered, ...props }, ref) => {
  const { type = 'pill', size = 'md' } = React.useContext(KTabsContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-khor-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-primary",
        isHovered && "bg-khor-surface-hover",
        
        // Pill Styling
        type === 'pill' && "rounded-lg px-3 py-1.5 hover:bg-khor-surface-hover data-[state=active]:bg-white data-[state=active]:text-khor-primary data-[state=active]:shadow-khor-sm data-[state=active]:hover:bg-white text-khor-text-secondary",
        
        // Line / Underline Styling
        type === 'line' && "bg-transparent border-b-2 border-transparent rounded-none px-0 py-2.5 -mb-[1px] hover:text-khor-neutral-900 data-[state=active]:bg-transparent data-[state=active]:border-khor-primary data-[state=active]:text-khor-primary data-[state=active]:shadow-none text-khor-neutral-500",
        
        // Card Styling
        type === 'card' && "bg-transparent border-r border-khor-border-default last:border-r-0 rounded-none px-6 py-3 data-[state=active]:bg-white data-[state=active]:text-khor-primary data-[state=active]:shadow-none data-[state=active]:border-b-white -mb-[1px] text-khor-text-secondary",
        
        // Responsive / Sizes adjustments
        size === 'sm' && (type === 'pill' ? "text-xs px-2 py-1" : type === 'line' ? "text-xs py-1.5" : "text-xs px-4 py-2"),
        size === 'lg' && (type === 'pill' ? "text-base px-5 py-2.5" : type === 'line' ? "text-base py-3" : "text-base px-8 py-4"),
        
        className
      )}
      {...props}
    />
  );
});
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
  const contextValue = React.useMemo(() => ({ type, size, centered }), [type, size, centered]);

  if (items) {
    return (
      <KTabsContext.Provider value={contextValue}>
        <KTabsRoot ref={ref} className={cn("w-full", className)} {...props}>
          <div className={cn("flex items-center mb-4", type !== 'line' ? "border-none" : "border-none")}>
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
                    type === 'line' && "bg-transparent border-b-2 border-transparent rounded-none px-0 py-2.5 data-[state=active]:bg-transparent data-[state=active]:border-khor-primary data-[state=active]:shadow-none",
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
      </KTabsContext.Provider>
    );
  }

  return (
    <KTabsContext.Provider value={contextValue}>
      <KTabsRoot ref={ref} className={className} {...props}>
        {children}
      </KTabsRoot>
    </KTabsContext.Provider>
  );
});

KTabs.displayName = "KTabs";

export default KTabs;
