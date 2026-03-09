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
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { toast, Toaster } from 'sonner';
import { X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUp, ArrowDown } from 'lucide-react';
import { KButton, KText } from './atoms';
import { KSearchInput } from './molecules';
import { khorTokens } from '../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ─── KDataTable ────────────────────────────── */
export interface KDataTableColumn<T = any> {
  key: string;
  title: string;
  dataIndex: string;
  render?: (value: any, record: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: number | string;
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
  onRowClick?: (record: T) => void;
  className?: string;
}

export function KDataTable<T extends Record<string, any>>({
  columns, data, loading, searchable = true, searchPlaceholder = 'Buscar en tabla...',
  actions, rowKey = 'id', pageSize = 10, onRowClick, className,
}: KDataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  const filtered = useMemo(() => {
    let d = search
      ? data.filter((row) => Object.values(row).some((v) => String(v).toLowerCase().includes(search.toLowerCase())))
      : data;
    if (sortKey) {
      const col = columns.find((c) => c.key === sortKey);
      if (col) {
        d = [...d].sort((a, b) => {
          const av = a[col.dataIndex];
          const bv = b[col.dataIndex];
          const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
          return sortDir === 'asc' ? cmp : -cmp;
        });
      }
    }
    return d;
  }, [data, search, sortKey, sortDir, columns]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  return (
    <div className={className} style={{ backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg, boxShadow: t.shadows.sm, overflow: 'hidden', border: `1px solid ${t.colors.neutral[200]}` }}>
      {(searchable || actions) && (
        <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
          {searchable && <KSearchInput placeholder={searchPlaceholder} value={search} onChange={(v) => { setSearch(v); setPage(1); }} size="md" />}
          <div style={{ display: 'flex', gap: 8 }}>{actions}</div>
        </div>
      )}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: font, fontSize: 14 }}>
          <thead>
            <tr style={{ backgroundColor: t.colors.neutral[100] }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  style={{
                    padding: '10px 16px', textAlign: 'left', fontWeight: 600, fontSize: 12,
                    color: t.colors.neutral[500], borderBottom: `1px solid ${t.colors.neutral[200]}`,
                    cursor: col.sortable ? 'pointer' : 'default', userSelect: 'none',
                    width: col.width, whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {col.title}
                    {col.sortable && sortKey === col.key && (sortDir === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />)}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length} style={{ padding: 40, textAlign: 'center', color: t.colors.neutral[300] }}>Cargando...</td></tr>
            ) : paged.length === 0 ? (
              <tr><td colSpan={columns.length} style={{ padding: 40, textAlign: 'center', color: t.colors.neutral[300] }}>Sin resultados</td></tr>
            ) : (
              paged.map((row, ri) => (
                <tr
                  key={row[rowKey] || ri}
                  onClick={() => onRowClick?.(row)}
                  style={{ cursor: onRowClick ? 'pointer' : 'default', borderBottom: `1px solid ${t.colors.neutral[200]}`, transition: 'background-color 0.1s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(224,77,54,0.04)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  {columns.map((col) => (
                    <td key={col.key} style={{ padding: '12px 16px', color: t.colors.neutral[900] }}>
                      {col.render ? col.render(row[col.dataIndex], row, ri) : row[col.dataIndex]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid ${t.colors.neutral[200]}`, fontSize: 13, color: t.colors.neutral[400] }}>
        <span>{filtered.length} registros</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button onClick={() => setPage(1)} disabled={page === 1} style={paginBtnStyle(page === 1)}><ChevronsLeft size={14} /></button>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} style={paginBtnStyle(page === 1)}><ChevronLeft size={14} /></button>
          <span style={{ padding: '0 8px', fontWeight: 500 }}>{page} / {totalPages || 1}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} style={paginBtnStyle(page >= totalPages)}><ChevronRight size={14} /></button>
          <button onClick={() => setPage(totalPages)} disabled={page >= totalPages} style={paginBtnStyle(page >= totalPages)}><ChevronsRight size={14} /></button>
        </div>
      </div>
    </div>
  );
}

function paginBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 28, height: 28, borderRadius: t.radius.sm,
    border: `1px solid ${t.colors.neutral[200]}`, background: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: disabled ? t.colors.neutral[300] : t.colors.neutral[500],
  };
}

/* ─── SparklineCell (para tablas) ───────────── */
export interface SparklineCellProps {
  data: number[];
  color?: string;
  width?: number;
  height?: number;
}

export function SparklineCell({ data, color = t.colors.brand.primary, width = 80, height = 24 }: SparklineCellProps) {
  const chartData = data.map((v, i) => ({ i, v }));
  return (
    <div style={{ width, height, minWidth: width }}>
      <ResponsiveContainer width={width} height={height}>
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="v" stroke={color} strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
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