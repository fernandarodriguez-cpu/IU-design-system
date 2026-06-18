/**
 * AtomsPage — Documentacion de todos los atomos del sistema Khor
 */
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { ComponentDoc } from '../components/docs/ComponentDoc';
import type { PropDef } from '../components/docs/ComponentDoc';
import { KButton } from '../components/design-system/atoms/KButton/index';
import { KInput } from '../components/design-system/atoms/KInput/index';
import { KPhoneInput } from '../components/design-system/atoms/KPhoneInput/index';
import { KBadge, KBadgeCount } from '../components/design-system/atoms/KBadge/index';
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
import { KSpin } from '../components/design-system/atoms/KSpin/index';
import { KScrollBar } from '../components/design-system/atoms/KScrollBar/index';
import { KButtonGroup } from '../components/design-system/atoms/KButtonGroup/index';
import { KLabel } from '../components/design-system/atoms/KLabel/index';
import { KFloatButton } from '../components/design-system/atoms/KFloatButton/index';
import { KImage } from '../components/design-system/atoms/KImage/index';
import { KSpace } from '../components/design-system/atoms/KSpace/index';
import { KQRCode } from '../components/design-system/atoms/KQRCode/index';
import { KFlex } from '../components/design-system/atoms/KFlex/index';
import { KRow, KCol } from '../components/design-system/atoms/KGrid/index';
import { KIcon } from '../components/design-system/atoms/KIcon/index';
import { KPagination } from '../components/design-system/organisms/KPagination/index';
import { KSearch } from '../components/design-system/atoms/KSearch/index';
import type { KSearchEnter } from '../components/design-system/atoms/KSearch/index';
import { KSelectField } from '../components/design-system/molecules/KSelectField';
import {
  Plus, Save, Trash2, Download, Mail, Lock, User,
  Bell, Star, Heart, Search, AlertCircle, Info, ThumbsUp,
  CheckCircle, Smile,
} from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';
import type { AtomData } from '../registry/registry-types';

// Unified Input Aliases for internal page consistency
const KTextArea = KInput.TextArea;
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
            <label style={ctrl}>Color (Figma: Blue / Red)</label>
            <select value={btnColor} onChange={(e) => setBtnColor(e.target.value)} style={sel}>
              <option value="default">default (Blue)</option>
              <option value="secondary">secondary (Red)</option>
              <option value="danger">danger (Red)</option>
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

/** Fila de estados simulados (Default/Hover/Focused/Pressed/Disabled) para una combinacion Tipo+Color del Button de Figma. */
function ButtonStateRow({ variant, color, ghost, label }: { variant: any; color?: any; ghost?: boolean; label: string }) {
  const cell = { display: 'flex', flexDirection: 'column' as const, gap: 8, alignItems: 'center' as const };
  const cap = { fontSize: 11, color: khorTokens.colors.neutral[500] };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: khorTokens.colors.brand.navy, width: 96, flexShrink: 0 }}>{label}</span>
      <div style={cell}><span style={cap}>Default</span><KButton variant={variant} color={color} ghost={ghost}>Botón</KButton></div>
      <div style={cell}><span style={cap}>Hover</span><KButton variant={variant} color={color} ghost={ghost} style={{ filter: 'brightness(1.1)' }}>Botón</KButton></div>
      <div style={cell}><span style={cap}>Focused</span><div style={{ outline: `2px solid ${khorTokens.colors.brand.primary}`, outlineOffset: '2px', borderRadius: khorTokens.radius.md }}><KButton variant={variant} color={color} ghost={ghost}>Botón</KButton></div></div>
      <div style={cell}><span style={cap}>Pressed</span><KButton variant={variant} color={color} ghost={ghost} style={{ filter: 'brightness(0.9)', transform: 'scale(0.98)' }}>Botón</KButton></div>
      <div style={cell}><span style={cap}>Disabled</span><KButton variant={variant} color={color} ghost={ghost} disabled>Botón</KButton></div>
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
  const [enterButton, setEnterButton] = useState<any>(false);
  const [filterButton, setFilterButton] = useState(false);
  
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
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} /> Loading State
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input type="checkbox" checked={filterButton} onChange={(e) => setFilterButton(e.target.checked)} /> Botón Filtro
            </label>
          </div>
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
            filterButton={filterButton || undefined}
            allowClear
          />
        </div>
      </div>
    </div>
  );
}

function PasswordPlayground() {
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [status, setStatus] = useState<'default' | 'error' | 'warning'>('default');
  const [hasPrefix, setHasPrefix] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [helpText, setHelpText] = useState('');
  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div><label style={ctrl}>Tamaño</label><select value={size} onChange={e => setSize(e.target.value as any)} style={sel}>{['sm','md','lg'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Status</label><select value={status} onChange={e => setStatus(e.target.value as any)} style={sel}>{['default','error','warning'].map(s=><option key={s}>{s}</option>)}</select></div>
          <div><label style={ctrl}>Help Text</label><input value={helpText} onChange={e => setHelpText(e.target.value)} placeholder="Ej: Contraseña incorrecta" style={sel} /></div>
          <div style={{ display: 'flex', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={hasPrefix} onChange={e => setHasPrefix(e.target.checked)} /> Ícono prefijo</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} /> Disabled</label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 300, display: 'flex', alignItems: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: '100%', maxWidth: 320 }}>
          <KInput.Password
            size={size}
            status={status}
            prefix={hasPrefix ? <Lock size={14} /> : undefined}
            helpText={helpText || undefined}
            disabled={disabled}
            placeholder="Escribe tu contraseña"
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
  const [checked, setChecked]     = useState(false);
  const [size, setSize]           = useState<'small' | 'medium'>('medium');
  const [showText, setShowText]   = useState(false);
  const [showIcon, setShowIcon]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [disabled, setDisabled]   = useState(false);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel  = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%', fontFamily: khorTokens.typography.fontPrimary };
  const chk  = { display: 'flex' as const, alignItems: 'center' as const, gap: 8, fontSize: 13, cursor: 'pointer' as const };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: '0 0 200px', minWidth: 200 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Tamaño</label>
            <select value={size} onChange={(e) => setSize(e.target.value as 'small' | 'medium')} style={sel}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
            </select>
          </div>
          <label style={chk}>
            <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            Checked
          </label>
          <label style={chk}>
            <input type="checkbox" checked={showText} onChange={(e) => { setShowText(e.target.checked); if (e.target.checked) setShowIcon(false); }} />
            Text (ON / OFF)
          </label>
          <label style={chk}>
            <input type="checkbox" checked={showIcon} onChange={(e) => { setShowIcon(e.target.checked); if (e.target.checked) setShowText(false); }} />
            Icon (✓ / ✗)
          </label>
          <label style={chk}>
            <input type="checkbox" checked={loading} onChange={(e) => setLoading(e.target.checked)} />
            Loading
          </label>
          <label style={chk}>
            <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
            Disabled
          </label>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSwitch
          label="Notificaciones activas"
          checked={checked}
          onCheckedChange={setChecked}
          size={size}
          showText={showText}
          showIcon={showIcon}
          loading={loading}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

function CheckboxPlayground() {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(false);
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState<any>('default');
  const [showLabel, setShowLabel] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [groupValue, setGroupValue] = useState(['Apple', 'Orange']);

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  const options = [
    { label: 'Manzana', value: 'Apple' },
    { label: 'Pera', value: 'Pear' },
    { label: 'Naranja', value: 'Orange' },
  ];

  const allVals = options.map(o => o.value);
  const checkAllChecked = groupValue.length === allVals.length;
  const checkAllIndet = groupValue.length > 0 && groupValue.length < allVals.length;

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 260 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Estado</label>
            <select value={status} onChange={e => setStatus(e.target.value)} style={sel}>
              {['default', 'error', 'warning'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {[
              { label: 'Checked', active: checked === true, onChange: (v: boolean) => setChecked(v) },
              { label: 'Indeterminate', active: checked === 'indeterminate', onChange: (v: boolean) => setChecked(v ? 'indeterminate' : false) },
              { label: 'Disabled', active: disabled, onChange: setDisabled },
              { label: 'Hovering', active: isHovered, onChange: setIsHovered },
              { label: 'Label', active: showLabel, onChange: setShowLabel },
            ].map(({ label, active, onChange }) => (
              <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
                <input type="checkbox" checked={active} onChange={e => onChange(e.target.checked)} /> {label}
              </label>
            ))}
          </div>
        </div>

        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 24 }}>Checkbox Group (Select All)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ borderBottom: `1px solid ${khorTokens.colors.neutral[200]}`, paddingBottom: 8, marginBottom: 8 }}>
            <KCheckbox
              checked={checkAllIndet ? 'indeterminate' : checkAllChecked}
              onCheckedChange={v => { if (v === true) setGroupValue(allVals); else setGroupValue([]); }}
            >
              Seleccionar todos
            </KCheckbox>
          </div>
          <KCheckbox.Group options={options} value={groupValue} onChange={setGroupValue} />
          <pre style={{ fontSize: 11, color: khorTokens.colors.neutral[500], marginTop: 4 }}>
            Selección: {JSON.stringify(groupValue)}
          </pre>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KCheckbox
          label={showLabel ? 'Label' : undefined}
          checked={checked}
          onCheckedChange={v => setChecked(v)}
          disabled={disabled}
          status={status}
          isHovered={isHovered}
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
  const [showIcon, setShowIcon] = useState(false);
  const [showLabel, setShowLabel] = useState(false);

  const marks = {
    0: '0',
    8: '8',
    16: '16',
    24: '24',
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
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showIcon} onChange={(e) => setShowIcon(e.target.checked)} /> Icon</label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}><input type="checkbox" checked={showLabel} onChange={(e) => setShowLabel(e.target.checked)} /> Label</label>
          </div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], margin: 0 }}>Valor: {range ? rangeVal.join(' – ') : value[0]}</p>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <div style={{ width: vertical ? 100 : '100%', height: vertical ? 300 : 'auto', maxWidth: 320, paddingBottom: showMarks ? 28 : 0 }}>
          <KSlider
            value={range ? rangeVal : value}
            onChange={(v) => range ? setRangeVal(v as number[]) : setValue(v as number[])}
            min={0}
            max={showMarks ? 24 : 100}
            step={step}
            disabled={disabled}
            showValue={showValue}
            range={range}
            reverse={reverse}
            vertical={vertical}
            marks={showMarks ? marks : undefined}
            suffixIcon={showIcon ? <Smile size={18} /> : undefined}
            label={showLabel ? 'Label' : undefined}
            tooltip={{ open: showValue ? true : undefined }}
          />
        </div>
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

function SelectInputPlayground() {
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [status, setStatus] = useState<'default' | 'error' | 'warning'>('default');
  const [labelPosition, setLabelPosition] = useState<'top' | 'side'>('top');
  const [required, setRequired] = useState(false);
  const [optional, setOptional] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [val, setVal] = useState('');

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  const chk = { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' } as const;
  const opts = [{ label: 'Opción A', value: 'a' }, { label: 'Opción B', value: 'b' }, { label: 'Opción C', value: 'c' }];

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Tamaño</label>
            <select value={size} onChange={e => setSize(e.target.value as any)} style={sel}>
              <option value="sm">sm (32px)</option>
              <option value="md">md (36px)</option>
              <option value="lg">lg (40px)</option>
            </select>
          </div>
          <div>
            <label style={ctrl}>Estado</label>
            <select value={status} onChange={e => setStatus(e.target.value as any)} style={sel}>
              <option value="default">default</option>
              <option value="error">error</option>
              <option value="warning">warning</option>
            </select>
          </div>
          <div>
            <label style={ctrl}>Posición del label</label>
            <select value={labelPosition} onChange={e => setLabelPosition(e.target.value as any)} style={sel}>
              <option value="top">top</option>
              <option value="side">side</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <label style={chk}><input type="checkbox" checked={required}  onChange={e => setRequired(e.target.checked)}  /> required</label>
            <label style={chk}><input type="checkbox" checked={optional}  onChange={e => setOptional(e.target.checked)}  /> optional</label>
            <label style={chk}><input type="checkbox" checked={tooltip}   onChange={e => setTooltip(e.target.checked)}   /> tooltip</label>
            <label style={chk}><input type="checkbox" checked={showHelp}  onChange={e => setShowHelp(e.target.checked)}  /> helpText</label>
            <label style={chk}><input type="checkbox" checked={disabled}  onChange={e => setDisabled(e.target.checked)}  /> disabled</label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 8 }}>
        <KSelectField
          size={size}
          status={status}
          label="Label"
          labelPosition={labelPosition}
          required={required}
          optional={optional}
          tooltip={tooltip ? 'Información adicional sobre este campo.' : undefined}
          helpText={showHelp ? "Please input passenger's name or delete this field." : undefined}
          disabled={disabled}
          value={val}
          onChange={v => setVal(v)}
          options={opts}
          placeholder="Seleccionar"
          block
        />
      </div>
    </div>
  );
}

