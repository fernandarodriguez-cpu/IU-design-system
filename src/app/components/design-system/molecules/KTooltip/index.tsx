import React from 'react';
import { Tooltip as AntTooltip, type TooltipProps as AntTooltipProps } from 'antd';

/* ═══════════════════════════════════════════════
   KTooltip — Migrado a Ant Design (antes @radix-ui/react-tooltip)
   Tematizado por el bridge global (khorAntdTheme.ts). Conserva la
   API pública: KTooltip (title/content/placement/trigger/color/open…)
   + los exports compuestos (Provider/Root/Trigger/Content) como shims
   de compatibilidad — ningún consumidor los usa directamente.
   ═══════════════════════════════════════════════ */

export interface KTooltipProps
  extends Omit<AntTooltipProps, 'title' | 'placement' | 'trigger' | 'color'> {
  title?: React.ReactNode;
  content?: React.ReactNode;
  children: React.ReactElement;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'focus' | 'click';
  color?: string;
}

export const KTooltip = ({
  title,
  content,
  children,
  placement = 'top',
  trigger = 'hover',
  color,
  ...props
}: KTooltipProps) => {
  const displayContent = title ?? content;
  if (!displayContent) return children;

  return (
    <AntTooltip
      title={displayContent}
      placement={placement}
      trigger={trigger}
      // Default to the Khor tooltip background so the look matches; `color` overrides.
      color={color ?? 'var(--khor-tooltip-bg)'}
      overlayClassName="font-primary [&_.ant-tooltip-inner]:text-xs [&_.ant-tooltip-inner]:rounded-md"
      {...props}
    >
      {children}
    </AntTooltip>
  );
};

/* ─── Compatibility shims for the former Radix compound primitives ───
   Kept so the public export surface is unchanged. AntD's Tooltip needs
   no Provider and isn't composed of Root/Trigger/Content, so these are
   light passthroughs. Prefer <KTooltip title=…> directly. */
export const KTooltipProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const KTooltipRoot: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const KTooltipTrigger: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;
export const KTooltipContent: React.FC<{ children?: React.ReactNode }> = ({ children }) => <>{children}</>;

export default KTooltip;
