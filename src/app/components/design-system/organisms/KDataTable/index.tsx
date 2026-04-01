import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  VisibilityState,
  RowSelectionState,
} from '@tanstack/react-table';
import { Download, Columns3, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';
import { KCheckbox } from '../../atoms/KCheckbox/index';
import { KSearchInput } from '../../atoms/KSearchInput/index';
import { 
  KDropdownMenuRoot,
  KDropdownMenuTrigger, 
  KDropdownMenuContent, 
  KDropdownMenuLabel, 
  KDropdownMenuSeparator, 
  KDropdownMenuCheckboxItem 
} from '../../molecules/KDropdownMenu/index';

/* ─── Types ──────────────────────────────────────── */
export interface KDataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  loading?: boolean;
  
  // Features (Opcionales)
  searchable?: boolean;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
  
  // Layout & Pagination
  rowKey?: string | ((row: TData) => string);
  pageSize?: number;
  pageSizes?: number[];
  
  // Interactions
  onRowClick?: (record: TData) => void;
  enableRowSelection?: boolean;
  enableColumnToggle?: boolean;
  enableExport?: boolean;
  
  // UI Flags
  stickyHeader?: boolean;
  maxHeight?: string | number;
  onSelectionChange?: (selectedRows: TData[]) => void;
  className?: string;
}

