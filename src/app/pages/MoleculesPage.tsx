/**
 * MoleculesPage — Documentacion de moleculas del sistema Khor
 */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { ComponentDoc } from '../components/docs/ComponentDoc';
import type { PropDef } from '../components/docs/ComponentDoc';
import { KFormField } from '../components/design-system/molecules/KFormField';
import { KSearchInput } from '../components/design-system/atoms/KSearchInput';
import { KStatCard } from '../components/design-system/molecules/KStatCard';
import { KNavItem } from '../components/design-system/molecules/KNavItem';
import { KSelectField } from '../components/design-system/molecules/KSelectField';
import { KUserCell } from '../components/design-system/molecules/KUserCell';
import { KEmptyState } from '../components/design-system/molecules/KEmptyState';
import { KBreadcrumb } from '../components/design-system/molecules/KBreadcrumb';
import { KSteps } from '../components/design-system/molecules/KSteps';
import { KDropdownMenu } from '../components/design-system/molecules/KDropdownMenu';
import { KPopover } from '../components/design-system/molecules/KPopover';
import { KAccordion, KAccordionColumns, KAccordionColumn } from '../components/design-system/molecules/KAccordion';
import { KInputNumber } from '../components/design-system/molecules/KInputNumber';
import { KSegmented } from '../components/design-system/molecules/KSegmented';
import { KAutocomplete } from '../components/design-system/molecules/KAutocomplete';
import { KDatePicker, KDateRangePicker } from '../components/design-system/molecules/KDatePicker';
import type { KDateRange } from '../components/design-system/molecules/KDatePicker';
import { KSelectAdvanced } from '../components/design-system/molecules/KSelectAdvanced';
import { KDescriptions } from '../components/design-system/molecules/KDescriptions';
import { KPopconfirm } from '../components/design-system/molecules/KPopconfirm';
import { KResult } from '../components/design-system/molecules/KResult';
import { KTimeline } from '../components/design-system/molecules/KTimeline';
import { KTooltip } from '../components/design-system/molecules/KTooltip';
import { KCascader } from '../components/design-system/molecules/KCascader';
import { KStatistic } from '../components/design-system/molecules/KStatistic';
import { KTimePicker } from '../components/design-system/molecules/KTimePicker';
import { KColorPicker } from '../components/design-system/molecules/KColorPicker';
import { KAnchor } from '../components/design-system/molecules/KAnchor';
import { KList } from '../components/design-system/molecules/KList';
import { KDividerExtended } from '../components/design-system/molecules/KDividerExtended';
import { KButton } from '../components/design-system/atoms/KButton';
import { KInput } from '../components/design-system/atoms/KInput';
import { KText } from '../components/design-system/atoms/KText';
import { KContextMenu } from '../components/design-system/molecules/KContextMenu';
import { KHoverCard } from '../components/design-system/molecules/KHoverCard';
import {
  Users, DollarSign, TrendingUp, Calendar, Home,
  Settings, FileText, Inbox, Search, BarChart3,
  Edit, Trash2, Copy, Share2, MoreHorizontal, Info,
  CheckCircle, Clock, AlertTriangle, GitCommit, Tag, Bell,
} from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';
import type { MoleculeData } from '../registry/registry-types';

export interface MoleculeEntry {
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

function ContextMenuPlayground() {
  const [lastAction, setLastAction] = useState<string>('Ninguna');

  const menuItems = [
    { key: 'edit', label: 'Editar Elemento', icon: <Edit size={14} /> },
    { key: 'copy', label: 'Copiar Enlace', icon: <Copy size={14} />, shortcut: '⌘C' },
    {
      key: 'share',
      label: 'Compartir',
      icon: <Share2 size={14} />,
      children: [
        { key: 'share-slack', label: 'Enviar por Slack' },
        { key: 'share-email', label: 'Enviar por Email' }
      ]
    },
    { key: 'divider-1', type: 'divider' as const },
    { key: 'delete', label: 'Eliminar', icon: <Trash2 size={14} />, danger: true, shortcut: '⌘⌫' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
      <KContextMenu items={menuItems} onClick={(key) => setLastAction(key)}>
        <div style={{
          width: 320,
          height: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: `2px dashed ${khorTokens.colors.neutral[300]}`,
          borderRadius: khorTokens.radius.xl,
          backgroundColor: 'white',
          color: khorTokens.colors.neutral[500],
          fontSize: 14,
          fontWeight: 500,
          cursor: 'context-menu',
          userSelect: 'none',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)'
        }}>
          Haz click derecho aquí para ver el menú
        </div>
      </KContextMenu>
      <div style={{ fontSize: 13, color: khorTokens.colors.neutral[600], fontFamily: khorTokens.typography.fontPrimary }}>
        Acción ejecutada: <strong>{lastAction}</strong>
      </div>
    </div>
  );
}

function HoverCardPlayground() {
  const cardContent = (
    <div style={{ display: 'flex', gap: 16, fontFamily: khorTokens.typography.fontPrimary }}>
      <div style={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        backgroundColor: khorTokens.colors.brand.primary,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: 16
      }}>
        K
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy }}>Khor Design System</h4>
        <p style={{ margin: '4px 0 12px 0', fontSize: 12, color: khorTokens.colors.neutral[500], lineHeight: 1.4 }}>
          El sistema de diseño oficial de Khor. Construido con Tailwind, Radix UI y tokens semánticos modernos.
        </p>
        <div style={{ display: 'flex', gap: 16, fontSize: 11, color: khorTokens.colors.neutral[400] }}>
          <div><strong>124</strong> Componentes</div>
          <div><strong>v6.0</strong> Versión</div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: 48, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
      <div style={{ fontSize: 14, color: khorTokens.colors.neutral[600], fontFamily: khorTokens.typography.fontPrimary }}>
        Pasa el cursor sobre el texto azul:
      </div>
      <KHoverCard content={cardContent} align="center" side="top" arrow>
        <span style={{
          color: khorTokens.colors.brand.primary,
          fontWeight: 600,
          cursor: 'pointer',
          textDecoration: 'underline',
          textUnderlineOffset: 4
        }}>
          @KhorDesignSystem
        </span>
      </KHoverCard>
    </div>
  );
}

/* ─── Component Registry ────────────────────── */
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


