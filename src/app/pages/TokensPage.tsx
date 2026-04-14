import React from 'react';
import { khorTokens } from '../theme/khor-theme';
import { KTypography, KTag, KBadge } from '../components/design-system/atoms';
import { KCardSection } from '../components/design-system/organisms';
import { 
  SquareDashed, Droplets, Expand, CaseLower, ArrowUpDown, Bold, 
  Split, Hash, Percent, RotateCw, BoxSelect, Maximize, 
  Grid3X3, Zap, Type, Underline, Highlighter, Eye, Layers, Palette
} from 'lucide-react';

const t = khorTokens;

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
        <h2 className="text-2xl font-bold text-khor-secondary m-0">{title}</h2>
        {description && <p className="text-khor-slate-500 text-sm mt-1">{description}</p>}
      </div>
    </div>
    <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-khor-border-muted overflow-hidden">
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
  <div className="flex items-center gap-6 p-4 border-b border-khor-border-muted last:border-0 hover:bg-white/80 transition-colors">
    <div className="flex-shrink-0 w-24 h-24 flex items-center justify-center bg-khor-neutral-100 rounded-xl overflow-hidden border border-khor-border-muted">
      {preview || children}
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-bold text-khor-secondary truncate">{name}</h3>
      <code className="text-[10px] text-khor-slate-400 font-mono block mt-1">{variable}</code>
      {value && <span className="text-[11px] text-khor-slate-500 mt-2 block font-medium">{value}</span>}
    </div>
  </div>
);

const ColorCard = ({ variable, name, hex }: { variable: string; name: string; hex?: string }) => (
  <div className="flex flex-col gap-3 p-4 bg-white/50 border border-khor-border-muted rounded-2xl hover:shadow-lg transition-all">
    <div className="w-full h-20 rounded-xl border border-black/5" style={{ backgroundColor: `var(${variable})` }} />
    <div>
      <h4 className="text-xs font-bold text-khor-secondary">{name}</h4>
      <code className="text-[9px] text-khor-slate-400 font-mono block mt-1">{variable}</code>
      {hex && <span className="text-[10px] text-khor-slate-500 font-medium block mt-1 uppercase">{hex}</span>}
    </div>
  </div>
);

