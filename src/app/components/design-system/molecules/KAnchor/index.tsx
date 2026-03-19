import React, { useState, useEffect } from 'react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KAnchor — Navegación interna (Wave 3)
   ═══════════════════════════════════════════════ */
export interface KAnchorLink { key: string; title: string; href: string; children?: KAnchorLink[]; }

export interface KAnchorProps {
  items: KAnchorLink[];
  offsetTop?: number;
  className?: string;
}

export function KAnchor({ items, offsetTop = 0, className }: KAnchorProps) {
  const [activeKey, setActiveKey] = useState(items[0]?.key || '');

  useEffect(() => {
    const handleScroll = () => {
      for (const item of [...items].reverse()) {
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offsetTop + 20) { setActiveKey(item.key); return; }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, offsetTop]);

  const handleClick = (href: string, key: string) => {
    const el = document.querySelector(href);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); setActiveKey(key); }
  };

  return (
    <nav className={className} style={{ fontFamily: font, borderLeft: `2px solid ${t.colors.neutral[200]}`, paddingLeft: 12 }}>
      {items.map((item) => (
        <div key={item.key}>
          <button onClick={() => handleClick(item.href, item.key)} style={{
            display: 'block', padding: '6px 0', border: 'none', background: 'none',
            fontFamily: font, fontSize: 13, cursor: 'pointer', textAlign: 'left',
            color: activeKey === item.key ? t.colors.brand.primary : t.colors.neutral[400],
            fontWeight: activeKey === item.key ? 600 : 400, transition: 'color 0.15s',
          }}>
            {item.title}
          </button>
          {item.children?.map((child) => (
            <button key={child.key} onClick={() => handleClick(child.href, child.key)} style={{
              display: 'block', padding: '4px 0 4px 16px', border: 'none', background: 'none',
              fontFamily: font, fontSize: 12, cursor: 'pointer', textAlign: 'left',
              color: activeKey === child.key ? t.colors.brand.primary : t.colors.neutral[300],
            }}>
              {child.title}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}

export default KAnchor;
