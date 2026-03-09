/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR DESIGN SYSTEM — ÁTOMOS             ║
 * ║  Componentes atómicos del sistema.        ║
 * ║  Cada átomo es la unidad más pequeña      ║
 * ║  e indivisible de la interfaz.            ║
 * ║                                           ║
 * ║  Base: Radix UI + Tailwind + Khor Tokens  ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { forwardRef, useState } from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import * as RadixRadio from '@radix-ui/react-radio-group';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import * as RadixProgress from '@radix-ui/react-progress';
import * as RadixSlider from '@radix-ui/react-slider';
import { Check, Minus, Eye, EyeOff, X, Loader2, AlertCircle, CheckCircle, AlertTriangle, Info, Star, XCircle } from 'lucide-react';
import { khorTokens } from '../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ─── KButton ───────────────────────────────── */
export type KButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'navy';
export type KButtonSize = 'sm' | 'md' | 'lg';

export interface KButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: KButtonVariant;
  size?: KButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';
  loading?: boolean;
  block?: boolean;
}

const btnBase: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  borderRadius: t.radius.md,
  fontFamily: font,
  fontWeight: 600,
  cursor: 'pointer',
  border: '1.5px solid transparent',
  transition: 'all 0.15s ease',
  whiteSpace: 'nowrap',
};

const sizeStyles: Record<KButtonSize, React.CSSProperties> = {
  sm: { padding: '4px 12px', fontSize: 12, minHeight: 32 },
  md: { padding: '8px 18px', fontSize: 14, minHeight: 40 },
  lg: { padding: '12px 24px', fontSize: 16, minHeight: 48 },
};

const variantStyles: Record<KButtonVariant, { base: React.CSSProperties; hover: React.CSSProperties; active: React.CSSProperties }> = {
  primary: {
    base: { backgroundColor: t.colors.brand.primary, color: '#fff', borderColor: t.colors.brand.primary },
    hover: { backgroundColor: t.colors.brand.primaryHover },
    active: { backgroundColor: t.colors.brand.primaryActive },
  },
  secondary: {
    base: { backgroundColor: t.colors.neutral[100], color: t.colors.neutral[500], borderColor: t.colors.neutral[200] },
    hover: { backgroundColor: t.colors.neutral[200] },
    active: { backgroundColor: t.colors.neutral[300] },
  },
  outline: {
    base: { backgroundColor: 'transparent', color: t.colors.brand.primary, borderColor: t.colors.brand.primary },
    hover: { backgroundColor: 'rgba(224,77,54,0.06)' },
    active: { backgroundColor: 'rgba(224,77,54,0.12)' },
  },
  ghost: {
    base: { backgroundColor: 'transparent', color: t.colors.neutral[500], borderColor: 'transparent' },
    hover: { backgroundColor: t.colors.neutral[100] },
    active: { backgroundColor: t.colors.neutral[200] },
  },
  danger: {
    base: { backgroundColor: t.colors.feedback.error, color: '#fff', borderColor: t.colors.feedback.error },
    hover: { backgroundColor: '#e64545' },
    active: { backgroundColor: '#b82525' },
  },
  navy: {
    base: { backgroundColor: t.colors.brand.navy, color: '#fff', borderColor: t.colors.brand.navy },
    hover: { backgroundColor: t.colors.brand.navyHover },
    active: { backgroundColor: t.colors.brand.navyActive },
  },
};

export const KButton = forwardRef<HTMLButtonElement, KButtonProps>(function KButton(
  { variant = 'primary', size = 'md', icon, iconPosition = 'start', loading, disabled, block, children, style, className, ...rest },
  ref,
) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const vs = variantStyles[variant];
  const isDisabled = disabled || loading;

  const computed: React.CSSProperties = {
    ...btnBase,
    ...sizeStyles[size],
    ...vs.base,
    ...(hovered && !isDisabled ? vs.hover : {}),
    ...(pressed && !isDisabled ? vs.active : {}),
    ...(block ? { width: '100%' } : {}),
    ...(isDisabled ? { opacity: 0.5, filter: 'grayscale(1)', cursor: 'not-allowed' } : {}),
    ...style,
  };

  const iconEl = loading ? <Loader2 size={size === 'sm' ? 14 : 16} className="animate-spin" /> : icon;

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={className}
      style={computed}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      {...rest}
    >
      {iconEl && iconPosition === 'start' && iconEl}
      {children}
      {iconEl && iconPosition === 'end' && iconEl}
    </button>
  );
});

