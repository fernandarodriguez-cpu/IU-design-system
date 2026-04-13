import React from 'react';
import { 
  Search, Filter, Download, Calendar, MoreHorizontal, 
  Zap, LayoutGrid, List
} from 'lucide-react';
import { 
  KButton, KInput, KBadge, KTag, KCheckbox, KAvatar 
} from '../components/design-system/atoms/index';
// KSelectField is a molecule
import { KFormField, KSelectField } from '../components/design-system/molecules/index';
import { khorTokens } from '../theme/khor-theme';

const t = khorTokens;

function AdvancedFiltersInternal() {
  const [activeFilters, setActiveFilters] = React.useState([
    { id: '1', label: 'Estado: Activo', type: 'status' },
    { id: '2', label: 'Plan: Enterprise', type: 'plan' },
    { id: '3', label: 'Región: LATAM', type: 'region' }
  ]);

  const removeFilter = (id: string) => {
    setActiveFilters(activeFilters.filter(f => f.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Search and Filters Bar */}
      <div style={{ 
        padding: 24, borderRadius: 24, backgroundColor: 'var(--card)', border: `1px solid var(--border)`,
        boxShadow: t.shadows.sm, display: 'flex', flexDirection: 'column', gap: 20
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <div style={{ flex: 4 }}>
            <KFormField label="Búsqueda avanzada" hint="Busca por nombre, ID o correo electrónico">
              <KInput placeholder="Ej: Khor Guard..." />
            </KFormField>
          </div>
          <div style={{ flex: 2 }}>
            <KFormField label="Estado">
              <KSelectField 
                placeholder="Todos los estados"
                options={[
                  { label: 'Activo', value: 'active' },
                  { label: 'Pendiente', value: 'pending' },
                  { label: 'Inactivo', value: 'inactive' },
                ]}
              />
            </KFormField>
          </div>
          <div style={{ flex: 2 }}>
            <KFormField label="Fecha">
              <KInput type="date" />
            </KFormField>
          </div>
          <KButton variant="navy" icon={<Filter size={18} />} style={{ height: 42 }}>Filtrar</KButton>
        </div>

        {/* Active Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted-foreground)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Zap size={14} /> Filtros activos:
          </span>
          {activeFilters.map(filter => (
            <KTag 
              key={filter.id} 
              color="primary" 
              closable 
              onClose={() => removeFilter(filter.id)}
            >
              {filter.label}
            </KTag>
          ))}
          {activeFilters.length > 0 && (
            <KButton variant="ghost" size="sm" onClick={() => setActiveFilters([])} style={{ fontSize: 12, height: 24 }}>Limpiar todo</KButton>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 8, paddingRight: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Resultados <span style={{ opacity: 0.5, fontWeight: 400 }}>(128)</span></h3>
          <KBadge count={12} color="navy" />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <KButton variant="outline" size="sm" icon={<Download size={14} />}>Exportar</KButton>
          <div style={{ width: 1, height: 24, backgroundColor: 'var(--border)', marginLeft: 16, marginRight: 16 }} />
          <KButton variant="ghost" size="sm" icon={<LayoutGrid size={14} />} />
          <KButton variant="secondary" size="sm" icon={<List size={14} />} />
        </div>
      </div>

      {/* Grid of Results (Mini Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} style={{ 
            padding: 20, borderRadius: 20, backgroundColor: 'var(--card)', border: '1px solid var(--border)',
            display: 'flex', flexDirection: 'column', gap: 16, transition: 'all 0.2s hover', cursor: 'pointer'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <KAvatar name={`User ${i}`} size="md" />
              <KCheckbox />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Terminal Node {i}</div>
              <div style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>dc-cluster-0{i}.khor.cloud</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <KTag color={i % 2 === 0 ? 'success' : 'warning'} bordered={false}>
                {i % 2 === 0 ? 'Online' : 'Syncing'}
              </KTag>
              <KTag color="default" bordered={false}>v4.0.{i}</KTag>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingTop: 12, borderTop: '1px dotted var(--border)' }}>
              <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Last seen: 2m ago</div>
              <KButton variant="ghost" size="sm" icon={<MoreHorizontal size={16} />} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Pattern } from './types';

export const AdvancedFiltersPattern: Pattern = {
  id: 'saas-filters',
  title: 'Explorador con Filtros Avanzados',
  description: 'Sistema de búsqueda y filtrado dinámico para grandes conjuntos de datos. Incluye gestión de tags activos, selectores inteligentes y visualización en grid.',
  category: 'SaaS',
  component: <AdvancedFiltersInternal />,
  code: `<KFormField label="Estado">
  <KSelectField options={[...]} />
</KFormField>`
};
