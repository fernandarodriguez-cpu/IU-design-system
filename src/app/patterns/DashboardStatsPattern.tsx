import React, { useState } from 'react';
import { DollarSign, Users, TrendingUp } from 'lucide-react';
import { KStatCard } from '../components/design-system/molecules/KStatCard/index';
import { khorTokens } from '../theme/khor-theme';
import { Pattern } from './types';

const t = khorTokens;
const font = t.typography.fontPrimary;

function DashboardPattern() {
  const [period, setPeriod] = useState('7d');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.md }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: t.typography.bodyLg.size, fontWeight: t.typography.fontWeights.semibold, color: 'var(--foreground)' }}>Resumen del Periodo</h4>
        <div style={{ display: 'flex', gap: t.spacing.xs }}>
          {[{ l: '7D', v: '7d' }, { l: '30D', v: '30d' }, { l: '90D', v: '90d' }].map((p) => (
            <button key={p.v} onClick={() => setPeriod(p.v)} style={{
              padding: `4px ${t.spacing.sm}px`, borderRadius: t.radius.sm, border: 'none', fontSize: 12, fontWeight: t.typography.fontWeights.medium,
              backgroundColor: period === p.v ? t.colors.brand.primary : 'var(--muted)',
              color: period === p.v ? t.colors.feedback.white : 'var(--muted-foreground)', cursor: 'pointer', fontFamily: font,
            }}>{p.l}</button>
          ))}
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: t.spacing.md }}>
        <KStatCard title="Ingresos" value="$48,250" change={12.5} changeLabel="vs. periodo anterior" icon={<DollarSign size={20} />} sparkData={[30, 40, 35, 50, 49, 60, 70, 91]} />
        <KStatCard title="Usuarios" value="1,247" change={8.2} changeLabel="nuevos registros" icon={<Users size={20} />} sparkData={[20, 25, 30, 28, 35, 42, 48, 55]} />
        <KStatCard title="Conversión" value="3.2%" change={-2.1} changeLabel="vs. mes anterior" icon={<TrendingUp size={20} />} sparkData={[40, 38, 42, 35, 30, 32, 28, 25]} />
      </div>
    </div>
  );
}

export const DashboardStatsPattern: Pattern = {
  id: 'dashboard-stats',
  title: 'Dashboard con Stats + Filtros',
  description: 'Panel de métricas con KStatCard, filtros de periodo y sparklines. Ideal para vistas resumen.',
  category: 'Dashboard',
  component: <DashboardPattern />,
  code: `import { KStatCard } from '@khor/molecules';

// Stats con sparklines y filtro de periodo
<KStatCard title="Ingresos" value="$48,250" change={12.5}
  changeLabel="vs. periodo anterior"
  icon={<DollarSign size={20} />}
  sparkData={[30, 40, 35, 50, 49, 60, 70, 91]}
/>`,
};
