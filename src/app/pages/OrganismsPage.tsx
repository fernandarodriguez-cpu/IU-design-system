/**
 * OrganismsPage — Documentacion de organismos del sistema Khor
 */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { ComponentDoc } from '../components/docs/ComponentDoc';
import type { PropDef } from '../components/docs/ComponentDoc';
import {
  KDataTable, KSparklineCell, KModal, KDrawer,
  KCardSection, KTabs, KToastProvider, kToast,
  KUpload, KTree, KTour, KModalConfirm, KFormList, KCarousel, KCalendar,
  KForm, KNotification, KMessage, KPagination,
  type KUploadFile, type KTreeNode, type KFormListField,
  KCommandBar,
} from '../components/design-system/organisms/index';
import { KButton, KBadge, KText, KInput } from '../components/design-system/atoms/index';
import { KUserCell, KFormField } from '../components/design-system/molecules/index';
import {
  Download, Filter, Plus, RefreshCw, CheckCircle,
  AlertTriangle, XCircle, Info, BarChart3, Users, FileText,
  Settings, Eye,
} from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';
import { KCommandBarPreview } from '../components/design-system/command-bar';
import { Trash2, FolderOpen, Folder, File } from 'lucide-react';
/* ─── Mock Data ─────────────────────────────── */
const mockEmployees = [
  { id: '1', name: 'Maria Garcia', dept: 'Recursos Humanos', status: 'success' as const, salary: '$45,000', trend: [30, 35, 40, 38, 42, 45] },
  { id: '2', name: 'Juan Perez', dept: 'Tecnologia', status: 'success' as const, salary: '$62,000', trend: [40, 45, 48, 52, 55, 62] },
  { id: '3', name: 'Ana Lopez', dept: 'Finanzas', status: 'warning' as const, salary: '$48,000', trend: [48, 47, 46, 48, 47, 48] },
  { id: '4', name: 'Carlos Ruiz', dept: 'Operaciones', status: 'error' as const, salary: '$35,000', trend: [40, 38, 36, 35, 34, 35] },
  { id: '5', name: 'Laura Diaz', dept: 'Tecnologia', status: 'success' as const, salary: '$58,000', trend: [35, 40, 45, 48, 52, 58] },
  { id: '6', name: 'Pedro Martinez', dept: 'Ventas', status: 'success' as const, salary: '$42,000', trend: [30, 32, 35, 38, 40, 42] },
];

const statusLabels: Record<string, string> = { success: 'Activo', warning: 'Pendiente', error: 'Inactivo' };

const tableColumns = [
  {
    key: 'name', title: 'Empleado', dataIndex: 'name', sortable: true,
    render: (v: string) => <KUserCell name={v} role="" />,
  },
  { key: 'dept', title: 'Departamento', dataIndex: 'dept', sortable: true },
  {
    key: 'status', title: 'Estado', dataIndex: 'status',
    render: (v: string) => <KBadge status={v as any} label={statusLabels[v] || v} />,
  },
  { key: 'salary', title: 'Salario', dataIndex: 'salary', sortable: true },
  {
    key: 'trend', title: 'Tendencia', dataIndex: 'trend', width: 100,
    render: (v: number[]) => <KSparklineCell data={v} />,
  },
];

/* ─── Organism Registry ─────────────────────── */
interface OrganismEntry {
  id: string;
  name: string;
  description: string;
  preview: React.ReactNode;
  playground?: React.ReactNode;
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
      <KModal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirmar Accion"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <KButton variant="secondary" onClick={() => setOpen(false)}>Cancelar</KButton>
            <KButton variant="primary" onClick={() => setOpen(false)}>Confirmar</KButton>
          </div>
        }
      >
        <p style={{ fontSize: 14, color: khorTokens.colors.neutral[500] }}>
          Estas a punto de realizar una accion importante. Esta accion no se puede deshacer.
        </p>
      </KModal>
    </>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <KButton variant="primary" onClick={() => setOpen(true)}>Abrir Drawer</KButton>
      <KDrawer
        open={open}
        onClose={() => setOpen(false)}
        title="Detalle de Empleado"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <KButton variant="secondary" onClick={() => setOpen(false)}>Cerrar</KButton>
            <KButton variant="primary" onClick={() => setOpen(false)}>Guardar</KButton>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
      </KDrawer>
    </>
  );
}

