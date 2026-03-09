/**
 * ╔═══════════════════════════════════════════╗
 * ║  KHOR DESIGN SYSTEM — MOLÉCULAS          ║
 * ║  Combinaciones de átomos que forman       ║
 * ║  unidades funcionales reutilizables.      ║
 * ║                                           ║
 * ║  Base: Custom + Radix + Khor Tokens       ║
 * ╚═══════════════════════════════════════════╝
 */
import React, { useState } from 'react';
import { Search, X, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronRight, MoreHorizontal } from 'lucide-react';
import * as RadixPopover from '@radix-ui/react-popover';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { KText, KAvatar, KBadge } from './atoms';
import type { KBadgeStatus, KButtonSize } from './atoms';
import { khorTokens } from '../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ─── KFormField ────────────────────────────── */
export interface KFormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}

export function KFormField({ label, required, error, hint, children, className }: KFormFieldProps) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <label style={{ fontSize: 14, fontWeight: 500, color: t.colors.neutral[900], fontFamily: font }}>
        {label}
        {required && <span style={{ color: t.colors.feedback.error, marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {error && <span style={{ fontSize: 12, color: t.colors.feedback.error, fontFamily: font }}>{error}</span>}
      {!error && hint && <span style={{ fontSize: 12, color: t.colors.neutral[300], fontFamily: font }}>{hint}</span>}
    </div>
  );
}

/* ─── KSearchInput ──────────────────────────── */
export interface KSearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  size?: KButtonSize;
  className?: string;
}

export function KSearchInput({ placeholder = 'Buscar...', value, onChange, onSearch, size = 'md', className }: KSearchInputProps) {
  const [internal, setInternal] = useState(value || '');
  const [focused, setFocused] = useState(false);
  const val = value !== undefined ? value : internal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternal(e.target.value);
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    setInternal('');
    onChange?.('');
  };

  const heights: Record<KButtonSize, number> = { sm: 32, md: 40, lg: 48 };

  return (
    <div
      className={className}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        height: heights[size], padding: '0 12px',
        borderRadius: t.radius.lg, backgroundColor: t.colors.neutral[50],
        border: `1.5px solid ${focused ? t.colors.brand.primary : t.colors.neutral[200]}`,
        transition: 'border-color 0.15s ease', minWidth: 200,
      }}
    >
      <Search size={16} color={t.colors.neutral[300]} strokeWidth={2} />
      <input
        placeholder={placeholder}
        value={val}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch?.(val)}
        style={{
          flex: 1, border: 'none', outline: 'none', background: 'transparent',
          fontFamily: font, fontSize: size === 'sm' ? 12 : 14,
          color: t.colors.neutral[900], padding: 0, minWidth: 0,
        }}
      />
      {val && (
        <button onClick={handleClear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: t.colors.neutral[300], display: 'flex', padding: 0 }}>
          <X size={14} strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

/* ─── KStatCard ─────────────────────────────── */
export interface KStatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  sparkData?: number[];
  icon?: React.ReactNode;
  className?: string;
}

