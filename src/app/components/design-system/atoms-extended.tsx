/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR DESIGN SYSTEM — ÁTOMOS EXT.        ║
 * ║  Átomos adicionales: Wave 3              ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff, Search, X, Plus, Minus, ChevronUp } from 'lucide-react';
import { khorTokens } from '../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══ KButtonGroup ═══ */
export interface KButtonGroupProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function KButtonGroup({ children, className }: KButtonGroupProps) {
  return (
    <div className={className} style={{
      display: 'inline-flex', borderRadius: t.radius.md, overflow: 'hidden',
      border: `1px solid ${t.colors.neutral[200]}`,
    }}>
      {React.Children.map(children, (child, i) => (
        <div key={i} style={{ borderLeft: i > 0 ? `1px solid ${t.colors.neutral[200]}` : 'none' }}>
          {child}
        </div>
      ))}
    </div>
  );
}

/* ═══ KInputPassword ═══ */
export interface KInputPasswordProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export function KInputPassword({ value, onChange, placeholder = 'Contrasena', disabled, error, className }: KInputPasswordProps) {
  const [visible, setVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <div className={className} style={{
      display: 'flex', alignItems: 'center', height: 40, borderRadius: t.radius.md,
      border: `1.5px solid ${error ? t.colors.feedback.error : focused ? t.colors.brand.primary : t.colors.neutral[200]}`,
      backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
      padding: '0 12px', gap: 8, transition: 'border-color 0.15s',
    }}>
      <input
        type={visible ? 'text' : 'password'} value={value} onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder} disabled={disabled}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{ flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent', fontFamily: font, fontSize: 14, color: t.colors.neutral[900] }}
      />
      <button onClick={() => setVisible(!visible)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[300], display: 'flex', padding: 0 }}>
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  );
}

/* ═══ KInputSearch ═══ */
export interface KInputSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  enterButton?: boolean | string;
  loading?: boolean;
  disabled?: boolean;
  allowClear?: boolean;
  className?: string;
}

export function KInputSearch({ value: ctrlValue, onChange, onSearch, placeholder = 'Buscar...', enterButton, loading, disabled, allowClear, className }: KInputSearchProps) {
  const [internal, setInternal] = useState('');
  const val = ctrlValue !== undefined ? ctrlValue : internal;
  const handleChange = (v: string) => { setInternal(v); onChange?.(v); };
  const handleSearch = () => onSearch?.(val);
  return (
    <div className={className} style={{ display: 'flex', borderRadius: t.radius.md, overflow: 'hidden', border: `1.5px solid ${t.colors.neutral[200]}` }}>
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 8, padding: '0 12px', backgroundColor: t.colors.neutral[50] }}>
        <Search size={16} color={t.colors.neutral[300]} />
        <input
          value={val} onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={placeholder} disabled={disabled}
          style={{ flex: 1, border: 'none', outline: 'none', backgroundColor: 'transparent', fontFamily: font, fontSize: 14, color: t.colors.neutral[900], height: 38 }}
        />
        {allowClear && val && <button onClick={() => handleChange('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[300], display: 'flex', padding: 0 }}><X size={14} /></button>}
      </div>
      {enterButton && (
        <button onClick={handleSearch} disabled={disabled || loading} style={{
          padding: '0 16px', backgroundColor: t.colors.brand.primary, color: '#fff', border: 'none',
          fontFamily: font, fontSize: 14, fontWeight: 500, cursor: disabled ? 'not-allowed' : 'pointer',
        }}>
          {loading ? <div className="animate-spin" style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }} /> : typeof enterButton === 'string' ? enterButton : 'Buscar'}
        </button>
      )}
    </div>
  );
}

/* ═══ KFloatButton ═══ */
export interface KFloatButtonProps {
  icon?: React.ReactNode;
  onClick?: () => void;
  tooltip?: string;
  type?: 'primary' | 'default';
  position?: { bottom?: number; right?: number };
  className?: string;
}

export function KFloatButton({ icon = <Plus size={20} />, onClick, tooltip, type = 'primary', position = { bottom: 24, right: 24 }, className }: KFloatButtonProps) {
  return (
    <button
      onClick={onClick} title={tooltip} className={className}
      style={{
        position: 'fixed', bottom: position.bottom, right: position.right, zIndex: 100,
        width: 48, height: 48, borderRadius: '50%', border: 'none',
        backgroundColor: type === 'primary' ? t.colors.brand.primary : t.colors.neutral[50],
        color: type === 'primary' ? '#fff' : t.colors.neutral[500],
        boxShadow: t.shadows.lg, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {icon}
    </button>
  );
}

/* ═══ KAffix ═══ */
export interface KAffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  children: React.ReactNode;
  className?: string;
}

export function KAffix({ offsetTop, offsetBottom, children, className }: KAffixProps) {
  const [affixed, setAffixed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current || !placeholderRef.current) return;
      const rect = placeholderRef.current.getBoundingClientRect();
      if (offsetTop !== undefined) setAffixed(rect.top <= offsetTop);
      else if (offsetBottom !== undefined) setAffixed(window.innerHeight - rect.bottom <= offsetBottom);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offsetTop, offsetBottom]);

  return (
    <>
      <div ref={placeholderRef} style={affixed ? { height: ref.current?.offsetHeight } : undefined} />
      <div ref={ref} className={className} style={affixed ? {
        position: 'fixed', top: offsetTop, bottom: offsetBottom, zIndex: 50,
        left: placeholderRef.current?.getBoundingClientRect().left, width: placeholderRef.current?.offsetWidth,
      } : undefined}>
        {children}
      </div>
    </>
  );
}