function ToastDemo() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <KToastProvider />
      <KButton variant="primary" onClick={() => kToast({ type: 'success', title: 'Empleado registrado', description: 'Maria Garcia fue dada de alta exitosamente.' })}>
        <CheckCircle size={16} style={{ marginRight: 4 }} /> Exito
      </KButton>
      <KButton variant="danger" onClick={() => kToast({ type: 'error', title: 'Error al guardar', description: 'No se pudo conectar con el servidor.' })}>
        <XCircle size={16} style={{ marginRight: 4 }} /> Error
      </KButton>
      <KButton variant="secondary" onClick={() => kToast({ type: 'warning', title: 'Contrato por vencer', description: 'El contrato de Juan Perez vence en 5 dias.' })}>
        <AlertTriangle size={16} style={{ marginRight: 4 }} /> Advertencia
      </KButton>
      <KButton variant="navy" onClick={() => kToast({ type: 'info', title: 'Actualizacion disponible', description: 'Version 2.1 lista para instalar.' })}>
        <Info size={16} style={{ marginRight: 4 }} /> Info
      </KButton>
    </div>
  );
}

/* ─── Organism Playgrounds ──────────────────── */

function DataTablePlayground() {
  const [pgSize, setPgSize] = useState(3);
  const [searchable, setSearchable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [rowSelection, setRowSelection] = useState(true);
  const [colToggle, setColToggle] = useState(true);
  const [exportable, setExportable] = useState(true);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 220 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Registros por página</label>
            <select value={pgSize} onChange={(e) => setPgSize(Number(e.target.value))} style={sel}>
              {[2, 3, 5, 10].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={searchable} onChange={(e) => setSearchable(e.target.checked)} /> Búsqueda habilitada
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={rowSelection} onChange={(e) => setRowSelection(e.target.checked)} /> Selección de filas
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={colToggle} onChange={(e) => setColToggle(e.target.checked)} /> Ocultar/Mostrar columnas
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={exportable} onChange={(e) => setExportable(e.target.checked)} /> Botón Exportar CSV
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={isLoading} onChange={(e) => setIsLoading(e.target.checked)} /> Estado de carga
          </label>
        </div>
      </div>
      <div style={{ flex: 3, minWidth: 500 }}>
        <KDataTable
          columns={tableColumns}
          data={mockEmployees}
          searchable={searchable}
          enableRowSelection={rowSelection}
          enableColumnToggle={colToggle}
          enableExport={exportable}
          loading={isLoading}
          pageSize={pgSize}
          onSelectionChange={(selected) => console.log('Seleccionados:', selected)}
          searchPlaceholder="Buscar empleados..."
          actions={<KButton variant="primary" size="sm" icon={<Plus size={14} />}>Nuevo</KButton>}
        />
      </div>
    </div>
  );
}

function ModalPlayground() {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(520);
  const [title, setTitle] = useState('Confirmar Acción');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 220 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Título</label><input value={title} onChange={(e) => setTitle(e.target.value)} style={sel} /></div>
          <div>
            <label style={ctrl}>Ancho (px)</label>
            <select value={width} onChange={(e) => setWidth(Number(e.target.value))} style={sel}>
              {[360, 480, 520, 640, 800].map((w) => <option key={w} value={w}>{w}px</option>)}
            </select>
          </div>
          <KButton variant="primary" onClick={() => setOpen(true)} icon={<Eye size={14} />}>Abrir Modal</KButton>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300, padding: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
        <div style={{ textAlign: 'center', color: khorTokens.colors.neutral[400], fontSize: 13 }}>
          <Settings size={24} style={{ marginBottom: 8, opacity: 0.4 }} />
          <p style={{ margin: 0 }}>Ajusta los controles y presiona "Abrir Modal"</p>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: khorTokens.colors.neutral[300] }}>Título: {title} • Ancho: {width}px</p>
        </div>
      </div>
      <KModal open={open} onClose={() => setOpen(false)} title={title} width={width}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <KButton variant="secondary" onClick={() => setOpen(false)}>Cancelar</KButton>
            <KButton variant="primary" onClick={() => setOpen(false)}>Confirmar</KButton>
          </div>
        }
      >
        <p style={{ fontSize: 14, color: khorTokens.colors.neutral[500], margin: 0 }}>
          Este es un modal con título "{title}" y ancho de {width}px. Puedes modificar estos valores desde los controles del playground.
        </p>
      </KModal>
    </div>
  );
}

