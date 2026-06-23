import React, { createContext, useContext, useState } from 'react';
import { Dropdown as AntDropdown, type MenuProps } from 'antd';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

/* ═══════════════════════════════════════════════
   KDropdownMenu — Migrado a Ant Design (antes @radix-ui/react-dropdown-menu)
   • Convenience <KDropdownMenu menu={{items}}> → AntD Dropdown menu nativo.
   • Compound (Root/Trigger/Content/Item/Label/Separator) preservado para
     consumidores como KDashboardLayout, vía context + dropdownRender que
     pinta los items (divs estilizados, sin Radix) dentro del popup de AntD.
   ═══════════════════════════════════════════════ */

type Side = 'top' | 'bottom';
type Align = 'start' | 'center' | 'end';

function sideAlignToPlacement(side: Side = 'bottom', align: Align = 'start'): any {
  const a = align === 'start' ? 'Left' : align === 'end' ? 'Right' : 'Center';
  return side + a;
}

// ─── shared item styles (mirror the former Radix/shadcn classes) ──────────────
const ITEM_CLS =
  'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-khor-surface-hover focus:bg-khor-surface-hover focus:text-khor-neutral-900';
const LABEL_CLS = 'px-2 py-1.5 text-sm font-semibold text-khor-neutral-500';
const SEP_CLS = '-mx-1 my-1 h-px bg-khor-slate-200';
const PANEL_CLS =
  'min-w-[8rem] overflow-hidden rounded-xl border border-khor-slate-200 bg-white p-1 text-khor-neutral-900 shadow-khor-lg font-primary';

// ─── context to close the menu from an item ───────────────────────────────────
const DDCtx = createContext<{ close: () => void }>({ close: () => {} });

// ─── Compound: Root collects Trigger + Content and renders an AntD Dropdown ───
interface KDropdownMenuRootProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

export const KDropdownMenuRoot: React.FC<KDropdownMenuRootProps> = ({ children, open: openProp, defaultOpen, onOpenChange }) => {
  const [openState, setOpenState] = useState(defaultOpen ?? false);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : openState;
  const setOpen = (o: boolean) => {
    if (!isControlled) setOpenState(o);
    onOpenChange?.(o);
  };

  // collect trigger element + content (possibly wrapped in a Portal)
  let triggerNode: React.ReactNode = null;
  let triggerClassName: string | undefined;
  let contentNode: React.ReactNode = null;
  let contentProps: any = {};

  const visit = (nodes: React.ReactNode) => {
    React.Children.forEach(nodes, (child) => {
      if (!React.isValidElement(child)) return;
      if (child.type === KDropdownMenuTrigger) {
        triggerNode = child.props.children;
        triggerClassName = child.props.className;
      } else if (child.type === KDropdownMenuContent) {
        contentNode = child.props.children;
        contentProps = child.props;
      } else if (child.type === KDropdownMenuPortal) {
        visit(child.props.children);
      }
    });
  };
  visit(children);

  return (
    <DDCtx.Provider value={{ close: () => setOpen(false) }}>
      <AntDropdown
        open={open}
        onOpenChange={setOpen}
        trigger={['click']}
        placement={sideAlignToPlacement(contentProps.side, contentProps.align)}
        dropdownRender={() => <div className={cn(PANEL_CLS, contentProps.className)}>{contentNode}</div>}
      >
        <span className={cn('inline-flex', triggerClassName)}>{triggerNode as React.ReactNode}</span>
      </AntDropdown>
    </DDCtx.Provider>
  );
};

// Trigger / Content / Portal are markers introspected by Root (not rendered directly)
export const KDropdownMenuTrigger: React.FC<{ children?: React.ReactNode; className?: string; asChild?: boolean }> = ({ children }) => <>{children}</>;
export const KDropdownMenuContent: React.FC<{ children?: React.ReactNode; className?: string; side?: Side; align?: Align; sideOffset?: number }> = ({ children }) => <>{children}</>;
export const KDropdownMenuPortal: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const KDropdownMenuGroup: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const KDropdownMenuSub: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const KDropdownMenuRadioGroup: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;

export const KDropdownMenuItem: React.FC<{
  children?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  inset?: boolean;
}> = ({ children, className, onClick, disabled, inset }) => {
  const { close } = useContext(DDCtx);
  return (
    <div
      role="menuitem"
      className={cn(ITEM_CLS, inset && 'ps-8', disabled && 'pointer-events-none opacity-50', className)}
      onClick={(e) => {
        if (disabled) return;
        onClick?.(e);
        close();
      }}
    >
      {children}
    </div>
  );
};

export const KDropdownMenuLabel: React.FC<{ children?: React.ReactNode; className?: string; inset?: boolean }> = ({ children, className, inset }) => (
  <div className={cn(LABEL_CLS, inset && 'ps-8', className)}>{children}</div>
);

export const KDropdownMenuSeparator: React.FC<{ className?: string }> = ({ className }) => <div className={cn(SEP_CLS, className)} />;

export const KDropdownMenuSubTrigger: React.FC<{ children?: React.ReactNode; className?: string; inset?: boolean }> = ({ children, className, inset }) => (
  <div className={cn(ITEM_CLS, 'justify-between', inset && 'ps-8', className)}>
    {children}
    <ChevronRight className="ms-auto h-4 w-4" />
  </div>
);
export const KDropdownMenuSubContent: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn(PANEL_CLS, className)}>{children}</div>
);
export const KDropdownMenuCheckboxItem: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn(ITEM_CLS, 'ps-8', className)}>{children}</div>
);

/* ═══════════════════════════════════════════════
   KDropdownMenu — Molécula de conveniencia (AntD Dropdown nativo)
   ═══════════════════════════════════════════════ */
export interface KDropdownMenuProps {
  children: React.ReactElement;
  menu?: {
    items: any[];
    onClick?: (info: { key: string }) => void;
  };
  placement?: 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  arrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const KDropdownMenu = ({
  children,
  menu,
  placement = 'bottomLeft',
  trigger = ['click'],
  arrow = false,
  open,
  defaultOpen,
  onOpenChange,
}: KDropdownMenuProps) => {
  const items: MenuProps['items'] = (menu?.items ?? []).map((item, idx) => {
    if (item.type === 'divider') return { type: 'divider', key: `sep-${idx}` };
    return {
      key: item.key ?? idx,
      label: item.label,
      icon: item.icon,
      danger: item.danger,
      disabled: item.disabled,
    };
  });

  return (
    <AntDropdown
      menu={{ items, onClick: ({ key }) => menu?.onClick?.({ key: String(key) }) }}
      placement={placement}
      trigger={trigger}
      arrow={arrow}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      overlayClassName="font-primary"
    >
      {children}
    </AntDropdown>
  );
};

export default KDropdownMenu;