export function KStatCard({ title, value, change, changeLabel, sparkData, icon, className }: KStatCardProps) {
  const isPositive = change !== undefined && change >= 0;
  const TrendIcon = change === undefined ? Minus : isPositive ? TrendingUp : TrendingDown;
  const trendColor = change === undefined
    ? t.colors.neutral[300]
    : isPositive ? t.colors.feedback.success : t.colors.feedback.error;

  const chartData = sparkData?.map((v, i) => ({ i, v }));

  return (
    <div
      className={className}
      style={{
        backgroundColor: t.colors.neutral[50], borderRadius: t.radius.lg,
        padding: t.spacing.lg, boxShadow: t.shadows.sm,
        display: 'flex', flexDirection: 'column', gap: 12,
        fontFamily: font, minWidth: 200, border: `1px solid ${t.colors.neutral[200]}`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <KText variant="small" color="secondary">{title}</KText>
        {icon && <span style={{ color: t.colors.neutral[300] }}>{icon}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
        <span style={{ fontSize: 28, fontWeight: 700, color: t.colors.neutral[900], lineHeight: 1 }}>{value}</span>
        {change !== undefined && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 12, color: trendColor, fontWeight: 500 }}>
            <TrendIcon size={14} strokeWidth={2} />
            {Math.abs(change)}%
          </span>
        )}
      </div>
      {changeLabel && <KText variant="caption" color="muted">{changeLabel}</KText>}
      {chartData && chartData.length > 0 && (
        <div style={{ width: '100%', height: 40, minWidth: 60 }}>
          <ResponsiveContainer width="100%" height={40}>
            <LineChart data={chartData}>
              <Line type="monotone" dataKey="v" stroke={trendColor} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

/* ─── KNavItem ──────────────────────────────── */
export interface KNavItemProps {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
  collapsed?: boolean;
  className?: string;
}

export function KNavItem({ icon, label, active, badge, onClick, collapsed, className }: KNavItemProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      className={className}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: collapsed ? 0 : 10,
        justifyContent: collapsed ? 'center' : 'flex-start',
        width: '100%', padding: collapsed ? '10px' : '0 16px',
        borderRadius: 0, border: 'none', cursor: 'pointer',
        fontFamily: font, fontSize: 12,
        fontWeight: active ? 600 : 400,
        color: active ? '#FFFFFF' : hovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)',
        backgroundColor: active ? '#202f73' : hovered ? 'rgba(255,255,255,0.06)' : 'transparent',
        transition: 'all 0.15s ease',
        position: 'relative',
        height: 40,
        lineHeight: '40px',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', color: active ? '#FFFFFF' : 'rgba(255,255,255,0.7)' }}>
        {icon}
      </span>
      {!collapsed && <span style={{ flex: 1, textAlign: 'left', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>}
      {!collapsed && badge !== undefined && badge > 0 && (
        <span style={{
          backgroundColor: t.colors.brand.primary, color: '#fff',
          fontSize: 10, fontWeight: 600, padding: '1px 6px',
          borderRadius: 99, minWidth: 18, textAlign: 'center',
        }}>
          {badge}
        </span>
      )}
      {/* Indicador visual activo — barra roja derecha */}
      {active && (
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: 4,
          backgroundColor: '#E04D36', borderRadius: '2px 0 0 2px',
        }} />
      )}
    </button>
  );
}

/* ─── KSelectField ──────────────────────────── */
export interface KSelectFieldProps {
  label?: string;
  placeholder?: string;
  options: { label: string; value: string | number }[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function KSelectField({ label, placeholder, options, value, onChange, required, error, disabled, className }: KSelectFieldProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const selectedLabel = options.find((o) => String(o.value) === String(value))?.label;

  return (
    <KFormField label={label || ''} required={required} error={error} className={className}>
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => !disabled && setOpen(!open)}
          onFocus={() => setFocused(true)}
          onBlur={() => { setFocused(false); setTimeout(() => setOpen(false), 150); }}
          disabled={disabled}
          style={{
            width: '100%', height: 40, padding: '0 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderRadius: t.radius.md,
            border: `1.5px solid ${error ? t.colors.feedback.error : focused ? t.colors.brand.primary : t.colors.neutral[200]}`,
            backgroundColor: disabled ? t.colors.neutral[100] : t.colors.neutral[50],
            fontFamily: font, fontSize: 14, cursor: disabled ? 'not-allowed' : 'pointer',
            color: selectedLabel ? t.colors.neutral[900] : t.colors.neutral[300],
            transition: 'border-color 0.15s ease',
          }}
        >
          <span>{selectedLabel || placeholder || 'Seleccionar...'}</span>
          <ChevronDown size={16} color={t.colors.neutral[300]} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }} />
        </button>
        {open && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 4,
            backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
            border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md,
            zIndex: 50, maxHeight: 200, overflowY: 'auto',
          }}>
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange?.(opt.value); setOpen(false); }}
                style={{
                  width: '100%', padding: '8px 12px', border: 'none', background: 'none',
                  textAlign: 'left', fontFamily: font, fontSize: 14, cursor: 'pointer',
                  color: String(opt.value) === String(value) ? t.colors.brand.primary : t.colors.neutral[900],
                  fontWeight: String(opt.value) === String(value) ? 600 : 400,
                  backgroundColor: String(opt.value) === String(value) ? 'rgba(224,77,54,0.06)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (String(opt.value) !== String(value)) e.currentTarget.style.backgroundColor = t.colors.neutral[100];
                }}
                onMouseLeave={(e) => {
                  if (String(opt.value) !== String(value)) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </KFormField>
  );
}

