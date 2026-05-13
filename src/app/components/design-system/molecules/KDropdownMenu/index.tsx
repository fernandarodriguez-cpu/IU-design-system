import React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export const KDropdownMenuRoot = DropdownMenuPrimitive.Root;
export const KDropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const KDropdownMenuGroup = DropdownMenuPrimitive.Group;
export const KDropdownMenuPortal = DropdownMenuPrimitive.Portal;
export const KDropdownMenuSub = DropdownMenuPrimitive.Sub;
export const KDropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export const KDropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-khor-surface-hover data-[state=open]:bg-khor-surface-hover font-primary text-khor-neutral-900",
      inset && "ps-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ms-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));
KDropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

export const KDropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-khor-surface-page p-1 text-khor-neutral-900 shadow-lg font-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
KDropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

export const KDropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-xl border border-khor-slate-200 bg-white p-1 text-khor-neutral-900 shadow-khor-lg animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 font-primary",
        className
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));
KDropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

export const KDropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-khor-surface-hover focus:text-khor-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "ps-8",
      className
    )}
    {...props}
  />
));
KDropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export const KDropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-khor-neutral-500",
      inset && "ps-8",
      className
    )}
    {...props}
  />
));
KDropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

export const KDropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-khor-slate-200", className)}
    {...props}
  />
));
KDropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export const KDropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 ps-8 pe-2 text-sm outline-none transition-colors focus:bg-khor-surface-hover focus:text-khor-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute start-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <div className="w-2 h-2 bg-khor-primary rounded-sm" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
));
KDropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;

/* ═══════════════════════════════════════════════
   KDropdownMenu — Molécula de conveniencia
   ═══════════════════════════════════════════════ */

export interface KDropdownMenuProps extends DropdownMenuPrimitive.DropdownMenuProps {
  children: React.ReactElement;
  menu?: {
    items: any[];
    onClick?: (info: { key: string }) => void;
  };
  placement?: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  arrow?: boolean;
}

export const KDropdownMenu = ({ 
  children, 
  menu, 
  placement = 'bottomLeft',
  trigger = ['click'],
  arrow = false,
  ...props 
}: KDropdownMenuProps) => {
  const side = placement.startsWith('top') ? 'top' : 'bottom';
  const align = placement.endsWith('Left') ? 'start' : placement.endsWith('Right') ? 'end' : 'center';

  return (
    <KDropdownMenuRoot {...props}>
      <KDropdownMenuTrigger asChild>
        {children}
      </KDropdownMenuTrigger>
      <KDropdownMenuPortal>
        <KDropdownMenuContent side={side} align={align} sideOffset={arrow ? 10 : 4}>
          {menu?.items.map((item, idx) => {
            if (item.type === 'divider') {
              return <KDropdownMenuSeparator key={`sep-${idx}`} />;
            }
            return (
              <KDropdownMenuItem 
                key={item.key || idx} 
                onClick={() => menu.onClick?.({ key: item.key })}
                className={item.danger ? "text-red-600 focus:bg-khor-error-light focus:text-red-700" : ""}
                disabled={item.disabled}
              >
                {item.icon && <span className="me-2">{item.icon}</span>}
                {item.label}
              </KDropdownMenuItem>
            );
          })}
        </KDropdownMenuContent>
      </KDropdownMenuPortal>
    </KDropdownMenuRoot>
  );
};

export default KDropdownMenu;
