import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

/* ─── Figma tokens: TabsBar Empresa (188128-3297) ──
   Pestaña active:   bg #0c1a66  text #ffffff  fw 700  fs 12
   Pestaña inactive: bg #e9e9e9  border #d3d3d3  text #666666  fw 400  fs 12
   Tab item:         w=86  h=31  borderRadius=[8,8,0,0] (top rounded only)
   Arrow button:     bg #051758  r=2  w=16  h=31
────────────────────────────────────────────────── */

export interface KTabsEmpresaItem {
  key: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface KTabsEmpresaProps {
  items: KTabsEmpresaItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (key: string) => void;
  /** Force show left arrow regardless of scroll position */
  showLeftArrow?: boolean;
  /** Force show right arrow regardless of scroll position */
  showRightArrow?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const TAB_W = 86;
const TAB_H = 31;
const ARROW_W = 16;
const SCROLL_STEP = TAB_W * 3;

export const KTabsEmpresa: React.FC<KTabsEmpresaProps> = ({
  items,
  value,
  defaultValue,
  onChange,
  showLeftArrow  = false,
  showRightArrow = false,
  className,
  style,
}) => {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.key ?? '');
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = value ?? internal;

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(checkScroll);
    ro.observe(el);
    return () => ro.disconnect();
  }, [checkScroll, items]);

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * SCROLL_STEP, behavior: 'smooth' });
  };

  const handleClick = (key: string) => {
    if (!value) setInternal(key);
    onChange?.(key);
  };

  return (
    <div
      className={cn('inline-flex items-center', className)}
      style={{ height: TAB_H, ...style }}
    >
      {(canLeft || showLeftArrow) && (
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollBy(-1)}
          style={{
            flexShrink: 0,
            width: ARROW_W,
            height: TAB_H,
            backgroundColor: '#051758',
            border: 'none',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#ffffff',
            padding: 0,
          }}
        >
          <ChevronLeft size={12} strokeWidth={2.5} />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        style={{
          display: 'flex',
          overflow: 'hidden',
          scrollBehavior: 'smooth',
        }}
      >
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              type="button"
              disabled={item.disabled}
              onClick={() => !item.disabled && handleClick(item.key)}
              style={{
                flexShrink: 0,
                width: TAB_W,
                height: TAB_H,
                backgroundColor: isActive ? '#0c1a66' : '#e9e9e9',
                border: isActive ? 'none' : '1px solid #d3d3d3',
                borderRadius: '8px 8px 0 0',
                color: isActive ? '#ffffff' : '#666666',
                fontSize: 12,
                fontWeight: isActive ? 700 : 400,
                cursor: item.disabled ? 'not-allowed' : 'pointer',
                opacity: item.disabled ? 0.4 : 1,
                padding: '0 8px',
                transition: 'background-color 0.15s, color 0.15s',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontFamily: 'inherit',
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {(canRight || showRightArrow) && (
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollBy(1)}
          style={{
            flexShrink: 0,
            width: ARROW_W,
            height: TAB_H,
            backgroundColor: '#051758',
            border: 'none',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#ffffff',
            padding: 0,
          }}
        >
          <ChevronRight size={12} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};

KTabsEmpresa.displayName = 'KTabsEmpresa';
export default KTabsEmpresa;
