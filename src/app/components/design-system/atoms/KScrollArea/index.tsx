import React from 'react';
import { cn } from '@/utils/cn';

/* ─── KScrollArea ───────────────────────────────────────────────
   Migrated off @radix-ui/react-scroll-area. Ant Design has no
   ScrollArea primitive, so this uses a native overflow container
   with the Khor thin-scrollbar treatment (slate-300 thumb → primary
   on hover) implemented via webkit/Firefox scrollbar styling.
──────────────────────────────────────────────────────────────── */

export interface KScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal' | 'both';
}

const ORIENTATION_OVERFLOW: Record<string, string> = {
  vertical: 'overflow-y-auto overflow-x-hidden',
  horizontal: 'overflow-x-auto overflow-y-hidden',
  both: 'overflow-auto',
};

// Khor thin scrollbar (≈10px track, rounded slate-300 thumb, primary on hover)
const SCROLLBAR_CLASSES = cn(
  '[scrollbar-width:thin] [scrollbar-color:var(--khor-slate-300)_transparent]',
  '[&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar]:h-2.5',
  '[&::-webkit-scrollbar-track]:bg-transparent',
  '[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-khor-slate-300',
  'hover:[&::-webkit-scrollbar-thumb]:bg-khor-primary/80',
);

export const KScrollArea = React.forwardRef<HTMLDivElement, KScrollAreaProps>(
  ({ className, children, orientation = 'vertical', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative rounded-[inherit]', ORIENTATION_OVERFLOW[orientation], SCROLLBAR_CLASSES, className)}
      {...props}
    >
      {children}
    </div>
  ),
);
KScrollArea.displayName = 'KScrollArea';

export default KScrollArea;
