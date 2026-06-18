import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Copy, Eye, Code, BookOpen, Settings } from 'lucide-react';
import { KButton, KBadge } from '../components/design-system/atoms/index';
import { CodeBlock } from '../components/docs/CodeBlock';
import { khorTokens } from '../theme/khor-theme';
import { patterns, categories } from '../patterns/index';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ── Single pattern tabs ── */
type PatternTab = 'preview' | 'code' | 'docs';

const PATTERN_TABS: { key: PatternTab; label: string; icon: React.ReactNode }[] = [
  { key: 'preview', label: 'Vista Previa',  icon: <Eye size={16} /> },
  { key: 'code',    label: 'Código',         icon: <Code size={16} /> },
  { key: 'docs',    label: 'Documentación',  icon: <BookOpen size={16} /> },
];

/* ── Single Pattern View (with tabs) ── */
function SinglePatternView({ id, onBack }: { id: string; onBack: () => void }) {
  const [active, setActive] = useState<PatternTab>('preview');
  const pattern = patterns.find(p => p.id === id);

  if (!pattern) {
    return (
      <div style={{ textAlign: 'center', padding: 64, fontFamily: font }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--foreground)' }}>Patrón no encontrado</h2>
        <KButton variant="outline" onClick={onBack}>Regresar a Patrones</KButton>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font }}>
      {/* Header — matches ComponentDoc */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted-foreground)', fontFamily: font, fontSize: 12, padding: 0 }}>
            <ChevronLeft size={13} />
            Patrones
          </button>
          <span style={{ color: t.colors.neutral[300], fontSize: 12 }}>/</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--khor-text-label)', textTransform: 'uppercase', letterSpacing: 1 }}>
            {pattern.category}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: 'var(--foreground)' }}>{pattern.title}</h2>
            <p style={{ margin: '8px 0 0', fontSize: 16, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{pattern.description}</p>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(pattern.code)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: t.radius.md, border: `1px solid var(--border)`, background: 'var(--card)', color: 'var(--muted-foreground)', cursor: 'pointer', fontSize: 13, fontWeight: 500, fontFamily: font, flexShrink: 0 }}
          >
            <Copy size={14} /> Copiar Snippet
          </button>
        </div>
      </div>

      {/* Tab nav */}
      <div style={{ display: 'flex', gap: 0, borderBottom: `2px solid ${t.colors.neutral[200]}`, marginBottom: 20 }}>
        {PATTERN_TABS.map(tab => (
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

      {/* Vista Previa */}
      {active === 'preview' && (
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 600, color: 'var(--foreground)', marginBottom: 12, marginTop: 0 }}>Ejemplos de Uso</h4>
          <div style={{ padding: 32, backgroundColor: '#e0e6fb', borderRadius: t.radius.lg, border: `1px solid #c8d4f0` }}>
            {pattern.component}
          </div>
        </div>
      )}

      {/* Código */}
      {active === 'code' && (
        <CodeBlock code={pattern.code} filename={`${pattern.id}.tsx`} />
      )}

      {/* Documentación */}
      {active === 'docs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', margin: '0 0 12px' }}>Descripción</h4>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.7 }}>{pattern.description}</p>
          </div>
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', margin: '0 0 12px' }}>Categoría</h4>
            <KBadge status="default" label={pattern.category} />
          </div>
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', margin: '0 0 12px' }}>Guías de uso</h4>
            <ul style={{ paddingLeft: 20, color: 'var(--muted-foreground)', fontSize: 14, lineHeight: 1.85, margin: 0 }}>
              <li>Copia el snippet desde la pestaña <strong>Código</strong> y adáptalo a tu contexto.</li>
              <li>Los patrones usan exclusivamente componentes Khor — no añadas librerías externas.</li>
              <li>Respeta los tokens de color y espaciado del sistema para mantener consistencia visual.</li>
              <li>Si el patrón requiere estado propio, encapsúlalo en el componente que lo consume.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Page Component ─── */
export function PatternsPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [showCode, setShowCode] = useState<Record<string, boolean>>({});

  /* Single pattern — delegate to tabbed view */
  if (id) {
    return (
      <SinglePatternView id={id} onBack={() => navigate('/patterns')} />
    );
  }

  const filtered = activeCategory === 'Todos'
    ? patterns
    : patterns.filter(p => p.category === activeCategory);

  return (
    <div style={{ fontFamily: font }}>
      {/* Header — matches ComponentDoc */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--khor-text-label)', textTransform: 'uppercase', letterSpacing: 1 }}>
            Patrones / Recipes
          </span>
        </div>
        <h2 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: 'var(--foreground)' }}>Patrones de Diseño</h2>
        <p style={{ margin: '8px 0 0', fontSize: 16, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
          Combinaciones probadas de componentes Khor que resuelven casos de uso reales.
          Cada patrón incluye código copiable listo para producción.
        </p>
      </div>

      {/* Divider line like ComponentDoc tab bar */}
      <div style={{ borderBottom: `2px solid ${t.colors.neutral[200]}`, marginBottom: 20 }} />

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {categories.map((c) => (
          <button key={c} onClick={() => setActiveCategory(c)} style={{
            padding: '7px 14px', borderRadius: 20, border: 'none',
            fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: font,
            backgroundColor: activeCategory === c ? t.colors.brand.primary : t.semantic.surface.raised,
            color: activeCategory === c ? t.colors.feedback.white : t.semantic.text.muted,
            transition: 'all 0.15s ease',
          }}>{c}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--muted-foreground)', alignSelf: 'center' }}>
          {filtered.length} patrón{filtered.length !== 1 ? 'es' : ''}
        </span>
      </div>

      {/* Patterns list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.lg }}>
        {filtered.map((pattern) => (
          <div key={pattern.id} style={{
            borderRadius: t.radius.xl, border: `1px solid ${t.semantic.border.default}`,
            overflow: 'hidden', backgroundColor: t.semantic.surface.card,
          }}>
            <div style={{ padding: `${t.spacing.md}px ${t.spacing.lg}px`, borderBottom: `1px solid ${t.semantic.border.default}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.sm }}>
                  <h3 style={{ margin: 0, fontSize: t.typography.bodyLg.size, fontWeight: t.typography.fontWeights.bold, color: t.semantic.text.primary }}>{pattern.title}</h3>
                  <KBadge status="default" label={pattern.category} />
                </div>
                <p style={{ margin: `${t.spacing.xxs}px 0 0`, fontSize: t.typography.bodySm.size, color: t.semantic.text.muted }}>{pattern.description}</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <KButton variant="outline" size="sm" onClick={() => navigate(`/patterns/${pattern.id}`)}>
                  Ver detalles
                </KButton>
                <KButton
                  variant={showCode[pattern.id] ? 'primary' : 'outline'}
                  size="sm"
                  icon={<Copy size={t.icon.sm} />}
                  onClick={() => setShowCode((prev) => ({ ...prev, [pattern.id]: !prev[pattern.id] }))}
                >
                  Código
                </KButton>
              </div>
            </div>
            <div style={{ padding: t.spacing.lg, backgroundColor: '#e0e6fb' }}>
              {pattern.component}
            </div>
            {showCode[pattern.id] && (
              <div style={{ borderTop: `1px solid ${t.semantic.border.default}` }}>
                <CodeBlock code={pattern.code} filename={`${pattern.id}.tsx`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}