/**
 * OrganismsPage — Documentación de organismos del sistema Khor
 */
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useParams } from 'react-router';
import { ComponentDoc } from '../components/docs/ComponentDoc';
import type { PropDef } from '../components/docs/ComponentDoc';
import { KDataTable } from '../components/design-system/organisms/KDataTable';
import { KSparklineCell } from '../components/design-system/organisms/KSparklineCell';
import { 
  KModal, 
  KModalContent, 
  KModalHeader, 
  KModalTitle, 
  KModalDescription, 
  KModalFooter 
} from '../components/design-system/organisms/KModal';
import { 
  KDrawer, 
  KDrawerContent, 
  KDrawerHeader, 
  KDrawerTitle, 
  KDrawerDescription, 
  KDrawerFooter 
} from '../components/design-system/organisms/KDrawer';
import { KCardSection } from '../components/design-system/organisms/KCardSection';
import { 
  KTabs, 
  KTabsList, 
  KTabsTrigger, 
  KTabsContent 
} from '../components/design-system/organisms/KTabs';
import { KToastProvider, kToast } from '../components/design-system/organisms/KToast';
import { KUpload } from '../components/design-system/organisms/KUpload';
import type { KUploadFile } from '../components/design-system/organisms/KUpload';
import { KTree } from '../components/design-system/organisms/KTree';
import type { KTreeNode } from '../components/design-system/organisms/KTree';
import { KTour } from '../components/design-system/organisms/KTour';
import { KModalConfirm } from '../components/design-system/organisms/KModalConfirm';
import { KFormList } from '../components/design-system/organisms/KFormList';
import type { KFormListField } from '../components/design-system/organisms/KFormList';
import { KCarousel } from '../components/design-system/organisms/KCarousel';
import { KCalendar } from '../components/design-system/organisms/KCalendar';
import { KForm } from '../components/design-system/organisms/KForm';
import { kNotification } from '../components/design-system/organisms/KNotification';
import { kMessage } from '../components/design-system/organisms/KMessage';
import { KPagination } from '../components/design-system/organisms/KPagination';
import { KLoginForm } from '../components/design-system/organisms/KLoginForm';
import { KCommandBar } from '../components/design-system/organisms/KCommandBar';
import { KButton } from '../components/design-system/atoms/KButton';
import { KBadge } from '../components/design-system/atoms/KBadge';
import { KText } from '../components/design-system/atoms/KText';
import { KInput } from '../components/design-system/atoms/KInput';
import { KUserCell } from '../components/design-system/molecules/KUserCell';
import { KFormField } from '../components/design-system/molecules/KFormField';
import {
  Download, Filter, Plus, RefreshCw, CheckCircle,
  AlertTriangle, XCircle, Info, BarChart3, Users, FileText,
  Settings, Eye,
} from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';
import { KCommandBarPreview } from '../components/design-system/command-bar';
import { 
  Trash2, FolderOpen, Folder, File,
  ChevronRight as ExpandIcon
} from 'lucide-react';
import { cn } from '../../imports/utils';

/* ─── Mock Data ─────────────────────────────── */
const mockEmployees = [
  { id: '1', name: 'Maria Garcia', dept: 'Recursos Humanos', status: 'success' as const, salary: 45000, trend: [30, 35, 40, 38, 42, 45] },
  { id: '2', name: 'Juan Perez', dept: 'Tecnologia', status: 'success' as const, salary: 62000, trend: [40, 45, 48, 52, 55, 62] },
  { id: '3', name: 'Ana Lopez', dept: 'Finanzas', status: 'warning' as const, salary: 48000, trend: [48, 47, 46, 48, 47, 48] },
  { id: '4', name: 'Carlos Ruiz', dept: 'Operaciones', status: 'error' as const, salary: 35000, trend: [40, 38, 36, 35, 34, 35] },
  { id: '5', name: 'Laura Diaz', dept: 'Tecnologia', status: 'success' as const, salary: 58000, trend: [35, 40, 45, 48, 52, 58] },
  { id: '6', name: 'Pedro Martinez', dept: 'Ventas', status: 'success' as const, salary: 42000, trend: [30, 32, 35, 38, 40, 42] },
];

