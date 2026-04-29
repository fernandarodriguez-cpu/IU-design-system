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
      <KFlex align="center" gap={t.spacing.sm}>
        <div style={{ padding: t.spacing.xs, backgroundColor: t.semantic.surface.raised, borderRadius: t.radius.md, color: t.colors.brand.primary, display: 'flex', alignItems: 'center' }}>
          <Server size={t.icon.xs} />
        </div>
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
      <div style={{ width: t.sizing[24] }}>
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
      style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.lg }}
    >
      {/* Header with Welcome and Profile */}
      <motion.div variants={fadeInUp}>
        <KFlex 
          justify="space-between" 
          align="center" 
          vertical={{ xs: true, md: false }}
          gap={{ xs: 'middle', md: 'large' }}
          style={{ 
            padding: `${t.spacing.lg}px ${t.spacing.xl}px`, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, 
            borderRadius: t.radius.lg, boxShadow: t.shadows.sm 
          }}
        >
          <div>
            <h2 style={{ margin: 0, fontSize: t.typography.display1.size, fontWeight: t.typography.fontWeights.extrabold, letterSpacing: t.typography.letterSpacing.tight }}>Bienvenido, Alex</h2>
            <p style={{ margin: `${t.spacing.xs}px 0 0`, fontSize: t.typography.bodySm.size, color: t.semantic.text.muted }}>Resumen de operaciones tácticas para hoy.</p>
          </div>
          <KFlex align="center" gap={t.spacing.md}>
            <KButton variant="ghost" icon={<Bell size={t.icon.md} />} />
            <div style={{ width: 1, height: t.sizing[6], backgroundColor: t.semantic.border.default }} className="k-show-md" />
            <KFlex align="center" gap={t.spacing.sm}>
              <div style={{ textAlign: 'right' }} className="k-show-md">
                <div style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.bold }}>Alex Mercer</div>
                <div style={{ fontSize: t.typography.bodyXs.size, color: t.semantic.text.muted, textTransform: 'uppercase', letterSpacing: t.typography.letterSpacing.wide }}>Admin Pro</div>
              </div>
              <KAvatar name="Alex Mercer" />
            </KFlex>
          </KFlex>
        </KFlex>
      </motion.div>

      {/* KPI Stats Grid */}
      <KRow gutter={[t.spacing.md, t.spacing.md]}>
        {[
          { title: "MRR Total", value: "$45,200", change: 12.5, label: "vs. mes anterior", icon: <DollarSign size={t.icon.md} />, spark: [30, 45, 35, 50, 48, 60, 55] },
          { title: "Usuarios Activos", value: "2,450", change: 8.2, label: "registros hoy", icon: <Users size={t.icon.md} />, spark: [20, 25, 30, 28, 35, 40, 38] },
          { title: "Tasa de Churn", value: "1.2%", change: -0.5, label: "mejorando", icon: <ArrowDownRight size={t.icon.md} />, spark: [15, 14, 16, 13, 12, 11, 10] },
          { title: "NPS Score", value: "78", change: 5, label: "puntos arriba", icon: <TrendingUp size={t.icon.md} />, spark: [60, 65, 62, 70, 72, 75, 78] }
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
      <KRow gutter={[t.spacing.lg, t.spacing.lg]}>
        {/* Managed Infrastructure Table */}
        <KCol span={24} lg={16} xl={17}>
          <motion.div 
            variants={fadeInUp}
            style={{ 
              padding: t.spacing.lg, borderRadius: t.radius.lg, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, 
              boxShadow: t.shadows.sm, display: 'flex', flexDirection: 'column', gap: t.spacing.md, minHeight: 480
            }}
          >
            <KFlex justify="space-between" align="center" vertical={{ xs: true, sm: false }} gap="middle">
              <div>
                <h3 style={{ margin: 0, fontSize: t.typography.h4.size, fontWeight: t.typography.fontWeights.extrabold }}>Gestión de Infraestructura</h3>
                <p style={{ margin: `${t.spacing.xs}px 0 0`, fontSize: t.typography.bodySm.size, color: t.semantic.text.muted }}>Clusters críticos en tiempo real.</p>
              </div>
              <KButton variant="primary" size="sm" icon={<Plus size={t.icon.sm} />}>Desplegar Nodo</KButton>
            </KFlex>

            <div style={{ overflowX: 'auto' }}>
              <KDataTable 
                columns={infraColumns}
                data={infrastructureData}
                size="small"
                className="border-none shadow-none"
                rowExpansion={{
                  expandedRowRender: (record: any) => (
                    <div style={{ 
                      display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
                      gap: t.spacing.lg, padding: t.spacing.md, backgroundColor: `${t.colors.neutral[50]}80`, 
                      borderRadius: t.radius.md, margin: t.spacing.xs, border: `1px dashed ${t.semantic.border.default}`
                    }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.xxs }}>
                        <span style={{ fontSize: t.typography.bodyXs.size, textTransform: 'uppercase', fontWeight: t.typography.fontWeights.bold, color: t.semantic.text.muted }}>Recursos Asignados</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.xs, fontSize: t.typography.bodyXs.size, fontWeight: t.typography.fontWeights.bold }}>
                          <Cpu size={t.icon.xs}/> 8 vCPU
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.xs, fontSize: t.typography.bodyXs.size, fontWeight: t.typography.fontWeights.bold }}>
                          <HardDrive size={t.icon.xs}/> 32GB RAM
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.xxs }}>
                        <span style={{ fontSize: t.typography.bodyXs.size, textTransform: 'uppercase', fontWeight: t.typography.fontWeights.bold, color: t.semantic.text.muted }}>Uptime Total</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.xs, fontSize: t.typography.bodyXs.size, fontWeight: t.typography.fontWeights.bold }}>
                          <Clock size={t.icon.xs}/> {record.uptime}
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.xxs }}>
                        <span style={{ fontSize: t.typography.bodyXs.size, textTransform: 'uppercase', fontWeight: t.typography.fontWeights.bold, color: t.semantic.text.muted }}>ID de Instancia</span>
                        <div style={{ fontSize: t.typography.bodyXs.size, fontFamily: 'monospace', color: t.colors.brand.primary, wordBreak: 'break-all' }}>i-0a2b3c4d5e6f7g8h9</div>
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
          <KFlex vertical gap={t.spacing.lg}>
            <motion.div 
              variants={fadeInUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              style={{ padding: t.spacing.lg, borderRadius: t.radius.lg, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, boxShadow: t.shadows.sm }}
            >
              <h4 style={{ margin: `0 0 ${t.spacing.md}px`, fontSize: t.typography.bodyLg.size, fontWeight: t.typography.fontWeights.extrabold }}>Actividad Reciente</h4>
              <KFlex vertical gap={t.spacing.md}>
                {recentActivity.map(act => (
                  <KFlex key={act.id} gap={t.spacing.sm} align="flex-start">
                    <div style={{ 
                      width: t.sizing[2], height: t.sizing[2], borderRadius: t.radius.full, marginTop: 6, flexShrink: 0,
                      backgroundColor: t.colors.feedback[act.status as 'success' | 'info' | 'warning'] || t.colors.neutral[300]
                    }} />
                    <div>
                      <div style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.bold }}>{act.user} <span style={{ fontWeight: t.typography.fontWeights.regular, color: t.semantic.text.muted }}>{act.action}</span></div>
                      <div style={{ fontSize: t.typography.bodyXs.size, fontWeight: t.typography.fontWeights.semibold, color: t.colors.brand.primary, marginTop: 2 }}>{act.target}</div>
                      <div style={{ fontSize: t.typography.bodyXs.size, color: t.semantic.text.muted, marginTop: t.spacing.xs }}>{act.time}</div>
                    </div>
                  </KFlex>
                ))}
              </KFlex>
              <KButton variant="ghost" block size="sm" style={{ marginTop: t.spacing.md }}>Ver todo el log</KButton>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              style={{ padding: t.spacing.lg, borderRadius: t.radius.lg, backgroundColor: t.semantic.surface.card, border: `1px solid ${t.semantic.border.default}`, boxShadow: t.shadows.sm }}
            >
              <KFlex justify="space-between" align="center" style={{ marginBottom: t.spacing.md }}>
                <h4 style={{ margin: 0, fontSize: t.typography.bodyLg.size, fontWeight: t.typography.fontWeights.extrabold }}>Equipo Online</h4>
                <KBadge count={4} color="success" />
              </KFlex>
              <KFlex gap={t.spacing.sm} wrap="wrap">
                <KAvatar name="Juan Perez" status="online" size="sm" />
                <KAvatar name="Marta Garcia" status="online" size="sm" />
                <KAvatar name="Luis Rodriguez" status="online" size="sm" />
                <KAvatar name="Sofia Martinez" status="online" size="sm" />
                <KButton shape="circle" variant="outline" size="sm" icon={<UserPlus size={t.icon.xs} />} />
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
