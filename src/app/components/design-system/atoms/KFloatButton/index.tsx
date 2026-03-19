import React from 'react';
import { Plus } from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;

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

export default KFloatButton;