/* ─── KInput ────────────────────────────────── */
export interface KInputProps {
  size?: KButtonSize;
  placeholder?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  error?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'number' | 'email';
  allowClear?: boolean;
  className?: string;
}

export function KInput({
  size = 'md',
  placeholder,
  prefix,
  suffix,
  error,
  disabled,
  value,
  defaultValue,
  onChange,
  type = 'text',
  allowClear,
  className,
}: KInputProps) {
  const [internal, setInternal] = useState(defaultValue || '');
  const [showPw, setShowPw] = useState(false);
  const [focused, setFocused] = useState(false);
  const val = value !== undefined ? value : internal;
  const isPassword = type === 'password';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternal(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    const synth = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>;
    setInternal('');
    onChange?.(synth);
  };

  const heights: Record<KButtonSize, number> = { sm: 32, md: 40, lg: 48 };

  return (
    <div className={className}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height: heights[size],
          padding: '0 12px',
          borderRadius: t.radius.md,
          border: `1.5px solid ${error ? t.colors.feedback.error : focused ? t.colors.brand.primary : t.colors.neutral[200]}`,
          backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
          fontFamily: font,
          fontSize: size === 'sm' ? 12 : 14,
          transition: 'border-color 0.15s ease',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {prefix && <span style={{ color: t.colors.neutral[300], display: 'flex', flexShrink: 0 }}>{prefix}</span>}
        <input
          type={isPassword && showPw ? 'text' : type}
          placeholder={placeholder}
          value={val}
          onChange={handleChange}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: font,
            fontSize: 'inherit',
            color: t.colors.neutral[900],
            padding: 0,
            width: '100%',
            minWidth: 0,
          }}
        />
        {allowClear && val && !disabled && (
          <button onClick={handleClear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[300], display: 'flex', padding: 0 }}>
            <X size={14} />
          </button>
        )}
        {isPassword && (
          <button onClick={() => setShowPw(!showPw)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[300], display: 'flex', padding: 0 }}>
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
        {suffix && <span style={{ color: t.colors.neutral[300], display: 'flex', flexShrink: 0 }}>{suffix}</span>}
      </div>
      {error && <p style={{ color: t.colors.feedback.error, fontSize: 12, marginTop: 4, margin: '4px 0 0', fontFamily: font }}>{error}</p>}
    </div>
  );
}

/* ─── KTextArea ─────────────────────────────── */
export interface KTextAreaProps {
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  maxLength?: number;
  showCount?: boolean;
  className?: string;
}

export function KTextArea({ placeholder, rows = 4, disabled, value, onChange, error, maxLength, showCount, className }: KTextAreaProps) {
  const [internal, setInternal] = useState('');
  const [focused, setFocused] = useState(false);
  const val = value !== undefined ? value : internal;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength && e.target.value.length > maxLength) return;
    setInternal(e.target.value);
    onChange?.(e);
  };

  return (
    <div className={className}>
      <textarea
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        value={val}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: 12,
          borderRadius: t.radius.md,
          border: `1.5px solid ${error ? t.colors.feedback.error : focused ? t.colors.brand.primary : t.colors.neutral[200]}`,
          backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
          fontFamily: font,
          fontSize: 14,
          color: t.colors.neutral[900],
          resize: 'vertical',
          outline: 'none',
          transition: 'border-color 0.15s ease',
          opacity: disabled ? 0.6 : 1,
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        {error && <span style={{ color: t.colors.feedback.error, fontSize: 12, fontFamily: font }}>{error}</span>}
        {!error && <span />}
        {showCount && <span style={{ fontSize: 12, color: t.colors.neutral[300], fontFamily: font }}>{val.length}{maxLength ? `/${maxLength}` : ''}</span>}
      </div>
    </div>
  );
}

