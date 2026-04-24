/**
 * AtomsPage — Documentacion de todos los atomos del sistema Khor
 */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { ComponentDoc } from '../components/docs/ComponentDoc';
import type { PropDef } from '../components/docs/ComponentDoc';
import { KButton } from '../components/design-system/atoms/KButton/index';
import { KInput } from '../components/design-system/atoms/KInput/index';
import { KBadge } from '../components/design-system/atoms/KBadge/index';
import { KTag } from '../components/design-system/atoms/KTag/index';
import { KAvatar, KAvatarGroup } from '../components/design-system/atoms/KAvatar/index';
import { KSwitch } from '../components/design-system/atoms/KSwitch/index';
import { KCheckbox } from '../components/design-system/atoms/KCheckbox/index';
import { KRadio } from '../components/design-system/atoms/KRadio/index';
import { KProgress } from '../components/design-system/atoms/KProgress/index';
import { KTypography } from '../components/design-system/atoms/KText/index';
const KText = KTypography.Text;
import { KDivider } from '../components/design-system/atoms/KDivider/index';
import { KAlert } from '../components/design-system/atoms/KAlert/index';
import { KSkeleton } from '../components/design-system/atoms/KSkeleton/index';
import { KSlider } from '../components/design-system/atoms/KSlider/index';
import { KRate } from '../components/design-system/atoms/KRate/index';
import { KSpin } from '../components/design-system/atoms/KSpin/index';
import { KScrollBar } from '../components/design-system/atoms/KScrollBar/index';
import { KButtonGroup } from '../components/design-system/atoms/KButtonGroup/index';
import { KLabel } from '../components/design-system/atoms/KLabel/index';
import { KFloatButton } from '../components/design-system/atoms/KFloatButton/index';
import { KImage } from '../components/design-system/atoms/KImage/index';
import { KSpace } from '../components/design-system/atoms/KSpace/index';
import { KQRCode } from '../components/design-system/atoms/KQRCode/index';
import { KWatermark } from '../components/design-system/atoms/KWatermark/index';
import { KFlex } from '../components/design-system/atoms/KFlex/index';
import { KRow, KCol } from '../components/design-system/atoms/KGrid/index';
import { KIcon } from '../components/design-system/atoms/KIcon/index';
import { KTooltip } from '../components/design-system/molecules/KTooltip/index';
import { KPagination } from '../components/design-system/organisms/KPagination/index';
import {
  Plus, Save, Trash2, Download, Mail, Lock, User,
  Bell, Star, Heart, Search, AlertCircle, Info, ThumbsUp,
  CheckCircle,
} from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';

// Unified Input Aliases for internal page consistency
const KTextArea = KInput.TextArea;
const KSearchInput = KInput.Search;
const KInputPassword = KInput.Password;
const KInputOTP = KInput.OTP;

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
  const [showIcon, setShowIcon] = useState(true);
  const [iconPosition, setIconPosition] = useState<'start' | 'end'>('start');
  const [href, setHref] = useState('');
  const [btnColor, setBtnColor] = useState<any>('default');
  
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  const checkStyle = { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Variante (Basada en AntD)</label>
            <select value={variant} onChange={(e) => setVariant(e.target.value)} style={sel}>
              {['primary', 'secondary', 'outline', 'ghost', 'danger', 'navy', 'dashed', 'link', 'text', 'filled'].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label style={ctrl}>Color (Total Tokenization v10.6)</label>
            <select value={btnColor} onChange={(e) => setBtnColor(e.target.value)} style={sel}>
              {['default', 'primary', 'secondary', 'danger', 'processing', 'volcano', 'gold', 'lime', 'purple'].map((v) => <option key={v} value={v}>{v}</option>)}
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
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={ctrl}>Enlace (href)</label>
              <input 
                type="text" 
                value={href} 
                onChange={(e) => setHref(e.target.value)} 
                placeholder="Ej: https://google.com" 
                style={sel} 
              />
            </div>
            <div>
              <label style={ctrl}>Posición Icono</label>
              <select value={iconPosition} onChange={(e) => setIconPosition(e.target.value as any)} style={sel}>
                <option value="start">Start (Izquierda)</option>
                <option value="end">End (Derecha)</option>
              </select>
            </div>
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
            <label style={checkStyle}>
              <input type="checkbox" checked={ghost} onChange={(e) => setGhost(e.target.checked)} /> Ghost
            </label>
            <label style={checkStyle}>
              <input type="checkbox" checked={showIcon} onChange={(e) => setShowIcon(e.target.checked)} /> Mostrar Icono
            </label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: ghost ? khorTokens.colors.brand.navy : khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KButton 
          variant={variant} 
          color={btnColor === 'default' ? undefined : btnColor}
          size={size} 
          shape={shape} 
          htmlType={htmlType} 
          loading={loading} 
          disabled={disabled} 
          block={block} 
          danger={danger}
          ghost={ghost}
          href={href || undefined}
          target="_blank"
          icon={showIcon ? <Save size={16} /> : undefined}
          iconPosition={iconPosition}
        >
          {shape === 'circle' ? '' : (href ? 'Ir a Enlace' : 'Guardar Cambios')}
        </KButton>
      </div>
    </div>
  );
}

