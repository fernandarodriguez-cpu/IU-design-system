/**
 * AtomsPage — Documentacion de todos los atomos del sistema Khor
 */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { ComponentDoc } from '../components/docs/ComponentDoc';
import type { PropDef } from '../components/docs/ComponentDoc';
import {
  KButton, KInput, KTextArea, KBadge, KTag, KAvatar,
  KSwitch, KCheckbox, KRadio, KTooltip, KProgress, KText, KDivider,
  KAlert, KSkeleton, KSlider, KRate, KSpin,
} from '../components/design-system/atoms';
import {
  Plus, Save, Trash2, Download, Mail, Lock, User,
  Bell, Star, Heart, Search, AlertCircle, Info,
} from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';

/* ─── Playground Wrappers ───────────────────── */
function ButtonPlayground() {
  const [variant, setVariant] = useState<any>('primary');
  const [size, setSize] = useState<any>('md');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block', marginBottom: 4 }}>Variante</label>
            <select value={variant} onChange={(e) => setVariant(e.target.value)} style={{ padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' }}>
              {['primary', 'secondary', 'outline', 'ghost', 'danger', 'navy'].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block', marginBottom: 4 }}>Tamano</label>
            <select value={size} onChange={(e) => setSize(e.target.value)} style={{ padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' }}>
              {['sm', 'md', 'lg'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} /> Loading
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled
          </label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KButton variant={variant} size={size} loading={loading} disabled={disabled} icon={<Save size={16} />}>
          Guardar Cambios
        </KButton>
      </div>
    </div>
  );
}

function InputPlayground() {
  const [val, setVal] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={{ fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block', marginBottom: 4 }}>Mensaje de Error</label>
            <input value={error} onChange={(e) => setError(e.target.value)} placeholder="Dejar vacio para sin error" style={{ padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' }} />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled
          </label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 12, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KInput placeholder="Escribe aqui..." prefix={<Mail size={16} />} value={val} onChange={(e) => setVal(e.target.value)} error={error || undefined} disabled={disabled} allowClear />
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

function TagPlayground() {
  const [color, setColor] = useState<any>('primary');
  const [closable, setClosable] = useState(false);
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
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KTag color={color} closable={closable} onClose={() => {}}>{text}</KTag>
      </div>
    </div>
  );
}

function AvatarPlayground() {
  const [size, setSize] = useState<any>('md');
  const [status, setStatus] = useState<any>('online');
  const [name, setName] = useState('Maria Garcia');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Nombre</label><input value={name} onChange={(e) => setName(e.target.value)} style={sel}/></div>
          <div><label style={ctrl}>Tamano</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Estado</label><select value={status} onChange={(e) => setStatus(e.target.value)} style={sel}>{['online','offline','busy','away','none'].map(s=><option key={s}>{s}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KAvatar name={name} size={size} status={status === 'none' ? undefined : status} />
      </div>
    </div>
  );
}

function SwitchPlayground() {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [sizeS, setSizeS] = useState<any>('default');
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={{ fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block', marginBottom: 4 }}>Tamano</label><select value={sizeS} onChange={(e) => setSizeS(e.target.value)} style={sel}>{['default','small'].map(s=><option key={s}>{s}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSwitch label="Notificaciones activas" checked={checked} onChange={setChecked} disabled={disabled} size={sizeS} />
      </div>
    </div>
  );
}

function CheckboxPlayground() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [disabled, setDisabled] = useState(false);
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={indeterminate} onChange={(e) => setIndeterminate(e.target.checked)} /> Indeterminate</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KCheckbox label="Acepto los terminos" checked={checked} onChange={() => setChecked(!checked)} indeterminate={indeterminate} disabled={disabled} />
      </div>
    </div>
  );
}

function RadioPlayground() {
  const [value, setValue] = useState('1');
  const [direction, setDirection] = useState<any>('horizontal');
  const [variant, setVariant] = useState<any>('default');
  const [disabled, setDisabled] = useState(false);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Variante</label><select value={variant} onChange={(e) => setVariant(e.target.value)} style={sel}>{['default','button'].map(v=><option key={v}>{v}</option>)}</select></div>
          <div><label style={ctrl}>Direccion</label><select value={direction} onChange={(e) => setDirection(e.target.value)} style={sel}>{['horizontal','vertical'].map(d=><option key={d}>{d}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KRadio options={[{label:'Empleado',value:'1'},{label:'Contratista',value:'2'},{label:'Becario',value:'3'}]} value={value} onChange={(v) => setValue(v)} direction={direction} variant={variant} disabled={disabled} />
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
          <div><label style={ctrl}>Porcentaje: {percent}%</label><input type="range" min={0} max={100} value={percent} onChange={(e) => setPercent(Number(e.target.value))} style={{ width: '100%' }} /></div>
          <div><label style={ctrl}>Estado</label><select value={status} onChange={(e) => setStatus(e.target.value)} style={sel}>{['normal','success','exception','active'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Tamano</label><select value={sizeP} onChange={(e) => setSizeP(e.target.value)} style={sel}>{['default','small'].map(s=><option key={s}>{s}</option>)}</select></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%', maxWidth: 300 }}><KProgress percent={percent} status={status === 'normal' ? undefined : status} size={sizeP} /></div>
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
          <div><label style={ctrl}>Variante</label><select value={variant} onChange={(e) => setVariant(e.target.value)} style={sel}>{['h1','h2','h3','body-lg','body-md','small','caption'].map(v=><option key={v}>{v}</option>)}</select></div>
          <div><label style={ctrl}>Color</label><select value={color} onChange={(e) => setColor(e.target.value)} style={sel}>{['default','primary','navy','secondary','success','error','muted'].map(c=><option key={c}>{c}</option>)}</select></div>
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
  const [title, setTitle] = useState('Titulo de alerta');
  const [desc, setDesc] = useState('Descripcion detallada del mensaje.');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tipo</label><select value={type} onChange={(e) => setType(e.target.value)} style={sel}>{['success','error','warning','info'].map(t=><option key={t}>{t}</option>)}</select></div>
          <div><label style={ctrl}>Titulo</label><input value={title} onChange={(e) => setTitle(e.target.value)} style={sel}/></div>
          <div><label style={ctrl}>Descripcion</label><input value={desc} onChange={(e) => setDesc(e.target.value)} style={sel}/></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={closable} onChange={(e) => setClosable(e.target.checked)} /> Closable</label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 320, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KAlert type={type} title={title} description={desc} closable={closable} />
      </div>
    </div>
  );
}

function SkeletonPlayground() {
  const [lines, setLines] = useState(3);
  const [circle, setCircle] = useState(false);
  const [w, setW] = useState(200);
  const [h, setH] = useState(40);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={circle} onChange={(e) => setCircle(e.target.checked)} /> Circulo</label>
          {!circle && <div><label style={ctrl}>Lineas: {lines}</label><input type="range" min={1} max={6} value={lines} onChange={(e) => setLines(Number(e.target.value))} style={{ width: '100%' }} /></div>}
          <div><label style={ctrl}>Ancho: {w}px</label><input type="range" min={50} max={400} value={w} onChange={(e) => setW(Number(e.target.value))} style={{ width: '100%' }} /></div>
          <div><label style={ctrl}>Alto: {h}px</label><input type="range" min={12} max={100} value={h} onChange={(e) => setH(Number(e.target.value))} style={{ width: '100%' }} /></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        {circle ? <KSkeleton circle height={h} /> : <KSkeleton lines={lines} width={w} />}
      </div>
    </div>
  );
}

function SliderPlayground() {
  const [value, setValue] = useState(50);
  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Step</label><select value={step} onChange={(e) => setStep(Number(e.target.value))} style={sel}>{[1,5,10,25].map(s=><option key={s} value={s}>{s}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Valor: {value}</p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%', maxWidth: 300 }}><KSlider value={value} onChange={setValue} min={0} max={100} step={step} disabled={disabled} /></div>
      </div>
    </div>
  );
}

function RatePlayground() {
  const [value, setValue] = useState(3);
  const [count, setCount] = useState(5);
  const [sizeR, setSizeR] = useState(24);
  const [disabled, setDisabled] = useState(false);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Estrellas: {count}</label><input type="range" min={3} max={10} value={count} onChange={(e) => setCount(Number(e.target.value))} style={{ width: '100%' }} /></div>
          <div><label style={ctrl}>Tamano: {sizeR}px</label><input type="range" min={16} max={40} value={sizeR} onChange={(e) => setSizeR(Number(e.target.value))} style={{ width: '100%' }} /></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Valor: {value}</p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KRate value={value} onChange={setValue} count={count} size={sizeR} disabled={disabled} />
      </div>
    </div>
  );
}

function TextAreaPlayground() {
  const [val, setVal] = useState('');
  const [rows, setRows] = useState(4);
  const [maxLen, setMaxLen] = useState(200);
  const [showCount, setShowCount] = useState(true);
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Filas: {rows}</label><input type="range" min={2} max={8} value={rows} onChange={(e) => setRows(Number(e.target.value))} style={{ width: '100%' }} /></div>
          <div><label style={ctrl}>Max caracteres: {maxLen}</label><input type="range" min={50} max={500} step={50} value={maxLen} onChange={(e) => setMaxLen(Number(e.target.value))} style={{ width: '100%' }} /></div>
          <div><label style={ctrl}>Error</label><input value={error} onChange={(e) => setError(e.target.value)} placeholder="Dejar vacio" style={sel} /></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showCount} onChange={(e) => setShowCount(e.target.checked)} /> Mostrar contador</label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 320, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KTextArea placeholder="Escribe aqui..." rows={rows} maxLength={maxLen} showCount={showCount} error={error || undefined} disabled={disabled} value={val} onChange={(e) => setVal(e.target.value)} />
      </div>
    </div>
  );
}

function SpinPlayground() {
  const [sizeS, setSizeS] = useState<any>('md');
  const [tip, setTip] = useState('Cargando...');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tamano</label><select value={sizeS} onChange={(e) => setSizeS(e.target.value)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Texto</label><input value={tip} onChange={(e) => setTip(e.target.value)} style={sel}/></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSpin size={sizeS} tip={tip || undefined} />
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
          KDivider es un componente puramente visual sin props configurables mas alla de className. Se usa para separar secciones de contenido en cards, formularios y listas.
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

/* ─── Component Registry ────────────────────── */
interface AtomEntry {
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

const atoms: Record<string, AtomEntry> = {
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
    code: `import { KButton } from '@khor/design-system/atoms';

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
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'navy'", default: "'primary'", description: 'Variante visual del boton.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamano del boton.' },
      { name: 'icon', type: 'ReactNode', description: 'Icono Lucide a mostrar. Tamano recomendado: 16px.' },
      { name: 'iconPosition', type: "'start' | 'end'", default: "'start'", description: 'Posicion del icono.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Muestra spinner de carga.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva el boton (greyscale + 50% opacity).' },
      { name: 'block', type: 'boolean', default: 'false', description: 'Ancho completo.' },
      { name: 'onClick', type: '() => void', description: 'Callback al hacer click.' },
      { name: 'children', type: 'ReactNode', required: true, description: 'Contenido del boton.' },
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
        <KInput placeholder="Con limpiar" allowClear defaultValue="Texto limpiable" />
        <KInput placeholder="Contrasena" type="password" prefix={<Lock size={16} />} />
        <KInput placeholder="Con error" error="Este campo es obligatorio" />
        <KInput placeholder="Desactivado" disabled />
        <KTextArea placeholder="Area de texto multilinea..." rows={3} showCount maxLength={200} />
      </div>
    ),
    playground: <InputPlayground />,
    code: `import { KInput, KTextArea } from '@khor/design-system/atoms';

<KInput
  placeholder="Email"
  prefix={<Mail size={16} />}
  allowClear
/>

<KInput
  type="password"
  placeholder="Contrasena"
  prefix={<Lock size={16} />}
/>

<KInput
  placeholder="Campo con error"
  error="Este campo es obligatorio"
/>

<KTextArea
  placeholder="Descripcion..."
  rows={4}
  showCount
  maxLength={500}
/>`,
    filename: 'KInput.tsx',
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamano del input.' },
      { name: 'placeholder', type: 'string', description: 'Texto placeholder.' },
      { name: 'prefix', type: 'ReactNode', description: 'Icono o elemento al inicio.' },
      { name: 'suffix', type: 'ReactNode', description: 'Icono o elemento al final.' },
      { name: 'error', type: 'string', description: 'Mensaje de error. Activa estado visual de error.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva el input.' },
      { name: 'type', type: "'text' | 'password' | 'number' | 'email'", default: "'text'", description: 'Tipo de input HTML.' },
      { name: 'allowClear', type: 'boolean', description: 'Muestra boton de limpiar.' },
      { name: 'onChange', type: '(e) => void', description: 'Callback al cambiar valor.' },
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
    code: `import { KBadge } from '@khor/design-system/atoms';

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
    code: `import { KTag } from '@khor/design-system/atoms';

<KTag color="primary">Departamento RH</KTag>
<KTag color="navy">Gerencia</KTag>
<KTag color="success">Aprobado</KTag>
<KTag color="primary" closable onClose={() => {}}>Removible</KTag>`,
    filename: 'KTag.tsx',
    props: [
      { name: 'color', type: "'primary' | 'navy' | 'accent' | 'success' | 'error' | 'warning' | 'default'", default: "'default'", description: 'Color semantico del tag.' },
      { name: 'closable', type: 'boolean', default: 'false', description: 'Permite cerrar/eliminar el tag.' },
      { name: 'onClose', type: '() => void', description: 'Callback al cerrar.' },
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
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <KAvatar name="Maria Garcia" size="sm" status="online" />
        <KAvatar name="Juan Perez" size="md" status="busy" />
        <KAvatar name="Ana Lopez" size="lg" status="away" />
        <KAvatar name="Carlos Ruiz" size="md" status="offline" />
        <KAvatar name="Laura Diaz" size="lg" />
      </div>
    ),
    playground: <AvatarPlayground />,
    code: `import { KAvatar } from '@khor/design-system/atoms';

<KAvatar name="Maria Garcia" size="md" status="online" />
<KAvatar name="Juan Perez" size="lg" status="busy" />
<KAvatar src="/avatar.jpg" size="md" />`,
    filename: 'KAvatar.tsx',
    props: [
      { name: 'src', type: 'string', description: 'URL de la imagen del avatar.' },
      { name: 'name', type: 'string', description: 'Nombre del usuario. Se generan iniciales automaticamente.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamano: sm=32px, md=40px, lg=56px.' },
      { name: 'status', type: "'online' | 'offline' | 'busy' | 'away'", description: 'Indicador de estado con punto de color.' },
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
        <KSwitch label="Notificaciones activas" checked={true} onChange={() => {}} />
        <KSwitch label="Modo oscuro" checked={false} onChange={() => {}} />
        <KSwitch label="Desactivado" disabled checked={true} onChange={() => {}} />
        <KSwitch label="Tamano pequeno" size="small" onChange={() => {}} />
      </div>
    ),
    playground: <SwitchPlayground />,
    code: `import { KSwitch } from '@khor/design-system/atoms';

<KSwitch
  label="Notificaciones activas"
  checked={isActive}
  onChange={setIsActive}
/>`,
    filename: 'KSwitch.tsx',
    props: [
      { name: 'checked', type: 'boolean', description: 'Estado actual.' },
      { name: 'onChange', type: '(checked: boolean) => void', description: 'Callback al cambiar.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva el switch.' },
      { name: 'label', type: 'string', description: 'Etiqueta descriptiva.' },
      { name: 'size', type: "'default' | 'small'", default: "'default'", description: 'Tamano del switch.' },
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
        <KCheckbox label="Seleccion parcial" indeterminate={true} />
        <KCheckbox label="Desactivado" disabled />
      </div>
    ),
    playground: <CheckboxPlayground />,
    code: `import { KCheckbox } from '@khor/design-system/atoms';

<KCheckbox
  label="Acepto los terminos"
  checked={accepted}
  onChange={(e) => setAccepted(e.target.checked)}
/>`,
    filename: 'KCheckbox.tsx',
    props: [
      { name: 'checked', type: 'boolean', description: 'Estado actual.' },
      { name: 'onChange', type: '(e) => void', description: 'Callback al cambiar.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva.' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Estado parcial/indeterminado.' },
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
    code: `import { KRadio } from '@khor/design-system/atoms';

<KRadio
  options={[
    { label: 'Empleado', value: 'emp' },
    { label: 'Contratista', value: 'con' },
  ]}
  value={tipo}
  onChange={(e) => setTipo(e.target.value)}
/>

// Variante de botones
<KRadio variant="button" options={...} />`,
    filename: 'KRadio.tsx',
    props: [
      { name: 'options', type: '{ label: string; value: string | number }[]', required: true, description: 'Opciones del grupo.' },
      { name: 'value', type: 'string | number', description: 'Valor seleccionado.' },
      { name: 'onChange', type: '(e) => void', description: 'Callback al seleccionar.' },
      { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Orientacion del grupo.' },
      { name: 'variant', type: "'default' | 'button'", default: "'default'", description: 'Estilo: radio clasico o botones.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva todas las opciones.' },
    ],
    guidelines: ['Maximo 5-6 opciones. Para mas, usa KSelectField.', 'variant="button" ideal para filtros y toggles de vista.'],
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
    code: `import { KTooltip } from '@khor/design-system/atoms';

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
    guidelines: ['Maximo 60 caracteres por tooltip.', 'No uses para informacion critica — esa debe ser visible siempre.'],
  },
  progress: {
    id: 'progress',
    name: 'KProgress',
    description: 'Barra de progreso para indicar completitud de procesos, cargas o pasos.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <KProgress percent={30} />
        <KProgress percent={70} strokeColor={khorTokens.colors.brand.accent} />
        <KProgress percent={100} status="success" />
        <KProgress percent={50} status="exception" />
        <KProgress percent={45} size="small" />
      </div>
    ),
    playground: <ProgressPlayground />,
    code: `import { KProgress } from '@khor/design-system/atoms';

<KProgress percent={75} />
<KProgress percent={100} status="success" />
<KProgress percent={30} strokeColor="#FF9500" />`,
    filename: 'KProgress.tsx',
    props: [
      { name: 'percent', type: 'number', required: true, description: 'Porcentaje de progreso (0-100).' },
      { name: 'status', type: "'success' | 'exception' | 'active' | 'normal'", description: 'Estado visual.' },
      { name: 'size', type: "'small' | 'default'", default: "'default'", description: 'Tamano de la barra.' },
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
    code: `import { KText } from '@khor/design-system/atoms';

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
    code: `import { KAlert } from '@khor/design-system/atoms';

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
    code: `import { KSkeleton } from '@khor/design-system/atoms';

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
        <KSlider defaultValue={30} />
        <KSlider defaultValue={75} min={0} max={100} step={5} />
        <KSlider defaultValue={50} disabled />
      </div>
    ),
    playground: <SliderPlayground />,
    code: `import { KSlider } from '@khor/design-system/atoms';

<KSlider value={volume} onChange={setVolume} min={0} max={100} step={1} />
<KSlider defaultValue={50} disabled />`,
    filename: 'KSlider.tsx',
    props: [
      { name: 'value', type: 'number', description: 'Valor controlado.' },
      { name: 'defaultValue', type: 'number', default: '50', description: 'Valor inicial.' },
      { name: 'min', type: 'number', default: '0', description: 'Valor mínimo.' },
      { name: 'max', type: 'number', default: '100', description: 'Valor máximo.' },
      { name: 'step', type: 'number', default: '1', description: 'Incremento.' },
      { name: 'onChange', type: '(value: number) => void', description: 'Callback al cambiar.' },
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
        <KRate defaultValue={4} count={5} size={28} />
        <KRate defaultValue={2} disabled />
      </div>
    ),
    playground: <RatePlayground />,
    code: `import { KRate } from '@khor/design-system/atoms';

<KRate value={rating} onChange={setRating} />
<KRate defaultValue={4} count={5} size={28} />
<KRate defaultValue={3} disabled />`,
    filename: 'KRate.tsx',
    props: [
      { name: 'value', type: 'number', description: 'Valor controlado.' },
      { name: 'defaultValue', type: 'number', default: '0', description: 'Valor inicial.' },
      { name: 'count', type: 'number', default: '5', description: 'Número de estrellas.' },
      { name: 'onChange', type: '(value: number) => void', description: 'Callback al seleccionar.' },
      { name: 'disabled', type: 'boolean', description: 'Solo lectura.' },
      { name: 'size', type: 'number', default: '20', description: 'Tamaño de las estrellas en px.' },
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
        <KSpin size="md" tip="Cargando..." />
        <KSpin size="lg" tip="Procesando datos..." />
        <KSpin size="md" color={khorTokens.colors.brand.navy} tip="Sincronizando..." />
      </div>
    ),
    playground: <SpinPlayground />,
    code: `import { KSpin } from '@khor/design-system/atoms';

<KSpin size="md" tip="Cargando..." />
<KSpin size="lg" tip="Procesando datos..." />
<KSpin size="sm" color="#051758" />`,
    filename: 'KSpin.tsx',
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño: sm=16px, md=24px, lg=36px.' },
      { name: 'color', type: 'string', default: 'khor.primary', description: 'Color del spinner.' },
      { name: 'tip', type: 'string', description: 'Texto descriptivo debajo del spinner.' },
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
    code: `import { KDivider } from '@khor/design-system/atoms';

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
    guidelines: ['Usa para separar secciones dentro de cards o formularios.', 'No abuses de dividers — el espaciado y agrupacion son mas efectivos.'],
  },
  textarea: {
    id: 'textarea',
    name: 'KTextArea',
    description: 'Area de texto multilinea con soporte para contador de caracteres, longitud maxima, estados de error y redimensionamiento vertical.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <KTextArea placeholder="Escribe una descripcion..." rows={3} showCount maxLength={200} />
        <KTextArea placeholder="Con error" error="Este campo es obligatorio" rows={2} />
        <KTextArea placeholder="Desactivado" disabled rows={2} />
      </div>
    ),
    playground: <TextAreaPlayground />,
    code: `import { KTextArea } from '@khor/design-system/atoms';

<KTextArea
  placeholder="Descripcion..."
  rows={4}
  showCount
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
      { name: 'showCount', type: 'boolean', description: 'Muestra contador de caracteres.' },
    ],
    guidelines: ['Usa showCount con maxLength para campos con limite de caracteres.', 'rows=3-4 para campos cortos, 6+ para descripciones largas.'],
  },
};

export function AtomsPage() {
  const { id } = useParams<{ id: string }>();
  const atom = id ? atoms[id] : null;

  if (!atom) {
    return (
      <div style={{ textAlign: 'center', padding: 64, fontFamily: khorTokens.typography.fontPrimary }}>
        <KText variant="h2" color="navy">Atomo no encontrado</KText>
        <KText variant="body-md" color="secondary">Selecciona un atomo del menu lateral.</KText>
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
    />
  );
}