/* ─── KBadge ────────────────────────────────── */
export type KBadgeStatus = 'success' | 'error' | 'warning' | 'info' | 'default';

export interface KBadgeProps {
  status?: KBadgeStatus;
  label: string;
  dot?: boolean;
  className?: string;
}

const badgeColorMap: Record<KBadgeStatus, { bg: string; text: string; dot: string }> = {
  success: { bg: t.colors.feedback.successLight, text: t.colors.feedback.success, dot: t.colors.feedback.success },
  error: { bg: t.colors.feedback.errorLight, text: t.colors.feedback.error, dot: t.colors.feedback.error },
  warning: { bg: '#FFF3E0', text: '#E65100', dot: t.colors.feedback.warning },
  info: { bg: '#E3F2FD', text: t.colors.brand.navy, dot: t.colors.brand.navy },
  default: { bg: t.colors.neutral[100], text: t.colors.neutral[500], dot: t.colors.neutral[300] },
};

export function KBadge({ status = 'default', label, dot = true, className }: KBadgeProps) {
  const c = badgeColorMap[status];
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '2px 10px', borderRadius: 999,
        backgroundColor: c.bg, color: c.text,
        fontSize: 12, fontWeight: 500, fontFamily: font,
      }}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: c.dot }} />}
      {label}
    </span>
  );
}

/* ─── KTag ──────────────────────────────────── */
export type KTagColor = 'primary' | 'navy' | 'accent' | 'success' | 'error' | 'warning' | 'default';

export interface KTagProps {
  color?: KTagColor;
  closable?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
}

const tagStyleMap: Record<KTagColor, { bg: string; text: string; border: string }> = {
  primary: { bg: 'rgba(224,77,54,0.1)', text: t.colors.brand.primary, border: 'rgba(224,77,54,0.2)' },
  navy: { bg: 'rgba(5,23,88,0.08)', text: t.colors.brand.navy, border: 'rgba(5,23,88,0.15)' },
  accent: { bg: 'rgba(255,149,0,0.1)', text: '#B36800', border: 'rgba(255,149,0,0.2)' },
  success: { bg: t.colors.feedback.successLight, text: t.colors.feedback.success, border: 'rgba(46,125,50,0.2)' },
  error: { bg: t.colors.feedback.errorLight, text: t.colors.feedback.error, border: 'rgba(211,47,47,0.2)' },
  warning: { bg: '#FFF3E0', text: '#E65100', border: 'rgba(255,149,0,0.2)' },
  default: { bg: t.colors.neutral[100], text: t.colors.neutral[500], border: t.colors.neutral[200] },
};

export function KTag({ color = 'default', closable, onClose, children, className }: KTagProps) {
  const s = tagStyleMap[color];
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '2px 10px', borderRadius: 6,
        backgroundColor: s.bg, color: s.text,
        border: `1px solid ${s.border}`,
        fontSize: 12, fontWeight: 500, fontFamily: font,
      }}
    >
      {children}
      {closable && (
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', padding: 0, marginLeft: 2 }}>
          <X size={12} />
        </button>
      )}
    </span>
  );
}

/* ─── KAvatar ───────────────────────────────── */
export interface KAvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

const avatarSizeMap = { sm: 32, md: 40, lg: 56 };
const statusColorMap = {
  online: t.colors.feedback.success,
  offline: t.colors.neutral[300],
  busy: t.colors.feedback.error,
  away: t.colors.feedback.warning,
};

