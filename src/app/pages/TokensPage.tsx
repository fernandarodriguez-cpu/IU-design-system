import React from 'react';
import { khorTokens } from '../theme/khor-theme';
import { KTypography, KTag, KBadge } from '../components/design-system/atoms';
import { KCardSection } from '../components/design-system/organisms';

const Section = ({ title, children, id }: { title: string; children: React.ReactNode; id?: string }) => (
  <KCardSection id={id} title={title} className="mb-8">
    {children}
  </KCardSection>
);

const TokenRow = ({ name, variable, value, children }: { name: string; variable: string; value?: string; children?: React.ReactNode }) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    gap: 16, 
    padding: '12px 16px', 
    backgroundColor: 'var(--khor-neutral-50)', 
    borderRadius: khorTokens.radius.md, 
    border: `1px solid var(--khor-border-muted)`,
    marginBottom: 8
  }}>
    <div style={{ flex: '0 0 160px' }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--khor-secondary)' }}>{name}</div>
      <div style={{ fontSize: 11, color: 'var(--khor-slate-400)', fontFamily: 'monospace' }}>{variable}</div>
    </div>
    <div style={{ flex: 1 }}>
      {children}
    </div>
    {value && (
      <div style={{ 
        fontSize: 11, 
        color: 'var(--khor-slate-500)', 
        backgroundColor: 'var(--khor-neutral-100)', 
        padding: '2px 6px', 
        borderRadius: 4,
        fontFamily: 'monospace'
      }}>
        {value}
      </div>
    )}
  </div>
);

