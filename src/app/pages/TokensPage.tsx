import React, { useState } from 'react';
import { khorTokens } from '../theme/khor-theme';
import { KTag, KBadge, KIcon, KText } from '../components/design-system/atoms';
import { KCardSection } from '../components/design-system/organisms';
import {
  Droplets, CaseLower, RotateCw, BoxSelect, Maximize,
  Grid3X3, Zap, Eye, Layers, Code, BookOpen,
  Monitor, Smartphone, Tablet
} from 'lucide-react';

const TokenSection = ({ icon: Icon, title, description, children, id }: { 
  icon: any; 
  title: string; 
  description?: string; 
  children: React.ReactNode; 
  id?: string 
}) => (
  <KCardSection id={id} className="mb-12">
    <div className="flex items-center gap-4 mb-6">
      <div className="p-3 bg-khor-primary/10 text-khor-primary rounded-xl">
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-khor-navy dark:text-white m-0">{title}</h2>
        {description && <p className="text-khor-slate-500 text-sm mt-1">{description}</p>}
      </div>
    </div>
    <div className="bg-white/50 dark:bg-khor-surface-card/50 backdrop-blur-sm rounded-2xl border border-khor-border-muted overflow-hidden">
      {children}
    </div>
  </KCardSection>
);

const TokenItem = ({ name, variable, value, children, preview }: { 
  name: string; 
  variable: string; 
  value?: string; 
  children?: React.ReactNode;
  preview?: React.ReactNode;
}) => (
  <div className="flex items-center gap-6 p-4 border-b border-khor-border-muted last:border-0 hover:bg-white/80 dark:hover:bg-khor-surface-hover transition-colors">
    <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center bg-khor-neutral-100 dark:bg-khor-neutral-800 rounded-xl overflow-hidden border border-khor-border-muted">
      {preview || children}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-bold text-khor-navy dark:text-white truncate">{name}</h3>
      <code className="text-[10px] text-khor-slate-400 font-mono block mt-1">{variable}</code>
      {value && <span className="text-[11px] text-khor-slate-500 mt-2 block font-medium">{value}</span>}
    </div>
  </div>
);

const ColorCard = ({ variable, name, hex }: { variable: string; name: string; hex?: string }) => (
  <div className="flex flex-col gap-3 p-4 bg-white/50 dark:bg-khor-surface-card border border-khor-border-muted rounded-2xl hover:shadow-lg transition-all">
    <div className="w-full h-20 rounded-xl border border-black/5" style={{ backgroundColor: `var(${variable})` }} />
    <div>
      <h4 className="text-xs font-bold text-khor-navy dark:text-white">{name}</h4>
      <code className="text-[9px] text-khor-slate-400 font-mono block mt-1">{variable}</code>
      {hex && <span className="text-[10px] text-khor-slate-500 font-medium block mt-1 uppercase">{hex}</span>}
    </div>
  </div>
);

