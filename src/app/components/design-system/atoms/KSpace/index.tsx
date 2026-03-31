import React from 'react';
import { cn } from '../../../../../imports/utils';

export type KSpaceSize = 'sm' | 'md' | 'lg' | number;
export type KSpaceAlign = 'start' | 'end' | 'center' | 'baseline';

export interface KSpaceProps {
  direction?: 'horizontal' | 'vertical';
  size?: KSpaceSize | [KSpaceSize, KSpaceSize];
  align?: KSpaceAlign;
  wrap?: boolean;
  split?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const sizeMap: Record<string, string> = {
  sm: "8px",
  md: "16px",
  lg: "24px",
};

/**
 * KSpace — Utilidad de espaciado (Headless v4)
 * Reemplaza AntD Space con una estructura pura de flexbox y Tailwind.
 */
export function KSpace({
  direction = 'horizontal',
  size = 'md',
  align,
  wrap = false,
  split,
  className,
  style,
  children,
}: KSpaceProps) {
  
  const getGap = (s: KSpaceSize) => (typeof s === 'number' ? `${s}px` : sizeMap[s] || sizeMap.md);

  const customStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    flexWrap: wrap ? 'wrap' : 'nowrap',
    gap: Array.isArray(size) ? `${getGap(size[0])} ${getGap(size[1])}` : getGap(size),
    alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align,
    ...style,
  };

  const items = React.Children.toArray(children).filter(Boolean);

  return (
    <div className={cn("font-primary", className)} style={customStyle}>
      {items.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {split && index < items.length - 1 && (
            <span className="shrink-0 opacity-20 border-l border-[var(--khor-neutral-300)] self-stretch mx-1" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default KSpace;
