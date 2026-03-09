/**
 * OrganismsPage — Documentacion de organismos del sistema Khor
 */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { ComponentDoc } from '../components/docs/ComponentDoc';
import type { PropDef } from '../components/docs/ComponentDoc';
import {
  KDataTable, SparklineCell, KModal, KDrawer,
  KCardSection, KTabs, KToastProvider, kToast,
} from '../components/design-system/organisms';
import { KButton, KBadge, KText, KInput } from '../components/design-system/atoms';
import { KUserCell, KFormField } from '../components/design-system/molecules';
import {
  Download, Filter, Plus, RefreshCw, CheckCircle,
  AlertTriangle, XCircle, Info, BarChart3, Users, FileText,
  Settings, Eye,
} from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';
import { KCommandBarPreview } from '../components/design-system/command-bar';

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
    render: (v: number[]) => <SparklineCell data={v} />,
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
            <input type="checkbox" checked={isLoading} onChange={(e) => setIsLoading(e.target.checked)} /> Estado de carga
          </label>
        </div>
      </div>
      <div style={{ flex: 3, minWidth: 500 }}>
        <KDataTable
          columns={tableColumns}
          data={mockEmployees}
          searchable={searchable}
          loading={isLoading}
          pageSize={pgSize}
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
        <div><label style={ctrl}>Tipo</label><select value={type} onChange={(e) => setType(e.target.value)} style={sel}>{['line','card'].map(t=><option key={t}>{t}</option>)}</select></div>
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
    code: `import { KDataTable, SparklineCell } from '@khor/design-system/organisms';

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
    render: (v) => <SparklineCell data={v} />,
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
    ],
    guidelines: [
      'Usa SparklineCell para mostrar tendencias en columnas numericas.',
      'Siempre incluye al menos un boton de accion principal (Nuevo, Exportar, etc).',
      'Las columnas con sortable: true permiten ordenamiento automatico.',
    ],
    aiNotes: 'KDataTable es el organismo central para listar datos. La IA puede extraer datos de las filas, filtrar por busqueda, y analizar sparklines para detectar tendencias.',
  },
  sparkline: {
    id: 'sparkline',
    name: 'SparklineCell',
    description: 'Mini grafico de linea disenado para celdas de tabla. Muestra tendencias en un espacio minimo usando recharts.',
    preview: (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Crecimiento</p>
          <SparklineCell data={[20, 25, 30, 35, 40, 45, 50]} color={khorTokens.colors.feedback.success} width={100} height={32} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Decrecimiento</p>
          <SparklineCell data={[50, 48, 42, 38, 35, 30, 28]} color={khorTokens.colors.feedback.error} width={100} height={32} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Estable</p>
          <SparklineCell data={[40, 42, 39, 41, 40, 42, 41]} color={khorTokens.colors.brand.primary} width={100} height={32} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Accent</p>
          <SparklineCell data={[10, 15, 12, 20, 25, 22, 30]} color={khorTokens.colors.brand.accent} width={100} height={32} />
        </div>
      </div>
    ),
    code: `import { SparklineCell } from '@khor/design-system/organisms';

// Dentro de una columna de KDataTable
{
  key: 'trend',
  title: 'Tendencia',
  dataIndex: 'trend',
  render: (data) => (
    <SparklineCell
      data={data}
      color="#2E7D32"
      width={80}
      height={24}
    />
  ),
}`,
    filename: 'SparklineCell.tsx',
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
    code: `import { KModal } from '@khor/design-system/organisms';

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
    code: `import { KDrawer } from '@khor/design-system/organisms';

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
    code: `import { KCardSection } from '@khor/design-system/organisms';

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
    code: `import { KTabs } from '@khor/design-system/organisms';

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
    code: `import { KToastProvider, kToast } from '@khor/design-system/organisms';

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
};

export function OrganismsPage() {
  const { id } = useParams<{ id: string }>();
  const org = id ? organisms[id] : null;

  if (!org) {
    return (
      <div style={{ textAlign: 'center', padding: 64, fontFamily: khorTokens.typography.fontPrimary }}>
        <KText variant="h2" color="navy">Organismo no encontrado</KText>
        <KText variant="body-md" color="secondary">Selecciona un organismo del menu lateral.</KText>
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