function DrawerPlayground() {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<'left' | 'right'>('right');
  const [width, setWidth] = useState(400);
  const [title, setTitle] = useState('Detalle de Empleado');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 220 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Título</label><input value={title} onChange={(e) => setTitle(e.target.value)} style={sel} /></div>
          <div>
            <label style={ctrl}>Posición</label>
            <select value={placement} onChange={(e) => setPlacement(e.target.value as any)} style={sel}>
              <option value="right">Derecha</option>
              <option value="left">Izquierda</option>
            </select>
          </div>
          <div>
            <label style={ctrl}>Ancho (px)</label>
            <select value={width} onChange={(e) => setWidth(Number(e.target.value))} style={sel}>
              {[320, 400, 500, 600].map((w) => <option key={w} value={w}>{w}px</option>)}
            </select>
          </div>
          <KButton variant="primary" onClick={() => setOpen(true)} icon={<Eye size={14} />}>Abrir Drawer</KButton>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300, padding: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 120 }}>
        <div style={{ textAlign: 'center', color: khorTokens.colors.neutral[400], fontSize: 13 }}>
          <Settings size={24} style={{ marginBottom: 8, opacity: 0.4 }} />
          <p style={{ margin: 0 }}>Ajusta y presiona "Abrir Drawer"</p>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: khorTokens.colors.neutral[300] }}>Posición: {placement} • Ancho: {width}px</p>
        </div>
      </div>
      <KDrawer open={open} onClose={() => setOpen(false)} title={title} width={width} placement={placement}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <KButton variant="secondary" onClick={() => setOpen(false)}>Cerrar</KButton>
            <KButton variant="primary" onClick={() => setOpen(false)}>Guardar</KButton>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <KFormField label="Nombre"><KInput defaultValue="Maria Garcia" /></KFormField>
          <KFormField label="Departamento"><KInput defaultValue="Recursos Humanos" /></KFormField>
          <KFormField label="Email"><KInput defaultValue="maria@khor.com" /></KFormField>
        </div>
      </KDrawer>
    </div>
  );
}

function ToastPlayground() {
  const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
  const [title, setTitle] = useState('Operación exitosa');
  const [desc, setDesc] = useState('El registro fue guardado correctamente.');
  const [duration, setDuration] = useState(4000);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Tipo</label>
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
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Vista rápida</h4>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <KButton size="sm" variant="primary" onClick={() => kToast({ type: 'success', title: 'Guardado', description: 'Registro exitoso.' })}>
            <CheckCircle size={14} style={{ marginRight: 4 }} /> Éxito
          </KButton>
          <KButton size="sm" variant="danger" onClick={() => kToast({ type: 'error', title: 'Error', description: 'No se pudo guardar.' })}>
            <XCircle size={14} style={{ marginRight: 4 }} /> Error
          </KButton>
          <KButton size="sm" variant="secondary" onClick={() => kToast({ type: 'warning', title: 'Advertencia', description: 'Revisa los campos.' })}>
            <AlertTriangle size={14} style={{ marginRight: 4 }} /> Warning
          </KButton>
          <KButton size="sm" variant="navy" onClick={() => kToast({ type: 'info', title: 'Info', description: 'Hay una actualización.' })}>
            <Info size={14} style={{ marginRight: 4 }} /> Info
          </KButton>
        </div>
      </div>
    </div>
  );
}

