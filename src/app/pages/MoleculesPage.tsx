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
  KPopconfirm, KResult, KTimeline,
  KCascader, KStatistic, KTimePicker, KMentions,
  KColorPicker, KAnchor, KList, KDividerExtended,
  KTreeSelect, KTransfer,
} from '../components/design-system/molecules/index';
import { KButton, KInput, KText } from '../components/design-system/atoms/index';
import {
  Users, DollarSign, TrendingUp, Calendar, Home,
  Settings, FileText, Inbox, Search, BarChart3,
  Edit, Trash2, Copy, Share2, MoreHorizontal, Info,
  CheckCircle, Clock, AlertTriangle, GitCommit, Tag,
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
  const [disabled, setDisabled] = useState(false);
  const [allowClear, setAllowClear] = useState(true);
  const [size, setSize] = useState<any>('middle');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tamano</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['small','middle','large'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Error</label><input value={error} onChange={(e) => setError(e.target.value)} placeholder="Dejar vacio" style={sel} /></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} /> Required</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={allowClear} onChange={(e) => setAllowClear(e.target.checked)} /> Allow Clear</label>
          </div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Seleccionado: {value || '(ninguno)'}</p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 300, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
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
          allowClear={allowClear}
          size={size}
          status={error ? 'error' : undefined}
        />
        {error && <div style={{ color: khorTokens.colors.feedback.error, fontSize: 12, marginTop: 4 }}>{error}</div>}
      </div>
    </div>
  );
}

function UserCellPlayground() {
  const [name, setName] = useState('Maria Garcia');
  const [role, setRole] = useState('Gerente de RH');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('https://i.pravatar.cc/150?img=47');
  const [size, setSize] = useState<any>('md');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Nombre</label><input value={name} onChange={(e) => setName(e.target.value)} style={sel} /></div>
          <div><label style={ctrl}>Rol alternativo (si no hay email)</label><input value={role} onChange={(e) => setRole(e.target.value)} style={sel} /></div>
          <div><label style={ctrl}>Email (prioridad sobre rol)</label><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="opcional" style={sel} /></div>
          <div><label style={ctrl}>URL de Avatar</label><input value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="Dejar vacio para iniciales" style={sel} /></div>
          <div><label style={ctrl}>Tamano</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md'].map(s=><option key={s}>{s}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KUserCell name={name} role={role || undefined} email={email || undefined} avatar={avatar || undefined} size={size} />
      </div>
    </div>
  );
}

