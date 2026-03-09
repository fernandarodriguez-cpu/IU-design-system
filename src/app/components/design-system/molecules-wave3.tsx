/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR DESIGN SYSTEM — MOLÉCULAS Wave 3   ║
 * ║  Componentes finales integrados desde     ║
 * ║  /Elements: cascader, color-picker,       ║
 * ║  statistic, time-picker, mentions,        ║
 * ║  anchor, list, notification, tag-ext,     ║
 * ║  steps-ext, typography-ext, divider-ext,  ║
 * ║  tree-select, transfer                    ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import {
  ChevronRight, ChevronDown, Check, Search, X, Clock,
  TrendingUp, TrendingDown, Copy, Bell, CheckCircle,
  AlertCircle, Info, AlertTriangle, ChevronLeft,
} from 'lucide-react';
import { khorTokens } from '../../theme/khor-theme';
import { KButton, KText, KCheckbox } from './atoms';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══ KCascader ═══ */
export interface KCascaderOption {
  value: string;
  label: string;
  children?: KCascaderOption[];
  disabled?: boolean;
}

export interface KCascaderProps {
  options: KCascaderOption[];
  value?: string[];
  onChange?: (value: string[], selectedOptions: KCascaderOption[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function KCascader({ options, value = [], onChange, placeholder = 'Seleccionar...', disabled, className }: KCascaderProps) {
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState<KCascaderOption[][]>([options]);
  const [selected, setSelected] = useState<KCascaderOption[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  const handleSelect = (opt: KCascaderOption, level: number) => {
    const newSelected = [...selected.slice(0, level), opt];
    setSelected(newSelected);
    if (opt.children?.length) {
      setPath([...path.slice(0, level + 1), opt.children]);
    } else {
      const vals = newSelected.map((o) => o.value);
      onChange?.(vals, newSelected);
      setOpen(false);
    }
  };

  const displayLabel = selected.map((o) => o.label).join(' / ') || placeholder;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={wrapRef} className={className} style={{ position: 'relative' }}>
      <button onClick={() => !disabled && setOpen(!open)} disabled={disabled} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
        height: 40, padding: '0 12px', borderRadius: t.radius.md,
        border: `1.5px solid ${open ? t.colors.brand.primary : t.colors.neutral[200]}`,
        backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
        fontFamily: font, fontSize: 14, cursor: disabled ? 'not-allowed' : 'pointer',
        color: selected.length ? t.colors.neutral[900] : t.colors.neutral[300],
      }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayLabel}</span>
        <ChevronDown size={16} color={t.colors.neutral[300]} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, marginTop: 4,
          display: 'flex', backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md, zIndex: 50, overflow: 'hidden',
        }}>
          {path.map((levelOpts, level) => (
            <div key={level} style={{ minWidth: 160, maxHeight: 240, overflowY: 'auto', borderRight: level < path.length - 1 ? `1px solid ${t.colors.neutral[200]}` : 'none' }}>
              {levelOpts.map((opt) => {
                const isSelected = selected[level]?.value === opt.value;
                return (
                  <button key={opt.value} onClick={() => !opt.disabled && handleSelect(opt, level)} disabled={opt.disabled} style={{
                    width: '100%', padding: '8px 12px', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: isSelected ? 'rgba(224,77,54,0.06)' : 'transparent', fontFamily: font, fontSize: 14,
                    color: opt.disabled ? t.colors.neutral[300] : t.colors.neutral[900], cursor: opt.disabled ? 'not-allowed' : 'pointer',
                  }}
                    onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = t.colors.neutral[100] as string; }}
                    onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.backgroundColor = isSelected ? 'rgba(224,77,54,0.06)' : 'transparent'; }}
                  >
                    <span>{opt.label}</span>
                    {opt.children?.length ? <ChevronRight size={14} color={t.colors.neutral[300]} /> : isSelected ? <Check size={14} color={t.colors.brand.primary} /> : null}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══ KStatistic ═══ */
export interface KStatisticProps {
  title?: React.ReactNode;
  value: number | string;
  precision?: number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  trend?: 'up' | 'down';
  trendValue?: number | string;
  loading?: boolean;
  className?: string;
}

export function KStatistic({ title, value, precision = 0, prefix, suffix, trend, trendValue, loading, className }: KStatisticProps) {
  const formattedValue = typeof value === 'number' ? value.toLocaleString('es-MX', { minimumFractionDigits: precision, maximumFractionDigits: precision }) : value;

  return (
    <div className={className} style={{ fontFamily: font }}>
      {title && <div style={{ fontSize: 13, color: t.colors.neutral[400], marginBottom: 4 }}>{title}</div>}
      {loading ? (
        <div className="animate-pulse" style={{ height: 32, width: 100, borderRadius: 4, backgroundColor: t.colors.neutral[200] }} />
      ) : (
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
          {prefix && <span style={{ fontSize: 24, color: t.colors.neutral[400] }}>{prefix}</span>}
          <span style={{ fontSize: 30, fontWeight: 700, color: t.colors.neutral[900], lineHeight: 1 }}>{formattedValue}</span>
          {suffix && <span style={{ fontSize: 14, color: t.colors.neutral[400] }}>{suffix}</span>}
        </div>
      )}
      {trend && trendValue && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 13 }}>
          {trend === 'up' ? <TrendingUp size={14} color={t.colors.feedback.success} /> : <TrendingDown size={14} color={t.colors.feedback.error} />}
          <span style={{ color: trend === 'up' ? t.colors.feedback.success : t.colors.feedback.error, fontWeight: 500 }}>{trendValue}</span>
        </div>
      )}
    </div>
  );
}

/* ═══ KTimePicker ═══ */
export interface KTimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  placeholder?: string;
  disabled?: boolean;
  format?: '12h' | '24h';
  className?: string;
}

