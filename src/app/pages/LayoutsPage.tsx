import { useState } from 'react';
import {
  Eye, Settings, Code, BookOpen,
  Monitor, Tablet, Smartphone, Copy, Check, ChevronRight,
} from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ── Figma-exact palette ── */
const C = {
  headerBg:     '#ffffff',
  headerBorder: '#e2e8f0',
  bodyBg:       '#e0e6fb',
  sidebar:      '#051758',
  content:      '#f4f4f4',
  divider:      '#e2e8f0',
  block:        '#e0e0e0',
  blockDk:      '#cecece',
};

/* ── Types ── */
interface LayoutSpec {
  id: string;
  name: string;
  viewport: number;
  viewportH: number;
  breakpoint: string;
  group: 'desktop' | 'tablet' | 'mobile';
  headerH: number;
  sidebarW: number;
  sidebarCollapsed: boolean;
  areas: { label: string; w: number; isMain?: boolean }[];
  figmaNode: string;
  description: string;
}

/* ── Figma-accurate specs ── */
const LAYOUTS: LayoutSpec[] = [
  {
    id: 'xl-1col', name: 'XL — Full content',
    viewport: 1920, viewportH: 1080, breakpoint: '≥ 1920px', group: 'desktop',
    headerH: 64, sidebarW: 200, sidebarCollapsed: false,
    areas: [{ label: 'Content', w: 1720, isMain: true }],
    figmaNode: '187915-7667',
    description: 'Sidebar expandido (200px) + área de contenido completa (1720px).',
  },
  {
    id: 'xl-2col', name: 'XL — Main + Detail',
    viewport: 1920, viewportH: 1080, breakpoint: '≥ 1920px', group: 'desktop',
    headerH: 64, sidebarW: 200, sidebarCollapsed: false,
    areas: [{ label: 'Main', w: 1296, isMain: true }, { label: 'Detail', w: 424 }],
    figmaNode: '187915-973',
    description: 'Sidebar expandido + Main (1296px) + panel de detalle (424px).',
  },
  {
    id: 'lg-1col', name: 'LG — Full content',
    viewport: 1440, viewportH: 1024, breakpoint: '≥ 1440px', group: 'desktop',
    headerH: 64, sidebarW: 200, sidebarCollapsed: false,
    areas: [{ label: 'Content', w: 1240, isMain: true }],
    figmaNode: '187915-8215',
    description: 'Sidebar expandido (200px) + área de contenido completa (1240px).',
  },
  {
    id: 'lg-2col', name: 'LG — Main + Detail',
    viewport: 1440, viewportH: 1024, breakpoint: '≥ 1440px', group: 'desktop',
    headerH: 64, sidebarW: 200, sidebarCollapsed: false,
    areas: [{ label: 'Main', w: 931, isMain: true }, { label: 'Detail', w: 309 }],
    figmaNode: '187915-7941',
    description: 'Sidebar expandido + Main (931px) + panel de detalle (309px).',
  },
  {
    id: 'md-1col', name: 'MD — Full content',
    viewport: 1280, viewportH: 1024, breakpoint: '≥ 1280px', group: 'desktop',
    headerH: 64, sidebarW: 200, sidebarCollapsed: false,
    areas: [{ label: 'Content', w: 1080, isMain: true }],
    figmaNode: '187915-8497',
    description: 'Sidebar expandido (200px) + área de contenido completa (1080px).',
  },
  {
    id: 'md-2col', name: 'MD — Main + Detail',
    viewport: 1280, viewportH: 1024, breakpoint: '≥ 1280px', group: 'desktop',
    headerH: 64, sidebarW: 200, sidebarCollapsed: false,
    areas: [{ label: 'Main', w: 768, isMain: true }, { label: 'Detail', w: 309 }],
    figmaNode: '187915-8489',
    description: 'Sidebar expandido + Main (768px) + panel de detalle (309px).',
  },
  {
    id: 'tablet-l', name: 'Tablet L — Sidebar icono',
    viewport: 1024, viewportH: 1366, breakpoint: '1024px', group: 'tablet',
    headerH: 64, sidebarW: 56, sidebarCollapsed: true,
    areas: [{ label: 'Content', w: 968, isMain: true }],
    figmaNode: '187915-9034',
    description: 'Sidebar colapsado a íconos (56px). Contenido ampliado a 968px.',
  },
  {
    id: 'tablet', name: 'Tablet — Sidebar icono',
    viewport: 744, viewportH: 1133, breakpoint: '744px', group: 'tablet',
    headerH: 64, sidebarW: 56, sidebarCollapsed: true,
    areas: [{ label: 'Content', w: 688, isMain: true }],
    figmaNode: '187915-9447',
    description: 'Sidebar colapsado a íconos (56px). Contenido ampliado a 688px.',
  },
  {
    id: 'mobile-l', name: 'Mobile L — Sin sidebar',
    viewport: 568, viewportH: 1133, breakpoint: '568px', group: 'mobile',
    headerH: 64, sidebarW: 0, sidebarCollapsed: false,
    areas: [{ label: 'Content', w: 568, isMain: true }],
    figmaNode: '187915-9703',
    description: 'Sin sidebar. Contenido full-width (568px). Nav vía hamburger / bottom-bar.',
  },
  {
    id: 'mobile', name: 'Mobile — Sin sidebar',
    viewport: 320, viewportH: 812, breakpoint: '320px', group: 'mobile',
    headerH: 64, sidebarW: 0, sidebarCollapsed: false,
    areas: [{ label: 'Content', w: 320, isMain: true }],
    figmaNode: '187915-16851',
    description: 'Viewport mínimo soportado (320px). Sin sidebar, contenido full-width.',
  },
];

