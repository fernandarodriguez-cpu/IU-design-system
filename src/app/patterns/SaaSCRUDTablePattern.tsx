import React from 'react';
import { 
  Users, Filter, Download, Plus, 
  Search, MoreHorizontal, Edit, 
  Trash2, Mail, ExternalLink,
  ChevronRight
} from 'lucide-react';
import { 
  KUserCell, KBreadcrumb 
} from '../components/design-system/molecules/index';
import { 
  KButton, KBadge, KAvatar, KText, KTag, KSearchInput 
} from '../components/design-system/atoms/index';
import { 
  KDataTable, KSparklineCell, KCardSection 
} from '../components/design-system/organisms/index';
import { khorTokens } from '../theme/khor-theme';
import { Pattern } from './types';

const t = khorTokens;

const mockData = [
  { id: '1', name: 'María García', dept: 'Recursos Humanos', role: 'Admin', status: 'success', salary: '$45,000', trend: [30, 35, 40, 38, 42, 45], lastActive: '2 min ago' },
  { id: '2', name: 'Juan Pérez', dept: 'Tecnología', role: 'Leader', status: 'success', salary: '$62,000', trend: [40, 45, 48, 52, 55, 62], lastActive: '15 min ago' },
  { id: '3', name: 'Ana López', dept: 'Finanzas', role: 'Manager', status: 'warning', salary: '$48,000', trend: [48, 47, 46, 48, 47, 48], lastActive: '1 hour ago' },
  { id: '4', name: 'Carlos Ruiz', dept: 'Operaciones', role: 'Viewer', status: 'error', salary: '$35,000', trend: [40, 38, 36, 35, 34, 35], lastActive: '3 days ago' },
  { id: '5', name: 'Laura Díaz', dept: 'Tecnología', role: 'Senior', status: 'success', salary: '$58,000', trend: [35, 40, 45, 48, 52, 58], lastActive: 'Now' },
  { id: '6', name: 'Pedro Sánchez', dept: 'Ventas', role: 'Sales rep', status: 'success', salary: '$42,000', trend: [30, 32, 34, 38, 40, 42], lastActive: '8 hours ago' },
];

function SaaSCRUDTableInternal() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.lg, fontFamily: t.typography.fontPrimary }}>
      {/* Header with breadcrumbs and actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <KBreadcrumb items={[{ title: 'Dashboard' }, { title: 'Gestión de Equipo' }]} />
          <h2 style={{ margin: `${t.spacing.sm}px 0 0`, fontSize: t.typography.h1.size, fontWeight: t.typography.fontWeights.extrabold, color: 'var(--foreground)' }}>Empleados</h2>
          <p style={{ margin: `${t.spacing.xs}px 0 0`, fontSize: t.typography.bodyMd.size, color: 'var(--muted-foreground)' }}>Lista completa de colaboradores activos en la organización.</p>
        </div>
        <div style={{ display: 'flex', gap: t.spacing.sm }}>
          <KButton variant="outline" icon={<Download size={16} />}>Exportar</KButton>
          <KButton variant="primary" icon={<Plus size={16} />}>Nuevo Empleado</KButton>
        </div>
      </div>

      {/* Stats Summary Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: t.spacing.md }}>
        <div style={{ padding: t.spacing.lg, borderRadius: t.radius.xl, border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}>
          <div style={{ fontSize: t.typography.small.size, fontWeight: t.typography.fontWeights.bold, color: 'var(--muted-foreground)', marginBottom: t.spacing.sm }}>Total Colaboradores</div>
          <div style={{ fontSize: t.typography.h1.size, fontWeight: t.typography.fontWeights.extrabold }}>1,248 <span style={{ fontSize: t.typography.small.size, color: t.colors.feedback.success }}>+12</span></div>
        </div>
        <div style={{ padding: t.spacing.lg, borderRadius: t.radius.xl, border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}>
          <div style={{ fontSize: t.typography.small.size, fontWeight: t.typography.fontWeights.bold, color: 'var(--muted-foreground)', marginBottom: t.spacing.sm }}>Tasa de Retención</div>
          <div style={{ fontSize: t.typography.h1.size, fontWeight: t.typography.fontWeights.extrabold }}>94.2% <span style={{ fontSize: t.typography.small.size, color: t.colors.feedback.success }}>+1.5%</span></div>
        </div>
        <div style={{ padding: t.spacing.lg, borderRadius: t.radius.xl, border: '1px solid var(--border)', backgroundColor: 'var(--card)' }}>
          <div style={{ fontSize: t.typography.small.size, fontWeight: t.typography.fontWeights.bold, color: 'var(--muted-foreground)', marginBottom: t.spacing.sm }}>Presupuesto Nómina</div>
          <div style={{ fontSize: t.typography.h1.size, fontWeight: t.typography.fontWeights.extrabold }}>$2.4M <span style={{ fontSize: t.typography.small.size, color: 'var(--muted-foreground)' }}>mensual</span></div>
        </div>
      </div>

      {/* THE DATA TABLE (The core fixed part) */}
      <KDataTable 
        data={mockData}
        columns={[
          { 
            id: 'name', 
            accessorKey: 'name', 
            header: 'Empleado',
            cell: (ctx) => <KUserCell name={ctx.getValue() as string} role={ctx.row.original.role} />
          },
          { 
            id: 'dept', 
            accessorKey: 'dept', 
            header: 'Departamento' 
          },
          { 
            id: 'status', 
            accessorKey: 'status', 
            header: 'Estado',
            cell: (ctx) => (
              <KBadge 
                status={ctx.getValue() as 'success' | 'warning' | 'error'} 
                label={ctx.getValue() === 'success' ? 'Activo' : ctx.getValue() === 'warning' ? 'Pendiente' : 'Inactivo'} 
              />
            )
          },
          { 
            id: 'salary', 
            accessorKey: 'salary', 
            header: 'Salario (Base)' 
          },
          { 
            id: 'trend', 
            accessorKey: 'trend', 
            header: 'Tendencia (Performance)',
            cell: (ctx) => <KSparklineCell data={ctx.getValue() as number[]} height={30} />
          },
          {
            id: 'actions',
            header: '',
            cell: () => (
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                <KButton variant="ghost" size="sm" icon={<Edit size={14} />} />
                <KButton variant="ghost" size="sm" icon={<Trash2 size={14} />} />
              </div>
            )
          }
        ]}
        searchable={true}
        searchPlaceholder="Filtrar por nombre o departamento..."
        enableColumnToggle={true}
        enableExport={true}
        actions={
          <KButton variant="secondary" size="sm" icon={<Filter size={14} />}>Filtros Avanzados</KButton>
        }
      />
    </div>
  );
}

export const SaaSCRUDTablePattern: Pattern = {
  id: 'saas-crud',
  title: 'Gestión CRUD para SaaS',
  description: 'Patrón avanzado de gestión de datos con KDataTable, KSparklineCell y acciones integradas. Resuelve errores comunes de IDs en tablas TanStack.',
  category: 'SaaS',
  component: <SaaSCRUDTableInternal />,
  code: `import { KDataTable, KUserCell, KSparklineCell } from '@khor/organisms';

// Configuración de columnas (TanStack Style)
const columns = [
  { 
    id: 'name', 
    accessorKey: 'name', 
    header: 'Colaborador',
    cell: ({ getValue }) => <KUserCell name={getValue()} />
  }
];

// Uso del componente
<KDataTable columns={columns} data={teamMembers} />`
};
