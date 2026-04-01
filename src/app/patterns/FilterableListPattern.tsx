import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { KButton } from '../components/design-system/atoms/KButton/index';
import { KBadge } from '../components/design-system/atoms/KBadge/index';
import { KSearchInput } from '../components/design-system/molecules/KSearchInput/index';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <KSearchInput placeholder="Buscar usuarios..." value={search} onChange={setSearch} />
        </div>
        <KButton variant="primary" icon={<Plus size={16} />} size="sm">Nuevo</KButton>
      </div>
      <div style={{ borderRadius: t.radius.lg, border: '1px solid var(--border)', overflow: 'hidden' }}>
        {filtered.map((u, i) => (
          <div key={u.id} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
            borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
            backgroundColor: 'var(--card)',
          }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'rgba(224,77,54,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.colors.brand.primary, fontSize: 13, fontWeight: 600 }}>
              {u.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)' }}>{u.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>{u.email}</div>
            </div>
            <KBadge status={u.role === 'Admin' ? 'info' : 'default'} label={u.role} />
            <KBadge status={u.status === 'Activo' ? 'success' : 'default'} label={u.status} />
            <div style={{ display: 'flex', gap: 4 }}>
              <KButton variant="ghost" size="sm" icon={<Edit size={14} />} />
              <KButton variant="ghost" size="sm" icon={<Trash2 size={14} />} />
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