function StepsPlayground() {
  const [current, setCurrent] = useState(1);
  const steps = [
    { title: 'Datos Personales', description: 'Nombre, email' },
    { title: 'Puesto', description: 'Departamento y rol' },
    { title: 'Documentos', description: 'Contratos' },
    { title: 'Confirmar', description: 'Revisar y enviar' },
  ];
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block', marginBottom: 4 }}>Paso actual: {current + 1}</label>
            <input type="range" min={0} max={3} value={current} onChange={(e) => setCurrent(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 400, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSteps current={current} onChange={setCurrent} items={steps} />
      </div>
    </div>
  );
}

function BreadcrumbPlayground() {
  const [levels, setLevels] = useState(3);
  const allItems = [
    { label: 'Inicio', onClick: () => {} },
    { label: 'Empleados', onClick: () => {} },
    { label: 'Departamento RH', onClick: () => {} },
    { label: 'Maria Garcia' },
  ];
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div>
          <label style={{ fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block', marginBottom: 4 }}>Niveles: {levels}</label>
          <input type="range" min={2} max={4} value={levels} onChange={(e) => setLevels(Number(e.target.value))} style={{ width: '100%' }} />
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300, display: 'flex', alignItems: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KBreadcrumb items={allItems.slice(0, levels)} />
      </div>
    </div>
  );
}

function AccordionPlayground() {
  const [type, setType] = useState<any>('single');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div><label style={ctrl}>Tipo</label><select value={type} onChange={(e) => setType(e.target.value)} style={sel}>{['single','multiple'].map(t=><option key={t}>{t}</option>)}</select></div>
      </div>
      <div style={{ flex: 2, minWidth: 350, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KAccordion items={[
          { key: '1', label: 'Como registro un empleado?', children: <KText variant="body-md" color="secondary">Navega a Empleados y completa el formulario.</KText> },
          { key: '2', label: 'Como genero la nomina?', children: <KText variant="body-md" color="secondary">Ve a Nomina, selecciona fechas y confirma.</KText> },
          { key: '3', label: 'Como exporto reportes?', children: <KText variant="body-md" color="secondary">Usa el boton Exportar en cualquier tabla.</KText> },
        ]} defaultActiveKey={['1']} />
      </div>
    </div>
  );
}

function EmptyStatePlayground() {
  const [title, setTitle] = useState('No hay resultados');
  const [desc, setDesc] = useState('Intenta cambiar los filtros de busqueda.');
  const [showAction, setShowAction] = useState(true);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Titulo</label><input value={title} onChange={(e) => setTitle(e.target.value)} style={sel} /></div>
          <div><label style={ctrl}>Descripcion</label><input value={desc} onChange={(e) => setDesc(e.target.value)} style={sel} /></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showAction} onChange={(e) => setShowAction(e.target.checked)} /> Mostrar accion</label>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300, padding: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KEmptyState
          icon={<Inbox size={48} />}
          title={title}
          description={desc}
          actionLabel={showAction ? "Agregar" : undefined}
          onAction={() => {}}
        />
      </div>
    </div>
  );
}

function DropdownPlayground() {
  const [lastSelected, setLastSelected] = useState('(ninguno)');
  const items = [
    { key: 'edit', label: 'Editar', icon: <Edit size={14} /> },
    { key: 'copy', label: 'Duplicar', icon: <Copy size={14} /> },
    { key: 'share', label: 'Compartir', icon: <Share2 size={14} /> },
    { key: 'div1', label: '', divider: true },
    { key: 'delete', label: 'Eliminar', icon: <Trash2 size={14} />, danger: true },
  ];
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Info</h4>
        <p style={{ fontSize: 13, color: khorTokens.colors.neutral[400], margin: 0 }}>Ultimo seleccionado: <strong>{lastSelected}</strong></p>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KDropdownMenu
          menu={{
            items: items as any,
            onClick: (info) => setLastSelected(info.key)
          }}
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
  const [side, setSide] = useState<any>('bottom');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Lado</label><select value={side} onChange={(e) => setSide(e.target.value)} style={sel}>{['top','bottom','left','right'].map(s=><option key={s}>{s}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KPopover
          content={
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <KText variant="body-md" color="default">Informacion del usuario</KText>
              <KText variant="small" color="secondary">Rol: Administrador</KText>
              <KText variant="small" color="secondary">Antiguedad: 3 anos</KText>
              <KButton variant="primary" size="sm">Ver perfil completo</KButton>
            </div>
          }
          side={side}
        >
          <KButton variant="secondary" size="sm" icon={<Info size={14} />}>Abrir Popover</KButton>
        </KPopover>
      </div>
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
      { name: 'options', type: '{ label: string; value: string | number }[]', required: true, description: 'Opciones del select.' },
      { name: 'value', type: 'string | number', description: 'Valor seleccionado.' },
      { name: 'onChange', type: '(value) => void', description: 'Callback al seleccionar.' },
      { name: 'required', type: 'boolean', description: 'Marca como requerido.' },
      { name: 'error', type: 'string', description: 'Mensaje de error.' },
      { name: 'disabled', type: 'boolean', description: 'Desactiva el select.' },
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
      { name: 'role', type: 'string', description: 'Rol o cargo.' },
      { name: 'avatar', type: 'string', description: 'URL de la foto.' },
      { name: 'status', type: "'online' | 'offline' | 'busy' | 'away'", description: 'Estado de actividad.' },
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
    description: 'Navegación jerárquica que muestra la ubicación del usuario dentro de la aplicación. Ideal para páginas con múltiples niveles de profundidad.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KBreadcrumb items={[{ title: 'Inicio' }, { title: 'Empleados' }, { title: 'María García' }]} />
        <KBreadcrumb items={[{ title: 'Dashboard' }, { title: 'Nóminas' }, { title: 'Enero 2026' }, { title: 'Detalle' }]} />
      </div>
    ),
    playground: <BreadcrumbPlayground />,
    code: `import { KBreadcrumb } from '@khor/design-system/molecules/index';

<KBreadcrumb items={[
  { label: 'Inicio', onClick: () => navigate('/') },
  { label: 'Empleados', onClick: () => navigate('/empleados') },
  { label: 'María García' },
]} />`,
    filename: 'KBreadcrumb.tsx',
    props: [
      { name: 'items', type: 'KBreadcrumbItem[]', required: true, description: 'Array de items. El último se muestra como texto activo.' },
      { name: 'separator', type: 'ReactNode', description: 'Separador personalizado. Por defecto usa ChevronRight.' },
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
        <KDropdownMenu
          menu={{
            items: [
              { key: 'view', label: 'Ver detalle' },
              { key: 'edit', label: 'Editar' },
              { key: 'disabled', label: 'No disponible', disabled: true },
            ]
          }}
        >
          <KButton variant="secondary" size="sm">Más</KButton>
        </KDropdownMenu>
      </div>
    ),
    playground: <DropdownPlayground />,
    code: `import { KDropdownMenu } from '@khor/design-system/molecules/index';

<KDropdownMenu
  trigger={<KButton variant="secondary" size="sm">Acciones</KButton>}
  items={[
    { key: 'edit', label: 'Editar', icon: <Edit size={14} /> },
    { key: 'div', label: '', divider: true },
    { key: 'delete', label: 'Eliminar', danger: true },
  ]}
  onSelect={(key) => handleAction(key)}
/>`,
    filename: 'KDropdownMenu.tsx',
    props: [
      { name: 'items', type: 'KDropdownItem[]', required: true, description: 'Array de items del menú.' },
      { name: 'onSelect', type: '(key: string) => void', description: 'Callback al seleccionar un item.' },
      { name: 'trigger', type: 'ReactNode', description: 'Elemento que abre el menú. Por defecto es MoreHorizontal.' },
    ],
    guidelines: ['Usa divider para separar grupos lógicos.', 'Los items danger siempre al final del menú.'],
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
    code: `import { KPopover } from '@khor/design-system/molecules/index';

<KPopover
  trigger={<KButton variant="secondary">Detalles</KButton>}
  side="bottom"
>
  <div>
    <KText variant="body-md">Contenido del popover</KText>
    <KButton variant="primary" size="sm">Acción</KButton>
  </div>
</KPopover>`,
    filename: 'KPopover.tsx',
    props: [
      { name: 'trigger', type: 'ReactNode', required: true, description: 'Elemento que activa el popover.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Contenido del popover.' },
      { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Lado de aparición.' },
    ],
    playground: <PopoverPlayground />,
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
      { name: 'items', type: 'KAccordionItem[]', required: true, description: 'Array de secciones con key, title y children.' },
      { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Modo: single cierra las demás al abrir una.' },
      { name: 'defaultValue', type: 'string[]', description: 'Keys de secciones abiertas por defecto.' },
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
    props: [{ name: 'value', type: 'number', description: 'Valor controlado.' },{ name: 'onChange', type: '(v: number | undefined) => void', description: 'Callback.' },{ name: 'min', type: 'number', description: 'Valor minimo.' },{ name: 'max', type: 'number', description: 'Valor maximo.' },{ name: 'step', type: 'number', default: '1', description: 'Incremento.' },{ name: 'precision', type: 'number', description: 'Decimales.' },{ name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", description: 'Tamano.' }],
    guidelines: ['Usa precision para valores monetarios.', 'Define min/max para evitar valores invalidos.'],
  },
  'segmented': {
    id: 'segmented', name: 'KSegmented',
    description: 'Control segmentado tipo iOS para alternar entre opciones mutuamente excluyentes.',
    preview: (<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}><KSegmented options={['Diario', 'Semanal', 'Mensual']} value="Semanal" /><KSegmented options={[{ label: 'Lista', value: 'list' }, { label: 'Tabla', value: 'table' }]} value="list" /></div>),
    code: `import { KSegmented } from '@khor/molecules-extended';\n\n<KSegmented options={['Diario','Semanal','Mensual']} value={period} onChange={setPeriod} />`,
    filename: 'KSegmented.tsx',
    props: [{ name: 'options', type: '(string | KSegmentedOption)[]', required: true, description: 'Opciones.' },{ name: 'value', type: 'string', description: 'Seleccionado.' },{ name: 'onChange', type: '(v: string) => void', description: 'Callback.' },{ name: 'block', type: 'boolean', default: 'false', description: 'Full width.' },{ name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", description: 'Tamano.' }],
    guidelines: ['Usa para 2-5 opciones.', 'Soporta iconos junto al label.'],
  },
  'autocomplete': {
    id: 'autocomplete', name: 'KAutocomplete',
    description: 'Input con sugerencias filtradas en tiempo real, opciones con descripcion y estado de carga.',
    preview: (<div style={{ maxWidth: 400 }}><KAutocomplete placeholder="Buscar departamento..." options={[{ value: 'rh', label: 'Recursos Humanos', description: '45 empleados' },{ value: 'tech', label: 'Tecnologia', description: '32 empleados' },{ value: 'fin', label: 'Finanzas', description: '18 empleados' }]} allowClear /></div>),
    code: `import { KAutocomplete } from '@khor/molecules-extended';\n\n<KAutocomplete placeholder="Buscar..." options={depts} onSelect={(opt) => setDept(opt.value)} allowClear />`,
    filename: 'KAutocomplete.tsx',
    props: [{ name: 'options', type: 'KAutocompleteOption[]', required: true, description: 'Opciones con value, label, description.' },{ name: 'onSelect', type: '(opt) => void', description: 'Al seleccionar.' },{ name: 'loading', type: 'boolean', description: 'Spinner.' },{ name: 'allowClear', type: 'boolean', description: 'Boton limpiar.' }],
    guidelines: ['Usa para listas largas donde el usuario filtra.'],
  },
  'date-picker': {
    id: 'date-picker', name: 'KDatePicker',
    description: 'Selector de fecha con calendario desplegable, navegacion mensual y formato en espanol.',
    preview: (<div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}><KDatePicker placeholder="Fecha de ingreso" /><KDatePicker value={new Date()} disabled /></div>),
    code: `import { KDatePicker } from '@khor/molecules-extended';\n\n<KDatePicker value={date} onChange={setDate} minDate={new Date()} />`,
    filename: 'KDatePicker.tsx',
    props: [{ name: 'value', type: 'Date', description: 'Fecha seleccionada.' },{ name: 'onChange', type: '(d: Date | undefined) => void', description: 'Callback.' },{ name: 'minDate', type: 'Date', description: 'Fecha minima.' },{ name: 'maxDate', type: 'Date', description: 'Fecha maxima.' }],
    guidelines: ['Formato espanol por defecto.', 'Usa minDate/maxDate para restringir.'],
  },
  'date-range': {
    id: 'date-range', name: 'KDateRangePicker',
    description: 'Selector de rango de fechas con presets (Hoy, 7 dias, 30 dias, Este mes) y calendario dual.',
    preview: (<div><KDateRangePicker placeholder={['Inicio', 'Fin']} /></div>),
    code: `import { KDateRangePicker } from '@khor/molecules-extended';\n\n<KDateRangePicker value={range} onChange={setRange} />`,
    filename: 'KDateRangePicker.tsx',
    props: [{ name: 'value', type: 'KDateRange', description: 'Rango { from, to }.' },{ name: 'onChange', type: '(r) => void', description: 'Callback.' },{ name: 'presets', type: 'KDateRangePreset[]', description: 'Rangos predefinidos.' }],
    guidelines: ['Incluye presets para rangos comunes.', 'Ideal para filtros de dashboards.'],
  },
  'select-advanced': {
    id: 'select-advanced', name: 'KSelectAdvanced',
    description: 'Select avanzado con modo multiple (tags), busqueda y maxTagCount para overflow.',
    preview: (<div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 16 }}><KSelectAdvanced placeholder="Departamentos..." mode="multiple" options={[{ label: 'Recursos Humanos', value: 'rh' },{ label: 'Tecnologia', value: 'tech' },{ label: 'Finanzas', value: 'fin' },{ label: 'Marketing', value: 'mkt' }]} value={['rh', 'tech']} allowClear /><KSelectAdvanced placeholder="Rol..." options={[{ label: 'Admin', value: 'admin' },{ label: 'Editor', value: 'editor' },{ label: 'Viewer', value: 'viewer' }]} /></div>),
    code: `import { KSelectAdvanced } from '@khor/molecules-extended';\n\n<KSelectAdvanced mode="multiple" options={depts} value={selected} onChange={setSelected} allowClear />`,
    filename: 'KSelectAdvanced.tsx',
    props: [{ name: 'options', type: 'KSelectAdvancedOption[]', required: true, description: 'Opciones.' },{ name: 'mode', type: "'single'|'multiple'|'tags'", default: "'single'", description: 'Modo.' },{ name: 'value', type: 'string | string[]', description: 'Seleccionados.' },{ name: 'maxTagCount', type: 'number', default: '3', description: 'Tags visibles.' },{ name: 'allowClear', type: 'boolean', description: 'Boton limpiar.' }],
    guidelines: ['Usa mode="multiple" para multi-seleccion.'],
  },
  'descriptions': {
    id: 'descriptions', name: 'KDescriptions',
    description: 'Lista clave-valor para detalles de registro. Layout horizontal/vertical, bordes y columnas.',
    preview: (<KDescriptions title="Detalle del Empleado" bordered items={[{ label: 'Nombre', children: 'Maria Garcia' },{ label: 'Email', children: 'maria@khor.com' },{ label: 'Depto', children: 'RH' },{ label: 'Puesto', children: 'Gerente' },{ label: 'Ingreso', children: '15 Ene 2023' },{ label: 'Estado', children: 'Activo' }]} />),
    code: `import { KDescriptions } from '@khor/molecules-extended';\n\n<KDescriptions title="Detalle" bordered column={3} items={[{ label: 'Nombre', children: 'Maria' }]} />`,
    filename: 'KDescriptions.tsx',
    props: [{ name: 'items', type: 'KDescriptionItem[]', required: true, description: 'Pares label-children.' },{ name: 'bordered', type: 'boolean', description: 'Bordes.' },{ name: 'column', type: 'number', default: '3', description: 'Columnas.' },{ name: 'layout', type: "'horizontal'|'vertical'", default: "'horizontal'", description: 'Orientacion.' }],
    guidelines: ['Usa bordered para detalle formal.', 'column=2 en sidepanels.'],
  },
  'popconfirm': {
    id: 'popconfirm', name: 'KPopconfirm',
    description: 'Popover de confirmacion ligero para acciones destructivas sin interrumpir el flujo.',
    preview: (<div style={{ display: 'flex', gap: 16 }}><KPopconfirm title="Eliminar empleado?" description="No se puede deshacer." onConfirm={() => {}}><KButton variant="danger" size="sm" icon={<Trash2 size={14} />}>Eliminar</KButton></KPopconfirm><KPopconfirm title="Aprobar?" onConfirm={() => {}}><KButton variant="primary" size="sm" icon={<CheckCircle size={14} />}>Aprobar</KButton></KPopconfirm></div>),
    code: `import { KPopconfirm } from '@khor/molecules-extended';\n\n<KPopconfirm title="Eliminar?" onConfirm={handleDelete}>\n  <KButton variant="danger">Eliminar</KButton>\n</KPopconfirm>`,
    filename: 'KPopconfirm.tsx',
    props: [{ name: 'title', type: 'ReactNode', required: true, description: 'Titulo.' },{ name: 'description', type: 'ReactNode', description: 'Descripcion.' },{ name: 'onConfirm', type: '() => void | Promise', description: 'Al confirmar (soporta async).' },{ name: 'placement', type: "'top'|'bottom'|'left'|'right'", default: "'top'", description: 'Lado.' }],
    guidelines: ['Para acciones de bajo impacto. Para criticas, usa KModalConfirm.'],
  },
  'result': {
    id: 'result', name: 'KResult',
    description: 'Pagina de resultado/estado: exito, error, warnings, 404, 403, 500.',
    preview: (<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}><KResult status="success" title="Empleado registrado" subTitle="Maria Garcia fue agregada." extra={<KButton variant="primary" size="sm">Ver perfil</KButton>} /><KResult status="error" title="Error al procesar" subTitle="Problema al guardar." extra={<KButton variant="secondary" size="sm">Reintentar</KButton>} /></div>),
    code: `import { KResult } from '@khor/molecules-extended';\n\n<KResult status="success" title="Operacion exitosa" extra={<KButton>Continuar</KButton>} />`,
    filename: 'KResult.tsx',
    props: [{ name: 'status', type: "'success'|'error'|'info'|'warning'|'404'|'403'|'500'", required: true, description: 'Tipo.' },{ name: 'title', type: 'ReactNode', required: true, description: 'Titulo.' },{ name: 'subTitle', type: 'ReactNode', description: 'Subtitulo.' },{ name: 'extra', type: 'ReactNode', description: 'Acciones.' }],
    guidelines: ['Siempre incluye accion que lleve al usuario de vuelta.'],
  },
  'timeline': {
    id: 'timeline', name: 'KTimeline',
    description: 'Linea de tiempo vertical para historial de eventos con modos left, right y alternate.',
    preview: (<KTimeline items={[{ children: 'Empleado registrado', label: '9 Mar 2026', color: khorTokens.colors.feedback.success, dot: <CheckCircle size={14} /> },{ children: 'Documentos verificados', label: '8 Mar 2026' },{ children: 'Asignado a Tecnologia', label: '7 Mar 2026', dot: <GitCommit size={14} /> },{ children: 'Solicitud creada', label: '5 Mar 2026' }]} pending="Procesando..." />),
    code: `import { KTimeline } from '@khor/molecules-extended';\n\n<KTimeline items={[{ children: 'Evento', label: 'Fecha' }]} pending="En proceso..." />`,
    filename: 'KTimeline.tsx',
    props: [{ name: 'items', type: 'KTimelineItem[]', required: true, description: 'Eventos.' },{ name: 'mode', type: "'left'|'alternate'|'right'", default: "'left'", description: 'Layout.' },{ name: 'pending', type: 'boolean | ReactNode', description: 'Ultimo evento pendiente.' },{ name: 'reverse', type: 'boolean', description: 'Invertir orden.' }],
    guidelines: ['Usa para historial de actividades.', 'dot custom permite iconos por evento.'],
  },
  /* ═══ WAVE 3 — Componentes finales ═══ */
  'cascader': { id: 'cascader', name: 'KCascader', description: 'Selector en cascada para datos jerárquicos. Los paneles se expanden al seleccionar.',
    preview: (<div style={{ maxWidth: 300 }}><KCascader options={[{ value: 'mx', label: 'México', children: [{ value: 'cdmx', label: 'CDMX' }, { value: 'gdl', label: 'Guadalajara' }] }, { value: 'us', label: 'EE.UU.', children: [{ value: 'ny', label: 'New York' }] }]} /></div>),
    code: `<KCascader options={locationData} value={loc} onChange={setLoc} />`, filename: 'KCascader.tsx',
    props: [{ name: 'options', type: 'KCascaderOption[]', required: true, description: 'Opciones jerárquicas.' }, { name: 'value', type: 'string[]', description: 'Ruta seleccionada.' }],
    guidelines: ['Ideal para ubicaciones o categorías jerárquicas.'] },
  'statistic': { id: 'statistic', name: 'KStatistic', description: 'Valor estadístico grande con título, prefijo/sufijo y tendencia.',
    preview: (<div style={{ display: 'flex', gap: 32 }}><KStatistic title="Empleados activos" value={1247} trend="up" trendValue="+12.5%" /><KStatistic title="Nómina mensual" value={2400000} prefix="$" suffix="MXN" trend="down" trendValue="-3.2%" /></div>),
    code: `<KStatistic title="Empleados" value={1247} trend="up" trendValue="+12%" />`, filename: 'KStatistic.tsx',
    props: [{ name: 'value', type: 'number | string', required: true, description: 'Valor.' }, { name: 'title', type: 'ReactNode', description: 'Título.' }],
    guidelines: ['Usa para métricas sueltas. Para tarjetas con sparkline, usa KStatCard.'] },
  'time-picker': { id: 'time-picker', name: 'KTimePicker', description: 'Selector de hora estilizado. Complementa a KDatePicker.',
    preview: (<div style={{ display: 'flex', gap: 12 }}><KTimePicker placeholder="Hora de entrada" /><KTimePicker value="09:00" disabled /></div>),
    code: `<KTimePicker value={time} onChange={setTime} />`, filename: 'KTimePicker.tsx',
    props: [{ name: 'value', type: 'string', description: 'Hora (HH:mm).' }, { name: 'onChange', type: '(v) => void', description: 'Callback.' }],
    guidelines: ['Combina con KDatePicker para fecha y hora completa.'] },
  'mentions': { id: 'mentions', name: 'KMentions', description: 'Textarea con soporte para @menciones y sugerencias.',
    preview: (<div style={{ maxWidth: 400 }}><KMentions options={[{ value: 'maria', label: 'María García' }, { value: 'juan', label: 'Juan Pérez' }, { value: 'ana', label: 'Ana López' }]} placeholder="Escribe @ para mencionar..." /></div>),
    code: `<KMentions options={users} value={comment} onChange={setComment} />`, filename: 'KMentions.tsx',
    props: [{ name: 'options', type: 'KMentionOption[]', required: true, description: 'Usuarios mencionables.' }],
    guidelines: ['Ideal para comentarios y notas colaborativas.'] },
  'color-picker': { id: 'color-picker', name: 'KColorPicker', description: 'Selector de color con paleta de presets, input hex y color nativo.',
    preview: (<div style={{ display: 'flex', gap: 16 }}><KColorPicker value="#E04D36" /><KColorPicker value="#051758" /></div>),
    code: `<KColorPicker value={color} onChange={setColor} />`, filename: 'KColorPicker.tsx',
    props: [{ name: 'value', type: 'string', description: 'Color hex.' }, { name: 'onChange', type: '(c) => void', description: 'Callback.' }],
    guidelines: ['Incluye los colores Khor como presets por defecto.'] },
  'anchor': { id: 'anchor', name: 'KAnchor', description: 'Navegación lateral con scroll spy automático.',
    preview: (<KAnchor items={[{ key: 'intro', title: 'Introducción', href: '#intro' }, { key: 'install', title: 'Instalación', href: '#install' }, { key: 'usage', title: 'Uso básico', href: '#usage' }]} />),
    code: `<KAnchor items={[{ key: 'sec1', title: 'Sección 1', href: '#sec1' }]} />`, filename: 'KAnchor.tsx',
    props: [{ name: 'items', type: 'KAnchorLink[]', required: true, description: 'Links con key, title, href.' }],
    guidelines: ['Ideal para documentación y páginas largas.'] },
  'list': { id: 'list', name: 'KList', description: 'Lista estructurada con avatar, título, descripción y acciones.',
    preview: (<KList bordered header="Empleados recientes" items={[{ key: '1', title: 'María García', description: 'Gerente de RH · Hace 2h' }, { key: '2', title: 'Juan Pérez', description: 'Desarrollador Sr. · Hace 5h' }, { key: '3', title: 'Ana López', description: 'Contadora · Ayer' }]} />),
    code: `<KList bordered header="Título" items={data} />`, filename: 'KList.tsx',
    props: [{ name: 'items', type: 'KListItem[]', required: true, description: 'Elementos.' }, { name: 'bordered', type: 'boolean', description: 'Bordes.' }],
    guidelines: ['Usa avatar para listas de usuarios.'] },
  'divider-ext': { id: 'divider-ext', name: 'KDividerExtended', description: 'Divisor con soporte para texto central y estilo dashed.',
    preview: (<div><KDividerExtended /><KDividerExtended>O continúa con</KDividerExtended><KDividerExtended dashed /></div>),
    code: `<KDividerExtended>O continúa con</KDividerExtended>`, filename: 'KDividerExtended.tsx',
    props: [{ name: 'children', type: 'ReactNode', description: 'Texto central.' }, { name: 'dashed', type: 'boolean', description: 'Estilo dashed.' }],
    guidelines: ['Usa con texto para separar secciones semánticas.'] },
  'tree-select': { id: 'tree-select', name: 'KTreeSelect', description: 'Select con dropdown en forma de árbol jerárquico.',
    preview: (<div style={{ maxWidth: 300 }}><KTreeSelect data={[{ key: 'rh', title: 'Recursos Humanos', children: [{ key: 'rec', title: 'Reclutamiento' }, { key: 'cap', title: 'Capacitación' }] }, { key: 'tech', title: 'Tecnología', children: [{ key: 'fe', title: 'Frontend' }, { key: 'be', title: 'Backend' }] }]} placeholder="Seleccionar área..." /></div>),
    code: `<KTreeSelect data={orgTree} value={area} onChange={setArea} />`, filename: 'KTreeSelect.tsx',
    props: [{ name: 'data', type: 'KTreeSelectNode[]', required: true, description: 'Nodos jerárquicos.' }, { name: 'value', type: 'string', description: 'Key seleccionado.' }],
    guidelines: ['Ideal para estructuras organizacionales.'] },
  'transfer': { id: 'transfer', name: 'KTransfer', description: 'Transferencia dual-list para mover elementos entre dos columnas.',
    preview: (<KTransfer showSearch dataSource={[{ key: '1', label: 'María García' }, { key: '2', label: 'Juan Pérez' }, { key: '3', label: 'Ana López' }, { key: '4', label: 'Carlos Ruiz' }, { key: '5', label: 'Laura Díaz' }]} targetKeys={['2', '4']} onChange={() => {}} titles={['Disponibles', 'Asignados']} />),
    code: `<KTransfer dataSource={employees} targetKeys={assigned} onChange={setAssigned} showSearch />`, filename: 'KTransfer.tsx',
    props: [{ name: 'dataSource', type: 'KTransferItem[]', required: true, description: 'Elementos.' }, { name: 'targetKeys', type: 'string[]', required: true, description: 'Keys a la derecha.' }],
    guidelines: ['Usa para asignación masiva de empleados a equipos.'] },
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
    />
  );
}