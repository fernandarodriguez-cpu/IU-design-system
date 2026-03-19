import React from 'react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KList — Lista genérica (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KListItem { key: string; title: React.ReactNode; description?: React.ReactNode; avatar?: React.ReactNode; extra?: React.ReactNode; }

export interface KListProps {
  items: KListItem[];
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export function KList({ items, bordered, size = 'md', header, footer, loading, className }: KListProps) {
  const paddings = { sm: '8px 12px', md: '12px 16px', lg: '16px 20px' };
  return (
    <div className={className} style={{
      border: bordered ? `1px solid ${t.colors.neutral[200]}` : 'none',
      borderRadius: bordered ? t.radius.lg : 0, fontFamily: font, overflow: 'hidden',
    }}>
      {header && <div style={{ padding: paddings[size], borderBottom: `1px solid ${t.colors.neutral[200]}`, fontWeight: 600, fontSize: 14, color: t.colors.neutral[900] }}>{header}</div>}
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ padding: paddings[size], borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
            <div className="animate-pulse" style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: t.colors.neutral[200] }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 14, width: '60%', borderRadius: 4, backgroundColor: t.colors.neutral[200], marginBottom: 8 }} />
                <div style={{ height: 12, width: '40%', borderRadius: 4, backgroundColor: t.colors.neutral[200] }} />
              </div>
            </div>
          </div>
        ))
      ) : items.map((item) => (
        <div key={item.key} style={{
          padding: paddings[size], borderBottom: `1px solid ${t.colors.neutral[200]}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          {item.avatar}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, color: t.colors.neutral[900] }}>{item.title}</div>
            {item.description && <div style={{ fontSize: 13, color: t.colors.neutral[400], marginTop: 2 }}>{item.description}</div>}
          </div>
          {item.extra}
        </div>
      ))}
      {footer && <div style={{ padding: paddings[size], borderTop: `1px solid ${t.colors.neutral[200]}`, fontSize: 13, color: t.colors.neutral[400] }}>{footer}</div>}
    </div>
  );
}

export default KList;
