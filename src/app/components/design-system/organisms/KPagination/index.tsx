import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '../../../../../imports/utils';

export interface KPaginationProps {
  current?: number;
  pageSize?: number;
  total: number;
  onChange?: (page: number, pageSize: number) => void;
  showSizeChanger?: boolean;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

/**
 * KPagination — Control de paginación (Headless v4)
 * Reemplaza AntD Pagination con una lógica de navegación pura y Tailwind.
 */
export function KPagination({
  current = 1,
  pageSize = 10,
  total,
  onChange,
  className,
  style,
  disabled
}: KPaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  const handlePageChange = (page: number) => {
    if (disabled || page < 1 || page > totalPages) return;
    onChange?.(page, pageSize);
  };

  const renderPageButtons = () => {
    const pages = [];
    const showThreshold = 5;

    if (totalPages <= showThreshold) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Lógica de truncado simple
      pages.push(1);
      if (current > 3) pages.push('prev-ellipsis');
      
      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);
      
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (current < totalPages - 2) pages.push('next-ellipsis');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (typeof page === 'string') {
        return (
          <span key={page + index} className="w-8 h-8 flex items-center justify-center text-[var(--khor-neutral-400)]">
            <MoreHorizontal className="w-4 h-4" />
          </span>
        );
      }

      const isActive = current === page;
      return (
        <button
          key={page}
          disabled={disabled}
          onClick={() => handlePageChange(page)}
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold transition-all",
            isActive 
              ? "bg-[var(--khor-primary)] text-white shadow-md shadow-[var(--khor-primary-light)]/50" 
              : "text-[var(--khor-neutral-600)] hover:bg-[var(--khor-neutral-100)] hover:text-[var(--khor-primary)]",
            disabled && "cursor-not-allowed opacity-50 grayscale"
          )}
        >
          {page}
        </button>
      );
    });
  };

  if (total === 0) return null;

  return (
    <div 
      className={cn("flex items-center gap-1 font-primary select-none", disabled && "pointer-events-none", className)} 
      style={style}
    >
      <button
        type="button"
        disabled={disabled || current === 1}
        onClick={() => handlePageChange(current - 1)}
        className={cn(
          "w-8 h-8 flex items-center justify-center rounded-md border border-[var(--khor-neutral-200)] transition-colors",
          current === 1 ? "text-[var(--khor-neutral-300)] bg-[var(--khor-neutral-50)]" : "text-[var(--khor-neutral-600)] hover:border-[var(--khor-primary)] hover:text-[var(--khor-primary)] active:bg-[var(--khor-neutral-100)]"
        )}
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-1">
        {renderPageButtons()}
      </div>

      <button
        type="button"
        disabled={disabled || current === totalPages}
        onClick={() => handlePageChange(current + 1)}
        className={cn(
          "w-8 h-8 flex items-center justify-center rounded-md border border-[var(--khor-neutral-200)] transition-colors",
          current === totalPages ? "text-[var(--khor-neutral-300)] bg-[var(--khor-neutral-50)]" : "text-[var(--khor-neutral-600)] hover:border-[var(--khor-primary)] hover:text-[var(--khor-primary)] active:bg-[var(--khor-neutral-100)]"
        )}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

export default KPagination;
