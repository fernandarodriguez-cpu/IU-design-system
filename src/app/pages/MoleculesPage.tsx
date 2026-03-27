/**
 * MoleculesPage — Documentacion de moleculas del sistema Khor
 */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { ComponentDoc } from '../components/docs/ComponentDoc';
import type { PropDef } from '../components/docs/ComponentDoc';
import {
  KFormField, KSearchInput, KStatCard, KNavItem,
  KSelectField, KUserCell, KEmptyState,
  KBreadcrumb, KSteps, KDropdownMenu, KPopover, KAccordion,
  KInputNumber, KSegmented, KAutocomplete, KDatePicker,
  KDateRangePicker, KSelectAdvanced, KDescriptions,
  KPopconfirm, KResult, KTimeline, KTooltip,
  KCascader, KStatistic, KTimePicker, KMentions,
  KColorPicker, KAnchor, KList, KDividerExtended,
  KTreeSelect, KTransfer,
} from '../components/design-system/molecules/index';
import { KButton, KInput, KText } from '../components/design-system/atoms/index';
import dayjs from 'dayjs';
import {
  Users, DollarSign, TrendingUp, Calendar, Home,
  Settings, FileText, Inbox, Search, BarChart3,
  Edit, Trash2, Copy, Share2, MoreHorizontal, Info,
  CheckCircle, Clock, AlertTriangle, GitCommit, Tag, Bell,
} from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';

interface MoleculeEntry {
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
  stateShowcase?: React.ReactNode;
  a11ySummary?: {
    keyboard: string[];
    aria: string[];
    contrast: string;
    score: number;
  };
}

function StatCardPlayground() {
  const [change, setChange] = useState(12);
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12 }}>Controles</h4>
        <div>
          <label style={{ fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block', marginBottom: 4 }}>Cambio (%)</label>
          <input type="range" min={-50} max={50} value={change} onChange={(e) => setChange(Number(e.target.value))} style={{ width: '100%' }} />
          <span style={{ fontSize: 12, color: khorTokens.colors.neutral[400] }}>{change}%</span>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240 }}>
        <KStatCard
          title="Empleados Activos"
          value="1,247"
          change={change}
          changeLabel="vs. mes anterior"
          sparkData={[40, 45, 42, 50, 48, 55, 60, 58, 65]}
          icon={<Users size={20} />}
        />
      </div>
    </div>
  );
}

/* ─── Molecule Playgrounds ──────────────────── */
function FormFieldPlayground() {
  const [label, setLabel] = useState('Nombre Completo');
  const [required, setRequired] = useState(true);
  const [error, setError] = useState('');
  const [hint, setHint] = useState('');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Label</label><input value={label} onChange={(e) => setLabel(e.target.value)} style={sel} /></div>
          <div><label style={ctrl}>Error</label><input value={error} onChange={(e) => setError(e.target.value)} placeholder="Dejar vacio para sin error" style={sel} /></div>
          <div><label style={ctrl}>Hint</label><input value={hint} onChange={(e) => setHint(e.target.value)} placeholder="Texto de ayuda" style={sel} /></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} /> Required</label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 300, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KFormField label={label} required={required} error={error || undefined} hint={hint || undefined}>
          <KInput placeholder="Escribe aqui..." />
        </KFormField>
      </div>
    </div>
  );
}

function SearchInputPlayground() {
  const [val, setVal] = useState('');
  const [size, setSize] = useState<any>('md');
  const [placeholder, setPlaceholder] = useState('Buscar empleados...');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Placeholder</label><input value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} style={sel} /></div>
          <div><label style={ctrl}>Tamano</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Valor actual: "{val}"</p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 300, display: 'flex', alignItems: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%' }}><KSearchInput placeholder={placeholder} size={size} value={val} onChange={setVal} /></div>
      </div>
    </div>
  );
}

function SelectFieldPlayground() {
  const [value, setValue] = useState<string>('');
  const [required, setRequired] = useState(false);
  const [error, setError] = useState('');
  const [hint, setHint] = useState('Selecciona una opcion de la lista');
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [allowClear, setAllowClear] = useState(true);
  const [size, setSize] = useState<any>('middle');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 260 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tamano</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['small','middle','large'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Error</label><input value={error} onChange={(e) => setError(e.target.value)} placeholder="Dejar vacio" style={sel} /></div>
          <div><label style={ctrl}>Hint</label><input value={hint} onChange={(e) => setHint(e.target.value)} style={sel} /></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} /> Required</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} /> Loading</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showSearch} onChange={(e) => setShowSearch(e.target.checked)} /> Show Search</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={allowClear} onChange={(e) => setAllowClear(e.target.checked)} /> Allow Clear</label>
          </div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Seleccionado: {value || '(ninguno)'}</p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 320, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSelectField
          label="Departamento"
          placeholder="Seleccionar..."
          options={[
            { label: 'Recursos Humanos', value: 'rh' },
            { label: 'Tecnologia', value: 'tech' },
            { label: 'Finanzas', value: 'fin' },
            { label: 'Operaciones', value: 'ops' }
          ]}
          value={value}
          onChange={setValue}
          disabled={disabled}
          loading={loading}
          showSearch={showSearch}
          allowClear={allowClear}
          size={size}
          required={required}
          error={error || undefined}
          hint={hint || undefined}
        />
      </div>
    </div>
  );
}

function UserCellPlayground() {
  const [name, setName] = useState('Maria Garcia');
  const [role, setRole] = useState('Gerente de RH');
  const [email, setEmail] = useState('m.garcia@khor.dev');
  const [avatar, setAvatar] = useState('https://i.pravatar.cc/150?img=47');
  const [size, setSize] = useState<any>('md');
  const [status, setStatus] = useState<any>('online');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Nombre</label><input value={name} onChange={(e) => setName(e.target.value)} style={sel} /></div>
          <div><label style={ctrl}>Rol</label><input value={role} onChange={(e) => setRole(e.target.value)} style={sel} /></div>
          <div><label style={ctrl}>Email</label><input value={email} onChange={(e) => setEmail(e.target.value)} style={sel} /></div>
          <div><label style={ctrl}>URL de Avatar</label><input value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="Dejar vacio" style={sel} /></div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}><label style={ctrl}>Tamano</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
            <div style={{ flex: 1 }}><label style={ctrl}>Status</label><select value={status} onChange={(e) => setStatus(e.target.value)} style={sel}>{['none','online','offline','busy','away'].map(s=><option key={s}>{s}</option>)}</select></div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KUserCell 
          name={name} 
          role={role || undefined} 
          email={email || undefined} 
          avatar={avatar || undefined} 
          size={size}
          status={status === 'none' ? undefined : status}
          onClick={() => console.log('Click on user:', name)}
        />
      </div>
    </div>
  );
}

