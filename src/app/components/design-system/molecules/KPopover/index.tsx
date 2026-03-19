import React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KPopoverProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  align?: 'start' | 'center' | 'end';
}

export function KPopover({ children, content, side = 'bottom', align = 'center' }: KPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {children}
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side={side}
          align={align}
          sideOffset={8}
          style={{
            zIndex: 100,
            backgroundColor: t.colors.neutral[50],
            borderRadius: t.radius.md,
            padding: 12,
            boxShadow: t.shadows.md,
            border: `1px solid ${t.colors.neutral[200]}`,
            fontFamily: font,
            fontSize: 14,
            animationDuration: '200ms',
            animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            maxWidth: 280,
          }}
        >
          {content}
          <Popover.Arrow style={{ fill: t.colors.neutral[200] }} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

export default KPopover;
