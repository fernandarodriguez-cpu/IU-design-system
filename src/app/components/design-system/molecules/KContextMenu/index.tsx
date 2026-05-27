import React from 'react';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import { ChevronRight, Check, Circle } from 'lucide-react';
import { cn } from '@/utils/cn';

/* ═══════════════════════════════════════════════
   KContextMenu — Primitivas (Radix UI + Tailwind)
   ═══════════════════════════════════════════════ */

/**
 * @figma-mcp-migration
 * Component: KContextMenuRoot
 * 
 * INSTRUCCIONES PARA AGENTES DE IA (VS Code / MCP):
 * Para migrar este componente a Figma, utilizar Figma Component Properties V2:
 * 1. Variants: Estilos estructurales y alineación.
 * 2. Color Variables: Fondos, bordes y sombras enlazados a tokens Khor v6.0.
 */
export const KContextMenuRoot = ContextMenuPrimitive.Root;
export const KContextMenuTrigger = ContextMenuPrimitive.Trigger;
export const KContextMenuGroup = ContextMenuPrimitive.Group;
export const KContextMenuPortal = ContextMenuPrimitive.Portal;
export const KContextMenuSub = ContextMenuPrimitive.Sub;
export const KContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

export const KContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-lg px-3 py-2 text-sm outline-none focus:bg-khor-surface-hover focus:text-khor-neutral-900 data-[state=open]:bg-khor-surface-hover data-[state=open]:text-khor-neutral-900 font-primary text-khor-neutral-800",
      inset && "ps-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ms-auto h-4 w-4 text-khor-neutral-400 group-data-[state=open]:text-khor-neutral-600" />
  </ContextMenuPrimitive.SubTrigger>
));
KContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

export const KContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-xl border border-khor-slate-200 bg-white/95 backdrop-blur-md p-1 text-khor-neutral-900 shadow-khor-lg font-primary data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
));
KContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

export const KContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-xl border border-khor-slate-200 bg-white/95 backdrop-blur-md p-1.5 text-khor-neutral-900 shadow-khor-lg animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 font-primary",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
KContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

export const KContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-colors focus:bg-khor-surface-hover focus:text-khor-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-khor-neutral-700 font-primary",
      inset && "ps-8",
      className
    )}
    {...props}
  />
));
KContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

export const KContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-3 py-1.5 text-xs font-semibold text-khor-neutral-500 tracking-wide select-none font-primary",
      inset && "ps-8",
      className
    )}
    {...props}
  />
));
KContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

export const KContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1.5 my-1.5 h-px bg-khor-slate-100", className)}
    {...props}
  />
));
KContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

export const KContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-lg py-2 ps-9 pe-3 text-sm outline-none transition-colors focus:bg-khor-surface-hover focus:text-khor-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-khor-neutral-700 font-primary",
      className
    )}
    {...props}
  >
    <span className="absolute start-3 flex h-3.5 w-3.5 items-center justify-center text-khor-primary">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
KContextMenuCheckboxItem.displayName = ContextMenuPrimitive.CheckboxItem.displayName;

export const KContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-lg py-2 ps-9 pe-3 text-sm outline-none transition-colors focus:bg-khor-surface-hover focus:text-khor-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-khor-neutral-700 font-primary",
      className
    )}
    {...props}
  >
    <span className="absolute start-3.5 flex h-2 w-2 items-center justify-center text-khor-primary">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
KContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

/* ═══════════════════════════════════════════════
   KContextMenu — Molécula de conveniencia
   ═══════════════════════════════════════════════ */

export interface KContextMenuItemDef {
  key: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  type?: 'item' | 'divider' | 'label';
  children?: KContextMenuItemDef[];
}

export interface KContextMenuProps {
  children: React.ReactElement;
  items: KContextMenuItemDef[];
  onClick?: (key: string) => void;
}

const renderMenuItems = (items: KContextMenuItemDef[], onClick?: (key: string) => void) => {
  return items.map((item, index) => {
    if (item.type === 'divider') {
      return <KContextMenuSeparator key={`sep-${index}`} />;
    }
    if (item.type === 'label') {
      return <KContextMenuLabel key={`label-${item.key}`}>{item.label}</KContextMenuLabel>;
    }
    
    if (item.children && item.children.length > 0) {
      return (
        <KContextMenuSub key={`sub-${item.key}`}>
          <KContextMenuSubTrigger>
            <div className="flex items-center gap-2">
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              <span>{item.label}</span>
            </div>
          </KContextMenuSubTrigger>
          <KContextMenuSubContent className="w-48">
            {renderMenuItems(item.children, onClick)}
          </KContextMenuSubContent>
        </KContextMenuSub>
      );
    }

    return (
      <KContextMenuItem
        key={item.key}
        disabled={item.disabled}
        onClick={() => onClick?.(item.key)}
        className={cn(
          item.danger && "text-khor-error focus:bg-khor-error/10 focus:text-khor-error"
        )}
      >
        <div className="flex items-center gap-2">
          {item.icon && <span className="shrink-0 text-khor-neutral-500 group-hover:text-current">{item.icon}</span>}
          <span>{item.label}</span>
        </div>
        {item.shortcut && (
          <span className="ms-auto text-xs text-khor-neutral-400 font-mono tracking-widest pl-4">
            {item.shortcut}
          </span>
        )}
      </KContextMenuItem>
    );
  });
};

export const KContextMenu = ({
  children,
  items,
  onClick,
}: KContextMenuProps) => {
  return (
    <KContextMenuRoot>
      <KContextMenuTrigger asChild>
        {children}
      </KContextMenuTrigger>
      <KContextMenuContent>
        {renderMenuItems(items, onClick)}
      </KContextMenuContent>
    </KContextMenuRoot>
  );
};

export default KContextMenu;
