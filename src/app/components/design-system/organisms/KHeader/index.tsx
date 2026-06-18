import React from 'react';
import {
  ChevronDown,
  Bell,
  Menu,
  LayoutGrid,
  Box,
  User,
} from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

/* ─── Types ─────────────────────────────────── */
export interface KHeaderModule {
  label: string;
  sublabel?: string;
  icon?: React.ReactNode;
}

export interface KHeaderUser {
  initials?: string;
  avatarBg?: string;
  icon?: React.ReactNode;
}

export interface KHeaderProps {
  logo?: React.ReactNode;
  module?: KHeaderModule;
  user?: KHeaderUser;
  notificationCount?: number;
  onMenuToggle?: () => void;
  onModuleClick?: () => void;
  onNotificationClick?: () => void;
  onUserClick?: () => void;
  onGridClick?: () => void;
  variant?: 'desktop' | 'tablet' | 'mobile' | 'auto';
}

/* ─── Khor Logo — matches Figma "Kh•r" animated wordmark ─── */
function KhorLogo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const scale = size === 'lg' ? 1 : size === 'md' ? 0.76 : 0.6;
  const w = Math.round(162 * scale);
  const h = Math.round(50 * scale);
  const dotR = Math.round(10 * scale);
  const fontSize = Math.round(42 * scale);

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 162 50`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* "Kh" */}
      <text
        x="0"
        y="44"
        fill="#0a0a0a"
        fontSize="52"
        fontWeight="800"
        fontFamily="Inter,system-ui,-apple-system,sans-serif"
        letterSpacing="-2"
      >
        Kh
      </text>
      {/* orange dot replacing "o" */}
      <circle cx="100" cy="32" r="12" fill="#E04D36" />
      {/* "r" */}
      <text
        x="118"
        y="44"
        fill="#0a0a0a"
        fontSize="52"
        fontWeight="800"
        fontFamily="Inter,system-ui,-apple-system,sans-serif"
        letterSpacing="-2"
      >
        r
      </text>
    </svg>
  );
}

/* ─── Shared sub-components ──────────────────── */

function ModuleButton({ module, onClick }: { module: KHeaderModule; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '0 12px 0 8px',
        height: 42,
        borderRadius: 8,
        border: '1px solid #e2e8f0',
        background: '#f5f5f5',
        cursor: 'pointer',
        fontFamily: t.typography.fontPrimary,
        minWidth: 189,
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {module.icon ?? <Box size={15} color="#0C1A66" strokeWidth={1.5} />}
      </div>
      <span style={{
        flex: 1,
        textAlign: 'left',
        fontSize: 14,
        fontWeight: 600,
        color: 'rgba(0,0,0,0.88)',
        letterSpacing: '0.02em',
        whiteSpace: 'nowrap',
      }}>
        {module.label}
      </span>
      <ChevronDown size={14} color="rgba(0,0,0,0.88)" strokeWidth={2} style={{ flexShrink: 0 }} />
    </button>
  );
}

function ModuleTextBlock({ label, sublabel }: { label: string; sublabel?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 73 }}>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.88)', lineHeight: '17px', whiteSpace: 'nowrap' }}>
        {label}
      </span>
      {sublabel && (
        <span style={{ fontSize: 13, fontWeight: 400, color: 'rgba(0,0,0,0.45)', lineHeight: '16px', whiteSpace: 'nowrap' }}>
          {sublabel}
        </span>
      )}
    </div>
  );
}

function GridButton({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, borderRadius: 4, flexShrink: 0 }}>
      <LayoutGrid size={22} color="rgba(0,0,0,0.88)" strokeWidth={1.5} />
    </button>
  );
}

function BellButton({ count = 0, onClick }: { count?: number; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ width: 22, height: 22, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}>
      <Bell size={18} color="#051758" strokeWidth={1.5} />
      {count > 0 && (
        <span style={{ position: 'absolute', top: -1, right: -1, width: 7, height: 7, borderRadius: '50%', backgroundColor: '#E04D36', border: '1.5px solid #ffffff', display: 'block' }} />
      )}
    </button>
  );
}

function AvatarButton({ user, onClick }: { user: KHeaderUser; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: user.avatarBg ?? '#D12020', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 0 }}>
      {user.icon ?? (
        user.initials
          ? <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, fontFamily: t.typography.fontPrimary }}>{user.initials}</span>
          : <User size={18} color="#ffffff" strokeWidth={1.5} />
      )}
    </button>
  );
}

function HamburgerButton({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{ width: 32, height: 32, borderRadius: 6, backgroundColor: '#051758', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 0 }}>
      <Menu size={16} color="#ffffff" strokeWidth={2} />
    </button>
  );
}

/* ─── Variant Components ─────────────────────── */

function DesktopHeader(props: KHeaderProps) {
  const mod = props.module ?? { label: 'COMERCIAL', sublabel: 'Personas' };
  const usr = props.user ?? {};
  return (
    <header style={{ width: '100%', height: 64, backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 44px', boxSizing: 'border-box', fontFamily: t.typography.fontPrimary }}>
      <div style={{ flexShrink: 0 }}>
        {props.logo ?? <KhorLogo size="lg" />}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <ModuleButton module={mod} onClick={props.onModuleClick} />
        <ModuleTextBlock label="Comercial" sublabel={mod.sublabel} />
        <GridButton onClick={props.onGridClick} />
        <BellButton count={props.notificationCount} onClick={props.onNotificationClick} />
        <AvatarButton user={usr} onClick={props.onUserClick} />
      </div>
    </header>
  );
}

function TabletHeader(props: KHeaderProps) {
  const mod = props.module ?? { label: 'COMERCIAL', sublabel: 'Personas' };
  const usr = props.user ?? {};
  return (
    <header style={{ width: '100%', height: 64, backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', boxSizing: 'border-box', fontFamily: t.typography.fontPrimary }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <HamburgerButton onClick={props.onMenuToggle} />
        {props.logo ?? <KhorLogo size="md" />}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <ModuleTextBlock label="Comercial" sublabel={mod.sublabel} />
        <GridButton onClick={props.onGridClick} />
        <BellButton count={props.notificationCount} onClick={props.onNotificationClick} />
        <AvatarButton user={usr} onClick={props.onUserClick} />
      </div>
    </header>
  );
}

function MobileHeader(props: KHeaderProps) {
  const usr = props.user ?? {};
  return (
    <header style={{ width: '100%', height: 64, backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', boxSizing: 'border-box', fontFamily: t.typography.fontPrimary }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <HamburgerButton onClick={props.onMenuToggle} />
        {props.logo ?? <KhorLogo size="sm" />}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <GridButton onClick={props.onGridClick} />
        <BellButton count={props.notificationCount} onClick={props.onNotificationClick} />
        <AvatarButton user={usr} onClick={props.onUserClick} />
      </div>
    </header>
  );
}

/* ─── Main Export ────────────────────────────── */
export function KHeader(props: KHeaderProps) {
  const { variant = 'auto', ...rest } = props;

  if (variant === 'desktop') return <DesktopHeader {...rest} />;
  if (variant === 'tablet')  return <TabletHeader {...rest} />;
  if (variant === 'mobile')  return <MobileHeader {...rest} />;

  return (
    <>
      <div className="block md:hidden">
        <MobileHeader {...rest} />
      </div>
      <div className="hidden md:block lg:hidden">
        <TabletHeader {...rest} />
      </div>
      <div className="hidden lg:block">
        <DesktopHeader {...rest} />
      </div>
    </>
  );
}

export default KHeader;