// Generador de datos masivos para Virtualization (10,000 filas)
const generateMassiveData = (count: number) => {
  const depts = ['Tecnologia', 'Recursos Humanos', 'Finanzas', 'Ventas', 'Marketing', 'Operaciones'];
  const statuses = ['success', 'warning', 'error'];
  return Array.from({ length: count }, (_, i) => ({
    id: String(i + 1),
    name: `Empleado ${i + 1}`,
    dept: depts[Math.floor(Math.random() * depts.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    salary: 30000 + Math.floor(Math.random() * 70000),
    trend: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)),
  }));
};

const massiveEmployees = generateMassiveData(10000);

const statusLabels: Record<string, string> = { success: 'Activo', warning: 'Pendiente', error: 'Inactivo' };

const tableColumns = [
  {
    id: 'expander',
    header: () => null,
    cell: ({ row }: any) => (
      <button 
        onClick={(e) => { e.stopPropagation(); row.toggleExpanded(); }}
        className={cn("transition-transform duration-200", row.getIsExpanded() ? "rotate-90 text-khor-primary" : "text-khor-neutral-400")}
      >
        <ExpandIcon size={14} />
      </button>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Empleado',
    cell: (info: any) => <KUserCell name={info.getValue()} role="" />,
  },
  {
    accessorKey: 'dept',
    header: 'Departamento',
  },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: (info: any) => {
      const v = info.getValue();
      return <KBadge status={v as any} label={statusLabels[v] || v} />;
    },
  },
  {
    accessorKey: 'salary',
    header: 'Salario',
  },
  {
    accessorKey: 'trend',
    header: 'Tendencia',
    cell: (info: any) => <KSparklineCell data={info.getValue()} />,
  },
];

/* ─── Preview Components for Registry ───────── */

function FormPreview() {
  const methods = KForm.useForm({
    defaultValues: { username: '', email: '' }
  });
  return (
    <div style={{ maxWidth: 400 }}>
       <KForm methods={methods} layout="vertical" onSubmit={(values) => console.log(values)}>
        <KForm.Item label="Usuario" name="username" required>
          <KForm.Field
            name="username"
            rules={{ required: 'El usuario es obligatorio' }}
            render={({ field }) => <KInput {...field} placeholder="Ingrese usuario" />}
          />
        </KForm.Item>
        <KForm.Item label="Email" name="email">
          <KForm.Field
            name="email"
            rules={{ 
              required: 'Email es necesario',
              pattern: { value: /^\S+@\S+$/, message: 'Email inválido' } 
            }}
            render={({ field }) => <KInput {...field} placeholder="email@ejemplo.com" />}
          />
        </KForm.Item>
        <KButton variant="primary" htmlType="submit" style={{ width: '100%', marginTop: 12 }}>Enviar</KButton>
      </KForm>
    </div>
  );
}

function FormListPreview() {
  const methods = KForm.useForm({
    defaultValues: { members: [{ name: 'Juan', role: 'Dev' }, { name: 'Maria', role: 'PM' }] }
  });
  return (
    <KForm methods={methods}>
      <KFormList name="members" renderItem={(field) => (
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <KForm.Item style={{ flex: 1 }}>
            <KForm.Field
              name={`${field.name}.name` as any}
              render={({ field: f }) => <KInput {...f} placeholder="Nombre" />}
            />
          </KForm.Item>
          <KForm.Item style={{ flex: 1 }}>
            <KForm.Field
              name={`${field.name}.role` as any}
              render={({ field: f }) => <KInput {...f} placeholder="Rol" />}
            />
          </KForm.Item>
        </div>
      )} addText="Agregar miembro" maxItems={5} />
    </KForm>
  );
}