const GROUPS = [
  { key: 'desktop' as const, label: 'Desktop',  Icon: Monitor,     range: '≥ 1280px',   sidebar: 'Sidebar 200px expandido' },
  { key: 'tablet'  as const, label: 'Tablet',   Icon: Tablet,      range: '744–1024px',  sidebar: 'Sidebar 56px icono' },
  { key: 'mobile'  as const, label: 'Mobile',   Icon: Smartphone,  range: '< 744px',     sidebar: 'Sin sidebar' },
];

/* ── SVG Wireframe ── */
function LayoutDiagram({ spec, maxW = 280, maxH = 200 }: { spec: LayoutSpec; maxW?: number; maxH?: number }) {
  const s = Math.min(maxW / spec.viewport, maxH / spec.viewportH);
  const W  = Math.round(spec.viewport  * s);
  const H  = Math.round(spec.viewportH * s);
  const hH = Math.round(spec.headerH   * s);
  const sW = Math.round(spec.sidebarW  * s);
  const bH = H - hH;
  const cW = W - sW;
  const total = spec.areas.reduce((sum, a) => sum + a.w, 0);
  const logoW = sW > 0 ? Math.max(sW - 6, 18) : Math.round(W * 0.14);
  const logoH = Math.round(hH * 0.48);
  const logoY = Math.round((hH - logoH) / 2);

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
      style={{ display: 'block', borderRadius: 6, overflow: 'hidden',
               boxShadow: '0 4px 16px rgba(5,23,88,0.18), 0 0 0 1px rgba(5,23,88,0.1)' }}>
      {/* Header */}
      <rect x={0} y={0} width={W} height={hH} fill={C.headerBg} />
      <line x1={0} y1={hH} x2={W} y2={hH} stroke={C.headerBorder} strokeWidth={1} />
      <rect x={5} y={logoY} width={logoW} height={logoH} rx={3} fill={C.sidebar} opacity={0.88} />
      <circle cx={W - 7}  cy={Math.round(hH / 2)} r={Math.round(hH * 0.22)} fill="#dde5f8" />
      <circle cx={W - 7 - Math.round(hH * 0.58)} cy={Math.round(hH / 2)} r={Math.round(hH * 0.16)} fill="#dde5f8" />
      {/* Body bg */}
      <rect x={0} y={hH} width={W} height={bH} fill={C.bodyBg} />
      {/* Sidebar */}
      {sW > 0 && (
        <>
          <rect x={0} y={hH} width={sW} height={bH} fill={C.sidebar} />
          {spec.sidebarCollapsed
            ? [0.08, 0.18, 0.28, 0.38, 0.48, 0.58].map((f, i) => (
                <rect key={i} x={Math.round(sW * 0.15)} y={Math.round(hH + bH * f)}
                  width={Math.round(sW * 0.7)} height={Math.max(3, Math.round(Math.min(sW * 0.45, bH * 0.07)))}
                  rx={2} fill="white" opacity={i === 0 ? 0.6 : 0.2} />
              ))
            : [0.06, 0.15, 0.24, 0.33, 0.42, 0.51].map((f, i) => (
                <g key={i}>
                  <rect x={Math.round(sW * 0.1)} y={Math.round(hH + bH * f)}
                    width={Math.round(sW * 0.2)} height={Math.round(sW * 0.17)}
                    rx={2} fill="white" opacity={i === 0 ? 0.65 : 0.22} />
                  <rect x={Math.round(sW * 0.36)} y={Math.round(hH + bH * f + sW * 0.055)}
                    width={Math.round(sW * 0.54)} height={Math.round(sW * 0.075)}
                    rx={1} fill="white" opacity={i === 0 ? 0.5 : 0.15} />
                </g>
              ))
          }
        </>
      )}
      {/* Content areas */}
      {spec.areas.map((area, idx) => {
        const prevW = spec.areas.slice(0, idx).reduce((sum, a) => sum + a.w, 0);
        const x0 = sW + Math.round((prevW / total) * cW);
        const aW = Math.round((area.w / total) * cW);
        const p  = Math.max(3, Math.round(Math.min(aW, bH) * 0.04));
        return (
          <g key={idx}>
            {idx > 0 && <line x1={x0} y1={hH} x2={x0} y2={H} stroke={C.divider} strokeWidth={1} />}
            <rect x={x0} y={hH} width={aW} height={bH} fill={C.content} />
            {area.isMain ? (
              <>
                <rect x={x0+p} y={hH+p} width={aW-p*2} height={Math.max(4, Math.round(bH*0.09))} rx={2} fill={C.block} />
                <rect x={x0+p} y={hH+p*2+Math.round(bH*0.09)+Math.round(bH*0.03)} width={Math.round((aW-p*2)*0.48)} height={Math.max(3, Math.round(bH*0.05))} rx={1} fill={C.block} opacity={0.7} />
                <rect x={x0+p} y={hH+Math.round(bH*0.24)} width={aW-p*2} height={Math.round(bH*0.44)} rx={3} fill={C.block} opacity={0.6} />
                {[0.31, 0.41, 0.51, 0.61].map((f, ri) => (
                  <rect key={ri} x={x0+p*2} y={hH+Math.round(bH*f)} width={aW-p*4} height={Math.max(2, Math.round(bH*0.05))} rx={1} fill={C.blockDk} opacity={0.5} />
                ))}
                <rect x={x0+p} y={hH+Math.round(bH*0.76)} width={Math.round((aW-p*2)*0.22)} height={Math.max(3, Math.round(bH*0.06))} rx={2} fill={C.sidebar} opacity={0.28} />
              </>
            ) : (
              <>
                <rect x={x0+p} y={hH+p}                    width={aW-p*2}                    height={Math.round(bH*0.24)} rx={2} fill={C.block} opacity={0.8} />
                <rect x={x0+p} y={hH+Math.round(bH*0.30)} width={aW-p*2}                    height={Math.max(3,Math.round(bH*0.09))} rx={2} fill={C.block} opacity={0.55} />
                <rect x={x0+p} y={hH+Math.round(bH*0.44)} width={Math.round((aW-p*2)*0.75)} height={Math.max(2,Math.round(bH*0.06))} rx={1} fill={C.block} opacity={0.45} />
                <rect x={x0+p} y={hH+Math.round(bH*0.56)} width={aW-p*2}                    height={Math.round(bH*0.22)} rx={2} fill={C.block} opacity={0.5} />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ── Copy Button ── */
function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      style={{
        display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px',
        borderRadius: t.radius.md, border: `1px solid var(--border)`,
        background: copied ? t.colors.feedback.successLight : 'var(--card)',
        color: copied ? t.colors.feedback.success : 'var(--muted-foreground)',
        fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: font, transition: 'all 0.15s',
      }}>
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? 'Copiado' : 'Copiar Snippet'}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB: VISTA PREVIA
═══════════════════════════════════════════════════════ */
function PreviewTab() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const groupsToRender = activeGroup ? GROUPS.filter(g => g.key === activeGroup) : GROUPS;

  return (
    <div>
      {/* Breakpoint switcher */}
      <div style={{
        display: 'flex', gap: 0, marginBottom: 28,
        background: 'var(--card)', borderRadius: t.radius.lg,
        border: `1px solid var(--border)`, overflow: 'hidden',
      }}>
        {GROUPS.map((g, i) => {
          const Icon = g.Icon;
          const isActive = activeGroup === g.key;
          return (
            <button key={g.key} onClick={() => setActiveGroup(isActive ? null : g.key)} style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
              background: isActive ? t.colors.brand.primary : 'transparent',
              color: isActive ? 'white' : 'var(--foreground)',
              border: 'none', borderLeft: i > 0 ? `1px solid var(--border)` : 'none',
              cursor: 'pointer', fontFamily: font, transition: 'all 0.15s',
            }}>
              <Icon size={15} style={{ flexShrink: 0 }} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{g.label}</div>
                <div style={{ fontSize: 11, opacity: 0.7 }}>{g.range}</div>
              </div>
              <span style={{
                marginLeft: 'auto', padding: '1px 7px', borderRadius: 10, fontSize: 11, fontWeight: 600,
                background: isActive ? 'rgba(255,255,255,0.2)' : `${t.colors.brand.primary}14`,
                color: isActive ? 'white' : t.colors.brand.primary,
              }}>
                {LAYOUTS.filter(l => l.group === g.key).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Layout sections */}
      {groupsToRender.map(group => {
        const Icon = group.Icon;
        const items = LAYOUTS.filter(l => l.group === group.key);
        return (
          <div key={group.key} style={{ marginBottom: 40 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, paddingBottom: 10,
              borderBottom: `2px solid ${t.colors.neutral[200]}`,
            }}>
              <Icon size={14} style={{ color: t.colors.brand.primary }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--foreground)' }}>{group.label}</span>
              <span style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>{group.range}</span>
              <span style={{
                padding: '1px 7px', borderRadius: 10, fontSize: 11, fontWeight: 600,
                background: `${t.colors.brand.primary}14`, color: t.colors.brand.primary,
              }}>{items.length}</span>
              <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted-foreground)' }}>{group.sidebar}</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: group.key === 'mobile' ? 'repeat(auto-fill, minmax(200px, 1fr))' : 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 16,
            }}>
              {items.map(spec => <PreviewCard key={spec.id} spec={spec} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PreviewCard({ spec }: { spec: LayoutSpec }) {
  const [open, setOpen] = useState(false);
  const code = CSS_SNIPPETS[spec.id] ?? '';
  const sidebarBadge = spec.sidebarW === 0 ? 'Sin sidebar' : spec.sidebarCollapsed ? `Sidebar ${spec.sidebarW}px icono` : `Sidebar ${spec.sidebarW}px`;

  return (
    <div style={{ background: 'var(--card)', borderRadius: t.radius.lg, border: `1px solid var(--border)`, overflow: 'hidden' }}>
      <div style={{ background: '#e0e6fb', padding: '20px 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 140, borderBottom: `1px solid #c8d4f0` }}>
        <LayoutDiagram spec={spec} />
      </div>
      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--foreground)', lineHeight: 1.3 }}>{spec.name}</p>
            <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--muted-foreground)' }}>{spec.viewport} × {spec.viewportH}px</p>
          </div>
          <span style={{ padding: '2px 8px', borderRadius: 20, fontSize: 11, fontWeight: 600, flexShrink: 0, background: `${t.colors.brand.primary}14`, color: t.colors.brand.primary }}>{spec.breakpoint}</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <span style={{ padding: '2px 6px', borderRadius: 4, fontSize: 11, background: t.colors.neutral[100], color: 'var(--muted-foreground)' }}>{sidebarBadge}</span>
          {spec.areas.map(a => (
            <span key={a.label} style={{
              padding: '2px 6px', borderRadius: 4, fontSize: 11,
              background: a.isMain ? `${t.colors.brand.primary}10` : t.colors.neutral[50],
              color: a.isMain ? t.colors.brand.primary : 'var(--muted-foreground)',
              border: `1px solid ${a.isMain ? `${t.colors.brand.primary}25` : t.colors.neutral[100]}`,
            }}>{a.label} {a.w}px</span>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{spec.description}</p>
        <button onClick={() => setOpen(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', padding: 0, color: t.colors.brand.primary, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: font }}>
          <ChevronRight size={13} style={{ transform: open ? 'rotate(90deg)' : 'none', transition: '0.15s' }} />
          {open ? 'Ocultar código' : 'Ver código CSS'}
        </button>
        {open && (
          <pre style={{ margin: 0, padding: '10px 12px', background: t.colors.brand.navy, color: '#c2ccef', borderRadius: 8, fontSize: 11, lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace', whiteSpace: 'pre' }}>
            {code}
          </pre>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB: PLAYGROUND
═══════════════════════════════════════════════════════ */
function PlaygroundTab() {
  const [selectedId, setSelectedId] = useState<string>('lg-1col');
  const spec = LAYOUTS.find(l => l.id === selectedId) ?? LAYOUTS[2];
  const total = spec.areas.reduce((s, a) => s + a.w, 0);

  const sidebarState = spec.sidebarW === 0 ? 'Oculto' : spec.sidebarCollapsed ? 'Icono (56px)' : 'Expandido (200px)';

  return (
    <div style={{ padding: '4px 0', backgroundColor: '#e0e6fb', borderRadius: t.radius.lg, border: `1px solid #c8d4f0` }}>
      <div style={{ padding: '20px 24px' }}>
        {/* Viewport selector */}
        <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 600, color: 'var(--muted-foreground)', textTransform: 'uppercase', letterSpacing: 0.8 }}>Selecciona un viewport</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {LAYOUTS.map(l => {
            const isActive = l.id === selectedId;
            return (
              <button key={l.id} onClick={() => setSelectedId(l.id)} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                padding: '8px 14px', borderRadius: t.radius.md, cursor: 'pointer', fontFamily: font,
                border: `2px solid ${isActive ? t.colors.brand.primary : t.colors.neutral[200]}`,
                background: isActive ? `${t.colors.brand.primary}08` : 'white',
                color: isActive ? t.colors.brand.primary : 'var(--foreground)',
                transition: 'all 0.15s',
              }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{l.viewport}px</span>
                <span style={{ fontSize: 11, opacity: 0.7, marginTop: 1 }}>{l.name.split('—')[1]?.trim() ?? l.name}</span>
              </button>
            );
          })}
        </div>

        {/* Large wireframe */}
        <div style={{ display: 'flex', justifyContent: 'center', background: '#e0e6fb', borderRadius: t.radius.lg, padding: '32px 24px', marginBottom: 20, border: `1px solid #c8d4f0` }}>
          <LayoutDiagram spec={spec} maxW={640} maxH={420} />
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
          {[
            { label: 'Viewport', value: `${spec.viewport} × ${spec.viewportH}px`, color: t.colors.brand.primary },
            { label: 'Header', value: `${spec.headerH}px`, color: '#059669' },
            { label: 'Sidebar', value: sidebarState, color: C.sidebar },
            ...spec.areas.map(a => ({ label: a.label, value: `${a.w}px (${Math.round((a.w / total) * 100)}%)`, color: a.isMain ? t.colors.brand.primary : t.colors.neutral[400] })),
          ].map(item => (
            <div key={item.label} style={{ background: 'white', borderRadius: t.radius.md, padding: '12px 14px', border: `1px solid ${t.colors.neutral[200]}` }}>
              <p style={{ margin: '0 0 4px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.6, color: 'var(--muted-foreground)' }}>{item.label}</p>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: item.color, fontFamily: 'monospace' }}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB: CÓDIGO
═══════════════════════════════════════════════════════ */
function CodeTab() {
  const [activeSec, setActiveSec] = useState<'tailwind' | 'css'>('tailwind');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Toggle */}
      <div style={{ display: 'flex', border: `1px solid var(--border)`, borderRadius: t.radius.md, overflow: 'hidden', alignSelf: 'flex-start' }}>
        {(['tailwind', 'css'] as const).map(type => (
          <button key={type} onClick={() => setActiveSec(type)} style={{
            padding: '7px 16px', border: 'none', cursor: 'pointer', fontFamily: font,
            fontSize: 13, fontWeight: 500,
            background: activeSec === type ? t.colors.brand.primary : 'var(--card)',
            color: activeSec === type ? 'white' : 'var(--muted-foreground)',
            transition: 'all 0.15s',
          }}>
            {type === 'tailwind' ? 'Tailwind (responsive)' : 'CSS Grid (por breakpoint)'}
          </button>
        ))}
      </div>

      {activeSec === 'tailwind' && (
        <div style={{ borderRadius: t.radius.lg, border: `1px solid var(--border)`, overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--card)', borderBottom: `1px solid var(--border)` }}>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--foreground)' }}>Layout responsivo completo</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--muted-foreground)' }}>Una composición cubre todos los breakpoints</p>
            </div>
            <button onClick={() => copy('tailwind', TAILWIND_SNIPPET)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: t.radius.md, border: `1px solid var(--border)`, background: copiedId === 'tailwind' ? t.colors.feedback.successLight : 'var(--card)', color: copiedId === 'tailwind' ? t.colors.feedback.success : 'var(--muted-foreground)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: font }}>
              {copiedId === 'tailwind' ? <Check size={14} /> : <Copy size={14} />}
              {copiedId === 'tailwind' ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          <pre style={{ margin: 0, padding: '16px 20px', background: t.colors.brand.navy, color: '#c2ccef', fontSize: 13, lineHeight: 1.7, overflowX: 'auto', fontFamily: 'monospace', whiteSpace: 'pre' }}>
            {TAILWIND_SNIPPET}
          </pre>
        </div>
      )}

      {activeSec === 'css' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Object.entries(CSS_SNIPPETS).map(([id, code]) => {
            const spec = LAYOUTS.find(l => l.id === id);
            if (!spec) return null;
            return (
              <div key={id} style={{ borderRadius: t.radius.lg, border: `1px solid var(--border)`, overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: 'var(--card)', borderBottom: `1px solid var(--border)` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--foreground)' }}>{spec.name}</span>
                    <span style={{ fontSize: 11, padding: '1px 7px', borderRadius: 10, background: `${t.colors.brand.primary}14`, color: t.colors.brand.primary }}>{spec.breakpoint}</span>
                  </div>
                  <button onClick={() => copy(id, code)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: t.radius.md, border: `1px solid var(--border)`, background: copiedId === id ? t.colors.feedback.successLight : 'var(--card)', color: copiedId === id ? t.colors.feedback.success : 'var(--muted-foreground)', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: font }}>
                    {copiedId === id ? <Check size={12} /> : <Copy size={12} />}
                    {copiedId === id ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
                <pre style={{ margin: 0, padding: '12px 16px', background: t.colors.brand.navy, color: '#c2ccef', fontSize: 12, lineHeight: 1.6, overflowX: 'auto', fontFamily: 'monospace', whiteSpace: 'pre' }}>
                  {code}
                </pre>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   TAB: DOCUMENTACIÓN
═══════════════════════════════════════════════════════ */
function DocsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* Tokens table */}
      <div>
        <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', margin: '0 0 12px' }}>Layout Tokens</h4>
        <div style={{ overflowX: 'auto', borderRadius: t.radius.md, border: `1px solid ${t.colors.neutral[200]}` }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: t.colors.neutral[100] }}>
                {['Token CSS', 'Valor Figma', 'Uso'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${t.colors.neutral[200]}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LAYOUT_TOKENS.map((row, i) => (
                <tr key={row.token} style={{ background: i % 2 === 0 ? 'var(--card)' : t.colors.neutral[100] }}>
                  <td style={{ padding: '10px 16px', borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
                    <code style={{ fontSize: 12, background: 'rgba(5,23,88,0.06)', color: t.colors.brand.primary, padding: '2px 6px', borderRadius: 4 }}>{row.token}</code>
                  </td>
                  <td style={{ padding: '10px 16px', color: 'var(--muted-foreground)', fontFamily: 'monospace', fontSize: 12, borderBottom: `1px solid ${t.colors.neutral[200]}` }}>{row.value}</td>
                  <td style={{ padding: '10px 16px', color: 'var(--muted-foreground)', fontSize: 12, borderBottom: `1px solid ${t.colors.neutral[200]}` }}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Breakpoint reference table */}
      <div>
        <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', margin: '0 0 12px' }}>Breakpoints y comportamiento del sidebar</h4>
        <div style={{ overflowX: 'auto', borderRadius: t.radius.md, border: `1px solid ${t.colors.neutral[200]}` }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: t.colors.neutral[100] }}>
                {['Viewport', 'Sidebar', 'Max columnas de contenido', 'Nodo Figma'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${t.colors.neutral[200]}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LAYOUTS.map((spec, i) => (
                <tr key={spec.id} style={{ background: i % 2 === 0 ? 'var(--card)' : t.colors.neutral[100] }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600, color: 'var(--foreground)', borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
                    <code style={{ fontSize: 12 }}>{spec.breakpoint}</code>
                    <span style={{ marginLeft: 8, fontSize: 11, color: 'var(--muted-foreground)' }}>{spec.viewport} × {spec.viewportH}px</span>
                  </td>
                  <td style={{ padding: '10px 16px', color: 'var(--muted-foreground)', borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
                    {spec.sidebarW === 0 ? '— Oculto' : spec.sidebarCollapsed ? `${spec.sidebarW}px (icono)` : `${spec.sidebarW}px (expandido)`}
                  </td>
                  <td style={{ padding: '10px 16px', color: 'var(--muted-foreground)', borderBottom: `1px solid ${t.colors.neutral[200]}` }}>{spec.areas.length}</td>
                  <td style={{ padding: '10px 16px', borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
                    <code style={{ fontSize: 11, color: t.colors.brand.primary }}>{spec.figmaNode}</code>
                  </td>
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
          <li>Usa el layout <strong>XL 2-col</strong> (1920px) solo para pantallas ultra-wide donde el panel de detalle agrega valor sin comprimir el main.</li>
          <li>El sidebar colapsa automáticamente a íconos (56px) en tablets (744–1024px) — mantén tooltips en cada ícono de navegación.</li>
          <li>En viewports menores a 744px el sidebar desaparece completamente; implementa un drawer o bottom-bar como alternativa de navegación.</li>
          <li>El background <strong>#e0e6fb</strong> es el fondo del body entre paneles — visible en el gap entre sidebar y content si existe separación.</li>
          <li>Los paneles de contenido (<strong>#f4f4f4</strong>) deben tener <code style={{ fontSize: 12 }}>overflow: auto</code> para permitir scroll independiente.</li>
          <li>El header (64px) siempre es <code style={{ fontSize: 12 }}>position: sticky</code> o <code style={{ fontSize: 12 }}>grid-row: 1</code> — nunca va dentro del scroll del body.</li>
          <li>El panel de detalle (309px en LG/MD, 424px en XL) es opcional — se oculta por defecto en breakpoints menores a 1280px.</li>
        </ul>
      </div>
    </div>
  );
}

/* ── Code Data ── */
const CSS_SNIPPETS: Record<string, string> = {
  'xl-1col':
`/* XL ≥1920px — Sidebar 200px + Full content 1720px */
.app {
  display: grid; height: 100vh;
  grid-template-rows: 64px 1fr;
  grid-template-columns: 200px 1fr;
}
.header  { grid-column: 1 / -1; background: #fff; border-bottom: 1px solid #e2e8f0; }
.sidebar { grid-row: 2; background: #051758; overflow: auto; }
.main    { grid-row: 2; background: #f4f4f4; overflow: auto; }`,

  'xl-2col':
`/* XL ≥1920px — Sidebar 200px + Main 1296px + Detail 424px */
.app {
  display: grid; height: 100vh;
  grid-template-rows: 64px 1fr;
  grid-template-columns: 200px 1fr;
}
.body { grid-column: 2; display: grid; grid-template-columns: 1fr 424px; }
.main   { background: #f4f4f4; overflow: auto; }
.detail { background: #f4f4f4; border-left: 1px solid #e2e8f0; overflow: auto; }`,

  'lg-2col':
`/* LG ≥1440px — Sidebar 200px + Main 931px + Detail 309px */
.app {
  display: grid; height: 100vh;
  grid-template-rows: 64px 1fr;
  grid-template-columns: 200px 1fr;
}
.body { grid-column: 2; display: grid; grid-template-columns: 1fr 309px; }`,

  'md-2col':
`/* MD ≥1280px — Sidebar 200px + Main 768px + Detail 309px */
.app {
  display: grid; height: 100vh;
  grid-template-rows: 64px 1fr;
  grid-template-columns: 200px 1fr;
}
.body { grid-column: 2; display: grid; grid-template-columns: 1fr 309px; }`,

  'tablet-l':
`/* Tablet L 1024px — Sidebar colapsado 56px */
.app {
  display: grid; height: 100vh;
  grid-template-rows: 64px 1fr;
  grid-template-columns: 56px 1fr;
}`,

  'tablet':
`/* Tablet 744px — Sidebar colapsado 56px */
.app {
  display: grid; height: 100vh;
  grid-template-rows: 64px 1fr;
  grid-template-columns: 56px 1fr;
}`,

  'mobile-l':
`/* Mobile L 568px — sin sidebar */
.app {
  display: grid; height: 100vh;
  grid-template-rows: 64px 1fr;
}`,

  'mobile':
`/* Mobile 320px — sin sidebar */
.app {
  display: grid; height: 100vh;
  grid-template-rows: 64px 1fr;
}`,
};

const TAILWIND_SNIPPET =
`<div className="grid h-screen grid-rows-[64px_1fr]">

  {/* Header — full width, sticky */}
  <header className="col-span-full flex items-center
    border-b bg-white px-6 z-10" />

  {/* Body */}
  <div className="flex overflow-hidden bg-[#e0e6fb]">

    {/* Sidebar: hidden mobile · 56px tablet · 200px desktop */}
    <aside className="
      hidden sm:flex flex-col shrink-0
      w-0 sm:w-14 md:w-[200px]
      bg-[#051758] overflow-hidden
      transition-[width] duration-200
    " />

    {/* Main + optional detail panel */}
    <main className="flex-1 overflow-auto bg-[#f4f4f4]">
      <div className="
        grid h-full
        grid-cols-1 xl:grid-cols-[1fr_309px]
      ">
        <section className="overflow-auto p-6">
          {/* main content */}
        </section>
        <aside className="
          hidden xl:block
          border-l overflow-auto p-6
        ">
          {/* detail panel */}
        </aside>
      </div>
    </main>

  </div>
</div>`;

const LAYOUT_TOKENS = [
  { token: '--khor-header-height',      value: '64px',       desc: 'Altura del header global' },
  { token: '--khor-sidebar-width',      value: '200px',      desc: 'Sidebar expandido (≥1280px)' },
  { token: '--khor-sidebar-icon-width', value: '56px',       desc: 'Sidebar icono (744–1024px)' },
  { token: '--khor-detail-panel-sm',    value: '309px',      desc: 'Panel de detalle en LG / MD' },
  { token: '--khor-detail-panel-xl',    value: '424px',      desc: 'Panel de detalle en XL (1920px)' },
  { token: '--khor-body-bg',            value: '#e0e6fb',    desc: 'Fondo del body (entre paneles)' },
  { token: '--khor-content-bg',         value: '#f4f4f4',    desc: 'Fondo de los paneles de contenido' },
];

/* ═══════════════════════════════════════════════════════
   PAGE — same structure as ComponentDoc
═══════════════════════════════════════════════════════ */
type TabKey = 'preview' | 'playground' | 'code' | 'docs';

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: 'preview',    label: 'Vista Previa',   icon: <Eye size={16} /> },
  { key: 'playground', label: 'Playground',     icon: <Settings size={16} /> },
  { key: 'code',       label: 'Código',         icon: <Code size={16} /> },
  { key: 'docs',       label: 'Documentación',  icon: <BookOpen size={16} /> },
];

export function LayoutsPage() {
  const [active, setActive] = useState<TabKey>('preview');

  return (
    <div style={{ fontFamily: font }}>

      {/* Header — matches ComponentDoc */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--khor-text-label)', textTransform: 'uppercase', letterSpacing: 1 }}>
            Organismos
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: 'var(--foreground)' }}>Page Layouts</h2>
            <p style={{ margin: '8px 0 0', fontSize: 16, color: 'var(--muted-foreground)', lineHeight: 1.5, maxWidth: 620 }}>
              Sistema de layouts responsivos de Khor. Combina Header (64px), Sidebar (200px expandido · 56px icono · oculto en mobile) y paneles de contenido según el breakpoint activo.
            </p>
          </div>
          <CopyButton code={TAILWIND_SNIPPET} />
        </div>
      </div>

      {/* Tab nav — exactly like ComponentDoc */}
      <div style={{ display: 'flex', gap: 0, borderBottom: `2px solid ${t.colors.neutral[200]}`, marginBottom: 20 }}>
        {TABS.map(tab => (
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

      {/* Tab content */}
      {active === 'preview'    && <PreviewTab />}
      {active === 'playground' && <PlaygroundTab />}
      {active === 'code'       && <CodeTab />}
      {active === 'docs'       && <DocsTab />}

    </div>
  );
}