function IconPlayground() {
  const [name, setName] = useState<any>('Sparkles');
  const [size, setSize] = useState<any>('md');
  const [color, setColor] = useState<any>(khorTokens.colors.brand.primary);
  
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Icon Controls</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Nombre del Icono (Lucide)</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: User, Bell, Home" style={sel} />
          </div>
          <div>
            <label style={ctrl}>Tamaño (Escala Elite)</label>
            <select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>
              {['xs', 'sm', 'md', 'lg', 'xl', '2xl'].map(s => <option key={s} value={s}>{s.toUpperCase()}</option>)}
            </select>
          </div>
          <div>
            <label style={ctrl}>Color</label>
            <input type="text" value={color} onChange={(e) => setColor(e.target.value)} style={sel} />
            <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
              {['--khor-primary', '--khor-secondary', '--khor-error', '--khor-success'].map(c => (
                <div key={c} onClick={() => setColor(`var(${c})`)} style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: `var(${c})`, cursor: 'pointer', border: '1px solid rgba(0,0,0,0.1)' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ padding: 24, backgroundColor: 'white', borderRadius: 12, border: `1px solid ${khorTokens.colors.neutral[200]}`, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <KIcon name={name} size={size} color={color} />
          <KText variant="body-xs" color="muted">{name} - {size}</KText>
        </div>
      </div>
    </div>
  );
}

function InputPlayground() {
  const [val, setVal] = useState('');
  const [passVal, setPassVal] = useState('');
  const [error, setError] = useState('');
  const [size, setSize] = useState<any>('md');
  const [variant, setVariant] = useState<any>('outlined');
  const [disabled, setDisabled] = useState(false);
  const [allowClear, setAllowClear] = useState(true);
  const [showCount, setShowCount] = useState(true);
  const [addonBefore, setAddonBefore] = useState('');
  const [addonAfter, setAddonAfter] = useState('');
  const [maxLength, setMaxLength] = useState(20);
  const [visible, setVisible] = useState(false);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  const checkStyle = { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12 }}>Controles (Base & Password)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={ctrl}>Tamaño</label>
              <select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>
                {['sm', 'md', 'lg'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={ctrl}>Variante Visual</label>
              <select value={variant} onChange={(e) => setVariant(e.target.value)} style={sel}>
                {['outlined', 'borderless', 'filled'].map((v) => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label style={ctrl}>Estado (v10.6)</label>
            <select value={error ? 'error' : 'default'} onChange={(e) => setError(e.target.value === 'error' ? 'Error detectado' : '')} style={sel}>
              <option value="default">Default</option>
              <option value="error">Error</option>
              <option value="warning">Warning</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <label style={ctrl}>Addon Before</label>
              <input value={addonBefore} onChange={(e) => setAddonBefore(e.target.value)} placeholder="Ej: http://" style={sel} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={ctrl}>Addon After</label>
              <input value={addonAfter} onChange={(e) => setAddonAfter(e.target.value)} placeholder="Ej: .com" style={sel} />
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            <label style={checkStyle}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
            <label style={checkStyle}><input type="checkbox" checked={allowClear} onChange={(e) => setAllowClear(e.target.checked)} /> Allow Clear</label>
            <label style={checkStyle}><input type="checkbox" checked={showCount} onChange={(e) => setShowCount(e.target.checked)} /> Show Count</label>
            <label style={checkStyle}><input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} /> Force Password Visible</label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 24, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
           <label style={{ fontSize: 12, fontWeight: 600, color: khorTokens.colors.neutral[500] }}>Input Base</label>
           <KInput
            size={size}
            variant={variant}
            placeholder="Escribe aqui..."
            prefix={<Mail size={16} />}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            status={error ? 'error' : 'default'}
            helperText={error || "Ingresa tu información"}
            disabled={disabled}
            allowClear={allowClear}
            showCount={showCount ? { formatter: (i) => <span style={{ color: 'blue' }}>{i.count} chars</span> } : false}
            maxLength={maxLength}
            addonBefore={addonBefore || undefined}
            addonAfter={addonAfter || undefined}
          />
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
           <label style={{ fontSize: 12, fontWeight: 600, color: khorTokens.colors.neutral[500] }}>Input Password (Compound)</label>
           <KInput.Password
            size={size}
            variant={variant}
            placeholder="Tu contraseña..."
            prefix={<Lock size={16} />}
            value={passVal}
            onChange={(e) => setPassVal(e.target.value)}
            disabled={disabled}
            visibilityToggle={{ visible, onVisibleChange: setVisible }}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Playground: Badge ─────────────────────── */
function BadgePlayground() {
  const [status, setStatus] = useState<any>('success');
  const [text, setText] = useState('Activo');
  const [dot, setDot] = useState(false);
  const [count, setCount] = useState(5);
  const [overflow, setOverflow] = useState(99);
  const [size, setSize] = useState<any>('default');
  const [showZero, setShowZero] = useState(false);
  const [isRibbon, setIsRibbon] = useState(false);
  const [placement, setPlacement] = useState<'start' | 'end'>('end');

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input type="checkbox" checked={isRibbon} onChange={(e) => setIsRibbon(e.target.checked)} /> Ribbon Mode
            </label>
          </div>
          {!isRibbon && (
            <>
              <div><label style={ctrl}>Estado</label><select value={status} onChange={(e) => setStatus(e.target.value)} style={sel}>{['success','error','warning','info','primary', 'processing', 'default'].map(s=><option key={s}>{s}</option>)}</select></div>
              <div><label style={ctrl}>Valor (Count)</label><input type="number" value={Number(count)} onChange={(e) => setCount(Number(e.target.value))} style={sel}/></div>
              <div><label style={ctrl}>Overflow (Max)</label><input type="number" value={overflow} onChange={(e) => setOverflow(Number(e.target.value))} style={sel}/></div>
            </>
          )}
          <div><label style={ctrl}>Texto (Label/Text)</label><input value={text} onChange={(e) => setText(e.target.value)} style={sel}/></div>
          {isRibbon && (
            <div><label style={ctrl}>Posición</label><select value={placement} onChange={(e) => setPlacement(e.target.value as any)} style={sel}><option>start</option><option>end</option></select></div>
          )}
          {!isRibbon && (
            <>
              <div><label style={ctrl}>Tamaño</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['default','small'].map(s=><option key={s}>{s}</option>)}</select></div>
              <div style={{ display: 'flex', gap: 12 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={dot} onChange={(e) => setDot(e.target.checked)} /> Punto solo</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showZero} onChange={(e) => setShowZero(e.target.checked)} /> Show 0</label>
              </div>
            </>
          )}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 48, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        {isRibbon ? (
          <KBadge.Ribbon text={text} placement={placement}>
            <div style={{ padding: '24px 48px', backgroundColor: 'white', borderRadius: 8, border: `1px solid ${khorTokens.colors.neutral[200]}`, minWidth: 200 }}>
              Contenido con Listón
            </div>
          </KBadge.Ribbon>
        ) : (
          <KBadge 
            status={status} 
            text={text} 
            dot={dot} 
            count={count} 
            overflowCount={overflow}
            showZero={showZero}
            size={size}
          >
            <div style={{ width: 42, height: 42, backgroundColor: khorTokens.colors.neutral[200], borderRadius: 8 }} />
          </KBadge>
        )}
      </div>
    </div>
  );
}

function SearchInputPlayground() {
  const [val, setVal] = useState('');
  const [size, setSize] = useState<any>('md');
  const [placeholder, setPlaceholder] = useState('Buscar empleados...');
  const [loading, setLoading] = useState(false);
  const [enterButton, setEnterButton] = useState<any>(true);
  
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  
  const handleSearch = (v: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Buscando: ${v}`);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles (KInput.Search)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Placeholder</label><input value={placeholder} onChange={(e) => setPlaceholder(e.target.value)} style={sel} /></div>
          <div><label style={ctrl}>Tamaño</label><select value={size} onChange={(e) => setSize(e.target.value as any)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div>
            <label style={ctrl}>Estilo Botón</label>
            <select value={String(enterButton)} onChange={(e) => setEnterButton(e.target.value === 'true' ? true : e.target.value === 'false' ? false : 'Buscar Ahora')} style={sel}>
              <option value="true">Icono (default)</option>
              <option value="false">Sin botón (sólo icono suffix)</option>
              <option value="custom">Texto personalizado</option>
            </select>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
            <input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} /> Loading State
          </label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 300, display: 'flex', alignItems: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%' }}>
          <KInput.Search 
            placeholder={placeholder} 
            size={size} 
            value={val} 
            onChange={(e) => setVal(e.target.value)} 
            onSearch={handleSearch}
            loading={loading}
            enterButton={enterButton}
            allowClear
          />
        </div>
      </div>
    </div>
  );
}

function TagPlayground() {
  const [color, setColor] = useState<any>('primary');
  const [status, setStatus] = useState<any>('');
  const [closable, setClosable] = useState(false);
  const [bordered, setBordered] = useState(true);
  const [showIcon, setShowIcon] = useState(false);
  const [text, setText] = useState('Etiqueta');
  const [checked, setChecked] = useState(true);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  
  const presets = [
    'primary','navy','accent','success','warning','error','info',
    'magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple',
    'default'
  ];

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>KTag Controls</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Texto</label><input value={text} onChange={(e) => setText(e.target.value)} style={sel} /></div>
          <div>
            <label style={ctrl}>Color Preset</label>
            <select value={color} onChange={(e) => setColor(e.target.value)} style={sel}>
              {presets.map(c=><option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={ctrl}>Estado (Status)</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={sel}>
              {['', 'success', 'processing', 'error', 'warning', 'default'].map(s => <option key={s} value={s}>{s || 'Ninguno'}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={bordered} onChange={(e) => setBordered(e.target.checked)} /> Borde</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={closable} onChange={(e) => setClosable(e.target.checked)} /> Closable</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showIcon} onChange={(e) => setShowIcon(e.target.checked)} /> Icono</label>
          </div>
        </div>

        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 24 }}>CheckableTag</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <KTag.CheckableTag checked={checked} onChange={setChecked}>
            {checked ? 'Checked' : 'Unchecked'}
          </KTag.CheckableTag>
          <span style={{ fontSize: 12, color: khorTokens.colors.neutral[500] }}>Seleccionable e interactivo</span>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KTag 
          color={color} 
          status={status || undefined}
          bordered={bordered} 
          closable={closable}
          icon={showIcon ? <Star size={12} /> : undefined}
          onClose={(e) => {
            console.log('Tag closed');
            // AntD behavior: if no state is managed externally, internal state handles it.
          }}
        >
          {text}
        </KTag>
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
  const [customColor, setCustomColor] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [showGroup, setShowGroup] = useState(false);
  const [maxCount, setMaxCount] = useState(3);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  const checkStyle = { display: 'flex' as const, alignItems: 'center' as const, gap: 8, fontSize: 13, cursor: 'pointer' as const };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 260 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Nombre</label><input value={name} onChange={(e) => setName(e.target.value)} style={sel}/></div>
          <div><label style={ctrl}>Tamaño</label><select value={size} onChange={(e) => setSize(e.target.value)} style={sel}>{['sm','md','lg','xl'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Forma (shape)</label><select value={shape} onChange={(e) => setShape(e.target.value)} style={sel}>{['circle','square'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Estado de Presencia</label><select value={status} onChange={(e) => setStatus(e.target.value)} style={sel}>{['online','offline','busy','away','none'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Fondo (Preset v10.6)</label>
            <select value={customColor} onChange={(e) => setCustomColor(e.target.value)} style={sel}>
              <option value="">Default (Neutral)</option>
              {['primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info', 'teal', 'processing', 'volcano', 'gold', 'lime', 'purple'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div><label style={ctrl}>Gap (auto-size texto): {gap}px</label><input type="range" min={0} max={12} value={gap} onChange={(e) => setGap(Number(e.target.value))} style={{ width: '100%' }} /></div>
          <div><label style={ctrl}>Color personalizado</label><input value={customColor} onChange={(e) => setCustomColor(e.target.value)} placeholder="#E04D36, purple, etc." style={sel}/></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            <label style={checkStyle}><input type="checkbox" checked={showImage} onChange={(e) => setShowImage(e.target.checked)} /> Con Imagen</label>
            <label style={checkStyle}><input type="checkbox" checked={showGroup} onChange={(e) => setShowGroup(e.target.checked)} /> Mostrar Grupo</label>
          </div>
          {showGroup && (
            <div><label style={ctrl}>Max visible en grupo: {maxCount}</label><input type="range" min={1} max={6} value={maxCount} onChange={(e) => setMaxCount(Number(e.target.value))} style={{ width: '100%' }} /></div>
          )}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: 'var(--khor-surface-card)', borderRadius: khorTokens.radius.lg, border: '1px solid var(--border)' }}>
        {showGroup ? (
          <KAvatarGroup max={maxCount} size={size} shape={shape}>
            <KAvatar name="Juan Pérez" status="online" color={customColor || undefined} />
            <KAvatar name="María García" status="away" />
            <KAvatar name="Carlos Ruiz" status="busy" />
            <KAvatar src="https://github.com/shadcn.png" alt="Shadcn" status="online" />
            <KAvatar name="Ana López" />
            <KAvatar name="Pedro Sánchez" />
          </KAvatarGroup>
        ) : (
          <>
            <KAvatar
              name={name}
              size={size}
              shape={shape}
              gap={gap}
              status={status === 'none' ? undefined : status}
              src={showImage ? 'https://github.com/shadcn.png' : undefined}
              alt={showImage ? name : undefined}
              color={customColor || undefined}
            />
            <KAvatar name="AB" size={size} shape={shape} gap={gap} color={customColor || undefined} />
          </>
        )}
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
  const [sizeS, setSizeS] = useState<any>('default');
  const [checkedLabel, setCheckedLabel] = useState('');
  const [unCheckedLabel, setUnCheckedLabel] = useState('');
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={{ fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block', marginBottom: 4 }}>Tamano</label><select value={sizeS} onChange={(e) => setSizeS(e.target.value)} style={sel}>{['small','default'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={{ fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block', marginBottom: 4 }}>Checked Children</label><input value={checkedLabel} onChange={(e) => setCheckedLabel(e.target.value)} placeholder="Ej: SI" style={sel}/></div>
          <div><label style={{ fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block', marginBottom: 4 }}>Unchecked Children</label><input value={unCheckedLabel} onChange={(e) => setUnCheckedLabel(e.target.value)} placeholder="Ej: NO" style={sel}/></div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} /> Loading</label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSwitch label="Notificaciones activas" checked={checked} onCheckedChange={setChecked} disabled={disabled} loading={loading} size={sizeS} checkedChildren={checkedLabel} unCheckedChildren={unCheckedLabel} />
      </div>
    </div>
  );
}

function CheckboxPlayground() {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState<any>('default');
  const [groupValue, setGroupValue] = useState(['Apple', 'Orange']);
  
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  const options = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ];

  const allAvailableValues = options.map(o => o.value);
  const checkAllChecked = groupValue.length === allAvailableValues.length;
  const checkAllIndeterminate = groupValue.length > 0 && groupValue.length < allAvailableValues.length;

  const handleCheckAll = (checkedObj: boolean | 'indeterminate') => {
    if (checkedObj === true) {
      setGroupValue(allAvailableValues);
    } else {
      setGroupValue([]);
    }
  };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Individual Controls</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Estado (Status)</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={sel}>
              {['default','error','warning'].map(s=><option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input type="checkbox" checked={checked === true} onChange={(e) => setChecked(e.target.checked)} /> Checked
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input type="checkbox" checked={checked === 'indeterminate'} onChange={(e) => setChecked(e.target.checked ? 'indeterminate' : false)} /> Indeterminate
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled
            </label>
          </div>
        </div>

        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 24 }}>Checkbox Group (Select All)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ borderBottom: `1px solid ${khorTokens.colors.neutral[200]}`, paddingBottom: 8, marginBottom: 8 }}>
            <KCheckbox 
              checked={checkAllIndeterminate ? 'indeterminate' : checkAllChecked} 
              onCheckedChange={handleCheckAll}
            >
              Seleccionar Todos
            </KCheckbox>
          </div>
          <KCheckbox.Group 
            options={options} 
            value={groupValue} 
            onChange={setGroupValue} 
          />
          <pre style={{ fontSize: 11, color: khorTokens.colors.neutral[500], marginTop: 4 }}>
            Selected: {JSON.stringify(groupValue)}
          </pre>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KCheckbox 
          label="Acepto los términos" 
          checked={checked} 
          onCheckedChange={(val) => setChecked(val)} 
          disabled={disabled} 
          status={status} 
        />
      </div>
    </div>
  );
}

function RadioPlayground() {
  const [value, setValue] = useState('1');
  const [direction, setDirection] = useState<any>('horizontal');
  const [optionType, setOptionType] = useState<any>('default');
  const [buttonStyle, setButtonStyle] = useState<any>('outline');
  const [size, setSize] = useState<any>('md');
  const [disabled, setDisabled] = useState(false);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tipo</label><select value={optionType} onChange={(e) => setOptionType(e.target.value as any)} style={sel}>{['default','button'].map(v=><option key={v}>{v}</option>)}</select></div>
          {optionType === 'button' && <div><label style={ctrl}>Button Style</label><select value={buttonStyle} onChange={(e) => setButtonStyle(e.target.value as any)} style={sel}>{['solid','outline'].map(b=><option key={b}>{b}</option>)}</select></div>}
          <div><label style={ctrl}>Dirección</label><select value={direction} onChange={(e) => setDirection(e.target.value as any)} style={sel}>{['horizontal','vertical'].map(d=><option key={d}>{d}</option>)}</select></div>
          <div><label style={ctrl}>Tamaño</label><select value={size} onChange={(e) => setSize(e.target.value as any)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginTop: 4 }}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KRadio.Group options={[{label:'Empleado',value:'1'},{label:'Contratista',value:'2'},{label:'Becario',value:'3'}]} value={value} onValueChange={setValue} direction={direction} optionType={optionType} buttonStyle={buttonStyle} size={size} disabled={disabled} />
      </div>
    </div>
  );
}

function ProgressPlayground() {
  const [percent, setPercent] = useState(50);
  const [status, setStatus] = useState<any>('normal');
  const [sizeP, setSizeP] = useState<any>('default');
  const [steps, setSteps] = useState<number>(0);
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Porcentaje: {percent}%</label><input type="range" min={0} max={100} value={percent} onChange={(e: any) => setPercent(Number(e.target.value))} style={{ width: '100%' }} /></div>
          <div><label style={ctrl}>Estado</label><select value={status} onChange={(e) => setStatus(e.target.value as any)} style={sel}>{['normal','success','exception','active'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Pasos (Steps)</label><input type="number" min={0} value={steps} onChange={(e) => setSteps(Number(e.target.value))} style={sel} placeholder="0 para barra contínua" /></div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%', maxWidth: 300 }}><KProgress value={percent} status={status === 'normal' ? undefined : status} steps={steps > 0 ? steps : undefined} /></div>
      </div>
    </div>
  );
}

function TypographyPlayground() {
  const [text, setText] = useState('El veloz zorro marrón salta sobre el perro perezoso.');
  const [copyable, setCopyable] = useState(true);
  const [editable, setEditable] = useState(true);
  const [type, setType] = useState<any>('default');
  const [strong, setStrong] = useState(false);
  const [useEllipsis, setUseEllipsis] = useState(false);
  const [rows, setRows] = useState(1);
  
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 300 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Interacciones</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input type="checkbox" checked={copyable} onChange={(e) => setCopyable(e.target.checked)} /> Copyable
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input type="checkbox" checked={editable} onChange={(e) => setEditable(e.target.checked)} /> Editable
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input type="checkbox" checked={strong} onChange={(e) => setStrong(e.target.checked)} /> Bold
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input type="checkbox" checked={useEllipsis} onChange={(e) => setUseEllipsis(e.target.checked)} /> Ellipsis
            </label>
          </div>
          {useEllipsis && (
            <div><label style={ctrl}>Max Rows: {rows}</label><input type="range" min={1} max={5} value={rows} onChange={(e) => setRows(Number(e.target.value))} style={{ width: '100%' }} /></div>
          )}
          <div>
            <label style={ctrl}>Tipo Semántico</label>
            <select value={type} onChange={(e) => setType(e.target.value)} style={sel}>
              {['default', 'secondary', 'success', 'warning', 'danger'].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          
          <div style={{ borderTop: `1px solid ${khorTokens.colors.neutral[100]}`, paddingTop: 8, marginTop: 4 }}>
            <h5 style={{ fontSize: 12, fontWeight: 600, color: khorTokens.colors.neutral[500], marginBottom: 8 }}>Vistazo de Niveles (Title)</h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <KTypography.Title level={1}>H1 Heading</KTypography.Title>
              <KTypography.Title level={3}>H3 Subtitle</KTypography.Title>
              <KTypography.Title level={5}>H5 Minor Title</KTypography.Title>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <KTypography.Paragraph 
            copyable={copyable} 
            editable={editable ? { onChange: setText } : false}
            type={type}
            strong={strong}
            ellipsis={useEllipsis ? (rows > 1 ? { rows } : true) : false}
            style={{ minHeight: useEllipsis ? 'auto' : undefined }}
          >
            {text}
          </KTypography.Paragraph>
          
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <KTypography.Text code>KTypography.Text code</KTypography.Text>
            <KTypography.Text mark>Highlighted</KTypography.Text>
            <KTypography.Text keyboard>Ctrl + C</KTypography.Text>
            <KTypography.Link href="#" target="_blank">External Link</KTypography.Link>
          </div>
        </div>
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
  const [banner, setBanner] = useState(false);
  const [hasAction, setHasAction] = useState(false);
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
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={banner} onChange={(e) => setBanner(e.target.checked)} /> Banner</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={hasAction} onChange={(e) => setHasAction(e.target.checked)} /> Con Acción</label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 320, padding: banner ? 0 : 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: banner ? 0 : khorTokens.radius.lg, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <KAlert 
          type={type} 
          title={title} 
          description={desc} 
          closable={closable} 
          showIcon={showIcon} 
          banner={banner}
          action={hasAction ? <KButton size="sm" variant="outline">Deshacer</KButton> : undefined}
        />
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
  const [mode, setMode] = useState<'text' | 'avatar' | 'element'>('text');
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(true);
  const [lines, setLines] = useState(3);
  const [size, setSize] = useState(48);
  const [w, setW] = useState(200);
  const [h, setH] = useState(80);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 260 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Modo de Skeleton</label>
            <select value={mode} onChange={(e) => setMode(e.target.value as any)} style={sel}>
              <option value="text">Párrafo (Texto)</option>
              <option value="avatar">Avatar (Círculo)</option>
              <option value="element">Elemento (Rectángulo)</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, padding: '4px 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} /> Loading</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} /> Animación (Pulse)</label>
          </div>

          {mode === 'text' && (
            <div><label style={ctrl}>Líneas: {lines}</label><input type="range" min={1} max={10} value={lines} onChange={(e) => setLines(Number(e.target.value))} style={{ width: '100%' }} /></div>
          )}
          
          {mode === 'avatar' && (
            <div><label style={ctrl}>Dimensión: {size}px</label><input type="range" min={24} max={120} value={size} onChange={(e) => setSize(Number(e.target.value))} style={{ width: '100%' }} /></div>
          )}

          {mode === 'element' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div><label style={ctrl}>Ancho: {w}px</label><input type="range" min={40} max={400} value={w} onChange={(e) => setW(Number(e.target.value))} style={{ width: '100%' }} /></div>
              <div><label style={ctrl}>Alto: {h}px</label><input type="range" min={20} max={200} value={h} onChange={(e) => setH(Number(e.target.value))} style={{ width: '100%' }} /></div>
            </div>
          )}
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg, border: `1px dashed ${khorTokens.colors.neutral[300]}` }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <KSkeleton loading={loading} active={active} circle={mode === 'avatar'} lines={mode === 'text' ? lines : 1} width={mode === 'element' ? w : (mode === 'avatar' ? size : undefined)} height={mode === 'text' ? undefined : (mode === 'avatar' ? size : h)}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              {mode === 'avatar' && <div style={{ width: size, height: size, backgroundColor: khorTokens.colors.brand.primary, borderRadius: '50%' }} />}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, color: khorTokens.colors.brand.navy }}>¡Contenido Cargado!</h3>
                <p style={{ margin: '4px 0 0', color: khorTokens.colors.neutral[500], fontSize: 13 }}>Este es el contenido real que se muestra cuando loading=false.</p>
              </div>
            </div>
          </KSkeleton>
        </div>
      </div>
    </div>
  );
}

function ScrollBarPlayground() {
  const [size, setSize] = useState<'small' | 'middle' | 'large'>('middle');
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal' | 'both'>('vertical');
  const [autoHide, setAutoHide] = useState(true);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles (KScrollBar)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tamaño (Grosor)</label><select value={size} onChange={(e) => setSize(e.target.value as any)} style={sel}>{['small','middle','large'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Orientación</label><select value={orientation} onChange={(e) => setOrientation(e.target.value as any)} style={sel}>{['vertical','horizontal','both'].map(o=><option key={o}>{o}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginTop: 4 }}><input type="checkbox" checked={autoHide} onChange={(e) => setAutoHide(e.target.checked)} /> Auto-hide (mostrar solo on hover)</label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KScrollBar 
          size={size} 
          orientation={orientation} 
          autoHide={autoHide} 
          style={{ width: orientation === 'vertical' ? 300 : '100%', height: 200, backgroundColor: '#fff', border: `1px solid ${khorTokens.colors.neutral[200]}`, borderRadius: 8, padding: 16 }}
        >
          <div style={{ width: orientation === 'vertical' ? '100%' : 800, height: orientation === 'horizontal' ? '100%' : 500 }}>
            <h5 style={{ margin: '0 0 12px 0' }}>Contenido de Ejemplo</h5>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} style={{ fontSize: 13, color: khorTokens.colors.neutral[500], marginBottom: 8 }}>
                Fila de prueba {i + 1}: El scrollbar premium de Khor se aplica automáticamente a este contenedor respetando los tokens de diseño.
              </p>
            ))}
          </div>
        </KScrollBar>
      </div>
    </div>
  );
}

function SliderPlayground() {
  const [value, setValue] = useState([50]);
  const [rangeVal, setRangeVal] = useState([20, 80]);
  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [showValue, setShowValue] = useState(false);
  const [range, setRange] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [vertical, setVertical] = useState(false);
  const [showMarks, setShowMarks] = useState(false);
  
  const marks = {
    0: '0°C',
    26: '26°C',
    37: '37°C',
    100: { style: { color: khorTokens.colors.feedback.error }, label: '100°C' },
  };

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
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={range} onChange={(e) => setRange(e.target.checked)} /> Range</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={reverse} onChange={(e) => setReverse(e.target.checked)} /> Reverse</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={vertical} onChange={(e) => setVertical(e.target.checked)} /> Vertical</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showMarks} onChange={(e) => setShowMarks(e.target.checked)} /> Marks</label>
          </div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Valor: {range ? rangeVal.join(' - ') : value[0]}</p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: vertical ? 100 : '100%', height: vertical ? 300 : 'auto', maxWidth: 300 }}>
          <KSlider 
            value={range ? rangeVal : value} 
            onChange={(v) => range ? setRangeVal(v as number[]) : setValue(v as number[])} 
            min={0} 
            max={100} 
            step={step} 
            disabled={disabled} 
            showValue={showValue} 
            range={range}
            reverse={reverse}
            vertical={vertical}
            marks={showMarks ? marks : undefined}
            tooltip={{ open: showValue ? true : undefined }}
          />
        </div>
      </div>
    </div>
  );
}

function RatePlayground() {
  const [value, setValue] = useState(3);
  const [count, setCount] = useState(5);
  const [disabled, setDisabled] = useState(false);
  const [allowHalf, setAllowHalf] = useState(false);
  const [useTooltips, setUseTooltips] = useState(false);
  const [customChar, setCustomChar] = useState(false);

  const desc = ['Terrible', 'Malo', 'Normal', 'Bueno', 'Excelente'];

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
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={useTooltips} onChange={(e) => setUseTooltips(e.target.checked)} /> Tooltips</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={customChar} onChange={(e) => setCustomChar(e.target.checked)} /> Custom Icon</label>
          </div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Valor: {value}</p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KRate 
          value={value} 
          onChange={setValue} 
          count={count} 
          disabled={disabled} 
          allowHalf={allowHalf} 
          tooltips={useTooltips ? desc : undefined}
          character={customChar ? ({ index }) => (index % 2 === 0 ? <Heart size={20} /> : <ThumbsUp size={20} />) : undefined}
        />
        {useTooltips && value > 0 && <span style={{ fontSize: 14 }}>{desc[Math.ceil(value) - 1]}</span>}
      </div>
    </div>
  );
}

function TextAreaPlayground() {
  const [val, setVal] = useState('');
  const [error, setError] = useState('');
  const [autoSize, setAutoSize] = useState(true);
  const [showCount, setShowCount] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  const checkStyle = { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles (TextArea)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Mensaje de Error</label>
            <input value={error} onChange={(e) => setError(e.target.value)} placeholder="Dejar vacio para sin error" style={sel} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            <label style={checkStyle}><input type="checkbox" checked={autoSize} onChange={(e) => setAutoSize(e.target.checked)} /> Auto Size</label>
            <label style={checkStyle}><input type="checkbox" checked={showCount} onChange={(e) => setShowCount(e.target.checked)} /> Show Count</label>
            <label style={checkStyle}><input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Disabled</label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KTextArea 
          placeholder="Describe el motivo de la solicitud..." 
          value={val} 
          onChange={(e: any) => setVal(e.target.value)} 
          error={error || undefined} 
          autoSize={autoSize}
          showCount={showCount}
          disabled={disabled} 
        />
      </div>
    </div>
  );
}

function OTPPlayground() {
  const [val, setVal] = useState('');
  const [status, setStatus] = useState<any>('default');
  const [mask, setMask] = useState(false);
  
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles (OTP)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Estado</label><select value={status} onChange={(e) => setStatus(e.target.value as any)} style={sel}>{['default','error','warning'].map(s=><option key={s}>{s}</option>)}</select></div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer', marginTop: 4 }}><input type="checkbox" checked={mask} onChange={(e) => setMask(e.target.checked)} /> Masked Mode</label>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Valor: {val}</p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KInputOTP 
          value={val} 
          onChange={setVal} 
          status={status} 
          mask={mask}
        />
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

function UnifiedInputPlayground() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
      <section>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: khorTokens.colors.brand.navy, marginBottom: 24, borderBottom: `2px solid ${khorTokens.colors.neutral[100]}`, paddingBottom: 8 }}>Base & Password Variants</h3>
        <InputPlayground />
      </section>
      
      <section>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: khorTokens.colors.brand.navy, marginBottom: 24, borderBottom: `2px solid ${khorTokens.colors.neutral[100]}`, paddingBottom: 8 }}>Search Variant</h3>
        <SearchInputPlayground />
      </section>
      
      <section>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: khorTokens.colors.brand.navy, marginBottom: 24, borderBottom: `2px solid ${khorTokens.colors.neutral[100]}`, paddingBottom: 8 }}>TextArea Variant</h3>
        <TextAreaPlayground />
      </section>
      
      <section>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: khorTokens.colors.brand.navy, marginBottom: 24, borderBottom: `2px solid ${khorTokens.colors.neutral[100]}`, paddingBottom: 8 }}>OTP Variant</h3>
        <OTPPlayground />
      </section>
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
            <KButton danger icon={<Trash2 size={16} />}>Peligro</KButton>
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

<KButton danger size="sm" icon={<Trash2 size={16} />}>
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
    description: 'Sistema unificado de entrada de datos. Incluye variantes para texto simple, contraseñas, búsquedas, áreas de texto multilínea y códigos OTP. Paridad 100% con Ant Design v5.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
        <KInput placeholder="Texto básico" allowClear />
        <KInput.Search placeholder="Búsqueda..." enterButton />
        <KInput.Password placeholder="Contraseña" prefix={<Lock size={16} />} />
        <KInput.TextArea placeholder="Área de texto..." autoSize={{ minRows: 2 }} />
        <KInput.OTP length={4} />
      </div>
    ),
    playground: <UnifiedInputPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
        <div style={{ minWidth: 150 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500], display: 'block', marginBottom: 8 }}>Default</span><KInput placeholder="Escribe..." /></div>
        <div style={{ minWidth: 150 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500], display: 'block', marginBottom: 8 }}>Status: Error</span><KInput value="Inválido" status="error" /></div>
        <div style={{ minWidth: 150 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500], display: 'block', marginBottom: 8 }}>Status: Warning</span><KInput value="Aviso" status="warning" /></div>
        <div style={{ minWidth: 150 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500], display: 'block', marginBottom: 8 }}>Disabled</span><KInput placeholder="No disponible" disabled /></div>
        <div style={{ minWidth: 150 }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500], display: 'block', marginBottom: 8 }}>Filled Variant</span><KInput variant="filled" placeholder="Relleno" /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: [
        'Tab: Foco nativo al input.', 
        'Esc: Limpia si allowClear=true.',
        'Arrow keys (OTP): Navegación entre slots.',
        'Enter (Search): Dispara búsqueda.'
      ],
      aria: [
        'aria-invalid="true" cuando entra en error.', 
        'role="textbox" (base/textarea).',
        'aria-label automáticamente inferido en OTP slots.'
      ],
      contrast: 'AA Mínimo para el texto ingresado (>4.5:1)',
      score: 98,
    },
    code: `import { KInput } from '@khor/design-system/atoms/index';

// 1. Base Input con Limpieza
<KInput placeholder="Email" allowClear />

// 2. Password (Compound)
<KInput.Password placeholder="Contrasena" visibilityToggle />

// 3. Search (Compound)
<KInput.Search 
  placeholder="Buscar..." 
  loading 
  enterButton="Buscar" 
  onSearch={v => console.log(v)} 
/>

// 4. TextArea (Compound)
<KInput.TextArea 
  autoSize={{ minRows: 2, maxRows: 6 }} 
  showCount 
/>

// 5. OTP (Compound)
<KInput.OTP length={6} onComplete={v => alert(v)} />`,
    filename: 'KInput.tsx',
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del componente.' },
      { name: 'variant', type: "'outlined' | 'borderless' | 'filled'", default: "'outlined'", description: 'Variante visual.' },
      { name: 'status', type: "'error' | 'warning'", description: 'Estado de validación.' },
      { name: 'prefix / suffix', type: 'ReactNode', description: 'Elementos al inicio o final.' },
      { name: 'allowClear', type: 'boolean | { clearIcon: ReactNode }', description: 'Botón para limpiar el contenido.' },
      { name: 'showCount', type: 'boolean | { formatter: Function }', description: 'Muestra contador de caracteres.' },
      { name: 'visibilityToggle (Password)', type: 'boolean | object', description: 'Control de visibilidad de contraseña.' },
      { name: 'enterButton (Search)', type: 'boolean | ReactNode', description: 'Muestra botón de búsqueda.' },
      { name: 'loading (Search)', type: 'boolean', description: 'Estado de carga en búsqueda.' },
      { name: 'autoSize (TextArea)', type: 'boolean | object', description: 'Ajuste automático de altura.' },
    ],
    guidelines: [
      'Utiliza KInput como namespace para acceder a todas las variantes (.Password, .Search, etc).',
      'Prefiere allowClear para mejorar la experiencia de usuario en filtros.',
      'Usa status="error" para validaciones obligatorias fallidas.',
      'OTP gestiona el foco automáticamente; no es necesario manejar refs manuales.'
    ],
    aiNotes: 'KInput es ahora un Compound Component. Prioriza el uso de KInput.Password y KInput.Search sobre tipos de input nativos para mejor accesibilidad y funcionalidad.',
  },
  badge: {
    id: 'badge',
    name: 'KBadge',
    description: 'Notificador de estados o contadores sobre elementos. Incluye variante Ribbon para cintas en esquinas. Paridad 100% con Ant Design v5.',
    preview: (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <KBadge count={5}><div style={{ width: 32, height: 32, background: '#eee', borderRadius: 4 }} /></KBadge>
        <KBadge dot><div style={{ width: 32, height: 32, background: '#eee', borderRadius: 4 }} /></KBadge>
        <KBadge status="success" text="Activo" />
        <KBadge.Ribbon text="Nuevo"><div style={{ width: 100, height: 40, background: '#eee', borderRadius: 4 }} /></KBadge.Ribbon>
      </div>
    ),
    playground: <BadgePlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <KBadge status="success" text="Success" />
        <KBadge status="error" text="Error" />
        <KBadge status="warning" text="Warning" />
        <KBadge status="processing" text="Processing" />
        <KBadge count={100} overflowCount={99}><div style={{ width: 40, height: 40, background: '#f5f5f5', borderRadius: 8 }} /></KBadge>
      </div>
    ),
    a11ySummary: {
      keyboard: ['No aplica nativamente.'],
      aria: ['role="status" aplicable al contenedor padre.', 'title para tooltips nativos.'],
      contrast: 'AAA sobre elemento indicador, AA sobre texto adjunto.',
      score: 100,
    },
    code: `import { KBadge } from '@khor/design-system/atoms/index';

// 1. Contador sobre icono
<KBadge count={5}>
  <Bell size={24} />
</KBadge>

// 2. Estado standalone (AntD Style)
<KBadge status="success" text="Aprobado" />

// 3. Ribbon (Cinta)
<KBadge.Ribbon text="VIP" color="gold">
  <Card>Contenido</Card>
</KBadge.Ribbon>`,
    filename: 'KBadge.tsx',
    props: [
      { name: 'status', type: "'success' | 'error' | 'warning' | 'info' | 'default' | 'processing'", description: 'Estado semántico predefinido.' },
      { name: 'text', type: 'ReactNode', description: 'Texto junto al punto (en standalone mode).' },
      { name: 'count', type: 'ReactNode', description: 'Valor numérico o nodo a mostrar en el badge.' },
      { name: 'overflowCount', type: 'number', default: '99', description: 'Límite máximo antes de mostrar "+".' },
      { name: 'dot', type: 'boolean', description: 'Muestra un punto rojo (o color status) sin número.' },
      { name: 'offset', type: '[x, y]', description: 'Desplazamiento del badge.' },
      { name: 'color', type: 'string', description: 'Color de fondo personalizado (hex o preset).' },
      { name: 'size', type: "'default' | 'small'", description: 'Tamaño del badge.' },
      { name: 'title', type: 'string', description: 'Texto al pasar el mouse.' },
      { name: 'KBadge.Ribbon', type: 'Sub-component', description: 'Cinta decorativa para esquinas.' },
    ],
    guidelines: [
      'Usa status para indicadores de sistema standalone.',
      'Usa count para notificaciones de usuario sobre iconos o avatares.',
      'Ribbon es ideal para destacar tarjetas o secciones completas.',
    ],
    aiNotes: 'KBadge soporta modo standalone (dot+text) y modo flotante (count). Usa Ribbon para banners promocionales o de estado en esquinas.',
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
      aria: ['role="status" para tags informativos.', 'aria-label para el botón de cierre.'],
      contrast: 'Relación 4.5:1 mantenida en todos los presets de color.',
      score: 100,
    },
    code: `import { KTag } from '@khor/design-system/atoms/index';

// 1. Uso Básico y Colores
<KTag color="blue">Nuevo</KTag>
<KTag color="success">Completado</KTag>

// 2. Removible (Closable)
<KTag closable onClose={() => console.log('Removido')}>
  Eliminar
</KTag>

// 3. Seleccionable (Checkable)
<KTag.CheckableTag 
  checked={checked} 
  onChange={(val) => setChecked(val)}
>
  Tag Seleccionable
</KTag.CheckableTag>

// 4. Con Icono y Personalización
<KTag icon={<Star size={12} />} color="gold" bordered={false}>
  Premium
</KTag>`,
    filename: 'KTag.tsx',
    props: [
      { name: 'color', type: 'KTagColor | string', description: 'Presets de AntD (magenta, volcano, gold, etc.) o color CSS.' },
      { name: 'closable', type: 'boolean', description: 'Muestra un botón de cierre.' },
      { name: 'bordered', type: 'boolean', default: 'true', description: 'Define si tiene borde visible.' },
      { name: 'icon', type: 'ReactNode', description: 'Icono al inicio del tag.' },
      { name: 'onClose', type: '(e) => void', description: 'Callback al cerrar. Si no se provee, el componente se oculta automáticamente.' },
      { name: 'closeIcon', type: 'ReactNode', description: 'Icono de cierre personalizado.' },
      { name: 'checked', type: 'boolean', description: 'Estado en CheckableTag.' },
      { name: 'KTag.CheckableTag', type: 'Sub-component', description: 'Variante interactiva tipo toggle.' },
    ],
    guidelines: [
      'Usa CheckableTag para filtros persistentes.',
      'Usa colores semánticos (success, error) para estados del sistema.',
      'Los colores de preset AntD son ideales para categorización visual variada.',
    ],
    aiNotes: 'KTag implementa paridad total con AntD v5. Incluye CheckableTag y gestión interna de visibilidad si onClose no se maneja externamente.',
  },
  avatar: {
    id: 'avatar',
    name: 'KAvatar',
    description: 'Avatar de usuario con soporte para imagen, iniciales autoajustables, icono, estado de presencia y color personalizable. KAvatarGroup soporta max count con indicador +N. Paridad completa con AntD Avatar.',
    preview: (
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <KAvatar name="Juan Perez" size="sm" status="online" />
        <KAvatar name="Maria Garcia" size="md" status="away" />
        <KAvatar name="Carlos Ruiz" size="lg" status="busy" />
        <KAvatar src="https://github.com/shadcn.png" alt="Avatar demo" size="lg" status="online" />
      </div>
    ),
    playground: <AvatarPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Sizes */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--khor-text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, display: 'block' }}>Tamaños</span>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>sm (32px)</span><KAvatar size="sm" name="AB" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>md (40px)</span><KAvatar size="md" name="AB" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>lg (56px)</span><KAvatar size="lg" name="AB" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>xl (80px)</span><KAvatar size="xl" name="AB" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>custom (100px)</span><KAvatar size={100} name="AB" /></div>
          </div>
        </div>
        {/* Shapes */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--khor-text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, display: 'block' }}>Formas</span>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>Circle</span><KAvatar shape="circle" name="CD" size="lg" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>Square</span><KAvatar shape="square" name="CD" size="lg" /></div>
          </div>
        </div>
        {/* Types: Image, Icon, Initials, Fallback */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--khor-text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, display: 'block' }}>Tipos de contenido</span>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>Imagen</span><KAvatar src="https://github.com/shadcn.png" alt="Demo" size="lg" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>Iniciales</span><KAvatar name="Maria Garcia" size="lg" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>Icono</span><KAvatar icon={<User size={24} />} size="lg" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>Fallback</span><KAvatar size="lg" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>Letra larga</span><KAvatar size="lg"  name="Ana Belén" gap={2} /></div>
          </div>
        </div>
        {/* Status indicators */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--khor-text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, display: 'block' }}>Estado de Presencia</span>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>Online</span><KAvatar name="JP" status="online" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>Away</span><KAvatar name="MG" status="away" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>Busy</span><KAvatar name="CR" status="busy" /></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>Offline</span><KAvatar name="AL" status="offline" /></div>
          </div>
        </div>
        {/* Custom colors */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--khor-text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, display: 'block' }}>Colores personalizados</span>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <KAvatar name="AB" color="#E04D36" />
            <KAvatar name="CD" color="#7C3AED" />
            <KAvatar name="EF" color="#059669" />
            <KAvatar name="GH" color="#D97706" />
            <KAvatar name="IJ" color="#0891B2" />
          </div>
        </div>
        {/* Avatar Group */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--khor-text-secondary)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, display: 'block' }}>Avatar Group (max=3)</span>
          <KAvatarGroup max={3} size="md">
            <KAvatar name="Juan Pérez" status="online" />
            <KAvatar name="María García" status="away" />
            <KAvatar name="Carlos Ruiz" status="busy" />
            <KAvatar src="https://github.com/shadcn.png" alt="Shadcn" />
            <KAvatar name="Ana López" />
          </KAvatarGroup>
        </div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Cuando onClick está definido, el avatar es focuseable con Tab y activable con Enter/Space.'],
      aria: ['alt se aplica automáticamente a la imagen. Si se omite, usa name como fallback.', 'El indicador de estado incluye aria-label descriptivo.', 'onClick convierte el avatar en role="button" con tabIndex=0.'],
      contrast: 'AAA entre texto blanco (#FFF) y fondo Navy (#051758). Indicadores de estado cumplen WCAG AA.',
      score: 100,
    },
    code: `import { KAvatar, KAvatarGroup } from '@khor/design-system/atoms/index';

// Imagen con alt
<KAvatar src="/avatar.jpg" alt="Maria Garcia" size="lg" status="online" />

// Iniciales automáticas
<KAvatar name="Maria Garcia" size="md" status="busy" />

// Icono personalizado
<KAvatar icon={<User size={20} />} size="md" />

// Color personalizado
<KAvatar name="AB" color="#7C3AED" />

// Auto-size texto (gap controla el padding interno)
<KAvatar name="Alexander Benjamin" size="sm" gap={2} />

// Avatar Group con max count
<KAvatarGroup max={3} size="md" shape="circle">
  <KAvatar name="Juan Pérez" status="online" />
  <KAvatar name="María García" status="away" />
  <KAvatar name="Carlos Ruiz" />
  <KAvatar name="Ana López" />
</KAvatarGroup>

// onError: prevenir fallback
<KAvatar src="/maybe-broken.jpg" onError={() => { console.log('Error!'); return false; }} />`,
    filename: 'KAvatar.tsx',
    props: [
      { name: 'src', type: 'string', description: 'URL de imagen del avatar.' },
      { name: 'alt', type: 'string', description: 'Texto alternativo para la imagen (accesibilidad). Si se omite, usa name.' },
      { name: 'srcSet', type: 'string', description: 'Atributo srcSet para imágenes responsive.' },
      { name: 'crossOrigin', type: "'' | 'anonymous' | 'use-credentials'", description: 'Política CORS para la imagen.' },
      { name: 'draggable', type: 'boolean', description: 'Si la imagen es arrastrable.' },
      { name: 'name', type: 'string', description: 'Nombre de usuario. Las iniciales se generan automáticamente (primeras 2 palabras).' },
      { name: 'icon', type: 'ReactNode', description: 'Icono a mostrar como fallback en lugar de iniciales.' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | number", default: "'md'", description: 'Tamaño del avatar. Acepta valor numérico en px.' },
      { name: 'shape', type: "'circle' | 'square'", default: "'circle'", description: 'Forma del avatar.' },
      { name: 'status', type: "'online' | 'offline' | 'busy' | 'away'", description: 'Indicador de presencia con punto de color.' },
      { name: 'gap', type: 'number', default: '4', description: 'Distancia en px entre el borde y el texto de iniciales. Controla el auto-sizing del texto.' },
      { name: 'color', type: 'string', description: 'Color de fondo personalizado. Default: Navy (#051758).' },
      { name: 'onError', type: '() => boolean | void', description: 'Callback cuando la imagen falla. Retornar false previene el fallback automático.' },
      { name: 'onClick', type: '(e: MouseEvent) => void', description: 'Handler de click. Convierte el avatar en elemento interactivo con role="button".' },
      { name: 'children', type: 'ReactNode', description: 'Contenido personalizado (texto, icono, etc.).' },
    ],
    guidelines: [
      'Cuando hay imagen (src), se muestra. Si falla, cae a icon > iniciales > fallback (User icon).',
      'El fondo de las iniciales usa color.brand.navy por defecto. Usa la prop color para personalizar.',
      'Tamaño sm para listas densas, md para headers, lg/xl para perfiles.',
      'gap controla el auto-sizing del texto: valores bajos permiten texto más grande, valores altos más padding.',
      'KAvatarGroup con max muestra los primeros N avatares y un indicador "+X" con los sobrantes.',
      'Siempre incluir alt cuando se usa src para cumplir con accesibilidad WCAG.',
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
        <KSwitch label="Tamano pequeno" size="small" onCheckedChange={() => {}} />
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
  checkedChildren="ON"
  unCheckedChildren="OFF"
/>`,
    filename: 'KSwitch.tsx',
    props: [
      { name: 'checked', type: 'boolean', description: 'Estado actual.' },
      { name: 'onCheckedChange', type: '(checked: boolean) => void', description: 'Callback al cambiar.' },
      { name: 'size', type: "'small' | 'default'", default: "'default'", description: 'Tamaño del switch.' },
      { name: 'checkedChildren / unCheckedChildren', type: 'ReactNode', description: 'Texto o iconos dentro del track.' },
    ],
    guidelines: ['Siempre incluye una etiqueta descriptiva.', 'Usa para preferencias binarias, no para acciones transaccionales.'],
  },

  checkbox: {
    id: 'checkbox',
    name: 'KCheckbox',
    description: 'Casilla de verificación básica para selección de estados booleanos o grupos de opciones múltiples con KCheckbox.Group.',
    preview: (
      <div style={{ display: 'flex', gap: 16 }}>
        <KCheckbox checked>Activo</KCheckbox>
        <KCheckbox checked="indeterminate">Parcial</KCheckbox>
        <KCheckbox disabled>Desactivado</KCheckbox>
      </div>
    ),
    playground: <CheckboxPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 16 }}>
        <KCheckbox status="error">Error State</KCheckbox>
        <KCheckbox status="warning">Warning State</KCheckbox>
        <KCheckbox.Group options={['A', 'B', 'C']} defaultValue={['A']} />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Enfocar casilla.', 'Space: Cambiar estado (checked/unchecked).'],
      aria: ['role="checkbox" aplicado automáticamente.', 'aria-checked refleja el estado actual incluyendo indeterminate.'],
      contrast: 'Borde y check cumplen con ratio 3:1 mínimo.',
      score: 100,
    },
    code: `import { KCheckbox } from '@khor/design-system/atoms/index';

// 1. Uso básico
<KCheckbox label="Aceptar términos" />

// 2. Estado indeterminado (Radix/AntD Parity)
<KCheckbox checked="indeterminate" label="Selección parcial" />

// 3. Grupo de opciones
<KCheckbox.Group 
  options={[
    { label: 'Manzana', value: 'apple' },
    { label: 'Pera', value: 'pear' },
    { label: 'Naranja', value: 'orange', disabled: true },
  ]} 
  defaultValue={['apple']} 
  onChange={(values) => console.log(values)} 
/>`,
    filename: 'KCheckbox.tsx',
    props: [
      { name: 'checked', type: "boolean | 'indeterminate'", description: 'Estado de la casilla.' },
      { name: 'label', type: 'ReactNode', description: 'Texto descriptivo adjunto.' },
      { name: 'status', type: "'error' | 'warning' | 'default'", description: 'Variante de validación.' },
      { name: 'disabled', type: 'boolean', description: 'Desactiva la interacción.' },
      { name: 'KCheckbox.Group', type: 'Sub-component', description: 'Contenedor para múltiples opciones.' },
      { name: 'options', type: 'string[] | Option[]', description: 'Opciones dinámicas para el grupo.' },
      { name: 'styles', type: 'object', description: 'Estilos semánticos (root, input, label).' },
    ],
    guidelines: [
      'Usa Checkbox para opciones no excluyentes (múltiple selección).',
      'El estado indeterminate es útil para checkboxes "padre" que controlan una lista.',
      'Prefiere KCheckbox.Group para manejar estados de formularios complejos.',
    ],
    aiNotes: 'KCheckbox utiliza Radix UI Checkbox bajo el capó. Soporta paridad total con AntD v5 incluyendo Group y Indeterminate.',
  },
  radio: {
    id: 'radio',
    name: 'KRadio',
    description: 'Grupo de opciones mutuamente excluyentes con soporte para layout vertical/horizontal y variante de boton.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Horizontal (default)</p>
          <KRadio.Group options={[{ label: 'Empleado', value: '1' }, { label: 'Contratista', value: '2' }, { label: 'Becario', value: '3' }]} value="1" />
        </div>
        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Vertical</p>
          <KRadio.Group options={[{ label: 'Nómina Quincenal', value: '1' }, { label: 'Nómina Mensual', value: '2' }]} value="1" direction="vertical" />
        </div>
        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Botones</p>
          <KRadio.Group options={[{ label: 'Día', value: 'd' }, { label: 'Semana', value: 'w' }, { label: 'Mes', value: 'm' }]} value="w" optionType="button" />
        </div>
      </div>
    ),
    playground: <RadioPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KRadio.Group options={[{ label: 'Unchecked', value: '1' }, { label: 'Checked', value: '2' }]} defaultValue="2" direction="vertical" />
        <KRadio.Group options={[{ label: 'Disabled Off', value: '3', disabled: true }, { label: 'Disabled On', value: '4', disabled: true }]} defaultValue="4" direction="vertical" />
      </div>
    ),
    a11ySummary: {
      keyboard: ['Up/Down/Left/Right: Mueve el foco al siguiente/previo item y lo selecciona.', 'Tab: Entra y sale del contenedor principal.'],
      aria: ['role="radiogroup" asignado al contenedor', 'role="radio" y aria-checked asignados a cada elemento.'],
      contrast: 'AAA en anillo indicador',
      score: 100,
    },
    code: `import { KRadio } from '@khor/design-system/atoms/index';

<KRadio.Group
  options={[
    { label: 'Empleado', value: 'emp' },
    { label: 'Contratista', value: 'con' },
  ]}
  value={tipo}
  onValueChange={setTipo}
/>

// Variante de botones
<KRadio.Group optionType="button" options={...} />`,
    filename: 'KRadio.tsx',
    props: [
      { name: 'options', type: '{ label: string; value: string | number; disabled?: boolean }[] | string[]', required: true, description: 'Array de opciones del grupo de radio.' },
      { name: 'value', type: 'string', description: 'Valor actualmente seleccionado (controlado).' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Callback al cambiar la selección.' },
      { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Orientación del grupo de opciones.' },
      { name: 'optionType', type: "'default' | 'button'", default: "'default'", description: 'Estilo visual: radio clásico o grupo de botones.' },
      { name: 'buttonStyle', type: "'solid' | 'outline'", default: "'outline'", description: 'Aplica solo cuando optionType="button". solid=relleno, outline=solo borde.' },
      { name: 'size', type: "'small' | 'default' | 'large'", default: "'default'", description: 'Tamaño del grupo de radio.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita todas las opciones del grupo.' },
    ],
    guidelines: ['Máximo 5-6 opciones. Para más opciones, usa KSelectField.', 'optionType="button" ideal para filtros y toggles de vista.', 'KRadio.Button puede usarse standalone para casos personalizados dentro de un Group.'],
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
    name: 'KTypography',
    description: 'Sistema completo de texto que incluye encabezados (Title), párrafos, enlaces y texto básico con interacciones avanzadas (Edición, Copia, Truncado).',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <KTypography.Title level={3}>Heading</KTypography.Title>
        <KTypography.Paragraph>Contenido textual con soporte de interacciones.</KTypography.Paragraph>
        <KTypography.Text strong type="success">Éxito en negrita</KTypography.Text>
      </div>
    ),
    playground: <TypographyPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <KTypography.Text code>Code Style</KTypography.Text>
          <KTypography.Text mark>Marked Style</KTypography.Text>
          <KTypography.Text keyboard>Alt + K</KTypography.Text>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <KTypography.Text copyable>Copy this text</KTypography.Text>
          <KTypography.Text editable={{ onChange: console.log }}>Edit me</KTypography.Text>
        </div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Enfoque automático al entrar en modo edición.', 'Soporte de ESC para cancelar edición.'],
      aria: ['Uso correcto de etiquetas h1-h5.', 'aria-label en botones de copia y edición.'],
      contrast: 'Todos los tipos semánticos cumplen con ratio 4.5:1 mín.',
      score: 100,
    },
    code: `import { KTypography } from '@khor/design-system/atoms/index';

// 1. Encabezado con nivel
<KTypography.Title level={2}>Título Principal</KTypography.Title>

// 2. Texto Interactivo
<KTypography.Paragraph copyable editable={{ onChange: (val) => update(val) }}>
  Contenido editable y copiable.
</KTypography.Paragraph>

// 3. Formato Semántico
<KTypography.Text type="danger" strong underline>
  Error importante subrayado
</KTypography.Text>

// 4. Enlaces
<KTypography.Link href="https://khor.com" target="_blank">
  Documentación
</KTypography.Link>`,
    filename: 'KTypography.tsx',
    props: [
      { name: 'KTypography.Title', type: 'Sub-component', description: 'Heading con prop level (1-5).' },
      { name: 'copyable', type: 'boolean | object', description: 'Permite copiar el texto al portapapeles.' },
      { name: 'editable', type: 'boolean | object', description: 'Habilita edición en línea in-place.' },
      { name: 'ellipsis', type: 'boolean | object', description: 'Truncado de texto con soporte multi-línea (rows).' },
      { name: 'type', type: "'secondary' | 'success' | 'warning' | 'danger'", description: 'Variante semántica de color.' },
      { name: 'strong | italic | underline | code | mark | keyboard', type: 'boolean', description: 'Formatos de estilo rápido.' },
    ],
    guidelines: [
      'Usa KTypography.Title para jerarquía visual clara (SEO friendly).',
      'El modo editable es ideal para nombres de archivos o configuraciones rápidas.',
      'Asegura que el texto copiable sea útil para el usuario (ids, tokens, rutas).',
    ],
    aiNotes: 'Implementa paridad total con AntD v5. Soporta props legadas (variant, color) en KText para compatibilidad.',
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
    a11ySummary: {
      keyboard: ['Tab: Navega entre botones del grupo.', 'Arrows: No implementado (comportamiento de toolbar nativo).'],
      aria: ['role="group" recomendado si se usa fuera de un toolbar.', 'aria-label obligatorio para identificar el propósito del grupo.'],
      contrast: 'AAA',
      score: 100,
    },
    guidelines: ['Usa para acciones relacionadas como paginacion o vistas.'],
    aiNotes: 'Componente de agrupamiento visual. Asegura que los botones internos tengan el mismo tamaño.'
  },
  'search-input': { id: 'search-input', name: 'KSearchInput', description: 'Input de búsqueda unificado con icono y botón de limpieza.',
    preview: (<div style={{ maxWidth: 300 }}><KSearchInput placeholder="Buscar..." /></div>),
    playground: <SearchInputPlayground />,
    code: `<KSearchInput onSearch={(v) => console.log(v)} />`, filename: 'KSearchInput.tsx',
    props: [{ name: 'placeholder', type: 'string', description: 'Placeholder.' }, { name: 'size', type: "'sm' | 'md' | 'lg'", description: 'Tamaño.' }, { name: 'onSearch', type: '(v: string) => void', description: 'Callback de búsqueda.' }],
    a11ySummary: {
      keyboard: ['Enter: Dispara el evento onSearch.', 'Esc: Limpia el contenido (si allowClear).'],
      aria: ['role="searchbox" aplicado internamente.', 'aria-label descriptivo requerido si no hay label visible.'],
      contrast: 'AAA',
      score: 100,
    },
    guidelines: ['Centralizado en Atoms para uso global.', 'Usa para búsquedas primarias en el sistema.'],
    aiNotes: 'Evolución de KInput para búsqueda. Priorizar sobre KInput básico en cabeceras.'
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
    a11ySummary: {
      keyboard: ['N/A: Comportamiento posicional automático.'],
      aria: ['Mantiene el rol del contenido envuelto.', 'Asegura que el contenido sea alcanzable si sale del viewport.'],
      contrast: 'N/A',
      score: 100,
    },
    guidelines: ['offsetTop=64 para respetar el header de 64px.'],
    aiNotes: 'Componente de utilidad de posicionamiento. Evita usar en elementos críticos de lectura larga.'
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
  scrollbar: {
    id: 'scrollbar',
    name: 'KScrollBar',
    description: 'Átomo para estilización premium de barras de desplazamiento. Centraliza la estética de los scrollbars en el sistema para evitar variaciones nativas feas.',
    preview: (
      <KScrollBar style={{ height: 120, border: `1px solid ${khorTokens.colors.neutral[200]}`, borderRadius: 8, padding: 12 }}>
        <div style={{ height: 300 }}>
          <p style={{ fontSize: 13, color: khorTokens.colors.neutral[500] }}>Contenido con scroll customizado premium.</p>
          <div style={{ height: 200 }} />
          <p style={{ fontSize: 13, color: khorTokens.colors.neutral[500] }}>Fin del contenido.</p>
        </div>
      </KScrollBar>
    ),
    playground: <ScrollBarPlayground />,
    code: `import { KScrollBar } from '@khor/design-system/atoms/index';

<KScrollBar 
  size="middle" 
  orientation="vertical" 
  autoHide={true} 
  style={{ height: 300 }}
>
  {/* contenido largo */}
</KScrollBar>`,
    filename: 'KScrollBar.tsx',
    props: [
      { name: 'orientation', type: "'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Orientación del scroll.' },
      { name: 'size', type: "'small' | 'middle' | 'large'", default: "'middle'", description: 'Grosor de la barra.' },
      { name: 'autoHide', type: 'boolean', default: 'true', description: 'Esconde la barra si no hay hover.' },
      { name: 'children', type: 'ReactNode', description: 'Contenido a scrollear.' },
    ],
    guidelines: ['Usa para contenedores con contenido que excede su tamaño.', 'Evita scrollbars en elementos minúsculos.'],
  },
  icon: {
    id: 'icon',
    name: 'KIcon',
    description: 'Átomo base para iconografía. Wrapper de Lucide React que implementa la escala Elite de tamaños (XS a 2XL) y tokens de color sistémicos.',
    preview: (
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <KIcon name="Sparkles" size="xl" color="var(--khor-primary)" />
        <KIcon name="Zap" size="lg" color="var(--khor-secondary)" />
        <KIcon name="CheckCircle" size="md" color="var(--khor-success)" />
      </div>
    ),
    playground: <IconPlayground />,
    code: `import { KIcon } from '@khor/design-system/atoms/index';\n\n<KIcon name="Sparkles" size="md" color="var(--khor-primary)" />`,
    filename: 'KIcon/index.tsx',
    props: [
      { name: 'name', type: 'string', required: true, description: 'Nombre de la propiedad exportada por lucide-react.' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", default: "'md'", description: 'Tamaño basado en tokens Elite.' },
      { name: 'color', type: 'string', description: 'Color CSS o Token.' },
      { name: 'className', type: 'string', description: 'Clases adicionales.' },
    ],
    guidelines: ['Usa iconos para reducir carga cognitiva.', 'Mantén el tamaño consistente en la misma fila.', 'Acompaña siempre de aria-label si no hay texto.'],
    aiNotes: 'Componente obligatorio para toda iconografía Lucide. NO importar de lucide-react directamente.'
  }
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