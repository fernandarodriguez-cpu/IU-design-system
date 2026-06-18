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
  type?: 'pill' | 'line' | 'card';
  centered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  tabBarExtraContent?: React.ReactNode;
}

const KTabsRoot = TabsPrimitive.Root;

const KTabsContext = React.createContext<{
  type: 'pill' | 'line' | 'card';
  size: 'sm' | 'md' | 'lg';
  centered: boolean;
}>({ type: 'pill', size: 'md', centered: false });

/* ─── Figma tokens: type='pill' (187682-19747) ───
   Container:  bg #dbdbdb  border #b5b5b5  padding 6px
   Active btn: bg #ffffff  border #ffffff  text #0c1a66  fw 600
   Inactive:   bg transparent  text #8f9096  fw 600

   sm  → container h=36 r=4  / btn h=24 r=4
   md  → container h=44 r=6  / btn h=32 r=8
   lg  → container h=52 r=8  / btn h=40 r=8
─────────────────────────────────────────────── */
const PILL_SIZES = {
  sm: { containerH: 36, containerR: 4, btnH: 24, btnR: 4, px: 12, fs: 12 },
  md: { containerH: 44, containerR: 6, btnH: 32, btnR: 8, px: 16, fs: 14 },
  lg: { containerH: 52, containerR: 8, btnH: 40, btnR: 8, px: 20, fs: 15 },
};

/* ─── Figma tokens: type='line' (187678-28957) ───
   Active:   text #051758  fw 600  ink-bar 2px solid #051758
   Inactive: text #8f9096  fw 400
   Container bottom border: 2px solid #ced4da
   Trigger heights: sm=38  md=46  lg=56  (fs=14 all sizes)
─────────────────────────────────────────────── */
const LINE_SIZES = {
  sm: { h: 38, fs: 14 },
  md: { h: 46, fs: 14 },
  lg: { h: 56, fs: 14 },
};

/* ─── KTabsList ─────────────────────────────── */
export const KTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, style, ...props }, ref) => {
  const { type, size, centered } = React.useContext(KTabsContext);

  if (type === 'pill') {
    const s = PILL_SIZES[size];
    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn('inline-flex items-center font-primary', centered && 'mx-auto', className)}
        style={{
          height: s.containerH,
          borderRadius: s.containerR,
          backgroundColor: '#dbdbdb',
          border: '1px solid #b5b5b5',
          padding: 6,
          gap: 0,
          boxSizing: 'border-box',
          ...style,
        }}
        {...props}
      />
    );
  }

  if (type === 'line') {
    return (
      <TabsPrimitive.List
        ref={ref}
        className={cn(
          'flex items-center w-full font-primary',
          centered && 'justify-center',
          className
        )}
        style={{
          gap: 0,
          padding: 0,
          borderBottom: '2px solid #ced4da',
          boxSizing: 'border-box',
          ...style,
        }}
        {...props}
      />
    );
  }

  return (
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        'flex items-center font-primary bg-khor-surface-subtle border border-khor-border-default rounded-t-lg',
        centered && 'justify-center',
        className
      )}
      style={style}
      {...props}
    />
  );
});
KTabsList.displayName = 'KTabsList';

/* ─── KTabsTrigger ──────────────────────────── */
export const KTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, style, children, ...props }, ref) => {
  const { type, size } = React.useContext(KTabsContext);

  if (type === 'pill') {
    const s = PILL_SIZES[size];
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1a66] focus-visible:ring-offset-1',
          'disabled:pointer-events-none disabled:opacity-40 font-primary',
          'text-[#8f9096] bg-transparent border border-transparent',
          'data-[state=active]:bg-white data-[state=active]:text-[#0c1a66]',
          'data-[state=active]:shadow-[0_1px_4px_rgba(0,0,0,0.12)]',
          'data-[state=active]:border-white',
          className
        )}
        style={{
          height: s.btnH,
          borderRadius: s.btnR,
          paddingLeft: s.px,
          paddingRight: s.px,
          fontSize: s.fs,
          boxSizing: 'border-box',
          ...style,
        }}
        {...props}
      >
        {children}
      </TabsPrimitive.Trigger>
    );
  }

  if (type === 'line') {
    const ls = LINE_SIZES[size];
    return (
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051758] focus-visible:ring-offset-1',
          'disabled:pointer-events-none disabled:opacity-40 font-primary',
          'text-[#8f9096] font-normal border-b-2 border-transparent',
          'data-[state=active]:text-[#051758] data-[state=active]:font-semibold data-[state=active]:border-[#051758]',
          className
        )}
        style={{
          height: ls.h,
          fontSize: ls.fs,
          background: 'transparent',
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: -2,
          boxSizing: 'border-box',
          ...style,
        }}
        {...props}
      >
        {children}
      </TabsPrimitive.Trigger>
    );
  }

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap font-semibold text-sm transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1a66]',
        'disabled:pointer-events-none disabled:opacity-40 font-primary',
        'border-r border-khor-border-default last:border-r-0 rounded-none px-6 py-3',
        'text-khor-text-secondary',
        'data-[state=active]:bg-white data-[state=active]:text-khor-primary',
        className
      )}
      style={{ cursor: 'pointer', ...style }}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  );
});
KTabsTrigger.displayName = 'KTabsTrigger';

/* ─── KTabsContent ──────────────────────────── */
export const KTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0c1a66] focus-visible:ring-offset-2 font-primary',
      className
    )}
    {...props}
  />
));
KTabsContent.displayName = 'KTabsContent';

/* ─── KTabs (main component) ────────────────── */
export const KTabs = React.forwardRef<
  React.ElementRef<typeof KTabsRoot>,
  KTabsProps
>(({ items, type = 'pill', centered = false, size = 'md', label, tabBarExtraContent, className, children, ...props }, ref) => {
  const ctx = React.useMemo(() => ({ type, size, centered }), [type, size, centered]);

  return (
    <KTabsContext.Provider value={ctx}>
      <KTabsRoot ref={ref} className={cn('w-full', className)} {...props}>
        {label && (
          <span style={{ display: 'block', fontSize: 14, fontWeight: 400, color: '#5f6064', marginBottom: 4 }}>
            {label} :
          </span>
        )}
        <div className={cn('flex items-center', type === 'line' ? 'mb-0' : 'mb-4')}>
          {items ? (
            <KTabsList>
              {items.map((item) => (
                <KTabsTrigger key={item.key} value={item.key} disabled={item.disabled}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    {item.icon}
                    {item.label}
                  </span>
                </KTabsTrigger>
              ))}
            </KTabsList>
          ) : null}
          {tabBarExtraContent && <div className="ml-auto">{tabBarExtraContent}</div>}
        </div>
        {items
          ? items.map((item) => (
              <KTabsContent key={item.key} value={item.key}>
                {item.children}
              </KTabsContent>
            ))
          : children}
      </KTabsRoot>
    </KTabsContext.Provider>
  );
});

KTabs.displayName = 'KTabs';
export default KTabs;
