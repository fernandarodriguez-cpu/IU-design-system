import React from 'react';
import { Popover as AntPopover } from 'antd';

/* ═══════════════════════════════════════════════
   KHoverCard — Migrado a Ant Design (antes @radix-ui/react-hover-card)
   Implementado sobre AntD Popover con trigger="hover". Conserva la API
   pública (children/content/align/side/sideOffset/arrow/openDelay/closeDelay)
   + los exports compuestos como shims de compatibilidad.
   ═══════════════════════════════════════════════ */

type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'start' | 'center' | 'end';

// side + align → AntD placement
function toPlacement(side: Side, align: Align): string {
  if (align === 'center') return side;
  if (side === 'top' || side === 'bottom') return side + (align === 'start' ? 'Left' : 'Right');
  return side + (align === 'start' ? 'Top' : 'Bottom');
}

export interface KHoverCardProps {
  children: React.ReactNode;
  content: React.ReactNode;
  align?: Align;
  side?: Side;
  sideOffset?: number;
  arrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  openDelay?: number;
  closeDelay?: number;
}

export const KHoverCard = ({
  children,
  content,
  align = 'center',
  side = 'top',
  arrow = false,
  open,
  defaultOpen,
  onOpenChange,
  openDelay = 300,
  closeDelay = 200,
}: KHoverCardProps) => {
  return (
    <AntPopover
      content={content}
      trigger="hover"
      placement={toPlacement(side, align) as any}
      arrow={arrow}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      mouseEnterDelay={openDelay / 1000}
      mouseLeaveDelay={closeDelay / 1000}
      overlayClassName="font-primary [&_.ant-popover-inner]:rounded-xl [&_.ant-popover-inner]:!p-4 [&_.ant-popover-inner]:max-w-72"
    >
      {children}
    </AntPopover>
  );
};

/* ─── Compatibility shims for the former Radix compound primitives ───
   Kept so the public export surface is unchanged; none are used directly. */
export const KHoverCardRoot: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const KHoverCardTrigger: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const KHoverCardPortal: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const KHoverCardContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;

export default KHoverCard;
