import React from 'react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

export interface KButtonGroupProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function KButtonGroup({ children, className }: KButtonGroupProps) {
  return (
    <div className={className} style={{
      display: 'inline-flex', borderRadius: t.radius.md, overflow: 'hidden',
      border: `1px solid ${t.colors.neutral[200]}`,
    }}>
      {React.Children.map(children, (child, i) => (
        <div key={i} style={{ borderLeft: i > 0 ? `1px solid ${t.colors.neutral[200]}` : 'none' }}>
          {child}
        </div>
      ))}
    </div>
  );
}

export default KButtonGroup;
