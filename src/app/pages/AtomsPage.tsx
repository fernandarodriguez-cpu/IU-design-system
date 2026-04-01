/**
 * AtomsPage — Documentacion de todos los atomos del sistema Khor
 */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { ComponentDoc } from '../components/docs/ComponentDoc';
import type { PropDef } from '../components/docs/ComponentDoc';
import { KButton } from '../components/design-system/atoms/KButton/index';
import { KInput } from '../components/design-system/atoms/KInput/index';
import { KTextArea } from '../components/design-system/atoms/KTextArea/index';
import { KBadge } from '../components/design-system/atoms/KBadge/index';
import { KTag } from '../components/design-system/atoms/KTag/index';
import { KAvatar } from '../components/design-system/atoms/KAvatar/index';
import { KSwitch } from '../components/design-system/atoms/KSwitch/index';
import { KCheckbox } from '../components/design-system/atoms/KCheckbox/index';
import { KRadio } from '../components/design-system/atoms/KRadio/index';
import { KProgress } from '../components/design-system/atoms/KProgress/index';
import { KText } from '../components/design-system/atoms/KText/index';
import { KDivider } from '../components/design-system/atoms/KDivider/index';
import { KAlert } from '../components/design-system/atoms/KAlert/index';
import { KSkeleton } from '../components/design-system/atoms/KSkeleton/index';
import { KSlider } from '../components/design-system/atoms/KSlider/index';
import { KRate } from '../components/design-system/atoms/KRate/index';
import { KSpin } from '../components/design-system/atoms/KSpin/index';
import { KButtonGroup } from '../components/design-system/atoms/KButtonGroup/index';
import { KSearchInput } from '../components/design-system/atoms/KSearchInput/index';
import { KLabel } from '../components/design-system/atoms/KLabel/index';
import { KInputPassword } from '../components/design-system/atoms/KInput/index';
import { KFloatButton } from '../components/design-system/atoms/KFloatButton/index';
import { KImage } from '../components/design-system/atoms/KImage/index';
import { KSpace } from '../components/design-system/atoms/KSpace/index';
import { KQRCode } from '../components/design-system/atoms/KQRCode/index';
import { KWatermark } from '../components/design-system/atoms/KWatermark/index';
import { KFlex } from '../components/design-system/atoms/KFlex/index';
import { KRow, KCol } from '../components/design-system/atoms/KGrid/index';
import { KTooltip } from '../components/design-system/molecules/KTooltip/index';
import { KPagination } from '../components/design-system/organisms/KPagination/index';
import {
  Plus, Save, Trash2, Download, Mail, Lock, User,
  Bell, Star, Heart, Search, AlertCircle, Info,
} from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';

/* ─── Playground Wrappers ───────────────────── */
function ButtonPlayground() {
  const [variant, setVariant] = useState<any>('primary');
  const [size, setSize] = useState<any>('md');
  const [shape, setShape] = useState<any>('default');
  const [htmlType, setHtmlType] = useState<any>('button');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [block, setBlock] = useState(false);
  const [ghost, setGhost] = useState(false);
  const [danger, setDanger] = useState(false);
  
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  const checkStyle = { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Variante</label>
            <select value={variant} onChange={(e) => setVariant(e.target.value)} style={sel}>
              {['primary', 'secondary', 'outline', 'ghost', 'danger', 'navy', 'dashed', 'link', 'text'].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label style={ctrl}>Tamaño</label>
            <select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>
              {['sm', 'md', 'lg'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={ctrl}>Forma (shape)</label>
            <select value={shape} onChange={(e) => setShape(e.target.value)} style={sel}>
              {['default', 'round', 'circle'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={ctrl}>Tipo HTML (htmlType)</label>
            <select value={htmlType} onChange={(e) => setHtmlType(e.target.value)} style={sel}>
              {['button', 'submit', 'reset'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            <label style={checkStyle}>
              <input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} /> Loading
            </label>
            <label style={checkStyle}>
              <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled
            </label>
            <label style={checkStyle}>
              <input type="checkbox" checked={block} onChange={(e) => setBlock(e.target.checked)} /> Block
            </label>
            <label style={checkStyle}>
              <input type="checkbox" checked={danger} onChange={(e) => setDanger(e.target.checked)} /> Danger
            </label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: ghost ? khorTokens.colors.brand.navy : khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KButton variant={danger ? 'danger' : (ghost ? 'ghost' : variant)} size={size} shape={shape} htmlType={htmlType} loading={loading} disabled={disabled} block={block} icon={<Save size={16} />}>
          {shape === 'circle' ? '' : 'Guardar Cambios'}
        </KButton>
      </div>
    </div>
  );
}


function InputPlayground() {
  const [val, setVal] = useState('');
  const [error, setError] = useState('');
  const [warningMsg, setWarningMsg] = useState('');
  const [size, setSize] = useState<any>('md');
  const [variant, setVariant] = useState<any>('outlined');
  const [disabled, setDisabled] = useState(false);
  const [block, setBlock] = useState(false);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  const checkStyle = { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Tamaño</label>
            <select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>
              {['sm', 'md', 'lg'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={ctrl}>Variante Visual</label>
            <select value={variant} onChange={(e) => setVariant(e.target.value)} style={sel}>
              {['outlined', 'borderless', 'filled'].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label style={ctrl}>Mensaje de Error</label>
            <input value={error} onChange={(e) => setError(e.target.value)} placeholder="Dejar vacío para sin error" style={sel} />
          </div>
          <div>
            <label style={ctrl}>Mensaje de Advertencia</label>
            <input value={warningMsg} onChange={(e) => setWarningMsg(e.target.value)} placeholder="Dejar vacío para sin advertencia" style={sel} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            <label style={checkStyle}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
            <label style={checkStyle}><input type="checkbox" checked={block} onChange={(e) => setBlock(e.target.checked)} /> Block</label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 12, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg, alignItems: 'center', justifyContent: 'center' }}>
        <KInput
          size={size}
          block={block}
          variant={variant}
          placeholder="Escribe aqui..."
          prefix={<Mail size={16} />}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          error={error || undefined}
          warning={warningMsg || undefined}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

/* ─── Playground: Badge ─────────────────────── */
function BadgePlayground() {
  const [status, setStatus] = useState<any>('success');
  const [label, setLabel] = useState('Activo');
  const [dot, setDot] = useState(true);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Estado</label><select value={status} onChange={(e) => setStatus(e.target.value)} style={sel}>{['success','error','warning','info','default'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Texto</label><input value={label} onChange={(e) => setLabel(e.target.value)} style={sel}/></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={dot} onChange={(e) => setDot(e.target.checked)} /> Mostrar punto</label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KBadge status={status} label={label} dot={dot} />
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
          <div><label style={ctrl}>Tamaño</label><select value={size} onChange={(e) => setSize(e.target.value as any)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Valor actual: "{val}"</p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 300, display: 'flex', alignItems: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%' }}><KSearchInput placeholder={placeholder} size={size} value={val} onChange={setVal} /></div>
      </div>
    </div>
  );
}

function TagPlayground() {
  const [color, setColor] = useState<any>('primary');
  const [closable, setClosable] = useState(false);
  const [bordered, setBordered] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [text, setText] = useState('Etiqueta');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Color</label><select value={color} onChange={(e) => setColor(e.target.value)} style={sel}>{['primary','navy','accent','success','error','warning','default'].map(c=><option key={c}>{c}</option>)}</select></div>
          <div><label style={ctrl}>Texto</label><input value={text} onChange={(e) => setText(e.target.value)} style={sel}/></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={closable} onChange={(e) => setClosable(e.target.checked)} /> Closable</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={bordered} onChange={(e) => setBordered(e.target.checked)} /> Bordered</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showIcon} onChange={(e) => setShowIcon(e.target.checked)} /> Con Icono (Star)</label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KTag color={color} closable={closable} bordered={bordered} icon={showIcon ? <Star size={12} /> : undefined} onClose={() => {}}>{text}</KTag>
      </div>
    </div>
  );
}

function SpacePlayground() {
  const [dir, setDir] = useState<any>('horizontal');
  const [size, setSize] = useState<any>('md');
  const [align, setAlign] = useState<any>('center');
  const [wrap, setWrap] = useState(true);
  const [split, setSplit] = useState(false);
  
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Dirección</label><select value={dir} onChange={(e) => setDir(e.target.value)} style={sel}>{['horizontal','vertical'].map(d=><option key={d}>{d}</option>)}</select></div>
          <div><label style={ctrl}>Tamaño (Gap)</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Alineación</label><select value={align} onChange={(e) => setAlign(e.target.value)} style={sel}>{['start', 'center', 'end', 'baseline'].map(a=><option key={a}>{a}</option>)}</select></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} /> Wrap Items</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={split} onChange={(e) => setSplit(e.target.checked)} /> Show Splitter</label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSpace direction={dir} size={size} align={align} wrap={wrap} split={split ? <KDivider type="vertical" /> : undefined} className="playground-space">
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} style={{ padding: '8px 16px', backgroundColor: khorTokens.colors.brand.primary, borderRadius: 4, color: '#fff', fontSize: 14 }}>Item {i+1}</div>
          ))}
        </KSpace>
      </div>
    </div>
  );
}

function PaginationPlayground() {
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(500);
  const [pageSize, setPageSize] = useState(10);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Total Items</label><input type="number" value={total} onChange={(e) => setTotal(Number(e.target.value))} style={sel} /></div>
          <div><label style={ctrl}>Tamaño página</label><select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} style={sel}>{[10, 20, 50, 100].map(p => <option key={p} value={p}>{p}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KPagination 
          current={current} 
          onChange={setCurrent} 
          total={total} 
          pageSize={pageSize} 
        />
      </div>
    </div>
  );
}

function AvatarPlayground() {
  const [size, setSize] = useState<any>('md');
  const [status, setStatus] = useState<any>('online');
  const [shape, setShape] = useState<any>('circle');
  const [gap, setGap] = useState(4);
  const [name, setName] = useState('Maria Garcia');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Nombre</label><input value={name} onChange={(e) => setName(e.target.value)} style={sel}/></div>
          <div><label style={ctrl}>Tamaño</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Forma (shape)</label><select value={shape} onChange={(e) => setShape(e.target.value)} style={sel}>{['circle','square'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Estado de Presencia</label><select value={status} onChange={(e) => setStatus(e.target.value)} style={sel}>{['online','offline','busy','away','none'].map(s=><option key={s}>{s}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KAvatar name={name} size={size} shape={shape} status={status === 'none' ? undefined : status} />
        <KAvatar name="JD" size={size} shape={shape} />
      </div>
    </div>
  );
}

function ButtonGroupPlayground() {
  const [size, setSize] = useState<any>('sm');
  const [direction, setDirection] = useState<any>('horizontal');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tamaño (Gap)</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Dirección</label><select value={direction} onChange={(e) => setDirection(e.target.value)} style={sel}>{['horizontal','vertical'].map(d=><option key={d}>{d}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KButtonGroup size={size} direction={direction}>
          <KButton variant="secondary" size="sm">Anterior</KButton>
          <KButton variant="primary" size="sm">Aplicar</KButton>
          <KButton variant="secondary" size="sm">Siguiente</KButton>
        </KButtonGroup>
      </div>
    </div>
  );
}

function SwitchPlayground() {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sizeS, setSizeS] = useState<any>('md');
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={{ fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block', marginBottom: 4 }}>Tamano</label><select value={sizeS} onChange={(e) => setSizeS(e.target.value)} style={sel}>{['sm','md'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} /> Loading</label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSwitch label="Notificaciones activas" checked={checked} onCheckedChange={setChecked} disabled={disabled} loading={loading} size={sizeS} />
      </div>
    </div>
  );
}

function CheckboxPlayground() {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);
  const [disabled, setDisabled] = useState(false);
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={checked === 'indeterminate'} onChange={(e) => setChecked(e.target.checked ? 'indeterminate' : false)} /> Indeterminate
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled
          </label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KCheckbox label="Acepto los terminos" checked={checked} onCheckedChange={(val) => setChecked(val)} disabled={disabled} />
      </div>
    </div>
  );
}

function RadioPlayground() {
  const [value, setValue] = useState('1');
  const [direction, setDirection] = useState<any>('horizontal');
  const [variant, setVariant] = useState<any>('default');
  const [buttonStyle, setButtonStyle] = useState<any>('solid');
  const [size, setSize] = useState<any>('md');
  const [disabled, setDisabled] = useState(false);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tipo</label><select value={variant} onChange={(e) => setVariant(e.target.value as any)} style={sel}>{['default','button'].map(v=><option key={v}>{v}</option>)}</select></div>
          {variant === 'button' && <div><label style={ctrl}>Button Style</label><select value={buttonStyle} onChange={(e) => setButtonStyle(e.target.value as any)} style={sel}>{['solid','outline'].map(b=><option key={b}>{b}</option>)}</select></div>}
          <div><label style={ctrl}>Dirección</label><select value={direction} onChange={(e) => setDirection(e.target.value as any)} style={sel}>{['horizontal','vertical'].map(d=><option key={d}>{d}</option>)}</select></div>
          <div><label style={ctrl}>Tamaño</label><select value={size} onChange={(e) => setSize(e.target.value as any)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginTop: 4 }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KRadio options={[{label:'Empleado',value:'1'},{label:'Contratista',value:'2'},{label:'Becario',value:'3'}]} value={value} onValueChange={setValue} direction={direction} variant={variant} buttonStyle={buttonStyle} size={size} disabled={disabled} />
      </div>
    </div>
  );
}

function ProgressPlayground() {
  const [percent, setPercent] = useState(50);
  const [status, setStatus] = useState<any>('normal');
  const [sizeP, setSizeP] = useState<any>('default');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Porcentaje: {percent}%</label><input type="range" min={0} max={100} value={percent} onChange={(e: any) => setPercent(Number(e.target.value))} style={{ width: '100%' }} /></div>
          <div><label style={ctrl}>Estado</label><select value={status} onChange={(e) => setStatus(e.target.value as any)} style={sel}>{['normal','success','exception','active'].map(s=><option key={s}>{s}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%', maxWidth: 300 }}><KProgress value={percent} status={status === 'normal' ? undefined : status} /></div>
      </div>
    </div>
  );
}

function TypographyPlayground() {
  const [variant, setVariant] = useState<any>('body-md');
  const [color, setColor] = useState<any>('default');
  const [text, setText] = useState('El veloz zorro marron salta sobre el perro perezoso.');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Variante</label><select value={variant} onChange={(e) => setVariant(e.target.value as any)} style={sel}>{['h1','h2','h3','body-lg','body-md','small','caption'].map(v=><option key={v}>{v}</option>)}</select></div>
          <div><label style={ctrl}>Color</label><select value={color} onChange={(e) => setColor(e.target.value as any)} style={sel}>{['default','primary','navy','secondary','success','error','muted'].map(c=><option key={c}>{c}</option>)}</select></div>
          <div><label style={ctrl}>Texto</label><input value={text} onChange={(e) => setText(e.target.value)} style={sel}/></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KText variant={variant} color={color}>{text}</KText>
      </div>
    </div>
  );
}

function AlertPlayground() {
  const [type, setType] = useState<any>('info');
  const [closable, setClosable] = useState(true);
  const [showIcon, setShowIcon] = useState(true);
  const [title, setTitle] = useState('Titulo de alerta');
  const [desc, setDesc] = useState('Descripcion detallada del mensaje.');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tipo</label><select value={type} onChange={(e) => setType(e.target.value as any)} style={sel}>{['success','error','warning','info'].map(t=><option key={t}>{t}</option>)}</select></div>
          <div><label style={ctrl}>Titulo</label><input value={title} onChange={(e) => setTitle(e.target.value)} style={sel}/></div>
          <div><label style={ctrl}>Descripcion</label><input value={desc} onChange={(e) => setDesc(e.target.value)} style={sel}/></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={closable} onChange={(e) => setClosable(e.target.checked)} /> Closable</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showIcon} onChange={(e) => setShowIcon(e.target.checked)} /> Show Icon</label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 320, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KAlert type={type} title={title} description={desc} closable={closable} showIcon={showIcon} />
      </div>
    </div>
  );
}

function QRCodePlayground() {
  const [val, setVal] = useState('https://khor.dev');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Valor / URL</label><input value={val} onChange={(e) => setVal(e.target.value)} style={sel}/></div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}><label style={ctrl}>Color</label><input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '100%', height: 32, padding: 0, border: 'none', cursor: 'pointer' }} /></div>
            <div style={{ flex: 1 }}><label style={ctrl}>Fondo</label><input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: '100%', height: 32, padding: 0, border: 'none', cursor: 'pointer' }} /></div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KQRCode value={val} color={color} bgColor={bgColor} size={150} />
      </div>
    </div>
  );
}