export function KDataTable<TData>({
  data,
  columns,
  loading = false,
  searchable = true,
  searchPlaceholder = 'Buscar en tabla...',
  actions,
  rowKey,
  pageSize = 10,
  pageSizes = [10, 20, 50],
  onRowClick,
  enableRowSelection = false,
  enableColumnToggle = false,
  enableExport = false,
  stickyHeader = false,
  maxHeight,
  onSelectionChange,
  className,
}: KDataTableProps<TData>) {
  // ─── Table States ───
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // ─── Columns Enrichment ───
  // Si tenemos enableRowSelection encendido, inyectamos una columna fake al inicio
  const tableColumns = useMemo<ColumnDef<TData, any>[]>(() => {
    const cols = [...columns];
    if (enableRowSelection) {
      cols.unshift({
        id: 'k-selection',
        header: ({ table }) => (
          <KCheckbox
            checked={table.getIsAllPageRowsSelected() ? true : table.getIsSomePageRowsSelected() ? 'indeterminate' : false}
            onChange={(e) => table.toggleAllPageRowsSelected((e.target as HTMLInputElement).checked)}
            aria-label="Seleccionar todos"
          />
        ),
        cell: ({ row }) => (
          <KCheckbox
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            aria-label="Seleccionar fila"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }
    return cols;
  }, [columns, enableRowSelection]);

  // ─── Hooks de TanStack ───
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      globalFilter,
      sorting,
      columnVisibility,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      setRowSelection(updater);
      // Notificar onSelectionChange
      if (onSelectionChange) {
        // En Tanstack updater puede ser func o value.
        // Simulamos un delay chiquito o obtenemos la proxima state
        setTimeout(() => {
          const rows = table.getSelectedRowModel().rows.map(r => r.original);
          onSelectionChange(rows);
        }, 0);
      }
    },
    getRowId: rowKey ? (typeof rowKey === 'string' ? (row: any) => row[rowKey] : rowKey) : undefined,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Ajuste inicial de paginado
  React.useEffect(() => {
    table.setPageSize(pageSize);
  }, [pageSize, table]);

  // ─── Acciones aux ───
  const handleExportCSV = () => {
    const visibleCols = table.getVisibleLeafColumns().filter(c => c.id !== 'k-selection');
    const headers = visibleCols.map(c => c.columnDef.header as string).join(',');
    const rows = table.getFilteredRowModel().rows.map(row =>
      visibleCols.map(c => {
        const val = row.getValue(c.id);
        const strVal = String(val ?? '');
        return strVal.includes(',') ? `"${strVal}"` : strVal;
      }).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* ─── Renderizado ───────────────────────── */
  return (
    <div className={`flex flex-col rounded-xl overflow-hidden border bg-[var(--khor-surface-page)] shadow-sm font-primary ${className || ''}`}>
      
      {/* ─── Toolbar ─── */}
      {(searchable || actions || enableColumnToggle || enableExport) && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 border-b bg-[var(--khor-neutral-50)]">
          <div className="flex-1 min-w-[200px]">
            {searchable && (
              <KSearchInput 
                placeholder={searchPlaceholder} 
                value={globalFilter} 
                onChange={setGlobalFilter} 
                className="max-w-md"
              />
            )}
          </div>

          <div className="flex items-center gap-2">
            {enableExport && (
              <button 
                onClick={handleExportCSV} 
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm font-medium border rounded-md shadow-sm transition-colors text-[var(--khor-neutral-600)] hover:bg-[var(--khor-neutral-100)] bg-[var(--khor-surface-page)] active:scale-95"
              >
                <Download className="w-4 h-4" /> CSV
              </button>
            )}

            {enableColumnToggle && (
              <KDropdownMenuRoot>
                <KDropdownMenuTrigger asChild>
                  <button className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-sm font-medium border rounded-md shadow-sm transition-colors text-[var(--khor-neutral-600)] hover:bg-[var(--khor-neutral-100)] bg-[var(--khor-surface-page)] active:scale-95">
                    <Columns3 className="w-4 h-4" /> Columnas
                  </button>
                </KDropdownMenuTrigger>
                <KDropdownMenuContent align="end" className="w-56 overflow-y-auto max-h-80">
                  <KDropdownMenuLabel>Mostrar/Ocultar</KDropdownMenuLabel>
                  <KDropdownMenuSeparator />
                  {table.getAllLeafColumns().filter(c => c.id !== 'k-selection').map(column => {
                    return (
                      <KDropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value: boolean) => column.toggleVisibility(!!value)}
                      >
                        {typeof column.columnDef.header === 'string' 
                          ? column.columnDef.header 
                          : column.id}
                      </KDropdownMenuCheckboxItem>
                    )
                  })}
                </KDropdownMenuContent>
              </KDropdownMenuRoot>
            )}
            
            {actions}
          </div>
        </div>
      )}

      {/* ─── Área de Tabla (Viewport con Scroll) ─── */}
      <div 
        className="relative w-full overflow-auto" 
        style={{ maxHeight: maxHeight ? maxHeight : undefined }}
      >
        <table className="w-full text-sm text-left border-collapse min-w-[600px]">
          <thead className={`text-xs font-semibold text-[var(--khor-neutral-500)] bg-[var(--khor-neutral-50)] ${stickyHeader ? 'sticky top-0 z-10 shadow-sm' : ''}`}>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th 
                      key={header.id} 
                      className={`px-4 py-3 border-b select-none ${header.column.getCanSort() ? 'cursor-pointer hover:bg-[var(--khor-neutral-100)] transition-colors' : ''}`}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{ width: header.getSize() !== 150 ? header.getSize() : undefined }}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex items-center gap-1">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <ChevronUp className="w-3.5 h-3.5 text-[var(--khor-primary)]" />,
                            desc: <ChevronDown className="w-3.5 h-3.5 text-[var(--khor-primary)]" />
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          
          <tbody className="divide-y text-[var(--khor-neutral-700)] bg-[var(--khor-surface-page)]">
            {loading ? (
              // Esqueleto Loading
              <tr>
                <td colSpan={tableColumns.length} className="px-4 py-16 text-center">
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-[var(--khor-primary)] border-r-transparent animate-spin" />
                  <p className="mt-2 text-sm text-[var(--khor-neutral-500)]">Cargando datos...</p>
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              // Empty State
              <tr>
                <td colSpan={tableColumns.length} className="px-4 py-16 text-center">
                  <p className="text-sm font-medium text-[var(--khor-neutral-500)]">No se encontraron resultados</p>
                </td>
              </tr>
            ) : (
              // Filas de Datos
              table.getRowModel().rows.map(row => (
                <tr 
                  key={row.id} 
                  className={`group transition-colors ${onRowClick ? 'cursor-pointer hover:bg-[var(--khor-primary-light)]' : 'hover:bg-[var(--khor-neutral-50)]'} ${row.getIsSelected() ? 'bg-[var(--khor-primary-light)]' : ''}`}
                  onClick={() => onRowClick && onRowClick(row.original)}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-4 py-3 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ─── Paginación ─── */}
      <div className="flex items-center justify-between px-4 py-3 border-t bg-[var(--khor-surface-page)]">
        <div className="flex-1 text-sm text-[var(--khor-neutral-500)]">
          {enableRowSelection ? (
            <span>
              <strong className="text-[var(--khor-primary)]">{table.getFilteredSelectedRowModel().rows.length}</strong> de{" "}
              {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
            </span>
          ) : (
            <span>
              Mostrando página <strong>{table.getState().pagination.pageIndex + 1}</strong> de <strong>{table.getPageCount() || 1}</strong>
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-4 lg:gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--khor-neutral-500)] hidden sm:block">Filas por página:</span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={e => {
                table.setPageSize(Number(e.target.value))
              }}
              className="px-2 py-1 text-sm border rounded-md outline-none focus:ring-2 focus:ring-[var(--khor-primary-light)] bg-[var(--khor-surface-page)] text-[var(--khor-neutral-700)] cursor-pointer"
            >
              {[10, 20, 30, 40, 50, ...pageSizes].filter((v, i, a) => a.indexOf(v) === i).sort((a,b)=>a-b).map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="p-1 rounded-md border bg-[var(--khor-surface-page)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--khor-neutral-100)] transition-colors text-[var(--khor-neutral-600)]"
              aria-label="Ir a la primer página"
            >
              <ChevronsLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1 rounded-md border bg-[var(--khor-surface-page)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--khor-neutral-100)] transition-colors text-[var(--khor-neutral-600)]"
              aria-label="Ir a la página anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1 rounded-md border bg-[var(--khor-surface-page)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--khor-neutral-100)] transition-colors text-[var(--khor-neutral-600)]"
              aria-label="Ir a la página siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="p-1 rounded-md border bg-[var(--khor-surface-page)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[var(--khor-neutral-100)] transition-colors text-[var(--khor-neutral-600)]"
              aria-label="Ir a la última página"
            >
              <ChevronsRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

// Re-export explicitly typed components
export * from './KTableDateCell';
export default KDataTable;
