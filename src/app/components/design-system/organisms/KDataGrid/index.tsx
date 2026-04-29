import React, { useState, useMemo, useRef } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
  ColumnPinningState,
  ColumnSizingState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { 
  ChevronUp, 
  ChevronDown, 
  Search, 
  Filter, 
  MoreHorizontal,
  ArrowUpDown,
  GripVertical,
  Check,
  Trash2
} from 'lucide-react';
import { cn } from '../../../../../imports/utils';
import { KDataGridProps } from './types';
import { KButton } from '../../atoms/KButton';
import { KCheckbox } from '../../atoms/KCheckbox';
import { KText } from '../../atoms/KText';
import { khorTokens } from '../../../../theme/khor-theme';
import { KPopoverRoot, KPopoverTrigger, KPopoverContent } from '../../molecules/KPopover';
import { KGridFilterPanel } from './subcomponents/KGridFilterPanel';

const t = khorTokens;

const getPinnedStyles = (column: any): React.CSSProperties => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinned = isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinned = isPinned === 'right' && column.getIsFirstColumn('right');

  return {
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: `${column.getSize()}px`,
    zIndex: isPinned ? 2 : 1,
    boxShadow: isLastLeftPinned 
      ? 'inset -4px 0 8px -4px var(--khor-border-default)' 
      : isFirstRightPinned 
        ? 'inset 4px 0 8px -4px var(--khor-border-default)' 
        : undefined,
  };
};

