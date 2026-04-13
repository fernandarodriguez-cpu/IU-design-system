import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Copy } from 'lucide-react';
import { KButton, KBadge } from '../components/design-system/atoms/index';
import { CodeBlock } from '../components/docs/CodeBlock';
import { khorTokens } from '../theme/khor-theme';
import { patterns, categories } from '../patterns/index';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ─── Page Component ─── */
export function PatternsPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activePattern, setActivePattern] = useState<string | null>(null);
  const [showCode, setShowCode] = useState<Record<string, boolean>>({});

  const filtered = id 
    ? patterns.filter(p => p.id === id) 
    : (activeCategory === 'Todos' ? patterns : patterns.filter((p) => p.category === activeCategory));

  if (id && filtered.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 64, fontFamily: font }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--foreground)' }}>Patrón no encontrado</h2>
        <p style={{ color: 'var(--muted-foreground)' }}>El patrón seleccionado no existe.</p>
        <KButton variant="outline" onClick={() => navigate('/patterns')}>Regresar a Patrones</KButton>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: font, backgroundColor: t.semantic.surface.page, minHeight: '100vh', padding: t.spacing.xl }}>
      {!id && (
        <>
          <div style={{ marginBottom: t.spacing.lg }}>
            <span style={{ fontSize: t.typography.bodyXs.size, fontWeight: t.typography.fontWeights.semibold, color: t.colors.brand.primary, textTransform: 'uppercase', letterSpacing: t.typography.letterSpacing.wide }}>Recipes</span>
            <h2 style={{ margin: `${t.spacing.xxs}px 0 0`, fontSize: t.typography.h2.size, fontWeight: t.typography.fontWeights.bold, color: t.semantic.text.primary }}>Patrones de Diseño</h2>
            <p style={{ margin: `${t.spacing.sm}px 0 0`, fontSize: t.typography.bodyMd.size, color: t.semantic.text.secondary, lineHeight: 1.5 }}>
              Combinaciones probadas de componentes Khor que resuelven casos de uso reales.
              Cada patrón incluye código copiable listo para producción.
            </p>
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: t.spacing.xs, marginBottom: t.spacing.lg, flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button key={c} onClick={() => setActiveCategory(c)} style={{
                padding: `${t.spacing.xxs}px ${t.spacing.md}px`, borderRadius: t.radius.xl, border: 'none', fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.medium,
                backgroundColor: activeCategory === c ? t.colors.brand.primary : t.semantic.surface.raised,
                color: activeCategory === c ? t.colors.feedback.white : t.semantic.text.muted, cursor: 'pointer', fontFamily: font,
                transition: 'all 0.15s ease',
              }}>{c}</button>
            ))}
          </div>
        </>
      )}

      {id && (
        <div style={{ marginBottom: t.spacing.lg, display: 'flex', alignItems: 'center' }}>
          <KButton variant="ghost" size="sm" icon={<ChevronLeft size={t.icon.sm} />} onClick={() => navigate('/patterns')}>
            Ver todos los patrones
          </KButton>
        </div>
      )}

      {/* Patterns Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: t.spacing.lg }}>
        {filtered.map((pattern) => {
          if (id) {
            // Single view structure: similar to TemplatesPage
            return (
              <div key={pattern.id}>
                {/* Intro */}
                <div style={{ marginBottom: t.spacing.lg }}>
                  <span style={{ fontSize: t.typography.bodyXs.size, fontWeight: t.typography.fontWeights.semibold, color: t.colors.brand.primary, textTransform: 'uppercase', letterSpacing: t.typography.letterSpacing.wide }}>{pattern.category}</span>
                  <h2 style={{ margin: `${t.spacing.xxs}px 0 0`, fontSize: t.typography.h2.size, fontWeight: t.typography.fontWeights.bold, color: t.semantic.text.primary }}>{pattern.title}</h2>
                  <p style={{ margin: `${t.spacing.sm}px 0 0`, fontSize: t.typography.bodyMd.size, color: t.semantic.text.secondary, lineHeight: 1.5 }}>{pattern.description}</p>
                </div>

                {/* Preview */}
                <div style={{ marginBottom: t.spacing.lg }}>
                  <h4 style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.bold, color: t.semantic.text.primary, marginBottom: t.spacing.sm, marginTop: 0 }}>Vista Previa</h4>
                  <div style={{ borderRadius: t.radius.lg, border: `1px solid ${t.semantic.border.default}`, overflow: 'hidden', backgroundColor: t.semantic.surface.card }}>
                    <div style={{ padding: t.spacing.lg }}>
                      {pattern.component}
                    </div>
                  </div>
                </div>

                {/* Code */}
                <div>
                  <h4 style={{ fontSize: t.typography.bodySm.size, fontWeight: t.typography.fontWeights.bold, color: t.semantic.text.primary, marginBottom: t.spacing.sm, marginTop: 0 }}>Código</h4>
                  <CodeBlock code={pattern.code} filename={`${pattern.id}.tsx`} />
                </div>
              </div>
            );
          }

          // Gallery view structure
          return (
            <div key={pattern.id} style={{
              borderRadius: t.radius.xl, border: `1px solid ${t.semantic.border.default}`,
              overflow: 'hidden', backgroundColor: t.semantic.surface.card,
              transition: 'box-shadow 0.2s ease',
            }}>
              {/* Pattern Header */}
              <div style={{ padding: `${t.spacing.md}px ${t.spacing.lg}px`, borderBottom: `1px solid ${t.semantic.border.default}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: t.spacing.sm }}>
                    <h3 style={{ margin: 0, fontSize: t.typography.bodyLg.size, fontWeight: t.typography.fontWeights.bold, color: t.semantic.text.primary }}>{pattern.title}</h3>
                    <KBadge khorStatus="default" label={pattern.category} />
                  </div>
                  <p style={{ margin: `${t.spacing.xxs}px 0 0`, fontSize: t.typography.bodySm.size, color: t.semantic.text.muted }}>{pattern.description}</p>
                </div>
                <KButton
                  variant={showCode[pattern.id] ? 'primary' : 'outline'}
                  size="sm"
                  icon={<Copy size={t.icon.sm} />}
                  onClick={() => setShowCode((prev) => ({ ...prev, [pattern.id]: !prev[pattern.id] }))}
                >
                  Código
                </KButton>
              </div>

              {/* Pattern Preview */}
              <div style={{ padding: t.spacing.lg, backgroundColor: t.semantic.surface.page }}>
                {pattern.component}
              </div>

              {/* Code Block (toggle) */}
              {showCode[pattern.id] && (
                <div style={{ borderTop: `1px solid ${t.semantic.border.default}` }}>
                  <CodeBlock code={pattern.code} filename={`${pattern.id}.tsx`} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}