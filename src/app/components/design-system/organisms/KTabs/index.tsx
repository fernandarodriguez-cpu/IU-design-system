import React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '../../../../../imports/utils';

export const KTabs = TabsPrimitive.Root;

export const KTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-[var(--khor-neutral-100)] p-1 text-[var(--khor-neutral-500)]",
      className
    )}
    {...props}
  />
));
KTabsList.displayName = TabsPrimitive.List.displayName;

export const KTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--khor-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-[var(--khor-surface-page)] data-[state=active]:text-[var(--khor-neutral-900)] data-[state=active]:shadow-sm font-primary",
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
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--khor-primary)] focus-visible:ring-offset-2 font-primary",
      className
    )}
    {...props}
  />
));
KTabsContent.displayName = TabsPrimitive.Content.displayName;

export default KTabs;
