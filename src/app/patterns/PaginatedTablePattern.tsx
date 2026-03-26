import React, { useState } from 'react';
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { KButton, KBadge } from '../components/design-system/atoms/index';
import { KSearchInput } from '../components/design-system/molecules/index';
import { khorTokens } from '../theme/khor-theme';
import { Pattern } from './types';

const t = khorTokens;
const font = t.typography.fontPrimary;

function PaginatedTableComponent() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const pageSize = 5;
  const allData = [
    { id: 'INV-001', cliente: 'Empresa Alpha', monto: '$12,500', estado: 'Pagado', fecha: '05 Mar 2026' },
    { id: 'INV-002', cliente: 'Beta Corp', monto: '$8,300', estado: 'Pendiente', fecha: '04 Mar 2026' },
    { id: 'INV-003', cliente: 'Gamma S.A.', monto: '$24,100', estado: 'Pagado', fecha: '03 Mar 2026' },
    { id: 'INV-004', cliente: 'Delta Labs', monto: '$5,750', estado: 'Vencido', fecha: '01 Mar 2026' },
    { id: 'INV-005', cliente: 'Epsilon Inc', monto: '$18,900', estado: 'Pagado', fecha: '28 Feb 2026' },
    { id: 'INV-006', cliente: 'Zeta Global', monto: '$31,200', estado: 'Pendiente', fecha: '27 Feb 2026' },
    { id: 'INV-007', cliente: 'Eta Systems', monto: '$7,450', estado: 'Pagado', fecha: '25 Feb 2026' },
    { id: 'INV-008', cliente: 'Theta Digital', monto: '$15,800', estado: 'Vencido', fecha: '22 Feb 2026' },
    { id: 'INV-009', cliente: 'Iota Media', monto: '$9,100', estado: 'Pagado', fecha: '20 Feb 2026' },
    { id: 'INV-010', cliente: 'Kappa Tech', monto: '$42,000', estado: 'Pendiente', fecha: '18 Feb 2026' },
  ];
  const filtered = allData.filter((d) => d.cliente.toLowerCase().includes(search.toLowerCase()) || d.id.toLowerCase().includes(search.toLowerCase()));
  const totalPages = Math.ceil(filtered.length / pageSize);
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
  const statusColor = (s: string) => s === 'Pagado' ? 'success' : s === 'Pendiente' ? 'warning' : 'error';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1 }}><KSearchInput placeholder="Buscar factura o cliente..." value={search} onChange={(v) => { setSearch(v); setPage(1); }} /></div>
        <KButton variant="primary" icon={<Plus size={16} />} size="sm">Nueva Factura</KButton>
      </div>
      <div style={{ borderRadius: t.radius.lg, border: '1px solid var(--border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--muted)' }}>
              {['# Factura', 'Cliente', 'Monto', 'Estado', 'Fecha', ''].map((h) => (
                <th key={h} style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 600, borderBottom: '1px solid var(--border)', color: 'var(--foreground)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((r, i) => (
              <tr key={r.id} style={{ backgroundColor: i % 2 === 0 ? 'var(--card)' : 'var(--muted)' }}>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', fontWeight: 600, color: 'var(--foreground)' }}>{r.id}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--foreground)' }}>{r.cliente}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', fontWeight: 600, color: 'var(--foreground)' }}>{r.monto}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
                  <KBadge khorStatus={statusColor(r.estado) as any} label={r.estado} />
                </td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', color: 'var(--muted-foreground)' }}>{r.fecha}</td>
                <td style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <KButton variant="ghost" size="sm" icon={<Edit size={14} />} />
                    <KButton variant="ghost" size="sm" icon={<Trash2 size={14} />} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
          {filtered.length} resultados &bull; Página {page} de {totalPages}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          <KButton variant="outline" size="sm" icon={<ChevronLeft size={14} />} disabled={page <= 1} onClick={() => setPage(page - 1)} />
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} style={{
              width: 32, height: 32, borderRadius: 6, border: 'none', fontSize: 13, fontWeight: 500,
              backgroundColor: page === i + 1 ? t.colors.brand.primary : 'transparent',
              color: page === i + 1 ? '#fff' : 'var(--muted-foreground)', cursor: 'pointer', fontFamily: font,
            }}>{i + 1}</button>
          ))}
          <KButton variant="outline" size="sm" icon={<ChevronRight size={14} />} disabled={page >= totalPages} onClick={() => setPage(page + 1)} />
        </div>
      </div>
    </div>
  );
}

export const PaginatedTablePattern: Pattern = {
  id: 'paginated-table',
  title: 'Tabla con Paginación',
  description: 'Tabla de datos con búsqueda, paginación y acciones inline (editar, eliminar).',
  category: 'Datos',
  component: <PaginatedTableComponent />,
  code: `import { KSearchInput, KStatCard } from '@khor/molecules';
import { KButton, KBadge } from '@khor/atoms';

// Barra de búsqueda + botón de acción
<div style={{ display: 'flex', gap: 8 }}>
  <KSearchInput placeholder="Buscar..." value={search} onChange={setSearch} />
  <KButton variant="primary" icon={<Plus size={16} />}>Nuevo</KButton>
</div>
// Lista con badges y acciones
{users.map(u => (
  <div key={u.id}>
    <KBadge khorStatus={u.role === 'Admin' ? 'info' : 'default'} label={u.role} />
    <KButton variant="ghost" size="sm" icon={<Edit size={14} />} />
  </div>
))}`,
};
