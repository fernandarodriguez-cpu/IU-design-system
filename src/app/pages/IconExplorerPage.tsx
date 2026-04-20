import React, { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { khorTokens } from '../theme/khor-theme';
import { KIcon } from '../components/design-system/atoms/KIcon/index';

/**
 * ╔═══════════════════════════════════════════════╗
 * ║  KHOR ICON EXPLORER (v4.1.1 STABLE)           ║
 * ║  Buscador y galería de la librería Lucide     ║
 * ╚═══════════════════════════════════════════════╝
 */

export const IconExplorerPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'>('md');

  // Hardened Registry
  const allIcons = useMemo(() => {
    try {
      return Object.keys(LucideIcons || {})
        .filter(key => {
          // Strict check: Must start with Uppercase, not be a utility, and must be a component (function or object with render)
          const item = (LucideIcons as any)[key];
          const isComp = typeof item === 'function' || (typeof item === 'object' && item !== null && 'render' in item);
          return /^[A-Z]/.test(key) && isComp && !['LucideIcon', 'LucideProps', 'createLucideIcon', 'default'].includes(key);
        })
        .map(key => ({ name: key }))
        .sort((a, b) => a.name.localeCompare(b.name)) || [];
    } catch (e) {
      console.error('[KhorIconExplorer] Critical Registry Error:', e);
      return [];
    }
  }, []);

  const filteredIcons = useMemo(() => {
    const list = allIcons || [];
    if (!searchTerm) return list;
    const s = searchTerm.toLowerCase();
    return list.filter(i => i.name.toLowerCase().includes(s));
  }, [searchTerm, allIcons]);

  const handleCopy = (name: string) => {
    try {
      navigator.clipboard.writeText(name);
      setCopiedIcon(name);
      setTimeout(() => setCopiedIcon(null), 2000);
    } catch (e) {
      console.log('Copy failed');
    }
  };

  const SearchIcon = (LucideIcons as any).Search;
  const InfoIcon = (LucideIcons as any).Info;
  const CheckIcon = (LucideIcons as any).Check;

  return (
    <div style={{ padding: '24px 0' }}>
      <header style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--foreground)', marginBottom: 12 }}>
          Explorador de Iconos Lucide
        </h1>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 16, maxWidth: 800, lineHeight: 1.6 }}>
          Khor v4.1.1 — Sistema de iconografía sistémico. Escala Elite (XS - XXL).
        </p>

        <div style={{ 
          marginTop: 24, padding: 16, border: `1px solid rgba(224, 77, 54, 0.1)`,
          backgroundColor: 'rgba(224, 77, 54, 0.05)', borderRadius: khorTokens.radius.lg,
          display: 'flex', gap: 16, alignItems: 'center'
        }}>
          {InfoIcon && <InfoIcon style={{ color: khorTokens.colors.brand.primary }} size={24} />}
          <div>
            <div style={{ fontWeight: 700, color: 'var(--foreground)', fontSize: 14 }}>Integración v4.1.1</div>
            <div style={{ color: 'var(--muted-foreground)', fontSize: 13 }}>
              Usa <code>&lt;KIcon name="IconName" size="md" /&gt;</code> para mantener la escala sistémica.
            </div>
          </div>
        </div>
      </header>

      <div style={{ 
        position: 'sticky', top: 0, zIndex: 50, backgroundColor: 'var(--background)', 
        padding: '16px 0', borderBottom: '1px solid var(--border)', marginBottom: 32,
        display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 300 }}>
          {SearchIcon && <SearchIcon size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)' }} />}
          <input
            type="text"
            placeholder={`Buscar entre más de ${allIcons.length} iconos...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '12px 16px 12px 48px', borderRadius: khorTokens.radius.md,
              border: '1px solid var(--border)', backgroundColor: 'var(--card)', color: 'var(--foreground)'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted-foreground)' }}>ESCALA:</span>
          <div style={{ display: 'flex', backgroundColor: 'var(--muted)', padding: 4, borderRadius: 8 }}>
            {(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const).map(sz => (
              <button
                key={sz}
                onClick={() => setSelectedSize(sz)}
                style={{
                  padding: '6px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 700,
                  backgroundColor: selectedSize === sz ? 'var(--background)' : 'transparent',
                  color: selectedSize === sz ? khorTokens.colors.brand.primary : 'var(--muted-foreground)',
                }}
              >
                {sz.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 16 }}>
        {filteredIcons.slice(0, 1500).map((icon) => (
          <button
            key={icon.name}
            onClick={() => handleCopy(icon.name)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              padding: 24, backgroundColor: 'var(--card)', borderRadius: khorTokens.radius.lg,
              border: `1px solid ${copiedIcon === icon.name ? khorTokens.colors.brand.primary : 'var(--border)'}`,
              cursor: 'pointer', transition: 'all 0.2s ease', position: 'relative', minHeight: 110
            }}
          >
            <div style={{ marginBottom: 12, color: copiedIcon === icon.name ? khorTokens.colors.brand.primary : 'var(--foreground)' }}>
              <KIcon name={icon.name as any} size={selectedSize} />
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--muted-foreground)', maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {icon.name}
            </span>
            {copiedIcon === icon.name && CheckIcon && (
              <div style={{ position: 'absolute', top: 8, right: 8, color: khorTokens.colors.brand.primary }}>
                <CheckIcon size={14} />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IconExplorerPage;
