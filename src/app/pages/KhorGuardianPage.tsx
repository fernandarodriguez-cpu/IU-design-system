/**
 * Khor Guardian — Centro Unificado de Accesibilidad y Calidad.
 * Combina Auditoría de Componentes y Verificador de Contraste WCAG.
 */
import React, { useState, useMemo } from 'react';
import { 
  Shield, CheckCircle, AlertTriangle, XCircle, Keyboard, Eye, 
  Ear, Search, Palette, RefreshCw, Copy, Check, Info, ArrowRight,
  Monitor, MousePointer, ExternalLink, Activity, ChevronDown, ChevronRight
} from 'lucide-react';
import { KButton, KBadge } from '../components/design-system/atoms/index';
import { KTabs } from '../components/design-system/organisms/index';
import { khorTokens } from '../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ─── Types & Helper Functions (Contrast) ─── */
function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function relativeLuminance([r, g, b]: [number, number, number]): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

type WcagLevel = 'AAA' | 'AA' | 'AA Large' | 'Fail';
function getWcagLevel(ratio: number): WcagLevel {
  if (ratio >= 7) return 'AAA';
  if (ratio >= 4.5) return 'AA';
  if (ratio >= 3) return 'AA Large';
  return 'Fail';
}

function getLevelConfig(level: WcagLevel) {
  switch (level) {
    case 'AAA': return { color: '#2E7D32', bg: '#E8F5E9', icon: <CheckCircle size={14} />, label: 'Excelente' };
    case 'AA': return { color: '#2E7D32', bg: '#E8F5E9', icon: <CheckCircle size={14} />, label: 'Cumple AA' };
    case 'AA Large': return { color: '#E68600', bg: '#FFF3E0', icon: <AlertTriangle size={14} />, label: 'Solo Large' };
    case 'Fail': return { color: '#D32F2F', bg: '#FFEBEE', icon: <XCircle size={14} />, label: 'No cumple' };
  }
}

/* ─── Audit Data (Integrated from original AccessibilityPage) ─── */
const auditData = [
  {
    name: 'KButton', type: 'Átomo', score: 98, checksPassed: 5, totalChecks: 6,
    categories: ['Keyboard', 'Reader', 'Contrast']
  },
  {
    name: 'KInput', type: 'Átomo', score: 95, checksPassed: 4, totalChecks: 5,
    categories: ['Keyboard', 'Reader', 'Contrast']
  },
  {
    name: 'KSelectField', type: 'Molécula', score: 100, checksPassed: 3, totalChecks: 3,
    categories: ['Keyboard', 'Reader']
  },
  {
    name: 'KDataTable', type: 'Organismo', score: 85, checksPassed: 4, totalChecks: 6,
    categories: ['Keyboard', 'Reader']
  },
  {
    name: 'KModal', type: 'Organismo', score: 100, checksPassed: 4, totalChecks: 4,
    categories: ['Keyboard', 'Reader']
  },
];

