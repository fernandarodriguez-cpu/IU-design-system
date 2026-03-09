/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR DESIGN SYSTEM — ORGANISMOS         ║
 * ║  Componentes complejos formados por       ║
 * ║  átomos y moléculas que conforman         ║
 * ║  secciones completas de la UI.            ║
 * ║                                           ║
 * ║  Base: Radix + Custom + Khor Tokens       ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { useState, useMemo } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as RadixTabs from '@radix-ui/react-tabs';
import { LineChart, Line } from 'recharts';
import { toast, Toaster } from 'sonner';
import { X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUp, ArrowDown, Download, Columns3, Check } from 'lucide-react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
} from '@tanstack/react-table';
import { KButton, KText, KCheckbox } from './atoms';
import { KSearchInput } from './molecules';
import { khorTokens } from '../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ─── KDataTable v2 (TanStack React Table) ──── */
export interface KDataTableColumn<T = any> {
  key: string;
  title: string;
  dataIndex: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: number | string;
  hidden?: boolean;
}

export interface KDataTableProps<T = any> {
  columns: KDataTableColumn<T>[];
  data: T[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  actions?: React.ReactNode;
  rowKey?: string;
  pageSize?: number;
  pageSizes?: number[];
  onRowClick?: (record: T) => void;
  enableRowSelection?: boolean;
  enableColumnToggle?: boolean;
  enableExport?: boolean;
  stickyHeader?: boolean;
  maxHeight?: string | number;
  onSelectionChange?: (selectedRows: T[]) => void;
  className?: string;
}

export function KDataTable<T extends Record<string, any>>({
  columns, data, loading, searchable = true, searchPlaceholder = 'Buscar en tabla...',
  actions, rowKey = 'id', pageSize = 10, pageSizes = [10, 20, 50],
  onRowClick, enableRowSelection, enableColumnToggle, enableExport,
  stickyHeader, maxHeight, onSelectionChange, className,
}: KDataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [colMenuOpen, setColMenuOpen] = useState(false);

  const tanstackColumns = useMemo<ColumnDef<T, any>[]>(() => {
    const cols: ColumnDef<T, any>[] = [];
    if (enableRowSelection) {
      cols.push({
        id: '__select',
        header: ({ table }) => (
          <KCheckbox
            checked={table.getIsAllPageRowsSelected()}
            indeterminate={table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()}
            onChange={(v) => table.toggleAllPageRowsSelected(v)}
          />
        ),
        cell: ({ row }) => (
          <KCheckbox
            checked={row.getIsSelected()}
            onChange={(v) => row.toggleSelected(v)}
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 44,
      });
    }
    columns.forEach((col) => {
      cols.push({
        id: col.key,
        accessorKey: col.dataIndex,
        header: col.title,
        cell: (info) => col.render
          ? col.render(info.getValue(), info.row.original, info.row.index)
          : info.getValue(),
        enableSorting: col.sortable ?? false,
        size: typeof col.width === 'number' ? col.width : undefined,
      });
    });
    return cols;
  }, [columns, enableRowSelection]);

  const filtered = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row).some((v) =>
        String(v).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const table = useReactTable({
    data: filtered,
    columns: tanstackColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      setRowSelection(updater);
      setTimeout(() => {
        const selected = table.getSelectedRowModel().rows.map((r) => r.original);
        onSelectionChange?.(selected);
      }, 0);
    },
    state: { sorting, columnVisibility, rowSelection },
    initialState: { pagination: { pageSize } },
  });

  const handleExportCSV = () => {
    const visibleCols = columns.filter((c) => columnVisibility[c.key] !== false);
    const headers = visibleCols.map((c) => c.title).join(',');
    const rows = table.getFilteredRowModel().rows.map((row) =>
      visibleCols.map((c) => {
        const val = row.original[c.dataIndex];
        return typeof val === 'string' && val.includes(',') ? `"${val}"` : String(val ?? '');
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

  const totalFiltered = table.getFilteredRowModel().rows.length;
  const selectedCount = table.getFilteredSelectedRowModel().rows.length;
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const currentPageSize = table.getState().pagination.pageSize;

  return (
    <div className={className} style={{ backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg, boxShadow: t.shadows.sm, overflow: 'hidden', border: `1px solid ${t.colors.neutral[200]}` }}>
      {/* Toolbar */}
      {(searchable || actions || enableColumnToggle || enableExport) && (
        <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, borderBottom: `1px solid ${t.colors.neutral[200]}`, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 200 }}>
            {searchable && <KSearchInput placeholder={searchPlaceholder} value={search} onChange={(v) => setSearch(v)} size="md" />}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {enableExport && (
              <button onClick={handleExportCSV} style={{ ...toolBtnStyle, gap: 6 }}>
                <Download size={14} /> CSV
              </button>
            )}
            {enableColumnToggle && (
              <div style={{ position: 'relative' }}>
                <button onClick={() => setColMenuOpen(!colMenuOpen)} onBlur={() => setTimeout(() => setColMenuOpen(false), 150)} style={{ ...toolBtnStyle, gap: 6 }}>
                  <Columns3 size={14} /> Columnas
                </button>
                {colMenuOpen && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: 4, minWidth: 180,
                    backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
                    border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md,
                    zIndex: 50, padding: '4px 0',
                  }}>
                    {table.getAllLeafColumns().filter((c) => c.id !== '__select' && c.getCanHide()).map((col) => (
                      <label key={col.id} style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                        fontSize: 13, fontFamily: font, cursor: 'pointer', color: t.colors.neutral[900],
                      }}>
                        <KCheckbox checked={col.getIsVisible()} onChange={(v) => col.toggleVisibility(v)} />
                        {typeof col.columnDef.header === 'string' ? col.columnDef.header : col.id}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
            {actions}
          </div>
        </div>
      )}
      {/* Table */}
      <div style={{ overflowX: 'auto', maxHeight: maxHeight || undefined, overflowY: maxHeight ? 'auto' : undefined }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: font, fontSize: 14 }}>
          <thead style={stickyHeader ? { position: 'sticky', top: 0, zIndex: 10 } : undefined}>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id} style={{ backgroundColor: t.colors.neutral[100] }}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    style={{
                      padding: '10px 16px', textAlign: 'left', fontWeight: 600, fontSize: 12,
                      color: t.colors.neutral[500], borderBottom: `1px solid ${t.colors.neutral[200]}`,
                      cursor: header.column.getCanSort() ? 'pointer' : 'default', userSelect: 'none',
                      width: header.getSize() !== 150 ? header.getSize() : undefined, whiteSpace: 'nowrap',
                      backgroundColor: t.colors.neutral[100],
                    }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() === 'asc' && <ArrowUp size={12} />}
                      {header.column.getIsSorted() === 'desc' && <ArrowDown size={12} />}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={`skel-${i}`}>
                  {tanstackColumns.filter((c) => columnVisibility[(c as any).id] !== false).map((_, j) => (
                    <td key={j} style={{ padding: '14px 16px', borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
                      <div className="animate-pulse" style={{ height: 14, borderRadius: 4, backgroundColor: t.colors.neutral[200], width: `${60 + Math.random() * 30}%` }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : table.getRowModel().rows.length === 0 ? (
              <tr><td colSpan={tanstackColumns.length} style={{ padding: 40, textAlign: 'center', color: t.colors.neutral[300], fontFamily: font }}>Sin resultados</td></tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  data-selected={row.getIsSelected() || undefined}
                  onClick={() => onRowClick?.(row.original)}
                  style={{
                    cursor: onRowClick ? 'pointer' : 'default',
                    borderBottom: `1px solid ${t.colors.neutral[200]}`,
                    transition: 'background-color 0.1s ease',
                    backgroundColor: row.getIsSelected() ? 'rgba(224,77,54,0.06)' : undefined,
                  }}
                  onMouseEnter={(e) => { if (!row.getIsSelected()) e.currentTarget.style.backgroundColor = 'rgba(224,77,54,0.03)'; }}
                  onMouseLeave={(e) => { if (!row.getIsSelected()) e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ padding: '12px 16px', color: t.colors.neutral[900] }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Footer / Pagination */}
      <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${t.colors.neutral[200]}`, fontSize: 13, color: t.colors.neutral[400], fontFamily: font, flexWrap: 'wrap', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span>{totalFiltered} registros</span>
          {enableRowSelection && selectedCount > 0 && (
            <span style={{ color: t.colors.brand.primary, fontWeight: 500 }}>
              · {selectedCount} seleccionados
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {pageSizes.length > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span>Filas:</span>
              <select
                value={currentPageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                style={{
                  padding: '2px 6px', borderRadius: t.radius.sm, border: `1px solid ${t.colors.neutral[200]}`,
                  backgroundColor: t.colors.neutral[50], fontFamily: font, fontSize: 13, color: t.colors.neutral[500],
                  cursor: 'pointer', outline: 'none',
                }}
              >
                {pageSizes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} style={paginBtnStyle(!table.getCanPreviousPage())}><ChevronsLeft size={14} /></button>
            <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} style={paginBtnStyle(!table.getCanPreviousPage())}><ChevronLeft size={14} /></button>
            <span style={{ padding: '0 8px', fontWeight: 500 }}>{pageIndex + 1} / {pageCount || 1}</span>
            <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} style={paginBtnStyle(!table.getCanNextPage())}><ChevronRight size={14} /></button>
            <button onClick={() => table.setPageIndex(pageCount - 1)} disabled={!table.getCanNextPage()} style={paginBtnStyle(!table.getCanNextPage())}><ChevronsRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

const toolBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', padding: '6px 12px',
  borderRadius: khorTokens.radius.md, border: `1px solid ${khorTokens.colors.neutral[200]}`,
  backgroundColor: khorTokens.colors.neutral[50], fontFamily: khorTokens.typography.fontPrimary,
  fontSize: 13, fontWeight: 500, color: khorTokens.colors.neutral[500], cursor: 'pointer',
  transition: 'all 0.15s ease',
};

function paginBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 28, height: 28, borderRadius: t.radius.sm,
    border: `1px solid ${t.colors.neutral[200]}`, background: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: disabled ? t.colors.neutral[300] : t.colors.neutral[500],
  };
}

/* ─── KSparklineCell (para tablas) ──────────── */
export interface KSparklineCellProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function KSparklineCell({ data, color = t.colors.brand.primary, width = 80, height = 24 }: KSparklineCellProps) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div style={{ width, height, minWidth: width }}>
      <LineChart width={width} height={height} data={chartData}>
        <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
      </LineChart>
    </div>
  );
}

/* ─── KModal ────────────────────────────────── */
export interface KModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
  className?: string;
}

export function KModal({ open, onClose, title, children, footer, width = 520, className }: KModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 999, animation: 'fadeIn 0.15s ease' }} />
        <Dialog.Content
          className={className}
          style={{
            position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width, maxWidth: '90vw', maxHeight: '85vh',
            backgroundColor: t.colors.neutral[50], borderRadius: t.radius.xl,
            boxShadow: t.shadows.lg, fontFamily: font, zIndex: 1000,
            display: 'flex', flexDirection: 'column', animation: 'scaleIn 0.15s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
            <Dialog.Title style={{ margin: 0, fontSize: 20, fontWeight: 600, color: t.colors.brand.navy }}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[400], display: 'flex', padding: 4, borderRadius: t.radius.sm }}>
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>
          <div style={{ padding: 24, overflow: 'auto', flex: 1 }}>{children}</div>
          {footer && <div style={{ padding: '16px 24px', borderTop: `1px solid ${t.colors.neutral[200]}` }}>{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ─── KDrawer ───────────────────────────────── */
export interface KDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: number;
  placement?: 'left' | 'right';
  footer?: React.ReactNode;
  className?: string;
}

export function KDrawer({ open, onClose, title, children, width = 400, placement = 'right', footer, className }: KDrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 999 }} />
        <Dialog.Content
          className={className}
          style={{
            position: 'fixed', top: 0, bottom: 0,
            [placement]: 0,
            width, maxWidth: '90vw',
            backgroundColor: t.colors.neutral[50], boxShadow: t.shadows.lg,
            fontFamily: font, zIndex: 1000,
            display: 'flex', flexDirection: 'column',
            animation: `slideIn${placement === 'right' ? 'Right' : 'Left'} 0.2s ease`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', borderBottom: `1px solid ${t.colors.neutral[200]}`, flexShrink: 0 }}>
            <Dialog.Title style={{ margin: 0, fontSize: 20, fontWeight: 600, color: t.colors.brand.navy }}>{title}</Dialog.Title>
            <Dialog.Close asChild>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[400], display: 'flex', padding: 4 }}>
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>
          <div style={{ padding: 24, overflow: 'auto', flex: 1 }}>{children}</div>
          {footer && <div style={{ padding: '16px 24px', borderTop: `1px solid ${t.colors.neutral[200]}`, flexShrink: 0 }}>{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/* ─── KToastManager ─────────────────────────── */
export interface KToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  description?: string;
  duration?: number;
}

export function kToast({ type = 'info', title, description, duration = 4000 }: KToastOptions) {
  const config = { description, duration };
  switch (type) {
    case 'success': toast.success(title, config); break;
    case 'error': toast.error(title, config); break;
    case 'warning': toast.warning(title, config); break;
    default: toast.info(title, config); break;
  }
}

export function KToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          fontFamily: font,
          borderRadius: t.radius.lg,
          boxShadow: t.shadows.md,
        },
      }}
      richColors
      closeButton
    />
  );
}

/* ─── KCardSection ──────────────────────────── */
export interface KCardSectionProps {
  title?: string;
  subtitle?: string;
  extra?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export function KCardSection({ title, subtitle, extra, children, className, noPadding }: KCardSectionProps) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg,
        boxShadow: t.shadows.sm, border: `1px solid ${t.colors.neutral[200]}`,
        overflow: 'hidden', fontFamily: font,
      }}
    >
      {title && (
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 24px', borderBottom: `1px solid ${t.colors.neutral[200]}`,
        }}>
          <div>
            <KText variant="body-lg" color="navy">{title}</KText>
            {subtitle && <KText variant="small" color="secondary">{subtitle}</KText>}
          </div>
          {extra}
        </div>
      )}
      <div style={{ padding: noPadding ? 0 : 24 }}>{children}</div>
    </div>
  );
}

/* ─── KTabs ─────────────────────────────────── */
export interface KTabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface KTabsProps {
  items: KTabItem[];
  defaultActiveKey?: string;
  onChange?: (key: string) => void;
  type?: 'line' | 'card';
  className?: string;
}

export function KTabs({ items, defaultActiveKey, onChange, type = 'line', className }: KTabsProps) {
  const defaultKey = defaultActiveKey || items[0]?.key || '';

  return (
    <RadixTabs.Root defaultValue={defaultKey} onValueChange={onChange} className={className}>
      <RadixTabs.List style={{
        display: 'flex', gap: type === 'card' ? 4 : 0,
        borderBottom: type === 'line' ? `2px solid ${t.colors.neutral[200]}` : 'none',
        marginBottom: 16,
      }}>
        {items.map((tab) => (
          <RadixTabs.Trigger
            key={tab.key}
            value={tab.key}
            disabled={tab.disabled}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: type === 'card' ? '8px 16px' : '10px 16px',
              border: type === 'card' ? `1px solid ${t.colors.neutral[200]}` : 'none',
              borderBottom: type === 'line' ? '2px solid transparent' : undefined,
              marginBottom: type === 'line' ? -2 : 0,
              borderRadius: type === 'card' ? `${t.radius.md}px ${t.radius.md}px 0 0` : 0,
              background: 'none', cursor: tab.disabled ? 'not-allowed' : 'pointer',
              fontFamily: font, fontSize: 14, fontWeight: 500,
              color: t.colors.neutral[400],
              opacity: tab.disabled ? 0.5 : 1,
              transition: 'all 0.15s ease',
            }}
            // data-state is set by Radix
            onMouseEnter={(e) => {
              if (e.currentTarget.dataset.state !== 'active') {
                e.currentTarget.style.color = t.colors.neutral[900];
              }
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget.dataset.state !== 'active') {
                e.currentTarget.style.color = t.colors.neutral[400];
              }
            }}
            ref={(el) => {
              if (!el) return;
              const observer = new MutationObserver(() => {
                if (el.dataset.state === 'active') {
                  el.style.color = t.colors.brand.primary;
                  if (type === 'line') el.style.borderBottomColor = t.colors.brand.primary;
                  if (type === 'card') el.style.backgroundColor = t.colors.neutral[50];
                } else {
                  el.style.color = t.colors.neutral[400];
                  if (type === 'line') el.style.borderBottomColor = 'transparent';
                  if (type === 'card') el.style.backgroundColor = 'transparent';
                }
              });
              observer.observe(el, { attributes: true, attributeFilter: ['data-state'] });
              // Initial check
              if (el.dataset.state === 'active') {
                el.style.color = t.colors.brand.primary;
                if (type === 'line') el.style.borderBottomColor = t.colors.brand.primary;
                if (type === 'card') el.style.backgroundColor = t.colors.neutral[50];
              }
            }}
          >
            {tab.icon}
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {items.map((tab) => (
        <RadixTabs.Content key={tab.key} value={tab.key}>
          {tab.children}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}

/* ─── KCommandBarPlaceholder ────────────────── */
export function KCommandBarPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 40, borderRadius: t.radius.lg,
        border: `2px dashed ${t.colors.neutral[200]}`,
        backgroundColor: t.colors.neutral[100], fontFamily: font,
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <KText variant="body-lg" color="secondary">Command Bar (IA Agent)</KText>
        <KText variant="small" color="muted">Placeholder — Disponible en futuras iteraciones</KText>
        <div style={{ marginTop: 12, padding: '8px 16px', borderRadius: t.radius.md, backgroundColor: t.colors.neutral[50], border: `1px solid ${t.colors.neutral[200]}`, color: t.colors.neutral[300], fontSize: 13 }}>
          <kbd style={{ backgroundColor: t.colors.neutral[200], padding: '2px 6px', borderRadius: 4, fontSize: 11, marginRight: 6 }}>Ctrl</kbd>
          <kbd style={{ backgroundColor: t.colors.neutral[200], padding: '2px 6px', borderRadius: 4, fontSize: 11, marginRight: 8 }}>K</kbd>
          Buscar con IA...
        </div>
      </div>
    </div>
  );
}