function StepsPlayground() {
  const [current, setCurrent] = useState(1);
  const [direction, setDirection] = useState<any>('horizontal');
  const [size, setSize] = useState<any>('default');
  
  const steps = [
    { title: 'Datos Personales', description: 'Nombre, email' },
    { title: 'Puesto', description: 'Departamento y rol' },
    { title: 'Documentos', description: 'Contratos', status: current === 2 ? ('error' as any) : undefined },
    { title: 'Confirmar', description: 'Revisar y enviar' },
  ];

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Paso actual: {current + 1}</label>
            <input type="range" min={0} max={3} value={current} onChange={(e) => setCurrent(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
          <div><label style={ctrl}>Direccion</label><select value={direction} onChange={(e) => setDirection(e.target.value)} style={sel}>{['horizontal','vertical'].map(d=><option key={d}>{d}</option>)}</select></div>
          <div><label style={ctrl}>Tamano</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['default','small'].map(s=><option key={s}>{s}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 400, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSteps 
          current={current} 
          onChange={setCurrent} 
          direction={direction}
          size={size}
          items={steps} 
        />
      </div>
    </div>
  );
}

function BreadcrumbPlayground() {
  const [levels, setLevels] = useState(3);
  const [separator, setSeparator] = useState('/');
  const allItems = [
    { title: 'Inicio', icon: <Home size={14} />, onClick: () => {} },
    { title: 'Empleados', icon: <Users size={14} />, onClick: () => {} },
    { title: 'Departamento RH', onClick: () => {} },
    { title: 'Maria Garcia' },
  ];
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block', marginBottom: 4 }}>Niveles: {levels}</label>
            <input type="range" min={2} max={4} value={levels} onChange={(e) => setLevels(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block', marginBottom: 4 }}>Separador</label>
            <input value={separator} onChange={(e) => setSeparator(e.target.value)} style={{ padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' }} />
          </div>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300, display: 'flex', alignItems: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KBreadcrumb 
          items={allItems.slice(0, levels)} 
          separator={separator}
        />
      </div>
    </div>
  );
}

function AccordionPlayground() {
  const [accordion, setAccordion] = useState(true);
  const [ghost, setGhost] = useState(true);
  const [expandIconPosition, setExpandIconPosition] = useState<any>('end');

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={accordion} onChange={(e) => setAccordion(e.target.checked)} /> Modo Acordeon</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={ghost} onChange={(e) => setGhost(e.target.checked)} /> Modo Ghost</label>
          <div><label style={ctrl}>Posicion Icono</label><select value={expandIconPosition} onChange={(e) => setExpandIconPosition(e.target.value)} style={sel}>{['start','end'].map(p=><option key={p}>{p}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 350, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KAccordion 
          accordion={accordion}
          ghost={ghost}
          expandIconPosition={expandIconPosition}
          items={[
            { key: '1', label: '¿Cómo registro un nuevo empleado?', children: <KText variant="body-md" color="secondary">Navega a Empleados y completa el formulario.</KText> },
            { key: '2', label: '¿Cómo genero la nómina?', children: <KText variant="body-md" color="secondary">Ve a Nómina, selecciona fechas y confirma.</KText> },
            { key: '3', label: '¿Cómo exporto reportes?', children: <KText variant="body-md" color="secondary">Usa el botón Exportar en cualquier tabla.</KText> },
          ]} 
          defaultActiveKey={['1']} 
        />
      </div>
    </div>
  );
}

function EmptyStatePlayground() {
  const [title, setTitle] = useState('No hay resultados');
  const [desc, setDesc] = useState('Intenta cambiar los filtros de busqueda.');
  const [showAction, setShowAction] = useState(true);
  const [variant, setVariant] = useState<any>('default');
  const [size, setSize] = useState<any>('md');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Titulo</label><input value={title} onChange={(e) => setTitle(e.target.value)} style={sel} /></div>
          <div><label style={ctrl}>Descripcion</label><input value={desc} onChange={(e) => setDesc(e.target.value)} style={sel} /></div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}><label style={ctrl}>Variante</label><select value={variant} onChange={(e) => setVariant(e.target.value)} style={sel}>{['default','simple'].map(v=><option key={v}>{v}</option>)}</select></div>
            <div style={{ flex: 1 }}><label style={ctrl}>Tamano</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showAction} onChange={(e) => setShowAction(e.target.checked)} /> Mostrar accion</label>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300, padding: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KEmptyState
          icon={<Inbox size={variant === 'simple' ? 64 : 48} />}
          title={title}
          description={desc}
          variant={variant}
          size={size}
          actionLabel={showAction ? "Agregar Nuevo" : undefined}
          onAction={() => alert('Accion ejecutada')}
        />
      </div>
    </div>
  );
}

function DropdownPlayground() {
  const [lastSelected, setLastSelected] = useState('(ninguno)');
  const [placement, setPlacement] = useState<any>('bottomLeft');
  const [arrow, setArrow] = useState(true);
  
  const items = [
    { key: 'edit', label: 'Editar', icon: <Edit size={14} /> },
    { key: 'copy', label: 'Duplicar', icon: <Copy size={14} /> },
    { key: 'share', label: 'Compartir', icon: <Share2 size={14} /> },
    { key: 'div1', type: 'divider' },
    { key: 'delete', label: 'Eliminar', icon: <Trash2 size={14} />, danger: true },
  ];

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Posicion</label><select value={placement} onChange={(e) => setPlacement(e.target.value)} style={sel}>{['bottomLeft','bottomCenter','bottomRight','topLeft','topCenter','topRight'].map(p=><option key={p}>{p}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={arrow} onChange={(e) => setArrow(e.target.checked)} /> Mostrar flecha</label>
          <p style={{ fontSize: 13, color: khorTokens.colors.neutral[400], marginTop: 12 }}>Ultimo seleccionado: <strong>{lastSelected}</strong></p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KDropdownMenu
          menu={{
            items: items as any,
            onClick: (info) => setLastSelected(info.key)
          }}
          placement={placement}
          arrow={arrow}
          trigger={['click']}
        >
          <KButton variant="secondary" icon={<MoreHorizontal size={16} />}>Acciones</KButton>
        </KDropdownMenu>
      </div>
    </div>
  );
}

function NavItemPlayground() {
  const [active, setActive] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const navItems = [
    { icon: <Home size={18} />, label: 'Dashboard', badge: 0 },
    { icon: <Users size={18} />, label: 'Empleados', badge: 24 },
    { icon: <Calendar size={18} />, label: 'Calendario', badge: 0 },
    { icon: <Settings size={18} />, label: 'Configuracion', badge: 0 },
  ];
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={collapsed} onChange={(e) => setCollapsed(e.target.checked)} /> Colapsado</label>
      </div>
      <div style={{ flex: 1, minWidth: 260, padding: 16, backgroundColor: khorTokens.colors.brand.navy, borderRadius: khorTokens.radius.lg }}>
        {navItems.map((item, i) => (
          <KNavItem key={i} icon={item.icon} label={item.label} active={active === i} badge={item.badge || undefined} onClick={() => setActive(i)} collapsed={collapsed} />
        ))}
      </div>
    </div>
  );
}

function PopoverPlayground() {
  const [placement, setPlacement] = useState<any>('bottom');
  const [trigger, setTrigger] = useState<any>('click');

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Posicion</label><select value={placement} onChange={(e) => setPlacement(e.target.value)} style={sel}>{['top','bottom','left','right','topLeft','topRight','bottomLeft','bottomRight'].map(p=><option key={p}>{p}</option>)}</select></div>
          <div><label style={ctrl}>Disparador</label><select value={trigger} onChange={(e) => setTrigger(e.target.value)} style={sel}>{['click','hover','focus'].map(t=><option key={t}>{t}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 400, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KPopover
          placement={placement}
          trigger={trigger}
          title={<KText strong>Configuración</KText>}
          content={
            <div style={{ width: 240 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
                <KSelectField label="Departamento" placeholder="Seleccionar..." />
                <KButton variant="primary" block size="sm">Aplicar Cambios</KButton>
              </div>
            </div>
          }
        >
          <KButton variant="secondary" icon={<Settings size={16} />}>Configurar</KButton>
        </KPopover>
      </div>
    </div>
  );
}

function InputNumberPlayground() {
  const [val, setVal] = useState<any>(42);
  const [size, setSize] = useState<any>('md');
  const [disabled, setDisabled] = useState(false);
  const [controls, setControls] = useState(true);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tamano</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Desactivado</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={controls} onChange={(e) => setControls(e.target.checked)} /> Mostrar Controles</label>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: 160 }}>
          <KInputNumber 
            value={val} 
            onChange={setVal} 
            size={size} 
            disabled={disabled} 
            controls={controls}
            min={0}
            max={100}
          />
        </div>
      </div>
    </div>
  );
}

function SegmentedPlayground() {
  const [val, setVal] = useState<any>('Diario');
  const [size, setSize] = useState<any>('md');
  const [block, setBlock] = useState(false);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tamano</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={block} onChange={(e) => setBlock(e.target.checked)} /> Ancho Completo</label>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 400, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSegmented 
          options={['Diario', 'Semanal', 'Mensual', 'Anual']} 
          value={val} 
          onChange={setVal} 
          size={size} 
          block={block} 
        />
      </div>
    </div>
  );
}

function AutocompletePlayground() {
  const [val, setVal] = useState('');
  const [loading, setLoading] = useState(false);
  
  const options = [
    { value: 'rh', label: 'Recursos Humanos', description: 'Gestión de talento y nómina' },
    { value: 'tech', label: 'Tecnología', description: 'Desarrollo y soporte técnico' },
    { value: 'fin', label: 'Finanzas', description: 'Presupuesto y contabilidad' },
    { value: 'mkt', label: 'Marketing', description: 'Publicidad y comunicación' },
  ];

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} /> Cargando</label>
      </div>
      <div style={{ flex: 2, minWidth: 350, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <KAutocomplete 
            placeholder="Escribe para buscar departamento..." 
            options={options} 
            value={val}
            onChange={setVal}
            loading={loading}
            allowClear
          />
          <div style={{ marginTop: 12 }}>
            <KText variant="small" color="secondary">Valor seleccionado: {val || '(ninguno)'}</KText>
          </div>
        </div>
      </div>
    </div>
  );
}

function DatePickerPlayground() {
  const [date, setDate] = useState<any>(null);
  const [range, setRange] = useState<any>(null);
  const [picker, setPicker] = useState<any>('date');
  const [size, setSize] = useState<any>('md');
  const [showTime, setShowTime] = useState(false);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tipo</label><select value={picker} onChange={(e) => setPicker(e.target.value)} style={sel}>{['date','week','month','quarter','year'].map(p=><option key={p}>{p}</option>)}</select></div>
          <div><label style={ctrl}>Tamano</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showTime} onChange={(e) => setShowTime(e.target.checked)} /> Mostrar Hora</label>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 400, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%', maxWidth: 300 }}>
          <KText variant="small" strong style={{ marginBottom: 8, display: 'block' }}>Selector Individual</KText>
          <KDatePicker value={date} onChange={setDate} picker={picker} allowClear size={size} showTime={showTime} />
        </div>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <KText variant="small" strong style={{ marginBottom: 8, display: 'block' }}>Selector de Rango</KText>
          <KDateRangePicker value={range} onChange={setRange} />
        </div>
      </div>
    </div>
  );
}

function TooltipPlayground() {
  const [placement, setPlacement] = useState<any>('top');
  const [trigger, setTrigger] = useState<any>('hover');
  const [color, setColor] = useState<string | undefined>(undefined);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Posicion</label><select value={placement} onChange={(e) => setPlacement(e.target.value)} style={sel}>{['top','bottom','left','right','topLeft','topRight','bottomLeft','bottomRight'].map(p=><option key={p}>{p}</option>)}</select></div>
          <div><label style={ctrl}>Disparador</label><select value={trigger} onChange={(e) => setTrigger(e.target.value)} style={sel}>{['hover','focus','click'].map(t=><option key={t}>{t}</option>)}</select></div>
          <div><label style={ctrl}>Color (opcional)</label><input value={color || ''} onChange={(e) => setColor(e.target.value || undefined)} placeholder="#E04D36" style={sel} /></div>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300, padding: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KTooltip 
          title="Este es un mensaje de ayuda o aclaración que aparece al interactuar con el elemento." 
          placement={placement} 
          trigger={trigger}
          color={color}
        >
          <KButton variant="secondary">Pasa el cursor aqui</KButton>
        </KTooltip>
      </div>
    </div>
  );
}

function SelectAdvancedPlayground() {
  const [val, setVal] = useState<string | string[]>([]);
  const [mode, setMode] = useState<any>('multiple');
  
  const options = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Visor', value: 'viewer' },
    { label: 'Invitado', value: 'guest', disabled: true },
    { label: 'Soporte', value: 'support' },
  ];

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Modo</label><select value={mode} onChange={(e) => { setMode(e.target.value); setVal([]); }} style={{ padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' }}>{['single','multiple','tags'].map(m=><option key={m}>{m}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 350, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <KSelectAdvanced 
            options={options} 
            value={val} 
            onChange={setVal} 
            mode={mode} 
            placeholder="Asignar roles..."
            allowClear
          />
        </div>
      </div>
    </div>
  );
}