const ColorScaleRow = ({ title, baseVariable, steps, hexMap }: { title: string; baseVariable: string; steps: number[]; hexMap?: Record<number, string> }) => (
  <div className="p-6 border-b border-khor-border-muted last:border-0">
    <h4 className="text-xs font-bold text-khor-navy dark:text-white mb-4 uppercase tracking-wider">{title} Scale</h4>
    <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
      {steps.map(step => (
        <div key={step} className="flex flex-col gap-2">
          <div 
            className="h-12 w-full rounded-lg border border-black/5 shadow-sm"
            style={{ backgroundColor: `var(${baseVariable}-${step})` }}
          />
          <div className="px-1">
            <span className="text-[9px] font-bold text-khor-navy dark:text-white block">{step}</span>
            <span className="text-[8px] text-khor-slate-400 font-mono block uppercase">{hexMap?.[step] || '--'}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ShadowLayerInfo = ({ layer, x, y, blur, spread, color, opacity, inset }: { 
  layer: number; x: number; y: number; blur: number; spread: number; color: string; opacity: string; inset?: boolean 
}) => (
  <div className="flex items-center gap-2 py-2 border-b border-khor-border-muted/50 last:border-0">
    <div className="w-5 h-5 rounded bg-khor-secondary/10 flex items-center justify-center text-[10px] font-bold text-khor-navy dark:text-white">
      {layer}
    </div>
    <div className="flex flex-wrap gap-2 text-[10px] text-khor-slate-500 font-medium">
      <span className="bg-white dark:bg-khor-neutral-800 px-1.5 py-0.5 rounded border border-khor-border-muted">X: <span className="text-khor-navy dark:text-white font-bold">{x}</span></span>
      <span className="bg-white dark:bg-khor-neutral-800 px-1.5 py-0.5 rounded border border-khor-border-muted">Y: <span className="text-khor-navy dark:text-white font-bold">{y}</span></span>
      <span className="bg-white dark:bg-khor-neutral-800 px-1.5 py-0.5 rounded border border-khor-border-muted">Blur: <span className="text-khor-navy dark:text-white font-bold">{blur}</span></span>
      <span className="bg-white dark:bg-khor-neutral-800 px-1.5 py-0.5 rounded border border-khor-border-muted">Spread: <span className="text-khor-navy dark:text-white font-bold">{spread || 0}</span></span>
      <span className="bg-white dark:bg-khor-neutral-800 px-1.5 py-0.5 rounded border border-khor-border-muted">Color: <span className="text-khor-navy dark:text-white font-bold uppercase">{color}</span></span>
      <span className="bg-white dark:bg-khor-neutral-800 px-1.5 py-0.5 rounded border border-khor-border-muted">Opacity: <span className="text-khor-primary font-bold">{opacity}</span></span>
      {inset && <KTag color="info" className="text-[8px] h-4">INSET</KTag>}
    </div>
  </div>
);

const ShadowDetailCard = ({ name, variable, layers }: { 
  name: string; variable: string; layers: Array<{ x: number, y: number, blur: number, spread: number, opacity: string, color: string, inset?: boolean }> 
}) => (
  <div className="p-6 border-b border-khor-border-muted last:border-0 hover:bg-white/40 dark:hover:bg-khor-surface-hover transition-all">
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-shrink-0 w-32 h-32 bg-white dark:bg-khor-neutral-900 rounded-2xl border border-khor-border-muted shadow-inner flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 opacity-[0.2] bg-[radial-gradient(#051758_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="w-16 h-16 bg-white dark:bg-khor-neutral-800 rounded-xl border border-khor-border-muted z-10 transition-transform group-hover:scale-110" style={{ boxShadow: `var(${variable})` }} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-sm font-bold text-khor-navy dark:text-white">{name}</h3>
          <code className="text-[10px] text-khor-slate-400 font-mono tracking-tighter">{variable}</code>
          <button 
            onClick={() => {
              const val = getComputedStyle(document.documentElement).getPropertyValue(variable);
              navigator.clipboard.writeText(val);
            }}
            className="p-1 hover:bg-khor-primary/10 text-khor-slate-400 hover:text-khor-primary rounded transition-colors"
            title="Copiar Box-Shadow"
          >
            <Zap size={14} />
          </button>
        </div>
        <div className="bg-khor-neutral-100/50 dark:bg-khor-neutral-800/50 rounded-xl p-3 border border-khor-border-muted">
          <h4 className="text-[9px] font-bold text-khor-slate-400 uppercase tracking-widest mb-2 px-1">Construcción Técnica</h4>
          {layers.map((l, i) => (
            <ShadowLayerInfo key={i} layer={i + 1} {...l} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

const t = khorTokens;
const font = t.typography.fontPrimary;
type TokenTab = 'preview' | 'code' | 'docs';

const TOKEN_TABS: { key: TokenTab; label: string; icon: React.ReactNode }[] = [
  { key: 'preview', label: 'Vista Previa',  icon: <Eye size={16} /> },
  { key: 'code',    label: 'Código',         icon: <Code size={16} /> },
  { key: 'docs',    label: 'Documentación',  icon: <BookOpen size={16} /> },
];

export function TokensPage() {
  const [active, setActive] = useState<TokenTab>('preview');

  return (
    <div style={{ fontFamily: font }}>

      {/* Header — matches ComponentDoc */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--khor-text-label)', textTransform: 'uppercase', letterSpacing: 1 }}>
            Tokens
          </span>
        </div>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: 'var(--foreground)' }}>Design Tokens</h2>
        <p style={{ margin: '8px 0 0', fontSize: 16, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
          La base técnica unificada del sistema Khor. Tres capas: primitivos → semánticos → componente.
          122 estilos de color, tipografía fluida, spacing, sombras, motion y más.
        </p>
      </div>

      {/* Tab nav — same style as ComponentDoc */}
      <div style={{ display: 'flex', gap: 0, borderBottom: `2px solid ${t.colors.neutral[200]}`, marginBottom: 20 }}>
        {TOKEN_TABS.map(tab => (
          <button key={tab.key} onClick={() => setActive(tab.key)} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '10px 16px', border: 'none',
            borderBottom: `2px solid ${active === tab.key ? t.colors.brand.primary : 'transparent'}`,
            marginBottom: -2, background: 'none', cursor: 'pointer', fontFamily: font,
            fontSize: 14, fontWeight: 500,
            color: active === tab.key ? t.colors.brand.primary : t.colors.neutral[400],
            transition: 'all 0.15s ease',
          }}>
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── VISTA PREVIA ── */}
      {active === 'preview' && (
      <div style={{ backgroundColor: '#e0e6fb', borderRadius: 14, border: '1px solid #c8d4f0', padding: '24px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-12">
          <div className="lg:col-span-12">
          
          <TokenSection
            id="color"
            icon={Droplets}
            title="Core Color Palette"
            description="Paletas primitivas extraídas directamente de Figma. 122 estilos de color organizados en 8 escalas."
          >
            {/* Brand row */}
            <div className="p-6 border-b border-khor-border-muted">
              <h4 className="text-[10px] font-bold text-khor-slate-400 uppercase tracking-widest mb-4">Brand Aliases</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ColorCard name="Primary — Navy" variable="--khor-primary" hex="#051758" />
                <ColorCard name="Secondary — Coral" variable="--khor-secondary" hex="#E04D36" />
                <ColorCard name="Accent — Orange" variable="--khor-accent" hex="#FF9500" />
                <ColorCard name="Divider" variable="--khor-divider" hex="#CED4DA" />
              </div>
            </div>

            {/* Primary Blue */}
            <ColorScaleRow
              title="Primary Blue (Brand Navy)"
              baseVariable="--khor-blue"
              steps={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]}
              hexMap={{ 50:'#E0E6FB', 100:'#C2CCEF', 200:'#9FAEDD', 300:'#7A8EC8', 400:'#5268AE', 500:'#2F478F', 600:'#162D72', 700:'#0A1F60', 800:'#051758', 900:'#030E38' }}
            />

            {/* Secondary Red */}
            <ColorScaleRow
              title="Secondary Red (CTA / Primary)"
              baseVariable="--khor-red"
              steps={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]}
              hexMap={{ 50:'#FFEDED', 100:'#FFCCC4', 200:'#FFA99C', 300:'#FE8673', 400:'#F75C43', 500:'#E04D36', 600:'#BE3823', 700:'#9C2714', 800:'#7A1809', 900:'#580E02' }}
            />

            {/* Neutral Gray */}
            <ColorScaleRow
              title="Neutral Gray"
              baseVariable="--khor-gray"
              steps={[100, 200, 300, 400, 500, 600, 700, 800, 900]}
              hexMap={{ 100:'#FDFDFD', 200:'#F4F4F4', 300:'#E9E9E9', 400:'#DBDBDB', 500:'#B5B5B5', 600:'#A1A1A1', 700:'#8C8C8C', 800:'#666666', 900:'#2F2F2F' }}
            />

            {/* Tertiary Orange */}
            <ColorScaleRow
              title="Tertiary — Orange"
              baseVariable="--khor-orange"
              steps={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]}
              hexMap={{ 50:'#FFF4E5', 100:'#FFE1B7', 200:'#FECE89', 300:'#FEBA5B', 400:'#FEA72D', 500:'#FF9500', 600:'#D67D00', 700:'#AD6500', 800:'#844D00', 900:'#5B3500' }}
            />

            {/* Tertiary Gold */}
            <ColorScaleRow
              title="Tertiary — Gold"
              baseVariable="--khor-gold"
              steps={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]}
              hexMap={{ 50:'#FFFAE9', 100:'#FFEFB9', 200:'#FEE389', 300:'#FED859', 400:'#FFCD29', 500:'#DDAE17', 600:'#BB9109', 700:'#997500', 800:'#775B00', 900:'#554100' }}
            />

            {/* Tertiary Cyan */}
            <ColorScaleRow
              title="Tertiary — Cyan"
              baseVariable="--khor-cyan"
              steps={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]}
              hexMap={{ 50:'#F1FFFE', 100:'#CBFCF9', 200:'#A9F7F2', 300:'#86ECE5', 400:'#64DFD7', 500:'#41BAB3', 600:'#129990', 700:'#1B8880', 800:'#0C6660', 900:'#02332F' }}
            />

            {/* Tertiary Leaf Green */}
            <ColorScaleRow
              title="Tertiary — Leaf Green"
              baseVariable="--khor-leaf"
              steps={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]}
              hexMap={{ 50:'#FCFFF5', 100:'#F7FFE4', 200:'#F2FFD0', 300:'#EDFFBD', 400:'#D8EBA3', 500:'#BACE86', 600:'#9DB06B', 700:'#829352', 800:'#66763D', 900:'#4C592A' }}
            />

            {/* Tertiary Magenta */}
            <ColorScaleRow
              title="Tertiary — Magenta"
              baseVariable="--khor-magenta"
              steps={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]}
              hexMap={{ 50:'#FFF5F6', 100:'#FFE4E6', 200:'#FFD0D4', 300:'#FFBDC2', 400:'#EBA3A9', 500:'#CD858B', 600:'#B06B71', 700:'#935258', 800:'#763D41', 900:'#592A2E' }}
            />

            {/* Feedback */}
            <div className="p-6 border-b border-khor-border-muted">
              <h4 className="text-[10px] font-bold text-khor-slate-400 uppercase tracking-widest mb-4">Feedback — Figma Exact</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ColorCard name="Success" variable="--khor-success" hex="#52C41A" />
                <ColorCard name="Error / Danger" variable="--khor-error" hex="#FF4D4F" />
                <ColorCard name="Warning" variable="--khor-warning" hex="#FAAD14" />
                <ColorCard name="Link" variable="--khor-text-link" hex="#122699" />
              </div>
            </div>

            {/* Surface */}
            <div className="p-6 border-b border-khor-border-muted">
              <h4 className="text-[10px] font-bold text-khor-slate-400 uppercase tracking-widest mb-1">Surface — Figma "Surface"</h4>
              <p className="text-[9px] text-khor-slate-400 mb-4">Fondos de componentes y capas. Las variantes con opacidad se muestran sobre gris.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {[
                  { name: 'Surface/50',  v: '--khor-figma-surface-50',  hex: '#FDFEFF' },
                  { name: 'Surface/100', v: '--khor-figma-surface-100', hex: '#FCFCFE' },
                  { name: 'Surface/200', v: '--khor-figma-surface-200', hex: '#F7F8FD' },
                  { name: 'Surface/300', v: '--khor-figma-surface-300', hex: '#F1F3FB' },
                  { name: 'Surface/400', v: '--khor-figma-surface-400', hex: '#F0F2FB' },
                  { name: 'Surface/500', v: '--khor-figma-surface-500', hex: '#8489AB' },
                  { name: 'Surface/900', v: '--khor-figma-surface-900', hex: '#01072E' },
                ].map(({ name, v, hex }) => (
                  <ColorCard key={v} name={name} variable={v} hex={hex} />
                ))}
              </div>
              <p className="text-[9px] text-khor-slate-400 mb-3 font-semibold">Overlays (sobre fondo #8489AB):</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl" style={{ backgroundColor: '#8489AB' }}>
                {[
                  { name: 'Black .15', v: '--khor-surface-black-15', val: 'rgba(0,0,0,.15)' },
                  { name: 'Black .25', v: '--khor-surface-black-25', val: 'rgba(0,0,0,.25)' },
                  { name: 'Black .40', v: '--khor-surface-black-40', val: 'rgba(0,0,0,.40)' },
                  { name: 'Black .60', v: '--khor-surface-black-60', val: 'rgba(0,0,0,.60)' },
                  { name: 'Black .80', v: '--khor-surface-black-80', val: 'rgba(0,0,0,.80)' },
                  { name: 'White .50', v: '--khor-surface-white-50', val: 'rgba(255,255,255,.50)' },
                  { name: 'White .70', v: '--khor-surface-white-70', val: 'rgba(255,255,255,.70)' },
                  { name: 'White .80', v: '--khor-surface-white-80', val: 'rgba(255,255,255,.80)' },
                ].map(({ name, v, val }) => (
                  <div key={v} className="flex flex-col gap-2">
                    <div className="h-10 w-full rounded-lg border border-white/20" style={{ backgroundColor: `var(${v})` }} />
                    <div>
                      <span className="text-[9px] font-bold text-white block">{name}</span>
                      <code className="text-[8px] text-white/60 font-mono block">{val}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Background */}
            <div className="p-6 border-b border-khor-border-muted">
              <h4 className="text-[10px] font-bold text-khor-slate-400 uppercase tracking-widest mb-1">Background — Figma "Background"</h4>
              <p className="text-[9px] text-khor-slate-400 mb-4">Fondos de páginas y secciones principales.</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ColorCard name="Background/50"  variable="--khor-figma-bg-50"  hex="#FFFFFF" />
                <ColorCard name="Background/200" variable="--khor-figma-bg-200" hex="#FBFCFF" />
                <ColorCard name="Background/500" variable="--khor-figma-bg-500" hex="#F1F3FB" />
                <ColorCard name="Background/900" variable="--khor-figma-bg-900" hex="#E9EAF2" />
              </div>
            </div>

            {/* Text Colors */}
            <div className="p-6 border-b border-khor-border-muted">
              <h4 className="text-[10px] font-bold text-khor-slate-400 uppercase tracking-widest mb-1">Text Colors — Figma "Text colors"</h4>
              <p className="text-[9px] text-khor-slate-400 mb-4">Colores de tipografía para fondos claros y oscuros.</p>

              {/* Neutral text */}
              <p className="text-[9px] font-semibold text-khor-slate-400 uppercase tracking-wider mb-2">Text Neutral (fondo claro)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {[
                  { name: 'Text Neutral/50',  v: '--khor-text-figma-neutral-50',  hex: '#ECEEF7' },
                  { name: 'Text Neutral/100', v: '--khor-text-figma-neutral-100', hex: '#D6D8E1' },
                  { name: 'Text Neutral/300', v: '--khor-text-figma-neutral-300', hex: '#B3B4BB' },
                  { name: 'Text Neutral/500', v: '--khor-text-figma-neutral-500', hex: '#8F9096' },
                  { name: 'Text Neutral/700', v: '--khor-text-figma-neutral-700', hex: '#5F6064' },
                  { name: 'Text Neutral/800', v: '--khor-text-figma-neutral-800', hex: '#2A2727' },
                  { name: 'Text Neutral/900', v: '--khor-text-figma-neutral-900', hex: '#000000' },
                ].map(({ name, v, hex }) => (
                  <div key={v} className="flex items-center gap-3 p-3 bg-white border border-khor-border-muted rounded-xl">
                    <span className="text-2xl font-extrabold flex-shrink-0" style={{ color: `var(${v})` }}>Aa</span>
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold block text-khor-navy">{name}</span>
                      <code className="text-[8px] text-khor-slate-400 font-mono block mt-0.5 break-all">{v}</code>
                      <span className="text-[8px] text-khor-slate-400 font-mono uppercase">{hex}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Blue / Red / Gold text */}
              <p className="text-[9px] font-semibold text-khor-slate-400 uppercase tracking-wider mb-2">Text Blue / Red / Gold</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {[
                  { name: 'Text Blue/900', v: '--khor-text-figma-blue-900', hex: '#0C1A66', bg: 'white' },
                  { name: 'Text Blue/100', v: '--khor-text-figma-blue-100', hex: '#8489AB', bg: 'white' },
                  { name: 'Text Red/900',  v: '--khor-text-figma-red-900',  hex: '#E04D36', bg: 'white' },
                  { name: 'Text Red/100',  v: '--khor-text-figma-red-100',  hex: '#DEA198', bg: 'white' },
                  { name: 'Text Gold/900', v: '--khor-text-figma-gold-900', hex: '#FF9500', bg: 'white' },
                  { name: 'Text Gold/100', v: '--khor-text-figma-gold-100', hex: '#E9C28A', bg: 'white' },
                  { name: 'Text White',    v: '--khor-text-figma-white',    hex: '#FFFFFF',  bg: '#051758' },
                ].map(({ name, v, hex, bg }) => (
                  <div key={v} className="flex items-center gap-3 p-3 border border-khor-border-muted rounded-xl" style={{ backgroundColor: bg }}>
                    <span className="text-2xl font-extrabold flex-shrink-0" style={{ color: `var(${v})` }}>Aa</span>
                    <div className="min-w-0">
                      <span className="text-[9px] font-bold block" style={{ color: bg === 'white' ? 'var(--khor-primary)' : '#ECEEF7' }}>{name}</span>
                      <code className="text-[8px] font-mono block mt-0.5 break-all" style={{ color: bg === 'white' ? '#8489AB' : 'rgba(236,238,247,0.6)' }}>{v}</code>
                      <span className="text-[8px] font-mono uppercase" style={{ color: bg === 'white' ? '#B3B4BB' : 'rgba(236,238,247,0.5)' }}>{hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dividers */}
            <div className="p-6">
              <h4 className="text-[10px] font-bold text-khor-slate-400 uppercase tracking-widest mb-4">Dividers — Figma "Dividers"</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <ColorCard name="Divider" variable="--khor-divider" hex="#CED4DA" />
                <ColorCard name="Border Muted"   variable="--khor-border-muted"   hex="slate-100" />
                <ColorCard name="Border Default" variable="--khor-border-default" hex="slate-200" />
                <ColorCard name="Border Strong"  variable="--khor-border-strong"  hex="slate-300" />
              </div>
            </div>
          </TokenSection>

          <TokenSection
            id="semantic-layer"
            icon={Layers}
            title="Semantic Tier 2: Application Tokens"
            description="Tokens que abstraen la funcionalidad del valor de color, permitiendo temas dinámicos."
          >
            {/* ── Action tokens ── */}
            <div className="p-6 border-b border-khor-border-muted">
              <h4 className="text-[10px] font-bold text-khor-slate-400 uppercase tracking-widest mb-4">Action Tokens</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: '--khor-action-primary-default',   bg: 'var(--khor-primary)',       value: '#051758' },
                  { label: '--khor-action-primary-hover',     bg: 'var(--khor-primary-hover)', value: '#0A1F60' },
                  { label: '--khor-action-secondary-default', bg: 'var(--khor-secondary)',      value: '#E04D36' },
                  { label: '--khor-action-danger-default',    bg: 'var(--khor-error)',          value: '#FF4D4F' },
                ].map(({ label, bg, value }) => (
                  <div key={label} className="flex flex-col gap-2 p-3 bg-khor-neutral-50 rounded-xl border border-khor-border-muted">
                    <div className="h-10 w-full rounded-lg border border-black/10" style={{ backgroundColor: bg }} />
                    <code className="text-[9px] text-khor-slate-400 font-mono leading-tight break-all">{label}</code>
                    <span className="text-[9px] font-bold text-khor-slate-500 uppercase">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Text on light background ── */}
            <div className="p-6 border-b border-khor-border-muted">
              <h4 className="text-[10px] font-bold text-khor-slate-400 uppercase tracking-widest mb-4">Text — Light Background</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: '--khor-text-primary',   value: '#051758', desc: 'Headings / body' },
                  { label: '--khor-text-secondary',  value: '#475a8f', desc: 'Subtitles' },
                  { label: '--khor-text-muted',      value: '#94a9d8', desc: 'Captions' },
                  { label: '--khor-text-disabled',   value: '#cbd8f1', desc: 'Disabled' },
                  { label: '--khor-text-label',      value: '#8489AB', desc: 'Labels / meta' },
                  { label: '--khor-text-link',       value: '#122699', desc: 'Links' },
                ].map(({ label, value, desc }) => (
                  <div key={label} className="flex items-center gap-3 p-3 bg-white border border-khor-border-muted rounded-xl">
                    <span className="text-xl font-extrabold flex-shrink-0 w-8" style={{ color: `var(${label})` }}>Aa</span>
                    <div className="min-w-0">
                      <code className="text-[9px] text-khor-slate-400 font-mono block break-all leading-tight">{label}</code>
                      <span className="text-[9px] font-bold text-khor-slate-500 uppercase block mt-0.5">{value}</span>
                      <span className="text-[9px] text-khor-slate-400">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Text on dark background (Figma: #ECEEF7) ── */}
            <div className="p-6 border-b border-khor-border-muted">
              <h4 className="text-[10px] font-bold text-khor-slate-400 uppercase tracking-widest mb-1">Text — Dark Background</h4>
              <p className="text-[9px] text-khor-slate-400 mb-4">Extraído de Figma — color base: <code className="bg-khor-neutral-100 px-1 rounded">#ECEEF7</code></p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 rounded-2xl" style={{ backgroundColor: 'var(--khor-secondary)' }}>
                {[
                  { label: '--khor-text-on-dark',           value: '#ECEEF7',             desc: 'Primary' },
                  { label: '--khor-text-on-dark-secondary', value: 'rgba(236,238,247,.70)', desc: 'Secondary' },
                  { label: '--khor-text-on-dark-muted',     value: 'rgba(236,238,247,.45)', desc: 'Muted / caption' },
                  { label: '--khor-text-on-dark-disabled',  value: 'rgba(236,238,247,.30)', desc: 'Disabled' },
                ].map(({ label, value, desc }) => (
                  <div key={label} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}>
                    <span className="text-xl font-extrabold flex-shrink-0 w-8" style={{ color: `var(${label})` }}>Aa</span>
                    <div className="min-w-0">
                      <code className="text-[9px] font-mono block break-all leading-tight" style={{ color: 'var(--khor-text-on-dark-muted)' }}>{label}</code>
                      <span className="text-[9px] font-bold uppercase block mt-0.5" style={{ color: 'var(--khor-text-on-dark-secondary)' }}>{value}</span>
                      <span className="text-[9px]" style={{ color: 'var(--khor-text-on-dark-muted)' }}>{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Border tokens ── */}
            <div className="p-6">
              <h4 className="text-[10px] font-bold text-khor-slate-400 uppercase tracking-widest mb-4">Border Tokens</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: '--khor-border-muted',   value: '#E2EAfc' },
                  { label: '--khor-border-default',  value: '#E2EAfc' },
                  { label: '--khor-border-strong',   value: '#CBD8F1' },
                  { label: '--khor-border-focus',    value: '#E04D36' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center gap-3 p-3 bg-white border-2 rounded-xl" style={{ borderColor: `var(${label})` }}>
                    <div className="min-w-0">
                      <code className="text-[9px] text-khor-slate-400 font-mono block break-all leading-tight">{label}</code>
                      <span className="text-[9px] font-bold text-khor-slate-500 uppercase block mt-0.5">{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TokenSection>

          <TokenSection 
            id="density" 
            icon={Maximize} 
            title="Density & Spacing Matrix" 
            description="Control de espaciado basado en el contexto de la interfaz (Compact vs Comfortable)."
          >
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="khor-compact p-6 bg-khor-neutral-50 dark:bg-khor-neutral-800 rounded-2xl border border-khor-border-muted relative">
                  <KTag color="primary" className="absolute -top-3 right-4">COMPACT</KTag>
                  <p className="text-xs text-khor-slate-500 mb-4">Para dashboards y alta densidad de datos.</p>
                  <div className="flex items-center gap-[var(--khor-density-spacing-sm)]">
                    <div className="h-[var(--khor-density-height-md)] w-24 bg-khor-primary rounded flex items-center justify-center text-[10px] text-white font-bold">Botón</div>
                    <div className="h-[var(--khor-density-height-md)] w-24 bg-khor-secondary rounded flex items-center justify-center text-[10px] text-white font-bold">Input</div>
                  </div>
                </div>
                <div className="khor-comfortable p-6 bg-khor-neutral-50 dark:bg-khor-neutral-800 rounded-2xl border border-khor-border-muted relative">
                  <KTag color="info" className="absolute -top-3 right-4">COMFORTABLE</KTag>
                  <p className="text-xs text-khor-slate-500 mb-4">Para formularios de onboarding y landing pages.</p>
                  <div className="flex items-center gap-[var(--khor-density-spacing-sm)]">
                    <div className="h-[var(--khor-density-height-md)] w-24 bg-khor-primary rounded flex items-center justify-center text-[10px] text-white font-bold">Botón</div>
                    <div className="h-[var(--khor-density-height-md)] w-24 bg-khor-secondary rounded flex items-center justify-center text-[10px] text-white font-bold">Input</div>
                  </div>
                </div>
              </div>
              <div id="spacing" className="border-t border-khor-border-muted pt-8">
                <h4 className="text-[10px] font-bold text-khor-slate-400 uppercase tracking-widest mb-4 px-4">Spacing Scale (4px Base)</h4>
                <div className="grid grid-cols-2 divide-x divide-khor-border-muted">
                  {[1, 2, 4, 6, 8, 12, 16].map(s => (
                    <TokenItem key={s} name={`Space ${s}`} variable={`--khor-space-${s}`} value={`${s*4}px`}>
                      <div style={{ width: s*4, height: s*4, backgroundColor: 'rgba(224, 77, 54, 0.2)', border: '1px dashed var(--khor-primary)', borderRadius: 2 }} />
                    </TokenItem>
                  ))}
                </div>
              </div>
            </div>
          </TokenSection>

          <TokenSection 
            id="contrast" 
            icon={Eye} 
            title="WCAG Contrast Certification" 
            description="Combinaciones de colores validadas para cumplimiento de accesibilidad internacional."
          >
            <div className="p-0 overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-khor-neutral-100 dark:bg-khor-neutral-800 border-b border-khor-border-muted">
                    <th className="p-4 font-bold text-khor-navy dark:text-white">Background</th>
                    <th className="p-4 font-bold text-khor-navy dark:text-white">Foreground</th>
                    <th className="p-4 font-bold text-khor-navy dark:text-white">Ratio</th>
                    <th className="p-4 font-bold text-khor-navy dark:text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-khor-border-muted">
                    <td className="p-4 flex items-center gap-3"><div className="w-6 h-6 rounded border bg-white" /> Surface Card</td>
                    <td className="p-4">Text Primary</td>
                    <td className="p-4 font-mono font-bold">16.2:1</td>
                    <td className="p-4"><KBadge status="success" label="AAA" /></td>
                  </tr>
                  <tr className="border-b border-khor-border-muted">
                    <td className="p-4 flex items-center gap-3"><div className="w-6 h-6 rounded border bg-white" /> Surface Card</td>
                    <td className="p-4">Text Secondary</td>
                    <td className="p-4 font-mono font-bold">6.8:1</td>
                    <td className="p-4"><KBadge status="success" label="AA" /></td>
                  </tr>
                  <tr className="border-b border-khor-border-muted">
                    <td className="p-4 flex items-center gap-3"><div className="w-6 h-6 rounded border bg-khor-secondary" /> Primary Red</td>
                    <td className="p-4">White (OnAction)</td>
                    <td className="p-4 font-mono font-bold">4.8:1</td>
                    <td className="p-4"><KBadge status="success" label="AA" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TokenSection>

          <TokenSection 
            id="font-family" 
            icon={CaseLower} 
            title="Fluid Typography System" 
            description="Sistema responsivo basado en clamp() para una lectura óptima en cualquier dispositivo."
          >
            <div className="p-6 space-y-8">
              <div className="bg-khor-primary/5 p-6 rounded-2xl border border-khor-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <Monitor className="text-khor-primary" size={20} />
                  <Tablet className="text-khor-primary/60" size={18} />
                  <Smartphone className="text-khor-primary/40" size={16} />
                  <span className="text-xs font-bold text-khor-primary uppercase tracking-widest">Fluid Engine Active</span>
                </div>
                <div className="space-y-6">
                   <div>
                     <KText variant="display-1" className="block truncate">Display 1 Fluid</KText>
                     <code className="text-[10px] text-khor-slate-400 mt-2 block">--khor-font-size-display-1: clamp(2.5rem, 5vw + 1rem, 4.5rem)</code>
                   </div>
                   <div>
                     <KText variant="h1" className="block truncate">Heading 1 Fluid</KText>
                     <code className="text-[10px] text-khor-slate-400 mt-2 block">--khor-font-size-h1: clamp(1.75rem, 3vw + 1rem, 2.5rem)</code>
                   </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TokenItem name="Primary Family" variable="--font-primary" value="Montserrat">
                  <span style={{ fontSize: 24, fontFamily: 'Montserrat', fontWeight: 700 }}>Aa</span>
                </TokenItem>
                <TokenItem name="Secondary Family" variable="--font-secondary" value="Plus Jakarta Sans">
                  <span style={{ fontSize: 24, fontFamily: 'Plus Jakarta Sans', fontWeight: 500 }}>Aa</span>
                </TokenItem>
              </div>

              <div className="divide-y divide-khor-border-muted border-t border-khor-border-muted">
                {[
                  { n: 'Body XL', var: '--khor-font-size-body-xl', val: '18px' },
                  { n: 'Body LG', var: '--khor-font-size-body-lg', val: '16px' },
                  { n: 'Body MD', var: '--khor-font-size-body-md', val: '14px' },
                  { n: 'Small', var: '--khor-font-size-body-sm', val: '12px' },
                  { n: 'Caption', var: '--khor-font-size-caption', val: '11px' },
                ].map(item => (
                  <TokenItem key={item.n} name={item.n} variable={item.var} value={item.val}>
                    <span style={{ fontSize: 18 }}>Ag</span>
                  </TokenItem>
                ))}
              </div>
            </div>
          </TokenSection>

          <TokenSection 
            id="iconography" 
            icon={Eye} 
            title="Iconography & Sizing" 
            description="Escala de tamaños para iconos Lucide y componentes de interfaz."
          >
            <div className="divide-y divide-khor-border-muted">
              {[
                { n: 'XS', var: '--khor-icon-xs', val: '12px' },
                { n: 'SM', var: '--khor-icon-sm', val: '16px' },
                { n: 'MD', var: '--khor-icon-md', val: '20px' },
                { n: 'LG', var: '--khor-icon-lg', val: '24px' },
                { n: 'XL', var: '--khor-icon-xl', val: '32px' },
                { n: '2XL', var: '--khor-icon-2xl', val: '48px' },
              ].map(item => (
                <TokenItem key={item.n} name={item.n} variable={item.var} value={item.val}>
                   <div className="bg-khor-primary/10 rounded-lg flex items-center justify-center" style={{ width: 48, height: 48 }}>
                     <KIcon name="Sparkles" size={item.n.toLowerCase() as any} color="var(--khor-primary)" />
                   </div>
                </TokenItem>
              ))}
            </div>
          </TokenSection>

          <TokenSection 
            id="shadow" 
            icon={BoxSelect} 
            title="Shadow Construction" 
            description="Sombras multi-capa optimizadas para profundidad y branding (Tier 2-3)."
          >
            <div className="flex flex-col">
              <ShadowDetailCard 
                name="Shadow SM" 
                variable="--khor-shadow-sm" 
                layers={[
                  { x: 0, y: 1, blur: 2, spread: 0, opacity: "4%", color: "#051758" },
                  { x: 0, y: 1, blur: 1, spread: 0, opacity: "2%", color: "#000000" }
                ]} 
              />
              <ShadowDetailCard 
                name="Shadow MD" 
                variable="--khor-shadow-md" 
                layers={[
                  { x: 0, y: 4, blur: 6, spread: -1, opacity: "8%", color: "#051758" },
                  { x: 0, y: 2, blur: 4, spread: -1, opacity: "4%", color: "#000000" }
                ]} 
              />
              <ShadowDetailCard 
                name="Shadow LG" 
                variable="--khor-shadow-lg" 
                layers={[
                  { x: 0, y: 10, blur: 15, spread: -3, opacity: "10%", color: "#051758" },
                  { x: 0, y: 4, blur: 6, spread: -2, opacity: "5%", color: "#000000" }
                ]} 
              />
              <ShadowDetailCard 
                name="Shadow XL" 
                variable="--khor-shadow-xl" 
                layers={[
                  { x: 0, y: 20, blur: 25, spread: -5, opacity: "12%", color: "#051758" },
                  { x: 0, y: 10, blur: 10, spread: -5, opacity: "4%", color: "#000000" }
                ]} 
              />
              <ShadowDetailCard 
                name="Shadow 2XL" 
                variable="--khor-shadow-2xl" 
                layers={[
                  { x: 0, y: 25, blur: 50, spread: -12, opacity: "25%", color: "#051758" }
                ]} 
              />
              <ShadowDetailCard 
                name="Shadow Inner" 
                variable="--khor-shadow-inner" 
                layers={[
                  { x: 0, y: 2, blur: 4, spread: 0, opacity: "6%", color: "#000000", inset: true }
                ]} 
              />
            </div>
          </TokenSection>

          <TokenSection 
            id="layout" 
            icon={Grid3X3} 
            title="Layout Guidelines" 
            description="Grillas de columnas consistentes para el diseño responsivo en múltiples dispositivos."
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: 'Sm', cols: 12, gutter: 16, margin: 16, icon: Smartphone },
                  { name: 'Md', cols: 12, gutter: 24, margin: 24, icon: Tablet },
                  { name: 'Lg', cols: 12, gutter: 32, margin: 32, icon: Monitor },
                  { name: 'Xl', cols: 12, gutter: 32, margin: 40, icon: Monitor },
                ].map((spec) => (
                  <div key={spec.name} className="p-5 bg-white/50 dark:bg-khor-surface-card rounded-2xl border border-khor-border-muted hover:shadow-md transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-khor-primary/10 text-khor-primary rounded-lg group-hover:scale-110 transition-transform">
                        <spec.icon size={20} />
                      </div>
                      <span className="text-xs font-bold text-khor-navy dark:text-white uppercase px-2 py-1 bg-khor-neutral-100 dark:bg-khor-neutral-800 rounded-md">{spec.name}</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-khor-slate-400 font-medium">Columnas</span>
                        <span className="text-khor-navy dark:text-white font-bold">{spec.cols}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-khor-slate-400 font-medium">Gutter</span>
                        <span className="text-khor-navy dark:text-white font-bold">{spec.gutter}px</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-khor-slate-400 font-medium">Margin (Offset)</span>
                        <span className="text-khor-navy dark:text-white font-bold">{spec.margin}px</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-khor-border-muted/50 flex gap-1 h-6">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex-1 bg-khor-primary/10 rounded-sm" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TokenSection>

          <TokenSection 
            id="z-index" 
            icon={Layers} 
            title="Z-Index Scale" 
            description="Sistema de capas estandarizado para evitar conflictos de superposición."
          >
            <div className="divide-y divide-khor-border-muted">
              {[
                { n: 'Dropdown', var: '--khor-z-dropdown', val: '1000' },
                { n: 'Sticky', var: '--khor-z-sticky', val: '1100' },
                { n: 'Overlay', var: '--khor-z-overlay', val: '1200' },
                { n: 'Drawer', var: '--khor-z-drawer', val: '1300' },
                { n: 'Modal', var: '--khor-z-modal', val: '1400' },
                { n: 'Toast', var: '--khor-z-toast', val: '1700' },
              ].map(item => (
                <TokenItem key={item.n} name={item.n} variable={item.var} value={item.val}>
                   <div className="relative w-12 h-12">
                     <div className="absolute inset-0 bg-khor-secondary/10 rounded-lg scale-90 -translate-x-1 translate-y-1" />
                     <div className="absolute inset-0 bg-khor-secondary/20 rounded-lg scale-95" />
                     <div className="absolute inset-0 bg-khor-primary rounded-lg border-2 border-white shadow-sm flex items-center justify-center text-[8px] text-white font-bold">
                       {item.val}
                     </div>
                   </div>
                </TokenItem>
              ))}
            </div>
          </TokenSection>

          <TokenSection 
            id="motion" 
            icon={Zap} 
            title="Motion & Easing" 
            description="Curvas de aceleración y duraciones para una interfaz viva (Layer 2)."
          >
            <div className="p-6">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
                {[
                  { n: 'Instant', v: '75ms', var: '--khor-duration-instant' },
                  { n: 'Fast', v: '150ms', var: '--khor-duration-fast' },
                  { n: 'Normal', v: '250ms', var: '--khor-duration-normal' },
                  { n: 'Slow', v: '450ms', var: '--khor-duration-slow' },
                ].map(d => (
                  <div key={d.n} className="bg-khor-neutral-100 dark:bg-khor-neutral-800 p-3 rounded-xl border border-khor-border-muted text-center hover:scale-105 transition-transform">
                    <span className="text-[10px] font-bold block text-khor-navy dark:text-white">{d.n}</span>
                    <span className="text-[11px] text-khor-primary font-mono">{d.v}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                 {[
                    { n: 'Standard', v: 'cubic-bezier(0.4, 0, 0.2, 1)', var: '--khor-easing-standard' },
                    { n: 'Spring', v: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', var: '--khor-easing-spring' },
                    { n: 'Enter', v: 'cubic-bezier(0, 0, 0.2, 1)', var: '--khor-easing-enter' },
                    { n: 'Exit', v: 'cubic-bezier(0.4, 0, 1, 1)', var: '--khor-easing-exit' },
                    { n: 'Decelerate', v: 'cubic-bezier(0, 0, 0.2, 1)', var: '--khor-easing-decelerate' },
                    { n: 'Accelerate', v: 'cubic-bezier(0.4, 0, 1, 1)', var: '--khor-easing-accelerate' },
                    { n: 'Emphasized', v: 'cubic-bezier(0.2, 0, 0, 1)', var: '--khor-easing-emphasized' },
                 ].map(e => (
                   <div key={e.n} className="flex items-center gap-4 p-4 bg-white/50 dark:bg-khor-surface-card rounded-xl border border-khor-border-muted group overflow-hidden">
                     <div className="w-12 h-12 bg-khor-primary/10 rounded-lg flex items-center justify-center text-khor-primary group-hover:rotate-12 transition-transform">
                       <RotateCw size={20} />
                     </div>
                     <div className="flex-1">
                        <span className="text-sm font-bold block text-khor-navy dark:text-white">{e.n} Easing</span>
                        <code className="text-[10px] text-khor-slate-400 font-mono">{e.v}</code>
                     </div>
                     <div className="w-24 h-2 bg-khor-neutral-100 dark:bg-khor-neutral-800 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0 bg-khor-primary rounded-full animate-motion-preview" style={{ transitionTimingFunction: e.v }} />
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          </TokenSection>

          </div>
        </div>
      </div>
      </div>
      )}

      {/* ── CÓDIGO ── */}
      {active === 'code' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {[
            {
              title: 'Importar el objeto khorTokens (TypeScript)',
              desc: 'Accede a todos los tokens como valores JS tipados — ideal para estilos en línea y lógica condicional.',
              filename: 'component.tsx',
              code:
`import { khorTokens } from '@/theme/khor-theme';

const { colors, spacing, radius, typography } = khorTokens;

// Uso en estilos en línea
<div style={{
  backgroundColor: colors.brand.primary,   // #051758
  padding: spacing.md,                       // 16px
  borderRadius: radius.lg,                   // 12px
  fontSize: typography.bodySm.size,          // 13px
}} />`,
            },
            {
              title: 'CSS Custom Properties (variables)',
              desc: 'Usa los tokens directamente en CSS, Tailwind o Styled-Components mediante custom properties.',
              filename: 'styles.css',
              code:
`.my-component {
  /* Colores semánticos — recomendado */
  background-color: var(--khor-surface-card);
  color:            var(--khor-text-primary);
  border:           1px solid var(--khor-border-default);

  /* Primitivos de marca */
  background-color: var(--khor-primary);     /* #051758 navy */
  background-color: var(--khor-secondary);   /* #E04D36 coral */

  /* Spacing */
  padding: var(--khor-spacing-md);           /* 16px */
  gap:     var(--khor-spacing-sm);           /* 8px */

  /* Radius */
  border-radius: var(--khor-radius-lg);      /* 12px */

  /* Sombras */
  box-shadow: var(--khor-shadow-md);

  /* Motion */
  transition: all var(--khor-duration-fast) var(--khor-easing-standard);
}`,
            },
            {
              title: 'Tailwind utility classes',
              desc: 'Todos los tokens están disponibles como utilidades de Tailwind mediante el prefijo khor-.',
              filename: 'component.tsx',
              code:
`{/* Colores */}
<div className="bg-khor-primary text-white" />
<div className="bg-khor-secondary text-white" />
<div className="text-khor-navy" />

{/* Superficies semánticas */}
<div className="bg-khor-surface-card border border-khor-border-default" />

{/* Espaciado semántico */}
<div className="p-khor-md gap-khor-sm" />

{/* Estados interactivos */}
<button className="
  bg-khor-action-primary text-khor-text-on-action
  hover:bg-khor-action-primary-hover
  disabled:bg-khor-button-disabled-bg
  disabled:text-khor-button-disabled-text
" />`,
            },
          ].map(({ title, desc, filename, code }) => (
            <div key={title} style={{ borderRadius: t.radius.lg, border: `1px solid ${t.colors.neutral[200]}`, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', background: 'var(--card)', borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
                <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--foreground)' }}>{title}</p>
                <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--muted-foreground)' }}>{desc}</p>
              </div>
              <pre style={{ margin: 0, padding: '16px 20px', background: t.colors.brand.navy, color: '#c2ccef', fontSize: 13, lineHeight: 1.7, overflowX: 'auto', fontFamily: 'monospace', whiteSpace: 'pre' }}>
                {code}
              </pre>
            </div>
          ))}
        </div>
      )}

      {/* ── DOCUMENTACIÓN ── */}
      {active === 'docs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

          {/* Architecture */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', margin: '0 0 12px' }}>Arquitectura de 3 capas</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
              {[
                { layer: '1', name: 'Primitivos', color: '#e0e6fb', textColor: t.colors.brand.navy, desc: 'Valores raw sin significado semántico. Escalas de color, tipografía base, espaciado base.', example: '--khor-blue-500, --khor-red-300, --khor-font-size-sm' },
                { layer: '2', name: 'Semánticos', color: t.colors.brand.primary, textColor: '#fff', desc: 'Roles con propósito. Se mapean a primitivos y cambian según el tema (light/dark).', example: '--khor-text-primary, --khor-surface-card, --khor-border-default' },
                { layer: '3', name: 'Componente', color: '#051758', textColor: '#fff', desc: 'Tokens específicos de cada componente. Consumen semánticos y permiten theming granular.', example: '--khor-button-primary-bg, --khor-input-border, --khor-badge-font-size' },
              ].map(l => (
                <div key={l.layer} style={{ borderRadius: t.radius.lg, overflow: 'hidden', border: `1px solid ${t.colors.neutral[200]}` }}>
                  <div style={{ padding: '10px 14px', background: l.color, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: l.textColor }}>L{l.layer}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: l.textColor }}>{l.name}</span>
                  </div>
                  <div style={{ padding: '12px 14px', background: 'var(--card)' }}>
                    <p style={{ margin: '0 0 8px', fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{l.desc}</p>
                    <code style={{ fontSize: 11, color: t.colors.brand.primary, background: `${t.colors.brand.primary}0f`, padding: '3px 6px', borderRadius: 4 }}>{l.example}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Naming convention */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', margin: '0 0 12px' }}>Convención de nombres</h4>
            <div style={{ overflowX: 'auto', borderRadius: t.radius.md, border: `1px solid ${t.colors.neutral[200]}` }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: t.colors.neutral[100] }}>
                    {['Patrón', 'Ejemplo', 'Descripción'].map(h => (
                      <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${t.colors.neutral[200]}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { pat: '--khor-{color}-{step}', ex: '--khor-blue-500', desc: 'Token primitivo de color — nunca usar directamente en componentes' },
                    { pat: '--khor-{role}',           ex: '--khor-text-primary', desc: 'Token semántico — role del token en la UI, responde al tema' },
                    { pat: '--khor-{component}-{prop}', ex: '--khor-button-primary-bg', desc: 'Token de componente — overrideable por el consumidor del UI Kit' },
                    { pat: '--khor-spacing-{scale}',  ex: '--khor-spacing-md', desc: 'Espaciado semántico (xs, sm, md, lg, xl, 2xl)' },
                    { pat: '--khor-radius-{scale}',   ex: '--khor-radius-lg', desc: 'Border radius por escala (sm, md, lg, xl, 2xl, full)' },
                  ].map((row, i) => (
                    <tr key={row.pat} style={{ background: i % 2 === 0 ? 'var(--card)' : t.colors.neutral[100] }}>
                      <td style={{ padding: '10px 16px', borderBottom: `1px solid ${t.colors.neutral[200]}` }}><code style={{ fontSize: 12, color: t.colors.brand.primary }}>{row.pat}</code></td>
                      <td style={{ padding: '10px 16px', borderBottom: `1px solid ${t.colors.neutral[200]}`, fontFamily: 'monospace', color: 'var(--muted-foreground)', fontSize: 12 }}>{row.ex}</td>
                      <td style={{ padding: '10px 16px', borderBottom: `1px solid ${t.colors.neutral[200]}`, color: 'var(--muted-foreground)', fontSize: 12 }}>{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Guidelines */}
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', margin: '0 0 12px' }}>Guías de uso</h4>
            <ul style={{ paddingLeft: 20, color: 'var(--muted-foreground)', fontSize: 14, lineHeight: 1.85, margin: 0 }}>
              <li>Usa siempre tokens <strong>semánticos</strong> en componentes, no primitivos directamente — los primitivos son intocables desde fuera del theme.</li>
              <li>Nunca hardcodees valores hex en componentes — usa <code style={{ fontSize: 12 }}>var(--khor-...)</code> o el objeto <code style={{ fontSize: 12 }}>khorTokens</code>.</li>
              <li>Los tokens de componente (<code style={{ fontSize: 12 }}>--khor-button-*</code>) son los únicos que el consumidor del UI Kit puede sobrescribir.</li>
              <li>El modo oscuro se maneja completamente mediante tokens semánticos — no hay lógica de tema en los componentes.</li>
              <li>Cualquier nuevo valor visual debe pasar primero por Figma Variables antes de añadirse al código.</li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}

export default TokensPage;