function PhoneInputPlayground() {
  const [val, setVal] = useState('+52 5512345678');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [status, setStatus] = useState<'default' | 'error' | 'warning'>('default');
  const [disabled, setDisabled] = useState(false);
  const [block, setBlock] = useState(false);
  const [helperText, setHelperText] = useState('Ingresa un número válido de 10 dígitos.');

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };
  const checkStyle = { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 280 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Tamaño</label>
            <select value={size} onChange={(e) => setSize(e.target.value as any)} style={sel}>
              {['sm', 'md', 'lg'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={ctrl}>Estado</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as any)} style={sel}>
              {['default', 'error', 'warning'].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={ctrl}>Texto de Ayuda / Error</label>
            <input
              type="text"
              value={helperText}
              onChange={(e) => setHelperText(e.target.value)}
              style={sel}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 4 }}>
            <label style={checkStyle}>
              <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} /> Desactivado
            </label>
            <label style={checkStyle}>
              <input type="checkbox" checked={block} onChange={(e) => setBlock(e.target.checked)} /> Ancho completo (block)
            </label>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 280, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KPhoneInput
          value={val}
          onChange={setVal}
          size={size}
          status={status}
          disabled={disabled}
          block={block}
          helperText={helperText}
        />
        <div style={{ marginTop: 16, fontSize: 12, color: khorTokens.colors.neutral[500], fontFamily: 'monospace' }}>
          Valor emitido: "{val}"
        </div>
      </div>
    </div>
  );
}