function SkeletonPlayground() {
  const [lines, setLines] = useState(3);
  const [circle, setCircle] = useState(false);
  const [loading, setLoading] = useState(true);
  const [w, setW] = useState(200);
  const [h, setH] = useState(40);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={circle} onChange={(e) => setCircle(e.target.checked)} /> Circulo</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} /> Loading</label>
          </div>
          {!circle && <div><label style={ctrl}>Lineas: {lines}</label><input type="range" min={1} max={6} value={lines} onChange={(e) => setLines(Number(e.target.value))} style={{ width: '100%' }} /></div>}
          <div><label style={ctrl}>Ancho: {w}px</label><input type="range" min={50} max={400} value={w} onChange={(e) => setW(Number(e.target.value))} style={{ width: '100%' }} /></div>
          <div><label style={ctrl}>Alto: {h}px</label><input type="range" min={12} max={100} value={h} onChange={(e) => setH(Number(e.target.value))} style={{ width: '100%' }} /></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        {circle ? <KSkeleton circle height={h} loading={loading} /> : <KSkeleton lines={lines} width={w} loading={loading} />}
      </div>
    </div>
  );
}

function SliderPlayground() {
  const [value, setValue] = useState([50]);
  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [showValue, setShowValue] = useState(false);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Step</label><select value={step} onChange={(e) => setStep(Number(e.target.value))} style={sel}>{[1,5,10,25].map(s=><option key={s} value={s}>{s}</option>)}</select></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showValue} onChange={(e) => setShowValue(e.target.checked)} /> Show Value</label>
          </div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Valor: {value[0]}</p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%', maxWidth: 300 }}><KSlider value={value} onValueChange={setValue} min={0} max={100} step={step} disabled={disabled} showValue={showValue} /></div>
      </div>
    </div>
  );
}

function RatePlayground() {
  const [value, setValue] = useState(3);
  const [count, setCount] = useState(5);
  const [sizeR, setSizeR] = useState(24);
  const [disabled, setDisabled] = useState(false);
  const [allowHalf, setAllowHalf] = useState(false);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Estrellas: {count}</label><input type="range" min={3} max={10} value={count} onChange={(e) => setCount(Number(e.target.value))} style={{ width: '100%' }} /></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={allowHalf} onChange={(e) => setAllowHalf(e.target.checked)} /> Allow Half</label>
          </div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Valor: {value}</p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KRate value={value} onChange={setValue} count={count} disabled={disabled} allowHalf={allowHalf} />
      </div>
    </div>
  );
}

function TextAreaPlayground() {
  const [val, setVal] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  const checkStyle = { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Mensaje de Error</label>
            <input value={error} onChange={(e) => setError(e.target.value)} placeholder="Dejar vacio para sin error" style={sel} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            <label style={checkStyle}>
              <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled
            </label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KTextArea placeholder="Describe el motivo de la solicitud..." value={val} onChange={(e) => setVal(e.target.value)} error={error || undefined} rows={4} disabled={disabled} />
      </div>
    </div>
  );
}

