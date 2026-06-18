import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';

/* ─── Figma tokens: KPagination (187678-32777) ────────────────
   Small  : borderless page numbers, active = navy border only
   Default: all buttons bordered, active = navy filled
   Large  : like default, 40px height
   Disabled: all gray, no interaction
──────────────────────────────────────────────────────────────── */

export interface KPaginationProps {
  current?: number;
  pageSize?: number;
  total: number;
  onChange?: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  showTotal?: boolean;
  size?: 'small' | 'default' | 'large';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

const SIZES = {
  small:   { h: 28, w: 28, fs: 13, iconSz: 12, gap: 2,  totalFs: 12 },
  default: { h: 32, w: 32, fs: 14, iconSz: 14, gap: 4,  totalFs: 13 },
  large:   { h: 40, w: 40, fs: 15, iconSz: 16, gap: 4,  totalFs: 14 },
};

export function KPagination({
  current = 1,
  pageSize = 10,
  total,
  onChange,
  showSizeChanger = false,
  showTotal = false,
  size = 'default',
  disabled = false,
  className,
  style,
}: KPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const s = SIZES[size];
  const isSmall = size === 'small';

  const rangeStart = (current - 1) * pageSize + 1;
  const rangeEnd   = Math.min(current * pageSize, total);

  const go = (page: number) => {
    if (disabled || page < 1 || page > totalPages || page === current) return;
    onChange?.(page, pageSize);
  };

  const changeSize = (newSize: number) => {
    if (disabled) return;
    const newTotal = Math.max(1, Math.ceil(total / newSize));
    onChange?.(Math.min(current, newTotal), newSize);
  };

  /* ── Page list ── */
  const buildPages = (): (number | 'el' | 'er')[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const arr: (number | 'el' | 'er')[] = [1];
    if (current > 3) arr.push('el');
    const lo = Math.max(2, current - 1);
    const hi = Math.min(totalPages - 1, current + 1);
    for (let i = lo; i <= hi; i++) arr.push(i);
    if (current < totalPages - 2) arr.push('er');
    arr.push(totalPages);
    return arr;
  };

  /* ── Styles ── */
  const pageBtn = (isActive: boolean): React.CSSProperties => {
    if (isSmall) {
      return {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: s.w, height: s.h, borderRadius: 6, fontSize: s.fs,
        fontWeight: isActive ? 600 : 400, fontFamily: 'inherit',
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: isActive
          ? `1px solid ${disabled ? '#b0b0b0' : '#e04d36'}`
          : 'none',
        backgroundColor: 'transparent',
        color: isActive
          ? disabled ? '#b0b0b0' : '#e04d36'
          : disabled ? '#b0b0b0' : '#374151',
        transition: 'color 0.12s',
        outline: 'none',
      };
    }
    return {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: s.w, height: s.h, borderRadius: 6, fontSize: s.fs,
      fontWeight: isActive ? 600 : 400, fontFamily: 'inherit',
      cursor: disabled ? 'not-allowed' : 'pointer',
      border: `1px solid ${isActive ? (disabled ? '#b0b0b0' : '#e04d36') : (disabled ? '#e5e7eb' : '#d1d5db')}`,
      backgroundColor: isActive
        ? disabled ? '#d1d5db' : '#e04d36'
        : disabled ? '#f5f5f5' : '#ffffff',
      color: isActive
        ? '#ffffff'
        : disabled ? '#b0b0b0' : '#374151',
      transition: 'all 0.12s',
      outline: 'none',
    };
  };

  const navBtn = (atEdge: boolean): React.CSSProperties => {
    if (isSmall) {
      return {
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: s.w, height: s.h, border: 'none', borderRadius: 6,
        backgroundColor: 'transparent', fontFamily: 'inherit',
        cursor: disabled || atEdge ? 'not-allowed' : 'pointer',
        color: disabled || atEdge ? '#d1d5db' : '#374151',
        outline: 'none', padding: 0,
      };
    }
    return {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: s.w, height: s.h, borderRadius: 6, fontFamily: 'inherit',
      border: `1px solid ${disabled || atEdge ? '#e5e7eb' : '#d1d5db'}`,
      backgroundColor: disabled || atEdge ? '#f5f5f5' : '#ffffff',
      color: disabled || atEdge ? '#d1d5db' : '#374151',
      cursor: disabled || atEdge ? 'not-allowed' : 'pointer',
      transition: 'all 0.12s', outline: 'none', padding: 0,
    };
  };

  const ellipsisStyle: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: s.w, height: s.h, color: disabled ? '#d1d5db' : '#9ca3af',
  };

  if (total === 0) return null;

  return (
    <div
      className={cn('select-none font-primary', disabled && 'pointer-events-none', className)}
      style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', ...style }}
    >
      {/* Total */}
      {showTotal && (
        <span style={{
          fontSize: s.totalFs, color: disabled ? '#b0b0b0' : '#5f6064',
          whiteSpace: 'nowrap', fontFamily: 'inherit',
        }}>
          {rangeStart}–{rangeEnd} de {total.toLocaleString()}
        </span>
      )}

      {/* Prev */}
      <button type="button" disabled={disabled || current === 1}
        onClick={() => go(current - 1)} style={navBtn(current === 1)}>
        <ChevronLeft size={s.iconSz} />
      </button>

      {/* Pages */}
      <div style={{ display: 'flex', alignItems: 'center', gap: s.gap }}>
        {buildPages().map((page, idx) => {
          if (page === 'el' || page === 'er') {
            return (
              <span key={`${page}-${idx}`} style={ellipsisStyle}>
                <MoreHorizontal size={s.iconSz} />
              </span>
            );
          }
          return (
            <button key={page} type="button" disabled={disabled}
              onClick={() => go(page as number)} style={pageBtn(current === page)}>
              {page}
            </button>
          );
        })}
      </div>

      {/* Next */}
      <button type="button" disabled={disabled || current === totalPages}
        onClick={() => go(current + 1)} style={navBtn(current === totalPages)}>
        <ChevronRight size={s.iconSz} />
      </button>

      {/* Size changer */}
      {showSizeChanger && (
        <select
          disabled={disabled}
          value={pageSize}
          onChange={(e) => changeSize(Number(e.target.value))}
          style={{
            height: s.h, paddingLeft: 8, paddingRight: 4,
            borderRadius: 6,
            border: `1px solid ${disabled ? '#e5e7eb' : '#d1d5db'}`,
            backgroundColor: disabled ? '#f5f5f5' : '#ffffff',
            color: disabled ? '#b0b0b0' : '#374151',
            fontSize: s.totalFs, fontFamily: 'inherit',
            cursor: disabled ? 'not-allowed' : 'pointer',
            outline: 'none',
          }}
        >
          {PAGE_SIZE_OPTIONS.map(n => (
            <option key={n} value={n}>{n}/ page</option>
          ))}
        </select>
      )}
    </div>
  );
}

export default KPagination;
