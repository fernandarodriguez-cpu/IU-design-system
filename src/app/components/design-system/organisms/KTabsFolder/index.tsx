import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/utils/cn';

/* ─── Figma tokens: TabsBar / Folder (188128-3297) ──────────
   Active:   bg #0c1a66  text #ffffff  fw 700
   Inactive: bg #e9e9e9  border #d3d3d3  text #666666  fw 400
   Tab:      borderRadius [8,8,0,0] (top corners only)
   Arrow:    transparent bg, #0c1a66 icon, 2px gap from tabs

   Sizes (md = Figma exact):
     sm  h=25  tabW=80  fs=11
     md  h=31  tabW=86  fs=12
     lg  h=38  tabW=96  fs=13
──────────────────────────────────────────────────────────── */

export interface KTabsFolderItem {
  key:       string;
  label:     React.ReactNode;
  icon?:     React.ReactNode;
  badge?:    React.ReactNode;
  disabled?: boolean;
}

export interface KTabsFolderProps {
  items:           KTabsFolderItem[];
  value?:          string;
  defaultValue?:   string;
  onChange?:       (key: string) => void;
  size?:           'sm' | 'md' | 'lg';
  /** 'left' | 'right' — shows item.icon on that side of the label */
  iconSide?:       'left' | 'right';
  /** Force-show left scroll arrow (for previews / demos) */
  showLeftArrow?:  boolean;
  /** Force-show right scroll arrow (for previews / demos) */
  showRightArrow?: boolean;
  /** Label shown above the tab bar */
  label?:          string;
  className?:      string;
  style?:          React.CSSProperties;
}

const SIZES = {
  sm: { h: 25, tabW: 80,  fs: 11, arrowSz: 12, arrowBox: 20 },
  md: { h: 31, tabW: 86,  fs: 12, arrowSz: 14, arrowBox: 24 },
  lg: { h: 38, tabW: 96,  fs: 13, arrowSz: 16, arrowBox: 28 },
};

const SCROLL_STEP = 3;

export const KTabsFolder: React.FC<KTabsFolderProps> = ({
  items,
  value,
  defaultValue,
  onChange,
  size           = 'md',
  iconSide,
  showLeftArrow  = false,
  showRightArrow = false,
  label,
  className,
  style,
}) => {
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.key ?? '');
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [hoverL,   setHoverL]   = useState(false);
  const [hoverR,   setHoverR]   = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = value ?? internal;
  const s      = SIZES[size];

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

  const doScroll = (dir: 1 | -1) =>
    scrollRef.current?.scrollBy({ left: dir * s.tabW * SCROLL_STEP, behavior: 'smooth' });

  const handleClick = (key: string) => {
    if (!value) setInternal(key);
    onChange?.(key);
  };

  const showLeft  = canLeft  || showLeftArrow;
  const showRight = canRight || showRightArrow;

  const arrowStyle = (hovered: boolean): React.CSSProperties => ({
    flexShrink: 0,
    width:  s.arrowBox,
    height: s.h,
    background: hovered ? '#e9e9e9' : 'transparent',
    border: 'none',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#0c1a66',
    padding: 0,
    transition: 'background 0.12s',
  });

  return (
    <div className={className} style={style}>
      {label && (
        <span style={{ display: 'block', fontSize: 14, fontWeight: 400, color: '#5f6064', marginBottom: 4 }}>
          {label} :
        </span>
      )}
      <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: s.h, gap: 2 }}>
        {showLeft && (
          <button
            type="button"
            aria-label="Desplazar izquierda"
            onClick={() => doScroll(-1)}
            onMouseEnter={() => setHoverL(true)}
            onMouseLeave={() => setHoverL(false)}
            style={arrowStyle(hoverL)}
          >
            <ChevronLeft size={s.arrowSz} strokeWidth={2} />
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={checkScroll}
          style={{ flex: '0 1 auto', minWidth: 0, display: 'flex', overflow: 'hidden' }}
        >
          {items.map((item) => {
            const isActive = item.key === active;
            const gap = s.fs - 4;
            return (
              <button
                key={item.key}
                type="button"
                disabled={item.disabled}
                onClick={() => !item.disabled && handleClick(item.key)}
                style={{
                  flexShrink: 0,
                  width:  s.tabW,
                  height: s.h,
                  backgroundColor: isActive ? '#0c1a66' : '#e9e9e9',
                  border: isActive ? 'none' : '1px solid #d3d3d3',
                  borderRadius: '8px 8px 0 0',
                  color: isActive ? '#ffffff' : '#666666',
                  fontSize: s.fs,
                  fontWeight: isActive ? 700 : 400,
                  fontFamily: 'inherit',
                  cursor: item.disabled ? 'not-allowed' : 'pointer',
                  opacity: item.disabled ? 0.4 : 1,
                  padding: `0 ${gap + 2}px`,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  boxSizing: 'border-box',
                  transition: 'background-color 0.15s, color 0.15s',
                }}
              >
                {iconSide === 'left'  && item.icon && (
                  <span style={{ display: 'inline-flex', flexShrink: 0 }}>{item.icon}</span>
                )}
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>
                  {item.label}
                </span>
                {item.badge !== undefined && (
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 16,
                    height: 16,
                    borderRadius: 100,
                    backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : '#c0c0c0',
                    color: isActive ? '#ffffff' : '#444444',
                    fontSize: 10,
                    fontWeight: 600,
                    padding: '0 3px',
                    flexShrink: 0,
                  }}>
                    {item.badge}
                  </span>
                )}
                {iconSide === 'right' && item.icon && (
                  <span style={{ display: 'inline-flex', flexShrink: 0 }}>{item.icon}</span>
                )}
              </button>
            );
          })}
        </div>

        {showRight && (
          <button
            type="button"
            aria-label="Desplazar derecha"
            onClick={() => doScroll(1)}
            onMouseEnter={() => setHoverR(true)}
            onMouseLeave={() => setHoverR(false)}
            style={arrowStyle(hoverR)}
          >
            <ChevronRight size={s.arrowSz} strokeWidth={2} />
          </button>
        )}
      </div>
    </div>
  );
};

KTabsFolder.displayName = 'KTabsFolder';
export default KTabsFolder;
