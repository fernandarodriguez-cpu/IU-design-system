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
  Download, Columns3, ChevronUp, ChevronDown, ChevronLeft, 
  ChevronRight, ChevronsLeft, ChevronsRight, Filter, ChevronRight as ExpandIcon,
  Search, X
} from 'lucide-react';
import { cn } from '../../../../../imports/utils';
import { KCheckbox } from '../../atoms/KCheckbox/index';
import { KSearchInput } from '../../atoms/KSearchInput/index';
import { KButton } from '../../atoms/KButton';
import { KSkeleton } from '../../atoms/KSkeleton';
import { 
  KDropdownMenuRoot,
  KDropdownMenuTrigger, 
  KDropdownMenuContent, 
  KDropdownMenuLabel, 
  KDropdownMenuSeparator, 
  KDropdownMenuCheckboxItem 
} from '../../molecules/KDropdownMenu/index';
import { KSelectAdvanced, KSelectAdvancedOption } from '../../molecules/KSelectAdvanced/index';
import { KPopoverRoot, KPopoverTrigger, KPopoverContent } from '../../molecules/KPopover/index';
import { KEmptyState } from '../../molecules/KEmptyState/index';
import { KResult } from '../../molecules/KResult/index';

/* ─── Types ──────────────────────────────────────── */
export interface KDataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  loading?: boolean;
  
  // Features
  searchable?: boolean;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
  
  // Layout & Pagination
  rowKey?: string | ((row: TData) => string);
  pageSize?: number;
  pageSizes?: number[];
  pagination?: boolean;
  
  // Interactions
  onRowClick?: (record: TData) => void;
  enableRowSelection?: boolean;
  enableColumnToggle?: boolean;
  enableExport?: boolean;
  
  // Advanced Features (Wave 11)
  stickyHeader?: boolean;
  maxHeight?: string | number;
  scroll?: { x?: number | string; y?: number | string };
  virtual?: boolean;
  rowExpansion?: {
    expandedRowRender: (record: TData) => React.ReactNode;
    defaultExpandAllRows?: boolean;
  };
  size?: 'small' | 'middle' | 'large';
  onSelectionChange?: (selectedRows: TData[]) => void;
  className?: string;
  /** Fuerza el estado hover (útil para previews/playgrounds) */
  isHovered?: boolean;
  /** Fuerza el estado de foco (útil para previews/playgrounds) */
  isFocused?: boolean;
  /** Activa el estado de error de la tabla */
  hasError?: boolean;
  /** Contenido personalizado para el estado vacío. Por defecto usa KEmptyState. */
  emptyContent?: React.ReactNode;
  /** Contenido personalizado para el estado de error. Por defecto usa KResult. */
  errorContent?: React.ReactNode;
}