/* ─── Main Component ─── */
export function KhorGuardianPage() {
  const [activeTab, setActiveTab] = useState('audit');
  const [search, setSearch] = useState('');
  const [customFg, setCustomFg] = useState('#051758');
  const [customBg, setCustomBg] = useState('#FFFFFF');

  const customRatio = useMemo(() => contrastRatio(customFg, customBg), [customFg, customBg]);
  const customLevel = getWcagLevel(customRatio);

  const overallScore = 96;

  return (
    <div style={{ fontFamily: font }}>
      {/* Premium Header */}
      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        marginBottom: 32, padding: '32px 40px', borderRadius: 24,
        backgroundColor: t.colors.brand.navy, color: '#fff',
        backgroundImage: 'linear-gradient(135deg, #051758 0%, #0d1b3e 100%)',
        boxShadow: '0 20px 40px rgba(5, 23, 88, 0.2)',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Abstract background shape */}
        <div style={{ 
          position: 'absolute', right: -50, top: -50, width: 250, height: 250, 
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(224,77,54,0.15) 0%, transparent 70%)' 
        }} />

        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ 
              padding: 10, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 14,
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <Shield size={28} style={{ color: t.colors.brand.primary }} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 32, fontWeight: 800, letterSpacing: '-0.5px' }}>Khor Guardian</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <Activity size={12} style={{ color: '#4ADE80' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: '#4ADE80' }}>Sistemas en línea</span>
              </div>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: 15, opacity: 0.7, maxWidth: 480, lineHeight: 1.6 }}>
            Centro unificado de auditoría y calidad. Evaluación en tiempo real de 
            cumplimiento WCAG 2.1 AA/AAA para el ecosistema Khor.
          </p>
        </div>
        
        <div style={{ textAlign: 'right', display: 'flex', gap: 48, position: 'relative', zIndex: 1 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.5, textTransform: 'uppercase', marginBottom: 4, letterSpacing: 1 }}>Global Compliance</div>
            <div style={{ fontSize: 48, fontWeight: 800, color: '#4ADE80', lineHeight: 1 }}>{overallScore}%</div>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.5, textTransform: 'uppercase', marginBottom: 4, letterSpacing: 1 }}>Atomic Audit</div>
            <div style={{ fontSize: 48, fontWeight: 800, lineHeight: 1 }}>242<span style={{ fontSize: 20, opacity: 0.3 }}>/250</span></div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32, borderBottom: `1px solid var(--border)`, padding: '0 8px' }}>
        {[
          { id: 'audit', label: 'Centro de Auditoría', icon: <Activity size={18} /> },
          { id: 'contrast', label: 'Laboratorio de Contraste', icon: <Palette size={18} /> },
          { id: 'principles', label: 'Protocolos de Seguridad', icon: <Shield size={18} /> }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px', border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 14, fontWeight: 600, fontFamily: font,
              color: activeTab === tab.id ? t.colors.brand.primary : 'var(--muted-foreground)',
              borderBottom: `3px solid ${activeTab === tab.id ? t.colors.brand.primary : 'transparent'}`,
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: -1,
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{ minHeight: 400 }}>
        {activeTab === 'audit' && (
          <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />
                <input 
                  placeholder="Filtrar por nombre o categoría..." 
                  value={search} onChange={e => setSearch(e.target.value)}
                  style={{ 
                    width: '100%', padding: '14px 16px 14px 44px', borderRadius: 16, fontSize: 15,
                    border: `1px solid var(--border)`, backgroundColor: 'var(--card)', color: 'var(--foreground)',
                    outline: 'none', transition: 'box-shadow 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
              {auditData.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(comp => (
                <div key={comp.name} style={{ 
                  padding: '20px 24px', borderRadius: 16, backgroundColor: 'var(--card)', 
                  border: `1px solid var(--border)`, display: 'flex', alignItems: 'center', gap: 24,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)', transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = t.shadows.md; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)'; }}
                >
                  <div style={{ 
                    width: 52, height: 52, borderRadius: 14, border: `3px solid ${comp.score >= 95 ? '#4ADE80' : '#FBBF24'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16,
                    backgroundColor: comp.score >= 95 ? 'rgba(74,222,128,0.05)' : 'rgba(251,191,36,0.05)',
                    color: comp.score >= 95 ? '#166534' : '#92400E'
                  }}>
                    {comp.score}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
                      <span style={{ fontWeight: 700, fontSize: 17, color: 'var(--foreground)' }}>{comp.name}</span>
                      <span style={{ 
                        fontSize: 10, padding: '2px 8px', borderRadius: 6, fontWeight: 700, letterSpacing: '0.5px',
                        backgroundColor: 'var(--muted)', color: 'var(--muted-foreground)'
                      }}>{comp.type}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
                      <span style={{ color: comp.score >= 95 ? '#166534' : 'inherit', fontWeight: 600 }}>{comp.checksPassed}/{comp.totalChecks}</span> veroficaciones aprobadas
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 24 }}>
                    {comp.categories.map(cat => (
                      <div key={cat} style={{ textAlign: 'center' }}>
                        <div style={{ color: 'var(--muted-foreground)', marginBottom: 4 }}>
                          {cat === 'Keyboard' ? <Keyboard size={16} /> : cat === 'Reader' ? <Ear size={16} /> : <Eye size={16} />}
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.5px', color: 'var(--muted-foreground)' }}>{cat.toUpperCase()}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ width: 1, height: 40, backgroundColor: 'var(--border)' }} />
                  <KButton variant="outline" size="sm" icon={<ChevronRight size={14} />}>Auditar</KButton>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'contrast' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, animation: 'fadeIn 0.4s ease-out' }}>
            <div style={{ padding: 32, borderRadius: 24, backgroundColor: 'var(--card)', border: `1px solid var(--border)`, boxShadow: t.shadows.sm }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>Laboratorio de Contraste</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--muted-foreground)' }}>
                  <Activity size={14} /> Tiempo Real
                </div>
              </div>
              
              <div style={{ 
                padding: '80px 40px', borderRadius: 16, backgroundColor: customBg, border: '1px solid var(--border)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', transition: 'background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: 'inset 0 0 80px rgba(0,0,0,0.02)'
              }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: customFg, marginBottom: 16, letterSpacing: '-1px' }}>Khor Visual Grade</div>
                <div style={{ fontSize: 18, color: customFg, maxWidth: 500, lineHeight: 1.6, opacity: 0.9 }}>
                  La legibilidad no es un lujo, es un derecho. Khor Guardian verifica que cada pixel sea accesible para todos los usuarios, independientemente de sus capacidades visuales.
                </div>
              </div>
              
              <div style={{ 
                marginTop: 32, padding: '24px 32px', borderRadius: 20, backgroundColor: 'var(--muted)', 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                border: '1px solid rgba(0,0,0,0.03)'
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted-foreground)', marginBottom: 4 }}>Ratio de Contraste</div>
                  <div style={{ fontSize: 44, fontWeight: 900, color: getLevelConfig(customLevel).color, letterSpacing: '-1px' }}>{customRatio.toFixed(2)}:1</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    padding: '10px 24px', borderRadius: 14, backgroundColor: getLevelConfig(customLevel).color, 
                    color: '#fff', fontSize: 15, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 10,
                    boxShadow: '0 10px 20px -5px ' + getLevelConfig(customLevel).color + '40'
                  }}>
                    {getLevelConfig(customLevel).icon} {customLevel}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted-foreground)', marginTop: 10 }}>Calificación: {getLevelConfig(customLevel).label}</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ padding: 24, borderRadius: 24, backgroundColor: 'var(--card)', border: `1px solid var(--border)`, boxShadow: t.shadows.sm }}>
                <h4 style={{ margin: '0 0 20px', fontSize: 16, fontWeight: 700 }}>Configuración de Capa</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted-foreground)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Texto (Foreground)</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <input type="color" value={customFg} onChange={e => setCustomFg(e.target.value)} style={{ width: 44, height: 44, border: 'none', borderRadius: 12, cursor: 'pointer', padding: 0, backgroundColor: 'transparent' }} />
                      <input value={customFg} onChange={e => setCustomFg(e.target.value)} style={{ flex: 1, padding: '10px 14px', borderRadius: 12, border: `1px solid var(--border)`, backgroundColor: 'var(--card)', color: 'var(--foreground)', fontFamily: 'monospace', fontWeight: 600 }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted-foreground)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fondo (Background)</label>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <input type="color" value={customBg} onChange={e => setCustomBg(e.target.value)} style={{ width: 44, height: 44, border: 'none', borderRadius: 12, cursor: 'pointer', padding: 0, backgroundColor: 'transparent' }} />
                      <input value={customBg} onChange={e => setCustomBg(e.target.value)} style={{ flex: 1, padding: '10px 14px', borderRadius: 12, border: `1px solid var(--border)`, backgroundColor: 'var(--card)', color: 'var(--foreground)', fontFamily: 'monospace', fontWeight: 600 }} />
                    </div>
                  </div>
                  <KButton variant="outline" block icon={<RefreshCw size={14} />} onClick={() => { const f=customFg; setCustomFg(customBg); setCustomBg(f); }}>Intercambiar Colores</KButton>
                </div>
              </div>

              <div style={{ 
                padding: 24, borderRadius: 24, backgroundColor: `${t.colors.brand.primary}05`, 
                border: `1px dashed ${t.colors.brand.primary}40`, fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.6 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: t.colors.brand.primary, marginBottom: 12, fontWeight: 700 }}>
                  <Info size={16} /> Estándares WCAG
                </div>
                <div style={{ display: 'grid', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>AAA (Nivel Superior)</span>
                    <span style={{ fontWeight: 700, color: 'var(--foreground)' }}>7.0:1</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>AA (Base)</span>
                    <span style={{ fontWeight: 700, color: 'var(--foreground)' }}>4.5:1</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>AA Grande ({'>'}18pt)</span>
                    <span style={{ fontWeight: 700, color: 'var(--foreground)' }}>3.0:1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'principles' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, animation: 'fadeIn 0.4s ease-out' }}>
            {[
              { icon: <Monitor size={24} />, title: 'Inclusivo por Diseño', desc: 'Heredamos la excelencia de Radix UI, asegurando que cada componente tenga roles ARIA y manejo de estados nativos.' },
              { icon: <Keyboard size={24} />, title: 'Control Total', desc: 'Tab-index optimizado y focus rings globales de 2px con offset para máxima visibilidad táctil y visual.' },
              { icon: <Activity size={24} />, title: 'Modo Motion-Safe', desc: 'Detectamos "prefers-reduced-motion" para suavizar o eliminar transiciones innecesarias automáticamente.' },
              { icon: <Shield size={24} />, title: 'Navegación Aumentada', desc: 'Soporte completo para lectores de pantalla con etiquetas descriptivas y puntos de salto (Shortcuts).' }
            ].map(p => (
              <div key={p.title} style={{ padding: 32, borderRadius: 24, border: `1px solid var(--border)`, backgroundColor: 'var(--card)', transition: 'all 0.2s hover' }}>
                <div style={{ color: t.colors.brand.primary, marginBottom: 20, backgroundColor: `${t.colors.brand.primary}10`, width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.icon}</div>
                <h4 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 800 }}>{p.title}</h4>
                <p style={{ margin: 0, fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Unified Footer */}
      <div style={{ marginTop: 64, padding: '32px 0', borderTop: `1px solid var(--border)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 13, color: 'var(--muted-foreground)', fontWeight: 500 }}>
          <Shield size={16} style={{ color: t.colors.brand.primary }} /> Khor Guardian v4.0.4 Alpha • Visual Systems Intelligence
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <button style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: 'var(--muted-foreground)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ExternalLink size={14} /> WCAG Guide
          </button>
          <button style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: 'var(--muted-foreground)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            Report Issue
          </button>
        </div>
      </div>
    </div>
  );
}