function SpinPlayground() {
  const [sizeS, setSizeS] = useState<any>('md');
  const [tip, setTip] = useState('Cargando...');
  const [color, setColor] = useState('');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tamano</label><select value={sizeS} onChange={(e) => setSizeS(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Color Hex</label><input value={color} onChange={(e) => setColor(e.target.value)} placeholder="#0052cc" style={sel}/></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSpin size={sizeS} color={color || undefined} />
      </div>
    </div>
  );
}

function TooltipPlayground() {
  const [placement, setPlacement] = useState<any>('top');
  const [title, setTitle] = useState('Tooltip de ejemplo');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Posicion</label><select value={placement} onChange={(e) => setPlacement(e.target.value)} style={sel}>{['top','bottom','left','right'].map(p=><option key={p}>{p}</option>)}</select></div>
          <div><label style={ctrl}>Texto</label><input value={title} onChange={(e) => setTitle(e.target.value)} style={sel}/></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KTooltip title={title} placement={placement}>
          <KButton variant="secondary" icon={<Info size={16} />}>Hover aqui</KButton>
        </KTooltip>
      </div>
    </div>
  );
}

function DividerPlayground() {
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Notas</h4>
        <p style={{ fontSize: 13, color: khorTokens.colors.neutral[400], lineHeight: 1.6, margin: 0 }}>
          KDivider es un componente puramente visual para separar secciones de contenido.
        </p>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column', gap: 12, padding: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KText variant="body-md">Seccion A</KText>
        <KDivider />
        <KText variant="body-md">Seccion B</KText>
        <KDivider />
        <KText variant="small" color="muted">Seccion C</KText>
      </div>
    </div>
  );
}

function LabelPlayground() {
  const [required, setRequired] = useState(true);
  const [info, setInfo] = useState('Este es un tooltip de información');
  const [size, setSize] = useState<any>('md');
  const [text, setText] = useState('Nombre de Usuario');

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Texto del Label</label><input value={text} onChange={(e) => setText(e.target.value)} style={sel}/></div>
          <div><label style={ctrl}>Tamaño</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Info Tooltip</label><input value={info} onChange={(e) => setInfo(e.target.value)} style={sel}/></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={required} onChange={(e) => setRequired(e.target.checked)} /> Requerido (*)
          </label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%', maxWidth: 200 }}>
          <KLabel required={required} info={info} size={size}>{text}</KLabel>
          <KInput placeholder="Ejemplo..." size={size} />
        </div>
      </div>
    </div>
  );
}

