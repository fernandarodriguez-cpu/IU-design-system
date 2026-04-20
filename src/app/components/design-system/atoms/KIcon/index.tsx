import React from 'react';
import * as LucideIcons from 'lucide-react';
import { khorTokens } from '../../../../theme/khor-theme';

export type KIconName = keyof typeof LucideIcons;

export interface KIconProps extends React.SVGProps<SVGSVGElement> {
  /** Name of the Lucide icon */
  name: KIconName;
  /** size token: xs(12px), sm(16px), md(20px), lg(24px), xl(32px), 2xl(48px) */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  /** Color (token variable or raw hex) */
  color?: string;
  /** Thickness of the lines */
  strokeWidth?: number;
}

/**
 * KIcon Atom
 * Centralized wrapper for Lucide icons using Khor Design Tokens.
 */
export const KIcon: React.FC<KIconProps> = ({
  name,
  size = 'md',
  color = 'currentColor',
  strokeWidth,
  style,
  ...props
}) => {
  const IconComponent = LucideIcons[name] as React.ElementType;

  if (!IconComponent) {
    console.warn(`[KIcon] Icon "${name}" not found in lucide-react.`);
    return null;
  }

  // Map size token to pixel value from theme
  const iconSize = khorTokens.icon[size as keyof typeof khorTokens.icon] || khorTokens.icon.md;

  return (
    <IconComponent
      size={iconSize}
      color={color}
      strokeWidth={strokeWidth ?? khorTokens.icon.strokeWidth}
      style={{
        flexShrink: 0,
        ...style,
      }}
      {...props}
    />
  );
};