const ColorScaleRow = ({ title, baseVariable, steps, hexMap }: { title: string; baseVariable: string; steps: number[]; hexMap?: Record<number, string> }) => (
  <div className="p-6 border-b border-khor-border-muted last:border-0">
    <h4 className="text-xs font-bold text-khor-secondary mb-4 uppercase tracking-wider">{title} Scale</h4>
    <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
      {steps.map(step => (
        <div key={step} className="flex flex-col gap-2">
          <div 
            className="h-12 w-full rounded-lg border border-black/5 shadow-sm"
            style={{ backgroundColor: `var(${baseVariable}-${step})` }}
          />
          <div className="px-1">
            <span className="text-[9px] font-bold text-khor-secondary block">{step}</span>
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
    <div className="w-5 h-5 rounded bg-khor-secondary/10 flex items-center justify-center text-[10px] font-bold text-khor-secondary">
      {layer}
    </div>
    <div className="flex flex-wrap gap-2 text-[10px] text-khor-slate-500 font-medium">
      <span className="bg-white px-1.5 py-0.5 rounded border border-khor-border-muted">X: <span className="text-khor-secondary font-bold">{x}</span></span>
      <span className="bg-white px-1.5 py-0.5 rounded border border-khor-border-muted">Y: <span className="text-khor-secondary font-bold">{y}</span></span>
      <span className="bg-white px-1.5 py-0.5 rounded border border-khor-border-muted">Blur: <span className="text-khor-secondary font-bold">{blur}</span></span>
      <span className="bg-white px-1.5 py-0.5 rounded border border-khor-border-muted">Spread: <span className="text-khor-secondary font-bold">{spread || 0}</span></span>
      <span className="bg-white px-1.5 py-0.5 rounded border border-khor-border-muted">Opacity: <span className="text-khor-primary font-bold">{opacity}</span></span>
      {inset && <KTag size="xxs" color="info" label="INSET" className="text-[8px] h-4" />}
    </div>
  </div>
);

const ShadowDetailCard = ({ name, variable, layers }: { 
  name: string; variable: string; layers: Array<{ x: number, y: number, blur: number, spread: number, opacity: string, color: string, inset?: boolean }> 
}) => (
  <div className="p-6 border-b border-khor-border-muted last:border-0 hover:bg-white/40 transition-all">
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-shrink-0 w-32 h-32 bg-white rounded-2xl border border-khor-border-muted shadow-inner flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 opacity-[0.2] bg-[radial-gradient(#051758_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="w-16 h-16 bg-white rounded-xl border border-khor-border-muted z-10 transition-transform group-hover:scale-110" style={{ boxShadow: `var(${variable})` }} />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-sm font-bold text-khor-secondary">{name}</h3>
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
        <div className="bg-khor-neutral-100/50 rounded-xl p-3 border border-khor-border-muted">
          <h4 className="text-[9px] font-bold text-khor-slate-400 uppercase tracking-widest mb-2 px-1">Construcción Técnica</h4>
          {layers.map((l, i) => (
            <ShadowLayerInfo key={i} layer={i + 1} {...l} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export function TokensPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-8">
      {/* Header */}
      <div className="mb-20 text-center">
        <KBadge label="v10.5 Stable" status="success" className="mb-4" />
        <h1 className="text-5xl font-extrabold text-khor-secondary mb-6 tracking-tight">
          Manual de <span className="text-khor-primary">Tokens de Diseño</span>
        </h1>
        <p className="text-xl text-khor-slate-500 max-w-2xl mx-auto">
          La base técnica unificada para desarrolladores, diseñadores y agentes de IA. Reforzado para precisión en Figma, Penpot y Código.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Navigation Sidebar (Floating) */}
        <div className="lg:col-span-3">
          <div className="sticky top-10 space-y-1">
            <h4 className="text-[10px] font-bold text-khor-slate-400 uppercase tracking-widest px-4 mb-4">Taxonomía Completa</h4>
            {[
              { icon: Droplets, label: 'Color Palette', id: 'color' },
              { icon: Palette, label: 'Status & Feedback', id: 'status-feedback' },
              { icon: Zap, label: 'Color Scales', id: 'color-scales' },
              { icon: CaseLower, label: 'Font Family', id: 'font-family' },
              { icon: ArrowUpDown, label: 'Font Size', id: 'font-size' },
              { icon: Bold, label: 'Font Weight', id: 'font-weight' },
              { icon: Split, label: 'Letter Spacing', id: 'letter-spacing' },
              { icon: SquareDashed, label: 'Border Radius', id: 'border-radius' },
              { icon: Zap, label: 'Stroke Width', id: 'stroke-width' },
              { icon: BoxSelect, label: 'Shadow', id: 'shadow' },
              { icon: Percent, label: 'Opacity', id: 'opacity' },
              { icon: RotateCw, label: 'Rotation', id: 'rotation' },
              { icon: Grid3X3, label: 'Spacing', id: 'spacing' },
              { icon: Maximize, label: 'Sizing', id: 'sizing' },
              { icon: Expand, label: 'Dimensions', id: 'dimensions' },
              { icon: Hash, label: 'Number', id: 'number' },
              { icon: Type, label: 'Text Case', id: 'text-case' },
              { icon: Underline, label: 'Text Decoration', id: 'text-decoration' },
              { icon: Highlighter, label: 'Typography', id: 'typography' },
            ].map(item => (
              <a key={item.id} href={`#${item.id}`} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-khor-primary/5 text-khor-slate-600 hover:text-khor-primary transition-all group">
                <item.icon size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold">{item.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9">
          
          <TokenSection 
            id="color" 
            icon={Droplets} 
            title="Core Color Palette" 
            description="Escalas semánticas y neutros optimizados para accesibilidad y contraste."
          >
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              <ColorCard name="Primary (Khor Red)" variable="--khor-primary" hex="#E04D36" />
              <ColorCard name="Secondary (Khor Navy)" variable="--khor-secondary" hex="#051758" />
              <ColorCard name="Accent (Khor Orange)" variable="--khor-accent" hex="#FF9500" />
              <ColorCard name="White" variable="--khor-feedback-white" hex="#FFFFFF" />
              <div className="col-span-full py-4"><h3 className="text-sm font-bold text-khor-secondary">Neutral (Slate) Palette</h3></div>
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(n => (
                <ColorCard key={n} name={`Neutral ${n}`} variable={`--khor-neutral-${n}`} />
              ))}
              <div className="col-span-full py-4 border-t border-khor-border-muted mt-4"><h3 className="text-sm font-bold text-khor-secondary">Neutral Secondary (Blue-Grey) Palette</h3></div>
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(n => (
                <ColorCard key={n} name={`Sec. Neutral ${n}`} variable={`--khor-neutral-secondary-${n}`} />
              ))}
            </div>
          </TokenSection>

          {/* 1.1 STATUS & FEEDBACK */}
          <TokenSection 
            id="status-feedback" 
            icon={Palette} 
            title="Status & Feedback" 
            description="Colores de estado core y variantes extendidas v10.4."
          >
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <ColorCard name="Success" variable="--khor-success" hex="#2E7D32" />
                <ColorCard name="Error" variable="--khor-error" hex="#D32F2F" />
                <ColorCard name="Warning" variable="--khor-warning" hex="#FF9500" />
                <ColorCard name="Info" variable="--khor-info" hex="#051758" />
              </div>

              <div className="col-span-full mb-6 border-t border-khor-border-muted pt-8">
                <h3 className="text-md font-bold text-khor-secondary mb-2">Feedback Extendido v10.4</h3>
                <p className="text-xs text-khor-slate-500 mb-6">Paleta premium para estados complejos y categorización visual avanzada.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                  <ColorCard name="Processing" variable="--khor-feedback-processing" hex="#0EA5E9" />
                  <ColorCard name="Volcano" variable="--khor-feedback-volcano" hex="#EA580C" />
                  <ColorCard name="Gold" variable="--khor-feedback-gold" hex="#EAB308" />
                  <ColorCard name="Lime" variable="--khor-feedback-lime" hex="#84CC16" />
                  <ColorCard name="Purple" variable="--khor-feedback-purple" hex="#A855F7" />
                </div>
              </div>
            </div>
          </TokenSection>

          {/* 1.2 COLOR SCALES */}
          <TokenSection 
            id="color-scales" 
            icon={Zap} 
            title="Functional Color Scales" 
            description="Escalas completas de 50 a 900 para diseño de componentes complejos y estados."
          >
            <div className="flex flex-col bg-white">
              <ColorScaleRow 
                title="Success" 
                baseVariable="--khor-success" 
                steps={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} 
                hexMap={{ 50: '#E8F5E9', 100: '#C8E6C9', 200: '#A5D6A7', 300: '#81C784', 400: '#66BB6A', 500: '#4CAF50', 600: '#43A047', 700: '#2E7D32', 800: '#1B5E20', 900: '#0D3E12' }}
              />
              <ColorScaleRow 
                title="Error" 
                baseVariable="--khor-error" 
                steps={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} 
                hexMap={{ 50: '#FFEBEE', 100: '#FFCDD2', 200: '#EF9A9A', 300: '#E57373', 400: '#EF5350', 500: '#F44336', 600: '#E53935', 700: '#B71C1C', 800: '#C62828', 900: '#B71C1C' }}
              />
              <ColorScaleRow 
                title="Warning" 
                baseVariable="--khor-warning" 
                steps={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} 
                hexMap={{ 50: '#FFF4E5', 100: '#FFECB3', 200: '#FFE082', 300: '#FFD54F', 400: '#FFCA28', 500: '#FFC107', 600: '#FFB300', 700: '#E07800', 800: '#FFA000', 900: '#FF8F00' }}
              />
              <ColorScaleRow 
                title="Info" 
                baseVariable="--khor-info" 
                steps={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} 
                hexMap={{ 50: '#E3F2FD', 100: '#BBDEFB', 200: '#90CAF9', 300: '#64B5F6', 400: '#42A5F5', 500: '#2196F3', 600: '#1E88E5', 700: '#1565C0', 800: '#1565C0', 900: '#0D47A1' }}
              />
              <ColorScaleRow 
                title="Teal" 
                baseVariable="--khor-teal" 
                steps={[50, 100, 200, 300, 400, 500, 600, 700, 800, 900]} 
                hexMap={{ 50: '#E0F2F2', 100: '#B2DFDF', 200: '#80CBCB', 300: '#4DB6B6', 400: '#26A6A6', 500: '#009696', 600: '#008989', 700: '#0D7D7D', 800: '#006969', 900: '#004D4D' }}
              />
            </div>
          </TokenSection>

          {/* 2. FONT FAMILY */}
          <TokenSection 
            id="font-family" 
            icon={CaseLower} 
            title="Font Family" 
            description="Familias tipográficas para interfaces enterprise."
          >
            <TokenItem name="Primary" variable="--font-primary" value="Montserrat">
              <span style={{ fontSize: 24, fontFamily: 'Montserrat' }}>Aa</span>
            </TokenItem>
            <TokenItem name="Secondary" variable="--font-secondary" value="Plus Jakarta Sans">
              <span style={{ fontSize: 24, fontFamily: 'Plus Jakarta Sans' }}>Aa</span>
            </TokenItem>
          </TokenSection>

          {/* 3. FONT SIZE */}
          <TokenSection 
            id="font-size" 
            icon={ArrowUpDown} 
            title="Font Size Scale" 
            description="Sistema responsivo de tamaños de fuente."
          >
            <div className="divide-y divide-khor-border-muted">
              {[
                { n: 'Display 1', var: '--khor-font-size-display-1', val: '72px' },
                { n: 'H1', var: '--khor-font-size-h1', val: '40px' },
                { n: 'H2', var: '--khor-font-size-h2', val: '32px' },
                { n: 'Body LG', var: '--khor-font-size-body-lg', val: '16px' },
                { n: 'Body MD', var: '--khor-font-size-body-md', val: '14px' },
                { n: 'Small', var: '--khor-font-size-body-sm', val: '12px' },
              ].map(item => (
                <TokenItem key={item.n} name={item.n} variable={item.var} value={item.val}>
                  <span style={{ fontSize: 18 }}>Ag</span>
                </TokenItem>
              ))}
            </div>
          </TokenSection>

          {/* 4. FONT WEIGHT */}
          <TokenSection 
            id="font-weight" 
            icon={Bold} 
            title="Font Weight" 
            description="Pesos tipográficos tokenizados para consistencia."
          >
            {[
              { n: 'Light', var: '--khor-font-weight-light', val: '300' },
              { n: 'Regular', var: '--khor-font-weight-regular', val: '400' },
              { n: 'Medium', var: '--khor-font-weight-medium', val: '500' },
              { n: 'SemiBold', var: '--khor-font-weight-semibold', val: '600' },
              { n: 'Bold', var: '--khor-font-weight-bold', val: '700' },
            ].map(item => (
              <TokenItem key={item.n} name={item.n} variable={item.var} value={item.val}>
                <span style={{ fontSize: 20, fontWeight: item.val }}>Aa</span>
              </TokenItem>
            ))}
          </TokenSection>

          {/* 5. LETTER SPACING */}
          <TokenSection 
            id="letter-spacing" 
            icon={Split} 
            title="Letter Spacing" 
            description="Control de micro-tipografía (Kerning)."
          >
            {[
              { n: 'Tight', var: '--khor-letter-spacing-tight', val: '-0.02em' },
              { n: 'Normal', var: '--khor-letter-spacing-normal', val: '0' },
              { n: 'Wide', var: '--khor-letter-spacing-wide', val: '0.025em' },
            ].map(item => (
              <TokenItem key={item.n} name={item.n} variable={item.var} value={item.val}>
                <span style={{ fontSize: 14, letterSpacing: item.val }}>Spacing</span>
              </TokenItem>
            ))}
          </TokenSection>

          {/* 6. BORDER RADIUS */}
          <TokenSection id="border-radius" icon={SquareDashed} title="Border Radius">
            <div className="p-6 grid grid-cols-3 sm:grid-cols-5 gap-6">
              {['xs', 'sm', 'md', 'lg', 'xl'].map(r => (
                <div key={r} className="text-center">
                  <div className="w-16 h-16 bg-khor-primary mx-auto mb-3" style={{ borderRadius: `var(--khor-radius-${r})` }} />
                  <span className="text-[10px] font-bold text-khor-secondary uppercase">{r}</span>
                  <code className="text-[9px] text-khor-slate-400 block mt-1 tracking-tighter">--radius-{r}</code>
                </div>
              ))}
            </div>
          </TokenSection>

          {/* 7. STROKE WIDTH */}
          <TokenSection id="stroke-width" icon={Zap} title="Stroke Width">
            {[1, 2, 3, 4].map(w => (
              <TokenItem key={w} name={`Stroke ${w}`} variable={`--khor-stroke-${w}`} value={`${w}px`}>
                <div style={{ width: 40, height: w, backgroundColor: 'var(--khor-secondary)' }} />
              </TokenItem>
            ))}
          </TokenSection>

          {/* 8. SHADOW */}
          <TokenSection 
            id="shadow" 
            icon={BoxSelect} 
            title="Shadow Construction (Figma & Penpot)" 
            description="Sombras multi-capa optimizadas para profundidad y branding. Valores listos para replicar en herramientas de diseño."
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

          {/* 9. OPACITY */}
          <TokenSection id="opacity" icon={Percent} title="Opacity Scale">
            <div className="p-6 grid grid-cols-5 gap-4">
              {[10, 30, 50, 70, 90].map(o => (
                <div key={o} className="text-center">
                  <div className="w-full h-12 bg-khor-primary mx-auto mb-2 rounded-md" style={{ opacity: o/100 }} />
                  <span className="text-[10px] font-bold">{o}%</span>
                </div>
              ))}
            </div>
          </TokenSection>

          {/* 10. ROTATION */}
          <TokenSection id="rotation" icon={RotateCw} title="Rotation Scale">
            <div className="p-6 grid grid-cols-4 gap-4">
              {[0, 45, 90, 180].map(deg => (
                <div key={deg} className="text-center">
                  <div className="w-12 h-12 bg-khor-primary mx-auto mb-2 flex items-center justify-center rounded-lg" style={{ transform: `rotate(${deg}deg)` }}>
                    <ArrowUpDown size={20} color="white" />
                  </div>
                  <span className="text-[10px] font-bold">{deg}°</span>
                </div>
              ))}
            </div>
          </TokenSection>

          {/* 11. SPACING */}
          <TokenSection id="spacing" icon={Grid3X3} title="Spacing Matrix" description="Escala de 4px para márgenes y padding.">
            <div className="grid grid-cols-2 divide-x divide-khor-border-muted">
              {[1, 2, 4, 6, 8, 12].map(s => (
                <TokenItem key={s} name={`Space ${s}`} variable={`--khor-space-${s}`} value={`${s*4}px`}>
                  <div style={{ width: s*4, height: s*4, backgroundColor: 'rgba(224, 77, 54, 0.2)', border: '1px dashed var(--khor-primary)', borderRadius: 2 }} />
                </TokenItem>
              ))}
            </div>
          </TokenSection>

          {/* 12. SIZING */}
          <TokenSection id="sizing" icon={Maximize} title="Component Sizing">
            {[8, 16, 32, 64].map(size => (
              <TokenItem key={size} name={`Size ${size}`} variable={`--khor-size-${size}`} value={`${size*4}px`}>
                <div className="w-10 h-10 bg-khor-secondary rounded" style={{ width: size, height: size }} />
              </TokenItem>
            ))}
          </TokenSection>

          {/* 13. DIMENSIONS */}
          <TokenSection id="dimensions" icon={Expand} title="Layout Dimensions">
            <TokenItem name="Full Width" variable="--khor-size-full" value="100%" />
            <TokenItem name="Screen Height" variable="--khor-size-screen-h" value="100vh" />
          </TokenSection>

          {/* 14. NUMBER */}
          <TokenSection id="number" icon={Hash} title="Unitless Numbers">
            <TokenItem name="Number 1" variable="--khor-number-1" value="1" />
            <TokenItem name="Number 100" variable="--khor-number-100" value="100" />
          </TokenSection>

          {/* 15. TEXT CASE */}
          <TokenSection id="text-case" icon={Type} title="Text Case Attributes">
            <TokenItem name="Uppercase" variable="--khor-text-case-upper" value="UPPERCASE">
              <span className="uppercase text-xs font-bold">TEXT</span>
            </TokenItem>
            <TokenItem name="Capitalize" variable="--khor-text-case-cap" value="Capitalize">
              <span className="capitalize text-xs font-bold">text</span>
            </TokenItem>
          </TokenSection>

          {/* 16. TEXT DECORATION */}
          <TokenSection id="text-decoration" icon={Underline} title="Text Decoration">
            <TokenItem name="Underline" variable="--khor-text-decoration-underline" value="underline">
              <span className="underline text-xs font-bold">Text</span>
            </TokenItem>
          </TokenSection>

          {/* 17. TYPOGRAPHY COMPOSITE */}
          <TokenSection id="typography" icon={Highlighter} title="Composite Typography" description="Conjuntos predefinidos de tamaño, peso y altura de línea.">
            <div className="p-6 flex flex-col gap-8">
              <div>
                <KTypography.Text variant="h1">Heading 1 (Master)</KTypography.Text>
                <div className="flex gap-4 mt-2">
                  <KTag status="default" label="40px" />
                  <KTag status="default" label="Bold (700)" />
                  <KTag status="default" label="1.25 LH" />
                </div>
              </div>
              <div>
                <KTypography.Text variant="body-md">Body Medium (Sub-text)</KTypography.Text>
                <div className="flex gap-4 mt-2">
                  <KTag status="default" label="14px" />
                  <KTag status="default" label="Regular (400)" />
                  <KTag status="default" label="1.5 LH" />
                </div>
              </div>
            </div>
          </TokenSection>

        </div>
      </div>
    </div>
  );
}

export default TokensPage;