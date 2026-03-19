import React from 'react';
import { Search } from 'lucide-react';
import { KButton, KText } from '../../atoms';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KEmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function KEmptyState({ title, description, icon, actionLabel, onAction, className }: KEmptyStateProps) {
  return (
    <div
      className={className}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '48px 24px', textAlign: 'center', gap: 16,
        fontFamily: font,
      }}
    >
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        backgroundColor: t.colors.neutral[50], display: 'flex',
        alignItems: 'center', justifyContent: 'center', color: t.colors.neutral[300]
      }}>
        {icon || <Search size={32} />}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 300 }}>
        <KText variant="h3">{title}</KText>
        {description && <KText variant="body-md" color="secondary">{description}</KText>}
      </div>
      {actionLabel && (
        <KButton onClick={onAction}>{actionLabel}</KButton>
      )}
    </div>
  );
}

export default KEmptyState;