function SelectFieldPlayground() {
  const [value, setValue] = useState<string>('');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [status, setStatus] = useState<'default' | 'error' | 'warning'>('default');
  const [labelPos, setLabelPos] = useState<'top' | 'side'>('top');
  const [required, setRequired] = useState(false);
  const [optional, setOptional] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [helpText, setHelpText] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  const opts = [
    { label: 'Recursos Humanos', value: 'rh' },
    { label: 'Tecnología', value: 'tech' },
    { label: 'Finanzas', value: 'fin' },
    { label: 'Operaciones', value: 'ops' },
  ];
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 260 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tamaño</label><select value={size} onChange={e => setSize(e.target.value as any)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Status</label><select value={status} onChange={e => setStatus(e.target.value as any)} style={sel}>{['default','error','warning'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Label position</label><select value={labelPos} onChange={e => setLabelPos(e.target.value as any)} style={sel}>{['top','side'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            {([['required', required, setRequired], ['optional', optional, setOptional], ['tooltip', tooltip, setTooltip], ['helpText', helpText, setHelpText], ['disabled', disabled, setDisabled]] as const).map(([lbl, val, set]) => (
              <label key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                <input type="checkbox" checked={val as boolean} onChange={e => (set as any)(e.target.checked)} /> {lbl}
              </label>
            ))}
          </div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Seleccionado: {value || '(ninguno)'}</p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 320, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 320 }}>
          <KSelectField
            label="Departamento"
            labelPosition={labelPos}
            placeholder="Seleccionar..."
            options={opts}
            value={value}
            onChange={setValue}
            size={size}
            status={status}
            required={required}
            optional={optional}
            tooltip={tooltip ? 'Selecciona el área correspondiente al empleado' : undefined}
            helpText={helpText ? (status === 'error' ? 'Este campo es requerido' : status === 'warning' ? 'Verifica la selección' : 'Selecciona una opción de la lista') : undefined}
            disabled={disabled}
            block
          />
        </div>
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
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [size, setSize] = useState<'default' | 'small'>('default');
  const [progressDot, setProgressDot] = useState(false);
  const [labelPlacement, setLabelPlacement] = useState<'horizontal' | 'vertical'>('horizontal');
  const [percent, setPercent] = useState(60);
  
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
          <div><label style={ctrl}>Direccion</label><select value={direction} onChange={(e) => setDirection(e.target.value as any)} style={sel}>{['horizontal','vertical'].map(d=><option key={d}>{d}</option>)}</select></div>
          <div><label style={ctrl}>Tamano</label><select value={size} onChange={(e) => setSize(e.target.value as any)} style={sel}>{['default','small'].map(s=><option key={s} value={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Ubicación Etiqueta</label><select value={labelPlacement} onChange={(e) => setLabelPlacement(e.target.value as any)} style={sel}>{['horizontal','vertical'].map(p=><option key={p}>{p}</option>)}</select></div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={progressDot} onChange={(e) => setProgressDot(e.target.checked)} /> Modo Punto (Dot)</label>
          </div>
          {current === 1 && (
            <div>
              <label style={ctrl}>Porcentaje paso activo: {percent}%</label>
              <input type="range" min={0} max={100} value={percent} onChange={(e) => setPercent(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
          )}
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 400, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSteps 
          current={current} 
          onChange={setCurrent} 
          direction={direction}
          size={size}
          progressDot={progressDot}
          labelPlacement={labelPlacement}
          percent={percent}
          items={steps} 
        />
      </div>
    </div>
  );
}

function BreadcrumbPlayground() {
  const [levels, setLevels] = useState(3);
  const [showIcon, setShowIcon] = useState(false);
  const [useMenu, setUseMenu] = useState(false);

  const allItems: import('../components/design-system/molecules/KBreadcrumb').KBreadcrumbItem[] = [
    { title: 'Home', icon: showIcon ? <Home size={14} /> : undefined, onClick: () => {} },
    {
      title: 'Application Center',
      menu: useMenu ? { items: [{ key: '1', label: 'Apps' }, { key: '2', label: 'Tools' }] } : undefined,
      onClick: () => {},
    },
    { title: 'Application List', onClick: () => {} },
    { title: 'An Application' },
  ];

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', fontFamily: khorTokens.typography.fontPrimary }}>
      {/* Controls */}
      <div style={{ flex: 1, minWidth: 180 }}>
        <h4 style={{ fontSize: 13, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block', marginBottom: 4 }}>
              Niveles: {levels}
            </label>
            <input type="range" min={1} max={4} value={levels} onChange={(e) => setLevels(Number(e.target.value))} style={{ width: '100%' }} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={showIcon} onChange={(e) => setShowIcon(e.target.checked)} />
            Ícono en Home
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={useMenu} onChange={(e) => setUseMenu(e.target.checked)} />
            Dropdown en Application Center
          </label>
        </div>
      </div>

      {/* Preview */}
      <div style={{ flex: 2, minWidth: 300, display: 'flex', alignItems: 'center', padding: '24px 32px', background: 'white', borderRadius: khorTokens.radius.lg, border: `1px solid #e2e8f0` }}>
        <KBreadcrumb items={allItems.slice(0, levels)} />
      </div>
    </div>
  );
}

// Simple SVG donut chart for accordion content demos
function DonutChart({ value, total = 100, color = '#051758', size = 120 }: { value: number; total?: number; color?: string; size?: number }) {
  const r = (size - 16) / 2;
  const circ = 2 * Math.PI * r;
  const filled = (value / total) * circ;
  const pct = Math.round((value / total) * 1000) / 10;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#D6DBF0" strokeWidth={12} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={12}
        strokeDasharray={`${filled} ${circ - filled}`} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      <text x={size / 2} y={size / 2 + 5} textAnchor="middle" fontSize={13} fontWeight={700} fill="#051758">{pct}%</text>
    </svg>
  );
}

// Rating bars (colored blocks)
function RatingBars({ level, max = 5, color = '#E04D36' }: { level: number; max?: number; color?: string }) {
  return (
    <div style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: max }, (_, i) => (
        <div key={i} style={{ width: 14, height: 8, borderRadius: 2, background: i < level ? color : '#E5E7EB' }} />
      ))}
    </div>
  );
}

type BlockType = 'paragraph' | 'chart' | 'image' | 'button' | 'toggle' | 'slider';
interface AccBlock {
  id: string; type: BlockType;
  // paragraph
  text: string; fontSize: number; textColor: string; fontWeight: 'normal' | 'semibold' | 'bold';
  // chart
  value: number; color: string;
  // slider
  min: number; max: number; sliderLabel: string;
  // button
  variant: 'primary' | 'outline' | 'ghost';
  // toggle
  checked: boolean;
  // image
  imageUrl: string; imageAlt: string;
}
interface AccCol  { id: string; title: string; blocks: AccBlock[]; }

function mkBlock(type: BlockType): AccBlock {
  return {
    id: String(Date.now() + Math.random()), type,
    text: type === 'paragraph' ? 'Escribe aquí tu contenido...' : type === 'button' ? 'Acción' : type === 'toggle' ? 'Opción' : '',
    fontSize: 13, textColor: '#374151', fontWeight: 'normal',
    value: type === 'chart' ? 65 : type === 'slider' ? 50 : 0,
    color: '#051758',
    min: 0, max: 100, sliderLabel: '',
    variant: 'primary',
    checked: type === 'toggle',
    imageUrl: '', imageAlt: 'imagen',
  };
}
function mkCol(n: number): AccCol {
  return { id: String(Date.now() + Math.random()), title: `Columna ${n}`, blocks: [] };
}

const BLOCK_TYPES: { type: BlockType; label: string }[] = [
  { type: 'paragraph', label: 'Párrafo' },
  { type: 'chart',     label: 'Gráfica' },
  { type: 'slider',    label: 'Slider'  },
  { type: 'image',     label: 'Imagen'  },
  { type: 'button',    label: 'Botón'   },
  { type: 'toggle',    label: 'Toggle'  },
];
const BLOCK_LABEL: Record<BlockType, string> = {
  paragraph: 'Párrafo', chart: 'Gráfica', image: 'Imagen',
  button: 'Botón', toggle: 'Toggle', slider: 'Slider',
};

function AccordionPlayground() {
  const [cols, setCols]           = useState<1|2|3|4>(2);
  const [accordion, setAccordion] = useState(true);
  const [activeCol, setActiveCol] = useState(0);
  const [panelLabel, setPanelLabel] = useState('Panel de contenido');
  const [columns, setColumns] = useState<AccCol[]>([
    { id: '1', title: 'Columna 1', blocks: [] },
    { id: '2', title: 'Columna 2', blocks: [] },
  ]);

  const handleColsChange = (n: 1|2|3|4) => {
    setCols(n);
    setColumns(prev => {
      if (n > prev.length) return [...prev, ...Array.from({ length: n - prev.length }, (_, i) => mkCol(prev.length + i + 1))];
      return prev.slice(0, n);
    });
    setActiveCol(c => Math.min(c, n - 1));
  };

  const updateTitle = (ci: number, title: string) =>
    setColumns(prev => prev.map((c, i) => i === ci ? { ...c, title } : c));

  const addBlock = (ci: number, type: BlockType) =>
    setColumns(prev => prev.map((c, i) => i === ci ? { ...c, blocks: [...c.blocks, mkBlock(type)] } : c));

  const removeBlock = (ci: number, id: string) =>
    setColumns(prev => prev.map((c, i) => i === ci ? { ...c, blocks: c.blocks.filter(b => b.id !== id) } : c));

  const updateBlock = (ci: number, id: string, patch: Partial<AccBlock>) =>
    setColumns(prev => prev.map((c, i) => i === ci ? { ...c, blocks: c.blocks.map(b => b.id === id ? { ...b, ...patch } : b) } : c));

  const moveBlock = (ci: number, id: string, dir: -1|1) =>
    setColumns(prev => prev.map((c, i) => {
      if (i !== ci) return c;
      const idx = c.blocks.findIndex(b => b.id === id);
      const next = idx + dir;
      if (next < 0 || next >= c.blocks.length) return c;
      const blocks = [...c.blocks];
      [blocks[idx], blocks[next]] = [blocks[next], blocks[idx]];
      return { ...c, blocks };
    }));

  const renderBlockPreview = (block: AccBlock, ci: number) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p style={{ fontSize: block.fontSize, color: block.textColor, margin: 0, lineHeight: 1.6,
            fontWeight: block.fontWeight === 'bold' ? 700 : block.fontWeight === 'semibold' ? 600 : 400 }}>
            {block.text || <em style={{ color: '#D1D5DB' }}>Párrafo vacío</em>}
          </p>
        );
      case 'chart':
        return <div style={{ display: 'flex', justifyContent: 'center' }}><DonutChart value={block.value} color={block.color} size={100} /></div>;
      case 'slider':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {block.sliderLabel && <span style={{ fontSize: 11, color: '#6B7280' }}>{block.sliderLabel}</span>}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#9CA3AF' }}>
              <span>{block.min}</span>
              <span style={{ color: block.color, fontWeight: 600 }}>{block.value}</span>
              <span>{block.max}</span>
            </div>
            <input type="range" min={block.min} max={block.max} value={block.value}
              onChange={e => updateBlock(ci, block.id, { value: Number(e.target.value) })}
              style={{ width: '100%', accentColor: block.color }} />
          </div>
        );
      case 'image':
        return block.imageUrl
          ? <img src={block.imageUrl} alt={block.imageAlt} style={{ width: '100%', borderRadius: 8, display: 'block' }} />
          : <div style={{ width: '100%', height: 80, background: '#F3F4F6', borderRadius: 8, border: '1px dashed #D1D5DB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 11, color: '#9CA3AF' }}>{block.imageAlt || 'Imagen'}</span>
            </div>;
      case 'button':
        return <div><KButton size="sm" variant={block.variant as any}>{block.text || 'Botón'}</KButton></div>;
      case 'toggle':
        return (
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={block.checked}
              onChange={e => updateBlock(ci, block.id, { checked: e.target.checked })}
              style={{ accentColor: block.color, width: 15, height: 15 }} />
            {block.text || 'Toggle'}
          </label>
        );
      default: return null;
    }
  };

  // shared styles
  const inputSt: React.CSSProperties = { width: '100%', padding: '6px 10px', borderRadius: 6, border: '1px solid #D1D5DB', fontSize: 12, boxSizing: 'border-box', fontFamily: 'inherit' };
  const lbl: React.CSSProperties = { fontSize: 11, color: '#9CA3AF', display: 'block', marginBottom: 4 };
  const row2: React.CSSProperties = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 };
  const tagSt: React.CSSProperties = { fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', background: '#EFF6FF', color: '#051758', borderRadius: 4, padding: '2px 6px' };
  const iconBtn: React.CSSProperties = { border: 'none', background: 'none', cursor: 'pointer', color: '#9CA3AF', fontSize: 13, padding: '2px 4px', lineHeight: 1 };

  const COLORS = ['#051758', '#E04D36', '#10B981', '#F59E0B', '#8B5CF6', '#374151'];

  const BlockControls = ({ block }: { block: AccBlock }) => {
    const up = (patch: Partial<AccBlock>) => updateBlock(activeCol, block.id, patch);
    switch (block.type) {
      case 'paragraph': return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <textarea value={block.text} rows={3} onChange={e => up({ text: e.target.value })}
            placeholder="Escribe tu párrafo..." style={{ ...inputSt, resize: 'vertical' }} />
          <div style={row2}>
            <div>
              <label style={lbl}>Tamaño fuente</label>
              <input type="number" value={block.fontSize} min={10} max={24}
                onChange={e => up({ fontSize: Number(e.target.value) })} style={inputSt} />
            </div>
            <div>
              <label style={lbl}>Peso</label>
              <select value={block.fontWeight} onChange={e => up({ fontWeight: e.target.value as any })} style={inputSt}>
                <option value="normal">Normal</option>
                <option value="semibold">Semibold</option>
                <option value="bold">Bold</option>
              </select>
            </div>
          </div>
          <div>
            <label style={lbl}>Color de texto</label>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {['#374151','#051758','#6B7280','#E04D36','#10B981'].map(c => (
                <button key={c} onClick={() => up({ textColor: c })} style={{
                  width: 20, height: 20, borderRadius: '50%', background: c, border: block.textColor === c ? '2px solid #051758' : '2px solid transparent', cursor: 'pointer',
                }} />
              ))}
              <input type="color" value={block.textColor} onChange={e => up({ textColor: e.target.value })}
                style={{ width: 28, height: 24, border: 'none', cursor: 'pointer', borderRadius: 4 }} />
            </div>
          </div>
        </div>
      );
      case 'chart': return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div>
            <label style={lbl}>Valor: <strong style={{ color: '#051758' }}>{block.value}%</strong></label>
            <input type="range" min={0} max={100} value={block.value}
              onChange={e => up({ value: Number(e.target.value) })} style={{ width: '100%', accentColor: block.color }} />
          </div>
          <div>
            <label style={lbl}>Color</label>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {COLORS.map(c => (
                <button key={c} onClick={() => up({ color: c })} style={{
                  width: 20, height: 20, borderRadius: '50%', background: c, border: block.color === c ? '2px solid #051758' : '2px solid transparent', cursor: 'pointer',
                }} />
              ))}
              <input type="color" value={block.color} onChange={e => up({ color: e.target.value })}
                style={{ width: 28, height: 24, border: 'none', cursor: 'pointer', borderRadius: 4 }} />
            </div>
          </div>
        </div>
      );
      case 'slider': return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div>
            <label style={lbl}>Etiqueta</label>
            <input value={block.sliderLabel} onChange={e => up({ sliderLabel: e.target.value })}
              placeholder="Sin etiqueta" style={inputSt} />
          </div>
          <div style={row2}>
            <div><label style={lbl}>Mín</label>
              <input type="number" value={block.min} onChange={e => up({ min: Number(e.target.value) })} style={inputSt} /></div>
            <div><label style={lbl}>Máx</label>
              <input type="number" value={block.max} onChange={e => up({ max: Number(e.target.value) })} style={inputSt} /></div>
          </div>
          <div>
            <label style={lbl}>Valor inicial: <strong style={{ color: '#051758' }}>{block.value}</strong></label>
            <input type="range" min={block.min} max={block.max} value={block.value}
              onChange={e => up({ value: Number(e.target.value) })} style={{ width: '100%', accentColor: block.color }} />
          </div>
          <div>
            <label style={lbl}>Color</label>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              {COLORS.map(c => (
                <button key={c} onClick={() => up({ color: c })} style={{
                  width: 20, height: 20, borderRadius: '50%', background: c, border: block.color === c ? '2px solid #051758' : '2px solid transparent', cursor: 'pointer',
                }} />
              ))}
            </div>
          </div>
        </div>
      );
      case 'image': return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div>
            <label style={lbl}>URL de imagen</label>
            <input value={block.imageUrl} onChange={e => up({ imageUrl: e.target.value })}
              placeholder="https://..." style={inputSt} />
          </div>
          <div>
            <label style={lbl}>Texto alternativo</label>
            <input value={block.imageAlt} onChange={e => up({ imageAlt: e.target.value })}
              placeholder="Descripción" style={inputSt} />
          </div>
        </div>
      );
      case 'button': return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div>
            <label style={lbl}>Etiqueta</label>
            <input value={block.text} onChange={e => up({ text: e.target.value })}
              placeholder="Acción" style={inputSt} />
          </div>
          <div>
            <label style={lbl}>Variante</label>
            <select value={block.variant} onChange={e => up({ variant: e.target.value as any })} style={inputSt}>
              <option value="primary">Primary</option>
              <option value="outline">Outline</option>
              <option value="ghost">Ghost</option>
            </select>
          </div>
        </div>
      );
      case 'toggle': return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div>
            <label style={lbl}>Etiqueta</label>
            <input value={block.text} onChange={e => up({ text: e.target.value })}
              placeholder="Opción" style={inputSt} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={lbl} >Estado inicial</label>
            <input type="checkbox" checked={block.checked} onChange={e => up({ checked: e.target.checked })}
              style={{ accentColor: '#051758' }} />
            <span style={{ fontSize: 12, color: '#374151' }}>{block.checked ? 'Activo' : 'Inactivo'}</span>
          </div>
          <div>
            <label style={lbl}>Color</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {COLORS.map(c => (
                <button key={c} onClick={() => up({ color: c })} style={{
                  width: 20, height: 20, borderRadius: '50%', background: c, border: block.color === c ? '2px solid #051758' : '2px solid transparent', cursor: 'pointer',
                }} />
              ))}
            </div>
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>

      {/* ── Builder panel ── */}
      <div style={{ flex: '0 0 290px', minWidth: 260, display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Global */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Acordeón</span>
          <div>
            <label style={lbl}>Título del panel</label>
            <input value={panelLabel} onChange={e => setPanelLabel(e.target.value)} style={inputSt} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={accordion} onChange={e => setAccordion(e.target.checked)} style={{ accentColor: '#051758' }} />
            Modo acordeón (una a la vez)
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 13, color: '#374151', flexShrink: 0 }}>Columnas:</span>
            {([1, 2, 3, 4] as const).map(n => (
              <button key={n} onClick={() => handleColsChange(n)} style={{
                width: 28, height: 28, borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: 13,
                border: `1px solid ${cols === n ? '#051758' : '#D1D5DB'}`,
                background: cols === n ? '#051758' : 'white',
                color: cols === n ? 'white' : '#374151',
              }}>{n}</button>
            ))}
          </div>
        </div>

        <div style={{ height: 1, background: '#E5E7EB' }} />

        {/* Column tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {columns.map((col, i) => (
            <button key={col.id} onClick={() => setActiveCol(i)} style={{
              flex: 1, padding: '5px 8px', borderRadius: 6, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: 12,
              background: activeCol === i ? '#051758' : '#F3F4F6',
              color: activeCol === i ? 'white' : '#6B7280',
            }}>Col {i + 1}</button>
          ))}
        </div>

        {/* Active column editor */}
        {columns[activeCol] && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Column title */}
            <div>
              <label style={lbl}>Título de columna</label>
              <input value={columns[activeCol].title} onChange={e => updateTitle(activeCol, e.target.value)}
                placeholder="Sin título" style={inputSt} />
            </div>

            {/* Existing blocks */}
            {columns[activeCol].blocks.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 11, color: '#9CA3AF' }}>Bloques ({columns[activeCol].blocks.length})</span>
                {columns[activeCol].blocks.map((block) => (
                  <div key={block.id} style={{ border: '1px solid #E5E7EB', borderRadius: 8, padding: 10, display: 'flex', flexDirection: 'column', gap: 8, background: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={tagSt}>{BLOCK_LABEL[block.type]}</span>
                      <div style={{ display: 'flex', gap: 2 }}>
                        <button onClick={() => moveBlock(activeCol, block.id, -1)} style={iconBtn} title="Subir">↑</button>
                        <button onClick={() => moveBlock(activeCol, block.id, 1)} style={iconBtn} title="Bajar">↓</button>
                        <button onClick={() => removeBlock(activeCol, block.id)} style={{ ...iconBtn, color: '#EF4444' }} title="Eliminar">×</button>
                      </div>
                    </div>
                    <BlockControls block={block} />
                  </div>
                ))}
              </div>
            )}

            {/* Add block */}
            <div>
              <span style={{ fontSize: 11, color: '#9CA3AF', display: 'block', marginBottom: 8 }}>Agregar bloque</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {BLOCK_TYPES.map(({ type, label }) => (
                  <button key={type} onClick={() => addBlock(activeCol, type)} style={{
                    padding: '5px 12px', borderRadius: 6, border: '1px solid #D1D5DB',
                    background: 'white', color: '#374151', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit',
                  }}>+ {label}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Live preview ── */}
      <div style={{ flex: 1, minWidth: 360, padding: 32, backgroundColor: '#F9FAFB', borderRadius: 12 }}>
        <KAccordion
          accordion={accordion}
          defaultActiveKey={['panel']}
          items={[{
            key: 'panel',
            label: panelLabel,
            children: (
              <KAccordionColumns cols={cols} gap={24}>
                {columns.map((col, ci) => (
                  <KAccordionColumn key={col.id} title={col.title || undefined}>
                    {col.blocks.length === 0
                      ? <p style={{ fontSize: 12, color: '#D1D5DB', margin: 0, fontStyle: 'italic' }}>Sin contenido</p>
                      : col.blocks.map(block => (
                          <React.Fragment key={block.id}>
                            {renderBlockPreview(block, ci)}
                          </React.Fragment>
                        ))
                    }
                  </KAccordionColumn>
                ))}
              </KAccordionColumns>
            ),
          }]}
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
          <div style={{ padding: 40, background: khorTokens.colors.neutral[50], borderRadius: 12, display: 'flex', justifyContent: 'center' }}>
            <KDropdownMenu
              menu={{
                items: items as any,
                onClick: (info) => setLastSelected(info.key)
              }}
              placement={placement}
              arrow={arrow}
            >
              <KButton variant="secondary" icon={<MoreHorizontal size={16} />}>Acciones</KButton>
            </KDropdownMenu>
          </div>
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
          <div style={{ padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
            <KPopover
              placement={placement}
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
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [block, setBlock] = useState(false);
  const [iconOnly, setIconOnly] = useState(false);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  const options = iconOnly ? [
    { value: 'grid', icon: <FileText size={16} /> },
    { value: 'list', icon: <Users size={16} /> },
    { value: 'settings', icon: <Settings size={16} /> }
  ] : ['Diario', 'Semanal', 'Mensual', 'Anual'];

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tamano</label><select value={size} onChange={(e) => setSize(e.target.value as any)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={block} onChange={(e) => setBlock(e.target.checked)} /> Ancho Completo</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={iconOnly} onChange={(e) => setIconOnly(e.target.checked)} /> Solo Iconos</label>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 400, padding: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSegmented 
          options={options} 
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
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [range, setRange] = useState<KDateRange | undefined>(undefined);
  const [type, setType] = useState<any>('date');
  const [size, setSize] = useState<any>('md');
  const [status, setStatus] = useState<any>('default');

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tipo</label><select value={type} onChange={(e) => setType(e.target.value)} style={sel}>{['date','datetime','month','year'].map(p=><option key={p}>{p}</option>)}</select></div>
          <div><label style={ctrl}>Tamaño</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Estado</label><select value={status} onChange={(e) => setStatus(e.target.value)} style={sel}>{['default','error','warning'].map(s=><option key={s}>{s}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 400, padding: 32, display: 'flex', flexDirection: 'column', gap: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%', maxWidth: 320 }}>
          <KText variant="small" strong style={{ marginBottom: 8, display: 'block' }}>Selector Individual</KText>
          <KDatePicker
            value={date} onChange={setDate}
            type={type} size={size} status={status}
            label="Fecha" allowClear
          />
        </div>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <KText variant="small" strong style={{ marginBottom: 8, display: 'block' }}>Selector de Rango</KText>
          <KDateRangePicker
            value={range} onChange={setRange}
            size={size} status={status}
            label="Período"
          />
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
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('vertical');
  const [bordered, setBordered] = useState(true);
  const [colon, setColon] = useState(true);
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');

  const items = [
    { label: 'Usuario', children: 'Alex Mercer', span: 2 },
    { label: 'Email', children: 'alex@khor.com', span: 2 },
    { label: 'Rol', children: 'Admin' },
    { label: 'Estado', children: <KText strong color="primary">Activo</KText> },
    { label: 'Biografía', children: 'Desarrollador enfocado en sistemas de diseño y arquitectura frontend.', span: 4 },
  ];

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Disposicion</label><select value={layout} onChange={(e) => setLayout(e.target.value as any)} style={sel}>{['horizontal','vertical'].map(l=><option key={l}>{l}</option>)}</select></div>
          <div><label style={ctrl}>Tamano</label><select value={size} onChange={(e) => setSize(e.target.value as any)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={bordered} onChange={(e) => setBordered(e.target.checked)} /> Con Bordes</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={colon} onChange={(e) => setColon(e.target.checked)} /> Mostrar Dos Puntos (:)</label>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 400, padding: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KDescriptions title="Información de Perfil" bordered={bordered} items={items} column={4} layout={layout} colon={colon} size={size} />
      </div>
    </div>
  );
}

function PopconfirmPlayground() {
  const [loading, setLoading] = useState(false);
  const handleConfirm = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div style={{ padding: 48, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
      <KPopconfirm 
        title="¿Eliminar registro?" 
        description="Esta acción borrará permanentemente el empleado." 
        okType="danger"
        okText="Eliminar"
        onConfirm={handleConfirm}
      >
        <KButton variant="danger" icon={<Trash2 size={16} />}>Borrar Empleado</KButton>
      </KPopconfirm>

      <KPopconfirm 
        title="¿Publicar cambios?" 
        description="Se notificará a todos los usuarios seleccionados." 
        okType="primary"
        okText="Publicar"
        onConfirm={() => console.log('Publicado')}
      >
        <KButton variant="primary" icon={<Share2 size={16} />}>Publicar</KButton>
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
  const [mode, setMode] = useState<'left' | 'alternate' | 'right'>('alternate');
  const items = [
    { label: '2023-10-01', children: 'Creación de la cuenta corporativa', color: 'navy' },
    { label: '2023-10-05', children: 'Verificación de identidad completada', color: 'success' },
    { label: '2023-10-08', children: 'Error en validación bancaria', color: 'error', dot: <AlertTriangle size={12} className="text-white" /> },
    { label: '2023-10-10', children: 'Primer depósito realizado exitosamente', color: 'success' },
    { label: '2023-10-15', children: 'Suscripción Premium activada', color: 'primary' },
    { label: '2023-10-18', children: 'Procesando KYC', color: 'processing' },
    { label: '2023-10-20', children: 'Alerta de seguridad detectada', color: 'volcano' },
    { label: '2023-10-21', children: 'Beneficio Gold activado', color: 'gold' },
    { label: '2023-10-22', children: 'Estado de salud: Saludable', color: 'lime' },
    { label: '2023-10-25', children: 'Escalado con IA completado', color: 'purple' },
  ];

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div><label style={ctrl}>Modo</label><select value={mode} onChange={(e) => setMode(e.target.value as any)} style={sel}>{['left','alternate','right'].map(m=><option key={m}>{m}</option>)}</select></div>
      </div>
      <div style={{ flex: 3, minWidth: 400, padding: 48, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KTimeline mode={mode} items={items} pending="Sincronizando últimos eventos..." />
      </div>
    </div>
  );
}

function CascaderPlayground() {
  const [val, setVal] = useState<(string | number)[]>([]);
  const [changeOnSelect, setChangeOnSelect] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  
  const options = [
    {
      value: 'americas', label: 'Américas',
      children: [
        { 
          value: 'norte', label: 'Norteamérica', 
          children: [
            { value: 'mx', label: 'México', children: [{ value: 'cdmx', label: 'CDMX' }, { value: 'mty', label: 'Monterrey' }] },
            { value: 'us', label: 'USA', children: [{ value: 'ny', label: 'New York' }, { value: 'la', label: 'Los Angeles' }] }
          ] 
        },
        { value: 'sur', label: 'Sudamérica', children: [{ value: 'ar', label: 'Argentina' }, { value: 'br', label: 'Brasil' }] },
      ],
    },
    {
      value: 'europa', label: 'Europa',
      children: [
        { value: 'es', label: 'España', children: [{ value: 'mad', label: 'Madrid' }] },
        { value: 'fr', label: 'Francia', children: [{ value: 'par', label: 'París' }] },
      ],
    },
  ];

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={changeOnSelect} onChange={(e) => setChangeOnSelect(e.target.checked)} /> Change on Select (Selección niveles intermedios)</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showSearch} onChange={(e) => setShowSearch(e.target.checked)} /> Show Search</label>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 400, padding: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <KCascader 
            options={options} 
            value={val} 
            onChange={setVal} 
            changeOnSelect={changeOnSelect}
            showSearch={showSearch}
            placeholder="Selecciona ubicación (Profundidad Dinámica)..." 
          />
          <div style={{ marginTop: 12 }}>
            <KText variant="small" color="secondary">Ruta seleccionada: {val.join(' / ') || '(ninguna)'}</KText>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatisticPlayground() {
  const [val, setVal] = useState(112893);
  const [loading, setLoading] = useState(false);
  
  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      setVal(Math.floor(Math.random() * 200000));
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <KButton size="sm" onClick={refresh} loading={loading}>Simular Actualización</KButton>
        <p style={{ fontSize: 11, color: khorTokens.colors.neutral[400], marginTop: 12 }}>El efecto CountUp se activa automáticamente al cambiar el valor.</p>
      </div>
      <div style={{ flex: 3, minWidth: 400, display: 'flex', gap: 48, padding: 48, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KStatistic title="Usuarios Activos" value={val} precision={0} trend="up" trendValue="12.5%" groupSeparator="." loading={loading} />
        <KStatistic 
          title="Balance Total" 
          value={93412.50} 
          precision={2} 
          prefix="$" 
          valueStyle={{ color: khorTokens.colors.brand.primary }}
          groupSeparator=","
          decimalSeparator="."
        />
      </div>
    </div>
  );
}

function TimePickerPlayground() {
  const [time, setTime] = useState<string>('');
  const [use12Hours, setUse12Hours] = useState(false);
  const [showSeconds, setShowSeconds] = useState(false);
  const [size, setSize] = useState<any>('md');
  const [status, setStatus] = useState<any>('default');

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tamaño</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Estado</label><select value={status} onChange={(e) => setStatus(e.target.value)} style={sel}>{['default','error','warning'].map(s=><option key={s}>{s}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={use12Hours} onChange={(e) => setUse12Hours(e.target.checked)} /> Formato 12h</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showSeconds} onChange={(e) => setShowSeconds(e.target.checked)} /> Mostrar segundos</label>
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300, padding: 48, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: 280 }}>
          <KTimePicker
            value={time}
            onChange={setTime}
            use12Hours={use12Hours}
            showSeconds={showSeconds}
            size={size}
            status={status}
            label="Hora"
            allowClear
          />
        </div>
        <KText variant="small" color="secondary">Seleccionado: {time || '--:--'}</KText>
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



export const molecules: Record<string, MoleculeEntry> = {
  'form-field': {
    id: 'form-field',
    name: 'FormField',
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
    filename: 'FormField/index.tsx',
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
  'stat-card': {
    id: 'stat-card',
    name: 'StatCard',
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
    filename: 'StatCard/index.tsx',
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
    name: 'NavItem',
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
    filename: 'NavItem/index.tsx',
    props: [
      { name: 'icon', type: 'ReactNode', description: 'Icono Lucide (18px recomendado).' },
      { name: 'label', type: 'string', required: true, description: 'Texto del item.' },
      { name: 'active', type: 'boolean', default: 'false', description: 'Estado activo (fondo rojo 20% opacity).' },
      { name: 'badge', type: 'number', description: 'Numero de notificacion.' },
      { name: 'onClick', type: '() => void', description: 'Callback al hacer click.' },
      { name: 'collapsed', type: 'boolean', default: 'false', description: 'Modo colapsado (solo icono).' },
    ],
    guidelines: ['Solo un item activo a la vez.', 'Iconos a 18px con stroke 2px.', 'Badge solo para conteos de notificacion relevantes.'],
    aiNotes: 'KNavItem para items de navegación en menús y barras laterales. Paridad AntD v5.',
  },
  'select-field': {
    id: 'select-field',
    name: 'SelectField',
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
    stateShowcase: (() => {
      const opts = [{ label: 'Opción A', value: 'a' }, { label: 'Opción B', value: 'b' }];
      const states: Array<{ label: string; props: Record<string, any> }> = [
        { label: 'Normal',   props: {} },
        { label: 'Focused',  props: { isFocused: true } },
        { label: 'Disabled', props: { disabled: true } },
        { label: 'Error',    props: { status: 'error' } },
        { label: 'Warning',  props: { status: 'warning' } },
      ];
      const sizes: Array<'sm' | 'md' | 'lg'> = ['lg', 'md', 'sm'];
      const colW = 160;

      const colHeader = (label: string) => (
        <div style={{ fontSize: 10, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 10 }}>{label}</div>
      );

      const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 12 }}>{title}</div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colW}px)`, gap: '8px 12px' }}>
            {children}
          </div>
        </div>
      );

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {/* Column headers */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colW}px)`, gap: '0 12px', marginBottom: 4 }}>
            {states.map(s => colHeader(s.label))}
          </div>

          {/* Base — Empty */}
          <Section title="Sin label — Empty">
            {sizes.map(sz => states.map(s => (
              <KSelectField key={`${sz}-${s.label}`} size={sz} options={opts} placeholder="Seleccionar" {...s.props} />
            )))}
          </Section>

          {/* Base — Filled */}
          <Section title="Sin label — Filled">
            {sizes.map(sz => states.map(s => (
              <KSelectField key={`${sz}-${s.label}`} size={sz} options={opts} defaultValue="a" placeholder="Seleccionar" {...s.props} />
            )))}
          </Section>

          {/* Upper Label — variantes */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 12 }}>Upper Label — variantes</div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colW}px)`, gap: '16px 12px' }}>
              {states.map(s => [
                <KSelectField key={`${s.label}-lbl`}     label="Label" options={opts} placeholder="Seleccionar" {...s.props} />,
                <KSelectField key={`${s.label}-req`}     label="Label" required options={opts} placeholder="Seleccionar" {...s.props} />,
                <KSelectField key={`${s.label}-tip`}     label="Label" tooltip="Información adicional" options={opts} placeholder="Seleccionar" {...s.props} />,
                <KSelectField key={`${s.label}-rt`}      label="Label" required tooltip="Información adicional" options={opts} placeholder="Seleccionar" {...s.props} />,
                <KSelectField key={`${s.label}-ot`}      label="Label" optional tooltip="Información adicional" options={opts} placeholder="Seleccionar" {...s.props} />,
                <KSelectField key={`${s.label}-opt`}     label="Label" optional options={opts} placeholder="Seleccionar" {...s.props} />,
              ])}
            </div>
          </div>

          {/* Upper Label + Help Text */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 12 }}>Upper Label + Help Text</div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colW}px)`, gap: '16px 12px' }}>
              {states.map(s => [
                <KSelectField key={`${s.label}-h`}    label="Label" helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                <KSelectField key={`${s.label}-hr`}   label="Label" required helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                <KSelectField key={`${s.label}-ht`}   label="Label" tooltip="Info" helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                <KSelectField key={`${s.label}-hrt`}  label="Label" required tooltip="Info" helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                <KSelectField key={`${s.label}-hot`}  label="Label" optional tooltip="Info" helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                <KSelectField key={`${s.label}-ho`}   label="Label" optional helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
              ])}
            </div>
          </div>

          {/* Side Label */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 12 }}>Side Label</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 480 }}>
              <KSelectField label="Label" labelPosition="side" options={opts} placeholder="Seleccionar" />
              <KSelectField label="Label" labelPosition="side" required options={opts} placeholder="Seleccionar" />
              <KSelectField label="Label" labelPosition="side" tooltip="Info adicional" options={opts} placeholder="Seleccionar" />
              <KSelectField label="Label" labelPosition="side" required tooltip="Info adicional" options={opts} placeholder="Seleccionar" />
              <KSelectField label="Label" labelPosition="side" optional tooltip="Info adicional" options={opts} placeholder="Seleccionar" />
              <KSelectField label="Label" labelPosition="side" optional helpText="Please input passenger's name." options={opts} placeholder="Seleccionar" />
            </div>
          </div>
        </div>
      );
    })(),
    a11ySummary: {
      keyboard: ['Up/Down: Navega entre opciones.', 'Enter: Confirma selección.', 'Esc: Cierra dropdown.'],
      aria: ['role="combobox", aria-expanded y aria-controls vinculados al listbox.'],
      contrast: 'AAA. El borde de foco es del color Primary Khor.',
      score: 100,
    },
    code: `import { KSelectField } from '@khor/design-system/molecules/index';

// Base
<KSelectField
  placeholder="Seleccionar..."
  options={[{ label: 'Recursos Humanos', value: 'rh' }]}
  value={dept}
  onChange={setDept}
/>

// Con label superior (upper label)
<KSelectField
  label="Departamento"
  required
  tooltip="Área del empleado"
  helpText="Selecciona una opción"
  options={opts}
  value={dept}
  onChange={setDept}
  status="error"
/>

// Con label lateral (side label)
<KSelectField
  label="Departamento"
  labelPosition="side"
  optional
  options={opts}
  size="lg"
/>`,
    filename: 'SelectField/index.tsx',
    props: [
      { name: 'options', type: 'KSelectOption[]', required: true, description: 'Opciones del select: { label, value, disabled? }.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Altura: 32px / 36px / 40px.' },
      { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Estado visual del borde.' },
      { name: 'value / defaultValue', type: 'string', description: 'Valor controlado / inicial.' },
      { name: 'onChange', type: '(value: string) => void', description: 'Callback al seleccionar.' },
      { name: 'placeholder', type: 'string', default: "'Seleccionar'", description: 'Texto placeholder.' },
      { name: 'label', type: 'ReactNode', description: 'Etiqueta del campo.' },
      { name: 'labelPosition', type: "'top' | 'side'", default: "'top'", description: 'Posición de la etiqueta.' },
      { name: 'required', type: 'boolean', description: 'Muestra asterisco (*) en la etiqueta.' },
      { name: 'optional', type: 'boolean', description: 'Muestra "(optional)" en la etiqueta.' },
      { name: 'tooltip', type: 'string', description: 'Texto del tooltip ℹ junto a la etiqueta.' },
      { name: 'helpText', type: 'string', description: 'Texto de ayuda / error debajo del campo.' },
      { name: 'disabled', type: 'boolean', description: 'Desactiva el selector.' },
      { name: 'isFocused', type: 'boolean', description: 'Fuerza estado de foco (playground/preview).' },
    ],
    guidelines: [
      'Usa size="sm/md/lg" para alinearlo con KInput del mismo formulario.',
      'Combina status="error" + helpText para mostrar mensajes de validación.',
      'labelPosition="side" para formularios con layout de dos columnas.',
      'Para más de 10 opciones, considera KSelectAdvanced con búsqueda.',
    ],
    aiNotes: 'KSelectField: selector Figma-token. Props clave: size (sm/md/lg), status (default/error/warning), labelPosition (top/side), required, optional, tooltip, helpText.',
  },
  'user-cell': {
    id: 'user-cell',
    name: 'UserCell',
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
    filename: 'UserCell/index.tsx',
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
    aiNotes: 'KUserCell para visualización de usuario con avatar, nombre y metadata.',
  },
  'empty-state': {
    id: 'empty-state',
    name: 'EmptyState',
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
  actionLabel="Agregar Empleado"
  onAction={() => handleAddEmployee()}
/>`,
    filename: 'EmptyState/index.tsx',
    props: [
      { name: 'icon', type: 'ReactNode', description: 'Icono grande (48px recomendado).' },
      { name: 'title', type: 'string', required: true, description: 'Titulo del estado vacio.' },
      { name: 'description', type: 'string', description: 'Descripcion con contexto.' },
      { name: 'actionLabel', type: 'string', description: 'Texto del boton de accion principal.' },
      { name: 'onAction', type: '() => void', description: 'Callback del boton de accion.' },
      { name: 'actions', type: 'ReactNode', description: 'Acciones personalizadas (reemplaza actionLabel/onAction).' },
      { name: 'image', type: 'string', description: 'URL de imagen alternativa al icono.' },
      { name: 'variant', type: "'default' | 'simple'", default: "'default'", description: 'Variante visual.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del estado.' },
    ],
    guidelines: ['Siempre incluye una accion que resuelva el estado vacio.', 'El icono debe ser de 48px con color neutral.300.'],
    aiNotes: 'KEmptyState para estados vacíos con imagen, mensaje y acciones.',
  },
  breadcrumb: {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    description: 'Navegación jerárquica que muestra la posición actual dentro de la aplicación. Separador "/" en gris, ítems inactivos en gris (#8f9096), ítem activo en navy (#0c1a66) semibold.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Count=1 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em' }}>1 nivel</span>
          <KBreadcrumb items={[{ title: 'An Application' }]} />
        </div>
        {/* Count=2 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em' }}>2 niveles</span>
          <KBreadcrumb items={[{ title: 'Home', onClick: () => {} }, { title: 'An Application' }]} />
        </div>
        {/* Count=3 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em' }}>3 niveles</span>
          <KBreadcrumb items={[{ title: 'Home', onClick: () => {} }, { title: 'Application Center', onClick: () => {} }, { title: 'An Application' }]} />
        </div>
        {/* Count=4 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em' }}>4 niveles</span>
          <KBreadcrumb items={[{ title: 'Home', onClick: () => {} }, { title: 'Application Center', onClick: () => {} }, { title: 'Application List', onClick: () => {} }, { title: 'An Application' }]} />
        </div>
        {/* Count=4+ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em' }}>5 niveles</span>
          <KBreadcrumb items={[{ title: 'Home', onClick: () => {} }, { title: 'Application Center', onClick: () => {} }, { title: 'Application List', onClick: () => {} }, { title: 'Application List', onClick: () => {} }, { title: 'An Application' }]} />
        </div>
      </div>
    ),
    playground: <BreadcrumbPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Con ícono */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#8f9096', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Con ícono</span>
          <KBreadcrumb items={[{ title: 'Home', icon: <Home size={14} />, onClick: () => {} }, { title: 'Application Center', onClick: () => {} }, { title: 'An Application' }]} />
        </div>
        {/* Sin texto, solo ícono */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#8f9096', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Ícono sin texto</span>
          <KBreadcrumb items={[{ icon: <Home size={14} />, onClick: () => {} }, { title: 'Application Center', onClick: () => {} }, { title: 'An Application' }]} />
        </div>
        {/* Con dropdown */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 11, color: '#8f9096', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Con dropdown</span>
          <KBreadcrumb items={[
            { title: 'Home', onClick: () => {} },
            { title: 'Application Center', menu: { items: [{ key: '1', label: 'Opción A' }, { key: '2', label: 'Opción B' }] }, onClick: () => {} },
            { title: 'An Application' },
          ]} />
        </div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: navega por cada enlace/botón del breadcrumb.', 'Enter/Space: activa el ítem enfocado.'],
      aria: ['role="navigation" con aria-label="Breadcrumb".', 'aria-current="page" en el último ítem (no interactivo).'],
      contrast: 'AA — #0c1a66 sobre blanco ratio >7:1 (AAA). #8f9096 sobre blanco ratio ~3.5:1 (AA large).',
      score: 98,
    },
    code: `import { KBreadcrumb } from '@khor/design-system/molecules/index';
import { Home } from 'lucide-react';

// 3 niveles con ícono
<KBreadcrumb
  items={[
    { title: 'Home', icon: <Home size={14} />, href: '/' },
    { title: 'Application Center', href: '/apps' },
    { title: 'An Application' },
  ]}
/>

// Con dropdown en un ítem
<KBreadcrumb
  items={[
    { title: 'Home', href: '/' },
    {
      title: 'Application Center',
      menu: { items: [{ key: 'a', label: 'Apps' }, { key: 'b', label: 'Tools' }] },
    },
    { title: 'An Application' },
  ]}
/>`,
    filename: 'Breadcrumb/index.tsx',
    props: [
      { name: 'items', type: 'KBreadcrumbItem[]', required: true, description: 'Lista de ítems. Cada uno puede tener title, href, icon, onClick y menu (dropdown).' },
      { name: 'separator', type: 'ReactNode', description: "Separador entre ítems. Por defecto '/' en gris #8f9096." },
      { name: 'className', type: 'string', description: 'Clase CSS adicional en el <nav>.' },
      { name: 'style', type: 'CSSProperties', description: 'Estilos inline adicionales.' },
    ],
    guidelines: [
      'El último ítem es la página actual: navy (#0c1a66), semibold, sin interacción.',
      'Los ítems intermedios son grises (#8f9096), regular weight.',
      'Usa icon solo en el primer ítem (home) para seguir el patrón Figma.',
      'El separador por defecto es "/" — no uses ChevronRight.',
      'Máximo 4-5 niveles de profundidad.',
      'Para ítems con submenú, pasa la prop menu con items array.',
    ],
    aiNotes: 'KBreadcrumb: items[] con { title, href?, icon?, onClick?, menu? }. Último ítem = current page (navy bold, no-click). Separator "/" por defecto.',
  },
  steps: {
    id: 'steps',
    name: 'Steps',
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
    filename: 'Steps/index.tsx',
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
    name: 'DropdownMenu',
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
    filename: 'DropdownMenu/index.tsx',
    props: [
      { name: 'menu', type: 'MenuProps', required: true, description: 'Configuracion del menu ({ items, onClick }).' },
      { name: 'trigger', type: '("click" | "hover" | "contextMenu")[]', default: "['hover']", description: 'Eventos que activan el menu.' },
      { name: 'placement', type: 'string', description: 'Posicion del menu.' },
      { name: 'arrow', type: 'boolean | object', description: 'Mostrar flecha indicadora.' },
      { name: 'disabled', type: 'boolean', description: 'Desactivar dropdown.' },
    ],
    guidelines: ['Usa para acciones secundarias agrupadas.', 'El disparador suele ser un KButton de tipo ghost o secondary.'],
    aiNotes: 'KDropdownMenu para menús desplegables. Paridad total AntD v5.',
  },
  popover: {
    id: 'popover',
    name: 'Popover',
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
    filename: 'Popover/index.tsx',
    props: [
      { name: 'content', type: 'ReactNode', required: true, description: 'Contenido del popover.' },
      { name: 'title', type: 'ReactNode', description: 'Título opcional.' },
      { name: 'placement', type: 'TooltipPlacement', default: "'bottom'", description: 'Posición.' },
      { name: 'trigger', type: "'click' | 'hover' | 'focus'", default: "'click'", description: 'Evento disparador.' },
      { name: 'arrow', type: 'boolean | object', description: 'Mostrar flecha.' },
    ],
    guidelines: ['Usa para contenido interactivo. Para texto simple, usa KTooltip.'],
    aiNotes: 'KPopover para contenido emergente contextual. Paridad total AntD v5.',
  },
  accordion: {
    id: 'accordion',
    name: 'Accordion',
    description: 'Secciones colapsables para organizar contenido agrupado. Header gris #F4F4F4, contenido blanco, botón chevron navy outline. Soporta KAccordionColumns para layouts de 1-4 columnas.',
    preview: (
      <div style={{ maxWidth: 600, width: '100%' }}>
        <KAccordion
          items={[
            {
              key: '1',
              label: 'Capacitación requerida',
              children: (
                <KAccordionColumns cols={2} gap={24}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#051758', margin: 0 }}>Perfil</p>
                    <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>Identifica y propone nuevas formas de hacer las cosas concernientes a las tareas de su puesto.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DonutChart value={25.5} color="#051758" size={100} />
                  </div>
                </KAccordionColumns>
              ),
            },
            { key: '2', label: 'Evaluación de desempeño', children: <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>Resultados del periodo evaluado.</p> },
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
            { key: '1', label: 'Cerrado por defecto', children: <p style={{ margin: 0, fontSize: 13, color: '#6B7280' }}>Contenido del panel 1.</p> },
            { key: '2', label: 'Abierto por defecto', children: <p style={{ margin: 0, fontSize: 13, color: '#6B7280' }}>Contenido del panel 2.</p> },
            { key: '3', label: 'Deshabilitado', disabled: true, children: <p style={{ margin: 0, fontSize: 13, color: '#6B7280' }}>Este panel está deshabilitado.</p> },
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
    code: `import { KAccordion, KAccordionColumns, KAccordionColumn } from '@khor/design-system/molecules/index';

<KAccordion accordion defaultActiveKey={['1']} items={[
  {
    key: '1',
    label: 'Capacitación requerida',
    children: (
      <KAccordionColumns cols={3} gap={24}>
        <KAccordionColumn title="Perfil requerido">
          <p>Nivel 2 — Avanzado</p>
          <p>Descripción del perfil...</p>
          <KButton size="sm">Ver detalles</KButton>
        </KAccordionColumn>

        <KAccordionColumn title="Avance actual">
          <DonutChart value={65} />
          <input type="range" min={0} max={100} defaultValue={65} />
        </KAccordionColumn>

        <KAccordionColumn title="Competencias">
          <p>Comunicación efectiva, liderazgo.</p>
          <label><input type="checkbox" /> Certificación vigente</label>
          <img src="/badge.png" alt="badge" />
        </KAccordionColumn>
      </KAccordionColumns>
    ),
  },
  { key: '2', label: 'Notas', children: <KAccordionColumn title="Observaciones"><p>Texto libre.</p></KAccordionColumn> },
]}/>`,
    filename: 'Accordion/index.tsx',
    props: [
      { name: 'items', type: 'KAccordionItem[]', required: true, description: 'Array de paneles: { key, label, children, disabled?, extra? }.' },
      { name: 'accordion', type: 'boolean', default: 'false', description: 'Solo una sección abierta a la vez (mode single).' },
      { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Cuántas secciones pueden estar abiertas.' },
      { name: 'defaultActiveKey', type: 'string | string[]', description: 'Keys abiertas por defecto.' },
      { name: 'collapsible', type: 'boolean', default: 'true', description: 'Permite cerrar la sección activa.' },
      { name: 'onValueChange', type: '(v: string | string[]) => void', description: 'Callback al expandir/colapsar.' },
      { name: 'cols (KAccordionColumns)', type: '1 | 2 | 3 | 4', default: '2', description: 'Número de columnas en el grid.' },
      { name: 'gap (KAccordionColumns)', type: 'number', default: '24', description: 'Espacio en px entre columnas.' },
      { name: 'title (KAccordionColumn)', type: 'ReactNode', description: 'Título opcional de la columna (label gris uppercase).' },
      { name: 'gap (KAccordionColumn)', type: 'number', default: '12', description: 'Espacio vertical entre elementos de la columna.' },
      { name: 'children (KAccordionColumn)', type: 'ReactNode', required: true, description: 'Cualquier contenido: párrafos, gráficas, imágenes, botones, sliders, checkboxes, etc.' },
    ],
    guidelines: [
      'Usa accordion=true para FAQs (solo una abierta).',
      'Usa KAccordionColumns para dividir el contenido en 1-4 columnas.',
      'El children acepta cualquier ReactNode: párrafos, imágenes, gráficas, componentes.',
      'El botón chevron es navy outline (#051758) — no personalizar color.',
    ],
    aiNotes: 'KAccordion: header #F4F4F4, border #CED4DA, contenido #FFFFFF. Botón chevron navy outline. Usa KAccordionColumns(cols=1|2|3|4) para layout de columnas dentro del contenido.',
  },
  /* ═══ MOLÉCULAS EXTENDIDAS (v2.0 Nexus) ═══ */
  'input-number': {
    id: 'input-number', name: 'InputNumber',
    description: 'Input numerico con controles +/- integrados, limites min/max, paso configurable y precision decimal.',
    preview: (<div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}><KInputNumber value={42} min={0} max={100} /><KInputNumber value={3.14} step={0.01} precision={2} size="lg" /><KInputNumber value={10} disabled /></div>),
    code: `import { KInputNumber } from '@khor/molecules-extended';\n\n<KInputNumber value={qty} onChange={setQty} min={0} max={100} />`,
    filename: 'InputNumber/index.tsx',
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
    aiNotes: 'KInputNumber para entrada numérica con controles incrementales. Paridad AntD v5.',
  },
  'segmented': {
    id: 'segmented', name: 'Segmented',
    description: 'Control segmentado tipo iOS para alternar entre opciones mutuamente excluyentes.',
    preview: (<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}><KSegmented options={['Diario', 'Semanal', 'Mensual']} value="Semanal" /><KSegmented options={[{ label: 'Lista', value: 'list' }, { label: 'Tabla', value: 'table' }]} value="list" /></div>),
    code: `import { KSegmented } from '@khor/molecules-extended';\n\n<KSegmented options={['Diario','Semanal','Mensual']} value={period} onChange={setPeriod} />`,
    filename: 'Segmented/index.tsx',
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
    aiNotes: 'KSegmented para selector segmentado. Paridad total AntD v5.',
  },
  'autocomplete': {
    id: 'autocomplete', name: 'Autocomplete',
    description: 'Input con sugerencias filtradas en tiempo real, opciones con descripción y estado de carga.',
    preview: (<div style={{ maxWidth: 400 }}><KAutocomplete placeholder="Buscar departamento..." options={[{ value: 'rh', label: 'Recursos Humanos', description: '45 empleados' },{ value: 'tech', label: 'Tecnología', description: '32 empleados' },{ value: 'fin', label: 'Finanzas', description: '18 empleados' }]} allowClear /></div>),
    code: `import { KAutocomplete } from '@khor/design-system/molecules/index';

<KAutocomplete 
  placeholder="Buscar..." 
  options={options} 
  onSelect={(opt) => console.log(opt)} 
  allowClear 
/>`,
    filename: 'Autocomplete/index.tsx',
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
    aiNotes: 'KAutocomplete para autocompletado con sugerencias. Paridad total AntD v5.',
  },
  'date-picker': {
    id: 'date-picker', name: 'DatePicker',
    description: 'Selector de fecha con calendario desplegable. Soporta fecha individual (date, datetime, month, year) y rango de fechas con calendario dual.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <KDatePicker placeholder="Seleccionar día" />
          <KDatePicker type="month" placeholder="Mes" />
          <KDatePicker value={new Date()} disabled />
        </div>
        <KDateRangePicker />
      </div>
    ),
    code: `import { KDatePicker, KDateRangePicker } from '@khor/design-system/molecules/index';

// Fecha individual
<KDatePicker
  value={date}
  onChange={setDate}
  type="date"
  label="Fecha de ingreso"
  required
/>

// Rango de fechas
<KDateRangePicker
  value={range}
  onChange={setRange}
  label="Período"
  required
/>`,
    filename: 'DatePicker/index.tsx',
    playground: <DatePickerPlayground />,
    stateShowcase: (() => {
      const rows: Array<{ required?: boolean; optional?: boolean; tooltip?: string }> = [
        {},
        { required: true },
        { tooltip: 'Información adicional sobre este campo.' },
        { required: true, tooltip: 'Información adicional sobre este campo.' },
        { optional: true, tooltip: 'Información adicional sobre este campo.' },
        { optional: true },
      ];
      const sectionLabel = (text: string) => (
        <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: 1, paddingBottom: 4, borderBottom: '1px solid #F3F4F6', marginBottom: 4 }}>
          {text}
        </div>
      );
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* KDatePicker section */}
          <div>
            {sectionLabel('KDatePicker')}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginTop: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 280 }}>
                {rows.map((r, i) => (
                  <KDatePicker key={i} label="Label" labelPosition="side" {...r} placeholder="Seleccionar día" />
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 280 }}>
                {rows.map((r, i) => (
                  <KDatePicker key={i} label="Label" labelPosition="side" {...r} placeholder="Seleccionar día" helpText="Texto de ayuda del campo." />
                ))}
              </div>
            </div>
          </div>
          {/* KDateRangePicker section */}
          <div>
            {sectionLabel('KDateRangePicker')}
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginTop: 16 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 340 }}>
                {rows.map((r, i) => (
                  <KDateRangePicker key={i} label="Label" labelPosition="side" {...r} />
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 340 }}>
                {rows.map((r, i) => (
                  <KDateRangePicker key={i} label="Label" labelPosition="side" {...r} helpText="Texto de ayuda del campo." />
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    })(),
    a11ySummary: {
      keyboard: ['Tab: Entra al input.', 'Enter/Espacio: Abre el calendario.', 'Click: En rango, selecciona inicio y fin secuencialmente.'],
      aria: ['El botón tiene role="button" implícito.', 'Las celdas de días son accesibles por teclado.'],
      contrast: 'AAA sobre días hábiles. AA sobre días fuera de mes.',
      score: 100,
    },
    props: [
      { name: '── KDatePicker ──', type: '', description: '' },
      { name: 'value', type: 'Date', description: 'Fecha seleccionada (controlled).' },
      { name: 'onChange', type: '(d: Date | undefined) => void', description: 'Callback al seleccionar.' },
      { name: 'type', type: "'date' | 'datetime' | 'month' | 'year'", default: "'date'", description: 'Modo del selector.' },
      { name: 'placeholder', type: 'string', default: "'Seleccionar día'", description: 'Texto de placeholder.' },
      { name: 'minDate / maxDate', type: 'Date', description: 'Restricción de rango seleccionable.' },
      { name: '── KDateRangePicker ──', type: '', description: '' },
      { name: 'value', type: 'KDateRange', description: 'Rango { from, to } (controlled).' },
      { name: 'onChange', type: '(r: KDateRange) => void', description: 'Callback al aceptar el rango.' },
      { name: 'placeholder', type: '[string, string]', default: "['Fecha Inicio','Fecha fin']", description: 'Placeholders de inicio y fin.' },
      { name: '── Compartidos ──', type: '', description: '' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del input.' },
      { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Estado visual.' },
      { name: 'disabled', type: 'boolean', description: 'Deshabilita el campo.' },
      { name: 'label', type: 'ReactNode', description: 'Etiqueta del campo.' },
      { name: 'labelPosition', type: "'top' | 'side'", default: "'top'", description: 'Posición de la etiqueta.' },
      { name: 'required', type: 'boolean', description: 'Marca el campo como obligatorio (*).' },
      { name: 'optional', type: 'boolean', description: 'Muestra "(opcional)".' },
      { name: 'tooltip', type: 'string', description: 'Tooltip informativo (ℹ).' },
      { name: 'helpText', type: 'string', description: 'Texto de ayuda bajo el campo.' },
    ],
    guidelines: [
      'Usa type="datetime" para capturar fecha y hora con scroll HH:MM:SS.',
      'Usa minDate/maxDate para restringir el rango seleccionable.',
      'En KDateRangePicker: clic en inicio → clic en fin → botón Aceptar para confirmar.',
    ],
    aiNotes: 'KDatePicker y KDateRangePicker documentados en una sola página. Ambos comparten los props de form-item (label, required, optional, tooltip, helpText).',
  },
  'select-advanced': {
    id: 'select-advanced', name: 'SelectAdvanced',
    description: 'Selector múltiple avanzado con soporte para etiquetas (tags), búsqueda integrada y límite de visualización.',
    preview: (<div style={{ maxWidth: 400 }}><KSelectAdvanced options={[{ label: 'Admin', value: '1' }, { label: 'Editor', value: '2' }, { label: 'Viewer', value: '3' }]} value={['1', '2']} mode="multiple" /></div>),
    code: `import { KSelectAdvanced } from '@khor/design-system/molecules/index';

<KSelectAdvanced 
  options={roles} 
  mode="multiple" 
  maxTagCount={2} 
  allowClear 
/>`,
    filename: 'SelectAdvanced/index.tsx',
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
    aiNotes: 'KSelectAdvanced para selección con búsqueda y múltiples opciones.',
  },
  'descriptions': {
    id: 'descriptions', name: 'Descriptions',
    description: 'Lista de información en formato clave-valor, ideal para mostrar detalles de perfiles o registros técnicos.',
    preview: (<div style={{ width: '100%' }}><KDescriptions items={[{ label: 'Nombre', children: 'Juan Perez' }, { label: 'Edad', children: '30' }]} column={1} size="sm" /></div>),
    code: `import { KDescriptions } from '@khor/design-system/molecules/index';

<KDescriptions 
  title="Detalles" 
  items={items} 
  bordered 
  column={2} 
/>`,
    filename: 'Descriptions/index.tsx',
    playground: <DescriptionsPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%' }}>
        <KDescriptions title="Default" items={[{ label: 'Usuario', children: 'Alex' }]} />
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
    aiNotes: 'KDescriptions para mostrar pares clave-valor en formato tabla. Paridad AntD v5.',
  },
  'popconfirm': {
    id: 'popconfirm', name: 'Popconfirm',
    description: 'Caja de confirmación compacta que aparece junto al elemento de activación para acciones rápidas.',
    preview: (<div><KPopconfirm title="¿Eliminar registro?" okText="Sí" cancelText="No"><KText style={{ cursor: 'pointer' }} color="primary">Click para confirmar</KText></KPopconfirm></div>),
    code: `import { KPopconfirm } from '@khor/design-system/molecules/index';

<KPopconfirm 
  title="¿Estás seguro?" 
  onConfirm={handleDelete}
>
  <KButton>Eliminar</KButton>
</KPopconfirm>`,
    filename: 'Popconfirm/index.tsx',
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
    aiNotes: 'KPopconfirm para confirmación contextual antes de acción destructiva. Paridad AntD v5.',
  },
  'result': {
    id: 'result', name: 'Result',
    description: 'Página de resultado para estados de éxito, error, advertencia o páginas de error (404, 500).',
    preview: (<div><KResult status="success" title="Pago Exitoso" subTitle="Tu transacción se ha completado correctamente." /></div>),
    code: `import { KResult } from '@khor/design-system/molecules/index';

<KResult 
  status="success" 
  title="Completado" 
  subTitle="Acción realizada con éxito" 
/>`,
    filename: 'Result/index.tsx',
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
    aiNotes: 'KResult para páginas de resultado (éxito, error, 404, etc.). Paridad AntD v5.',
  },
  'timeline': {
    id: 'timeline', name: 'Timeline',
    description: 'Visualización de eventos cronológicos o hitos de un proceso de forma vertical.',
    preview: (<div><KTimeline items={[{ children: 'Paso 1' }, { children: 'Paso 2' }]} /></div>),
    code: `import { KTimeline } from '@khor/design-system/molecules/index';

<KTimeline 
  items={[{ children: 'Creado' }, { children: 'Aprobado' }]} 
  mode="alternate" 
/>`,
    filename: 'Timeline/index.tsx',
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
    aiNotes: 'KTimeline para líneas de tiempo verticales. Paridad total AntD v5.',
  },
  /* ═══ WAVE 3 — Componentes finales ═══ */
  'cascader': {
    id: 'cascader', name: 'Cascader',
    description: 'Selector multinivel para navegar por estructuras jerárquicas complejas (ej: Ubicación, Categorías).',
    preview: (<div style={{ maxWidth: 350 }}><KCascader placeholder="Seleccionar..." options={[{ value: '1', label: 'Espana', children: [{ value: '1-1', label: 'Madrid' }] }]} /></div>),
    code: `import { KCascader } from '@khor/design-system/molecules/index';

<KCascader 
  options={treeData} 
  onChange={(val) => console.log(val)} 
  allowClear 
/>`,
    filename: 'Cascader/index.tsx',
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
    aiNotes: 'KCascader para selección jerárquica anidada. Paridad total AntD v5.',
  },
  'statistic': {
    id: 'statistic', name: 'Statistic',
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
    filename: 'Statistic/index.tsx',
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
    aiNotes: 'KStatistic para mostrar métricas y cifras destacadas. Paridad AntD v5.',
  },
  'time-picker': {
    id: 'time-picker', name: 'TimePicker',
    description: 'Selector de hora con columnas de desplazamiento (HH, MM, SS), soporte 12h/24h y form-item wrapper.',
    preview: (<div style={{ maxWidth: 280 }}><KTimePicker placeholder="Seleccionar hora" /></div>),
    code: `import { KTimePicker } from '@khor/design-system/molecules/index';

<KTimePicker
  value={time}
  onChange={setTime}
  label="Hora de inicio"
  required
  showSeconds
/>`,
    filename: 'TimePicker/index.tsx',
    playground: <TimePickerPlayground />,
    stateShowcase: (() => {
      const rows: Array<{ required?: boolean; optional?: boolean; tooltip?: string }> = [
        {},
        { required: true },
        { tooltip: 'Información adicional sobre este campo.' },
        { required: true, tooltip: 'Información adicional sobre este campo.' },
        { optional: true, tooltip: 'Información adicional sobre este campo.' },
        { optional: true },
      ];
      return (
        <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 280 }}>
            {rows.map((r, i) => (
              <KTimePicker key={i} label="Label" labelPosition="side" {...r} placeholder="Seleccionar hora" />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, minWidth: 280 }}>
            {rows.map((r, i) => (
              <KTimePicker key={i} label="Label" labelPosition="side" {...r} placeholder="Seleccionar hora" helpText="Texto de ayuda del campo." />
            ))}
          </div>
        </div>
      );
    })(),
    a11ySummary: {
      keyboard: ['Tab: Entra al input.', 'Enter/Espacio: Abre el selector de hora.'],
      aria: ['El botón muestra la hora seleccionada o el placeholder.'],
      contrast: 'AAA entre texto del campo y fondo neutro.',
      score: 100,
    },
    props: [
      { name: 'value', type: 'string', description: 'Hora seleccionada, ej. "09:30" o "09:30:00".' },
      { name: 'onChange', type: '(time: string) => void', description: 'Callback al aceptar.' },
      { name: 'placeholder', type: 'string', default: "'Seleccionar hora'", description: 'Texto de placeholder.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del input.' },
      { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Estado visual.' },
      { name: 'showSeconds', type: 'boolean', default: 'false', description: 'Muestra columna de segundos.' },
      { name: 'use12Hours', type: 'boolean', default: 'false', description: 'Formato 12h con AM/PM.' },
      { name: 'disabled', type: 'boolean', description: 'Deshabilita el campo.' },
      { name: 'label', type: 'ReactNode', description: 'Etiqueta del campo.' },
      { name: 'labelPosition', type: "'top' | 'side'", default: "'top'", description: 'Posición de la etiqueta.' },
      { name: 'required', type: 'boolean', description: 'Marca el campo como obligatorio (*).' },
      { name: 'optional', type: 'boolean', description: 'Muestra "(opcional)".' },
      { name: 'tooltip', type: 'string', description: 'Tooltip informativo (ℹ).' },
      { name: 'helpText', type: 'string', description: 'Texto de ayuda bajo el campo.' },
    ],
    guidelines: ['Usa "Ahora" para establecer la hora actual del sistema.', 'Usa use12Hours si el contexto cultural requiere AM/PM.'],
    aiNotes: 'KTimePicker rediseñado con columnas de scroll HH/MM/SS, form-item wrapper y tokens Figma alineados con KDatePicker.',
  },
  'tooltip': {
    id: 'tooltip', name: 'Tooltip',
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
    filename: 'Tooltip/index.tsx',
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
    aiNotes: 'KTooltip para información contextual al hacer hover. NOTA: es molécula, no átomo.',
  },

  'color-picker': {
    id: 'color-picker', name: 'ColorPicker',
    description: 'Selector de color con soporte para formatos HEX, RGB, HSB y paleta de presets.',
    preview: (<div style={{ display: 'flex', gap: 16 }}>        <KColorPicker value="var(--khor-chart-primary)" /><KColorPicker value={khorTokens.colors.brand.navy} /></div>),
    code: `import { KColorPicker } from '@khor/design-system/molecules/index';

<KColorPicker 
  value="var(--khor-chart-primary)" 
  onChange={(color) => console.log(color)} 
  showText 
/>`,
    filename: 'ColorPicker/index.tsx',
    playground: <ColorPickerPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16 }}>
        <KColorPicker value="var(--khor-chart-primary)" />
        <KColorPicker showText value="var(--khor-chart-primary)" />
        <KColorPicker disabled value={khorTokens.colors.neutral[300]} />
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
    aiNotes: 'KColorPicker para selección de color. Paridad total AntD v5.',
  },
  'anchor': {
    id: 'anchor', name: 'Anchor',
    description: 'Sistema de navegación por anclas para desplazarse rápidamente por diferentes secciones de una página.',
    preview: (<div><KAnchor items={[{ key: '1', href: '#', title: 'Sección 1' }]} /></div>),
    code: `import { KAnchor } from '@khor/design-system/molecules/index';

<KAnchor 
  items={[
    { key: '1', href: '#intro', title: 'Intro' },
    { key: '2', href: '#usage', title: 'Uso' }
  ]} 
/>`,
    filename: 'Anchor/index.tsx',
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
    aiNotes: 'KAnchor para navegación por anclas en página. Paridad total AntD v5.',
  },
  'list': {
    id: 'list', name: 'List',
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
    filename: 'List/index.tsx',
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
    aiNotes: 'KList para listas con metadatos, avatar y acciones. Paridad total AntD v5.',
  },
  'divider-extended': { id: 'divider-extended', name: 'DividerExtended', description: 'Divisor con soporte para texto central y estilo dashed.',
    preview: (<div><KDividerExtended /><KDividerExtended>O continúa con</KDividerExtended><KDividerExtended dashed /></div>),
    code: `<KDividerExtended>O continúa con</KDividerExtended>`, filename: 'DividerExtended/index.tsx',
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
    guidelines: ['Usa con texto para separar secciones semánticas.']
  ,
    aiNotes: 'KDividerExtended con funcionalidad expandida respecto a KDivider átomo.',
  },
  'context-menu': {
    id: 'context-menu',
    name: 'ContextMenu',
    description: 'Menú contextual de click derecho premium basado en Radix UI que soporta submenús, shortcuts de teclado, separadores semánticos y estados de peligro.',
    preview: (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 24, border: `1px dashed ${khorTokens.colors.neutral[300]}`, borderRadius: 8, userSelect: 'none' }}>
        <span style={{ fontSize: 13, color: khorTokens.colors.neutral[500] }}>Click derecho aquí para probar previsualización</span>
      </div>
    ),
    playground: <ContextMenuPlayground />,
    code: `import { KContextMenu } from '@khor/design-system/molecules/index';\n\nconst menuItems = [\n  { key: 'edit', label: 'Editar Elemento', icon: <Edit size={14} /> },\n  { key: 'copy', label: 'Copiar Enlace', icon: <Copy size={14} />, shortcut: '⌘C' },\n  { key: 'divider-1', type: 'divider' },\n  { key: 'delete', label: 'Eliminar', icon: <Trash2 size={14} />, danger: true }\n];\n\n<KContextMenu items={menuItems} onClick={(key) => console.log(key)}>\n  <div className="w-80 h-40 border border-dashed rounded-xl flex items-center justify-center cursor-context-menu">\n    Haz click derecho aquí\n  </div>\n</KContextMenu>`,
    filename: 'ContextMenu/index.tsx',
    props: [
      { name: 'items', type: 'KContextMenuItemDef[]', required: true, description: 'Estructura jerárquica del menú de opciones.' },
      { name: 'onClick', type: '(key: string) => void', description: 'Callback gatillado al seleccionar una opción no deshabilitada.' },
      { name: 'children', type: 'ReactElement', required: true, description: 'Elemento que disparará el click derecho.' },
    ],
    guidelines: [
      'Usa atajos estándar de teclado (shortcuts) en aplicaciones web de escritorio.',
      'Diferencia visualmente las acciones peligrosas (como eliminar) usando la propiedad danger.',
      'No anides submenús con más de 2 niveles de profundidad para evitar frustración.'
    ],
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: khorTokens.colors.neutral[800] }}>Estados Visuales de los Ítems:</div>
        <div style={{ padding: 8, display: 'flex', alignItems: 'center', gap: 8, borderRadius: 6, backgroundColor: khorTokens.colors.neutral[100], fontSize: 13 }}>Normal: Opción de Menú</div>
        <div style={{ padding: 8, display: 'flex', alignItems: 'center', gap: 8, borderRadius: 6, backgroundColor: khorTokens.colors.brand.primary + '11', color: khorTokens.colors.brand.primary, fontSize: 13, fontWeight: 500 }}>Hover/Foco: Opción de Menú</div>
        <div style={{ padding: 8, display: 'flex', alignItems: 'center', gap: 8, borderRadius: 6, backgroundColor: khorTokens.colors.neutral[100], opacity: 0.5, fontSize: 13, cursor: 'not-allowed' }}>Deshabilitado: Opción de Menú</div>
        <div style={{ padding: 8, display: 'flex', alignItems: 'center', gap: 8, borderRadius: 6, backgroundColor: khorTokens.colors.neutral[100], color: khorTokens.colors.feedback.error, fontSize: 13 }}>Peligro (Danger): Opción de Menú</div>
      </div>
    ),
    a11ySummary: {
      keyboard: [
        'Shift+F10 / Click derecho: Abre el menú contextual en el elemento gatillo.',
        'Arrows Up/Down: Navegan entre las opciones del menú.',
        'Arrow Right: Abre el submenú de la opción activa.',
        'Arrow Left / Escape: Cierra el submenú o el menú completo.',
        'Enter / Space: Activa la opción seleccionada.'
      ],
      aria: [
        'role="menu" y role="menuitem" gestionados nativamente por Radix UI.',
        'aria-haspopup="true" en el disparador.',
        'aria-expanded refleja de manera sincrónica el estado de visibilidad del menú.'
      ],
      contrast: 'Fondos con blur y bordes contrastantes que cumplen las normas WCAG de legibilidad.',
      score: 100
    }
  ,
    aiNotes: 'KContextMenu para menú contextual al hacer clic derecho. Paridad AntD v5.',
  },
  'hover-card': {
    id: 'hover-card',
    name: 'HoverCard',
    description: 'Tarjeta flotante interactiva de vista previa rápida basada en Radix UI. Ideal para perfiles de usuario, vistas rápidas de productos o información enriquecida.',
    preview: (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 12 }}>
        <span style={{ fontSize: 13, color: khorTokens.colors.brand.primary, textDecoration: 'underline' }}>Pasa el mouse sobre mí</span>
      </div>
    ),
    playground: <HoverCardPlayground />,
    code: `import { KHoverCard } from '@khor/design-system/molecules/index';\n\nconst CardContent = () => (\n  <div className="flex gap-4">\n    <div className="w-12 h-12 rounded-full bg-primary" />\n    <div>\n      <h4 className="font-semibold text-sm">Khor Design System</h4>\n      <p className="text-xs text-muted">Construido con Tailwind y Radix.</p>\n    </div>\n  </div>\n);\n\n<KHoverCard content={<CardContent />} align="center" side="top" arrow>\n  <span className="text-primary underline cursor-pointer">@KhorDesignSystem</span>\n</KHoverCard>`,
    filename: 'HoverCard/index.tsx',
    props: [
      { name: 'children', type: 'ReactNode', required: true, description: 'Gatillo visual que activa la tarjeta al pasar el cursor.' },
      { name: 'content', type: 'ReactNode', required: true, description: 'Contenido que se mostrará dentro de la tarjeta flotante.' },
      { name: 'align', type: "'start' | 'center' | 'end'", default: "'center'", description: 'Alineación de la tarjeta con respecto al gatillo.' },
      { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: 'Lado donde aparecerá la tarjeta.' },
      { name: 'sideOffset', type: 'number', default: '6', description: 'Distancia de separación en píxeles.' },
      { name: 'arrow', type: 'boolean', default: 'false', description: 'Muestra una flecha indicadora que apunta al gatillo.' },
      { name: 'openDelay', type: 'number', default: '300', description: 'Tiempo de espera en ms para abrir.' },
      { name: 'closeDelay', type: 'number', default: '200', description: 'Tiempo de espera en ms para cerrar.' },
    ],
    guidelines: [
      'Configura un openDelay prudente (300-500ms) para evitar aperturas no deseadas al mover el puntero.',
      'Asegúrate de que la tarjeta contenga información complementaria y no crítica para completar la tarea del usuario.',
      'Habilita la propiedad arrow para mejorar la dirección visual y la conexión con el elemento disparador.'
    ],
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: khorTokens.colors.neutral[800] }}>Estados:</div>
        <div style={{ padding: 16, border: `1px solid ${khorTokens.colors.neutral[200]}`, borderRadius: 8, backgroundColor: 'white', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Tarjeta Flotante Abierta</div>
          <div style={{ fontSize: 11, color: khorTokens.colors.neutral[500], marginTop: 4 }}>Entrada animada suave con micro-desplazamiento.</div>
        </div>
      </div>
    ),
    a11ySummary: {
      keyboard: [
        'Hover / Foco: Activa la visualización de la tarjeta.',
        'Escape: Cierra de forma inmediata la tarjeta abierta sin perder el foco en el elemento principal.'
      ],
      aria: [
        'role="tooltip" o descriptores semánticos acordes al contenido inyectado.',
        'Soporte completo para lectores de pantalla mediante descriptores dinámicos en el trigger.'
      ],
      contrast: 'Bordes nítidos y sombras definidas que aíslan el contenido del fondo.',
      score: 100
    }
  ,
    aiNotes: 'KHoverCard para tarjeta informativa al hacer hover. Paridad AntD v5.',
  }
};

export const moleculesData: Record<string, MoleculeData> = {};
Object.keys(molecules).forEach(key => {
  const { preview, playground, stateShowcase, ...data } = molecules[key];
  moleculesData[key] = data;
});

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