function SearchPlayground() {
  const [enter, setEnter] = useState<KSearchEnter>('default');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [suffix, setSuffix] = useState(false);
  const [allowClear, setAllowClear] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const [lastSearch, setLastSearch] = useState('');

  const ctrl = { fontSize: 12, color: khorTokens.colors.neutral[400], display: 'block' as const, marginBottom: 4 };
  const sel = { padding: '6px 10px', borderRadius: 6, border: `1px solid ${khorTokens.colors.neutral[200]}`, fontSize: 13, width: '100%' };

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 240 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Controles</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label style={ctrl}>Size</label>
            <select value={size} onChange={e => setSize(e.target.value as any)} style={sel}>
              {['small', 'medium', 'large'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={ctrl}>Enter</label>
            <select value={enter} onChange={e => setEnter(e.target.value as KSearchEnter)} style={sel}>
              {['default', 'icon', 'text'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          {[
            { label: 'Suffix (Mic)', active: suffix, onChange: setSuffix },
            { label: 'Allow Clear', active: allowClear, onChange: setAllowClear },
            { label: 'Disabled', active: disabled, onChange: setDisabled },
          ].map(({ label, active, onChange }) => (
            <label key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
              <input type="checkbox" checked={active} onChange={e => onChange(e.target.checked)} /> {label}
            </label>
          ))}
        </div>
      </div>
      <div style={{ flex: 2, minWidth: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}>
        <KSearch
          size={size}
          enter={enter}
          suffix={suffix}
          allowClear={allowClear}
          disabled={disabled}
          onSearch={v => setLastSearch(v)}
          style={{ maxWidth: 400, width: '100%' }}
        />
        {lastSearch && (
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[500], margin: 0 }}>Búsqueda: "{lastSearch}"</p>
        )}
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
    name: 'Button',
    description: 'Boton principal del sistema con 6 variantes semanticas de Khor (Radix UI + custom), incluyendo estados de interaccion (hover +10% brightness, active -10% brightness, disabled greyscale 50%).',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Tipo × Color — Ghost OFF (Figma: Blue #051758 / Red #E04D36)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: khorTokens.colors.neutral[400], width: 56 }}>Primary</span>
              <KButton variant="primary" icon={<Save size={16} />}>Azul</KButton>
              <KButton variant="primary" color="secondary" icon={<Save size={16} />}>Rojo</KButton>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: khorTokens.colors.neutral[400], width: 56 }}>Outline</span>
              <KButton variant="outline">Azul</KButton>
              <KButton variant="outline" color="secondary">Rojo</KButton>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: khorTokens.colors.neutral[400], width: 56 }}>Dashed</span>
              <KButton variant="dashed">Azul</KButton>
              <KButton variant="dashed" color="secondary">Rojo</KButton>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: khorTokens.colors.neutral[400], width: 56 }}>Text</span>
              <KButton variant="text">Azul</KButton>
              <KButton variant="text" color="secondary">Rojo</KButton>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: khorTokens.colors.neutral[400], width: 56 }}>Link</span>
              <KButton variant="link">Azul</KButton>
              <KButton variant="link" color="secondary">Rojo</KButton>
            </div>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Ghost = ON (Figma solo lo define para Primary / Outline / Dashed)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: khorTokens.colors.neutral[400], width: 56 }}>Primary</span>
              <KButton variant="primary" ghost>Azul</KButton>
              <KButton variant="primary" ghost color="secondary">Rojo</KButton>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: khorTokens.colors.neutral[400], width: 56 }}>Outline</span>
              <KButton variant="outline" ghost>Azul</KButton>
              <KButton variant="outline" ghost color="secondary">Rojo</KButton>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: khorTokens.colors.neutral[400], width: 56 }}>Dashed</span>
              <KButton variant="dashed" ghost>Azul</KButton>
              <KButton variant="dashed" ghost color="secondary">Rojo</KButton>
            </div>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Tamaño × Color (Small 24px / Default 32px / Large 40px)</p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <KButton size="sm">Small</KButton>
            <KButton size="sm" color="secondary">Small</KButton>
            <KButton size="md">Default</KButton>
            <KButton size="md" color="secondary">Default</KButton>
            <KButton size="lg">Large</KButton>
            <KButton size="lg" color="secondary">Large</KButton>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Contenido × Color (Icon Only / Texto+Icono izq. / Texto+Icono der. / Solo texto)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <KButton size="icon" icon={<Save size={16} />} aria-label="Icono" />
              <KButton icon={<Save size={16} />} iconPosition="start">Icono izq.</KButton>
              <KButton icon={<Plus size={16} />} iconPosition="end">Icono der.</KButton>
              <KButton>Solo texto</KButton>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <KButton size="icon" color="secondary" icon={<Save size={16} />} aria-label="Icono" />
              <KButton color="secondary" icon={<Save size={16} />} iconPosition="start">Icono izq.</KButton>
              <KButton color="secondary" icon={<Plus size={16} />} iconPosition="end">Icono der.</KButton>
              <KButton color="secondary">Solo texto</KButton>
            </div>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Forma × Color (Square / Round)</p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <KButton shape="default">Square</KButton>
            <KButton shape="round">Round</KButton>
            <KButton shape="default" color="secondary">Square</KButton>
            <KButton shape="round" color="secondary">Round</KButton>
          </div>
        </div>

        <div>
          <p style={{ fontSize: 12, color: khorTokens.colors.neutral[400], marginBottom: 8 }}>Otras variantes (no Figma / legacy)</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <KButton variant="secondary">Secundario</KButton>
            <KButton variant="danger" icon={<Trash2 size={16} />}>Peligro</KButton>
            <KButton variant="navy">Navy</KButton>
            <KButton loading>Cargando</KButton>
          </div>
        </div>
      </div>
    ),
    playground: <ButtonPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <ButtonStateRow variant="primary" label="Primary / Blue" />
        <ButtonStateRow variant="primary" color="secondary" label="Primary / Red" />
        <ButtonStateRow variant="outline" label="Outline / Blue" />
        <ButtonStateRow variant="outline" color="secondary" label="Outline / Red" />
        <ButtonStateRow variant="dashed" label="Dashed / Blue" />
        <ButtonStateRow variant="dashed" color="secondary" label="Dashed / Red" />
        <ButtonStateRow variant="primary" ghost label="Ghost / Blue" />
        <ButtonStateRow variant="primary" ghost color="secondary" label="Ghost / Red" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Loading (estado adicional, no Figma)</span>
          <KButton loading>Botón</KButton>
        </div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Navega al componente y lanza focus ring.', 'Enter/Space: Dispara evento onClick.'],
      aria: ['role="button"', 'aria-disabled="true" y tabIndex={-1} cuando desactivado.', 'aria-busy="true" global durante loading.'],
      contrast: 'AA sobre blanco (ratio 4.8:1 — primary sobre white no alcanza AAA de 7:1)',
      score: 96,
    },
    code: `import { KButton } from '@khor/design-system/atoms/index';

// Variantes disponibles: primary | secondary | outline | dashed | ghost | danger | navy
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
</KButton>

<KButton variant="outline" color="secondary" ghost shape="round">
  Ghost Rojo
</KButton>`,
    filename: 'Button/index.tsx',
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'outline' | 'dashed' | 'ghost' | 'danger' | 'navy'", default: "'primary'", description: 'Variante visual del botón.' },
      { name: 'color', type: "'default' | 'secondary' | 'danger'", default: "'default'", description: 'Tinte del botón según Figma (Color: Blue/Red). \'default\' = Blue, \'secondary\' = Red. Aplica sobre cualquier variant.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño del botón (24px / 32px / 40px de alto, según Figma).' },
      { name: 'shape', type: "'default' | 'circle' | 'round'", default: "'default'", description: 'Forma del botón. Figma define Default (square) y Round; circle es una variante extra para icon-only.' },
      { name: 'ghost', type: 'boolean', default: 'false', description: 'Figma Ghost=True: fondo transparente con borde y texto en tono ghost (azul o rojo según color). Solo definido en Figma para Primary, Outline y Dashed.' },
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
    name: 'Input',
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
    stateShowcase: (() => {
      const col = (label: string) => (
        <div style={{ fontSize: 10, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{label}</div>
      );
      const states: Array<{ label: string; props: Record<string, any> }> = [
        { label: 'Normal',   props: {} },
        { label: 'Focused',  props: { isFocused: true } },
        { label: 'Error',    props: { status: 'error' } },
        { label: 'Warning',  props: { status: 'warning' } },
        { label: 'Disabled', props: { disabled: true } },
      ];
      const sizes: Array<'sm' | 'md' | 'lg'> = ['lg', 'md', 'sm'];
      const colW = 160;

      const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>{title}</div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colW}px)`, gap: '8px 12px' }}>
            {children}
          </div>
        </div>
      );

      return (
        <div style={{ overflowX: 'auto', overflowY: 'visible', padding: '4px 4px 4px 4px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: `${states.length * (colW + 12)}px` }}>
          {/* Column headers */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colW}px)`, gap: '0 12px', marginBottom: 4 }}>
            {states.map(s => col(s.label))}
          </div>

          {/* ── Base input ── */}
          <Section title="Sin ícono — Filled">
            {sizes.map(sz => states.map(s => (
              <KInput key={`${sz}-${s.label}`} size={sz} placeholder="Escribir" defaultValue="Escribir" {...s.props} />
            )))}
          </Section>

          <Section title="Sin ícono — Empty">
            {sizes.map(sz => states.map(s => (
              <KInput key={`${sz}-${s.label}`} size={sz} placeholder="Escribir" {...s.props} />
            )))}
          </Section>

          {/* ── Icon Prefix ── */}
          <Section title="Icon Prefix — Filled">
            {sizes.map(sz => states.map(s => (
              <KInput key={`${sz}-${s.label}`} size={sz} prefix={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>} defaultValue="Escribir" placeholder="Escribir" {...s.props} />
            )))}
          </Section>

          <Section title="Icon Prefix — Empty">
            {sizes.map(sz => states.map(s => (
              <KInput key={`${sz}-${s.label}`} size={sz} prefix={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>} placeholder="Escribir" {...s.props} />
            )))}
          </Section>

          {/* ── Icon Suffix ── */}
          <Section title="Icon Suffix — Filled">
            {sizes.map(sz => states.map(s => (
              <KInput key={`${sz}-${s.label}`} size={sz} suffix={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>} defaultValue="Escribir" placeholder="Escribir" {...s.props} />
            )))}
          </Section>

          <Section title="Icon Suffix — Empty">
            {sizes.map(sz => states.map(s => (
              <KInput key={`${sz}-${s.label}`} size={sz} suffix={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/></svg>} placeholder="Escribir" {...s.props} />
            )))}
          </Section>

          {/* ── Allow Clear ── */}
          <Section title="Allow Clear — Filled">
            {sizes.map(sz => states.map(s => (
              <KInput key={`${sz}-${s.label}`} size={sz} allowClear defaultValue="Escribir" placeholder="Escribir" {...s.props} />
            )))}
          </Section>

          <Section title="Allow Clear — Empty">
            {sizes.map(sz => states.map(s => (
              <KInput key={`${sz}-${s.label}`} size={sz} allowClear placeholder="Escribir" {...s.props} />
            )))}
          </Section>

          {/* ── Upper Label ── */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Upper Label — variantes</div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colW}px)`, gap: '16px 12px' }}>
              {states.map(s => [
                <KInput key={`${s.label}-lbl`}        label="Label" placeholder="Escribir" {...s.props} />,
                <KInput key={`${s.label}-req`}        label="Label" required placeholder="Escribir" {...s.props} />,
                <KInput key={`${s.label}-tip`}        label="Label" tooltip="Información adicional" placeholder="Escribir" {...s.props} />,
                <KInput key={`${s.label}-req-tip`}    label="Label" required tooltip="Información adicional" placeholder="Escribir" {...s.props} />,
                <KInput key={`${s.label}-opt-tip`}    label="Label" optional tooltip="Información adicional" placeholder="Escribir" {...s.props} />,
                <KInput key={`${s.label}-opt`}        label="Label" optional placeholder="Escribir" {...s.props} />,
              ])}
            </div>
          </div>

          {/* ── Upper Label + Help Text ── */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Upper Label + Help Text</div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colW}px)`, gap: '16px 12px' }}>
              {states.map(s => [
                <KInput key={`${s.label}-h`}         label="Label" helpText="Please input passenger's name or delete this field." placeholder="Escribir" {...(s.props.status === 'error' ? { ...s.props, status: 'error' } : s.props)} />,
                <KInput key={`${s.label}-h-req`}     label="Label" required helpText="Please input passenger's name or delete this field." placeholder="Escribir" {...s.props} />,
                <KInput key={`${s.label}-h-tip`}     label="Label" tooltip="Info" helpText="Please input passenger's name or delete this field." placeholder="Escribir" {...s.props} />,
                <KInput key={`${s.label}-h-rt`}      label="Label" required tooltip="Info" helpText="Please input passenger's name or delete this field." placeholder="Escribir" {...s.props} />,
                <KInput key={`${s.label}-h-ot`}      label="Label" optional tooltip="Info" helpText="Please input passenger's name or delete this field." placeholder="Escribir" {...s.props} />,
                <KInput key={`${s.label}-h-o`}       label="Label" optional helpText="Please input passenger's name or delete this field." placeholder="Escribir" {...s.props} />,
              ])}
            </div>
          </div>

          {/* ── Side Label ── */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Side Label — variantes</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 520 }}>
              {states.slice(0, 1).map(s => ([
                <KInput key="s1" label="Label" labelPosition="side" placeholder="Escribir" />,
                <KInput key="s2" label="Label" labelPosition="side" required placeholder="Escribir" />,
                <KInput key="s3" label="Label" labelPosition="side" tooltip="Info adicional" placeholder="Escribir" />,
                <KInput key="s4" label="Label" labelPosition="side" required tooltip="Info adicional" placeholder="Escribir" />,
                <KInput key="s5" label="Label" labelPosition="side" optional tooltip="Info adicional" placeholder="Escribir" />,
                <KInput key="s6" label="Label" labelPosition="side" optional placeholder="Escribir" />,
              ]))}
            </div>
          </div>
        </div>
        </div>
      );
    })(),
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
    filename: 'Input/index.tsx',
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

  'input-password': {
    id: 'input-password',
    name: 'Input.Password',
    description: 'Variante de KInput para contraseñas con toggle de visibilidad (ojo). Hereda todos los tokens de color, tamaños y estados de KInput base.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 360 }}>
        <KInput.Password placeholder="Contraseña" />
        <KInput.Password placeholder="Contraseña" prefix={<Lock size={14} />} />
        <KInput.Password placeholder="Contraseña" status="error" helpText="Contraseña incorrecta" prefix={<Lock size={14} />} />
        <KInput.Password placeholder="Contraseña" disabled prefix={<Lock size={14} />} />
      </div>
    ),
    playground: <PasswordPlayground />,
    stateShowcase: (() => {
      const states: Array<{ label: string; props: Record<string, any> }> = [
        { label: 'Normal',   props: {} },
        { label: 'Focused',  props: { isFocused: true } },
        { label: 'Error',    props: { status: 'error' } },
        { label: 'Warning',  props: { status: 'warning' } },
        { label: 'Disabled', props: { disabled: true } },
      ];
      const sizes: Array<'sm' | 'md' | 'lg'> = ['lg', 'md', 'sm'];
      const colW = 160;
      const col = (label: string) => (
        <div style={{ fontSize: 10, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>{label}</div>
      );
      const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>{title}</div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colW}px)`, gap: '8px 12px' }}>
            {children}
          </div>
        </div>
      );
      return (
        <div style={{ overflowX: 'auto', padding: '4px 4px 4px 4px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: `${states.length * (colW + 12)}px` }}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colW}px)`, gap: '0 12px', marginBottom: 4 }}>
              {states.map(s => col(s.label))}
            </div>
            <Section title="Sin prefijo — Empty">
              {sizes.map(sz => states.map(s => (
                <KInput.Password key={`${sz}-${s.label}`} size={sz} placeholder="Contraseña" {...s.props} />
              )))}
            </Section>
            <Section title="Sin prefijo — Filled">
              {sizes.map(sz => states.map(s => (
                <KInput.Password key={`${sz}-${s.label}`} size={sz} defaultValue="mypassword123" placeholder="Contraseña" {...s.props} />
              )))}
            </Section>
            <Section title="Con ícono Lock (prefix)">
              {sizes.map(sz => states.map(s => (
                <KInput.Password key={`${sz}-${s.label}`} size={sz} prefix={<Lock size={sz === 'sm' ? 12 : sz === 'lg' ? 16 : 14} />} placeholder="Contraseña" {...s.props} />
              )))}
            </Section>
            <Section title="Con prefijo + Help Text">
              {states.map(s => (
                <KInput.Password key={s.label} size="md" prefix={<Lock size={14} />} placeholder="Contraseña" helpText={s.props.status === 'error' ? 'Contraseña incorrecta' : s.props.status === 'warning' ? 'Contraseña débil' : 'Mínimo 8 caracteres'} {...s.props} />
              ))}
            </Section>
          </div>
        </div>
      );
    })(),
    anatomy: [
      { label: 'Input Field', description: 'Campo de texto nativo. Alterna entre type="password" y type="text" según el toggle.' },
      { label: 'Lock Prefix', description: 'Ícono opcional al inicio del campo (recomendado: lucide Lock).', optional: true },
      { label: 'Eye Toggle', description: 'Botón al final que alterna la visibilidad. Eye = visible, EyeOff = oculta.' },
      { label: 'Help Text', description: 'Texto debajo del campo para errores o instrucciones (hereda color del status).', optional: true },
    ],
    a11ySummary: {
      keyboard: ['Tab: Foco al input, luego al botón Eye.', 'Enter / Space: Alterna visibilidad desde el botón Eye.'],
      aria: ['type="password" por defecto — lectores de pantalla anuncian el campo como contraseña.', 'Botón Eye tiene title "Mostrar/Ocultar contraseña".'],
      contrast: 'AA — texto sobre fondo blanco, ícono Eye gris sobre blanco.',
      score: 95,
    },
    code: `import { KInput } from '@khor/design-system/atoms/index';
import { Lock } from 'lucide-react';

// Básico
<KInput.Password placeholder="Contraseña" />

// Con ícono y validación
<KInput.Password
  prefix={<Lock size={14} />}
  status="error"
  helpText="Contraseña incorrecta"
  placeholder="Contraseña"
/>

// Control externo de visibilidad
<KInput.Password
  visibilityToggle={{ visible, onVisibleChange: setVisible }}
  placeholder="Contraseña"
/>

// Deshabilitado
<KInput.Password disabled placeholder="Contraseña" />`,
    filename: 'Input/index.tsx',
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Altura: 32px / 36px / 40px. Hereda de KInput.' },
      { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Estado visual del borde.' },
      { name: 'prefix', type: 'ReactNode', description: 'Elemento al inicio (ej: ícono Lock).', optional: true },
      { name: 'helpText', type: 'string', description: 'Texto de ayuda / error debajo del campo.', optional: true },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva el campo.' },
      { name: 'visibilityToggle', type: 'boolean | { visible, onVisibleChange }', default: 'true', description: 'Controla el toggle de visibilidad.' },
      { name: 'iconRender', type: '(visible: boolean) => ReactNode', description: 'Renderizado personalizado del ícono Eye.', optional: true },
      { name: 'isFocused', type: 'boolean', description: 'Fuerza estado de foco (playground/preview).', optional: true },
    ],
    guidelines: [
      'Siempre usa prefix={<Lock />} en formularios de login para reforzar el contexto visual.',
      'Combina status="error" + helpText para mostrar errores de validación.',
      'Usa visibilityToggle={{ visible, onVisibleChange }} para controlar la visibilidad desde el componente padre.',
    ],
    aiNotes: 'KInput.Password — parte del compound KInput. Mismos tokens que KInput base. Props extra: visibilityToggle, iconRender.',
  },

  'search-input': {
    id: 'search-input',
    name: 'Search',
    description: 'Barra de búsqueda con tres estilos de botón (Enter: default, icon, text), tamaños small/medium/large, sufijo micrófono y soporte para allow-clear. Figma: 187676-6781.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
        <KSearch placeholder="Buscar" enter="default" />
        <KSearch placeholder="Buscar" enter="icon" />
        <KSearch placeholder="Buscar" enter="text" />
        <KSearch placeholder="Buscar" enter="text" suffix allowClear defaultValue="search text" />
      </div>
    ),
    playground: <SearchPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Enter variants × size */}
        {(['default', 'icon', 'text'] as KSearchEnter[]).map(e => (
          <div key={e}>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, marginTop: 0 }}>
              Enter={e} — small / medium / large
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(['small', 'medium', 'large'] as const).map(sz => (
                <KSearch key={sz} enter={e} size={sz} placeholder="Buscar" style={{ maxWidth: 360 }} />
              ))}
            </div>
          </div>
        ))}

        {/* With suffix (mic) */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, marginTop: 0 }}>Suffix (micrófono) — default / icon / text</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <KSearch enter="default" suffix placeholder="Buscar" style={{ maxWidth: 360 }} />
            <KSearch enter="icon" suffix placeholder="Buscar" style={{ maxWidth: 360 }} />
            <KSearch enter="text" suffix placeholder="Buscar" style={{ maxWidth: 360 }} />
          </div>
        </div>

        {/* Allow Clear — filled */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, marginTop: 0 }}>Filled + Allow Clear</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <KSearch enter="default" allowClear defaultValue="search text" style={{ maxWidth: 360 }} />
            <KSearch enter="icon" allowClear suffix defaultValue="search text" style={{ maxWidth: 360 }} />
            <KSearch enter="text" allowClear suffix defaultValue="search text" style={{ maxWidth: 360 }} />
          </div>
        </div>

        {/* Disabled */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10, marginTop: 0 }}>Disabled — default / icon / text</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <KSearch enter="default" disabled placeholder="Buscar" style={{ maxWidth: 360 }} />
            <KSearch enter="icon" disabled suffix placeholder="Buscar" style={{ maxWidth: 360 }} />
            <KSearch enter="text" disabled suffix placeholder="Buscar" style={{ maxWidth: 360 }} />
          </div>
        </div>
      </div>
    ),
    anatomy: [
      { label: 'Input Area', description: 'Campo de texto nativo (flex: 1). Placeholder gris, texto navy cuando filled.' },
      { label: 'Clear Button (×)', description: 'Aparece cuando allowClear=true y el input tiene contenido. Limpia el valor y dispara onSearch("").', optional: true },
      { label: 'Mic Icon (Suffix)', description: 'Ícono de micrófono opcional. Se muestra con suffix=true antes del botón de búsqueda.', optional: true },
      { label: 'Enter — default', description: 'Ícono de lupa inline, sin fondo. Solo color hover. Dispara onSearch al click o Enter.' },
      { label: 'Enter — icon', description: 'Botón rojo cuadrado (#E04D36) con ícono de lupa. Ancho = alto del input.' },
      { label: 'Enter — text', description: 'Botón rojo rectangular (#E04D36) con ícono de lupa + texto "Buscar". Configurable vía enterText.' },
    ],
    a11ySummary: {
      keyboard: ['Enter: Dispara onSearch con el valor actual.', 'Tab: Foco nativo al input, luego al botón Enter.', 'Esc / Clear: Limpia el valor si allowClear=true.'],
      aria: ['Input nativo con placeholder y aria-label implícito.', 'Botón Enter tiene tipo "button" para no hacer submit accidental.'],
      contrast: 'Texto white sobre #E04D36 cumple AA (4.5:1+).',
      score: 98,
    },
    code: `import { KSearch } from '@khor/design-system/atoms/index';

// Básico (enter inline)
<KSearch placeholder="Buscar" onSearch={v => console.log(v)} />

// Botón icono rojo
<KSearch enter="icon" onSearch={v => console.log(v)} />

// Botón texto rojo + micrófono + clear
<KSearch
  enter="text"
  suffix
  allowClear
  size="large"
  placeholder="Buscar empleados..."
  onSearch={v => search(v)}
/>

// Deshabilitado
<KSearch enter="icon" disabled />`,
    filename: 'Search/index.tsx',
    props: [
      { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Altura del buscador: 32px / 36px / 40px.' },
      { name: 'enter', type: "'default' | 'icon' | 'text'", default: "'default'", description: 'Estilo del botón de búsqueda. default=lupa inline, icon=botón rojo cuadrado, text=botón rojo con texto.' },
      { name: 'suffix', type: 'boolean', default: 'false', description: 'Muestra ícono de micrófono antes del botón Enter.' },
      { name: 'allowClear', type: 'boolean', default: 'false', description: 'Muestra botón × para limpiar el input cuando tiene contenido.' },
      { name: 'enterText', type: 'string', default: "'Buscar'", description: 'Texto del botón cuando enter="text".' },
      { name: 'onSearch', type: '(value: string, e?) => void', description: 'Callback al presionar Enter o el botón de búsqueda.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva el componente completo.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Anima el ícono de lupa (pulse) durante la búsqueda.' },
      { name: 'placeholder', type: 'string', default: "'Buscar'", description: 'Texto placeholder del input.' },
    ],
    guidelines: [
      'Usa enter="default" para buscadores compactos dentro de toolbars.',
      'Usa enter="icon" o enter="text" cuando la acción de búsqueda es el CTA principal.',
      'Activa suffix cuando la búsqueda por voz es soportada.',
      'Combina allowClear con onSearch para resetear resultados al limpiar.',
    ],
    aiNotes: 'KSearch: barra de búsqueda standalone. Enter: default/icon/text. Colores: btn rojo #E04D36, hover #c73a2a. Distinto de KInput.Search (legacy).',
  },

  badge: {
    id: 'badge',
    name: 'Badge',
    description: 'Notificador de estados o contadores sobre elementos. Incluye variante Ribbon para cintas en esquinas. Paridad 100% con Ant Design v5.',
    preview: (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <KBadge count={5}><div style={{ width: 32, height: 32, background: khorTokens.colors.neutral[200], borderRadius: 4 }} /></KBadge>
        <KBadge dot><div style={{ width: 32, height: 32, background: khorTokens.colors.neutral[200], borderRadius: 4 }} /></KBadge>
        <KBadge status="success" text="Activo" />
        <KBadge.Ribbon text="Nuevo"><div style={{ width: 100, height: 40, background: khorTokens.colors.neutral[200], borderRadius: 4 }} /></KBadge.Ribbon>
      </div>
    ),
    playground: <BadgePlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <KBadge status="success" text="Success" />
        <KBadge status="error" text="Error" />
        <KBadge status="warning" text="Warning" />
        <KBadge status="processing" text="Processing" />
        <KBadge count={100} overflowCount={99}><div style={{ width: 40, height: 40, background: khorTokens.colors.neutral[100], borderRadius: 8 }} /></KBadge>
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
    filename: 'Badge/index.tsx',
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
      { name: 'Badge.Ribbon', type: 'Sub-component', description: 'Cinta decorativa para esquinas.' },
    ],
    guidelines: [
      'Usa status para indicadores de sistema standalone.',
      'Usa count para notificaciones de usuario sobre iconos o avatares.',
      'Ribbon es ideal para destacar tarjetas o secciones completas.',
    ],
    aiNotes: 'KBadge soporta modo standalone (dot+text) y modo flotante (count). Usa Ribbon para banners promocionales o de estado en esquinas.',
  },
  'badge-count': {
    id: 'badge-count',
    name: 'BadgeCount',
    description: 'Badge de conteo inline (Figma: Badge/Count). Pastilla circular con número, 4 colores y 3 tamaños. Usado junto a etiquetas de tabs y listas.',
    preview: (
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <KBadgeCount count="99" color="blue" size="md" />
        <KBadgeCount count="99" color="blue-invert" size="md" />
        <KBadgeCount count="99" color="gray" size="md" />
        <KBadgeCount count="99" color="red" size="md" />
      </div>
    ),
    playground: (
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        {(['blue','blue-invert','gray','red'] as const).map(c =>
          (['sm','md','lg'] as const).map(s => (
            <KBadgeCount key={`${c}-${s}`} count="99" color={c} size={s} />
          ))
        )}
      </div>
    ),
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <KBadgeCount count="9"  color="blue" size="sm" />
          <KBadgeCount count="99" color="blue" size="sm" />
          <KBadgeCount count="9"  color="blue" size="md" />
          <KBadgeCount count="99" color="blue" size="md" />
          <KBadgeCount count="9"  color="blue" size="lg" />
          <KBadgeCount count="99" color="blue" size="lg" />
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <KBadgeCount count="99" color="blue-invert" size="md" />
          <KBadgeCount count="99" color="gray" size="md" />
          <KBadgeCount count="99" color="red" size="md" />
        </div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['No interactivo — solo visual.'],
      aria: ['aria-label en el contenedor padre indica el conteo.'],
      contrast: 'AA — todos los colores cumplen contraste mínimo.',
      score: 95,
    },
    code: `import { KBadgeCount } from '@khor/design-system/atoms/KBadge';

<KBadgeCount count="99" color="blue" size="md" />
<KBadgeCount count="9"  color="red"  size="sm" />
<KBadgeCount count="99" color="gray" size="lg" />`,
    filename: 'Badge/index.tsx',
    props: [
      { name: 'count', type: 'ReactNode', description: 'Número o texto a mostrar dentro de la pastilla.' },
      { name: 'color', type: "'blue' | 'blue-invert' | 'gray' | 'red'", default: "'blue'", description: 'Esquema de color de la pastilla.' },
      { name: 'size',  type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño (sm=16px, md=20px, lg=24px).' },
    ],
    guidelines: [
      'Usar color "blue" para conteos primarios (tabs activos, notificaciones del sistema).',
      'Usar color "red" para alertas críticas o conteos de error.',
      'Usar "gray" para conteos secundarios o desactivados.',
      '"blue-invert" para conteos sobre fondos claros que requieren contraste visual.',
    ],
    aiNotes: 'KBadgeCount es un badge inline sin hijos (no flotante). Úsalo dentro de KTabsTrigger junto al label para mostrar conteos.',
  },
  tag: {
    id: 'tag',
    name: 'Tag',
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
    filename: 'Tag/index.tsx',
    props: [
      { name: 'color', type: 'KTagColor | string', description: 'Presets de AntD (magenta, volcano, gold, etc.) o color CSS.' },
      { name: 'closable', type: 'boolean', description: 'Muestra un botón de cierre.' },
      { name: 'bordered', type: 'boolean', default: 'true', description: 'Define si tiene borde visible.' },
      { name: 'icon', type: 'ReactNode', description: 'Icono al inicio del tag.' },
      { name: 'onClose', type: '(e) => void', description: 'Callback al cerrar. Si no se provee, el componente se oculta automáticamente.' },
      { name: 'closeIcon', type: 'ReactNode', description: 'Icono de cierre personalizado.' },
      { name: 'checked', type: 'boolean', description: 'Estado en CheckableTag.' },
      { name: 'Tag.CheckableTag', type: 'Sub-component', description: 'Variante interactiva tipo toggle.' },
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
    name: 'Avatar',
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
    filename: 'Avatar/index.tsx',
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
    aiNotes: 'KAvatar para fotos de perfil con iniciales de fallback, indicador online/offline y badge de notificación.',
  },
  switch: {
    id: 'switch',
    name: 'Switch',
    description: 'Interruptor on/off. Dos tamaños (small/medium), texto ON/OFF, íconos ✓/✗, estado loading y disabled.',
    preview: (() => {
      const row = (label: string, nodes: React.ReactNode) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 11, color: khorTokens.colors.neutral[400], width: 80, flexShrink: 0 }}>{label}</span>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>{nodes}</div>
        </div>
      );
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {row('Medium', <>
            <KSwitch size="medium" checked />
            <KSwitch size="medium" />
            <KSwitch size="medium" checked disabled />
            <KSwitch size="medium" disabled />
          </>)}
          {row('+ Text', <>
            <KSwitch size="medium" checked showText />
            <KSwitch size="medium" showText />
            <KSwitch size="medium" checked showText disabled />
            <KSwitch size="medium" showText disabled />
          </>)}
          {row('+ Icon', <>
            <KSwitch size="medium" checked showIcon />
            <KSwitch size="medium" showIcon />
            <KSwitch size="medium" checked showIcon disabled />
            <KSwitch size="medium" showIcon disabled />
          </>)}
          {row('Loading', <>
            <KSwitch size="medium" checked loading />
            <KSwitch size="medium" loading />
          </>)}
          {row('Small', <>
            <KSwitch size="small" checked />
            <KSwitch size="small" />
            <KSwitch size="small" checked showText />
            <KSwitch size="small" showText />
            <KSwitch size="small" checked showIcon />
            <KSwitch size="small" showIcon />
          </>)}
        </div>
      );
    })(),
    playground: <SwitchPlayground />,
    a11ySummary: {
      keyboard: ['Tab: Navega al switch.', 'Espacio: Alterna (toggle).'],
      aria: ['role="switch" nativo via Radix.', 'aria-checked sincronizado automáticamente.'],
      contrast: 'AAA — texto blanco sobre navy #051758 (checked) y sobre slate-300 (unchecked).',
      score: 100,
    },
    code: `import { KSwitch } from '@khor/design-system/atoms/index';

// Básico
<KSwitch checked={isOn} onCheckedChange={setIsOn} label="Notificaciones" />

// Con texto ON/OFF dentro del track
<KSwitch checked={isOn} onCheckedChange={setIsOn} showText />

// Con íconos ✓/✗ dentro del track
<KSwitch checked={isOn} onCheckedChange={setIsOn} showIcon />

// Small + loading
<KSwitch size="small" loading />`,
    filename: 'Switch/index.tsx',
    props: [
      { name: 'checked',            type: 'boolean',                         description: 'Estado controlado (on/off).' },
      { name: 'defaultChecked',     type: 'boolean',                         description: 'Estado inicial no controlado.' },
      { name: 'onCheckedChange',    type: '(checked: boolean) => void',      description: 'Callback al cambiar estado.' },
      { name: 'size',               type: "'small' | 'medium'",              default: "'medium'", description: 'Tamaño del switch.' },
      { name: 'showText',           type: 'boolean',                         default: 'false', description: 'Muestra "ON"/"OFF" dentro del track.' },
      { name: 'showIcon',           type: 'boolean',                         default: 'false', description: 'Muestra ✓/✗ dentro del track.' },
      { name: 'loading',            type: 'boolean',                         default: 'false', description: 'Spinner en el thumb, deshabilita interacción.' },
      { name: 'disabled',           type: 'boolean',                         default: 'false', description: 'Estado deshabilitado.' },
      { name: 'label',              type: 'ReactNode',                       description: 'Etiqueta externa al switch.' },
      { name: 'checkedChildren',    type: 'ReactNode',                       description: 'Contenido custom en estado checked (reemplaza showText/showIcon).' },
      { name: 'unCheckedChildren',  type: 'ReactNode',                       description: 'Contenido custom en estado unchecked.' },
    ],
    guidelines: [
      'Siempre incluye label para accesibilidad.',
      'Usa showText o showIcon para mayor claridad cuando el contexto lo requiera.',
      'Para cambios que aplican inmediatamente; usa KCheckbox para selección en formularios.',
      'No combinar showText + showIcon — usa uno u otro.',
    ],
    aiNotes: 'KSwitch: toggle booleano, 2 tamaños, showText/showIcon para contenido en track. Checked=navy #051758, unchecked=slate-300. Loading deshabilita automáticamente.',
  },

  checkbox: {
    id: 'checkbox',
    name: 'Checkbox',
    description: 'Casilla de verificación para selección de opciones no excluyentes. Soporta estados checked, indeterminate, error y disabled. Incluye KCheckbox.Group para grupos con select-all.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <KCheckbox checked label="Label" />
            <KCheckbox label="Label" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <KCheckbox checked status="error" label="Label" />
            <KCheckbox status="error" label="Label" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <KCheckbox checked disabled label="Label" />
            <KCheckbox disabled label="Label" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <KCheckbox checked />
            <KCheckbox />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <KCheckbox checked status="error" />
            <KCheckbox status="error" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <KCheckbox checked disabled />
            <KCheckbox disabled />
          </div>
        </div>
      </div>
    ),
    playground: <CheckboxPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Header row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
          {['Default', 'Error', 'Disabled'].map(h => (
            <p key={h} style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>{h}</p>
          ))}
        </div>

        {/* Checked + Label */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, alignItems: 'center' }}>
          <KCheckbox checked label="Label" />
          <KCheckbox checked status="error" label="Label" />
          <KCheckbox checked disabled label="Label" />
        </div>

        {/* Unchecked + Label */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, alignItems: 'center' }}>
          <KCheckbox label="Label" />
          <KCheckbox status="error" label="Label" />
          <KCheckbox disabled label="Label" />
        </div>

        {/* Indeterminate + Label */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, alignItems: 'center' }}>
          <KCheckbox checked="indeterminate" label="Label" />
          <KCheckbox checked="indeterminate" status="error" label="Label" />
          <KCheckbox checked="indeterminate" disabled label="Label" />
        </div>

        {/* Hover + Label */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, alignItems: 'center' }}>
          <KCheckbox isHovered label="Label" />
          <div />
          <div />
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #c8d4f0', marginTop: 4 }} />

        {/* Checked – no label */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, alignItems: 'center' }}>
          <KCheckbox checked />
          <KCheckbox checked status="error" />
          <KCheckbox checked disabled />
        </div>

        {/* Unchecked – no label */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, alignItems: 'center' }}>
          <KCheckbox />
          <KCheckbox status="error" />
          <KCheckbox disabled />
        </div>

        {/* Indeterminate – no label */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, alignItems: 'center' }}>
          <KCheckbox checked="indeterminate" />
          <KCheckbox checked="indeterminate" status="error" />
          <KCheckbox checked="indeterminate" disabled />
        </div>

        {/* Group */}
        <div style={{ borderTop: '1px solid #c8d4f0', paddingTop: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, marginTop: 0 }}>Grupo con Select All</p>
          <KCheckbox.Group options={['Opción A', 'Opción B', 'Opción C']} defaultValue={['Opción A']} />
        </div>
      </div>
    ),
    anatomy: [
      { label: 'Checkbox Box', description: 'Cuadrado 16×16px con border-radius 4px. Cambia fill y borde según estado: default, error o disabled.' },
      { label: 'Check Icon', description: 'Icono ✓ blanco (10×10px, strokeWidth 3.5). Visible cuando checked=true.' },
      { label: 'Minus Icon (Indeterminate)', description: 'Icono — blanco (10×10px). Visible cuando checked="indeterminate".', optional: true },
      { label: 'Label Text', description: 'Texto descriptivo a la derecha del box. Color navy por defecto, rojo en error, gris en disabled.', optional: true },
      { label: 'KCheckbox.Group', description: 'Contenedor que provee contexto de valores compartidos para múltiples checkboxes.', optional: true },
    ],
    a11ySummary: {
      keyboard: ['Tab: Enfocar la casilla.', 'Space: Alternar entre checked/unchecked.'],
      aria: ['role="checkbox" aplicado automáticamente por Radix UI.', 'aria-checked refleja el estado actual incluyendo "mixed" para indeterminate.'],
      contrast: 'Borde visible (3:1+). Check blanco sobre rojo #E04D36 cumple AA.',
      score: 100,
    },
    code: `import { KCheckbox } from '@khor/design-system/atoms/index';

// Básico con label
<KCheckbox label="Aceptar términos" />

// Checked
<KCheckbox checked label="Seleccionado" />

// Indeterminate (padre de lista)
<KCheckbox checked="indeterminate" label="Selección parcial" />

// Error
<KCheckbox status="error" label="Campo requerido" />

// Disabled
<KCheckbox checked disabled label="No editable" />

// Grupo de opciones
<KCheckbox.Group
  options={[
    { label: 'Manzana', value: 'apple' },
    { label: 'Pera', value: 'pear' },
    { label: 'Naranja', value: 'orange', disabled: true },
  ]}
  defaultValue={['apple']}
  onChange={(values) => console.log(values)}
/>`,
    filename: 'Checkbox/index.tsx',
    props: [
      { name: 'checked', type: "boolean | 'indeterminate'", description: 'Estado del checkbox. "indeterminate" muestra el icono Minus.' },
      { name: 'label', type: 'ReactNode', description: 'Texto o contenido adjunto al checkbox.', optional: true },
      { name: 'status', type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Variante de validación. Error muestra borde y fill rojo.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva la interacción. Box y label toman color gris.' },
      { name: 'isHovered', type: 'boolean', default: 'false', description: 'Fuerza el estado hover (útil para previews y playgrounds).' },
      { name: 'isFocused', type: 'boolean', default: 'false', description: 'Fuerza el estado focus con ring visible.' },
      { name: 'onCheckedChange', type: "(checked: boolean | 'indeterminate') => void", description: 'Callback al cambiar el estado.' },
      { name: 'classNames', type: '{ root?, input?, label? }', description: 'Clases adicionales por parte del componente.' },
      { name: 'styles', type: '{ root?, input?, label? }', description: 'Estilos inline por parte del componente.' },
      { name: 'Checkbox.Group', type: 'Sub-component', description: 'Agrupa múltiples checkboxes. Props: options, value, defaultValue, onChange, disabled.' },
    ],
    guidelines: [
      'Usa KCheckbox para opciones no excluyentes (el usuario puede seleccionar múltiples).',
      'El estado indeterminate es para checkboxes "padre" que controlan una lista parcialmente seleccionada.',
      'Usa status="error" para validación de formularios, combinado con un mensaje de error debajo.',
      'Prefiere KCheckbox.Group para listas dinámicas y manejo de estado compartido.',
    ],
    aiNotes: 'KCheckbox usa Radix UI. Checked default=#E04D36, error=#D32F2F, disabled=gray. Soporta Group con select-all e indeterminate.',
  },
  radio: {
    id: 'radio',
    name: 'Radio',
    description: 'Grupo de opciones mutuamente excluyentes (Radio-Group). Layout horizontal o vertical con 2–10 ítems. Incluye variante de botones y soporte para disabled individual o de grupo.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, marginTop: 0 }}>Horizontal — 2 / 3 / 4 ítems</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <KRadio.Group options={[{ label: '1st', value: '1' }, { label: '2nd', value: '2' }]} defaultValue="1" />
            <KRadio.Group options={[{ label: '1st', value: '1' }, { label: '2nd', value: '2' }, { label: '3rd', value: '3' }]} defaultValue="1" />
            <KRadio.Group options={[{ label: '1st', value: '1' }, { label: '2nd', value: '2' }, { label: '3rd', value: '3' }, { label: '4th', value: '4' }]} defaultValue="1" />
          </div>
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, marginTop: 0 }}>Vertical — 4 ítems con disabled</p>
          <div style={{ display: 'flex', gap: 32 }}>
            <KRadio.Group direction="vertical" options={[{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b' }, { label: 'Option C', value: 'c' }, { label: 'Option D', value: 'd' }]} defaultValue="a" />
            <KRadio.Group direction="vertical" options={[{ label: 'Option A', value: 'a' }, { label: 'Option B', value: 'b', disabled: true }, { label: 'Option C', value: 'c', disabled: true }]} defaultValue="a" />
          </div>
        </div>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8, marginTop: 0 }}>Variante botones — outline / solid</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <KRadio.Group options={[{ label: 'Día', value: 'd' }, { label: 'Semana', value: 'w' }, { label: 'Mes', value: 'm' }]} defaultValue="w" optionType="button" buttonStyle="outline" />
            <KRadio.Group options={[{ label: 'Día', value: 'd' }, { label: 'Semana', value: 'w' }, { label: 'Mes', value: 'm' }]} defaultValue="w" optionType="button" buttonStyle="solid" />
          </div>
        </div>
      </div>
    ),
    playground: <RadioPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Horizontal groups – different item counts */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, marginTop: 0 }}>Horizontal — 2 a 5 ítems</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[2, 3, 4, 5].map(n => (
              <KRadio.Group
                key={n}
                defaultValue="1"
                options={Array.from({ length: n }, (_, i) => ({
                  label: `${['1st','2nd','3rd','4th','5th'][i]}`,
                  value: String(i + 1),
                }))}
              />
            ))}
          </div>
        </div>

        {/* Vertical groups */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, marginTop: 0 }}>Vertical — Option A…D / A…F</p>
          <div style={{ display: 'flex', gap: 48 }}>
            {[4, 6].map(n => (
              <KRadio.Group
                key={n}
                direction="vertical"
                defaultValue="a"
                options={Array.from({ length: n }, (_, i) => ({
                  label: `Option ${String.fromCharCode(65 + i)}`,
                  value: String.fromCharCode(97 + i),
                }))}
              />
            ))}
          </div>
        </div>

        {/* Disabled states */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, marginTop: 0 }}>Disabled — seleccionado / no seleccionado / grupo completo</p>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <KRadio.Group
              direction="vertical"
              defaultValue="a"
              options={[
                { label: 'Seleccionado (disabled)', value: 'a', disabled: true },
                { label: 'No seleccionado (disabled)', value: 'b', disabled: true },
              ]}
            />
            <KRadio.Group
              direction="vertical"
              defaultValue="a"
              disabled
              options={[
                { label: 'Option A', value: 'a' },
                { label: 'Option B', value: 'b' },
                { label: 'Option C', value: 'c' },
              ]}
            />
          </div>
        </div>

        {/* Button variants */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, marginTop: 0 }}>Variante botones — outline / solid / disabled</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <KRadio.Group options={[{ label: 'Día', value: 'd' }, { label: 'Semana', value: 'w' }, { label: 'Mes', value: 'm' }, { label: 'Año', value: 'y' }]} defaultValue="w" optionType="button" buttonStyle="outline" />
            <KRadio.Group options={[{ label: 'Día', value: 'd' }, { label: 'Semana', value: 'w' }, { label: 'Mes', value: 'm' }, { label: 'Año', value: 'y' }]} defaultValue="w" optionType="button" buttonStyle="solid" />
            <KRadio.Group options={[{ label: 'Día', value: 'd' }, { label: 'Semana', value: 'w' }, { label: 'Mes', value: 'm' }]} defaultValue="w" optionType="button" disabled />
          </div>
        </div>
      </div>
    ),
    anatomy: [
      { label: 'KRadio.Group', description: 'Contenedor raíz (role="radiogroup"). Establece direction (horizontal/vertical) y el optionType.' },
      { label: 'Radio Circle', description: 'Círculo 16×16px con border 1.5px. Estado: slate-300 sin selección, #E04D36 seleccionado, gray-200 disabled.' },
      { label: 'Inner Dot', description: 'Círculo interior 7×7px relleno #E04D36. Solo visible cuando la opción está seleccionada. Gray cuando disabled.' },
      { label: 'Label Text', description: 'Texto descriptivo a la derecha del círculo. Navy por defecto, gris (#9CA3AF) cuando disabled.', optional: true },
      { label: 'KRadio.Button', description: 'Variante de botón segmentado. Se agrupa con -space-x-px para bordes superpuestos.', optional: true },
    ],
    a11ySummary: {
      keyboard: ['Arrows: Mueve el foco y selecciona la siguiente/anterior opción del grupo.', 'Tab: Entra y sale del contenedor del grupo.'],
      aria: ['role="radiogroup" en el contenedor.', 'role="radio" y aria-checked en cada ítem.', 'aria-disabled reflejado cuando disabled=true.'],
      contrast: 'Inner dot blanco sobre #E04D36 cumple AA. Borde selected 3:1+.',
      score: 100,
    },
    code: `import { KRadio } from '@khor/design-system/atoms/index';

// Horizontal (default)
<KRadio.Group
  options={[
    { label: '1st', value: '1' },
    { label: '2nd', value: '2' },
    { label: '3rd', value: '3' },
  ]}
  defaultValue="1"
  onValueChange={setValue}
/>

// Vertical
<KRadio.Group
  direction="vertical"
  options={[
    { label: 'Option A', value: 'a' },
    { label: 'Option B', value: 'b', disabled: true },
    { label: 'Option C', value: 'c' },
  ]}
  defaultValue="a"
/>

// Botones segmentados
<KRadio.Group
  optionType="button"
  buttonStyle="solid"
  options={[{ label: 'Día', value: 'd' }, { label: 'Semana', value: 'w' }]}
  defaultValue="w"
/>`,
    filename: 'Radio/index.tsx',
    props: [
      { name: 'options', type: '{ label: ReactNode; value: string; disabled?: boolean }[] | string[]', required: true, description: 'Opciones del grupo. Cada ítem puede tener su propio disabled.' },
      { name: 'value', type: 'string', description: 'Valor seleccionado (controlado).' },
      { name: 'defaultValue', type: 'string', description: 'Valor inicial (no controlado).' },
      { name: 'onValueChange', type: '(value: string) => void', description: 'Callback al cambiar la selección.' },
      { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout del grupo. Horizontal usa flex-row con gap-4; vertical usa flex-col con gap-2.' },
      { name: 'optionType', type: "'default' | 'button'", default: "'default'", description: 'default = radio clásico; button = segmented button group.' },
      { name: 'buttonStyle', type: "'outline' | 'solid'", default: "'outline'", description: 'Solo aplica cuando optionType="button". solid tiene fondo relleno en el activo.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Tamaño de los botones (solo optionType="button").' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Deshabilita todo el grupo. Círculo y label toman color gris.' },
    ],
    guidelines: [
      'Usa KRadio para selección única. Para múltiple, usa KCheckbox.Group.',
      'Máximo 6 opciones en horizontal; para más usa direction="vertical" o KSelectField.',
      'direction="vertical" es ideal para listas de opciones largas con descripciones.',
      'optionType="button" es ideal para filtros de periodo, vista o tipo.',
    ],
    aiNotes: 'KRadio usa Radix RadioGroup. Selected=#E04D36, disabled=gray. Soporta horizontal/vertical y variante button (outline/solid).',
  },
  progress: {
    id: 'progress',
    name: 'Progress',
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
<KProgress value={30} strokeColor="var(--khor-chart-accent)" />`,
    filename: 'Progress/index.tsx',
    props: [
      { name: 'value', type: 'number', required: true, description: 'Porcentaje de progreso (0-100).' },
      { name: 'max', type: 'number', default: '100', description: 'Valor maximo.' },
      { name: 'status', type: "'success' | 'exception' | 'active'", description: 'Estado visual.' },
      { name: 'showInfo', type: 'boolean', default: 'true', description: 'Muestra el porcentaje.' },
      { name: 'strokeColor', type: 'string', description: 'Color personalizado de la barra.' },
    ],
    guidelines: ['Usa status="success" cuando llega a 100%.', 'strokeColor por defecto es el Rojo Khor primary.'],
    aiNotes: 'KProgress para indicadores de progreso. Soporta barra, círculo y dashboard.',
  },
  typography: {
    id: 'typography',
    name: 'Typography',
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
    filename: 'Typography/index.tsx',
    props: [
      { name: 'Typography.Title', type: 'Sub-component', description: 'Heading con prop level (1-5).' },
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
    name: 'Alert',
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
    filename: 'Alert/index.tsx',
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
    name: 'Skeleton',
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
    filename: 'Skeleton/index.tsx',
    props: [
      { name: 'width', type: "number | string", default: "'100%'", description: 'Ancho del skeleton.' },
      { name: 'height', type: "number | string", default: '16', description: 'Alto del skeleton.' },
      { name: 'circle', type: 'boolean', description: 'Forma circular (para avatares).' },
      { name: 'lines', type: 'number', description: 'Número de líneas de texto (la última es más corta).' },
    ],
    guidelines: ['Usa para indicar carga de contenido, no para carga de página completa (usa KSpin para eso).'],
    aiNotes: 'KSkeleton para estados de carga. Combinar con KSpin para carga asíncrona.',
  },
  slider: {
    id: 'slider',
    name: 'Slider',
    description: 'Control deslizante para seleccionar un valor numérico dentro de un rango. Basado en Radix UI Slider con tokens Khor. Soporta rango dual, marcas, íconos y etiqueta superior.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 400, paddingBottom: 8 }}>
        <KSlider defaultValue={[10]} min={0} max={24} step={1} marks={{ 0: '0', 8: '8', 16: '16', 24: '24' }} />
        <KSlider range defaultValue={[6, 18]} min={0} max={24} step={1} suffixIcon={<Smile size={18} />} />
        <KSlider label="Volumen" defaultValue={[14]} min={0} max={24} step={1} />
      </div>
    ),
    playground: <SliderPlayground />,
    stateShowcase: (() => {
      const m24 = { 0: '0', 8: '8', 16: '16', 24: '24' };
      const sectionTitle = (t: string) => (
        <div style={{ fontSize: 10, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 10 }}>{t}</div>
      );
      const colHeader = (t: string) => (
        <div style={{ fontSize: 10, fontWeight: 600, color: '#8f9096', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }}>{t}</div>
      );
      const Row = ({ children, extraBottom = 0 }: { children: React.ReactNode; extraBottom?: number }) => (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, paddingBottom: extraBottom }}>
          {children}
        </div>
      );
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, padding: '4px 4px 4px 4px', maxWidth: 660 }}>
          {/* column headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 8 }}>
            {colHeader('Range')}
            {colHeader('Single')}
          </div>

          {/* ── Sin ícono ─────────────────────── */}
          {sectionTitle('Sin ícono')}
          <Row extraBottom={32}>
            <KSlider range defaultValue={[8, 16]} min={0} max={24} step={1} marks={m24} />
            <KSlider defaultValue={[14]} min={0} max={24} step={1} />
          </Row>
          <Row extraBottom={16}>
            <KSlider range defaultValue={[8, 16]} min={0} max={24} step={1} />
            <KSlider defaultValue={[14]} min={0} max={24} step={1} marks={m24} />
          </Row>

          {/* ── Con ícono ─────────────────────── */}
          {sectionTitle('Con ícono')}
          <Row extraBottom={32}>
            <KSlider range defaultValue={[8, 16]} min={0} max={24} step={1} marks={m24} suffixIcon={<Smile size={18} />} />
            <KSlider defaultValue={[14]} min={0} max={24} step={1} suffixIcon={<Smile size={18} />} />
          </Row>
          <Row extraBottom={16}>
            <KSlider range defaultValue={[8, 16]} min={0} max={24} step={1} marks={m24} suffixIcon={<Smile size={18} />} disabled />
            <KSlider defaultValue={[14]} min={0} max={24} step={1} suffixIcon={<Smile size={18} />} disabled />
          </Row>

          {/* ── Upper Label ───────────────────── */}
          {sectionTitle('Upper Label')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 320 }}>
            <KSlider label="Label" defaultValue={[8]} min={0} max={24} step={1} />
            <div style={{ paddingBottom: 28 }}>
              <KSlider label="Label" defaultValue={[8]} min={0} max={24} step={1} marks={m24} />
            </div>
            <div style={{ paddingBottom: 28 }}>
              <KSlider label="Label" defaultValue={[8]} min={0} max={24} step={1} marks={m24} suffixIcon={<Smile size={18} />} />
            </div>
          </div>
        </div>
      );
    })(),
    a11ySummary: {
      keyboard: ['Up/Right: Sube valor.', 'Down/Left: Baja valor.', 'Home/End: Valores extremos.'],
      aria: ['role="slider"', 'aria-valuenow, aria-valuemin, aria-valuemax inyectados.', 'aria-disabled cuando aplica.'],
      contrast: 'AAA sobre punto visual, AA track sobre fondo de tarjeta.',
      score: 95,
    },
    code: `import { KSlider } from '@khor/design-system/atoms/index';
import { Smile } from 'lucide-react';

// Básico
<KSlider defaultValue={[30]} min={0} max={100} step={1} />

// Rango dual
<KSlider range defaultValue={[20, 80]} min={0} max={100} />

// Con marcas
<KSlider defaultValue={[8]} min={0} max={24} step={1} marks={{ 0: '0', 8: '8', 16: '16', 24: '24' }} />

// Con ícono
<KSlider defaultValue={[14]} min={0} max={24} suffixIcon={<Smile size={18} />} />

// Upper label
<KSlider label="Volumen" defaultValue={[30]} />`,
    filename: 'Slider/index.tsx',
    props: [
      { name: 'value', type: 'number | number[]', description: 'Valor controlado.' },
      { name: 'defaultValue', type: 'number | number[]', description: 'Valor inicial no controlado.' },
      { name: 'min', type: 'number', default: '0', description: 'Valor mínimo.' },
      { name: 'max', type: 'number', default: '100', description: 'Valor máximo.' },
      { name: 'step', type: 'number', default: '1', description: 'Incremento.' },
      { name: 'range', type: 'boolean', default: 'false', description: 'Activa modo rango con dos thumbs.' },
      { name: 'marks', type: 'Record<number, ReactNode>', description: 'Marcas sobre la pista con etiquetas.' },
      { name: 'label', type: 'ReactNode', description: 'Etiqueta superior (Slider selector Upper label).' },
      { name: 'prefixIcon', type: 'ReactNode', description: 'Ícono a la izquierda de la pista.' },
      { name: 'suffixIcon', type: 'ReactNode', description: 'Ícono a la derecha de la pista.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Desactiva el slider.' },
      { name: 'showValue', type: 'boolean', default: 'false', description: 'Muestra el valor actual junto al track.' },
      { name: 'reverse', type: 'boolean', default: 'false', description: 'Invierte la dirección.' },
      { name: 'vertical', type: 'boolean', default: 'false', description: 'Orientación vertical.' },
      { name: 'onChange', type: '(value: number | number[]) => void', description: 'Callback al cambiar valor.' },
      { name: 'onAfterChange', type: '(value: number | number[]) => void', description: 'Callback al soltar el thumb.' },
    ],
    guidelines: [
      'Usa para valores continuos como volumen, brillo o porcentaje.',
      'Usa range={true} cuando el usuario debe seleccionar un intervalo (ej. filtro de precio).',
      'Combina marks con min/max apropiados para comunicar puntos de referencia discretos.',
      'El prop label genera el layout "Slider selector Upper label" del Figma.',
    ],
    aiNotes: 'KSlider para entrada de rango numérico basado en Radix UI Slider. Soporta rangos duales, marcas, íconos prefijo/sufijo y etiqueta superior (label). Usar suffixIcon con Lucide icons.',
  },

  spin: {
    id: 'spin',
    name: 'Spin',
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
    filename: 'Spin/index.tsx',
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Tamaño del spinner.' },
      { name: 'color', type: 'string', default: 'khor.primary', description: 'Color del spinner.' },
    ],
    guidelines: ['Usa para carga de secciones o páginas completas.', 'Para carga de contenido específico, usa KSkeleton.'],
    aiNotes: 'KSpin para spinner de carga. Envuelve children para overlay de loading.',
  },
  divider: {
    id: 'divider',
    name: 'Divider',
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
    filename: 'Divider/index.tsx',
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
    aiNotes: 'KDivider para separación visual. Soporta orientación vertical y texto en línea.',
  },
  /* ═══ ÁTOMOS EXTENDIDOS (Wave 3) ═══ */
  'button-group': { id: 'button-group', name: 'ButtonGroup', description: 'Agrupa botones relacionados en una fila unificada con bordes compartidos o espaciado controlado.',
    preview: (<KButtonGroup><KButton variant="secondary" size="sm">Anterior</KButton><KButton variant="secondary" size="sm">Siguiente</KButton></KButtonGroup>),
    playground: <ButtonGroupPlayground />,
    code: `<KButtonGroup>\n  <KButton variant="secondary">Anterior</KButton>\n  <KButton variant="secondary">Siguiente</KButton>\n</KButtonGroup>`, filename: 'ButtonGroup/index.tsx',
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
  'label': { id: 'label', name: 'Label', description: 'Etiqueta para campos de formulario con indicador de campo obligatorio y tooltip de informacion.',
    preview: (<KLabel required info="Ayuda">Campo</KLabel>),
    playground: <LabelPlayground />,
    code: `<KLabel required info="Ingresa un correo institucional">Email</KLabel>`, filename: 'Label/index.tsx',
    props: [{ name: 'children', type: 'ReactNode', required: true, description: 'Texto.' }, { name: 'required', type: 'boolean', description: 'Muestra asterisco.' }, { name: 'info', type: 'string', description: 'Texto del icono de informacion.' }],
    a11ySummary: {
      keyboard: ['Tab: Navega al input asociado.'],
      aria: ['for/id conecta label con input.', 'aria-required se hereda del campo asociado.'],
      contrast: 'AAA en texto del label sobre fondo blanco.',
      score: 100,
    },
    guidelines: ['Usa siempre para mejorar la accesibilidad de los inputs.'],
    aiNotes: 'KLabel para etiquetar inputs. Siempre asociar a un input mediante htmlFor.',
  },
  'float-button': { id: 'float-button', name: 'FloatButton', description: 'Botón flotante (FAB) fijo en la esquina de la pantalla. Ideal para acciones principales.',
    preview: (<div style={{ position: 'relative', height: 80, backgroundColor: khorTokens.colors.neutral[100], borderRadius: khorTokens.radius.lg }}><KText variant="small" color="muted" className="p-4">El botón flotante aparece fijo en la esquina inferior derecha.</KText></div>),
    code: `<KFloatButton icon={<Plus />} onClick={handleAdd} tooltip="Nuevo empleado" />`, filename: 'FloatButton/index.tsx',
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
    guidelines: ['Solo un FAB por pantalla. Usa para la acción más importante.'],
    aiNotes: 'KFloatButton para acción flotante FAB. Limitar a 1-2 por página.',
  },
  'image': { id: 'image', name: 'Image', description: 'Imagen con preview lightbox al hacer clic, fallback para errores de carga y bordes redondeados.',
    preview: (<KImage src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=150&fit=crop" width={200} height={150} alt="Equipo" />),
    code: `<KImage src="/photo.jpg" width={200} height={150} preview />`, filename: 'Image/index.tsx',
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
    guidelines: ['Usa preview para imágenes que necesitan verse en grande.'],
    aiNotes: 'KImage para visualización de imágenes con preview y fallback.',
  },

  'space': { 
    id: 'space', name: 'Space', 
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
    filename: 'Space/index.tsx',
    props: [
      { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Dirección del flujo.' },
      { name: 'size', type: "number | 'sm' | 'md' | 'lg' | [number, number]", default: "'md'", description: 'Espacio entre elementos.' },
      { name: 'align', type: "'start' | 'end' | 'center' | 'baseline'", description: 'Alineación de items.' },
      { name: 'wrap', type: 'boolean', default: 'false', description: 'Permite salto de línea.' },
      { name: 'split', type: 'ReactNode', description: 'Elemento separador entre items.' },
    ],
    a11ySummary: {
      keyboard: ['Navegación determinada por los hijos. KSpace no añade interactividad.'],
      aria: ['No requiere roles ARIA adicionales.'],
      contrast: 'N/A — componente de layout puro.',
      score: 100,
    },
    guidelines: ['Usa size="middle" (16px) por defecto para la mayoría de layouts.', 'El split con KDivider vertical es ideal para barras de herramientas.'],
    aiNotes: 'KSpace para layouts con gap consistente. Preferir sobre div con gap manual.',
  },
  'qrcode': { id: 'qrcode', name: 'QRCode', description: 'Generador visual de código QR a partir de texto o URL. Usa canvas para renderizado.',
    preview: (<div style={{ display: 'flex', gap: 16 }}><KQRCode value="https://khor.app" size={100} /><KQRCode value="https://khor.app/empleados" size={80} color={khorTokens.colors.brand.navy} /></div>),
    code: `<KQRCode value="https://khor.app" size={128} />`, filename: 'QRCode/index.tsx',
    props: [{ name: 'value', type: 'string', required: true, description: 'Texto o URL a codificar.' }, { name: 'size', type: 'number', default: '128', description: 'Tamaño en px.' }, { name: 'color', type: 'string', description: 'Color de los módulos.' }],
    a11ySummary: {
      keyboard: ['No interactivo — es un canvas estático.'],
      aria: ['aria-label recomendado con el valor codificado.', 'role="img" para que lectores de pantalla lo identifiquen.'],
      contrast: 'AA minimo entre módulos y fondo.',
      score: 90,
    },
    guidelines: ['Nota: patrón visual representativo. Para QR reales, integra una librería como qrcode.'],
    aiNotes: 'KQRCode para generar QR. Usar solo con value válido.',
  },

  'flex': {
    id: 'flex', name: 'Flex',
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
    filename: 'Flex/index.tsx',
    props: [
      { name: 'vertical', type: 'boolean', default: 'false', description: 'Dirección vertical (column).' },
      { name: 'wrap', type: 'boolean | string', description: 'Propiedad flex-wrap.' },
      { name: 'justify', type: 'string', description: 'justify-content.' },
      { name: 'align', type: 'string', description: 'align-items.' },
      { name: 'gap', type: "string | number | [number, number]", description: 'Espaciado entre items.' },
    ],
    a11ySummary: {
      keyboard: ['Navegación determinada por los hijos. KFlex no añade interactividad.'],
      aria: ['No requiere roles ARIA adicionales.'],
      contrast: 'N/A — componente de layout puro.',
      score: 100,
    },
    guidelines: ['Uso preferente sobre KSpace para layouts complejos o distribuciones no estándar.'],
    aiNotes: 'KFlex para layouts flexbox. Preferir sobre KSpace para layouts complejos con alineación específica.',
  },
  'grid': {
    id: 'grid', name: 'Grid (Row/Col)',
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
    filename: 'Grid/index.tsx',
    props: [
      { name: 'gutter', type: 'number | [number, number]', description: 'Espaciado entre columnas (horizontal, vertical).' },
      { name: 'span', type: 'number', description: 'Número de columnas a ocupar (1-24) para KCol.' },
      { name: 'xs, sm, md, lg, xl, xxl', type: 'number | object', description: 'Ancho responsivo para KCol (Proximamente).' },
      { name: 'offset', type: 'number', description: 'Número de columnas a desplazar hacia la derecha.' },
    ],
    a11ySummary: {
      keyboard: ['Navegación determinada por el contenido. KGrid no añade interactividad.'],
      aria: ['role="row" y role="gridcell" se aplican automáticamente.', 'aria-colspan para columnas que abarcan múltiples slots.'],
      contrast: 'N/A — componente de layout puro.',
      score: 100,
    },
    guidelines: ['Usa gutters múltiplos de 8 (ej. 16, 24).', 'Ideal para dashboards y formularios multi-columna.']
  ,
    aiNotes: 'KGrid (Row/Col) sistema de rejilla 24 columnas responsiva. Paridad AntD v5.',
  },
  scrollbar: {
    id: 'scrollbar',
    name: 'ScrollBar',
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
    filename: 'ScrollBar/index.tsx',
    props: [
      { name: 'orientation', type: "'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Orientación del scroll.' },
      { name: 'size', type: "'small' | 'middle' | 'large'", default: "'middle'", description: 'Grosor de la barra.' },
      { name: 'autoHide', type: 'boolean', default: 'true', description: 'Esconde la barra si no hay hover.' },
      { name: 'children', type: 'ReactNode', description: 'Contenido a scrollear.' },
    ],
    a11ySummary: {
      keyboard: ['Flechas arriba/abajo para scroll vertical.', 'PageUp/PageDown para saltos grandes.', 'Home/End para ir al inicio/fin.'],
      aria: ['role="scrollbar" con aria-valuenow, aria-valuemin, aria-valuemax.', 'aria-orientation para indicar dirección.'],
      contrast: 'AA — barra visible solo en hover con contraste suficiente.',
      score: 95,
    },
    guidelines: ['Usa para contenedores con contenido que excede su tamaño.', 'Evita scrollbars en elementos minúsculos.'],
    aiNotes: 'KScrollBar para scrollbars customizados premium. Usar en contenedores con overflow.',
  },
  icon: {
    id: 'icon',
    name: 'Icon',
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
    filename: 'Icon/index.tsx',
    props: [
      { name: 'name', type: 'string', required: true, description: 'Nombre de la propiedad exportada por lucide-react.' },
      { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'", default: "'md'", description: 'Tamaño basado en tokens Elite.' },
      { name: 'color', type: 'string', description: 'Color CSS o Token.' },
      { name: 'className', type: 'string', description: 'Clases adicionales.' },
    ],
    a11ySummary: {
      keyboard: ['No interactivo por sí mismo. Si se usa como botón, debe tener role="button" y tabIndex.'],
      aria: ['aria-hidden="true" para iconos decorativos.', 'aria-label descriptivo si el icono es informativo o funcional.'],
      contrast: 'AA mínimo para iconos informativos contra el fondo.',
      score: 95,
    },
    guidelines: ['Usa iconos para reducir carga cognitiva.', 'Mantén el tamaño consistente en la misma fila.', 'Acompaña siempre de aria-label si no hay texto.'],
    aiNotes: 'Componente obligatorio para toda iconografía Lucide. NO importar de lucide-react directamente.'
  },
  'phone-input': {
    id: 'phone-input',
    name: 'PhoneInput',
    description: 'Selector de país avanzado (con banderas emoji para alta compatibilidad) + formateo inteligente de prefijo y máscara de teléfono.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KPhoneInput defaultCountry="MX" placeholder="Número de México" />
        <KPhoneInput defaultCountry="US" placeholder="Número de USA" />
      </div>
    ),
    playground: <PhoneInputPlayground />,
    stateShowcase: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', padding: '4px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Default</span><KPhoneInput /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Hover</span><KPhoneInput isHovered /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Focused</span><KPhoneInput isFocused /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Error</span><KPhoneInput status="error" helperText="Teléfono no válido" /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}><span style={{ fontSize: 11, color: khorTokens.colors.neutral[500] }}>Disabled</span><KPhoneInput disabled /></div>
      </div>
    ),
    a11ySummary: {
      keyboard: ['Tab: Mueve el foco entre el selector de país y el campo de entrada.', 'Search: Permite filtrar los países escribiendo en la barra de búsqueda del selector.', 'Enter/Space: Abre/cierra el menú selector de países.'],
      aria: ['aria-haspopup="dialog" en el selector de país.', 'role="combobox" para la lista de selección de países.', 'aria-expanded para controlar el estado del dropdown.'],
      contrast: 'Banderas emoji de alto contraste, textos y bordes cumplen con WCAG AA.',
      score: 100,
    },
    code: `import { KPhoneInput } from '@khor/design-system/atoms/index';

// Selector de teléfono con validación y formateo de país
<KPhoneInput
  defaultCountry="MX"
  placeholder="Ingresa tu teléfono"
  size="md"
  onChange={(val) => console.log('Teléfono:', val)}
/>`,
    filename: 'PhoneInput/index.tsx',
    props: [
      { name: 'value', type: 'string', description: 'Valor del input.' },
      { name: 'onChange', type: '(value: string) => void', description: 'Callback al cambiar el número, retorna el valor con prefijo de marcado.' },
      { name: 'defaultCountry', type: 'string', default: "'MX'", description: 'Código de país inicial de dos letras (ej: MX, US, ES).' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Variaciones de altura.' },
      { name: 'status', type: "'error' | 'warning' | 'default'", default: "'default'", description: 'Estado de validación.' },
      { name: 'helperText', type: 'string', description: 'Mensaje de validación o ayuda debajo del input.' },
      { name: 'block', type: 'boolean', default: 'false', description: 'Si el input debe ocupar el 100% del contenedor.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Inhabilita la interacción.' },
    ],
    guidelines: ['Siempre define un país por defecto para acelerar la entrada.', 'Usa block={true} en formularios móviles.', 'Brinda helperText claro en caso de error.'],
    aiNotes: 'KPhoneInput para entrada de teléfono con selector de país y formateo automático.',
  },

  'select-input': {
    id: 'select-input',
    name: 'SelectInput',
    description: 'Selector tipo dropdown para formularios. Mismos tokens que KInput: tamaños sm/md/lg, estados normal/focused/error/warning/disabled, label superior y lateral con required, optional y tooltip.',
    preview: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <KSelectField options={[{ label: 'Opción A', value: 'a' }, { label: 'Opción B', value: 'b' }]} placeholder="Seleccionar" />
        <KSelectField label="Pasajero" required status="error" helpText="Este campo es requerido." options={[{ label: 'Opción A', value: 'a' }]} placeholder="Seleccionar" />
      </div>
    ),
    playground: <SelectInputPlayground />,
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
      const colW    = 180; // base + upper label
      const colWSide = 290; // side label needs room for "Label (optional) ℹ: [dropdown]"

      const colHeader = (label: string) => (
        <div style={{ fontSize: 10, fontWeight: 700, color: '#8f9096', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 10 }}>{label}</div>
      );
      const Section = ({ title, children, cw = colW }: { title: string; children: React.ReactNode; cw?: number }) => (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 12 }}>{title}</div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${cw}px)`, gap: '8px 16px' }}>
            {children}
          </div>
        </div>
      );

      const minW = Math.max(
        states.length * (colW + 16),
        states.length * (colWSide + 16),
      );

      return (
        <div style={{ overflowX: 'auto', padding: '4px 4px 8px 4px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: `${minW}px` }}>

            {/* ── Column headers (base width) ── */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colW}px)`, gap: '0 16px', marginBottom: 4 }}>
              {states.map(s => colHeader(s.label))}
            </div>

            {/* Base — Empty */}
            <Section title="Sin label — Empty">
              {sizes.map(sz => states.map(s => (
                <KSelectField key={`e-${sz}-${s.label}`} size={sz} options={opts} placeholder="Seleccionar" {...s.props} />
              )))}
            </Section>

            {/* Base — Filled */}
            <Section title="Sin label — Filled">
              {sizes.map(sz => states.map(s => (
                <KSelectField key={`f-${sz}-${s.label}`} size={sz} options={opts} defaultValue="a" placeholder="Seleccionar" {...s.props} />
              )))}
            </Section>

            {/* Upper Label */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 12 }}>Upper Label</div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colW}px)`, gap: '20px 16px' }}>
                {states.map(s => [
                  <KSelectField key={`ul-${s.label}-l`}  label="Label" options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`ul-${s.label}-r`}  label="Label" required options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`ul-${s.label}-t`}  label="Label" tooltip="Información adicional" options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`ul-${s.label}-rt`} label="Label" required tooltip="Información adicional" options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`ul-${s.label}-ot`} label="Label" optional tooltip="Información adicional" options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`ul-${s.label}-o`}  label="Label" optional options={opts} placeholder="Seleccionar" {...s.props} />,
                ])}
              </div>
            </div>

            {/* Upper Label + Help Text */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 12 }}>Upper Label + Help Text</div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colW}px)`, gap: '24px 16px' }}>
                {states.map(s => [
                  <KSelectField key={`uh-${s.label}-l`}  label="Label" helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`uh-${s.label}-r`}  label="Label" required helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`uh-${s.label}-t`}  label="Label" tooltip="Info" helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`uh-${s.label}-rt`} label="Label" required tooltip="Info" helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`uh-${s.label}-ot`} label="Label" optional tooltip="Info" helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`uh-${s.label}-o`}  label="Label" optional helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                ])}
              </div>
            </div>

            {/* ── Column headers (side label width) ── */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colWSide}px)`, gap: '0 16px', marginBottom: 4 }}>
              {states.map(s => colHeader(s.label))}
            </div>

            {/* Side Label */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 12 }}>Side Label</div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colWSide}px)`, gap: '20px 16px' }}>
                {states.map(s => [
                  <KSelectField key={`sl-${s.label}-l`}  block label="Label" labelPosition="side" options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`sl-${s.label}-r`}  block label="Label" labelPosition="side" required options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`sl-${s.label}-t`}  block label="Label" labelPosition="side" tooltip="Información adicional" options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`sl-${s.label}-rt`} block label="Label" labelPosition="side" required tooltip="Información adicional" options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`sl-${s.label}-ot`} block label="Label" labelPosition="side" optional tooltip="Información adicional" options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`sl-${s.label}-o`}  block label="Label" labelPosition="side" optional options={opts} placeholder="Seleccionar" {...s.props} />,
                ])}
              </div>
            </div>

            {/* Side Label + Help Text */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#051758', textTransform: 'uppercase' as const, letterSpacing: '0.08em', marginBottom: 12 }}>Side Label + Help Text</div>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${states.length}, ${colWSide}px)`, gap: '24px 16px' }}>
                {states.map(s => [
                  <KSelectField key={`sh-${s.label}-l`}  block label="Label" labelPosition="side" helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`sh-${s.label}-r`}  block label="Label" labelPosition="side" required helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`sh-${s.label}-t`}  block label="Label" labelPosition="side" tooltip="Info" helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`sh-${s.label}-rt`} block label="Label" labelPosition="side" required tooltip="Info" helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`sh-${s.label}-ot`} block label="Label" labelPosition="side" optional tooltip="Info" helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                  <KSelectField key={`sh-${s.label}-o`}  block label="Label" labelPosition="side" optional helpText="Please input passenger's name or delete this field." options={opts} placeholder="Seleccionar" {...s.props} />,
                ])}
              </div>
            </div>

          </div>
        </div>
      );
    })(),
    a11ySummary: {
      keyboard: ['Tab: Mueve el foco al trigger del selector.', 'Enter/Space: Abre el menú de opciones.', 'Up/Down: Navega entre opciones.', 'Esc: Cierra el menú.'],
      aria: ['role="combobox" en el trigger.', 'aria-expanded para el estado abierto/cerrado.', 'aria-haspopup="listbox" en el trigger.'],
      contrast: 'Todos los estados cumplen WCAG AA. Foco en #E04D36 sobre fondo blanco.',
      score: 100,
    },
    code: `import { KSelectField } from '@khor/design-system/molecules/index';

const options = [
  { label: 'Opción A', value: 'a' },
  { label: 'Opción B', value: 'b' },
];

// Base
<KSelectField options={options} placeholder="Seleccionar" />

// Con label superior + required + helpText
<KSelectField
  label="Pasajero"
  required
  tooltip="Selecciona el tipo de pasajero."
  helpText="Este campo es requerido."
  status="error"
  options={options}
  placeholder="Seleccionar"
  onChange={(v) => console.log(v)}
/>

// Label lateral
<KSelectField
  label="Categoría"
  labelPosition="side"
  options={options}
  placeholder="Seleccionar"
/>`,
    filename: 'SelectField/index.tsx',
    props: [
      { name: 'options',        type: 'KSelectOption[]',              required: true,  description: 'Lista de opciones { label, value, disabled? }.' },
      { name: 'value',          type: 'string',                                        description: 'Valor controlado.' },
      { name: 'defaultValue',   type: 'string',                                        description: 'Valor inicial no controlado.' },
      { name: 'onChange',       type: '(value: string) => void',                       description: 'Callback al seleccionar una opción.' },
      { name: 'placeholder',    type: 'string',                        default: "'Seleccionar'", description: 'Texto cuando no hay selección.' },
      { name: 'size',           type: "'sm' | 'md' | 'lg'",           default: "'md'", description: 'Altura del trigger: 32 / 36 / 40px.' },
      { name: 'status',         type: "'default' | 'error' | 'warning'", default: "'default'", description: 'Estado visual de validación.' },
      { name: 'disabled',       type: 'boolean',                       default: 'false', description: 'Deshabilita la interacción.' },
      { name: 'isFocused',      type: 'boolean',                       default: 'false', description: 'Fuerza el estado focused (playground).' },
      { name: 'label',          type: 'React.ReactNode',                               description: 'Texto del label asociado al selector.' },
      { name: 'labelPosition',  type: "'top' | 'side'",               default: "'top'", description: 'Posición del label: superior o lateral.' },
      { name: 'required',       type: 'boolean',                       default: 'false', description: 'Muestra asterisco (*) antes del label.' },
      { name: 'optional',       type: 'boolean',                       default: 'false', description: 'Muestra "(optional)" después del label.' },
      { name: 'tooltip',        type: 'string',                                        description: 'Texto del ícono de información ℹ junto al label.' },
      { name: 'helpText',       type: 'string',                                        description: 'Texto de ayuda o error debajo del selector.' },
      { name: 'block',          type: 'boolean',                       default: 'false', description: 'Ocupa el 100% del ancho del contenedor.' },
    ],
    guidelines: [
      'Usa status="error" + helpText para feedback de validación inmediato.',
      'Prefiere labelPosition="top" en formularios verticales y "side" en layouts de detalle.',
      'Combina required con helpText para guiar al usuario antes de validar.',
    ],
    aiNotes: 'KSelectField/KSelectInput: selector dropdown con tokens Figma compartidos con KInput.',
  }
};

export const atomsData: Record<string, AtomData> = {};
Object.keys(atoms).forEach(key => {
  const { preview, playground, stateShowcase, ...data } = atoms[key];
  atomsData[key] = data;
});

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