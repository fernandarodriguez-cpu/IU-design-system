import React from 'react';
import { Popover as AntPopover } from 'antd';
import { cn } from '@/utils/cn';

/* ═══════════════════════════════════════════════
   KPopover — Migrado a Ant Design (antes @radix-ui/react-popover)
   • Convenience <KPopover content title placement> → AntD Popover.
   • Compound (Root/Trigger/Content) preservado para KSelectAdvanced y
     KColorPicker: Root recolecta Trigger+Content y los pinta en un AntD
     Popover, neutralizando el chrome interno para que el panel del
     consumidor (su className) sea el único marco.
   ═══════════════════════════════════════════════ */

type Side = 'top' | 'bottom' | 'left' | 'right';
type Align = 'start' | 'center' | 'end';

function sideAlignToPlacement(side: Side = 'bottom', align: Align = 'center'): any {
  if (align === 'center') return side;
  if (side === 'top' || side === 'bottom') return side + (align === 'start' ? 'Left' : 'Right');
  return side + (align === 'start' ? 'Top' : 'Bottom');
}

// Neutralize AntD's popover inner so the consumer's content panel is the only chrome
const NEUTRAL_INNER =
  '[&_.ant-popover-inner]:!p-0 [&_.ant-popover-inner]:!bg-transparent [&_.ant-popover-inner]:!shadow-none';

// ─── Compound primitives ──────────────────────────────────────────────────────
interface KPopoverRootProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}

export const KPopoverRoot: React.FC<KPopoverRootProps> = ({ children, open, defaultOpen, onOpenChange }) => {
  let triggerNode: React.ReactNode = null;
  let triggerClassName: string | undefined;
  let contentNode: React.ReactNode = null;
  let contentProps: any = {};

  const visit = (nodes: React.ReactNode) => {
    React.Children.forEach(nodes, (child) => {
      if (!React.isValidElement(child)) return;
      if (child.type === KPopoverTrigger) {
        triggerNode = child.props.children;
        triggerClassName = child.props.className;
      } else if (child.type === KPopoverContent) {
        contentNode = child.props.children;
        contentProps = child.props;
      } else if (child.type === KPopoverPortal) {
        visit(child.props.children);
      }
    });
  };
  visit(children);

  return (
    <AntPopover
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      trigger="click"
      arrow={false}
      placement={sideAlignToPlacement(contentProps.side, contentProps.align)}
      rootClassName={NEUTRAL_INNER}
      content={
        <div className={cn('font-primary', contentProps.className)} style={contentProps.style}>
          {contentNode}
        </div>
      }
    >
      <span className={cn('inline-flex', triggerClassName)}>{triggerNode as React.ReactNode}</span>
    </AntPopover>
  );
};

// Markers introspected by Root (not rendered directly)
export const KPopoverTrigger: React.FC<{ children?: React.ReactNode; className?: string; asChild?: boolean }> = ({ children }) => <>{children}</>;
export const KPopoverContent: React.FC<{ children?: React.ReactNode; className?: string; side?: Side; align?: Align; sideOffset?: number; style?: React.CSSProperties }> = ({ children }) => <>{children}</>;
export const KPopoverAnchor: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const KPopoverPortal: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;

/* ═══════════════════════════════════════════════
   KPopover — Molécula de conveniencia
   ═══════════════════════════════════════════════ */
export interface KPopoverProps {
  children: React.ReactElement;
  content?: React.ReactNode;
  title?: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom';
  trigger?: 'hover' | 'focus' | 'click';
  arrow?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const KPopover = ({
  children,
  content,
  title,
  placement = 'top',
  trigger = 'click',
  arrow = true,
  open,
  defaultOpen,
  onOpenChange,
}: KPopoverProps) => {
  return (
    <AntPopover
      placement={placement}
      trigger={trigger}
      arrow={arrow}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      overlayClassName="font-primary [&_.ant-popover-inner]:!rounded-xl [&_.ant-popover-inner]:max-w-72"
      title={title ? <div className="font-bold text-sm">{title}</div> : undefined}
      content={<div className="text-sm text-khor-neutral-600">{content}</div>}
    >
      {children}
    </AntPopover>
  );
};

export default KPopover;
