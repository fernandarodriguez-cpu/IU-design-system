import React from 'react';
import { Affix as AntAffix, type AffixProps as AntAffixProps } from 'antd';
import { cn } from '@/utils/cn';

/* ─── KAffix ───────────────────────────────────────────────────
   New Khor atom wrapping Ant Design's Affix. Pins its children to
   the viewport (or a scroll container via `target`) once they would
   scroll past the given offset. Themed by the global bridge
   (khorAntdTheme.ts); this wrapper just maps the Khor public API and
   keeps the Montserrat font via `font-primary`.
──────────────────────────────────────────────────────────────── */

export interface KAffixProps
  extends Omit<AntAffixProps, 'offsetTop' | 'offsetBottom' | 'target' | 'onChange'> {
  /** Pin distance from the top of the viewport / target (px). */
  offsetTop?: number;
  /** Pin distance from the bottom of the viewport / target (px). */
  offsetBottom?: number;
  /** Scroll container the affix is measured against. */
  target?: () => HTMLElement | Window | Document | null;
  /** Fires when the affixed state changes. */
  onChange?: (affixed?: boolean) => void;
  children?: React.ReactNode;
}

export const KAffix = React.forwardRef<HTMLDivElement, KAffixProps>(function KAffix(
  { className, offsetTop, offsetBottom, target, onChange, children, ...rest },
  ref,
) {
  return (
    <AntAffix
      ref={ref as any}
      offsetTop={offsetTop}
      offsetBottom={offsetBottom}
      target={target}
      onChange={onChange}
      className={cn('font-primary', className)}
      {...rest}
    >
      {children}
    </AntAffix>
  );
});

KAffix.displayName = 'KAffix';
export default KAffix;