export default function KDataGrid<TData>({
  data,
  columns,
  loading = false,
  title,
  description,
  actions,
  enableColumnResizing = true,
  enableFilters = true,
  enableSorting = true,
  enableRowSelection = true,
  virtualized = false,
  rowHeight = 44,
  size = 'md',
  maxHeight,
  className,
}: KDataGridProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnPinning,
      rowSelection,
      columnVisibility,
    },
    enableColumnResizing,
    enablePinning: true,
    enableMultiSort: true,
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnPinningChange: setColumnPinning,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => rowHeight,
    overscan: 10,
  });

  return (
    <div className={cn(
      "flex flex-col w-full border border-khor-border-default rounded-lg bg-khor-surface-card overflow-hidden shadow-sm",
      className
    )}>
      {/* Header / Toolbar */}
      {(title || description || actions) && (
        <div className="flex items-center justify-between p-4 border-b border-khor-border-default">
          <div className="flex flex-col gap-1">
            {title && <KText variant="h3" className="text-khor-brand-navy">{title}</KText>}
            {description && <KText variant="small" className="text-khor-text-secondary">{description}</KText>}
          </div>
          <div className="flex items-center gap-2">
            {enableFilters && (
              <KPopoverRoot>
                <KPopoverTrigger asChild>
                  <KButton variant="outline" size="sm" icon={<Filter size={14} />}>
                    Filtros {table.getState().columnFilters.length > 0 && `(${table.getState().columnFilters.length})`}
                  </KButton>
                </KPopoverTrigger>
                <KPopoverContent side="bottom" align="end" className="p-0 border-none">
                  <KGridFilterPanel table={table} />
                </KPopoverContent>
              </KPopoverRoot>
            )}
            {actions}
          </div>
        </div>
      )}

      {/* Bulk Actions Bar */}
      {Object.keys(rowSelection).length > 0 && (
        <div className="flex items-center justify-between px-4 py-2 bg-khor-primary text-white animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-3">
            <Check size={16} />
            <KText variant="small" className="text-white font-bold">
              {Object.keys(rowSelection).length} seleccionados
            </KText>
          </div>
          <div className="flex items-center gap-2">
            <KButton 
              size="sm" 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              icon={<Trash2 size={14} />}
              onClick={() => console.log('Bulk Delete', Object.keys(rowSelection))}
            >
              Eliminar
            </KButton>
            <KButton 
              size="sm" 
              variant="ghost" 
              className="text-white hover:bg-white/10"
              onClick={() => setRowSelection({})}
            >
              Cancelar
            </KButton>
          </div>
        </div>
      )}

      {/* Grid Container */}
      <div 
        ref={tableContainerRef}
        className="relative overflow-auto"
        style={{ maxHeight: maxHeight || '600px' }}
      >
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-khor-grid-header-bg">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  const isSorted = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        "relative p-0 text-left border-b border-khor-grid-cell-border",
                        header.column.getIsPinned() && "bg-khor-grid-header-bg z-20"
                      )}
                      style={{ 
                        ...getPinnedStyles(header.column),
                        width: header.getSize() 
                      }}
                    >
                      <div className="flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-khor-grid-header-text">
                        <div 
                          className={cn(
                            "flex-1 flex items-center gap-2 select-none",
                            header.column.getCanSort() && "cursor-pointer"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {isSorted === 'asc' && <ChevronUp size={14} className="text-khor-primary" />}
                          {isSorted === 'desc' && <ChevronDown size={14} className="text-khor-primary" />}
                          {!isSorted && header.column.getCanSort() && <ArrowUpDown size={12} className="opacity-0 group-hover:opacity-50" />}
                        </div>
                        
                        {/* Resizer */}
                        {enableColumnResizing && (
                          <div
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={cn(
                              "absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none hover:bg-khor-grid-resizer-color transition-colors",
                              header.column.getIsResizing() && "bg-khor-grid-resizer-color w-1"
                            )}
                          />
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className="relative">
            {virtualized ? (
              <>
                {/* Space before virtual items */}
                <tr style={{ height: `${rowVirtualizer.getVirtualItems()[0]?.start ?? 0}px` }} />
                {rowVirtualizer.getVirtualItems().map(virtualRow => {
                  const row = rows[virtualRow.index];
                  return (
                    <tr 
                      key={row.id}
                      className="group hover:bg-khor-grid-row-hover transition-colors"
                      style={{ height: `${rowHeight}px` }}
                    >
                      {row.getVisibleCells().map(cell => (
                        <td 
                          key={cell.id}
                          className={cn(
                            "px-4 py-2 border-b border-khor-grid-cell-border text-sm text-khor-text-primary",
                            cell.column.getIsPinned() && "bg-white dark:bg-khor-surface-card z-10"
                          )}
                          style={{ ...getPinnedStyles(cell.column) }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                {/* Space after virtual items */}
                <tr style={{ height: `${rowVirtualizer.getTotalSize() - (rowVirtualizer.getVirtualItems().reverse()[0]?.end ?? 0)}px` }} />
              </>
            ) : (
              rows.map(row => (
                <tr 
                  key={row.id}
                  className="group hover:bg-khor-grid-row-hover transition-colors data-[state=selected]:bg-khor-grid-row-selected"
                  data-state={row.getIsSelected() && "selected"}
                >
                      {row.getVisibleCells().map(cell => (
                        <td 
                          key={cell.id}
                          className={cn(
                            "px-4 py-2 border-b border-khor-grid-cell-border text-sm text-khor-text-primary",
                            cell.column.getIsPinned() && "bg-white dark:bg-khor-surface-card z-10"
                          )}
                          style={{ ...getPinnedStyles(cell.column) }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {loading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center backdrop-blur-[1px] z-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-khor-primary border-t-transparent rounded-full animate-spin" />
              <KText variant="small" className="font-bold text-khor-brand-navy">Cargando datos...</KText>
            </div>
          </div>
        )}

        {!loading && rows.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 px-4">
             <Filter size={48} className="text-khor-neutral-300 mb-4" />
             <KText variant="h4" className="text-khor-text-primary mb-1">No se encontraron resultados</KText>
             <KText variant="small" className="text-khor-text-secondary text-center max-w-xs">
               Intenta ajustar tus filtros o búsqueda para encontrar lo que buscas.
             </KText>
          </div>
        )}
      </div>

      {/* Footer / Info */}
      <div className="flex items-center justify-between px-4 py-3 bg-khor-neutral-50 border-t border-khor-border-default">
        <KText variant="small" className="text-khor-text-secondary">
          Mostrando <span className="font-bold text-khor-text-primary">{rows.length}</span> de <span className="font-bold text-khor-text-primary">{data.length}</span> registros
        </KText>
        <div className="flex items-center gap-1">
          {/* Pagination controls would go here if needed, but Grid often uses infinite scroll */}
        </div>
      </div>
    </div>
  );
}