/* ─── KUserCell ─────────────────────────────── */
export interface KUserCellProps {
  name: string;
  role?: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

export function KUserCell({ name, role, avatar, status, className }: KUserCellProps) {
  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <KAvatar src={avatar} name={name} size="sm" status={status} />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <KText variant="body-md" color="default">{name}</KText>
        {role && <KText variant="caption" color="muted">{role}</KText>}
      </div>
    </div>
  );
}

/* ─── KEmptyState ───────────────────────────── */
export interface KEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function KEmptyState({ icon, title, description, action, className }: KEmptyStateProps) {
  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48, gap: 12, textAlign: 'center' }}>
      {icon && <div style={{ color: t.colors.neutral[300], marginBottom: 4 }}>{icon}</div>}
      <KText variant="body-lg" color="default">{title}</KText>
      {description && <KText variant="body-md" color="secondary">{description}</KText>}
      {action && <div style={{ marginTop: 8 }}>{action}</div>}
    </div>
  );
}

/* ─── KBreadcrumb ───────────────────────────── */
export interface KBreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface KBreadcrumbProps {
  items: KBreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export function KBreadcrumb({ items, separator, className }: KBreadcrumbProps) {
  const sep = separator || <ChevronRight size={14} color={t.colors.neutral[300]} />;
  return (
    <nav className={className} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: font, fontSize: 13 }}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <span style={{ display: 'flex', alignItems: 'center' }}>{sep}</span>}
            {isLast ? (
              <span style={{ color: t.colors.neutral[900], fontWeight: 500 }}>{item.label}</span>
            ) : (
              <button
                onClick={item.onClick}
                style={{
                  background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                  color: t.colors.neutral[400], fontFamily: font, fontSize: 13,
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = t.colors.brand.primary; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = t.colors.neutral[400]; }}
              >
                {item.label}
              </button>
            )}
          </span>
        );
      })}
    </nav>
  );
}

/* ─── KSteps ────────────────────────────────── */
export interface KStepItem {
  title: string;
  description?: string;
}

export interface KStepsProps {
  items: KStepItem[];
  current: number;
  onChange?: (step: number) => void;
  className?: string;
}

