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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
      {/* 1. Initial State (No Data) */}
      <div style={{ 
        padding: 32, backgroundColor: 'var(--card)', border: '1px solid var(--border)', 
        borderRadius: 24, boxShadow: t.shadows.sm, textAlign: 'center' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted-foreground)' }}>INITIAL STATE</span>
          <KTag color="primary">MODO: EMPTY</KTag>
        </div>
        <KEmptyState 
          icon={<Rocket size={48} style={{ color: t.colors.brand.primary }} />}
          title="Comienza tu primera aventura"
          description="Aún no tienes proyectos creados. Crea tu primer espacio de trabajo para empezar a gestionar a tu equipo."
          actions={<KButton variant="primary" icon={<Plus size={16} />}>Crear Proyecto</KButton>}
        />
      </div>

      {/* 2. No Results (Search State) */}
      <div style={{ 
        padding: 32, backgroundColor: 'var(--card)', border: '1px solid var(--border)', 
        borderRadius: 24, boxShadow: t.shadows.sm, textAlign: 'center' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted-foreground)' }}>SEARCH STATE</span>
          <KTag color="warning">MODO: NOT FOUND</KTag>
        </div>
        <KEmptyState 
          icon={<SearchX size={48} style={{ color: t.colors.feedback.warning }} />}
          title="Sin resultados para 'Khor Guard'"
          description="No pudimos encontrar nada que coincida con tu búsqueda. Intenta con palabras clave más generales."
          actions={<KButton variant="outline" size="sm">Limpiar Filtros</KButton>}
        />
      </div>

      {/* 3. Connection Error (Error State) */}
      <div style={{ 
        padding: 32, backgroundColor: 'var(--card)', border: '1px solid var(--border)', 
        borderRadius: 24, boxShadow: t.shadows.sm, textAlign: 'center' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted-foreground)' }}>ERROR STATE</span>
          <KTag color="error">MODO: OFFLINE</KTag>
        </div>
        <KEmptyState 
          icon={<CloudOff size={48} style={{ color: t.colors.feedback.error }} />}
          title="Error de conexión"
          description="No podemos conectar con el servidor en este momento. Por favor, verifica tu conexión a internet."
          actions={<KButton variant="outline" size="sm" icon={<ArrowRight size={14} />}>Intentar de nuevo</KButton>}
        />
      </div>

      {/* 4. Feature Locked (Paywall State) */}
      <div style={{ 
        padding: 32, backgroundColor: 'var(--card)', border: '1px solid var(--border)', 
        borderRadius: 24, boxShadow: t.shadows.sm, textAlign: 'center', position: 'relative', overflow: 'hidden' 
      }}>
        <div style={{ 
          position: 'absolute', top: 0, left: 0, right: 0, height: 4, 
          background: `linear-gradient(90deg, ${t.colors.brand.primary}, ${t.colors.brand.accent})` 
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted-foreground)' }}>UPGRADE STATE</span>
          <KTag color="primary">MODO: LOCKED</KTag>
        </div>
        <KEmptyState 
          icon={
            <div style={{ 
              position: 'relative', width: 64, height: 64, margin: '0 auto',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backgroundColor: 'var(--muted)', borderRadius: 16
            }}>
              <LayoutGrid size={32} style={{ color: 'var(--muted-foreground)' }} />
              <div style={{ 
                position: 'absolute', top: -10, right: -10, padding: 6, 
                backgroundColor: 'var(--card)', borderRadius: '50%', border: '1px solid var(--border)',
                boxShadow: t.shadows.sm
              }}>
                <Sparkles size={16} style={{ color: t.colors.brand.primary }} />
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
