import React from 'react';
import { Dropdown as AntDropdown, type MenuProps } from 'antd';
import { cn } from '@/utils/cn';

/* ═══════════════════════════════════════════════
   KContextMenu — Migrado a Ant Design (antes @radix-ui/react-context-menu)
   Implementado sobre AntD Dropdown con trigger=['contextMenu'] + menu items.
   Conserva la API pública (children/items/onClick) y los exports compuestos
   como shims de compatibilidad (ningún consumidor los usa directamente).
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

// KContextMenuItemDef[] → AntD MenuProps['items']
function toAntItems(items: KContextMenuItemDef[]): MenuProps['items'] {
  return items.map((item, index) => {
    if (item.type === 'divider') return { type: 'divider', key: item.key || `sep-${index}` };
    if (item.type === 'label') return { type: 'group', key: item.key || `label-${index}`, label: item.label };

    const label = item.shortcut ? (
      <span className="flex items-center justify-between gap-6">
        <span>{item.label}</span>
        <span className="text-xs text-khor-neutral-400 font-mono tracking-widest">{item.shortcut}</span>
      </span>
    ) : (
      item.label
    );

    return {
      key: item.key,
      label,
      icon: item.icon,
      danger: item.danger,
      disabled: item.disabled,
      ...(item.children && item.children.length > 0 ? { children: toAntItems(item.children) } : {}),
    };
  });
}

export const KContextMenu = ({ children, items, onClick }: KContextMenuProps) => {
  return (
    <AntDropdown
      trigger={['contextMenu']}
      menu={{ items: toAntItems(items), onClick: ({ key }) => onClick?.(key) }}
      overlayClassName="font-primary"
    >
      {children}
    </AntDropdown>
  );
};

/* ─── Compatibility shims for the former Radix compound primitives ───
   Public export surface preserved; none are used directly. Prefer the
   <KContextMenu items=…> convenience API. */
const Passthrough: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children }) => <>{children}</>;
export const KContextMenuRoot = Passthrough;
export const KContextMenuTrigger = Passthrough;
export const KContextMenuGroup = Passthrough;
export const KContextMenuPortal = Passthrough;
export const KContextMenuSub = Passthrough;
export const KContextMenuRadioGroup = Passthrough;
export const KContextMenuSubTrigger = Passthrough;
export const KContextMenuSubContent = Passthrough;
export const KContextMenuContent = Passthrough;
export const KContextMenuItem: React.FC<{ children?: React.ReactNode; className?: string; onClick?: () => void; disabled?: boolean }> = ({ children }) => <>{children}</>;
export const KContextMenuLabel = Passthrough;
export const KContextMenuSeparator: React.FC = () => <div className={cn('-mx-1.5 my-1.5 h-px bg-khor-slate-100')} />;
export const KContextMenuCheckboxItem = Passthrough;
export const KContextMenuRadioItem = Passthrough;

export default KContextMenu;
