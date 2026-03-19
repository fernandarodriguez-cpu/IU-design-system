import React from 'react';

export interface KSpaceProps {
  direction?: 'horizontal' | 'vertical';
  size?: number | 'sm' | 'md' | 'lg';
  wrap?: boolean;
  align?: 'start' | 'center' | 'end' | 'baseline';
  children: React.ReactNode;
  className?: string;
}

export function KSpace({ direction = 'horizontal', size = 'md', wrap, align = 'center', children, className }: KSpaceProps) {
  const gapMap = { sm: 8, md: 16, lg: 24 };
  const gap = typeof size === 'number' ? size : gapMap[size];
  return (
    <div className={className} style={{
      display: 'flex', flexDirection: direction === 'vertical' ? 'column' : 'row',
      gap, flexWrap: wrap ? 'wrap' : undefined, alignItems: align,
    }}>
      {children}
    </div>
  );
}

export default KSpace;