function FlexPlayground() {
  const [vertical, setVertical] = useState(false);
  const [justify, setJustify] = useState<any>('start');
  const [align, setAlign] = useState<any>('center');
  const [gap, setGap] = useState<any>('middle');
  const [wrap, setWrap] = useState<any>('nowrap');

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Justificación</label><select value={justify} onChange={(e) => setJustify(e.target.value)} style={sel}>{['start','center','end','space-between','space-around'].map(v=><option key={v}>{v}</option>)}</select></div>
          <div><label style={ctrl}>Alineación</label><select value={align} onChange={(e) => setAlign(e.target.value)} style={sel}>{['start','center','end','stretch'].map(v=><option key={v}>{v}</option>)}</select></div>
          <div><label style={ctrl}>Gap</label><select value={gap} onChange={(e) => setGap(e.target.value)} style={sel}>{['small','middle','large'].map(v=><option key={v}>{v}</option>)}</select></div>
          <div style={{ display: 'flex', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={vertical} onChange={(e) => setVertical(e.target.checked)} /> Vertical</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={wrap === 'wrap'} onChange={(e) => setWrap(e.target.checked ? 'wrap' : 'nowrap')} /> Wrap</label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, padding: 24, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KFlex vertical={vertical} justify={justify} align={align} gap={gap} wrap={wrap} style={{ minHeight: 150 }}>
          <div style={{ width: 60, height: 60, backgroundColor: khorTokens.colors.brand.primary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>1</div>
          <div style={{ width: 80, height: 80, backgroundColor: khorTokens.colors.brand.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>2</div>
          <div style={{ width: 70, height: 70, backgroundColor: khorTokens.colors.brand.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8 }}>3</div>
        </KFlex>
      </div>
    </div>
  );
}

function PasswordPlayground() {
  const [disabled, setDisabled] = useState(false);
  const [size, setSize] = useState<any>('md');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tamaño</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KInputPassword placeholder="Ingresa tu contraseña" size={size} disabled={disabled} prefix={<Lock size={16} />} block />
      </div>
    </div>
  );
}

function SearchPlayground() {
  const [size, setSize] = useState<any>('md');
  const [placeholder, setPlaceholder] = useState('Buscar en Khor...');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Placeholder</label><input value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} style={sel}/></div>
          <div><label style={ctrl}>Tamaño</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSearchInput placeholder={placeholder} size={size} onSearch={(v) => alert('Buscando: ' + v)} />
      </div>
    </div>
  );
}

/* ─── Component Registry ────────────────────── */
export interface AtomEntry {
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

export const atoms: Record<string, AtomEntry> = {
  button: {
    id: 'button',
    name: 'KButton',
    description: 'Boton principal del sistema con 6 variantes semanticas de Khor (Radix UI + custom), incluyendo estados de interaccion (hover +10% brightness, active -10% brightness, disabled greyscale 50%).',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Variantes</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <KButton variant="primary" icon={<Save size={16} />}>Primario</KButton>
            <KButton variant="secondary">Secundario</KButton>
            <KButton variant="outline">Outline</KButton>
            <KButton variant="ghost">Ghost</KButton>
            <KButton variant="danger" icon={<Trash2 size={16} />}>Peligro</KButton>
            <KButton variant="navy">Navy</KButton>
          </div>
        </div>
        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Tamanos</p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <KButton size="sm">Pequeno</KButton>
            <KButton size="md">Mediano</KButton>
            <KButton size="lg">Grande</KButton>
          </div>
        </div>
        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Estados</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <KButton loading>Cargando</KButton>
            <KButton disabled>Desactivado</KButton>
            <KButton icon={<Plus size={16} />}>Con Icono</KButton>
          </div>
        </div>
      </div>
    ),
    playground: <ButtonPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Default</span><KButton>Botón</KButton></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Hover (CSS)</span><KButton style={{ filter: 'brightness(1.1)' }}>Botón</KButton></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Active (CSS)</span><KButton style={{ filter: 'brightness(0.9)', transform: 'scale(0.98)' }}>Botón</KButton></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Focus</span><div style={{ outline: `2px solid ${khorTokens.colors.brand.primary}`, outlineOffset: '2px', borderRadius: khorTokens.radius.md }}><KButton>Botón</KButton></div></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Disabled</span><KButton disabled>Botón</KButton></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Loading</span><KButton loading>Botón</KButton></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Navega al componente y lanza focus ring.', 'Enter/Space: Dispara evento onClick.'],
      aria: ['role="button"', 'aria-disabled="true" y tabIndex={-1} cuando desactivado.', 'aria-busy="true" global durante loading.'],
      contrast: 'AAA sobre blanco',
      score: 100,
    },
    code: `import { KButton } from '@khor/design-system/atoms/index';

// Variantes disponibles: primary | secondary | outline | ghost | danger | navy
// Tamanos: sm | md | lg

<KButton variant="primary" size="md" icon={<Save size={16} />}>
  Guardar
</KButton>

<KButton variant="danger" size="sm" icon={<Trash2 size={16} />}>
  Eliminar
</KButton>

<KButton variant="navy" loading>
  Procesando...
</KButton>

<KButton variant="outline" disabled>
  Desactivado
</KButton>`,
    filename: 'KButton.tsx',
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'navy'", default: "'primary'", description: 'Variante visual del botón.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del botón.' },
      { name: 'icon', type: 'ReactNode', description: 'Icono Lucide. Tamaño recomendado: 16px.' },
      { name: 'iconPosition', type: "'start' | 'end'", default: "'start'", description: 'Posición del icono relativa al texto.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Muestra spinner de carga y deshabilita el botón.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva el botón.' },
      { name: 'block', type: 'boolean', default: 'false', description: 'Ancho completo del contenedor.' },
      { name: 'onClick', type: '(e: MouseEvent) => void', description: 'Callback al hacer click.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Contenido del botón.' },
    ],
    guidelines: [
      'Usa variant="primary" para la accion principal de una pantalla (maximo 1 por vista).',
      'Usa variant="danger" solo para acciones destructivas como "Eliminar" o "Despedir".',
      'Tamano sm para tablas y toolbars, md para formularios, lg para CTAs destacados.',
      'Siempre incluye un icono Lucide (16px, stroke 2px) para mejorar la escaneabilidad.',
    ],
    aiNotes: 'Al generar interfaces, prioriza variant="primary" para la accion mas importante. Usa variant="navy" para acciones de navegacion. Los botones disabled deben ser ignorados por el flujo de IA.',
  },
  input: {
    id: 'input',
    name: 'KInput',
    description: 'Campo de entrada de texto con soporte para prefijo, sufijo, estados de error, y limpieza. Incluye variante KTextArea para texto multilinea.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <KInput placeholder="Texto basico" />
        <KInput placeholder="Con icono" prefix={<Mail size={16} />} />
        <KInput placeholder="Default value" defaultValue="Texto" />
        <KInput placeholder="Contrasena" type="password" prefix={<Lock size={16} />} />
        <KInput placeholder="Con error" error="Este campo es obligatorio" />
        <KInput placeholder="Desactivado" disabled />
        <KTextArea placeholder="Area de texto multilinea..." rows={3} />
      </div>
    ),
    playground: <InputPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
        <div style={{ minWidth: 150 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500], display: 'block', marginBottom: 8 }}>Default</span><KInput placeholder="Escribe..." /></div>
        <div style={{ minWidth: 150 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500], display: 'block', marginBottom: 8 }}>Hover (CSS)</span><div style={{ filter: 'brightness(0.98)' }}><KInput placeholder="Escribe..." /></div></div>
        <div style={{ minWidth: 150 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500], display: 'block', marginBottom: 8 }}>Focus</span><div style={{ outline: `2px solid ${khorTokens.colors.brand.primary}`, outlineOffset: 0, borderRadius: khorTokens.radius.md }}><KInput placeholder="Escribe..." /></div></div>
        <div style={{ minWidth: 150 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500], display: 'block', marginBottom: 8 }}>Disabled</span><KInput placeholder="No disponible" disabled /></div>
        <div style={{ minWidth: 150 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500], display: 'block', marginBottom: 8 }}>Error</span><KInput value="Inválido" error="Requerido" /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Foco nativo al input.', 'Esc: Cierra menú si aplica, o limpia si allowClear=true.'],
      aria: ['aria-invalid="true" cuando entra en error.', 'React/Radix enlaza aria-describedby al mensaje de error automáticamente.'],
      contrast: 'AA Mínimo para el texto ingresado (>4.5:1)',
      score: 95,
    },
    code: `import { KInput } from '@khor/design-system/atoms/index';

<KInput
  placeholder="Email"
  prefix={<Mail size={16} />}
/>

<KInput
  type="password"
  placeholder="Contrasena"
  prefix={<Lock size={16} />}
/>

<KInput
  placeholder="Campo con error"
  error="Este campo es obligatorio"
/>`,
    filename: 'KInput.tsx',
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del input.' },
      { name: 'variant', type: "'outlined' | 'borderless' | 'filled'", default: "'outlined'", description: 'Estilo visual: con borde, sin borde, o con fondo sólido.' },
      { name: 'placeholder', type: 'string', description: 'Texto placeholder cuando el input está vacío.' },
      { name: 'prefix', type: 'ReactNode', description: 'Icono o elemento posicionado al inicio del input.' },
      { name: 'suffix', type: 'ReactNode', description: 'Icono o elemento posicionado al final del input.' },
      { name: 'error', type: 'string', description: 'Mensaje de error. Activa borde rojo y muestra texto de error.' },
      { name: 'warning', type: 'string', description: 'Mensaje de advertencia. Activa borde amarillo y muestra texto de aviso.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva el input.' },
      { name: 'block', type: 'boolean', default: 'false', description: 'Ancho completo del contenedor.' },
      { name: 'type', type: "string", default: "'text'", description: 'Tipo de input HTML.' },
      { name: 'onChange', type: '(e: ChangeEvent<HTMLInputElement>) => void', description: 'Callback al cambiar valor.' },
    ],
    guidelines: [
      'Siempre usa un prefix icon para indicar el tipo de dato esperado.',
      'Los mensajes de error deben ser descriptivos y en espanol.',
      'Usa allowClear en campos de busqueda y filtros.',
    ],
    aiNotes: 'Los inputs con error deben ser el foco principal al analizar formularios. Placeholders usan color.neutral.300.',
  },
  badge: {
    id: 'badge',
    name: 'KBadge',
    description: 'Indicador de estado semantico con punto de color y texto. Ideal para mostrar el estado actual de un registro o proceso.',
    preview: (
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <KBadge status="success" label="Activo" />
        <KBadge status="error" label="Rechazado" />
        <KBadge status="warning" label="Pendiente" />
        <KBadge status="info" label="En Revision" />
        <KBadge status="default" label="Borrador" />
        <KBadge status="success" label="Sin punto" dot={false} />
      </div>
    ),
    playground: <BadgePlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <KBadge status="default" label="Default" />
        <KBadge status="success" label="Success" />
        <KBadge status="warning" label="Warning" />
        <KBadge status="error" label="Error" />
        <KBadge status="info" label="Info" />
      </div>
    ),
    a11ySummary: {
      keyboard: ['No aplica nativamente.'],
      aria: ['role="status" aplicable al contenedor padre.'],
      contrast: 'AAA sobre elemento indicador, AA sobre texto adjunto.',
      score: 100,
    },
    code: `import { KBadge } from '@khor/design-system/atoms/index';

<KBadge status="success" label="Activo" />
<KBadge status="error" label="Rechazado" />
<KBadge status="warning" label="Pendiente" />
<KBadge status="info" label="En Revision" />
<KBadge status="default" label="Borrador" />`,
    filename: 'KBadge.tsx',
    props: [
      { name: 'status', type: "'success' | 'error' | 'warning' | 'info' | 'default'", default: "'default'", description: 'Estado semantico que define el color.' },
      { name: 'label', type: 'string', required: true, description: 'Texto del badge.' },
      { name: 'dot', type: 'boolean', default: 'true', description: 'Muestra el punto de color.' },
    ],
    guidelines: [
      'Usa siempre estados semanticos, nunca colores arbitrarios.',
      'success = proceso completado, error = fallo, warning = atencion requerida, info = informativo.',
    ],
    aiNotes: 'Los badges son clave para que la IA interprete el estado de registros. El status semantico debe coincidir con el contexto del dato.',
  },
  tag: {
    id: 'tag',
    name: 'KTag',
    description: 'Etiqueta de categorizacion con colores del sistema. Soporta cierre (closable) para tags removibles.',
    preview: (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <KTag color="primary">Primario</KTag>
        <KTag color="navy">Navy</KTag>
        <KTag color="accent">Accent</KTag>
        <KTag color="success">Exito</KTag>
        <KTag color="error">Error</KTag>
        <KTag color="warning">Alerta</KTag>
        <KTag color="default">Default</KTag>
        <KTag color="primary" closable>Removible</KTag>
      </div>
    ),
    playground: <TagPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <KTag color="magenta">Magenta</KTag>
        <KTag color="volcano">Volcano</KTag>
        <KTag color="green">Green</KTag>
        <KTag color="blue">Blue</KTag>
        <KTag closable>Closable</KTag>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Space/Enter: Cierra el tag si es "closable" y tiene foco.'],
      aria: ['icon cierra utiliza aria-label y role="button".'],
      contrast: 'AA sobre fondo tintado ligero',
      score: 100,
    },
    code: `import { KTag } from '@khor/design-system/atoms/index';

<KTag color="primary">Departamento RH</KTag>
<KTag color="navy">Gerencia</KTag>
<KTag color="success">Aprobado</KTag>
<KTag color="primary" closable onClose={() => {}}>Removible</KTag>`,
    filename: 'KTag.tsx',
    props: [
      { name: 'color', type: "'primary' | 'navy' | 'accent' | 'success' | 'error' | 'warning' | 'info' | 'default'", default: "'default'", description: 'Color semántico del tag. Puede ser cualquier color hex también.' },
      { name: 'icon', type: 'ReactNode', description: 'Icono a mostrar antes del texto. Usar lucide-react, tamaño 12px.' },
      { name: 'bordered', type: 'boolean', default: 'true', description: 'Muestra u oculta el borde del tag.' },
      { name: 'closable', type: 'boolean', default: 'false', description: 'Permite cerrar/eliminar el tag.' },
      { name: 'onClose', type: '() => void', description: 'Callback al cerrar el tag.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Contenido del tag.' },
    ],
    guidelines: [
      'Usa tags para categorizar, no para indicar estado (para eso usa KBadge).',
      'Usa closable en selectores multi-valor.',
    ],
  },
  avatar: {
    id: 'avatar',
    name: 'KAvatar',
    description: 'Avatar de usuario con soporte para imagen, iniciales automaticas y indicador de estado (online/offline/busy/away).',
    preview: (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <KAvatar name="Juan Perez" size="sm" status="online" />
        <KAvatar name="Maria Garcia" size="md" status="away" />
        <KAvatar name="Carlos Ruiz" size="lg" status="busy" />
        <KAvatar src="https://github.com/shadcn.png" size="lg" status="online" />
      </div>
    ),
    playground: <AvatarPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Small</span><KAvatar size="sm" name="AB" /></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Base</span><KAvatar size="md" name="AB" /></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Large</span><KAvatar size="lg" name="AB" /></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Square</span><KAvatar shape="square" name="CD" /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['No aplica (usualmente envuelto en KButton o Link).'],
      aria: ['alt se pasa orgánicamente cuando renderiza <img>.', 'Requiere aria-label si contiene icono descriptivo genérico.'],
      contrast: 'AAA entre color de la letra y color dinámico del fondo.',
      score: 100,
    },
    code: `import { KAvatar } from '@khor/design-system/atoms/index';

<KAvatar name="Maria Garcia" size="md" status="online" />
<KAvatar name="Juan Perez" size="lg" status="busy" />
<KAvatar src="/avatar.jpg" size="md" />`,
    filename: 'KAvatar.tsx',
    props: [
      { name: 'src', type: 'string', description: 'URL de imagen del avatar.' },
      { name: 'name', type: 'string', description: 'Nombre de usuario. Se generan las iniciales automáticamente (primeras 2).' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | number", default: "'md'", description: 'Tamaño del avatar. Acepta valor numérico en px.' },
      { name: 'shape', type: "'circle' | 'square'", default: "'circle'", description: 'Forma del avatar.' },
      { name: 'gap', type: 'number', default: '4', description: 'Distancia entre el borde y el texto de iniciales (px).' },
      { name: 'status', type: "'online' | 'offline' | 'busy' | 'away'", description: 'Indicador de presencia con punto de color.' },
      { name: 'icon', type: 'ReactNode', description: 'Icono a mostrar en lugar de imagen o iniciales.' },
    ],
    guidelines: [
      'Cuando hay imagen, usala. Si no, las iniciales se generan del nombre.',
      'El fondo de las iniciales usa color.brand.navy por defecto.',
      'Tamano sm para listas densas, md para headers, lg para perfiles.',
    ],
  },
  switch: {
    id: 'switch',
    name: 'KSwitch',
    description: 'Interruptor on/off con etiqueta opcional. Para configuraciones binarias.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <KSwitch label="Notificaciones activas" checked={true} onCheckedChange={() => {}} />
        <KSwitch label="Modo oscuro" checked={false} onCheckedChange={() => {}} />
        <KSwitch label="Desactivado" disabled checked={true} onCheckedChange={() => {}} />
        <KSwitch label="Tamano pequeno" size="sm" onCheckedChange={() => {}} />
      </div>
    ),
    playground: <SwitchPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Off</span><KSwitch /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>On</span><KSwitch checked /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Focus</span><div style={{ outline: `2px solid ${khorTokens.colors.brand.primary}`, outlineOffset: '2px', borderRadius: 999 }}><KSwitch checked /></div></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Disabled Off</span><KSwitch disabled /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Disabled On</span><KSwitch checked disabled /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Loading</span><KSwitch loading /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Navega.', 'Barra Espaciadora: Alterna (toggle).'],
      aria: ['role="switch" (nativamente mapeado por Radix).', 'aria-checked se sincroniza.'],
      contrast: 'AAA en el punto blanco sobre track activo',
      score: 100,
    },
    code: `import { KSwitch } from '@khor/design-system/atoms/index';

<KSwitch
  label="Notificaciones activas"
  checked={isActive}
  onCheckedChange={setIsActive}
/>`,
    filename: 'KSwitch.tsx',
    props: [
      { name: 'checked', type: 'boolean', description: 'Estado actual.' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Callback al cambiar.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva el switch.' },
      { name: 'label', type: 'string', description: 'Etiqueta descriptiva.' },
      { name: 'size', type: "'md' | 'sm'", default: "'md'", description: 'Tamano del switch.' },
    ],
    guidelines: ['Siempre incluye una etiqueta descriptiva.', 'Usa para preferencias binarias, no para acciones.'],
  },
  checkbox: {
    id: 'checkbox',
    name: 'KCheckbox',
    description: 'Casilla de verificacion para selecciones multiples o confirmaciones.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <KCheckbox label="Acepto los terminos y condiciones" checked={true} />
        <KCheckbox label="Suscribirse al newsletter" />
        <KCheckbox label="Seleccion parcial" checked="indeterminate" />
        <KCheckbox label="Desactivado" disabled />
      </div>
    ),
    playground: <CheckboxPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Off</span><KCheckbox /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>On</span><KCheckbox checked /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Indeterminate</span><KCheckbox checked="indeterminate" /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Focus</span><div style={{ outline: `2px solid ${khorTokens.colors.brand.primary}`, outlineOffset: '2px', borderRadius: 4 }}><KCheckbox checked /></div></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Disabled Off</span><KCheckbox disabled /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Disabled On</span><KCheckbox checked disabled /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Recibe foco.', 'Barra Espaciadora: Cambia estado y elimina modo indeterminado.'],
      aria: ['role="checkbox"', 'aria-checked soporta "true", "false" o "mixed".'],
      contrast: 'AA >3.0:1 bordes vacíos, AAA icono activo',
      score: 100,
    },
    code: `import { KCheckbox } from '@khor/design-system/atoms/index';

<KCheckbox
  label="Acepto los terminos"
  checked={accepted}
  onCheckedChange={setAccepted}
/>`,
    filename: 'KCheckbox.tsx',
    props: [
      { name: 'checked', type: "boolean | 'indeterminate'", description: 'Estado actual.' },
      { name: 'onCheckedChange', type: '(checked: boolean | "indeterminate") => void', description: 'Callback al cambiar.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva.' },
      { name: 'label', type: 'string', description: 'Etiqueta.' },
    ],
    guidelines: ['Usa indeterminate para "seleccionar todos" parcial.', 'Para opciones exclusivas, usa KRadio.'],
  },
  radio: {
    id: 'radio',
    name: 'KRadio',
    description: 'Grupo de opciones mutuamente excluyentes con soporte para layout vertical/horizontal y variante de boton.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Horizontal (default)</p>
          <KRadio options={[{ label: 'Empleado', value: '1' }, { label: 'Contratista', value: '2' }, { label: 'Becario', value: '3' }]} value="1" />
        </div>
        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Vertical</p>
          <KRadio options={[{ label: 'Nomina Quincenal', value: '1' }, { label: 'Nomina Mensual', value: '2' }]} value="1" direction="vertical" />
        </div>
        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Botones</p>
          <KRadio options={[{ label: 'Dia', value: 'd' }, { label: 'Semana', value: 'w' }, { label: 'Mes', value: 'm' }]} value="w" variant="button" />
        </div>
      </div>
    ),
    playground: <RadioPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KRadio options={[{ label: 'Unchecked', value: '1' }, { label: 'Checked', value: '2' }]} defaultValue="2" direction="vertical" />
        <KRadio options={[{ label: 'Disabled Off', value: '3', disabled: true }, { label: 'Disabled On', value: '4', disabled: true }]} defaultValue="4" direction="vertical" />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Up/Down/Left/Right: Mueve el foco al siguiente/previo item y lo selecciona.', 'Tab: Entra y sale del contenedor principal.'],
      aria: ['role="radiogroup" asignado al contenedor', 'role="radio" y aria-checked asignados a cada elemento.'],
      contrast: 'AAA en anillo indicador',
      score: 100,
    },
    code: `import { KRadio } from '@khor/design-system/atoms/index';

<KRadio
  options={[
    { label: 'Empleado', value: 'emp' },
    { label: 'Contratista', value: 'con' },
  ]}
  value={tipo}
  onValueChange={setTipo}
/>

// Variante de botones
<KRadio variant="button" options={...} />`,
    filename: 'KRadio.tsx',
    props: [
      { name: 'options', type: '{ label: string; value: string | number; disabled?: boolean }[]', required: true, description: 'Array de opciones del grupo de radio.' },
      { name: 'value', type: 'string', description: 'Valor actualmente seleccionado (controlado).' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Callback al cambiar la selección.' },
      { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Orientación del grupo de opciones.' },
      { name: 'variant', type: "'default' | 'button'", default: "'default'", description: 'Estilo visual: radio clásico o grupo de botones.' },
      { name: 'buttonStyle', type: "'solid' | 'outline'", default: "'solid'", description: 'Aplica solo cuando variant="button". solid=relleno, outline=solo borde.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del grupo de radio (aplica especialmente a buttons).' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita todas las opciones del grupo.' },
    ],
    guidelines: ['Máximo 5-6 opciones. Para más opciones, usa KSelectField.', 'variant="button" ideal para filtros y toggles de vista.', 'KRadioItem puede usarse standalone para casos personalizados.'],
  },
  tooltip: {
    id: 'tooltip',
    name: 'KTooltip',
    description: 'Informacion contextual al pasar el cursor. Usa la elevacion media (shadow md).',
    preview: (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <KTooltip title="Guardar cambios" placement="top">
          <KButton variant="primary" icon={<Save size={16} />}>Hover aqui</KButton>
        </KTooltip>
        <KTooltip title="Informacion adicional" placement="right">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: khorTokens.colors.brand.navy, cursor: 'help' }}>
            <Info size={16} /> Mas info
          </span>
        </KTooltip>
      </div>
    ),
    code: `import { KTooltip } from '@khor/design-system/atoms/index';

<KTooltip title="Guardar cambios" placement="top">
  <KButton variant="primary">Guardar</KButton>
</KTooltip>`,
    filename: 'KTooltip.tsx',
    props: [
      { name: 'title', type: 'string', required: true, description: 'Texto del tooltip.' },
      { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Posicion.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Elemento que activa el tooltip.' },
    ],
    playground: <TooltipPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, padding: '16px 0', alignItems: 'center', overflowX: 'auto' }}>
        <div style={{ padding: 12 }}>
          <KTooltip title="Posición Arriba" placement="top" open><KButton variant="outline">Arriba (Forzado)</KButton></KTooltip>
        </div>
        <div style={{ padding: 12 }}>
          <KTooltip title="Posición Abajo" placement="bottom" open><KButton variant="outline">Abajo (Forzado)</KButton></KTooltip>
        </div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Al recibir el foco por teclado, Tooltip se expande auto.'],
      aria: ['role="tooltip" asignado.', 'Se enlaza dinámicamente con aria-describedby al elemento desencadenador.'],
      contrast: 'AAA sobre UI oscura',
      score: 100,
    },
    guidelines: ['Maximo 60 caracteres por tooltip.', 'No uses para informacion critica — esa debe ser visible siempre.'],
  },
  progress: {
    id: 'progress',
    name: 'KProgress',
    description: 'Barra de progreso para indicar completitud de procesos, cargas o pasos.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <KProgress value={30} />
        <KProgress value={70} strokeColor={khorTokens.colors.brand.accent} />
        <KProgress value={100} status="success" />
        <KProgress value={50} status="exception" />
        <KProgress value={45} />
      </div>
    ),
    playground: <ProgressPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KProgress value={30} />
        <KProgress value={50} status="active" />
        <KProgress value={100} status="success" />
        <KProgress value={70} status="exception" />
      </div>
    ),
    a11ySummary: {
      keyboard: ['No interactivo. Funciona como indicador pasivo.'],
      aria: ['role="progressbar"', 'aria-valuenow, aria-valuemin, aria-valuemax manejados dinámicamente.'],
      contrast: 'AAA entre color de la barra (ej: #2E7D32) y track neutro.',
      score: 100,
    },
    code: `import { KProgress } from '@khor/design-system/atoms/index';

<KProgress value={75} />
<KProgress value={100} status="success" />
<KProgress value={30} strokeColor="#FF9500" />`,
    filename: 'KProgress.tsx',
    props: [
      { name: 'value', type: 'number', required: true, description: 'Porcentaje de progreso (0-100).' },
      { name: 'max', type: 'number', default: '100', description: 'Valor maximo.' },
      { name: 'status', type: "'success' | 'exception' | 'active'", description: 'Estado visual.' },
      { name: 'showInfo', type: 'boolean', default: 'true', description: 'Muestra el porcentaje.' },
      { name: 'strokeColor', type: 'string', description: 'Color personalizado de la barra.' },
    ],
    guidelines: ['Usa status="success" cuando llega a 100%.', 'strokeColor por defecto es el Rojo Khor primary.'],
  },
  typography: {
    id: 'typography',
    name: 'KTypography (KText)',
    description: 'Componente tipografico semantico que aplica la escala de fuentes Raleway del sistema. Soporta variantes de jerarquia y colores semanticos.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <KText variant="h1">Titulo H1 — 38px Bold</KText>
        <KText variant="h2">Titulo H2 — 30px Bold</KText>
        <KText variant="h3">Titulo H3 — 24px SemiBold</KText>
        <KText variant="body-lg">Body Large — 16px Regular. Para parrafos de lectura larga.</KText>
        <KText variant="body-md">Body Medium — 14px Regular. Texto estandar de interfaz.</KText>
        <KText variant="small">Small — 12px Medium. Etiquetas y captions.</KText>
        <KDivider />
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <KText variant="body-md" color="default">Default</KText>
          <KText variant="body-md" color="primary">Primary</KText>
          <KText variant="body-md" color="navy">Navy</KText>
          <KText variant="body-md" color="secondary">Secondary</KText>
          <KText variant="body-md" color="success">Success</KText>
          <KText variant="body-md" color="error">Error</KText>
          <KText variant="body-md" color="muted">Muted</KText>
        </div>
      </div>
    ),
    playground: <TypographyPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KText variant="h1">Display Principal (H1)</KText>
        <KText variant="h3" color="navy">Título de Sección (H3)</KText>
        <KText variant="body-lg" color="secondary">Texto de párrafo largo con legibilidad mejorada (Body Lg).</KText>
        <KText variant="body-md">Texto estándar en interfaz (Body Md).</KText>
        <KText variant="small" color="muted">Caption para metadatos o fechas.</KText>
      </div>
    ),
    a11ySummary: {
      keyboard: ['No interactivo.'],
      aria: ['Permite modificar tag con prop "as" (ej: as="h1" o as="p") para estructura semántica de documento perfecta.'],
      contrast: 'AAA nativo en color "default", "navy" y "secondary". AA en "muted".',
      score: 100,
    },
    code: `import { KText } from '@khor/design-system/atoms/index';

<KText variant="h1">Titulo Principal</KText>
<KText variant="h2" color="navy">Subtitulo</KText>
<KText variant="body-md">Texto de interfaz estandar.</KText>
<KText variant="small" color="muted">Caption o etiqueta.</KText>

// Personalizar tag HTML
<KText variant="body-md" as="span">Como span</KText>`,
    filename: 'KText.tsx',
    props: [
      { name: 'variant', type: "'h1' | 'h2' | 'h3' | 'body-lg' | 'body-md' | 'small' | 'caption'", default: "'body-md'", description: 'Nivel tipografico que define tamano, peso y line-height.' },
      { name: 'color', type: "'default' | 'secondary' | 'primary' | 'navy' | 'success' | 'error' | 'muted'", default: "'default'", description: 'Color semantico del texto.' },
      { name: 'as', type: 'string', description: 'Tag HTML personalizado (h1, span, div, etc).' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Contenido de texto.' },
    ],
    guidelines: [
      'Usa variant="h1" solo una vez por pagina.',
      'color="navy" para titulos y jerarquia alta.',
      'color="muted" para placeholders, captions y texto de baja prioridad.',
      'Fuente Raleway para todo. Plus Jakarta Sans disponible como alternativa para UI densa.',
    ],
    aiNotes: 'Al generar interfaces, usa la jerarquia tipografica correcta: h1 > h2 > h3 > body > small. No saltar niveles.',
  },
  alert: {
    id: 'alert',
    name: 'KAlert',
    description: 'Componente de alerta con 4 tipos semánticos (success, error, warning, info). Incluye icono automático, título, descripción y opción de cerrar.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <KAlert type="success" title="Operación exitosa" description="El empleado fue registrado correctamente en el sistema." closable />
        <KAlert type="error" title="Error de conexión" description="No se pudo conectar con el servidor. Intenta nuevamente." />
        <KAlert type="warning" title="Contrato por vencer" description="El contrato de Juan Pérez vence en 5 días." closable />
        <KAlert type="info" title="Actualización disponible" description="La versión 2.1 del sistema está lista para instalar." />
      </div>
    ),
    playground: <AlertPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KAlert type="success" title="Completado" description="Datos actualizados exitosamente." />
        <KAlert type="error" title="Error crítico" description="Fallo de conexión." closable />
        <KAlert type="warning" title="Atención" description="Su sesión expirará pronto." />
        <KAlert type="info" title="Aviso" description="Nuevo módulo disponible." />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Space/Enter: Descarta alerta si closable tiene foco.'],
      aria: ['role="alert" implementado para live regions (lector la anunciará inmediatamente).', 'aria-label en el icono de cierre.'],
      contrast: 'AAA sobre combinaciones fondo tintado / texto oscuro nativo de alerta.',
      score: 100,
    },
    code: `import { KAlert } from '@khor/design-system/atoms/index';

<KAlert type="success" title="Guardado exitoso" description="Los cambios fueron aplicados." closable />
<KAlert type="error" title="Error" description="No se pudo procesar la solicitud." />
<KAlert type="warning" title="Atención" description="Faltan campos obligatorios." />
<KAlert type="info" title="Info" description="Nueva actualización disponible." />`,
    filename: 'KAlert.tsx',
    props: [
      { name: 'type', type: "'success' | 'error' | 'warning' | 'info'", default: "'info'", description: 'Tipo semántico de la alerta.' },
      { name: 'title', type: 'string', required: true, description: 'Título de la alerta.' },
      { name: 'description', type: 'string', description: 'Descripción detallada.' },
      { name: 'closable', type: 'boolean', default: 'false', description: 'Permite cerrar la alerta.' },
      { name: 'showIcon', type: 'boolean', default: 'true', description: 'Muestra icono semántico.' },
      { name: 'onClose', type: '() => void', description: 'Callback al cerrar.' },
    ],
    guidelines: ['Usa para mensajes de feedback persistentes (no para notificaciones efímeras, usa KToast para eso).', 'El tipo debe coincidir con la semántica del mensaje.'],
    aiNotes: 'KAlert para mensajes de feedback que permanecen visibles. La IA debe elegir el tipo correcto según el contexto.',
  },
  skeleton: {
    id: 'skeleton',
    name: 'KSkeleton',
    description: 'Placeholder de carga que indica al usuario que el contenido está cargando. Soporta rectángulos, círculos y múltiples líneas de texto.',
    preview: (
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 300 }}>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Líneas de texto</p>
          <KSkeleton lines={3} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Círculo (avatar)</p>
          <KSkeleton circle height={48} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Rectángulo</p>
          <KSkeleton width={200} height={40} />
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <KSkeleton circle height={40} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <KSkeleton width={150} height={14} />
            <KSkeleton width={100} height={12} />
          </div>
        </div>
      </div>
    ),
    playground: <SkeletonPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <KSkeleton circle height={48} />
        <div style={{ width: '100%', maxWidth: 300 }}><KSkeleton lines={4} /></div>
        <KSkeleton width={150} height={32} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['No aplicable.'],
      aria: ['role="status" o aria-busy="true" recomendado para el contenedor padre mientras la carga ocurre.'],
      contrast: 'Animación pulsante cumple con directrices de destello sutil (sin parpadeos rápidos).',
      score: 100,
    },
    code: `import { KSkeleton } from '@khor/design-system/atoms/index';

<KSkeleton lines={3} />
<KSkeleton circle height={48} />
<KSkeleton width={200} height={40} />`,
    filename: 'KSkeleton.tsx',
    props: [
      { name: 'width', type: "number | string", default: "'100%'", description: 'Ancho del skeleton.' },
      { name: 'height', type: "number | string", default: '16', description: 'Alto del skeleton.' },
      { name: 'circle', type: 'boolean', description: 'Forma circular (para avatares).' },
      { name: 'lines', type: 'number', description: 'Número de líneas de texto (la última es más corta).' },
    ],
    guidelines: ['Usa para indicar carga de contenido, no para carga de página completa (usa KSpin para eso).'],
  },
  slider: {
    id: 'slider',
    name: 'KSlider',
    description: 'Control deslizante para seleccionar un valor numérico dentro de un rango. Basado en Radix UI Slider con tokens Khor.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 400 }}>
        <KSlider defaultValue={[30]} />
        <KSlider defaultValue={[75]} min={0} max={100} step={5} />
        <KSlider defaultValue={[50]} disabled />
      </div>
    ),
    playground: <SliderPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: '16px 8px', maxWidth: 400 }}>
        <div><KText variant="small" color="muted">Default</KText><KSlider defaultValue={[30]} /></div>
        <div><KText variant="small" color="muted">Disabled</KText><KSlider defaultValue={[60]} disabled /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Up/Right: Sube valor.', 'Down/Left: Baja valor.', 'Home/End: Valores extremos.'],
      aria: ['role="slider"', 'aria-valuenow, aria-valuemin, aria-valuemax inyectados.', 'aria-disabled cuando aplica.'],
      contrast: 'AAA sobre punto visual, AA track sobre fondo de tarjeta.',
      score: 95,
    },
    code: `import { KSlider } from '@khor/design-system/atoms/index';

<KSlider value={[volume]} onValueChange={(v) => setVolume(v[0])} min={0} max={100} step={1} />
<KSlider defaultValue={[50]} disabled />`,
    filename: 'KSlider.tsx',
    props: [
      { name: 'value', type: 'number[]', description: 'Valor controlado (array de numeros).' },
      { name: 'defaultValue', type: 'number[]', default: '[50]', description: 'Valor inicial.' },
      { name: 'min', type: 'number', default: '0', description: 'Valor mínimo.' },
      { name: 'max', type: 'number', default: '100', description: 'Valor máximo.' },
      { name: 'step', type: 'number', default: '1', description: 'Incremento.' },
      { name: 'onValueChange', type: '(value: number[]) => void', description: 'Callback al cambiar.' },
      { name: 'disabled', type: 'boolean', description: 'Desactiva el slider.' },
      { name: 'showValue', type: 'boolean', default: 'true', description: 'Muestra el valor actual.' },
    ],
    guidelines: ['Usa para valores continuos como volumen, brillo, porcentaje.', 'Para valores discretos con pocas opciones, usa KRadio variant="button".'],
  },
  rate: {
    id: 'rate',
    name: 'KRate',
    description: 'Componente de calificación con estrellas. Permite al usuario seleccionar una puntuación de 1 a N.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KRate defaultValue={3} />
        <KRate defaultValue={4} count={5} />
        <KRate defaultValue={2} disabled />
      </div>
    ),
    playground: <RatePlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div><KText variant="small" color="muted">Standard</KText><KRate defaultValue={3} /></div>
        <div><KText variant="small" color="muted">Half Stars / Disabled</KText><KRate defaultValue={2.5} disabled allowHalf /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Left/Right: Mueve foco individual entre estrellas.', 'Enter/Space: Confirma calificación.'],
      aria: ['Construido internamente como radiogroup o slider bidireccional.', 'aria-label global del contenedor recomendado.'],
      contrast: 'AAA en estado seleccionado (Accent: Naranja Khor).',
      score: 90,
    },
    code: `import { KRate } from '@khor/design-system/atoms/index';

<KRate value={rating} onChange={setRating} />
<KRate defaultValue={4} count={10} />
<KRate defaultValue={3} disabled />`,
    filename: 'KRate.tsx',
    props: [
      { name: 'value', type: 'number', description: 'Valor controlado.' },
      { name: 'defaultValue', type: 'number', default: '0', description: 'Valor inicial.' },
      { name: 'count', type: 'number', default: '5', description: 'Número de estrellas.' },
      { name: 'onChange', type: '(value: number) => void', description: 'Callback al seleccionar.' },
      { name: 'disabled', type: 'boolean', description: 'Solo lectura.' },
      { name: 'allowHalf', type: 'boolean', default: 'false', description: 'Permite medias estrellas.' },
    ],
    guidelines: ['Usa para evaluaciones, feedback de satisfacción.', 'El color accent (naranja) se usa por convención para estrellas.'],
  },
  spin: {
    id: 'spin',
    name: 'KSpin',
    description: 'Indicador de carga circular con texto opcional. Para estados de carga de página o secciones completas.',
    preview: (
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <KSpin size="sm" />
        <KSpin size="md" />
        <KSpin size="lg" />
        <KSpin size="md" color={khorTokens.colors.brand.navy} />
      </div>
    ),
    playground: <SpinPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><KText variant="small" color="muted">Small</KText><KSpin size="sm" /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><KText variant="small" color="muted">Base</KText><KSpin size="md" /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><KText variant="small" color="muted">Large</KText><KSpin size="lg" /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['No aplicable.'],
      aria: ['role="status" aplicable al contenedor padre.'],
      contrast: 'AAA asegurada en texto tip.',
      score: 100,
    },
    code: `import { KSpin } from '@khor/design-system/atoms/index';

<KSpin size="md" />
<KSpin size="lg" />
<KSpin size="sm" color="#051758" />`,
    filename: 'KSpin.tsx',
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Tamaño del spinner.' },
      { name: 'color', type: 'string', default: 'khor.primary', description: 'Color del spinner.' },
    ],
    guidelines: ['Usa para carga de secciones o páginas completas.', 'Para carga de contenido específico, usa KSkeleton.'],
  },
  divider: {
    id: 'divider',
    name: 'KDivider',
    description: 'Separador visual horizontal para dividir secciones de contenido. Usa el color neutral.200 del sistema.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <KText variant="body-md">Seccion superior</KText>
        <KDivider />
        <KText variant="body-md">Seccion inferior</KText>
        <KDivider />
        <KText variant="small" color="muted">Texto adicional</KText>
      </div>
    ),
    code: `import { KDivider } from '@khor/design-system/atoms/index';

<div>
  <p>Contenido A</p>
  <KDivider />
  <p>Contenido B</p>
</div>`,
    filename: 'KDivider.tsx',
    props: [
      { name: 'className', type: 'string', description: 'Clase CSS adicional.' },
    ],
    playground: <DividerPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KDivider />
        <KDivider dashed />
        <KDivider orientation="left">Sección 1</KDivider>
      </div>
    ),
    a11ySummary: {
      keyboard: ['No interactivo.'],
      aria: ['role="separator" detectado nativamente por lectores de pantalla.'],
      contrast: 'Decorative (Contraste visual AA).',
      score: 100,
    },
    guidelines: ['Usa para separar secciones dentro de cards o formularios.', 'No abuses de dividers — el espaciado y agrupacion son mas efectivos.'],
  },
  textarea: {
    id: 'textarea',
    name: 'KTextArea',
    description: 'Area de texto multilinea con soporte para contador de caracteres, longitud maxima, estados de error y redimensionamiento vertical.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <KTextArea placeholder="Escribe una descripcion..." rows={3} maxLength={200} />
        <KTextArea placeholder="Con error" error="Este campo es obligatorio" rows={2} />
        <KTextArea placeholder="Desactivado" disabled rows={2} />
      </div>
    ),
    playground: <TextAreaPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
        <div style={{ minWidth: 150 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500], display: 'block', marginBottom: 8 }}>Default</span><KTextArea placeholder="Texto..." rows={2} /></div>
        <div style={{ minWidth: 150 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500], display: 'block', marginBottom: 8 }}>Focus</span><div style={{ outline: `2px solid ${khorTokens.colors.brand.primary}`, outlineOffset: 0, borderRadius: khorTokens.radius.md }}><KTextArea placeholder="Texto..." rows={2} /></div></div>
        <div style={{ minWidth: 150 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500], display: 'block', marginBottom: 8 }}>Disabled</span><KTextArea placeholder="No disponible" disabled rows={2} /></div>
        <div style={{ minWidth: 150 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500], display: 'block', marginBottom: 8 }}>Error</span><KTextArea value="Pellentesque" error="Excede máximo" rows={2} /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Navega adentro/fuera.', 'Enter: Salto de línea.'],
      aria: ['aria-invalid se enciende automáticamente.', 'aria-describedby apunta al texto de error.'],
      contrast: 'AA textos grises, AAA texto negro',
      score: 95,
    },
    code: `import { KTextArea } from '@khor/design-system/atoms/index';

<KTextArea
  placeholder="Descripcion..."
  rows={4}
  maxLength={500}
/>

<KTextArea
  placeholder="Campo obligatorio"
  error="Este campo es obligatorio"
/>`,
    filename: 'KTextArea.tsx',
    props: [
      { name: 'placeholder', type: 'string', description: 'Texto placeholder.' },
      { name: 'rows', type: 'number', default: '4', description: 'Numero de filas visibles.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva el textarea.' },
      { name: 'value', type: 'string', description: 'Valor controlado.' },
      { name: 'onChange', type: '(e) => void', description: 'Callback al cambiar.' },
      { name: 'error', type: 'string', description: 'Mensaje de error.' },
      { name: 'maxLength', type: 'number', description: 'Longitud maxima de caracteres.' },
    ],
    guidelines: ['Usa showCount con maxLength para campos con limite de caracteres.', 'rows=3-4 para campos cortos, 6+ para descripciones largas.'],
  },
  /* ═══ ÁTOMOS EXTENDIDOS (Wave 3) ═══ */
  'button-group': { id: 'button-group', name: 'KButtonGroup', description: 'Agrupa botones relacionados en una fila unificada con bordes compartidos o espaciado controlado.',
    preview: (<KButtonGroup><KButton variant="secondary" size="sm">Anterior</KButton><KButton variant="secondary" size="sm">Siguiente</KButton></KButtonGroup>),
    playground: <ButtonGroupPlayground />,
    code: `<KButtonGroup>\n  <KButton variant="secondary">Anterior</KButton>\n  <KButton variant="secondary">Siguiente</KButton>\n</KButtonGroup>`, filename: 'KButtonGroup.tsx',
    props: [{ name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Espaciado entre botones.' }, { name: 'direction', type: "'horizontal' | 'vertical'", description: 'Flujo.' }],
    guidelines: ['Usa para acciones relacionadas como paginacion o vistas.']
  },
  'search-input': { id: 'search-input', name: 'KSearchInput', description: 'Input de búsqueda unificado con icono y botón de limpieza.',
    preview: (<div style={{ maxWidth: 300 }}><KSearchInput placeholder="Buscar..." /></div>),
    playground: <SearchInputPlayground />,
    code: `<KSearchInput onSearch={(v) => console.log(v)} />`, filename: 'KSearchInput.tsx',
    props: [{ name: 'placeholder', type: 'string', description: 'Placeholder.' }, { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Tamaño.' }, { name: 'onSearch', type: '(v: string) => void', description: 'Callback de búsqueda.' }],
    guidelines: ['Centralizado en Atoms para uso global.', 'Usa para búsquedas primarias en el sistema.']
  },
  'label': { id: 'label', name: 'KLabel', description: 'Etiqueta para campos de formulario con indicador de campo obligatorio y tooltip de informacion.',
    preview: (<KLabel required info="Ayuda">Campo</KLabel>),
    playground: <LabelPlayground />,
    code: `<KLabel required info="Ingresa un correo institucional">Email</KLabel>`, filename: 'KLabel.tsx',
    props: [{ name: 'children', type: 'ReactNode', required: true, description: 'Texto.' }, { name: 'required', type: 'boolean', description: 'Muestra asterisco.' }, { name: 'info', type: 'string', description: 'Texto del icono de informacion.' }],
    guidelines: ['Usa siempre para mejorar la accesibilidad de los inputs.']
  },
  'input-password': { id: 'input-password', name: 'KInputPassword', description: 'Input de contraseña con toggle de visibilidad (ojo abierto/cerrado).',
    preview: (<div style={{ maxWidth: 300 }}><KInputPassword placeholder="Ingresa tu contraseña" /></div>),
    playground: <PasswordPlayground />,
    code: `<KInputPassword value={pass} onChange={setPass} />`, filename: 'KInputPassword.tsx',
    props: [{ name: 'value', type: 'string', description: 'Valor.' }, { name: 'onChange', type: '(v) => void', description: 'Callback.' }, { name: 'error', type: 'string', description: 'Error.' }],
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KInputPassword placeholder="Password..." />
        <KInputPassword placeholder="Obligatorio" error="Mínimo 8 caracteres" />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Space/Enter: Alterna visibilidad en el botón del ojo.'],
      aria: ['aria-pressed o title refleja visualmente el estado de revelación.'],
      contrast: 'AAA',
      score: 100,
    },
    guidelines: ['Siempre incluye el toggle de visibilidad.']
  },
  'float-button': { id: 'float-button', name: 'KFloatButton', description: 'Botón flotante (FAB) fijo en la esquina de la pantalla. Ideal para acciones principales.',
    preview: (<div style={{ position: 'relative', height: 80, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}><KText variant="small" color="muted" className="p-4">El botón flotante aparece fijo en la esquina inferior derecha.</KText></div>),
    code: `<KFloatButton icon={<Plus />} onClick={handleAdd} tooltip="Nuevo empleado" />`, filename: 'KFloatButton.tsx',
    props: [{ name: 'icon', type: 'ReactNode', description: 'Ícono.' }, { name: 'onClick', type: '() => void', description: 'Callback.' }, { name: 'type', type: "'primary'|'default'", description: 'Estilo.' }],
    stateShowcase: (
      <div style={{ position: 'relative', height: 100, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ position: 'absolute', bottom: 16, right: 16 }}><KFloatButton icon={<Plus />} tooltip="Añadir" /></div>
        <div style={{ position: 'absolute', bottom: 16, right: 80 }}><KFloatButton type="default" icon={<Search />} tooltip="Buscar" /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Es alcanzable por orden del DOM.'],
      aria: ['Se provee el aria-label desde tooltip internamente.'],
      contrast: 'AAA sobre UI general',
      score: 100,
    },
    guidelines: ['Solo un FAB por pantalla. Usa para la acción más importante.']
  },
  'image': { id: 'image', name: 'KImage', description: 'Imagen con preview lightbox al hacer clic, fallback para errores de carga y bordes redondeados.',
    preview: (<KImage src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=150&fit=crop" width={200} height={150} alt="Equipo" />),
    code: `<KImage src="/photo.jpg" width={200} height={150} preview />`, filename: 'KImage.tsx',
    props: [{ name: 'src', type: 'string', required: true, description: 'URL.' }, { name: 'preview', type: 'boolean', default: 'true', description: 'Lightbox.' }, { name: 'fallback', type: 'string', description: 'Fallback.' }],
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Normal</span><KImage src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop" width={100} height={100} /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Error Fallback</span><KImage src="error.jpg" fallback="https://placehold.co/100x100?text=Error" width={100} height={100} /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Space/Enter: Si preview=true activa el lightbox.'],
      aria: ['Requiere prop alt explícito nativamente.'],
      contrast: 'Decorative',
      score: 100,
    },
    guidelines: ['Usa preview para imágenes que necesitan verse en grande.']
  },
  'affix': { id: 'affix', name: 'KAffix', description: 'Envuelve contenido para fijarlo al viewport al hacer scroll. Útil para toolbars o filtros.',
    preview: (<div style={{ padding: 16, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}><KText variant="body-md" color="secondary">KAffix fija su contenido al hacer scroll. Usa offsetTop para definir la distancia desde arriba.</KText></div>),
    code: `<KAffix offsetTop={64}>\n  <Toolbar />\n</KAffix>`, filename: 'KAffix.tsx',
    props: [{ name: 'offsetTop', type: 'number', description: 'Distancia desde arriba para activar.' }, { name: 'offsetBottom', type: 'number', description: 'Distancia desde abajo.' }],
    guidelines: ['offsetTop=64 para respetar el header de 64px.']
  },
  'space': { 
    id: 'space', name: 'KSpace', 
    description: 'Componente de layout para espaciar elementos con gap consistente. Soporta dirección, wrap, splitters y tamaños personalizados.',
    preview: (
      <KSpace size="md" wrap split={<KDivider />}>
        <KText variant="body-md">Item A</KText>
        <KText variant="body-md">Item B</KText>
        <KText variant="body-md">Item C</KText>
      </KSpace>
    ),
    playground: <SpacePlayground />,
    code: `import { KSpace, KDivider } from '@khor/design-system/atoms/index';\n\n<KSpace direction="horizontal" size="md" wrap split={<KDivider />}>\n  <KButton>A</KButton>\n  <KButton>B</KButton>\n</KSpace>`, 
    filename: 'KSpace.tsx',
    props: [
      { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Dirección del flujo.' },
      { name: 'size', type: "number | 'sm' | 'md' | 'lg' | [number, number]", default: "'md'", description: 'Espacio entre elementos.' },
      { name: 'align', type: "'start' | 'end' | 'center' | 'baseline'", description: 'Alineación de items.' },
      { name: 'wrap', type: 'boolean', default: 'false', description: 'Permite salto de línea.' },
      { name: 'split', type: 'ReactNode', description: 'Elemento separador entre items.' },
    ],
    guidelines: ['Usa size="middle" (16px) por defecto para la mayoría de layouts.', 'El split con KDivider vertical es ideal para barras de herramientas.'],
  },
  'qrcode': { id: 'qrcode', name: 'KQRCode', description: 'Generador visual de código QR a partir de texto o URL. Usa canvas para renderizado.',
    preview: (<div style={{ display: 'flex', gap: 16 }}><KQRCode value="https://khor.app" size={100} /><KQRCode value="https://khor.app/empleados" size={80} color="#051758" /></div>),
    code: `<KQRCode value="https://khor.app" size={128} />`, filename: 'KQRCode.tsx',
    props: [{ name: 'value', type: 'string', required: true, description: 'Texto o URL a codificar.' }, { name: 'size', type: 'number', default: '128', description: 'Tamaño en px.' }, { name: 'color', type: 'string', description: 'Color de los módulos.' }],
    guidelines: ['Nota: patrón visual representativo. Para QR reales, integra una librería como qrcode.']
  },
  'watermark': { id: 'watermark', name: 'KWatermark', description: 'Overlay de marca de agua sobre cualquier contenido. Útil para documentos confidenciales o previews.',
    preview: (<KWatermark text="CONFIDENCIAL"><div style={{ padding: 32, backgroundColor: khorTokens.colors.neutral[50], borderRadius: khorTokens.radius.lg, minHeight: 120 }}><KText variant="body-md">Este contenido tiene marca de agua.</KText></div></KWatermark>),
    code: `<KWatermark text="BORRADOR">\n  <DocumentPreview />\n</KWatermark>`, filename: 'KWatermark.tsx',
    props: [{ name: 'text', type: 'string', required: true, description: 'Texto de la marca de agua.' }, { name: 'fontSize', type: 'number', default: '14', description: 'Tamaño de fuente.' }, { name: 'rotate', type: 'number', default: '-22', description: 'Ángulo de rotación.' }],
    guidelines: ['Usa para documentos confidenciales o borradores.']
  },
  'flex': {
    id: 'flex', name: 'KFlex',
    description: 'Contenedor Flex moderno para alinear y distribuir elementos fácilmente.',
    preview: (
      <KFlex gap="md" align="center" justify="space-between" style={{ padding: 16, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg, width: '100%' }}>
        <KText variant="body-md">Izquierda</KText>
        <KFlex gap="sm">
          <KButton size="sm">Aceptar</KButton>
          <KButton size="sm" variant="outline">Cancelar</KButton>
        </KFlex>
      </KFlex>
    ),
    code: `<KFlex gap="md" align="center" justify="space-between">\n  <div>Item 1</div>\n  <div>Item 2</div>\n</KFlex>`,
    filename: 'KFlex.tsx',
    props: [
      { name: 'vertical', type: 'boolean', default: 'false', description: 'Dirección vertical (column).' },
      { name: 'wrap', type: 'boolean | string', description: 'Propiedad flex-wrap.' },
      { name: 'justify', type: 'string', description: 'justify-content.' },
      { name: 'align', type: 'string', description: 'align-items.' },
      { name: 'gap', type: "string | number | [number, number]", description: 'Espaciado entre items.' },
    ],
    guidelines: ['Uso preferente sobre KSpace para layouts complejos o distribuciones no estándar.']
  },
  'grid': {
    id: 'grid', name: 'KGrid (Row/Col)',
    description: 'Sistema de rejilla responsiva de 24 columnas (Grid System) para crear layouts complejos que se adaptan a cualquier resolución.',
    preview: (
      <div style={{ width: '100%' }}>
      <div style={{ width: '100%' }}>
        <KRow gutter={[16, 16]}>
          <KCol span={8}><div style={{ background: khorTokens.colors.brand.navy, color: '#fff', padding: '16px', textAlign: 'center', borderRadius: 4 }}>Col 8/24</div></KCol>
          <KCol span={8}><div style={{ background: khorTokens.colors.brand.navy, color: '#fff', padding: '16px', textAlign: 'center', borderRadius: 4 }}>Col 8/24</div></KCol>
          <KCol span={8}><div style={{ background: khorTokens.colors.brand.navy, color: '#fff', padding: '16px', textAlign: 'center', borderRadius: 4 }}>Col 8/24</div></KCol>
        </KRow>
      </div>
      </div>
    ),
    code: `import { KRow, KCol } from '@khor/design-system/atoms/index';\n\n<KRow gutter={[16, 16]}>\n  <KCol span={12}>\n    <Card />\n  </KCol>\n</KRow>`,
    filename: 'KGrid/index.tsx',
    props: [
      { name: 'gutter', type: 'number | [number, number]', description: 'Espaciado entre columnas (horizontal, vertical).' },
      { name: 'span', type: 'number', description: 'Número de columnas a ocupar (1-24) para KCol.' },
      { name: 'xs, sm, md, lg, xl, xxl', type: 'number | object', description: 'Ancho responsivo para KCol (Proximamente).' },
      { name: 'offset', type: 'number', description: 'Número de columnas a desplazar hacia la derecha.' },
    ],
    guidelines: ['Usa gutters múltiplos de 8 (ej. 16, 24).', 'Ideal para dashboards y formularios multi-columna.']
  },
};

export function AtomsPage() {
  const { id } = useParams<{ id: string }>();
  const atom = id ? atoms[id] : null;

  if (!atom) {
    return (
      <div style={{ textAlign: 'center', padding: 64, fontFamily: khorTokens.typography.fontPrimary }}>
        <KText variant="h2" color="navy">Átomo no encontrado</KText>
        <KText variant="body-md" color="secondary">Selecciona un átomo del menú lateral.</KText>
      </div>
    );
  }

  return (
    <ComponentDoc
      name={atom.name}
      category="Atomo"
      description={atom.description}
      preview={atom.preview}
      playground={atom.playground}
      code={atom.code}
      filename={atom.filename}
      props={atom.props}
      guidelines={atom.guidelines}
      aiNotes={atom.aiNotes}
      stateShowcase={atom.stateShowcase}
      a11ySummary={atom.a11ySummary}
    />
  );
}