const ColorSwatch = ({ name, variable, hex }: { name: string; variable: string; hex?: string }) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column',
    gap: 8, 
    padding: 12, 
    backgroundColor: 'var(--khor-neutral-50)', 
    borderRadius: khorTokens.radius.md, 
    border: `1px solid var(--khor-border-muted)`,
    boxShadow: 'var(--khor-shadow-sm)'
  }}>
    <div style={{ width: '100%', height: 48, borderRadius: khorTokens.radius.sm, backgroundColor: `var(${variable})`, border: '1px solid rgba(0,0,0,0.05)' }} />
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--khor-secondary)' }}>{name}</div>
      <div style={{ fontSize: 10, color: 'var(--khor-slate-400)', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis' }}>{variable}</div>
      {hex && <div style={{ fontSize: 10, color: 'var(--khor-slate-500)', marginTop: 2 }}>{hex}</div>}
    </div>
  </div>
);

export function TokensPage() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="mb-12">
        <h1 style={{ fontSize: 32, fontWeight: 700, color: 'var(--khor-secondary)', marginBottom: 8 }}>Tokens de Diseño</h1>
        <p style={{ color: 'var(--khor-slate-500)', fontSize: 16 }}>La base técnica v10.4 del Khor Design System para agentes y desarrolladores.</p>
      </div>

      <Section title="🎨 Paleta de Marca (Core)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
          <ColorSwatch name="Primary (Khor Orange)" variable="--khor-primary" hex="#E04D36" />
          <ColorSwatch name="Secondary (Khor Navy)" variable="--khor-secondary" hex="#051758" />
          <ColorSwatch name="Accent (Khor Gold)" variable="--khor-accent" hex="#FF9500" />
        </div>
      </Section>

      <Section title="🌑 Neutros (v10.4 Slate-Blue Scale)">
        <p style={{ fontSize: 14, color: 'var(--khor-slate-500)', marginBottom: 20 }}>
          Escala optimizada con tintado azulado para eliminar la fatiga visual. Los neutros antiguos están disponibles como <code>--khor-neutral-secondary-*</code>.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(n => (
            <ColorSwatch key={n} name={`Neutral ${n}`} variable={`--khor-neutral-${n}`} />
          ))}
        </div>
      </Section>

      <Section title="🛡️ Status & Feedback">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          <ColorSwatch name="Success" variable="--khor-success" hex="#2E7D32" />
          <ColorSwatch name="Error" variable="--khor-error" hex="#D32F2F" />
          <ColorSwatch name="Warning" variable="--khor-warning" hex="#FF9500" />
          <ColorSwatch name="Info" variable="--khor-info" hex="#051758" />
        </div>
        <h4 style={{ fontSize: 14, fontWeight: 700, margin: '24px 0 12px', color: 'var(--khor-secondary)' }}>Feedback Extendido v10.4</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          <ColorSwatch name="Processing" variable="--khor-feedback-processing" hex="#0ea5e9" />
          <ColorSwatch name="Volcano" variable="--khor-feedback-volcano" hex="#ea580c" />
          <ColorSwatch name="Gold" variable="--khor-feedback-gold" hex="#eab308" />
          <ColorSwatch name="Lime" variable="--khor-feedback-lime" hex="#84cc16" />
          <ColorSwatch name="Purple" variable="--khor-feedback-purple" hex="#a855f7" />
        </div>
      </Section>

      <Section title="✏️ Strokes & Borders (High-Fidelity)">
        <p style={{ fontSize: 14, color: 'var(--khor-slate-500)', marginBottom: 20 }}>
          Rememplazo premium de los bordes Navy por acabados tintados y sutiles.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          <div style={{ padding: 16, backgroundColor: 'var(--khor-neutral-50)', borderRadius: 12, border: '1px solid var(--khor-border-muted)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Border Muted</div>
            <code style={{ fontSize: 10, color: 'var(--khor-slate-400)' }}>--khor-border-muted</code>
          </div>
          <div style={{ padding: 16, backgroundColor: 'var(--khor-neutral-50)', borderRadius: 12, border: '1px solid var(--khor-border-default)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Border Default</div>
            <code style={{ fontSize: 10, color: 'var(--khor-slate-400)' }}>--khor-border-default</code>
          </div>
          <div style={{ padding: 16, backgroundColor: 'var(--khor-neutral-50)', borderRadius: 12, border: '2px solid var(--khor-border-strong)' }}>
            <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Border Strong</div>
            <code style={{ fontSize: 10, color: 'var(--khor-slate-400)' }}>--khor-border-strong</code>
          </div>
        </div>
      </Section>

      <Section title="🖋️ Tipografía (Typography v10.4 Responsive)">
        <p style={{ fontSize: 14, color: 'var(--khor-slate-500)', marginBottom: 24 }}>
          Escala tipográfica completa basada en jerarquías de sistemas enterprise. Todos los niveles son <strong>responsivos por defecto</strong>; los títulos grandes reducen su tamaño automáticamente en dispositivos móviles mediante media-queries globales.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Display & Headings */}
          <div>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: 'var(--khor-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Headings & Display</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { tag: 'Display 1', variant: 'display-1' as const, desc: 'Hero & Landing titles' },
                { tag: 'Display 2', variant: 'display-2' as const, desc: 'Section highlights' },
                { tag: 'Heading 1', variant: 'h1' as const, desc: 'Page titles' },
                { tag: 'Heading 2', variant: 'h2' as const, desc: 'Section titles' },
                { tag: 'Heading 3', variant: 'h3' as const, desc: 'Card titles' },
                { tag: 'Heading 4', variant: 'h4' as const, desc: 'Sub-sections' },
                { tag: 'Heading 5', variant: 'h5' as const, desc: 'Small titles' },
                { tag: 'Heading 6', variant: 'h6' as const, desc: 'Labels' },
              ].map(item => (
                <div key={item.tag} style={{ borderBottom: '1px solid var(--khor-border-muted)', paddingBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--khor-primary)' }}>{item.tag}</div>
                    <code style={{ fontSize: 10, color: 'var(--khor-slate-400)' }}>--khor-font-size-{item.variant}</code>
                  </div>
                  <KTypography.Text variant={item.variant} className="block text-khor-secondary">
                    The quick brown fox jumps over the lazy dog
                  </KTypography.Text>
                  <div style={{ fontSize: 11, color: 'var(--khor-slate-400)', marginTop: 4, fontStyle: 'italic' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Body & Micro */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: 'var(--khor-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Body & Paragraphs</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { tag: 'Body Large', variant: 'body-lg' as const, code: 'body-lg' },
                  { tag: 'Body Medium', variant: 'body-md' as const, code: 'body-md' },
                  { tag: 'Body Small', variant: 'small' as const, code: 'body-sm' },
                ].map(item => (
                  <div key={item.tag}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--khor-slate-400)', marginBottom: 4 }}>{item.tag} (<code>--khor-font-size-{item.code}</code>)</div>
                    <KTypography.Text variant={item.variant}>
                      Nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.
                    </KTypography.Text>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 16, color: 'var(--khor-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Micro Typography</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--khor-slate-400)', marginBottom: 4 }}>Caption</div>
                  <KTypography.Text variant="caption">
                    Accurate and detailed information about current status.
                  </KTypography.Text>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--khor-slate-400)', marginBottom: 4 }}>Overline</div>
                  <KTypography.Text variant="overline">
                    Last update detected 2 mins ago
                  </KTypography.Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="📏 Espaciado (Spacing)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16].map(s => (
            <div key={s} style={{ 
              padding: 16, 
              backgroundColor: 'var(--khor-neutral-50)', 
              borderRadius: 12, 
              border: '1px solid var(--khor-border-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              <div style={{ width: s * 4, height: 16, backgroundColor: 'var(--khor-primary)', borderRadius: 2 }} title={`${s * 4}px`} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>Space {s}</div>
                <code style={{ fontSize: 10, color: 'var(--khor-slate-400)' }}>--khor-space-{s} ({s*4}px)</code>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="📐 Geometría (Radii)">
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {['xs', 'sm', 'md', 'lg', 'xl'].map(r => (
            <div key={r} style={{ textAlign: 'center' }}>
              <div style={{ 
                width: 80, height: 80, 
                backgroundColor: 'var(--khor-primary)', 
                borderRadius: `var(--khor-radius-${r})`,
                marginBottom: 8,
                boxShadow: 'var(--khor-shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: 10,
                fontWeight: 700
              }}>
                RADIUS {r.toUpperCase()}
              </div>
              <code style={{ fontSize: 10, color: 'var(--khor-slate-400)' }}>--khor-radius-{r}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="☁️ Sombras Multi-capa (Shadows)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 32 }}>
          {[
            { s: 'sm', desc: 'Sutil / Cards' },
            { s: 'md', desc: 'Elevado / Modals' },
            { s: 'lg', desc: 'Flotante / Popovers' },
            { s: 'xl', desc: 'Profundo' },
            { s: '2xl', desc: 'Extra Profundo' }
          ].map(({s, desc}) => (
            <div key={s} style={{ 
              height: 120, 
              backgroundColor: '#fff', 
              borderRadius: 16, 
              boxShadow: `var(--khor-shadow-${s})`,
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center',
              gap: 4,
              border: '1px solid var(--khor-border-muted)'
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--khor-secondary)' }}>Shadow {s.toUpperCase()}</span>
              <code style={{ fontSize: 10, color: 'var(--khor-slate-400)' }}>--khor-shadow-{s}</code>
              <span style={{ fontSize: 10, color: 'var(--khor-slate-400)', fontStyle: 'italic' }}>{desc}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

export default TokensPage;