/* ─── Dashboard Helper Components ─── */

function ModalDemo() {
  const showConfirm = () => {
    KModal.confirm({
      title: '¿Confirmar eliminación?',
      content: 'Esta acción borrará permanentemente al empleado del sistema.',
      okText: 'Eliminar Ahora',
      cancelText: 'Mejor No',
      onOk: () => { kToast.success({ title: 'Eliminado', description: 'Empleado borrado correctamente' }); },
    });
  };

  const showSuccess = () => {
    KModal.success({
      title: 'Pago Procesado',
      content: 'La nómina del mes ha sido enviada a tesorería.',
    });
  };

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <KButton variant="primary" onClick={showConfirm}>KModal.confirm</KButton>
      <KButton variant="outline" onClick={showSuccess}>KModal.success</KButton>
    </div>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <KButton variant="primary" onClick={() => setOpen(true)}>Abrir Drawer</KButton>
      <KDrawer open={open} onOpenChange={setOpen}>
        <KDrawerContent>
          <KDrawerHeader>
            <KDrawerTitle>Detalle de Empleado</KDrawerTitle>
          </KDrawerHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '24px 0' }}>
            <KFormField label="Nombre">
              <KInput defaultValue="Maria Garcia" />
            </KFormField>
            <KFormField label="Departamento">
              <KInput defaultValue="Recursos Humanos" />
            </KFormField>
            <KFormField label="Email">
              <KInput defaultValue="maria@khor.com" />
            </KFormField>
          </div>
          <KDrawerFooter>
            <KButton variant="secondary" onClick={() => setOpen(false)}>Cerrar</KButton>
            <KButton variant="primary" onClick={() => setOpen(false)}>Guardar</KButton>
          </KDrawerFooter>
        </KDrawerContent>
      </KDrawer>
    </>
  );
}

function ToastDemo() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <KButton variant="primary" onClick={() => kToast.success({ title: 'Empleado registrado', description: 'Maria Garcia con éxito.' })}>
        Éxito
      </KButton>
      <KButton variant="danger" onClick={() => kToast.error({ title: 'Error al guardar', description: 'Fallo de conexión.' })}>
        Error
      </KButton>
    </div>
  );
}

/* ─── Organism Playgrounds ──────────────────── */

function DataTablePlayground() {
  const [dataMode, setDataMode] = useState<'normal' | 'massive'>('normal');
  const [virtual, setVirtual] = useState(false);
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('middle');
  const [showExpansion, setShowExpansion] = useState(false);

  const currentData = dataMode === 'massive' ? massiveEmployees : mockEmployees;

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Carga Crítica (Ola 11)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, color: khorTokens.colors.neutral[400] }}>Volumen de Datos</label>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
               <KButton size="sm" variant={dataMode === 'normal' ? 'primary' : 'outline'} onClick={() => { setDataMode('normal'); setVirtual(false); }}>Normal (6)</KButton>
               <KButton size="sm" variant={dataMode === 'massive' ? 'primary' : 'outline'} onClick={() => { setDataMode('massive'); setVirtual(true); }}>Masivo (10k)</KButton>
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={virtual} onChange={(e) => setVirtual(e.target.checked)} /> Virtualización
          </label>
        </div>
      </div>

      <div style={{ flex: 3, minWidth: 500 }}>
        <KDataTable
          size={size}
          columns={tableColumns}
          data={currentData}
          virtual={virtual}
          scroll={virtual ? { y: 400 } : undefined}
          enableRowSelection
          enableColumnToggle
          enableExport
          rowExpansion={{
            expandedRowRender: (record: any) => (
              <div className="flex gap-10 p-2">
                <div className="space-y-2">
                  <p className="text-xs font-bold text-khor-neutral-400 uppercase">Detalle Financiero</p>
                  <KText strong>Sueldo Base: ${record.salary.toLocaleString()}</KText>
                  <KText variant="caption" type="secondary" style={{ display: 'block' }}>Bonos por desempeño del trimestre anterior incluidos.</KText>
                </div>
                <div className="flex-1">
                   <p className="text-xs font-bold text-khor-neutral-400 uppercase mb-2">Historial de Desempeño</p>
                   <KSparklineCell data={record.trend} width="100%" height={60} />
                </div>
              </div>
            )
          }}
          actions={<KButton variant="primary" size="sm" icon={<Plus size={14} />}>Nuevo</KButton>}
        />
      </div>
    </div>
  );
}

