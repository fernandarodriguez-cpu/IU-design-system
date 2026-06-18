/**
 * OrganismsPage — Documentacion de organismos del sistema Khor
 */
import React, { useState, useRef, useEffect, useMemo } from 'react';

import { useParams } from 'react-router';
import { ComponentDoc } from '../components/docs/ComponentDoc';
import type { PropDef } from '../components/docs/ComponentDoc';
import { KDataTable, KTableRowActions, KTableRowStart, KTableCell, KFormWizard, KResizablePanelGroup, KResizablePanel, KResizableHandle } from '../components/design-system/organisms';
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
import { KSidebarMenu } from '../components/design-system/organisms/KSidebarMenu';
import type { KSidebarMenuItem } from '../components/design-system/organisms/KSidebarMenu';
import { KHeader } from '../components/design-system/organisms/KHeader';
import { KTabsFolder } from '../components/design-system/organisms/KTabsFolder';
import { KBadgeCount } from '../components/design-system/atoms/KBadge';
import {
  Building2, LibraryBig, BookCopy, BookCheck, BookUser,
  BookText, Bell, GitCompare, ShieldCheck as ShieldCheckIcon,
} from 'lucide-react';
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
  Settings, Eye, MoreHorizontal, Upload,
} from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';
import type { OrganismData } from '../registry/registry-types';
import { KCommandBarPreview } from '../components/design-system/command-bar';
import { 
  Trash2, FolderOpen, Folder, File,
  ChevronRight as ExpandIcon
} from 'lucide-react';
import { cn } from '@/utils/cn';

