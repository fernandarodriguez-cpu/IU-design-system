import React from 'react';
import { Search } from 'lucide-react';
import { KButton } from '../../atoms/KButton/index';
import { KText } from '../../atoms/KText/index';
import { khorTokens } from '../../../../theme/khor-theme';

const t = khorTokens;
const font = t.typography.fontPrimary;

export interface KEmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  actionLabel?: string;
  onAction?: () => void;
  actions?: React.ReactNode;
  variant?: 'default' | 'simple';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function KEmptyState({ 
  title, 
  description, 
  icon, 
  image,
  actionLabel, 
  onAction, 
  actions,
  variant = 'default',
  size = 'md',
  className 
}: KEmptyStateProps) {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 48 : 32;
  const circleSize = iconSize * 2;
  const padding = size === 'sm' ? '24px 12px' : size === 'lg' ? '64px 32px' : '48px 24px';

  return (
    <div
      className={className}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding, textAlign: 'center', gap: 16,
        fontFamily: font,
      }}
    >
      {variant === 'default' ? (
        <div style={{
          width: circleSize, height: circleSize, borderRadius: '50%',
          backgroundColor: t.colors.neutral[50], display: 'flex',
          alignItems: 'center', justifyContent: 'center', color: t.colors.neutral[300]
        }}>
          {image ? (
            <img src={image} alt={title} style={{ width: '60%', height: '60%', objectFit: 'contain' }} />
          ) : (
            icon || <Search size={iconSize} />
          )}
        </div>
      ) : (
        <div style={{ color: t.colors.neutral[200] }}>
          {image ? (
            <img src={image} alt={title} style={{ width: circleSize, height: circleSize, objectFit: 'contain' }} />
          ) : (
            icon || <Search size={iconSize * 1.5} />
          )}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: size === 'sm' ? 240 : 400 }}>
        <KText variant={size === 'lg' ? 'h2' : size === 'sm' ? 'body-md' : 'h3'} strong={size === 'sm'}>{title}</KText>
        {description && (
          <KText variant={size === 'sm' ? 'caption' : 'body-md'} color="secondary">
            {description}
          </KText>
        )}
      </div>

      {(actionLabel || actions) && (
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          {actions || (actionLabel && (
            <KButton onClick={onAction} size={size === 'sm' ? 'sm' : 'md'}>
              {actionLabel}
            </KButton>
          ))}
        </div>
      )}
    </div>
  );
}

export default KEmptyState;