/* ─── Registry ─────────────────────── */

export interface OrganismEntry {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
  playground?: React.ReactNode;
  stateShowcase?: React.ReactNode;
  a11ySummary?: {
    keyboard: string[];
    aria: string[];
    contrast: string;
    score: number;
  };
  code: string;
  filename: string;
  props: PropDef[];
  guidelines?: string[];
}

export const organisms: Record<string, OrganismEntry> = {
  'data-table': {
    id: 'data-table',
    name: 'KDataTable',
    description: 'Tabla de datos altamente personalizable con soporte para virtualización de 10,000+ filas, filtros por columna, selección múltiple y expansión.',
    preview: <KDataTable columns={tableColumns} data={mockEmployees} />,
    playground: <DataTablePlayground />,
    code: `<KDataTable
  columns={columns}
  data={data}
  virtual={true}
  scroll={{ y: 400 }}
  enableRowSelection
/>`,
    filename: 'KDataTable.tsx',
    props: [
      { name: 'data', type: 'T[]', required: true, description: 'Array de datos.' },
      { name: 'columns', type: 'ColumnDef[]', required: true, description: 'Definición de columnas.' },
      { name: 'virtual', type: 'boolean', description: 'Habilita virtualización para alto volumen.' },
    ],
  },
  'modal': {
    id: 'modal',
    name: 'KModal',
    description: 'Diálogo modal con API declarativa e imperativa. Soporta métodos estáticos como confirm, success y error.',
    preview: <ModalDemo />,
    code: `KModal.confirm({
  title: '¿Confirmar?',
  content: 'Solo un ejemplo.',
  onOk: () => console.log('OK')
});`,
    filename: 'KModal.tsx',
    props: [
       { name: 'open', type: 'boolean', description: 'Estado visible.' },
       { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Callback de cambio.' },
    ]
  },
  'form': {
    id: 'form',
    name: 'KForm',
    description: 'Sistema de formularios avanzado con layouts (Vertical, Horizontal, Inline) y auto-descubrimiento de errores.',
    preview: <FormPreview />,
    code: `<KForm methods={methods} layout="vertical">
  <KForm.Item label="Usuario" name="username">
     <KForm.Field name="username" render={({field}) => <KInput {...field}/>} />
  </KForm.Item>
</KForm>`,
    filename: 'KForm.tsx',
    props: [
      { name: 'layout', type: "'vertical' | 'horizontal' | 'inline'", description: 'Disposición del formulario.' },
    ]
  }
};

export function OrganismsPage() {
  const { id } = useParams<{ id: string }>();
  const org = id && organisms[id] ? organisms[id] : undefined;

  if (!org) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 64 }}>
        <div style={{ maxWidth: 400, textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 8 }}>404 - No documentado</h2>
          <p style={{ color: khorTokens.colors.neutral[500], marginBottom: 24 }}>El organismo "{id}" forma parte de la librería pero aún no tiene un playground interactivo configurado en esta documentación.</p>
          <KButton variant="outline" onClick={() => window.location.href = '#/'}>Ir al Inicio</KButton>
        </div>
      </div>
    );
  }

  return (
    <ComponentDoc
      name={org.name}
      category="Organismo"
      description={org.description}
      preview={org.preview}
      playground={org.playground}
      code={org.code}
      filename={org.filename}
      props={org.props}
    />
  );
}

export default OrganismsPage;
