/**
 * TokensPage — Referencia visual de todos los design tokens Khor
 */
import React from 'react';
import { khorTokens } from '../theme/khor-theme';
import { CodeBlock } from '../components/docs/CodeBlock';

function ColorSwatch({ name, hex, desc }: { name: string; hex: string; desc: string }) {
  const isLight = ['#FFFFFF', '#EDF0F1', '#E8F5E9', '#FFEBEE', '#FFF3E0', '#E3F2FD', '#D5DBE0'].includes(hex);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0' }}>
      <div style={{
        width: 48, height: 48, borderRadius: 10,
        backgroundColor: hex,
        border: isLight ? `1px solid ${khorTokens.colors.neutral[200]}` : 'none',
        boxShadow: khorTokens.shadows.sm,
        flexShrink: 0,
      }} />
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <code style={{ fontSize: 13, fontWeight: 600, color: khorTokens.colors.brand.navy }}>{name}</code>
          <code style={{ fontSize: 11, color: khorTokens.colors.neutral[400], backgroundColor: khorTokens.colors.neutral[100], padding: '1px 6px', borderRadius: 4 }}>{hex}</code>
        </div>
        <p style={{ margin: '2px 0 0', fontSize: 12, color: khorTokens.colors.neutral[400] }}>{desc}</p>
      </div>
    </div>
  );
}

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <div
      id={id}
      style={{
        backgroundColor: khorTokens.colors.neutral[50],
        borderRadius: khorTokens.radius.lg,
        padding: 28,
        boxShadow: khorTokens.shadows.sm,
        marginBottom: 20,
        scrollMarginTop: 24,
      }}
    >
      <h3 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700, color: khorTokens.colors.brand.navy }}>{title}</h3>
      {children}
    </div>
  );
}