export function KTimePicker({ value, onChange, placeholder = 'Seleccionar hora', disabled, format = '24h', className }: KTimePickerProps) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={className} style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 12px',
      borderRadius: t.radius.md, border: `1.5px solid ${focused ? t.colors.brand.primary : t.colors.neutral[200]}`,
      backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
      transition: 'border-color 0.15s',
    }}>
      <Clock size={16} color={t.colors.neutral[300]} />
      <input
        type="time" value={value} onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        placeholder={placeholder} disabled={disabled}
        style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', fontFamily: font, fontSize: 14, color: value ? t.colors.neutral[900] : t.colors.neutral[300] }}
      />
    </div>
  );
}

/* ═══ KMentions ═══ */
export interface KMentionOption { value: string; label: string; avatar?: string; }

export interface KMentionsProps {
  value?: string;
  onChange?: (value: string) => void;
  options: KMentionOption[];
  placeholder?: string;
  trigger?: string;
  className?: string;
}

export function KMentions({ value: ctrlValue, onChange, options, placeholder = 'Escribe @ para mencionar...', trigger = '@', className }: KMentionsProps) {
  const [internal, setInternal] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [search, setSearch] = useState('');
  const val = ctrlValue !== undefined ? ctrlValue : internal;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const filtered = options.filter((o) => !search || o.label.toLowerCase().includes(search.toLowerCase()));

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setInternal(v);
    onChange?.(v);
    const lastAt = v.lastIndexOf(trigger);
    if (lastAt >= 0 && lastAt === v.length - 1) { setShowSuggestions(true); setSearch(''); }
    else if (lastAt >= 0) { const after = v.slice(lastAt + 1); if (!after.includes(' ')) { setShowSuggestions(true); setSearch(after); } else setShowSuggestions(false); }
    else setShowSuggestions(false);
  };

  const handleSelect = (opt: KMentionOption) => {
    const lastAt = val.lastIndexOf(trigger);
    const newVal = val.slice(0, lastAt) + `${trigger}${opt.label} `;
    setInternal(newVal);
    onChange?.(newVal);
    setShowSuggestions(false);
    textareaRef.current?.focus();
  };

  return (
    <div className={className} style={{ position: 'relative' }}>
      <textarea
        ref={textareaRef} value={val} onChange={handleChange} placeholder={placeholder} rows={3}
        style={{
          width: '100%', padding: 12, borderRadius: t.radius.md,
          border: `1.5px solid ${t.colors.neutral[200]}`,
          fontFamily: font, fontSize: 14, color: t.colors.neutral[900],
          resize: 'vertical', outline: 'none', backgroundColor: t.colors.neutral[50],
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = t.colors.brand.primary as string; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = t.colors.neutral[200] as string; }}
      />
      {showSuggestions && filtered.length > 0 && (
        <div style={{
          position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: 4,
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md,
          zIndex: 50, maxHeight: 160, overflowY: 'auto',
        }}>
          {filtered.map((opt) => (
            <button key={opt.value} onClick={() => handleSelect(opt)} style={{
              width: '100%', padding: '8px 12px', border: 'none', background: 'transparent',
              display: 'flex', alignItems: 'center', gap: 8, fontFamily: font, fontSize: 14,
              color: t.colors.neutral[900], cursor: 'pointer', textAlign: 'left',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = t.colors.neutral[100] as string; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {opt.avatar && <img src={opt.avatar} alt="" style={{ width: 24, height: 24, borderRadius: '50%' }} />}
              <span style={{ fontWeight: 500 }}>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══ KColorPicker ═══ */
export interface KColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  presets?: string[];
  disabled?: boolean;
  className?: string;
}

const defaultColorPresets = [
  '#E04D36', '#051758', '#FF9500', '#2E7D32', '#D32F2F', '#1976D2',
  '#9C27B0', '#00BCD4', '#FF5722', '#795548', '#607D8B', '#E91E63',
  '#4CAF50', '#FF9800', '#3F51B5', '#009688',
];

export function KColorPicker({ value = '#E04D36', onChange, presets = defaultColorPresets, disabled, className }: KColorPickerProps) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>
        <button disabled={disabled} className={className} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 12px',
          borderRadius: t.radius.md, border: `1.5px solid ${t.colors.neutral[200]}`,
          backgroundColor: t.colors.neutral[50], fontFamily: font, fontSize: 14,
          cursor: disabled ? 'not-allowed' : 'pointer', color: t.colors.neutral[900],
        }}>
          <div style={{ width: 20, height: 20, borderRadius: 4, backgroundColor: value, border: `1px solid ${t.colors.neutral[200]}` }} />
          {value}
        </button>
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content sideOffset={8} style={{
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.lg,
          padding: 16, fontFamily: font, zIndex: 100, width: 240,
        }}>
          <div style={{ marginBottom: 12 }}>
            <input type="color" value={value} onChange={(e) => onChange?.(e.target.value)}
              style={{ width: '100%', height: 40, borderRadius: t.radius.md, border: `1px solid ${t.colors.neutral[200]}`, cursor: 'pointer' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: 4 }}>
            {presets.map((c) => (
              <button key={c} onClick={() => onChange?.(c)} title={c} style={{
                width: 24, height: 24, borderRadius: 4, backgroundColor: c,
                border: value === c ? `2px solid ${t.colors.brand.primary}` : `1px solid ${t.colors.neutral[200]}`,
                cursor: 'pointer', transition: 'transform 0.1s',
              }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.2)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
              />
            ))}
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
            <input value={value} onChange={(e) => onChange?.(e.target.value)} maxLength={7}
              style={{ flex: 1, height: 32, padding: '0 8px', borderRadius: t.radius.sm, border: `1px solid ${t.colors.neutral[200]}`, fontFamily: 'monospace', fontSize: 13, outline: 'none' }} />
            <button onClick={() => navigator.clipboard?.writeText(value)} title="Copiar" style={{
              width: 32, height: 32, borderRadius: t.radius.sm, border: `1px solid ${t.colors.neutral[200]}`,
              backgroundColor: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: t.colors.neutral[400],
            }}><Copy size={14} /></button>
          </div>
          <RadixPopover.Arrow style={{ fill: t.colors.neutral[50] }} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

/* ═══ KAnchor ═══ */
export interface KAnchorLink { key: string; title: string; href: string; children?: KAnchorLink[]; }

export interface KAnchorProps {
  items: KAnchorLink[];
  offsetTop?: number;
  className?: string;
}

export function KAnchor({ items, offsetTop = 0, className }: KAnchorProps) {
  const [activeKey, setActiveKey] = useState(items[0]?.key || '');

  useEffect(() => {
    const handleScroll = () => {
      for (const item of [...items].reverse()) {
        const el = document.querySelector(item.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= offsetTop + 20) { setActiveKey(item.key); return; }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items, offsetTop]);

  const handleClick = (href: string, key: string) => {
    const el = document.querySelector(href);
    if (el) { el.scrollIntoView({ behavior: 'smooth' }); setActiveKey(key); }
  };

  return (
    <nav className={className} style={{ fontFamily: font, borderLeft: `2px solid ${t.colors.neutral[200]}`, paddingLeft: 12 }}>
      {items.map((item) => (
        <div key={item.key}>
          <button onClick={() => handleClick(item.href, item.key)} style={{
            display: 'block', padding: '6px 0', border: 'none', background: 'none',
            fontFamily: font, fontSize: 13, cursor: 'pointer', textAlign: 'left',
            color: activeKey === item.key ? t.colors.brand.primary : t.colors.neutral[400],
            fontWeight: activeKey === item.key ? 600 : 400, transition: 'color 0.15s',
          }}>
            {item.title}
          </button>
          {item.children?.map((child) => (
            <button key={child.key} onClick={() => handleClick(child.href, child.key)} style={{
              display: 'block', padding: '4px 0 4px 16px', border: 'none', background: 'none',
              fontFamily: font, fontSize: 12, cursor: 'pointer', textAlign: 'left',
              color: activeKey === child.key ? t.colors.brand.primary : t.colors.neutral[300],
            }}>
              {child.title}
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}

/* ═══ KList ═══ */
export interface KListItem { key: string; title: React.ReactNode; description?: React.ReactNode; avatar?: React.ReactNode; extra?: React.ReactNode; }

export interface KListProps {
  items: KListItem[];
  bordered?: boolean;
  size?: 'sm' | 'md' | 'lg';
  header?: React.ReactNode;
  footer?: React.ReactNode;
  loading?: boolean;
  className?: string;
}

export function KList({ items, bordered, size = 'md', header, footer, loading, className }: KListProps) {
  const paddings = { sm: '8px 12px', md: '12px 16px', lg: '16px 20px' };
  return (
    <div className={className} style={{
      border: bordered ? `1px solid ${t.colors.neutral[200]}` : 'none',
      borderRadius: bordered ? t.radius.lg : 0, fontFamily: font, overflow: 'hidden',
    }}>
      {header && <div style={{ padding: paddings[size], borderBottom: `1px solid ${t.colors.neutral[200]}`, fontWeight: 600, fontSize: 14, color: t.colors.neutral[900] }}>{header}</div>}
      {loading ? (
        Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ padding: paddings[size], borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
            <div className="animate-pulse" style={{ display: 'flex', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: t.colors.neutral[200] }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: 14, width: '60%', borderRadius: 4, backgroundColor: t.colors.neutral[200], marginBottom: 8 }} />
                <div style={{ height: 12, width: '40%', borderRadius: 4, backgroundColor: t.colors.neutral[200] }} />
              </div>
            </div>
          </div>
        ))
      ) : items.map((item) => (
        <div key={item.key} style={{
          padding: paddings[size], borderBottom: `1px solid ${t.colors.neutral[200]}`,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          {item.avatar}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, color: t.colors.neutral[900] }}>{item.title}</div>
            {item.description && <div style={{ fontSize: 13, color: t.colors.neutral[400], marginTop: 2 }}>{item.description}</div>}
          </div>
          {item.extra}
        </div>
      ))}
      {footer && <div style={{ padding: paddings[size], borderTop: `1px solid ${t.colors.neutral[200]}`, fontSize: 13, color: t.colors.neutral[400] }}>{footer}</div>}
    </div>
  );
}

/* ═══ KNotification ═══ */
export type KNotificationType = 'success' | 'error' | 'info' | 'warning';

export interface KNotificationConfig {
  key?: string;
  type?: KNotificationType;
  title: string;
  description?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
  onClose?: () => void;
}

const notifIcons: Record<KNotificationType, React.ReactNode> = {
  success: <CheckCircle size={20} />,
  error: <AlertCircle size={20} />,
  info: <Info size={20} />,
  warning: <AlertTriangle size={20} />,
};

const notifColors: Record<KNotificationType, string> = {
  success: khorTokens.colors.feedback.success,
  error: khorTokens.colors.feedback.error,
  info: khorTokens.colors.brand.navy,
  warning: khorTokens.colors.brand.accent,
};

export function KNotificationContainer() {
  return <div id="khor-notifications" style={{ position: 'fixed', top: 16, right: 16, zIndex: 10000, display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 380 }} />;
}

export function showKNotification(config: KNotificationConfig) {
  const container = document.getElementById('khor-notifications');
  if (!container) return;
  const type = config.type || 'info';
  const el = document.createElement('div');
  el.style.cssText = `padding:16px;border-radius:10px;border:1px solid var(--khor-neutral-200);background:var(--khor-neutral-50);box-shadow:var(--khor-shadow-lg);font-family:Raleway,sans-serif;display:flex;gap:12px;animation:slideInRight 0.3s ease;min-width:300px;`;
  el.innerHTML = `
    <div style="color:${notifColors[type]};flex-shrink:0;margin-top:2px">${(notifIcons[type] as any)}</div>
    <div style="flex:1">
      <div style="font-size:14px;font-weight:600;color:var(--khor-neutral-900)">${config.title}</div>
      ${config.description ? `<div style="font-size:13px;color:var(--khor-neutral-400);margin-top:4px">${config.description}</div>` : ''}
    </div>
  `;
  container.appendChild(el);
  const dur = config.duration ?? 4500;
  if (dur > 0) setTimeout(() => { el.style.opacity = '0'; el.style.transition = 'opacity 0.3s'; setTimeout(() => el.remove(), 300); }, dur);
}

/* ═══ KDividerExtended ═══ */
export interface KDividerExtendedProps {
  children?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  dashed?: boolean;
  className?: string;
}

export function KDividerExtended({ children, orientation = 'horizontal', dashed, className }: KDividerExtendedProps) {
  if (orientation === 'vertical') {
    return <div className={className} style={{ display: 'inline-block', width: 1, height: '1em', backgroundColor: t.colors.neutral[200], margin: '0 8px', verticalAlign: 'middle', borderStyle: dashed ? 'dashed' : 'solid' }} />;
  }
  if (children) {
    return (
      <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '16px 0' }}>
        <div style={{ flex: 1, height: 1, backgroundColor: t.colors.neutral[200], borderStyle: dashed ? 'dashed' : 'solid' }} />
        <span style={{ fontSize: 13, color: t.colors.neutral[400], fontFamily: font, whiteSpace: 'nowrap' }}>{children}</span>
        <div style={{ flex: 1, height: 1, backgroundColor: t.colors.neutral[200], borderStyle: dashed ? 'dashed' : 'solid' }} />
      </div>
    );
  }
  return <div className={className} style={{ height: 1, backgroundColor: t.colors.neutral[200], margin: '16px 0', borderStyle: dashed ? 'dashed' : 'solid' }} />;
}

/* ═══ KTransfer ═══ */
export interface KTransferItem { key: string; label: string; description?: string; disabled?: boolean; }

export interface KTransferProps {
  dataSource: KTransferItem[];
  targetKeys: string[];
  onChange: (targetKeys: string[], direction: 'left' | 'right', moveKeys: string[]) => void;
  titles?: [string, string];
  showSearch?: boolean;
  className?: string;
}

export function KTransfer({ dataSource, targetKeys, onChange, titles = ['Disponible', 'Seleccionado'], showSearch, className }: KTransferProps) {
  const [leftChecked, setLeftChecked] = useState<Set<string>>(new Set());
  const [rightChecked, setRightChecked] = useState<Set<string>>(new Set());
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');

  const leftItems = dataSource.filter((i) => !targetKeys.includes(i.key));
  const rightItems = dataSource.filter((i) => targetKeys.includes(i.key));
  const filteredLeft = leftItems.filter((i) => !leftSearch || i.label.toLowerCase().includes(leftSearch.toLowerCase()));
  const filteredRight = rightItems.filter((i) => !rightSearch || i.label.toLowerCase().includes(rightSearch.toLowerCase()));

  const moveRight = () => {
    const keys = Array.from(leftChecked);
    onChange([...targetKeys, ...keys], 'right', keys);
    setLeftChecked(new Set());
  };
  const moveLeft = () => {
    const keys = Array.from(rightChecked);
    onChange(targetKeys.filter((k) => !keys.includes(k)), 'left', keys);
    setRightChecked(new Set());
  };

  const renderPanel = (items: KTransferItem[], checked: Set<string>, setChecked: (s: Set<string>) => void, title: string, search: string, setSearch: (s: string) => void) => (
    <div style={{ flex: 1, border: `1px solid ${t.colors.neutral[200]}`, borderRadius: t.radius.md, overflow: 'hidden' }}>
      <div style={{ padding: '8px 12px', borderBottom: `1px solid ${t.colors.neutral[200]}`, fontSize: 13, fontWeight: 600, color: t.colors.neutral[900], display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{title}</span>
        <span style={{ fontSize: 12, color: t.colors.neutral[400] }}>{checked.size}/{items.length}</span>
      </div>
      {showSearch && (
        <div style={{ padding: '8px 12px', borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 32, padding: '0 8px', borderRadius: t.radius.sm, border: `1px solid ${t.colors.neutral[200]}` }}>
            <Search size={14} color={t.colors.neutral[300]} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar..."
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 12, fontFamily: font, backgroundColor: 'transparent' }} />
          </div>
        </div>
      )}
      <div style={{ maxHeight: 240, overflowY: 'auto' }}>
        {items.filter((i) => !search || i.label.toLowerCase().includes(search.toLowerCase())).map((item) => (
          <label key={item.key} style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', fontSize: 13, fontFamily: font,
            cursor: item.disabled ? 'not-allowed' : 'pointer', opacity: item.disabled ? 0.5 : 1,
            color: t.colors.neutral[900],
          }}>
            <KCheckbox
              checked={checked.has(item.key)}
              disabled={item.disabled}
              onChange={(v) => { const next = new Set(checked); v ? next.add(item.key) : next.delete(item.key); setChecked(next); }}
            />
            {item.label}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className={className} style={{ display: 'flex', gap: 12, alignItems: 'center', fontFamily: font }}>
      {renderPanel(leftItems, leftChecked, setLeftChecked, titles[0], leftSearch, setLeftSearch)}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <button onClick={moveRight} disabled={leftChecked.size === 0} style={{
          width: 32, height: 32, borderRadius: t.radius.sm, border: `1px solid ${t.colors.neutral[200]}`,
          backgroundColor: leftChecked.size > 0 ? t.colors.brand.primary : 'transparent',
          color: leftChecked.size > 0 ? '#fff' : t.colors.neutral[300], cursor: leftChecked.size > 0 ? 'pointer' : 'not-allowed',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><ChevronRight size={16} /></button>
        <button onClick={moveLeft} disabled={rightChecked.size === 0} style={{
          width: 32, height: 32, borderRadius: t.radius.sm, border: `1px solid ${t.colors.neutral[200]}`,
          backgroundColor: rightChecked.size > 0 ? t.colors.brand.primary : 'transparent',
          color: rightChecked.size > 0 ? '#fff' : t.colors.neutral[300], cursor: rightChecked.size > 0 ? 'pointer' : 'not-allowed',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><ChevronLeft size={16} /></button>
      </div>
      {renderPanel(rightItems, rightChecked, setRightChecked, titles[1], rightSearch, setRightSearch)}
    </div>
  );
}

/* ═══ KTreeSelect ═══ */
export interface KTreeSelectNode { key: string; title: string; children?: KTreeSelectNode[]; disabled?: boolean; }

export interface KTreeSelectProps {
  data: KTreeSelectNode[];
  value?: string;
  onChange?: (value: string, node: KTreeSelectNode) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function KTreeSelect({ data, value, onChange, placeholder = 'Seleccionar...', disabled, className }: KTreeSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const findNode = (nodes: KTreeSelectNode[], key: string): KTreeSelectNode | undefined => {
    for (const n of nodes) {
      if (n.key === key) return n;
      if (n.children) { const found = findNode(n.children, key); if (found) return found; }
    }
  };
  const selectedNode = value ? findNode(data, value) : undefined;

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const renderNodes = (nodes: KTreeSelectNode[], depth: number): React.ReactNode => (
    nodes.map((node) => (
      <div key={node.key}>
        <button
          onClick={() => { if (!node.disabled) { onChange?.(node.key, node); setOpen(false); } }}
          disabled={node.disabled}
          style={{
            width: '100%', padding: '6px 12px', paddingLeft: depth * 16 + 12, border: 'none',
            background: value === node.key ? 'rgba(224,77,54,0.06)' : 'transparent',
            fontFamily: font, fontSize: 13, cursor: node.disabled ? 'not-allowed' : 'pointer',
            color: node.disabled ? t.colors.neutral[300] : t.colors.neutral[900], textAlign: 'left',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
          onMouseEnter={(e) => { if (value !== node.key) e.currentTarget.style.backgroundColor = t.colors.neutral[100] as string; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = value === node.key ? 'rgba(224,77,54,0.06)' : 'transparent'; }}
        >
          {node.title}
          {value === node.key && <Check size={14} color={t.colors.brand.primary} />}
        </button>
        {node.children && renderNodes(node.children, depth + 1)}
      </div>
    ))
  );

  return (
    <div ref={wrapRef} className={className} style={{ position: 'relative' }}>
      <button onClick={() => !disabled && setOpen(!open)} disabled={disabled} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%',
        height: 40, padding: '0 12px', borderRadius: t.radius.md,
        border: `1.5px solid ${open ? t.colors.brand.primary : t.colors.neutral[200]}`,
        backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
        fontFamily: font, fontSize: 14, cursor: disabled ? 'not-allowed' : 'pointer',
        color: selectedNode ? t.colors.neutral[900] : t.colors.neutral[300],
      }}>
        {selectedNode?.title || placeholder}
        <ChevronDown size={16} color={t.colors.neutral[300]} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md,
          zIndex: 50, maxHeight: 280, overflowY: 'auto',
        }}>
          {renderNodes(data, 0)}
        </div>
      )}
    </div>
  );
}
