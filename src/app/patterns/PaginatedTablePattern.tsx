import React, { useState } from 'react';
import { Plus, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { KButton } from '../components/design-system/atoms/KButton/index';
import { KBadge } from '../components/design-system/atoms/KBadge/index';
import { KSearchInput } from '../components/design-system/atoms/KSearchInput/index';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.sm }}>
      <div style={{ display: 'flex', gap: t.spacing.sm, alignItems: 'center' }}>
        <div style={{ flex: 1 }}><KSearchInput placeholder="Buscar factura o cliente..." value={search} onChange={(v) => { setSearch(v); setPage(1); }} /></div>
        <KButton variant="primary" icon={<Plus size={t.icon.sm} />} size="sm">Nueva Factura</KButton>
      </div>
      <div style={{ borderRadius: t.radius.lg, border: `1px solid ${t.semantic.border.default}`, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: t.typography.bodySm.size }}>
          <thead>
            <tr style={{ backgroundColor: t.semantic.surface.raised }}>
              {['# Factura', 'Cliente', 'Monto', 'Estado', 'Fecha', ''].map((h) => (
                <th key={h} style={{ padding: `${t.spacing.sm}px ${t.spacing.md}px`, textAlign: 'left', fontWeight: t.typography.fontWeights.semibold, borderBottom: `1px solid ${t.semantic.border.default}`, color: t.semantic.text.primary }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map((r, i) => (
              <tr key={r.id} style={{ backgroundColor: i % 2 === 0 ? t.semantic.surface.card : t.semantic.surface.raised }}>
                <td style={{ padding: `${t.spacing.sm}px ${t.spacing.md}px`, borderBottom: `1px solid ${t.semantic.border.default}`, fontWeight: t.typography.fontWeights.semibold, color: t.semantic.text.primary }}>{r.id}</td>
                <td style={{ padding: `${t.spacing.sm}px ${t.spacing.md}px`, borderBottom: `1px solid ${t.semantic.border.default}`, color: t.semantic.text.primary }}>{r.cliente}</td>
                <td style={{ padding: `${t.spacing.sm}px ${t.spacing.md}px`, borderBottom: `1px solid ${t.semantic.border.default}`, fontWeight: t.typography.fontWeights.semibold, color: t.semantic.text.primary }}>{r.monto}</td>
                <td style={{ padding: `${t.spacing.sm}px ${t.spacing.md}px`, borderBottom: `1px solid ${t.semantic.border.default}` }}>
                  <KBadge status={statusColor(r.estado) as any} label={r.estado} />
                </td>
                <td style={{ padding: `${t.spacing.sm}px ${t.spacing.md}px`, borderBottom: `1px solid ${t.semantic.border.default}`, color: t.semantic.text.muted }}>{r.fecha}</td>
                <td style={{ padding: `${t.spacing.sm}px ${t.spacing.md}px`, borderBottom: `1px solid ${t.semantic.border.default}` }}>
                  <div style={{ display: 'flex', gap: t.spacing.xs }}>
                    <KButton variant="ghost" size="sm" icon={<Edit size={t.icon.xs} />} />
                    <KButton variant="ghost" size="sm" icon={<Trash2 size={t.icon.xs} />} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: t.typography.bodySm.size, color: t.semantic.text.muted }}>
          {filtered.length} resultados &bull; Página {page} de {totalPages}
        </span>
        <div style={{ display: 'flex', gap: t.spacing.xs }}>
          <KButton variant="outline" size="sm" icon={<ChevronLeft size={t.icon.xs} />} disabled={page <= 1} onClick={() => setPage(page - 1)} />
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} style={{
              width: t.sizing[8], height: t.sizing[8], borderRadius: t.radius.sm, border: 'none', fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.medium,
              backgroundColor: page === i + 1 ? t.colors.brand.primary : 'transparent',
              color: page === i + 1 ? t.colors.feedback.white : t.semantic.text.muted, cursor: 'pointer', fontFamily: font,
            }}>{i + 1}</button>
          ))}
          <KButton variant="outline" size="sm" icon={<ChevronRight size={t.icon.xs} />} disabled={page >= totalPages} onClick={() => setPage(page + 1)} />
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
<div style={{ display: 'flex', gap: t.spacing.sm }}>
  <KSearchInput placeholder="Buscar..." value={search} onChange={setSearch} />
  <KButton variant="primary" icon={<Plus size={t.icon.sm} />}>Nuevo</KButton>
</div>
// Lista con badges y acciones
{users.map(u => (
  <div key={u.id}>
    <KBadge status={u.role === 'Admin' ? 'info' : 'default'} label={u.role} />
    <KButton variant="ghost" size="sm" icon={<Edit size={t.icon.xs} />} />
  </div>
))}`,
};
