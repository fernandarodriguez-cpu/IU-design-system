import React from 'react';
import { 
  TrendingUp, Users, DollarSign, Activity, 
  ArrowUpRight, ArrowDownRight, MoreHorizontal,
  Calendar, Layers, Zap, Clock, Bell, UserPlus, Plus,
  Shield, Server, HardDrive, Cpu
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  KButton, KText, KBadge, KAvatar, KProgress, KTag, KDivider 
} from '../components/design-system/atoms/index';
import { KRow, KCol, KFlex } from '../components/design-system/atoms/index';
import { KStatCard, KNavItem } from '../components/design-system/molecules/index';
import { KDataTable, KSparklineCell } from '../components/design-system/organisms/index';
import { khorTokens } from '../theme/khor-theme';
import { staggerContainer, fadeInUp, hoverScale } from '../theme/animations';

const t = khorTokens;

const recentActivity = [
  { id: '1', user: 'Marcos Reus', action: 'creó nuevo despliegue', target: 'khor-api-v2', time: 'hace 2 min', status: 'success' },
  { id: '2', user: 'Ana Smith', action: 'actualizó billing', target: 'Enterprise Plan', time: 'hace 15 min', status: 'info' },
  { id: '3', user: 'Sistema', action: 'pico de tráfico detectado', target: 'Cluster US-East', time: 'hace 40 min', status: 'warning' },
];

const infrastructureData = [
  { id: '1', name: 'Alpha-Cluster-01', region: 'US-East-1', status: 'Running', load: 68, health: 98, uptime: '142d', trend: [65, 70, 68, 72, 65, 68] },
  { id: '2', name: 'Beta-Worker-05', region: 'EU-West-2', status: 'Idle', load: 12, health: 100, uptime: '45d', trend: [10, 12, 10, 15, 12, 12] },
  { id: '3', name: 'Gamma-DB-Master', region: 'AS-South-1', status: 'Running', load: 45, health: 94, uptime: '210d', trend: [40, 42, 48, 45, 44, 45] },
  { id: '4', name: 'Delta-Cache-01', region: 'US-East-1', status: 'Warning', load: 89, health: 78, uptime: '12d', trend: [80, 85, 88, 92, 89, 89] },
  { id: '5', name: 'Zeta-Proxy-LB', region: 'EU-Central-1', status: 'Running', load: 32, health: 99, uptime: '89d', trend: [30, 35, 32, 28, 30, 32] },
];

const infraColumns = [
  { 
    accessorKey: 'name', 
    header: 'Instancia',
    cell: (info: any) => (
      <KFlex align="center" gap={12}>
        <div className="p-2 bg-khor-neutral-100 rounded-lg text-khor-primary"><Server size={14} /></div>
        <KText strong>{info.getValue()}</KText>
      </KFlex>
    )
  },
  { accessorKey: 'region', header: 'Región' },
  { 
    accessorKey: 'status', 
    header: 'Estado',
    cell: (info: any) => (
      <KBadge 
        status={info.getValue() === 'Running' ? 'success' : info.getValue() === 'Warning' ? 'warning' : 'default'} 
        text={info.getValue()} 
      />
    )
  },
  { 
    accessorKey: 'load', 
    header: 'Carga',
    cell: (info: any) => (
      <div className="w-24">
        <KProgress value={info.getValue()} size="sm" showInfo={false} />
      </div>
    )
  },
  {
    id: 'health',
    header: 'Salud',
    cell: (info: any) => <KSparklineCell data={info.row.original.trend} width={60} height={30} />
  }
];