export function KSteps({ items, current, onChange, className }: KStepsProps) {
  return (
    <div className={className} style={{ display: 'flex', gap: 0, fontFamily: font }}>
      {items.map((step, i) => {
        const status = i < current ? 'done' : i === current ? 'active' : 'pending';
        return (
          <div key={i} style={{ display: 'contents' }}>
            {i > 0 && (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 8px', minWidth: 32 }}>
                <div style={{ width: '100%', height: 2, backgroundColor: i <= current ? t.colors.brand.primary : t.colors.neutral[200], borderRadius: 1, transition: 'background-color 0.3s ease' }} />
              </div>
            )}
            <button
              onClick={() => onChange?.(i)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: onChange ? 'pointer' : 'default', padding: 0, flexShrink: 0 }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 600, fontFamily: font, flexShrink: 0,
                backgroundColor: status === 'done' ? t.colors.brand.primary : status === 'active' ? t.colors.brand.primary : t.colors.neutral[200],
                color: status === 'pending' ? t.colors.neutral[400] : '#fff',
                transition: 'all 0.3s ease',
              }}>
                {status === 'done' ? '✓' : i + 1}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontSize: 13, fontWeight: status === 'active' ? 600 : 400,
                  color: status === 'pending' ? t.colors.neutral[400] : t.colors.neutral[900],
                }}>{step.title}</div>
                {step.description && <div style={{ fontSize: 11, color: t.colors.neutral[300] }}>{step.description}</div>}
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

/* ─── KDropdownMenu ─────────────────────────── */
export interface KDropdownItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  danger?: boolean;
  disabled?: boolean;
  divider?: boolean;
}

export interface KDropdownMenuProps {
  items: KDropdownItem[];
  onSelect?: (key: string) => void;
  trigger?: React.ReactNode;
  className?: string;
}

export function KDropdownMenu({ items, onSelect, trigger, className }: KDropdownMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); } }}
        style={{ cursor: 'pointer', display: 'inline-flex' }}
      >
        {trigger || <MoreHorizontal size={20} color={t.colors.neutral[400]} />}
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: 4, minWidth: 180,
          backgroundColor: t.colors.neutral[50], borderRadius: t.radius.md,
          border: `1px solid ${t.colors.neutral[200]}`, boxShadow: t.shadows.md,
          zIndex: 50, padding: '4px 0', overflow: 'hidden',
        }}>
          {items.map((item) => {
            if (item.divider) return <div key={item.key} style={{ height: 1, backgroundColor: t.colors.neutral[200], margin: '4px 0' }} />;
            return (
              <button
                key={item.key}
                onClick={() => { if (!item.disabled) { onSelect?.(item.key); setOpen(false); } }}
                disabled={item.disabled}
                style={{
                  width: '100%', padding: '8px 14px', border: 'none', background: 'none',
                  display: 'flex', alignItems: 'center', gap: 8,
                  fontFamily: font, fontSize: 13, cursor: item.disabled ? 'not-allowed' : 'pointer',
                  color: item.danger ? t.colors.feedback.error : item.disabled ? t.colors.neutral[300] : t.colors.neutral[900],
                  textAlign: 'left',
                }}
                onMouseEnter={(e) => { if (!item.disabled) e.currentTarget.style.backgroundColor = t.colors.neutral[100]; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {item.icon && <span style={{ display: 'flex' }}>{item.icon}</span>}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── KPopover ──────────────────────────────── */
export interface KPopoverProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function KPopover({ trigger, children, side = 'bottom', className }: KPopoverProps) {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          side={side}
          sideOffset={8}
          className={className}
          style={{
            padding: 16, borderRadius: t.radius.lg,
            backgroundColor: t.colors.neutral[50],
            border: `1px solid ${t.colors.neutral[200]}`,
            boxShadow: t.shadows.md, fontFamily: font, zIndex: 50,
            maxWidth: 320, animation: 'fadeIn 0.1s ease',
          }}
        >
          {children}
          <RadixPopover.Arrow style={{ fill: t.colors.neutral[50] }} />
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}

/* ─── KAccordion ────────────────────────────── */
export interface KAccordionItem {
  key: string;
  title: string;
  children: React.ReactNode;
}

export interface KAccordionProps {
  items: KAccordionItem[];
  type?: 'single' | 'multiple';
  defaultValue?: string[];
  className?: string;
}

export function KAccordion({ items, type = 'single', defaultValue, className }: KAccordionProps) {
  if (type === 'multiple') {
    return (
      <RadixAccordion.Root type="multiple" defaultValue={defaultValue} className={className} style={{ borderRadius: t.radius.lg, overflow: 'hidden', border: `1px solid ${t.colors.neutral[200]}` }}>
        {items.map((item) => (
          <AccordionItemEl key={item.key} item={item} />
        ))}
      </RadixAccordion.Root>
    );
  }
  return (
    <RadixAccordion.Root type="single" defaultValue={defaultValue?.[0]} collapsible className={className} style={{ borderRadius: t.radius.lg, overflow: 'hidden', border: `1px solid ${t.colors.neutral[200]}` }}>
      {items.map((item) => (
        <AccordionItemEl key={item.key} item={item} />
      ))}
    </RadixAccordion.Root>
  );
}

function AccordionItemEl({ item }: { item: KAccordionItem }) {
  return (
    <RadixAccordion.Item value={item.key} style={{ borderBottom: `1px solid ${t.colors.neutral[200]}` }}>
      <RadixAccordion.Trigger style={{
        width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        border: 'none', background: t.colors.neutral[50], cursor: 'pointer',
        fontFamily: font, fontSize: 14, fontWeight: 500, color: t.colors.neutral[900],
        transition: 'background-color 0.15s ease',
      }}>
        {item.title}
        <ChevronDown size={16} color={t.colors.neutral[400]} style={{ transition: 'transform 0.2s ease' }} />
      </RadixAccordion.Trigger>
      <RadixAccordion.Content style={{ padding: '0 16px 16px', fontFamily: font, fontSize: 14, color: t.colors.neutral[500], lineHeight: 1.6, backgroundColor: t.colors.neutral[50] }}>
        {item.children}
      </RadixAccordion.Content>
    </RadixAccordion.Item>
  );
}