/* ─── Mock Data ─────────────────────────────── */
const mockEmployees = [
  { id: '1', name: 'Maria Garcia', dept: 'Recursos Humanos', status: 'success' as const, salary: 45000, active: true,  starred: true,  trend: [30, 35, 40, 38, 42, 45] },
  { id: '2', name: 'Juan Perez',   dept: 'Tecnologia',       status: 'success' as const, salary: 62000, active: true,  starred: false, trend: [40, 45, 48, 52, 55, 62] },
  { id: '3', name: 'Ana Lopez',    dept: 'Finanzas',         status: 'warning' as const, salary: 48000, active: false, starred: false, trend: [48, 47, 46, 48, 47, 48] },
  { id: '4', name: 'Carlos Ruiz',  dept: 'Operaciones',      status: 'error'   as const, salary: 35000, active: false, starred: true,  trend: [40, 38, 36, 35, 34, 35] },
  { id: '5', name: 'Laura Diaz',   dept: 'Tecnologia',       status: 'success' as const, salary: 58000, active: true,  starred: false, trend: [35, 40, 45, 48, 52, 58] },
  { id: '6', name: 'Pedro Martinez', dept: 'Ventas',         status: 'success' as const, salary: 42000, active: true,  starred: false, trend: [30, 32, 35, 38, 40, 42] },
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


const tableColumnsWithActions = [
  {
    id: 'start',
    header: '',
    size: 72,
    cell: (info: any) => (
      <KTableRowStart
        checked={info.row.getIsSelected()}
        onCheck={(v) => info.row.toggleSelected(v)}
        starred={info.row.original.starred}
        onStar={(v) => console.log('star', info.row.original.id, v)}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: 'Empleado',
    cell: (info: any) => <KUserCell name={info.getValue()} role="" />,
  },
  { accessorKey: 'dept', header: 'Departamento' },
  {
    accessorKey: 'status',
    header: 'Estado',
    cell: (info: any) => {
      const v = info.getValue();
      return <KBadge status={v as any} label={statusLabels[v] || v} />;
    },
  },
  {
    id: 'actions',
    header: 'Acciones',
    size: 140,
    cell: (info: any) => (
      <KTableRowActions
        active={info.row.original.active}
        onToggle={(v) => console.log('toggle', info.row.original.id, v)}
        onView={() => console.log('view', info.row.original.id)}
        menuItems={[
          { label: 'Editar', onClick: () => console.log('edit', info.row.original.id) },
          { label: 'Duplicar', onClick: () => console.log('dup', info.row.original.id) },
          { label: 'Eliminar', danger: true, onClick: () => console.log('del', info.row.original.id) },
        ]}
      />
    ),
    enableSorting: false,
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

function CtrlCheck({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-xs cursor-pointer select-none text-[#374151]">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} className="accent-[#E04D36]" />
      {label}
    </label>
  );
}

function CtrlSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">{title}</p>
      {children}
    </div>
  );
}

// ── Fake value pools for dynamically-generated table data ─────────
const _PRIM: string[][] = [
  ['Ana García','Luis Martínez','Sara López','Carlos Ruiz','María Torres','José Hernández','Carmen Díaz','Pablo Sánchez'],
  ['Tecnología','RR.HH.','Finanzas','Ventas','Operaciones','Marketing','Legal','Diseño'],
  ['Activo','Inactivo','Pendiente','Activo','Activo','Inactivo','Activo','Pendiente'],
  ['$45,000','$52,000','$38,000','$61,000','$47,000','$55,000','$43,000','$59,000'],
  ['México','Colombia','Argentina','España','Chile','Perú','Ecuador','Venezuela'],
  ['Senior','Junior','Mid-level','Lead','Director','Manager','Analyst','Specialist'],
  ['01/01/2020','03/15/2022','06/08/2019','10/22/2021','02/14/2023','08/30/2018','11/05/2022','04/17/2021'],
];
const _SEC: string[][] = [
  ['ana@corp.com','luis@corp.com','sara@corp.com','carlos@corp.com','maria@corp.com','jose@corp.com','carmen@corp.com','pablo@corp.com'],
  ['Dpto. #001','Dpto. #002','Dpto. #003','Dpto. #004','Dpto. #005','Dpto. #006','Dpto. #007','Dpto. #008'],
  ['Desde ene 2022','Desde mar 2023','Desde jun 2020','Desde oct 2021','Desde feb 2023','Desde ago 2019','Desde nov 2022','Desde abr 2021'],
  ['+ $3,200 bono','+ $4,100 bono','+ $2,800 bono','+ $5,500 bono','+ $3,700 bono','+ $4,400 bono','+ $3,100 bono','+ $4,800 bono'],
  ['CDMX','Bogotá','Buenos Aires','Madrid','Santiago','Lima','Quito','Caracas'],
  ['Área Técnica','Área Comercial','Área Admin.','Área Creativa','Área Legal','Área Gerencial','Área Analítica','Área Ops.'],
  ['09:00–18:00','08:30–17:30','10:00–19:00','07:00–16:00','09:30–18:30','08:00–17:00','11:00–20:00','07:30–16:30'],
];
const _p = (c: number, r: number) => _PRIM[c % _PRIM.length][r % 8];
const _s = (c: number, r: number) => _SEC [c % _SEC.length] [r % 8];

function generateDynData(numCols: number, totalRows: number) {
  return Array.from({ length: totalRows }, (_, r) => {
    const row: Record<string, any> = { _id: r, starred: r % 3 === 0, active: r % 2 === 0 };
    for (let c = 0; c < numCols; c++) { row[`c${c}`] = _p(c, r); row[`c${c}x`] = _s(c, r); }
    return row;
  });
}

// ── Grid dimension picker ─────────────────────────────────────────
function GridDimensionPicker({ cols, rows, onSelect, onClose }: {
  cols: number; rows: number;
  onSelect: (c: number, r: number) => void;
  onClose: () => void;
}) {
  const [hC, setHC] = useState(cols);
  const [hR, setHR] = useState(rows);
  const MAX = 8;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);

  return (
    <div ref={ref}
      className="absolute z-50 top-full left-0 mt-1 bg-[#1C1C1E] rounded-xl shadow-2xl p-3 border border-[#3A3A3C] select-none"
      style={{ width: 268 }}
    >
      {/* header: live dimension labels */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5 bg-[#2C2C2E] border border-[#375BD2] rounded-lg px-2 py-1.5 flex-1">
          <span className="text-[#6B7280] text-[9px]">COL</span>
          <span className="text-white text-xs font-semibold ml-1">{hC}</span>
        </div>
        <span className="text-[#6B7280] text-xs">×</span>
        <div className="flex items-center gap-1.5 bg-[#2C2C2E] border border-[#3A3A3C] rounded-lg px-2 py-1.5 flex-1">
          <span className="text-[#6B7280] text-[9px]">FILAS</span>
          <span className="text-white text-xs font-semibold ml-1">{hR}</span>
        </div>
        <div className="flex items-center gap-1 bg-[#2C2C2E] border border-[#3A3A3C] rounded-lg px-2 py-1.5">
          <span className="text-white text-[10px]">Auto</span>
          <span className="text-[#6B7280] text-[9px]">▾</span>
        </div>
      </div>

      {/* grid cells */}
      <div
        className="grid gap-[5px]"
        style={{ gridTemplateColumns: `repeat(${MAX}, 1fr)` }}
        onMouseLeave={() => { setHC(cols); setHR(rows); }}
      >
        {Array.from({ length: MAX }, (_, r) =>
          Array.from({ length: MAX }, (_, c) => (
            <div
              key={`${r}-${c}`}
              className={cn(
                'aspect-square rounded-[3px] cursor-pointer transition-colors',
                r < hR && c < hC ? 'bg-[#375BD2]' : 'bg-[#3A3A3C] hover:bg-[#505050]'
              )}
              onMouseEnter={() => { setHC(c + 1); setHR(r + 1); }}
              onClick={() => { onSelect(c + 1, r + 1); onClose(); }}
            />
          ))
        )}
      </div>

      <p className="text-center text-white text-[11px] font-semibold mt-2">{hC} × {hR}</p>

      <button
        className="w-full mt-2 py-1.5 rounded-lg bg-[#2C2C2E] text-[#9CA3AF] text-[11px] hover:bg-[#3A3A3C] transition-colors"
        onClick={onClose}
      >
        Cerrar configurador
      </button>
    </div>
  );
}

// ── Dynamic column definition ─────────────────────────────────────
interface DynCol {
  id: string;
  name: string;
  split: boolean;
  segments: string[];   // custom text per segment ('' = use auto pool); 2-10 items when split
  splitMask?: boolean[]; // per-row override: false = render as single cell even when column is split
}

function makeDynCols(n: number, existing: DynCol[]): DynCol[] {
  return Array.from({ length: n }, (_, i) =>
    existing[i] ?? { id: `c${i}_${Date.now()}`, name: `Columna ${i + 1}`, split: false, segments: ['', ''] }
  );
}

// ── Toolbar button config ─────────────────────────────────────────
interface ToolbarBtnCfg {
  id: string;
  label: string;
  variant: 'navy' | 'primary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg' | 'icon';
  iconKey: string;
}

const ICON_MAP: Record<string, React.FC<{ size?: number }>> = {
  none:     () => null,
  refresh:  RefreshCw,
  upload:   Upload,
  download: Download,
  plus:     Plus,
  trash:    Trash2,
  settings: Settings,
  eye:      Eye,
  chart:    BarChart3,
  users:    Users,
  file:     FileText,
};
const ICON_LABELS: Record<string, string> = {
  none: 'Sin ícono', refresh: 'Refresh', upload: 'Upload', download: 'Download',
  plus: 'Plus', trash: 'Trash', settings: 'Settings', eye: 'Eye',
  chart: 'Chart', users: 'Users', file: 'File',
};

function DataTablePlayground() {
  // ── Grid dimension picker state ──
  const [showPicker, setShowPicker] = useState(false);
  const [numCols, setNumCols]       = useState(3);
  const [numRows, setNumRows]       = useState(5);

  // ── User-defined content columns ──
  const [dynCols, setDynCols] = useState<DynCol[]>(() => makeDynCols(3, []));

  const handleGridSelect = (c: number, r: number) => {
    setNumCols(c);
    setNumRows(r);
    setDynCols(prev => makeDynCols(c, prev));
  };

  const updateCol = (id: string, patch: Partial<DynCol>) =>
    setDynCols(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c));

  const addCol = () => {
    const n = dynCols.length;
    setDynCols(prev => { const next = [...prev, { id: `c${Date.now()}`, name: `Columna ${n + 1}`, split: false, segments: ['', ''] }]; setNumCols(next.length); return next; });
  };

  const removeCol = (id: string) =>
    setDynCols(prev => { const next = prev.filter(c => c.id !== id); setNumCols(next.length); return next; });

  // ── Other options ──
  const [size, setSize]                     = useState<'small' | 'middle' | 'large'>('middle');
  const [showCheckbox, setShowCheckbox]     = useState(true);
  const [showStar,     setShowStar]         = useState(true);
  const [showActionsCol, setShowActionsCol] = useState(true);
  const [showToggle,   setShowToggle]       = useState(true);
  const [showView,     setShowView]         = useState(true);
  const [showMenu,     setShowMenu]         = useState(true);

  // ── Toolbar ──
  const [showToolbar, setShowToolbar] = useState(true);
  const [showSearch,  setShowSearch]  = useState(true);
  const [showFilter,  setShowFilter]  = useState(false);
  const [toolbarBtns, setToolbarBtns] = useState<ToolbarBtnCfg[]>([]);

  const addBtn    = () => { if (toolbarBtns.length >= 4) return; setToolbarBtns(p => [...p, { id: `btn_${Date.now()}`, label: 'Botón', variant: 'navy', size: 'md', iconKey: 'none' }]); };
  const removeBtn = (id: string) => setToolbarBtns(p => p.filter(b => b.id !== id));
  const updateBtn = (id: string, patch: Partial<ToolbarBtnCfg>) => setToolbarBtns(p => p.map(b => b.id === id ? { ...b, ...patch } : b));

  // ── Row selection (managed, not TanStack) ──
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // ── Generated table data ──
  const tableData = useMemo(
    () => generateDynData(Math.max(numCols, 1), Math.max(numRows * 4, 20)),
    [numCols, numRows]
  );
  useEffect(() => { setSelectedIds(new Set()); }, [tableData]);

  const allSelected  = tableData.length > 0 && selectedIds.size === tableData.length;
  const someSelected = selectedIds.size > 0 && selectedIds.size < tableData.length;
  const toggleAll    = () => setSelectedIds(allSelected ? new Set() : new Set(tableData.map((r: any) => r._id)));
  const toggleRow    = (id: number) => setSelectedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  // ── Build TanStack column defs ──
  const dynamicColumns = useMemo(() => {
    const cols: any[] = [];
    if (showCheckbox || showStar) {
      cols.push({
        id: 'start', enableSorting: false,
        size: showCheckbox && showStar ? 72 : 44,
        header: () => showCheckbox ? (
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={allSelected}
              ref={(el) => { if (el) el.indeterminate = someSelected; }}
              onChange={toggleAll}
              className="accent-[#E04D36] cursor-pointer"
            />
          </div>
        ) : <span />,
        cell: (info: any) => (
          <KTableRowStart
            checked={showCheckbox ? selectedIds.has(info.row.original._id) : undefined}
            onCheck={showCheckbox ? () => toggleRow(info.row.original._id) : undefined}
            starred={showStar ? info.row.original.starred : undefined}
            onStar={showStar ? (_v: boolean) => {} : undefined}
          />
        ),
      });
    }
    dynCols.forEach((dc, idx) => {
      const key = `c${idx}`;
      cols.push({
        accessorKey: key,
        header: dc.name,
        meta: dc.split ? { splitCell: true } : undefined,
        cell: (info: any) => {
          const r = info.row.original._id ?? 0;
          const rowIdx = info.row.index;
          const isSplit = dc.split && (dc.splitMask === undefined || (dc.splitMask[rowIdx] ?? true));
          if (!isSplit) {
            return dc.segments[0] || String(info.getValue());
          }
          const segs = dc.segments.map((txt, si) => {
            if (txt) return txt;
            if (si === 0) return String(info.getValue());
            if (si === 1) return info.row.original[`${key}x`] ?? _s(idx, r);
            return `—`;
          });
          return <KTableCell divider segments={segs} />;
        },
      });
    });
    if (showActionsCol) {
      cols.push({
        id: 'actions', header: 'Acciones', size: 160, enableSorting: false,
        cell: (info: any) => (
          <KTableRowActions
            active={showToggle ? info.row.original.active : undefined}
            onToggle={showToggle ? (_v: boolean) => {} : undefined}
            onView={showView ? () => {} : undefined}
            menuItems={showMenu ? [
              { label: 'Editar',   onClick: () => {} },
              { label: 'Duplicar', onClick: () => {} },
              { label: 'Eliminar', danger: true, onClick: () => {} },
            ] : undefined}
          />
        ),
      });
    }
    return cols;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dynCols, showCheckbox, showStar, showActionsCol, showToggle, showView, showMenu, selectedIds, allSelected, someSelected]);

  // ── Toolbar right: user-configured buttons only ──
  const toolbarRight = toolbarBtns.length > 0 ? (
    <>
      {toolbarBtns.map(btn => {
        const IconComp = btn.iconKey !== 'none' ? ICON_MAP[btn.iconKey] : null;
        const icon = IconComp ? <IconComp size={15} /> : undefined;
        return (
          <KButton key={btn.id} variant={btn.variant} size={btn.size} icon={icon}>
            {btn.size !== 'icon' ? btn.label : undefined}
          </KButton>
        );
      })}
    </>
  ) : undefined;

  return (
    <div className="flex gap-6 flex-wrap">

      {/* ── CUSTOMIZER PANEL ── */}
      <div className="flex flex-col gap-5 shrink-0 overflow-y-auto" style={{ width: 220, maxHeight: 700 }}>

        {/* Tamaño */}
        <CtrlSection title="Tamaño de fila">
          <div className="flex gap-2">
            {(['small','middle','large'] as const).map(s => (
              <KButton key={s} size="sm" variant={size === s ? 'primary' : 'outline'} onClick={() => setSize(s)}>
                {s === 'small' ? 'S' : s === 'middle' ? 'M' : 'L'}
              </KButton>
            ))}
          </div>
        </CtrlSection>

        {/* Grid dimension picker */}
        <CtrlSection title="Dimensiones de tabla">
          <p className="text-[10px] text-[#9CA3AF] -mt-1">Columnas × filas visibles</p>
          <div className="relative">
            <button
              onClick={() => setShowPicker(v => !v)}
              className="flex items-center gap-2 w-full rounded-lg border border-[#CED4DA] bg-[#F4F4F4] hover:border-[#051758] px-3 py-2 transition-colors"
            >
              <span className="text-[#051758] font-mono text-xs font-bold">{numCols} col × {numRows} filas</span>
              <span className="ml-auto text-[#9CA3AF] text-[10px]">▾</span>
            </button>
            {showPicker && (
              <GridDimensionPicker
                cols={numCols} rows={numRows}
                onSelect={handleGridSelect}
                onClose={() => setShowPicker(false)}
              />
            )}
          </div>
        </CtrlSection>

        {/* User-defined columns list */}
        <CtrlSection title="Columnas de contenido">
          <p className="text-[10px] text-[#9CA3AF] -mt-1">Nombre cada columna. Pulsa ÷ para dividir la celda en dos líneas.</p>
          <div className="flex flex-col gap-2">
            {dynCols.map((dc, idx) => {
              const inCls = 'w-full text-xs px-2 py-1 rounded border border-[#CED4DA] bg-white text-[#374151] outline-none focus:border-[#051758] placeholder:text-[#9CA3AF]';
              const updateSeg = (si: number, val: string) => {
                const next = [...dc.segments];
                next[si] = val;
                updateCol(dc.id, { segments: next });
              };
              const addSeg = () => {
                if (dc.segments.length >= 10) return;
                updateCol(dc.id, { segments: [...dc.segments, ''] });
              };
              const removeSeg = (si: number) => {
                if (dc.segments.length <= 2) return;
                updateCol(dc.id, { segments: dc.segments.filter((_, i) => i !== si) });
              };
              const toggleSplit = () => {
                const nowSplit = !dc.split;
                updateCol(dc.id, {
                  split: nowSplit,
                  segments: nowSplit && dc.segments.length < 2 ? ['', ''] : dc.segments,
                  splitMask: undefined,
                });
              };
              const toggleRowSplit = (ri: number) => {
                setDynCols(prev => prev.map(c => {
                  if (c.id !== dc.id) return c;
                  const base = c.splitMask ?? Array.from({ length: numRows }, () => true);
                  const next = [...base];
                  while (next.length <= ri) next.push(true);
                  next[ri] = !next[ri];
                  return { ...c, splitMask: next };
                }));
              };
              return (
                <div key={dc.id} className="flex flex-col gap-1 pb-2 border-b border-[#F4F4F4] last:border-0 last:pb-0">
                  {/* column header row */}
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] text-[#9CA3AF] w-4 text-right shrink-0">{idx + 1}</span>
                    <input
                      value={dc.name}
                      onChange={e => updateCol(dc.id, { name: e.target.value })}
                      className="flex-1 text-xs px-2 py-1 rounded border border-[#CED4DA] bg-white text-[#374151] outline-none focus:border-[#051758] min-w-0 font-medium"
                      placeholder={`Columna ${idx + 1}`}
                    />
                    <button
                      onClick={toggleSplit}
                      title={dc.split ? `${dc.segments.length} segmentos` : 'Dividir celda'}
                      className={cn(
                        'text-[10px] font-bold px-1.5 py-1 rounded border shrink-0 transition-colors',
                        dc.split
                          ? 'bg-[#E04D36] text-white border-[#E04D36]'
                          : 'bg-white text-[#9CA3AF] border-[#CED4DA] hover:border-[#E04D36] hover:text-[#E04D36]'
                      )}
                    >{dc.split ? `÷${dc.segments.length}` : '÷'}</button>
                    <button
                      onClick={() => removeCol(dc.id)}
                      disabled={dynCols.length <= 1}
                      className="text-xs text-[#9CA3AF] hover:text-[#E04D36] disabled:opacity-30 disabled:cursor-not-allowed px-0.5 shrink-0"
                    >×</button>
                  </div>

                  {/* segment text inputs */}
                  <div className="pl-5 flex flex-col gap-1">
                    {dc.split ? (
                      <>
                        {dc.segments.map((txt, si) => (
                          <div key={si} className="flex items-center gap-1">
                            <span className="text-[9px] text-[#9CA3AF] w-3 shrink-0">{si + 1}</span>
                            <input
                              value={txt}
                              onChange={e => updateSeg(si, e.target.value)}
                              className={cn(inCls, 'flex-1')}
                              placeholder={si === 0 ? _p(idx, 0) : si === 1 ? _s(idx, 0) : `Segmento ${si + 1}`}
                            />
                            {dc.segments.length > 2 && (
                              <button onClick={() => removeSeg(si)} className="text-[10px] text-[#9CA3AF] hover:text-[#E04D36] shrink-0">×</button>
                            )}
                          </div>
                        ))}
                        {dc.segments.length < 10 && (
                          <button onClick={addSeg} className="text-[10px] text-[#051758] hover:text-[#E04D36] text-left transition-colors">
                            + segmento ({dc.segments.length}/10)
                          </button>
                        )}
                        {/* Per-row split toggles */}
                        <div className="flex items-center gap-1 flex-wrap pt-1 border-t border-[#F4F4F4]">
                          <span className="text-[9px] text-[#9CA3AF] shrink-0">Filas div.:</span>
                          {Array.from({ length: numRows }, (_, ri) => {
                            const on = dc.splitMask === undefined || (dc.splitMask[ri] ?? true);
                            return (
                              <button
                                key={ri}
                                onClick={() => toggleRowSplit(ri)}
                                title={on ? `Fila ${ri + 1}: dividida` : `Fila ${ri + 1}: simple`}
                                className={cn(
                                  'text-[9px] w-5 h-5 rounded border font-mono font-bold transition-colors leading-none',
                                  on
                                    ? 'bg-[#E04D36] text-white border-[#E04D36]'
                                    : 'bg-white text-[#9CA3AF] border-[#CED4DA] hover:border-[#E04D36] hover:text-[#E04D36]'
                                )}
                              >{ri + 1}</button>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <input
                        value={dc.segments[0]}
                        onChange={e => updateSeg(0, e.target.value)}
                        className={inCls}
                        placeholder={_p(idx, 0)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={addCol}
            className="mt-1 text-xs text-[#051758] hover:text-[#E04D36] transition-colors font-medium text-left"
          >
            + Agregar columna
          </button>
        </CtrlSection>

        {/* Primera columna */}
        <CtrlSection title="Primera columna">
          <CtrlCheck label="Checkbox"       checked={showCheckbox} onChange={setShowCheckbox} />
          <CtrlCheck label="Estrella (fav)" checked={showStar}     onChange={setShowStar} />
        </CtrlSection>

        {/* Acciones */}
        <CtrlSection title="Columna Acciones">
          <CtrlCheck label="Mostrar columna" checked={showActionsCol} onChange={setShowActionsCol} />
          {showActionsCol && (
            <div className="pl-3 border-l border-[#E5E7EB] flex flex-col gap-1">
              <CtrlCheck label="Toggle activo"   checked={showToggle} onChange={setShowToggle} />
              <CtrlCheck label="Botón ver (ojo)" checked={showView}   onChange={setShowView} />
              <CtrlCheck label="Menú 3 puntos"   checked={showMenu}   onChange={setShowMenu} />
            </div>
          )}
        </CtrlSection>

        {/* Toolbar */}
        <CtrlSection title="Toolbar">
          <CtrlCheck label="Mostrar toolbar"   checked={showToolbar} onChange={setShowToolbar} />
          {showToolbar && (
            <>
              <CtrlCheck label="Barra de búsqueda" checked={showSearch} onChange={setShowSearch} />
              {showSearch && <CtrlCheck label="Botón de filtro (▿)"  checked={showFilter}  onChange={setShowFilter} />}
              <p className="text-[10px] text-[#9CA3AF]">Botones (máx. 4)</p>
              <div className="flex flex-col gap-2">
                {toolbarBtns.map(btn => (
                  <div key={btn.id} className="flex flex-col gap-1 p-2 rounded border border-[#CED4DA] bg-[#FAFAFA]">
                    {/* label row */}
                    <div className="flex items-center gap-1">
                      <input
                        value={btn.label}
                        onChange={e => updateBtn(btn.id, { label: e.target.value })}
                        className="flex-1 text-xs px-2 py-1 rounded border border-[#CED4DA] bg-white text-[#374151] outline-none focus:border-[#051758] min-w-0"
                        placeholder="Texto del botón"
                      />
                      <button onClick={() => removeBtn(btn.id)} className="text-xs text-[#9CA3AF] hover:text-[#E04D36] shrink-0 px-0.5">×</button>
                    </div>
                    {/* variant */}
                    <div className="flex gap-1 flex-wrap">
                      {(['navy','primary','outline','ghost'] as const).map(v => (
                        <button key={v} onClick={() => updateBtn(btn.id, { variant: v })}
                          className={cn('text-[9px] px-1.5 py-0.5 rounded border transition-colors capitalize',
                            btn.variant === v ? 'bg-[#051758] text-white border-[#051758]' : 'bg-white text-[#9CA3AF] border-[#CED4DA] hover:border-[#051758] hover:text-[#051758]'
                          )}
                        >{v}</button>
                      ))}
                    </div>
                    {/* size + icon */}
                    <div className="flex gap-1">
                      <select value={btn.size} onChange={e => updateBtn(btn.id, { size: e.target.value as any })}
                        className="text-[10px] px-1 py-0.5 rounded border border-[#CED4DA] bg-white text-[#374151] outline-none"
                      >
                        {(['sm','md','lg','icon'] as const).map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select value={btn.iconKey} onChange={e => updateBtn(btn.id, { iconKey: e.target.value })}
                        className="flex-1 text-[10px] px-1 py-0.5 rounded border border-[#CED4DA] bg-white text-[#374151] outline-none"
                      >
                        {Object.entries(ICON_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
                {toolbarBtns.length < 4 && (
                  <button onClick={addBtn} className="text-[11px] text-[#051758] hover:text-[#E04D36] transition-colors font-medium text-left">
                    + Agregar botón ({toolbarBtns.length}/4)
                  </button>
                )}
              </div>
            </>
          )}
        </CtrlSection>

      </div>

      {/* ── TABLE PREVIEW ── */}
      <div className="flex-1 min-w-0" style={{ minWidth: 480 }}>
        <KDataTable
          size={size}
          columns={dynamicColumns}
          data={tableData}
          pageSize={numRows}
          searchable={showToolbar && showSearch}
          searchPlaceholder="Buscar"
          filterTrigger={showToolbar && showSearch && showFilter
            ? <KButton variant="navy" size="icon"><Filter size={16} /></KButton>
            : undefined}
          actions={showToolbar ? toolbarRight : undefined}
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
  const [tabType, setTabType]       = useState<'1' | '2' | '3'>('1');
  const [size, setSize]             = useState<'sm' | 'md' | 'lg'>('md');
  const [iconSide, setIconSide]     = useState<'none' | 'left' | 'right'>('none');
  const [showBadge, setShowBadge]   = useState(false);
  const [showLabel, setShowLabel]   = useState(false);
  const [empresaActive, setEmpresaActive] = useState('1');
  const [arrows, setArrows]         = useState<'auto' | 'right' | 'both'>('auto');

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel  = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%', fontFamily: khorTokens.typography.fontPrimary };
  const chk  = { display: 'flex' as const, alignItems: 'center' as const, gap: 8, fontSize: 13, cursor: 'pointer' as const };

  const TABS_DATA = [
    { value: '1', label: 'General',      icon: <Users size={14} />,    badge: '5'  },
    { value: '2', label: 'Documentos',   icon: <FileText size={14} />, badge: '99' },
    { value: '3', label: 'Estadísticas', icon: <BarChart3 size={14} />,badge: '12' },
    { value: '4', label: 'Config',       icon: <Settings size={14} />, badge: '3'  },
  ];

  const folder8 = EMPRESA_DEMO_ITEMS.map((i, idx) => ({
    ...i,
    icon: [<Users size={14}/>, <FileText size={14}/>, <BarChart3 size={14}/>, <Settings size={14}/>,
           <Eye size={14}/>, <Filter size={14}/>, <Info size={14}/>, <Download size={14}/>][idx] as React.ReactNode,
    badge: ['5','99','12','3','7','21','2','9'][idx],
  }));

  const makeTrigger = (t: typeof TABS_DATA[0]) => (
    <KTabsTrigger key={t.value} value={t.value}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        {iconSide === 'left'  && t.icon}
        {t.label}
        {showBadge && <KBadgeCount count={t.badge} color="blue" size="sm" />}
        {iconSide === 'right' && t.icon}
      </span>
    </KTabsTrigger>
  );

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', fontFamily: khorTokens.typography.fontPrimary, minWidth: 0 }}>
      <div style={{ flex: '0 0 200px', minWidth: 200 }}>
        <h4 style={{ fontSize: 13, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Tipo de tab</label>
            <select value={tabType} onChange={(e) => setTabType(e.target.value as '1'|'2'|'3')} style={sel}>
              <option value="1">Tipo 1 — Pill (Select button)</option>
              <option value="2">Tipo 2 — Line (Underline)</option>
              <option value="3">Tipo 3 — Folder</option>
            </select>
          </div>
          {tabType === '3' ? (
            <>
              <div>
                <label style={ctrl}>Tamaño</label>
                <select value={size} onChange={(e) => setSize(e.target.value as 'sm'|'md'|'lg')} style={sel}>
                  <option value="sm">Small (h=25px)</option>
                  <option value="md">Default (h=31px)</option>
                  <option value="lg">Large (h=38px)</option>
                </select>
              </div>
              <div>
                <label style={ctrl}>Posición del ícono</label>
                <select value={iconSide} onChange={(e) => setIconSide(e.target.value as 'none'|'left'|'right')} style={sel}>
                  <option value="none">Sin ícono</option>
                  <option value="left">Izquierda</option>
                  <option value="right">Derecha</option>
                </select>
              </div>
              <label style={chk}>
                <input type="checkbox" checked={showBadge} onChange={(e) => setShowBadge(e.target.checked)} />
                Indicador numérico (badge)
              </label>
              <label style={chk}>
                <input type="checkbox" checked={showLabel} onChange={(e) => setShowLabel(e.target.checked)} />
                Etiqueta superior (label)
              </label>
              <div>
                <label style={ctrl}>Flechas de navegación</label>
                <select value={arrows} onChange={(e) => setArrows(e.target.value as typeof arrows)} style={sel}>
                  <option value="auto">Auto (según overflow)</option>
                  <option value="right">Forzar flecha derecha</option>
                  <option value="both">Forzar ambas flechas</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <div>
                <label style={ctrl}>Tamaño</label>
                <select value={size} onChange={(e) => setSize(e.target.value as 'sm'|'md'|'lg')} style={sel}>
                  <option value="sm">Small</option>
                  <option value="md">Default</option>
                  <option value="lg">Large</option>
                </select>
              </div>
              <div>
                <label style={ctrl}>Posición del ícono</label>
                <select value={iconSide} onChange={(e) => setIconSide(e.target.value as 'none'|'left'|'right')} style={sel}>
                  <option value="none">Sin ícono</option>
                  <option value="left">Izquierda</option>
                  <option value="right">Derecha</option>
                </select>
              </div>
              <label style={chk}>
                <input type="checkbox" checked={showBadge} onChange={(e) => setShowBadge(e.target.checked)} />
                Indicador numérico (badge)
              </label>
              <label style={chk}>
                <input type="checkbox" checked={showLabel} onChange={(e) => setShowLabel(e.target.checked)} />
                Etiqueta superior (label)
              </label>
            </>
          )}
        </div>
      </div>

      <div style={{ flex: '1 1 320px', minWidth: 0, padding: 28, background: 'white', borderRadius: khorTokens.radius.lg, border: '1px solid #e2e8f0', overflowX: 'auto' }}>
        {tabType === '3' ? (
          <div>
            <KTabsFolder
              items={folder8.map(i => ({
                ...i,
                icon: iconSide !== 'none' ? i.icon : undefined,
                badge: showBadge ? i.badge : undefined,
              }))}
              value={empresaActive}
              onChange={setEmpresaActive}
              size={size}
              iconSide={iconSide === 'none' ? undefined : iconSide}
              showLeftArrow={arrows === 'both'}
              showRightArrow={arrows === 'right' || arrows === 'both'}
              label={showLabel ? 'Label' : undefined}
            />
            <p style={{ margin: '16px 0 0', fontSize: 14, color: khorTokens.colors.neutral[500] }}>
              Activo: <strong>{folder8.find(i => i.key === empresaActive)?.label}</strong>
            </p>
          </div>
        ) : (
          <KTabs
            defaultValue="1"
            size={size}
            type={tabType === '2' ? 'line' : 'pill'}
            label={showLabel ? 'Label' : undefined}
          >
            <KTabsList>{TABS_DATA.map(makeTrigger)}</KTabsList>
            {TABS_DATA.map(t => (
              <KTabsContent key={t.value} value={t.value}>
                <p style={{ margin: 0, padding: '12px 0', color: khorTokens.colors.neutral[500], fontSize: 14 }}>Contenido: {t.label}</p>
              </KTabsContent>
            ))}
          </KTabs>
        )}
      </div>
    </div>
  );
}

const EMPRESA_DEMO_ITEMS = [
  { key: '1', label: 'Tab' },
  { key: '2', label: 'Tab' },
  { key: '3', label: 'Tab' },
  { key: '4', label: 'Tab' },
  { key: '5', label: 'Tab' },
  { key: '6', label: 'Tab' },
  { key: '7', label: 'Tab' },
  { key: '8', label: 'Tab' },
];

function TabsFolderPlayground() {
  const [active, setActive]       = useState('1');
  const [itemCount, setItemCount] = useState(5);
  const [size, setSize]           = useState<'sm' | 'md' | 'lg'>('md');
  const [iconSide, setIconSide]   = useState<'none' | 'left' | 'right'>('none');
  const [showBadge, setShowBadge] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [arrows, setArrows]       = useState<'auto' | 'right' | 'both'>('auto');

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel  = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%', fontFamily: khorTokens.typography.fontPrimary };
  const chk  = { display: 'flex' as const, alignItems: 'center' as const, gap: 8, fontSize: 13, cursor: 'pointer' as const };

  const FOLDER_ITEMS = [
    { key: '1', label: 'Tab', icon: <Users size={12} />,    badge: '5'  },
    { key: '2', label: 'Tab', icon: <FileText size={12} />, badge: '99' },
    { key: '3', label: 'Tab', icon: <BarChart3 size={12} />,badge: '12' },
    { key: '4', label: 'Tab', icon: <Settings size={12} />, badge: '3'  },
    { key: '5', label: 'Tab', icon: <Eye size={12} />,      badge: '7'  },
    { key: '6', label: 'Tab', icon: <Filter size={12} />,   badge: '21' },
    { key: '7', label: 'Tab', icon: <Info size={12} />,     badge: '2'  },
    { key: '8', label: 'Tab', icon: <Download size={12} />, badge: '9'  },
  ];

  const items = FOLDER_ITEMS.slice(0, itemCount).map(i => ({
    ...i,
    badge: showBadge ? i.badge : undefined,
    icon: iconSide !== 'none' ? i.icon : undefined,
  }));

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', fontFamily: khorTokens.typography.fontPrimary, minWidth: 0 }}>
      <div style={{ flex: '0 0 200px', minWidth: 200 }}>
        <h4 style={{ fontSize: 13, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Cantidad de pestañas</label>
            <select value={itemCount} onChange={(e) => setItemCount(Number(e.target.value))} style={sel}>
              <option value={3}>3 pestañas</option>
              <option value={5}>5 pestañas</option>
              <option value={8}>8 pestañas</option>
            </select>
          </div>
          <div>
            <label style={ctrl}>Tamaño</label>
            <select value={size} onChange={(e) => setSize(e.target.value as 'sm'|'md'|'lg')} style={sel}>
              <option value="sm">Small (h=25px)</option>
              <option value="md">Default (h=31px)</option>
              <option value="lg">Large (h=38px)</option>
            </select>
          </div>
          <div>
            <label style={ctrl}>Posición del ícono</label>
            <select value={iconSide} onChange={(e) => setIconSide(e.target.value as 'none'|'left'|'right')} style={sel}>
              <option value="none">Sin ícono</option>
              <option value="left">Izquierda</option>
              <option value="right">Derecha</option>
            </select>
          </div>
          <label style={chk}>
            <input type="checkbox" checked={showBadge} onChange={(e) => setShowBadge(e.target.checked)} />
            Indicador numérico (badge)
          </label>
          <label style={chk}>
            <input type="checkbox" checked={showLabel} onChange={(e) => setShowLabel(e.target.checked)} />
            Etiqueta superior (label)
          </label>
          <div>
            <label style={ctrl}>Flechas de navegación</label>
            <select value={arrows} onChange={(e) => setArrows(e.target.value as typeof arrows)} style={sel}>
              <option value="auto">Auto (según overflow)</option>
              <option value="right">Forzar flecha derecha</option>
              <option value="both">Forzar ambas flechas</option>
            </select>
          </div>
        </div>
      </div>
      <div style={{ flex: '1 1 200px', minWidth: 0, padding: 28, background: 'white', borderRadius: khorTokens.radius.lg, border: '1px solid #e2e8f0' }}>
        <KTabsFolder
          items={items}
          value={active}
          onChange={setActive}
          size={size}
          iconSide={iconSide === 'none' ? undefined : iconSide}
          showLeftArrow={arrows === 'both'}
          showRightArrow={arrows === 'right' || arrows === 'both'}
          label={showLabel ? 'Label' : undefined}
        />
        <p style={{ margin: '16px 0 0', fontSize: 14, color: khorTokens.colors.neutral[500] }}>
          Activo: Tab {active}
        </p>
      </div>
    </div>
  );
}

function PaginationPlayground() {
  const [page, setPage]             = useState(4);
  const [pageSize, setPageSize]     = useState(10);
  const [size, setSize]             = useState<'small' | 'default' | 'large'>('default');
  const [showSizer, setShowSizer]   = useState(false);
  const [showTotal, setShowTotal]   = useState(false);
  const [disabled, setDisabled]     = useState(false);

  const TOTAL = 308;

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel  = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%', fontFamily: khorTokens.typography.fontPrimary, backgroundColor: 'white' };
  const chk  = { display: 'flex' as const, alignItems: 'center' as const, gap: 8, fontSize: 13, cursor: 'pointer' as const };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', fontFamily: khorTokens.typography.fontPrimary }}>
      <div style={{ flex: '0 0 200px', minWidth: 200 }}>
        <h4 style={{ fontSize: 13, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Tamaño</label>
            <select value={size} onChange={(e) => setSize(e.target.value as typeof size)} style={sel}>
              <option value="small">Small</option>
              <option value="default">Default</option>
              <option value="large">Large</option>
            </select>
          </div>
          <label style={chk}>
            <input type="checkbox" checked={showSizer} onChange={(e) => setShowSizer(e.target.checked)} />
            Selector de página
          </label>
          <label style={chk}>
            <input type="checkbox" checked={showTotal} onChange={(e) => setShowTotal(e.target.checked)} />
            Total de registros
          </label>
          <label style={chk}>
            <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
            Deshabilitado
          </label>
        </div>
      </div>
      <div style={{ flex: '1 1 320px', minWidth: 0, padding: 28, background: 'white', borderRadius: khorTokens.radius.lg, border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
        <KPagination
          current={page}
          pageSize={pageSize}
          total={TOTAL}
          size={size}
          showSizeChanger={showSizer}
          showTotal={showTotal}
          disabled={disabled}
          onChange={(p, ps) => { setPage(p); setPageSize(ps); }}
        />
        <p style={{ margin: 0, fontSize: 13, color: khorTokens.colors.neutral[400] }}>
          Página <strong>{page}</strong> · {pageSize} por página · {TOTAL} registros
        </p>
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
              <KText variant="body-md" className="font-bold">Notificaciones Push</KText>
              <KText variant="small" className="text-khor-text-secondary">Recibe alertas en tiempo real.</KText>
            </div>
            <KSwitch />
          </div>
          <div className="flex items-center justify-between p-4 bg-khor-neutral-50 rounded-lg">
            <div>
              <KText variant="body-md" className="font-bold">Modo Desarrollador</KText>
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

function SidebarMenuPreview() {
  const [activeId, setActiveId] = useState('puestos');
  const items: KSidebarMenuItem[] = [
    { id: 'empresa', label: 'Empresa', icon: Building2 },
    { id: 'catalogos', label: 'Catálogos', icon: LibraryBig, children: [
      { id: 'generales', label: 'Generales', icon: BookCopy },
      { id: 'competencias', label: 'Competencias', icon: BookCheck },
    ]},
    { id: 'puestos', label: 'Puestos', icon: BookUser },
    { id: 'periodos', label: 'Períodos de eval...', icon: BookText },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
    { id: 'integraciones', label: 'Integraciones', icon: GitCompare },
    { id: 'usuarios', label: 'Usuarios', icon: ShieldCheckIcon },
  ];
  return (
    <div className="flex h-[500px] rounded-xl overflow-hidden border border-khor-border-default">
      <KSidebarMenu items={items} activeId={activeId} onNavigate={setActiveId} />
      <div className="flex-1 bg-khor-surface-default flex items-center justify-center text-khor-neutral-400 text-sm">
        Sección activa: <strong className="ml-1 text-khor-text-primary">{activeId}</strong>
      </div>
    </div>
  );
}

function SidebarMenuPlayground() {
  const [activeId, setActiveId] = useState('puestos');
  const items: KSidebarMenuItem[] = [
    { id: 'empresa', label: 'Empresa', icon: Building2 },
    { id: 'catalogos', label: 'Catálogos', icon: LibraryBig, children: [
      { id: 'generales', label: 'Generales', icon: BookCopy },
      { id: 'competencias', label: 'Competencias', icon: BookCheck },
    ]},
    { id: 'puestos', label: 'Puestos', icon: BookUser },
    { id: 'periodos', label: 'Períodos de eval...', icon: BookText },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
  ];
  return (
    <div className="flex h-[480px] rounded-xl overflow-hidden border border-khor-border-default">
      <KSidebarMenu items={items} activeId={activeId} onNavigate={setActiveId} />
      <div className="flex-1 bg-khor-surface-default flex items-center justify-center text-khor-neutral-400 text-sm">
        Área de contenido
      </div>
    </div>
  );
}

function KHeaderPlayground() {
  const [variant, setVariant] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [notifications, setNotifications] = useState(3);
  const [module, setModule] = useState('COMERCIAL');
  const sublabel = 'Personas';

  const modules = ['COMERCIAL', 'OPERACIONES', 'FINANZAS', 'RRHH'];
  const variantLabels: Record<typeof variant, string> = {
    desktop: 'Desktop',
    tablet: 'Tablet / iPad',
    mobile: 'Mobile',
  };

  return (
    <div style={{ fontFamily: khorTokens.typography.fontPrimary, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Controls */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', padding: '12px 0' }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {(['desktop', 'tablet', 'mobile'] as const).map(v => (
            <button key={v} onClick={() => setVariant(v)} style={{
              padding: '6px 14px', borderRadius: 6, fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: khorTokens.typography.fontPrimary,
              border: `1px solid ${variant === v ? khorTokens.colors.brand.primary : khorTokens.colors.neutral[200]}`,
              backgroundColor: variant === v ? khorTokens.colors.brand.primary : 'transparent',
              color: variant === v ? '#ffffff' : khorTokens.colors.neutral[500],
            }}>
              {variantLabels[v]}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: khorTokens.colors.neutral[500] }}>Módulo:</span>
          <select
            value={module}
            onChange={e => setModule(e.target.value)}
            style={{ padding: '5px 8px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, fontFamily: khorTokens.typography.fontPrimary }}
          >
            {modules.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: khorTokens.colors.neutral[500] }}>Notificaciones:</span>
          <button onClick={() => setNotifications(n => Math.max(0, n - 1))} style={{ width: 24, height: 24, borderRadius: 4, border: '1px solid #e2e8f0', background: 'none', cursor: 'pointer', fontSize: 14 }}>−</button>
          <span style={{ fontSize: 13, fontWeight: 600, minWidth: 20, textAlign: 'center' }}>{notifications}</span>
          <button onClick={() => setNotifications(n => n + 1)} style={{ width: 24, height: 24, borderRadius: 4, border: '1px solid #e2e8f0', background: 'none', cursor: 'pointer', fontSize: 14 }}>+</button>
        </div>
      </div>
      {/* Preview */}
      <div style={{ borderRadius: 12, border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px 0 rgba(0,0,0,0.06)' }}>
        <KHeader
          variant={variant}
          module={{ label: module, sublabel }}
          notificationCount={notifications}
          user={{ initials: 'FM', avatarBg: '#d12020' }}
          onMenuToggle={() => {}}
          onModuleClick={() => {}}
          onNotificationClick={() => {}}
          onUserClick={() => {}}
        />
      </div>
    </div>
  );
}

export const organisms: Record<string, OrganismEntry> = {
  'header': {
    id: 'header',
    name: 'Header',
    description: 'Barra de navegación superior. Tres variantes según viewport: Desktop (1440px) con selector de módulo completo, Tablet/iPad (541px) con hamburguesa y bloque de texto, Mobile (319px) con hamburguesa y solo acciones esenciales.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, background: '#e0e6fb', padding: 24, borderRadius: 14 }}>
        {/* Desktop — shown at full container width */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Desktop</span>
            <span style={{ fontSize: 11, color: '#8899bb' }}>1440px</span>
          </div>
          <div style={{ borderRadius: 10, border: '1px solid #c8d4f0', overflow: 'hidden', boxShadow: '0 2px 12px rgba(5,23,88,0.08)' }}>
            <KHeader variant="desktop" module={{ label: 'COMERCIAL', sublabel: 'Personas' }} notificationCount={3} user={{ initials: 'FM', avatarBg: '#d12020' }} />
          </div>
        </div>
        {/* Tablet — capped at 541px */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tablet / iPad</span>
            <span style={{ fontSize: 11, color: '#8899bb' }}>541px</span>
          </div>
          <div style={{ width: 541, maxWidth: '100%', borderRadius: 10, border: '1px solid #c8d4f0', overflow: 'hidden', boxShadow: '0 2px 12px rgba(5,23,88,0.08)' }}>
            <KHeader variant="tablet" module={{ label: 'COMERCIAL', sublabel: 'Personas' }} notificationCount={3} user={{ initials: 'FM', avatarBg: '#d12020' }} />
          </div>
        </div>
        {/* Mobile — capped at 319px */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Mobile</span>
            <span style={{ fontSize: 11, color: '#8899bb' }}>319px</span>
          </div>
          <div style={{ width: 319, maxWidth: '100%', borderRadius: 10, border: '1px solid #c8d4f0', overflow: 'hidden', boxShadow: '0 2px 12px rgba(5,23,88,0.08)' }}>
            <KHeader variant="mobile" notificationCount={3} user={{ initials: 'FM', avatarBg: '#d12020' }} />
          </div>
        </div>
      </div>
    ),
    playground: <KHeaderPlayground />,
    code: `import { KHeader } from '@khor/design-system/organisms';

// Desktop
<KHeader
  variant="desktop"
  module={{ label: 'COMERCIAL', sublabel: 'Personas' }}
  notificationCount={3}
  user={{ initials: 'FM', avatarBg: '#d12020' }}
  onMenuToggle={() => setSidebarOpen(true)}
  onModuleClick={() => setModuleOpen(true)}
  onNotificationClick={() => setNotifOpen(true)}
  onUserClick={() => setUserMenuOpen(true)}
/>

// Responsive (auto breakpoints: mobile < md < tablet < lg < desktop)
<KHeader
  variant="auto"
  module={{ label: 'COMERCIAL', sublabel: 'Personas' }}
  notificationCount={3}
  user={{ initials: 'FM', avatarBg: '#d12020' }}
  onMenuToggle={() => setSidebarOpen(true)}
/>`,
    filename: 'Header/index.tsx',
    props: [
      { name: 'variant', type: "'desktop' | 'tablet' | 'mobile' | 'auto'", description: "Variante de renderizado. 'auto' alterna automáticamente con breakpoints Tailwind (md/lg)." },
      { name: 'logo', type: 'ReactNode', description: 'Logo personalizado. Por defecto usa el logo SVG de Khor.' },
      { name: 'module', type: '{ label: string; sublabel?: string; icon?: ReactNode }', description: 'Módulo activo — label se muestra en el botón selector (desktop) y bloque de texto (desktop/tablet).' },
      { name: 'user', type: '{ initials?: string; avatarBg?: string; icon?: ReactNode }', description: 'Datos del usuario. initials muestra letras; icon sobreescribe todo el contenido del avatar.' },
      { name: 'notificationCount', type: 'number', description: 'Muestra el punto rojo (#E04D36) en la campana cuando > 0.' },
      { name: 'onMenuToggle', type: '() => void', description: 'Callback del botón hamburguesa. Visible en tablet y mobile.' },
      { name: 'onModuleClick', type: '() => void', description: 'Callback del selector de módulo (dropdown). Solo desktop.' },
      { name: 'onGridClick', type: '() => void', description: 'Callback del botón LayoutGrid (app switcher). Visible en todas las variantes.' },
      { name: 'onNotificationClick', type: '() => void', description: 'Callback al pulsar la campana.' },
      { name: 'onUserClick', type: '() => void', description: 'Callback al pulsar el avatar.' },
    ],
    guidelines: [
      'Altura fija de 64px en las 3 variantes (Figma: 187914-705, 187915-16424, 187915-17523).',
      'Fondo siempre #ffffff, borde inferior 1px solid #e2e8f0.',
      'Desktop: padding horizontal 44px. Tablet: 20px. Mobile: 16px.',
      'El botón hamburguesa (#051758 navy) aparece en tablet y mobile — nunca en desktop.',
      'El selector de módulo solo existe en desktop; tablet y mobile muestran solo el bloque de texto.',
      'El bloque de texto desaparece en mobile — solo quedan grid + bell + avatar.',
      'El punto de notificación es #E04D36, con borde blanco de 1.5px para separarlo del fondo.',
      'El avatar usa #D12020 como fondo por defecto. Pasa initials o icon para el contenido.',
      'En producción, usa variant="auto" para comportamiento responsivo nativo.',
    ],
    aiNotes: 'KHeader: barra superior de app con 3 variantes (desktop/tablet/mobile). Props: variant, module ({label, sublabel}), user ({initials, avatarBg}), notificationCount, onMenuToggle, onModuleClick.',
  },
  'form-wizard': {
    id: 'form-wizard',
    name: 'FormWizard',
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
      contrast: 'AA sobre blanco (ratio 4.8:1 — primary sobre white no alcanza AAA 7:1)',
      score: 96,
    },
    code: `import { KFormWizard } from '@khor/design-system/organisms';

const steps = [
  { id: '1', title: 'Cuenta', content: <AccountForm /> },
  { id: '2', title: 'Plan', content: <PlanSelector /> },
];

<KFormWizard steps={steps} onComplete={handleFinish} />`,
    filename: 'FormWizard/index.tsx',
    props: [
      { name: 'steps', type: 'WizardStep[]', required: true, description: 'Colección de pasos del flujo.' },
      { name: 'onComplete', type: 'function', description: 'Callback al finalizar el último paso.' },
      { name: 'onCancel', type: 'function', description: 'Callback al cancelar el flujo.' },
    ],
    aiNotes: 'KFormWizard para formularios multi-paso con navegación entre pasos.',
    guidelines: ['Usa para flujos de 3-5 pasos.', 'Cada paso debe tener título descriptivo.', 'Habilita onCancel si el flujo es cancelable.'],
  },
  'resizable': {
    id: 'resizable',
    name: 'Resizable',
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
    filename: 'Resizable/index.tsx',
    props: [
      { name: 'direction', type: "'horizontal' | 'vertical'", required: true, description: 'Dirección del redimensionamiento.' },
      { name: 'withHandle', type: 'boolean', description: 'Muestra un tirador visual (grip) en el handle.' },
    ],
    aiNotes: 'KResizable para paneles redimensionables. Paridad total react-resizable.',
    guidelines: ['Usa direction="horizontal" para layouts de sidebar + contenido.', 'withHandle mejora la experiencia de usuario al mostrar el tirador visual.'],
  },
  'data-table': {
    id: 'data-table',
    name: 'DataTable',
    description: 'Tabla de datos con busqueda sobre la tabla, ordenamiento, paginacion KPagination y celda de acciones KTableRowActions (toggle + ojo + 3 puntos). Diseñada para listas de perfiles, competencias y cualquier entidad operativa.',
    preview: (
      <KDataTable
        columns={tableColumnsWithActions}
        data={mockEmployees}
        searchPlaceholder="Buscar"
        filterTrigger={
          <KButton variant="navy" size="icon">
            <Filter size={16} />
          </KButton>
        }
        actions={
          <>
            <KButton variant="navy" size="icon">
              <RefreshCw size={16} />
            </KButton>
            <KButton variant="navy" size="md" icon={<Upload size={16} />}>
              Exportación de perfiles
            </KButton>
          </>
        }
      />
    ),
    playground: <DataTablePlayground />,
    stateShowcase: (
      <div className="flex flex-col gap-8 p-4">
        <div>
          <KText variant="body-md" style={{ marginBottom: 12, display: 'block', fontWeight: 600 }}>
            KTableRowStart + KTableRowActions · toolbar con filtro y acciones navy
          </KText>
          <KDataTable
            columns={tableColumnsWithActions}
            data={mockEmployees}
            searchPlaceholder="Buscar"
            filterTrigger={
              <KButton variant="navy" size="icon">
                <Filter size={16} />
              </KButton>
            }
            actions={
              <>
                <KButton variant="navy" size="icon"><RefreshCw size={16} /></KButton>
                <KButton variant="navy" size="md" icon={<Upload size={16} />}>Exportación de perfiles</KButton>
              </>
            }
            pageSize={4}
          />
        </div>
        <div>
          <KText variant="body-md" style={{ marginBottom: 12, display: 'block', fontWeight: 600 }}>Estado vacío</KText>
          <KDataTable columns={tableColumns} data={[]} searchable={false} />
        </div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Navega por botones de acciones, cabeceras y paginación.', 'Enter: Permite ordenar columnas.'],
      aria: ['Usa etiqueta <table> con <thead> y <tbody>, ofreciendo lectura estructural a lectores de pantalla.'],
      contrast: 'AAA entre datos y el fondo de las filas alternas.',
      score: 100,
    },
    code: `import { KDataTable, KTableRowStart, KTableRowActions } from '@khor/design-system/organisms';
import { KButton } from '@khor/design-system/atoms';
import { Filter, RefreshCw, Upload } from 'lucide-react';

// Toolbar: search input + navy filter icon btn on left, navy actions on right
// filterTrigger goes RIGHT next to the search input
// actions go to the far right — pass one or many buttons, any size/text

const columns = [
  {
    id: 'start',
    header: '',
    size: 72,
    enableSorting: false,
    cell: ({ row }) => (
      <KTableRowStart
        checked={row.getIsSelected()}
        onCheck={(v) => row.toggleSelected(v)}
        starred={row.original.starred}
        onStar={(v) => handleStar(row.original.id, v)}
      />
    ),
  },
  { accessorKey: 'nombre', header: 'Perfil' },
  { accessorKey: 'clave',  header: 'Clave' },
  {
    id: 'actions',
    header: 'Acciones',
    size: 140,
    enableSorting: false,
    cell: ({ row }) => (
      <KTableRowActions
        active={row.original.active}
        onToggle={(v) => handleToggle(row.original.id, v)}
        onView={() => openDetail(row.original)}
        menuItems={[
          { label: 'Editar',   onClick: () => openEdit(row.original) },
          { label: 'Eliminar', danger: true, onClick: () => handleDelete(row.original.id) },
        ]}
      />
    ),
  },
];

<KDataTable
  columns={columns}
  data={records}
  searchPlaceholder="Buscar"
  filterTrigger={
    <KButton variant="navy" size="icon">
      <Filter size={16} />
    </KButton>
  }
  actions={
    <>
      <KButton variant="navy" size="icon"><RefreshCw size={16} /></KButton>
      <KButton variant="navy" size="md" icon={<Upload size={16} />}>Exportación de perfiles</KButton>
    </>
  }
/>`,
    filename: 'DataTable/index.tsx',
    props: [
      { name: 'data', type: 'T[]', required: true, description: 'Array de datos.' },
      { name: 'columns', type: 'ColumnDef[]', required: true, description: 'Definición de columnas (TanStack Table).' },
      { name: 'searchable', type: 'boolean', default: 'true', description: 'Muestra el input de búsqueda sobre la tabla.' },
      { name: 'filterTrigger', type: 'ReactNode', description: 'Nodo renderizado junto al search (p.ej. botón "Filtros" que abre un panel).' },
      { name: 'actions', type: 'ReactNode', description: 'Botones adicionales a la derecha de la toolbar (Nuevo, Exportar, etc).' },
      { name: 'pagination', type: 'boolean', default: 'true', description: 'Activa la paginación con KPagination al pie.' },
      { name: 'pageSize', type: 'number', default: '10', description: 'Filas por página inicial.' },
      { name: 'pageSizes', type: 'number[]', default: '[10,20,50,100]', description: 'Opciones del selector de filas por página.' },
      { name: 'size', type: "'small' | 'middle' | 'large'", default: "'middle'", description: 'Tamaño de celdas (padding/height).' },
      { name: 'enableRowSelection', type: 'boolean', description: 'Agrega columna de checkboxes al inicio.' },
      { name: 'enableColumnToggle', type: 'boolean', description: 'Agrega dropdown para mostrar/ocultar columnas.' },
      { name: 'enableExport', type: 'boolean', description: 'Agrega botón de exportar CSV.' },
      { name: 'stickyHeader', type: 'boolean', description: 'Fija el header al hacer scroll vertical.' },
      { name: 'scroll', type: '{ x?, y? }', description: 'Activa scroll horizontal o vertical con altura fija.' },
      { name: 'virtual', type: 'boolean', description: 'Habilita virtualización para tablas de alto volumen (10k+).' },
      { name: 'rowExpansion', type: 'object', description: 'Filas expandibles: { expandedRowRender, defaultExpandAllRows }.' },
      { name: 'onRowClick', type: '(record: T) => void', description: 'Callback al hacer clic en una fila.' },
      { name: 'loading', type: 'boolean', description: 'Muestra skeleton de carga.' },
      { name: 'emptyContent', type: 'ReactNode', description: 'Contenido personalizado para estado vacío.' },
      { name: 'hasError', type: 'boolean', description: 'Muestra estado de error en el cuerpo.' },
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
    name: 'SparklineCell',
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
    filename: 'SparklineCell/index.tsx',
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
    aiNotes: 'KSparklineCell para gráficos sparkline en tablas y tarjetas.',
  },
  modal: {
    id: 'modal',
    name: 'Modal',
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
  onOpenChange={(next) => setOpen(next)}
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
    filename: 'Modal/index.tsx',
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Controla la visibilidad.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', required: true, description: 'Callback al cambiar visibilidad.' },
      { name: 'title', type: 'string', required: true, description: 'Titulo del modal.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Contenido del modal.' },
      { name: 'footer', type: 'ReactNode', description: 'Botones de accion del footer.' },
      { name: 'width', type: 'number', default: '520', description: 'Ancho en pixeles.' },
    ],
    guidelines: ['Usa para confirmaciones y formularios cortos.', 'Footer siempre con Cancelar (secondary) + Accion (primary).'],
    aiNotes: 'KModal para diálogos modales. Usar onOpenChange (no onClose). Para confirmaciones usar KModalConfirm con onClose.',
  },
  sheet: {
    id: 'sheet',
    name: 'Sheet',
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
  onOpenChange={(next) => setOpen(next)}
  title="Detalle de Empleado"
  width={400}
  footer={...}
>
  <KFormField label="Nombre">
    <KInput value={name} onChange={...} />
  </KFormField>
</KSheet>`,
    filename: 'Sheet/index.tsx',
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Controla la visibilidad.' },
      { name: 'onOpenChange', type: '(open: boolean) => void', required: true, description: 'Callback al cambiar visibilidad.' },
      { name: 'title', type: 'string', required: true, description: 'Titulo del drawer.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Contenido.' },
      { name: 'width', type: 'number', default: '400', description: 'Ancho.' },
      { name: 'placement', type: "'left' | 'right'", default: "'right'", description: 'Lado de aparicion.' },
      { name: 'footer', type: 'ReactNode', description: 'Footer con acciones.' },
    ],
    guidelines: ['Usa para formularios largos o detalle de registros.', 'Width de 400-600px dependiendo del contenido.'],
    aiNotes: 'KSheet para panel lateral deslizable. Paridad total AntD v5.',
  },
  'card-section': {
    id: 'card-section',
    name: 'CardSection',
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
    filename: 'CardSection/index.tsx',
    props: [
      { name: 'title', type: 'string', description: 'Titulo de la seccion.' },
      { name: 'subtitle', type: 'string', description: 'Subtitulo.' },
      { name: 'extra', type: 'ReactNode', description: 'Contenido extra en el header (botones, etc).' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Contenido de la tarjeta.' },
      { name: 'noPadding', type: 'boolean', default: 'false', description: 'Remueve el padding del body.' },
    ],
    guidelines: ['Usa para agrupar campos relacionados en formularios o vistas de detalle.'],
    aiNotes: 'KCardSection para secciones agrupadas con encabezado y acciones.',
  },
  tabs: {
    id: 'tabs',
    name: 'Tabs',
    description: 'Navegación por pestañas. Tres tipos: pill (Select button), line (underline) y folder (KTabsFolder — scroll horizontal con flechas). Tamaños sm/md/lg. Soporta badges, íconos y etiqueta superior.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {/* Pill Type */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, marginTop: 0 }}>Pill (Select button) — sm / md / lg / con label</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {(['sm','md','lg'] as const).map((s) => (
              <KTabs key={s} defaultValue="1" size={s}>
                <KTabsList>
                  <KTabsTrigger value="1">Button</KTabsTrigger>
                  <KTabsTrigger value="2">Button</KTabsTrigger>
                  <KTabsTrigger value="3">Button</KTabsTrigger>
                  <KTabsTrigger value="4">Button</KTabsTrigger>
                </KTabsList>
              </KTabs>
            ))}
            <KTabs defaultValue="1" size="md" label="Label">
              <KTabsList>
                <KTabsTrigger value="1">Button</KTabsTrigger>
                <KTabsTrigger value="2">Button</KTabsTrigger>
                <KTabsTrigger value="3">Button</KTabsTrigger>
                <KTabsTrigger value="4">Button</KTabsTrigger>
              </KTabsList>
            </KTabs>
          </div>
        </div>

        {/* Line Type */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, marginTop: 0 }}>Line (Underline) — sm / md / lg con badge e ícono</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {(['sm','md','lg'] as const).map((s) => (
              <KTabs key={s} defaultValue="1" size={s} type="line">
                <KTabsList>
                  <KTabsTrigger value="1"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>{s === 'sm' ? null : <Users size={14} />}Tab</span></KTabsTrigger>
                  <KTabsTrigger value="2"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>{s === 'sm' ? null : <FileText size={14} />}Tab</span></KTabsTrigger>
                  <KTabsTrigger value="3"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>{s === 'sm' ? null : <Settings size={14} />}Tab</span></KTabsTrigger>
                </KTabsList>
              </KTabs>
            ))}
            <KTabs defaultValue="1" size="md" type="line">
              <KTabsList>
                <KTabsTrigger value="1"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Users size={14} />Tab <KBadgeCount count="99" color="blue" size="sm" /></span></KTabsTrigger>
                <KTabsTrigger value="2"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><FileText size={14} />Tab <KBadgeCount count="99" color="gray" size="sm" /></span></KTabsTrigger>
                <KTabsTrigger value="3"><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Settings size={14} />Tab</span></KTabsTrigger>
              </KTabsList>
            </KTabs>
          </div>
        </div>

        {/* Empresa / Card scroll Type */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, marginTop: 0 }}>Empresa (Card scroll) — sin flechas / flecha derecha / ambas flechas</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <KTabsFolder defaultValue="1" items={EMPRESA_DEMO_ITEMS} />
            <KTabsFolder defaultValue="1" items={EMPRESA_DEMO_ITEMS} showRightArrow />
            <KTabsFolder defaultValue="1" items={EMPRESA_DEMO_ITEMS} showLeftArrow showRightArrow />
          </div>
        </div>
      </div>
    ),
    playground: <TabsPlayground />,
    a11ySummary: {
      keyboard: ['Left/Right: Mueve el foco entre las tablist activas.', 'Enter/Space: Selecciona el tab focalizado.'],
      aria: ['Contenedor usa role="tablist". Cada pestaña es role="tab". Contenido asume role="tabpanel".'],
      contrast: 'AAA sobre el tab activo con barra de indicación inferior.',
      score: 100,
    },
    code: `import { KTabs, KTabsList, KTabsTrigger, KTabsContent } from '@khor/design-system/organisms/index';

// Type 1: Pill (Select button)
<KTabs defaultValue="general" size="md" onValueChange={setTab}>
  <KTabsList>
    <KTabsTrigger value="general">General</KTabsTrigger>
    <KTabsTrigger value="docs">Documentos</KTabsTrigger>
  </KTabsList>
</KTabs>

// Type 2: Line (Underline) — con badge
<KTabs defaultValue="general" size="md" type="line">
  <KTabsList>
    <KTabsTrigger value="general">
      <span style={{ display: 'inline-flex', gap: 6 }}>
        Tab <KBadgeCount count="99" color="blue" size="sm" />
      </span>
    </KTabsTrigger>
    <KTabsTrigger value="docs">Documentos</KTabsTrigger>
  </KTabsList>
</KTabs>

// Type 3: Card
<KTabs defaultValue="general" size="md" type="card">
  <KTabsList>
    <KTabsTrigger value="general">General</KTabsTrigger>
    <KTabsTrigger value="docs">Documentos</KTabsTrigger>
  </KTabsList>
  <KTabsContent value="general">Contenido General</KTabsContent>
  <KTabsContent value="docs">Contenido Docs</KTabsContent>
</KTabs>`,
    filename: 'Tabs/index.tsx',
    props: [
      { name: 'type',         type: "'pill' | 'line' | 'card'",  default: "'pill'",  description: 'Estilo visual de las pestañas.' },
      { name: 'size',         type: "'sm' | 'md' | 'lg'",        default: "'md'",    description: 'Tamaño del trigger (pill: h=36/44/52; line: h=38/46/56).' },
      { name: 'label',        type: 'string',                     default: 'undefined', description: 'Etiqueta superior sobre la barra de tabs.' },
      { name: 'defaultValue', type: 'string',                     description: 'Tab activo por defecto.' },
      { name: 'onValueChange',type: '(key: string) => void',      description: 'Callback al cambiar de tab.' },
      { name: 'centered',     type: 'boolean',                    default: 'false',   description: 'Centra la barra de tabs horizontalmente.' },
    ],
    guidelines: [
      'Usa type="pill" para contextos de filtro o vista (Select button).',
      'Usa type="line" para navegación principal de página con contenido largo.',
      'Máximo 5-6 tabs visibles. Para más, usa KTabsFolder con scroll.',
      'Añade KBadgeCount dentro del KTabsTrigger para mostrar conteos.',
    ],
    aiNotes: 'KTabs soporta pill/line/card. El type="line" usa ink-bar 2px #051758 en activo. Soporta label, size, centered.',
  },
  'toast-manager': {
    id: 'toast-manager',
    name: 'ToastManager',
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
    filename: 'ToastManager/index.tsx',
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
    name: 'CommandBar',
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
    filename: 'CommandBar/index.tsx',
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
    name: 'Upload',
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
    filename: 'Upload/index.tsx',
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
    aiNotes: 'KUpload para arrastrar y soltar archivos. Paridad total AntD v5.',
  },
  tree: {
    id: 'tree',
    name: 'Tree',
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
    filename: 'Tree/index.tsx',
    props: [
      { name: 'data', type: 'KTreeNode[]', required: true, description: 'Nodos con key, title y children.' },
      { name: 'checkable', type: 'boolean', description: 'Mostrar checkboxes.' },
      { name: 'showLine', type: 'boolean', description: 'Lineas de conexion.' },
      { name: 'showIcon', type: 'boolean', default: 'true', description: 'Iconos de carpeta/archivo.' },
      { name: 'onSelect', type: '(keys, info) => void', description: 'Al seleccionar nodo.' },
      { name: 'onCheck', type: '(keys) => void', description: 'Al checkear nodo.' },
    ],
    guidelines: ['Usa showLine para jerarquias profundas.', 'V4 maneja expansion de forma interna por defecto.'],
    aiNotes: 'KTree para visualización jerárquica. Paridad total AntD v5.',
  },
  tour: {
    id: 'tour',
    name: 'Tour',
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
      contrast: 'AA sobre blanco (ratio 4.8:1 — primary sobre white no alcanza AAA 7:1)',
      score: 96,
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
    filename: 'Tour/index.tsx',
    props: [
      { name: 'steps', type: 'KTourStep[]', required: true, description: 'Pasos con title, description, target y placement.' },
      { name: 'open', type: 'boolean', description: 'Activar el tour.' },
      { name: 'onClose', type: '() => void', description: 'Al cerrar.' },
      { name: 'onFinish', type: '() => void', description: 'Al completar todos los pasos.' },
    ],
    guidelines: ['Usa targets con selectores CSS únicos.', 'Máximo 5-7 pasos por tour para evitar fatiga.'],
    aiNotes: 'KTour para recorridos guiados paso a paso. Paridad total AntD v5.',
  },
  'modal-confirm': {
    id: 'modal-confirm',
    name: 'ModalConfirm',
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
    filename: 'ModalConfirm/index.tsx',
    a11ySummary: {
      keyboard: ['Escape: Cierra el diálogo.', 'Focus trap mientras está abierto.'],
      aria: ['role="alertdialog" para notificar severidad.'],
      contrast: 'AA sobre blanco (ratio 4.8:1 — primary sobre white no alcanza AAA 7:1)',
      score: 96,
    },
    props: [
      { name: 'open', type: 'boolean', required: true, description: 'Visibilidad.' },
      { name: 'onClose', type: '() => void', required: true, description: 'Callback al cerrar.' },
      { name: 'type', type: "'confirm'|'info'|'success'|'warning'|'error'", description: 'Tipo semántico.' },
      { name: 'title', type: 'ReactNode', description: 'Título del diálogo.' },
      { name: 'content', type: 'ReactNode', description: 'Contenido del diálogo.' },
      { name: 'onOk', type: '() => void | Promise', description: 'Callback al aceptar.' },
      { name: 'okText', type: 'string', default: "'Aceptar'", description: 'Texto del botón OK.' },
      { name: 'cancelText', type: 'string', default: "'Cancelar'", description: 'Texto del botón cancelar.' },
      { name: 'showCancel', type: 'boolean', default: 'true', description: 'Muestra botón cancelar.' },
      { name: 'width', type: 'number', default: '420', description: 'Ancho en pixeles.' },
    ],
    guidelines: ['Usa para acciones que requieren validación explícita del usuario.'],
    aiNotes: 'KModalConfirm para confirmaciones modales destructivas o importantes.',
  },
  'form-list': {
    id: 'form-list',
    name: 'FormList',
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
    filename: 'FormList/index.tsx',
    props: [
      { name: 'name', type: 'string', required: true, description: 'Nombre del campo array.' },
      { name: 'renderItem', type: '(field, index, ops) => ReactNode', required: true, description: 'Render de cada fila.' },
      { name: 'addText', type: 'string', default: "'Agregar campo'", description: 'Texto del botón agregar.' },
    ],
    guidelines: ['Usa maxItems para evitar formularios demasiado largos.', 'renderItem recibe operaciones add/remove.'],
    aiNotes: 'KFormList para formularios con campos dinámicos repetibles.',
  },
  carousel: {
    id: 'carousel',
    name: 'Carousel',
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
    filename: 'Carousel/index.tsx',
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
    aiNotes: 'KCarousel para presentaciones de contenido deslizante. Paridad AntD v5.',
  },
  calendar: {
    id: 'calendar',
    name: 'Calendar',
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
    filename: 'Calendar/index.tsx',
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
    aiNotes: 'KCalendar para calendario completo con selección de fecha. Paridad AntD v5.',
  },
  form: {
    id: 'form',
    name: 'Form',
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
    filename: 'Form/index.tsx',
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
    aiNotes: 'KForm para formularios con validación. Paridad total AntD v5. Usar KFormField para campos.',
  },

  pagination: {
    id: 'pagination',
    name: 'Pagination',
    description: 'Control de navegación entre páginas. Tres tamaños (small/default/large), selector de página, total de registros y estado deshabilitado.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, marginTop: 0 }}>Small — básico / con total y selector</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <KPagination total={50} current={1} size="small" />
            <KPagination total={3079} current={4} pageSize={50} size="small" showTotal showSizeChanger />
          </div>
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, marginTop: 0 }}>Default — básico / con total y selector</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <KPagination total={50} current={1} size="default" />
            <KPagination total={3079} current={4} pageSize={50} size="default" showTotal showSizeChanger />
          </div>
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, marginTop: 0 }}>Deshabilitado</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <KPagination total={85} current={4} size="small" disabled />
            <KPagination total={85} current={4} size="default" showTotal showSizeChanger disabled />
          </div>
        </div>
      </div>
    ),
    playground: <PaginationPlayground />,
    code: `import { KPagination } from '@khor/design-system/organisms/index';

// Default
<KPagination
  current={page}
  pageSize={10}
  total={308}
  onChange={(p, ps) => { setPage(p); setPageSize(ps); }}
/>

// Con total y selector de tamaño
<KPagination
  current={page}
  pageSize={pageSize}
  total={3079}
  size="default"
  showTotal
  showSizeChanger
  onChange={(p, ps) => { setPage(p); setPageSize(ps); }}
/>

// Deshabilitado
<KPagination total={85} current={4} disabled />`,
    filename: 'Pagination/index.tsx',
    a11ySummary: {
      keyboard: ['Tab: navega entre botones de página.', 'Enter/Space: selecciona página.'],
      aria: ['Botones nativos con texto de página. Disabled usa atributo nativo.'],
      contrast: 'AAA — texto blanco sobre navy #051758 en activo.',
      score: 100,
    },
    props: [
      { name: 'total',           type: 'number',                          required: true, description: 'Total de registros.' },
      { name: 'current',         type: 'number',                          default: '1',   description: 'Página activa (controlado).' },
      { name: 'pageSize',        type: 'number',                          default: '10',  description: 'Registros por página.' },
      { name: 'size',            type: "'small' | 'default' | 'large'",   default: "'default'", description: 'Tamaño visual de los botones.' },
      { name: 'showTotal',       type: 'boolean',                         default: 'false', description: 'Muestra "X–Y de Z" a la izquierda.' },
      { name: 'showSizeChanger', type: 'boolean',                         default: 'false', description: 'Muestra selector de registros por página.' },
      { name: 'disabled',        type: 'boolean',                         default: 'false', description: 'Desactiva toda interacción.' },
      { name: 'onChange',        type: '(page: number, pageSize: number) => void', description: 'Callback al cambiar página o tamaño.' },
    ],
    guidelines: [
      'Usa debajo de listas o grillas que no usen KDataTable (que ya incluye paginación).',
      'size="small" para espacios compactos (toolbars, sidebars).',
      'Activa showTotal cuando el número de registros es relevante para el usuario.',
      'showSizeChanger es útil cuando el usuario puede necesitar ver más registros a la vez.',
    ],
    aiNotes: 'KPagination: 3 tamaños, showTotal, showSizeChanger, disabled. El activo es navy #051758. Small usa estilo outline en activo, default/large usa filled.',
  },
  'login-form': {
    id: 'login-form',
    name: 'LoginForm',
    description: 'Formulario de inicio de sesión estándar con campos de email y contraseña, validación integrada y estado de carga.',
    preview: (<LoginFormPreview />),
    code: `import { KLoginForm } from '@khor/design-system/organisms/index';

<KLoginForm 
  onFinish={(values) => login(values)} 
  loading={isLoggingIn} 
/>`,
    filename: 'LoginForm/index.tsx',
    stateShowcase: (
      <div style={{ padding: 16 }}>
         <KLoginForm onFinish={() => {}} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tabulación rígida orientada a User->Password->Button.', 'Enter realiza Submit.'],
      aria: ['Type="email" y "password" nativos con autocompletado habilitado.'],
      contrast: 'AA sobre blanco (ratio 4.8:1 — primary sobre white no alcanza AAA 7:1)',
      score: 96,
    },
    props: [
      { name: 'onFinish', type: '(values) => void', description: 'Callback al enviar el formulario con éxito.' },
      { name: 'loading', type: 'boolean', description: 'Muestra estado de carga en el botón.' },
    ],
    guidelines: ['Centra el formulario en un contenedor de ancho máximo (ej. 400px).'],
    aiNotes: 'KLoginForm para formulario de inicio de sesión completo con validación.'
  },

  'sidebar-menu': {
    id: 'sidebar-menu',
    name: 'SidebarMenu',
    description: 'Menú lateral de navegación con soporte para ítems activos, submenús expandibles y botón de colapso.',
    preview: <SidebarMenuPreview />,
    playground: <SidebarMenuPlayground />,
    code: `import { KSidebarMenu } from '@khor/design-system/organisms';
import { Building2, BookUser, Settings } from 'lucide-react';

const items = [
  { id: 'empresa', label: 'Empresa', icon: Building2 },
  {
    id: 'catalogos', label: 'Catálogos', icon: LibraryBig,
    children: [
      { id: 'generales', label: 'Generales', icon: BookCopy },
    ],
  },
  { id: 'puestos', label: 'Puestos', icon: BookUser },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
];

<KSidebarMenu
  items={items}
  activeId="puestos"
  onNavigate={(id) => navigate(id)}
  onCollapse={() => setSidebarOpen(false)}
/>`,
    filename: 'SidebarMenu.tsx',
    props: [
      { name: 'items', type: 'KSidebarMenuItem[]', required: true, description: 'Lista de ítems de navegación. Cada ítem puede tener children para submenús.' },
      { name: 'activeId', type: 'string', description: 'ID del ítem activo.' },
      { name: 'onNavigate', type: '(id: string) => void', description: 'Callback al seleccionar un ítem.' },
      { name: 'onCollapse', type: '() => void', description: 'Callback al pulsar el botón Ocultar.' },
      { name: 'className', type: 'string', description: 'Clases adicionales para el contenedor.' },
    ],
    guidelines: [
      'Ancho fijo de 200px. Para sidebar colapsable, controla la visibilidad desde el componente padre.',
      'Los ítems con children muestran un chevron y se expanden al hacer click.',
      'El ítem activo muestra texto blanco en semibold y un indicador rojo de 4px en el borde derecho.',
    ],
    aiNotes: 'KSidebarMenu para navegación lateral. Props: items (array con id/label/icon/children), activeId, onNavigate, onCollapse.',
  },
};

export const organismsData: Record<string, OrganismData> = {};
Object.keys(organisms).forEach(key => {
  const { preview, playground, stateShowcase, ...data } = organisms[key];
  organismsData[key] = data;
});

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