export function TokensPage() {
  return (
    <div style={{ fontFamily: khorTokens.typography.fontPrimary }}>
      <div style={{ marginBottom: 24 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: khorTokens.colors.brand.primary, textTransform: 'uppercase', letterSpacing: 1 }}>FUNDAMENTOS</span>
        <h2 style={{ margin: '4px 0 0', fontSize: 30, fontWeight: 700, color: khorTokens.colors.brand.navy }}>Design Tokens</h2>
        <p style={{ margin: '8px 0 0', fontSize: 16, color: khorTokens.colors.neutral[500] }}>
          Variables atómicas que definen la identidad visual de todo el sistema Khor.
        </p>
      </div>

      {/* Brand Colors */}
      <Section title="1. Colores de Identidad (Brand)" id="colores">
        <p style={{ fontSize: 14, color: khorTokens.colors.neutral[400], marginTop: 0, marginBottom: 16 }}>
          El Rojo es energía y acción; el Navy es estabilidad y estructura profesional.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 8 }}>
          <ColorSwatch name="color.brand.primary" hex="#E04D36" desc="Rojo Khor. Acciones principales, branding activo." />
          <ColorSwatch name="color.brand.navy" hex="#051758" desc="Azul Profundo. Navegacion, Sidebar, textos de alta jerarquia." />
          <ColorSwatch name="color.brand.accent" hex="#FF9500" desc="Naranja Accent. Destacados y alertas preventivas." />
        </div>
      </Section>

      {/* Neutrals */}
      <Section title="2. Paleta Neutra y Superficies">
        <p style={{ fontSize: 14, color: khorTokens.colors.neutral[400], marginTop: 0, marginBottom: 16 }}>
          Escala disenada para reducir la fatiga visual en aplicaciones SaaS de uso intensivo (8+ horas al dia).
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 8 }}>
          <ColorSwatch name="color.neutral.50" hex="#FFFFFF" desc="Fondos de tarjetas, inputs y areas de contenido." />
          <ColorSwatch name="color.neutral.100" hex="#EDF0F1" desc="Fondo de canvas y divisores." />
          <ColorSwatch name="color.neutral.200" hex="#D5DBE0" desc="Bordes y separadores sutiles." />
          <ColorSwatch name="color.neutral.300" hex="#A0AEC0" desc="Placeholders y texto desactivado." />
          <ColorSwatch name="color.neutral.400" hex="#718096" desc="Texto secundario." />
          <ColorSwatch name="color.neutral.500" hex="#4A5568" desc="Texto de cuerpo." />
          <ColorSwatch name="color.neutral.900" hex="#000000" desc="Datos numericos criticos y contraste maximo." />
        </div>
      </Section>

      {/* Feedback */}
      <Section title="3. Colores de Retroalimentación">
        <p style={{ fontSize: 14, color: khorTokens.colors.neutral[400], marginTop: 0, marginBottom: 16 }}>
          Colores con significado universal para comunicar estados del sistema sin ambiguedad.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 8 }}>
          <ColorSwatch name="feedback.success" hex="#2E7D32" desc="Altas exitosas, pagos procesados." />
          <ColorSwatch name="feedback.success-light" hex="#E8F5E9" desc="Fondo de estados exitosos." />
          <ColorSwatch name="feedback.error" hex="#D32F2F" desc="Errores de validacion, acciones de eliminar." />
          <ColorSwatch name="feedback.error-light" hex="#FFEBEE" desc="Fondo de estados de error." />
          <ColorSwatch name="feedback.warning" hex="#FF9500" desc="Contratos por expirar, campos incompletos." />
          <ColorSwatch name="feedback.warning-light" hex="#FFF3E0" desc="Fondo de advertencias." />
        </div>
      </Section>

      {/* Interaction States */}
      <Section title="4. Estados de Interacción">
        <div style={{ overflowX: 'auto', borderRadius: khorTokens.radius.md, border: `1px solid ${khorTokens.colors.neutral[200]}` }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: khorTokens.colors.neutral[100] }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Estado</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Lógica de Color</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Resultado Visual</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Ejemplo</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '10px 16px', fontWeight: 500, borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Hover</td>
                <td style={{ padding: '10px 16px', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>color + 10% Brightness</td>
                <td style={{ padding: '10px 16px', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Se aclara levemente</td>
                <td style={{ padding: '10px 16px', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <span style={{ width: 32, height: 24, borderRadius: 4, backgroundColor: '#E04D36', display: 'inline-block' }} />
                    <span style={{ fontSize: 16 }}>→</span>
                    <span style={{ width: 32, height: 24, borderRadius: 4, backgroundColor: '#e8644f', display: 'inline-block' }} />
                  </div>
                </td>
              </tr>
              <tr style={{ backgroundColor: khorTokens.colors.neutral[100] }}>
                <td style={{ padding: '10px 16px', fontWeight: 500, borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Active</td>
                <td style={{ padding: '10px 16px', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>color - 10% Brightness</td>
                <td style={{ padding: '10px 16px', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Se oscurece</td>
                <td style={{ padding: '10px 16px', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <span style={{ width: 32, height: 24, borderRadius: 4, backgroundColor: '#E04D36', display: 'inline-block' }} />
                    <span style={{ fontSize: 16 }}>→</span>
                    <span style={{ width: 32, height: 24, borderRadius: 4, backgroundColor: '#c9442f', display: 'inline-block' }} />
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ padding: '10px 16px', fontWeight: 500 }}>Disabled</td>
                <td style={{ padding: '10px 16px' }}>Greyscale + Opacity 50%</td>
                <td style={{ padding: '10px 16px' }}>Pierde saturación</td>
                <td style={{ padding: '10px 16px' }}>
                  <span style={{ width: 32, height: 24, borderRadius: 4, backgroundColor: '#E04D36', display: 'inline-block', opacity: 0.5, filter: 'grayscale(1)' }} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Section>

      {/* Typography */}
      <Section title="5. Tipografía" id="tipografia">
        <p style={{ fontSize: 14, color: khorTokens.colors.neutral[400], marginTop: 0, marginBottom: 16 }}>
          Fuente principal: <strong>Raleway</strong> | Fuente secundaria: <strong>Plus Jakarta Sans</strong>
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'H1', size: '38px', weight: '700 (Bold)', lh: '1.2', sample: 'Título de Sección Principal' },
            { label: 'H2', size: '30px', weight: '700 (Bold)', lh: '1.2', sample: 'Título de Módulo' },
            { label: 'H3', size: '24px', weight: '600 (SemiBold)', lh: '1.3', sample: 'Título de Tarjeta o Modal' },
            { label: 'Body LG', size: '16px', weight: '400 (Regular)', lh: '1.5', sample: 'Párrafos de lectura larga y descripciones.' },
            { label: 'Body MD', size: '14px', weight: '400 (Regular)', lh: '1.5', sample: 'Texto estándar de la interfaz.' },
            { label: 'Small', size: '12px', weight: '500 (Medium)', lh: '1.5', sample: 'Etiquetas, tooltips y captions.' },
          ].map((t) => (
            <div key={t.label} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '12px 0', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>
              <span style={{ width: 80, fontSize: 12, fontWeight: 600, color: khorTokens.colors.brand.primary, flexShrink: 0 }}>{t.label}</span>
              <span style={{ fontSize: parseInt(t.size), fontWeight: parseInt(t.weight), lineHeight: parseFloat(t.lh), color: khorTokens.colors.neutral[900], flex: 1 }}>
                {t.sample}
              </span>
              <span style={{ fontSize: 11, color: khorTokens.colors.neutral[300], flexShrink: 0, whiteSpace: 'nowrap' }}>
                {t.size} / {t.weight} / LH {t.lh}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Spacing */}
      <Section title="6. Espaciado (Sistema Modular 8px)" id="espaciado">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { token: 'spacing.xs', value: '4px', desc: 'Entre icono y texto.' },
            { token: 'spacing.sm', value: '8px', desc: 'Padding interno de botones pequenos.' },
            { token: 'spacing.md', value: '16px', desc: 'Padding estandar de contenedores.' },
            { token: 'spacing.lg', value: '24px', desc: 'Espacio entre secciones.' },
            { token: 'spacing.xl', value: '40px', desc: 'Margenes laterales de la pagina.' },
          ].map((s) => (
            <div key={s.token} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <code style={{ width: 110, fontSize: 12, fontWeight: 600, color: khorTokens.colors.brand.navy, flexShrink: 0 }}>{s.token}</code>
              <div style={{
                width: parseInt(s.value),
                height: 24,
                backgroundColor: khorTokens.colors.brand.primary,
                borderRadius: 3,
                opacity: 0.7,
                flexShrink: 0,
              }} />
              <span style={{ fontSize: 13, color: khorTokens.colors.neutral[400], fontWeight: 500 }}>{s.value}</span>
              <span style={{ fontSize: 12, color: khorTokens.colors.neutral[300] }}>{s.desc}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Shadows */}
      <Section title="7. Sombras y Elevación" id="sombras">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {[
            { label: 'Elevation Low (sm)', shadow: khorTokens.shadows.sm, desc: 'Tarjetas simples' },
            { label: 'Elevation Medium (md)', shadow: khorTokens.shadows.md, desc: 'Dropdowns y Menus' },
            { label: 'Elevation High (lg)', shadow: khorTokens.shadows.lg, desc: 'Modales y Drawers' },
          ].map((s) => (
            <div key={s.label} style={{
              padding: 24,
              backgroundColor: '#fff',
              borderRadius: khorTokens.radius.lg,
              boxShadow: s.shadow,
              textAlign: 'center',
            }}>
              <p style={{ margin: '0 0 4px', fontSize: 13, fontWeight: 600, color: khorTokens.colors.brand.navy }}>{s.label}</p>
              <p style={{ margin: 0, fontSize: 11, color: khorTokens.colors.neutral[300] }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Code Export */}
      <Section title="8. Tokens en Código" id="codigo">
        <CodeBlock
          filename="khor-theme.ts"
          code={`import { khorTokens } from '@khor/design-system/theme';

// Acceso a colores
khorTokens.colors.brand.primary  // '#E04D36'
khorTokens.colors.brand.navy     // '#051758'
khorTokens.colors.feedback.success // '#2E7D32'

// Acceso a espaciado
khorTokens.spacing.md  // 16
khorTokens.spacing.lg  // 24

// Acceso a sombras
khorTokens.shadows.sm  // '0 2px 4px rgba(0,0,0,0.05)'

// Acceso a tipografia
khorTokens.typography.fontPrimary  // 'Raleway'
khorTokens.typography.h1.size      // 38

// Acceso a tokens semánticos (2ª capa)
khorTokens.semantic.action.primary.default  // acción principal
khorTokens.semantic.text.secondary          // texto secundario
khorTokens.semantic.surface.card            // fondo de tarjeta

// Acceso a motion tokens
khorTokens.motion.duration.normal  // 200ms
khorTokens.motion.easing.standard  // cubic-bezier(...)`}
        />
      </Section>

      {/* Semantic Tokens */}
      <Section title="9. Tokens Semánticos (2ª Capa)" id="semanticos">
        <p style={{ fontSize: 14, color: khorTokens.colors.neutral[400], marginTop: 0, marginBottom: 16, lineHeight: 1.6 }}>
          Capa de abstracción que mapea <strong>función → token primitivo</strong>. Si mañana la marca cambia de rojo a azul, solo se actualiza este mapeo y todo el sistema se actualiza sin tocar componentes.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Action Tokens */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 8, marginTop: 0 }}>Acciones</h4>
            <div style={{ overflowX: 'auto', borderRadius: khorTokens.radius.md, border: `1px solid ${khorTokens.colors.neutral[200]}` }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ backgroundColor: khorTokens.colors.neutral[100] }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Token Semántico</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Mapea a</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Propósito</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 600, borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Muestra</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { token: 'action.primary.default', maps: '--khor-primary', purpose: 'Botones y acciones principales', color: '#E04D36' },
                    { token: 'action.primary.hover', maps: '--khor-primary-hover', purpose: 'Hover de acción principal', color: '#e8644f' },
                    { token: 'action.primary.active', maps: '--khor-primary-active', purpose: 'Active/pressed de acción', color: '#c9442f' },
                    { token: 'action.secondary.default', maps: '--khor-navy', purpose: 'Acciones secundarias', color: '#051758' },
                    { token: 'action.danger.default', maps: '--khor-error', purpose: 'Acciones destructivas', color: '#D32F2F' },
                  ].map((row, i) => (
                    <tr key={row.token} style={{ backgroundColor: i % 2 !== 0 ? khorTokens.colors.neutral[100] : undefined }}>
                      <td style={{ padding: '8px 12px', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}><code style={{ fontSize: 11, fontWeight: 600, color: khorTokens.colors.brand.navy }}>{row.token}</code></td>
                      <td style={{ padding: '8px 12px', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}`, color: khorTokens.colors.neutral[400] }}><code style={{ fontSize: 11 }}>{row.maps}</code></td>
                      <td style={{ padding: '8px 12px', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}`, color: khorTokens.colors.neutral[500] }}>{row.purpose}</td>
                      <td style={{ padding: '8px 12px', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}`, textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', width: 32, height: 20, borderRadius: 4, backgroundColor: row.color }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Surface / Text / Border */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 8, marginTop: 0 }}>Superficies, Texto y Bordes</h4>
            <div style={{ overflowX: 'auto', borderRadius: khorTokens.radius.md, border: `1px solid ${khorTokens.colors.neutral[200]}` }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ backgroundColor: khorTokens.colors.neutral[100] }}>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Token Semántico</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Mapea a</th>
                    <th style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600, borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Uso</th>
                    <th style={{ padding: '8px 12px', textAlign: 'center', fontWeight: 600, borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}>Muestra</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { token: 'surface.page', maps: '--khor-neutral-100', use: 'Fondo de página', color: '#EDF0F1' },
                    { token: 'surface.card', maps: '--khor-neutral-50', use: 'Fondo de tarjetas', color: '#FFFFFF' },
                    { token: 'text.primary', maps: '--khor-neutral-900', use: 'Texto principal', color: '#000000' },
                    { token: 'text.secondary', maps: '--khor-neutral-500', use: 'Texto de cuerpo', color: '#4A5568' },
                    { token: 'text.muted', maps: '--khor-neutral-400', use: 'Texto secundario', color: '#718096' },
                    { token: 'text.disabled', maps: '--khor-neutral-300', use: 'Texto desactivado', color: '#A0AEC0' },
                    { token: 'text.link', maps: '--khor-primary', use: 'Links y anclas', color: '#E04D36' },
                    { token: 'border.default', maps: '--khor-neutral-200', use: 'Bordes estándar', color: '#D5DBE0' },
                    { token: 'border.focus', maps: '--khor-primary', use: 'Focus ring', color: '#E04D36' },
                    { token: 'border.error', maps: '--khor-error', use: 'Borde de error', color: '#D32F2F' },
                  ].map((row, i) => (
                    <tr key={row.token} style={{ backgroundColor: i % 2 !== 0 ? khorTokens.colors.neutral[100] : undefined }}>
                      <td style={{ padding: '8px 12px', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}` }}><code style={{ fontSize: 11, fontWeight: 600, color: khorTokens.colors.brand.navy }}>{row.token}</code></td>
                      <td style={{ padding: '8px 12px', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}`, color: khorTokens.colors.neutral[400] }}><code style={{ fontSize: 11 }}>{row.maps}</code></td>
                      <td style={{ padding: '8px 12px', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}`, color: khorTokens.colors.neutral[500] }}>{row.use}</td>
                      <td style={{ padding: '8px 12px', borderBottom: `1px solid ${khorTokens.colors.neutral[200]}`, textAlign: 'center' }}>
                        <span style={{ display: 'inline-block', width: 32, height: 20, borderRadius: 4, backgroundColor: row.color, border: ['#FFFFFF', '#EDF0F1', '#D5DBE0'].includes(row.color) ? `1px solid ${khorTokens.colors.neutral[200]}` : 'none' }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* Motion Tokens */}
      <Section title="10. Motion & Animaciones" id="motion">
        <p style={{ fontSize: 14, color: khorTokens.colors.neutral[400], marginTop: 0, marginBottom: 16, lineHeight: 1.6 }}>
          Tokens de duración y curvas de easing para animaciones coordinadas. Respetan <code>prefers-reduced-motion</code> automáticamente.
        </p>

        {/* Duration */}
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Duraciones</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
          {[
            { token: 'duration-fast', value: '100ms', desc: 'Tooltips, fades sutiles' },
            { token: 'duration-normal', value: '200ms', desc: 'Transiciones estándar (hover, focus)' },
            { token: 'duration-slow', value: '400ms', desc: 'Modales, drawers, expansiones' },
            { token: 'duration-slower', value: '600ms', desc: 'Animaciones de entrada complejas' },
          ].map(d => (
            <div key={d.token} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <code style={{ width: 140, fontSize: 12, fontWeight: 600, color: khorTokens.colors.brand.navy, flexShrink: 0 }}>{d.token}</code>
              <div style={{ width: 200, height: 8, backgroundColor: khorTokens.colors.neutral[200], borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}>
                <div style={{ width: `${(parseInt(d.value) / 600) * 100}%`, height: '100%', backgroundColor: khorTokens.colors.brand.primary, borderRadius: 4 }} />
              </div>
              <span style={{ fontSize: 13, color: khorTokens.colors.brand.primary, fontWeight: 600, width: 50, flexShrink: 0 }}>{d.value}</span>
              <span style={{ fontSize: 12, color: khorTokens.colors.neutral[400] }}>{d.desc}</span>
            </div>
          ))}
        </div>

        {/* Easing */}
        <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Curvas de Easing</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {[
            { token: 'easing-standard', value: 'cubic-bezier(0.4, 0, 0.2, 1)', desc: 'Transiciones generales', emoji: '━━━━━╮' },
            { token: 'easing-enter', value: 'cubic-bezier(0, 0, 0.2, 1)', desc: 'Elementos que aparecen', emoji: '─────╮' },
            { token: 'easing-exit', value: 'cubic-bezier(0.4, 0, 1, 1)', desc: 'Elementos que salen', emoji: '╭─────' },
            { token: 'easing-spring', value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', desc: 'Rebote sutil (modals, tooltips)', emoji: '─╮╭──' },
          ].map(e => (
            <div key={e.token} style={{
              padding: 16, backgroundColor: khorTokens.colors.neutral[50], borderRadius: khorTokens.radius.md,
              border: `1px solid ${khorTokens.colors.neutral[200]}`,
            }}>
              <code style={{ fontSize: 12, fontWeight: 600, color: khorTokens.colors.brand.navy, display: 'block', marginBottom: 6 }}>{e.token}</code>
              <div style={{
                width: '100%', height: 32, backgroundColor: khorTokens.colors.neutral[100], borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%', backgroundColor: khorTokens.colors.brand.primary,
                  animation: `slide-demo 2s ${e.value} infinite alternate`,
                  position: 'absolute', left: 8,
                }} />
              </div>
              <p style={{ fontSize: 11, color: khorTokens.colors.neutral[400], margin: '0 0 4px', lineHeight: 1.4 }}>{e.desc}</p>
              <code style={{ fontSize: 10, color: khorTokens.colors.neutral[300], wordBreak: 'break-all' }}>{e.value}</code>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes slide-demo {
            from { left: 8px; }
            to { left: calc(100% - 24px); }
          }
        `}</style>
      </Section>

      {/* Internationalization */}
      <Section title="11. Internacionalización (i18n) y RTL" id="i18n">
        <p style={{ fontSize: 14, color: khorTokens.colors.neutral[400], marginTop: 0, marginBottom: 16, lineHeight: 1.6 }}>
          Soporte para lenguajes de derecha a izquierda (RTL) y fuentes alternativas para scripts no latinos.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Font Fallbacks */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 8, marginTop: 0 }}>Tipografías Alternativas (Fallbacks)</h4>
            <div style={{ padding: 16, border: `1px solid ${khorTokens.colors.neutral[200]}`, borderRadius: khorTokens.radius.md, backgroundColor: khorTokens.colors.neutral[50] }}>
               <code style={{ fontSize: 12, color: khorTokens.colors.neutral[500], display: 'block', wordBreak: 'break-all' }}>
                 font-family: var(--khor-font-primary), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
               </code>
               <p style={{ margin: '8px 0 0', fontSize: 13, color: khorTokens.colors.neutral[500] }}>
                 Garantiza la correcta visualización de caracteres cirílicos, árabes, hebreos y asiáticos.
               </p>
            </div>
          </div>
          {/* RTL */}
          <div>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: khorTokens.colors.brand.navy, marginBottom: 8, marginTop: 0 }}>Soporte RTL (Right-to-Left)</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
               {/* LTR */}
               <div style={{ padding: 16, border: `1px solid ${khorTokens.colors.neutral[200]}`, borderRadius: khorTokens.radius.md, backgroundColor: khorTokens.colors.neutral[100] }}>
                 <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: khorTokens.colors.brand.navy }}>LTR (Left-to-Right)</p>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, backgroundColor: '#fff', borderRadius: 4, boxShadow: khorTokens.shadows.sm }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: khorTokens.colors.brand.primary }} />
                    <span style={{ fontSize: 14, color: khorTokens.colors.neutral[900] }}>Content aligned left</span>
                 </div>
               </div>
               {/* RTL */}
               <div style={{ padding: 16, border: `1px solid ${khorTokens.colors.neutral[200]}`, borderRadius: khorTokens.radius.md, backgroundColor: khorTokens.colors.neutral[100] }} dir="rtl">
                 <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 600, color: khorTokens.colors.brand.navy }}>RTL (Right-to-Left)</p>
                 <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 12, backgroundColor: '#fff', borderRadius: 4, boxShadow: khorTokens.shadows.sm }}>
                    <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: khorTokens.colors.brand.primary }} />
                    <span style={{ fontSize: 14, color: khorTokens.colors.neutral[900] }}>محتوى محاذاة لليمين</span>
                 </div>
               </div>
            </div>
            <p style={{ margin: '8px 0 0', fontSize: 13, color: khorTokens.colors.neutral[500] }}>
              Los componentes usan propiedades lógicas CSS (<code>margin-inline-start</code>, <code>padding-inline-end</code>) para adaptarse automáticamente.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}