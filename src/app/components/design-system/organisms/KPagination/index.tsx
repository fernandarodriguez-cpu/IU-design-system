import React from 'react';
import { Pagination as AntPagination } from 'antd';
import { cn } from '@/utils/cn';

/* ─── KPagination — Migrado a Ant Design ─────────────────────────
   Wrapper sobre AntD Pagination, tematizado por el bridge global
   (item activo = navy primary). API pública conservada. */

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

export function KPagination({
  current,
  pageSize,
  total,
  onChange,
  showSizeChanger = false,
  showTotal = false,
  size = 'default',
  disabled,
  className,
  style,
}: KPaginationProps) {
  return (
    <AntPagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={(page, ps) => onChange?.(page, ps)}
      showSizeChanger={showSizeChanger}
      pageSizeOptions={PAGE_SIZE_OPTIONS}
      showTotal={showTotal ? (t, range) => `${range[0]}-${range[1]} de ${t}` : undefined}
      // AntD only has small/default — map large → default
      size={size === 'small' ? 'small' : 'default'}
      disabled={disabled}
      className={cn('font-primary', className)}
      style={style}
    />
  );
}

export default KPagination;
