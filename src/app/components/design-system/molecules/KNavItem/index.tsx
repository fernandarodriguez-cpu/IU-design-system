import React, { useState } from 'react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

/* ═══════════════════════════════════════════════
   KNavItem — Item de navegación lateral (Molécula)
   ═══════════════════════════════════════════════ */
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

export default KNavItem;
