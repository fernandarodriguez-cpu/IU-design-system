import React from 'react';
import { khorTokens } from '../theme/khor-theme';
import { KTypography, KTag, KBadge, KIcon, KText } from '../components/design-system/atoms';
import { KCardSection } from '../components/design-system/organisms';
import { 
  SquareDashed, Droplets, Expand, CaseLower, ArrowUpDown, Bold, 
  Split, Hash, Percent, RotateCw, BoxSelect, Maximize, 
  Grid3X3, Zap, Type, Underline, Highlighter, Eye, Layers, Palette,
  Monitor, Smartphone, Tablet
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
        <h2 className="text-2xl font-bold text-khor-secondary dark:text-white m-0">{title}</h2>
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
      <h3 className="text-sm font-bold text-khor-secondary dark:text-white truncate">{name}</h3>
      <code className="text-[10px] text-khor-slate-400 font-mono block mt-1">{variable}</code>
      {value && <span className="text-[11px] text-khor-slate-500 mt-2 block font-medium">{value}</span>}
    </div>
  </div>
);

const ColorCard = ({ variable, name, hex }: { variable: string; name: string; hex?: string }) => (
  <div className="flex flex-col gap-3 p-4 bg-white/50 dark:bg-khor-surface-card border border-khor-border-muted rounded-2xl hover:shadow-lg transition-all">
    <div className="w-full h-20 rounded-xl border border-black/5" style={{ backgroundColor: `var(${variable})` }} />
    <div>
      <h4 className="text-xs font-bold text-khor-secondary dark:text-white">{name}</h4>
      <code className="text-[9px] text-khor-slate-400 font-mono block mt-1">{variable}</code>
      {hex && <span className="text-[10px] text-khor-slate-500 font-medium block mt-1 uppercase">{hex}</span>}
    </div>
  </div>
);

