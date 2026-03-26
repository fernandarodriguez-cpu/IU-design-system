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
    <div style={{ fontFamily: font }}>
      {!id && (
        <>
          <div style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: t.colors.brand.primary, textTransform: 'uppercase', letterSpacing: 1 }}>Recipes</span>
            <h2 style={{ margin: '4px 0 0', fontSize: 30, fontWeight: 700, color: 'var(--foreground)' }}>Patrones de Diseño</h2>
            <p style={{ margin: '8px 0 0', fontSize: 16, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
              Combinaciones probadas de componentes Khor que resuelven casos de uso reales.
              Cada patrón incluye código copiable listo para producción.
            </p>
          </div>

          {/* Category Filter */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 24, flexWrap: 'wrap' }}>
            {categories.map((c) => (
              <button key={c} onClick={() => setActiveCategory(c)} style={{
                padding: '6px 14px', borderRadius: 999, border: 'none', fontSize: 13, fontWeight: 500,
                backgroundColor: activeCategory === c ? t.colors.brand.primary : 'var(--muted)',
                color: activeCategory === c ? '#fff' : 'var(--muted-foreground)', cursor: 'pointer', fontFamily: font,
                transition: 'all 0.15s ease',
              }}>{c}</button>
            ))}
          </div>
        </>
      )}

      {id && (
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center' }}>
          <KButton variant="ghost" size="sm" icon={<ChevronLeft size={16} />} onClick={() => navigate('/patterns')}>
            Ver todos los patrones
          </KButton>
        </div>
      )}

      {/* Patterns Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {filtered.map((pattern) => {
          if (id) {
            // Single view structure: similar to TemplatesPage
            return (
              <div key={pattern.id}>
                {/* Intro */}
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: t.colors.brand.primary, textTransform: 'uppercase', letterSpacing: 1 }}>{pattern.category}</span>
                  <h2 style={{ margin: '4px 0 0', fontSize: 30, fontWeight: 700, color: t.colors.brand.navy }}>{pattern.title}</h2>
                  <p style={{ margin: '8px 0 0', fontSize: 16, color: t.colors.neutral[500], lineHeight: 1.5 }}>{pattern.description}</p>
                </div>

                {/* Preview */}
                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: t.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Vista Previa</h4>
                  <div style={{ borderRadius: t.radius.lg, border: `1px solid ${t.colors.neutral[200]}`, overflow: 'hidden', backgroundColor: 'var(--background)' }}>
                    <div style={{ padding: 24 }}>
                      {pattern.component}
                    </div>
                  </div>
                </div>

                {/* Code */}
                <div>
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: t.colors.brand.navy, marginBottom: 12, marginTop: 0 }}>Código</h4>
                  <CodeBlock code={pattern.code} filename={`${pattern.id}.tsx`} />
                </div>
              </div>
            );
          }

          // Gallery view structure
          return (
            <div key={pattern.id} style={{
              borderRadius: t.radius.xl, border: `1px solid var(--border)`,
              overflow: 'hidden', backgroundColor: 'var(--card)',
              transition: 'box-shadow 0.2s ease',
            }}>
              {/* Pattern Header */}
              <div style={{ padding: '16px 24px', borderBottom: `1px solid var(--border)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--foreground)' }}>{pattern.title}</h3>
                    <KBadge variant="default">{pattern.category}</KBadge>
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted-foreground)' }}>{pattern.description}</p>
                </div>
                <KButton
                  variant={showCode[pattern.id] ? 'primary' : 'outline'}
                  size="sm"
                  icon={<Copy size={14} />}
                  onClick={() => setShowCode((prev) => ({ ...prev, [pattern.id]: !prev[pattern.id] }))}
                >
                  Código
                </KButton>
              </div>

              {/* Pattern Preview */}
              <div style={{ padding: 24, backgroundColor: 'var(--background)' }}>
                {pattern.component}
              </div>

              {/* Code Block (toggle) */}
              {showCode[pattern.id] && (
                <div style={{ borderTop: `1px solid var(--border)` }}>
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