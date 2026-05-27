/**
 * OrganismsPage — Documentacion de organismos del sistema Khor
 */
import React, { useState } from 'react';

import { useParams } from 'react-router';
import { ComponentDoc } from '../components/docs/ComponentDoc';
import type { PropDef } from '../components/docs/ComponentDoc';
import { KDataTable, KFormWizard, KResizablePanelGroup, KResizablePanel, KResizableHandle } from '../components/design-system/organisms';
import { KSparklineCell } from '../components/design-system/organisms/KSparklineCell';
import KSteps from '../components/design-system/molecules/KSteps';
import { 
  KModal, 
  KModalContent, 
  KModalHeader, 
  KModalTitle, 
  KModalDescription, 
  KModalFooter 
} from '../components/design-system/organisms/KModal';
import { 
  KSheet, 
  KSheetContent, 
  KSheetHeader, 
  KSheetTitle, 
  KSheetDescription, 
  KSheetFooter 
} from '../components/design-system/organisms/KSheet';
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
import { KModalConfirm } from '../components/design-system/organisms/KModal';
import { KFormList } from '../components/design-system/organisms/KFormList';
import type { KFormListField } from '../components/design-system/organisms/KFormList';
import { KCarousel } from '../components/design-system/organisms/KCarousel';
import { KCalendar } from '../components/design-system/organisms/KCalendar';
import { KForm } from '../components/design-system/organisms/KForm';


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
  Settings, Eye, MoreHorizontal,
} from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';
import { KCommandBarPreview } from '../components/design-system/command-bar';
import { 
  Trash2, FolderOpen, Folder, File,
  ChevronRight as ExpandIcon
} from 'lucide-react';
import { cn } from '@/utils/cn';

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
        <KForm.Item label="Usuario" required error={methods.formState.errors.username?.message as string}>
          <KForm.Field
            name="username"
            rules={{ required: 'Requerido' }}
            render={({ field }) => <KInput {...field} placeholder="Ingrese usuario" />}
          />
        </KForm.Item>
        <KForm.Item label="Email" error={methods.formState.errors.email?.message as string}>
          <KForm.Field
            name="email"
            rules={{ pattern: { value: /^\S+@\S+$/, message: 'Email inválido' } }}
            render={({ field }) => <KInput {...field} placeholder="email@ejemplo.com" />}
          />
        </KForm.Item>
        <KButton variant="primary" htmlType="submit" style={{ width: '100%' }}>Enviar</KButton>
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

function LoginFormPreview() {
  return <KLoginForm onFinish={(v: any) => console.log(v)} />;
}

/* ─── Organism Registry ─────────────────────── */
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
  aiNotes?: string;
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <KButton variant="primary" onClick={() => setOpen(true)}>Abrir Modal</KButton>
      <KModal open={open} onOpenChange={setOpen}>
        <KModalContent>
          <KModalHeader>
            <KModalTitle>Confirmar Acción</KModalTitle>
            <KModalDescription>
              ¿Estás seguro de que deseas realizar esta acción importante?
            </KModalDescription>
          </KModalHeader>
          <div style={{ padding: '20px 0', fontSize: 14, color: khorTokens.colors.neutral[500] }}>
            Esta acción no se puede deshacer y afectará a los registros relacionados.
          </div>
          <KModalFooter>
            <KButton variant="secondary" onClick={() => setOpen(false)}>Cancelar</KButton>
            <KButton variant="primary" onClick={() => setOpen(false)}>Confirmar</KButton>
          </KModalFooter>
        </KModalContent>
      </KModal>
    </>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <KButton variant="primary" onClick={() => setOpen(true)}>Abrir Drawer</KButton>
      <KSheet open={open} onOpenChange={setOpen}>
        <KSheetContent>
          <KSheetHeader>
            <KSheetTitle>Detalle de Empleado</KSheetTitle>
          </KSheetHeader>
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
          <KSheetFooter>
            <KButton variant="secondary" onClick={() => setOpen(false)}>Cerrar</KButton>
            <KButton variant="primary" onClick={() => setOpen(false)}>Guardar</KButton>
          </KSheetFooter>
        </KSheetContent>
      </KSheet>
    </>
  );
}

function ToastDemo() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'nowrap', overflowX: 'auto', paddingBottom: 8 }}>
      <KButton variant="primary" icon={<CheckCircle size={16} />} onClick={() => kToast({ type: 'success', title: 'Empleado registrado', description: 'Maria Garcia fue dada de alta exitosamente.' })}>
        Éxito
      </KButton>
      <KButton variant="danger" icon={<XCircle size={16} />} onClick={() => kToast({ type: 'error', title: 'Error al guardar', description: 'No se pudo conectar con el servidor.' })}>
        Error
      </KButton>
      <KButton variant="secondary" icon={<AlertTriangle size={16} />} onClick={() => kToast({ type: 'warning', title: 'Contrato por vencer', description: 'El contrato de Juan Perez vence en 5 días.' })}>
        Advertencia
      </KButton>
      <KButton variant="navy" icon={<Info size={16} />} onClick={() => kToast({ type: 'info', title: 'Actualización disponible', description: 'Versión 2.1 lista para instalar.' })}>
        Info
      </KButton>
    </div>
  );
}

/* ─── Organism Playgrounds ──────────────────── */

function DataTablePlayground() {
  const [dataMode, setDataMode] = useState<'normal' | 'massive'>('normal');
  const [virtual, setVirtual] = useState(false);
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('middle');

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


function ModalPlayground() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Confirmar Acción');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 220 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Título</label><input value={title} onChange={(e) => setTitle(e.target.value)} style={sel} /></div>
          <KButton variant="primary" onClick={() => setOpen(true)} icon={<Eye size={14} />}>Abrir Modal</KButton>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300, padding: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
        <div style={{ textAlign: 'center', color: khorTokens.colors.neutral[400], fontSize: 13 }}>
          <Settings size={24} style={{ marginBottom: 8, opacity: 0.4 }} />
          <p style={{ margin: 0 }}>Ajusta los controles y presiona "Abrir Modal"</p>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: khorTokens.colors.neutral[300] }}>Título: {title}</p>
        </div>
      </div>
      <KModal open={open} onOpenChange={setOpen}>
        <KModalContent>
          <KModalHeader>
            <KModalTitle>{title}</KModalTitle>
            <KModalDescription>Vista previa del componente Modal con API Headless.</KModalDescription>
          </KModalHeader>
          <div style={{ padding: '24px 0' }}>
            <KText>Contenido flexible dentro del modal.</KText>
          </div>
          <KModalFooter>
            <KButton variant="secondary" onClick={() => setOpen(false)}>Cerrar</KButton>
            <KButton variant="primary" onClick={() => setOpen(false)}>Entendido</KButton>
          </KModalFooter>
        </KModalContent>
      </KModal>
    </div>
  );
}