function DescriptionsPlayground() {
  const items = [
    { label: 'Usuario', children: 'Dani Lezcano', span: 2 },
    { label: 'Email', children: 'dani@khor.com', span: 2 },
    { label: 'Rol', children: 'Admin' },
    { label: 'Estado', children: <span style={{ color: khorTokens.colors.brand.primary }}>Activo</span> },
    { label: 'Biografía', children: 'Desarrollador enfocado en sistemas de diseño y arquitectura frontend.', span: 4 },
  ];

  return (
    <div style={{ padding: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
      <KDescriptions title="Información de Perfil" bordered items={items} column={4} />
    </div>
  );
}

function PopconfirmPlayground() {
  return (
    <div style={{ padding: 48, display: 'flex', gap: 24, justifyContent: 'center', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
      <KPopconfirm title="¿Estás seguro?" description="Esta acción no se puede deshacer." onConfirm={() => console.log('Confirmado')}>
        <button style={{ padding: '8px 16px', borderRadius: 6, border: 'none', backgroundColor: khorTokens.colors.brand.primary, color: 'white', cursor: 'pointer' }}>Eliminar Elemento</button>
      </KPopconfirm>
    </div>
  );
}

function ResultPlayground() {
  const [status, setStatus] = useState<any>('success');

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Estado</label><select value={status} onChange={(e) => setStatus(e.target.value)} style={sel}>{['success','error','info','warning','404','403','500'].map(s=><option key={s}>{s}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 400, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KResult 
          status={status} 
          title="Título del Resultado" 
          subTitle="Esta es una breve descripción del estado actual del proceso o recurso."
          extra={<button style={{ padding: '8px 16px', borderRadius: 6, border: 'none', backgroundColor: khorTokens.colors.brand.primary, color: 'white', cursor: 'pointer' }}>Volver al Inicio</button>}
        />
      </div>
    </div>
  );
}

function TimelinePlayground() {
  const items = [
    { label: '2023-10-01', children: 'Creación de la cuenta' },
    { label: '2023-10-05', children: 'Verificación de identidad' },
    { label: '2023-10-10', children: 'Primer depósito realizado', color: khorTokens.colors.feedback.success },
    { label: '2023-10-15', children: 'Pendiente de aprobación', color: khorTokens.colors.brand.accent },
  ];

  return (
    <div style={{ padding: 48, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
      <KTimeline mode="alternate" items={items} />
    </div>
  );
}

function CascaderPlayground() {
  const [val, setVal] = useState<string[]>([]);
  
  const options = [
    {
      value: 'zhejiang', label: 'Zhejiang',
      children: [
        { value: 'hangzhou', label: 'Hangzhou', children: [{ value: 'xihu', label: 'West Lake' }] },
      ],
    },
    {
      value: 'jiangsu', label: 'Jiangsu',
      children: [
        { value: 'nanjing', label: 'Nanjing', children: [{ value: 'zhonghuamen', label: 'Zhong Hua Men' }] },
      ],
    },
  ];

  return (
    <div style={{ padding: 48, display: 'flex', justifyContent: 'center', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
      <div style={{ width: '100%', maxWidth: 400 }}>
        <KCascader options={options} value={val} onChange={setVal} placeholder="Selecciona ubicación..." />
        <div style={{ marginTop: 12 }}>
          <KText variant="small" color="secondary">Selección: {val.join(' / ') || '(ninguna)'}</KText>
        </div>
      </div>
    </div>
  );
}

function StatisticPlayground() {
  return (
    <div style={{ display: 'flex', gap: 48, padding: 48, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
      <KStatistic title="Usuarios Activos" value={112893} precision={0} trend="up" trendValue="12.5%" />
      <KStatistic title="Ingresos Mensuales" value={93412.50} precision={2} prefix="$" trend="down" trendValue="3.2%" />
    </div>
  );
}

function TimePickerPlayground() {
  const [time, setTime] = useState<string | null>(null);
  const [use12Hours, setUse12Hours] = useState(false);
  const [format, setFormat] = useState('HH:mm:ss');

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Formato</label><input value={format} onChange={(e) => setFormat(e.target.value)} style={sel} /></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={use12Hours} onChange={(e) => setUse12Hours(e.target.checked)} /> Formato 12h</label>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300, padding: 48, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: 200 }}>
          <KTimePicker 
            value={time ? dayjs(time, format) : undefined} 
            onChange={setTime} 
            use12Hours={use12Hours}
            format={format}
            allowClear
          />
        </div>
        <KText variant="small" color="secondary">Seleccionado: {time || '--:--:--'}</KText>
      </div>
    </div>
  );
}

function MentionsPlayground() {
  const [val, setVal] = useState('');
  const options = [
    { value: 'dani', label: 'Dani Lezcano', avatar: 'https://i.pravatar.cc/150?u=dani' },
    { value: 'juan', label: 'Juan Perez', avatar: 'https://i.pravatar.cc/150?u=juan' },
    { value: 'maria', label: 'Maria Gomez', avatar: 'https://i.pravatar.cc/150?u=maria' },
  ];

  return (
    <div style={{ padding: 48, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
      <KMentions value={val} onChange={setVal} options={options} placeholder="Menciona a alguien con @" />
      <div style={{ marginTop: 12 }}>
        <KText variant="small" color="secondary">Vista previa: {val}</KText>
      </div>
    </div>
  );
}

function ColorPickerPlayground() {
  const [color, setColor] = useState<any>('#E04D36');
  return (
    <div style={{ padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
      <KColorPicker value={color} onChange={setColor} />
      <KText variant="small" color="secondary">Color seleccionado: {typeof color === 'string' ? color : color.toHexString()}</KText>
    </div>
  );
}

function AnchorPlayground() {
  const items = [
    { key: 'part-1', href: '#part-1', title: 'Parte 1: Introducción' },
    { key: 'part-2', href: '#part-2', title: 'Parte 2: Desarrollo' },
    { key: 'part-3', href: '#part-3', title: 'Parte 3: Conclusión' },
  ];

  return (
    <div style={{ display: 'flex', gap: 24, height: 200, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg, overflow: 'hidden' }}>
      <div style={{ width: 220, padding: 16, borderRight: `1px solid ${khorTokens.colors.neutral[200]}` }}>
        <KAnchor items={items} />
      </div>
      <div style={{ flex: 1, padding: 16, overflowY: 'auto' }}>
        <div id="part-1" style={{ height: 300, backgroundColor: 'white', marginBottom: 16, padding: 16, borderRadius: 8 }}>Contenido de la Parte 1</div>
        <div id="part-2" style={{ height: 300, backgroundColor: 'white', marginBottom: 16, padding: 16, borderRadius: 8 }}>Contenido de la Parte 2</div>
        <div id="part-3" style={{ height: 300, backgroundColor: 'white', padding: 16, borderRadius: 8 }}>Contenido de la Parte 3</div>
      </div>
    </div>
  );
}

function ListPlayground() {
  const items = [
    { key: '1', title: 'Khor Design System', description: 'Sistema de diseño corporativo de Khor.', avatar: <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: khorTokens.colors.brand.primary }} /> },
    { key: '2', title: 'Ant Design 5', description: 'Framework de componentes UI para React.', avatar: <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: khorTokens.colors.brand.navy }} /> },
    { key: '3', title: 'TypeScript', description: 'Superset de JavaScript que añade tipos estáticos.', extra: <button style={{ border: 'none', background: 'none', color: khorTokens.colors.brand.primary, cursor: 'pointer' }}>Editar</button> },
  ];

  return (
    <div style={{ padding: 48, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
      <KList items={items} bordered header={<div style={{ fontWeight: 600 }}>Mi Lista de Tecnologías</div>} />
    </div>
  );
}

function TransferPlayground() {
  const [targetKeys, setTargetKeys] = useState<string[]>(['1', '3']);
  const data = [
    { key: '1', title: 'Usuario Admin' },
    { key: '2', title: 'Editor Contenido' },
    { key: '3', title: 'Analista Datos' },
    { key: '4', title: 'Invitado' },
  ];

  return (
    <div style={{ padding: 48, display: 'flex', justifyContent: 'center', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
      <KTransfer dataSource={data} targetKeys={targetKeys} onChange={setTargetKeys as any} showSearch />
    </div>
  );
}

function TreeSelectPlayground() {
  const [val, setVal] = useState<string>();
  const data = [
    { title: 'Corporativo', value: 'corp', children: [
        { title: 'Recursos Humanos', value: 'hr' },
        { title: 'Tecnología', value: 'tech', children: [
            { title: 'Frontend', value: 'fe' },
            { title: 'Backend', value: 'be' },
        ]},
    ]},
  ];

  return (
    <div style={{ padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
      <div style={{ width: 300 }}>
        <KTreeSelect treeData={data} value={val} onChange={setVal} placeholder="Selecciona departamento..." treeDefaultExpandAll />
      </div>
      <KText variant="small" color="secondary">Selección: {val || '(ninguna)'}</KText>
    </div>
  );
}

const molecules: Record<string, MoleculeEntry> = {
  'form-field': {
    id: 'form-field',
    name: 'KFormField',
    description: 'Envuelve cualquier input con etiqueta, indicador de requerido, mensaje de error y texto de ayuda. Es el bloque fundamental para construir formularios consistentes.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 400 }}>
        <KFormField label="Nombre Completo" required>
          <KInput placeholder="Ej: Maria Garcia Lopez" />
        </KFormField>
        <KFormField label="Email Corporativo" required error="El formato del email no es valido">
          <KInput placeholder="maria@empresa.com" prefix={<Search size={16} />} error="" />
        </KFormField>
        <KFormField label="Departamento" hint="Selecciona el area a la que pertenece">
          <KInput placeholder="Recursos Humanos" />
        </KFormField>
      </div>
    ),
    playground: <FormFieldPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}><KFormField label="Default" hint="Ayuda"><KInput placeholder="Texto..." /></KFormField></div>
        <div style={{ flex: 1, minWidth: 200 }}><KFormField label="Requerido" required><KInput placeholder="Obligatorio" /></KFormField></div>
        <div style={{ flex: 1, minWidth: 200 }}><KFormField label="Error Visual" error="Valor inválido"><KInput defaultValue="123" /></KFormField></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['El campo de entrada envuelto hereda su teclado natural.'],
      aria: ['Enlaza dinámicamente el "id" del input con su "label for".', 'Inyecta aria-invalid y asocia el error con aria-describedby.'],
      contrast: 'AAA sobre etiquetas y textos de error.',
      score: 100,
    },
    code: `import { KFormField } from '@khor/design-system/molecules/index';
import { KInput } from '@khor/design-system/atoms/index';

<KFormField label="Nombre Completo" required>
  <KInput placeholder="Ej: Maria Garcia" />
</KFormField>

<KFormField
  label="Email"
  required
  error="El formato del email no es valido"
>
  <KInput placeholder="email@empresa.com" />
</KFormField>

<KFormField
  label="Departamento"
  hint="Selecciona el area correspondiente"
>
  <KInput placeholder="Buscar..." />
</KFormField>`,
    filename: 'KFormField.tsx',
    props: [
      { name: 'label', type: 'string', required: true, description: 'Etiqueta del campo.' },
      { name: 'required', type: 'boolean', default: 'false', description: 'Muestra asterisco rojo de campo obligatorio.' },
      { name: 'error', type: 'string', description: 'Mensaje de error. Se muestra en rojo debajo del input.' },
      { name: 'hint', type: 'string', description: 'Texto de ayuda. Solo se muestra si no hay error.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'El input o componente de formulario.' },
    ],
    guidelines: [
      'Usa siempre KFormField para envolver inputs en formularios.',
      'Los mensajes de error deben ser descriptivos y actionables.',
      'El hint se oculta cuando hay un error activo.',
    ],
    aiNotes: 'Al generar formularios, cada campo debe estar envuelto en KFormField. Los campos required deben validarse antes de enviar.',
  },
  'search-input': {
    id: 'search-input',
    name: 'KSearchInput',
    description: 'Input especializado para busqueda con icono de lupa integrado, boton de limpiar automatico y callback de busqueda.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 400 }}>
        <KSearchInput placeholder="Buscar empleados..." />
        <KSearchInput placeholder="Buscar en tabla..." size="sm" />
        <KSearchInput placeholder="Busqueda global..." size="lg" />
      </div>
    ),
    playground: <SearchInputPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span style={{ width: 80, fontSize: 11, color: khorTokens.colors.neutral[500] }}>Default</span><KSearchInput placeholder="Buscar..." /></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span style={{ width: 80, fontSize: 11, color: khorTokens.colors.neutral[500] }}>Small</span><KSearchInput placeholder="En tabla..." size="sm" /></div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><span style={{ width: 80, fontSize: 11, color: khorTokens.colors.neutral[500] }}>Large</span><KSearchInput placeholder="Búsqueda global..." size="lg" /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Enter: Ejecuta la búsqueda o presiona el enterButton.', 'Esc: Limpia el contenido si allowClear está activo.'],
      aria: ['Incluye nativamente aria-label en el icono de limpiar.', 'role="searchbox" dictado implícitamente.'],
      contrast: 'AAA entre placeholder gris y padding interno.',
      score: 95,
    },
    code: `import { KSearchInput } from '@khor/design-system/molecules/index';

<KSearchInput
  placeholder="Buscar empleados..."
  onChange={(value) => setSearchTerm(value)}
  onSearch={(value) => handleSearch(value)}
/>`,
    filename: 'KSearchInput.tsx',
    props: [
      { name: 'placeholder', type: 'string', default: "'Buscar...'", description: 'Texto placeholder.' },
      { name: 'value', type: 'string', description: 'Valor controlado.' },
      { name: 'onChange', type: '(value: string) => void', description: 'Callback al escribir.' },
      { name: 'onSearch', type: '(value: string) => void', description: 'Callback al presionar Enter.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamano del input.' },
    ],
    guidelines: ['Usa size="sm" dentro de tablas y toolbars.', 'Incluye debounce en onChange para busquedas con API.'],
  },
  'stat-card': {
    id: 'stat-card',
    name: 'KStatCard',
    description: 'Tarjeta de metrica con valor destacado, indicador de cambio (tendencia), sparkline integrada y descripcion contextual.',
    preview: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <KStatCard title="Total Empleados" value="1,247" change={12.5} changeLabel="vs. mes anterior" sparkData={[40, 45, 42, 50, 48, 55, 60]} icon={<Users size={20} />} />
        <KStatCard title="Nomina Mensual" value="$2.4M" change={-3.2} changeLabel="vs. mes anterior" sparkData={[60, 55, 50, 48, 45, 42, 40]} icon={<DollarSign size={20} />} />
        <KStatCard title="Tasa de Retencion" value="94.5%" change={1.8} changeLabel="trimestral" sparkData={[88, 90, 91, 92, 93, 94, 94.5]} icon={<TrendingUp size={20} />} />
      </div>
    ),
    playground: <StatCardPlayground />,
    stateShowcase: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        <KStatCard title="Positivo" value="1,247" change={12.5} changeLabel="vs ayer" />
        <KStatCard title="Negativo" value="$2.4M" change={-3.2} changeLabel="vs ayer" />
        <KStatCard title="Neutro (0%)" value="94.5%" change={0} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Completamente estático por defecto (no interactivo).'],
      aria: ['El gráfico sparkline interno usa aria-hidden="true" para no estorbar al lector, los datos numéricos explican todo.'],
      contrast: 'AAA en valor numérico. AA en el texto de tendencia.',
      score: 100,
    },
    code: `import { KStatCard } from '@khor/design-system/molecules/index';

<KStatCard
  title="Total Empleados"
  value="1,247"
  change={12.5}
  changeLabel="vs. mes anterior"
  sparkData={[40, 45, 42, 50, 48, 55, 60]}
  icon={<Users size={20} />}
/>`,
    filename: 'KStatCard.tsx',
    props: [
      { name: 'title', type: 'string', required: true, description: 'Titulo de la metrica.' },
      { name: 'value', type: 'string | number', required: true, description: 'Valor principal de la metrica.' },
      { name: 'change', type: 'number', description: 'Porcentaje de cambio. Positivo = verde, Negativo = rojo.' },
      { name: 'changeLabel', type: 'string', description: 'Contexto del cambio (ej: "vs. mes anterior").' },
      { name: 'sparkData', type: 'number[]', description: 'Array de datos para el mini grafico sparkline.' },
      { name: 'icon', type: 'ReactNode', description: 'Icono Lucide representativo.' },
    ],
    guidelines: [
      'Usa en dashboards con grid de 3-4 columnas.',
      'El sparkData debe tener al menos 5 puntos para ser legible.',
      'change positivo muestra icono TrendingUp en verde, negativo muestra TrendingDown en rojo.',
    ],
    aiNotes: 'Las StatCards son ideales para que la IA resuma KPIs. El cambio porcentual y sparkData dan contexto temporal al agente.',
  },
  'nav-item': {
    id: 'nav-item',
    name: 'KNavItem',
    description: 'Item de navegacion para el Sidebar con icono, etiqueta, badge numerico y estado activo. Disenado para el fondo Navy.',
    preview: (
      <div style={{ backgroundColor: khorTokens.colors.brand.navy, padding: 16, borderRadius: khorTokens.radius.lg, maxWidth: 260 }}>
        <KNavItem icon={<Home size={18} />} label="Dashboard" active />
        <KNavItem icon={<Users size={18} />} label="Empleados" badge={24} />
        <KNavItem icon={<Calendar size={18} />} label="Calendario" />
        <KNavItem icon={<FileText size={18} />} label="Reportes" />
        <KNavItem icon={<Settings size={18} />} label="Configuracion" />
      </div>
    ),
    playground: <NavItemPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', backgroundColor: khorTokens.colors.brand.navy, padding: 16, borderRadius: khorTokens.radius.md }}>
        <div style={{ minWidth: 150 }}><KNavItem icon={<Home size={18} />} label="Default" /></div>
        <div style={{ minWidth: 150 }}><KNavItem icon={<Users size={18} />} label="Active" active /></div>
        <div style={{ minWidth: 150 }}><KNavItem icon={<Bell size={18} />} label="Con Badge" badge={5} /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Entra al item.', 'Enter/Space: Ejecuta onClick simulado como Link.'],
      aria: ['role="menuitem" o enlace. Atributo aria-current="page" recomendado si active=true.'],
      contrast: 'AAA sobre el fondo Navy institucional.',
      score: 100,
    },
    code: `import { KNavItem } from '@khor/design-system/molecules/index';

<KNavItem
  icon={<Home size={18} />}
  label="Dashboard"
  active={currentPath === '/'}
  onClick={() => navigate('/')}
/>

<KNavItem
  icon={<Users size={18} />}
  label="Empleados"
  badge={24}
  onClick={() => navigate('/empleados')}
/>`,
    filename: 'KNavItem.tsx',
    props: [
      { name: 'icon', type: 'ReactNode', description: 'Icono Lucide (18px recomendado).' },
      { name: 'label', type: 'string', required: true, description: 'Texto del item.' },
      { name: 'active', type: 'boolean', default: 'false', description: 'Estado activo (fondo rojo 20% opacity).' },
      { name: 'badge', type: 'number', description: 'Numero de notificacion.' },
      { name: 'onClick', type: '() => void', description: 'Callback al hacer click.' },
      { name: 'collapsed', type: 'boolean', default: 'false', description: 'Modo colapsado (solo icono).' },
    ],
    guidelines: ['Solo un item activo a la vez.', 'Iconos a 18px con stroke 2px.', 'Badge solo para conteos de notificacion relevantes.'],
  },
  'select-field': {
    id: 'select-field',
    name: 'KSelectField',
    description: 'Campo de seleccion custom con etiqueta, dropdown nativo y validacion, envuelto en KFormField para consistencia.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <KSelectField
          label="Departamento"
          placeholder="Seleccionar..."
          options={[
            { label: 'Recursos Humanos', value: 'rh' },
            { label: 'Tecnologia', value: 'tech' },
            { label: 'Finanzas', value: 'fin' },
            { label: 'Operaciones', value: 'ops' },
          ]}
        />
        <KSelectField
          label="Con Error"
          placeholder="Seleccionar..."
          options={[{ label: 'Opcion 1', value: '1' }]}
          status="error"
        />
      </div>
    ),
    playground: <SelectFieldPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ width: 180 }}><KSelectField label="Normal" placeholder="Opciones..." options={[{label:'A', value:1}]} /></div>
        <div style={{ width: 180 }}><KSelectField label="Disabled" disabled placeholder="Sin acceso" options={[]} /></div>
        <div style={{ width: 180 }}><KSelectField label="Con Error" error="Inválido" options={[{label:'A', value:1}]} /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Up/Down: Navega entre opciones.', 'Enter: Confirma selección.', 'Esc: Cierra dropdown.'],
      aria: ['role="combobox", aria-expanded y aria-controls vinculados al listbox.'],
      contrast: 'AAA. El borde de foco es del color Primary Khor.',
      score: 100,
    },
    code: `import { KSelectField } from '@khor/design-system/molecules/index';

<KSelectField
  label="Departamento"
  placeholder="Seleccionar..."
  options={[
    { label: 'Recursos Humanos', value: 'rh' },
    { label: 'Tecnologia', value: 'tech' },
  ]}
  value={dept}
  onChange={setDept}
  required
/>`,
    filename: 'KSelectField.tsx',
    props: [
      { name: 'label', type: 'string', description: 'Etiqueta del campo.' },
      { name: 'placeholder', type: 'string', description: 'Texto placeholder.' },
      { name: 'options', type: 'SelectProps["options"]', required: true, description: 'Opciones del select.' },
      { name: 'value', type: 'string | number', description: 'Valor seleccionado.' },
      { name: 'onChange', type: '(value) => void', description: 'Callback al seleccionar.' },
      { name: 'required', type: 'boolean', description: 'Marca como requerido.' },
      { name: 'error', type: 'string', description: 'Mensaje de error.' },
      { name: 'hint', type: 'string', description: 'Texto de ayuda.' },
      { name: 'disabled', type: 'boolean', description: 'Desactiva el select.' },
      { name: 'loading', type: 'boolean', description: 'Estado de carga.' },
      { name: 'showSearch', type: 'boolean', description: 'Habilita busqueda.' },
      { name: 'mode', type: '"multiple" | "tags"', description: 'Modo de seleccion.' },
    ],
    guidelines: ['Para hasta 7 opciones. Si hay mas, considera un select con busqueda.'],
  },
  'user-cell': {
    id: 'user-cell',
    name: 'KUserCell',
    description: 'Celda de usuario con avatar, nombre, rol y estado. Ideal para tablas y listas de empleados.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
        <KUserCell name="Maria Garcia" role="Gerente de RH" />
        <KUserCell name="Juan Perez" role="Desarrollador Sr." />
        <KUserCell name="Ana Lopez" role="Contadora" />
        <KUserCell name="Carlos Ruiz" role="Becario" />
      </div>
    ),
    playground: <UserCellPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KUserCell name="Maria Garcia" role="Admin" />
        <KUserCell name="Juan Perez" avatar="https://i.pravatar.cc/150?u=juan" status="online" />
        <KUserCell name="Pedro Soto" role="Deshabilitado" status="offline" />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Atrapa el foco si tiene onClick (convirtiéndose en botón).'],
      aria: ['Avatar con alt="" si es decorativo o iniciales.', 'Si es clickeable, asume role="button".'],
      contrast: 'AAA entre el nombre principal y fondo.',
      score: 100,
    },
    code: `import { KUserCell } from '@khor/design-system/molecules/index';

<KUserCell
  name="Maria Garcia"
  role="Gerente de RH"
  avatar="/avatar.jpg"
  status="online"
/>`,
    filename: 'KUserCell.tsx',
    props: [
      { name: 'name', type: 'string', required: true, description: 'Nombre del usuario.' },
      { name: 'email', type: 'string', description: 'Correo electronico.' },
      { name: 'role', type: 'string', description: 'Rol o cargo.' },
      { name: 'avatar', type: 'string', description: 'URL de la foto.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamano de la celda.' },
      { name: 'status', type: "'online' | 'offline' | 'busy' | 'away'", description: 'Estado de actividad.' },
      { name: 'onClick', type: '() => void', description: 'Callback al hacer click.' },
    ],
    guidelines: ['Usa dentro de tablas en la columna de usuario.', 'Si no hay avatar, se generan iniciales automaticamente.'],
  },
  'empty-state': {
    id: 'empty-state',
    name: 'KEmptyState',
    description: 'Estado vacio para tablas, listas o secciones sin datos. Incluye icono, titulo, descripcion y accion principal.',
    preview: (
      <KEmptyState
        icon={<Inbox size={48} />}
        title="No hay empleados registrados"
        description="Agrega tu primer empleado para comenzar a gestionar tu equipo."
        actionLabel="Agregar Empleado"
        onAction={() => {}}
      />
    ),
    playground: <EmptyStatePlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KEmptyState icon={<Inbox size={32} />} title="Sin Datos" description="Aún no hay registros." />
      </div>
    ),
    a11ySummary: {
      keyboard: ['El botón de acción es 100% interactivo y atrapa el foco por defecto.'],
      aria: ['El icono usa aria-hidden="true" ya que el título explica el estado.'],
      contrast: 'AAA en títulos. AA en descripciones corporativas.',
      score: 100,
    },
    code: `import { KEmptyState } from '@khor/design-system/molecules/index';

<KEmptyState
  icon={<Inbox size={48} />}
  title="No hay empleados registrados"
  description="Agrega tu primer empleado para comenzar."
  action={
    <KButton variant="primary" icon={<Users size={16} />}>
      Agregar Empleado
    </KButton>
  }
/>`,
    filename: 'KEmptyState.tsx',
    props: [
      { name: 'icon', type: 'ReactNode', description: 'Icono grande (48px recomendado).' },
      { name: 'title', type: 'string', required: true, description: 'Titulo del estado vacio.' },
      { name: 'description', type: 'string', description: 'Descripcion con contexto.' },
      { name: 'action', type: 'ReactNode', description: 'Boton de accion principal.' },
    ],
    guidelines: ['Siempre incluye una accion que resuelva el estado vacio.', 'El icono debe ser de 48px con color neutral.300.'],
  },
  breadcrumb: {
    id: 'breadcrumb',
    name: 'KBreadcrumb',
    description: 'Sistema de navegacion jerarquica para indicar la posicion actual en la aplicacion.',
    preview: <KBreadcrumb items={[{ title: 'Inicio' }, { title: 'Empleados' }, { title: 'Maria Garcia' }]} />,
    playground: <BreadcrumbPlayground />,
    stateShowcase: (
      <div style={{ padding: 16, backgroundColor: khorTokens.colors.neutral[50], borderRadius: khorTokens.radius.md }}>
        <KBreadcrumb items={[{ title: 'Inicio', href: '/' }, { title: 'Configuración', href: '/settings' }, { title: 'Perfil' }]} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Navega por cada enlace del breadcrumb.'],
      aria: ['role="navigation" y aria-label="breadcrumb" inyectados nativamente.', 'aria-current="page" en el último elemento (no clickeable).'],
      contrast: 'AA sobre fondo blanco/gris.',
      score: 100,
    },
    code: `import { KBreadcrumb } from '@khor/design-system/molecules/index';

<KBreadcrumb
  items={[
    { title: 'Inicio', href: '/', icon: <Home size={14} /> },
    { title: 'Empleados', href: '/empleados' },
    { title: 'Perfil' }
  ]}
  separator=">"
/>`,
    filename: 'KBreadcrumb.tsx',
    props: [
      { name: 'items', type: 'BreadcrumbItemType[]', required: true, description: 'Arreglo de items ({ title, href, icon, menu, onClick }).' },
      { name: 'separator', type: 'ReactNode', description: 'Separador custom (default: /).' },
    ],
    guidelines: ['El último item es la página actual y no tiene onClick.', 'Máximo 4-5 niveles de profundidad.'],
  },
  steps: {
    id: 'steps',
    name: 'KSteps',
    description: 'Componente de pasos para procesos multi-paso como wizards, onboarding o flujos de aprobación. Muestra el progreso y permite navegar entre pasos.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <KSteps
          current={1}
          items={[
            { title: 'Datos Personales', description: 'Nombre, email, etc.' },
            { title: 'Puesto', description: 'Departamento y rol' },
            { title: 'Documentos', description: 'Contratos y archivos' },
            { title: 'Confirmar', description: 'Revisar y enviar' },
          ]}
        />
      </div>
    ),
    playground: <StepsPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '16px 0', overflowX: 'auto' }}>
        <KSteps current={1} items={[{ title: 'Paso 1' }, { title: 'Paso 2', description: 'Activo' }, { title: 'Paso 3' }]} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Foco en pasos individuales si onChange está definido (interactivos).'],
      aria: ['aria-current="step" en el paso activo.', 'aria-label indicando progreso (ej. Paso 2 de 3).'],
      contrast: 'AAA sobre anillos azules/primarios de progreso.',
      score: 100,
    },
    code: `import { KSteps } from '@khor/design-system/molecules/index';

<KSteps
  current={currentStep}
  onChange={setCurrentStep}
  items={[
    { title: 'Datos Personales', description: 'Nombre, email' },
    { title: 'Puesto', description: 'Departamento' },
    { title: 'Confirmar' },
  ]}
/>`,
    filename: 'KSteps.tsx',
    props: [
      { name: 'items', type: 'KStepItem[]', required: true, description: 'Array de pasos con title y description opcional.' },
      { name: 'current', type: 'number', required: true, description: 'Índice del paso actual (base 0).' },
      { name: 'onChange', type: '(step: number) => void', description: 'Callback al hacer click en un paso.' },
    ],
    guidelines: ['Máximo 5-6 pasos. Para más, usa un flujo diferente.', 'La descripción es opcional pero mejora la comprensión.'],
    aiNotes: 'KSteps es clave para que la IA guíe al usuario en flujos multi-paso. El current indica dónde está el usuario.',
  },
  dropdown: {
    id: 'dropdown',
    name: 'KDropdownMenu',
    description: 'Menú contextual desplegable con soporte para iconos, items peligrosos, separadores y estados deshabilitados.',
    preview: (
      <div style={{ display: 'flex', gap: 24 }}>
        <KDropdownMenu
          menu={{
            items: [
              { key: 'edit', label: 'Editar', icon: <Edit size={14} /> },
              { key: 'copy', label: 'Duplicar', icon: <Copy size={14} /> },
              { key: 'share', label: 'Compartir', icon: <Share2 size={14} /> },
              { type: 'divider' },
              { key: 'delete', label: 'Eliminar', icon: <Trash2 size={14} />, danger: true },
            ],
            onClick: (info) => console.log(info.key)
          }}
        >
          <KButton variant="secondary" size="sm">Acciones</KButton>
        </KDropdownMenu>
      </div>
    ),
    playground: <DropdownPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16 }}>
        <KDropdownMenu menu={{ items: [{ key: '1', label: 'Opción 1' }, { key: '2', label: 'Eliminar', danger: true }] }}>
          <KButton variant="outline">Ver Menú</KButton>
        </KDropdownMenu>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Space/Enter: Abre el menú.', 'Up/Down: Navega entre items.', 'Esc: Cierra el menú.'],
      aria: ['role="menu" y role="menuitem" manejados estrictamente por Radix UI.', 'aria-haspopup="menu" y aria-expanded en el trigger.'],
      contrast: 'AAA sobre fondo blanco. AAA en texto danger.',
      score: 100,
    },
    code: `import { KDropdownMenu } from '@khor/design-system/molecules/index';

<KDropdownMenu 
  menu={{ 
    items: [
      { key: 'edit', label: 'Editar', icon: <Edit size={14} /> },
      { key: 'delete', label: 'Eliminar', danger: true }
    ] 
  }}
  placement="bottomLeft"
>
  <KButton>Acciones</KButton>
</KDropdownMenu>`,
    filename: 'KDropdownMenu.tsx',
    props: [
      { name: 'menu', type: 'MenuProps', required: true, description: 'Configuracion del menu ({ items, onClick }).' },
      { name: 'trigger', type: '("click" | "hover" | "contextMenu")[]', default: "['hover']", description: 'Eventos que activan el menu.' },
      { name: 'placement', type: 'string', description: 'Posicion del menu.' },
      { name: 'arrow', type: 'boolean | object', description: 'Mostrar flecha indicadora.' },
      { name: 'disabled', type: 'boolean', description: 'Desactivar dropdown.' },
    ],
    guidelines: ['Usa para acciones secundarias agrupadas.', 'El disparador suele ser un KButton de tipo ghost o secondary.'],
  },
  popover: {
    id: 'popover',
    name: 'KPopover',
    description: 'Panel emergente con contenido rico. A diferencia del tooltip, puede contener formularios, listas o contenido interactivo.',
    preview: (
      <div style={{ display: 'flex', gap: 16 }}>
        <KPopover
          content={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <KText variant="body-md" color="navy">Información del Empleado</KText>
              <KText variant="small" color="secondary">Departamento: Recursos Humanos</KText>
              <KText variant="small" color="secondary">Antigüedad: 3 años</KText>
              <KButton variant="primary" size="sm">Ver perfil completo</KButton>
            </div>
          }
        >
          <KButton variant="secondary" size="sm" icon={<Info size={14} />}>Ver detalles</KButton>
        </KPopover>
      </div>
    ),
    playground: <PopoverPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16 }}>
        <KPopover content={<div>Contenido</div>} placement="top" trigger="hover"><KButton variant="outline">Top Hover</KButton></KPopover>
        <KPopover content={<div>Acción Requerida</div>} placement="bottom" trigger="click"><KButton variant="primary">Bottom Click</KButton></KPopover>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Space/Enter: Si el trigger es click, lo expone.', 'Esc: Cierra el popover abierto y retorna foco.'],
      aria: ['El trigger usa aria-expanded y aria-controls.', 'El panel usa role="dialog" o "tooltip".'],
      contrast: 'AAA sobre fondos con elevación (shadow overlay).',
      score: 100,
    },
    code: `import { KPopover } from '@khor/design-system/molecules/index';

<KPopover
  title="Título opcional"
  content={<div>Contenido rico</div>}
  placement="bottom"
  trigger="click"
>
  <KButton>Abrir Popover</KButton>
</KPopover>`,
    filename: 'KPopover.tsx',
    props: [
      { name: 'content', type: 'ReactNode', required: true, description: 'Contenido del popover.' },
      { name: 'title', type: 'ReactNode', description: 'Título opcional.' },
      { name: 'placement', type: 'TooltipPlacement', default: "'bottom'", description: 'Posición.' },
      { name: 'trigger', type: "'click' | 'hover' | 'focus'", default: "'click'", description: 'Evento disparador.' },
      { name: 'arrow', type: 'boolean | object', description: 'Mostrar flecha.' },
    ],
    guidelines: ['Usa para contenido interactivo. Para texto simple, usa KTooltip.'],
  },
  accordion: {
    id: 'accordion',
    name: 'KAccordion',
    description: 'Secciones colapsables para organizar contenido agrupado. Soporta modo single (solo una abierta) y multiple.',
    preview: (
      <div style={{ maxWidth: 500 }}>
        <KAccordion
          items={[
            { key: '1', label: '¿Cómo registro un nuevo empleado?', children: <KText variant="body-md" color="secondary">Navega a Empleados → Nuevo y completa el formulario con los datos personales, puesto y documentos requeridos.</KText> },
            { key: '2', label: '¿Cómo genero la nómina?', children: <KText variant="body-md" color="secondary">Ve a Nómina → Generar Periodo, selecciona las fechas y revisa los conceptos antes de confirmar.</KText> },
            { key: '3', label: '¿Cómo exporto reportes?', children: <KText variant="body-md" color="secondary">En cualquier tabla, usa el botón Exportar para descargar en formato CSV o Excel.</KText> },
          ]}
          defaultActiveKey={['1']}
        />
      </div>
    ),
    playground: <AccordionPlayground />,
    stateShowcase: (
      <div style={{ width: '100%' }}>
        <KAccordion
          items={[
            { key: '1', label: 'Cerrado por defecto', children: <p>Info 1</p> },
            { key: '2', label: 'Abierto por defecto', children: <p>Info 2</p> },
            { key: '3', label: 'Deshabilitado', collapsible: 'disabled', children: <p>Info 3</p> }
          ]}
          defaultActiveKey={['2']}
        />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Navega por los headers.', 'Space/Enter: Expande o colapsa.'],
      aria: ['Headers nativos con aria-expanded.', 'aria-controls id vincula al panel con role="region".'],
      contrast: 'AAA entre texto del header y fondo neutral.',
      score: 100,
    },
    code: `import { KAccordion } from '@khor/design-system/molecules/index';

<KAccordion
  items={[
    { key: '1', label: 'Pregunta 1', children: <p>Respuesta 1</p> },
    { key: '2', label: 'Pregunta 2', children: <p>Respuesta 2</p> },
  ]}
  defaultActiveKey={['1']}
/>`,
    filename: 'KAccordion.tsx',
    props: [
      { name: 'items', type: 'CollapseProps["items"]', required: true, description: 'Array de secciones con key, label y children.' },
      { name: 'accordion', type: 'boolean', default: 'false', description: 'Modo acordeón (solo una abierta a la vez).' },
      { name: 'ghost', type: 'boolean', default: 'false', description: 'Sin fondo ni bordes.' },
      { name: 'expandIconPosition', type: "'start' | 'end'", default: "'end'", description: 'Posición del icono.' },
      { name: 'onChange', type: '(key: string | string[]) => void', description: 'Callback al cambiar.' },
    ],
    guidelines: ['Usa single para FAQs y multiple para configuraciones.', 'El título debe ser descriptivo del contenido.'],
  },
  /* ═══ MOLÉCULAS EXTENDIDAS (v2.0 Nexus) ═══ */
  'input-number': {
    id: 'input-number', name: 'KInputNumber',
    description: 'Input numerico con controles +/- integrados, limites min/max, paso configurable y precision decimal.',
    preview: (<div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}><KInputNumber value={42} min={0} max={100} /><KInputNumber value={3.14} step={0.01} precision={2} size="lg" /><KInputNumber value={10} disabled /></div>),
    code: `import { KInputNumber } from '@khor/molecules-extended';\n\n<KInputNumber value={qty} onChange={setQty} min={0} max={100} />`,
    filename: 'KInputNumber.tsx',
    playground: <InputNumberPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ width: 140 }}><KInputNumber defaultValue={42} /></div>
        <div style={{ width: 140 }}><KInputNumber disabled defaultValue={10} /></div>
        <div style={{ width: 140 }}><KInputNumber status="error" defaultValue={0} /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Up/Down: Incrementa o decrementa según paso (step).'],
      aria: ['role="spinbutton", aria-valuenow, aria-valuemin, aria-valuemax vinculados.'],
      contrast: 'AAA con bordes claros y texto input.',
      score: 100,
    },
    props: [
      { name: 'value', type: 'number', description: 'Valor controlado.' },
      { name: 'onChange', type: '(v: number) => void', description: 'Callback al cambiar.' },
      { name: 'min', type: 'number', description: 'Valor mínimo.' },
      { name: 'max', type: 'number', description: 'Valor máximo.' },
      { name: 'step', type: 'number', default: '1', description: 'Incremento.' },
      { name: 'precision', type: 'number', description: 'Decimales.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del input.' },
      { name: 'controls', type: 'boolean', default: 'true', description: 'Mostrar botones +/-.' },
      { name: 'disabled', type: 'boolean', description: 'Desactivar.' },
    ],
    guidelines: ['Usa precision para valores monetarios.', 'Define min/max para evitar valores invalidos.'],
  },
  'segmented': {
    id: 'segmented', name: 'KSegmented',
    description: 'Control segmentado tipo iOS para alternar entre opciones mutuamente excluyentes.',
    preview: (<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}><KSegmented options={['Diario', 'Semanal', 'Mensual']} value="Semanal" /><KSegmented options={[{ label: 'Lista', value: 'list' }, { label: 'Tabla', value: 'table' }]} value="list" /></div>),
    code: `import { KSegmented } from '@khor/molecules-extended';\n\n<KSegmented options={['Diario','Semanal','Mensual']} value={period} onChange={setPeriod} />`,
    filename: 'KSegmented.tsx',
    playground: <SegmentedPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
        <KSegmented options={[{ label: 'A', value: 'A' }, { label: 'B', value: 'B' }]} value="A" />
        <KSegmented disabled options={[{ label: 'X', value: 'X' }, { label: 'Y', value: 'Y' }]} value="X" />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Left/Right: Mueve el foco y selección entre segmentos instantáneamente.'],
      aria: ['Actúa como role="radiogroup" y items con role="radio" más aria-checked.'],
      contrast: 'AAA fondo de pastilla sobre overlay gris ligero.',
      score: 100,
    },
    props: [
      { name: 'options', type: '(string | KSegmentedOption)[]', required: true, description: 'Opciones a mostrar.' },
      { name: 'value', type: 'string', description: 'Valor seleccionado.' },
      { name: 'onChange', type: '(v: string) => void', description: 'Callback al cambiar.' },
      { name: 'block', type: 'boolean', default: 'false', description: 'Ancho completo.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño.' },
      { name: 'disabled', type: 'boolean', description: 'Desactivar todo el control.' },
    ],
    guidelines: ['Usa para 2-5 opciones.', 'Soporta iconos junto al label.'],
  },
  'autocomplete': {
    id: 'autocomplete', name: 'KAutocomplete',
    description: 'Input con sugerencias filtradas en tiempo real, opciones con descripción y estado de carga.',
    preview: (<div style={{ maxWidth: 400 }}><KAutocomplete placeholder="Buscar departamento..." options={[{ value: 'rh', label: 'Recursos Humanos', description: '45 empleados' },{ value: 'tech', label: 'Tecnología', description: '32 empleados' },{ value: 'fin', label: 'Finanzas', description: '18 empleados' }]} allowClear /></div>),
    code: `import { KAutocomplete } from '@khor/design-system/molecules/index';

<KAutocomplete 
  placeholder="Buscar..." 
  options={options} 
  onSelect={(opt) => console.log(opt)} 
  allowClear 
/>`,
    filename: 'KAutocomplete.tsx',
    playground: <AutocompletePlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, flexDirection: 'column', maxWidth: 350 }}>
        <KAutocomplete placeholder="Normal..." options={[{ value: 'abc', label: 'Opción ABC', description: 'desc' }]} />
        <KAutocomplete loading placeholder="Cargando sugerencias..." options={[]} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Up/Down: Navega sugerencias.', 'Enter: Confirma input.', 'Esc: Cierra listbox.'],
      aria: ['role="combobox", aria-autocomplete="list".'],
      contrast: 'AAA',
      score: 100,
    },
    props: [
      { name: 'options', type: 'KAutocompleteOption[]', required: true, description: 'Opciones con value, label y description.' },
      { name: 'onSelect', type: '(opt: KAutocompleteOption) => void', description: 'Callback al seleccionar.' },
      { name: 'onChange', type: '(value: string) => void', description: 'Callback al cambiar el texto.' },
      { name: 'loading', type: 'boolean', description: 'Muestra un spinner de carga.' },
      { name: 'allowClear', type: 'boolean', description: 'Permite limpiar el input.' },
      { name: 'placeholder', type: 'string', description: 'Texto de ayuda.' },
    ],
    guidelines: ['Usa para listas largas donde el usuario necesita filtrar.', 'La descripción ayuda a diferenciar opciones similares.'],
  },
  'date-picker': {
    id: 'date-picker', name: 'KDatePicker',
    description: 'Selector de fecha con calendario desplegable, navegación mensual y formato en español.',
    preview: (<div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}><KDatePicker placeholder="Fecha de ingreso" /><KDatePicker value={new Date()} disabled /></div>),
    code: `import { KDatePicker } from '@khor/design-system/molecules/index';

<KDatePicker 
  value={date} 
  onChange={setDate} 
  picker="date" 
/>`,
    filename: 'KDatePicker.tsx',
    playground: <DatePickerPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <KDatePicker />
        <KDatePicker picker="month" />
        <KDatePicker disabled />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Entra al input.', 'Enter: Abre el calendario.', 'Flechas: Permite navegar días en el panel abierto.'],
      aria: ['El input tiene role="combobox" de forma implícita.', 'El panel del calendario anuncia los días y meses navegados.'],
      contrast: 'AAA sobre días hábiles. AA sobre días fuera de mes.',
      score: 100,
    },
    props: [
      { name: 'value', type: 'Date', description: 'Fecha seleccionada.' },
      { name: 'onChange', type: '(d: Date) => void', description: 'Callback.' },
      { name: 'picker', type: "'date' | 'week' | 'month' | 'year'", default: "'date'", description: 'Tipo de selector.' },
      { name: 'minDate', type: 'Date', description: 'Fecha mínima.' },
      { name: 'maxDate', type: 'Date', description: 'Fecha máxima.' },
      { name: 'showTime', type: 'boolean', description: 'Habilitar selector de hora.' },
    ],
    guidelines: ['Formato español configurado por defecto.', 'Usa minDate/maxDate para restringir el rango seleccionable.'],
  },
  'date-range': {
    id: 'date-range', name: 'KDateRangePicker',
    description: 'Selector de rango de fechas con presets (Hoy, 7 días, 30 días, Este mes) y calendario dual.',
    preview: (<div><KDateRangePicker placeholder={['Inicio', 'Fin']} /></div>),
    code: `import { KDateRangePicker } from '@khor/design-system/molecules/index';

<KDateRangePicker 
  value={range} 
  onChange={setRange} 
  presets={customPresets} 
/>`,
    filename: 'KDateRangePicker.tsx',
    playground: <DatePickerPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
        <KDateRangePicker />
        <KDateRangePicker disabled />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Navega entre input de inicio y fin.', 'Flechas: Permiten seleccionar los rangos.'],
      aria: ['Ambos inputs están emparejados bajo aria-labels descriptivos de rango.'],
      contrast: 'AAA entre inputs. AAA panel.',
      score: 100,
    },
    props: [
      { name: 'value', type: 'KDateRange', description: 'Rango { from, to }.' },
      { name: 'onChange', type: '(r: KDateRange) => void', description: 'Callback.' },
      { name: 'presets', type: 'KDateRangePreset[]', description: 'Rangos predefinidos.' },
      { name: 'placeholder', type: '[string, string]', description: 'Textos de ayuda.' },
    ],
    guidelines: ['Incluye presets para rangos comunes (Hoy, Últimos 7 días, etc).', 'Ideal para filtros de fechas en tablas y dashboards.'],
  },
  'select-advanced': {
    id: 'select-advanced', name: 'KSelectAdvanced',
    description: 'Selector múltiple avanzado con soporte para etiquetas (tags), búsqueda integrada y límite de visualización.',
    preview: (<div style={{ maxWidth: 400 }}><KSelectAdvanced options={[{ label: 'Admin', value: '1' }, { label: 'Editor', value: '2' }, { label: 'Viewer', value: '3' }]} value={['1', '2']} mode="multiple" /></div>),
    code: `import { KSelectAdvanced } from '@khor/design-system/molecules/index';

<KSelectAdvanced 
  options={roles} 
  mode="multiple" 
  maxTagCount={2} 
  allowClear 
/>`,
    filename: 'KSelectAdvanced.tsx',
    playground: <SelectAdvancedPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
        <KSelectAdvanced mode="multiple" options={[{ label: 'A', value: '1' }, { label: 'B', value: '2' }]} value={['1', '2']} />
        <KSelectAdvanced mode="tags" disabled options={[]} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Backspace: Elimina el último tag seleccionado si el input está vacío.', 'Enter: Añade el tag escrito en mode="tags".'],
      aria: ['Cada chip (tag) seleccionado actúa como un elemento individual aria-label.'],
      contrast: 'AAA en los tags. AAA en input libre.',
      score: 100,
    },
    props: [
      { name: 'options', type: 'KSelectAdvancedOption[]', required: true, description: 'Opciones a mostrar.' },
      { name: 'mode', type: "'single' | 'multiple' | 'tags'", default: "'single'", description: 'Modo de selección.' },
      { name: 'maxTagCount', type: "number | 'responsive'", default: '3', description: 'Número máximo de tags visibles.' },
      { name: 'allowClear', type: 'boolean', description: 'Permite limpiar la selección.' },
      { name: 'loading', type: 'boolean', description: 'Estado de carga.' },
      { name: 'status', type: "'error' | 'warning'", description: 'Estado de validación.' },
    ],
    guidelines: ['Usa "multiple" para selección de una lista fija.', 'Usa "tags" para permitir al usuario ingresar nuevos valores.'],
  },
  'descriptions': {
    id: 'descriptions', name: 'KDescriptions',
    description: 'Lista de información en formato clave-valor, ideal para mostrar detalles de perfiles o registros técnicos.',
    preview: (<div style={{ width: '100%' }}><KDescriptions items={[{ label: 'Nombre', children: 'Juan Perez' }, { label: 'Edad', children: '30' }]} column={1} size="small" /></div>),
    code: `import { KDescriptions } from '@khor/design-system/molecules/index';

<KDescriptions 
  title="Detalles" 
  items={items} 
  bordered 
  column={2} 
/>`,
    filename: 'KDescriptions.tsx',
    playground: <DescriptionsPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
        <KDescriptions title="Default" items={[{ label: 'Usuario', children: 'Dani' }]} />
        <KDescriptions bordered title="Bordered" items={[{ label: 'ID', children: '001' }]} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Contenido puramente estático/de lectura.'],
      aria: ['Se convierte a estructura semántica de tabla (table/tr/th/td) garantizando lectura tabular perfecta en screen readers.'],
      contrast: 'AAA en los labels (color navy text).',
      score: 100,
    },
    props: [
      { name: 'items', type: 'KDescriptionItem[]', required: true, description: 'Lista de elementos (label, children, span).' },
      { name: 'title', type: 'ReactNode', description: 'Título de la sección.' },
      { name: 'bordered', type: 'boolean', default: 'false', description: 'Muestra bordes alrededor de las celdas.' },
      { name: 'column', type: 'number', default: '3', description: 'Número de columnas por fila.' },
      { name: 'size', type: "'default' | 'middle' | 'small'", default: "'default'", description: 'Tamaño de la lista.' },
    ],
    guidelines: ['Usa "span" en los items para que ocupen múltiples columnas.', 'El modo "bordered" es ideal para vistas de tipo formulario o ficha técnica.'],
  },
  'popconfirm': {
    id: 'popconfirm', name: 'KPopconfirm',
    description: 'Caja de confirmación compacta que aparece junto al elemento de activación para acciones rápidas.',
    preview: (<div><KPopconfirm title="¿Eliminar registro?" okText="Sí" cancelText="No"><KText style={{ cursor: 'pointer' }} color="primary">Click para confirmar</KText></KPopconfirm></div>),
    code: `import { KPopconfirm } from '@khor/design-system/molecules/index';

<KPopconfirm 
  title="¿Estás seguro?" 
  onConfirm={handleDelete}
>
  <KButton>Eliminar</KButton>
</KPopconfirm>`,
    filename: 'KPopconfirm.tsx',
    playground: <PopconfirmPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16 }}>
        <KPopconfirm title="¿Confirmar acción?"><KButton>Base</KButton></KPopconfirm>
        <KPopconfirm title="¿Eliminar definitivamente?" okText="Borrar" cancelText="Atrás"><KButton>Danger</KButton></KPopconfirm>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Space/Enter: Abre el dialog.', 'Tab: Atrapa el foco de inmediato en los botones de Ok/Cancel.'],
      aria: ['Abre una estructura role="dialog" o role="alertdialog" que exige acción.'],
      contrast: 'AAA para la pregunta prioritaria.',
      score: 100,
    },
    props: [
      { name: 'title', type: 'ReactNode', required: true, description: 'Título de la confirmación.' },
      { name: 'description', type: 'ReactNode', description: 'Información adicional sobre la acción.' },
      { name: 'onConfirm', type: '() => void', description: 'Callback al confirmar.' },
      { name: 'onCancel', type: '() => void', description: 'Callback al cancelar.' },
      { name: 'okText', type: 'string', default: "'OK'", description: 'Texto del botón principal.' },
      { name: 'cancelText', type: 'string', default: "'Cancel'", description: 'Texto del botón secundario.' },
      { name: 'placement', type: 'string', default: "'top'", description: 'Ubicación del popover.' },
    ],
    guidelines: ['Usa para acciones destructivas que no requieren un Modal completo.', 'Mantén los mensajes cortos y directos.'],
  },
  'result': {
    id: 'result', name: 'KResult',
    description: 'Página de resultado para estados de éxito, error, advertencia o páginas de error (404, 500).',
    preview: (<div><KResult status="success" title="Pago Exitoso" subTitle="Tu transacción se ha completado correctamente." /></div>),
    code: `import { KResult } from '@khor/design-system/molecules/index';

<KResult 
  status="success" 
  title="Completado" 
  subTitle="Acción realizada con éxito" 
/>`,
    filename: 'KResult.tsx',
    playground: <ResultPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 24, overflowX: 'auto', padding: 8 }}>
        <div style={{ minWidth: 200 }}><KResult status="success" title="Success" /></div>
        <div style={{ minWidth: 200 }}><KResult status="error" title="Error" /></div>
        <div style={{ minWidth: 200 }}><KResult status="404" title="404 NotFound" /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Solo elementos interactivos (extra buttons) reciben foco.'],
      aria: ['Icono puramente decorativo aria-hidden="true". El título es un role="heading".'],
      contrast: 'AAA. El ícono asume colores semánticos AA (Verde, Rojo, Amarillo, Azul).',
      score: 100,
    },
    props: [
      { name: 'status', type: "'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500'", required: true, description: 'Estado del resultado.' },
      { name: 'title', type: 'ReactNode', required: true, description: 'Título principal.' },
      { name: 'subTitle', type: 'ReactNode', description: 'Texto explicativo secundario.' },
      { name: 'extra', type: 'ReactNode', description: 'Área para botones de acción.' },
      { name: 'icon', type: 'ReactNode', description: 'Icono personalizado.' },
    ],
    guidelines: ['Usa para feedbacks de página completa.', 'Define acciones claras en la propiedad "extra" para guiar al usuario.'],
  },
  'timeline': {
    id: 'timeline', name: 'KTimeline',
    description: 'Visualización de eventos cronológicos o hitos de un proceso de forma vertical.',
    preview: (<div><KTimeline items={[{ children: 'Paso 1' }, { children: 'Paso 2' }]} /></div>),
    code: `import { KTimeline } from '@khor/design-system/molecules/index';

<KTimeline 
  items={[{ children: 'Creado' }, { children: 'Aprobado' }]} 
  mode="alternate" 
/>`,
    filename: 'KTimeline.tsx',
    playground: <TimelinePlayground />,
    stateShowcase: (
      <div style={{ padding: 16 }}>
        <KTimeline mode="alternate" items={[{ children: 'Paso Rojo', color: 'red' }, { children: 'Paso Verde', color: 'green' }]} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Estático (no interactivo), a menos que el contenido inyectado tenga enlaces.'],
      aria: ['Es renderizado como una lista nativa (ul/li). Excelente para lectura secuencial.'],
      contrast: 'AAA. Los círculos de estado actúan de apoyo visual.',
      score: 100,
    },
    props: [
      { name: 'items', type: 'TimelineItemProps[]', required: true, description: 'Lista de eventos con children, label, color.' },
      { name: 'mode', type: "'left' | 'right' | 'alternate'", default: "'left'", description: 'Alineación de los elementos.' },
      { name: 'pending', type: 'boolean | ReactNode', description: 'Muestra un estado pendiente al final.' },
      { name: 'reverse', type: 'boolean', description: 'Invierte el orden cronológico.' },
    ],
    guidelines: ['Usa "label" para mostrar fechas u horas junto a los hitos.', 'El modo "alternate" es ideal para narrativas o logs de actividad.'],
  },
  /* ═══ WAVE 3 — Componentes finales ═══ */
  'cascader': {
    id: 'cascader', name: 'KCascader',
    description: 'Selector multinivel para navegar por estructuras jerárquicas complejas (ej: Ubicación, Categorías).',
    preview: (<div style={{ maxWidth: 350 }}><KCascader placeholder="Seleccionar..." options={[{ value: '1', label: 'Espana', children: [{ value: '1-1', label: 'Madrid' }] }]} /></div>),
    code: `import { KCascader } from '@khor/design-system/molecules/index';

<KCascader 
  options={treeData} 
  onChange={(val) => console.log(val)} 
  allowClear 
/>`,
    filename: 'KCascader.tsx',
    playground: <CascaderPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
        <KCascader options={[{ value: '1', label: 'España', children: [{ value: '1-1', label: 'Madrid' }] }]} placeholder="Base" />
        <KCascader disabled options={[]} placeholder="Discapacitado" />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Up/Down: Recorre opciones verticales.', 'Left/Right: Expande/Contrae el nivel jerárquico.'],
      aria: ['Sigue el patrón de combobox con sub-menús expandibles (aria-expanded).'],
      contrast: 'AAA sobre paneles desplegables.',
      score: 100,
    },
    props: [
      { name: 'options', type: 'KCascaderOption[]', required: true, description: 'Estructura jerárquica de opciones.' },
      { name: 'value', type: 'string[]', description: 'Valores seleccionados en orden.' },
      { name: 'onChange', type: '(value, options) => void', description: 'Callback al cambiar la selección.' },
      { name: 'multiple', type: 'boolean', description: 'Permite selección múltiple.' },
      { name: 'placeholder', type: 'string', description: 'Texto de ayuda.' },
    ],
    guidelines: ['Ideal para estructuras de más de 2 niveles jerárquicos.', 'Usa "allowClear" si la selección no es obligatoria.'],
  },
  'statistic': {
    id: 'statistic', name: 'KStatistic',
    description: 'Valor estadístico grande con título, prefijo/sufijo y tendencia de cambio.',
    preview: (<div style={{ display: 'flex', gap: 32 }}><KStatistic title="Empleados" value={1247} trend="up" trendValue="+12%" /><KStatistic title="Gastos" value={34000} prefix="$" trend="down" trendValue="-3%" /></div>),
    code: `import { KStatistic } from '@khor/design-system/molecules/index';

<KStatistic 
  title="Ventas" 
  value={45000} 
  prefix="$" 
  trend="up" 
  trendValue="15%" 
/>`,
    filename: 'KStatistic.tsx',
    playground: <StatisticPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <KStatistic title="Base" value={100} />
        <KStatistic title="Up" value={25.4} trend="up" trendValue="+5%" precision={1} prefix="$" />
        <KStatistic title="Down" value={10} trend="down" trendValue="-2%" />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Lectura pasiva.'],
      aria: ['Los iconos ArrowUp/ArrowDown son decorativos, el string de texto expone la tendencia a screen readers.'],
      contrast: 'AAA para el valor principal en tamaño grande.',
      score: 100,
    },
    props: [
      { name: 'title', type: 'ReactNode', description: 'Etiqueta del dato.' },
      { name: 'value', type: 'string | number', required: true, description: 'Valor a mostrar.' },
      { name: 'precision', type: 'number', description: 'Decimales a mostrar.' },
      { name: 'prefix', type: 'ReactNode', description: 'Contenido antes del valor.' },
      { name: 'suffix', type: 'ReactNode', description: 'Contenido después del valor.' },
      { name: 'trend', type: "'up' | 'down'", description: 'Dirección de la tendencia.' },
      { name: 'trendValue', type: 'string | number', description: 'Porcentaje o valor de cambio.' },
    ],
    guidelines: ['Usa para dashboards o KPIs importantes.', 'Combina con prefijos como "$" o "MXN" para contextos financieros.'],
  },
  'timepicker': {
    id: 'timepicker', name: 'KTimePicker',
    description: 'Selector de hora con formato personalizable (12h/24h) y selección de intervalos.',
    preview: (<div><KTimePicker placeholder="Seleccionar..." /></div>),
    code: `import { KTimePicker } from '@khor/design-system/molecules/index';
import dayjs from 'dayjs';

<KTimePicker 
  format="HH:mm" 
  use12Hours={false}
  onChange={(time) => console.log(time)} 
/>`,
    filename: 'KTimePicker.tsx',
    playground: <TimePickerPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16 }}>
        <KTimePicker placeholder="Default" />
        <KTimePicker disabled placeholder="Disabled" />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Up/Down: Recorre horas/minutos.', 'Enter: Confirma la selección.'],
      aria: ['Popup interactivo recibe role="dialog", columns rol="listbox".'],
      contrast: 'AAA entre texto del campo y fondo neutro.',
      score: 100,
    },
    props: [
      { name: 'value', type: 'string | Dayjs', description: 'Valor seleccionado.' },
      { name: 'onChange', type: '(timeString) => void', description: 'Callback al cambiar la hora.' },
      { name: 'format', type: 'string', default: "'HH:mm:ss'", description: 'Formato de visualización.' },
      { name: 'use12Hours', type: 'boolean', description: 'Usa formato de 12 horas.' },
      { name: 'allowClear', type: 'boolean', default: 'true', description: 'Permite limpiar la selección.' },
    ],
    guidelines: ['Ideal para agendar citas o definir horarios operativos.', 'Usa "use12Hours" si el contexto cultural lo requiere.'],
  },
  'tooltip': {
    id: 'tooltip', name: 'KTooltip',
    description: 'Componente de texto informativo que aparece al pasar el cursor sobre un elemento. Ideal para dar contexto adicional sin sobrecargar la interfaz.',
    preview: (
      <div style={{ display: 'flex', gap: 32, padding: 16 }}>
        <KTooltip title="Este es un tooltip exitoso" color={khorTokens.colors.feedback.success}><KText>Pásame el mouse (Éxito)</KText></KTooltip>
        <KTooltip title="Tooltip estándar"><KText>Pásame el mouse (Default)</KText></KTooltip>
      </div>
    ),
    code: `import { KTooltip } from '@khor/design-system/molecules/index';

<KTooltip title="Ayuda para el usuario">
  <KButton icon={<Info size={16} />} />
</KTooltip>`,
    filename: 'KTooltip.tsx',
    playground: <TooltipPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, padding: '32px 16px' }}>
        <KTooltip title="Top tooltip" placement="top" open><KButton>Top</KButton></KTooltip>
        <KTooltip title="Color tooltip" color="blue" open><KButton>Color</KButton></KTooltip>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Focus: El tooltip aparece al recibir :focus-visible en el botón/hijo.'],
      aria: ['Usa aria-describedby apuntando al ID dinámico del popup.', 'role="tooltip" asignado al popup.'],
      contrast: 'AAA sobre paneles oscuros predeterminados.',
      score: 100,
    },
    props: [
      { name: 'title', type: 'ReactNode', required: true, description: 'Contenido del tooltip.' },
      { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right' ...", default: "'top'", description: 'Posición relativa al elemento.' },
      { name: 'trigger', type: "'hover' | 'focus' | 'click'", default: "'hover'", description: 'Acción que dispara el tooltip.' },
      { name: 'color', type: 'string', description: 'Color de fondo personalizado.' },
    ],
    guidelines: ['Útil para explicar iconos o abreviaturas.', 'Evita tooltips con demasiado texto; mantén el mensaje corto.'],
  },
  'mentions': {
    id: 'mentions', name: 'KMentions',
    description: 'Caja de texto que sugiere opciones de mención al escribir un disparador (ej: @).',
    preview: (<div><KMentions placeholder="Usa @ para mencionar" options={[{ value: '1', label: 'Admin' }]} /></div>),
    code: `import { KMentions } from '@khor/design-system/molecules/index';

<KMentions 
  trigger="@" 
  options={[{ value: 'user1', label: 'Dani' }]} 
/>`,
    filename: 'KMentions.tsx',
    playground: <MentionsPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 350 }}>
        <KMentions placeholder="Escribe @ para usuarios..." options={[{ value: 'admin', label: 'Admin' }]} />
        <KMentions placeholder="Deshabilitado" disabled options={[]} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Pulsar el trigger (@), activa el panel. Up/Down recorren opciones.', 'Enter/Espacio inserta la mención.'],
      aria: ['Anuncia combinaciones de búsqueda con aria-live.'],
      contrast: 'AAA en las opciones listadas.',
      score: 100,
    },
    props: [
      { name: 'options', type: 'KMentionOption[]', required: true, description: 'Lista de posibles menciones.' },
      { name: 'trigger', type: 'string', default: "'@'", description: 'Carácter que dispara el menú.' },
      { name: 'placeholder', type: 'string', description: 'Texto de ayuda.' },
      { name: 'autoSize', type: 'boolean', description: 'Ajuste automático de altura.' },
    ],
    guidelines: ['Usa etiquetas con avatares para una mejor UX de mención.', 'Ideal para comentarios, chats o sistemas de feedback.'],
  },
  'color-picker': {
    id: 'color-picker', name: 'KColorPicker',
    description: 'Selector de color con soporte para formatos HEX, RGB, HSB y paleta de presets.',
    preview: (<div style={{ display: 'flex', gap: 16 }}><KColorPicker value="#E04D36" /><KColorPicker value="#051758" /></div>),
    code: `import { KColorPicker } from '@khor/design-system/molecules/index';

<KColorPicker 
  value="#E04D36" 
  onChange={(color) => console.log(color)} 
  showText 
/>`,
    filename: 'KColorPicker.tsx',
    playground: <ColorPickerPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16 }}>
        <KColorPicker value="#1677ff" />
        <KColorPicker showText value="#E04D36" />
        <KColorPicker disabled value="#ccc" />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Accede al swatch principal.', 'Espacio: Lanza el panel de selección.'],
      aria: ['El panel asume role="dialog" o "application" para capturar atajos de espectro.'],
      contrast: 'Decorativo en el panel de espectro. AAA en el texto HEX/RGB.',
      score: 100,
    },
    props: [
      { name: 'value', type: 'string | Color', description: 'Color seleccionado.' },
      { name: 'onChange', type: '(color) => void', description: 'Callback al cambiar el color.' },
      { name: 'showText', type: 'boolean', default: 'false', description: 'Muestra el código de color junto al picker.' },
      { name: 'presets', type: 'Presets[]', description: 'Paleta de colores sugeridos.' },
    ],
    guidelines: ['Usa para configuraciones de marca o personalización de UI.', 'Prefiere formatos HEX para mayor compatibilidad.'],
  },
  'anchor': {
    id: 'anchor', name: 'KAnchor',
    description: 'Sistema de navegación por anclas para desplazarse rápidamente por diferentes secciones de una página.',
    preview: (<div><KAnchor items={[{ key: '1', href: '#', title: 'Sección 1' }]} /></div>),
    code: `import { KAnchor } from '@khor/design-system/molecules/index';

<KAnchor 
  items={[
    { key: '1', href: '#intro', title: 'Intro' },
    { key: '2', href: '#usage', title: 'Uso' }
  ]} 
/>`,
    filename: 'KAnchor.tsx',
    playground: <AnchorPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', padding: 16 }}>
        <KAnchor affix={false} items={[{ key: '1', href: '#section1', title: 'Sección 1' }, { key: '2', href: '#section2', title: 'Sección 2' }]} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Navega por los enlaces naturales del anchor (etiquetas `<a>` reales).', 'Enter: Scrollea suavemente.'],
      aria: ['Se convierte en un bloque semántico bajo role="navigation".'],
      contrast: 'AAA. El link activo se resalta en primary Khor.',
      score: 100,
    },
    props: [
      { name: 'items', type: 'AnchorLink[]', required: true, description: 'Lista de enlaces de navegación.' },
      { name: 'offsetTop', type: 'number', default: '0', description: 'Distancia al borde superior antes de activar.' },
      { name: 'affix', type: 'boolean', default: 'true', description: 'Fija el menú en pantalla.' },
    ],
    guidelines: ['Ideal para páginas largas de documentación o reportes.', 'Asegura que los IDs de destino existan en el DOM.'],
  },
  'list': {
    id: 'list', name: 'KList',
    description: 'Lista genérica para mostrar colecciones de datos con soporte para avatares, metadatos y acciones.',
    preview: (<div><KList items={[{ key: '1', title: 'Item 1' }, { key: '2', title: 'Item 2' }]} /></div>),
    code: `import { KList } from '@khor/design-system/molecules/index';

<KList 
  items={[
    { key: '1', title: 'Registro A', description: 'Detalle' },
    { key: '2', title: 'Registro B' }
  ]} 
  bordered 
/>`,
    filename: 'KList.tsx',
    playground: <ListPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KList bordered items={[{ key: '1', title: 'Item 1' }, { key: '2', title: 'Item 2' }]} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Lectura pasiva iterada sobre elementos internos.'],
      aria: ['Genera structure_role="list" y los ítems con role="listitem".', 'Si los ítems cambian, soporte en aria-live.'],
      contrast: 'AAA sobre líneas divisorias grises.',
      score: 100,
    },
    props: [
      { name: 'items', type: 'KListItem[]', required: true, description: 'Colección de elementos a listar.' },
      { name: 'bordered', type: 'boolean', default: 'false', description: 'Muestra bordes exteriores.' },
      { name: 'size', type: "'small' | 'middle' | 'large'", default: "'middle'", description: 'Tamaño del espaciado.' },
      { name: 'header', type: 'ReactNode', description: 'Cabecera de la lista.' },
      { name: 'footer', type: 'ReactNode', description: 'Pie de la lista.' },
    ],
    guidelines: ['Usa para mostrar información estructurada repetitiva.', 'Combina con avatares para facilitar el reconocimiento visual.'],
  },
  'divider-ext': { id: 'divider-ext', name: 'KDividerExtended', description: 'Divisor con soporte para texto central y estilo dashed.',
    preview: (<div><KDividerExtended /><KDividerExtended>O continúa con</KDividerExtended><KDividerExtended dashed /></div>),
    code: `<KDividerExtended>O continúa con</KDividerExtended>`, filename: 'KDividerExtended.tsx',
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KDividerExtended />
        <KDividerExtended dashed>Dashed Central</KDividerExtended>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Separador visual pasivo (no atrapa foco).'],
      aria: ['Role nativo "separator". El texto inyectado respeta el DOM normal.'],
      contrast: 'Línea visual AA.',
      score: 100,
    },
    props: [{ name: 'children', type: 'ReactNode', description: 'Texto central.' }, { name: 'dashed', type: 'boolean', description: 'Estilo dashed.' }],
    guidelines: ['Usa con texto para separar secciones semánticas.'] },
  'tree-select': {
    id: 'tree-select', name: 'KTreeSelect',
    description: 'Selector de árbol jerárquico que permite navegar y seleccionar elementos en estructuras multinivel.',
    preview: (<div style={{ width: 280 }}><KTreeSelect treeData={[{ title: 'Raíz', value: 'r', children: [{ title: 'Hijo', value: 'h' }] }]} placeholder="Seleccionar..." /></div>),
    code: `import { KTreeSelect } from '@khor/design-system/molecules/index';

<KTreeSelect 
  treeData={treeData} 
  placeholder="Seleccionar área" 
  onChange={(val) => setVal(val)} 
/>`,
    filename: 'KTreeSelect.tsx',
    playground: <TreeSelectPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, flexDirection: 'column', maxWidth: 300 }}>
        <KTreeSelect treeData={[{ title: 'Rama 1', value: '1', children: [{ title: 'Hoja A', value: 'A' }] }]} placeholder="Base" />
        <KTreeSelect treeData={[]} placeholder="Discapacitado" disabled />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Flechas Arriba/Abajo: Navega items.', 'Flecha Derecha: Expande nodo padre.', 'Flecha Izquierda: Contrae nodo.'],
      aria: ['Se convierte en role="tree" y emite estados usando aria-expanded, aria-selected.'],
      contrast: 'AAA sobre paneles desplegables.',
      score: 100,
    },
    props: [
      { name: 'treeData', type: 'DataNode[]', required: true, description: 'Estructura jerárquica de datos.' },
      { name: 'value', type: 'string', description: 'Valor seleccionado.' },
      { name: 'placeholder', type: 'string', description: 'Texto de ayuda.' },
      { name: 'treeDefaultExpandAll', type: 'boolean', description: 'Expande todos los nodos por defecto.' },
    ],
    guidelines: ['Usa para clasificaciones complejas como organigramas o categorías anidadas.', 'Mantén la profundidad razonable (3-4 niveles máx) para asegurar legibilidad.'],
  },
  'transfer': {
    id: 'transfer', name: 'KTransfer',
    description: 'Componente de doble lista para mover elementos entre una columna de origen y una de destino.',
    preview: (<div><KTransfer dataSource={[{ key: '1', title: 'Item 1' }]} targetKeys={[]} /></div>),
    code: `import { KTransfer } from '@khor/design-system/molecules/index';

<KTransfer 
  dataSource={data} 
  targetKeys={targetKeys} 
  onChange={(nextKeys) => setTargetKeys(nextKeys)} 
  showSearch 
/>`,
    filename: 'KTransfer.tsx',
    playground: <TransferPlayground />,
    stateShowcase: (
      <div style={{ width: '100%', overflowX: 'auto', padding: 16 }}>
        <KTransfer dataSource={[{ key: '1', title: 'Item Base' }]} targetKeys={[]} showSearch />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Entra al panel.', 'Arrows: Selecciona items internos.', 'Space: Toggle elemento.', 'Tab hacia los botones de flecha o enter para transferir.'],
      aria: ['Aria-live configurado para la caja de estado y notificar transferencias dinámicamente.'],
      contrast: 'AAA sobre botones primarios in-between matrices.',
      score: 100,
    },
    props: [
      { name: 'dataSource', type: 'KTransferItem[]', required: true, description: 'Elementos disponibles y seleccionados.' },
      { name: 'targetKeys', type: 'string[]', required: true, description: 'Keys de los elementos en la columna derecha.' },
      { name: 'onChange', type: '(nextKeys) => void', description: 'Callback al mover elementos.' },
      { name: 'showSearch', type: 'boolean', default: 'false', description: 'Habilita caja de búsqueda en columnas.' },
    ],
    guidelines: ['Ideal para asignación de roles, permisos o selección múltiple con orden relevante.', 'Usa "showSearch" si la lista supera los 10 elementos.'],
  },
};

export function MoleculesPage() {
  const { id } = useParams<{ id: string }>();
  const mol = id ? molecules[id] : null;

  if (!mol) {
    return (
      <div style={{ textAlign: 'center', padding: 64, fontFamily: khorTokens.typography.fontPrimary }}>
        <KText variant="h2" color="navy">Molécula no encontrada</KText>
        <KText variant="body-md" color="secondary">Selecciona una molécula del menú lateral.</KText>
      </div>
    );
  }

  return (
    <ComponentDoc
      name={mol.name}
      category="Molecula"
      description={mol.description}
      preview={mol.preview}
      playground={mol.playground}
      code={mol.code}
      filename={mol.filename}
      props={mol.props}
      guidelines={mol.guidelines}
      aiNotes={mol.aiNotes}
      stateShowcase={mol.stateShowcase}
      a11ySummary={mol.a11ySummary}
    />
  );
}