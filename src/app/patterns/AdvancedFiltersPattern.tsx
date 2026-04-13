import React from 'react';
import { 
  Search, SearchX, Filter, Download, Calendar, MoreHorizontal, 
  Zap, LayoutGrid, List, CloudOff
} from 'lucide-react';
import { 
  KButton, KTag, KSearchInput, KInput, KBadge, KCheckbox, KAvatar 
} from '../components/design-system/atoms/index';
// Molecules and Organisms
import { KFormField, KSelectField, KEmptyState } from '../components/design-system/molecules/index';
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: t.spacing.lg }}>
      {/* 1. Initial State (No Data) */}
      <div style={{ 
        padding: t.spacing.xl, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, 
        borderRadius: t.radius.lg, boxShadow: t.shadows.sm, textAlign: 'center' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: t.spacing.lg }}>
          <span style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.bold, color: t.semantic.text.muted }}>INITIAL STATE</span>
          <KTag color="primary">MODO: EMPTY</KTag>
        </div>
        <KFormField label="Búsqueda avanzada" hint="Busca por nombre, ID o correo electrónico">
          <KInput placeholder="Ej: Khor Guard..." />
        </KFormField>
      </div>

      {/* 2. No Results (Search State) */}
      <div style={{ 
        padding: t.spacing.xl, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, 
        borderRadius: t.radius.lg, boxShadow: t.shadows.sm, textAlign: 'center' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: t.spacing.lg }}>
          <span style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.bold, color: t.semantic.text.muted }}>SEARCH STATE</span>
          <KTag color="warning">MODO: NOT FOUND</KTag>
        </div>
        <KEmptyState 
          icon={<SearchX size={t.icon.xl} style={{ color: t.colors.feedback.warning }} />}
          title="Sin resultados para 'Khor Guard'"
          description="No pudimos encontrar nada que coincida con tu búsqueda. Intenta con palabras clave más generales."
          actions={<KButton variant="outline" size="sm">Limpiar Filtros</KButton>}
        />
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: t.spacing.xs, paddingRight: t.spacing.xs }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.sm }}>
          <h3 style={{ margin: 0, fontSize: t.typography.bodyLg.size, fontWeight: t.typography.fontWeights.bold }}>Resultados <span style={{ opacity: 0.5, fontWeight: t.typography.fontWeights.regular }}>(128)</span></h3>
          <KBadge count={12} color="navy" />
        </div>
        <div style={{ display: 'flex', gap: t.spacing.sm }}>
          <KButton variant="outline" size="sm" icon={<Download size={t.icon.sm} />}>Exportar</KButton>
          <div style={{ width: '1px', height: t.sizing[6], backgroundColor: t.semantic.border.default, marginLeft: t.spacing.md, marginRight: t.spacing.md }} />
          <KButton variant="ghost" size="sm" icon={<LayoutGrid size={t.icon.sm} />} />
          <KButton variant="secondary" size="sm" icon={<List size={t.icon.sm} />} />
        </div>
      </div>

      {/* Grid of Results (Mini Cards) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: t.spacing.md }}>
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} style={{ 
            padding: t.spacing.md, borderRadius: t.radius.lg, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`,
            display: 'flex', flexDirection: 'column', gap: t.spacing.md, transition: 'all 0.2s hover', cursor: 'pointer'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <KAvatar name={`User ${i}`} size="md" />
              <KCheckbox />
            </div>
            <div>
              <div style={{ fontWeight: t.typography.fontWeights.bold, fontSize: t.typography.bodyMd.size }}>Terminal Node {i}</div>
              <div style={{ fontSize: t.typography.bodySm.size, color: t.semantic.text.muted }}>dc-cluster-0{i}.khor.cloud</div>
            </div>
            <div style={{ display: 'flex', gap: t.spacing.xs }}>
              <KTag color={i % 2 === 0 ? 'success' : 'warning'} bordered={false}>
                {i % 2 === 0 ? 'Online' : 'Syncing'}
              </KTag>
              <KTag color="default" bordered={false}>v4.0.{i}</KTag>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: t.spacing.sm, paddingTop: t.spacing.sm, borderTop: `1px dotted ${t.semantic.border.muted}` }}>
              <div style={{ fontSize: t.typography.bodyXs.size, color: t.semantic.text.muted }}>Last seen: 2m ago</div>
              <KButton variant="ghost" size="sm" icon={<MoreHorizontal size={t.icon.sm} />} />
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