function DrawerPlayground() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('Detalle de Registro');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 220 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Título</label><input value={title} onChange={(e) => setTitle(e.target.value)} style={sel} /></div>
          <KButton variant="primary" onClick={() => setOpen(true)} icon={<Eye size={14} />}>Abrir Drawer</KButton>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300, padding: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
        <div style={{ textAlign: 'center', color: khorTokens.colors.neutral[400], fontSize: 13 }}>
          <Settings size={24} style={{ marginBottom: 8, opacity: 0.4 }} />
          <p style={{ margin: 0 }}>Ajusta y presiona "Abrir Drawer"</p>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: khorTokens.colors.neutral[300] }}>Título: {title}</p>
        </div>
      </div>
      <KSheet open={open} onOpenChange={setOpen}>
        <KSheetContent>
          <KSheetHeader>
            <KSheetTitle>{title}</KSheetTitle>
            <KSheetDescription>Panel lateral expansible para detalles y edición.</KSheetDescription>
          </KSheetHeader>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '24px 0' }}>
            <KFormField label="Nombre"><KInput defaultValue="Maria Garcia" /></KFormField>
            <KFormField label="Departamento"><KInput defaultValue="Recursos Humanos" /></KFormField>
            <KFormField label="Email"><KInput defaultValue="maria@khor.com" /></KFormField>
          </div>
          <KSheetFooter>
            <KButton variant="secondary" onClick={() => setOpen(false)}>Cerrar</KButton>
          </KSheetFooter>
        </KSheetContent>
      </KSheet>
    </div>
  );
}

function ToastPlayground() {
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [title, setTitle] = useState('Operación exitosa');
  const [desc, setDesc] = useState('El registro fue guardado correctamente.');
  const [duration, setDuration] = useState(4000);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%', backgroundColor: 'white' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Parámetros de Feedback</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Tipo de Mensaje</label>
            <select value={type} onChange={(e) => setType(e.target.value as any)} style={sel}>
              {['success', 'error', 'warning', 'info'].map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div><label style={ctrl}>Título</label><input value={title} onChange={(e) => setTitle(e.target.value)} style={sel} /></div>
          <div><label style={ctrl}>Descripción</label><input value={desc} onChange={(e) => setDesc(e.target.value)} style={sel} /></div>
          <div>
            <label style={ctrl}>Duración (ms)</label>
            <select value={duration} onChange={(e) => setDuration(Number(e.target.value))} style={sel}>
              {[2000, 4000, 6000, 8000].map((d) => <option key={d} value={d}>{d}ms</option>)}
            </select>
          </div>
          <KButton variant="primary" onClick={() => kToast({ type, title, description: desc, duration })}>
            Disparar Toast
          </KButton>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300, padding: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Acciones Rápidas</h4>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'nowrap' }}>
          <KButton size="sm" variant="primary" icon={<CheckCircle size={14} />} onClick={() => kToast({ type: 'success', title: 'Guardado', description: 'Registro exitoso.' })}>
            Éxito
          </KButton>
          <KButton size="sm" variant="danger" icon={<XCircle size={14} />} onClick={() => kToast({ type: 'error', title: 'Error', description: 'No se pudo guardar.' })}>
            Error
          </KButton>
          <KButton size="sm" variant="secondary" icon={<AlertTriangle size={14} />} onClick={() => kToast({ type: 'warning', title: 'Advertencia', description: 'Revisa los campos.' })}>
            Warning
          </KButton>
          <KButton size="sm" variant="navy" icon={<Info size={14} />} onClick={() => kToast({ type: 'info', title: 'Info', description: 'Hay una actualización.' })}>
            Info
          </KButton>
        </div>
      </div>
    </div>
  );
}



function TabsPlayground() {
  const [activeTab, setActiveTab] = useState('1');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div><label style={ctrl}>Tab Inicial</label><select value={activeTab} onChange={(e) => setActiveTab(e.target.value)} style={sel}>{['1', '2', '3'].map(t => <option key={t}>{t}</option>)}</select></div>
      </div>
      <div style={{ flex: 2, minWidth: 400, padding: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KTabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <KTabsList>
            <KTabsTrigger value="1">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Users size={16} />
                <span>General</span>
              </div>
            </KTabsTrigger>
            <KTabsTrigger value="2">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <FileText size={16} />
                <span>Documentos</span>
              </div>
            </KTabsTrigger>
            <KTabsTrigger value="3">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <BarChart3 size={16} />
                <span>Estadísticas</span>
              </div>
            </KTabsTrigger>
          </KTabsList>
          <KTabsContent value="1">
            <p style={{ padding: 16, color: khorTokens.colors.neutral[500] }}>Contenido de la pestaña General.</p>
          </KTabsContent>
          <KTabsContent value="2">
            <p style={{ padding: 16, color: khorTokens.colors.neutral[500] }}>Lista de documentos adjuntos.</p>
          </KTabsContent>
          <KTabsContent value="3">
            <p style={{ padding: 16, color: khorTokens.colors.neutral[500] }}>Métricas de rendimiento.</p>
          </KTabsContent>
        </KTabs>
      </div>
    </div>
  );
}

function CardSectionPlayground() {
  const [title, setTitle] = useState('Informacion Personal');
  const [subtitle, setSubtitle] = useState('Datos basicos del empleado');
  const [noPadding, setNoPadding] = useState(false);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Titulo</label><input value={title} onChange={(e) => setTitle(e.target.value)} style={sel} /></div>
          <div><label style={ctrl}>Subtitulo</label><input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} style={sel} /></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={noPadding} onChange={(e) => setNoPadding(e.target.checked)} /> Sin padding</label>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 350, padding: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KCardSection title={title} subtitle={subtitle} noPadding={noPadding} extra={<KButton variant="secondary" size="sm">Editar</KButton>}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><KText variant="small" color="muted">Nombre</KText><KText variant="body-md">Maria Garcia</KText></div>
            <div><KText variant="small" color="muted">Email</KText><KText variant="body-md">maria@khor.com</KText></div>
          </div>
        </KCardSection>
      </div>
    </div>
  );
}