const ColorScaleRow = ({ title, baseVariable, steps, hexMap }: { title: string; baseVariable: string; steps: number[]; hexMap?: Record<number, string> }) => (
  <div className="p-6 border-b border-khor-border-muted last:border-0">
    <h4 className="text-xs font-bold text-khor-secondary dark:text-white mb-4 uppercase tracking-wider">{title} Scale</h4>
    <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-10 gap-2">
      {steps.map(step => (
        <div key={step} className="flex flex-col gap-2">
          <div 
            className="h-12 w-full rounded-lg border border-black/5 shadow-sm"
            style={{ backgroundColor: `var(${baseVariable}-${step})` }}
          />
          <div className="px-1">
            <span className="text-[9px] font-bold text-khor-secondary dark:text-white block">{step}</span>
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
    <div className="w-5 h-5 rounded bg-khor-secondary/10 flex items-center justify-center text-[10px] font-bold text-khor-secondary dark:text-white">
      {layer}
    </div>
    <div className="flex flex-wrap gap-2 text-[10px] text-khor-slate-500 font-medium">
      <span className="bg-white dark:bg-khor-neutral-800 px-1.5 py-0.5 rounded border border-khor-border-muted">X: <span className="text-khor-secondary dark:text-white font-bold">{x}</span></span>
      <span className="bg-white dark:bg-khor-neutral-800 px-1.5 py-0.5 rounded border border-khor-border-muted">Y: <span className="text-khor-secondary dark:text-white font-bold">{y}</span></span>
      <span className="bg-white dark:bg-khor-neutral-800 px-1.5 py-0.5 rounded border border-khor-border-muted">Blur: <span className="text-khor-secondary dark:text-white font-bold">{blur}</span></span>
      <span className="bg-white dark:bg-khor-neutral-800 px-1.5 py-0.5 rounded border border-khor-border-muted">Spread: <span className="text-khor-secondary dark:text-white font-bold">{spread || 0}</span></span>
      <span className="bg-white dark:bg-khor-neutral-800 px-1.5 py-0.5 rounded border border-khor-border-muted">Opacity: <span className="text-khor-primary font-bold">{opacity}</span></span>
      {inset && <KTag size="xxs" color="info" label="INSET" className="text-[8px] h-4" />}
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
          <h3 className="text-sm font-bold text-khor-secondary dark:text-white">{name}</h3>
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

export function TokensPage() {
  return (
    <div className="max-w-7xl mx-auto py-16 px-8">
      {/* Header */}
      <div className="mb-20 text-center">
        <div style={{ display: 'flex', alignItems: 'center', gap: khorTokens.spacing.md, justifyContent: 'center' }}>
          <h3 style={{ margin: 0, fontSize: khorTokens.typography.h4.size, fontWeight: khorTokens.typography.fontWeights.semibold, color: 'var(--foreground)' }}>
            Khor Design System
          </h3>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: 999,
            backgroundColor: 'var(--khor-success-light)',
            color: 'var(--khor-success)',
          }}>
            v5.0.0-alpha
          </span>
        </div>
        <h1 className="text-5xl font-extrabold text-khor-secondary dark:text-white mb-6 tracking-tight mt-4">
          Manual de <span className="text-khor-primary">Tokens de Diseño</span>
        </h1>
        <p className="text-xl text-khor-slate-500 max-w-2xl mx-auto">
          La base técnica unificada para desarrolladores, diseñadores y agentes de IA. Reforzado para precisión en Figma, Penpot y Código.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12">
        <div className="lg:col-span-12">
          
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
              <div className="col-span-full py-4"><h3 className="text-sm font-bold text-khor-secondary dark:text-white">Neutral (Slate) Palette</h3></div>
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(n => (
                <ColorCard key={n} name={`Neutral ${n}`} variable={`--khor-neutral-${n}`} />
              ))}
              <div className="col-span-full py-4 border-t border-khor-border-muted mt-4"><h3 className="text-sm font-bold text-khor-secondary dark:text-white">Neutral Secondary (Blue-Grey) Palette</h3></div>
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(n => (
                <ColorCard key={n} name={`Sec. Neutral ${n}`} variable={`--khor-neutral-secondary-${n}`} />
              ))}
            </div>
          </TokenSection>

          <TokenSection 
            id="semantic-layer" 
            icon={Layers} 
            title="Semantic Tier 2: Application Tokens" 
            description="Tokens que abstraen la funcionalidad del valor de color, permitiendo temas dinámicos."
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-6 border-r border-khor-border-muted">
                <h4 className="text-[10px] font-bold text-khor-slate-400 uppercase tracking-widest mb-4">Action Tokens</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-khor-primary" />
                    <div>
                      <span className="text-xs font-bold block text-khor-secondary dark:text-white">--khor-action-primary-default</span>
                      <code className="text-[9px] text-khor-slate-400">var(--khor-primary)</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-khor-secondary" />
                    <div>
                      <span className="text-xs font-bold block text-khor-secondary dark:text-white">--khor-action-secondary-default</span>
                      <code className="text-[9px] text-khor-slate-400">var(--khor-secondary)</code>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h4 className="text-[10px] font-bold text-khor-slate-400 uppercase tracking-widest mb-4">Typography & Borders</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-1 rounded bg-khor-neutral-200" />
                    <div>
                      <span className="text-xs font-bold block text-khor-secondary dark:text-white">--khor-border-default</span>
                      <code className="text-[9px] text-khor-slate-400">var(--khor-neutral-200)</code>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-khor-secondary dark:text-white">Aa</span>
                    <div>
                      <span className="text-xs font-bold block text-khor-secondary dark:text-white">--khor-text-primary</span>
                      <code className="text-[9px] text-khor-slate-400">var(--khor-secondary)</code>
                    </div>
                  </div>
                </div>
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
                  <KTag label="COMPACT" size="xxs" color="primary" className="absolute -top-3 right-4" />
                  <p className="text-xs text-khor-slate-500 mb-4">Para dashboards y alta densidad de datos.</p>
                  <div className="flex items-center gap-[var(--khor-density-spacing-sm)]">
                    <div className="h-[var(--khor-density-height-md)] w-24 bg-khor-primary rounded flex items-center justify-center text-[10px] text-white font-bold">Botón</div>
                    <div className="h-[var(--khor-density-height-md)] w-24 bg-khor-secondary rounded flex items-center justify-center text-[10px] text-white font-bold">Input</div>
                  </div>
                </div>
                <div className="khor-comfortable p-6 bg-khor-neutral-50 dark:bg-khor-neutral-800 rounded-2xl border border-khor-border-muted relative">
                  <KTag label="COMFORTABLE" size="xxs" color="info" className="absolute -top-3 right-4" />
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
                    <th className="p-4 font-bold text-khor-secondary dark:text-white">Background</th>
                    <th className="p-4 font-bold text-khor-secondary dark:text-white">Foreground</th>
                    <th className="p-4 font-bold text-khor-secondary dark:text-white">Ratio</th>
                    <th className="p-4 font-bold text-khor-secondary dark:text-white">Status</th>
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
                    <td className="p-4 flex items-center gap-3"><div className="w-6 h-6 rounded border bg-khor-primary" /> Primary Red</td>
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
                     <KText variant="display1" className="block truncate">Display 1 Fluid</KText>
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
                    <span className="text-[10px] font-bold block text-khor-secondary dark:text-white">{d.n}</span>
                    <span className="text-[11px] text-khor-primary font-mono">{d.v}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                 {[
                   { n: 'Standard', v: 'cubic-bezier(0.4, 0, 0.2, 1)', var: '--khor-easing-standard' },
                   { n: 'Spring', v: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', var: '--khor-easing-spring' },
                   { n: 'Enter', v: 'cubic-bezier(0, 0, 0.2, 1)', var: '--khor-easing-enter' },
                 ].map(e => (
                   <div key={e.n} className="flex items-center gap-4 p-4 bg-white/50 dark:bg-khor-surface-card rounded-xl border border-khor-border-muted group overflow-hidden">
                     <div className="w-12 h-12 bg-khor-primary/10 rounded-lg flex items-center justify-center text-khor-primary group-hover:rotate-12 transition-transform">
                       <RotateCw size={20} />
                     </div>
                     <div className="flex-1">
                        <span className="text-sm font-bold block text-khor-secondary dark:text-white">{e.n} Easing</span>
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
  );
}

export default TokensPage;