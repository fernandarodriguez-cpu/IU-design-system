import React from 'react';
import { 
  TrendingUp, Users, DollarSign, Activity, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Calendar, Layers, Zap, Clock, Bell, UserPlus
} from 'lucide-react';
import { 
  KButton, KText, KBadge, KAvatar, KProgress, KTag, KDivider 
} from '../components/design-system/atoms/index';
import { KStatCard, KNavItem } from '../components/design-system/molecules/index';
import { KDataTable, KSparklineCell } from '../components/design-system/organisms/index';
import { khorTokens } from '../theme/khor-theme';

const t = khorTokens;

const recentActivity = [
  { id: '1', user: 'Marcos Reus', action: 'creó nuevo despliegue', target: 'khor-api-v2', time: 'hace 2 min', status: 'success' },
  { id: '2', user: 'Ana Smith', action: 'actualizó billing', target: 'Enterprise Plan', time: 'hace 15 min', status: 'info' },
  { id: '3', user: 'Sistema', action: 'pico de tráfico detectado', target: 'Cluster US-East', time: 'hace 40 min', status: 'warning' },
];

function SaaSDashboardInternal() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header with Welcome and Profile */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '24px 32px', backgroundColor: 'var(--card)', border: '1px solid var(--border)', 
        borderRadius: 24, boxShadow: t.shadows.sm 
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800 }}>Bienvenido, Dani</h2>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--muted-foreground)' }}>Aquí tienes el resumen de tu organización para hoy.</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <KButton variant="ghost" icon={<Bell size={20} />} />
          <div style={{ width: 1, height: 24, backgroundColor: 'var(--border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Dani Khor</div>
              <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>Admin Pro</div>
            </div>
            <KAvatar name="Dani Khor" />
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <KStatCard 
          title="MRR Total" 
          value="$45,200" 
          change={12.5} 
          changeLabel="vs. mes anterior" 
          icon={<DollarSign size={20} />}
          sparkData={[30, 45, 35, 50, 48, 60, 55]}
        />
        <KStatCard 
          title="Usuarios Activos" 
          value="2,450" 
          change={8.2} 
          changeLabel="registros hoy" 
          icon={<Users size={20} />}
          sparkData={[20, 25, 30, 28, 35, 40, 38]}
        />
        <KStatCard 
          title="Tasa de Churn" 
          value="1.2%" 
          change={-0.5} 
          changeLabel="mejorando" 
          icon={<ArrowDownRight size={20} />}
          sparkData={[15, 14, 16, 13, 12, 11, 10]}
        />
        <KStatCard 
          title="NPS Score" 
          value="78" 
          change={5} 
          changeLabel="puntos arriba" 
          icon={<TrendingUp size={20} />}
          sparkData={[60, 65, 62, 70, 72, 75, 78]}
        />
      </div>

      {/* Main Analysis Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>
        {/* Performance Graph Placeholder */}
        <div style={{ 
          padding: 32, borderRadius: 24, backgroundColor: 'var(--card)', border: '1px solid var(--border)', 
          boxShadow: t.shadows.sm, display: 'flex', flexDirection: 'column' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Rendimiento de Infraestructura</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <KButton variant="outline" size="sm">7D</KButton>
              <KButton variant="secondary" size="sm">1M</KButton>
            </div>
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>Disponibilidad de API</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#4ADE80' }}>99.98%</span>
              </div>
              <KProgress value={99.98} status="success" showInfo={false} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 700 }}>Uso de Recursos (Cluster Alpha)</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: t.colors.brand.primary }}>84%</span>
              </div>
              <KProgress value={84} status="active" showInfo={false} />
            </div>
            
            <div style={{ marginTop: 12, padding: 20, borderRadius: 16, backgroundColor: 'var(--muted)', display: 'flex', gap: 16, alignItems: 'center' }}>
              <Zap size={24} style={{ color: t.colors.feedback.warning }} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>Optimización Sugerida</div>
                <div style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>Puedes reducir costos apagando 3 instancias inactivas en US-West.</div>
              </div>
              <KButton variant="primary" size="sm" style={{ marginLeft: 'auto' }}>Optimizar</KButton>
            </div>
          </div>
        </div>

        {/* Sidebar: Activity & Team */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ padding: 24, borderRadius: 24, backgroundColor: 'var(--card)', border: '1px solid var(--border)', boxShadow: t.shadows.sm }}>
            <h4 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 800 }}>Actividad Reciente</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {recentActivity.map(act => (
                <div key={act.id} style={{ display: 'flex', gap: 12 }}>
                  <div style={{ 
                    width: 8, height: 8, borderRadius: '50%', marginTop: 6,
                    backgroundColor: t.colors.feedback[act.status as 'success' | 'info' | 'warning'] || t.colors.neutral[300]
                  }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{act.user} <span style={{ fontWeight: 400, color: 'var(--muted-foreground)' }}>{act.action}</span></div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: t.colors.brand.primary, marginTop: 2 }}>{act.target}</div>
                    <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 4 }}>{act.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <KButton variant="ghost" block size="sm" style={{ marginTop: 16 }}>Ver todo el log</KButton>
          </div>

          <div style={{ padding: 24, borderRadius: 24, backgroundColor: 'var(--card)', border: '1px solid var(--border)', boxShadow: t.shadows.sm }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Equipo Online</h4>
              <KBadge count={4} color="success" />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <KAvatar name="Juan Perez" status="online" size="sm" />
              <KAvatar name="Marta Garcia" status="online" size="sm" />
              <KAvatar name="Luis Rodriguez" status="online" size="sm" />
              <KAvatar name="Sofia Martinez" status="online" size="sm" />
              <KButton shape="circle" variant="outline" size="sm" icon={<UserPlus size={14} />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Pattern } from './types';

export const SaaSDashboardPattern: Pattern = {
  id: 'saas-dashboard',
  title: 'Dashboard Principal SaaS',
  description: 'Interfaz central de mando con métricas clave (KPIs), visualización de rendimiento en tiempo real, feed de actividad y gestión de equipo online.',
  category: 'SaaS',
  component: <SaaSDashboardInternal />,
  code: `<KStatCard 
  title="MRR" 
  value="$45k" 
  change={12.5} 
/>`
};