function FormWizardPlayground() {
  const steps = [
    {
      id: 'profile',
      title: 'Perfil de Usuario',
      description: 'Configura la información básica de tu cuenta.',
      content: (
        <div className="flex flex-col gap-4">
          <KFormField label="Nombre Completo" placeholder="Ej. Juan Perez" />
          <KFormField label="Correo Electrónico" placeholder="juan@khor.com" />
        </div>
      )
    },
    {
      id: 'settings',
      title: 'Preferencias',
      description: 'Define cómo quieres interactuar con la plataforma.',
      content: (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between p-4 bg-khor-neutral-50 rounded-lg">
            <div>
              <KText variant="bodyMd" className="font-bold">Notificaciones Push</KText>
              <KText variant="small" className="text-khor-text-secondary">Recibe alertas en tiempo real.</KText>
            </div>
            <KSwitch />
          </div>
          <div className="flex items-center justify-between p-4 bg-khor-neutral-50 rounded-lg">
            <div>
              <KText variant="bodyMd" className="font-bold">Modo Desarrollador</KText>
              <KText variant="small" className="text-khor-text-secondary">Acceso a herramientas avanzadas.</KText>
            </div>
            <KSwitch />
          </div>
        </div>
      )
    },
    {
      id: 'review',
      title: 'Revisión y Envío',
      description: 'Confirma que los datos sean correctos.',
      content: (
        <div className="p-6 bg-khor-primary/5 rounded-xl border border-khor-primary/20 text-center">
          <CheckCircle className="mx-auto mb-3 text-khor-primary" size={40} />
          <KText variant="h4">¡Todo listo para comenzar!</KText>
          <KText variant="small" className="text-khor-text-secondary mt-2">
            Al hacer clic en finalizar, tu perfil será actualizado con las nuevas preferencias.
          </KText>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <KFormWizard 
        steps={steps} 
        onComplete={() => alert('¡Proceso completado!')}
        onCancel={() => alert('Cancelado')}
      />
    </div>
  );
}

export const organisms: Record<string, OrganismEntry> = {
  'form-wizard': {
    id: 'form-wizard',
    name: 'KFormWizard',
    description: 'Orquestador de formularios multi-paso. Ideal para procesos de onboarding, configuraciones complejas o checkouts.',
    preview: (
      <div className="p-4 border border-khor-border-default rounded-lg scale-75 origin-top">
        <KSteps current={1} items={[{ title: 'Paso 1' }, { title: 'Paso 2' }, { title: 'Paso 3' }]} />
      </div>
    ),
    playground: <FormWizardPlayground />,
    a11ySummary: {
      keyboard: [
        'Tab: Navega entre los controles del wizard.',
        'Enter/Space: Activa los botones de navegación.',
      ],
      aria: [
        'Uso de KSteps con estados de progreso ARIA.',
        'Regiones de contenido con anuncios de carga.',
      ],
      contrast: 'AAA certificado.',
      score: 100,
    },
    code: `import { KFormWizard } from '@khor/design-system/organisms';

const steps = [
  { id: '1', title: 'Cuenta', content: <AccountForm /> },
  { id: '2', title: 'Plan', content: <PlanSelector /> },
];

<KFormWizard steps={steps} onComplete={handleFinish} />`,
    filename: 'KFormWizard.tsx',
    props: [
      { name: 'steps', type: 'WizardStep[]', required: true, description: 'Colección de pasos del flujo.' },
      { name: 'onComplete', type: 'function', description: 'Callback al finalizar el último paso.' },
      { name: 'onCancel', type: 'function', description: 'Callback al cancelar el flujo.' },
    ],
  },
  'resizable': {
    id: 'resizable',
    name: 'KResizable',
    description: 'Componente contenedor de paneles redimensionables. Permite crear layouts flexibles para dashboards e interfaces divididas.',
    preview: (
      <div className="border border-khor-border-default rounded-xl overflow-hidden h-32 scale-90 origin-top">
        <KResizablePanelGroup direction="horizontal">
          <KResizablePanel defaultSize={30} className="bg-khor-neutral-50 flex items-center justify-center p-4">
            <span className="text-xs font-semibold text-khor-text-tertiary">Sidebar</span>
          </KResizablePanel>
          <KResizableHandle withHandle />
          <KResizablePanel className="flex items-center justify-center p-4">
            <span className="text-xs font-semibold text-khor-text-tertiary">Main Content</span>
          </KResizablePanel>
        </KResizablePanelGroup>
      </div>
    ),
    playground: (
      <div className="border border-khor-border-default rounded-2xl overflow-hidden h-64">
        <KResizablePanelGroup direction="horizontal">
          <KResizablePanel defaultSize={25} className="bg-khor-neutral-50 flex items-center justify-center p-4">
            <span className="text-xs font-semibold text-khor-text-tertiary">Panel A (25%)</span>
          </KResizablePanel>
          <KResizableHandle withHandle />
          <KResizablePanel defaultSize={50} className="flex items-center justify-center p-4">
            <span className="text-xs font-semibold text-khor-text-tertiary">Panel Central (50%)</span>
          </KResizablePanel>
          <KResizableHandle withHandle />
          <KResizablePanel defaultSize={25} className="bg-khor-neutral-50 flex items-center justify-center p-4">
            <span className="text-xs font-semibold text-khor-text-tertiary">Panel B (25%)</span>
          </KResizablePanel>
        </KResizablePanelGroup>
      </div>
    ),
    a11ySummary: {
      keyboard: [
        'Flechas: Permiten mover el handle de redimensionamiento.',
        'Tab: Enfoca los handles disponibles.',
      ],
      aria: [
        'Uso de roles y atributos estándar de resizable-panels.',
      ],
      contrast: 'AAA certificado.',
      score: 100,
    },
    code: `import { KResizablePanelGroup, KResizablePanel, KResizableHandle } from '@khor/design-system/organisms';

<KResizablePanelGroup direction="horizontal">
  <KResizablePanel defaultSize={20}>Sidebar</KResizablePanel>
  <KResizableHandle withHandle />
  <KResizablePanel defaultSize={80}>Content</KResizablePanel>
</KResizablePanelGroup>`,
    filename: 'KResizable.tsx',
    props: [
      { name: 'direction', type: "'horizontal' | 'vertical'", required: true, description: 'Dirección del redimensionamiento.' },
      { name: 'withHandle', type: 'boolean', description: 'Muestra un tirador visual (grip) en el handle.' },
    ],
  },
  'data-table': {
    id: 'data-table',
    name: 'KDataTable',
    description: 'Tabla de datos con busqueda integrada, ordenamiento, paginacion y soporte para celdas con sparklines. Diseñada para manejar listas de empleados, transacciones y registros operativos.',
    preview: (
      <KDataTable
        columns={tableColumns}
        data={mockEmployees}
        searchPlaceholder="Buscar empleados..."
        actions={
          <>
            <KButton variant="secondary" size="sm" icon={<Filter size={14} />}>Filtrar</KButton>
            <KButton variant="secondary" size="sm" icon={<Download size={14} />}>Exportar</KButton>
            <KButton variant="primary" size="sm" icon={<Plus size={14} />}>Nuevo</KButton>
          </>
        }
      />
    ),
    playground: <DataTablePlayground />,
    stateShowcase: (
      <div style={{ padding: 16 }}>
        <KText variant="body-md" style={{ marginBottom: 16, display: 'block' }}>Tabla Base</KText>
        <KDataTable columns={tableColumns} data={mockEmployees.slice(0, 2)} />
        <br />
        <KText variant="body-md" style={{ marginBottom: 16, display: 'block' }}>Tabla vacía (Empty State)</KText>
        <KDataTable columns={tableColumns} data={[]} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Navega por botones de acciones, cabeceras y paginación.', 'Enter: Permite ordenar columnas.'],
      aria: ['Usa etiqueta <table> con <thead> y <tbody>, ofreciendo lectura estructural a lectores de pantalla.'],
      contrast: 'AAA entre datos y el fondo de las filas alternas.',
      score: 100,
    },
    code: `import { KDataTable, KSparklineCell } from '@khor/design-system/organisms/index';

const columns = [
  {
    key: 'name',
    title: 'Empleado',
    dataIndex: 'name',
    sortable: true,
    render: (v) => <KUserCell name={v} />,
  },
  { key: 'dept', title: 'Departamento', dataIndex: 'dept', sortable: true },
  {
    key: 'status',
    title: 'Estado',
    dataIndex: 'status',
    render: (v) => <KBadge status={v} label={statusLabels[v]} />,
  },
  {
    key: 'trend',
    title: 'Tendencia',
    dataIndex: 'trend',
    render: (v) => <KSparklineCell data={v} />,
  },
];

<KDataTable
  columns={columns}
  data={employees}
  searchPlaceholder="Buscar empleados..."
  actions={<KButton variant="primary" size="sm">Nuevo</KButton>}
  onRowClick={(record) => openDetail(record)}
/>`,
    filename: 'KDataTable.tsx',
    props: [
      { name: 'data', type: 'T[]', required: true, description: 'Array de datos.' },
      { name: 'columns', type: 'ColumnDef[]', required: true, description: 'Definición de columnas.' },
      { name: 'virtual', type: 'boolean', description: 'Habilita virtualización para alto volumen.' },
      { name: 'size', type: "'small' | 'middle' | 'large'", default: "'middle'", description: 'Tamaño de la tabla.' },
      { name: 'rowExpansion', type: 'object', description: 'Configuración para filas expandibles.' },
    ],

    guidelines: [
      'Usa KSparklineCell para mostrar tendencias en columnas numericas.',
      'Siempre incluye al menos un boton de accion principal (Nuevo, Exportar, etc).',
      'Las columnas con sortable: true permiten ordenamiento automatico.',
    ],
    aiNotes: 'KDataTable es el organismo central para listar datos. La IA puede extraer datos de las filas, filtrar por busqueda, y analizar sparklines para detectar tendencias.',
  },
  sparkline: {
    id: 'sparkline',
    name: 'KSparklineCell',
    description: 'Mini grafico de linea disenado para celdas de tabla. Muestra tendencias en un espacio minimo usando recharts.',
    preview: (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Crecimiento</p>
          <KSparklineCell data={[20, 25, 30, 35, 40, 45, 50]} color={khorTokens.colors.feedback.success} width={100} height={32} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Decrecimiento</p>
          <KSparklineCell data={[50, 48, 42, 38, 35, 30, 28]} color={khorTokens.colors.feedback.error} width={100} height={32} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Estable</p>
          <KSparklineCell data={[40, 42, 39, 41, 40, 42, 41]} color={khorTokens.colors.brand.primary} width={100} height={32} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Accent</p>
          <KSparklineCell data={[10, 15, 12, 20, 25, 22, 30]} color={khorTokens.colors.brand.accent} width={100} height={32} />
        </div>
      </div>
    ),
    code: `import { KSparklineCell } from '@khor/design-system/organisms/index';

// Dentro de una columna de KDataTable
{
  key: 'trend',
  title: 'Tendencia',
  dataIndex: 'trend',
  render: (data) => (
    <KSparklineCell
      data={data}
      color="#2E7D32"
      width={80}
      height={24}
    />
  ),
}`,
    filename: 'KSparklineCell.tsx',
    stateShowcase: (
      <div style={{ display: 'flex', gap: 24, padding: 16 }}>
        <KSparklineCell data={[10, 50, 20]} color="green" width={60} height={20} />
        <KSparklineCell data={[80, 20, 10]} color="red" width={60} height={20} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Visualización no interactiva pasiva.'],
      aria: ['aria-hidden="true" oculto a lectores (el valor real numérico debe ir a su lado en texto puro para blind-support).'],
      contrast: 'AA para el trazado visual del vector.',
      score: 100,
    },
    props: [
      { name: 'data', type: 'number[]', required: true, description: 'Array de valores numericos para el grafico.' },
      { name: 'color', type: 'string', default: 'khor.primary', description: 'Color de la linea.' },
      { name: 'width', type: 'number', default: '80', description: 'Ancho en pixeles.' },
      { name: 'height', type: 'number', default: '24', description: 'Alto en pixeles.' },
    ],
    guidelines: [
      'Minimo 5 puntos de datos para una linea legible.',
      'Usa colores de feedback: verde para crecimiento, rojo para decrecimiento.',
      'Mantel el tamano pequeno (80-100px) para no dominar la tabla.',
    ],
  },
  modal: {
    id: 'modal',
    name: 'KModal',
    description: 'Dialogo modal centrado con titulo, contenido y footer personalizable. Usa la sombra alta (shadow lg) del sistema.',
    preview: <ModalDemo />,
    playground: <ModalPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KText color="secondary">Nota: Ver el comportamiento dinámico desde el Playground, ya que el estado del DOM (focus-trap/overlay) secuestra la página.</KText>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Queda atrapado en los elementos interactivos del Modal (Focus Trap).', 'Esc: Se define como única anulación rápida para cierre (Abort).'],
      aria: ['Role nativo "dialog" provisto explícitamente y complementado con aria-modal="true".'],
      contrast: 'AAA del modal flotante contra la cortina negra 50% transparente.',
      score: 100,
    },
    code: `import { KModal } from '@khor/design-system/organisms/index';

const [open, setOpen] = useState(false);

<KModal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirmar Accion"
  footer={
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
      <KButton variant="secondary" onClick={() => setOpen(false)}>
        Cancelar
      </KButton>
      <KButton variant="primary" onClick={handleConfirm}>
        Confirmar
      </KButton>
    </div>
  }
>
  <p>Contenido del modal...</p>
</KModal>`,
    filename: 'KModal.tsx',
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Controla la visibilidad.' },
      { name: 'onClose', type: '() => void', required: true, description: 'Callback al cerrar.' },
      { name: 'title', type: 'string', required: true, description: 'Titulo del modal.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Contenido del modal.' },
      { name: 'footer', type: 'ReactNode', description: 'Botones de accion del footer.' },
      { name: 'width', type: 'number', default: '520', description: 'Ancho en pixeles.' },
    ],
    guidelines: ['Usa para confirmaciones y formularios cortos.', 'Footer siempre con Cancelar (secondary) + Accion (primary).'],
  },
  drawer: {
    id: 'drawer',
    name: 'KSheet',
    description: 'Panel lateral deslizable para detalles, formularios o inspectores. Aparece desde el lado derecho por defecto.',
    preview: <DrawerDemo />,
    playground: <DrawerPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KText color="secondary">Nota: Ver demo interactiva arriba, los drawes están ocultos estáticamente.</KText>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Ciclo de enfoque atrapado lateralmente.', 'Esc: Cierre con atajo rápido.'],
      aria: ['Implementa role="dialog" al igual que Modal.', 'El DOM inyecta el cajón en el primer nivel (Portal) de document.body para evitar quiebres de z-index.'],
      contrast: 'AAA sobre el panel lateral descolorando el contenido principal.',
      score: 100,
    },
    code: `import { KSheet } from '@khor/design-system/organisms/index';

<KSheet
  open={open}
  onClose={() => setOpen(false)}
  title="Detalle de Empleado"
  width={400}
  footer={...}
>
  <KFormField label="Nombre">
    <KInput value={name} onChange={...} />
  </KFormField>
</KSheet>`,
    filename: 'KSheet.tsx',
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Controla la visibilidad.' },
      { name: 'onClose', type: '() => void', required: true, description: 'Callback al cerrar.' },
      { name: 'title', type: 'string', required: true, description: 'Titulo del drawer.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Contenido.' },
      { name: 'width', type: 'number', default: '400', description: 'Ancho.' },
      { name: 'placement', type: "'left' | 'right'", default: "'right'", description: 'Lado de aparicion.' },
      { name: 'footer', type: 'ReactNode', description: 'Footer con acciones.' },
    ],
    guidelines: ['Usa para formularios largos o detalle de registros.', 'Width de 400-600px dependiendo del contenido.'],
  },
  'card-section': {
    id: 'card-section',
    name: 'KCardSection',
    description: 'Tarjeta contenedora para agrupar contenido relacionado con titulo, subtitulo y acciones extra.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KCardSection title="Informacion Personal" subtitle="Datos basicos del empleado" extra={<KButton variant="secondary" size="sm">Editar</KButton>}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div><KText variant="small" color="muted">Nombre</KText><KText variant="body-md">Maria Garcia</KText></div>
            <div><KText variant="small" color="muted">Email</KText><KText variant="body-md">maria@khor.com</KText></div>
            <div><KText variant="small" color="muted">Departamento</KText><KText variant="body-md">Recursos Humanos</KText></div>
            <div><KText variant="small" color="muted">Puesto</KText><KText variant="body-md">Gerente</KText></div>
          </div>
        </KCardSection>
      </div>
    ),
    playground: <CardSectionPlayground />,
    stateShowcase: (
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <KCardSection title="Card Normal" subtitle="Padding activado">
          <KText color="secondary">Contenido estandar con 24px perimetrales.</KText>
        </KCardSection>
        <KCardSection title="Card Edge-to-Edge" noPadding>
          <div style={{ backgroundColor: '#eee', padding: 8 }}>Zona visual completa</div>
        </KCardSection>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Atrapa navegación en acciones extra del título.'],
      aria: ['Organiza en landmarks lógicos si es parte principal de una página.'],
      contrast: 'AAA sobre la plataforma blanca primaria de Khor.',
      score: 100,
    },
    code: `import { KCardSection } from '@khor/design-system/organisms/index';

<KCardSection
  title="Informacion Personal"
  subtitle="Datos basicos del empleado"
  extra={<KButton variant="secondary" size="sm">Editar</KButton>}
>
  {/* Contenido */}
</KCardSection>`,
    filename: 'KCardSection.tsx',
    props: [
      { name: 'title', type: 'string', description: 'Titulo de la seccion.' },
      { name: 'subtitle', type: 'string', description: 'Subtitulo.' },
      { name: 'extra', type: 'ReactNode', description: 'Contenido extra en el header (botones, etc).' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Contenido de la tarjeta.' },
      { name: 'noPadding', type: 'boolean', default: 'false', description: 'Remueve el padding del body.' },
    ],
    guidelines: ['Usa para agrupar campos relacionados en formularios o vistas de detalle.'],
  },
  tabs: {
    id: 'tabs',
    name: 'KTabs',
    description: 'Navegacion por pestanas con soporte para iconos y contenido por tab.',
    preview: (
      <KTabs defaultValue="general">
        <KTabsList>
          <KTabsTrigger value="general">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Users size={16} />
              <span>General</span>
            </div>
          </KTabsTrigger>
          <KTabsTrigger value="docs">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <FileText size={16} />
              <span>Documentos</span>
            </div>
          </KTabsTrigger>
          <KTabsTrigger value="stats">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <BarChart3 size={16} />
              <span>Estadísticas</span>
            </div>
          </KTabsTrigger>
        </KTabsList>
        <KTabsContent value="general">
          <p style={{ padding: 16, color: khorTokens.colors.neutral[500] }}>Contenido de la pestana General con datos del empleado.</p>
        </KTabsContent>
        <KTabsContent value="docs">
          <p style={{ padding: 16, color: khorTokens.colors.neutral[500] }}>Lista de documentos y archivos adjuntos.</p>
        </KTabsContent>
        <KTabsContent value="stats">
          <p style={{ padding: 16, color: khorTokens.colors.neutral[500] }}>Graficos y metricas de rendimiento.</p>
        </KTabsContent>
      </KTabs>
    ),
    playground: <TabsPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KTabs defaultValue="1">
          <KTabsList>
            <KTabsTrigger value="1">Tab 1</KTabsTrigger>
            <KTabsTrigger value="2">Tab 2</KTabsTrigger>
            <KTabsTrigger value="3" disabled>Disabled</KTabsTrigger>
          </KTabsList>
        </KTabs>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Left/Right: Mueve el foco entre las tablist activas.', 'Enter/Space: Selecciona el tab focalizado.'],
      aria: ['Contenedor usa role="tablist". Cada pestaña es role="tab". Contenido asume role="tabpanel".'],
      contrast: 'AAA sobre el tab activo con barra de indicación inferior.',
      score: 100,
    },
    code: `import { KTabs, KTabsList, KTabsTrigger, KTabsContent } from '@khor/design-system/organisms/index';

<KTabs defaultValue="general" onValueChange={(key) => setActiveTab(key)}>
  <KTabsList>
    <KTabsTrigger value="general">General</KTabsTrigger>
    <KTabsTrigger value="docs">Documentos</KTabsTrigger>
  </KTabsList>
  <KTabsContent value="general">Contenido Gral</KTabsContent>
  <KTabsContent value="docs">Contenido Docs</KTabsContent>
</KTabs>`,
    filename: 'KTabs.tsx',
    props: [
      { name: 'defaultValue', type: 'string', description: 'Tab activo por defecto.' },
      { name: 'onValueChange', type: '(key: string) => void', description: 'Callback al cambiar de tab.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Sub-componentes KTabsList, KTabsTrigger y KTabsContent.' },
    ],
    guidelines: ['Maximo 5-6 tabs. Para mas, usa navegacion por menu.', 'Incluye icono Lucide para mejorar legibilidad.'],
  },
  'toast-manager': {
    id: 'toast-manager',
    name: 'KToastManager',
    description: 'Sistema de notificaciones tipo toast con 4 variantes semanticas (success, error, warning, info). Usa la libreria Sonner con estilos Khor.',
    preview: <ToastDemo />,
    playground: <ToastPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
        <KText color="secondary">Las notificaciones Toast flotan de forma global. Ver demo interactiva arriba.</KText>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Enfoque general usando sistemas nativos del layout.'],
      aria: ['Portal en viewport con aria-live="polite" o "assertive".'],
      contrast: 'AAA texto y fondos de alerta semánticos.',
      score: 100,
    },
    code: `import { KToastProvider, kToast } from '@khor/design-system/organisms/index';

// 1. Agrega el Provider en tu layout principal
<KToastProvider />

// 2. Llama kToast() desde cualquier lugar
kToast({
  type: 'success',
  title: 'Empleado registrado',
  description: 'Maria Garcia fue dada de alta exitosamente.',
});

kToast({
  type: 'error',
  title: 'Error al guardar',
  description: 'No se pudo conectar con el servidor.',
  duration: 6000,
});

kToast({
  type: 'warning',
  title: 'Contrato por vencer',
  description: 'El contrato vence en 5 dias.',
});

kToast({
  type: 'info',
  title: 'Actualizacion disponible',
});`,
    filename: 'KToastManager.tsx',
    props: [
      { name: 'type', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'", description: 'Tipo semantico de la notificacion.' },
      { name: 'title', type: 'string', required: true, description: 'Titulo del toast.' },
      { name: 'description', type: 'string', description: 'Descripcion adicional.' },
      { name: 'duration', type: 'number', default: '4000', description: 'Duracion en milisegundos.' },
    ],
    guidelines: [
      'Agrega <KToastProvider /> una sola vez en el layout raiz.',
      'Usa kToast() como funcion imperativa — no necesita hooks ni estado.',
      'success para acciones completadas, error para fallos, warning para advertencias, info para notificaciones generales.',
    ],
    aiNotes: 'kToast es la forma estandar de comunicar resultados de acciones al usuario. La IA debe usar success para confirmaciones y error para fallos.',
  },
  'command-bar': {
    id: 'command-bar',
    name: 'KCommandBar',
    description: 'Barra de búsqueda global activada con Ctrl+K (o Cmd+K en Mac). Permite buscar componentes, tokens, templates y navegar rápidamente por todo el Design System. Incluye historial de recientes y navegación por teclado.',
    preview: <KCommandBarPreview />,
    stateShowcase: (
      <div style={{ padding: 16 }}>
        <KText color="secondary">Este componente renderiza como un modal de pantalla completa activado globalmente. Se ha omitido estado incrustado.</KText>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Cmd/Ctrl + K: Activa modal.', 'Up/Down: Navega entre filas de resultados al instante.', 'Enter: Acción selectora.'],
      aria: ['Role "combobox" y aria-autocomplete.'],
      contrast: 'AAA en resultados, inputs base y atajos visuales.',
      score: 100,
    },
    code: `import { KCommandBar, useCommandBar } from '@khor/design-system/command-bar';

// 1. Hook para el shortcut global (en tu layout)
const { open, setOpen } = useCommandBar();

// 2. Renderiza el Command Bar
<KCommandBar open={open} onClose={() => setOpen(false)} />

// 3. Botón opcional para abrir manualmente
<button onClick={() => setOpen(true)}>
  Buscar... ⌘K
</button>

// Funcionalidades:
// - Búsqueda fuzzy por nombre, categoría y keywords
// - Navegación con flechas ↑↓ y Enter
// - Historial de últimas 5 búsquedas (localStorage)
// - Agrupación por categoría (Átomo, Molécula, Organismo, Template)
// - Cierre con Escape o click fuera`,
    filename: 'KCommandBar.tsx',
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Controla la visibilidad del Command Bar.' },
      { name: 'onClose', type: '() => void', required: true, description: 'Callback al cerrar.' },
    ],
    guidelines: [
      'Usa useCommandBar() en el layout raíz para registrar el shortcut global.',
      'El Command Bar busca en todos los componentes del Design System.',
      'Los recientes se guardan en localStorage automáticamente.',
      'Navega con ↑↓ y selecciona con Enter.',
    ],
    aiNotes: 'El Command Bar es la interfaz principal de búsqueda. Contiene un registro de todos los componentes con keywords en español e inglés para máxima encontrabilidad.',
  },
  /* ═══ ORGANISMOS EXTENDIDOS (v2.0 Nexus) ═══ */
  upload: {
    id: 'upload',
    name: 'KUpload',
    description: 'Componente de subida de archivos con zona de drag & drop, lista de archivos con estado (subiendo, completado, error), progreso y previews de imagen.',
    preview: <KUpload multiple accept="image/*,.pdf" maxSize={5 * 1024 * 1024} />,
    stateShowcase: (
      <div style={{ padding: 16 }}>
        <KUpload multiple accept="image/*" />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Space/Enter sobre el área abre el file explorer nativo.'],
      aria: ['Input type="file" real y envuelto en label clickable por diseño de forma que se mantiene accesible.'],
      contrast: 'AAA base para textos principales.',
      score: 100,
    },
    code: `import { KUpload } from '@khor/design-system/organisms/index';

<KUpload
  multiple
  accept="image/*,.pdf"
  maxSize={5 * 1024 * 1024}
  value={files}
  onChange={setFiles}
  onUpload={async (file) => { /* upload logic */ }}
/>`,
    filename: 'KUpload.tsx',
    props: [
      { name: 'multiple', type: 'boolean', description: 'Permitir multiples archivos.' },
      { name: 'accept', type: 'string', description: 'Tipos de archivo aceptados.' },
      { name: 'maxSize', type: 'number', description: 'Tamano maximo en bytes.' },
      { name: 'maxFiles', type: 'number', description: 'Limite de archivos.' },
      { name: 'value', type: 'KUploadFile[]', description: 'Lista de archivos.' },
      { name: 'onChange', type: '(files) => void', description: 'Callback al cambiar.' },
      { name: 'onUpload', type: '(file: File) => Promise<KUploadFile>', description: 'Funcion de subida custom.' },
      { name: 'listType', type: "'text' | 'picture'", default: "'text'", description: 'Tipo de lista.' },
    ],
    guidelines: ['Define maxSize para evitar uploads excesivos.', 'Usa onUpload para integracion con API.'],
  },
  tree: {
    id: 'tree',
    name: 'KTree',
    description: 'Vista de arbol expandible/colapsable con soporte para seleccion, checkboxes, iconos y lineas de conexion. Ideal para jerarquias de carpetas o categorias.',
    preview: (
      <KTree
        showLine
        showIcon
        data={[
          { key: 'rh', title: 'Recursos Humanos', children: [{ key: 'rh-1', title: 'Reclutamiento' }, { key: 'rh-2', title: 'Capacitacion' }] },
          { key: 'tech', title: 'Tecnologia', children: [{ key: 'tech-1', title: 'Frontend' }, { key: 'tech-2', title: 'Backend' }, { key: 'tech-3', title: 'DevOps' }] },
          { key: 'fin', title: 'Finanzas' },
        ]}
      />
    ),
    stateShowcase: (
      <div style={{ padding: 16 }}>
        <KTree showLine checkable data={[{ key: '1', title: 'Raíz', children: [{ key: '1-1', title: 'Hoja' }] }]} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Flechas de dirección: Navegación multinivel y apertura (ArrowRight)/Cierre (ArrowLeft) del árbol.'],
      aria: ['role="tree" para nodo base. role="treeitem" nativo en hijos.'],
      contrast: 'AA sobre guías o líneas de conexión estructuradas.',
      score: 100,
    },
    code: `import { KTree } from '@khor/design-system/organisms/index';

<KTree
  data={treeData}
  checkable
  showLine
  onSelect={(keys) => setSelected(keys)}
/>`,
    filename: 'KTree.tsx',
    props: [
      { name: 'data', type: 'KTreeNode[]', required: true, description: 'Nodos con key, title y children.' },
      { name: 'checkable', type: 'boolean', description: 'Mostrar checkboxes.' },
      { name: 'showLine', type: 'boolean', description: 'Lineas de conexion.' },
      { name: 'showIcon', type: 'boolean', default: 'true', description: 'Iconos de carpeta/archivo.' },
      { name: 'onSelect', type: '(keys, info) => void', description: 'Al seleccionar nodo.' },
      { name: 'onCheck', type: '(keys) => void', description: 'Al checkear nodo.' },
    ],
    guidelines: ['Usa showLine para jerarquias profundas.', 'V4 maneja expansion de forma interna por defecto.'],
  },
  tour: {
    id: 'tour',
    name: 'KTour',
    description: 'Tour guiado paso a paso para onboarding. Resalta elementos de la UI con mascara, muestra cards con titulo, descripcion y navegacion entre pasos.',
    preview: (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <KText variant="body-md" color="secondary">El KTour se activa programáticamente con open={true} y referencia a elementos del DOM vía selectores CSS.</KText>
        <div style={{ marginTop: 16 }}>
          <KButton variant="primary" size="sm">Iniciar Tour (demo)</KButton>
        </div>
      </div>
    ),
    stateShowcase: (
      <div style={{ padding: 16 }}>
        <KText color="secondary">Requiere instancias del DOM válidas. Ver implementaciones reales.</KText>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Escape: Cierra el tour. Navegación en footer popover por flechas/tab.'],
      aria: ['Actúa como Alert Dialog (interrumpe flujo temporalmente). Mismo focus trap que los Modales.'],
      contrast: 'AAA sobre capas altas oscurecedoras.',
      score: 100,
    },
    code: `import { KTour } from '@khor/design-system/organisms/index';

<KTour
  open={showTour}
  onClose={() => setShowTour(false)}
  onFinish={() => markOnboardingComplete()}
  steps={[
    { title: 'Bienvenido', description: 'Este es el dashboard.', target: '#dashboard' },
    { title: 'Sidebar', description: 'Navega entre secciones.', target: '#sidebar' },
  ]}
/>`,
    filename: 'KTour.tsx',
    props: [
      { name: 'steps', type: 'KTourStep[]', required: true, description: 'Pasos con title, description, target y placement.' },
      { name: 'open', type: 'boolean', description: 'Activar el tour.' },
      { name: 'onClose', type: '() => void', description: 'Al cerrar.' },
      { name: 'onFinish', type: '() => void', description: 'Al completar todos los pasos.' },
    ],
    guidelines: ['Usa targets con selectores CSS únicos.', 'Máximo 5-7 pasos por tour para evitar fatiga.'],
  },
  'modal-confirm': {
    id: 'modal-confirm',
    name: 'KModalConfirm',
    description: 'Diálogo de confirmación declarativo para acciones críticas. Soporta tipos semánticos (confirm, success, error) y estados asíncronos.',
    preview: (
      <div style={{ padding: 24, textAlign: 'center' }}>
        <KText variant="body-md" color="secondary">KModalConfirm se controla con open/onClose props.</KText>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
          <KButton variant="danger" size="sm">Eliminar (demo)</KButton>
        </div>
      </div>
    ),
    code: `import { KModalConfirm } from '@khor/design-system/organisms/index';

<KModalConfirm
  open={showConfirm}
  onClose={() => setShowConfirm(false)}
  type="confirm"
  title="¿Eliminar registro?"
  content="Esta acción no se puede deshacer."
  onOk={async () => { await deleteAction(); }}
/>`,
    filename: 'KModalConfirm.tsx',
    a11ySummary: {
      keyboard: ['Escape: Cierra el diálogo.', 'Focus trap mientras está abierto.'],
      aria: ['role="alertdialog" para notificar severidad.'],
      contrast: 'AAA sobre la superficie del sistema.',
      score: 100,
    },
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Visibilidad.' },
      { name: 'type', type: "'confirm'|'success'|'error'", description: 'Tipo semántico.' },
      { name: 'onOk', type: '() => void | Promise', description: 'Callback al aceptar.' },
    ],
    guidelines: ['Usa para acciones que requieren validación explícita del usuario.'],
  },
  'form-list': {
    id: 'form-list',
    name: 'KFormList',
    description: 'Lista dinámica de campos de formulario. Permite agregar, eliminar y reordenar filas. Ideal para formularios con ítems repetibles.',
    preview: (
      <FormListPreview />
    ),
    stateShowcase: (
      <div style={{ padding: 16 }}>
        <KText color="secondary">Renderiza dentro del contexto proveedor form dinámico.</KText>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Teclado opera el adicinamiento nativamente a través de Tab desde el botón de sumar.'],
      aria: ['Cada sub-objeto actúa de forma pasiva, pero se alerta su entrada mediante focus automático.'],
      contrast: 'AA sobre listados anidados.',
      score: 100,
    },
    code: `import { KForm, KFormList, KInput } from '@khor/design-system/organisms/index';

<KForm initialValues={{ members: [{ name: 'Juan' }] }}>
  <KFormList 
    name="members" 
    renderItem={(field) => (
      <div style={{ display: 'flex', gap: 8 }}>
        <KForm.Item {...field} name={[field.name, 'name']}>
          <KInput placeholder="Nombre" />
        </KForm.Item>
      </div>
    )}
  />
</KForm>`,
    filename: 'KFormList.tsx',
    props: [
      { name: 'name', type: 'string', required: true, description: 'Nombre del campo array.' },
      { name: 'renderItem', type: '(field, index, ops) => ReactNode', required: true, description: 'Render de cada fila.' },
      { name: 'addText', type: 'string', default: "'Agregar campo'", description: 'Texto del botón agregar.' },
    ],
    guidelines: ['Usa maxItems para evitar formularios demasiado largos.', 'renderItem recibe operaciones add/remove.'],
  },
  carousel: {
    id: 'carousel',
    name: 'KCarousel',
    description: 'Carrusel de contenido con soporte para autoplay, efectos y navegación. Diseñado para integrarse con el diseño minimalista de Khor DS.',
    preview: (
      <div style={{ maxWidth: 480 }}>
        <KCarousel autoplay>
          {[['#E04D36', 'Slide — Primario'], ['#051758', 'Slide — Navy'], ['#E07C36', 'Slide — Accent']].map(([bg, label]) => (
            <div key={label} style={{ height: 160, backgroundColor: bg as string, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>
              <KText color="default" variant="h3" style={{ color: 'white' }}>{label}</KText>
            </div>
          ))}
        </KCarousel>
      </div>
    ),
    code: `import { KCarousel } from '@khor/design-system/organisms/index';

<KCarousel autoplay dots>
  <div>Slide 1</div>
  <div>Slide 2</div>
</KCarousel>`,
    filename: 'KCarousel.tsx',
    a11ySummary: {
      keyboard: ['Flechas: Navega entre slides.', 'Space/Enter sobre dots: Salta a slide.'],
      aria: ['Role="region" con aria-roledescription="carousel".'],
      contrast: 'AAA sobre el fondo del slide.',
      score: 100,
    },
    props: [
      { name: 'autoplay', type: 'boolean', default: 'false', description: 'Auto-reproducción.' },
      { name: 'dots', type: 'boolean', default: 'true', description: 'Indicadores de posición.' },
      { name: 'effect', type: "'scroll' | 'fade'", default: "'scroll'", description: 'Efecto de transición.' },
    ],
    guidelines: ['Usa autoplay solo cuando sea necesario para no distraer.', 'Max 5 slides recomendados.'],
  },
  calendar: {
    id: 'calendar',
    name: 'KCalendar',
    description: 'Calendario completo interactivo diseñado para Khor DS. Soporta vistas de mes y año, selección de fechas, y eventos personalizados mediante renderCell.',
    preview: (
      <div style={{ maxWidth: 500 }}>
        <KCalendar />
      </div>
    ),
    code: `import { KCalendar } from '@khor/design-system/organisms/index';

<KCalendar
  onChange={(date) => console.log(date)}
  onPanelChange={(date, mode) => console.log(mode)}
/>`,
    filename: 'KCalendar.tsx',
    stateShowcase: (
      <div style={{ padding: 16 }}>
        <KCalendar />
      </div>
    ),
    a11ySummary: {
      keyboard: ['ArrowKeys: Navega entre días de la cuadrícula.', 'PageUp/Down: Salta entre meses.', 'Enter: Selecciona fecha.'],
      aria: ['Grid-based accessibility with ARIA roles for days and navigation.', 'Announcements for month changes via live region.'],
      contrast: 'AAA entre número de día y fondo de grilla.',
      score: 100,
    },
    props: [
      { name: 'value', type: 'Date', description: 'Fecha seleccionada controlada.' },
      { name: 'onChange', type: '(date: Date) => void', description: 'Callback al seleccionar una fecha.' },
      { name: 'onPanelChange', type: '(date, mode) => void', description: 'Al cambiar de mes/año.' },
      { name: 'dateCellRender', type: '(date) => ReactNode', description: 'Renderizado custom de celda de día.' },
      { name: 'monthCellRender', type: '(date) => ReactNode', description: 'Renderizado custom de celda de mes.' },
    ],
    guidelines: ['Ideal para agendar citas, eventos y calendarios editoriales.'],
  },
  form: {
    id: 'form',
    name: 'KForm',
    description: 'Sistema de formularios avanzado con validación integrada, manejo de estado y layout flexible. Basado en react-hook-form para máxima eficiencia.',
    preview: (
      <FormPreview />
    ),
    code: `import { KForm, KInput, KButton } from '@khor/design-system/organisms/index';

const methods = KForm.useForm({ defaultValues: { username: '' } });

<KForm methods={methods} onSubmit={(values) => console.log(values)}>
  <KForm.Item name="username" label="Usuario">
    <KForm.Field
      name="username"
      rules={{ required: 'Requerido' }}
      render={({ field }) => <KInput {...field} placeholder="Usuario" />}
    />
  </KForm.Item>
  <KButton variant="primary" htmlType="submit">Enviar</KButton>
</KForm>`,
    filename: 'KForm.tsx',
    stateShowcase: (
      <div style={{ padding: 16 }}>
        <KText color="secondary">El formulario depende íntegramente de sus children y del proveedor de contexto.</KText>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Operaciones nativas en todos los inputs de children.', 'Enter sobre un input dispara el submit general automáticamente.'],
      aria: ['Los label (KForm.Item) están vinculados por id a los inputs internos usando for (HTMLFor), crucial para VoiceOver.'],
      contrast: 'N/A: Estructura contenedora pasiva.',
      score: 100,
    },
    props: [
      { name: 'layout', type: "'horizontal'|'vertical'|'inline'", default: "'horizontal'", description: 'Disposición de etiquetas y campos.' },
      { name: 'onSubmit', type: '(values) => void', description: 'Callback al enviar con éxito.' },
      { name: 'methods', type: 'UseFormReturn', description: 'Instancia de react-hook-form (KForm.useForm).' },
    ],
    guidelines: ['Usa KForm.Item para envolver cada campo.', 'Define rules en KForm.Field para validación automática.'],
  },

  pagination: {
    id: 'pagination',
    name: 'KPagination',
    description: 'Control de navegación para grandes conjuntos de datos. Soporta cambio de página, tamaño de página y salto rápido.',
    preview: (<KPagination total={50} showSizeChanger />),
    code: `import { KPagination } from '@khor/design-system/organisms/index';

<KPagination
  total={100}
  pageSize={10}
  onChange={(page, size) => console.log(page, size)}
  showSizeChanger
/>`,
    filename: 'KPagination.tsx',
    stateShowcase: (
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KPagination total={50} />
        <KPagination total={500} showSizeChanger />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Arrow Keys mueven entre páginas.', 'Tabulador permite entrar a controles Quick-Jump.'],
      aria: ['Navegación listitem con etiqueta aria-current="page".'],
      contrast: 'AAA controlando número activo en fondo navy.',
      score: 100,
    },
    props: [
      { name: 'total', type: 'number', required: true, description: 'Número total de registros.' },
      { name: 'pageSize', type: 'number', description: 'Registros por página.' },
      { name: 'onChange', type: '(page, size) => void', description: 'Callback al cambiar.' },
    ],
    guidelines: ['Usa debajo de listas o grillas de cards que no usen KDataTable.'],
  },
  'login-form': {
    id: 'login-form',
    name: 'KLoginForm',
    description: 'Formulario de inicio de sesión estándar con campos de email y contraseña, validación integrada y estado de carga.',
    preview: (<LoginFormPreview />),
    code: `import { KLoginForm } from '@khor/design-system/organisms/index';

<KLoginForm 
  onFinish={(values) => login(values)} 
  loading={isLoggingIn} 
/>`,
    filename: 'KLoginForm.tsx',
    stateShowcase: (
      <div style={{ padding: 16 }}>
         <KLoginForm onFinish={() => {}} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tabulación rígida orientada a User->Password->Button.', 'Enter realiza Submit.'],
      aria: ['Type="email" y "password" nativos con autocompletado habilitado.'],
      contrast: 'AAA según reglas universales de formulario.',
      score: 100,
    },
    props: [
      { name: 'onFinish', type: '(values) => void', description: 'Callback al enviar el formulario con éxito.' },
      { name: 'loading', type: 'boolean', description: 'Muestra estado de carga en el botón.' },
    ],
    guidelines: ['Centra el formulario en un contenedor de ancho máximo (ej. 400px).'],
  },
};

export function OrganismsPage() {
  const { id } = useParams<{ id: string }>();
  const org = id && organisms[id] ? organisms[id] : undefined;

  if (!org && id) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', paddingTop: 64 }}>
        <div style={{ maxWidth: 400, textAlign: 'center' }}>
          <h2 style={{ fontSize: 24, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 8 }}>404 - No documentado</h2>
          <p style={{ color: khorTokens.colors.neutral[500], marginBottom: 24 }}>El organismo "{id}" forma parte de la librería pero aún no tiene un playground interactivo configurado en esta documentación.</p>
          <KButton variant="outline" onClick={() => window.location.href = '#/'}>Ir al Inicio</KButton>
        </div>
      </div>
    );
  } else if (!org && !id) {
    // Default fallback to data-table just in case
    return <ComponentDoc {...organisms['data-table']} category="Organismo" />;
  }

  if (!org) {
    return <ComponentDoc {...organisms['data-table']} category="Organismo" />;
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
      guidelines={org.guidelines}
      aiNotes={org.aiNotes}
      stateShowcase={org.stateShowcase}
      a11ySummary={org.a11ySummary}
    />
  );
}