/* ═══ KSpace ═══ */
export interface KSpaceProps {
  direction?: 'horizontal' | 'vertical';
  size?: number | 'sm' | 'md' | 'lg';
  wrap?: boolean;
  align?: 'start' | 'center' | 'end' | 'baseline';
  children: React.ReactNode;
  className?: string;
}

export function KSpace({ direction = 'horizontal', size = 'md', wrap, align = 'center', children, className }: KSpaceProps) {
  const gapMap = { sm: 8, md: 16, lg: 24 };
  const gap = typeof size === 'number' ? size : gapMap[size];
  return (
    <div className={className} style={{
      display: 'flex', flexDirection: direction === 'vertical' ? 'column' : 'row',
      gap, flexWrap: wrap ? 'wrap' : undefined, alignItems: align,
    }}>
      {children}
    </div>
  );
}

/* ═══ KImage ═══ */
export interface KImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  fallback?: string;
  preview?: boolean;
  className?: string;
}

export function KImage({ src, alt = '', width, height, fallback, preview = true, className }: KImageProps) {
  const [error, setError] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const displaySrc = error && fallback ? fallback : src;

  return (
    <>
      <div className={className} style={{ position: 'relative', display: 'inline-block', cursor: preview ? 'zoom-in' : 'default' }}
        onClick={() => preview && setShowPreview(true)}>
        <img src={displaySrc} alt={alt} width={width} height={height} onError={() => setError(true)}
          style={{ borderRadius: t.radius.md, objectFit: 'cover', display: 'block' }} />
      </div>
      {showPreview && (
        <div onClick={() => setShowPreview(false)} style={{
          position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 10000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out',
        }}>
          <img src={displaySrc} alt={alt} style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: t.radius.lg }} />
          <button onClick={() => setShowPreview(false)} style={{
            position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.2)', border: 'none',
            borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff',
          }}><X size={20} /></button>
        </div>
      )}
    </>
  );
}

/* ═══ KWatermark ═══ */
export interface KWatermarkProps {
  text: string;
  fontSize?: number;
  color?: string;
  rotate?: number;
  gap?: number;
  children: React.ReactNode;
  className?: string;
}

export function KWatermark({ text, fontSize = 14, color = 'rgba(0,0,0,0.06)', rotate = -22, gap = 120, children, className }: KWatermarkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [bgImage, setBgImage] = useState('');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const size = gap + text.length * fontSize;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.translate(size / 2, size / 2);
    ctx.rotate((rotate * Math.PI) / 180);
    ctx.font = `${fontSize}px Raleway, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(text, 0, 0);
    setBgImage(`url(${canvas.toDataURL()})`);
  }, [text, fontSize, color, rotate, gap]);

  return (
    <div className={className} style={{ position: 'relative' }}>
      {children}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: bgImage, backgroundRepeat: 'repeat',
      }} />
    </div>
  );
}

/* ═══ KQRCode ═══ */
export interface KQRCodeProps {
  value: string;
  size?: number;
  color?: string;
  bgColor?: string;
  className?: string;
}

export function KQRCode({ value, size = 128, color = '#000', bgColor = '#fff', className }: KQRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple QR-like pattern (visual placeholder - real QR needs a library)
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = color;

    // Generate deterministic pattern from value
    const moduleSize = Math.floor(size / 25);
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        const charCode = value.charCodeAt((i * 25 + j) % value.length) || 0;
        if ((charCode + i + j) % 3 !== 0) {
          ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize);
        }
      }
    }
    // Finder patterns (corners)
    const drawFinder = (x: number, y: number) => {
      const s = moduleSize * 7;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, s, s);
      ctx.fillStyle = bgColor;
      ctx.fillRect(x + moduleSize, y + moduleSize, s - moduleSize * 2, s - moduleSize * 2);
      ctx.fillStyle = color;
      ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, s - moduleSize * 4, s - moduleSize * 4);
    };
    drawFinder(0, 0);
    drawFinder(size - moduleSize * 7, 0);
    drawFinder(0, size - moduleSize * 7);
  }, [value, size, color, bgColor]);

  return (
    <div className={className} style={{ display: 'inline-block', padding: 8, backgroundColor: bgColor, borderRadius: t.radius.md, border: `1px solid ${t.colors.neutral[200]}` }}>
      <canvas ref={canvasRef} width={size} height={size} style={{ display: 'block' }} />
      <div style={{ textAlign: 'center', marginTop: 4, fontSize: 10, color: t.colors.neutral[400], fontFamily: font, maxWidth: size, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {value}
      </div>
    </div>
  );
}
