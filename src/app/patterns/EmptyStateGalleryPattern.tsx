import React from 'react';
import { 
  Plus, SearchX, CloudOff, ArrowRight, LayoutGrid, Sparkles, Rocket
} from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';

// Atomic and Molecular imports
import { KButton, KTag } from '../components/design-system/atoms/index';
import { KEmptyState } from '../components/design-system/molecules/index';

const t = khorTokens;

function EmptyStateGalleryInternal() {
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
        <KEmptyState 
          icon={<Rocket size={t.icon.xl} style={{ color: t.colors.brand.primary }} />}
          title="Comienza tu primera aventura"
          description="Aún no tienes proyectos creados. Crea tu primer espacio de trabajo para empezar a gestionar a tu equipo."
          actions={<KButton variant="primary" icon={<Plus size={t.icon.sm} />}>Crear Proyecto</KButton>}
        />
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

      {/* 3. Connection Error (Error State) */}
      <div style={{ 
        padding: t.spacing.xl, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, 
        borderRadius: t.radius.lg, boxShadow: t.shadows.sm, textAlign: 'center' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: t.spacing.lg }}>
          <span style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.bold, color: t.semantic.text.muted }}>ERROR STATE</span>
          <KTag color="error">MODO: OFFLINE</KTag>
        </div>
        <KEmptyState 
          icon={<CloudOff size={t.icon.xl} style={{ color: t.colors.feedback.error }} />}
          title="Error de conexión"
          description="No podemos conectar con el servidor en este momento. Por favor, verifica tu conexión a internet."
          actions={<KButton variant="outline" size="sm" icon={<ArrowRight size={t.icon.sm} />}>Intentar de nuevo</KButton>}
        />
      </div>

      {/* 4. Feature Locked (Paywall State) */}
      <div style={{ 
        padding: t.spacing.xl, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, 
        borderRadius: t.radius.lg, boxShadow: t.shadows.sm, textAlign: 'center', position: 'relative', overflow: 'hidden' 
      }}>
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, height: t.spacing.xxs, 
          background: `linear-gradient(90deg, ${t.colors.brand.primary}, ${t.colors.brand.accent})` 
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: t.spacing.lg }}>
          <span style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.bold, color: t.semantic.text.muted }}>UPGRADE STATE</span>
          <KTag color="primary">MODO: LOCKED</KTag>
        </div>
        <KEmptyState 
          icon={
            <div style={{ 
              position: 'relative', width: t.sizing[16], height: t.sizing[16], margin: '0 auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: t.semantic.surface.raised, borderRadius: t.radius.lg
            }}>
              <LayoutGrid size={t.icon.lg} style={{ color: t.semantic.text.muted }} />
              <div style={{ 
                position: 'absolute', top: -t.spacing.sm, right: -t.spacing.sm, padding: t.spacing.xs, 
                backgroundColor: t.semantic.surface.card, borderRadius: t.radius.full, border: `1px solid ${t.semantic.border.default}`,
                boxShadow: t.shadows.sm
              }}>
                <Sparkles size={t.icon.sm} style={{ color: t.colors.brand.primary }} />
              </div>
            </div>
          }
          title="Estadísticas Avanzadas"
          description="Esta funcionalidad está reservada para usuarios con plan Enterprise. Mejora hoy para desbloquear métricas predictivas."
          actions={<KButton variant="primary" size="lg">Mejorar a Enterprise</KButton>}
        />
      </div>
    </div>
  );
}

import { Pattern } from './types';

export const EmptyStateGalleryPattern: Pattern = {
  id: 'saas-empty-states',
  title: 'Galería de Estados Vacíos',
  description: 'Colección de patrones para manejar estados de carga, errores de conexión, búsquedas sin resultados y paywalls de suscripción. Mejora la resiliencia de la interfaz.',
  category: 'SaaS',
  component: <EmptyStateGalleryInternal />,
  code: `<KEmptyState 
  title="Sin resultados" 
  actions={<KButton>Reintentar</KButton>} 
/>`
};
