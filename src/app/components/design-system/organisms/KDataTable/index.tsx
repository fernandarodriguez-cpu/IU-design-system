/* ─── KDataTable — Figma-aligned (node 6132-115308)
   Border       : #CED4DA  (all borders, outline)
   Header/Footer: bg #F4F4F4
   Row hover    : #F9FAFB | selected: #FEE8E4
   Sort          : double-triangle ▲▼ (gray → red when active)
   Toolbar       : search + filterTrigger + actions — ABOVE the card
   Always renders header (thead #F4F4F4) + footer (pagination bar #F4F4F4)
──────────────────────────────────────────────────────────────────── */
import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  VisibilityState,
  RowSelectionState,
  ExpandedState,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Download, Columns3,
  ChevronRight as ExpandIcon,
  Search, Eye, MoreHorizontal, Star,
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { KCheckbox } from '../../atoms/KCheckbox/index';
import { KSearchInput } from '../../atoms/KSearchInput/index';
import { KButton } from '../../atoms/KButton';
import { KSkeleton } from '../../atoms/KSkeleton';
import { KSwitch } from '../../atoms/KSwitch';
import {
  KDropdownMenuRoot,
  KDropdownMenuTrigger,
  KDropdownMenuContent,
  KDropdownMenuCheckboxItem,
  KDropdownMenuItem,
} from '../../molecules/KDropdownMenu/index';
import { KEmptyState } from '../../molecules/KEmptyState/index';
import { KResult } from '../../molecules/KResult/index';
import { KPagination } from '../KPagination/index';

/* ─── Sort double-triangle icon ─────────────────────────────────── */
function SortIcon({ sorted }: { sorted: 'asc' | 'desc' | false }) {
  return (
    <span
      className="inline-flex flex-col items-center gap-[1px] shrink-0 ml-1 opacity-50 group-hover/th:opacity-100 transition-opacity"
      aria-hidden
    >
      <svg width="7" height="4" viewBox="0 0 7 4">
        <path d="M3.5 0L7 4H0L3.5 0Z" fill={sorted === 'asc' ? '#E04D36' : '#9CA3AF'} />
      </svg>
      <svg width="7" height="4" viewBox="0 0 7 4">
        <path d="M3.5 4L0 0H7L3.5 4Z" fill={sorted === 'desc' ? '#E04D36' : '#9CA3AF'} />
      </svg>
    </span>
  );
}