function SaaSDashboardInternal() {
  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      {/* Header with Welcome and Profile */}
      <motion.div variants={fadeInUp}>
        <KFlex 
          justify="space-between" 
          align="center" 
          vertical={{ xs: true, md: false }}
          gap={{ xs: 'middle', md: 'large' }}
          style={{ 
            padding: '24px 32px', backgroundColor: 'var(--card)', border: '1px solid var(--border)', 
            borderRadius: 24, boxShadow: t.shadows.sm 
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 900, letterSpacing: -1 }}>Bienvenido, Dani</h2>
            <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--muted-foreground)' }}>Resumen de operaciones tácticas para hoy.</p>
          </div>
          <KFlex align="center" gap={16}>
            <KButton variant="ghost" icon={<Bell size={20} />} />
            <div style={{ width: 1, height: 24, backgroundColor: 'var(--border)' }} className="k-show-md" />
            <KFlex align="center" gap={12}>
              <div style={{ textAlign: 'right' }} className="k-show-md">
                <div style={{ fontSize: 14, fontWeight: 700 }}>Dani Khor</div>
                <div style={{ fontSize: 11, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: 1 }}>Admin Pro</div>
              </div>
              <KAvatar name="Dani Khor" />
            </KFlex>
          </KFlex>
        </KFlex>
      </motion.div>

      {/* KPI Stats Grid */}
      <KRow gutter={[16, 16]}>
        {[
          { title: "MRR Total", value: "$45,200", change: 12.5, label: "vs. mes anterior", icon: <DollarSign size={20} />, spark: [30, 45, 35, 50, 48, 60, 55] },
          { title: "Usuarios Activos", value: "2,450", change: 8.2, label: "registros hoy", icon: <Users size={20} />, spark: [20, 25, 30, 28, 35, 40, 38] },
          { title: "Tasa de Churn", value: "1.2%", change: -0.5, label: "mejorando", icon: <ArrowDownRight size={20} />, spark: [15, 14, 16, 13, 12, 11, 10] },
          { title: "NPS Score", value: "78", change: 5, label: "puntos arriba", icon: <TrendingUp size={20} />, spark: [60, 65, 62, 70, 72, 75, 78] }
        ].map((stat, i) => (
          <KCol key={i} span={24} sm={12} xl={6}>
            <motion.div 
              variants={fadeInUp} 
              whileHover={{ scale: 1.02, y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              <KStatCard 
                title={stat.title} 
                value={stat.value} 
                change={stat.change} 
                changeLabel={stat.label} 
                icon={stat.icon}
                sparkData={stat.spark}
              />
            </motion.div>
          </KCol>
        ))}
      </KRow>

      {/* Main Content Area */}
      <KRow gutter={[24, 24]}>
        {/* Managed Infrastructure Table */}
        <KCol span={24} lg={16} xl={17}>
          <motion.div 
            variants={fadeInUp}
            style={{ 
              padding: 24, borderRadius: 24, backgroundColor: 'var(--card)', border: '1px solid var(--border)', 
              boxShadow: t.shadows.sm, display: 'flex', flexDirection: 'column', gap: 20, minHeight: 400
            }}
          >
            <KFlex justify="space-between" align="center" vertical={{ xs: true, sm: false }} gap="middle">
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Gestión de Infraestructura</h3>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted-foreground)' }}>Clusters críticos en tiempo real.</p>
              </div>
              <KButton variant="primary" size="sm" icon={<Plus size={16} />}>Desplegar Nodo</KButton>
            </KFlex>

            <div style={{ overflowX: 'auto' }}>
              <KDataTable 
                columns={infraColumns}
                data={infrastructureData}
                size="small"
                className="border-none shadow-none"
                rowExpansion={{
                  expandedRowRender: (record: any) => (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4 bg-khor-neutral-50/50 rounded-xl m-2 border border-dashed">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-khor-neutral-400">Recursos Asignados</span>
                        <div className="flex items-center gap-2 text-xs font-bold"><Cpu size={12}/> 8 vCPU</div>
                        <div className="flex items-center gap-2 text-xs font-bold"><HardDrive size={12}/> 32GB RAM</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-khor-neutral-400">Uptime Total</span>
                        <div className="flex items-center gap-2 text-xs font-bold"><Clock size={12}/> {record.uptime}</div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase font-bold text-khor-neutral-400">ID de Instancia</span>
                        <div className="text-xs font-mono text-khor-primary truncate">i-0a2b3c4d5e6f7g8h9</div>
                      </div>
                    </div>
                  )
                }}
              />
            </div>
          </motion.div>
        </KCol>

        {/* Sidebar: Activity & Team */}
        <KCol span={24} lg={8} xl={7}>
          <KFlex vertical gap={24}>
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              style={{ padding: 24, borderRadius: 24, backgroundColor: 'var(--card)', border: '1px solid var(--border)', boxShadow: t.shadows.sm }}
            >
              <h4 style={{ margin: '0 0 16px', fontSize: 16, fontWeight: 800 }}>Actividad Reciente</h4>
              <KFlex vertical gap={20}>
                {recentActivity.map(act => (
                  <KFlex key={act.id} gap={12} align="flex-start">
                    <div style={{ 
                      width: 8, height: 8, borderRadius: '50%', marginTop: 6, flexShrink: 0,
                      backgroundColor: t.colors.feedback[act.status as 'success' | 'info' | 'warning'] || t.colors.neutral[300]
                    }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{act.user} <span style={{ fontWeight: 400, color: 'var(--muted-foreground)' }}>{act.action}</span></div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: t.colors.brand.primary, marginTop: 2 }}>{act.target}</div>
                      <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 4 }}>{act.time}</div>
                    </div>
                  </KFlex>
                ))}
              </KFlex>
              <KButton variant="ghost" block size="sm" style={{ marginTop: 16 }}>Ver todo el log</KButton>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              style={{ padding: 24, borderRadius: 24, backgroundColor: 'var(--card)', border: '1px solid var(--border)', boxShadow: t.shadows.sm }}
            >
              <KFlex justify="space-between" align="center" style={{ marginBottom: 16 }}>
                <h4 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Equipo Online</h4>
                <KBadge count={4} color="success" />
              </KFlex>
              <KFlex gap={8} wrap="wrap">
                <KAvatar name="Juan Perez" status="online" size="sm" />
                <KAvatar name="Marta Garcia" status="online" size="sm" />
                <KAvatar name="Luis Rodriguez" status="online" size="sm" />
                <KAvatar name="Sofia Martinez" status="online" size="sm" />
                <KButton shape="circle" variant="outline" size="sm" icon={<UserPlus size={14} />} />
              </KFlex>
            </motion.div>
          </KFlex>
        </KCol>
      </KRow>
    </motion.div>
  );
}

import { Pattern } from './types';

export const SaaSDashboardPattern: Pattern = {
  id: 'saas-dashboard',
  title: 'Dashboard Principal SaaS',
  description: 'Interfaz central de mando avanzada con KPIs animados, gestión de infraestructura vía KDataTable (Wave 11) y micro-interacciones premium.',
  category: 'SaaS',
  component: <SaaSDashboardInternal />,
  code: `<KStatCard 
  title="MRR" 
  value="$45k" 
  change={12.5} 
/>`
};