export function KDataTable<TData>({
  data,
  columns,
  loading = false,
  searchable = true,
  searchPlaceholder = 'Buscar...',
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
  
  // ─── Table States ───
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [expanded, setExpanded] = useState<ExpandedState>(
    rowExpansion?.defaultExpandAllRows ? true : {}
  );

  // ─── Columns Enrichment ───
  const tableColumns = useMemo<ColumnDef<TData, any>[]>(() => {
    const cols = [...columns];
    
    // Inyectar Columna de Selección
    if (enableRowSelection) {
      cols.unshift({
        id: 'k-selection',
        size: 50,
        header: ({ table }) => (
          <div className="flex justify-center">
            <KCheckbox
              checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? 'indeterminate' : false}
              onChange={(e) => table.toggleAllPageRowsSelected((e.target as HTMLInputElement).checked)}
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

    // Inyectar Columna de Expansión
    if (rowExpansion) {
      cols.unshift({
        id: 'k-expander',
        size: 40,
        header: () => null,
        cell: ({ row }) => (
          <button
            onClick={(e) => { e.stopPropagation(); row.toggleExpanded(); }}
            className={cn(
              "transition-transform duration-200 p-1 rounded-md hover:bg-neutral-100",
              row.getIsExpanded() ? "rotate-90" : ""
            )}
          >
            <ExpandIcon size={16} className="text-khor-neutral-400" />
          </button>
        ),
      });
    }

    return cols;
  }, [columns, enableRowSelection, rowExpansion]);

  // ─── React Table Core ───
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
    getRowId: rowKey ? (typeof rowKey === 'string' ? (row: any) => row[rowKey] : rowKey) : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: pagination ? getPaginationRowModel() : undefined,
    getExpandedRowModel: getExpandedRowModel(),
  });

  // ─── Virtualization Logic ───
  const parentRef = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();
  
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => (size === 'small' ? 32 : size === 'large' ? 60 : 44),
    overscan: 10,
    measureElement: (el) => el?.getBoundingClientRect().height ?? 0,
    enabled: virtual || !!scroll?.y,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();

  // ─── Auxiliary ───
  const handleExportCSV = () => {
    const visibleCols = table.getVisibleLeafColumns().filter(c => !['k-selection', 'k-expander'].includes(c.id));
    const headers = visibleCols.map(c => String(c.columnDef.header || c.id)).join(',');
    const csvRows = table.getCoreRowModel().rows.map(row =>
      visibleCols.map(c => {
        const val = row.getValue(c.id);
        const strVal = String(val ?? '');
        return strVal.includes(',') ? `"${strVal}"` : strVal;
      }).join(',')
    );
    const csv = [headers, ...csvRows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url;
    a.download = `khor-table-${new Date().getTime()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  /* ─── Components Locales ─── */
  const TableSkeleton = () => (
    <>
      {Array.from({ length: pageSize || 5 }).map((_, i) => (
        <tr key={i} className="border-b transition-colors">
          {table.getVisibleLeafColumns().map((col, j) => (
            <td key={j} className="px-[var(--khor-density-spacing-md)] py-[var(--khor-density-spacing-sm)]">
              <KSkeleton active height={16} width={j === 0 ? "40%" : "80%"} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );

  const FilterPopover = ({ column }: { column: any }) => {
    const isFiltered = column.getIsFiltered();
    return (
      <KPopoverRoot>
        <KPopoverTrigger asChild>
          <button 
            className={cn(
               "p-1 rounded transition-colors hover:bg-neutral-200",
               isFiltered ? "text-khor-primary" : "text-khor-neutral-300"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <Filter size={13} fill={isFiltered ? "currentColor" : "none"} />
          </button>
        </KPopoverTrigger>
        <KPopoverContent className="p-3 w-48 shadow-xl border">
          <KSearchInput 
            size="sm" 
            placeholder="Filtrar..." 
            value={(column.getFilterValue() as string) ?? ''}
            onChange={(val) => column.setFilterValue(val)}
            autoFocus
          />
          <div className="flex justify-between mt-3 pt-2 border-t">
            <button className="text-xs text-khor-neutral-400 hover:text-khor-primary" onClick={() => column.setFilterValue(undefined)}>Limpiar</button>
            <button className="text-xs font-bold text-khor-primary">OK</button>
          </div>
        </KPopoverContent>
      </KPopoverRoot>
    );
  };

  return (
    <div className={cn(
      "flex flex-col rounded-xl overflow-hidden border bg-white shadow-khor-md font-primary",
      size === 'small' ? "text-xs" : "text-sm",
      className
    )}>
      {/* TOOLBAR */}
      {(searchable || actions || enableColumnToggle || enableExport) && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 border-b bg-khor-neutral-50/50">
          <div className="flex-1 min-w-[200px]">
            {searchable && (
              <KSearchInput 
                placeholder={searchPlaceholder} 
                value={globalFilter} 
                onChange={(e: any) => setGlobalFilter(e.target.value)} 
                className="max-w-xs"
                size={size === 'small' ? 'sm' : 'md'}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            {enableExport && (
               <KButton variant="outline" size="sm" icon={<Download size={14} />} onClick={handleExportCSV}>Exportar</KButton>
            )}
            {enableColumnToggle && (
              <KDropdownMenuRoot>
                <KDropdownMenuTrigger asChild><KButton variant="outline" size="sm" icon={<Columns3 size={14} />}>Columnas</KButton></KDropdownMenuTrigger>
                <KDropdownMenuContent className="w-48 max-h-64 overflow-auto">
                    {table.getAllLeafColumns().filter(c => !c.id.startsWith('k-')).map(col => (
                      <KDropdownMenuCheckboxItem key={col.id} checked={col.getIsVisible()} onCheckedChange={col.toggleVisibility}>
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

      {/* TABLE VIEWPORT */}
      <div 
        ref={parentRef}
        className="relative w-full overflow-auto"
        style={{ height: scroll?.y ?? 'auto', maxHeight: scroll?.y ? undefined : '70vh' }}
      >
        <table className={cn("w-full border-collapse", scroll?.x ? "min-w-fit" : "min-w-full")}>
          <thead className={cn(
            "text-khor-text-secondary font-bold bg-khor-surface-page shadow-sm z-20 border-b transition-colors",
            (stickyHeader || scroll?.y || virtual) ? "sticky top-0" : "",
            isFocused && "ring-2 ring-khor-primary ring-inset"
          )}>
            {table.getHeaderGroups().map(hg => (
              <tr key={hg.id}>
                {hg.headers.map(header => (
                  <th 
                    key={header.id}
                    scope="col"
                    className="px-[var(--khor-density-spacing-md)] py-[var(--khor-density-spacing-sm)] border-b text-left transition-colors"
                    style={{ width: header.getSize() }}
                  >
                    <div className="flex items-center justify-between gap-2 group/th">
                      <div 
                         role={header.column.getCanSort() ? "button" : undefined}
                         aria-label={header.column.getCanSort() ? `Sort by ${header.id}` : undefined}
                         className={cn("flex items-center gap-1.5 flex-1", header.column.getCanSort() ? "cursor-pointer hover:text-khor-primary" : "")}
                         onClick={header.column.getToggleSortingHandler()}
                      >
                         {flexRender(header.column.columnDef.header, header.getContext())}
                         {{
                           asc: <ChevronUp size={14} className="text-khor-primary" />,
                           desc: <ChevronDown size={14} className="text-khor-primary" />
                         }[header.column.getIsSorted() as string] ?? (
                           header.column.getCanSort() && <ChevronDown size={14} className="opacity-0 group-hover/th:opacity-30 transition-opacity" />
                         )}
                      </div>
                      {header.column.getCanFilter() && <FilterPopover column={header.column} />}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody style={{ height: (virtual || !!scroll?.y) ? `${totalHeight}px` : 'auto', position: 'relative' }}>
            {hasError ? (
              <tr>
                <td colSpan={100} className="py-12">
                  {errorContent || (
                    <KResult 
                      status="error" 
                      title="Error al cargar datos" 
                      subTitle="Ocurrió un problema al intentar recuperar la información. Por favor, intenta de nuevo."
                    />
                  )}
                </td>
              </tr>
            ) : loading ? (
              <TableSkeleton />
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={100} className="py-12">
                  {emptyContent || (
                    <KEmptyState 
                      title="No hay datos" 
                      description="No se encontraron resultados para los filtros actuales."
                      icon={<Search className="w-12 h-12 text-khor-text-tertiary opacity-50" />}
                    />
                  )}
                </td>
              </tr>
            ) : (virtual || !!scroll?.y) ? (
              // Virtualized Rows
              virtualRows.map(virtualRow => {
                const row = rows[virtualRow.index];
                return (
                  <tr 
                    key={row.id}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    className={cn(
                        "absolute left-0 w-full transition-colors border-b",
                        "hover:bg-khor-surface-hover",
                        row.getIsSelected() ? "bg-khor-surface-selected" : "",
                        isHovered && "bg-khor-surface-hover"
                    )}
                    style={{ transform: `translateY(${virtualRow.start}px)` }}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    <td colSpan={100} className="p-0 border-none">
                      <div className="flex items-center w-full">
                        {row.getVisibleCells().map(cell => (
                          <div 
                            key={cell.id} 
                            className="px-[var(--khor-density-spacing-md)] py-[var(--khor-density-spacing-sm)] whitespace-nowrap overflow-hidden text-ellipsis flex items-center" 
                            style={{ 
                              width: cell.column.getSize(),
                              height: size === 'small' ? 'var(--khor-density-height-sm)' : size === 'large' ? 'var(--khor-density-height-lg)' : 'var(--khor-density-height-md)' 
                            }}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </div>
                        ))}
                      </div>
                      
                      {row.getIsExpanded() && rowExpansion?.expandedRowRender && (
                        <div className="p-4 bg-khor-surface-subtle border-t w-full">
                           {rowExpansion.expandedRowRender(row.original)}
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              // Normal Rows
              rows.map(row => (
                <React.Fragment key={row.id}>
                  <tr 
                    className={cn(
                      "transition-colors border-b",
                      "hover:bg-khor-surface-hover",
                      onRowClick ? "cursor-pointer" : "",
                      row.getIsSelected() ? "bg-khor-surface-selected" : "",
                      isHovered && "bg-khor-surface-hover"
                    )}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id} className="px-[var(--khor-density-spacing-md)] py-[var(--khor-density-spacing-sm)] align-middle" style={{ width: cell.column.getSize() }}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                  {row.getIsExpanded() && rowExpansion?.expandedRowRender && (
                    <tr className="bg-khor-surface-subtle border-b">
                      <td colSpan={100} className="p-6">
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

      {/* PAGINATION */}
      {pagination && !virtual && (
        <div className="flex items-center justify-between p-3 border-t bg-khor-surface-page">
          <div className="text-xs text-khor-text-tertiary font-medium">
             {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} filas seleccionadas
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <span className="text-xs text-khor-text-tertiary">Filas:</span>
                <KSelectAdvanced 
                  className="!min-h-[var(--khor-density-height-sm)] w-20 text-xs"
                  options={pageSizes.map(ps => ({ label: String(ps), value: String(ps) }))}
                  value={String(table.getState().pagination.pageSize)}
                  onChange={val => table.setPageSize(Number(val))}
                />
             </div>
             <div className="flex items-center gap-1">
                <KButton variant="outline" size="sm" shape="circle" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><ChevronLeft size={16}/></KButton>
                <div className="px-3 text-xs font-bold text-khor-text-secondary">
                   {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </div>
                <KButton variant="outline" size="sm" shape="circle" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><ChevronRight size={16}/></KButton>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default KDataTable;
