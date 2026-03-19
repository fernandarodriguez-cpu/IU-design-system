import React, { useState, useMemo } from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Download, Columns3 } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';
import { KButton, KCheckbox, KText } from '../../atoms';
import { KSearchInput } from '../../molecules';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ─── KDataTable Props ──── */
export interface KDataTableColumn<T = any> {
  key: string;
  title: string;
  dataIndex: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: number | string;
  hidden?: boolean;
  ellipsis?: boolean;
  fixed?: 'left' | 'right';
}

export interface KDataTableProps<T = any> extends Omit<TableProps<T>, 'columns' | 'dataSource'> {
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

const toolBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', padding: '6px 12px',
  borderRadius: khorTokens.radius.md, border: `1px solid ${khorTokens.colors.neutral[200]}`,
  backgroundColor: khorTokens.colors.neutral[50], fontFamily: khorTokens.typography.fontPrimary,
  fontSize: 13, fontWeight: 500, color: khorTokens.colors.neutral[500], cursor: 'pointer',
  transition: 'all 0.15s ease',
};

export function KDataTable<T extends Record<string, any>>({
  columns, data, loading, searchable = true, searchPlaceholder = 'Buscar en tabla...',
  actions, rowKey = 'id', pageSize = 10, pageSizes = [10, 20, 50],
  onRowClick, enableRowSelection, enableColumnToggle, enableExport,
  stickyHeader, maxHeight, onSelectionChange, className,
  pagination: customPagination, ...rest
}: KDataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
  const [colMenuOpen, setColMenuOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row).some((v) =>
        String(v).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const handleExportCSV = () => {
    const visibleCols = columns.filter((c) => columnVisibility[c.key] !== false);
    const headers = visibleCols.map((c) => c.title).join(',');
    const rows = filteredData.map((row) =>
      visibleCols.map((c) => {
        const val = row[c.dataIndex as keyof T];
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

  const antdColumns: ColumnsType<T> = useMemo(() => {
    return columns
      .filter(col => columnVisibility[col.key] !== false)
      .map(col => ({
        key: col.key,
        title: col.title,
        dataIndex: col.dataIndex,
        render: col.render,
        width: col.width,
        ellipsis: col.ellipsis,
        fixed: col.fixed,
        sorter: col.sortable ? (a: T, b: T) => {
          const valA = a[col.dataIndex as keyof T];
          const valB = b[col.dataIndex as keyof T];
          if (typeof valA === 'number' && typeof valB === 'number') return valA - valB;
          return String(valA).localeCompare(String(valB));
        } : undefined,
      }));
  }, [columns, columnVisibility]);

  const rowSelection = enableRowSelection ? {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[], selectedRows: T[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
      onSelectionChange?.(selectedRows);
    },
  } : undefined;

  return (
    <div className={className} style={{ backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg, boxShadow: t.shadows.sm, overflow: 'hidden', border: `1px solid ${t.colors.neutral[200]}` }}>
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
                    {columns.map((col) => (
                      <label key={col.key} style={{
                        display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px',
                        fontSize: 13, fontFamily: font, cursor: 'pointer', color: t.colors.neutral[900],
                      }}>
                        <KCheckbox
                          checked={columnVisibility[col.key] !== false}
                          onChange={(e) => setColumnVisibility(prev => ({ ...prev, [col.key]: (e.target as HTMLInputElement).checked }))}
                        />
                        {col.title}
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
      <div style={{ '& .ant-table-wrapper': { fontFamily: font } } as React.CSSProperties}>
        <Table
          dataSource={filteredData}
          columns={antdColumns}
          rowKey={rowKey}
          loading={loading}
          rowSelection={rowSelection}
          pagination={customPagination !== false ? {
            showSizeChanger: pageSizes.length > 1,
            defaultPageSize: pageSize,
            pageSizeOptions: pageSizes.map(String),
            showTotal: (total, range) => (
              <span style={{ fontFamily: font, fontSize: 13, color: t.colors.neutral[500] }}>
                {enableRowSelection && selectedRowKeys.length > 0 && (
                  <span style={{ color: t.colors.brand.primary, fontWeight: 500, marginRight: 8 }}>
                    {selectedRowKeys.length} seleccionados
                  </span>
                )}
                {range[0]}-{range[1]} de {total} registros
              </span>
            ),
            ... (typeof customPagination === 'object' ? customPagination : {}),
          } : false}
          onRow={(record) => ({
            onClick: () => onRowClick?.(record),
            style: { cursor: onRowClick ? 'pointer' : 'default' }
          })}
          scroll={{ y: maxHeight, ...rest.scroll }}
          sticky={stickyHeader}
          style={{ fontFamily: font, ...rest.style }}
          {...rest}
        />
      </div>
    </div>
  );
}

export default KDataTable;