/* ─── KTableRowStart — first-cell helper ────────────────────────── */
export interface KTableRowStartProps {
  checked?: boolean;
  indeterminate?: boolean;
  onCheck?: (checked: boolean) => void;
  starred?: boolean;
  onStar?: (starred: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function KTableRowStart({
  checked, indeterminate, onCheck,
  starred, onStar,
  disabled, className,
}: KTableRowStartProps) {
  return (
    <div
      className={cn('flex items-center gap-2', className)}
      onClick={e => e.stopPropagation()}
    >
      {onCheck !== undefined && (
        <KCheckbox
          checked={indeterminate ? 'indeterminate' : (checked ?? false)}
          onChange={(e) => onCheck((e.target as HTMLInputElement).checked)}
          disabled={disabled}
        />
      )}
      {onStar !== undefined && (
        <button
          type="button"
          onClick={() => onStar(!starred)}
          disabled={disabled}
          className={cn(
            'p-0.5 rounded transition-colors',
            starred
              ? 'text-[#F59E0B]'
              : 'text-[#D1D5DB] hover:text-[#9CA3AF]',
            disabled && 'opacity-40 pointer-events-none',
          )}
        >
          <Star size={14} fill={starred ? 'currentColor' : 'none'} />
        </button>
      )}
    </div>
  );
}

/* ─── KTableRowActions — last-cell helper ───────────────────────── */
export interface KTableRowActionsMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}

export interface KTableRowActionsProps {
  /** Convenience: toggle switch (active/inactive) */
  active?: boolean;
  onToggle?: (active: boolean) => void;
  /** Convenience: eye/view icon button */
  onView?: () => void;
  /** Convenience: 3-dot dropdown */
  menuItems?: KTableRowActionsMenuItem[];
  disabled?: boolean;
  className?: string;
  /** Fully custom elements rendered after the convenience props */
  children?: React.ReactNode;
}

/** Shared icon-button class — exported so consumers can style custom children consistently */
export const kTableActionIconBtn =
  'inline-flex items-center justify-center w-7 h-7 rounded-md transition-colors text-[#9CA3AF] hover:text-[#374151] hover:bg-[#F3F4F6]';

export function KTableRowActions({
  active, onToggle, onView, menuItems, disabled, className, children,
}: KTableRowActionsProps) {
  const iconBtn = cn(kTableActionIconBtn, disabled && 'pointer-events-none opacity-40');

  return (
    <div
      className={cn('flex items-center gap-1', className)}
      onClick={e => e.stopPropagation()}
    >
      {onToggle !== undefined && (
        <KSwitch size="small" checked={active} disabled={disabled} onCheckedChange={onToggle} />
      )}
      {onView && (
        <button type="button" className={iconBtn} onClick={onView} title="Ver">
          <Eye size={15} />
        </button>
      )}
      {menuItems && menuItems.length > 0 && (
        <KDropdownMenuRoot>
          <KDropdownMenuTrigger asChild>
            <button type="button" className={iconBtn} title="Más acciones">
              <MoreHorizontal size={15} />
            </button>
          </KDropdownMenuTrigger>
          <KDropdownMenuContent align="end" className="w-44">
            {menuItems.map((item, i) => (
              <KDropdownMenuItem
                key={i}
                onClick={item.onClick}
                className={item.danger ? 'text-red-600 focus:text-red-600' : ''}
              >
                {item.icon && <span className="mr-2 opacity-70">{item.icon}</span>}
                {item.label}
              </KDropdownMenuItem>
            ))}
          </KDropdownMenuContent>
        </KDropdownMenuRoot>
      )}
      {children}
    </div>
  );
}

/* ─── KTableCell — multi-segment cell helper (up to 10 segments) ── */
export interface KTableCellProps {
  /**
   * Array of segments to render. Each segment is separated by a full-width
   * divider stroke when divider=true. Accepts 2–10 items.
   * Legacy: pass primary+secondary instead; segments takes precedence when provided.
   */
  segments?: React.ReactNode[];
  /** Legacy: first segment */
  primary?: React.ReactNode;
  /** Legacy: second segment */
  secondary?: React.ReactNode;
  /** Draw full-width #CED4DA strokes between segments */
  divider?: boolean;
  className?: string;
}

const DIVIDER_STYLE: React.CSSProperties = {
  marginLeft:  'calc(-1 * var(--cell-px, 1rem))',
  marginRight: 'calc(-1 * var(--cell-px, 1rem))',
};

export function KTableCell({ segments, primary, secondary, divider = false, className }: KTableCellProps) {
  const items: React.ReactNode[] = segments
    ?? [primary, ...(secondary !== undefined ? [secondary] : [])];

  return (
    <div className={cn('flex flex-col w-full', className)}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          <div className="text-[#374151] text-sm leading-normal py-[3px]">{item}</div>
          {divider && i < items.length - 1 && (
            <div className="h-px bg-[#CED4DA]" style={DIVIDER_STYLE} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─── Props ──────────────────────────────────────────────────────── */
export interface KDataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  loading?: boolean;

  searchable?: boolean;
  searchPlaceholder?: string;
  /** Rendered next to the search input (e.g. a filter panel trigger) */
  filterTrigger?: React.ReactNode;
  /** Extra action buttons at the right of the toolbar */
  actions?: React.ReactNode;

  rowKey?: string | ((row: TData) => string);
  pageSize?: number;
  pageSizes?: number[];
  pagination?: boolean;

  onRowClick?: (record: TData) => void;
  enableRowSelection?: boolean;
  enableColumnToggle?: boolean;
  enableExport?: boolean;

  stickyHeader?: boolean;
  scroll?: { x?: number | string; y?: number | string };
  virtual?: boolean;
  rowExpansion?: {
    expandedRowRender: (record: TData) => React.ReactNode;
    defaultExpandAllRows?: boolean;
  };
  size?: 'small' | 'middle' | 'large';
  onSelectionChange?: (selectedRows: TData[]) => void;
  className?: string;
  isHovered?: boolean;
  isFocused?: boolean;
  hasError?: boolean;
  emptyContent?: React.ReactNode;
  errorContent?: React.ReactNode;
}

/**
 * @figma-mcp-migration
 * Component: KDataTable (node 6132-115308)
 */
export function KDataTable<TData>({
  data,
  columns,
  loading = false,
  searchable = true,
  searchPlaceholder = 'Buscar...',
  filterTrigger,
  actions,
  rowKey,
  pageSize = 10,
  pageSizes = [10, 20, 50, 100],
  pagination = true,
  onRowClick,
  enableRowSelection = false,
  enableColumnToggle = false,
  enableExport = false,
  stickyHeader = false,
  scroll,
  virtual = false,
  rowExpansion,
  size = 'middle',
  onSelectionChange,
  className,
  isHovered,
  isFocused,
  hasError = false,
  emptyContent,
  errorContent,
}: KDataTableProps<TData>) {

  const [globalFilter, setGlobalFilter]         = useState('');
  const [columnFilters, setColumnFilters]       = useState<ColumnFiltersState>([]);
  const [sorting, setSorting]                   = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection]         = useState<RowSelectionState>({});
  const [expanded, setExpanded]                 = useState<ExpandedState>(
    rowExpansion?.defaultExpandAllRows ? true : {}
  );
  const [currentPage, setCurrentPage]           = useState(1);
  const [currentPageSize, setCurrentPageSize]   = useState(pageSize);

  useEffect(() => { setCurrentPageSize(pageSize); setCurrentPage(1); }, [pageSize]);

  // ─── Column injection ───
  const tableColumns = useMemo<ColumnDef<TData, any>[]>(() => {
    const cols = [...columns];

    if (enableRowSelection) {
      cols.unshift({
        id: 'k-selection',
        size: 48,
        header: ({ table }) => (
          <div className="flex justify-center">
            <KCheckbox
              checked={
                table.getIsAllPageRowsSelected()
                  ? true
                  : table.getIsSomePageRowsSelected()
                  ? 'indeterminate'
                  : false
              }
              onChange={(e) =>
                table.toggleAllPageRowsSelected((e.target as HTMLInputElement).checked)
              }
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex justify-center">
            <KCheckbox
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }

    if (rowExpansion) {
      cols.unshift({
        id: 'k-expander',
        size: 40,
        header: () => null,
        cell: ({ row }) => (
          <button
            onClick={(e) => { e.stopPropagation(); row.toggleExpanded(); }}
            className={cn(
              'transition-transform duration-200 p-1 rounded-md hover:bg-[#F3F4F6]',
              row.getIsExpanded() ? 'rotate-90' : '',
            )}
          >
            <ExpandIcon size={16} className="text-[#9CA3AF]" />
          </button>
        ),
      });
    }

    return cols;
  }, [columns, enableRowSelection, rowExpansion]);

  // ─── React Table ───
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      globalFilter,
      columnFilters,
      sorting,
      columnVisibility,
      rowSelection,
      expanded,
      pagination: { pageIndex: currentPage - 1, pageSize: currentPageSize },
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    onRowSelectionChange: (updater) => {
      setRowSelection(updater);
      if (onSelectionChange) {
        setTimeout(() => {
          onSelectionChange(table.getSelectedRowModel().rows.map(r => r.original));
        }, 0);
      }
    },
    onPaginationChange: (updater) => {
      const next = typeof updater === 'function'
        ? updater({ pageIndex: currentPage - 1, pageSize: currentPageSize })
        : updater;
      setCurrentPage(next.pageIndex + 1);
      setCurrentPageSize(next.pageSize);
    },
    getRowId: rowKey
      ? (typeof rowKey === 'string' ? (row: any) => row[rowKey] : rowKey)
      : undefined,
    getCoreRowModel:       getCoreRowModel(),
    getFilteredRowModel:   getFilteredRowModel(),
    getSortedRowModel:     getSortedRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    getExpandedRowModel:   getExpandedRowModel(),
  });

  // ─── Virtualizer ───
  const parentRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (size === 'small' ? 36 : size === 'large' ? 56 : 44),
    overscan: 10,
    measureElement: (el) => el?.getBoundingClientRect().height ?? 0,
    enabled: virtual || !!scroll?.y,
  });

  const virtualRows  = virtualizer.getVirtualItems();
  const totalHeight  = virtualizer.getTotalSize();

  // ─── CSV export ───
  const handleExportCSV = () => {
    const visibleCols = table
      .getVisibleLeafColumns()
      .filter(c => !['k-selection', 'k-expander'].includes(c.id));
    const headers = visibleCols.map(c => String(c.columnDef.header || c.id)).join(',');
    const csvRows = table.getCoreRowModel().rows.map(row =>
      visibleCols.map(c => {
        const s = String(row.getValue(c.id) ?? '');
        return s.includes(',') ? `"${s}"` : s;
      }).join(',')
    );
    const csv  = [headers, ...csvRows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `khor-table-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Size helpers (hardcoded — Tailwind JIT needs literal strings) ───
  const cellPx    = size === 'small'  ? 'px-3 py-2'
                 : size === 'large'  ? 'px-5 py-4'
                 :                    'px-4 py-3';
  const cellPxVar = size === 'small'  ? '0.75rem'
                 : size === 'large'  ? '1.25rem'
                 :                    '1rem';
  const rowH   = size === 'small'  ? 36
               : size === 'large'  ? 56
               :                    44;

  const totalFiltered  = table.getFilteredRowModel().rows.length;
  const hasToolbar     = searchable || filterTrigger || actions || enableColumnToggle || enableExport;

  // ─── Skeleton ───
  const TableSkeleton = () => (
    <>
      {Array.from({ length: currentPageSize }).map((_, i) => (
        <tr key={i} className="border-b border-[#CED4DA]">
          {table.getVisibleLeafColumns().map((_, j) => (
            <td key={j} className={cellPx}>
              <KSkeleton active height={14} width={j === 0 ? '40%' : '80%'} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );

  // ─── Row classes (all literals — no template interpolation) ───
  const normalRowCls = (selected: boolean) =>
    cn(
      'border-b border-[#CED4DA] transition-colors',
      onRowClick ? 'cursor-pointer' : '',
      selected
        ? 'bg-[#FEE8E4]'
        : isHovered
        ? 'bg-[#F9FAFB]'
        : 'hover:bg-[#F9FAFB]',
    );

  return (
    <div className={cn('flex flex-col gap-3 font-primary', className)}>

      {/* ── TOOLBAR (above card) ── */}
      {hasToolbar && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {searchable && (
              <div className={cn(
                'flex items-center w-[264px] rounded-lg border border-[#D1D5DB] bg-white overflow-hidden shrink-0',
                size === 'small' ? 'h-8' : 'h-10',
              )}>
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={globalFilter}
                  onChange={e => { setGlobalFilter(e.target.value); setCurrentPage(1); }}
                  className="flex-1 h-full pl-4 text-sm text-[#374151] placeholder:text-[#9CA3AF] outline-none bg-transparent"
                />
                <div className={cn(
                  'flex items-center justify-center h-full border-l border-[#D1D5DB] shrink-0',
                  size === 'small' ? 'w-9' : 'w-11',
                )}>
                  <Search size={size === 'small' ? 14 : 16} className="text-[#9CA3AF]" />
                </div>
              </div>
            )}
            {filterTrigger}
          </div>
          <div className="flex items-center gap-2">
            {enableExport && (
              <KButton variant="outline" size="sm" icon={<Download size={14} />} onClick={handleExportCSV}>
                Exportar
              </KButton>
            )}
            {enableColumnToggle && (
              <KDropdownMenuRoot>
                <KDropdownMenuTrigger asChild>
                  <KButton variant="outline" size="sm" icon={<Columns3 size={14} />}>Columnas</KButton>
                </KDropdownMenuTrigger>
                <KDropdownMenuContent className="w-48 max-h-64 overflow-auto">
                  {table.getAllLeafColumns()
                    .filter(c => !c.id.startsWith('k-'))
                    .map(col => (
                      <KDropdownMenuCheckboxItem
                        key={col.id}
                        checked={col.getIsVisible()}
                        onCheckedChange={col.toggleVisibility}
                      >
                        {String(col.columnDef.header || col.id)}
                      </KDropdownMenuCheckboxItem>
                    ))}
                </KDropdownMenuContent>
              </KDropdownMenuRoot>
            )}
            {actions}
          </div>
        </div>
      )}

      {/* ── TABLE CARD ── */}
      <div
        className={cn(
          'rounded-lg overflow-hidden border border-[#CED4DA] bg-white',
          size === 'small' ? 'text-xs' : 'text-sm',
          isFocused && 'ring-2 ring-[#E04D36]',
        )}
      >
        {/* Scrollable viewport */}
        <div
          ref={parentRef}
          className="relative w-full overflow-auto"
          style={{ height: scroll?.y ?? 'auto', maxHeight: scroll?.y ? undefined : '70vh' }}
        >
          <table
            className={cn('w-full border-collapse', scroll?.x ? 'min-w-fit' : 'min-w-full')}
            style={{ '--cell-px': cellPxVar } as React.CSSProperties}
          >

            {/* ── HEADER — always bg-[#F4F4F4] ── */}
            <thead
              className={cn(
                'bg-[#F4F4F4] z-20',
                (stickyHeader || scroll?.y || virtual) ? 'sticky top-0' : '',
              )}
            >
              {table.getHeaderGroups().map(hg => (
                <tr key={hg.id} className="border-b border-[#CED4DA]">
                  {hg.headers.map(header => {
                    const sorted  = header.column.getIsSorted() as 'asc' | 'desc' | false;
                    const canSort = header.column.getCanSort();
                    return (
                      <th
                        key={header.id}
                        scope="col"
                        className={cn(
                          cellPx,
                          'text-left text-[#6B7280] font-medium whitespace-nowrap select-none',
                          'group/th',
                          canSort ? 'cursor-pointer hover:text-[#374151]' : '',
                        )}
                        style={{ width: header.getSize() }}
                        onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                      >
                        <div className="flex items-center">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {canSort && <SortIcon sorted={sorted} />}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>

            {/* ── BODY ── */}
            <tbody
              style={{
                height:   (virtual || !!scroll?.y) ? `${totalHeight}px` : 'auto',
                position: 'relative',
              }}
            >
              {hasError ? (
                <tr>
                  <td colSpan={100} className="py-16">
                    {errorContent || (
                      <KResult
                        status="error"
                        title="Error al cargar datos"
                        subTitle="Ocurrió un problema al intentar recuperar la información."
                      />
                    )}
                  </td>
                </tr>
              ) : loading ? (
                <TableSkeleton />
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={100} className="py-16">
                    {emptyContent || (
                      <KEmptyState
                        title="No hay datos"
                        description="No se encontraron resultados para los filtros actuales."
                        icon={<Search className="w-10 h-10 text-[#D1D5DB]" />}
                      />
                    )}
                  </td>
                </tr>
              ) : (virtual || !!scroll?.y) ? (
                // Virtualised rows
                virtualRows.map(vr => {
                  const row = rows[vr.index];
                  return (
                    <tr
                      key={row.id}
                      data-index={vr.index}
                      ref={virtualizer.measureElement}
                      className={cn('absolute left-0 w-full', normalRowCls(row.getIsSelected()))}
                      style={{ transform: `translateY(${vr.start}px)` }}
                      onClick={() => onRowClick?.(row.original)}
                    >
                      <td colSpan={100} className="p-0 border-none">
                        <div className="flex items-center w-full">
                          {row.getVisibleCells().map(cell => {
                            const meta = cell.column.columnDef.meta as any;
                            return (
                              <div
                                key={cell.id}
                                className={cn(
                                  cellPx,
                                  'whitespace-nowrap overflow-hidden text-ellipsis flex items-center text-[#374151]',
                                  meta?.splitCell && 'border-l border-r border-[#CED4DA]',
                                )}
                                style={{ width: cell.column.getSize(), height: rowH }}
                              >
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </div>
                            );
                          })}
                        </div>
                        {row.getIsExpanded() && rowExpansion?.expandedRowRender && (
                          <div className="p-4 border-t border-[#CED4DA] bg-[#F9FAFB] w-full">
                            {rowExpansion.expandedRowRender(row.original)}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                // Normal rows
                rows.map(row => (
                  <React.Fragment key={row.id}>
                    <tr
                      className={normalRowCls(row.getIsSelected())}
                      onClick={() => onRowClick?.(row.original)}
                    >
                      {row.getVisibleCells().map(cell => {
                        const meta = cell.column.columnDef.meta as any;
                        return (
                          <td
                            key={cell.id}
                            className={cn(
                              cellPx, 'align-middle text-[#374151]',
                              meta?.splitCell && 'border-l border-r border-[#CED4DA]',
                            )}
                            style={{ width: cell.column.getSize() }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        );
                      })}
                    </tr>
                    {row.getIsExpanded() && rowExpansion?.expandedRowRender && (
                      <tr className="border-b border-[#CED4DA] bg-[#F9FAFB]">
                        <td colSpan={100} className="p-5">
                          {rowExpansion.expandedRowRender(row.original)}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── FOOTER — always rendered when pagination=true ── */}
        {pagination && (
          <div className="flex items-center justify-end px-4 py-3 border-t border-[#CED4DA] bg-[#F4F4F4]">
            {virtual ? (
              /* virtual mode: all rows are rendered — just show the total count */
              <span className="text-xs text-[#9CA3AF]">
                {totalFiltered.toLocaleString()} registros
              </span>
            ) : (
              <KPagination
                size="small"
                current={currentPage}
                pageSize={currentPageSize}
                total={totalFiltered}
                showTotal
                showSizeChanger
                onChange={(page, ps) => { setCurrentPage(page); setCurrentPageSize(ps); }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default KDataTable;
