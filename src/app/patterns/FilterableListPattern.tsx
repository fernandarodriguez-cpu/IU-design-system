import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { KButton } from '../components/design-system/atoms/KButton/index';
import { KBadge } from '../components/design-system/atoms/KBadge/index';
import { KSearchInput } from '../components/design-system/atoms/KSearchInput/index';
import { khorTokens } from '../theme/khor-theme';
import { Pattern } from './types';

const t = khorTokens;

function FilterableListComponent() {
  const [search, setSearch] = useState('');
  const items = [
    { id: 1, name: 'Ana García', email: 'ana@khor.io', role: 'Admin', status: 'Activo' },
    { id: 2, name: 'Carlos López', email: 'carlos@khor.io', role: 'Editor', status: 'Activo' },
    { id: 3, name: 'María Torres', email: 'maria@khor.io', role: 'Viewer', status: 'Inactivo' },
    { id: 4, name: 'Pedro Ruiz', email: 'pedro@khor.io', role: 'Editor', status: 'Activo' },
  ];
  const filtered = items.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()) || i.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.sm }}>
      <div style={{ display: 'flex', gap: t.spacing.sm, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <KSearchInput placeholder="Buscar usuarios..." value={search} onChange={setSearch} />
        </div>
        <KButton variant="primary" icon={<Plus size={t.icon.sm} />} size="sm">Nuevo</KButton>
      </div>
      <div style={{ borderRadius: t.radius.lg, border: `1px solid ${t.semantic.border.default}`, overflow: 'hidden' }}>
        {filtered.map((u, i) => (
          <div key={u.id} style={{
            display: 'flex', alignItems: 'center', gap: t.spacing.sm, padding: `${t.spacing.sm}px ${t.spacing.md}px`,
            borderBottom: i < filtered.length - 1 ? `1px solid ${t.semantic.border.default}` : 'none',
            backgroundColor: t.semantic.surface.card,
          }}>
            <div style={{ width: t.sizing[8], height: t.sizing[8], borderRadius: t.radius.full, backgroundColor: `${t.colors.brand.primary}1a`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.colors.brand.primary, fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.semibold }}>
              {u.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.medium, color: t.semantic.text.primary }}>{u.name}</div>
              <div style={{ fontSize: t.typography.bodyXs.size, color: t.semantic.text.muted }}>{u.email}</div>
            </div>
            <KBadge status={u.role === 'Admin' ? 'info' : 'default'} label={u.role} />
            <KBadge status={u.status === 'Activo' ? 'success' : 'default'} label={u.status} />
            <div style={{ display: 'flex', gap: t.spacing.xs }}>
              <KButton variant="ghost" size="sm" icon={<Edit size={t.icon.xs} />} />
              <KButton variant="ghost" size="sm" icon={<Trash2 size={t.icon.xs} />} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const FilterableListPattern: Pattern = {
  id: 'filterable-list',
  title: 'Lista Filtrable con Acciones',
  description: 'Lista de datos con búsqueda, badges de estado/rol y acciones inline (editar, eliminar).',
  category: 'Datos',
  component: <FilterableListComponent />,
  code: `import { KSearchInput } from '@khor/atoms';
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