export function KAvatar({ src, name, size = 'md', status, className }: KAvatarProps) {
  const px = avatarSizeMap[size];
  const initials = name ? name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) : '';

  return (
    <div className={className} style={{ position: 'relative', display: 'inline-flex', flexShrink: 0 }}>
      <div
        style={{
          width: px, height: px, borderRadius: '50%',
          backgroundColor: src ? undefined : t.colors.brand.navy,
          backgroundImage: src ? `url(${src})` : undefined,
          backgroundSize: 'cover', backgroundPosition: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: font, fontWeight: 600, fontSize: px * 0.38,
          overflow: 'hidden',
        }}
      >
        {!src && initials}
      </div>
      {status && (
        <span style={{
          position: 'absolute', bottom: 0, right: 0,
          width: size === 'lg' ? 14 : 10, height: size === 'lg' ? 14 : 10,
          borderRadius: '50%',
          backgroundColor: statusColorMap[status],
          border: '2px solid white',
        }} />
      )}
    </div>
  );
}

/* ─── KSwitch ───────────────────────────────── */
export interface KSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  size?: 'default' | 'small';
  className?: string;
}

export function KSwitch({ checked, onChange, disabled, label, size = 'default', className }: KSwitchProps) {
  const w = size === 'small' ? 32 : 40;
  const h = size === 'small' ? 18 : 22;
  const thumb = size === 'small' ? 14 : 18;
  return (
    <label className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <RadixSwitch.Root
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
        style={{
          width: w, height: h, borderRadius: 999, position: 'relative',
          backgroundColor: checked ? t.colors.brand.primary : t.colors.neutral[300],
          border: 'none', padding: 0, cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.15s ease',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <RadixSwitch.Thumb
          style={{
            display: 'block', width: thumb, height: thumb, borderRadius: '50%',
            backgroundColor: '#fff', boxShadow: t.shadows.sm,
            transition: 'transform 0.15s ease',
            transform: checked ? `translateX(${w - thumb - 2}px)` : 'translateX(2px)',
          }}
        />
      </RadixSwitch.Root>
      {label && <span style={{ fontSize: 14, color: disabled ? t.colors.neutral[300] : t.colors.neutral[900], fontFamily: font }}>{label}</span>}
    </label>
  );
}

/* ─── KCheckbox ─────────────────────────────── */
export interface KCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  indeterminate?: boolean;
  label?: string;
  className?: string;
}

export function KCheckbox({ checked, onChange, disabled, indeterminate, label, className }: KCheckboxProps) {
  const state = indeterminate ? 'indeterminate' : checked;
  return (
    <label className={className} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
      <RadixCheckbox.Root
        checked={state}
        onCheckedChange={(v) => onChange?.(v === true)}
        disabled={disabled}
        style={{
          width: 18, height: 18, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1.5px solid ${checked || indeterminate ? t.colors.brand.primary : t.colors.neutral[300]}`,
          backgroundColor: checked || indeterminate ? t.colors.brand.primary : 'transparent',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.15s ease', flexShrink: 0,
        }}
      >
        <RadixCheckbox.Indicator>
          {indeterminate ? <Minus size={12} color="#fff" strokeWidth={3} /> : <Check size={12} color="#fff" strokeWidth={3} />}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && <span style={{ fontSize: 14, color: t.colors.neutral[900], fontFamily: font }}>{label}</span>}
    </label>
  );
}

/* ─── KRadio ────────────────────────────────── */
export interface KRadioProps {
  options: { label: string; value: string | number }[];
  value?: string | number;
  onChange?: (value: string) => void;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  variant?: 'default' | 'button';
  className?: string;
}

export function KRadio({ options, value, onChange, disabled, direction = 'horizontal', variant = 'default', className }: KRadioProps) {
  if (variant === 'button') {
    return (
      <div className={className} style={{ display: 'inline-flex', borderRadius: t.radius.md, overflow: 'hidden', border: `1px solid ${t.colors.neutral[200]}` }}>
        {options.map((opt) => {
          const active = String(value) === String(opt.value);
          return (
            <button
              key={opt.value}
              onClick={() => !disabled && onChange?.(String(opt.value))}
              disabled={disabled}
              style={{
                padding: '6px 16px', fontSize: 13, fontWeight: 500, fontFamily: font,
                border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
                backgroundColor: active ? t.colors.brand.primary : t.colors.neutral[50],
                color: active ? '#fff' : t.colors.neutral[500],
                transition: 'all 0.15s ease',
                borderRight: `1px solid ${t.colors.neutral[200]}`,
              }}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <RadixRadio.Root
      value={value !== undefined ? String(value) : undefined}
      onValueChange={onChange}
      disabled={disabled}
      className={className}
      style={{ display: 'flex', flexDirection: direction === 'vertical' ? 'column' : 'row', gap: direction === 'vertical' ? 8 : 16 }}
    >
      {options.map((opt) => (
        <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: disabled ? 'not-allowed' : 'pointer' }}>
          <RadixRadio.Item
            value={String(opt.value)}
            style={{
              width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${t.colors.neutral[300]}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0,
              backgroundColor: 'transparent', cursor: disabled ? 'not-allowed' : 'pointer',
            }}
          >
            <RadixRadio.Indicator>
              <span style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: t.colors.brand.primary, display: 'block' }} />
            </RadixRadio.Indicator>
          </RadixRadio.Item>
          <span style={{ fontSize: 14, color: t.colors.neutral[900], fontFamily: font }}>{opt.label}</span>
        </label>
      ))}
    </RadixRadio.Root>
  );
}

/* ─── KTooltip ──────────────────────────────── */
export interface KTooltipProps {
  title: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  className?: string;
}

export function KTooltip({ title, placement = 'top', children, className }: KTooltipProps) {
  const sideMap = { top: 'top' as const, bottom: 'bottom' as const, left: 'left' as const, right: 'right' as const };
  return (
    <RadixTooltip.Provider delayDuration={200}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild className={className}>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={sideMap[placement]}
            sideOffset={6}
            style={{
              padding: '6px 12px', borderRadius: t.radius.sm,
              backgroundColor: t.colors.brand.navy, color: '#fff',
              fontSize: 12, fontFamily: font, boxShadow: t.shadows.md,
              maxWidth: 260, lineHeight: 1.4, zIndex: 9999,
            }}
          >
            {title}
            <RadixTooltip.Arrow style={{ fill: t.colors.brand.navy }} />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

/* ─── KProgress ─────────────────────────────── */
export interface KProgressProps {
  percent: number;
  status?: 'success' | 'exception' | 'active' | 'normal';
  size?: 'small' | 'default';
  showInfo?: boolean;
  strokeColor?: string;
  className?: string;
}

export function KProgress({ percent, status, size = 'default', showInfo = true, strokeColor, className }: KProgressProps) {
  const color = status === 'success' ? t.colors.feedback.success
    : status === 'exception' ? t.colors.feedback.error
    : strokeColor || t.colors.brand.primary;
  const h = size === 'small' ? 4 : 8;

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: font }}>
      <RadixProgress.Root
        value={percent}
        style={{ flex: 1, height: h, borderRadius: 99, backgroundColor: t.colors.neutral[100], overflow: 'hidden' }}
      >
        <RadixProgress.Indicator
          style={{
            width: `${Math.min(100, Math.max(0, percent))}%`,
            height: '100%', borderRadius: 99,
            backgroundColor: color,
            transition: 'width 0.4s ease',
          }}
        />
      </RadixProgress.Root>
      {showInfo && <span style={{ fontSize: 12, color: t.colors.neutral[400], minWidth: 36, textAlign: 'right' }}>{Math.round(percent)}%</span>}
    </div>
  );
}

/* ─── KText (KTypography) ───────────────────── */
export interface KTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body-lg' | 'body-md' | 'small' | 'caption';
  color?: 'default' | 'secondary' | 'primary' | 'navy' | 'success' | 'error' | 'muted';
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

const textColorMap: Record<string, string> = {
  default: t.colors.neutral[900],
  secondary: t.colors.neutral[500],
  primary: t.colors.brand.primary,
  navy: t.colors.brand.navy,
  success: t.colors.feedback.success,
  error: t.colors.feedback.error,
  muted: t.colors.neutral[300],
};

const textStyleMap: Record<string, React.CSSProperties> = {
  h1: { fontSize: 38, fontWeight: 700, lineHeight: 1.2 },
  h2: { fontSize: 30, fontWeight: 700, lineHeight: 1.2 },
  h3: { fontSize: 24, fontWeight: 600, lineHeight: 1.3 },
  'body-lg': { fontSize: 16, fontWeight: 400, lineHeight: 1.5 },
  'body-md': { fontSize: 14, fontWeight: 400, lineHeight: 1.5 },
  small: { fontSize: 12, fontWeight: 500, lineHeight: 1.5 },
  caption: { fontSize: 11, fontWeight: 400, lineHeight: 1.4 },
};

export function KText({ variant = 'body-md', color = 'default', children, className, as }: KTextProps) {
  const tagMap: Record<string, keyof JSX.IntrinsicElements> = {
    h1: 'h1', h2: 'h2', h3: 'h3', 'body-lg': 'p', 'body-md': 'p', small: 'span', caption: 'span',
  };
  const Tag = (as || tagMap[variant]) as any;
  return (
    <Tag
      className={className}
      style={{ ...textStyleMap[variant], color: textColorMap[color], fontFamily: font, margin: 0 }}
    >
      {children}
    </Tag>
  );
}

/* ─── KDivider ──────────────────────────────── */
export function KDivider({ className }: { className?: string }) {
  return <div className={className} style={{ height: 1, backgroundColor: t.colors.neutral[200], width: '100%' }} />;
}

/* ─── KAlert ────────────────────────────────── */
export type KAlertType = 'success' | 'error' | 'warning' | 'info';

export interface KAlertProps {
  type?: KAlertType;
  title: string;
  description?: string;
  closable?: boolean;
  onClose?: () => void;
  showIcon?: boolean;
  className?: string;
}

const alertConfig: Record<KAlertType, { bg: string; border: string; text: string; icon: React.ReactNode }> = {
  success: { bg: t.colors.feedback.successLight, border: 'rgba(46,125,50,0.25)', text: t.colors.feedback.success, icon: <CheckCircle size={18} /> },
  error: { bg: t.colors.feedback.errorLight, border: 'rgba(211,47,47,0.25)', text: t.colors.feedback.error, icon: <XCircle size={18} /> },
  warning: { bg: '#FFF3E0', border: 'rgba(255,149,0,0.25)', text: '#E65100', icon: <AlertTriangle size={18} /> },
  info: { bg: '#E3F2FD', border: 'rgba(5,23,88,0.15)', text: t.colors.brand.navy, icon: <Info size={18} /> },
};

export function KAlert({ type = 'info', title, description, closable, onClose, showIcon = true, className }: KAlertProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  const c = alertConfig[type];

  const handleClose = () => { setVisible(false); onClose?.(); };

  return (
    <div className={className} style={{
      display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px',
      borderRadius: t.radius.md, backgroundColor: c.bg, border: `1px solid ${c.border}`, fontFamily: font,
    }}>
      {showIcon && <span style={{ color: c.text, flexShrink: 0, marginTop: 1 }}>{c.icon}</span>}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: c.text }}>{title}</div>
        {description && <div style={{ fontSize: 13, color: c.text, opacity: 0.85, marginTop: 2, lineHeight: 1.5 }}>{description}</div>}
      </div>
      {closable && (
        <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: c.text, opacity: 0.6, display: 'flex', padding: 0 }}>
          <X size={16} />
        </button>
      )}
    </div>
  );
}

/* ─── KSkeleton ─────────────────────────────── */
export interface KSkeletonProps {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  lines?: number;
  className?: string;
}

export function KSkeleton({ width = '100%', height = 16, circle, lines, className }: KSkeletonProps) {
  if (lines) {
    return (
      <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="animate-pulse" style={{
            width: i === lines - 1 ? '60%' : '100%', height,
            borderRadius: t.radius.sm, backgroundColor: t.colors.neutral[200],
          }} />
        ))}
      </div>
    );
  }

  return (
    <div className={`animate-pulse ${className || ''}`} style={{
      width: circle ? height : width, height,
      borderRadius: circle ? '50%' : t.radius.sm,
      backgroundColor: t.colors.neutral[200],
    }} />
  );
}

/* ─── KSlider ───────────────────────────────── */
export interface KSliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  showValue?: boolean;
  className?: string;
}

export function KSlider({ value, defaultValue = 50, min = 0, max = 100, step = 1, onChange, disabled, showValue = true, className }: KSliderProps) {
  const [internal, setInternal] = useState(defaultValue);
  const val = value !== undefined ? value : internal;

  const handleChange = (v: number[]) => { setInternal(v[0]); onChange?.(v[0]); };

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: font }}>
      <RadixSlider.Root
        value={[val]}
        min={min} max={max} step={step}
        onValueChange={handleChange}
        disabled={disabled}
        style={{
          position: 'relative', display: 'flex', alignItems: 'center',
          width: '100%', height: 20, cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        <RadixSlider.Track style={{
          position: 'relative', flexGrow: 1, height: 4,
          borderRadius: 99, backgroundColor: t.colors.neutral[200],
        }}>
          <RadixSlider.Range style={{
            position: 'absolute', height: '100%', borderRadius: 99,
            backgroundColor: t.colors.brand.primary,
          }} />
        </RadixSlider.Track>
        <RadixSlider.Thumb style={{
          display: 'block', width: 18, height: 18, borderRadius: '50%',
          backgroundColor: '#fff', border: `2px solid ${t.colors.brand.primary}`,
          boxShadow: t.shadows.sm, cursor: disabled ? 'not-allowed' : 'grab',
          outline: 'none',
        }} />
      </RadixSlider.Root>
      {showValue && <span style={{ fontSize: 13, color: t.colors.neutral[500], minWidth: 32, textAlign: 'right', fontWeight: 500 }}>{val}</span>}
    </div>
  );
}

/* ─── KRate ──────────────────────────────────── */
export interface KRateProps {
  value?: number;
  defaultValue?: number;
  count?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  size?: number;
  className?: string;
}

export function KRate({ value, defaultValue = 0, count = 5, onChange, disabled, size = 20, className }: KRateProps) {
  const [internal, setInternal] = useState(defaultValue);
  const [hoverVal, setHoverVal] = useState(0);
  const val = value !== undefined ? value : internal;

  const handleClick = (i: number) => {
    if (disabled) return;
    const newVal = i + 1;
    setInternal(newVal);
    onChange?.(newVal);
  };

  return (
    <div className={className} style={{ display: 'inline-flex', gap: 4, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      {Array.from({ length: count }).map((_, i) => {
        const filled = (hoverVal || val) > i;
        return (
          <button
            key={i}
            onClick={() => handleClick(i)}
            onMouseEnter={() => !disabled && setHoverVal(i + 1)}
            onMouseLeave={() => setHoverVal(0)}
            disabled={disabled}
            style={{
              background: 'none', border: 'none', padding: 0, cursor: disabled ? 'not-allowed' : 'pointer',
              color: filled ? t.colors.brand.accent : t.colors.neutral[200],
              transition: 'color 0.1s ease', display: 'flex',
            }}
          >
            <Star size={size} fill={filled ? 'currentColor' : 'none'} strokeWidth={1.5} />
          </button>
        );
      })}
    </div>
  );
}

/* ─── KSpin ─────────────────────────────────── */
export interface KSpinProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  tip?: string;
  className?: string;
}

export function KSpin({ size = 'md', color = t.colors.brand.primary, tip, className }: KSpinProps) {
  const px = { sm: 16, md: 24, lg: 36 }[size];
  return (
    <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <Loader2 size={px} color={color} className="animate-spin" strokeWidth={2.5} />
      {tip && <span style={{ fontSize: 12, color: t.colors.neutral[400], fontFamily: font }}>{tip}</span>}
    </div>
  );
}