function TabsPlayground() {
  const [type, setType] = useState<any>('line');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div><label style={ctrl}>Tipo</label><select value={type} onChange={(e) => setType(e.target.value)} style={sel}>{['line', 'card'].map(t => <option key={t}>{t}</option>)}</select></div>
      </div>
      <div style={{ flex: 2, minWidth: 400, padding: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KTabs type={type} items={[
          { key: 'general', label: 'General', icon: <Users size={16} />, children: <p style={{ padding: 16, color: khorTokens.colors.neutral[500] }}>Contenido de la pestana General.</p> },
          { key: 'docs', label: 'Documentos', icon: <FileText size={16} />, children: <p style={{ padding: 16, color: khorTokens.colors.neutral[500] }}>Lista de documentos adjuntos.</p> },
          { key: 'stats', label: 'Estadisticas', icon: <BarChart3 size={16} />, children: <p style={{ padding: 16, color: khorTokens.colors.neutral[500] }}>Metricas de rendimiento.</p> },
        ]} />
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

const organisms: Record<string, OrganismEntry> = {
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
      { name: 'columns', type: 'KDataTableColumn[]', required: true, description: 'Definicion de columnas con key, title, dataIndex, render y sortable.' },
      { name: 'data', type: 'T[]', required: true, description: 'Array de datos a mostrar.' },
      { name: 'loading', type: 'boolean', description: 'Estado de carga.' },
      { name: 'searchable', type: 'boolean', default: 'true', description: 'Habilita busqueda integrada.' },
      { name: 'searchPlaceholder', type: 'string', description: 'Placeholder de busqueda.' },
      { name: 'actions', type: 'ReactNode', description: 'Botones de accion en el toolbar.' },
      { name: 'rowKey', type: 'string', default: "'id'", description: 'Propiedad unica de cada fila.' },
      { name: 'pageSize', type: 'number', default: '10', description: 'Registros por pagina.' },
      { name: 'onRowClick', type: '(record) => void', description: 'Callback al hacer click en una fila.' },
      { name: 'enableRowSelection', type: 'boolean', description: 'Permite seleccionar filas multiples con checkboxes.' },
      { name: 'enableColumnToggle', type: 'boolean', description: 'Muestra un menu colapsable para controlar visibilidad de columnas.' },
      { name: 'enableExport', type: 'boolean', description: 'Exporta los datos en pantalla a CSV.' },
      { name: 'stickyHeader', type: 'boolean', description: 'Fija el encabezado al hacer scroll.' },
      { name: 'onSelectionChange', type: '(selectedRows) => void', description: 'Callback de filas seleccionadas.' },
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
    name: 'KDrawer',
    description: 'Panel lateral deslizable para detalles, formularios o inspectores. Aparece desde el lado derecho por defecto.',
    preview: <DrawerDemo />,
    playground: <DrawerPlayground />,
    code: `import { KDrawer } from '@khor/design-system/organisms/index';

<KDrawer
  open={open}
  onClose={() => setOpen(false)}
  title="Detalle de Empleado"
  width={400}
  footer={...}
>
  <KFormField label="Nombre">
    <KInput value={name} onChange={...} />
  </KFormField>
</KDrawer>`,
    filename: 'KDrawer.tsx',
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
      <KTabs
        items={[
          { key: 'general', label: 'General', icon: <Users size={16} />, children: <p style={{ padding: 16, color: khorTokens.colors.neutral[500] }}>Contenido de la pestana General con datos del empleado.</p> },
          { key: 'docs', label: 'Documentos', icon: <FileText size={16} />, children: <p style={{ padding: 16, color: khorTokens.colors.neutral[500] }}>Lista de documentos y archivos adjuntos.</p> },
          { key: 'stats', label: 'Estadisticas', icon: <BarChart3 size={16} />, children: <p style={{ padding: 16, color: khorTokens.colors.neutral[500] }}>Graficos y metricas de rendimiento.</p> },
        ]}
      />
    ),
    playground: <TabsPlayground />,
    code: `import { KTabs } from '@khor/design-system/organisms/index';

<KTabs
  items={[
    { key: 'general', label: 'General', icon: <Users size={16} />, children: <GeneralTab /> },
    { key: 'docs', label: 'Documentos', icon: <FileText size={16} />, children: <DocsTab /> },
  ]}
  defaultActiveKey="general"
  onChange={(key) => setActiveTab(key)}
/>`,
    filename: 'KTabs.tsx',
    props: [
      { name: 'items', type: 'KTabItem[]', required: true, description: 'Array de tabs con key, label, icon y children.' },
      { name: 'defaultActiveKey', type: 'string', description: 'Tab activo por defecto.' },
      { name: 'onChange', type: '(key: string) => void', description: 'Callback al cambiar de tab.' },
      { name: 'type', type: "'line' | 'card'", default: "'line'", description: 'Estilo de las pestanas.' },
    ],
    guidelines: ['Maximo 5-6 tabs. Para mas, usa navegacion por menu.', 'Incluye icono Lucide (16px) para mejorar legibilidad.'],
  },
  'toast-manager': {
    id: 'toast-manager',
    name: 'KToastManager',
    description: 'Sistema de notificaciones tipo toast con 4 variantes semanticas (success, error, warning, info). Usa la libreria Sonner con estilos Khor.',
    preview: <ToastDemo />,
    playground: <ToastPlayground />,
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
  'upload': {
    id: 'upload', name: 'KUpload',
    description: 'Componente de subida de archivos con zona de drag & drop, lista de archivos con estado (subiendo, completado, error), progreso y previews de imagen.',
    preview: (<KUpload multiple accept="image/*,.pdf" maxSize={5 * 1024 * 1024} />),
    code: `import { KUpload } from '@khor/organisms-extended';\n\n<KUpload\n  multiple\n  accept="image/*,.pdf"\n  maxSize={5 * 1024 * 1024}\n  value={files}\n  onChange={setFiles}\n  onUpload={async (file) => { /* upload logic */ }}\n/>`,
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
  'tree': {
    id: 'tree', name: 'KTree',
    description: 'Vista de arbol expandible/colapsable con soporte para seleccion, checkboxes, iconos y lineas de conexion. Ideal para jerarquias de carpetas o categorias.',
    preview: (<KTree showLine showIcon data={[{ key: 'rh', title: 'Recursos Humanos', children: [{ key: 'rh-1', title: 'Reclutamiento', isLeaf: true }, { key: 'rh-2', title: 'Capacitacion', isLeaf: true }] }, { key: 'tech', title: 'Tecnologia', children: [{ key: 'tech-1', title: 'Frontend', isLeaf: true }, { key: 'tech-2', title: 'Backend', isLeaf: true }, { key: 'tech-3', title: 'DevOps', isLeaf: true }] }, { key: 'fin', title: 'Finanzas', isLeaf: true }]} defaultExpandAll />),
    code: `import { KTree } from '@khor/organisms-extended';\n\n<KTree\n  data={treeData}\n  checkable\n  showLine\n  defaultExpandAll\n  onSelect={(keys) => setSelected(keys)}\n/>`,
    filename: 'KTree.tsx',
    props: [
      { name: 'data', type: 'KTreeNode[]', required: true, description: 'Nodos con key, title y children.' },
      { name: 'checkable', type: 'boolean', description: 'Mostrar checkboxes.' },
      { name: 'showLine', type: 'boolean', description: 'Lineas de conexion.' },
      { name: 'showIcon', type: 'boolean', default: 'true', description: 'Iconos de carpeta/archivo.' },
      { name: 'defaultExpandAll', type: 'boolean', description: 'Expandir todo por defecto.' },
      { name: 'onSelect', type: '(keys, info) => void', description: 'Al seleccionar nodo.' },
      { name: 'onCheck', type: '(keys) => void', description: 'Al checkear nodo.' },
    ],
    guidelines: ['Usa showLine para jerarquias profundas.', 'defaultExpandAll para arboles pequenos.'],
  },
  'tour': {
    id: 'tour', name: 'KTour',
    description: 'Tour guiado paso a paso para onboarding. Resalta elementos de la UI con mascara, muestra cards con titulo, descripcion y navegacion entre pasos.',
    preview: (<div style={{ padding: 24, textAlign: 'center' }}><KText variant="body-md" color="secondary">El KTour se activa programaticamente con open=true y referencia a elementos del DOM via selectores CSS.</KText><div style={{ marginTop: 16 }}><KButton variant="primary" size="sm">Iniciar Tour (demo)</KButton></div></div>),
    code: `import { KTour } from '@khor/organisms-extended';\n\n<KTour\n  open={showTour}\n  onClose={() => setShowTour(false)}\n  onFinish={() => markOnboardingComplete()}\n  steps={[\n    { title: 'Bienvenido', description: 'Este es el dashboard.', target: '#dashboard' },\n    { title: 'Sidebar', description: 'Navega entre secciones.', target: '#sidebar' },\n  ]}\n/>`,
    filename: 'KTour.tsx',
    props: [
      { name: 'steps', type: 'KTourStep[]', required: true, description: 'Pasos con title, description, target y placement.' },
      { name: 'open', type: 'boolean', description: 'Activar el tour.' },
      { name: 'onClose', type: '() => void', description: 'Al cerrar.' },
      { name: 'onFinish', type: '() => void', description: 'Al completar todos los pasos.' },
      { name: 'mask', type: 'boolean', default: 'true', description: 'Mascara de fondo.' },
    ],
    guidelines: ['Usa target con selectores CSS o funciones.', 'Maximo 5-7 pasos por tour.'],
  },
  'modal-confirm': {
    id: 'modal-confirm', name: 'KModalConfirm',
    description: 'Modal de confirmacion declarativo con tipos (confirm, info, success, warning, error). Soporta callbacks async y boton danger.',
    preview: (<div style={{ padding: 24, textAlign: 'center' }}><KText variant="body-md" color="secondary">KModalConfirm se controla con open/onClose props. Soporta onOk async para operaciones que requieren espera.</KText><div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}><KButton variant="danger" size="sm">Eliminar (demo)</KButton><KButton variant="primary" size="sm">Confirmar (demo)</KButton></div></div>),
    code: `import { KModalConfirm } from '@khor/organisms-extended';\n\n<KModalConfirm\n  open={showConfirm}\n  onClose={() => setShowConfirm(false)}\n  type="confirm"\n  title="Eliminar empleado?"\n  content="Esta accion no se puede deshacer."\n  onOk={async () => { await deleteEmployee(); }}\n/>`,
    filename: 'KModalConfirm.tsx',
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Visibilidad.' },
      { name: 'onClose', type: '() => void', required: true, description: 'Al cerrar.' },
      { name: 'type', type: "'confirm'|'info'|'success'|'warning'|'error'", default: "'confirm'", description: 'Tipo de confirmacion.' },
      { name: 'title', type: 'ReactNode', description: 'Titulo.' },
      { name: 'content', type: 'ReactNode', description: 'Contenido.' },
      { name: 'onOk', type: '() => void | Promise', description: 'Callback al aceptar (soporta async).' },
      { name: 'showCancel', type: 'boolean', default: 'true', description: 'Mostrar boton cancelar.' },
    ],
    guidelines: ['Usa type="error" con variant="danger" para eliminaciones.', 'onOk async muestra loading automaticamente.'],
  },
  'form-list': {
    id: 'form-list', name: 'KFormList',
    description: 'Lista dinamica de campos de formulario. Permite agregar, eliminar y reordenar filas. Ideal para formularios con items repetibles.',
    preview: (<KFormList value={[{ key: 'f1', name: 'Juan', role: 'Dev' }, { key: 'f2', name: 'Maria', role: 'PM' }]} renderItem={(field, idx, ops) => (<div style={{ display: 'flex', gap: 8 }}><KInput placeholder="Nombre" value={field.name} /><KInput placeholder="Rol" value={field.role} /></div>)} addText="Agregar miembro" maxItems={5} />),
    code: `import { KFormList } from '@khor/organisms-extended';\n\n<KFormList\n  value={members}\n  onChange={setMembers}\n  renderItem={(field, idx, { remove }) => (\n    <div style={{ display: 'flex', gap: 8 }}>\n      <KInput placeholder="Nombre" />\n      <KInput placeholder="Rol" />\n    </div>\n  )}\n  addText="Agregar miembro"\n  maxItems={10}\n/>`,
    filename: 'KFormList.tsx',
    props: [
      { name: 'value', type: 'KFormListField[]', description: 'Array de campos.' },
      { name: 'onChange', type: '(fields) => void', description: 'Callback al cambiar.' },
      { name: 'renderItem', type: '(field, index, ops) => ReactNode', required: true, description: 'Render de cada fila.' },
      { name: 'addText', type: 'string', default: "'Agregar campo'", description: 'Texto del boton agregar.' },
      { name: 'maxItems', type: 'number', description: 'Limite de filas.' },
      { name: 'minItems', type: 'number', default: '0', description: 'Minimo de filas.' },
    ],
    guidelines: ['Usa maxItems para evitar formularios demasiado largos.', 'renderItem recibe operaciones remove, etc.'],
  },
  'carousel': {
    id: 'carousel', name: 'KCarousel',
    description: 'Carrusel de contenido con soporte para autoplay, efectos (scroll/fade) y posición de indicadores. Internamente usa Ant Design Carousel con toda su potencia.',
    preview: (
      <div style={{ maxWidth: 480 }}>
        <KCarousel autoplay dotPosition="bottom">
          {[['#E04D36', 'Slide 1 — Primario'], ['#051758', 'Slide 2 — Navy'], ['#E07C36', 'Slide 3 — Accent']].map(([bg, label]) => (
            <div key={label}>
              <div style={{ height: 160, backgroundColor: bg as string, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 20, fontWeight: 700, borderRadius: 12 }}>{label}</div>
            </div>
          ))}
        </KCarousel>
      </div>
    ),
    code: `import { KCarousel } from '@khor/organisms-extended';

<KCarousel autoplay dotPosition="bottom" effect="scrollx">
  <div><div style={{ height: 200, background: '#E04D36' }}>Slide 1</div></div>
  <div><div style={{ height: 200, background: '#051758' }}>Slide 2</div></div>
</KCarousel>`,
    filename: 'KCarousel.tsx',
    props: [
      { name: 'autoplay', type: 'boolean', description: 'Reproducción automática.' },
      { name: 'autoplaySpeed', type: 'number', default: '3000', description: 'Velocidad de autoplay en ms.' },
      { name: 'effect', type: "'scrollx' | 'fade'", default: "'scrollx'", description: 'Tipo de transición.' },
      { name: 'dotPosition', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Posición de los indicadores.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Slides del carrusel.' },
    ],
    guidelines: ['Cada slide debe ser un <div> wrapper con el contenido dentro.', 'Usa autoplay para presentaciones y galerías de imágenes.'],
  },
  'calendar': {
    id: 'calendar', name: 'KCalendar',
    description: 'Calendario completo interactivo basado en Ant Design Calendar. Soporta vistas de mes y año, selección de fechas, y eventos personalizados mediante renderCell.',
    preview: (
      <div style={{ maxWidth: 500 }}>
        <KCalendar fullscreen={false} />
      </div>
    ),
    code: `import { KCalendar } from '@khor/organisms-extended';

<KCalendar
  fullscreen={false}
  onChange={(date) => console.log(date)}
  onPanelChange={(date, mode) => console.log(mode)}
/>`,
    filename: 'KCalendar.tsx',
    props: [
      { name: 'value', type: 'Date', description: 'Fecha seleccionada controlada.' },
      { name: 'onChange', type: '(date: Date) => void', description: 'Callback al seleccionar una fecha.' },
      { name: 'onPanelChange', type: '(date: Date, mode) => void', description: 'Callback al cambiar de panel (mes/año).' },
      { name: 'fullscreen', type: 'boolean', default: 'true', description: 'Modo pantalla completa o compacto.' },
    ],
    guidelines: ['Usa fullscreen={false} para versiones compactas en dashboards.', 'Ideal para agendar citas, eventos y calendarios editoriales.'],
  },
  'form': {
    id: 'form', name: 'KForm',
    description: 'Sistema de formularios potente con validación integrada, manejo de estado y layout flexible. Basado en Ant Design Form.',
    preview: (
      <div style={{ maxWidth: 400 }}>
        <KForm layout="vertical" onFinish={(values) => console.log(values)}>
          <KForm.Item name="username" label="Usuario" rules={[{ required: true, message: 'Requerido' }]}>
            <KInput placeholder="Ingrese usuario" />
          </KForm.Item>
          <KForm.Item name="email" label="Email" rules={[{ type: 'email', message: 'Email invalido' }]}>
            <KInput placeholder="email@ejemplo.com" />
          </KForm.Item>
          <KButton kVariant="primary" htmlType="submit" style={{ width: '100%' }}>Enviar</KButton>
        </KForm>
      </div>
    ),
    code: `import { KForm } from '@khor/design-system/organisms-extended';

<KForm layout="vertical" onFinish={(values) => console.log(values)}>
  <KForm.Item name="username" label="Usuario" rules={[{ required: true }]}>
    <KInput />
  </KForm.Item>
  <KButton kVariant="primary" htmlType="submit">Enviar</KButton>
</KForm>`,
    filename: 'KForm.tsx',
    props: [
      { name: 'layout', type: "'horizontal'|'vertical'|'inline'", default: "'horizontal'", description: 'Disposición de etiquetas y campos.' },
      { name: 'onFinish', type: '(values) => void', description: 'Callback al enviar con éxito.' },
      { name: 'form', type: 'FormInstance', description: 'Instancia del formulario (useKForm).' },
    ],
    guidelines: ['Usa KForm.Item para envolver cada campo.', 'Define rules para validación automática.'],
  },
  'notification': {
    id: 'notification', name: 'KNotification',
    description: 'Notificaciones emergentes imperativas que aparecen en las esquinas de la pantalla. Ideales para avisos de larga duración o que requieren más contexto.',
    preview: (
      <div style={{ display: 'flex', gap: 12 }}>
        <KButton onClick={() => KNotification.success({ message: 'Completado', description: 'El proceso terminó con éxito.' })}>Success</KButton>
        <KButton onClick={() => KNotification.error({ message: 'Error', description: 'Hubo un problema.' })}>Error</KButton>
      </div>
    ),
    code: `import { KNotification } from '@khor/design-system/organisms-extended';

KNotification.success({
  message: 'Titulo',
  description: 'Cuerpo del mensaje...',
  placement: 'topRight'
});`,
    filename: 'KNotification.tsx',
    props: [
      { name: 'message', type: 'string', required: true, description: 'Título de la notificación.' },
      { name: 'description', type: 'string', description: 'Contenido adicional.' },
      { name: 'placement', type: 'string', default: "'topRight'", description: 'Ubicación en pantalla.' },
    ],
    guidelines: ['Usa para avisos que no deben desaparecer tan pronto como un Toast.', 'Soporta iconos y estilos semánticos.'],
  },
  'message': {
    id: 'message', name: 'KMessage',
    description: 'Mensajes de feedback globales que aparecen centrados en la parte superior. Muy ligeros y automáticos.',
    preview: (
      <div style={{ display: 'flex', gap: 12 }}>
        <KButton onClick={() => KMessage.success('Copiado al portapapeles')}>Success</KButton>
        <KButton onClick={() => KMessage.loading('Procesando...', 2)}>Loading</KButton>
      </div>
    ),
    code: `import { KMessage } from '@khor/design-system/organisms-extended';

KMessage.success('Copiado');
KMessage.warning('Advertencia');
const hide = KMessage.loading('Cargando...', 0);
// llamar hide() para cerrar`,
    filename: 'KMessage.tsx',
    props: [
      { name: 'content', type: 'string', required: true, description: 'Texto del mensaje.' },
      { name: 'duration', type: 'number', default: '3', description: 'Segundos antes de cerrar.' },
    ],
    guidelines: ['Usa para feedbacks inmediatos y breves (copiar, descargar, guardar).'],
  },
  'pagination': {
    id: 'pagination', name: 'KPagination',
    description: 'Control de navegación para grandes conjuntos de datos. Soporta cambio de página, tamaño de página y salto rápido.',
    preview: (<KPagination total={50} showSizeChanger />),
    code: `import { KPagination } from '@khor/design-system/organisms-extended';

<KPagination
  total={100}
  pageSize={10}
  onChange={(page, size) => console.log(page, size)}
  showSizeChanger
/>`,
    filename: 'KPagination.tsx',
    props: [
      { name: 'total', type: 'number', required: true, description: 'Número total de registros.' },
      { name: 'pageSize', type: 'number', description: 'Registros por página.' },
      { name: 'onChange', type: '(page, size) => void', description: 'Callback al cambiar.' },
    ],
    guidelines: ['Usa debajo de listas o grillas de cards que no usen KDataTable.'],
  },
};

export function OrganismsPage() {
  const { id } = useParams<{ id: string }>();
  const org = id ? organisms[id] : null;

  if (!org) {
    return (
      <div style={{ textAlign: 'center', padding: 64, fontFamily: khorTokens.typography.fontPrimary }}>
        <KText variant="h2" color="navy">Organismo no encontrado</KText>
        <KText variant="body-md" color="secondary">Selecciona un organismo del menú lateral.</KText>
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
      guidelines={org.guidelines}
      aiNotes={org.aiNotes}
    />
  );
}