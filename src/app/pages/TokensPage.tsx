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
              { icon: Droplets, label: 'Color', id: 'color' },
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
          
          {/* 1. COLOR */}
          <TokenSection 
            id="color" 
            icon={Droplets} 
            title="Color Palette" 
            description="Escalas semánticas y neutros optimizados para accesibilidad y contraste."
          >
            <div className="p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              <ColorCard name="Primary" variable="--khor-primary" hex="#E04D36" />
              <ColorCard name="Secondary" variable="--khor-secondary" hex="#051758" />
              <ColorCard name="Accent" variable="--khor-accent" hex="#FF9500" />
              <ColorCard name="White" variable="--khor-feedback-white" hex="#FFFFFF" />
              <div className="col-span-full pt-6 border-t border-khor-border-muted" />
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(n => (
                <ColorCard key={n} name={`Neutral ${n}`} variable={`--khor-neutral-${n}`} />
              ))}
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
          <TokenSection id="shadow" icon={BoxSelect} title="Shadow Construction">
            {['sm', 'md', 'lg', 'xl'].map(s => (
              <TokenItem key={s} name={`Shadow ${s.toUpperCase()}`} variable={`--khor-shadow-${s}`}>
                <div className="w-16 h-16 bg-white rounded-xl border border-khor-border-muted" style={{ boxShadow: `var(--khor-shadow-${s})` }} />
              </TokenItem>
            ))}
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